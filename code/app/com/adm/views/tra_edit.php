<input type="hidden" name="usu_kyusu">
<input type="hidden" name="usu_vers">
<header>Informacion de Trabajador</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<div class="col-md-2">
    	<select class="form-control" name="usu_tdoc" placeholder='Doc' tabindex='1'>
			<option value="DNI">DNI</option>
			<option value="RUC">RUC</option>
		</select>
	</div>
	<div class="col-md-3">
		<input type="text" name="usu_ndoc" class="form-control" title='ent' placeholder='Numero' tabindex='2'>
	</div>
	<div class="col-md-7">
		<input type="text" name="usu_nomb" class="form-control" title='ent' placeholder='usu_nombre' tabindex='3'>
	</div>
</div>
<div class="row">
	<div class="col-md-3">
		Codigo
	</div>
	<div class="col-md-3">
		<input type="text" name="tra_codi" class="form-control" placeholder='Codigo' tabindex='5'>
	</div>
	<div class="col-md-3">
		Categoria
	</div>
	<div class="col-md-3">
		<select name="tra_cate" class="form-control">
			<option value="OPERARIO">OPERARIO</option>
			<option value="OFICIAL">OFICIAL</option>
			<option value="PEON">PEON</option>
		</select>
	</div>
</div>

<div class="row">
	<div class="col-md-3">
		Sistema de Pension
	</div>
	<div class="col-md-5">
		<select name="tra_sisp" class="form-control">
		</select>
	</div>
	<div class="col-md-4">
		<input type="text" name="tra_cusp" class="form-control" placeholder='CUSP' tabindex='5'>
	</div>
</div>

<div class="row">
	<div class="col-md-3">
		Nro. Hijos
	</div>
	<div class="col-md-3">
		<input type="text" name="tra_nuhi" class="form-control" placeholder='Nro. de Hijos' tabindex='4'>
	</div>
	<div class="col-md-3">
		Derecho Alimentacion
	</div>
	<div class="col-md-3">
		<select name="tra_deal" class="form-control">
			<option value="0">No</option>
			<option value="1">Si</option>
		</select>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<header>Imagen optima: 650(px) x 350(px)</header>
		<img name="img_firm" src=""/><br>
		<input name="inp_firm" type="file" accept="image/*"/>
		<input name="usu_firm" type='text' class="form-control pull-left" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>
		<button name="btnLoadFirm" class="btn btn-primary pull-left" style="width: 70px; margin-top:0px; margin-bottom:0px;"><span class="icon-document-alt-stroke"></span>Firma</button>
	</div>
</div>
<div class="row">
	<div class="col-md-4">
		<input type="text" name="tra_fnac" class="form-control" placeholder='Fecha de Nacimiento' tabindex='4'>
	</div>
	<div class="col-md-4">
		<input type="text" name="tra_fing" class="form-control" placeholder='Fecha de Ingreso' tabindex='4'>
	</div>
	<div class="col-md-4">
		<input type="text" name="tra_fces" class="form-control" placeholder='Fecha de Cese' tabindex='5'>
	</div>
</div>

<div class="row">  
	<div class="col-md-12">
		<div class="table-responsive">
			<table name="gridItemCli" class="table table-bordered">
				<thead>
					<tr>
						<th colspan='4'><button name="btnAddcli" class="btn btn-success pull-left"><i class="fa fa-plus"></i> Agregar Cliente</button></th>
					</tr>
					<tr>
						<td width="200">DOCUMENO</td>
						<td width="700">NOMBRE</td>
						<td width="100">ACCION</td>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</div>
