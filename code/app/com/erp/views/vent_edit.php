<style>
	.table.table-bordered > tbody > tr > td.dtd_acci {
		text-align: center;
		width: 5%;
	}
	.table.table-bordered > tbody > tr > td.dtd_cant {
		text-align: center;
		width: 7%;
	}
	.table.table-bordered > tbody > tr > td.dtd_dscr {
		text-align: left;
		width: 600px;
		max-width: 600px;
	}
	.table.table-bordered > tbody > tr > td.dtd_pund {
		text-align: right;
		width: 10%;
	}
	.table.table-bordered > tbody > tr > td.dtd_dcto {
		text-align: right;
		width: 10%;
	}
	.table.table-bordered > tbody > tr > td.dtd_pdto {
		text-align: right;
		width: 10%;
	}
	.table.table-bordered > tbody > tr > td.dtd_impo {
		text-align: right;
		width: 10%;
	}
</style>
<header>Informacion de Venta</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">
	<div class="col-md-2">
		<input type="hidden" name="doc_kydoc" value="0"/>
		<input type="hidden" name="doc_fact" value=""/>
		<input type="hidden" name="doc_guia" value=""/>
		<input type="text" name="suc_nomb" class="form-control" placeholder="Nombre sucursal"/>
	</div>
	<div class="col-md-2">
   		<select class="form-control" name="cco_nomb" placeholder='Caja'></select>			
	</div>	
	<div class="col-md-2">
		<input type="text" name="doc_tope" class="form-control" placeholder="Tipo operacion"/>
	</div>
	<div class="col-md-2">
		<select class="form-control" name="doc_tdoc" placeholder='Tipo Documento'></select>
	</div>
	<div class="col-md-2">
		<input type="text" name="doc_ndoc" class="form-control" placeholder="Nro documento"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="doc_femi" class="form-control" placeholder="Fecha emision"/>
	</div>
	<div class="col-md-1">
		<div class="btn btn-checkbox" style="width: 100%;"><label><input class="checkbox style-0" type="checkbox" name="doc_cigv"><span>IGV</span></label></div>
	</div>
</div>

<div class="row">
	<div class="col-md-1">
		<input type="hidden" name="ent_kyusu" value="0"/>
		<input type="hidden" name="ent_mail" value=""/>
 		<select name="ent_tdoc" class="form-control" placeholder="Tipo documento">
 			<option value="RUC">RUC</option>
 			<option value="DNI">DNI</option>
 		</select>
	</div>
	<div class="col-md-2">
		<input type="text" name="ent_ndoc" class="form-control" placeholder="Numero documento">
	</div>
	<div class="col-md-3">
		<input type="text" name="ent_nomb" class="form-control" placeholder='Nombre/Razon social'>
	</div>
	<div class="col-md-6">
		<input type="text" name="ent_dire" class="form-control" placeholder='Direccion'>
	</div>
</div>		

<div class="row">
	<div class="col-md-7">
		<input type="hidden" name="usu_kyusu" value='0'/>
		<input type="text" name="usu_nomb" class="form-control" placeholder='Trabajador'>
	</div>
	<div class="col-md-2">
   		<select name="doc_tven" class="form-control" placeholder="Tipo venta">
   			<option value="MENOR">MENOR</option>
   			<option value="MAYOR">MAYOR</option>
   			<option value="LIQUIDACION">LIQUIDACION</option>
   		</select>
	</div>
	<div class="col-md-1">
   		<select name="doc_tmon" class="form-control" placeholder="Moneda">
   			<option value="SOLES">SOLES</option>
   			<option value="DOLARES">DOLARES</option>
   		</select>
	</div>
	<div class="col-md-2">
   		<select name="doc_fpag" class="form-control" placeholder="Forma pago">
   			<option value="CONTADO">CONTADO</option>
   			<option value="CREDITO">CREDITO</option>
   		</select>
	</div>
</div>

<div class="row"><div class="div-group"></div></div>

