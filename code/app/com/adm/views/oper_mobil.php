<header>Informacion Persona Origen/Destino</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<input type="hidden" name="prp_kyprp" value='-1'/>
	<input type="hidden" name="apc_kyapc" value='-1'/>	
	<input type="hidden" name="caj_kysuc" value='-1'/>
	<input type="hidden" name="doc_kydoc" value='-1'/>
	<input type='hidden' name="cco_kycco" value='-1'/>
	<input type='hidden' name="tra_kyusu" value='-1'/>
	<input type='hidden' name="ope_kyope" value='-1'/>
	<input type='hidden' name="ope_kyorf" value='-1'/>
	<input type='hidden' name="ope_kyusu" value='-1'/>
	<input type="hidden" name="ope_kyapc" value='-1'/>
	<input type="hidden" name="ope_ndoc" value='-1'/>
		
	<input type='hidden' name="cor_tipo" value='-1'/>
	<input type='hidden' name="bor_nomb" value='-1'/>
	<input type='hidden' name="cor_tmon" value='-1'/>
	<input type='hidden' name="cor_ndoc" value='-1'/>
	
	<input type='hidden' name="cde_tipo" value='-1'/>
	<input type='hidden' name="bde_nomb" value='-1'/>
	<input type='hidden' name="cde_tmon" value='-1'/>
	<input type='hidden' name="cde_ndoc" value='-1'/>	
	
	<div class="col-xs-4 col-sm-4">
		<select name="cor_otip" class="form-control" placeholder='Tipo movimiento' title="" tabindex="">
			<option value='INGRESO'>INGRESO</option>
			<option value='EGRESO'>EGRESO</option>
			<option value='COSTO'>COSTO</option>
		</select>
	</div>
	<div class="col-xs-8 col-sm-8">
		<input type="hidden" name="cor_kycco" value='-1'/>
		<input type="hidden" name="cor_kyusu" value='-1'/>
		<input type="text" name="cor_nomb" class="form-control" placeholder='Entidad Origen' title="ope" tabindex="">
	</div>
</div>
<div class="row">	
	<div class="col-xs-4 col-sm-4">
		<select name="cde_otip" class="form-control" placeholder='Tipo movimiento' title="" tabindex="">
			<option value='INGRESO'>INGRESO</option>
			<option value='EGRESO'>EGRESO</option>
		</select>
	</div>
	<div class="col-xs-8 col-sm-8">
		<input type="hidden" name="cde_kycco" value='-1'/>
		<input type="hidden" name="cde_kyusu" value='-1'/>
		<input type="text" name="cde_nomb" class="form-control" placeholder='Entidad Destino' title="ope" tabindex="">
	</div>
</div>
<header>Informacion Operacion</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<input type="hidden" name="ope_fpag" value="EFECTIVO"/>
	<input type="hidden" name="ope_peri" value="">
<!-- 	<div class="col-md-3"> -->
<!-- 		<div class="input-group input-group-sm"> -->
<!-- 			<input type="hidden" name="cco_kycco" value='-1'/> -->
<!-- 			<input type="text" name="cco_kycco" class="form-control" placeholder='Rubro' title='ope' tabindex='1'/> -->
<!-- 			<span class="input-group-btn"> -->
<!-- 				<button name="btnAddRub" class="btn btn-info" placeholder='Buscar' title='' tabindex='1'><i class="fa fa-chevron-down"></i></button> -->
<!-- 			</span> -->
<!-- 		</div> -->
<!-- 	</div> -->
	<div class="col-xs-3 col-sm-3">
		<input type="text" name="ope_freg" class="form-control" placeholder='Fecha de registro' title="ope" tabindex='1'>
	</div>	
	<div class="col-xs-4 col-sm-4">
		<input type="hidden" name="rub_kyprp" value='-1'/>
		<input type="text" name="rub_prop" class="form-control" placeholder='Rubro' title='ope' tabindex='1'/>
	</div>
	<div class="col-xs-5 col-sm-5">
		<input type="hidden" name="cls_kyprp" value='-1'/>
		<input type="text" name="cls_prop" class="form-control" placeholder='Clase' title='ope' tabindex='1'/>
	</div>
</div>
<div class="row">
	<div class="col-xs-5 col-sm-5">
		<input type="hidden" name="ope_otip" value=""/>
		<select name="ope_tope" class="form-control" placeholder='Tipo operacion' title="ope" tabindex="1">
			<option value='COSTO'>COSTO</option>
			<option value='GASTO'>GASTO</option>
			<option value='COBRO'>COBRO</option>
