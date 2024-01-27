<?php 
class register extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = $_POST;
		if($this->util->exist($_SESSION,"registerValido"))
		{
			$_SESSION['registerValido'] = false;
			$this->vista("cmn/register");
		}
		else
		{
			switch ($this->util->get($data,"t","logout"))
			{
				case "register":
					$data['SEND'] = "EXT";
					$data = $this->run("cmn/register",$data);

					if($data['msg']['type']=="success")
					{
						header("Refresh:0;url=".BASURL."cmn/login");
					}
					else
					{
						$this->vista("cmn/register",Array("msg"=>$data['msg']));						
					}
					break;
				case "logout":
					session_destroy();
					$_SESSION["registerValido"] = false;
					$this->vista("cmn/register");
// 					redirect(BASURL."cmn/register");
					break;
			}//switch ($this->util->get($data,"tipo","LOGIN"))
		}//if(!isset($this->session->userdata["registerValido"]))
	}//public function index()
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
			
			$dtmp = Array();
			$dtmp['usu']['usu_kyusu'] = "0";
			$dtmp['usu']['usu_mail'] = $data['usu_mail'];
			$dtmp['usu']['usu_tdoc'] = "DNI";
			$dtmp['usu']['usu_ndoc'] = $data['usu_ndoc'];
			$dtmp['usu']['usu_nomb'] = $data['usu_nomb'];
			$dtmp['usu']["usu_pass"] = md5($data["usu_pass"]);
			$dtmp['usu']['usu_tipo'] = "ADMINISTRADOR";
			$dtmp['usu']['usu_fcre'] = date("Y-m-d H:i:s");
			$dtmp['usu']['usu_fmod'] = date("Y-m-d H:i:s");
			$dtmp['usu']['usu_fini'] = date("Y-m-d H:i:s");
			$dtmp['usu']['usu_ffin'] = $this->util->agregarDias(date("Y-m-d H:i:s"),30);
			$dtmp['usu']['usu_esta'] = "0001";
			$dtmp['comando'] = "AGREGAR";
			$dtmp = $this->run("cmn/CtrlUsuario",$dtmp);
			$data['usu'] = $dtmp['usu'];
			$data['usu_kyusu'] = $dtmp['usu_kyusu'];
			$data['msg'] = $dtmp['msg'];
			
			if($dtmp['msg']['type']=="success")
			{
			  $arrComNomb = explode(" ", $data["usu_nomb"]);
		    $dtmp = Array();
		    $dtmp['com']['com_kycom'] = "0";
		    $dtmp['com']['com_kyusu'] = $data['usu_kyusu'];
		    $dtmp['com']['com_ndoc'] = $data["usu_ndoc"];
		    $dtmp['com']['com_nomb'] = strtoupper($data["usu_nomb"]);
		    $dtmp['com']['com_dscr'] = trim($data["usu_ndoc"]).trim(strtoupper($arrComNomb[0]));
				$dtmp['com']['com_cfec'] = date("Y-m-d H:i:s");
				$dtmp['com']['com_mfec'] = date("Y-m-d H:i:s");
				$dtmp['com']['com_esta'] = "0001";
				$dtmp['comando'] = "AGREGAR";
				$dtmp = $this->run("cmn/CtrlComunidad",$dtmp);
				$data['com'] = $dtmp['com'];
				$data['com_kycom'] = $dtmp['com_kycom'];
				$data['msg'] = $dtmp['msg'];
				
				$dtmp = Array();
				$dtmp['usu']['usu_kyusu'] = $data['usu_kyusu'];
				$dtmp['usu']['usu_kycom'] = $data['com_kycom'];
				$dtmp['comando'] = "MODIFICAR";
				$dtmp = $this->run("cmn/CtrlUsuario",$dtmp);
				$data['msg'] = $dtmp['msg'];
				/** **********************************************
				 * Creacion de la politica del applicativo CUENTA
				 *************************************************/
		    $dtmp = Array();
		    $dtmp['pol']['pol_kypol'] = 0;
		    $dtmp['pol']['pol_tipo'] = "MENU";
		    $dtmp['pol']['pol_nomb'] = "CUENTA";
		    $dtmp['pol']['pol_dscr'] = "Cuenta";
		    $dtmp['pol']['pol_imin'] = "cuenta_small.jpg";
		    $dtmp['pol']['pol_imax'] = "cuenta_large.jpg";
		    $dtmp['pol']['pol_temp'] = "cmn";
		    $dtmp['pol']['pol_nive'] = 1;
		    $dtmp['pol']['pol_trig'] = "OPEN";
		    $dtmp['pol']['pol_esta'] = "0001";
		    $dtmp['comando'] = "AGREGAR";
		    $dtmp = $this->run("cmn/CtrlPolitica",$dtmp);
		    $data['pol'] = $dtmp['pol'];
		    $data['pol_kypol'] = $dtmp['pol_kypol'];
		    $data['msg'] = $dtmp['msg'];

				$dtmp = Array();
				$dtmp['cap']['cap_kycap'] = "0";
				$dtmp['cap']['cap_kycom'] = $data['com']['com_kycom'];
				$dtmp['cap']['cap_kyusu'] = $data['usu']['usu_kyusu'];
				$dtmp['cap']['cap_kyapp'] = $data['pol']['pol_kypol'];
				$dtmp['comando'] = "AGREGAR";
				$dtmp = $this->run("cmn/CtrlComapp",$dtmp);
				$data['cap'] = $dtmp['cap'];
				$data['cap_kycap'] = $dtmp['cap_kycap'];
				$data['msg'] = $dtmp['msg'];

				$dtmp = Array();
				$dtmp['comando'] = "AGREGAR";
				$dtmp['prf']['prf_kyprf'] = "0";
				$dtmp['prf']['prf_nomb'] = "ADMINISTRADOR";
				$dtmp = $this->run("cmn/CtrlPerfil",$dtmp);
				$data['prf'] = $dtmp['prf'];
				$data['prf_kyprf'] = $dtmp['prf_kyprf'];
				$data['msg'] = $dtmp['msg'];
				
				$dtmp = Array();
				$dtmp['comando'] = "AGREGAR";
				$dtmp['rol']['rol_kyrol'] = "0";
				$dtmp['rol']['rol_kycom'] = $data['com_kycom'];
				$dtmp['rol']['rol_kyusu'] = $data['usu_kyusu'];
				$dtmp['rol']['rol_kyprf'] = $data['prf_kyprf'];
				$dtmp = $this->run("cmn/CtrlRoles",$dtmp);
				$data['rol'] = $dtmp['rol'];
				$data['rol_kyrol'] = $dtmp['rol_kyrol'];
				$data['msg'] = $dtmp['msg'];
				
				$dtmp = Array();
				$dtmp['comando'] = "AGREGAR";
				$dtmp['reg']['reg_kyreg'] = 0;
				$dtmp['reg']['reg_kycom'] = $data['com_kycom'];
				$dtmp['reg']['reg_kyprf'] = $data['prf_kyprf'];
				$dtmp['reg']['reg_kypol'] = $data['pol_kypol'];
				$dtmp = $this->run("cmn/CtrlRegla",$dtmp);
				$data['reg'] = $dtmp['reg'];
				$data['reg_kyreg'] = $dtmp['reg_kyreg'];
				$data['msg'] = $dtmp['msg'];

				$_SESSION['registerValido'] = true;
			}
			else
			{
			    $_SESSION['registerValido'] = false;
			}
            $result['usu'] = $data['usu'];
			$result['msg'] = $data['msg'];
		} catch (Exception $e) {
			$data['msg'] = Array("type"=>"error","text"=>$e);
			throw $e;
		}
		return $result;
	}//public function ejecutar($data)
}
?>