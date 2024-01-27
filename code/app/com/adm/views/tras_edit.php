<header>Informacion de Tralado</header>
<div class="row"><div class='div-group'></div></div>
<input type='hidden' name="suc_kysucu" value='0'/>
<input type='hidden' name="doc_kydocu"value='0'/>
<input type='hidden' name="doc_kypdr" value='0'/>
<input type='hidden' name="doc_kydref" value='0'/>
<input type="hidden" name="usu_kyusu" value='0'>
<input type="hidden" name="tra_kyusu" value='0'>
<input type="hidden" name="tta_kyusu" value='0'>
<input type="hidden" name="art_kyarti" value='0'/>
<input type='hidden' name="doc_topa"/>
<input type="hidden" name="doc_ndoc"/>

<input type="hidden" name="usu_dire"/>
<input type="hidden" name="usu_tdoc"/>
<input type="hidden" name="usu_ndoc"/>
<input type="hidden" name="doc_part"/>
<input type="hidden" name="doc_lleg"/>
<div class="row">
	<div class="col-md-5">
		<input type='text' name="suc_nomb" title='doc' class="form-control"></input>
	</div>
	<div class="col-md-3">
		<select name="doc_tope" class="form-control"></select>
	</div>
	<div class="col-md-2">
		<select name="kar_tctr" class="form-control">
			<option value='INGRESO'>INGRESO</option>
			<option value='EGRESO'>EGRESO</option>
		</select>
	</div>
	<div class="col-md-2">
		<div class="checkbox">
			<label>
				<input class="checkbox style-0" type="checkbox" name="doc_kaut"> 
				<span>Kardex Auto</span>
			</label>
		</div>
	</div>
</div>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<div class="col-md-3">
   		<select name="doc_tdoc" class="form-control" title='doc' placeholder='Tipo Documento'></select>
	</div>
	<div class="col-md-1">
		<input type="text" name="doc_seri" class="form-control" title='doc' placeholder='Serie' tabindex='1'>
	</div>
	<div class="col-md-2">
		<input type="text" name="doc_nume" class="form-control" title='doc' placeholder='Numero' tabindex='2'>
	</div>
	<div class="col-md-6">
		<input type="text" name="doc_nref" class="form-control" placeholder='Nº Referencia' tabindex='3'>
	</div>
</div>
<div class="row">
	<div class="col-md-2">
		<input type="text" name="usu_tipo" class="form-control" placeholder='Tipo entidad'>
	</div>
	<div class="col-md-4">
   		<input type="hidden" name="usu_dire">
   		<input type="hidden" name="usu_tdoc">
   		<input type="hidden" name="usu_ndoc">
		<input type="text" name="usu_nomb" class="form-control" title='doc' placeholder='Nombre/Razon social' tabindex='4'>
	</div>
	<div class="col-md-1">
		<button name="btnSelEnti" class="btn btn-info"><i class="fa fa-search"></i></button>
	</div>
	<div class="col-md-4">
   		<input type="text" name="tta_nomb" class="form-control" title='doc' placeholder='Transportista Nombre' tabindex='5'>
	</div>
	<div class="col-md-1">
		<button name="btnSelTta" class="btn btn-info"><i class="fa fa-search"></i></button>
	</div>
</div>
<div class="row">
<!-- 	<div class="col-md-3"> -->
		<input type="hidden" name="doc_part" class="form-control" title='doc' placeholder='Partida'>
<!-- 	</div> -->
<!-- 	<div class="col-md-3"> -->
   		<input type="hidden" name="doc_lleg" class="form-control" title='doc' placeholder='Llegada'>
<!-- 	</div> -->
	<div class="col-md-2">
		<input type="text" name="doc_freg" class="form-control" placeholder='Fecha de Registro'>
	</div>
	<div class="col-md-10">   		
   		<input type="text" name="doc_obse" class="form-control"  placeholder='Glosa-Observciones' tabindex='6'>
	</div>
