<?php 
class CtrlRoles extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}
	public function uploadFile($data)
	{
		$data['modulo'] = "images";
		$data['pathFile']=$this->upload($data);
		$data["msg"]=array("type"=>"success","text"=>"Archivo subido satisfactorio");
		echo json_encode($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 
 			$this->dbcn->iniciarTransaccion($data);
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"rol_kyrol","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['rol']['rol_kycom'] = $data['rol']['rol_kycom'];
 				$dtmp['rol']['rol_kyusu'] = $data['rol']['rol_kyusu'];
 				$dtmp['rol']['rol_kyprf'] = $data['rol']['rol_kyprf'];
 				
 				$dtmp = $this->run("cmn/GetListaRoles",$dtmp['rol']);
 				
 				if(count($dtmp['lista']['items'])>0)
 				{
 				   $data['rol_kyrol'] = $dtmp['lista']['items'][0]['rol_kyrol'];
 				   $data['rol'] = $dtmp['lista']['items'][0];
 				   $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				}
 				else
 				{
 				  $dtmp = Array();
 				  $dtmp['rol'] = $data['rol'];
 				  $dtmp = $this->insert($dtmp['rol'], "cmn_roles");
 				  $data['rol']['rol_kyrol'] = $dtmp['rol_kyrol'];
 				  $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"rol_kyrol")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"rol_kyrol")!="0")
 			{
				$data['where'] = "where rol_kyrol='".$data['rol_kyrol']."'";
				$data = $this->update($data, "cmn_roles");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"rol_kyrol")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR")
 			{
		        foreach ($data['lisKy'] as $key=>$val)
		        {
		            if($val['prf_nomb']!="ADMINISTRADOR" && $val['prf_nomb']!="USUARIO")
		            {
		                if($this->util->get($data,"where")=="")
		                {
		                    $data['where'] = "where rol_kyrol='".$val['rol_kyrol']."'";
		                }
		                $data = $this->delete($data, "cmn_roles");
		            }
		            else
		            {
		                $data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\n!No puede ser eliminado!");
		            }
		        }//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"rol_kyrol")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nNo hay comando accion o verificar clave");
 			}
 			
 			$result['msg'] = $data['msg'];
 			$result['rol_kyrol'] = $this->util->get($data,"rol_kyrol");
 			$result['rol'] = $this->util->get($data,"rol");

 			$this->dbcn->finalizarTransaccion();
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>