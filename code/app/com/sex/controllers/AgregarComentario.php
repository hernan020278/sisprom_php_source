<?php 
class AgregarComentario extends Controlador
{
	public function __construct() {
		parent::__construct();
	}
	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 

 			$dtmp = Array();
			$dtmp['usu_kycom'] = $_SESSION['com']['com_kycom'];
			$dtmp['usu_tipo'] = 'PAR';
			$dtmp['usu_tdoc'] = 'DNI';
			$dtmp['usu_nomb'] = $data['usu_nomb'];
 			 			
 			$data = $this->run("cmn/GetListaUsuario",$data);
 			if(count($data['lista']['items'])>0){$data['usu_kyusu'] = $data['lista']['items'][0]['usu_kyusu'];}
 			else
 			{
 				$dtmp['comando'] = "AGREGAR";
 				$dtmp = $this->run("CtrlUsuario",$dtmp);
 				$data['cme_kyusu'] = $dtmp['usu_kyusu'];
 			}
 			$data = $this->insert($data, "sex_comentario");
 			
 			$dtmp = Array();
 			$dtmp['cme_kypdr'] = $data['cme_kypdr'];
 			$dtmp = $this->run("GetListaComentario",$dtmp);
 			
			$result = $dtmp['lista']['paging'];
			$result['cme'] = $this->dbcn->getObjectFromData($data, "comentario");
			$result['cme']['usu_nomb'] = $data['usu_nomb'];
 			$result['msg'] = array("type"=>"success","text"=>"Exito en el registro!!!");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>