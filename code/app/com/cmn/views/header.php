<div id="shortcut">
	<ul>		
	</ul>
</div>
<header id="header">
	<div id="logo-group">
		<span id="logo"> <a href=""><img src="/gestion/sisprom/cmn/imagen/sisprom_small.png" alt="SmartAdmin"></a> </span>
		<?php if(isset($_SESSION['loginValido']) && $_SESSION['loginValido']==true): ?>
		<!-- <span id="activity" class="activity-dropdown pull-right"> <i class="fa fa-user"></i> <b class="badge"> 21 </b> </span>-->
		<?php endif; ?>

<!-- 
		<php if(isset($_SESSION['loginValido']) && $_SESSION['loginValido']==true): ?>
		<form action="<php echo BASURL?>cmn/search" class="header-search pull-left">
			<input type="text" name="q" placeholder="Descubre">
			<button type="submit">
				<i class="fa fa-search"></i>
			</button>
			<a href="javascript:void(0);" id="cancel-search-js" title="Cancel Search"><i class="fa fa-times"></i></a>
		</form>
		<php endif; ?> 
-->	
		
	</div>
	<div class="pull-right">
<!--	  	
		<div id="search-mobile" class="btn-header transparent pull-left">
			<span> <a href="javascript:void(0)" title="Search"><i class="fa fa-search"></i></a> </span>
		</div>
-->		
		<?php if(isset($_SESSION['loginValido']) && $_SESSION['loginValido']==true): ?>
		<div id="user-actions dropdown" class="pull-right">
  			<a href="javascript:void(0);" style="display:block;overflow:hidden;width:50px;height:50px;border-radius:50%;" data-toggle="dropdown" aria-expanded="true">
				<img src="img/avatars/sunny.png" alt="me"/>
			</a>
		  	<div class="dropdown-menu" aria-labelledby="dropdownMenu1">
		  		<li><a onClick="showDialogUserApps()" href="javascript:void(0);">Mis Aplicaciones</a></li>
		  		<li role="presentation" class="divider"></li>
				<li><a id="main_ayuda" href="#">Ayuda</a></li>
				<li><a href="#">Reportar un Error</a></li>
				<?php if(isset($pol_user->vers)): ?>
					<li><a id="main_version" href="#">Version <?php echo $pol_user->vers?></a></li>
				<?php endif; ?>
		  		<li role="presentation" class="divider"></li>
		  		<!-- <li><a href="<php=BASURL?>cmn/login/myaccount">Mi Cuenta</a></li> -->
				<li><a href="<?php echo BASURL?>cmn/login">Salir</a></li>
		  	</div>
		</div>
		<?php endif; ?>
	</div>
	<div id="info_application" class="pull-right"></div>
</header>
<?php if(!isset($_SESSION['loginValido']) || $_SESSION['loginValido']==false): ?>
<div class="popover fade bottom in" style="position:absolute;top: 50px;left:auto; right: 0!important; display: block;">
	<div class="arrow" style="left: 50%;"></div>
	<h3 class="popover-title" style="display: none;"></h3>
	<div class="popover-content" style="text-align:center;">
		Forma parte de nuestra comunidad.<br />
		<a class="btn btn-primary" href="<?php echo BASURL?>cmn/login">Ingresa</a> o <a class="btn btn-danger" href="<?php echo BASURL?>cmn/register">Registrate</a>
	</div>
