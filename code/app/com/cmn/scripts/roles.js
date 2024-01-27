var roles = {
	pag:{
		alias		: 'Roles',
		nameWB		: 'brwRoles',
		nameWP		: 'winRoles',
		nameWS		: 'selRoles',
		nameWI		: 'intRoles',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwRoles',
		idGridWP	: 'idWinRoles',
		idGridWS	: 'idSelRoles',
		idGridWI	: 'idIntRoles'
	},
	tipPag: {
		"ROLES":{'name': 'Roles', 'alias': 'Rol'}
	},
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/perf', 'cmn/regl']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		roles.winBrow(w);
	},
	winBrow : function(w){
		roles.import(function(){
			if(w==null)w=new Object;
			roles.setPagina(w);
			roles[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					roles.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//roles.import(function(){
	},
	winPop:function(w){
		roles.import(function(rpta){
			if(w==null)w=new Object;
			roles.setPagina(w);
			roles[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 600 : 900),
				height:((w.size && w.size=='short') ? 350 : 550),
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						class : "btn btn-primary",
						name : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							roles.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							roles.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);

					roles.iniciarFormulario(w);

					Sisem.validarControlesColor(w.$e,'pol',w.modo);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);

				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//roles.import(function(){
	},
	winSel:function(w){
		roles.import(function(){
			if(w==null)w=new Object;
			roles.setPagina(w);
			roles[w.pag.nameWS] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:((w.size && w.size=='short') ? 600 : 900),
				height:((w.size && w.size=='short') ? 350 : 550),
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWS+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								roles.cerrarFormulario(w);
							}else{
								if(w.$e.find('[name=grid] .highlights').length>0){
									var data = new Object();
									if(w.$e.find('[name=grid] .highlights').length>1)
									{
										data.items = [];
										for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
										{
											data.items.push(w.$e.find('[name=grid] .highlights').eq(ite).data('data'));
										}//for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
									}//if(w.$e.find('[name=grid] .highlights').length==1){
									else if(w.$e.find('[name=grid] .highlights').length==1)
									{
										data = w.$e.find('[name=grid] .highlights').data('data');
									}
									roles.cerrarFormulario($.extend(w, {data: data}));
								}else{
									return $.smallBox({
										title : "Respuesta!",
										content : "Tiene que seleccionar un item para continuar",
										color : "#C46A69",
										timeout: 8000,
										icon : "fa fa-bell swing animated"
									});
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						click : function() {
							roles.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					roles.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//roles.import(function(){
	},
	winInt:function(w){
		roles.import(function(){
			if(w==null)w=new Object;
			roles.setPagina(w);
			roles[w.pag.nameWI] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					console.log(w.usu);
					w.$e = $('#'+w.cntInt);
					roles.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//roles.import(function(){
	},	
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['cmn/brw_roles']}, function(rpta){
			if(rpta){brw_roles.ejecutar($.extend(w,{modulo:'controllers', archivo: 'cmn/brw_roles'}));}
		});
	},
	iniciarFormulario:function(w){
		roles.limpiarFormulario(w);
		roles.llenarFormulario(w);
		roles.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=cat_kycat]').val('');
		w.$e.find('[name=cat_nomb]').val('');
		w.$e.find('[name=cat_dscr]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			cat_kycat: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=cat_kycat]').val()),
			cat_tipo: w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=cat_kycat]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=cat_kycat]').val())){
			Sisem.ejecutar('erp/GetListaRoles',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var cat = rpta.lista.items[0];
					w.$e.find('[name=cat_kycat]').val(cat.cat_kycat);
					w.$e.find('[name=cat_nomb]').val(cat.cat_nomb);
					w.$e.find('[name=cat_dscr]').val(cat.cat_dscr);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaRoles',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=cat_kycat]').val())){
		else{Sisem.unblockW(w.$e);}
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.modo+' '+w.pag.alias);}
		else{w.$e.parent().find('.ui-dialog-title').html(w.modo+' '+w.pag.alias);}
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(w.ky){
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'NARANJA');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				roles.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				roles.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				roles.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		w.$e.find('[name=cat_kycat]').attr('disabled',true);
		Sisem.activar(w.$e.find('[name=cat_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=cat_dscr]'), w.activar);
	},
	validarFormulario:function(w){
		if(Sisem.validarControles(w.$e,'cat')){return true;}
		return false;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='ART'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: roles.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+roles.tipPag[w.tipo]['name'],
			nameWP		: 'win'+roles.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+roles.tipPag[w.tipo]['name'],
			nameWI		: 'int'+roles.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+roles.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+roles.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+roles.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+roles.tipPag[w.tipo]['name']
		});
	},	
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		perf.winSel({
			tipo: 'PERFIL',
			modo:'SELECCIONAR',
			callback:function(data){
				var dtmp = {comando: 'AGREGAR', rol: {rol_kyrol: 0, rol_kycom: USERDATA.com.com_kycom, rol_kyusu: w.usu.usu_kyusu, rol_kyprf: data.prf_kyprf}};
				Sisem.ejecutar('cmn/CtrlRoles',dtmp, function(rpta){
					if(rpta.msg.type=='success')
					{
						if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			roles.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(roles.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = roles.obtenerDatoFormulario(w);
				Sisem.ejecutar('CtrlRoles',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=pol_kypol]').val(rpta.pol_kypol);
						$.extend(w,{modo: 'VISUALIZAR'});
						roles.cerrarFormulario($.extend(w,{data : roles.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(roles.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			roles.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			roles.iniciarFormulario(w);
		}
	},
	//////////////////////
	//Metodos Utilitarios//
	//////////////////////
};