<div class="row">
	<div class="col-md-10">
		<input type="hidden" name="art_kyart" value="0"/>
		<input type="hidden" name="art_codi" value="0"/>
		<input type="hidden" name="art_nomb" value=""/>
		<input type="hidden" name="art_unid" value=""/>
		<input type="hidden" name="art_pres" value=""/>
		<input type="hidden" name="art_conc" value=""/>
		<input type="hidden" name="art_marc" value=""/>
		<input type="hidden" name="art_clas" value=""/>
		<input type="hidden" name="art_titu" value=""/>
		<input type="hidden" name="art_frsn" value=""/>
		<input type="hidden" name="art_pcos" value="0"/>
		<input type="hidden" name="art_sact" value="0"/>
		<input type="hidden" name="art_impo" value="0"/>
		<input type="text" name="art_combo" class="form-control" placeholder="Nombre/Servicio" obligatorio="NO"/>
	</div>
	<div class="col-md-1">
		<input type="number" name="art_pund" class="form-control" style="text-align: right;" placeholder="Venta" obligatorio="NO">
	</div>	
	<div class="col-md-1">
		<input type="number" name="dtd_cant" class="form-control" style="text-align: center" placeholder="Cantidad" obligatorio="NO">
	</div>
</div>
<div class="row">
	<div name="historial" class="col-md-12"></div>
</div>
<div class="row" style="margin: 0px -10px 0px -10px;">
  <div class="table-responsive" style="height: 406px;">
  	<table class="table table-bordered">
  		<thead>
  			<tr>
  				<th style="text-align: center;">Accion</th>
  				<th style="text-align: center;">Cant</th>
  				<th style="text-align: center;">Descripcion</th>
  				<th style="text-align: center;">Precio</th>
  				<th style="text-align: center;">Dcto</th>
  				<th style="text-align: center;">Pre-Dcto</th>
  				<th style="text-align: center;">Importe</th>
  			</tr>
  		</thead>
  		<tbody name="gridItemDoc">
  		</tbody>
  	</table>
  	<table style="display:none;">
  		<tbody name="gridRef">
  			<tr>
    			<td name="grid_dtd_acci" class="dtd_acci"><button name="btnDelRow" class="btn btn-danger btn-xs"><i class="fa fa-trash-o"></i></button></td>
    			<td name="grid_dtd_cant" class="dtd_cant">1</td>
    			<td name="grid_dtd_dscr" class="dtd_dscr">PARACETAMOL CAJA TABLETAS 0</td>
    			<td name="grid_dtd_pund" class="dtd_pund">2.52</td>
    			<td name="grid_dtd_dcto" class="dtd_dcto">4.86</td>
    			<td name="grid_dtd_pdto" class="dtd_pdto">0.00</td>
    			<td name="grid_dtd_impo" class="dtd_impo">15.458</td>
  			</tr>
  		</tbody>
  	</table>
  </div>
</div>
<div class="row">
	<div class="col-md-10">
		<input type="text" name="doc_dimp" class="form-control" placeholder='Descripcion del importe'/>
	</div>
	<div class="col-md-1">
		<input type="text" name="eti_tsub" class="form-control" style="text-align: right;" value="SubTotal"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="doc_tsub" class="form-control" style="text-align: right;" value="0.00"/>
	</div>
</div>
<div class="row">
	<div class="col-md-1">
		<input type="text" name="eti_item" class="form-control" style="text-align: center;" value="Items"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="eti_arti" class="form-control" style="text-align: center;" value="Articulos"/>
	</div>
	<div class="col-md-6"></div>
	<div class="col-md-1">
		<input type="text" name="eti_tpag" class="form-control" style="text-align: center;" value="Efectivo"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="eti_vuel" class="form-control" style="text-align: center;" value="Vuelto"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="eti_tigv" class="form-control" style="text-align: right;" value="I.G.V."/>
	</div>
	<div class="col-md-1">
		<input type="text" name="doc_tigv" class="form-control" style="text-align: right;" value="0.00"/>
	</div>
</div>
<div class="row">
	<div class="col-md-1">
		<input type="text" name="val_item" class="form-control" style="text-align: center;" value="2"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="val_arti" class="form-control" style="text-align: center;" value="15"/>
	</div>
	<div class="col-md-6"></div>
	<div class="col-md-1">
		<input type="number" name="doc_tpag" class="form-control" style="text-align: right;" value="0.00"/>
	</div>
	<div class="col-md-1">
		<input type="number" name="doc_vuel" class="form-control" style="text-align: right;" value="0.00"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="eti_tota" class="form-control" style="text-align: right;" value="Total"/>
	</div>
	<div class="col-md-1">
		<input type="text" name="doc_tota" class="form-control" style="text-align: right;" value="0.00"/>
		<input type="hidden" name="doc_tcos" class="form-control" style="text-align: center;" value="15.00"/>
	</div>
</div>
