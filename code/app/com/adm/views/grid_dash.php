<div class="row" style="padding: 0px 20px 0px 20px;">
	<div class="col-md-1 col-lg-1">
		<div class="input-group input-group-sm">
			<span class="input-group-btn"><button name="btnPeriodo" class="btn btn-info" title="" tabindex=''><i class="fa fa-tasks"></i></button></span>
			<input type="text" name="ope_pini" class="form-control input-sm" style="padding: 0px 0px 0px 0px;" placeholder="yyyy-mm-dd" title="ope" tabindex="1"/>
		</div>
	</div>
	<div class="col-md-1 col-lg-1"><input type="text" name="ope_pfin" class="form-control input-sm" placeholder="yyyy-mm-dd" title="ope" tabindex="1"/></div>
	<div class="col-md-1 col-lg-1"><select name="bal_niv0"  class="form-control input-sm" title="ope" placeholder="Entidad" tabindex="14"></select></div>
	<div class="col-md-1 col-lg-1"><select name="bal_niv1"  class="form-control input-sm" title="ope" placeholder="Cuenta" tabindex="14"></select></div>
	<div class="col-md-1 col-lg-1">
		<div class="input-group input-group-sm">
			<select name="bal_niv2" class="form-control" title="ope" placeholder="Clase" tabindex="14"></select>
			<span class="input-group-btn"><button name="btnRefreshDashgeneral" class="btn btn-info" title="" tabindex=''><i class="fa fa-refresh"></i></button></span>
		</div>
	</div>
</div>

<div class="div-clear"></div>

