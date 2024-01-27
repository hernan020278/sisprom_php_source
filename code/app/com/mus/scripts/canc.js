var canc = {
	pag:{
		alias		: 'Cancion',
		nameWB		: 'brwCancion',
		nameWP		: 'winCancion',
		nameWS		: 'selCancion',
		nameWI		: 'intCancion',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwCancion',
		idGridWP	: 'idWinCancion',
		idGridWS	: 'idSelCancion',
		idGridWI	: 'idIntCancion'
	},
	tipPag: {
		"CANC":{'name': 'Cancion', 'alias': 'Cancion'}
	},
	tipPagAct: '',
	paginaActual: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['mus/letr']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		canc.winBrow(w);
	},
	winBrow : function(w){
		canc.import(function(){
			if(w==null)w=new Object;
			canc.setPagina(w);
			canc[w.pag.nameWB] = w;
			canc.paginaActual = w.pag.nameWB;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),				
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					canc.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//canc.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		canc.import(function(){
			if(w==null)w=new Object;
			canc.setPagina(w);
		    canc[w.pag.nameWP] = w;
			canc.paginaActual = w.pag.nameWP;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:450,
				height:450,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						class : "btn btn-primary",
						name : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							canc.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							canc.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					canc.iniciarFormulario(w);
					Sisem.validarControlesColor(w.$e,'cnc',w.modo);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
					
					w.$e.find("input[name=cnc_nomb]").focus();
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//canc.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		canc.import(function(){
			if(w==null)w=new Object;
			canc.setPagina(w);
			canc[w.pag.nameWS] = w;
			canc.paginaActual = w.pag.nameWS;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:700,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								canc.cerrarFormulario(w);
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
									canc.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							canc.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					canc.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},		
	winInt:function(w){
		canc.import(function(){
			if(w==null)w=new Object;
			canc.setPagina(w);
			enti[w.pag.nameWI] = w;
			canc.paginaActual = w.pag.nameWI;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					canc.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//canc.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: [USERDATA.app.pol_temp+'/brw_canc']}, function(rpta){
			if(rpta){brw_canc.ejecutar($.extend(w,{modulo:'controllers', archivo: USERDATA.app.pol_temp+'/brw_canc'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){canc.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){canc.llenarFormulario(w);}
		canc.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
		console.log(w.alb);
		if(typeof w.alb != "undefined"){w.$e.find('[name=cnc_kyalb]').val(w.alb.alb_kyalb);}
//		w.$e.find('[name=cnc_kycnc]').val('');
		w.$e.find('[name=cnc_nomb]').val('');
		w.$e.find('[name=cnc_auto]').val('');
		w.$e.find('[name=cnc_urla]').val('');	
		w.$e.find('[name=cnc_urlb]').val('');	
		w.$e.find('[name=cnc_urlc]').val('');	
		w.$e.find('[name=cnc_urld]').val('');	
		w.$e.find('[name=cnc_urle]').val('');	
		w.$e.find('[name=cnc_urlf]').val('');	
		w.$e.find('[name=cnc_urlg]').val('');	
		w.$e.find('[name=cnc_urlh]').val('');
		w.$e.find('[name=cnc_urli]').val('');
		w.$e.find('[name=cnc_urlt]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJsonCamelCase(w.$e);
		$.extend(data,{
			comando: w.modo,
			cnc_kycnc: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=cnc_kycnc]').val()),
			tipo:w.tipo
		});
		return data;
	},	
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=cnc_kycnc]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=cnc_kycnc]').val())){
			Sisem.ejecutar('mus/GetListaCancion',{cnc_kycnc: w.$e.find('[name=cnc_kycnc]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var cnc = rpta.lista.items[0];					
					w.$e.find('[name=cnc_kyalb]').val(cnc.cnc_kyalb);
					w.$e.find('[name=cnc_kycnc]').val(cnc.cnc_kycnc);
					w.$e.find('[name=cnc_nomb]').val(cnc.cnc_nomb);
					w.$e.find('[name=cnc_auto]').val(cnc.cnc_auto);
					w.$e.find('[name=cnc_urla]').val(cnc.cnc_urla);
					w.$e.find('[name=cnc_urlb]').val(cnc.cnc_urlb);
					w.$e.find('[name=cnc_urlc]').val(cnc.cnc_urlc);
					w.$e.find('[name=cnc_urld]').val(cnc.cnc_urld);
					w.$e.find('[name=cnc_urle]').val(cnc.cnc_urle);
					w.$e.find('[name=cnc_urlf]').val(cnc.cnc_urlf);
					w.$e.find('[name=cnc_urlg]').val(cnc.cnc_urlg);
					w.$e.find('[name=cnc_urlh]').val(cnc.cnc_urlh);
					w.$e.find('[name=cnc_urli]').val(cnc.cnc_urli);
					w.$e.find('[name=cnc_urlt]').val(cnc.cnc_urlt);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('mus/GetListaCancion',{cnc_kycnc: w.$e.find('[name=cnc_kycnc]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=prp_kyprp]').val())){
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
				
				canc.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				canc.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				canc.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=cnc_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_auto]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urla]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urlb]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urlc]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urld]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urle]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urlf]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urlg]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urlh]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urli]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnc_urlt]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'cnc','VALIDAR')){return false;}
		return true;
	},
	validarServidor: function(w, callback){
		var data=canc.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(canc.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
			}
			else if(rpta.msg.type=="error")
			{
				Sisem.msgBox(rpta.msg.type, rpta.msg.text);
				return callback(false);
			}
		});
	},	
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='CANC';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: canc.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+canc.tipPag[w.tipo]['name'],
			nameWP		: 'win'+canc.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+canc.tipPag[w.tipo]['name'],
			nameWI		: 'int'+canc.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+canc.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+canc.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+canc.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+canc.tipPag[w.tipo]['name']
		});
		canc.tipPagAct = w.tipo;
	},
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		canc.winPop({
			modo:'AGREGAR',
			alb :w.alb,
			tipo: 'CANC',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});		
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			canc.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(canc.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = canc.obtenerDatoFormulario(w);
				Sisem.ejecutar('mus/CtrlCancion',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=cnc_kycnc]').val(rpta.cnc_kycnc);
						$.extend(w,{modo: 'VISUALIZAR'});
						canc.cerrarFormulario($.extend(w,{data : canc.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(canc.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			canc.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			canc.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
};