<?php 
class servicio extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			$data['usu_mail'] = "joseimpknit@gmail.com";
			$data['usu_pass'] = "1234";
			$data = $this->run("cmn/GetListaComunidad",$data);
			if(count($data['lista']['items']) > 0)
			{
				$obj = $data['lista']['items'][0];

				$usu = $this->dbcn->getObjectFromData($obj, "cmn_usuario");
				$com = $this->dbcn->getObjectFromData($obj, "cmn_comunidad");

				if(date('Y-m-d') <= date('Y-m-d',strtotime($usu['usu_ffin'])))
				{
					if($_POST['remember']){
						$_SESSION['sess_expira'] = '32140800'; //~ one year
						$_SESSION['sess_cerrar'] = 'false';
					}
					$_SESSION['usu'] = $usu;
					$_SESSION['com'] = $com;
					$_SESSION['loginValido'] = true;
					$data['msg'] = Array("type"=>"success","text"=>"Usuario se logeo correctamente!!!");
				}
				else{$data['msg'] = Array("type"=>"error","text"=>"El tiempo de prueba del sistema finalizo!!!");}
			}//if(count($data['lista']['items']) == 0)
			else{$data['msg'] = Array("type"=>"error","text"=>"El usuario/email ingresado no coinciden con la contraseña ingresada o no esta registrado");}

			$result = $data;
		} catch (Exception $e) {
			$data['msg'] = Array("type"=>"error","text"=>$e);
			throw $e;
		}
		return $result;
	}
}
?>