<?php 
require_once BASEPATH.'/core/Controlador.php';

class control extends Controlador 
{
	public function __construct() {parent::__construct();}
	
	var $uri, $segments;
	var $config = Array();
	
	public function index()
	{
		$this->config['permitted_uri_chars'] = 'a-z 0-9~%.:_\-\+';
		$this->config['enable_query_strings'] = FALSE;
	
		$this->uri = $this->detectar_uri();
	
		$this->dividir_segmentos();
	
// 		$this->reindexar_segmentos();
		$data = Array();
		if(count($this->segments)==2 || ( count($this->segments)==3 && $this->segments[2]=="index.php" ) )
		{
			$data['dbapp'] = "cmn";
			$data['modulo'] = "controllers";
			$data['archivo'] = "cmn/home";
			$data['method'] = "index";
		}
		else if(count($this->segments)==3 && strpos($this->segments[2], "Auto"))
		{
			$data['dbapp'] = $_SESSION['app']['pol_temp'];
			$data['modulo'] = "controllers";
			$data['archivo'] = $_SESSION['app']['pol_temp']."/".$this->segments[2];
			$data['method'] = "ejecutar";
		}
		else if(count($this->segments)==4)
		{
			$data['dbapp'] = $this->segments[2];
			$data['modulo'] = "controllers";
			$data['archivo'] = $this->segments[2]."/".$this->segments[3];
			$data['method'] = "index";
		}
		else if(count($this->segments)==5)
		{
			$data['dbapp'] = $this->segments[2];
			$data['modulo'] = "controllers";
			$data['archivo'] = $this->segments[2]."/".$this->segments[3];
			$data['method'] = $this->segments[4];
		}
		else if(count($this->segments)==6)
		{
			$data['dbapp'] = $this->segments[2];
			$data['modulo'] = "controllers";
			$data['archivo'] = $this->segments[2]."/".$this->segments[3];
			$data['method'] = $this->segments[4];
			$data['kycom'] = $this->segments[5];
		}
		$this->ejecutar($data);
	}

	public function ejecutar($dataRqst)
	{
		$result = null;
		try
		{
			$is_json = false;			
			$data = $_POST;
			if( count($data) == 0 )
			{
				$data = $_GET;
				$is_post = false;
			}
			if ( ( $dataRqst['archivo']=="cmn/control" && $dataRqst['method']=="ejecutar" ) || ( strpos($dataRqst['archivo'], "Auto") > -1 ) || ( $this->util->get($data, "is_json")=="true" ) ){$is_json=true;}

			$data['mainEmp'] = ( isset($_SESSION['com'] ) ? strtoupper($_SESSION['com']['com_dscr']) : "" );
			
			if(isset($data) && is_array($data))
			{
				$data = array_merge($dataRqst, $data);
				$data = $this->run($data["archivo"], $data);
				
				if($is_json)
				{
    			    // send output
			        $this->sendOutput(
			            json_encode($data),
			            array('Content-Type: application/json', 'HTTP/1.1 200 OK'));
			    
				}
			}
		}
		catch (Exception $e)
		{
			throw $e;
		}
// 		return $result;
	}
	
	public function dividir_segmentos()
	{
		foreach (explode("/", preg_replace("|/*(.+?)/*$|", "\\1", $this->uri)) as $val)
		{
			// Filter segments for security
			$val = trim($this->_filter_uri($val));
	
			if ($val != '')
			{
				$this->segments[] = $val;
			}
		}
		$this->util->segmentourl = $this->segments;
	}
	
	public function reindexar_segmentos()
	{
		array_unshift($this->segments, NULL);
		unset($this->segments[0]);
	}
	