<!-- 		<option value='DEPOSITO'>DEPOSITO</option> -->
<!-- 		<option value='RETIRO'>RETIRO</option> -->
			<option value='TRANSFERENCIA'>TRANSFERENCIA</option>
<!-- 		<option value='APERTURA'>APERTURA</option> -->
		</select>
	</div>
	<div class="col-xs-3 col-sm-3">
		<input type="text" name="ope_oimp" class="form-control" placeholder='Monto operacion' title='ope' tabindex='1'>
	</div>
	<div class="col-xs-4 col-sm-4">
		<input type="hidden" name="ope_eori" value=''/>
		<select name="ope_esta" class="form-control" placeholder='Estado operacion' title="ope" tabindex='1'>
			<option value='0001'>APROBADO</option>
			<option value='0002'>PENDIENTE</option>
			<option value='0004'>RECHAZADO</option>
		</select>
	</div>
</div>
<div class="row">
	<input type="hidden" name="ope_ccmp" value="2.35"/>
	<input type="hidden" name="ope_cven" value="2.35"/>	
	<input type="hidden" name="ope_mmon" value="0001"/>
	<input type="hidden" name="ope_mimp" value=""/>
	<input type="hidden" name="ope_tcam" value="SINCAMBIO"/>
	<input type="hidden" name="ope_refe" value=""/>
	<input type="hidden" name="ope_tdoc" value=""/>
	<input type="hidden" name="ope_seri" value=""/>
	<input type="hidden" name="ope_nume" value=""/>
	<input type="hidden" name="ope_omon" value="0001"/>

<!-- 	<div class="col-md-3"> -->
<!-- 		<select name="ope_tdoc" class="form-control" placeholder='Tipo documento' title="ope" tabindex='1'></select> -->
<!-- 	</div> -->
<!-- 	<div class="col-md-1"> -->
<!-- 		<input type="text" name="ope_seri" class="form-control" placeholder='Serie' title="ope" tabindex='1'> -->
<!-- 	</div> -->
<!-- 	<div class="col-md-2"> -->
<!-- 		<input type="text" name="ope_nume" class="form-control" placeholder='Numero' title="ope" tabindex='1'> -->
<!-- 	</div> -->
</div>
<div class="row">
<!-- 	<div class="col-md-1"> -->
<!-- 		<select name="ope_omon" class="form-control" placeholder='Tipo moneda' title='ope' tabindex='1'> -->
<!-- 			<option value='0001'>SOLES</option> -->
<!-- 			<option value='0002'>DOLARES</option> -->
<!-- 		</select> -->
<!-- 	</div> -->
	<div class="col-xs-9 col-sm-9">
		<input type="text" name="ope_pobs" class="form-control" placeholder='Glosa operacion' title='ope' tabindex='1'>
	</div>
	<div class="col-xs-3 col-sm-3">
		<div class="input-group input-group-sm">
			<span class="input-group-btn">
				<button name="btnOpeImagUp" class="btn btn-warning" placeholder='Subir' title='' tabindex='1'><i class="fa fa-upload"></i></button>
			</span>
			<input name="inp_ope_fimg" type="file" accept=".png,.jpg,.pdf" style="display:none;"/>
			<input name="ope_fimg" type="text" class="form-control" placeholder='Imagen Operacion' title='' tabindex=''/>
			<span class="input-group-btn">
				<button name="btnOpeImagDown" class="btn btn-info" placeholder='Bajar' title='' tabindex='1'><i class="fa fa-download"></i></button>
			</span>
		</div>
	</div>
</div>
<header>Comprobante de pago</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
    <div class="col-md-12">
    	<div name="pan_fimg" class="col-md-12" style="border: 1px solid #ccc;"><center><img name="img_fimg" src=""/></center></div>
    	<input name="inp_fimg" type="file" accept=".png,.jpg" style="display:none;"/>
    	<input name="ope_fimg" type='text' class="form-control pull-left" style="width: 142px; margin-top:0px; margin-bottom:0px;"/>
    	<button name="btnLoadFimg" class="btn btn-primary pull-left" style="width: 35px; margin:0px; padding-left: 0px; padding-right: 0px;"><i class="fa fa-upload"></i></button>
    </div>
</div>
