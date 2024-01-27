<input type="hidden" name="usu_kyusu">
<input type="hidden" name="usu_vers">
<header>Informacion de Transportista</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<div class="col-md-2">
    	<select class="form-control" name="usu_tdoc"  placeholder='Doc' tabindex='1'>
			<option value="DNI">DNI</option>
			<option value="RUC">RUC</option>
		</select>
	</div>
	<div class="col-md-3">
		<input type="text" name="usu_ndoc" class="form-control" title='ent'  placeholder='Numero' tabindex='2'>
	</div>
	<div class="col-md-7">
		<input type="text" name="usu_nomb" class="form-control" title='ent'  placeholder='Nombre' tabindex='3'>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<input name="usu_dire" class="form-control" title='ent'  placeholder='Direcci&oacute;n' tabindex='6'>
	</div>
</div>
<div class="row">
	<div class="col-md-4">
		<input type="text" name="usu_mpla" class="form-control" title='ent'  placeholder='Marca / Placa' tabindex='7'>
	</div>
	<div class="col-md-4">
		<input type="text" name="usu_cins" class="form-control" title='ent'  placeholder='Certificado Inscripcion' tabindex='8'>
	</div>
	<div class="col-md-4">
		<input type="text" name="usu_lcon" class="form-control" title='ent'   placeholder='Licencia de Conducir' tabindex='9'>
	</div>
</div>
<div class="row">
	<div class="col-md-4">
		<img name="img_foto" src=""/>
		<input name="inp_foto" type="file" accept="image/*"/>
		<input name="usu_foto" type='text' class="form-control pull-left" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>
		<button name="btnLoadFoto" class="btn btn-primary pull-left" style="width: 50px; margin-top:0px; margin-bottom:0px;"><span class="icon-document-alt-stroke"></span>Imagen</button>
	</div>
	<div class="col-md-8">
		<div class="table-responsive">
			<table name="gridItemCon" class="table table-bordered">
				<thead>
					<tr>
						<th colspan='4'><button name="btnAddCon" class="btn btn-success pull-left"><i class="fa fa-plus"></i>Agregar Contacto</button></th>
					</tr>
					<tr>
						<td width="150">DOCUMENO</td>
						<td width="750">NOMBRE</td>
						<td width="100">ACCION</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</div>