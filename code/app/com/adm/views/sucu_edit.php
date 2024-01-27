<header>Informacion de Sucursal</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<input type="hidden" name="suc_kysuc">
	<input type="hidden" name="suc_kypdr">
	<input type="hidden" name="emp_kyemp">
	<input type="hidden" name="suc_vers">
	<div class="col-md-3">
    	<input type="text" name="emp_nomb" class="form-control" title='suc'>
	</div>
	<div class="col-md-1">
		<button name="btnSelEmp" class="btn btn-info"><i class="fa fa-save"></i></button>
	</div>
	<div class="col-md-4">
    	<input type="text" name="loc_nomb" class="form-control" placeholder='Ingrese local' title='suc' tabindex='1'>
    	
	</div>
	<div class="col-md-1">
		<button name="btnAddloca" class="btn btn-info"><i class="fa fa-save"></i></button>
	</div>
	<div class="col-md-3">
		<select class="form-control" name="suc_tipo" placeholder='Tipo de sucursal' title='suc' tabindex='2'>
			<option value="0004">TIENDA</option>
			<option value="0005">ALMACEN</option>
		</select>
	</div>
</div>
<div class="row">
	<div class="col-md-4">
    	<input type="text" name="suc_nomb" class="form-control" title='suc' placeholder='Nombre' tabindex='3'>
	</div>
	<div class="col-md-8">
    	<input type="text" name="suc_dscr" class="form-control" placeholder='Descripcion' tabindex='4'>
	</div>
</div>