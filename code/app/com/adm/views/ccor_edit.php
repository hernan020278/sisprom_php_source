<input type='hidden' name="tra_kyusu" value='0'/>
<input type="hidden" name="cco_kycco" value='0'/>
<input type="hidden" name="cco_tdoc" value="0013">
<input type="hidden" name="cco_tota"/>
<input type="hidden" name="cco_scan"/>
<input type="hidden" name="cco_spag"/>
<select style="display: none;" name="cco_fpag"><option value='EFECTIVO'>EFECTIVO</option></select>

<header>Informacion de Cuenta</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<div class="col-md-7">
		<input type="hidden" name="usu_kyusu" value='0'/>
		<input type="text" name="usu_nomb" class="form-control" placeholder='Nombre/Razon social' title='cco' tabindex='1'>
	</div>
	<div class="col-md-5">
		<input type="hidden" name="bnc_kyprp" value='0'/>
		<input type="text" name="bnc_prop" class="form-control" placeholder='Banco' title='cco' tabindex='1'/>
	</div>
</div>
<div class="row">
	<div class="col-md-2">
		<input type="text" name="cco_freg" class="form-control" placeholder='Fecha-Registro' title='cco' tabindex='1'>
	</div>
	<div class="col-md-2">
		<select name="cco_tmon" class="form-control" placeholder='Moneda movimiento' title='cco' tabindex='1'>
			<option value='SOLES'>SOLES</option>
			<option value='DOLARES'>DOLARES</option>
		</select>
	</div>
	<div class="col-md-3">
   		<select name="cco_tcta" class="form-control" placeholder='Tipo cuenta' title='cco' tabindex='1'>
			 <option value='AHORRO'>AHORRO</option>
				<option value='SUELDO'>SUELDO</option>
				<option value='CTS'>CTS</option>
				<option value='YAPE'>YAPE</option>
				<option value='PLIN'>PLIN</option>
				<option value='CREDITO'>CREDITO</option>
				<option value='CORRIENTE'>CORRIENTE</option>
			</select>
	</div>
	<div class="col-md-5">
		<input type="text" name="cco_ndoc" class="form-control" placeholder='Numero' title='cco' tabindex='1'>
	</div>
</div>
<div class="row">
	<div class="col-md-12">
		<div class="table-responsive">
			<table name="grid_dap" class="table table-bordered">
				<thead>
					<tr>
						<th colspan='7'><button name="btnAddDoc" class="btn btn-success pull-left"><i class="fa fa-plus"></i> Agregar Documento</button></th>
					</tr>
					<tr>
						<th>Tip-Doc</th>
						<th>Nro-Doc</th>
						<th>Moneda</th>
						<th>Importe</th>
						<th>Cancelado</th>
						<th>Saldo</th>
						<th>Accion</th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</div>
