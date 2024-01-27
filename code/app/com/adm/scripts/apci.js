var apci = {
		wb:null,
		wp:null,
		ws:null,
		wi:null,
		we:null,
	pag:{
		alias		: 'Aperturacierre',
		nameWB		: 'brwAperturacierre',
		nameWP		: 'winAperturacierre',
		nameWS		: 'selAperturacierre',
		nameWI		: 'selAperturacierre',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwAperturacierre',
		idGridWP	: 'idWinAperturacierre',
		idGridWS	: 'idSelAperturacierre',
		idGridWI	: 'idIntAperturacierre'
	},
	tipPag: {
		"CAGE":{'name': 'Apccajageneral', 'alias': 'Apertura/Cierre Caja General'},
		"CABA":{'name': 'Apccajabanco', 'alias': 'Apertura/Cierre Caja Banco'},
		"CACO":{'name': 'Apccajacampo', 'alias': 'Apertura/Cierre Caja Campo'}
	},
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['adm/sucu','cmn/usua','erp/oper']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		apci.winBrow(w);
	},
	winBrow: function(w){
		apci.import(function(){
			if(w==null)w=new Object;
			apci.setPagina(w);
			apci.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					apci.iniciarBrowse($.extend(w,{idGrid:apci.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth:true}));
				}
			});
		});//apci.import(function(){
	},
	winPop:function(w){
		apci.import(function(){
			if(w==null)w=new Object;
			apci.setPagina(w);
			apci.wp=w;
			apci.pag.modo=((w.modo)?w.modo:'AGREGAR');
			w.changenum = function(){
				Sisem.blockW(w.$e);
				Sisem.ejecutar('adm/GetListaPropiedad',{prp_kysuc:w.$e.find('[name=caj_kysuc]').val(), prp_secc:'0003', }, function(rpta){
					if(rpta.lista.items.length > 0)
					{
						var prp = rpta.lista.items[0];
						w.$e.find('[name=ope_seri]').val(prp.prp_prop);
						w.$e.find('[name=ope_nume]').val(prp.prp_valu+1);
					}//if(rpta.lista.items.length > 0)
					else
					{
						w.$e.find('[name=ope_seri]').val(1);
						w.$e.find('[name=ope_nume]').val(1);
					}
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GetListaCategoria',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
			};
			Sisem.Window({
				id:apci.pag.nameWP,
				title:w.modo+' '+apci.pag.alias,
				width:650,
				height:300,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+apci.pag.nameWP,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							apci.btnAgregarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							apci.btnModificarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiBuscar'>Buscar</span>",
						"class" : "btn btn-primary",
						"name" : "btnBuscar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							apci.btnBuscarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiBuscar'>Imprimir</span>",
						"class" : "btn btn-primary",
						"name" : "btnImprimir",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							apci.btnImprimirClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							apci.cerrarFormulario(w);
						}
					}				
				],
				afterLoad:function(){
					w.$e = $('#'+apci.pag.nameWP);
					Sisem.blockW(w.$e);
					
					apci.iniciarFormulario(w);
					
					w.$e.find('[name=btnAddSucu]').click(function(){
						apci.btnSelSucuClick(w);
					});
					w.$e.find('[name=btnSelEnt]').click(function(){
						apci.btnSelEntiClick(w);
					});
					sucu.cajabancoAutocomplete($.extend(w, {suc_tipo:w.tipo}));
					usua.trabajadorAutocomplete($.extend(w, {usu_tipo:'TRA'}));
					w.$e.find('[name=caj_nomb]').blur(function(){
						w.changenum();
					});
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.Window({
		});//apci.import(function(){
	},
	winSel:function(w){
		apci.import(function(){
			if(w==null)w=new Object;
			apci.setPagina(w);
			apci.ws=w;
			apci.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Window({
				id:apci.pag.nameWS,
				title:'Seleccionar '+apci.pag.alias,
				width:650,
				height:380,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; Seleccionar",
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								apci.cerrarFormulario(w);
							}else{
								if(w.$e.find('[name=grid] .highlights').length>0){
									var data = w.$e.find('[name=grid] .highlights').data('data');
									apci.cerrarFormulario($.extend(w, {data: data}));
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
					},
					{html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						click : function() {
							apci.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+apci.pag.nameWS);
					Sisem.blockW(w.$e);
					apci.iniciarBrowse($.extend(w,{idGrid:apci.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.Window({
		});//apci.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['brw_apci']}, function(rpta){
			if(rpta){brw_apci.ejecutar($.extend(w,{modulo:'controllers', archivo: 'brw_apci'}));}
		});
	},
	iniciarFormulario:function(w){
		apci.limpiarFormulario(w);
		apci.llenarFormulario(w);
		apci.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=apc_kyapc]').val('');
		w.$e.find('[name=caj_kysuc]').val('');
		w.$e.find('[name=tra_kyusu]').val('');
		w.$e.find('[name=apc_fini]').val(ahora).datetimepicker({dateFormat:'yy-mm-dd', timeFormat:'HH:mm:ss',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		w.$e.find('[name=apc_ffin]').val(ahora).datetimepicker({dateFormat:'yy-mm-dd', timeFormat:'HH:mm:ss',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		/*Datos enviados a la tabla 2*/
//		w.$e.find('[name=ope_otip]').val('');
		w.$e.find('[name=ope_oimp]').val('0.00');
		w.$e.find('[name=ope_ccmp]').val('0.00');
		w.$e.find('[name=ope_cven]').val('0.00');
	},
	llenarFormulario:function(w){
		if(w.tra){
			w.$e.find('[name=tra_kyusu]').val(w.tra.tra_kyusu);	
			w.$e.find('[name=tra_nomb]').val(w.tra.tra_nomb);			
		}else{
			w.$e.find('[name=tra_kyusu]').val($('[name=main_tra_kyusu]').val());	
			w.$e.find('[name=tra_nomb]').val($('[name=main_tra_nomb]').val());			
		}
		w.$e.find('[name=ope_otip]').val( ( ( w.modo=='AGREGAR' ) ? 'APERTURA' : 'CIERRE' ) );
		
		if(w.id>0){w.$e.find('[name=apc_kyapc]').val(w.id);}
		if(!Sisem.isEmpty(w.$e.find('[name=apc_kyapc]').val())){
			$.get(base_url+'apci/get',{id:w.$e.find('[name=apc_kyapc]').val()},function(rpta){
				w.apc=rpta.apc;
				w.$e.find('[name=apc_kyapc]').val(w.apc.apc_kyapc);
				w.$e.find('[name=caj_kysuc]').val(w.apc.caj_kysuc);								
				w.$e.find('[name=caj_nomb]').val(w.apc.caj_nomb);				
				w.$e.find('[name=tra_kyusu]').val(w.apc.tra_kyusu);	
				w.$e.find('[name=tra_nomb]').val(w.apc.tra_nombb);
				w.$e.find('[name=apc_fini]').val(w.apc.apc_fini);
				w.$e.find('[name=apc_ffin]').val(w.apc.apc_ffin);				
				w.$e.find('[name=ope_kyoper]').val(w.apc.ope_kyope);
				w.$e.find('[name=ope_omon]').val(w.apc.ope_omon);
				w.$e.find('[name=ope_oimp]').val(Sisem.redondeoString(w.apc.ope_oimp));
				w.$e.find('[name=ope_ccmp]').val(Sisem.redondeoString(w.apc.ope_ccmp));
				w.$e.find('[name=ope_cven]').val(Sisem.redondeoString(w.apc.ope_cven));
				
				Sisem.unblockW(w.$e);
			},'json');
		}
	},
	refrescarFormulario: function(w){
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(!Sisem.isEmpty(w.$e.find('[name=apc_kyapc]').val()))
				{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'AZUL');
				}
				else
				{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				apci.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				apci.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				apci.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
	//	w.$e.find('[name=caj_kysuc]').attr('disabled',!w.activar),
		w.$e.find('[name=caj_nomb]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_kyusu]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_nomb]').attr('disabled',!w.activar);
		w.$e.find('[name=apc_freg]').attr('disabled',!w.activar);
		
		if(w.modo=='VISUALIZAR')
		{
			Sisem.activar(w.$e.find('[name=apc_fini]'), w.activar);
			Sisem.activar(w.$e.find('[name=apc_ffin]'), w.activar);	
		}
		else
		{
			if(w.$e.find('[name=ope_otip]').val()=='APERTURA')
			{
				Sisem.activar(w.$e.find('[name=apc_fini]'),true);
				Sisem.activar(w.$e.find('[name=apc_ffin]'),false);
			}
			else
			{
				Sisem.activar(w.$e.find('[name=apc_fini]'),false);
				Sisem.activar(w.$e.find('[name=apc_ffin]'),true);
			}			
		}
		/*Datos enviados a la tabla 2*/
		w.$e.find('[name=ope_otip]').attr('disabled', true);
		w.$e.find('[name=ope_omon]').attr('disabled',( ( w.modo=='AGREGAR' ) ? !w.activar : true ));
		w.$e.find('[name=ope_oimp]').attr('disabled',!w.activar);
		w.$e.find('[name=ope_ccmp]').attr('disabled',!w.activar);
		w.$e.find('[name=ope_cven]').attr('disabled',!w.activar);
		tipo:w.tipo;
	},
	validarFormulario:function(w){
		if(Sisem.validarControles(w.$e,'apc')){
			return true;
		}
		return false;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},	
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='CAGE'}
		$.extend(apci.pag, {
			alias		: apci.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+apci.tipPag[w.tipo]['name'],
			nameWP		: 'win'+apci.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+apci.tipPag[w.tipo]['name'],
			nameWI		: 'int'+apci.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+apci.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+apci.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+apci.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+apci.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		apci.winPop({
			tipo:w.tipo,
			modo:'AGREGAR',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});					
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			apci.limpiarFormulario(w);
			apci.refrescarFormulario(w);
			w.$e.find('[name=caj_nomb]').focus();
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(apci.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=apci.obtenerDatoFormulario(w);
				Sisem.ejecutar('GuardarAperturacierre',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=apc_kyapc]').val(rpta.apc_kyapc);
						$.extend(w,{modo: 'VISUALIZAR'});
						sucu.iniciarFormulario(w);
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(apci.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			apci.refrescarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			apci.iniciarFormulario(w);
		}
	},
	btnBuscarClick: function(w){
//		apci.winSel({
//			modo:'SELECCIONAR',
//			tipo:'CLI',
//			apc:{
//				id_caja:w.caj.id_caja,
//				id_apci:w.caj.id_apci,
//				nomb:w.caj.nomb
//			},
//			callback:function(rpta){
//				w.$e.find('[name=cco_kyccor]').val(rpta.id_ccor);
//				apci.iniciarFormulario(w);
//			}
//		});
	},
	btnImprimirClick: function(w){
		rsta.winPop({
			modo: 'AGREGAR',
			tipo: 'REPVENCOB'
		});
	},		
	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
	obtenerDatoFormulario: function(w){
		var ahora = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
		var data = Sisem.obtenerParametrosJson(w.$e);
		return data;
	},	
	btnSelSucuClick: function(w){
		sucu.winSel({
			tipo:( ( w.tipo ) ? w.tipo : 'CAGE' ),
			callback: function(data){
				if(data)
				{
					w.$e.find('[name=apc_kysuc]').val(data.suc_kysuc);
					w.$e.find('[name=caj_nomb]').val(data.suc_nomb);
					w.changenum();
					/*w.$e.find('[name=etdo]').val('');
					w.$e.find('[name=endo]').val('');
					w.$e.find('[name=enom]').val(data.nomb);
					w.$e.find('[name=edir]').val(data.dire);
					w.$e.find('[name=part]').val(data.dire);*/
				}
			}
		});		
	},
	btnSelEntiClick: function(w){
		usua.winSel({
			showToolBar: true,
			tipo:'TRA',
			callback: function(data){
				if(!Sisem.isEmpty(data))
				{
					w.$e.find('[name=apc_kyusu]').val(data.usu_kyusu);
					w.$e.find('[name=tra_nomb]').val(data.usu_nomb);
//					w.changenum();
//					w.$e.find('[name=endo]').val(data.ndoc);
//					w.$e.find('[name=enom]').val(data.nomb);
//					w.$e.find('[name=edir]').val(data.dire);
				}
			}
		});
	}
};