</div>
<?php endif; ?>
<script>
var lisCom = null;
var showDialogUserApps = function(w){
	if(w==null)w={};
	Sisem.WindowBS({
		politicaSeguridad: 'VALIDADO',
		id:'windowUserApps',
		title:'Mis Aplicaciones',
		url:'cmn/applications/grid_myapps',
		width: 350,
		buttons : [
			{html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
				"class" : "btn btn-default",
				click : function() {
					if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
					else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
					if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
				}
			}
		],
		afterLoad:function(){
			w.$e = $('#windowUserApps');
			Sisem.blockW(w.$e);
			Sisem.ejecutar('cmn/GetListaAppsByUsuario',{usu_kyusu: USERDATA.usu.usu_kyusu}, function(rpta){
				if(rpta.lista.items.length > 0){
					lisCom = rpta.lisCom;
					for(keyCom in lisCom)
					{
						w.$e.find('[name=selLisCom]').append('<option value="'+lisCom[keyCom].com_kycom+'">'+lisCom[keyCom].com_ndoc+' '+lisCom[keyCom].com_nomb+'</option>');
					}
					w.$e.find('[name=selLisCom]').on('change', function(){
						w.$e.find('[name=grid_apps]').empty();
						var com_kycom = $(this).val();
						var flag = true;
						var lisApp = lisCom[com_kycom].lisApp;
						
						for(kyApp in lisApp)
						{							
							var $li = w.$e.find('[name=grid_apps_ref]').clone().children();
							$li.find('[name=panHeaderApp]').addClass('panel-redLight');$li.find('[name=panFooterApp]').addClass('bg-color-redLight');							
							$li.find('a').attr('href','cmn/applications/ejecutar/'+com_kycom+'-'+lisApp[kyApp].pol_kypol);
							$li.find('[name=pol_nomb]').html(lisApp[kyApp].pol_dscr);
							
							$li.find('[name=pol_imin]').attr('src',lisApp[kyApp].pol_imin);
							w.$e.find('[name=grid_apps]').append($li);
						}//w.$e.append($container);						
					});//w.$e.find('[name=selLisCom]').on('change', function(){

					
					console.log(w.$e.find('[name=selLisCom]').val() + ' - ' + USERDATA.com.com_kycom);
					if(w.$e.find('[name=selLisCom]').val()!=USERDATA.com.com_kycom){w.$e.find('[name=selLisCom]').val(USERDATA.com.com_kycom);}
					w.$e.find('[name=selLisCom]').trigger('change');
					
				}else{
					w.$e.html("Usted no tiene applicaciones disponibles en estos momentos");
				}
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('cmn/GetListaAppsByUsuario',{}, function(rpta){
		}
	});
}

USERDATA = {};
jQuery(document).ready(function(){
	$.ajaxSetup({
		data: {kycom:parseFloat('<?php echo ((count($this->util->segmentourl)==6)? $this->util->segmentourl[5] : "0");?>')}
	});
	moment.locale("es");
	ahora = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
	
	USERDATA=<?php echo json_encode($userdata);?>;
	$_ul='';
	$_ul+='<ul id="sparks" style="margin: 10px 0px 0px 0px; padding: 0px;">';
		if(USERDATA.eem){$_ul+='<li class="sparks-info"><h5>Empresa<span name="main_emp_nomb" class="txt-color-blue"></span></h5></li>'};
		if(USERDATA.suc){$_ul+='<li class="sparks-info"><h5>Sucursal<span name="main_suc_nomb" class="txt-color-blue"></span></h5></li>'};
		if(USERDATA.usu){$_ul+='<li class="sparks-info"><h5>Usuario<span name="main_usu_mail" class="txt-color-blue"></span></h5></li>'};
//		if(USERDATA.tra){$_ul+='<li class="sparks-info"><h5>Empleado<span name="main_tra_nomb" class="txt-color-blue"></span></h5></li>'};
// 		if(USERDATA.eem){$_ul+='<li class="sparks-info"><h5>Compra<span name="main_ope_ccmp" class="txt-color-blue"></span></h5></li>'};
// 		if(USERDATA.eem){$_ul+='<li class="sparks-info"><h5>Venta<span name="main_ope_cven" class="txt-color-blue"></span></h5></li>'};
	$_ul+='</ul>';
	$('#info_application').append($_ul);

	if(USERDATA.usu){$('[name=main_usu_mail]').html(USERDATA.usu.usu_mail)};
	if(USERDATA.eem){$('[name=main_emp_nomb]').html(USERDATA.eem.usu_nomb);}
	if(USERDATA.suc){$('[name=main_suc_nomb]').html(USERDATA.suc.suc_nomb);}
	if(USERDATA.tra){$('[name=main_tra_nomb]').html(USERDATA.tra.tra_nomb);}
	//USERDATA.lisPro=[{secc:'MISC',prop:'IGV',valu: 18.00},{secc:'MISC',prop:'QTYDECIMALS',valu: 2},{secc:'MISC',prop:'IMPDECIMALS',valu: 2}];

	$('#main_ayuda').attr('href','http://www.sisprom.com/help/help.html');
});
</script>