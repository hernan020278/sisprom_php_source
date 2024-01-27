var sucu = {	
	wb:null,
	wp:null,
	ws:null,
	wi:null,
	we:null,
	pag:{
		alias		: 'Sucursal',
		nameWB		: 'brwSucursal',
		nameWP		: 'winSucursal',
		nameWS		: 'selSucursal',
		nameWI		: 'intSucursal',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwSucursal',
		idGridWP	: 'idWinSucursal',
		idGridWS	: 'idSelSucursal',
		idGridWI	: 'idIntSucursal'
	},
	tipPag: {
		"LOCA":{'name': 'Local', 'alias': 'Control Local'},
		"SUCU":{'name': 'Sucursal', 'alias': 'Control Sucursal'},
		"CAGE":{'name': 'Cajageneral', 'alias': 'Caja General'},
		"CABA":{'name': 'Cajabanco', 'alias': 'Caja Banco'},
		"CACO":{'name': 'Cajacampo', 'alias': 'Caja Campo'}
	},
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
		sucu.winBrow(w);
	},
	winBrow : function(w){
		sucu.import(function(){
			if(w==null)w=new Object;
			sucu.setPagina(w);
			sucu.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					sucu.iniciarBrowse($.extend(w,{idGrid:sucu.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}
			});
		});//usua.import(function(){
	},
	winPop:function(w){
		sucu.import(function(){
			if(w==null)w=new Object;
			sucu.setPagina(w);
			sucu.wp=w;
			sucu.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:sucu.pag.nameWP,
				title:sucu.pag.modo+' '+sucu.pag.alias,
				width:600,
				height:350,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+sucu.pag.nameWP,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							sucu.btnAgregarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							sucu.btnModificarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiBuscar'>Imprimir</span>",
						"class" : "btn btn-primary",
						"name" : "btnImprimir",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							sucu.btnImprimirClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							sucu.cerrarFormulario(w);
						}
					}	
				],
				afterLoad:function(){				
					w.$e = $('#'+sucu.pag.nameWP);
					Sisem.blockW(w.$e);
					
					sucu.iniciarFormulario(w);
					sucu.departamentoAutocomplete(w);
					sucu.provinciaAutocomplete(w)
					sucu.distritoAutocomplete(w);
					
					w.$e.find('[name=btnAddloca]').click(function(){
						sucu.winSel({
							tipo:'LOCA',
							callback:function(rpta){
								if(rpta!=null)
								{
									w.$e.find('[name=suc_kypdr]').val(rpta.suc_kysuc);
									w.$e.find('[name=loc_nomb]').val(rpta.suc_nomb);
								}
							}
						});
					});	

					w.$e.find('[name=btnSelEmp]').click(function(){
						usua.winSel({
							showToolBar: true,
							tipo:'EMP',
							callback: function(data){
								if(data!=null)
								{
									w.$e.find('[name=emp_kyusu]').val(data.usu_kypdr);
									w.$e.find('[name=emp_nomb]').val(data.usu_nomb);
								}
							}
						});
					});	
					
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});		
		});//sucu.import(function(){
	},
	winSel:function(w){
		sucu.import(function(){
			if(w==null)w=new Object;
			sucu.setPagina(w);
			sucu.ws=w;
			sucu.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:sucu.pag.nameWS,
				title:'Seleccionar '+sucu.pag.alias,
				width:700,
				height:320,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; "+sucu.pag.modo,
						"class" : "btn btn-success",
						click : function() {
							if(sucu.pag.modo=='VISUALIZAR'){
								sucu.cerrarFormulario(w);
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
										sucu.cerrarFormulario($.extend(w, {data: data}));
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
							sucu.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+sucu.pag.nameWS);
					Sisem.blockW(w.$e);
					sucu.iniciarBrowse($.extend(w,{idGrid:sucu.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
					Sisem.unblockW(w.$e);
				}
			});
		});//sucu.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		if(w.tipo=='LOCA'){
			Sisem.import({modulo:'browse', listaArchivo: ['brw_loca']}, function(rpta){
				if(rpta){brw_loca.ejecutar($.extend(w,{modulo:'controllers', archivo: 'brw_sucu'}));}
			});//Sisem.import({modulo:'browse', listaArchivo: ['brw_sucu']}, function(rpta){
		}//if(w.tipo='LOCAL'){
		else{
			
			Sisem.import({modulo:'browse', listaArchivo: ['brw_sucu']}, function(rpta){
				if(rpta){brw_sucu.ejecutar($.extend(w,{modulo:'controllers', archivo: 'brw_sucu'}));}
			});//Sisem.import({modulo:'browse', listaArchivo: ['brw_sucu']}, function(rpta){
		}//if(w.tipo='LOCAL'){
	},
	iniciarFormulario:function(w){
		sucu.limpiarFormulario(w);
		sucu.llenarFormulario(w);
		sucu.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
		
//		<option value="0001">CAJA</option>
//		<option value="0002">BANCO</option>
//		<option value="0003">FINANCIERA</option>
//		<option value="0004">TIENDA</option>
//		<option value="0005">ALMACEN</option>
//		w.$e.find('[name=id_empr]').val('');
//		w.$e.find('[name=emp_nomb]').val('');
//		w.$e.find('[name=suc_kysuc]').val('');
		w.$e.find('[name=suc_nomb]').val('');
		w.$e.find('[name=suc_dscr]').val('');
		w.$e.find('[name=suc_depa]').val('');
		w.$e.find('[name=suc_prov]').val('');
		w.$e.find('[name=suc_dist]').val('');
		w.$e.find('[name=suc_dire]').val('');
		w.$e.find('[name=suc_tele]').val('');
		w.$e.find('[name=suc_ncta]').val('');
		w.$e.find('[name=suc_vers]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			suc_kysuc: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=suc_kysuc]').val()),
			suc_kyusu: USERDATA.eem.usu_kyusu,
			suc_esta: ((w.$e.find('[name=suc_esta]').length>0) ? w.$e.find('[name=suc_esta]').val() : '0001'),
		});
		return data;
	},	
	llenarFormulario:function(w){
		w.$e.find('[name=emp_kyemp]').val(USERDATA.eem.usu_kyusu);
		w.$e.find('[name=emp_nomb]').val(USERDATA.eem.usu_nomb);
		w.$e.find('[name=suc_ncta]').val((new Date()).getTime());
		if(w.ky>0){w.$e.find('[name=suc_kysuc]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=suc_kysuc]').val())){
			Sisem.ejecutar('GetListaSucursal',{suc_kysuc: w.$e.find('[name=suc_kysuc]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var suc = rpta.lista.items[0];
					w.$e.find('[name=emp_kyusu]').val(suc.suc_kyusu);
					w.$e.find('[name=loc_kysuc]').val(suc.suc_kypdr);
					w.$e.find('[name=suc_kysuc]').val(suc.suc_kysuc);
					w.$e.find('[name=loc_nomb]').val(suc.loc_nomb);
					w.$e.find('[name=suc_tipo]').val(suc.suc_tipo);
					w.$e.find('[name=suc_ncta]').val(suc.suc_ncta);
					w.$e.find('[name=suc_nomb]').val(suc.suc_nomb);

					w.$e.find('[name=suc_depa]').val(suc.suc_depa);
					w.$e.find('[name=suc_prov]').val(suc.suc_prov);
					w.$e.find('[name=suc_dist]').val(suc.suc_dist);
					w.$e.find('[name=suc_dire]').val(suc.suc_dire);
					w.$e.find('[name=suc_tele]').val(suc.suc_tele);
					
					w.$e.find('[name=suc_dscr]').val(suc.suc_dscr);
				}//if(rpta.lista.items.length > 0)
			});//Sisem.ejecutar('GetListaSucursal',{suc_kysuc: w.$e.find('[name=suc_kysuc]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=suc_kysucu]').val())){
	},
	refrescarFormulario: function(w){
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
				
				sucu.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				sucu.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				sucu.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
		w.$e.find("[name=loc_nomb]").focus();
	},	
	activarFormulario:function(w){		
		Sisem.edit(w.$e.find('[name=emp_kyemp]'),false);
		Sisem.edit(w.$e.find('[name=emp_nomb]'), false);
		Sisem.edit(w.$e.find('[name=loc_nomb]'), false);
		
		Sisem.edit(w.$e.find('[name=btnSelEmp]'), w.activar);
		Sisem.edit(w.$e.find('[name=btnAddloca]'), w.activar);
		
		Sisem.edit(w.$e.find('[name=suc_tipo]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_kysucu]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_ncta]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_nomb]'), w.activar);
		
		Sisem.edit(w.$e.find('[name=suc_depa]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_prov]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_dist]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_dire]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_tele]'), w.activar);
		
		Sisem.edit(w.$e.find('[name=suc_vers]'), w.activar);
		Sisem.edit(w.$e.find('[name=suc_dscr]'), w.activar);
	},
	validarFormulario:function(w){
		if(Sisem.validarControles(w.$e,'suc')){
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='SUCU'}
		$.extend(sucu.pag, {
			alias		: sucu.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+sucu.tipPag[w.tipo]['name'],
			nameWP		: 'win'+sucu.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+sucu.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+sucu.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+sucu.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+sucu.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		sucu.winPop({
			modo:'AGREGAR',
			tipo: ((w.tipo)?w.tipo:'SUCU'),
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}//callback:function(){
		});//sucu.winPop({			
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			sucu.limpiarFormulario(w);
			sucu.refrescarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(sucu.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=sucu.obtenerDatoFormulario(w);
				Sisem.ejecutar('GuardarSucursal',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=suc_kysuc]').val(rpta.suc_kysuc);
						$.extend(w,{modo: 'VISUALIZAR'});
						sucu.iniciarFormulario(w);
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(sucu.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			sucu.refrescarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			sucu.iniciarFormulario(w);
		}
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
	departamentoAutocomplete: function (w){
		w.$e.find("[name=suc_depa]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=suc_kylug]").val('0');	
				w.$e.find("[name=suc_depa]").val('');
			}
		});		
		w.$e.find("[name=suc_depa]").autocomplete({
			source: base_url+'GetListaDepaAuto',
			minLength: 2,
			select: function(eve, rpta){
				var lug = rpta.item.value;
				w.$e.find("[name=suc_kylug]").val(lug.lug_kylug);
				w.$e.find("[name=suc_depa]").val(lug.lug_depa);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var lug = rpta.item.value;
				w.$e.find("[name=suc_kylug]").val(lug.lug_kylug);
				w.$e.find("[name=suc_depa]").val(lug.lug_depa);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=suc_depa]").autocomplete('widget').css('z-index',1100);
	},
	provinciaAutocomplete: function (w){
		w.$e.find("[name=suc_prov]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=suc_kylug]").val('0');	
				w.$e.find("[name=suc_prov]").val('');
			}
		});		
		w.$e.find("[name=suc_prov]").autocomplete({
			source: base_url+'GetListaProvAuto',
			minLength: 2,
			select: function(eve, rpta){
				var lug = rpta.item.value;
				w.$e.find("[name=suc_kylug]").val(lug.lug_kylug);
				w.$e.find("[name=suc_prov]").val(lug.lug_prov);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var lug = rpta.item.value;
				w.$e.find("[name=suc_kylug]").val(lug.lug_kylug);
				w.$e.find("[name=suc_prov]").val(lug.lug_prov);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=suc_prov]").autocomplete('widget').css('z-index',1100);
	},
	distritoAutocomplete: function (w){
		w.$e.find("[name=suc_dist]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=suc_kylug]").val('0');	
				w.$e.find("[name=suc_dist]").val('');
			}
		});		
		w.$e.find("[name=suc_dist]").autocomplete({
			source: base_url+'GetListaDistAuto',
			minLength: 2,
			select: function(eve, rpta){
				var lug = rpta.item.value;
				w.$e.find("[name=suc_kylug]").val(lug.lug_kylug);
				w.$e.find("[name=suc_dist]").val(lug.lug_dist);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var lug = rpta.item.value;
				w.$e.find("[name=suc_kylug]").val(lug.lug_kylug);
				w.$e.find("[name=suc_dist]").val(lug.lug_dist);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=suc_dist]").autocomplete('widget').css('z-index',1100);
	},
	destinoAutocomplete: function (w){
		sucu.we=w;
		w.$e.find("[name=des_nomb]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=des_id]").val('0');	
			}
		});
		w.$e.find("[name=des_nomb]").autocomplete({
			source: base_url+"erp/sucu/listaAutoSucursal?suc_tipo="+w.suc_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var suc = rpta.item.value;
				sucu.we.$e.find("[name=des_id]").val(suc.kysucu);
				sucu.we.$e.find("[name=des_nomb]").val(suc.nomb);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var suc = rpta.item.value;
				sucu.we.$e.find("[name=des_id]").val(suc.kysucu);
				sucu.we.$e.find("[name=des_nomb]").val(suc.nomb);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=suc_nomb]").autocomplete('widget').css('z-index',1100);
	},
	sucursalAutocomplete: function (w){
		var suc_tipo = ((typeof w.suc_tipo=="undefined")?'SUCGENE':w.suc_tipo);
		var cmp_nomb = ((typeof w.cmp_nomb=="undefined")?'nomb':w.cmp_nomb);
		var prf_ccor = '';
		var prf_sucu = '';

		if(suc_tipo=='LOCA'){prf_sucu='loc';}
		else if(suc_tipo=='SUCU'){prf_sucu='suc';}
		else if(suc_tipo=='CAGE'){prf_sucu='caj';}
		else{prf_sucu='suc';}

		w.$e.find("[name="+prf_sucu+"_"+cmp_nomb+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name="+prf_sucu+"_kysuc]").val('0');	
				w.$e.find("[name="+prf_sucu+"_tipo]").val('');
				w.$e.find("[name="+prf_sucu+"_nomb]").val('');
			}
		});				
		w.$e.find("[name="+prf_sucu+"_"+cmp_nomb+"]").autocomplete({
			source: base_url+'GetListaSucursalAuto?suc_tipo='+suc_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var obj = rpta.item.value;
				w.$e.find("[name="+prf_sucu+"_kysuc]").val(obj.suc_kysuc);	
				w.$e.find("[name="+prf_sucu+"_tipo]").val(obj.suc_tipo);
				w.$e.find("[name="+prf_sucu+"_nomb]").val(obj.suc_nomb);
				if(obj.suc_nomb=='Seleccione')
				{
					sucu.winSel({
						tipo: suc_tipo,
						modo: 'SELECCIONAR',
						suc: {suc_tipo: suc_tipo},
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_sucu+"_kysuc]").val(objSel.suc_kysuc);	
								w.$e.find("[name="+prf_sucu+"_tipo]").val(objSel.suc_tipo);
								w.$e.find("[name="+prf_sucu+"_nomb]").val(objSel.suc_nomb);
							}//if(objSel){
						}//callback:function(objSel){
					});//prop.winSel({
				}//if(prp.prp_secc=='Seleccione')
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
				w.$e.find("[name="+prf_sucu+"_kysuc]").val(obj.suc_kysuc);	
				w.$e.find("[name="+prf_sucu+"_tipo]").val(obj.suc_tipo);
				w.$e.find("[name="+prf_sucu+"_nomb]").val(obj.suc_nomb);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_sucu+"_"+cmp_nomb+"]").autocomplete('widget').css('z-index',1100);
	},	
	sucursalAutocomplete_OLD: function(w){
		w.$e.find("[name=suc_nomb]").on('blur', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=suc_kysucu]").val('0');
				w.$e.find("[name=suc_tipo]").val();
				w.$e.find("[name=suc_nomb]").val();
				w.$e.find("[name=suc_dscr]").val();
			}
		});				
		w.$e.find("[name=suc_nomb]").autocomplete({
			source: base_url+"erp/sucu/listaAutoSucursal?suc_tipo="+w.suc_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=suc_kysucu]").val(suc.kysucu);
				w.$e.find("[name=suc_tipo]").val(tipCaBa[suc.tipo]);
				w.$e.find("[name=suc_nomb]").val(suc.nomb);
				w.$e.find("[name=suc_dscr]").val(suc.dscr);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=suc_kysucu]").val(suc.kysucu);
				w.$e.find("[name=suc_tipo]").val(tipCaBa[suc.tipo]);
				w.$e.find("[name=suc_nomb]").val(suc.nomb);
				w.$e.find("[name=suc_dscr]").val(suc.dscr);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=suc_nomb]").autocomplete('widget').css('z-index',1100);
	},
	cajabancoAutocomplete: function (w){
		sucu.we=w;
		w.$e.find("[name=caj_nomb]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=caj_kysucu]").val('0');
				w.$e.find("[name=caj_nomb]").val('');
				w.$e.find("[name=caj_tipo]").val('');
			}
		});
		w.$e.find("[name=caj_nomb]").autocomplete({
			source: base_url+'GetListaSucursalAuto?suc_tipo='+w.suc_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=caj_kysucu]").val(suc.suc_kysucu);
				w.$e.find("[name=caj_nomb]").val(suc.suc_nomb);
				w.$e.find("[name=caj_tipo]").val(tipCaBa[suc.suc_tipo]);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=caj_kysucu]").val(suc.suc_kysuc);
				w.$e.find("[name=caj_nomb]").val(suc.suc_nomb);
				w.$e.find("[name=caj_tipo]").val(tipCaBa[suc.suc_tipo]);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=caj_nomb]").autocomplete('widget').css('z-index',1100);
	},		
	sucursalAuto: function(w){
		sucu.we=w;
		w.$e.find("[name=usu_nomb]").autocomplete({
			source: base_url+"erp/sucu/listaSucursalAuto",
			minLength: 2,
			select: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=usu_kyusu]").val(suc.suc_kysuc);
				w.$e.find("[name=usu_tdoc]").val(suc.suc_tdoc);
				w.$e.find("[name=usu_ndoc]").val(suc.suc_ndoc);
				w.$e.find("[name=usu_nomb]").val(suc.suc_nomb);
				w.$e.find("[name=usu_dire]").val(suc.suc_dire);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=usu_kyusu]").val(suc.suc_kysuc);
				w.$e.find("[name=usu_tdoc]").val(suc.suc_tdoc);
				w.$e.find("[name=usu_ndoc]").val(suc.suc_ndoc);
				w.$e.find("[name=usu_nomb]").val(suc.suc_nomb);
				w.$e.find("[name=usu_dire]").val(suc.suc_dire);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=usu_nomb]").autocomplete('widget').css('z-index',1100);
	},
	sucursalReporteAuto: function (w){
		sucu.we=w;
		w.$e.find("[name=sucursal_nomAuto]").autocomplete({
			source: base_url+"erp/sucu/listaSucursalAuto",
			minLength: 2,
			select: sucu.sucursalReporteSeleccionado,
			focus: sucu.sucursalReporteMarcado
		});
		w.$e.find("[name=sucursal_nomAuto]").autocomplete('widget').css('z-index',1100);
	},
	sucursalReporteMarcado: function(e, rpta){
		var obj = rpta.item.value;
		sucu.we.$e.find("[name=sucursal_ideAuto]").val(obj.id_obj);
		sucu.we.$e.find("[name=sucursal_nomAuto]").val(obj.nomb);
		e.preventDefault();
	},
	sucursalReporteSeleccionado: function(e, rpta){
		var obj = rpta.item.value;
		sucu.we.$e.find("[name=sucursal_ideAuto]").val(obj.id_obj);
		sucu.we.$e.find("[name=sucursal_nomAuto]").val(obj.nomb);
		e.preventDefault();
	},
	cajacampoAutocomplete: function (w){
		w.$e.find("[name=caj_nomb]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=caj_kysucu]").val('0');
				w.$e.find("[name=caj_nomb]").val('');
			}
		});		
		w.$e.find("[name=caj_nomb]").autocomplete({
			source: base_url+"erp/sucu/listaAutoSucursal?suc_tipo="+w.suc_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=caj_kysucu]").val(suc.suc_kysucu);
				w.$e.find("[name=caj_nomb]").val(suc.suc_nomb);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=caj_kysucu]").val(suc.suc_kysucu);
				w.$e.find("[name=caj_nomb]").val(suc.suc_nomb);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=caj_nomb]").autocomplete('widget').css('z-index',1100);
	},
	cajaAutocomplete: function (w){
		w.$e.find("[name=caj_nomb]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=caj_kysucu]").val('0');
				w.$e.find("[name=caj_nomb]").val('');
			}
		});		
		w.$e.find("[name=caj_nomb]").autocomplete({
			source: base_url+"erp/sucu/listaAutoSucursal?suc_tipo="+w.suc_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=caj_kysucu]").val(suc.suc_kysucu);
				w.$e.find("[name=caj_nomb]").val(suc.suc_nomb);
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var suc = rpta.item.value;
				w.$e.find("[name=caj_kysucu]").val(suc.suc_kysucu);
				w.$e.find("[name=caj_nomb]").val(suc.suc_nomb);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=caj_nomb]").autocomplete('widget').css('z-index',1100);
	}	
};