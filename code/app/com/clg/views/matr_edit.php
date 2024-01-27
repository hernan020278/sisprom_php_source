<header>Informacion de Matricula</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">

    <input type="hidden" name="mtr_kymtr">
    <input type="hidden" name="mtr_kyprg">
    <input type="hidden" name="mtr_kyalu">
    <input type="hidden" name="mtr_kysuc">
    <input type="hidden" name="mtr_vers">

	<div class="col-md-3">
		<div name="pan_foto" class="col-12" style="border: 1px solid #ccc;"><center><img style="width: 100%" name="img_alu_foto" src=""/></center></div>
		<div class="col-12">
			<div class="input-group input-group-sm">
				<input name="inp_foto" type="file" accept="image/*"/>
			</div>
		</div>
	</div>
	<div class="col-md-9">
		
		<!-- FILA -->
		
		<div class="col-md-4">
			<input type="hidden" name="prg_kyprg">
			<input type="text" name="prg_nomb" class="form-control" placeholder="Programa">
		</div>
		
		<div class="col-md-4">
			<input type="text" name="prg_grad" class="form-control" placeholder="Grado">
		</div>
		
		<div class="col-md-4">
			<input type="text" name="prg_nive" class="form-control" placeholder="Nivel">
		</div>
		
		<!-- FILA -->
		
		<div class="col-md-3">
			<input type="hidden" name="alu_kyusu">
			<input type="text" name="alu_ndoc" class="form-control" placeholder="Nro Documento" title="Nro Documento" tabIndex="">
		</div>
		<div class="col-md-9">
			<input type="text" name="alu_nomb" class="form-control" placeholder="Nombre alumno" title="Nombre alumno" tabIndex="1">
		</div>
			
		<!-- FILA -->

		<div class="col-md-4">
			<input type="text" name="mtr_peri" class="form-control" placeholder="Periodo" title="Periodo" tabIndex="1">
		</div>

		<div class="col-md-4">
			<select name="mtr_turn" class="form-control" placeholder="Turno" title="Turno" tabIndex="1">
				<option value="MAÑANA">MAÑANA</option>
				<option value="TARDE">TARDE</option>
				<option value="NOCHE">NOCHE</option>
			</select>
		</div>

		<div class="col-md-4">
			<input type="hidden" name="aul_kyprp">
			<input type="text" name="aul_prop" class="form-control" placeholder="Aula" title="Aula" tabIndex="1">
		</div>

		<!-- FILA -->

		<div class="col-md-3">
			<input type="text" name="mtr_freg" class="form-control" placeholder="Fecha registro" tabIndex="1">
		</div>
		<div class="col-md-3">
			<input type="text" name="mtr_fini" class="form-control" placeholder="Fecha inicio" tabIndex="1">
		</div>
		<div class="col-md-3">
			<input type="text" name="mtr_ffin" class="form-control" placeholder="Fecha final" tabIndex="1">
		</div>
		<div class="col-md-3">
			<select name="mtr_esta" class="form-control" placeholder="Estado" tabIndex="1">
				<option value="0000">ACTIVO</option>
				<option value="0001">SUSPENDIDO</option>
				<option value="0002">EGRESADO</option>
			</select>
		</div>
		
		<!-- FILA -->
		
	</div>
</div>
<div class="row">
	<div id="gridCursosAlumno"></div>
</div>