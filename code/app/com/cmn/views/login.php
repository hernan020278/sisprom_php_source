<?php
$redirect_url = '';
if(isset($_GET['redirect'])){
	$redirect_url = $_GET['redirect'];
}
?>
<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title> Sisprom - Login</title>
		<meta name="description" content="">
		<meta name="author" content="">
		<base href="<?php echo BASURL?>" />
		<!-- Use the correct meta names below for your web application
			 Ref: http://davidbcalhoun.com/2010/viewport-metatag 
			 
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">-->
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">	
		<link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">

		<!-- SmartAdmin Styles : Please note (smartadmin-production.css) was created using LESS variables -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.css">
				
		<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/demo.css">

		<!-- FAVICONS -->
		<link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">

		<!-- GOOGLE FONT -->
<!-- 	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"> -->
		<style>
		#login #header #logo {
		    margin-left: 0;
		    margin-top: 10px;
		}
		</style>
	</head>
	<body id="login" class="animated fadeInDown">
		<!-- possible classes: minified, no-right-panel, fixed-ribbon, fixed-header, fixed-width-->
		<header id="header">
			<!--<span id="logo"></span>-->

			<div id="logo-group">
				<span id="logo"> <a href=""><img src="/gestion/sisprom/cmn/imagen/sisprom_small.png" alt="SmartAdmin"></a> </span>

				<!-- END AJAX-DROPDOWN -->
			</div>

			<span id="login-header-space"> <span class="hidden-mobile">Aún no esta registrado?</span> <a href="cmn/register" class="btn btn-danger">Crear Cuenta</a> </span>

		</header>

		<div id="main" role="main">

			<!-- MAIN CONTENT -->
			<div id="content" class="container">

				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-7 col-lg-8 hidden-xs hidden-sm">
						<img src="/gestion/sisprom/cmn/imagen/banner.jpg" style="width:100%;">
					</div>
					<div class="col-xs-12 col-sm-12 col-md-5 col-lg-4">
						<div class="well no-padding">
							<form action="cmn/login" id="login-form" class="smart-form client-form" method="POST">
<!-- 						<form action="index.php/cmn/control/ejecutar" id="login-form" class="smart-form client-form" method="POST"> -->
<!-- 							<input type="hidden" name="archivo" value="cmn/login"> -->
								<input type="hidden" name="com_kycom" value="<?php echo $com_kycom?>">
								<input type="hidden" name="pol_kypol" value="<?php echo $pol_kypol?>">
								<header>
									Acceso								
								</header>

								<fieldset>
									<?php
									if($msg['type']=="error")
									{
										echo '<div class="alert alert-danger fade in"><button data-dismiss="alert" class="close">×</button>'.$msg['text'].'</div>';
									}
									?>
									<input type="hidden" name="redirect_url" value="<?php echo $redirect_url?>">
									<input type="hidden" name="t" value="login">
									<section>
										<label class="label">E-mail</label>
										<label class="input"> <i class="icon-append fa fa-user"></i>
											<input style="text-transform: none;" type="text" name="email">
											<b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> Ingrese su email</b></label>
									</section>

									<section>
										<label class="label">Contraseña</label>
										<label class="input"> <i class="icon-append fa fa-lock"></i>
											<input  style="text-transform: none;" type="password" name="password">
											<b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> Ingrese su contraseña</b> </label>
										<div class="note">
											<a href="forgotpassword.html">Olvidaste tu contraseña?</a>
										</div>
									</section>

									<section>
										<label class="checkbox">
											<input type="checkbox" name="remember" checked="">
											<i></i>No Cerrar Sesion</label>
									</section>
								</fieldset>
								<footer>
									<button type="submit" class="btn btn-primary">
										Entrar
									</button>
								</footer>
							</form>

						</div>
						
						<h5 class="text-center"> - By Sisprom -</h5>
															
						<!--<ul class="list-inline text-center">
							<li>
								<a href="javascript:void(0);" class="btn btn-primary btn-circle"><i class="fa fa-facebook"></i></a>
							</li>
							<li>
								<a href="javascript:void(0);" class="btn btn-info btn-circle"><i class="fa fa-twitter"></i></a>
							</li>
							<li>
								<a href="javascript:void(0);" class="btn btn-warning btn-circle"><i class="fa fa-linkedin"></i></a>
							</li>
						</ul>-->
					</div>
				</div>
			</div>

		</div><!-- <div id="main" role="main"> -->

		<!--================================================== -->	

	    <!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
	    <!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>-->
		<script> if (!window.jQuery) { document.write('<script src="js/jquery/jquery-2.0.2.min.js"><\/script>');} </script>

	    <!--<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>-->
		<script> if (!window.jQuery.ui) { document.write('<script src="js/jquery/jquery-ui-1.10.3.min.js"><\/script>');} </script>

		<!-- BOOTSTRAP JS -->		
		<script src="js/bootstrap/bootstrap.min.js"></script>

		<!-- CUSTOM NOTIFICATION -->
		<script src="js/notification/SmartNotification.min.js"></script>

		<!-- JQUERY VALIDATE -->
		<script src="js/jquery-validate/jquery.validate.min.js"></script>
		
		<!-- JQUERY MASKED INPUT -->
		<script src="js/masked-input/jquery.maskedinput.min.js"></script>
		
		<!-- FastClick: For mobile devices -->
		<script src="js/fastclick/fastclick.js"></script>
		
		<!--[if IE 7]>
			
			<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>
			
		<![endif]-->

		<!-- MAIN APP JS FILE -->
		<script src="js/app.js"></script>

		<script type="text/javascript">
			runAllForms();

			$(function() {
				// Validation
				$("#login-form").validate({
					// Rules for form validation
					rules : {
						email : {
							required : true,
							email : true
						},
						password : {
							required : true,
							minlength : 3,
							maxlength : 20
						}
					},

					// Messages for form validation
					messages : {
						email : {
							required : 'Por favor ingrese su direccion de correo electronico',
							email : 'Por favor ingrese una direccion de correo electronico valido'
						},
						password : {
							required : 'Por favor ingrese su contraseña'
						}
					},

					// Do not change code below
					errorPlacement : function(error, element) {
						error.insertAfter(element.parent());
					}
				});
			});
		</script>

	</body>
</html>