</div>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<div class="col-md-1">
		<input type="text" name="art_codi" class="form-control" title='art' placeholder='Barras' tabindex='7'>
	</div>
	<div class="col-md-1">
		<input type="text" name="art_iden" class="form-control" placeholder='Codigo SKU' tabindex='8'>
	</div>
	<div class="col-md-4">
		<input type="text" name="art_nomb" class="form-control" title='art' placeholder='Nombre/Servicio' tabindex='9'>
	</div>
	<div class="col-md-3">
		<select name="alm_nomb" class="form-control" title='art' placeholder='Almacen'></select>
	</div>
	<div class="col-md-0" style="display: none;">
		<select name="mar_nomb" class="form-control"></select>
		<select name="cat_nomb" class="form-control"></select>
		<select name="uni_nomb" class="form-control"></select>
		<select name="lpr_nomb" class="form-control"></select>
	</div>
	<div class="col-md-1">
		<input type="text" name='art_cant' class="form-control" title='art' placeholder='Cantidad' tabindex='10'>
	</div>
	<div class="col-md-1">
		<input type="text" name="pre_prec" class="form-control" title='art' placeholder='Precio' tabindex='11'>
	</div>
	<div class="col-md-1">
		<input type="text" name="art_sact" class="form-control" placeholder='Stock'>
	</div>
</div>
<div class="row">
	<div name="historial" class="col-md-12"></div>
</div>
<div class="table-responsive">
	<table class="table table-bordered">
		<thead>
			<tr>
				<th colspan="17">
					<button name="btnAddDoc" class="btn btn-success pull-left"><i class="fa fa-plus"></i>Documento</button>
					<button name="btnAddRow" class="btn btn-success pull-left"><i class="fa fa-plus"></i>Item</button>
					<button name="btnArtBus" class="btn btn-success pull-left"><i class="fa fa-search"></i>Agregar/Modificar</button>
				</th>
			</tr>
			<tr>
				<th>NOMBRE</th>
				<th>ALMACEN</th>
				<th>MARCA</th>
				<th>CATEGORIA</th>
				<th>UNIDAD</th>
				
				<th>DPRE</th>
				<th>CANT</th>
				<th>PREC</th>
				<th>DCTO</th>
				<th>PDTO</th>
				<th>IMPORTE</th>
				
				<th>ACCION</th>
				<th>CCOT</th>
				<th>CPED</th>
				<th>CENT</th>
				<th>CFAC</th>
				<th>SACT</th>
			</tr>
		</thead>
		<tbody name="gridItemDoc">
			
		</tbody>
		<tfoot>
			<tr>
				<td colspan="6">
				</td>
				<td>DSCTO</td>
				<td>SUBTOTAL</td>
				<td>IGV</td>
				<td>TOTAL</td>
				
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				
				<td></td>
				<td><input type="text" name="doc_dcto" class="form-control" disabled></td>
				<td><input type="text" name="doc_stot" class="form-control" disabled></td>
				<td><input type="text" name="doc_igve" class="form-control" disabled></td>
				<td><input type="text" name="doc_tota" class="form-control" disabled></td>
				
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
				<td></td>
			</tr>
		</tfoot>
	</table>
	<table style="display:none;">
		<tbody name="gridRef">
			<tr>
				<td>
					<input type="hidden" name="item_ide" class="form-control">
					<input type="hidden" name="item_cod" class="form-control">
					<input type="text" name="item_nomb" class="form-control" style="width:170px;">
				</td>
				<td><select name="item_alma" class="form-control" style="width:80px;"></select></td>
				<td><select name="item_marc" class="form-control" style="width:80px;"></select></td>
				<td><select name="item_cate" class="form-control" style="width:80px;"></select></td>
				<td><select name="item_unid" class="form-control" style="width:80px;"></select></td>
				<td><select name="item_dpre" class="form-control" style="width:80px;"></select></td>
				<td><input type="text" name="item_cant" class="form-control" style="width:50px;"></td>				
				<td>
					<input type="hidden" name="item_cost" class="form-control" style="width:70px;">
					<input type="hidden" name="item_prec" class="form-control" style="width:70px;">
					<input type="text" name="item_pope" class="form-control" style="width:70px;">
				</td>
				<td><input type="text" name="item_dcto" class="form-control" style="width:70px;"></td>
				<td><input type="text" name="item_pdto" class="form-control" style="width:70px;"></td>
				<td><input type="text" name="item_impo" class="form-control" style="width:70px;"></td>
				<td>
					<button name="btnDelRow" class="btn btn-danger" href="javascript:void(0);"><i class="fa fa-trash-o"></i></button>
					<a href="form-x-editable.html#" id="address" data-type="address" data-pk="1" data-original-title="Please, fill address"></a>
				</td>
				<td><label name="item_ccot"></label>
				<td><label name="item_cped"></label>
				<td><label name="item_cent"></label>
				<td><label name="item_cfac"></label>
				<td><label name="item_sact"></label>
			</tr>
		</tbody>
	</table>
</div>