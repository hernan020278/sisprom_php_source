<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title><?php if(isset($title)) echo $title; else echo "Google";?></title>
		<?php if(isset($metadata['description'])):?><meta name="description" content="<?php echo $metadata['description']?>"><?php endif;?>
		<?php if(isset($metadata['description'])):?><meta name="keywords" content="<?php echo $metadata['keywords']?>"><?php endif;?>
		<meta name="author" content="Sisprom S.R.L.">
		<base href="<?php echo BASURL?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo BASURL?>css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo BASURL?>css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo BASURL?>css/smartadmin-production.css">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo BASURL?>css/datatable/jquery.dataTables.css">
		<link rel="stylesheet" type="text/css" media="screen" href="<?php echo BASURL?>css/demo.css">
		<link rel="shortcut icon" href="<?php echo BASURL?>img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="<?php echo BASURL?>img/favicon/favicon.ico" type="image/x-icon">
<!-- 	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"> -->
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-status-bar-style" content="black">
		<link rel="apple-touch-startup-image" href="<?php echo BASURL?>img/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
		<link rel="apple-touch-startup-image" href="<?php echo BASURL?>img/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
		<link rel="apple-touch-startup-image" href="<?php echo BASURL?>img/splash/iphone.png" media="screen and (max-device-width: 320px)">
		<script src="<?php echo BASURL?>js/jquery/jquery-2.0.2.min.js"></script>
		<script src="<?php echo BASURL?>js/jquery/jquery-ui-1.10.3.min.js"></script>
	</head>
	<body class="hidden-menu fixed-header fixed-navigation">
		<?php 
		if(isset($template["header"])){
			echo $template["header"];
		} 
		?>
		<!-- END HEADER -->
		<!-- BODY -->
		<?php 
		if(isset($template["body"])){
			echo $template["body"];
		} 
		?>
		<ul id="cm_GlobalGrid" class="dropdown-menu" role="menu" style="display: none;">
			<li><a tabindex="-1" id="cm_GlobalGrid_deta" href="javascript:void(0);">Ver</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_mail" href="javascript:void(0);">Enviar Mail</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_pend" href="javascript:void(0);">Pendientes</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_dant" href="javascript:void(0);">Anteriores</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_ingr" href="javascript:void(0);">Ingresar</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_edit" href="javascript:void(0);">Editar</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_vpad" href="javascript:void(0);">Lista Superior</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_vhij" href="javascript:void(0);">Lista Interna</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_apro" href="javascript:void(0);">Aprobar</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_anul" href="javascript:void(0);">Anular</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_canj" href="javascript:void(0);">Canjear</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_dele" href="javascript:void(0);">Eliminar</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_prin" href="javascript:void(0);">Imprimir</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_stck" href="javascript:void(0);">Stock</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_gevl" href="javascript:void(0);">Evaluacion</a></li>
			<li><a tabindex="-1" id="cm_GlobalGrid_gasi" href="javascript:void(0);">Asistencia</a></li>
		</ul>
		
		<!-- END BODY -->
		<script src="<?php echo BASURL?>js/mask/jquery.mask.min.js"></script>
		<script src="<?php echo BASURL?>js/bootstrap/bootstrap.min.js"></script>
