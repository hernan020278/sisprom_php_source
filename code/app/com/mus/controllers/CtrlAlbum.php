<?php 
class CtrlAlbum extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['alb_kyalb'] = 199;
		$data = $this->run("CtrlAlbum",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"alb_kyalb","0")=="0")
			{
				$dtmp = Array();
				$dtmp['alb_kycom'] = $_SESSION['com']['com_kycom'];
				$dtmp['alb_tipo'] = $data['alb_tipo'];
				$dtmp['alb_nomb'] = $data['alb_nomb'];
				
				$dtmp = $this->run("mus/GetListaAlbum",$dtmp);
					
				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
					$data['alb_kycom'] = $_SESSION['com']['com_kycom'];
					$data['alb_kyusu'] = $_SESSION['usu']['usu_kyusu'];
					$data['alb_kysuc'] = $_SESSION['suc']['suc_kysuc'];
					$data['alb_esta'] = "0001";
					
					$data = $this->insert($data, "mus_album");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				$this->dbcn->iniciarTransaccion($data);

				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where alb_kyalb='".$data['alb_kyalb']."'";
				}
				$data = $this->update($data, "mus_album");
					
				$this->dbcn->finalizarTransaccion($data);
					
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				$this->dbcn->iniciarTransaccion($data);

				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where alb_kyalb = '".$val['ky']."'";
					}
					$data = $this->delete($data, "mus_album");
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
			$result['alb_kyalb'] = $this->util->get($data,"alb_kyalb");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>