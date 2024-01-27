<header>Informacion Principal</header>
<div class="row"><div class='div-group'></div></div>
<div class="row">
	<input type='hidden' name="alb_kycom" value='0'/>
	<input type="hidden" name="alb_kyusu" value='0'/>
	<input type="hidden" name="alb_kysuc" value="0">
	<input type="hidden" name="alb_kyalb" value="0">
	<div class="col-md-8">
		<div class="col-md-4">
			<select name="alb_tipo" class="form-control" placeholder='Tipo album' title="alb" tabindex="1">
				<option value='LONGPLAY'>LONGPLAY</option>
				<option value='PROMOCION'>PROMOCION</option>
			</select>			
		</div>	
		<div class="col-md-8">
			<input type="text" name="alb_nomb" class="form-control" placeholder='Nombre' title='alb' tabindex='1'>
		</div>
		<div class="col-md-12">
			<input type="text" name="alb_dscr" class="form-control" placeholder='Descripcion' title='alb' tabindex='1'>
		</div>
	</div>
	<div class="col-md-4">
		<div name="pan_foto" class="col-md-12" style="border: 1px solid #ccc;"><center><img name="img_foto" src=""/></center></div>
		<input name="inp_foto" type="file" accept=".png,.jpg" style="display:none;"/>
		<input name="alb_foto" type='text' class="form-control pull-left" style="width: 142px; margin-top:0px; margin-bottom:0px;"/>
		<button name="btnLoadFoto" class="btn btn-primary pull-left" style="width: 35px; margin:0px; padding-left: 0px; padding-right: 0px;"><i class="fa fa-upload"></i></button>
		<div class="progress progress-sm progress-striped active">
			<div name="divBarraProgreso" class="progress-bar bg-color-darken" style="width: 0%;" role="progressbar"></div>
	 	</div>	
	</div>
</div>
