<?php
//Clase que implementa el servidor del webservice
 
//incluye el archivo de la clase anterior, con los m�todos suma y resta
require_once('Operaciones.php');
 
//instancia del servidor, el par�metro es el archivo "archivoDefinicionWS.wsdl"// que crearemos a continuaci�n
$server = new SoapServer("archivoDefinicionWS.wsdl");
 
//asigna la clase al servicio
$server->setClass('Operaciones');
 
//atiende los llamados al webservice
$server->handle();
?>