<div class="row" style="padding: 0px 11px 0px 11px;">

	<!-- BALANCE GENERAL -->
	<div class="col-sm-12 col-md-6 col-lg-6">

		<!-- new widget -->
		<div class="jarviswidget" id="wid-id-0" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-colorbutton="false" data-widget-deletebutton="false">
			<header>
				<span class="widget-icon"> <i class="glyphicon glyphicon-stats txt-color-darken"></i> </span>
				<h2 name="etiDashActual">General</h2>
				<ul class="nav nav-tabs pull-right in" id="myTab">					
					<li class="active"><a data-toggle="tab" href="#tabDashGeneral" name="btnDashGeneral"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">General</span></a></li>
					<li><a data-toggle="tab" href="#tabDashCosto" name="btnDashCosto"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Costos</span></a></li>
					<li><a data-toggle="tab" href="#tabDashAnterior" name="btnDashAnterior"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Anterior</span></a></li>
					<li><a data-toggle="tab" href="#tabDashIngreso" name="btnDashIngreso"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Ingresos</span></a></li>
					<li><a data-toggle="tab" href="#tabDashEgreso" name="btnDashEgreso"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Egresos</span></a></li>
					<li><a data-toggle="tab" href="#tabDashGrafico" name="btnDashGrafico"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Grafico</span></a></li>									
				</ul>
			</header>
			<!-- widget div-->
			<div class="no-padding">
				<div class="widget-body">
					<!-- content -->
					<div id="myTabContent" class="tab-content">
					
						<div class="tab-pane fade active in padding-5 no-padding-bottom" id="tabDashGeneral">

              <div class="widget-body widget-hide-overflow">

             	  <div class="table-responsive" name="grid">
             	  
                </div>
                
              </div><!--<div class="widget-body widget-hide-overflow no-padding">-->

						</div><!-- <div class="tab-pane fade active in padding-10 no-padding-bottom" id="tabDashGeneral"> -->

						<div class="tab-pane fade in padding-10 no-padding-bottom" id="tabDashGrafico">
						
							<div class="widget-body-toolbar bg-color-white smart-form" id="rev-toggles">
								<div class="inline-group">
									<label for="gra-0" class="checkbox"><input type="checkbox" name="gra-0" id="gra-0" checked="checked"><i></i> Anterior</label>
									<label for="gra-1" class="checkbox"><input type="checkbox" name="gra-1" id="gra-1" checked="checked"><i></i> Costo</label>
									<label for="gra-2" class="checkbox"><input type="checkbox" name="gra-2" id="gra-2" checked="checked"><i></i> Ingreso</label>
									<label for="gra-3" class="checkbox"><input type="checkbox" name="gra-3" id="gra-3" checked="checked"><i></i> Gastos</label>
									<label for="gra-4" class="checkbox"><input type="checkbox" name="gra-4" id="gra-4" checked="checked"><i></i> Utilidad</label>
								</div>
							</div><!-- <div class="widget-body-toolbar bg-color-white smart-form" id="rev-toggles"> -->
							<div class="row no-space">
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<div class="padding-10">
										<div id="flotcontainer" class="chart-large has-legend-unique"></div>
									</div>
								
								</div>
								<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 show-stats">
						
									<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
											<p style="font-size: 14px; font-weight: bold; text-align: center;">Presupuesto General</p>
										</div>
									</div>
								
									<div class="row">
										<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> <span class="text"> Anterior <span name="spnTotaAnte" class="pull-right">130/200</span> </span>
											<div class="progress"><div name="prgTotaAnte" class="progress-bar bg-color-blueDark" style="width: 65%;"></div></div> 
										</div>
										<div class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> Costo <span name="spnTotaCost" class="pull-right">440 GB</span> </span>
											<div class="progress"><div name="prgTotaCost" class="progress-bar bg-color-blue" style="width: 34%;"></div></div> 
										</div>
										<div class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> Ingreso <span name="spnTotaIngr" class="pull-right">77%</span> </span>
											<div class="progress"><div name="prgTotaIngr" class="progress-bar bg-color-blue" style="width: 77%;"></div></div> 
										</div>
										<div class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> Egreso <span name="spnTotaEgre" class="pull-right">7 Days</span> </span>
											<div class="progress"><div name="prgTotaEgre" class="progress-bar bg-color-greenLight" style="width: 84%;"></div></div> 
										</div>
										<div class="col-xs-6 col-sm-6 col-md-12 col-lg-12"> <span class="text"> Utilidad <span name="spnTotaUtil" class="pull-right">7 Days</span> </span>
											<div class="progress"><div name="prgTotaUtil" class="progress-bar bg-color-greenLight" style="width: 84%;"></div></div> 
										</div>
										
										<span class="show-stat-buttons"> <span class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <a href="javascript:void(0);" class="btn btn-default btn-block hidden-xs">Generate PDF</a> </span> <span class="col-xs-12 col-sm-6 col-md-6 col-lg-6"> <a href="javascript:void(0);" class="btn btn-default btn-block hidden-xs">Report a bug</a> </span> </span>
						
									</div>
						
								</div>
							</div><!-- <div class="row"> -->
						</div><!-- <div class="tab-pane fade" id="tabDashGrafico"> -->
						
						<!-- INICIO : TAB COSTO  -->
						<div class="tab-pane fade in padding-10 no-padding-bottom" id="tabDashCosto">
						
							<div class="widget-body widget-hide-overflow">										
							
 								<div id="gridDashCosto"></div> 
										
							</div><!-- <div class="widget-body widget-hide-overflow no-padding"> -->
						
						</div>
						<!-- FIN : TAB COSTO  -->
						
						<!-- INICIO : TAB ANTERIOR -->
						<div class="tab-pane fade in padding-10 no-padding-bottom" id="tabDashAnterior">
						
							<div class="widget-body widget-hide-overflow">									
							
								<div id="gridDashAnterior"></div>
										
							</div><!-- <div class="widget-body-toolbar bg-color-white"> -->
															
						</div><!-- <div class="tab-pane fade active in padding-10 no-padding-bottom" id="tabDashIngreso"> -->
						<!-- FIN : TAB ANTERIOR -->
						
						<!-- INICIO : TAB INGRESO -->
						<div class="tab-pane fade in padding-10 no-padding-bottom" id="tabDashIngreso">
						
							<div class="widget-body widget-hide-overflow">									
							
								<div id="gridDashIngreso"></div>
										
							</div><!-- <div class="widget-body-toolbar bg-color-white"> -->
															
						</div><!-- <div class="tab-pane fade active in padding-10 no-padding-bottom" id="tabDashIngreso"> -->
						<!-- FIN : TAB INGRESO  -->
						
						<!-- INICIO : TAB EGRESO  -->
						<div class="tab-pane fade in padding-10 no-padding-bottom" id="tabDashEgreso">
						
							<div class="widget-body widget-hide-overflow">
							
								<div id="gridDashEgreso"></div>
										
							</div><!-- <div class="widget-body widget-hide-overflow no-padding"> -->
						
						</div><!-- <div class="tab-pane fade active in padding-10 no-padding-bottom" id="tabDashIngreso"> -->
						<!-- FIN : TAB EGRESO  -->
						
					</div><!-- end content -->
					
				</div><!-- <div class="widget-body">  -->

			</div><!-- end widget div -->
			
		</div><!-- end widget -->
	
	</div><!-- <div class="col-sm-12 col-md-6 col-lg-6"> -->

	<!-- OPERACIONES DE OPERACIONES -->

	<div class="col-sm-12 col-md-6 col-lg-6">

		<!-- new widget -->
		<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false" data-widget-fullscreenbutton="false">
			<!-- widget options:
			usage: <div class="jarviswidget" id="wid-id-0" data-widget-editbutton="false">
			data-widget-colorbutton="false"
			data-widget-editbutton="false"
			data-widget-togglebutton="false"
			data-widget-deletebutton="false"
			data-widget-fullscreenbutton="false"
			data-widget-custombutton="false"
			data-widget-collapsed="true"
			data-widget-sortable="false"
			-->
			<header>
				<span class="widget-icon"> <i class="fa fa-comments txt-color-white"></i> </span>
				<h2> Registro de Operaciones </h2>
			</header>

			<div><!-- widget div-->

				<div class="widget-body widget-hide-overflow no-padding">

					<div id="gridDashOperacion"></div>

				</div><!--<div class="widget-body widget-hide-overflow no-padding">-->

			</div><!-- end widget div -->
		
		</div><!--<div class="jarviswidget jarviswidget-color-blueDark" id="wid-id-1" data-widget-editbutton="false" data-widget-fullscreenbutton="false">-->

	</div><!-- <div class="col-sm-12 col-md-12 col-lg-6"> -->

</div>