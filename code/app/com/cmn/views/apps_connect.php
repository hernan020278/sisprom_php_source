<!DOCTYPE html>
<html lang="en-us">
	<head>
		<meta charset="utf-8">
		<title>Conectar</title>
		<base href="<?php echo BASURL?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">

		<!-- Basic Styles -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/bootstrap.min.css">	
		<link rel="stylesheet" type="text/css" media="screen" href="css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin-production.css">
		<link rel="stylesheet" type="text/css" media="screen" href="css/demo.css">

		<!-- page related CSS -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/lockscreen.css">

		<!-- FAVICONS -->
		<link rel="shortcut icon" href="img/favicon/favicon.ico" type="image/x-icon">
		<link rel="icon" href="img/favicon/favicon.ico" type="image/x-icon">
		<!-- GOOGLE FONT -->
<!-- 	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700"> -->
	</head>
	<body>

		<div id="main" role="main">

			<!-- MAIN CONTENT -->

			<form class="lockscreen animated flipInY" method="post" action="">
				<input type="hidden" name="process_conexion_app">
				<div class="logo">
					<h1 class="semi-bold"><img style="width:150px;" src="/gestion/sisprom/cmn/imagen/sisprom_large.png" alt="" /></h1>
				</div>
				<div>
					<?php 
					if($userdata['msg']!=null):
					if(count($userdata['msg']) > 0 && $userdata['msg']['type']=="error"):
					?>
					<div class="alert alert-danger">
						<?php echo $userdata['msg']['text']; ?>
					</div>
					<?php 
					endif;
					endif;?>
					<img src="<?php echo $userdata['app']['pol_imin']?>" alt="" width="120" height="120" />
					<div>
						<h1>
							<div class="pull-right" style="opacity:1">
								<img src="img/avatars/sunny-big.png" alt="" width="40" height="40" />
							</div><?php echo $userdata['app']['pol_dscr']?> 
							<small><i class="fa fa-user text-muted"></i> &nbsp;<?php echo $userdata['usu']['usu_nomb']?></small></h1>
					<?php if($listaComunidad!=null):?>
						<div class="input-group">
							<select name="com_kycom" class="form-control">
								<option value="">Seleccionar Comunidad</option>
							<?php foreach($listaComunidad as $com): ?>
								<option value="<?php echo $com['com_kycom']?>"><?php echo ($com['com_ndoc']." ".$com['com_nomb'])?></option>
							<?php endforeach; ?>
							</select>
						</div>
						<hr />
						<button type="submit" class="btn btn-primary">Conectar</button>
						<a href="<?php echo BASURL?>" class="btn btn-default">Cancelar</a>
					<?php else: ?>
						Usted no tiene ninguna comunidad <br />
						<a href="<?php echo BASURL?>">Crear una nueva comunidad</a>
					<?php endif; ?>
					</div>

				</div>
				<!--<p class="font-xs margin-top-5">
					Copyright SmartAdmin 2014-2020.
				</p>-->
			</form>

		</div>
	</body>
</html>