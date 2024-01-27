<header>Informacion de datos Aqui</header>
<div class="row"><div class="div-group"></div></div>
<div class="row">
	<input type="hidden" name="pol_kypol" value="0"/>
	<input type="hidden" name="pol_kypdr" value="0"/>
	<input type="hidden" name="pol_kypol" value="0"/>
	<input type="hidden" name="pol_nive" value="0"/>
	<div class="col-md-4">
		<div name="pan_foto" class="col-12" style="border: 1px solid #ccc;"><center><img name="img_foto" src=""/></center></div>
		<div class="col-12">
			<div class="input-group input-group-sm">
				<input name="inp_foto" type="file" accept="image/*"/>
				<input type="text" name="pol_imin" class="form-control" placeholder="Imagen" tabindex=""/>
				<span class="input-group-btn">
					<button name="btnLoadFoto" class="btn btn-info" placeholder="Seleccion" tabindex="1"><i class="fa fa-search"></i></button>
				</span>
			</div>
		</div>
	</div>
	<div class="col-md-8">
		<div class="col-md-12">
			<div class="col-md-2">
				<input type="text" name="pdr_temp" class="form-control" placeholder="Aplicativo">
			</div>
			<div class="col-md-3">
				<input type="text" name="pdr_nomb" class="form-control" placeholder="Nombre Padre">
			</div>
			<div class="col-md-7">
				<input type="text" name="pdr_dscr" class="form-control" placeholder="Descripcion Padre">
			</div>
		</div>
		<div class="col-md-12"><div class="div-group" style="margin: 0px 0px;"></div></div>
		<div class="col-md-12">
			<div class="col-md-4">
				<select name="pol_tipo" class="form-control" placeholder="Tipo politica">
					<option value="MENU">MENU</option>
					<option value="DATO">DATO</option>
				</select>
			</div>
			<div class="col-md-4">
				<select name="pol_trig" class="form-control" placeholder="Estado politica">
					<option value="OPEN">OPEN</option>
					<option value="CLICK">CLICK</option>
				</select>
			</div>
			<div class="col-md-4">
				<select name="pol_esta" class="form-control" placeholder="Estado politica">
					<option value="0001">VISIBLE</option>
					<option value="0000">OCULTO</option>
				</select>
			</div>
		</div>

		<div class="col-md-12">
    		<div class="col-md-5">
    			<input type="text" name="pol_nomb" class="form-control" placeholder="Nombre">
    		</div>
    		<div class="col-md-7">
    			<input type="text" name="pol_dscr" class="form-control" placeholder="Descripcion">
    		</div>
		</div>
		<div class="col-md-12">
			<input type="text" name="pol_link" class="form-control" placeholder="Link">
		</div>
		<div class="col-md-12">
			<input type="text" name="pol_clas" class="form-control" placeholder="Clase">
		</div>
	</div>	
</div>
<div class="row">
	<div id="gridPoliticasHijas"></div>
</div>