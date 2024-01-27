var hist = {
	pag:{
		alias		: 'Historia',
		nameWB		: 'brwHistoria',
		nameWP		: 'winHistoria',
		nameWS		: 'selHistoria',
		nameWI		: 'intHistoria',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwHistoria',
		idGridWP	: 'idWinHistoria',
		idGridWS	: 'idSelHistoria',
		idGridWI	: 'idIntHistoria'
	},
	tipPag: {
		"HISTORIA":{'name': 'Historia', 'alias': 'Historia'}
	},
	tipPagAct: '',
	opeRango: 1,
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['adm/prop','cmn/usua']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init: function(w){
		if(w==null)w=new Object();
		hist.winBrow(w);
	},
	winBrow: function(w){
		hist.import(function(){
			if(w==null)w=new Object;
			hist.setPagina(w);
			hist[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					hist.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}
			});
		});
	},
	winPop:function(w){
		hist.import(function(rpta){
			if(w==null)w=new Object;
			hist.setPagina(w);
			hist[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='web') ? 600 : 900),
				height:((w.size && w.size=='web') ? 350 : 550),
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
							hist.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							hist.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);


					/** **********************************************************************
					 * Area para descargar y subir archivos de imagen de comprobante de pago *
					 *************************************************************************/
					$('[name=btnHisImagDown]').on('click',function(){
						Sisem.getFile('adm/'+w.$e.find('[name=txt_usu_foto]').val().toLowerCase(), 'imagen', function(rpta){
							if(w.$e.find('[name=txt_usu_foto]').val()!=''){window.open(rpta.listaArchivo[0]);}
						});
					});
					$('[name=btnLoadUsuFoto]').on('click',function (){
						$('[name=inp_usu_foto]').trigger('click');
					});	
					$('[name=inp_usu_foto]').change(function(event){
						var texto = w.$e.find('[name=inp_usu_foto]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = w.$e.find('[name=inp_usu_foto]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
						var fileSize = file.size;
						var fileType = file.type;
						var fileName = (w.$e.find('[name=usu_ndoc]').val()+'.'+fileExtension).replace(" ","_").toLowerCase();
						w.$e.find('[name=txt_usu_foto]').val(fileName);

						var ancho = w.$e.find('[name=pan_usu_foto]').outerWidth();
						var alto = w.$e.find('[name=pan_usu_foto]').outerHeight();
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+USERDATA.app.pol_temp+'/CtrlHistoria/uploadFile?modulo=imagen&ancho='+ancho+'&alto='+alto, function(rpta){
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_usu_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});						
					});

					var ahora = moment(new Date()).format('YYYY-MM-DD');
					w.$e.find('[name=his_fini]').val(ahora).datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});								

					hist.iniciarFormulario(w);

					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});//Sisem.WindowBS({
		});
	},
	winSel:function(w){
		hist.import(function(){
			if(w==null)w=new Object;
			hist.setPagina(w);
			hist[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:800,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
						if(w.modo=='VISUALIZAR'){
							hist.cerrarFormulario(w);
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
										hist.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							hist.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					hist.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showToolBar: true}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});
	},
	winInt:function(w){
		hist.import(function(){
			if(w==null)w=new Object;
			hist.setPagina(w);
			hist[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					hist.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['sld/brw_hist']}, function(rpta){
			if(rpta){brw_hist.ejecutar($.extend(w,{modulo:'controllers', archivo: 'sld/brw_hist'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){hist.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){hist.llenarFormulario(w);}
		hist.refrescarFormulario(w);
		hist.validarFormulario(w, w.modo);
	},
	limpiarFormulario:function(w){
		w.$e.find('[name=his_kyhis]').val(0);
		w.$e.find('[name=his_kyusu]').val('');
		w.$e.find('[name=his_nomb]').val('');
		w.$e.find('[name=his_fini]').val(moment(new Date()).format('YYYY-MM-DD'));
		w.$e.find('[name=his_dscr]').val('');
		w.$e.find('[name=img_usu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			his_kyhis: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=his_kyhis]').val())
		});
		return data;
	},
	llenarFormulario:function(w){
		Sisem.blockW(w.$e);
		if(w.ky>0){w.$e.find('[name=his_kyhis]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=his_kyhis]').val())){
			Sisem.ejecutar('adm/GetListaHistoria',{ope_kyope: w.$e.find('[name=his_kyhis]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					
					w.$e.find('[name=his_kyhis]').val(fila.his_kyhis);
					w.$e.find('[name=his_kyusu]').val(fila.his_kyusu);
					w.$e.find('[name=his_nomb]').val(fila.his_nomb);
					w.$e.find('[name=his_fini]').val(moment(fila.his_fini).format('YYYY-MM-DD'));
					w.$e.find('[name=his_dscr]').val(fila.his_dscr);

					var ancho = w.$e.find('[name=pan_usu_foto]').outerWidth();
					var alto = w.$e.find('[name=pan_usu_foto]').outerHeight();
				
					Sisem.getFile('adm/'+fila.ope_fimg, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success')
						{
							w.$e.find('[name=img_usu_foto]').attr('src',rptaImg.listaArchivo[0]+'?'+(new Date()).getTime()).fadeIn();
						}
						else{w.$e.find('[name=img_usu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
						w.$e.find('[name=img_usu_foto]').css('width',ancho+'px');
					});

					/** ******************************************************
					 ** PONIENDO TITULO EN EL ENCABEZADO DE LA OPERACION
					 ** ******************************************************/
//					var titleNumDoc = ' '+w.$e.find('[name=ope_tdoc]').val()+' '+w.$e.find('[name=ope_seri]').val()+'-'+w.$e.find('[name=ope_nume]').val();
//					if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.pag.modo+' '+w.pag.alias+titleNumDoc);}
//					else{w.$e.parent().find('.ui-dialog-title').html(w.pag.modo+' '+w.pag.alias+titleNumDoc);}				
					
				}//if(rpta.lista.items.length > 0)					
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('adm/GetListaHistoria',{ope_kyope: w.$e.find('[name=ope_kyope]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=ope_kyope]').val())){
		else{Sisem.unblockW(w.$e);}
	},
	refrescarFormulario: function(w){
//		if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.modo+' '+w.pag.alias);}
//		else{w.$e.parent().find('.ui-dialog-title').html(w.modo+' '+w.pag.alias);}
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(w.ky){
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'NARANJA');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false, 'NARANJA');
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				hist.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				hist.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				hist.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=his_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=his_fini]'), w.activar);
		Sisem.activar(w.$e.find('[name=his_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnLoadUsuFoto]'), w.activar, 'AZUL');
	},
	validarFormulario: function(w, modo){
		if(!Sisem.validarControlesColor(w.$e,'his', modo))
		{
			return false;
		}
		return true;
	},	
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='OPERA'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: hist.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+hist.tipPag[w.tipo]['name'],
			nameWP		: 'win'+hist.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+hist.tipPag[w.tipo]['name'],
			nameWI		: 'int'+hist.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+hist.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+hist.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+hist.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+hist.tipPag[w.tipo]['name']
		});
		hist.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		hist.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			apc: ((w.apc)?w.apc:USERDATA.apc),
			caj: ((w.apc)?w.suc:USERDATA.suc),
			tra: ((w.apc)?w.tra:USERDATA.tra),			
			tipo:w.tipo,
			ctrl:w.ctrl,
			size:'web',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			hist.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(hist.validarFormulario(w,'VALIDAR')){
				Sisem.blockW(w.$e);
				var data = hist.obtenerDatoFormulario(w);
				Sisem.ejecutar('adm/CtrlHistoria',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=his_kyhis]').val(rpta.his_kyhis);
						$.extend(w,{modo: 'VISUALIZAR'});
						hist.cerrarFormulario($.extend(w,{data : hist.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			hist.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			hist.iniciarFormulario(w);
		}
	},
	btnEliminarClick: function(w){
		var lisKySel = [];
		if(lisKySel.length==0){lisKySel.push({ky: w.$e.find('[name=his_kyhis]').val()});}
		var resp = Sisem.msgAsk('Desea eliminar', w.$e.find('[name=his_pobs]').val(), function(rpta){
			if(rpta=='Si'){
				var data = {comando: 'ELIMINAR', lisKy: lisKySel};
				Sisem.ejecutar('adm/CtrlHistoria',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						hist.cerrarFormulario($.extend(w,{data : hist.obtenerDatoFormulario(w)}));						
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('adm/CtrlHistoria',data, function(rpta){
			}//if(rpta=='Si'){
		});
	},
  	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
	historiaAutocomplete: function (w){

		var prf_solo = ((typeof w.prf_solo=="undefined")?0:w.prf_solo);
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_nomb = ((typeof w.prf_nomb=="undefined")?'GENERAL':w.prf_nomb);
		var arr_inpu = ((typeof w.prf_inpu=="undefined")?'usu_nomb'.split('_'):w.prf_inpu.split('_'));
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
					w.$e.find("[name="+prf_tabl+"_kyusu]").val('0');	
					w.$e.find("[name="+prf_tabl+"_codi]").val('');
					w.$e.find("[name="+prf_tabl+"_tipo]").val('');
					w.$e.find("[name="+prf_tabl+"_tdoc]").val('');
					w.$e.find("[name="+prf_tabl+"_ndoc]").val('');
					w.$e.find("[name="+prf_tabl+"_nomb]").val('');
				}
				$(this).autocomplete('enable');
			}//if(Sisem.isEmpty(valor)){
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'cmn/GetListaUsuarioAuto?prf_nomb='+prf_nomb+'&prf_tabl='+prf_tabl+'&prf_camp='+prf_camp+'&campo=usu_'+prf_camp+'&mostrarSeleccion='+prf_sele,		
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
						console.log(idxEle);
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
					w.$e.find("[name="+prf_tabl+"_kyusu]").val(obj[prf_tabl+'_kyusu']);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj[prf_tabl+'_codi']);
					w.$e.find("[name="+prf_tabl+"_tdoc]").val(obj[prf_tabl+'_tdoc']);
					w.$e.find("[name="+prf_tabl+"_ndoc]").val(obj[prf_tabl+'_ndoc']);
					w.$e.find("[name="+prf_tabl+"_nomb]").val(obj[prf_tabl+'_nomb']+' '+obj[prf_tabl+'_apel']).trim();
				}
								
				alert('abrir seleccion usuario');
				console.log(obj);
				if(obj[prf_tabl+'_nomb']=='Seleccione')
				{
					usua.winSel({
						tipo: prf_nomb,
						modo: 'SELECCIONAR',
						prf: {prf_nomb: prf_nomb},
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
									w.$e.find("[name="+prf_tabl+"_kyusu]").val(objSel.usu_kyusu);
									w.$e.find("[name="+prf_tabl+"_codi]").val(objSel.usu_codi);
									w.$e.find("[name="+prf_tabl+"_tdoc]").val(objSel.usu_tdoc);
									w.$e.find("[name="+prf_tabl+"_ndoc]").val(objSel.usu_ndoc);
									w.$e.find("[name="+prf_tabl+"_nomb]").val((objSel.usu_nomb).trim());
								}								
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
					w.$e.find("[name="+prf_tabl+"_kyusu]").val(obj.usu_kyusu);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj.usu_codi);
					w.$e.find("[name="+prf_tabl+"_tdoc]").val(obj.usu_tdoc);
					w.$e.find("[name="+prf_tabl+"_ndoc]").val(obj.usu_ndoc);
					w.$e.find("[name="+prf_tabl+"_nomb]").val((obj.usu_nomb).trim());
				}				
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	}
};
