<?php 
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
class CtrlRegla extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['reg_kyreg'] = 199;
		$data = $this->run("cmn/CtrlRegla",$data);
		var_dump($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 
 			$this->dbcn->iniciarTransaccion($data, "cmn");
 			
 			if($this->util->get($data,"comando") == "CONECTARAPP" || ( $this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"reg_kyreg","0")=="0" ) )
 			{
 				$dtmp = Array();
 				$dtmp['reg']['reg_kycom'] = $data['reg']['reg_kycom'];
 				$dtmp['reg']['reg_kyprf'] = $data['reg']['reg_kyprf'];
 				$dtmp['reg']['reg_kypol'] = $data['reg']['reg_kypol'];
 				$dtmp = $this->run("cmn/GetListaRegla",$dtmp['reg']);

 				if(count($dtmp['lista']['items'])>0)
 				{
			    $data['reg_kyreg'] = $dtmp['lista']['items'][0]['reg_kyreg'];
			    $data['reg'] = $dtmp['lista']['items'][0];
			    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				}
 				else
 				{
 				  $dtmp = Array();
 				  $dtmp['reg'] = $data['reg'];
 				  $dtmp = $this->insert($dtmp['reg'], "cmn_regla");
 				  $data['reg']['reg_kyreg'] = $dtmp['reg_kyreg'];
 				  $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");
 				}//if(count($data['data']['items'])>0)
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"reg_kyreg")!="0")
 			{
 			    $data['where'] = "where reg_kyreg = '".$data['reg']['reg_kyreg']."'";
 			    $data = $this->update($data, "cmn_regla");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"reg_kyreg")!="0")
 			{
 				foreach ($data['lisKy'] as $key=>$val)
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where reg_kyreg = '".$val['ky']."'";
 					}
 					$data = $this->delete($data, "cmn_regla");
 				}//foreach ($data['lisPrp'] as $key=>$val) 				
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"reg_kyreg")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['reg_kyreg'] = $this->util->get($data,"reg_kyreg");
 			$result['reg'] = $this->util->get($data,"reg");
 			
 			$this->dbcn->finalizarTransaccion();
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>