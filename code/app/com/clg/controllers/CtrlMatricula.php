<?php 
class CtrlMatricula extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['mtr_kymtr'] = 199;
		$data = $this->run("CtrlMatricula",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
			
			$this->dbcn->iniciarTransaccion($data);
				
			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"mtr_kymtr","0")=="0")
			{
				$dtmp = Array();
				$dtmp['mtr_kyalu'] = $data['alu_kyusu'];
				$dtmp['mtr_esta'] = "0001";
				
				$dtmp = $this->run("clg/GetListaMatricula",$dtmp);

				if(count($dtmp['lista']['items'])>0)
				{
				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
				    $data['mtr_kymtr'] = $dtmp['lista']['items'][0]['mtr_kymtr'];
				    $data['mtr'] = $dtmp['lista']['items'][0];
				}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
				    $data['mtr_kycom'] = $_SESSION['com']['com_kycom'];
				    $data['mtr_kysuc'] = $data['main_kysuc'];
					$data['mtr_kyalu'] = $data['alu_kyusu'];
					$data['mtr_aula'] = $data['aul_prop'];
					$data['mtr_esta'] = "0001";
					
					$data = $this->insert($data, "clg_matricula");
					$data['mtr'] = $this->dbcn->getObjectFromData($data, "clg_matricula");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				$data['mtr_kysuc'] = $data['main_kysuc'];
				$data['mtr_kyalu'] = $data['alu_kyusu'];
				$data['mtr_aula'] = $data['aul_prop'];
				
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where mtr_kymtr='".$data['mtr_kymtr']."'";
				}
				$data = $this->update($data, "clg_matricula");
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					$data['where'] = "where nta_kymtr = '".$val['ky']."'";
					$data = $this->delete($data, "mus_nota");
					
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where mtr_kymtr = '".$val['ky']."'";
					}
					$data = $this->delete($data, "clg_matricula");
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
			    
			    $data = $this->run("clg/CargarMatricula",$data);
			    $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)." Se genero bien el pdf");
			    
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['mtr'] = $this->util->get($data,"mtr");
			$result['mtr_kymtr'] = $this->util->get($data,"mtr_kymtr");
			
			$this->dbcn->finalizarTransaccion();
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>