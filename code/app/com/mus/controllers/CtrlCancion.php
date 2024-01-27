<?php 
class CtrlCancion extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['cnc_kycnc'] = 199;
		$data = $this->run("CtrlCancion",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cnc_kycnc","0")=="0")
			{
				$dtmp = Array();
				$dtmp['cnc_kyalb'] = $data['cnc_kyalb'];
				$dtmp['cnc_auto'] = $data['cnc_auto'];
				$dtmp['cnc_nomb'] = $data['cnc_nomb'];
				
				$dtmp = $this->run("mus/GetListaCancion",$dtmp);
					
				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
					$data['cnc_esta'] = "0001";
					
					$data = $this->insert($data, "mus_cancion");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				$this->dbcn->iniciarTransaccion($data);

				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where cnc_kycnc='".$data['cnc_kycnc']."'";
				}
				$data = $this->update($data, "mus_cancion");
					
				$this->dbcn->finalizarTransaccion($data);
					
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				$this->dbcn->iniciarTransaccion($data);

				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where cnc_kycnc = '".$val['ky']."'";
					}
					$data = $this->delete($data, "mus_cancion");
				}//foreach ($data['lisPrp'] as $key=>$val)

				$this->dbcn->finalizarTransaccion();

			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
				$this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "SUBIRARCHIVO")
			{
				$dtmp = Array();
				$dtmp['sql'] = "SELECT acr.acr_kyacr, acr.acr_nomb FROM mus_acorde acr WHERE acr.acr_vers='1' GROUP BY acr.acr_kyacr, acr.acr_nomb";
				$dtmp = $this->run("mus/GetListaAcorde",$dtmp);
				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nRegistro existe");}
				else{$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nExito");}
				
				$listaNotas = $dtmp['lista']['items'];
				if($data['msg']['type']=="success")
				{
					$arrNota = Array();
					$arrClave = Array();
					foreach ($listaNotas as $key=>$val)
					{
 						array_push($arrClave, $val['acr_kyacr']);
     				array_push($arrNota, $val['acr_nomb']);
// 						$arrDscr = explode(",",$val['acr_dscr']);
// 						$arrNota = array_merge($arrNota, $arrDscr);
// 						foreach ($arrDscr as $keyDscr=>$valDscr)
// 						{
// 							array_push($arrClave, $val['acr_kyacr']);
// 						}
					}
					$data['modulo'] = "carga";
					$data['pathFile']=$this->upload($data);
					
					$file = fopen($data['pathFile'], "r") or exit("Unable to open file!");
					$iteLetra = 0;
					$ltr_kyltr = 0;
					while(!feof($file))
					{
						$esLineaLetra = false;
						$linea = fgets($file);
						$linea = str_replace("\r\n", "", $linea);
						if(trim($linea)!="")
						{
							$arrLinea = explode(" ", $linea);
							foreach ($arrLinea as $keyLin=>$valLin)
							{
								if(strlen($valLin) > 3){$esLineaLetra = true;break;}
							}
							
							if($esLineaLetra)
							{
								$iteLetra++;
// 								$linea = substr($linea, 0, 1).strtolower(substr($linea, 1, strlen($linea)));
								$dtmp = Array();
								$dtmp['ltr_kyltr'] = "0";
								$dtmp['ltr_kycnc'] = $data['cnc_kycnc'];
								$dtmp['ltr_dscr'] = $linea;
								$dtmp['ltr_orde'] = $iteLetra;
								$dtmp['ltr_tnta'] = "1";
								$dtmp['comando'] = "AGREGAR";
								$dtmp = $this->run("mus/CtrlLetra",$dtmp);
								$ltr_kyltr = $dtmp['ltr_kyltr'];
							}
							else 
							{
								$arrResp = array_intersect($arrNota, $arrLinea);
								foreach ($arrResp as $key=>$val)
								{
									$dtmp = Array();
									$dtmp['nta_kynta'] = "0";
									$dtmp['nta_kyltr'] = $ltr_kyltr;
									$dtmp['nta_kyacr'] = $arrClave[$key];
									$dtmp['comando'] = "AGREGAR";
									$dtmp = $this->run("mus/CtrlNota",$dtmp);
								}
							}
						}//if(trim($linea)=="")
					}//while(!feof($file))
					fclose($file);
					$data["msg"]=array("type"=>"success","text"=>"Archivo subido satisfactorio");					
				}//if($data['msg']['type']=="success")
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else if($this->util->get($data,"comando") == "IMPRIMIR" && $this->util->get($data,"cnc_kycnc")!="0")
 			{
 				$data['comandoPdf'] = $data['comando'];

 				$dtmp = Array();
 				$dtmp['ltr_kycnc'] = $data['cnc_kycnc'];
 					
 				$dtmp = $this->run("mus/GetListaLetraNota",$dtmp);
 				
 				if(count($dtmp['lista']['items'])>0)
 				{
 					$data['listaLetra'] = $dtmp['lista']['items']; 				
 					$data['nombPdf'] = strtolower($data['cnc_auto'])."_".strtolower($data['cnc_nomb']). ".pdf";
 				
 					$dataPage['dbapp'] = "mus";
 					$dataPage['modulo']  = "images";
 					$dataPage['mainEmp'] = strtoupper($_SESSION['com']['com_dscr']);
 						
 					if($data['comandoPdf'] == "IMPRIMIR")
 					{
 						$dataPage['archivo'] = $data['nombPdf'];
 						$dataPage = $this->getPath($dataPage);
 						$data['nombPdfFile'] = $dataPage['ruta'];
 					}
 					else if($data['comandoPdf'] == "GENERAR")
 					{
 						$dataPage['archivo'] = "pdfTemporal.pdf";
 						$dataPage = $this->getPath($dataPage);
 						$data['nombPdfFile'] = $dataPage['ruta'];
 					}
 				
 					$data = $this->run("mus/cancion_pdf",$data);
 					$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)." Se genero bien el pdf");
 				}
 			}//else if($this->util->get($data,"comando") == "GENERAR" && $this->util->get($data,"cnc_kycnc")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['cnc_kycnc'] = $this->util->get($data,"cnc_kycnc");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>