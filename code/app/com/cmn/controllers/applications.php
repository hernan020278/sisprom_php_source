<?php
class applications extends Controlador
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
			$comApp = $data['kycom'];
			$arrComApp = explode("-", $comApp);
			$data['com_kycom'] = $this->util->get($arrComApp,0,"");
			$data['pol_kypol'] = $this->util->get($arrComApp,1,"");
			if (count($arrComApp) == 2) {
        if (isset($_GET['email']) && isset($_GET['password'])) {

          $data['email'] = $_GET['email'];
          $data['password'] = $_GET['password'];
          $data = $this->run("cmn/login", $data);
        }

        if (isset($_SESSION['loginValido']) && $_SESSION['loginValido'] == true) {
          $this->ingresarAplicativo($data);
        } else {
          $_SESSION['com_kycom'] = $arrComApp[0];
          $_SESSION['pol_kypol'] = $arrComApp[1];
          header("Refresh:0;url=" . BASURL . "cmn/login");
        }
      }
			else{echo "la url proporcionada es invalida";}
		}
		catch (Exception $e)
		{
			throw $e;
		}
		return $result;
	}
	
	public function ingresarAplicativo($data){

	    $result = null;
	    try
	    {
	        $dtmp = Array();
	        $dtmp['reg_kycom'] = $data['com_kycom'];
	        $dtmp['reg_kypol'] = $data['pol_kypol'];
	        $dtmp['prf_nomb'] = ($_SESSION['usu']['usu_kycom'] == $data['com_kycom']) ? "ADMINISTRADOR" : "USUARIO";
	        $dtmp['usu_kyusu'] = $_SESSION['usu']['usu_kyusu'];
	        $dtmp = $this->run("cmn/GetListaRegla",$dtmp);
	        
	        if(count($dtmp['lista']['items'])==0){
	            echo "No cuentas con los permisos necesarios para acceder a esta app en esta comunidad";
	        }
	        else
	        {
	            $obj = $dtmp['lista']['items'][0];
	            
	            $data['com'] = $this->dbcn->getObjectFromData($obj, "cmn_comunidad");
	            $data['app'] = $this->dbcn->getObjectFromData($obj, "cmn_politica");
	            $data['usu'] = $this->dbcn->getObjectFromData($obj, "cmn_usuario");
	            $data['prf'] = $this->dbcn->getObjectFromData($obj, "cmn_perfil");
	            /************************************************************************
	             * Creamos la sucursal principal de la empresa
	             ************************************************************************/
	            $dtmp = Array();
	            $dtmp['comando'] = "AGREGAR";
	            $dtmp['suc_kysuc'] = "0";
	            $dtmp['suc_kyusu'] = $data['usu']['usu_kyusu'];
	            $dtmp['suc_kycom'] = $data['com']['com_kycom'];
	            $dtmp['suc_nomb'] = $data['com']['com_kycom']. "SUC".substr(strtoupper($data['usu']['usu_nomb']), 0, 5);
	            $dtmp['suc_tipo'] = "0004";
	            $dtmp = $this->run("adm/CtrlSucursal",$dtmp);
	            $data['suc'] = $dtmp['suc'];
	            
	            /************************************************************************
	             * Creamos el apertura y cierre principal para gestionar las operaciones
	             ************************************************************************/
	            $dtmp = Array();
	            $dtmp['comando'] = "AGREGAR";
	            $dtmp['apc_kyapc'] = "0";
	            $dtmp['apc_kycom'] = $data['com']['com_kycom'];
	            $dtmp['apc_kyusu'] = $data['usu']['usu_kyusu'];
	            $dtmp['apc_kysuc'] = $data['suc']['suc_kysuc'];
	            $dtmp['apc_fini'] = date('Y-m-d');
	            $dtmp['apc_ffin'] = date('Y-m-d');
	            $dtmp = $this->run("adm/CtrlAperturacierre",$dtmp);
	            $data['apc'] = $dtmp['apc'];
	            
	            $_SESSION['com'] = $data['com'];
	            $_SESSION['app'] = $data['app'];
	            $_SESSION['suc'] = $data['suc'];
	            $_SESSION['apc'] = $data['apc'];
	            
	            $template = array();
	            $template["header"] = $this->vista('cmn/header', array("userdata"=>$_SESSION, 'pol_user'=>$data['app']), true);
	            if (file_exists(URLFTP."sisprom/code/app/com/".$data['app']['pol_temp']."/views/body.php"))
	            {
	                $template["body"] = $this->vista($data['app']['pol_temp']."/body", array("userdata"=>$_SESSION, 'pol_user'=>$data['app']), true);
	            }
	            else
	            {
	                $template["body"] = $this->vista("cmn/body", array("userdata"=>$_SESSION, 'pol_user'=>$data['app']), true);
	            }
	            $this->vista("cmn/template",array("userdata"=>$_SESSION,"template"=>$template));
	        }
	    }
	    catch (Exception $e)
	    {
	        throw $e;
	    }
	    return $result;
	}
	
	public function p($data)
	{
		if(isset($data['kycom']))
		{
			$dtmp = Array();
			$dtmp['pol_kypol'] = $data['kycom'];
			$dtmp = $this->run("cmn/GetListaPolitica",$dtmp);
			if(count($dtmp['lista']['items'])>0)
			{
			    $datb = Array();
			    $datb['modulo']  = "imagen";
			    $datb['dbapp'] = "cmn";
			    
			    $datb['archivo'] = $dtmp['lista']['items'][0]['pol_imin'];
			    $datb = $this->util->getPathExterna($datb);
			    $dtmp['lista']['items'][0]['pol_imin'] = $datb['rutaArchivo'];
			    
			    $datb['archivo'] = $dtmp['lista']['items'][0]['pol_imax'];
			    $datb = $this->util->getPathExterna($datb);
			    $dtmp['lista']['items'][0]['pol_imax'] = $datb['rutaArchivo'];
			    
			    $_SESSION['app'] = $dtmp['lista']['items'][0];
				$template = array();
				$template["header"] = $this->vista('cmn/header', Array("userdata"=>$_SESSION), true);
				$template["body"] = $this->vista('cmn/apps_details', Array("userdata"=>$_SESSION), true);
				$this->vista("cmn/template",array("userdata"=>$_SESSION,"template"=>$template));
			}
			else
			{
				echo "La app soliicitada no existe";
			}
		}else{
			echo "la url proporcionada es invalida";
		}
	}
	public function connect($data)
	{	
		if(isset($_SESSION['loginValido']))
		{
			$msg = Array("type"=>"success","text"=>"Se inicia la conexion");
			if(isset($data['kycom']))
			{
				$data['pol_kypol'] = $data['kycom'];
				if(isset($data['process_conexion_app']))
				{
					$msg = Array();
					if($data['com_kycom']==''){$msg = Array("type"=>"error","text"=>"Debe seleccionar una comunidad");}
					else
					{
						$dtmp = Array();
						$dtmp['pol']['pol_kypol'] = $data['pol_kypol'];
						$dtmp = $this->run("cmn/GetListaPolitica",$dtmp['pol']);
						if(count($dtmp['lista']['items'])>0)
						{
						  $data['app'] = $this->dbcn->getObjectFromData($dtmp['lista']['items'][0], "cmn_politica");
						}

						$dtmp = Array();
						$dtmp['com']['com_kycom'] = $data['com_kycom'];
						$dtmp = $this->run("cmn/GetListaComunidad",$dtmp['com']);
						if(count($dtmp['lista']['items']) > 0)
						{
						  $data['com'] = $this->dbcn->getObjectFromData($dtmp['lista']['items'][0], "cmn_comunidad");
						}
						    
					    $dtmp = Array();
					    $dtmp['cap']['cap_kycap'] = "0";
					    $dtmp['cap']['cap_kyusu'] = $_SESSION['usu']['usu_kyusu'];
					    $dtmp['cap']['cap_kycom'] = $data['com']['com_kycom'];
					    $dtmp['cap']['cap_kyapp'] = $data['app']['pol_kypol'];
					    $dtmp['comando'] = "AGREGAR";
					    $dtmp = $this->run("cmn/CtrlComapp",$dtmp);
					    $data['cap'] = $dtmp['cap'];
					    $data['cap_kycap'] = $dtmp['cap_kycap'];
					    $data['msg'] = $dtmp['msg'];
					    
					    $dtmp = Array();
					    $dtmp['prf']['prf_kyprf'] = "0";
					    $dtmp['prf']['prf_nomb'] = ($_SESSION['usu']['usu_kyusu'] == $data['com']['com_kyusu']) ? "ADMINISTRADOR" : "USUARIO";
					    $dtmp['prf']['prf_dscr'] = ($_SESSION['usu']['usu_kyusu'] == $data['com']['com_kyusu']) ? "Perfil Administrador" : "Perfil Usuario";
					    $dtmp['comando'] = "AGREGAR";
					    $dtmp = $this->run("cmn/CtrlPerfil",$dtmp);
					    $data['prf'] = $dtmp['prf'];
					    $data['prf_kyprf'] = $dtmp['prf_kyprf'];
					    $data['msg'] = $dtmp['msg'];
					    
					    $dtmp = Array();
					    $dtmp['rol']['rol_kyrol'] = 0;
					    $dtmp['rol']['rol_kycom'] = $data['com']['com_kycom'];
					    $dtmp['rol']['rol_kyusu'] = $_SESSION['usu']['usu_kyusu'];
					    $dtmp['rol']['rol_kyprf'] = $data['prf_kyprf'];
					    $dtmp['comando'] = "AGREGAR";
					    $dtmp = $this->run("cmn/CtrlRoles",$dtmp);
					    $data['rol'] = $dtmp['rol'];
					    $data['rol_kyrol'] = $dtmp['rol_kyrol'];
					    $data['msg'] = $dtmp['msg'];
					    
					    $dtmp = Array();
					    $dtmp['reg']['reg_kyreg'] = 0;
					    $dtmp['reg']['reg_kycom'] = $data['com_kycom'];
					    $dtmp['reg']['reg_kyprf'] = $data['prf_kyprf'];
					    $dtmp['reg']['reg_kypol'] = $data['pol_kypol'];
					    $dtmp['comando'] = "AGREGAR";
					    $dtmp = $this->run("cmn/CtrlRegla",$dtmp);
					    $data['reg'] = $dtmp['reg'];
					    $data['reg_kyreg'] = $dtmp['reg_kyreg'];
					    $data['msg'] = $dtmp['msg'];
						
						header("Location: ".BASURL."cmn/applications/ejecutar/".$data['com_kycom']."-".$data['pol_kypol']);
					}
				}
				else 
				{
					if( isset($_SESSION['usu']) && isset($_SESSION['com']) )
					{
						$dtmp = Array();
						$dtmp = $this->run("cmn/GetListaComunidad",$dtmp);

						$_SESSION['msg']=$msg;
						$_SESSION['crearComunidad']=true;
						$this->vista('cmn/apps_connect',Array("userdata"=>$_SESSION, "listaComunidad"=>$dtmp['lista']['items']));
					}
				}
			}else{
				echo "la url proporcionada es invalida";
			}
		}else{
			header("Location: ".'http://'.$_SERVER["SERVER_NAME"]."/sisprom/code");
		}
	}
	public function admin_app(){
		$this->vista('cmn/admin_app');
	}
	public function grid_myapps(){
		$this->vista('cmn/grid_myapps');
	}
	public function ayuda($data)
	{
		$result = null;
		try
		{
			$paginaBuscada = $this->util->get($data, "paginaBuscada", "");
			$data = Array(
				"dbapp" => "cmn",
				"modulo" => "controllers",
				"archivo" => "BuildMenuAyuda",
				"method" => "ejecutar",
				"pol_nive" => "1"
			);
			$data = $this->run("cmn/BuildMenuAyuda",$data);
			Util::getInst()->listaMenu = $data['mn'];
			$data['paginaBuscada'] = $paginaBuscada;
			
 			$template = Array();
 			$template["header"] = $this->vista("cmn/encabezado", Array("userdata"=>Array(), 'pol_user'=>""), true);
 			$template["body"] = $this->vista("cmn/cuerpo", Array("userdata"=>$data, 'pol_user'=>""), true);

 			$this->vista("cmn/template",Array("userdata"=>Array(),"template"=>$template));
		}
		catch (Exception $e)
		{
			throw $e;
		}
		return $result;
	}
}
?>