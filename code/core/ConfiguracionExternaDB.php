<?php
// Company name to find the database
// 	define('SRVFNT', "SRVAPI");
define('SRVFNT', "SRVPHP");

$GLOBALS['VEREMP'] = true;
$GLOBALS['KYAPP'] = 0;
$GLOBALS['DBCONF'] = Array(
		"cmn"=>Array(
				"DBHOST"=>"localhost",
				"DBNAME"=>"impkni_sisprom",
				"DBUSER"=>"impkni",
				"DBPASS"=>"AQPimperial0927"
		),
		"adm"=>Array(
				"DBHOST"=>"localhost",
				"DBNAME"=>"impkni_sisprom",
				"DBUSER"=>"impkni",
				"DBPASS"=>"AQPimperial0927"
		),
		"mus"=>Array(
				"DBHOST"=>"localhost",
				"DBNAME"=>"impkni_sisprom",
				"DBUSER"=>"impkni",
				"DBPASS"=>"AQPimperial0927"
		),
);
define('DBHOST', "localhost");
define('DBNAME', "impkni");
define('DBUSER', "impkni");
define('DBPASS', "AQPimperial0927");
define('BASURL', "/sisprom/code/");
	
require_once '../sisprom/code/core/Controlador.php';
?>