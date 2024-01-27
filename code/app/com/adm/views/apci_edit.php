<header>Informacion de Apertura y cierre</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<input type="hidden" name="apc_kyapc" value='0'>
	<input type="hidden" name="apc_kysuc" value='0'>
	<input type="hidden" name="apc_kyusu" value='0'>		
	<div class="col-md-1">
		<button name="btnAddSucu" class="btn btn-info" placeholder='Caja_y_bancos' tabindex='1'><i class="fa fa-save"></i></button>
	</div>
   	<div class="col-md-5">
   		<input type="text" name="caj_nomb" class="form-control" title='apc' placeholder='Caja_y_bancos' tabindex='2'>					
	</div>	
	<div class="col-md-1">
		<button name="btnSelEnt" class="btn btn-info" placeholder='Nombre_trabajador' tabindex='3'><i class="fa fa-search"></i></button>
	</div>	
	<div class="col-md-5">
		<input type="text"  name="tra_nomb" class="form-control" placeholder='Nombre_trabajador' tabindex='4'>
	</div>	
</div>
<div class="row">
	<div class="col-md-6">
		<input type="hidden" name="ope_tdoc" value="0029">
		<input type="text" class="form-control" value="RECIBO CAJA">
	</div>
	<div class="col-md-3">
		<input type="text" name="ope_seri" class="form-control" title='doc' placeholder='Serie' tabindex='5'>
	</div>
	<div class="col-md-3">
		<input type="text" name="ope_nume" class="form-control" title='doc' placeholder='Numero' tabindex='6'>
	</div>
</div>
<div class="row">
	<div class="col-md-3">
		<input class="form-control" type="text" class="form-control" name="apc_fini" placeholder='Moneda operacion' tabindex='7'>
	</div>
	<div class="col-md-3">
		<input class="form-control" type="text" class="form-control" name="apc_ffin" placeholder='Moneda operacion' tabindex='8'>
	</div>
	<div class="col-md-3">
   		<select class="form-control" name="ope_otip" title='apc' placeholder='Tipo operacion'>
			<option value="APERTURA">APERTURA</option>
			<option value="CIERRE">CIERRE</option>				
		</select>			
	</div>	
	<div class="col-md-3">
   		<select class="form-control" name="ope_omon" title='apc' placeholder='Moneda operacion' tabindex='9'>
			<option value="0001">SOLES</option>	
			<option value="0002">DOLARES</option>			
		</select>			
	</div>	
</div>
<div class="row">
	<div class="col-md-4">
   		<input type="text" name="ope_oimp" class="form-control" placeholder='Importe' tabindex='9'>			
	</div>	
	<div class="col-md-4">
   		<input type="text" name="ope_ccmp"  class="form-control" placeholder='Compra' tabindex='10'>			
	</div>	
	<div class="col-md-4">
   		<input type="text" name="ope_cven"  class="form-control" placeholder='Venta' tabindex='11'>			
	</div>		
</div>	
