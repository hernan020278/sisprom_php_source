<?php 
class CtrlPrograma extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['prg_kyprg'] = 199;
		$data = $this->run("CtrlPrograma",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
			
			$this->dbcn->iniciarTransaccion($data);
			
			$data['prg_nomb'] = $data['prg_prop'];
			$data['prg_grad'] = $data['gra_prop'];
			
			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prg_kyprg","0")=="0")
			{
				$dtmp = Array();
				$dtmp['prg_nomb'] = $data['prg_nomb'];
				$dtmp['prg_grad'] = $data['prg_grad'];
				$dtmp['prg_nive'] = $data['prg_nive'];
				
				$dtmp = $this->run("clg/GetListaPrograma",$dtmp);

				if(count($dtmp['lista']['items'])>0)
				{
				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
				    $data['prg_kyprg'] = $dtmp['lista']['items'][0]['prg_kyprg'];
				    $data['prg'] = $dtmp['lista']['items'][0];
				}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
				    $data['prg_kycom'] = $_SESSION['com']['com_kycom'];
					$data['prg_esta'] = "0001";
					
					$data = $this->insert($data, "clg_programa");
					$data['prg'] = $this->dbcn->getObjectFromData($data, "clg_programa");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where prg_kyprg='".$data['prg_kyprg']."'";
				}
				$data = $this->update($data, "clg_programa");
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					$data['where'] = "where prg_kyprg = '".$val['ky']."'";
					$data = $this->delete($data, "clg_programa");
				}//foreach ($data['lisPrp'] as $key=>$val)
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
			    $this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "CARGAREXCEL")
			{
			    $data['modulo'] = "carga";
			    $data['archivoExcel'] = $this->upload($data);
			    
			    $data = $this->run("clg/CargarPrograma",$data);
			    $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)." Se genero bien el pdf");
			    
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['prg'] = $this->util->get($data,"mtr");
			$result['prg_kyprg'] = $this->util->get($data,"prg_kyprg");
			
			$this->dbcn->finalizarTransaccion();
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>