	private function detectar_uri()
	{
		if ( ! isset($_SERVER['REQUEST_URI']) OR ! isset($_SERVER['SCRIPT_NAME']))
		{
			return '';
		}
	
		$dir = dirname($_SERVER['SCRIPT_NAME']);
	
		$uri = $_SERVER['REQUEST_URI'];
		if (strpos($uri, $_SERVER['SCRIPT_NAME']) === 0)
		{
// 			$uri = substr($uri, 0, strlen($_SERVER['SCRIPT_NAME']));
		}
		elseif (strpos($uri, dirname($_SERVER['SCRIPT_NAME'])) === 0)
		{
// 			$uri = substr($uri, 0, strlen(dirname($_SERVER['SCRIPT_NAME'])));
		}
	
		// This section ensures that even on servers that require the URI to be in the query string (Nginx) a correct
		// URI is found, and also fixes the QUERY_STRING server var and $_GET array.
		if (strncmp($uri, '?/', 2) === 0)
		{
			$uri = substr($uri, 2);
		}
		$parts = preg_split('#\?#i', $uri, 2);
		$uri = $parts[0];
		if (isset($parts[1]))
		{
			$_SERVER['QUERY_STRING'] = $parts[1];
			parse_str($_SERVER['QUERY_STRING'], $_GET);
		}
		else
		{
			$_SERVER['QUERY_STRING'] = '';
			$_GET = array();
		}
	
		if ($uri == '/' || empty($uri))
		{
			return '/';
		}
	
		$uri = parse_url($uri, PHP_URL_PATH);
	
		// Do some final cleaning of the URI and return it
		return str_replace(array('//', '../'), '/', trim($uri, '/'));
	}
	public function _filter_uri($str)
	{
		if ($str != '' && $this->config['permitted_uri_chars'] != '' && $this->config['enable_query_strings'] == FALSE)
		{
			// preg_quote() in PHP 5.3 escapes -, so the str_replace() and addition of - to preg_quote() is to maintain backwards
			// compatibility as many are unaware of how characters in the permitted_uri_chars will be parsed as a regex pattern
			if ( ! preg_match("|^[".str_replace(array('\\-', '\-'), '-', preg_quote($this->config['permitted_uri_chars'], '-'))."]+$|i", $str))
			{
				show_error('The URI you submitted has disallowed characters.', 400);
			}
		}
	
		// Convert programatic characters to entities
		$bad	= array('$',		'(',		')',		'%28',		'%29');
		$good	= array('&#36;',	'&#40;',	'&#41;',	'&#40;',	'&#41;');
	
		return str_replace($bad, $good, $str);
	}	
 	public function fileExist($data)
 	{
 		$result = null;
 		try
 		{
 			$data['msg'] = array("type"=>"success","text"=>"Archivo fue encontrado");
 				
 			if($this->util->exist($data,'listaArchivo'))
 			{
 				$dataTmp['listaArchivo'] = Array();
 				foreach ($data['listaArchivo'] as $key=>$val)
 				{
 					$arrFile = explode("/", $val);
				    $data['dbapp']   = ((count($arrFile)>1)?$arrFile[0] : "");
				    $data['archivo'] = ((count($arrFile)>1)?$arrFile[1] : $arrFile[0]);
				    if($this->util->get($data, "modulo") == "ayuda" || $this->util->get($data, "modulo") == "imagen" || $this->util->get($data, "modulo") == "formato" || $this->util->get($data, "modulo") == "audio")
 					{
 						$data = $this->util->getPathExterna($data);
 					}
 					else
 					{
 						$data = $this->getPath($data);
 					}
 					$dataTmp['msg'] = $data['msg'];
 					if($data['msg']['type']=="success"){array_push($dataTmp['listaArchivo'], $data['rutaArchivo']);}
 					else if($data['msg']['type']=="error"){break;}
 				}//foreach ($data['listaArchivo'] as $key=>$val)
 			}//if($this->util->exist($data,'listaArchivo'))
 			else
 			{
 				$data = $this->getPath($data);
 				$dataTmp['path']=$data['path'];
 					
 				if(empty($dataTmp['path'])){$dataTmp['msg'] = array("type"=>"error","text"=>"Archivo ".$dataTmp['path']." no existe!!!");}
 			}
 			echo json_encode($dataTmp); 
 		}
 		catch (Exception $e)
 		{
 			throw $e;
 		}
 		return $result;
 	}
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
}
?>