<?php 
class CtrlComentario extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index(){}
	
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cme_kycme","0")=="0")
			{
				$dtmp = Array();
				$dtmp['usu_kycom'] = $_SESSION['com']['com_kycom'];
				$dtmp['usu_tipo'] = 'PAR';
				$dtmp['usu_tdoc'] = 'DNI';
				$dtmp['usu_nomb'] = $data['usu_nomb'];
				
				$data = $this->run("cmn/GetListaUsuario",$data);
				if(count($data['lista']['items'])>0){$dtmp['usu_kyusu'] = $data['lista']['items'][0]['usu_kyusu'];}
				else
				{
					$dtmp['comando'] = "AGREGAR";
					$dtmp = $this->run("CtrlUsuario",$dtmp);
				}
				
				$data['cme_kyusu'] = $dtmp['usu_kyusu'];
				$data = $this->insert($data, "sex_comentario");
				
				$dtmp = Array();
				$dtmp['cme_kypdr'] = $data['cme_kypdr'];
				$dtmp = $this->run("GetListaComentario",$dtmp);
				
				$result = $dtmp['lista']['paging'];
				$result['cme'] = $this->dbcn->getObjectFromData($data, "comentario");
				$result['cme']['usu_nomb'] = $data['usu_nomb'];
				$result['msg'] = array("type"=>"success","text"=>"Exito en el registro!!!");				
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where cme_kycme='".$data['cme_kycme']."'";
				}
				$data = $this->update($data, "erp_comentario");
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				$this->dbcn->iniciarTransaccion($data);

				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where cme_kycme = '".$val['cme_kycme']."' or cme_kypdr='".$val['cme_kycme']."'";
						$data['cme_kypdr'] = $val['cme_kypdr'];
					}
					$data = $this->delete($data, "erp_comentario");
				}//foreach ($data['lisPrp'] as $key=>$val)

				$this->dbcn->finalizarTransaccion();

			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['cme_kycme'] = $this->util->get($data,"cme_kycme");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	public function uploadFimg($data)
	{
		$data['modulo'] = "images";
		$data['pathFile']=$this->upload($data);
		$data["msg"]=array("type"=>"success","text"=>"Archivo subido satisfactorio");
		echo json_encode($data);
	}
	public function agregarEntidadDeUsuario($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
			$data['msg'] = Array("type"=>"success","Exito");
	
			$dtmp = Array();
			$dtmp['usu_tipo'] = $this->util->get($data, "usu_tipo");
			$dtmp['usu_mail'] = $this->util->get($data, "usu_mail");
			$dtmp = $this->run("cmn/GetListaEntidad",$dtmp);
			if(count($dtmp['lista']['items'])>0)
			{
				$data['usu_kyusu'] = $dtmp['lista']['items'][0]['usu_kyusu'];
				$data['msg'] = Array("type"=>"error","El correo ya existe");
			}
	
			if($data['msg']['type']=="success")
			{
				$data = $this->insert($data, "cmn_usuario");
			}
			$result = $data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>