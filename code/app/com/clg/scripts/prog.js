var prog = {
	pag:{
		alias		: 'Programa',
		nameWB		: 'brwPrograma',
		nameWP		: 'winPrograma',
		nameWS		: 'selPrograma',
		nameWI		: 'intPrograma',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwPrograma',
		idGridWP	: 'idWinPrograma',
		idGridWS	: 'idSelPrograma',
		idGridWI	: 'idIntPrograma'
	},
	tipPag: {
		"PROGRA":{'name': 'Programa', 'alias': 'Programa'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['clg/matr', 'clg/asig','adm/prop']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		prog.winBrow(w);
	},
	winBrow: function(w){
		prog.import(function(){
			if(w==null)w=new Object;
			prog.setPagina(w);
			prog[w.pag.nameWB]=w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
                url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),				
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					prog.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//prog.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		prog.import(function(){
			if(w==null)w=new Object;
			prog.setPagina(w);
		    prog[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				politicaSeguridad: w.politicaSeguridad,
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 550 : 900),
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
							prog.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							prog.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);		
					
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPPRG', prf_inpu: 'prg_prop', prf_sele: 1, prf_solo: 1, prp_nive: 2}));
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPGRA', prf_inpu: 'gra_prop', prf_sele: 1, prf_solo: 1, prp_nive: 2}));
					
					w.$e.find('[name=tituloVentana]').html('Informacion de '+w.pag.alias);
			        w.$e.find('[name=prg_impo]').mask("#,##0.00", {reverse: true});
					
					prog.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prog.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		prog.import(function(){
			if(w==null)w=new Object;
			prog.setPagina(w);
			prog[w.pag.nameWS] = w;
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
								prog.cerrarFormulario(w);
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
									prog.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							prog.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					prog.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},		
	winInt:function(w){
		prog.import(function(){
			if(w==null)w=new Object;
			prog.setPagina(w);
			prog[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					prog.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//prog.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['clg/brw_prog']}, function(rpta){
			if(rpta){brw_prog.ejecutar($.extend(w,{modulo:'controllers', archivo: 'clg/brw_prog'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){prog.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){prog.llenarFormulario(w);}
		prog.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'prg, gra',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=prg_kyprg]').val('');
		
		w.$e.find('[name=prg_kyprp]').val('');
		w.$e.find('[name=prg_prop]').val('');
		
		w.$e.find('[name=gra_kyprp]').val('');
		w.$e.find('[name=gra_prop]').val('');
		
		w.$e.find('[name=prg_nive]').val('');
		w.$e.find('[name=prg_impo]').val('');
		w.$e.find('[name=prg_esta]').val('');
		
		w.$e.find('[name=img_alu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			prg_kyprg: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=prg_kyprg]').val()),
			tipo:w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=prg_kyprg]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=prg_kyprg]').val())){
			Sisem.ejecutar('clg/GetListaPrograma',{prg_kyprg: w.$e.find('[name=prg_kyprg]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					w.$e.find('[name=prg_kyprg]').val(fila.prg_kyprg);
					w.$e.find('[name=prg_prop]').val(fila.prg_nomb);
					w.$e.find('[name=gra_prop]').val(fila.prg_grad);
					w.$e.find('[name=prg_nive]').val(fila.prg_nive);
					w.$e.find('[name=prg_impo]').val(fila.prg_impo);
					w.$e.find('[name=prg_esta]').val(fila.prg_esta);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaPrograma',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
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
				
				prog.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				prog.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				prog.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=prg_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=gra_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=prg_nive]'), w.activar);
		Sisem.activar(w.$e.find('[name=prg_impo]'), w.activar);
		Sisem.activar(w.$e.find('[name=prg_esta]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'prg, gra','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='PROGRA';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: prog.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+prog.tipPag[w.tipo]['name'],
			nameWP		: 'win'+prog.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+prog.tipPag[w.tipo]['name'],
			nameWI		: 'int'+prog.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+prog.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+prog.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+prog.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+prog.tipPag[w.tipo]['name']
		});
		prog.tipPagAct = prog.tipPag[w.tipo].name+'_'+w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		prog.winPop({
			politicaSeguridad: 'prog-btnAddClick',
			tipo: w.tipo,
			modo:'AGREGAR',
			apc:USERDATA.apc,
			caj:USERDATA.suc,
			tra:USERDATA.tra,			
			size: 'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			prog.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(prog.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = prog.obtenerDatoFormulario(w);
				Sisem.ejecutar('clg/CtrlPrograma',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=prg_kyprg]').val(rpta.prg_kyprg);
						$.extend(w,{modo: 'VISUALIZAR'});
						prog.cerrarFormulario($.extend(w,{data : prog.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(prog.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			prog.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			prog.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	programaAutocomplete: function (w){
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
				w.$e.find("[name="+prf_tabl+"_kyprg]").val('0');
				w.$e.find("[name="+prf_tabl+"_nomb]").val('');
				w.$e.find("[name="+prf_tabl+"_grad]").val('');
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
				w.$e.find("[name="+prf_tabl+"_kyprg]").val(obj.prp_kyprg);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.prp_nomb);
				w.$e.find("[name="+prf_tabl+"_grad]").val(obj.prp_grad);
				if(obj.prp_prop=='Seleccione')
				{
					prop.winSel({
						tipo: prp_secc,
						modo: 'SELECCIONAR',
						prp: {prp_secc: prp_secc, prp_nive: '2'},
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_tabl+"_kyprg]").val(objSel.prp_kyprg);
								w.$e.find("[name="+prf_tabl+"_nomb]").val(objSel.prp_nomb);
								w.$e.find("[name="+prf_tabl+"_grad]").val(objSel.prp_grad);
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
				w.$e.find("[name="+prf_tabl+"_kyprg]").val(obj.prp_kyprg);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.prp_nomb);
				w.$e.find("[name="+prf_tabl+"_grad]").val(obj.prp_grad);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	}
};
