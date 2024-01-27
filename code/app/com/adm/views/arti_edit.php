<header>CAMBIANDO</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">
	<input type="hidden" name="art_kyart"></input>
	<input type="hidden" name="art_vers"></input>
	
	<div class="col-md-4">
		<div name="pan_art_foto" class="col-12" style="border: 1px solid #ccc; width: 220px; height: 220px;"><center><img name="img_art_foto" width="100%" src=""/></center></div>
		<div class="col-12">
			<div class="input-group input-group-sm">
				<input name="inp_art_foto" type="file" accept="image/*"/>
				<input type="text" name="art_foto" class="form-control" placeholder="Imagen"/>
				<span class="input-group-btn">
					<button name="btnSubirArt_foto" class="btn btn-info" placeholder="Seleccion"><i class="fa fa-search"></i></button>
				</span>
			</div>
		</div>
	</div>
	<div class="col-md-8">

      <!-- LINEA 1 -->
    	<div class="col-md-2">
    		<input type="text" name="art_codi" class="form-control" placeholder="Codigo">
    	</div>
    	<div class="col-md-10">
    		<input type="text" name="art_nomb" class="form-control" placeholder="Nombre">			
    	</div>

      <!-- LINEA 2 -->
			<div class="col-md-4">
				<select name="art_clas" class="form-control" placeholder="Clase">
					<option value="PRODUCTO">PRODUCTO</option>
					<option value="SERVICIO">SERVICIO</option>
				</select>
			</div>
    	<div class="col-md-4">
    		<input type="text" name="art_cate" class="form-control" placeholder="Categoria"/>
    	</div>
    	<div class="col-md-4">
    		<input type="text" name="art_marc" class="form-control" placeholder="Marca">			
    	</div>
    
      <!-- LINEA 3 -->
    	<div class="col-md-4">
    		<input type="text" name="art_unid" value="UNIDAD" class="form-control" placeholder="Unidad"/>
    	</div>
    	<div class="col-md-3">
    		<input type="text" name="art_pcos" class="form-control text-right" placeholder="Costo" obligatorio="NO"/>
    	</div>
    	<div class="col-md-3">
    		<input type="text" name="art_pund" class="form-control text-right" placeholder="Precio" obligatorio="NO"/>
    	</div>
    	<div class="col-md-2">
    		<input type="text" name="art_sact" class="form-control text-center" placeholder="Stock" obligatorio="NO"/>
    	</div>
	
	</div>
</div>
