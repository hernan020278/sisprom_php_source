<?php
//Clase que implementa el servidor del webservice
 
//incluye el archivo de la clase anterior, con los métodos suma y resta
require_once('Operaciones.php');
 
//instancia del servidor, el parámetro es el archivo "archivoDefinicionWS.wsdl"// que crearemos a continuación
$server = new SoapServer("archivoDefinicionWS.wsdl");
 
//asigna la clase al servicio
$server->setClass('Operaciones');
 
//atiende los llamados al webservice
$server->handle();
?>