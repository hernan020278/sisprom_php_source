<?php 
require_once 'Util.php';
require_once 'DBconeccion.php';

class Controlador 
{
	public $util;
	public $dbcn;
	public $rutaArchivo;
	public $ruta;
	public $view;
	public $vars;
	public $_ci_cached_vars = array();
	
	public function __construct() 
	{
		$this->util = Util::getInst();
		$this->dbcn = DBconeccion::getInst();
	}
	public function manejoExcepciones(Exception $ex){
	  echo "Excepción no capturada: " , $ex->getMessage(), "\n";
	}
	public function uploadFile($data)
	{
		$modulo = $this->util->get($data, "modulo", "");
		if($modulo=="imagen" || $modulo=="formato" || $modulo=="carga")
		{
			$data['pathFile']=$this->upload($data);
			$data["msg"]=array("type"=>"success","text"=>"Archivo subido satisfactorio");
		}
		else
		{
			$data["msg"]=array("type"=>"error","text"=>"Modulo [".$modulo."] prohibido cargar");
		}
		echo json_encode($data);
	}
	public function getDataRequest()
	{
		$data = $_POST;
		$data = ((is_array($data))?$data:$_GET);
		if(isset($data) && is_array($data))
		{
			return $data;
		}
		return null;
	}

 	public function edit($data)
 	{
 	    $result = null;
 		try
 		{
 			switch ($data['nombreVentana'])
 			{
 			  case "brwVenta":
 			  case "brwCompra":
 			    if($this->util->get($data,"dispositivo")=='mobil'){$this->vista('dash_mobil');}
 			    else{$this->vista('grid_docu');}
 			    break;
 			  case "brwDashgeneral":
 			    if($this->util->get($data,"dispositivo")=='mobil'){$this->vista('dash_mobil');}
 			    else{$this->vista('grid_dash');}
 			    break;
 			  case "brwComentario":
 					if($this->util->get($data,"dispositivo")=='mobil'){$this->vista('come');}
 					else{$this->vista('come');}
 					break;
 				case "brwCitageneral":
 					$this->vista('cita_brow');
 					break;
 				case "brwSexo":
 				case "brwStreaper":
 				case "brwArtivideos":
 				case "brwVideoVivo":
 					$this->vista('sex/arti_grid');
 					break;
 				case "brwEvlalumno":
 				case "brwEvlasignatura":
 				    $this->vista('clg/evlu_grid');
 				    break;
 				case "brwAsialumno":
 				case "brwAsiasignatura":
 				    $this->vista('asi/asit_grid');
 				    break;
 				case "brwMatricula":
 				    $this->vista('clg/matr_grid');
 				    break;
 				case "brwAsignatura":
 				    $this->vista('clg/asig_grid');
 				    break;
 				case "brwTarea":
 				    if($this->util->get($data, "tipoBrowse") == "EXPLORADOR"){$this->vista('cmn/tare_sele');}
 				    else{$this->vista('cmn/grid');}
 				    break;
 				case "winEvluhistorial":
 				    $this->vista('clg/evlu_edit');
 				    break;
 				case "winAsialumno":
 				    $this->vista('asi/asit_edit');
 				    break;
 			    case "winAsignatura":
 					$this->vista('clg/asig_edit');
 					break;
 				case "winPrograma":
 					$this->vista('clg/prog_edit');
 					break;
 				case "winEvlhistorial":
 					$this->vista('clg/evlu_edit');
 					break;
 				case "winAlbum":
 					$this->vista('albm_edit');
 					break;
 				case "winCancion":
 					$this->vista('canc_edit');
 					break;
 				case "winListletra":
 				    $this->vista('letr_list');
 				    break;
 				case "winEditletra":
 				    $this->vista('letr_edit');
 				    break;
 				case "winNota":
 					$this->vista('nota_edit');
 					break;
 				case "winAcorde":
 					$this->vista('acrd_edit');
 					break;
 				case "winCtaGeneral":
 				case "winCtaCliente":
 				case "winCtaProveedor":
 				case "winCtaTrabajador":
 				case "winCtaTransportista":
 				case "winCtaEmpresa":
 					$this->vista('ccor_edit');
 					break;
 				case "winHistoria":
 				  if($this->util->get($data,"dispositivo")=='mobil'){$this->vista('hist_mobedit');}
 				  else{$this->vista('hist_webedit');}
 				  break;
 				case "winCitageneral":
 				  $this->vista('sld/cita_edit');
 				  break;
 				case "winComunidad":
 					$this->vista('cmn/comm_edit');
 					break;
 				case "winCliente":
 				case "winProveedor":
 				case "winClienteProveedor":
 					$this->vista('adm/cli_edit');
 					break;
 				case "winMatricula":
 					$this->vista('clg/matr_edit');
 					break;
 				case "winArticulo":
 					$this->vista('adm/arti_edit');
 					break;
 				case "winVervideo":
 					$this->vista('arti_video');
 					break;
 				case "winComentario":
 					$this->vista('come_edit');
 					break;
 				case "winPropperiodo":
 				case "winPropmarca":
 				case "winPropcategoria":
 				case "winPropunidad":
 				case "winProplistaprecio":
 				case "winPropbancos":
 				case "winProprubro":
 				case "winPropclase":
 				case "winOperclase":
 				case "winPropasignatura":
 				case "winPropgrado":
 				case "winPropprograma":
 				case "winPropgeneral":
 				case "winProppadre":
 				case "winPropevaluacion":
 				case "winPropnumdoc":
 				case "winPropaula":
 				case "winPropmoneda":
 				case "winPropregimen":
 				case "winPropregistros":
 				    $this->vista('adm/prop_gene');
 					break;
 				case "winApccajageneral":
 					$this->vista('apci_edit');
 					break;
 				case "winLocal":
 					$this->vista('loca_edit');
 					break;
 				case "winSucursal":
 					$this->vista('sucu_edit');
 					break;
 				case "winCajageneral":
 					$this->vista('camb_edit');
 					break;
 				case "winFlujooperacion":
 					if($this->util->get($data,"dispositivo")=='mobil'){$this->vista('oper_mobil');}
 					else
 					{
 						if($this->util->get($data,"size")=='short'){$this->vista('oper_short');}
 						else{$this->vista('oper_edit');}
 					}
 					break;
 				case "winBancos":
 					$this->vista('banc_edit');
 					break;
 				case "winUsuageneral":
 					$this->vista('cmn/usua_edit');
 					break;
 				case "winArtivideos":
 					$this->vista('arti_edit');
 					break;
 				case "winVideosUsuario":
 					$this->vista('cmn/usua_edit');
 					break;
 				case "winTutorial":
 					$this->vista('tuto_edit');
 					break;
 				case "winPolitica":
 				    $this->vista('cmn/poli_edit');
 				    break;
 				case "winTarea":
 				    $this->vista('cmn/tare_edit');
 				    break;
 				case "winUsuario":
 					$this->vista('cmn/usua_edit');
 					break;
 				case "winRegla":
 					$this->vista('cmn/regl_edit');
 					break;
 				case "winCompra":
 					$this->vista('comp_edit');
 					break;
 				case "winVenta":
 					$this->vista('vent_edit');
 					break;
 				case "winTraslado":
 					$this->vista('tras_edit');
 					break;
 				case "winSaldoinicial":
 				case "winCotizacionproveedor":
 					$this->vista('cotp_edit');
 					break;
 				case "winPedidoproveedor":
 					$this->vista('pedp_edit');
 					break;
 				case "winIngresoalmacen":
 					$this->vista('ingr_edit');
 					break;
 				case "winEgresoalmacen":
 					$this->vista('egre_edit');
 					break;
 				case "winCotizacioncliente":
 					$this->vista('cotc_edit');
 					break;
 				case "winPedidocliente":
 				    $this->vista('pedc_edit');
 				    break;
 				case "winPerfil":
 				    $this->vista('perf_edit');
 				    break;
 				case "selPolitica":
 				    if($this->util->get($data, "tipoBrowse") == "EXPLORADOR"){$this->vista('cmn/poli_sele');}
 				    else{$this->vista('cmn/grid');}
 					break;
 				case "selProppadre":
 				case "selPropevaluacion":
 				case "selPropgeneral":
 				case "selPropmarca":
 				case "selPropcategoria":
 				case "selPropclase":
 				case "selPropunidad":
 				case "selProplistaprecio":
 				case "selProparticulo":
 				case "selPropcliente":
 				case "selPropproveedor":
 				case "selProptrabajador":
 				case "selProptransportista":
 				case "selPropbancos":
 				case "selPropcomensal":
 				case "selPropempresa":
 				case "selPropgrupo":
 				case "selPropdivision":
 				case "selPropregimen":
 				case "selPropPropiedad":
 				case "selPropcargo":
 				case "selProparea":
 				case "selPropconvenio":
 				case "selPropdenominacion":
 				case "selProprubro":
 				case "selPropnumdoc":
 				case "selPropmoneda":
 				case "selPropcambio":
 				case "selPropperiodo":
 				case "selPropasignatura":
 				case "selPropprograma":
 				case "selPropgrado":
 				case "selPropaula":
 				case "selPropregistros":
 					if($this->util->get($data, "tipoBrowse") == "EXPLORADOR"){$this->vista('cmn/vista_explorador');}
 					else{$this->vista('cmn/grid');}
 					break;
 				case "intPerfil":
 				case "intPolitica":
 					$this->vista($this->util->get($data, "enlace", "cmn/grid"));
 					break;
 				case "intAyuda":
 					$this->vistaExterna($data['enlace']);
 					break;
 				case "intPropevaluacion":
 			 		if($this->util->get($data, "tipoBrowse") == "EXPLORADOR"){$this->vista('cmn/vista_explorador');}
 					else{$this->vista('cmn/grid');}
 					break;
 				default:
 					if(substr($data['nombreVentana'], 0, 3) == "brw")
 					{
 						$this->vista('cmn/grid');
 					}
 					break;
 			}//switch ($data['nameWP'])
 		}
 		catch (Exception $e)
 		{
 			throw $e;
 		}
 		return $result; 			
 	}//public function edit()
	private function validarPolitica($data)
	{
 		$result = null;
 		try
 		{
 			$data = $this->run("cmn/ValidarPolitica",$data);	
 		}
 		catch (Exception $e) 
 		{
 			throw $e;
 		}
 		return $result;
	}
	public function vistaExterna($page, $data = array(), $return = false)
	{
		$dataPage['modulo']  = ((isset($data['modulo']))?$data['modulo']:"ayuda");
		$dataPage['mainEmp'] = strtoupper($_SESSION['com']['com_dscr']);
		$dataPage['archivo'] = $page;

		$dataPage = $this->util->getPathExterna($dataPage);

		if(!empty($dataPage['rutaArchivo'])){return $this->view($dataPage, $data, $return);}
		else{show_404();}
	}
	public function vista($page, $data = array(), $return = false)
	{
		$arrPage=explode('/', $page);
		if(count($arrPage)==1)
		{
			$arrPage[1] = $arrPage[0];
			$arrPage[0] = $_SESSION['app']['pol_temp'];
		}
		$dataPage['modulo']  = ((isset($data['modulo']))?$data['modulo']:"views");
		$dataPage['mainEmp'] = ( isset($_SESSION['com'] ) ? strtoupper($_SESSION['com']['com_dscr']) : "" );
		$dataPage['dbapp']   = $arrPage[0];
		$dataPage['archivo'] = $arrPage[1];

		$dataPage = $this->util->getPath($dataPage);

		if(!empty($dataPage['rutaArchivo'])){return $this->view($dataPage, $data, $return);}
		else{show_404();}
	}
	public function getQuery($select, $from, $where, $groupby, $orderby, $limit)
	{
		$query = "";
		if(isset($select) && !empty($select))
		{
			$query .= " " . $select;
		}
		if(isset($from) && !empty($from))
		{
			$query .= " " . $from;
		}
		if(isset($where) && !empty($where))
		{
			$query .= " " . $where;
		}
		if(isset($groupby) && !empty($groupby))
		{
			$query .= " " . $groupby;
		}
		if(isset($orderby) && !empty($orderby))
		{
			$query .= " " . $orderby;
		}
		if(isset($limit) && !empty($limit))
		{
			$query .= " " . $limit;
		}
		return $query;
	}
	public function guardarImagen()
	{
		header("Content-type: image/jpeg");
		
		$file = $_GET['img'];
		$name = md5($file).".jpg";
		
		if(!file_exists("/path/to/file" . $name)) {
			imagefilter($image, IMG_FILTER_GRAYSCALE);
			imagejpeg($image, "/path/to/file" . $name);
		} else {
			$image = imagecreatefromjpeg("/path/to/file" . $name);
		}
		
		imagejpeg($image);
		imagedestroy($image);
	}	
	public function upload($data)
	{
		if (array_key_exists('HTTP_X_FILE_NAME', $_SERVER) && array_key_exists('CONTENT_LENGTH', $_SERVER))
		{
			$page = $_SERVER['HTTP_X_FILE_NAME'];
			$contentLength = $_SERVER['CONTENT_LENGTH'];
		}
		else throw new Exception("Error retrieving headers");

		if (!$contentLength > 0) {throw new Exception('Error! .Ning?n archivo se ha subido!');}
				
		$arrPage=explode('/', $page);
		$archivo=((count($arrPage)==1)?$arrPage[0]:$arrPage[1]);
			
		$dataPage['dbapp']   = $data['dbapp']; 
		$dataPage['modulo']  = ((isset($data['modulo']))?$data['modulo']:"views");
		$dataPage['mainEmp'] = strtoupper($_SESSION['com']['com_dscr']);
		$dataPage['archivo'] = $archivo;
	
		$dataPage = $this->util->getPathExterna($dataPage);

//		$ruta = str_replace("../../", "/" ,$dataPage['ruta']);
		$ruta = $dataPage['ruta'];		

		$extFile = strrchr($archivo, '.');//obtengo la extension
		$nombreFile = basename($archivo, $extFile); //obtengo nombre de archivo
		/***************************
		 * BORRA ARCHIVOS ANTERIORES
		***************************/
		//$matchFile =$ruta.substr($archivo, 0, strpos($archivo, "_"))."*.*";
		$matchFile = $ruta.$nombreFile.".*";
		array_map('unlink', glob($matchFile));
		
		$nombre = base64_encode($nombreFile); // Codifico
		$nombre = preg_replace('[=]', '', $nombre);// Elimino el signo = (no es necesario)
		$nombre = str_replace(' ','+',$nombre);// Corrijo los espacios vacios (no es necesario)
		
		if( isset($data['ancho']) && isset($data['alto']) && ( strtoupper($extFile)==".JPG" || strtoupper($extFile)==".PNG" || strtoupper($extFile)==".GIF" ) )
		{
			file_put_contents($ruta."imagenTemporal".$extFile,file_get_contents("php://input"));
			$this->util->redimensionarImagen($ruta."imagenTemporal".$extFile, $ruta.$nombreFile.$extFile, $data['ancho'], $data['alto']);
		}//if($extFile=="JPG" && $extFile=="PNG" && $extFile=="GIF")
		else
		{
			file_put_contents($ruta.$nombreFile.$extFile,file_get_contents("php://input"));
		}		
		//chmod($ruta.$nombreFile.$extFile, 0777);
		return $ruta.$nombreFile.$extFile;
	}
	function getPath($data)
	{
		$result = null;
		try
		{
			$data = $this->util->getPath($data);
			$result=$data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	public function getFiltro($data)
	{
		$result = null;
		try
		{
			$data['page'] = ((isset($data['page'])?$data['page']:1));
			$data['pagerows'] = ((isset($data['pagerows'])?$data['pagerows']:999999));
	
			/**********************************************
			 * LISTA DE COLUMNAS PARA FILTRAR EN LA BROSE *
			**********************************************/
			$data['main_sel_sucu'] = ((isset($data['main_sel_sucu']))?$data['main_sel_sucu']:"");
			$data['main_kysuc'] = ((isset($data['main_kysuc']))?$data['main_kysuc']:"0");
			$select = "";
			foreach ($data as $key=>$value)
			{
				if (strpos($key, "filter_") >-1 && !empty($data[$key]))
				{
					$keyTmp = str_replace('filter_','',$key);
					$data[$keyTmp] = $data[$key];
					unset($data[$key]);
					$select .=" ". str_replace('_','.',$keyTmp)." as ".$keyTmp.",";
				}
			}
			$result = $data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}//public function getListaMix($data=Array(), $return=false)
	public function getLista(&$data)
	{
		$result = null;
		try
		{
			$dtmp = Array();
			$dtmp = $data;
			$dtmp = $this->getListaAlone($dtmp);
			unset($data['sql']);
			$data['lista'] = $dtmp['lista'];
			$data['lista']['dbapp'] = $this->util->get($data, "dbapp");
			$data['lista']['archivo'] = $this->util->get($data, "archivo");
			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );

			$result = $data;
		}
		catch (Exception $e)
		{
			$result["items"]=Array();
		}
		return $result;
	}
	public function getListaAlone($data)
	{
		$result = null;
		try
		{
			if(empty($data['sql'])){$result=false;}
	
			/*************************************
			 * Configuracion de paginacion MYSQL *
			*************************************/
			$data['page'] = $this->util->get($data, "page", 1);
			$data['pagerows'] = $this->util->get($data, "pagerows", 10);
			
			$data['page'] = floatval($data['page'])-1;
			$data['browse']['paging']['pagerows'] = $data['pagerows'];
			// 			$data['pagerows'] = $data['pagerows'];
			$data['start'] = $data['page']*$data['pagerows'];
	
			/************************************
			 * OBTENGO LA CANTIDAD DE REGISTROS *
			 * 
			************************************/
			$sqltmp = $data['sql'];
			if($this->util->get($data, "obtenerRowCount"))
			{
			    $data['sql']="select count(*) rowcount from (".$sqltmp.") as tmp";
			    // 			error_log($data['sql']."\n", 3, "error.log");
			    $data=$this->dbcn->getLista($data);
			    $data['browse']['paging']['rowcount'] = $data['list'][0]['rowcount'];
			}
			else
			{
			    $data['browse']['paging']['rowcount'] = 0;
			}
			/*********************************
			 * SETTING ORDER IN THE BROWSE   *
			*********************************/
			// 			$data['orderColumn'] = ((isset($data['orderColumn']) && !empty($data['orderColumn']))?str_replace('_','.',$data['orderColumn']):"");
			// 			$data['orderColumn'] = ((isset($data['orderColumn']) && !empty($data['orderColumn']))?"tmp.".substr($data['orderColumn'], strpos($data['orderColumn'], ".")+1, strlen($data['orderColumn'])):"");
			// 			$data['orderType'] = ((isset($data['orderType']))?$data['orderType']:"");
			$this->util->get($data,'orderType',"asc");
	
			/***************************
			 * OBTENGO LOS REGISTROS   *
			***************************/
			if($this->util->exist($data,'orderColumn')){$data['sql']="select * from (".$sqltmp.") as tmp order by tmp.".$data['orderColumn']." ".$data['orderType']." limit ".$data['start'].",".$data['pagerows'];}
			else{$data['sql']="select * from (".$sqltmp.") as tmp limit ".$data['start'].",".$data['pagerows'];}
			$data = $this->dbcn->getLista($data);
			if(isset($data['archivo']) && $data['archivo']==""){error_log($this->dbcn->last_query()."\n", 3, "error.log");}
			$data['browse']["items"] = $data['list'];
			unset($data['list']);
			//			error_log($this->dbcn->last_query()."\n", 3, "error.log");
			// 			if(count($data['browse']['items'])>0){
			// 				foreach ($data['browse']['items'] as $row){
			// 					if($tipo=='SELECT'){
			// 						//$row->hing=date('H:i:s', strtotime($row->hing));
			// 						//$row->hsal=date('H:i:s', strtotime($row->hsal));
			// 					}
			// 					$list[]=$row;
			// 				}
			// 			}
// 			$data['browse']['paging']['pagerows'] = ((count($data['browse']['items'])>0)?count($data['browse']['items']):1);
			$data['browse']['paging']['pagecount'] = ceil($data['browse']['paging']['rowcount']/$data['browse']['paging']['pagerows']);
			if($data['browse']['paging']['pagecount']<1)$data['browse']['paging']['pagecount']=1;
			$data['browse']['paging']['page'] = $data['page']+1;
			
			$result['lista'] = $data['browse'];
			$result['msg'] = ((count($data['browse']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
		}
		catch (Exception $e)
		{
			$result["items"]=Array();
		}
		return $result;
	}
	public function execute($data)
	{
		$result = null;
		try
		{
			$data = $this->dbcn->ejecutarConsulta($data);
			$data["msg"]=array("type"=>"success","text"=>"Ejecucion exitosa");
			$result=$data;
		}
		catch (Exception $e)
		{
			$data["msg"]=array("type"=>"error","text"=>$e);
			$result=$data;
		}
		return $result;
	}
	public function ejecutarBatch($data)
	{
		$result = null;
		try
		{
			$data = $this->dbcn->getSql($data);
			$data = $this->dbcn->ejecutarConsulta($data);
			$data["msg"]=array("type"=>"success","text"=>"Ejecucion exitosa");
			$result=$data;
		}
		catch (Exception $e)
		{
			$data["msg"]=array("type"=>"error","text"=>$e);
			$result=$data;
		}
		return $result;
	}	
	public function insert($data, $obj)
	{
		$data['nomObj'] = $obj;
		$data = $this->dbcn->getTabla($data);
		$data['tbl'] = $data['nomObj'];
		$data["dbResp"]='BATCH';
		$data["dbTipo"]='INSERT';
		return $this->ejecutarBatch($data);
	}
	public function delete($data, $obj)
	{
		$data['nomObj'] = $obj;
		$data = $this->dbcn->getTabla($data);
		$data['tbl'] = $data['nomObj'];
		$data["dbResp"]='BATCH';
		$data["dbTipo"]='DELETE';
		return $this->ejecutarBatch($data);			
	}
	public function update($data, $obj)
	{
		$data['nomObj'] = $obj;
		$data = $this->dbcn->getTabla($data);
		$data['tbl'] = $data['nomObj'];
		$data["dbResp"]='BATCH';
		$data["dbTipo"]='UPDATE';
		return $this->ejecutarBatch($data);
	}
	public function procedure($data, $parDbResp="BATCH")
	{
		$data["dbResp"]=$parDbResp;
		$data["dbTipo"]='PROCEDURE';
		return $this->ejecutarBatch($data);
	}
	public function run($archivo,$data)
	{
		$result = null;
		try
		{
			if(isset($archivo) && !empty($archivo))
			{
				$arrArchivo = explode("/", $archivo);
				if(count($arrArchivo)==1)
				{
				    throw new Exception("Controlador no tiene la nomenclatura [carpeta/".$arrArchivo[0]."]");
				}
				$data['dbapp'] = $arrArchivo[0];
				$data['archivo'] = $arrArchivo[1];
			}
			$acceso = true;
			$controller = $this->getController($data);
			if(isset($data['method']) && !empty($data['method']) && strpos($data['archivo'], "Auto") && $data['method']=="index")
			{
				unset($data['method']);
			}//if(isset($data['method']) && !empty($data['method']))
			if(strpos($data['archivo'], "GetLista")<0)
			{
				unset($data['sql']);
			}//if(isset($data['method']) && !empty($data['method']))
					
			//  		error_log($data['archivo']."\n", 3, "error.log");
			if($acceso)
			{
				$methodTmp = ((isset($data['method']) && !empty($data['method']))?$data['method']:'ejecutar');
				if ($controller!=null)
				{
					$method = $controller["reflector"]->getMethod($methodTmp);
					$data = $method->invoke($controller["objeto"], $data);
					$result = $data;
				}
			}//if($acceso)
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	public function getController($data)
	{
		$dataPage['dbapp']   = $data['dbapp'];
		$dataPage['modulo']  = "controllers";
		$dataPage['mainEmp'] = ( isset($_SESSION['com'] ) ? strtoupper($_SESSION['com']['com_dscr']) : "" );
		$dataPage['archivo'] = $data['archivo'];
			
		$dataPage = $this->getPath($dataPage);
	
		$archivo=$dataPage['archivo'];
		$controller = array();
		if (!class_exists($archivo)) {include_once($dataPage['rutaArchivo']);}
	
		$reflector = new ReflectionClass($archivo);
		$objeto = $reflector->newInstance($archivo);
	
		$controller["reflector"] = $reflector;
		$controller["objeto"] = $objeto;
	
		if ($objeto instanceof Controlador)
		{
			return $controller;
		}
		return null;
	}

	/** Load a module view **/
	public function view($dataPage, $vars = array(), $return = FALSE) 
	{
		$this->path = $dataPage['rutaArchivo'];
		$this->ruta = $dataPage['ruta'];
		$this->view = $dataPage['archivo'].".php";
		$this->vars = $vars;
		
		return $this->_ci_load(Array('_ci_view' => $this->path, '_ci_vars' => $this->_ci_object_to_array($this->vars), '_ci_return' => $return));
	}
	
	public function _ci_load($_ci_data) {
	
		extract($_ci_data);
	
		if (empty($_ci_view))
		{
			show_error('Unable to load the requested file: '.$_ci_view);
		}
		if (isset($_ci_vars))
		{
			$this->_ci_cached_vars = array_merge($this->_ci_cached_vars, (array) $_ci_vars);
		}
		extract($this->_ci_cached_vars);
	
		ob_start();
	
		if ((bool) @ini_get('short_open_tag') === FALSE) 
		{
			echo eval('?>'.preg_replace("/;*\s*\?>/", "; ?>", str_replace('<?=', '<?php echo ', file_get_contents($_ci_view))));
		} 
		else 
		{
			include(BASEPATH.$_ci_view);
		}
		if ($_ci_return == TRUE) return ob_get_clean();
	
		ob_end_flush();
	}
	/**
	 * Object to Array
	 *
	 * Takes an object as input and converts the class variables to array key/vals
	 *
	 * @param	object
	 * @return	array
	 */
	protected function _ci_object_to_array($object)
	{
		return (is_object($object)) ? get_object_vars($object) : $object;
	}
	/** 
	 * __call magic method. 
	 */
	public function __call($name, $arguments)
	{
			$this->sendOutput('', array('HTTP/1.1 404 Not Found'));
	}
	/** 
	 * Get URI elements. 
	 * 
	 * @return array 
	 */
	protected function getUriSegments()
	{
    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode( '/', $uri );
    return $uri;
	}
	/** 
	 * Get querystring params. 
	 * 
	 * @return array 
	 */
	protected function getQueryStringParams()
	{
		return parse_str($_SERVER['QUERY_STRING'], $query);
	}
	/** 
	 * Send API output. 
	 * 
	 * @param mixed $data 
	 * @param string $httpHeader 
	 */
	protected function sendOutput($data, $httpHeaders=array())
	{
		header_remove('Set-Cookie');
		if (is_array($httpHeaders) && count($httpHeaders)) {
				foreach ($httpHeaders as $httpHeader) {
						header($httpHeader);
				}
		}
		echo $data;
		exit;
	}
}
?>