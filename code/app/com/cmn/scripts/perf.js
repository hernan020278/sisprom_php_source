var perf = {
	pag:{
		alias		: 'Perfil',
		nameWB		: 'brwPerfil',
		nameWP		: 'winPerfil',
		nameWS		: 'selPerfil',
		nameWI		: 'intPerfil',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwPerfil',
		idGridWP	: 'idWinPerfil',
		idGridWS	: 'idSelPerfil',
		idGridWI	: 'idIntPerfil'
	},
	tipPag: {
		"PERFIL":{'name': 'Perfil', 'alias': 'Perfil'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/regl']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		perf.winBrow(w);
	},
	winBrow : function(w){
		perf.import(function(){
			if(w==null)w=new Object;
			perf.setPagina(w);
			perf[w.pag.nameWB] = w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					perf.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//perf.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		perf.import(function(){
			if(w==null)w=new Object;
			perf.setPagina(w);
			perf[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:400,
				height:350,
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
							perf.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							perf.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
									
					perf.iniciarFormulario(w);
					
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//perf.import(function(){
	},
	winSel:function(w){
		perf.import(function(){
			if(w==null)w=new Object;
			perf.setPagina(w);
			perf[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:600,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								perf.cerrarFormulario(w);
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
										perf.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						click : function() {
							perf.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					perf.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//perf.import(function(){
	},		
	winInt:function(w){
		perf.import(function(){
			if(w==null)w=new Object;
			perf.setPagina(w);
			perf[w.pag.nameWI] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWI+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&enlace='+w.enlace,
				beforeLoad:function(){
				},
				afterLoad:function(data){
					w.$e = $('#'+w.cntInt);
					perf.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//perf.import(function(){
	},	
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['cmn/brw_perf']}, function(rpta){
			if(rpta){brw_perf.ejecutar($.extend(w,{modulo:'controllers', archivo: 'cmn/brw_perf'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){perf.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){perf.llenarFormulario(w);}
		perf.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'prf',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=prf_kyprf]').val('');
		w.$e.find('[name=prf_nomb]').val('');
		w.$e.find('[name=prf_dscr]').val('');
		w.$e.find('[name=prf_esta]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = {};
		var prf = Sisem.obtenerParametrosJson(w.$e);
		prf.prf_kyprf = ((w.modo=='AGREGAR')?'0':w.$e.find('[name=prf_kyprf]').val());
		
		$.extend(data,{
			comando: w.modo,
			prf: prf
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=prf_kyprf]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=prf_kyprf]').val())){
			Sisem.ejecutar('cmn/GetListaPerfil',{prf_kyprf: w.$e.find('[name=prf_kyprf]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					
					w.$e.find('[name=prf_kyprf]').val(fila.prf_kyprf);
					w.$e.find('[name=prf_nomb]').val(fila.prf_nomb);
					w.$e.find('[name=prf_dscr]').val(fila.prf_dscr);
					w.$e.find('[name=prf_esta]').val(fila.prf_esta);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('adm/GetListaPropiedad',{prf_kyprf: w.$e.find('[name=prf_kyprf]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=prf_kyprf]').val())){
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
				
				perf.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				perf.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				perf.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=prf_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=prf_dscr]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'prf','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='PRPGEN'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: perf.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+perf.tipPag[w.tipo]['name'],
			nameWP		: 'win'+perf.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+perf.tipPag[w.tipo]['name'],
			nameWI		: 'int'+perf.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+perf.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+perf.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+perf.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+perf.tipPag[w.tipo]['name']
		});
		perf.tipPagAct = w.tipo;
	},	
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		perf.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			size: 'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			perf.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(perf.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=perf.obtenerDatoFormulario(w);
				Sisem.ejecutar('cmn/CtrlPerfil',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=prf_kyprf]').val(rpta.prf_kyprf);
						$.extend(w,{modo: 'VISUALIZAR'});
						perf.cerrarFormulario($.extend(w,{data : perf.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('CtrlPropiedad',data, function(rpta){
			}//if(perf.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			perf.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			perf.iniciarFormulario(w);
		}
	}
	////////////////////////
	//Metodos varios      //
	////////////////////////
};
