<header>Informacion de Historia</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<div class="col-md-4">
		<div name="pan_usu_foto" class="col-md-12" style="border: 1px solid #ccc;"><center><img name="img_usu_foto" src=""/></center></div>
		<input name="inp_usu_foto" type="file" accept=".png,.jpg" style="display:none;"/>
		<input name="txt_usu_foto" type='text' class="form-control pull-left" style="width: 142px; margin-top:0px; margin-bottom:0px;"/>
		<button name="btnLoadUsuFoto" class="btn btn-primary" style="width: 35px; margin:0px; padding-left: 0px; padding-right: 0px;"><i class="fa fa-upload"></i></button>
		<div class="progress progress-sm progress-striped active">
			<div name="divBarraProgreso" class="progress-bar bg-color-darken" style="width: 0%;" role="progressbar"></div>
	 	</div>	
	</div>
	<div class="col-md-8">
  	<input type="hidden" name="his_kyhis" value='0'/>
  	<div class="col-md-6">
  		<input type="hidden" name="his_kyusu" value='0'/>
  		<input type="text" name="his_nomb" class="form-control" placeholder="Paciente">
  	</div>
  	<div class="col-md-6">
  		<input type="text" name="his_fini" class="form-control" placeholder="Fecha-Inicio">
  	</div>
  	<div class="col-md-12">
			<textarea name="his_dscr" class="form-control" placeholder="Descripcion" rows="3"></textarea>
		</div>
	</div>
</div>