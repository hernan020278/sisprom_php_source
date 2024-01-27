<!-- row -->

<div class="col-sm-12 col-md-12 col-lg-6" name="divComentario">
	<div class="ui-comentario">
		<img class="ui-avatar" src="img/avatars/sunny.png">
		<span name="btnAgregarComentario" style="height: 100%;">Que estas pensando</span>
	</div>
</div><!-- <div class="col-sm-12 col-md-12 col-lg-6" name="divComentario"> -->

<div class="col-sm-12 col-md-12 col-lg-6">
	<!-- new widget -->
	<div class="jarviswidget" id="wid-id-0" data-widget-togglebutton="false" data-widget-editbutton="false" data-widget-fullscreenbutton="false" data-widget-colorbutton="false" data-widget-deletebutton="false">
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
			<span class="widget-icon"> <i class="glyphicon glyphicon-stats txt-color-darken"></i> </span>
			<h2>Live Feeds </h2>

			<ul class="nav nav-tabs pull-right in" id="myTab">
				<li class="active">
					<a data-toggle="tab" href="#s1"><i class="fa fa-clock-o"></i> <span class="hidden-mobile hidden-tablet">Live Stats</span></a>
				</li>
			</ul>

		</header>

		<!-- widget div-->
		<div class="no-padding">
			<!-- widget edit box -->
			<div class="jarviswidget-editbox">

				test
			</div>
			<!-- end widget edit box -->

			<div class="widget-body">
				<!-- content -->
				<div id="myTabContent" class="tab-content">

					<div class="tab-pane fade active in padding-10 no-padding-bottom" id="s1">
						<div class="widget-body-toolbar bg-color-white">

							<form class="form-inline" role="form">

								<div class="form-group">
									<label class="sr-only" for="s123">Show From</label>
									<input type="email" class="form-control input-sm" id="s123" placeholder="Show From">
								</div>
								<div class="form-group">
									<input type="email" class="form-control input-sm" id="s124" placeholder="To">
								</div>

								<div class="btn-group hidden-phone pull-right">
									<a class="btn dropdown-toggle btn-xs btn-default" data-toggle="dropdown"><i class="fa fa-cog"></i> More <span class="caret"> </span> </a>
									<ul class="dropdown-menu pull-right">
										<li>
											<a href="javascript:void(0);"><i class="fa fa-file-text-alt"></i>Compras</a>
										</li>
										<li>
											<a href="javascript:void(0);"><i class="fa fa-question-sign"></i>Ventas</a>
										</li>
									</ul>
								</div>

							</form>

						</div>
						<div class="padding-10">
							<div id="statsChart" class="chart-large has-legend-unique"></div>
						</div>

					</div><!-- <div class="tab-pane fade" id="s1"> -->

				</div>
				<!-- end content -->
			</div>

		</div>
		<!-- end widget div -->
	</div>
	<!-- end widget -->

</div>
<!-- <div class="col-sm-12 col-md-12 col-lg-6"> -->