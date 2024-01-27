<input type="hidden" name="usu_kyusu">
<input type="hidden" name="emp_kyusu">
<input type="hidden" name="usu_vers">
<header>Informacion de Profesor</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">
	<div class="col-md-3">
		<div name="pan_foto" class="col-12" style="border: 1px solid #ccc;"><center><img style="width: 100%" name="img_usu_foto" src=""/></center></div>
		<div class="col-12">
			<div class="input-group input-group-sm">
				<input name="inp_foto" type="file" accept="image/*"/>
				<input type="text" name="usu_foto" class="form-control" placeholder="Imagen" title="" tabindex=""/>
				<span class="input-group-btn">
					<button name="btnLoadClgEntFoto" class="btn btn-info" placeholder="Seleccion" title="" tabindex="1"><i class="fa fa-search"></i></button>
				</span>
			</div>
		</div>
	</div>
	<div class="col-md-9">
		
		<!-- FILA -->
		
		<div class="col-md-3">
			<input type="text" name="usu_codi" class="form-control" placeholder="Codigo" title="ent" tabindex="1">
		</div>
		<div class="col-md-9">
			<input type="text" name="usu_nomb" class="form-control" placeholder="Nombre / Razon Social" title="ent" tabindex="1">
		</div>

		<!-- FILA -->
		
		<div class="col-md-3">
	    	<select name="usu_tdoc" class="form-control" placeholder="Tipo Documento" title="ent" tabindex="1">
				<option value="DNI">DNI</option>
				<option value="RUC">RUC</option>
			</select>
		</div>
		<div class="col-md-5">
			<input type="text" name="usu_ndoc" class="form-control" placeholder="Nro Documento" title="ent" tabindex="1">
		</div>
		<div class="col-md-4">
			<input type="text" name="usu_tele" class="form-control" placeholder="Telefono" title="ent" tabindex="1">
		</div>
		
		<!-- FILA -->
		
		<div class="col-md-12">
			<input type="text" name="usu_dire" class="form-control" placeholder="Direcci&oacute;n" title="ent" tabindex="1">
		</div>
	</div>
</div>
<div class="row">
	<div id="gridCursosProfesor"></div>
</div>