<!--	<script src="<?php echo BASURL?>js/notification/SmartNotification.min.js"></script> -->
		<script src="<?php echo BASURL?>js/notification/SmartNotification.js"></script>
		<script src="<?php echo BASURL?>js/fastclick/fastclick.js"></script>
		<script src="<?php echo BASURL?>js/blockUI/jquery.blockUI.js"></script>
		<script src="<?php echo BASURL?>js/contextjs/context.js"></script>
		<script src="<?php echo BASURL?>js/moment/moment-with-locales.js"></script>
		<script src="<?php echo BASURL?>js/requirejs/require.js"></script>
		<script src="<?php echo BASURL?>js/evalmath.js"></script>
		<script src="<?php echo BASURL?>js/theme.js"></script>
		<script src="<?php echo BASURL?>js/demo.js"></script>

		<script src="<?php echo BASURL?>app/com/cmn/scripts/sisem.js"></script>
		
		<script type="text/javascript">
		  var PRVDECIPREC = 2;
		  var PRVDECIVIEW = 2;
		  var PRVIGV = 18;
		  var GLBDECIMAL = 2;
			var gIdLoc=0;
			var gIdSuc=0;
			var gIdAlm=0;
			var repo;
			var pres;
			var base_url= '<?php echo BASURL?>';
			var estado	= null;
			var strDia 	= new Array();
			var fechor = '';

			var ln = {};
			var lm = {};
			var opcionMenu = {};
			var nombreMenu = '';
			var tituloMenu = '';
			
			strDia[0]="DOMINGO";
			strDia[1]="LUNES";
			strDia[2]="MARTES";
			strDia[3]="MIERCOLES";
			strDia[4]="JUEVES";
			strDia[5]="VIERNES";
			strDia[6]="SABADO";
			var strMes = Array();
			strMes[0]="0";
			strMes[1]="ENERO";
			strMes[2]="FEBRERO";
			strMes[3]="MARZO";
			strMes[4]="ABRIL";
			strMes[5]="MAYO";
			strMes[6]="JUNIO";
			strMes[7]="JULIO";
			strMes[8]="AGOSTO";
			strMes[9]="SEPTIEMBRE";
			strMes[10]="OCTUBRE";
			strMes[11]="NOVIEMBRE";
			strMes[12]="DICIEMBRE";
			//http://www.md5online.es/
			estado = {
				"":{label:'<span class="label label-danger"><i class="fa fa-times"></i></span>',text:'VACIO'},
				"0000":{label:'<span class="label label-danger"><i class="fa fa-times"></i></span>',text:'SINESTADO'},
				"0001":{label:'<span class="label label-success"><i class="fa fa-thumbs-up"></i></span>',text:'APROBADO'},
				"0002":{label:'<span class="label label-default"><i class="fa fa-square-o "></i></span>',text:'PENDIENTE'},
				"0003":{label:'<span class="label label-danger"><i class="fa  fa-times"></i></span>',text:'ANULADO'},
				"0004":{label:'<span class="label label-danger"><i class="fa  fa-times"></i></span>',text:'RECHAZADO'},
				"0215":{label:'<span class="label label-success"><i class="fa fa-thumbs-up"></i></span>',text:'APROBADO'},
				"0216":{label:'<span class="label label-danger"><i class="fa fa-thumbs-down"></i></span>',text:'DESAPROBADO'},
				"0217":{label:'<span class="label label-danger"><i class="fa fa-circle-o"></i></span>',text:'MODIFICADO'},
				"0218":{label:'<span class="label label-danger"><i class="fa fa-circle-o"></i></span>',text:'REFERENCIADO'},
				"0219":{label:'<span class="label label-danger"><i class="fa fa-circle-o"></i></span>',text:'ENCREDITO'},
				"0220":{label:'<span class="label label-danger"><i class="fa fa-circle-o"></i></span>',text:'CANCELADO'},
				"0221":{label:'<span class="label label-warning"><i class="fa fa-refresh"></i></span>',text:'ENPROCESO'},
				"0222":{label:'<span class="label label-success"><i class="fa fa-square"></i></span>',text:'ENTREGADO'},
				"0223":{label:'<span class="label label-info"><i class="fa fa-edit"></i></span>',text:'FACTURADO'},
				"0224":{label:'<span class="label label-primary"><i class="fa fa-money"></i></span>',text:'PAGADO'},
				"0225":{label:'<span class="label label-primary"><i class="fa fa-lock"></i></span>',text:'FINALIZADO'},
				"0226":{label:'<span class="label label-success"><i class="fa fa-lock"></i></span>',text:'ACTIVO'},
				"0227":{label:'<span class="label label-warning"><i class="fa fa-lock"></i></span>',text:'CESADO'},
				"0228":{label:'<span class="label label-info"><i class="fa fa-lock"></i></span>',text:'VACACIONES'},
				"0229":{label:'<span class="label label-primary"><i class="fa fa-lock"></i></span>',text:'TRASLADO'},
				"0230":{label:'<span class="label label-primary"><i class="fa fa-lock"></i></span>',text:'COTIZADO'}
			};
		
			tipOpe = {
				'0001':'COMPRA',
				'0002':'VENTA',
				'0003':'TRA-ALM',
				'0004':'SAL-INI',
				'0005':'COT-PRO',
				'0006':'PED-PRO',
				'0007':'ING-ALM',
				'0008':'EGR-ALM',
				'0009':'COT-CLI',
				'0010':'PED-CLI',
				'0011':'CTR-CAJ',
				'0012':'CTR-CTA',
				'0013':'PRE-EMP',
				'0014':'RETIRO',
				'0015':'DEPOSITO',
				'0016':'TRANSFERENCIA',
				'0017':'PAGO',
				'0018':'COBRO',
				'0019':'APERTURA',
				'0020':'CAJA',//Se agrego nuevo para relacionar con documentos en CAJA 
				'0021':'GASTO'
			};
			lisDocByOpe = {
				'0001' : Array('0017','0021','0022','0023','0019','0024'),
				'0002' : Array('0001','0002','0003'),
				'0003' : Array('0005','0006','0007'),
				'0004' : Array('0005'),
				'0005' : Array('0009','0016'),
				'0006' : Array('0010'),
				'0007' : Array('0005','0007'),
				'0008' : Array('0006','0018'),
				'0009' : Array('0011'),
				'0010' : Array('0014','0012'),
				'0011' : Array('0001','0002','0003','0004','0017','0019'),
				'0012' : Array('0013','0015','0020'),
				'0014' : Array('0013'),//Documentos de RETIRO
				'0015' : Array('0013'),//Documentos de DEPOSITO
				'0016' : Array('0013'),//Documentos de TRANSFERENCIA
				'0017' : Array('0029'),//Documentos de PAGO
				'0018' : Array('0029'),//Documentos de COBRO
				'0019' : Array('0029'),//Documentos de APERTURA
				'0020' : Array('0013','0029')//Documentos para operaciones de CAJA
			};
			tipCaBa = {
				'0001' : 'CAJA',
				'0002' : 'BANCO',
				'0003' : 'FINANCIERA',
				'0004' : 'TIENDA',
				'0005' : 'ALMACEN',
				'0006' : 'COBRANZA DE CAMPO',
				'0007' : 'LOCA'
			};
			tipCta = {
				'0001' : 'AHORRO',
				'0005' : 'SUELDO',
				'0004' : 'CTS',
				'0002' : 'CREDITO',
				'0003' : 'CORRIENTE',
				'0006' : 'M',
				'0007' : 'S'
			};
			forPag = ['CONTADO', 'CREDITO', 'EFECTIVO', 'DEPOSITO', 'CHEQUE', 'TRANSFERENCIA'];
			colorInputHTML = {
				'ROJO': {colorBorde: '#ff0000', colorFondo: '#ffe6e6'},
				'VERDE': {colorBorde: '#006600', colorFondo: '#ccffcc'},
				'CELESTE': {colorBorde: '#2DA098', colorFondo: '#8BFFF6'},
				'NARANJA': {colorBorde: '#00ff00', colorFondo: '#ccffcc'},
				'AMARILLO': {colorBorde: '#CBCB00', colorFondo: '#FFFF00'},
				'BLANCO': {colorBorde: '#CCCCCC', colorFondo: '#FFFFF'},
				'PLOMO': {colorBorde: '#CCCCCC', colorFondo: '#EEEEEE'},
			};
			genColor = {
				'CELESTE'  : '#87FAEE',
				'AZUL'     : '#2E2EFE',
				'ROJO'	   : '#ff0000',
				'CAFE'	   : '#FF8000',
				'INFO'	   : '#57889c',
				'NARANJA'    : '#b1811d',
				'WARN'     : '#b1811d',
				'VERDE'    : '#009900',
				'ENABLED'  : '#b1811d',
				'DISABLED' : '#b1811d',
				'success'  : '#659265',
				'error'	   : '#900323',
				'info'	   : '#57889c',
				'warning'  : '#b1811d',
				'anterior' : '#ff6600',
				'ingreso'  : '#009900',
				'egreso'   : '#ff0000',
				'costo'    : '#663300',
				'utilidad' : '#0000ff',
				'bordeerror': '#ff0000',
				'backerror': '#ffe6e6',		 
				'bordewarning': '#00ff00',
				'backwarning': '#ccffcc',
				'bordesuccess': '#006600',
				'backsuccess': '#ccffcc',
				'bordeenabled': '#CCCCCC',
				'backenabled': '#FFFFF',
				'bordedisabled': '#CCCCCC',
				'backdisabled': '#EEEEEE'																
			};
		</script>
	</body>
</html>
