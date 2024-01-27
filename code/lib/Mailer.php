<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
// Incluimos el archivo fpdf
require_once APPPATH."/libraries/PHPMailer.php";
require_once APPPATH."/libraries/Util.php";
 
//Extendemos la clase Pdf de la clase fpdf para que herede todas sus variables y funciones
class Mailer extends PHPMailer 
{
	public function sendLocal($correoDestino, $asunto, $body, $fileAttachment="")
	{
		error_log("Servidor : ".$_SERVER['SERVER_NAME']."\n", 3, "error.log");
		if($_SERVER['SERVER_NAME']!="localhost")
		{
			$this->IsSMTP();
			
			//Sustituye (ServidorDeCorreoSMTP)  por el host de tu servidor de correo SMTP
			$this->Host 		= "mail.sisprom.org";
			$this->Port       	= 25;
			$this->SMTPDebug	= 1; // debugging: 1 = errors and messages, 2 = messages only
			
			//Sustituye  ( CuentaDeEnvio )  por la cuenta desde la que deseas enviar por ejem. prueba@domitienda.com
			$this->From     = "hernan020278@sisprom.org";
			$this->FromName = "Sistema Gestion";
			$this->Subject  = $asunto;
			$this->AltBody  = "Leer";
			$this->MsgHTML($body);
			
			// Sustituye  (CuentaDestino )  por la cuenta a la que deseas enviar por ejem. usuario@destino.com
			$this->AddAddress($correoDestino,'');
			// 		$this->AddAttachment($fileAttachment);
			$this->SMTPAuth = true;
			
			// Sustituye (CuentaDeEnvio )  por la misma cuenta que usaste en la parte superior en este caso  prueba@midominio.com  y sustituye (ContraseñaDeEnvio)  por la contraseña que tenga dicha cuenta
			
			$this->Username = "hernan020278@sisprom.org";
			$this->Password = "HERmen020278";
			
			$this->Send();
		}
		return true;
	}
	public function sendgmail($correoDestino, $asunto, $body, $fileAttachment="")
	{
// 		$mail = new PHPMailer() ;
	
		$this->IsSMTP();
	
		//Sustituye (ServidorDeCorreoSMTP)  por el host de tu servidor de correo SMTP
		$this->Host 		= "smtp.gmail.com";
		$this->Port       	= 465;
		$this->SMTPAuth 	= true;
		$this->SMTPSecure 	= "ssl";
		$this->SMTPDebug 	= 1; // debugging: 1 = errors and messages, 2 = messages only
	
		//Sustituye  ( CuentaDeEnvio )  por la cuenta desde la que deseas enviar por ejem. prueba@domitienda.com
		$this->From     = "hernan020278@gmail.com";
		$this->FromName = "Hernan Mendoza";
		$this->Subject  = $asunto;
		$this->AltBody  = "Leer";
		$this->MsgHTML($body);
	
		//Sustituye  (CuentaDestino )  por la cuenta a la que deseas enviar por ejem. usuario@destino.com
		$this->AddAddress($correoDestino,'');
		$this->SMTPAuth = true;
	
		//Sustituye (CuentaDeEnvio )  por la misma cuenta que usaste en la parte superior en este caso  prueba@midominio.com  y sustituye (ContraseñaDeEnvio)  por la contraseña que tenga dicha cuenta
		$this->Username = "hernan020278@gmail.com";
		$this->Password = "HERmen020278";

		if($this->Send()){return true;}
		else{return false;}
	}
}
?>