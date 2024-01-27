var asig = {
	pag:{
		alias		: 'Asignatura',
		nameWB		: 'brwAsignatura',
		nameWP		: 'winAsignatura',
		nameWS		: 'selAsignatura',
		nameWI		: 'intAsignatura',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwAsignatura',
		idGridWP	: 'idWinAsignatura',
		idGridWS	: 'idSelAsignatura',
		idGridWI	: 'idIntAsignatura'
	},
	tipPag: {
		"ASIGNATURA":{'name': 'Asignatura', 'alias': 'Asignatura'},
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/usua','adm/prop', 'clg/evlu', 'asi/asit']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		asig.winBrow(w);
	},
	winBrow: function(w){
		asig.import(function(){
			if(w==null)w=new Object;
			asig.setPagina(w);
			asig[w.pag.nameWB]=w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
                url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),				
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					
					w.$e.find('[name=tdPrograma]').html(w.prg.prg_nomb);
					w.$e.find('[name=tdGrado]').html(w.prg.prg_grad);
					w.$e.find('[name=tdNivel]').html(w.prg.prg_nive);

					asig.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//asig.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		asig.import(function(){
			if(w==null)w=new Object;
			asig.setPagina(w);
		  asig[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 450 : 700),
				height:((w.size && w.size=='short') ? 450 : 750),
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
							asig.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							asig.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
			
					usua.usuarioAutocomplete($.extend(w, {prf_nomb: 'PROFESOR', prf_inpu: 'pfo_ndoc', prf_sele: 1}));
					usua.usuarioAutocomplete($.extend(w, {prf_nomb: 'PROFESOR', prf_inpu: 'pfo_nomb', prf_sele: 1}));
					
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPASG', prf_inpu: 'asg_prop', prf_sele: 1}));
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPEVL', prf_inpu: 'evl_dscr', prf_sele: 1}));

					asig.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//asig.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		asig.import(function(){
			if(w==null)w=new Object;
			asig.setPagina(w);
			asig[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:((w.size && w.size=='short') ? 300 : 400),
				height:((w.size && w.size=='short') ? 350 : 550),
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								asig.cerrarFormulario(w);
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
									asig.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							asig.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					asig.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},		
	winInt:function(w){
		asig.import(function(){
			if(w==null)w=new Object;
			asig.setPagina(w);
			asig[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					asig.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true, pagination: false}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//asig.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['clg/brw_asig']}, function(rpta){
			if(rpta){brw_asig.ejecutar($.extend(w,{modulo:'controllers', archivo: 'clg/brw_asig'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){asig.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){asig.llenarFormulario(w);}
		asig.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'alu, mtr, pfo, asg, evl',w.modo);
	},
	limpiarFormulario:function(w){
		console.log(w.mtr);
//		w.$e.find('[name=asg_kyasg]').val('');
		w.$e.find('[name=asg_kymtr]').val(w.mtr.mtr_kymtr);

		w.$e.find('[name=mtr_peri]').val(w.mtr.mtr_peri);
		w.$e.find('[name=mtr_turn]').val(w.mtr.mtr_turn);
		w.$e.find('[name=mtr_aula]').val(w.mtr.mtr_aula);

		w.$e.find('[name=alu_kyusu]').val(w.alu.alu_kyusu);
		w.$e.find('[name=alu_ndoc]').val(w.alu.alu_ndoc);
		w.$e.find('[name=alu_nomb]').val(w.alu.alu_nomb);
		
		w.$e.find('[name=pfo_kyusu]').val('');
		w.$e.find('[name=pfo_ndoc]').val('');
		w.$e.find('[name=pfo_nomb]').val('');

		w.$e.find('[name=asg_kyasg]').val('');
		w.$e.find('[name=asg_kypfo]').val('');
		w.$e.find('[name=asg_kyevl]').val('');
		w.$e.find('[name=asg_prop]').val('');
		w.$e.find('[name=asg_vers]').val('');
		
		w.$e.find('[name=evl_dscr]').val('');
		w.$e.find('[name=img_pfo_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		w.$e.excluirFilter = true;
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			asg_kyasg: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=asg_kyasg]').val()),
			tipo:w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=asg_kyasg]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=asg_kyasg]').val())){
			Sisem.ejecutar('clg/GetListaAsignatura',{asg_kyasg: w.$e.find('[name=asg_kyasg]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];

					w.$e.find('[name=mtr_peri]').val(fila.mtr_peri);
					w.$e.find('[name=mtr_turn]').val(fila.mtr_turn);
					w.$e.find('[name=mtr_aula]').val(fila.mtr_aula);
					
					w.$e.find('[name=alu_kyusu]').val(w.alu.alu_kyusu);
					w.$e.find('[name=alu_ndoc]').val(w.alu.alu_ndoc);
					w.$e.find('[name=alu_nomb]').val(w.alu.alu_nomb);
					
					w.$e.find('[name=pfo_kyusu]').val(fila.pfo_kyusu);
					w.$e.find('[name=pfo_ndoc]').val(fila.pfo_ndoc);
					w.$e.find('[name=pfo_nomb]').val(fila.pfo_nomb+' '+fila.pfo_apel);
					
					w.$e.find('[name=asg_kyasg]').val(fila.asg_kyasg);
					w.$e.find('[name=asg_kymtr]').val(fila.asg_kymtr);
					w.$e.find('[name=asg_kypfo]').val(fila.asg_kypfo);
					w.$e.find('[name=asg_kyevl]').val(fila.asg_kyevl);
     				w.$e.find('[name=asg_prop]').val(fila.asg_nomb);
					w.$e.find('[name=asg_vers]').val(fila.asg_vers);

					w.$e.find('[name=evl_kyprp]').val(fila.evl_kyprp);
					w.$e.find('[name=evl_dscr]').val(fila.evl_dscr);
					
					Sisem.getFile('adm/'+fila.pfo_foto, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success'){w.$e.find('[name=img_pfo_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						else{w.$e.find('[name=img_pfo_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
					});

					if(fila.evl_kyprp > 0)
					{
						prop.winInt({
							cntInt: 'divIntListaEvaluacion',
							tipo: 'PRPEVL',
							tipoBrowse: 'EXPLORADOR',
							size: 'short',
							prp: {prp_kypdr: fila.evl_kyprp, prp_secc: 'PRPEVL', prp_tipo: 'UNICO'},
							callback:function(data){
								//console.log('abriendo oper.interior ' + data);
							}
						});						
					}
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaAsignatura',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
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
				
				asig.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				asig.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				asig.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=mtr_peri]'), false);
		Sisem.activar(w.$e.find('[name=mtr_turn]'), false);
		Sisem.activar(w.$e.find('[name=mtr_aula]'), false);
		
		Sisem.activar(w.$e.find('[name=alu_kyusu]'), false);
		Sisem.activar(w.$e.find('[name=alu_ndoc]'), false);
		Sisem.activar(w.$e.find('[name=alu_nomb]'), false);

		Sisem.activar(w.$e.find('[name=pfo_kyusu]'), w.activar);
		Sisem.activar(w.$e.find('[name=pfo_ndoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=pfo_nomb]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=asg_codi]'), false);
		Sisem.activar(w.$e.find('[name=asg_prop]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=evl_dscr]'), w.activar);
		
		w.$e.find('[name=inp_foto]').css('display','none');
		Sisem.activar(w.$e.find('[name=alu_foto]'), false);		
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'alu, mtr, pfo, asg, evl','VALIDAR')){return false;}
		return true;
	},
	validarServidor: function(w, callback){
		var data=asig.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(asig.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='DGEN';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: asig.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+asig.tipPag[w.tipo]['name'],
			nameWP		: 'win'+asig.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+asig.tipPag[w.tipo]['name'],
			nameWI		: 'int'+asig.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+asig.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+asig.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+asig.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+asig.tipPag[w.tipo]['name']
		});
		asig.tipPagAct = w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		asig.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			size: 'short',
			mtr: w.mtr,
			alu: w.alu,
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			asig.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(asig.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = asig.obtenerDatoFormulario(w);
				Sisem.ejecutar('clg/CtrlAsignatura',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=asg_kyasg]').val(rpta.asg_kyasg);
						$.extend(w,{modo: 'VISUALIZAR'});
						asig.cerrarFormulario($.extend(w,{data : asig.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(asig.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			asig.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			asig.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	asignaturaAutocomplete: function (w){
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
				w.$e.find("[name="+prf_tabl+"_kyprp]").val('0');
				w.$e.find("[name="+prf_tabl+"_nive]").val('');
				w.$e.find("[name="+prf_tabl+"_secc]").val('');
				w.$e.find("[name="+prf_tabl+"_codi]").val('');
				w.$e.find("[name="+prf_tabl+"_prop]").val('');
				w.$e.find("[name="+prf_tabl+"_valu]").val('');
				$(this).autocomplete('enable');
			}//if(Sisem.isEmpty(valor)){
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'adm/GetListaPropiedadAuto?prp_secc='+prp_secc+'&campo=prp_'+prf_camp+'&mostrarSeleccion='+prf_sele,
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},
			select: function(eve, rpta){
				var obj = rpta.item.value;
				w.$e.find("[name="+prf_tabl+"_kyprp]").val(obj.prp_kyprp);
				w.$e.find("[name="+prf_tabl+"_nive]").val(obj.prp_nive);
				w.$e.find("[name="+prf_tabl+"_secc]").val(obj.prp_secc);
				w.$e.find("[name="+prf_tabl+"_codi]").val(obj.prp_codi);
				w.$e.find("[name="+prf_tabl+"_prop]").val(obj.prp_prop);
				w.$e.find("[name="+prf_tabl+"_valu]").val(obj.prp_valu);
				if(obj.prp_prop=='Seleccione')
				{
					prop.winSel({
						tipo: prp_secc,
						modo: 'SELECCIONAR',
						prp: {prp_secc: prp_secc, prp_nive: '2'},
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_tabl+"_kyprp]").val(objSel.prp_kyprp);
								w.$e.find("[name="+prf_tabl+"_nive]").val(objSel.prp_nive);
								w.$e.find("[name="+prf_tabl+"_secc]").val(objSel.prp_secc);
								w.$e.find("[name="+prf_tabl+"_codi]").val(objSel.prp_codi);
								w.$e.find("[name="+prf_tabl+"_prop]").val(objSel.prp_prop);
								w.$e.find("[name="+prf_tabl+"_valu]").val(objSel.prp_valu);
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
				w.$e.find("[name="+prf_tabl+"_kyprp]").val(obj.prp_kyprp);
				w.$e.find("[name="+prf_tabl+"_nive]").val(obj.prp_nive);
				w.$e.find("[name="+prf_tabl+"_secc]").val(obj.prp_secc);
				w.$e.find("[name="+prf_tabl+"_codi]").val(obj.prp_codi);
				w.$e.find("[name="+prf_tabl+"_prop]").val(obj.prp_prop);
				w.$e.find("[name="+prf_tabl+"_valu]").val(obj.prp_valu);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	}
};
