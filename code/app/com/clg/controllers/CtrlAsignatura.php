<?php 
class CtrlAsignatura extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['asg_kyasg'] = 199;
		$data = $this->run("CtrlAsignatura",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"asg_kyasg","0")=="0")
			{
				$dtmp = Array();
				$dtmp['asg_kymtr'] = $data['asg_kymtr'];
				$dtmp['asg_kypfo'] = $data['pfo_kyusu'];
				$dtmp['asg_nomb'] = $data['asg_prop'];
				$dtmp['asg_esta'] = "0001";
				
				$dtmp = $this->run("clg/GetListaAsignatura",$dtmp);
					
				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
					$data['asg_kypfo'] = $data['pfo_kyusu'];
					$data['asg_kyevl'] = $data['evl_kyprp'];
					$data['asg_nomb'] = $data['asg_prop'];
					$data['asg_esta'] = "0001";
					
					$data = $this->insert($data, "clg_asignatura");
					$data['asg'] = $this->dbcn->getObjectFromData($data, "clg_asignatura");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				$this->dbcn->iniciarTransaccion($data);

				$data['asg_kypfo'] = $data['pfo_kyusu'];
				$data['asg_kyevl'] = $data['evl_kyprp'];
				$data['asg_nomb'] = $data['asg_prop'];

				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where asg_kyasg='".$data['asg_kyasg']."'";
				}
				$data = $this->update($data, "clg_asignatura");
				
				$this->dbcn->finalizarTransaccion($data);
					
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				$this->dbcn->iniciarTransaccion($data);

				foreach ($data['lisKy'] as $key=>$val)
				{
					$data['where'] = "where nta_kyasg = '".$val['ky']."'";
					$data = $this->delete($data, "mus_nota");
					
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where asg_kyasg = '".$val['ky']."'";
					}
					$data = $this->delete($data, "clg_asignatura");
				}//foreach ($data['lisPrp'] as $key=>$val)

				$this->dbcn->finalizarTransaccion();

			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
				$this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['asg'] = $this->util->get($data,"asg");
			$result['asg_kyasg'] = $this->util->get($data,"asg_kyasg");
			
			$this->dbcn->finalizarTransaccion();
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>