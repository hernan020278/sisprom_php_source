<?php 
class CtrlKardex extends Controlador
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
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"kar_kykar","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['kar_kycom'] = $_SESSION['com']['com_kycom'];
 				$dtmp['kar_kypdr'] = $this->util->get($data, "kar_kypdr");
 				$dtmp['kar_kydrf'] = $this->util->get($data, "kar_kydrf");
 				$dtmp['kar_kyusu'] = $this->util->get($data, "kar_kyusu");
 				$dtmp['kar_kysuc'] = $this->util->get($data, "kar_kysuc");
 				$dtmp['kar_tope'] = $this->util->get($data, "kar_tope");
 				$dtmp['kar_tdoc'] = $this->util->get($data, "kar_tdoc");
 				$dtmp['kar_ndoc'] = $this->util->get($data, "kar_ndoc");

 				$dtmp = $this->run("GetListaKardex",$dtmp);

 				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
 				
 				if($data['msg']['type']=="success")
 				{
 					$data['kar_ndoc']=$this->util->get($data, "kar_ndoc", $this->util->getKey());
 					$data['kar_esta']=$this->util->get($data, "kar_esta", "0001");
 					
 					$data = $this->insert($data, "erp_kardex");

 					if($data['msg']['type']=="success")
 					{
 						for($iteLis = 0; $iteLis < count($data['items']); $iteLis++)
 						{
 							$data['items'][$iteLis]['comando'] = "AGREGAR";
 							$data['items'][$iteLis]['dtk_kykar'] = $data['kar_kykar'];
 							$data['items'][$iteLis] = $this->run("CtrlDetkardex", $data['items'][$iteLis]);
 						}
 					}//if($data['msg']['type']=="success")
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
 			else if( $this->util->get($data,"comando") == "APROBAR" || $this->util->get($data,"comando") == "ANULAR" )
 			{
 				$dtmp = Array();
 				$dtmp['kar_kykar'] = $data['kar_kykar'];
 				$dtmp = $this->run("GetListaKardex",$dtmp);
 				if(count($dtmp['lista']['items'])>0){$data = $dtmp['lista']['items'][0];}//if(count($dtmp['lista']['items'])>0)
 			
 				$dtmp = Array();
 				$dtmp['dtk_kykar'] = $data['kar_kykar'];
 				$dtmp = $this->run("GetListaDetkardex",$dtmp);
 				if(count($dtmp['lista']['items'])>0){$data['items'] = $dtmp['lista']['items'];}//if(count($dtmp['lista']['items'])>0)
 			
 				$data['comando'] = "APROBAR";
 				$data = $this->valorizarArticulo($data);
 			}//if($data['accion']=='APROBAR' || $data['accion']=='ANULAR') 				
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"doc_kydoc")!="0")
 			{
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"doc_kydoc")!="0")
 			{
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"doc_kydoc")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"doc_kydoc")!="0")
 			{
 				$data['comandoPdf'] = "IMPRIMIR";
				$data = $this->generarPdf($data);
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"doc_kydoc")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			
 			$result['msg'] = $data['msg'];
 			$result['kar_kykar'] = $this->util->get($data,"kar_kykar");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	public function valorizarArticulo($data){
 		$result = null;
 		try
 		{
 			if($data['kar_kykar'] > 0)
 			{
 				for( $ite=0; $ite < count($data['items']); $ite++ )
 				{
 					$dtk = $data['items'][$ite];

 					$art_pcos = 0.00;
 					$dtk_ingr = 0;
 					$dtk_egre = 0;
 					$dtk_sald = 0;
 					
 					$dtmp = Array();
 					$dtmp['art_kycom'] = $_SESSION['com']['com_kycom'];
 					$dtmp['art_kyart'] = $dtk['dtk_kyart'];
 					$dtmp['sql'] = "select vwkar.art_kyart, IFNULL(vwkar.art_pcos,0) art_pcos, IFNULL(sum(vwkar.dtk_ingr),0) AS dtk_ingr, IFNULL(sum(vwkar.dtk_egre),0) AS dtk_egre, IFNULL( (sum(vwkar.dtk_ingr) - sum(vwkar.dtk_egre)) ,0) AS dtk_sald from view_kardex vwkar";
 					$dtmp = $this->run("GetListaViewkardex",$dtmp);
 					$data['msg'] = $dtmp['msg'];
 					if(count($dtmp['lista']['items'])>0)
 					{
 						$filKar = $dtmp['lista']['items'][0];
 						$art_pcos = $filKar['art_pcos'];
 						$dtk_ingr = $filKar['dtk_ingr'];
 						$dtk_egre = $filKar['dtk_egre'];
 						$dtk_sald = $filKar['dtk_sald'];
 					}//if(count($dtmp['lista'])>0)
 	
 					$dtk['dtk_mcos'] = ( ( $dtk['dtk_mcos']==0 ) ? $art_pcos : $dtk['dtk_mcos']);
 					$dtk['dtk_mimp'] = $dtk['dtk_mcan'] * $dtk['dtk_mcos'];
 	
 					if($data['comando']=='APROBAR')
 					{
 						if($data['kar_tctr']=='INGRESO'){
 							$dtk['dtk_scan'] = $dtk_sald + $dtk['dtk_mcan'];
 							$dtk['dtk_simp'] = ( ( $dtk_sald * $art_pcos ) + $dtk['dtk_mimp'] );
 							$dtk['dtk_scos'] = $dtk['dtk_simp'] / ( ( $dtk['dtk_scan'] > 0 ) ? $dtk['dtk_scan'] : 1 );
 							$dtk['dtk_ingr'] = $dtk['dtk_mcan'];
 							$dtk['dtk_egre'] = 0;
 						}else if($data['kar_tctr']=='EGRESO'){
 							$dtk['dtk_scan'] = $dtk_sald - $dtk['dtk_mcan'];
 							$dtk['dtk_simp'] = (($dtk_sald * $art_pcos) - $dtk['dtk_mimp']);
 							$dtk['dtk_scos'] = $dtk['dtk_simp'] / ( ( $dtk['dtk_scan'] > 0 ) ? $dtk['dtk_scan'] : 1 );
 							$dtk['dtk_ingr'] = 0;
 							$dtk['dtk_egre'] = $dtk['dtk_mcan'];
 						}//}else if($kar->tctr=='EGRESO'){
 					}//if($data['accion']=='APROBAR')
 					else if($data['comando']=="ANULAR")
 					{
 						if($data['kar_tctr']=='INGRESO'){
 							$dtk['dtk_scan'] = $dtk_sald - $dtk['dtk_mcan'];
 							$dtk['dtk_simp'] = (($dtk_sald * $art_pcos) - $dtk['dtk_mimp']);
 							$dtk['dtk_scos'] = $dtk['dtk_simp'] / ( ( $dtk['dtk_scan'] > 0 ) ? $dtk['dtk_scan'] : 1 );
 							$dtk['dtk_ingr'] = 0;
 							$dtk['dtk_egre'] = 0;
 						}else if($data['kar_tctr']=='EGRESO'){
 							$dtk['dtk_scan'] = $dtk_sald + $dtk['dtk_mcan'];
 							$dtk['dtk_simp'] = (($dtk_sald * $art_pcos) + $dtk['dtk_mimp']);
 							$dtk['dtk_scos'] = $dtk['dtk_simp'] / ( ( $dtk['dtk_scan'] > 0 ) ? $dtk['dtk_scan'] : 1 );
 							$dtk['dtk_ingr'] = 0;
 							$dtk['dtk_egre'] = 0;
 						}
 					}//else if($data['accion']=="ANULAR")
 						
 					$dtk['dtk_scan'] = ( ( $dtk['dtk_scan'] < 0 ) ? 0 : $dtk['dtk_scan'] );
 					$dtk['dtk_simp'] = ( ( $dtk['dtk_simp'] < 0 ) ? 0 : $dtk['dtk_simp'] );
 					$dtk['dtk_scos'] = ( ( $dtk['dtk_scos'] < 0 ) ? 0 : $dtk['dtk_scos'] );
 					$dtk['dtk_ingr'] = ( ( $dtk['dtk_ingr'] < 0 ) ? 0 : $dtk['dtk_ingr'] );
 					$dtk['dtk_egre'] = ( ( $dtk['dtk_egre'] < 0 ) ? 0 : $dtk['dtk_egre'] );
 	
 					$dtmp = Array();
 					if(isset($dtk['dtk_kydtk']) && ($dtk['dtk_kydtk']=='0' || $dtk['dtk_kydtk']==''))
 					{
 						$dtmp = $dtk;
 						$dtmp['comando'] = "AGREGAR";
 						$dtmp = $this->run("CtrlDetkardex", $dtmp);
 					}
 					else
 					{
 						$dtmp = $dtk;
 						$dtmp['comando'] = "MODIFICAR";
 						$dtmp = $this->run("CtrlDetkardex", $dtmp);
 					}
 					$data['msg'] = $dtmp['msg'];
 					
 					$dtmp = Array();
 					$dtmp['comando'] = "MODIFICAR";
 					$dtmp['art_kyart'] = $dtk['dtk_kyart'];
 					$dtmp['art_sact'] = $dtk['dtk_scan'];
 					$dtmp['art_pcos'] = $dtk['dtk_scos'];
 					$dtmp = $this->run("CtrlArticulo", $dtmp);
 					$data['msg'] = $dtmp['msg'];
 					
 					$data['items'][$ite] = $dtk;
 				}
 			}
 			
 			$data['msg'] = ( isset($data['msg']) ? $data['msg']  : Array("type"=>"error","text"=>"Error") );
 			
 			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>