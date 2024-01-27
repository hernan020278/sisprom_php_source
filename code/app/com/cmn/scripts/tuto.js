var tuto = {
	pag:{
		alias		: 'Tutorial',
		nameWB		: 'brwTutorial',
		nameWP		: 'winTutorial',
		nameWS		: 'selTutorial',
		nameWI		: 'intTutorial',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwTutorial',
		idGridWP	: 'idWinTutorial',
		idGridWS	: 'idSelTutorial',
		idGridWI	: 'idIntTutorial'
	},
	tipPag: {
		"TUTO":{'name': 'Tutorial', 'alias': 'Tutorial Sistema'}
	},
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:[]}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		tuto.winBrow(w);
	},
	winBrow : function(w){
		tuto.import(function(){
			if(w==null)w=new Object;
			tuto.setPagina(w);
			tuto[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					tuto.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//tuto.import(function(){
	},
	winPop:function(w){
		tuto.import(function(){
			if(w==null)w=new Object;
			tuto.setPagina(w);
			tuto[w.pag.nameWP] = w;
			w.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.modo+' '+w.pag.alias,
				width:600,
				height:350,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP,
				modal:false,
				buttons : [
//					{
//						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
//						"class" : "btn btn-primary",
//						name : "btnAgregar",
//						tabindex : "1",
//						placeholder : "Presione ENTER",
//						click : function() {
//							tuto.btnAgregarClick(w);
//						}
//					},{
//						html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
//						"class" : "btn btn-primary",
//						name : "btnModificar",
//						tabindex : "1",
//						placeholder : "Presione ENTER",
//						click : function() {
//							tuto.btnModificarClick(w);
//						}
//					},{
//						html : "<i class='fa fa-check'></i><span name='etiBuscar'>Imprimir</span>",
//						"class" : "btn btn-primary",
//						name : "btnImprimir",
//						tabindex : "1",
//						placeholder : "Presione ENTER",
//						click : function() {
//							tuto.btnImprimirClick(w);
//						}
//					},{
//						html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
//						"class" : "btn btn-danger",
//						name : "btnCerrar",
//						tabindex : "1",
//						placeholder : "Presione ENTER",
//						click : function() {
//							tuto.cerrarFormulario(w);
//	
//						}
//					}				
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					tuto.iniciarFormulario(w);
					tuto.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
//					tuto.winInt({
//						tipo: 'TUTO',
//						cntInt: 'gridTutorial',
//						pol:{pol_codi: ((w.pol)?w.pol.pol_codi:'')}
//					});
					Sisem.unblockW(w.$e);
//					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//tuto.import(function(){
	},
	winSel:function(w){
		tuto.import(function(){
			if(w==null)w=new Object;
			tuto.setPagina(w);
			tuto[w.pag.nameWS] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:900,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								tuto.cerrarFormulario(w);
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
										tuto.cerrarFormulario($.extend(w, {data: data}));
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
							tuto.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					tuto.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showToolBar: true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//tuto.import(function(){
	},
	winInt:function(w){
		tuto.import(function(){
			if(w==null)w=new Object;
			tuto.setPagina(w);
			tuto[w.pag.nameWI] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					tuto.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: false, showToolBar: false, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//tuto.import(function(){
	},	
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['cmn/brw_tuto']}, function(rpta){
			if(rpta){brw_tuto.ejecutar($.extend(w,{modulo:'controllers', archivo: 'cmn/brw_tuto'}));}
		});
	},
	iniciarFormulario:function(w){
		tuto.limpiarFormulario(w);
		tuto.llenarFormulario(w);
		tuto.refrescarFormulario(w);
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
			Sisem.ejecutar('erp/GetListaTutorial',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var cat = rpta.lista.items[0];
					w.$e.find('[name=cat_kycat]').val(cat.cat_kycat);
					w.$e.find('[name=cat_nomb]').val(cat.cat_nomb);
					w.$e.find('[name=cat_dscr]').val(cat.cat_dscr);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaTutorial',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
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
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'AZUL');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				tuto.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				tuto.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				tuto.activarFormulario($.extend(w, {activar: true}));
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
			alias		: tuto.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+tuto.tipPag[w.tipo]['name'],
			nameWP		: 'win'+tuto.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+tuto.tipPag[w.tipo]['name'],
			nameWI		: 'int'+tuto.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+tuto.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+tuto.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+tuto.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+tuto.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////	
	btnAddClick: function(w){
		tuto.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	}	
};