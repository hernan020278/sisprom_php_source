var prop = {
	pag:{
		alias		: 'Propiedad',
		nameWB		: 'brwPropiedad',
		nameWP		: 'winPropiedad',
		nameWS		: 'selPropiedad',
		nameWI		: 'intPropiedad',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwPropiedad',
		idGridWP	: 'idWinPropiedad',
		idGridWS	: 'idSelPropiedad',
		idGridWI	: 'idIntPropiedad'
	},
	tipPag: {
		"PRPPDR":{'name': 'Proppadre', 'alias': 'Parametro'},
		"PRPEVL":{'name': 'Propevaluacion', 'alias': 'Evaluacion'},
		"PRPAUL":{'name': 'Propaula', 'alias': 'Aula'},
		"PRPGEN":{'name': 'Propgeneral', 'alias': 'Propiedad general'},
		"PRPMRC":{'name': 'Propmarca', 'alias': 'Propiedad marca'},
		"PRPCAT":{'name': 'Propcategoria', 'alias': 'Propiedad categoria'},
		"PRPCLS":{'name': 'Propclase', 'alias': 'Propiedad clase'},
		"PRPUND":{'name': 'Propunidad', 'alias': 'Propiedad unidad'},
		"PRPLPR":{'name': 'Proplistaprecio', 'alias': 'Propiedad lista de precio'},
		"TIPART":{'name': 'Proparticulo', 'alias': 'Propiedad articulo'},
		"TIPCLI":{'name': 'Propcliente', 'alias': 'Propiedad de Cliente'},
		"TIPPRO":{'name': 'Propproveedor', 'alias': 'Propiedad de Proveedor'},
		"TIPTRA":{'name': 'Proptrabajador', 'alias': 'Propiedad de Trabajador'},
		"TIPTTA":{'name': 'Proptransportista', 'alias': 'Propiedad de Transportista'},
		"TIPBNC":{'name': 'Propbancos', 'alias': 'Propiedad de Bancos'},
		"TIPCOM":{'name': 'Propcomensal', 'alias': 'Propiedad de Comensales'},
		"TIPEMP":{'name': 'Propempresa', 'alias': 'Propiedad de Empresas'},
		"TIPGRU":{'name': 'Propgrupo', 'alias': 'Grupo usuarios'},
		"TIPDIV":{'name': 'Propdivision', 'alias': 'Division usuarios'},
		"TIPREG":{'name': 'Propregimen', 'alias': 'Regimen usuarios'},
		"TIPCAT":{'name': 'PropPropiedad', 'alias': 'Propiedad'},
		"TIPCAR":{'name': 'Propcargo', 'alias': 'Cargo usuarios'},
		"TIPARE":{'name': 'Proparea', 'alias': 'Control de Areas'},
		"TIPCNV":{'name': 'Propconvenio', 'alias': 'Control de Convenio'},
		"TIPDEN":{'name': 'Propdenominacion', 'alias': 'Denominacion de Recursos Humanos'},
		"TIPRUB":{'name': 'Proprubro', 'alias': 'Tipo rubro'},
		"NUMDOC":{'name': 'Propnumdoc', 'alias': 'Numeracion documento'},
		"TIPMON":{'name': 'Propmoneda', 'alias': 'Tipo moneda'},
		"TIPCMB":{'name': 'Propcambio', 'alias': 'Tipo cambio'},
		"TIPPDO":{'name': 'Propperiodo', 'alias': 'Tipo Periodo'},
		"TBLREG":{'name': 'Propregistros', 'alias': 'Registros por tabla'},
		"PRPASG":{'name': 'Propasignatura', 'alias': 'Asignatura'},
		"PRPPRG":{'name': 'Propprograma', 'alias': 'Programa'},
		"PRPGRA":{'name': 'Propgrado', 'alias': 'Grado'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/usua']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		prop.winBrow(w);
	},
	winBrow : function(w){
		prop.import(function(){
			if(w==null)w=new Object;
			prop.setPagina(w);
			prop[w.pag.nameWB] = w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					prop.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth:false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//prop.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		prop.import(function(){
			if(w==null)w=new Object;
			prop.setPagina(w);
			prop[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:550,
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
							prop.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							prop.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPEVL', prf_inpu: 'prp_prop', prf_sele: 0, prf_solo: 1}));
					
//					w.$e.find('[name="prp_valu"]').val(moment().startOf('month').format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
//					w.$e.find('[name="prp_dscr"]').val(moment().endOf('month').format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});

					w.$e.find('[name=suc_kysuc]').html($('[name=main_kysuc]').html());
					w.$e.find('[name=prp_codi]').empty();

					prop.iniciarFormulario(w);
					
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},
	winSel:function(w){
		prop.import(function(){
			if(w==null)w=new Object;
			prop.setPagina(w);
			prop[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:600,
				height:500,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWS+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&tipoBrowse='+((w.tipoBrowse)?w.tipoBrowse:''),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								prop.cerrarFormulario(w);
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
										prop.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						click : function() {
							prop.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					if(typeof w.tipoBrowse == 'undefined')
					{
						prop.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));	
					}
					else if(w.tipoBrowse == 'EXPLORADOR')
					{
						var $divExpPropiedad = w.$e.find('[name="divExploradorTabla"]');
						$divExpPropiedad.showMenCtx = true;
						$divExpPropiedad.data('data', {prp_kyprp: w.prp.prp_kypdr, prp_secc: w.prp.prp_secc, prp_tipo: 'UNICO'});
						console.log($divExpPropiedad.data('data'));
						prop.cargarExploradorPropiedad($divExpPropiedad);
					}
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},
	winInt:function(w){
		prop.import(function(){
			if(w==null)w=new Object;
			prop.setPagina(w);
			prop[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWI+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&tipoBrowse='+((w.tipoBrowse)?w.tipoBrowse:''),
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					if(typeof w.tipoBrowse == 'undefined')
					{
						console.log('normal');
//						prop.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth:false}));
					}
					else if(w.tipoBrowse == 'EXPLORADOR')
					{
						console.log('explorador');
						var $divExpPropiedad = w.$e.find('[name="divExploradorTabla"]');
						$divExpPropiedad.data('data', {prp_kyprp: w.prp.prp_kypdr, prp_secc: w.prp.prp_secc, prp_tipo: 'UNICO'});
						prop.cargarExploradorPropiedad($divExpPropiedad);
					}
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//oper.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		if(w.tipo=='NUMDOC')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_numdoc']}, function(rpta){
				if(rpta){brw_numdoc.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_prop'}));}
			});
		}
		else if (w.tipo=='PRPPDR')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_prop']}, function(rpta){
				if(rpta){brw_prop.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_prop', prp: (typeof w.prp!='undefined') ? w.prp : {prp_nive: '1'} }));}
			});
		}
		else if (w.tipo=='TIPPDO')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_peri']}, function(rpta){
				if(rpta){brw_peri.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_peri', prp: (typeof w.prp!='undefined') ? w.prp : {prp_nive: '1'} }));}
			});
		}
		else
		{
			Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_prop']}, function(rpta){
				if(rpta){brw_prop.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_prop', prp: (typeof w.prp!='undefined') ? w.prp : {prp_secc: w.tipo, prp_nive: '2'} }));}
			});			
		}
	},
	iniciarFormulario:function(w){
		prop.limpiarFormulario(w);
		prop.llenarFormulario(w);
		prop.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'prp',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=prp_kyprp]').val('');
		for (var keyProp in prop.tipPag)
		{
			w.$e.find('[name=prp_secc]').append('<option value='+keyProp+'>'+keyProp+'</option>');
		}
		if(Sisem.esObjJson(w.pdr))
		{
			variablePrueba = w.pdr
			w.$e.find('[name=pdr_secc]').val(w.pdr.prp_secc);
			w.$e.find('[name=pdr_prop]').val(w.pdr.prp_prop);
			w.$e.find('[name=prp_kypdr]').val(w.pdr.prp_kyprp);
			w.$e.find('[name=prp_nive]').val(parseInt(w.pdr.prp_nive)+1);
		}
		else
		{
			w.$e.find('[name=pdr_secc]').val('');
			w.$e.find('[name=pdr_prop]').val('');
			w.$e.find('[name=prp_kypdr]').val('');
			w.$e.find('[name=prp_nive]').val(1);			
		}
		w.$e.find('[name=prp_secc]').val(w.tipo);
		w.$e.find('[name=prp_codi]').val('');
		w.$e.find('[name=prp_prop]').val('');
		w.$e.find('[name=prp_valu]').val('');
		w.$e.find('[name=prp_dscr]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			prp_kyprp: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=prp_kyprp]').val())
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=prp_kyprp]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=prp_kyprp]').val()) && w.modo!='AGREGAR'){
			Sisem.ejecutar('adm/GetListaPropiedad',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var prp = rpta.lista.items[0];
					
					w.$e.find('[name=pdr_kyprp]').val(prp.pdr_kyprp);
					w.$e.find('[name=pdr_codi]').val(prp.pdr_codi);
					w.$e.find('[name=pdr_secc]').val(prp.pdr_secc);
					w.$e.find('[name=pdr_prop]').val(prp.pdr_prop);
					
					w.$e.find('[name=prp_kyprp]').val(prp.prp_kyprp);
					w.$e.find('[name=prp_kypdr]').val(prp.prp_kypdr);
					w.$e.find('[name=prp_secc]').val(prp.prp_secc);
					w.$e.find('[name=prp_codi]').val(prp.prp_codi);
					w.$e.find('[name=prp_prop]').val(prp.prp_prop);
					w.$e.find('[name=prp_valu]').val(prp.prp_valu);
					w.$e.find('[name=prp_dscr]').val(prp.prp_dscr);
					w.$e.find('[name=prp_nive]').val(prp.prp_nive);
					w.$e.find('[name=prp_esta]').val(prp.prp_esta);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('adm/GetListaPropiedad',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
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
				
				prop.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				prop.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				prop.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		w.$e.find('[name=prp_kyprp]').attr('disabled',true);
		Sisem.activar(w.$e.find('[name=pdr_codi]'), false);
		Sisem.activar(w.$e.find('[name=pdr_secc]'), false);
		Sisem.activar(w.$e.find('[name=pdr_prop]'), false);

		Sisem.activar(w.$e.find('[name=suc_kysuc]'), w.activar);
		Sisem.activar(w.$e.find('[name=prp_secc]'), ((w.tipo=='PRPPDR') ? true : false));
		Sisem.activar(w.$e.find('[name=prp_codi]'), w.activar);
		Sisem.activar(w.$e.find('[name=prp_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=prp_valu]'), w.activar);
		Sisem.activar(w.$e.find('[name=prp_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=prp_esta]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'prp','VALIDAR')){return false;}
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
			alias		: prop.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+prop.tipPag[w.tipo]['name'],
			nameWP		: 'win'+prop.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+prop.tipPag[w.tipo]['name'],
			nameWI		: 'int'+prop.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+prop.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+prop.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+prop.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+prop.tipPag[w.tipo]['name']
		});
		prop.tipPagAct = w.tipo;
	},
	//////////////////
	//Metodhs Events//
	//////////////////
        btnAddClick: function(w){
            prop.winPop({
                tipo: w.tipo,
                modo:'AGREGAR',
			pdr:{
				prp_kyprp : w.pdr.prp_kyprp,
				prp_codi :  w.pdr.prp_codi,
				prp_secc :  w.pdr.prp_secc,
    			prp_prop :  w.pdr.prp_prop,
    			prp_dscr :  w.pdr.prp_dscr,
    			prp_nive :  w.pdr.prp_nive
			},
                callback:function(){
                    if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
                }
            });
        },
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			prop.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(prop.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=prop.obtenerDatoFormulario(w);
				Sisem.ejecutar('adm/CtrlPropiedad',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=prp_kyprp]').val(rpta.prp_kyprp);
						$.extend(w,{modo: 'VISUALIZAR'});
						prop.cerrarFormulario($.extend(w,{data : prop.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('adm/CtrlPropiedad',data, function(rpta){
			}//if(prop.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			prop.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			prop.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	propiedadAutocomplete: function (w){
		var prp_nive = ((typeof w.prp_nive=="undefined")?'':'&prp_nive='+w.prp_nive);
		var prf_solo = ((typeof w.prf_solo=="undefined")?0:w.prf_solo);
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prp_secc = ((typeof w.prp_secc=="undefined")?'PRPGEN':w.prp_secc);
		var arr_inpu = ((typeof w.prf_inpu=="undefined")?'prp_prop'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = arr_inpu[0];
		var prf_camp = arr_inpu[1];

		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				if(prf_solo)
				{
					console.log('solo');
					w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val('');					
				}
				else
				{
					console.log('todos');
					w.$e.find("[name="+prf_tabl+"_kyprp]").val('0');
					w.$e.find("[name="+prf_tabl+"_nive]").val('');
					w.$e.find("[name="+prf_tabl+"_secc]").val('');
					w.$e.find("[name="+prf_tabl+"_codi]").val('');
					w.$e.find("[name="+prf_tabl+"_prop]").val('');
					w.$e.find("[name="+prf_tabl+"_valu]").val('');
					w.$e.find("[name="+prf_tabl+"_dscr]").val('');
				}
				$(this).autocomplete('enable');
			}//if(Sisem.isEmpty(valor)){
		});
		
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'adm/GetListaPropiedadAuto?prp_secc='+prp_secc+prp_nive+'&campo=prp_'+prf_camp+'&mostrarSeleccion='+prf_sele,
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},
			select: function(eve, rpta){
				var obj = rpta.item.value;

				if(prf_solo)
				{
					console.log('solo 1');
					for(var idxEle in obj)
					{
					    if(idxEle==prf_tabl+"_"+prf_camp)
					    {
						    w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val(obj[idxEle]);
						    break;
					    }
					}					
				}
				else
				{
					console.log('todos 1');
					w.$e.find("[name="+prf_tabl+"_kyprp]").val(obj.prp_kyprp);
					w.$e.find("[name="+prf_tabl+"_nive]").val(obj.prp_nive);
					w.$e.find("[name="+prf_tabl+"_secc]").val(obj.prp_secc);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj.prp_codi);
					w.$e.find("[name="+prf_tabl+"_prop]").val(obj.prp_prop);
					w.$e.find("[name="+prf_tabl+"_valu]").val(obj.prp_valu);
					w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.prp_dscr);
				}
				
				if(obj.prp_prop=='Seleccione')
				{
					prop.winSel({
						tipo: prp_secc,
						modo: 'SELECCIONAR',
						prp: {prp_secc: prp_secc, prp_nive: '2'},
						callback:function(objSel){
							if(objSel){
								if(prf_solo)
								{
									for(var idxEle in objSel)
									{
									    if(idxEle==prf_tabl+"_"+prf_camp)
									    {
										    w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val(objSel[idxEle]);
										    break;
									    }
									}					
								}
								else
								{
									w.$e.find("[name="+prf_tabl+"_kyprp]").val(objSel.prp_kyprp);
									w.$e.find("[name="+prf_tabl+"_nive]").val(objSel.prp_nive);
									w.$e.find("[name="+prf_tabl+"_secc]").val(objSel.prp_secc);
									w.$e.find("[name="+prf_tabl+"_codi]").val(objSel.prp_codi);
									w.$e.find("[name="+prf_tabl+"_prop]").val(objSel.prp_prop);
									w.$e.find("[name="+prf_tabl+"_valu]").val(objSel.prp_valu);
									w.$e.find("[name="+prf_tabl+"_dscr]").val(objSel.prp_dscr);
								}
							}//if(objSel){
						}//callback:function(objSel){
					});//prop.winSel({
				}//if(prp.prp_secc=='Seleccione')
				else
				{
					if(prp_secc=='PRPLPR'){$(this).trigger('eventoObtenerPrecio');}
				}
				/*****************************************
				 * Cambiar el boton al estado original
				 *****************************************/
				$(this).next().children('button').removeClass('btn-success');
				$(this).next().children('button').addClass('btn-info');
				
				$(this).next().children('button').children('i').removeClass('fa-chevron-up');
				$(this).next().children('button').children('i').addClass('fa-chevron-down');

				$(this).autocomplete('close');
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var obj = rpta.item.value;
				
				if(prf_solo)
				{
					for(var idxEle in obj)
					{
					    if(idxEle==prf_tabl+"_"+prf_camp)
					    {
						    w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val(obj[idxEle]);
						    break;
					    }
					}					
				}
				else
				{
					w.$e.find("[name="+prf_tabl+"_kyprp]").val(obj.prp_kyprp);
					w.$e.find("[name="+prf_tabl+"_nive]").val(obj.prp_nive);
					w.$e.find("[name="+prf_tabl+"_secc]").val(obj.prp_secc);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj.prp_codi);
					w.$e.find("[name="+prf_tabl+"_prop]").val(obj.prp_prop);
					w.$e.find("[name="+prf_tabl+"_valu]").val(obj.prp_valu);
					w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.prp_dscr);
				}
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	},
	cargarExploradorPropiedad: function($parEleExpPropiedad)
	{
		Sisem.ejecutar('adm/brw_prop',{prp_kypdr: $parEleExpPropiedad.data('data').prp_kyprp, prp_secc: $parEleExpPropiedad.data('data').prp_secc, prp_tipo: $parEleExpPropiedad.data('data').prp_tipo}, function(rpta){

			if(rpta.items.length > 0)
			{
				var $ulPropiedad = $('<ul></ul>');

				for(var idx=0; idx < rpta.items.length; idx++)
				{
					var fila = rpta.items[idx];
					if(typeof fila.prp_kyprp != 'undefined')
					{
						if(fila.prp_nopc > 0)
						{
							$ulPropiedad.append('<li class="parent_li"><i class="fa fa-lg fa-folder-o" name="icoCarpeta'+fila.prp_kyprp+'"></i>&nbsp;<span name="spnPropiedad'+fila.prp_kyprp+'">'+fila.prp_dscr+'</span>&nbsp;<i class="fa fa-lg '+( (fila.prp_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' )+'"></i></li>');
              $ulPropiedad.find('[name=icoCarpeta'+fila.prp_kyprp+']').on('click',function(event)
              {
                  console.log('CLICK EN SPAN CARPETA PARA CARGAR DATA');

                  $(this).removeClass().addClass('fa fa-lg fa-folder-open-o');
                  var $varEleExpPropiedad = $(this).parent('li.parent_li');
                  $varEleExpPropiedad.showMenCtx = $parEleExpPropiedad.showMenCtx;
                  if ( $varEleExpPropiedad.find(' > ul > li').length == 0 ) 
                  {
                      console.log('CARGAMOS DATA EN ITEM DE LA BD')
                      prop.cargarExploradorPropiedad($varEleExpPropiedad);
                      //$(this).off();
                  }
              });
						}
						else
						{
							$ulPropiedad.append('<li><i class="fa fa-lg fa-book"></i>&nbsp;<span name="spnPropiedad'+fila.prp_kyprp+'">'+fila.prp_dscr+'</span>&nbsp;<i class="fa fa-lg '+( (fila.prp_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' )+'"></i></li>');
						}
						
                        $ulPropiedad.find('[name=spnPropiedad'+fila.prp_kyprp+']').closest('li').data('data',fila);
                        
                        if( $parEleExpPropiedad.showMenCtx ){

    						$parEleExpPropiedad.idMenCtx='cm_GlobalGrid';
    						$ulPropiedad.find('[name=spnPropiedad'+fila.prp_kyprp+']').contextMenu({
    							buttonHelper: true,
    						    menuSelector: "#"+$parEleExpPropiedad.idMenCtx,
    						    onShow:function($el, invokedOn){
    						    	console.log('MOSTRAMOS MENU CONTEXTUAL');
    						    	if($parEleExpPropiedad.modo!='NAVEGAR'){$el.css('z-index','1100');}
    						    	var $li = invokedOn.closest('li');

    						    	$el.find('[id^='+$parEleExpPropiedad.idMenCtx+']').hide();
    						    	
    								$el.find('#'+$parEleExpPropiedad.idMenCtx+'_ingr').show();
    								$el.find('#'+$parEleExpPropiedad.idMenCtx+'_edit').show();
    								$el.find('#'+$parEleExpPropiedad.idMenCtx+'_dele').show();
    						    },
    						    menuSelected: function (invokedOn, selectedMenu) {
    						    	var $id = selectedMenu.attr('id');
    						    	var $li = invokedOn.closest('li');
    						    	switch($id){
    						    	case $parEleExpPropiedad.idMenCtx+"_ingr":
    						    		prop.winPop({
    						    			tipo: $li.data('data').prp_secc,
    					    				modo: 'AGREGAR',
    					    				size: 'short',
    						    			pdr:{
    						    				prp_kyprp :$li.data('data').prp_kyprp,
    						    				prp_codi :$li.data('data').prp_codi,
    						    				prp_secc :$li.data('data').prp_secc,
    							    			prp_prop :$li.data('data').prp_prop,
    							    			prp_nive :$li.data('data').prp_nive
    						    			},
    					    				callback:function(rptaTmp){
    											$li.children('ul').eq(0).remove();
    											$li.find('i').eq(0).attr('name','icoCarpeta'+$li.data('data').prp_kyprp);
    											$li.find('i').eq(0).removeClass().addClass('fa fa-lg fa-folder-open-o');
    											$li.showMenCtx = $parEleExpPropiedad.showMenCtx;
    											prop.cargarExploradorPropiedad($li);
    					    				}
    						    		});

    					    			break;
    						    	case $parEleExpPropiedad.idMenCtx+"_edit":
    						    		prop.winPop({
    						    			tipo: $li.data('data').prp_secc,
    						    			ky  : $li.data('data').prp_kyprp,
    					    				modo: 'VISUALIZAR',
    					    				size: 'short',
    					    				callback:function(rptaPrp){
    					    					var dataPrp = $li.data('data');
    					    					$.extend(dataPrp, rptaPrp);
    											$li.data('data', dataPrp);
    					    					$li.find('span').eq(0).html(dataPrp.prp_dscr);
    					    					$li.find('i').eq(1).removeClass().addClass('fa fa-lg '+( (dataPrp.prp_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) );		
    					    				}
    						    		});
    					    			break;
    						    	case $parEleExpPropiedad.idMenCtx+"_dele":
//    					    			var lisSel= Sisem.getItemSelected(w).items;
    									var lisSel= Array({prp_kyprp: $li.data('data').prp_kyprp});
    					    			var lisKySel = [];
    					    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].prp_kyprp});}
    					    			if(lisKySel.length==0){lisKySel.push({ky: $li.data('data').prp_kyprp});}
    					    			Sisem.msgAsk('Desea eliminar', $li.data('data').prp_dscr, function(rpta){
    						    			if(rpta=='Si'){
    											var data = {comando: 'ELIMINAR', lisKy: lisKySel};
    											Sisem.ejecutar('adm/CtrlPropiedad',data, function(rpta){
    												$li.remove();
    											});//Sisem.ejecutar('CtrlOperacion',data, function(rpta){
    						    			}//if(Sisem.msgAsk('Desea eliminar', $li.data('data').nomb)){
    					    			});
    					    			break;
    						    	}//switch($id){
    						    }//menuSelected: function (invokedOn, selectedMenu) {
    						});//$ulPropiedad.find('[name=spnPropiedad'+fila.prp_kyprp+']').contextMenu({
                        	
                        }//if( w.showMenCtx ){
					}//if(typeof rpta.items[keya].prp_kyprp != 'undefined')
				}//for(var i=0; i < rpta.items.length; i++)

				$parEleExpPropiedad.append($ulPropiedad);

			}//if(rpta.items.length > 0)

			// PAGE RELATED SCRIPTS
			$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
			$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > i').attr('title', 'Collapse this branch');

			$('.tree').find('li:has(ul)').find(' > i[name^="icoCarpeta"]').off('click');
			$('.tree').find('li:has(ul)').find(' > i[name^="icoCarpeta"]').on('click', function(e) {
				var children = $(this).parent('li.parent_li').find(' > ul > li');

				if (children.is(':visible')) {
					console.log('CLICK EN SPAN PARA CERRAR');
					children.hide('fast');
					$(this).attr('title', 'Expandir esta rama').removeClass().addClass('fa fa-lg fa-folder-o');
				} else {
					console.log('CLICK EN SPAN PARA ABRIR');
					children.show('fast');
					$(this).attr('title', 'Recoger esta rama').removeClass().addClass('fa fa-lg fa-folder-open-o');
				}
				e.stopPropagation();
			});
			
		});//Sisem.ejecutar('brw_poli',{prp_kypdr: $parEleExpPropiedad.data('data').prp_kyprp}, function(rpta){

	}//cargarExploradorPropiedad: function(w)	
};
