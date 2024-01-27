<?php 
class CtrlArticulo extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 
 			
 			$this->dbcn->iniciarTransaccion($data);
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data['art'],"art_kyart","0")=="0")
 			{
 			  $data['art']['art_kycom'] = $_SESSION['com']['com_kycom'];
 					
	 			$tmpArt = Array();
	 			$tmpArt['art_kycom'] = $this->util->get($data['art'], "art_kycom");
	 			$tmpArt['art_codi'] = $this->util->get($data['art'], "art_codi");
	 			$tmpArt['art_nomb'] = $this->util->get($data['art'], "art_nomb");
 			
 				$tmpArt = $this->run("adm/GetListaArticulo",$tmpArt);
 				 
 				if(count($tmpArt['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\Registro existe");}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}

 				if($data['msg']['type']=="success")
 				{
 				  $data['art']['art_esta'] = $this->util->get($data['art'], "art_esta", "0001");
 					
 				  $tmpArt = $this->insert($data['art'], "adm_articulo");
 				  $data['art']['art_kyart'] = $tmpArt['art_kyart'];
 				}
 			}	else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"art_kyart")!="0")	{
 			  				
 			  $data['where'] = "where art_kyart = '".$data['art']['art_kyart']."'";
				$data = $this->update($data, "adm_articulo");
				
 			}	else if($this->util->get($data,"comando") == "MODIFICAR-INGR-PREC" && $this->util->get($data,"art_kyart")!="0")	{
 			  
 				$data['art_marc'] = $this->util->get($data, "mrc_prop");
 				$data['art_cate'] = $this->util->get($data, "cat_prop");
 				$data['art_clas'] = $this->util->get($data, "cls_prop");
 				$data['art_unid'] = $this->util->get($data, "und_prop");
 				$data['art_kylpr'] = $this->util->get($data, "lpr_kyprp");
 				
 				$data['where'] = "where art_kyart = '".$data['art_kyart']."'";
 				$data = $this->update($data, "adm_articulo");
 			
 				if($this->util->get($data, "chk_ingr") && !$this->util->get($data, "chk_prec"))
 				{
 					$data['comando'] = "AGREGAR";
 					$data['method'] = "saveDocumentoLogistica";
 					$data = $this->run("CtrlDocumento", $data);
 				}//if(w.$e.find('[name=chk_ingr]').prop('checked') && !w.$e.find('[name=chk_prec]').prop('checked')){
 				else if(!$this->util->get($data, "chk_ingr") && $this->util->get($data, "chk_prec"))
 				{
 					$tmpArt = Array();
 					$tmpArt['comando'] = "AGREGAR";
 					$tmpArt['prc_kyprc'] = "0";
 					$tmpArt['prc_kyart'] = $this->util->get($data, "art_kyart");
 					$tmpArt['prc_kymrc'] = $this->util->get($data, "mrc_kyprp");
 					$tmpArt['prc_kyund'] = $this->util->get($data, "und_kyprp");
 					$tmpArt['prc_kylpr'] = $this->util->get($data, "lpr_kyprp");
 					$tmpArt['prc_prec'] = $this->util->get($data, "prc_prec");
 					
 					$tmpArt = $this->run("GetListaPrecio",$tmpArt);
 					
 					if(count($tmpArt['lista']['items'])>0)
 					{
 						$tmpArt = $tmpArt['lista']['items'][0];
 						$tmpArt['comando'] = "MODIFICAR";
 						$tmpArt['prc_prec'] = $this->util->get($data, "prc_prec");
 					}
 					$tmpArt = $this->run("CtrlPrecio", $tmpArt);
 				}//if(!Sisem.isEmpty(w.$e.find('[name=art_pcos]').val()) && !Sisem.isEmpty(w.$e.find('[name=pre_prec]').val())){
 				else if($this->util->get($data, "chk_ingr") && $this->util->get($data, "chk_prec"))
 				{
 					$tmpArt = Array();
 					$tmpArt['comando'] = "AGREGAR";
 					$tmpArt['prc_kyart'] = $this->util->get($data, "art_kyart");
 					$tmpArt['prc_kymrc'] = $this->util->get($data, "mrc_kyprp");
 					$tmpArt['prc_kyund'] = $this->util->get($data, "und_kyprp");
 					$tmpArt['prc_kylpr'] = $this->util->get($data, "lpr_kyprp");
 					$tmpArt['prc_prec'] = $this->util->get($data, "prc_prec");
 					
 					$tmpArt = $this->run("GetListaPrecio",$tmpArt);
 					
 					if(count($tmpArt['lista']['items'])>0)
 					{
 						$tmpArt = $tmpArt['lista']['items'][0];
 						$tmpArt['comando'] = "MODIFICAR";
 						$tmpArt['prc_prec'] = $this->util->get($data, "prc_prec");
 					}
 					$tmpArt = $this->run("CtrlPrecio", $tmpArt);
 					 			
 					$data['comando'] = "AGREGAR";
 					$data['method'] = "saveDocumentoLogistica";
 					$data = $this->run("CtrlDocumento", $data);
 				}//if(!Sisem.isEmpty(w.$e.find('[name=art_pcos]').val()) && !Sisem.isEmpty(w.$e.find('[name=pre_prec]').val())){
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0") 				
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"art_kyart")!="0")
 			{
 				foreach ($data['lisKy'] as $key=>$val)
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where art_kyart = '".$val['ky']."'";
 					}
 					$data = $this->delete($data, "adm_articulo");
 				}
 			}
 			else if( ( $this->util->get($data,"comando") == "IMPRIMIR_LISTA" || $this->util->get($data,"comando") == "IMPRIMIR_STOCK" ) 
				&& $this->util->get($data,"art_kyart")!="0")
 			{
				$whereIn = "";

				if(isset($data['lisKy']) && count($data['lisKy']) > 0) 
				{
					foreach ($data['lisKy'] as $key => $val) 
					{
						$whereIn = $whereIn . $val['ky'] . ",";
					}
					$whereIn = " AND art_kyart IN (" . substr($whereIn, 0, strlen($whereIn)-1) . ")";
				}

				$dataPdf = Array();

				$tmpArt = Array();
				$tmpArt['ope_kyope'] = $this->util->get($data, "ope_kyope", "-1");
				$tmpArt['sql'] = "SELECT art_kyart, art_nomb, art_sact FROM viewstockarticulolocal vsa WHERE vsa.art_kycom=".$data['kycom']." AND vsa.art_sact > 0" . $whereIn;
				$tmpArt = $this->run("adm/GetListaArticulo", $tmpArt);

				if (count($tmpArt['lista']['items']) > 0) 
				{
					$dataPdf['lista'] = $tmpArt['lista'];
				}

				$dataPdf['comando'] = $data['comando'];
 				$dataPdf['comandoPdf'] = "IMPRIMIR";
				$dataPdf['nombPdf'] = "Articulo_stock.pdf";

				$dataPage['dbapp'] = "erp";
				$dataPage['modulo'] = "reportes";
				$dataPage['mainEmp'] = $data['mainEmp'];

				if ($data['comando'] == "IMPRIMIR_LISTA" || $data['comando'] == "IMPRIMIR_STOCK") 
				{
					$dataPage['archivo'] = $dataPdf['nombPdf'];
					$dataPage = $this->util->getPathExterna($dataPage);
					$dataPdf['nombPdfFile'] = $dataPage['ruta'];
				} 
				else if ($data['comando'] == "GENERAR") 
				{
					$dataPage['archivo'] = "pdfTemporal.pdf";
					$dataPage = $this->util->getPathExterna($dataPage);
					$dataPdf['nombPdfFile'] = $dataPage['ruta'];
				}

				$dataPdf = $this->run("adm/articulo_stock_pdf", $dataPdf);
				 
 			}
			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['art_kyart'] = $this->util->get($data,"art_kyart");
 		
 			$this->dbcn->finalizarTransaccion();
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>