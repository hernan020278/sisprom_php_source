<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title> Sisprom - Registrarse </title>
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
<!--	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"> -->
		<style>
		#login #header #logo {
		    margin-left: 0;
		    margin-top: 10px;
		}
		</style>
	</head>
	<body id="login">
		<!-- possible classes: minified, no-right-panel, fixed-ribbon, fixed-header, fixed-width-->
		<header id="header">
			<!--<span id="logo"></span>-->

			<div id="logo-group">
				<span id="logo"> <a href=""><img src="/gestion/sisprom/cmn/imagen/sisprom_small.png" alt="SmartAdmin"></a> </span>

				<!-- END AJAX-DROPDOWN -->
			</div>

			<span id="login-header-space"> <span class="hidden-mobile">Ya esta registrado?</span> <a href="cmn/login" class="btn btn-danger">Ingresar</a> </span>

		</header>

		<div id="main" role="main">

			<!-- MAIN CONTENT -->
			<div id="content" class="container">

				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-7 col-lg-7 hidden-xs hidden-sm">
						<img src="/gestion/sisprom/cmn/imagen/banner.jpg" style="width:100%;">
					</div>
					<div class="col-xs-12 col-sm-12 col-md-5 col-lg-5">
						<div class="well no-padding">
							<form action="cmn/register" id="smart-form-register" class="smart-form client-form" method="POST">
<!-- 						<form action="index.php/cmn/control/ejecutar" id="smart-form-register" class="smart-form client-form" method="POST"> -->
<!-- 							<input type="hidden" name="archivo" value="cmn/GuardarUsuario"> -->
								<input type="hidden" name="t" value="register">
								<header>
									registrate, es GRATIS
								</header>

								<fieldset name="fieForm">
									<?php
									if(isset($msg)) {
										if($msg['type']=="error")
										{
											echo '<div class="alert alert-danger fade in"><button data-dismiss="alert" class="close">×</button>'.$msg['text'].'</div>';
										}
// 										$fd_message = $this->session->flashdata('msg');
// 										$fd_message['type'] = (($fd_message['type']=="error")?"danger":$fd_message['type']);
// 										echo '<div class="alert alert-'.$fd_message['type'].' fade in">
// 											<button data-dismiss="alert" class="close">×</button>
// 											'.$fd_message['text'].'
// 										</div>';
									}
									?>
									<section>
										<label class="input"> <i class="icon-append fa fa-envelope"></i>
											<input type="text" name="usu_mail" placeholder="Direccion de correo electronico">
											<b class="tooltip tooltip-bottom-right">Necesitas verificar su direccion de correo electronico</b> </label>
									</section>

									<section>
										<label class="input"> <i class="icon-append fa fa-lock"></i>
											<input type="password" name="usu_pass" placeholder="Contraseña" id="pass">
											<b class="tooltip tooltip-bottom-right">No olvide su contraseña</b> </label>
									</section>

									<section>
										<label class="input"> <i class="icon-append fa fa-lock"></i>
											<input type="password" name="usu_passConfirm" placeholder="Confirmar contraseña">
											<b class="tooltip tooltip-bottom-right">No olvide su contraseña</b> </label>
									</section>
								</fieldset>

								<fieldset>
									<div class="row">
										<section class="col col-4">
											<label class="input">
												<input type="text" name="usu_ndoc" placeholder="Documento">
											</label>
										</section>
										<section class="col col-8">
											<label class="input">
												<input type="text" name="usu_nomb" placeholder="Nombre">
											</label>
										</section>
									</div>

									<div class="row">
										<section class="col col-6">
											<label class="select">
												<select name="usu_gene">
													<option value="0" selected="" disabled="">Genero</option>
													<option value="M">Masculino</option>
													<option value="F">Femenino</option>
													<option value="O">Prefiero no responder</option>
												</select> <i></i> </label>
										</section>
										<section class="col col-6">
											<label class="input"> <i class="icon-append fa fa-calendar"></i>
												<input type="text" name="usu_fnac" placeholder="Fecha de nacimiento" class="datepicker" data-dateformat='yy-mm-dd'>
											</label>
										</section>
									</div>

									<section>
										<label class="checkbox">
											<input type="checkbox" name="subscription" id="subscription">
											<i></i>Quiero recibir noticias y ofertas especiales</label>
										<label class="checkbox">
											<input type="checkbox" name="terms" id="terms">
											<i></i>Acepto los <a href="policies/terms/" target="_blank">Condiciones de Servicio</a> y la <a href="policies/privacy/" target="_blank">Politica de privacidad</a> de Sisprom</label>
									</section>
								</fieldset>
								<footer>
									<button type="submit" class="btn btn-primary">
										Registrarse
									</button>
								</footer>

								<div class="message">
									<i class="fa fa-check"></i>
									<p>
										Gracias por registrarse!
									</p>
								</div>
							</form>

						</div>
						<!--<p class="note text-center">*FREE Registration ends on October 2015.</p>-->
						<h5 class="text-center">- By Sisprom -</h5>
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

		</div>
	    <!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
	    <script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
		<script> if (!window.jQuery) { document.write('<script src="js/jquery/jquery-2.0.2.min.js"><\/script>');} </script>

	    <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
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
			var testResponse = null;
			// Model i agree button
			$("#i-agree").click(function(){
				$this=$("#terms");
				if($this.checked) {
					$('#myModal').modal('toggle');
				} else {
					$this.prop('checked', true);
					$('#myModal').modal('toggle');
				}
			});
			
			// Validation
			$(function() {
				// Validation
				$("#smart-form-register").validate({

					// Rules for form validation
					rules : {						
						usu_mail : {
							required : true,
							email : true
						},
						usu_pass : {
							required : true,
							minlength : 3,
							maxlength : 20
						},
						usu_passConfirm : {
							required : true,
							minlength : 3,
							maxlength : 20,
							equalTo : '#pass'
						},
						usu_nomb : {
							required : true
						},
						usu_gene : {
							required : true
						},
						terms : {
							required : true
						}
					},

					// Messages for form validation
					messages : {
						usu_mail : {
							required : 'Por favor ingrese una direccion de correo electronico',
							email : 'Por favor ingrese una direccion de correo electronico VALIDA'
						},
						usu_pass : {
							required : 'Por favor ingrese una contraseÃ±a'
						},
						usu_passConfirm : {
							required : 'Por favor ingrese su contraseÃ±a una vez mas',
							equalTo : 'Por favor las dos contraseÃ±as deben ser iguales'
						},
						usu_nomb : {
							required : 'Por favor ingrese sus nombres'
						},
						usu_gene : {
							required : 'Por favor ingrese su genero'
						},
						terms : {
							required : 'Debes aceptar los terminos y condiciones de Sisprom'
						}
					},

					// Ajax form submition
//					submitHandler : function(form) {
//						$(form).ajaxSubmit({
//							success : function(response) {
//								response = eval("("+response+")");
//								if(response.msg.type=='success'){
//									$("#smart-form-register").addClass('submited');
//									//window.location='http://localhost/sisprom/code/cmn/login';
//								}
//								else{
//									$('[name=fieForm]').prepend('<div class="alert alert-danger fade in"><button data-dismiss="alert" class="close">×</button>'+response.msg.text+'</div>');
//								}
//							}
//						});
//					},

					// Do not change code below
					errorPlacement : function(error, element) {
						error.insertAfter(element.parent());
					}
				});

			});
		</script>

	</body>
</html>