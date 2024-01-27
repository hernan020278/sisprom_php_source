<?php 
class CtrlAyuda extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['mtr_kymtr'] = 199;
		$data = $this->run("CtrlAyuda",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "ABRIRARCHIVOLOCAL")
			{
				$this->execInBackground($_SERVER['DOCUMENT_ROOT'].$data['archivo_local']);
				$data['msg'] = Array("type"=>"success","text"=>"Se abre archivo");
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['mtr_kymtr'] = $this->util->get($data,"mtr_kymtr");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	public function execInBackground($cmd) {
	    if (substr(php_uname(), 0, 7) == "Windows"){ 
	        pclose(popen("start /B ". $cmd, "r"));  
	    } 
	    else { 
	        exec($cmd . " > /dev/null &");   
	    } 
	}	
}
?>