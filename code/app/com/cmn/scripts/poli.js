var poli = {
	pag:{
		alias		: 'Politica',
		nameWB		: 'brwPolitica',
		nameWP		: 'winPolitica',
		nameWS		: 'selPolitica',
		nameWI		: 'intPolitica',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwPolitica',
		idGridWP	: 'idWinPolitica',
		idGridWS	: 'idSelPolitica',
		idGridWI	: 'idIntPolitica'
	},
	tipPag: {
		"POLI":{'name': 'Politica', 'alias': 'Politica Sistema'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['ent/cmnPol']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		poli.winBrow(w);
	},
	winBrow : function(w){
		poli.import(function(){
			if(w==null)w=new Object;
			poli.setPagina(w);
			poli[w.pag.nameWB]= w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					poli.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//poli.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		poli.import(function(rpta){
			if(w==null)w=new Object;
			poli.setPagina(w);
			poli[w.pag.nameWP] = w;
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
							poli.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							poli.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					w.$e.find('[name=btnLoadFoto]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=pol_nomb]').val()))
						{
							w.$e.find('[name=inp_foto]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar nombre politica');
							w.$e.find("input[name=pol_nomb]").focus();
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
//						var fileNameNew='foto'+w.$e.find('[name=pol_nomb]').val()+'_'+(new Date()).getTime()+'.'+fileExtension;
						var fileNameNew='foto'+w.$e.find('[name=pol_nomb]').val()+'.'+fileExtension;
						w.$e.find('[name=pol_imin]').val(fileNameNew);
//						var ancho = w.$e.find('[name=pan_foto]').outerWidth();
//						var alto = w.$e.find('[name=pan_foto]').outerHeight();
						var ancho = 158;
						var alto = 158;
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'cmn/CtrlPolitica/uploadFile?modulo=imagen&ancho='+ancho+'&alto='+alto, function(rpta){
							w.$e.find('[name=img_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
						});
					});
					w.$e.find('[name=pol_temp]').val((typeof w.app!='undefined')?w.app.pol_temp:'');
					poli.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//poli.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		poli.import(function(){
			if(w==null)w=new Object;
			poli.setPagina(w);
			poli[w.pag.nameWS] = w;
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
						poli.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));	
					}
					else if(w.tipoBrowse == 'EXPLORADOR')
					{
						w.$e.find('[name="pol_nomb"]').html(w.pol.pol_nomb);
						w.$e.find('[name="pol_dscr"]').html(w.pol.pol_dscr);

						w.$e.find('[name=chkClasePolitica]').on('change', function(){
							if($(this).prop('checked'))
							{
								w.$e.find('[name=spnTituloClasePolitica]').html('Visualizar nombre de politica');
								w.$e.find('[name^=spnPolitica]').css('display', 'none');
								w.$e.find('[name^=spnClase]').css('display', 'inline');
							}
							else
							{
								w.$e.find('[name=spnTituloClasePolitica]').html('Visualizar nombre de clase');
								w.$e.find('[name^=spnPolitica]').css('display', 'inline');
								w.$e.find('[name^=spnClase]').css('display', 'none');
							}
						});
						var $divPolitica = w.$e.find('[name="divPolitica"]');
						$divPolitica.data('data', {pol_kypol: w.pol.pol_kypol, pol_nive: 0});
						poli.cargarPolitica($divPolitica);
					}
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//poli.import(function(){
	},
	winInt:function(w){
		poli.import(function(){
			if(w==null)w=new Object;
			poli.setPagina(w);
			poli[w.pag.nameWI] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWI+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&enlace='+w.enlace,
				beforeLoad:function(){
				},
				afterLoad:function(data){
					//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					poli.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//poli.import(function(){
	},	
	//////////////////////////////
	//Metodos de Interface      //
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['cmn/brw_poli']}, function(rpta){
			if(rpta){brw_poli.ejecutar($.extend(w,{modulo:'controllers', archivo: 'cmn/brw_poli'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){poli.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){poli.llenarFormulario(w);}
		poli.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'pol',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=pol_kypol]').val('');
		
		w.$e.find('[name=pdr_temp]').val((typeof w.pdr!='undefined')?w.pdr.pol_temp:'');
		w.$e.find('[name=pdr_nomb]').val((typeof w.pdr!='undefined')?w.pdr.pol_nomb:'');
		w.$e.find('[name=pdr_dscr]').val((typeof w.pdr!='undefined')?w.pdr.pol_dscr:'');

		w.$e.find('[name=pol_kypdr]').val((typeof w.pol!='undefined')?w.pol.pol_kypol:'');
		w.$e.find('[name=pol_nive]').val((typeof w.pol!='undefined')?parseInt(w.pol.pol_nive)+1:0);
		w.$e.find('[name=pol_tipo]').val('DATO');
		w.$e.find('[name=pol_codi]').val(moment().format('DDMMYYHHmm'));
		w.$e.find('[name=pol_nomb]').val('');
		w.$e.find('[name=pol_dscr]').val('');
		w.$e.find('[name=pol_clas]').val('');
		w.$e.find('[name=pol_link]').val('');
		w.$e.find('[name=pol_trig]').val('open');
		
		w.$e.find('[name=pol_esta]').val('0001');
		w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		var data = {};
		
		cmnPol.pol_kypol = ((w.modo=='AGREGAR')?'0':w.$e.find('[name=pol_kypol]').val());
		cmnPol.pol_kypdr = w.$e.find('[name=pol_kypdr]').val().toUpperCase();
		cmnPol.pol_nomb = w.$e.find('[name=pol_nomb]').val().toUpperCase();
		cmnPol.pol_dscr = w.$e.find('[name=pol_dscr]').val().toUpperCase();
		cmnPol.pol_tipo = w.$e.find('[name=pol_tipo]').val().toUpperCase();
		cmnPol.pol_trig = w.$e.find('[name=pol_trig]').val().toUpperCase();
		cmnPol.pol_clas = w.$e.find('[name=pol_clas]').val().toUpperCase();
		cmnPol.pol_nive = w.$e.find('[name=pol_nive]').val().toUpperCase();
		cmnPol.pol_imin = w.$e.find('[name=pol_imin]').val().toUpperCase();
		cmnPol.pol_esta = w.$e.find('[name=pol_esta]').val().toUpperCase();
		cmnPol.pol_link = w.$e.find('[name=pol_link]').val().toUpperCase();

		$.extend(data,{
			pol: cmnPol,
			comando: w.modo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=pol_kypol]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=pol_kypol]').val())){
			Sisem.ejecutar('cmn/GetListaPolitica',{pol_kypol: w.$e.find('[name=pol_kypol]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];

					w.$e.find('[name=pdr_temp]').val(fila.pdr_temp);
					w.$e.find('[name=pdr_nomb]').val(fila.pdr_nomb);
					w.$e.find('[name=pdr_dscr]').val(fila.pdr_dscr);

					w.$e.find('[name=pol_kypol]').val(fila.pol_kypol);
					w.$e.find('[name=pol_kypol]').val(fila.pol_kypol);
					w.$e.find('[name=pol_kypdr]').val(fila.pol_kypdr);
					w.$e.find('[name=pol_nive]').val(fila.pol_nive);
					w.$e.find('[name=pol_tipo]').val(fila.pol_tipo);
					w.$e.find('[name=pol_codi]').val(fila.pol_codi);
					w.$e.find('[name=pol_nomb]').val(fila.pol_nomb);
					w.$e.find('[name=pol_dscr]').val(fila.pol_dscr);
					w.$e.find('[name=pol_clas]').val(fila.pol_clas);
					w.$e.find('[name=pol_link]').val(fila.pol_link);
					w.$e.find('[name=pol_trig]').val(fila.pol_trig);
					w.$e.find('[name=pol_esta]').val(fila.pol_esta);
					if(typeof fila.pol_imin != undefined)
					{
						Sisem.getFile('cmn/'+fila.pol_imin, 'imagen', function(rptaImg){
						  if(rptaImg.msg.type=='success'){w.$e.find('[name=img_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						  else{w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
						});
						w.$e.find('[name=pol_imin]').val(fila.pol_imin);
					}//if(typeof fila.pol_imin != undefined)
					poli.winInt({
						cntInt: 'gridPoliticasHijas',
						tipo: 'POLI',
						size: 'short',
						pol: {pol_kypdr: fila.pol_kypol, pol_kypol: fila.pol_kypol, pol_nive: parseInt(fila.pol_nive)+1},
						callback:function(data){
						}
					});
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('cmn/GetListaPolitica',{pol_kypol: w.$e.find('[name=pol_kypol]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=pol_kypol]').val())){
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
				
				poli.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				poli.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				poli.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
//		w.$e.find('[name=pol_kypol]').attr('disabled',true);

		Sisem.activar(w.$e.find('[name=pdr_temp]'), false);
		Sisem.activar(w.$e.find('[name=pdr_nomb]'), false);
		Sisem.activar(w.$e.find('[name=pdr_dscr]'), false);

		Sisem.activar(w.$e.find('[name=pol_kypdr]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_codi]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_tipo]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_clas]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_link]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_esta]'), w.activar);
    Sisem.activar(w.$e.find('[name=pol_trig]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=pol_imin]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFimg]'), w.activar, 'AZUL');		
		w.$e.find('[name=inp_foto]').css('display','none');
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'pol','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='POLI'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: poli.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+poli.tipPag[w.tipo]['name'],
			nameWP		: 'win'+poli.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+poli.tipPag[w.tipo]['name'],
			nameWI		: 'int'+poli.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+poli.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+poli.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+poli.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+poli.tipPag[w.tipo]['name']
		});
		poli.tipPagAct = w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		poli.winPop({
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
			poli.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(poli.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = poli.obtenerDatoFormulario(w);
				Sisem.ejecutar('cmn/CtrlPolitica',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=pol_kypol]').val(rpta.pol_kypol);
						$.extend(w,{modo: 'VISUALIZAR'});
						poli.cerrarFormulario($.extend(w,{data : poli.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(poli.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			poli.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			poli.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	politicaAutocomplete: function (w){
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_nomb = ((typeof w.prf_nomb=="undefined")?'POLI':w.prf_nomb);
		var arr_inpu = ((typeof w.prf_inpu=="undefined")?'pol_nomb'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = arr_inpu[0];
		var prf_camp = arr_inpu[1];

		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name="+prf_tabl+"_kypol]").val('0');
				w.$e.find("[name="+prf_tabl+"_tipo]").val('');
				w.$e.find("[name="+prf_tabl+"_nomb]").val('');
				w.$e.find("[name="+prf_tabl+"_dscr]").val('');
				w.$e.find("[name="+prf_tabl+"_link]").val('');
				$(this).autocomplete('enable');
			}//if(Sisem.isEmpty(valor)){
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'cmn/GetListaPoliticaAuto?campo=pol_'+prf_camp+'&mostrarSeleccion='+prf_sele,		
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},
			select: function(eve, rpta){
				var obj = rpta.item.value;
				w.$e.find("[name="+prf_tabl+"_kypol]").val(obj.pol_kypol);
				w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.pol_tipo);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.pol_nomb);
				w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.pol_dscr);
				w.$e.find("[name="+prf_tabl+"_link]").val(obj.pol_link);
				
				if(obj.usu_nomb=='Seleccione')
				{
					usua.winSel({
						tipo: prf_nomb,
						modo: 'SELECCIONAR',
						prf: {prf_nomb: prf_nomb},
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_tabl+"_kyusu]").val(objSel.pol_kypol);
								w.$e.find("[name="+prf_tabl+"_tipo]").val(objSel.pol_tipo);
								w.$e.find("[name="+prf_tabl+"_nomb]").val(objSel.pol_nomb);
								w.$e.find("[name="+prf_tabl+"_dscr]").val(objSel.pol_dscr);
								w.$e.find("[name="+prf_tabl+"_link]").val(objSel.pol_link);
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
								
				w.$e.find("[name="+prf_tabl+"_kypol]").val(obj.pol_kypol);
				w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.pol_tipo);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.pol_nomb);
				w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.pol_dscr);
				w.$e.find("[name="+prf_tabl+"_link]").val(obj.pol_link);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	},	
	cargarPolitica: function($parElePolitica)
	{
		Sisem.ejecutar('cmn/brw_poli',{pol_kypdr: $parElePolitica.data('data').pol_kypol, pol_nive: parseInt($parElePolitica.data('data').pol_nive)+1}, function(rpta){

			if(rpta.items.length > 0)
			{
				var $ulPolitica = $('<ul></ul>');

				for(var idx=0; idx < rpta.items.length; idx++)
				{
					var data = rpta.items[idx];
					if(typeof data.pol_kypol != 'undefined')
					{
						if(data.pol_nopc > 0)
						{
							$ulPolitica.append('<li class="parent_li"><i class="fa fa-lg fa-folder-o" name="icoCarpeta'+data.pol_kypol+'"></i>&nbsp;<span name="spnPolitica'+data.pol_kypol+'">'+data.pol_dscr+'</span><span style="display: none;" name="spnClase'+data.pol_kypol+'">'+data.pol_clas+'</span>&nbsp;<i class="fa fa-lg '+((data.pol_tipo=='MENU') ? ((data.pol_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) : 'fa-file-text-o' )+'"></i></li>');
                            $ulPolitica.find('[name=icoCarpeta'+data.pol_kypol+']').on('click',function(event)
                            {
                                console.log('CLICK EN SPAN CARPETA PARA CARGAR DATA');

                                $(this).removeClass().addClass('fa fa-lg fa-folder-open-o');
                                var $varElePolitica = $(this).parent('li.parent_li');
                                if ( $varElePolitica.find(' > ul > li').length == 0 ) 
                                {
                                    console.log('CARGAMOS DATA EN ITEM DE LA BD')
                                    poli.cargarPolitica($varElePolitica);
    //                                $(this).off();
                                }
                            });
						}
						else
						{
							$ulPolitica.append('<li><i class="fa fa-lg fa-book"></i>&nbsp;<span name="spnPolitica'+data.pol_kypol+'">'+data.pol_dscr+'</span><span style="display: none;" name="spnClase'+data.pol_kypol+'">'+data.pol_clas+'</span>&nbsp;<i class="fa fa-lg '+((data.pol_tipo=='MENU') ? ((data.pol_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) : 'fa-file-text-o' )+'"></i></li>');
						}
						
                        $ulPolitica.find('[name=spnPolitica'+data.pol_kypol+']').closest('li').data('data',data);
//                      $ulPolitica.find('[name=spnPolitica'+data.pol_kypol+']').on('click',function(event)
//                      {
//                        	var dataTmp = $(this).closest('li').data('data');
//                          console.log('CLICK EN SPAN POLITICA PARA CARGAR HTML');
//							poli.winInt({
//								cntInt: 'divContenido',
//								tipo: 'POLI',
//								size: 'short',
//								enlace: dataTmp.pol_link,
//								callback:function(data){
//									//console.log('abriendo oper.interior ' + data);
//								}
//							});
//                      });						
						$parElePolitica.idMenCtx='cm_GlobalGrid';
						$ulPolitica.find('[name=spnPolitica'+data.pol_kypol+']').contextMenu({
							buttonHelper: true,
						    menuSelector: "#"+$parElePolitica.idMenCtx,
						    onShow:function($el, invokedOn){
						    	console.log('MOSTRAMOS MENU CONTEXTUAL');
						    	if($parElePolitica.modo!='NAVEGAR'){$el.css('z-index','1100');}
						    	var $li = invokedOn.closest('li');

						    	$el.find('[id^='+$parElePolitica.idMenCtx+']').hide();
						    	
								$el.find('#'+$parElePolitica.idMenCtx+'_ingr').show();
								$el.find('#'+$parElePolitica.idMenCtx+'_edit').show();
								$el.find('#'+$parElePolitica.idMenCtx+'_dele').show();
						    },
						    menuSelected: function (invokedOn, selectedMenu) {
						    	var $id = selectedMenu.attr('id');
						    	var $li = invokedOn.closest('li');
						    	switch($id){
						    	case $parElePolitica.idMenCtx+"_ingr":
						    		poli.winPop({
						    			tipo: 'POLI',
					    				modo: 'AGREGAR',
					    				size: 'short',
						    			pdr:{
						    				pol_kypol :$li.data('data').pdr_kypol,
							    			pol_nomb :$li.data('data').pdr_nomb,
							    			pol_dscr :$li.data('data').pdr_dscr
						    			},
						    			pol:{
							    			pol_kypol:$li.data('data').pol_kypol,
							    			pol_kypol:$li.data('data').pol_kypol,
							    			pol_nomb :$li.data('data').pol_nomb,
							    			pol_nive :$li.data('data').pol_nive
						    			},
					    				callback:function(rptaTmp){
											$li.children('ul').eq(0).remove();
											$li.find('i').eq(0).attr('name','icoCarpeta'+$li.data('data').pol_kypol);
											$li.find('i').eq(0).removeClass().addClass('fa fa-lg fa-folder-open-o');
											poli.cargarPolitica($li);
					    				}
						    		});

					    			break;
						    	case $parElePolitica.idMenCtx+"_edit":
						    		poli.winPop({
						    			tipo: 'POLI',
						    			ky  : $li.data('data').pol_kypol,
					    				modo: 'MODIFICAR',
					    				size: 'short',
					    				pol: {
					    					pol_kypol :$li.data('data').pol_kypol,
					    					pol_dscr :$li.data('data').pol_dscr,
					    					pol_temp :$li.data('data').pol_temp
					    				},					    				
					    				callback:function(rptaPol){
					    					var dataPol = $li.data('data');
					    					$.extend(dataPol, rptaPol);
											$li.data('data', dataPol);
					    					$li.find('span').eq(0).html(dataPol.pol_dscr);
					    					$li.find('i').eq(1).removeClass().addClass('fa fa-lg '+((dataPol.pol_tipo=='MENU') ? ((dataPol.pol_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) : 'fa-file-text-o' ));		
					    				}
						    		});
					    			break;
						    	case $parElePolitica.idMenCtx+"_dele":
//					    			var lisSel= Sisem.getItemSelected(w).items;
									var lisSel= Array({pol_kypol: $li.data('data').pol_kypol});
					    			var lisKySel = [];
					    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].pol_kypol});}
					    			if(lisKySel.length==0){lisKySel.push({ky: $li.data('data').pol_kypol});}
					    			Sisem.msgAsk('Desea eliminar', $li.data('data').pol_dscr, function(rpta){
						    			if(rpta=='Si'){
											var data = {comando: 'ELIMINAR', lisKy: lisKySel};
											Sisem.ejecutar('cmn/CtrlPolitica',data, function(rpta){
												$li.remove();
											});//Sisem.ejecutar('CtrlOperacion',data, function(rpta){
						    			}//if(Sisem.msgAsk('Desea eliminar', $li.data('data').nomb)){
					    			});
					    			break;
						    	}//switch($id){
						    }//menuSelected: function (invokedOn, selectedMenu) {
						});//$ulPolitica.find('[name=spnPolitica'+data.pol_kypol+']').contextMenu({

	
					}//if(typeof rpta.items[keya].pol_kypol != 'undefined')
				}//for(var i=0; i < rpta.items.length; i++)

				$parElePolitica.append($ulPolitica);

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
			
		});//Sisem.ejecutar('brw_poli',{pol_kypdr: $parElePolitica.data('data').pol_kypol}, function(rpta){

	}//cargarPolitica: function(w)
};