<header>Informacion Persona Origen/Destino PROBANDO</header>
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
	<input type='hidden' name="cor_tmon" value='-1'/>
	<input type='hidden' name="cor_ndoc" value='-1'/>
	
	<input type='hidden' name="cde_tipo" value='-1'/>
	<input type='hidden' name="bde_nomb" value='-1'/>
	<input type='hidden' name="cde_tmon" value='-1'/>
	<input type='hidden' name="cde_ndoc" value='-1'/>	
	
	<div class="col-md-2">
		<select name="cor_otip" class="form-control" placeholder='Tipo movimiento'>
			<option value='INGRESO'>INGRESO</option>
			<option value='EGRESO'>EGRESO</option>
		</select>
	</div>
	<div class="col-md-4">
		<input type="hidden" name="cor_kycco" value='-1'/>
		<input type="hidden" name="cor_kyusu" value='-1'/>
		<input type="text" name="cor_nomb" class="form-control" placeholder='Seleccion origen'>
	</div>
	<div class="col-md-2">
		<select name="cde_otip" class="form-control" placeholder='Tipo movimiento'>
			<option value='INGRESO'>INGRESO</option>
			<option value='EGRESO'>EGRESO</option>
		</select>
	</div>
	<div class="col-md-4">
		<input type="hidden" name="cde_kycco" value='-1'/>
		<input type="hidden" name="cde_kyusu" value='-1'/>
		<input type="text" name="cde_nomb" class="form-control" placeholder='Seleccione destino'>
	</div>
</div>
<header>Informacion Operacion</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<input type="hidden" name="ope_fpag" value="EFECTIVO"/>
	<input type="hidden" name="ope_peri" value="">
	<div class="col-md-2">
		<input type="text" name="ope_freg" autocomplete="off" class="form-control" placeholder='Fecha de registro'>
		<input type="hidden" name="ope_hreg" placeholder='Hora de registro'>
	</div>	
	<div class="col-md-3">
		<input type="hidden" name="rub_kyprp" value='-1'/>
		<input type="text" name="rub_prop" class="form-control" placeholder='Rubro'/>
	</div>
	<div class="col-md-3">
		<input type="hidden" name="cls_kyprp" value='-1'/>
		<input type="text" name="cls_prop" class="form-control" placeholder='Clase'/>
	</div>
	<div class="col-md-2">
		<input type="hidden" name="ope_otip" value=""/>
		<select name="ope_tope" class="form-control" placeholder='Tipo operacion'>
			<option value='GASTO'>GASTO</option>
			<option value='COBRO'>COBRO</option>
			<option value='COSTO'>COSTO</option>
			<option value='TRANSFERENCIA'>TRANSFERENCIA</option>
<!-- 		<option value='DEPOSITO'>DEPOSITO</option> -->
<!-- 		<option value='RETIRO'>RETIRO</option> -->
<!-- 		<option value='APERTURA'>APERTURA</option> -->
		</select>
	</div>
	<div class="col-md-2">
		<select name="doc_tope" class="form-control" placeholder='Operacion'>
    			<option value='OPERACION'>OPERACION</option>
    			<option value='VENTA'>VENTA</option>
    			<option value='COMPRA'>COMPRA</option>
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
	<input type="hidden" name="ope_omon" value="0001"/>

</div>
<div class="row">
	<div class="col-md-6">
		<input type="text" name="ope_pobs" class="form-control" placeholder='Glosa operacion'>
	</div>
	<div class="col-md-2">
		<input type="text" name="ope_oimp" class="form-control" placeholder='Monto operacion' style="text-align: right;" value="0.00">
	</div>
	<div class="col-md-2">
		<div class="input-group input-group-sm">
			<span class="input-group-btn">
				<button name="btnOpeImagUp" class="btn btn-warning" placeholder='Subir'><i class="fa fa-upload"></i></button>
			</span>
			<input name="inp_ope_fimg" type="file" accept=".png,.jpg,.pdf" style="display:none;"/>
			<input name="ope_fimg" type="text" class="form-control" placeholder='Imagen Operacion'/>
			<span class="input-group-btn">
				<button name="btnOpeImagDown" class="btn btn-info" placeholder='Bajar'><i class="fa fa-download"></i></button>
			</span>
		</div>
	</div>
	<div class="col-md-2">
		<input type="hidden" name="ope_eori" value=''/>
		<select name="ope_esta" class="form-control" placeholder='Estado operacion'>
			<option value='0001'>APROBADO</option>
			<option value='0002'>PENDIENTE</option>
			<option value='0004'>RECHAZADO</option>
		</select>
	</div>
</div>
<div name="divDocumento" class="row">
	<div class="col-md-2">
		<input type="text" name="doc_tdoc" class="form-control" placeholder="Documento"/>
	</div>
	<div class="col-md-2">
		<input type="text" name="doc_ndoc" class="form-control" placeholder="Numero"/>
	</div>
	<div class="col-md-4">
		<input type="text" name="doc_enom" class="form-control" placeholder="Cliente/Proveedor"/>
	</div>
	<div class="col-md-2">
		<input type="text" name="doc_tota" class="form-control" placeholder="Total" style="text-align: right;" value="0.00"/>
	</div>
	<div class="col-md-2">
		<input type="text" name="doc_tpag" class="form-control" placeholder="Pagado" style="text-align: right;" value="0.00"/>
	</div>
</div>
<header>Comprobante de pago</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
    <div class="col-md-12">
    	<div name="pan_fimg" class="col-md-12" style="border: 1px solid #ccc;"><center><img name="img_fimg" src=""/></center></div>
    </div>
</div>
