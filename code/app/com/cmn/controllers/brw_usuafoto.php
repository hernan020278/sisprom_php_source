<?php 
class brw_usuafoto extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['usu_kycom'] = $_SESSION['com']['com_kycom'];
 			$data = $this->run("cmn/GetListaUsuarioFoto",$data);

 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>