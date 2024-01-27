<header>Informacion de Video</header>
<div class="row"><div class="div-group"></div></div>
<input type="hidden" name="usu_kyusu">
<input type="hidden" name="art_kyart">
<input type="hidden" name="art_codi">
<input type="hidden" name="art_vers">
<div class="row">
	<div class="col-md-4">
		<input type="hidden" name="prp_kyprp" value='0'/>
		<input type="hidden" name="prp_secc" value='0'/>
		<input type="text" name="prp_prop" class="form-control" placeholder="Seleccion Categoria" title="art" tabindex="1">
	</div>
	<div class="col-md-8">
		<input type="text" name="art_nomb" class="form-control" placeholder="Nombre de Video" title="art" tabindex="1">
	</div>
</div>
<div class="row">
	<div class="col-md-7">
		<input type="text" name="art_dscr" class="form-control" placeholder="Etiquetas de Video" title="art" tabindex="1">
	</div>
	<div class="col-md-5">
		<div class="input-group input-group-sm">
			<span class="input-group-btn">
				<button name="btnArtFileUp" class="btn btn-warning" placeholder='Subir' title='' tabindex='1'><i class="fa fa-upload"></i></button>
			</span>
			<input name="inp_art_foto" type="file" accept=".mp4" style="display:none;"/>
			<input name="art_foto" type="text" class="form-control" placeholder='Video a subir' title='' tabindex=''/>
			<span class="input-group-btn">
				<button name="btnArtFileDown" class="btn btn-info" placeholder='Bajar' title='' tabindex='1'><i class="fa fa-download"></i></button>
			</span>
		</div>
	</div>
</div>
<div class="row">
 	<div class="progress progress-sm progress-striped active">
		<div name="divBarraProgreso" class="progress-bar bg-color-darken" style="width: 0%;" role="progressbar"></div>
 	</div>
</div>