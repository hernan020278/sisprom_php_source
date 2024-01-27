<input type="hidden" name="cdu_kycdu">
<input type="hidden" name="cdu_vers">
<header>Informacion de Cedula</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">
	<div class="col-md-3">
		<div name="pan_foto" class="col-12" style="border: 1px solid #ccc;"><center><img name="img_foto" src=""/></center></div>
		<div class="col-12">
			<div class="input-group input-group-sm">
				<input name="inp_foto" type="file" accept="image/*"/>
				<input type="text" name="prf_foto" class="form-control" placeholder="Imagen" title="" tabindex=""/>
				<span class="input-group-btn">
					<button name="btnLoadFoto" class="btn btn-info" placeholder="Seleccion" title="" tabindex="1"><i class="fa fa-search"></i></button>
				</span>
			</div>
		</div>
	</div>
	<div class="col-md-9">
		
		<!-- FILA -->
		<div class="col-md-3">
			<input type="hidden" name="prf_kyusu">
			<input type="text" name="prf_ndoc" class="form-control" placeholder="Nro Documento" title="cdu" tabindex="1">
		</div>
		<div class="col-md-9">
			<input type="text" name="prf_nomb" class="form-control" placeholder="Nombre alumno" title="cdu" tabindex="1">
		</div>
		
		<!-- FILA -->
		
		<div class="col-md-4">
			<input type="text" name="cdu_fing" class="form-control" placeholder="__/__/____" title="cdu" tabindex="1">
		</div>
		<div class="col-md-5">
			<input type="hidden" name="asg_kyprp">
			<input type="text" name="asg_prop" class="form-control" placeholder="Asignatura" title="cdu" tabindex="1">
		</div>
		<div class="col-md-3">
			<input style="text-align: right;" type="text" name="cdu_sue" class="form-control" placeholder="0.00" title="cdu" tabindex="1">
		</div>
		
		<!-- FILA -->

		<div class="col-md-12">
			<input type="text" name="cdu_dscr" class="form-control" placeholder="Descripcion" title="cdu" tabindex="1">
		</div>
		
		<!-- FILA -->
		
	</div>
</div>
<div class="row">
	<div id="gridCursos"></div>
</div>