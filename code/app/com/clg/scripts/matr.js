var matr = {
	pag:{
		alias		: 'Matricula',
		nameWB		: 'brwMatricula',
		nameWP		: 'winMatricula',
		nameWS		: 'selMatricula',
		nameWI		: 'intMatricula',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwMatricula',
		idGridWP	: 'idWinMatricula',
		idGridWS	: 'idSelMatricula',
		idGridWI	: 'idIntMatricula'
	},
	tipPag: {
		"MATRICULA":{'name': 'Matricula', 'alias': 'Matricula'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/usua','adm/prop','clg/asig', 'clg/evlu']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		matr.winBrow(w);
	},
	winBrow: function(w){
		matr.import(function(){
			if(w==null)w=new Object;
			matr.setPagina(w);
			matr[w.pag.nameWB]=w;
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
					
					matr.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//matr.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		matr.import(function(){
			if(w==null)w=new Object;
			matr.setPagina(w);
		    matr[w.pag.nameWP]=w;
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
							matr.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							matr.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);		
					
					usua.usuarioAutocomplete($.extend(w, {prf_nomb: 'ALUMNO', prf_inpu: 'alu_nomb', prf_sele: 1}));
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPAUL', prf_inpu: 'aul_prop', prf_sele: 1}));
					
					w.$e.find('[name=mtr_freg]').mask("00/00/0000");
					w.$e.find('[name=mtr_fini]').mask("00/00/0000");
					w.$e.find('[name=mtr_ffin]').mask("00/00/0000");
			        w.$e.find('[name=mtr_impo]').mask("#,##0.00", {reverse: true});
					
					matr.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//matr.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		matr.import(function(){
			if(w==null)w=new Object;
			matr.setPagina(w);
			matr[w.pag.nameWS] = w;
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
								matr.cerrarFormulario(w);
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
									matr.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							matr.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					matr.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},		
	winInt:function(w){
		matr.import(function(){
			if(w==null)w=new Object;
			matr.setPagina(w);
			matr[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					matr.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//matr.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['clg/brw_matr']}, function(rpta){
			if(rpta){brw_matr.ejecutar($.extend(w,{modulo:'controllers', archivo: 'clg/brw_matr'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){matr.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){matr.llenarFormulario(w);}
		matr.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'alu, prg, mtr, aul',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=mtr_kymtr]').val('');
		w.$e.find('[name=mtr_kyprg]').val(w.prg.prg_kyprg);
		
		w.$e.find('[name=prg_kyprg]').val(w.prg.prg_kyprg);
		w.$e.find('[name=prg_nomb]').val(w.prg.prg_nomb);
		w.$e.find('[name=prg_grad]').val(w.prg.prg_grad);
		w.$e.find('[name=prg_nive]').val(w.prg.prg_nive);
		
		w.$e.find('[name=alu_ndoc]').val('');
		w.$e.find('[name=alu_nomb]').val('');
		
		w.$e.find('[name=mtr_peri]').val('');
		w.$e.find('[name=mtr_turn]').val('');
		w.$e.find('[name=mtr_aula]').val('');
		w.$e.find('[name=mtr_freg]').val('');
		w.$e.find('[name=mtr_fini]').val('');
		w.$e.find('[name=mtr_ffin]').val('');
		w.$e.find('[name=mtr_impo]').val('');
		w.$e.find('[name=mtr_esta]').val('');
		
		w.$e.find('[name=img_alu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			mtr_kymtr: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=mtr_kymtr]').val()),
			tipo:w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=mtr_kymtr]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=mtr_kymtr]').val())){
			Sisem.ejecutar('clg/GetListaMatricula',{mtr_kymtr: w.$e.find('[name=mtr_kymtr]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					w.$e.find('[name=mtr_kymtr]').val(fila.mtr_kymtr);
					w.$e.find('[name=alu_kyusu]').val(fila.alu_kyusu);
					w.$e.find('[name=alu_ndoc]').val(fila.alu_ndoc);
					w.$e.find('[name=alu_nomb]').val(fila.alu_nomb);
					
					w.$e.find('[name=mtr_peri]').val(fila.mtr_peri);
					w.$e.find('[name=mtr_turn]').val(fila.mtr_turn);
					w.$e.find('[name=aul_prop]').val(fila.mtr_aula);
					
					w.$e.find('[name=mtr_freg]').val(moment(fila.mtr_freg).format('DD/MM/YYYY'));
					w.$e.find('[name=mtr_fini]').val(moment(fila.mtr_fini).format('DD/MM/YYYY'));
					w.$e.find('[name=mtr_ffin]').val(moment(fila.mtr_ffin).format('DD/MM/YYYY'));
					w.$e.find('[name=mtr_esta]').val(fila.mtr_esta);

					Sisem.getFile('adm/'+fila.alu_foto, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success'){w.$e.find('[name=img_alu_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						else{w.$e.find('[name=img_alu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
					});

					asig.winInt({
						cntInt: 'gridCursosAlumno',
						tipo: 'ASIGNATURA',
						size: 'short',
						mtr: {mtr_kymtr: fila.mtr_kymtr, mtr_peri: fila.mtr_peri, mtr_turn: fila.mtr_turn, mtr_aula: fila.mtr_aula},
						alu: {alu_kyusu: fila.alu_kyusu, alu_ndoc: fila.alu_ndoc, alu_nomb: fila.alu_nomb},
						callback:function(data){
							//console.log('abriendo oper.interior ' + data);
						}
					});
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaMatricula',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
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
				
				matr.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				matr.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				matr.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		w.$e.find('[name=inp_foto]').css('display','none');
		
		Sisem.activar(w.$e.find('[name=prg_nomb]'), false);
		Sisem.activar(w.$e.find('[name=prg_peri]'), false);
		Sisem.activar(w.$e.find('[name=prg_grad]'), false);
		Sisem.activar(w.$e.find('[name=prg_turn]'), false);
		Sisem.activar(w.$e.find('[name=prg_aula]'), false);
		Sisem.activar(w.$e.find('[name=prg_nive]'), false);

		Sisem.activar(w.$e.find('[name=alu_ndoc]'), false);
		Sisem.activar(w.$e.find('[name=alu_nomb]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=aul_prop]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=mtr_peri]'), w.activar);
		Sisem.activar(w.$e.find('[name=mtr_turn]'), w.activar);
		Sisem.activar(w.$e.find('[name=mtr_aula]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=mtr_freg]'), w.activar);
		Sisem.activar(w.$e.find('[name=mtr_fini]'), w.activar);
		Sisem.activar(w.$e.find('[name=mtr_ffin]'), w.activar);
		Sisem.activar(w.$e.find('[name=mtr_impo]'), w.activar);
		Sisem.activar(w.$e.find('[name=mtr_esta]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'alu, prg, mtr, aul','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='MATRIC';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: matr.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+matr.tipPag[w.tipo]['name'],
			nameWP		: 'win'+matr.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+matr.tipPag[w.tipo]['name'],
			nameWI		: 'int'+matr.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+matr.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+matr.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+matr.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+matr.tipPag[w.tipo]['name']
		});
		matr.tipPagAct = matr.tipPag[w.tipo].name+'_'+w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		matr.winPop({
			politicaSeguridad: 'matr-btnAddClick',
			tipo: w.tipo,
			modo: 'AGREGAR',
			apc: USERDATA.apc,
			caj: USERDATA.suc,
			prg: w.prg,
			size: 'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			matr.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(matr.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = matr.obtenerDatoFormulario(w);
				Sisem.ejecutar('clg/CtrlMatricula',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=mtr_kymtr]').val(rpta.mtr_kymtr);
						$.extend(w,{modo: 'VISUALIZAR'});
						matr.cerrarFormulario($.extend(w,{data : matr.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(matr.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			matr.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			matr.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	matriculaAutocomplete: function (w){
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
