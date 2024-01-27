var tare = {
	pag:{
		alias		: 'Tarea',
		nameWB		: 'brwTarea',
		nameWP		: 'winTarea',
		nameWS		: 'selTarea',
		nameWI		: 'intTarea',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwTarea',
		idGridWP	: 'idWinTarea',
		idGridWS	: 'idSelTarea',
		idGridWI	: 'idIntTarea'
	},
	tipPag: {
		"TARE":{'name': 'Tarea', 'alias': 'Tarea Sistema'}
	},
	tipPagAct: '',
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
		tare.winBrow(w);
	},
	winBrow : function(w){
		tare.import(function(){
			if(w==null)w=new Object;
			tare.setPagina(w);
			tare[w.pag.nameWB]= w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&tipoBrowse='+((w.tipoBrowse)?w.tipoBrowse:''),
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					console.log(w.$e);

					w.$e.find('[name="tar_nomb"]').html('NOMBRE_TAREA');
					w.$e.find('[name="tar_dscr"]').html('DESCRI_TAREA');

					w.$e.find('[name=chkClaseTarea]').on('change', function(){
						if($(this).prop('checked'))
						{
							w.$e.find('[name=spnTituloClaseTarea]').html('Visualizar nombre de taretica');
							w.$e.find('[name^=spnTarea]').css('display', 'none');
							w.$e.find('[name^=spnClase]').css('display', 'inline');
						}
						else
						{
							w.$e.find('[name=spnTituloClaseTarea]').html('Visualizar nombre de clase');
							w.$e.find('[name^=spnTarea]').css('display', 'inline');
							w.$e.find('[name^=spnClase]').css('display', 'none');
						}
					});
					var $divTarea = w.$e.find('[name="divTarea"]');
					$divTarea.data('data', {tar_kytar: 0, tar_nive: 1});
					tare.cargarTarea($divTarea);
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//tare.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		tare.import(function(rpta){
			if(w==null)w=new Object;
			tare.setPagina(w);
			tare[w.pag.nameWP] = w;
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
							tare.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							tare.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					w.$e.find('[name=btnLoadFoto]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=tar_nomb]').val()))
						{
							w.$e.find('[name=inp_foto]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar nombre taretica');
							w.$e.find("input[name=tar_nomb]").focus();
						}
					});	
					w.$e.find('[name=inp_foto]').change(function(event){
						var texto = w.$e.find('[name=inp_foto]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = w.$e.find('[name=inp_foto]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
						var fileSize = file.size;
						var fileType = file.type;
//						var fileNameNew='foto'+w.$e.find('[name=tar_nomb]').val()+'_'+(new Date()).getTime()+'.'+fileExtension;
						var fileNameNew='foto'+w.$e.find('[name=tar_nomb]').val()+'.'+fileExtension;
						w.$e.find('[name=tar_imin]').val(fileNameNew);
//						var ancho = w.$e.find('[name=pan_foto]').outerWidth();
//						var alto = w.$e.find('[name=pan_foto]').outerHeight();
						var ancho = 158;
						var alto = 158;
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'cmn/CtrlTarea/uploadFile?modulo=imagen&ancho='+ancho+'&alto='+alto, function(rpta){
							w.$e.find('[name=img_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
						});
					});
					w.$e.find('[name=tar_temp]').val((typeof w.app!='undefined')?w.app.tar_temp:'');
					tare.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//tare.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		tare.import(function(){
			if(w==null)w=new Object;
			tare.setPagina(w);
			tare[w.pag.nameWS] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:((w.size && w.size=='short') ? 300 : 700),
				height:((w.size && w.size=='short') ? 350 : 800),
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWS+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&tipoBrowse='+((w.tipoBrowse)?w.tipoBrowse:''),
				modal:false,
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					if(w.tipoBrowse == 'BROWSER')
					{
						tare.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));	
					}
					else if(w.tipoBrowse == 'EXPLORADOR')
					{
						w.$e.find('[name="tar_nomb"]').html(w.tar.tar_nomb);
						w.$e.find('[name="tar_dscr"]').html(w.tar.tar_dscr);

						w.$e.find('[name=chkClaseTarea]').on('change', function(){
							if($(this).prop('checked'))
							{
								w.$e.find('[name=spnTituloClaseTarea]').html('Visualizar nombre de taretica');
								w.$e.find('[name^=spnTarea]').css('display', 'none');
								w.$e.find('[name^=spnClase]').css('display', 'inline');
							}
							else
							{
								w.$e.find('[name=spnTituloClaseTarea]').html('Visualizar nombre de clase');
								w.$e.find('[name^=spnTarea]').css('display', 'inline');
								w.$e.find('[name^=spnClase]').css('display', 'none');
							}
						});
						var $divTarea = w.$e.find('[name="divTarea"]');
						$divTarea.data('data', {tar_kytar: w.tar.tar_kytar, tar_nive: 0});
						tare.cargarTarea($divTarea);
					}
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//tare.import(function(){
	},
	winInt:function(w){
		tare.import(function(){
			if(w==null)w=new Object;
			tare.setPagina(w);
			tare[w.pag.nameWI] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWI+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&enlace='+w.enlace,
				beforeLoad:function(){
				},
				afterLoad:function(data){
					//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					tare.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//tare.import(function(){
	},	
	//////////////////////////////
	//Metodos de Interface      //
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['cmn/brw_tare']}, function(rpta){
			if(rpta){brw_tare.ejecutar($.extend(w,{modulo:'controllers', archivo: 'cmn/brw_tare'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){tare.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){tare.llenarFormulario(w);}
		tare.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'tar',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=tar_kytar]').val('');
		
		w.$e.find('[name=pdr_temp]').val((typeof w.pdr!='undefined')?w.pdr.tar_temp:'');
		w.$e.find('[name=pdr_nomb]').val((typeof w.pdr!='undefined')?w.pdr.tar_nomb:'');
		w.$e.find('[name=pdr_dscr]').val((typeof w.pdr!='undefined')?w.pdr.tar_dscr:'');

		w.$e.find('[name=tar_kypdr]').val((typeof w.tar!='undefined')?w.tar.tar_kytar:'');
		w.$e.find('[name=tar_nive]').val((typeof w.tar!='undefined')?parseInt(w.tar.tar_nive)+1:0);
		w.$e.find('[name=tar_tipo]').val('DATO');
		w.$e.find('[name=tar_codi]').val(moment().format('DDMMYYHHmm'));
		w.$e.find('[name=tar_nomb]').val('');
		w.$e.find('[name=tar_dscr]').val('');
		w.$e.find('[name=tar_clas]').val('');
		w.$e.find('[name=tar_link]').val('');
		w.$e.find('[name=tar_trig]').val('open');
		
		w.$e.find('[name=tar_esta]').val('0001');
		w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			tar_kytar: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=tar_kytar]').val())
			  
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=tar_kytar]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=tar_kytar]').val())){
			Sisem.ejecutar('cmn/GetListaTarea',{tar_kytar: w.$e.find('[name=tar_kytar]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];

					w.$e.find('[name=pdr_temp]').val(fila.pdr_temp);
					w.$e.find('[name=pdr_nomb]').val(fila.pdr_nomb);
					w.$e.find('[name=pdr_dscr]').val(fila.pdr_dscr);

					w.$e.find('[name=tar_kytar]').val(fila.tar_kytar);
					w.$e.find('[name=tar_kytar]').val(fila.tar_kytar);
					w.$e.find('[name=tar_kypdr]').val(fila.tar_kypdr);
					w.$e.find('[name=tar_nive]').val(fila.tar_nive);
					w.$e.find('[name=tar_tipo]').val(fila.tar_tipo);
					w.$e.find('[name=tar_codi]').val(fila.tar_codi);
					w.$e.find('[name=tar_nomb]').val(fila.tar_nomb);
					w.$e.find('[name=tar_dscr]').val(fila.tar_dscr);
					w.$e.find('[name=tar_clas]').val(fila.tar_clas);
					w.$e.find('[name=tar_link]').val(fila.tar_link);
					w.$e.find('[name=tar_trig]').val(fila.tar_trig);
					w.$e.find('[name=tar_esta]').val(fila.tar_esta);
					if(typeof fila.tar_imin != undefined)
					{
						Sisem.getFile('cmn/'+fila.tar_imin, 'imagen', function(rptaImg){
						  if(rptaImg.msg.type=='success'){w.$e.find('[name=img_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						  else{w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
						});
						w.$e.find('[name=tar_imin]').val(fila.tar_imin);
					}//if(typeof fila.tar_imin != undefined)
					tare.winInt({
						cntInt: 'gridTareasHijas',
						tipo: 'TARE',
						size: 'short',
						tar: {tar_kypdr: fila.tar_kytar, tar_kytar: fila.tar_kytar, tar_nive: parseInt(fila.tar_nive)+1},
						callback:function(data){
						}
					});
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('cmn/GetListaTarea',{tar_kytar: w.$e.find('[name=tar_kytar]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=tar_kytar]').val())){
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
				
				tare.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				tare.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				tare.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
//		w.$e.find('[name=tar_kytar]').attr('disabled',true);

		Sisem.activar(w.$e.find('[name=pdr_temp]'), false);
		Sisem.activar(w.$e.find('[name=pdr_nomb]'), false);
		Sisem.activar(w.$e.find('[name=pdr_dscr]'), false);

		Sisem.activar(w.$e.find('[name=tar_kypdr]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_codi]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_tipo]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_clas]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_link]'), w.activar);
		Sisem.activar(w.$e.find('[name=tar_esta]'), w.activar);
        Sisem.activar(w.$e.find('[name=tar_trig]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=tar_imin]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFimg]'), w.activar, 'AZUL');		
		w.$e.find('[name=inp_foto]').css('display','none');
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'tar','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='TARE'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: tare.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+tare.tipPag[w.tipo]['name'],
			nameWP		: 'win'+tare.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+tare.tipPag[w.tipo]['name'],
			nameWI		: 'int'+tare.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+tare.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+tare.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+tare.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+tare.tipPag[w.tipo]['name']
		});
		tare.tipPagAct = w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		tare.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			tare.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(tare.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = tare.obtenerDatoFormulario(w);
				Sisem.ejecutar('cmn/CtrlTarea',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=tar_kytar]').val(rpta.tar_kytar);
						$.extend(w,{modo: 'VISUALIZAR'});
						tare.cerrarFormulario($.extend(w,{data : tare.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(tare.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			tare.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			tare.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	tareticaAutocomplete: function (w){
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_nomb = ((typeof w.prf_nomb=="undefined")?'TARE':w.prf_nomb);
		var arr_inpu = ((typeof w.prf_inpu=="undefined")?'tar_nomb'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = arr_inpu[0];
		var prf_camp = arr_inpu[1];

		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name="+prf_tabl+"_kytar]").val('0');
				w.$e.find("[name="+prf_tabl+"_tipo]").val('');
				w.$e.find("[name="+prf_tabl+"_nomb]").val('');
				w.$e.find("[name="+prf_tabl+"_dscr]").val('');
				w.$e.find("[name="+prf_tabl+"_link]").val('');
				$(this).autocomplete('enable');
			}//if(Sisem.isEmpty(valor)){
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'cmn/GetListaTareaAuto?campo=tar_'+prf_camp+'&mostrarSeleccion='+prf_sele,		
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},
			select: function(eve, rpta){
				var obj = rpta.item.value;
				w.$e.find("[name="+prf_tabl+"_kytar]").val(obj.tar_kytar);
				w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.tar_tipo);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.tar_nomb);
				w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.tar_dscr);
				w.$e.find("[name="+prf_tabl+"_link]").val(obj.tar_link);
				
				if(obj.usu_nomb=='Seleccione')
				{
					usua.winSel({
						tipo: prf_nomb,
						modo: 'SELECCIONAR',
						prf: {prf_nomb: prf_nomb},
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_tabl+"_kyusu]").val(objSel.tar_kytar);
								w.$e.find("[name="+prf_tabl+"_tipo]").val(objSel.tar_tipo);
								w.$e.find("[name="+prf_tabl+"_nomb]").val(objSel.tar_nomb);
								w.$e.find("[name="+prf_tabl+"_dscr]").val(objSel.tar_dscr);
								w.$e.find("[name="+prf_tabl+"_link]").val(objSel.tar_link);
							}//if(objSel){
						}//callback:function(objSel){
					});//prop.winSel({
				}//if(prp.prp_secc=='Seleccione')
				else
				{
					Sisem.getFile('adm/'+obj.usu_foto, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success'){w.$e.find('[name=img_'+prf_tabl+'_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						else{w.$e.find('[name=img_'+prf_tabl+'_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
					});
					w.$e.find('[name='+prf_tabl+'_foto]').val(obj.usu_foto);					
//					if(prf_nomb=='PRPLPR'){$(this).trigger('eventoObtenerPrecio');}
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
								
				w.$e.find("[name="+prf_tabl+"_kytar]").val(obj.tar_kytar);
				w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.tar_tipo);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.tar_nomb);
				w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.tar_dscr);
				w.$e.find("[name="+prf_tabl+"_link]").val(obj.tar_link);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	},	
	cargarTarea: function($parEleTarea)
	{
		Sisem.ejecutar('cmn/brw_tare',{tar_kypdr: $parEleTarea.data('data').tar_kytar, tar_nive: parseInt($parEleTarea.data('data').tar_nive)+1}, function(rpta){

			if(rpta.items.length > 0)
			{
				var $ulTarea = $('<ul></ul>');

				for(var idx=0; idx < rpta.items.length; idx++)
				{
					var data = rpta.items[idx];
					if(typeof data.tar_kytar != 'undefined')
					{
						if(data.tar_nopc > 0)
						{
							$ulTarea.append('<li class="parent_li"><i class="fa fa-lg fa-folder-o" name="icoCarpeta'+data.tar_kytar+'"></i>&nbsp;<span name="spnTarea'+data.tar_kytar+'">'+data.tar_dscr+'</span><span style="display: none;" name="spnClase'+data.tar_kytar+'">'+data.tar_clas+'</span>&nbsp;<i class="fa fa-lg '+((data.tar_tipo=='MENU') ? ((data.tar_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) : 'fa-file-text-o' )+'"></i></li>');
                            $ulTarea.find('[name=icoCarpeta'+data.tar_kytar+']').on('click',function(event)
                            {
                                console.log('CLICK EN SPAN CARPETA PARA CARGAR DATA');

                                $(this).removeClass().addClass('fa fa-lg fa-folder-open-o');
                                var $varEleTarea = $(this).parent('li.parent_li');
                                if ( $varEleTarea.find(' > ul > li').length == 0 ) 
                                {
                                    console.log('CARGAMOS DATA EN ITEM DE LA BD')
                                    tare.cargarTarea($varEleTarea);
    //                                $(this).off();
                                }
                            });
						}
						else
						{
							$ulTarea.append('<li><i class="fa fa-lg fa-book"></i>&nbsp;<span name="spnTarea'+data.tar_kytar+'">'+data.tar_dscr+'</span><span style="display: none;" name="spnClase'+data.tar_kytar+'">'+data.tar_clas+'</span>&nbsp;<i class="fa fa-lg '+((data.tar_tipo=='MENU') ? ((data.tar_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) : 'fa-file-text-o' )+'"></i></li>');
						}
						
                        $ulTarea.find('[name=spnTarea'+data.tar_kytar+']').closest('li').data('data',data);
//                      $ulTarea.find('[name=spnTarea'+data.tar_kytar+']').on('click',function(event)
//                      {
//                        	var dataTmp = $(this).closest('li').data('data');
//                          console.log('CLICK EN SPAN POLITICA PARA CARGAR HTML');
//							tare.winInt({
//								cntInt: 'divContenido',
//								tipo: 'TARE',
//								size: 'short',
//								enlace: dataTmp.tar_link,
//								callback:function(data){
//									//console.log('abriendo oper.interior ' + data);
//								}
//							});
//                      });						
						$parEleTarea.idMenCtx='cm_GlobalGrid';
						$ulTarea.find('[name=spnTarea'+data.tar_kytar+']').contextMenu({
							buttonHelper: true,
						    menuSelector: "#"+$parEleTarea.idMenCtx,
						    onShow:function($el, invokedOn){
						    	console.log('MOSTRAMOS MENU CONTEXTUAL');
						    	if($parEleTarea.modo!='NAVEGAR'){$el.css('z-index','1100');}
						    	var $li = invokedOn.closest('li');

						    	$el.find('[id^='+$parEleTarea.idMenCtx+']').hide();
						    	
								$el.find('#'+$parEleTarea.idMenCtx+'_ingr').show();
								$el.find('#'+$parEleTarea.idMenCtx+'_edit').show();
								$el.find('#'+$parEleTarea.idMenCtx+'_dele').show();
						    },
						    menuSelected: function (invokedOn, selectedMenu) {
						    	var $id = selectedMenu.attr('id');
						    	var $li = invokedOn.closest('li');
						    	switch($id){
						    	case $parEleTarea.idMenCtx+"_ingr":
						    		tare.winPop({
						    			tipo: 'TARE',
					    				modo: 'AGREGAR',
					    				size: 'short',
						    			pdr:{
						    				tar_kytar :$li.data('data').pdr_kytar,
							    			tar_nomb :$li.data('data').pdr_nomb,
							    			tar_dscr :$li.data('data').pdr_dscr
						    			},
						    			tar:{
							    			tar_kytar:$li.data('data').tar_kytar,
							    			tar_kytar:$li.data('data').tar_kytar,
							    			tar_nomb :$li.data('data').tar_nomb,
							    			tar_nive :$li.data('data').tar_nive
						    			},
					    				callback:function(rptaTmp){
											$li.children('ul').eq(0).remove();
											$li.find('i').eq(0).attr('name','icoCarpeta'+$li.data('data').tar_kytar);
											$li.find('i').eq(0).removeClass().addClass('fa fa-lg fa-folder-open-o');
											tare.cargarTarea($li);
					    				}
						    		});

					    			break;
						    	case $parEleTarea.idMenCtx+"_edit":
						    		tare.winPop({
						    			tipo: 'TARE',
						    			ky  : $li.data('data').tar_kytar,
					    				modo: 'MODIFICAR',
					    				size: 'short',
					    				tar: {
					    					tar_kytar :$li.data('data').tar_kytar,
					    					tar_dscr :$li.data('data').tar_dscr,
					    					tar_temp :$li.data('data').tar_temp
					    				},					    				
					    				callback:function(rptaPol){
					    					var dataTare = $li.data('data');
					    					$.extend(dataTare, rptaPol);
											$li.data('data', dataTare);
					    					$li.find('span').eq(0).html(dataTare.tar_dscr);
					    					$li.find('i').eq(1).removeClass().addClass('fa fa-lg '+((dataTare.tar_tipo=='MENU') ? ((dataTare.tar_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) : 'fa-file-text-o' ));		
					    				}
						    		});
					    			break;
						    	case $parEleTarea.idMenCtx+"_dele":
//					    			var lisSel= Sisem.getItemSelected(w).items;
									var lisSel= Array({tar_kytar: $li.data('data').tar_kytar});
					    			var lisKySel = [];
					    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].tar_kytar});}
					    			if(lisKySel.length==0){lisKySel.push({ky: $li.data('data').tar_kytar});}
					    			Sisem.msgAsk('Desea eliminar', $li.data('data').tar_dscr, function(rpta){
						    			if(rpta=='Si'){
											var data = {comando: 'ELIMINAR', lisKy: lisKySel};
											Sisem.ejecutar('cmn/CtrlTarea',data, function(rpta){
												$li.remove();
											});//Sisem.ejecutar('CtrlOperacion',data, function(rpta){
						    			}//if(Sisem.msgAsk('Desea eliminar', $li.data('data').nomb)){
					    			});
					    			break;
						    	}//switch($id){
						    }//menuSelected: function (invokedOn, selectedMenu) {
						});//$ulTarea.find('[name=spnTarea'+data.tar_kytar+']').contextMenu({

	
					}//if(typeof rpta.items[keya].tar_kytar != 'undefined')
				}//for(var i=0; i < rpta.items.length; i++)

				$parEleTarea.append($ulTarea);

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
			
		});//Sisem.ejecutar('brw_tare',{tar_kypdr: $parEleTarea.data('data').tar_kytar}, function(rpta){

	}//cargarTarea: function(w)
};