<input type="hidden" name="com_kycom">
<div class="widget-body fuelux">
	<div class="wizard">
		<ul class="steps">
			<li data-target="#step1" class="active">
				<span class="badge badge-info">1</span>Datos Generales<span class="chevron"></span>
			</li>
			<li data-target="#step2">
				<span class="badge">2</span>Perfil<span class="chevron"></span>
			</li>
			<li data-target="#step3">
				<span class="badge">3</span>Verificaci&oacute;n<span class="chevron"></span>
			</li>
		</ul>
		<div class="actions">
			<button type="button" class="btn btn-sm btn-primary btn-prev">
				<i class="fa fa-arrow-left"></i>Anterior
			</button>
			<button type="button" class="btn btn-sm btn-success btn-next" data-last="Finish">
				Siguiente<i class="fa fa-arrow-right"></i>
			</button>
		</div>
	</div>
	<div class="step-content">
			<div class="step-pane active" id="step1">
				<h3><strong>Step 1 </strong> - Acerca de la comunidad</h3>
				<!-- wizard form starts here -->
				<fieldset>
					<div class="form-group">
						<label class="col-md-3 control-label">Nombre <small>(*)</small></label>
						<div class="col-md-9">
							<div class="input-group">
								<input class="form-control" type="text" name="com_nomb">
								<span class="input-group-addon"></span>
							</div>
							<span class="help-block"></span>
						</div>
					</div>
				</fieldset>
			</div>
			<div class="step-pane" id="step2">
				<h3><strong>Step 2 </strong> - Acerca del perfil P&uacute;blico</h3>
				<div class="form-group">
					<label class="col-md-3 control-label">Enlace <small>(*)</small></label>
					<div class="col-md-9">
						<div class="input-group">
							<span class="input-group-addon">http://www.sisprom.com/p/</span>
							<input class="form-control" type="text" name="com_lkpr">
							<span class="input-group-addon"></span>
						</div>
						<span class="help-block"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">Alias <small>(*)</small></label>
					<div class="col-md-9">
						<div class="input-group">
							<input class="form-control" type="text" name="com_dscr">
							<span class="input-group-addon"></span>
						</div>
						<span class="help-block"></span>
					</div>
				</div>
				<div class="form-group">
					<label class="col-md-3 control-label">Biografia</label>
					<div class="col-md-9">
						<div class="input-group">
							<textarea class="form-control" name="com_biog"></textarea>
							<span class="input-group-addon"></span>
						</div>
						<span class="help-block"></span>
					</div>
				</div>
			</div>
			<div class="step-pane" id="step3">
				<h3><strong>Step 3 </strong> - Terminado!</h3>
				<br>
				<br>
				<h1 class="text-center text-success"><i class="fa fa-check"></i> Felicitaiones!
				<br>
				<small>Click en "finish" para crear la comunidad y empezar a disfrutar de todas las bondades de Sisprom</small></h1>
				<br>
				<br>
				<br>
				<br>
			</div>
	</div>
</div>