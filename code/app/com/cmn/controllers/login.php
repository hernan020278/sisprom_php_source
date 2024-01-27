<?php 
class login extends Controlador
{
	public function __construct() {parent::__construct();}
	
	public function index($data)
	{
		$data = $_POST;
		$data = ((is_array($data) && count($data)>0)?$data:$_GET);
		
		$data['com_kycom'] = $this->util->get($_SESSION,"com_kycom",$this->util->get($data,"com_kycom",""));
		$data['pol_kypol'] = $this->util->get($_SESSION,"pol_kypol",$this->util->get($data,"pol_kypol",""));
	
		$page = "login";
		
		switch ($this->util->get($data,"t","logout"))
		{
			case "login":
				$data['SEND'] = "EXT";
				$data = $this->run("cmn/login",$data);
				
				if($data['msg']['type']=="success" && $_SESSION["loginValido"]==true)
				{
					if($this->util->exist($data,"com_kycom") && $this->util->exist($data,"pol_kypol") ){$page = "app";}
					else{$page = "home";}
				}
				break;
			case "logout":
				session_destroy();
				$_SESSION["loginValido"] = false;
				break;
		}//switch ($this->util->get($data,"tipo","LOGIN"))
		switch ($page)
		{
			case "login":
				$this->vista('cmn/login',Array("com_kycom"=>$this->util->get($data, "com_kycom"), "pol_kypol"=>$this->util->get($data ,"pol_kypol"), "msg"=>$this->util->get($data,"msg",Array("type"=>"success","text"=>"Exito"))));
				break;
			case "app":
				header("Location: ".BASURL."cmn/applications/ejecutar/".$data['com_kycom']."-".$data['pol_kypol']);
				break;
			case "home":
				header("Refresh:0;url=".BASURL);
				break;
		}
	}//public function index()

	public function ejecutar($data)
	{
		$result = null;
		try
		{
		    if(SRVFNT == "SRVAPI")
		    {
		        $result = $this->ejecutarAPI($data);
		    }
		    else
		    {
		        $result = $this->ejecutarPHP($data);
		    }
		} catch (Exception $e) {
			$data['msg'] = Array("type"=>"error","text"=>$e);
			throw $e;
		}
		return $result;
	}

	public function ejecutarAPI($data)
	{
		$result = null;
		try
		{
		  $data['remember'] = $_POST['remember'];
			$data['usu_mail'] = $data['email'];
			$data['usu_pass'] = md5($data['password']);
			$data['archivo'] = "cmn/CtrlUsuario";
			$data['comando'] = "VALIDAR_USUARIO";

			$data = $this->util->sendPost($data);

			if($data['msg']['type'] == "success")
			{
			    if($_POST['remember'])
			    {
			        $_SESSION['sess_expira'] = $data['sess_expira'];
			        $_SESSION['sess_cerrar'] = $data['sess_cerrar'];
			    }
			    $_SESSION['usu'] = $data['usu'];
			    $_SESSION['com'] = $data['com'];
			    $_SESSION['loginValido'] = $data['loginValido'];
			}
			$result = $data;
		} catch (Exception $e) {
			$data['msg'] = Array("type"=>"error","text"=>$e);
			throw $e;
		}
		return $result;
	}

	public function ejecutarPHP($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			$tmpUsu = Array("usu" => Array());
			$tmpUsu['prf_nomb'] = "ADMINISTRADOR";
			$tmpUsu['usu_mail'] = $data['email'];
			$tmpUsu['usu_pass'] = md5($data['password']);

			$tmpUsu = $this->run("cmn/GetListaUsuario",$tmpUsu);

			if(count($tmpUsu['lista']['items']) > 0)
			{
			  $obj = $tmpUsu['lista']['items'][0];

				$usu = $this->dbcn->getObjectFromData($obj, "cmn_usuario");
				$com = $this->dbcn->getObjectFromData($obj, "cmn_comunidad");
				
				if(date('Y-m-d') <= date('Y-m-d',strtotime($usu['usu_ffin'])))
				{
					if(isset($_POST['remember'])){
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