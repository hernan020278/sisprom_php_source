<?php 
class search extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = $_POST;
		$data = ((is_array($data) && count($data)>0)?$data:$_GET);
		
		$title = 'Buscar con Google';
		
		if($this->util->exist($data, "q"))
		{
			$title = $data['q'].' - Buscar con Google';
			$_SESSION['q'] = $data['q']; 
		}
		else
		{
			unset($_SESSION['q']);
		}
		switch ($this->util->get($_SESSION,"q","search"))
		{
			case "search":
				header("Refresh:0;url=".BASURL);
				break;
			default:
				$template["header"] = $this->vista('cmn/header', array("userdata"=>$_SESSION), true);
				$template["body"] = $this->vista('cmn/search', array("userdata"=>$_SESSION), true);
				$this->vista("cmn/template",array("userdata"=>$_SESSION,"template"=>$template,'title'=>$title));
				break;
		}//switch ($this->util->get($data,"tipo","LOGIN"))
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
			
			$data = $this->getListaMix($data, false);
			
			$textoAbuscar = $data['q'];
			$urlHost = "http://".$_SERVER['HTTP_HOST']."/";
			$lisArch = $this->util->obtenerListaDeArchivos("gestion/sisprom/", true, "Archivo");
			$lisBus = Array();
			foreach ($lisArch as $key=>$val)
			{
				if($val['tipo']=="Archivo")
				{
					$textoEncontrado = false;
					$titulo = $textoAbuscar;
					$file = fopen($val['url'], "r") or exit("No se puede leer archivo!");
					$archivo = $val['url'];
					$linEncTextoCompleto = Array();
					$linEncSoloPalabras = Array();
					$linEncPrimeraPalabra = Array();
						
					while(!feof($file))
					{
						$lineaTexto = fgets($file);
						$lineaTemporal = $lineaTexto; 
						$lineaTexto = $this->util->limpiarLinea($lineaTexto);
						if( strpos($lineaTemporal, "<h1") > -1 ){$titulo = $lineaTexto;}
						
						/** ****************************************************************************
						 * Verifica si el texto completo buscado es encontrado en una linea del archivo 
						 *******************************************************************************/
						if(preg_match("/".$textoAbuscar."/i", $lineaTexto) && count($linEncTextoCompleto)==0)
						{
						    $val['arch'] = str_replace("../../", "/", $val['url']);
							$val['url'] = str_replace("../../", "http://".$_SERVER['HTTP_HOST']."/", $val['url']);
							$val['titulo'] = $titulo;
							$val['lineaTexto'] = $lineaTexto;
							$val['numeroCoincidencia'] = 0;
							
							$textoEncontrado = true;
							$linEncTextoCompleto = $val;
						}
						else if(count($linEncSoloPalabras)==0)
						{
							$textoBuscarTemporal = preg_replace("/( el | la | lo | un | una | de | por | para | las | los |el |la |lo |un |una |de |por |para |las |los )/i", " ", $textoAbuscar);
							$arrTextoBuscar = explode(" ", $textoBuscarTemporal);
							$numeroCoincidencia = 0;
							while(count($arrTextoBuscar) > 0)
							{
								foreach ($arrTextoBuscar as $keyTxtBus => $valTxtBus)
								{
									if(preg_match("/".$valTxtBus."/i", $lineaTexto))
									{
										$numeroCoincidencia++;
									}
								}
								if($numeroCoincidencia==count($arrTextoBuscar))
								{
								    $val['arch'] = str_replace("../../", "/", $val['url']);
									$val['url'] = str_replace("../../", "http://".$_SERVER['HTTP_HOST']."/", $val['url']);
									$val['titulo'] = $titulo;
									$val['lineaTexto'] = $lineaTexto;
									$val['numeroCoincidencia'] = $numeroCoincidencia;
									$textoEncontrado = true;

									array_push($linEncSoloPalabras, $val);
								}
								
								unset($arrTextoBuscar[count($arrTextoBuscar)-1]);
								
							}//while(count($arrTextoBuscar) > 1)							
						}//if(count($linEncSoloPalabras)==0)
					}//while(!feof($file))
//					if($textoEncontrado){array_push($lisBus, $val);$textoEncontrado=false;}
					if(count($linEncTextoCompleto) > 0 && $textoEncontrado)
					{
						array_push($lisBus, $linEncTextoCompleto);
					}
					else if(count($linEncSoloPalabras) > 0 && $textoEncontrado)
					{
						$numConMayor = 0;
						$idxConMayor = 0;
						foreach ($linEncSoloPalabras as $keyLinEncSolPal => $valLinEncSolPal)
						{
							if($valLinEncSolPal['numeroCoincidencia'] > $numConMayor)
							{
								$idxConMayor = $keyLinEncSolPal;
								$numConMayor = $valLinEncSolPal['numeroCoincidencia'];
							}
						}
						array_push($lisBus, $linEncSoloPalabras[$idxConMayor]);
					}
					fclose($file);
				}//if($val['Tipo']=="Archivo")
			}//foreach ($lisArch as $key=>$val)

			$arrNiv0 = Array();
			$arrNiv1 = Array();
			$arrNiv2 = Array();
			$arrNiv3 = Array();
			$arrNiv4 = Array();
			$arrNiv5 = Array();
			$arrNiv6 = Array();
			$arrNiv7 = Array();
			$arrNiv8 = Array();
			$arrNiv9 = Array();
			foreach ($lisBus as $key=>$val)
			{
				$varArr = Array(
					"pol_kypol"=>"0",
					"pol_nomb"=>$val['titulo'],
					"pol_dscr"=>$val['lineaTexto'],
					"pol_imin"=>"",
					"pol_temp"=>$val['archivo'],
					"pol_html"=>$val['url'],
					"pol_arch"=>$val['arch'],
					"pol_nuco"=>$val['numeroCoincidencia']
				);
				if($val['numeroCoincidencia'] == 0){array_push($arrNiv0, $varArr);}
				if($val['numeroCoincidencia'] == 1){array_push($arrNiv1, $varArr);}
				if($val['numeroCoincidencia'] == 2){array_push($arrNiv2, $varArr);}
				if($val['numeroCoincidencia'] == 3){array_push($arrNiv3, $varArr);}
				if($val['numeroCoincidencia'] == 4){array_push($arrNiv4, $varArr);}
				if($val['numeroCoincidencia'] == 5){array_push($arrNiv5, $varArr);}
				if($val['numeroCoincidencia'] == 6){array_push($arrNiv6, $varArr);}
				if($val['numeroCoincidencia'] == 7){array_push($arrNiv7, $varArr);}
				if($val['numeroCoincidencia'] == 8){array_push($arrNiv8, $varArr);}
				if($val['numeroCoincidencia'] == 9){array_push($arrNiv9, $varArr);}
			}
			
			//array_merge_recursive($data['lista']['items'], $arrNiv1, $arrNiv1, $arrNiv1, $arrNiv1, $arrNiv1, $arrNiv1)
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv0);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv9);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv8);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv7);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv6);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv5);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv4);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv3);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv2);
			$data['lista']['items'] = array_merge($data['lista']['items'], $arrNiv1);
			$result = $data['lista'];
		} catch (Exception $e) {
			$data['msg'] = Array("type"=>"error","text"=>$e);
			throw $e;
		}
		return $result;
	}	
	public function getListaMix($data=Array(), $return=false)
	{
		$result = null;
		try
		{
			$data['page'] = ((isset($data['page'])?$data['page']:1));
			$data['pagecount'] = ((isset($data['pagecount'])?$data['pagecount']:999999));
	
			/**********************************************
			 * LISTA DE COLUMNAS PARA FILTRAR EN LA BROSE *
			 **********************************************/
			$data['main_sel_sucu'] = ((isset($data['main_sel_sucu']))?$data['main_sel_sucu']:"");
			$data['main_kysuc'] = ((isset($data['main_kysuc']))?$data['main_kysuc']:"0");
			$select = "";
			foreach ($data as $key=>$value)
			{
				$test=strpos($key, "filter_");
				if (strpos($key, "filter_")>-1)
				{
					$keyTmp = str_replace('filter_','',$key);
					$data[$keyTmp] = $data[$key];
					unset($data[$key]);
					$select .=" ". str_replace('_','.',$keyTmp)." as ".$keyTmp.",";
				}
			}
			$select = substr($select, 0, strlen($select)-1)." ";
	
			/**************************
			 * CONFIGURANDO EL SQL1   *
			 **************************/
			$where = "WHERE 1=1 and app.pol_esta='0001' AND app.pol_nive=1";
			if($this->util->exist($data,'q')){$where .= " and (app.pol_nomb like '%".$data['q']."%' or app.pol_dscr like '%".$data['q']."%')";}
			/****************
			 * SETTING SQL  *
			 ****************/
			$data['sql'] =  "SELECT app.pol_kypol, app.pol_nomb, app.pol_dscr, app.pol_imin, app.pol_temp, 'EnConstruccion' pol_html FROM cmn_politica app ".$where;

			$data = $this->getLista($data);
			$result = $data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}//public function getListaMix($data=Array(), $return=false)	
}
?>