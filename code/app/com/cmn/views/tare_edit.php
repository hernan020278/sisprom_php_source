<header>Informacion de datos de tareas</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">
	<input type="hidden" name="tar_kytar" value="0"/>
	<input type="hidden" name="tar_kypdr" value="0"/>
	<input type="hidden" name="tar_nive" value="0"/>
	<input type="hidden" name="pdr_dscr" value=""/>
	<div class="col-md-4">
		<div name="pan_foto" class="col-12" style="border: 1px solid #ccc;"><center><img name="img_foto" src=""/></center></div>
		<div class="col-12">
			<div class="input-group input-group-sm">
				<input name="inp_foto" type="file" accept="image/*"/>
				<input type="text" name="tar_imin" class="form-control" placeholder="Imagen" tabindex=""/>
				<span class="input-group-btn">
					<button name="btnLoadFoto" class="btn btn-info" placeholder="Seleccion" tabindex="1"><i class="fa fa-search"></i></button>
				</span>
			</div>
		</div>
	</div>
	<div class="col-md-8">
		<div class="col-md-12">
			<div class="col-md-2">
				<input type="text" name="pdr_temp" class="form-control" placeholder="Aplicativo" tabindex="">
			</div>
			<div class="col-md-3">
				<input type="text" name="pdr_nomb" class="form-control" placeholder="Nombre Padre" tabindex="">
			</div>
			<div class="col-md-7">
				<input type="text" name="pdr_dscr" class="form-control" placeholder="Descripcion Padre" tabindex="">
			</div>
		</div>
		<div class="col-md-12"><div class="div-group" style="margin: 0px 0px;"></div></div>
		<div class="col-md-12">
			<div class="col-md-4">
				<select name="tar_tipo" class="form-control" placeholder="Tipo politica" title="pol" tabindex="1">
					<option value="MENU">MENU</option>
					<option value="DATO">DATO</option>
				</select>
			</div>
			<div class="col-md-4">
				<select name="tar_trig" class="form-control" placeholder="Estado politica" title="pol" tabindex="1">
					<option value="OPEN">OPEN</option>
					<option value="CLICK">CLICK</option>
				</select>
			</div>
			<div class="col-md-4">
				<select name="tar_esta" class="form-control" placeholder="Estado politica" title="pol" tabindex="1">
					<option value="0001">VISIBLE</option>
					<option value="0000">OCULTO</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
    		<div class="col-md-5">
    			<input type="text" name="tar_nomb" class="form-control" placeholder="Nombre">
    		</div>
    		<div class="col-md-7">
    			<input type="text" name="tar_dscr" class="form-control" placeholder="Descripcion">
    		</div>
		</div>
		<div class="col-md-12">
			<input type="text" name="tar_link" class="form-control" placeholder="Link">
		</div>
		<div class="col-md-12">
			<input type="text" name="tar_clas" class="form-control" placeholder="Clase">
		</div>
	</div>	
</div>
<div class="row">
	<div id="gridPoliticasHijas"></div>
</div>