<!-- <aside id="left-panel"> -->
<!-- User info -->
<!-- 	<div class="login-info"> -->
<!-- 		<span> <!-- User image size is adjusted inside CSS, it should stay as it --> 
<!-- 			<a href="javascript:void(0);" id="show-shortcut"> -->
<!-- 				<img src="img/avatars/sunny.png" alt="me" class="online" />  -->
<!-- 				<span> -->
<!-- 					< echo $userdata["nomb"]." ".$userdata["apel"]?> -->
<!-- 				</span> -->
<!-- 				<i class="fa fa-angle-down"></i> -->
<!-- 			</a>  -->
<!-- 		</span> -->
<!-- 	</div> -->
<!-- 	<nav> -->
<!-- 	</nav> -->
<!-- 	<span class="minifyme"> <i class="fa fa-arrow-circle-left hit"></i> </span> -->
<!-- </aside> -->
<!-- END NAVIGATION -->

<!-- MAIN PANEL -->
<!-- <div class="div-clear"></div> -->
<div id="main" role="main" >

	<!-- RIBBON -->
	<div class="row" style="background: #57889C;">
		<div style="float: left;  margin:0px 0px 0px 17px;">
			<div class="smart-form" style="float: left;">
				<label class="checkbox"><input type="checkbox" name="main_sel_sucu" checked><i></i></label>
			</div>	
			<div style="float: left;">
		   		<select name="main_kysuc" style="height: 20px; line-height: 20px;" class="form-control" title='doc' placeholder='Tipo Documento'></select>
			</div>
			<div style="float: left;">
		   		<!-- <ol class="breadcrumb" name="olMenuHistorial"></ol> -->
		   		<ol style="" name="olMenuHistorial"></ol>
			</div>
		</div>
	</div>
	<!-- END RIBBON -->

	<!-- MAIN CONTENT -->
	<div id="content">
		<!-- widget grid -->
<!-- 		<section id="widget-grid" class=""> -->

			<!-- row -->
<!-- 			<div class="row"> -->

				<!-- NEW WIDGET START -->
<!-- 				<article class="col-xs-12 col-sm-12 col-md-12 col-lg-12"> -->

					<div class="widget-body" id="mainPanel">
						<div id='menuGrid'>
						</div>							
					</div>

<!-- 				</article> -->
				<!-- WIDGET END -->
<!-- 			</div> -->
<!-- 		</section> -->
	</div>
	<!-- END MAIN CONTENT -->
</div>
<script>
USERDATA = {};
jQuery(document).ready(function(){
	$.ajaxSetup({
		data: {kycom:parseFloat('<?php echo ((count($this->util->segmentourl)==6)? $this->util->segmentourl[5] : "0");?>')}
	});
	moment.locale("es");
	ahora = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	
	USERDATA=<?php echo json_encode($userdata);?>;
	// $_ul='';
	// $_ul+='<ul id="sparks" class="">';
	// 	if(USERDATA.com){$_ul+='<li class="sparks-info"><h5>Empresa<span name="main_emp_nomb" class="txt-color-blue"></span></h5></li>'};
	// 	if(USERDATA.suc){$_ul+='<li class="sparks-info"><h5>Sucursal<span name="main_suc_nomb" class="txt-color-blue"></span></h5></li>'};
	// 	if(USERDATA.usu){$_ul+='<li class="sparks-info"><h5>Usuario<span name="main_usu_mail" class="txt-color-blue"></span></h5></li>'};
	// 	if(USERDATA.tra){$_ul+='<li class="sparks-info"><h5>Empleado<span name="main_tra_nomb" class="txt-color-blue"></span></h5></li>'};
	// 	if(USERDATA.com){$_ul+='<li class="sparks-info"><h5>Compra<span name="main_ope_ccmp" class="txt-color-blue"></span></h5></li>'};
	// 	if(USERDATA.com){$_ul+='<li class="sparks-info"><h5>Venta<span name="main_ope_cven" class="txt-color-blue"></span></h5></li>'};
	// $_ul+='</ul>';
	// $('#info_application').append($_ul);

	// if(USERDATA.usu){$('[name=main_usu_mail]').html(USERDATA.usu.usu_mail)};
	// if(USERDATA.com){$('[name=main_emp_nomb]').html(USERDATA.com.com_nomb);}
	// if(USERDATA.suc){$('[name=main_suc_nomb]').html(USERDATA.suc.suc_nomb);}
	// if(USERDATA.tra){$('[name=main_tra_nomb]').html(USERDATA.tra.tra_nomb);}
	//USERDATA.lisPro=[{secc:'MISC',prop:'IGV',valu: 18.00},{secc:'MISC',prop:'QTYDECIMALS',valu: 2},{secc:'MISC',prop:'IMPDECIMALS',valu: 2}];
	
	$('#main_ayuda').attr('href','http://www.sisprom.com/help/help.html');
	
	var w = new Object();
	w.$e = $('#mainPanel').children('#menuGrid');
	Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypdr: 0, pol_nive: 1, pol_trig: 'open'}));
});
</script>
<script src="<?php echo BASURL?>js/fullcalendar/jquery.fullcalendar.min.js"></script>
<script src="<?php echo BASURL?>app/com/sld/scripts/init.js"></script>