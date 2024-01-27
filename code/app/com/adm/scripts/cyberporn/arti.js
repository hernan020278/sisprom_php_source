var arti = {
	pag:{
		alias		: 'Articulo',
		nameWB		: 'brwArticulo',
		nameWP		: 'winArticulo',
		nameWS		: 'selArticulo',
		nameWI		: 'intArticulo',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwArticulo',
		idGridWP	: 'idWinArticulo',
		idGridWS	: 'idSelArticulo',
		idGridWI	: 'idIntArticulo'
	},
	tipPag: {
		"ARTI":{'name': 'Articulo', 'alias': 'Control Articulo'},
		"CATE":{'name': 'Categoria', 'alias': 'Control Servicio'},
		"SEXO":{'name': 'Sexo', 'alias': 'Servicio Sexual'},
		"STRE":{'name': 'Streaper', 'alias': 'Servicio Streaper'},
		"VIDE":{'name': 'Artivideos', 'alias': 'Videos Grabados'},
		"VICH":{'name': 'VideoChat', 'alias': 'Video Chat'},
		"VIVO":{'name': 'VideoVivo', 'alias': 'Video Vivo'},
		"VVER":{'name': 'Vervideo', 'alias': 'Vervideo'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['prop','trab']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init:function(w){
		if(w==null)w=new Object();
		arti.winBrow(w);
	},
	winBrow: function(w){
		arti.import(function(){
			if(w==null)w=new Object;
			arti.setPagina(w);
			arti[w.pag.nameWB]=w;			
			Sisem.Cargar({
				container: '#mainPanel',
                url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),				
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					arti.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: false, showToolBar: true, multiSelect: false, autoWidth: true, refreshButton: false}));					
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//arti.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		arti.import(function(){
			if(w==null)w=new Object;
			arti.setPagina(w);
		        arti[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:650,
				height:350,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP,
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						class : "btn btn-primary",
						name : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							arti.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							arti.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);

					w.$e.find('[name=btnArtFileUp]').on('click',function (){
						w.$e.find('[name=inp_art_foto]').trigger('click');	
					});	
					w.$e.find('[name=inp_art_foto]').change(function(event){
						var texto = w.$e.find('[name=inp_art_foto]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = w.$e.find('[name=inp_art_foto]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
						var fileSize = file.size;
						var fileType = file.type;
						var fileNameNew=w.$e.find('[name=art_codi]').val()+'.'+fileExtension;
						w.$e.find('[name=art_foto]').val(fileNameNew);
						var ancho = w.$e.find('[name=inp_art_foto]').parents().find('[name=pan_foto]').outerWidth();
						var alto = w.$e.find('[name=inp_art_foto]').parents().find('[name=pan_foto]').outerHeight();
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+USERDATA.app.pol_temp+'/CtrlUsuario/uploadFile?ancho='+ancho+'&alto='+alto, function(rpta){
							if(rpta.msg.type=='success')
							{
//								w.$e.find('[name=img_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});
					});				
									
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'CATVID', prf_inpu: 'prp_prop', prf_sele: 1}));
					
					arti.iniciarFormulario(w);
					Sisem.unblockW(w.$e);

					Sisem.validarControlesColor(w.$e,'art',w.modo);
					Sisem.formato(w);
					
//					w.$e.find("input[name=prp_prop]").focus();
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//arti.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		arti.import(function(){
			if(w==null)w=new Object;
			arti.setPagina(w);
			arti[w.pag.nameWS] = w;
			arti.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:400,
				height:600,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								arti.cerrarFormulario(w);
							}else{
								if(arti.validarFormulario($.extend(w, {evento: 'gridRowDblclick'}))){
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
										arti.cerrarFormulario($.extend(w, {data: data}));
									}else{
										Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
									}
								}
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							arti.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					arti.iniciarBrowse($.extend(w,{idGrid:arti.pag.idGridWS, showMenCtx: false, showToolBar: false, multiSelect: false, autoWidth: true, refreshButton: false}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});//arti.import(function(){
	},
	iniciarBrowse: function(w){
		if(w.tipo=='CATE')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['brw_arti']}, function(rpta){
				if(rpta){brw_arti.ejecutar($.extend(w,{modulo:'controllers', archivo: 'brw_arti'}));}
			});			
		}else
		{
			Sisem.import({modulo:'browse', listaArchivo: ['brw_artifoto']}, function(rpta){
				if(rpta){brw_artifoto.ejecutar($.extend(w,{modulo:'controllers', archivo: 'brw_artifoto'}));}
			});			
		}
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){arti.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){arti.llenarFormulario(w);}
		arti.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'art',w.modo);
	},
	limpiarFormulario:function(w){
		w.$e.find('[name=usu_kyusu]').val(((w.ent)?w.ent.usu_kyusu:0));
		w.$e.find('[name=art_codi]').val((new Date()).getTime());
		w.$e.find('[name=art_nomb]').val('');
		w.$e.find('[name=art_dscr]').val('');
		w.$e.find('[name=art_foto]').val('');

		w.$e.find('[name=prp_kyprp]').val('');
		w.$e.find('[name=prp_prop]').val('');		
//		w.$e.find('[name=gridItemCli]').children('tbody').children().remove();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			art_kyart: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=art_kyart]').val()),
			usu_kyusu: USERDATA.usu.usu_kyusu
		});
		return data;
	},	
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=art_kyart]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=art_kyart]').val())){
			Sisem.ejecutar('adm/GetListaArticulo',{art_kyart: w.$e.find('[name=art_kyart]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var art = rpta.lista.items[0];
					
					w.$e.find('[name=art_kyusu]').val(art.art_kyusu);
					w.$e.find('[name=art_codi]').val(art.art_code);
					w.$e.find('[name=art_nomb]').val(art.art_nomb);
					w.$e.find('[name=art_dscr]').val(art.art_dscr);
					w.$e.find('[name=art_foto]').val(art.art_foto);
					
					w.$e.find('[name=prp_kyprp]').val(art.prp_kyprp);
					w.$e.find('[name=prp_prop]').val(art.prp_prop);

					if(w.$e.find('[name=divVervideo]').length>0)
					{
						
						if(art.art_foto.indexOf('<iframe')>-1)
						{
							w.$e.find('[name=divVervideo]').append(art.art_foto);
						}
						else
						{
							Sisem.getFile('max_'+art.art_codi+'.mp4', 'imagen', function(rpta){								
								w.$e.find('[name=divVervideo]').append('<video class="superbox-img" src="'+rpta.listaArchivo[0]+'?'+(new Date()).getTime()+'" autoplay="" controls=""></video>');
							});
						}//else{
					}//if(w.$e.find('[name=divVervideo]').length>0)
				}//if(rpta.listaCategoria.items.length > 0)
			});//Sisem.ejecutar('sex/GetListaCategoria',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.ky)){
	},//llenarFormulario:function(w)
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
				
				arti.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				arti.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				arti.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=usu_kyusu]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_codi]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_foto]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=prp_kyprp]'), w.activar);
		Sisem.activar(w.$e.find('[name=prp_prop]'), w.activar);		
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'art','VALIDAR')){return false;}
		if(w.evento!=null && w.evento=='gridRowDblclick'){
			if(w.$e.find('[name=grid] .highlights').length>0){
				if(w.tope==='0002'){ //Verifico que sea una venta
					if(w.$e.find('[name=grid_pre] .highlights').length==0)
					{
						Sisem.msgBox('error','Seleccione un registro PRECIO!!!');
						return false;
					}
				}
			}else{
				Sisem.msgBox('error','Seleccione un precio!!!');
				return false;
			}						

		}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},		
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='ARTI';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: arti.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+arti.tipPag[w.tipo]['name'],
			nameWP		: 'win'+arti.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+arti.tipPag[w.tipo]['name'],
			nameWI		: 'int'+arti.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+arti.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+arti.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+arti.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+arti.tipPag[w.tipo]['name']
		});
		arti.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		arti.winPop({
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
			arti.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(arti.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=arti.obtenerDatoFormulario(w);
				Sisem.ejecutar('sex/CtrlArticulo',data, function(rpta){
					if(rpta.msg.type=='success'){
						w.$e.find('[name=art_kyart]').val(rpta.art_kyart);
						$.extend(w,{modo: 'VISUALIZAR'});
						arti.cerrarFormulario(w);
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('sex/GuardarCategoria',data, function(rpta){
			}//if(arti.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			arti.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cerrar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			arti.cerrarFormulario($.extend(w,{callback : null}));
		}
	},
	btnPrpDscrClick: function(w){
		w.$e.find('[name=prp_dscr]').val('Seleccione');
		if(w.$e.find('[name=btnPrpDscr]').children('i').hasClass('fa-chevron-down'))
		{
			w.$e.find('[name=btnPrpDscr]').removeClass('btn-info');
			w.$e.find('[name=btnPrpDscr]').addClass('btn-success');
			
			w.$e.find('[name=btnPrpDscr]').children('i').removeClass('fa-chevron-down');
			w.$e.find('[name=btnPrpDscr]').children('i').addClass('fa-chevron-up');
			
			w.$e.find('[name=prp_dscr]').autocomplete("search");
		}
		else if(w.$e.find('[name=btnPrpDscr]').children('i').hasClass('fa-chevron-up'))
		{
			w.$e.find('[name=btnPrpDscr]').removeClass('btn-success');
			w.$e.find('[name=btnPrpDscr]').addClass('btn-info');
			
			w.$e.find('[name=btnPrpDscr]').children('i').removeClass('fa-chevron-up');
			w.$e.find('[name=btnPrpDscr]').children('i').addClass('fa-chevron-down');

			w.$e.find('[name=prp_dscr]').autocomplete('close');
		}
	},	
	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
	articuloAutocomplete: function (w){
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var art_tipo = ((typeof w.prp_secc=="undefined")?'SERV':w.prp_secc);
		var arr_inpu = ((typeof w.prf_inpu=="undefined")?'art_nomb'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = arr_inpu[0];
		var prf_camp = arr_inpu[1];

		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name="+prf_tabl+"_kyart]").val('0');	
				w.$e.find("[name="+prf_tabl+"_codi]").val('');
				w.$e.find("[name="+prf_tabl+"_iden]").val('');
				w.$e.find("[name="+prf_tabl+"_tipo]").val('');
				w.$e.find("[name="+prf_tabl+"_nomb]").val('');
				w.$e.find("[name="+prf_tabl+"_dscr]").val('');
				w.$e.find("[name="+prf_tabl+"_ptag]").val('');
				$(this).autocomplete('enable');
			}
		});				
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'sex/GetListaArticuloAuto?art_tipo='+art_tipo+'&campo=art_'+prf_camp+'&mostrarSeleccion='+prf_sele,
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},
			select: function(eve, rpta){
				var obj = rpta.item.value;
				w.$e.find("[name="+prf_tabl+"_kyart]").val(obj.art_kyart);	
				w.$e.find("[name="+prf_tabl+"_codi]").val(obj.art_codi);
				w.$e.find("[name="+prf_tabl+"_iden]").val(obj.art_iden);
				w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.art_tipo);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.art_nomb);
				w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.art_dscr);
				w.$e.find("[name="+prf_tabl+"_ptag]").val(obj.art_ptag);
				if(obj.art_nomb=='Seleccione')
				{
					arti.winSel({
						tipo: art_tipo,
						modo: 'SELECCIONAR',
						art: {art_tipo: art_tipo},
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_tabl+"_kyart]").val(objSel.art_kyart);	
								w.$e.find("[name="+prf_tabl+"_codi]").val(objSel.art_codi);
								w.$e.find("[name="+prf_tabl+"_iden]").val(objSel.art_iden);
								w.$e.find("[name="+prf_tabl+"_tipo]").val(objSel.art_tipo);
								w.$e.find("[name="+prf_tabl+"_nomb]").val(objSel.art_nomb);
								w.$e.find("[name="+prf_tabl+"_dscr]").val(objSel.art_dscr);
								w.$e.find("[name="+prf_tabl+"_ptag]").val(objSel.art_ptag);
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
				w.$e.find("[name="+prf_tabl+"_kyart]").val(obj.art_kyart);	
				w.$e.find("[name="+prf_tabl+"_codi]").val(obj.art_codi);
				w.$e.find("[name="+prf_tabl+"_iden]").val(obj.art_iden);
				w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.art_tipo);
				w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.art_nomb);
				w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.art_dscr);
				w.$e.find("[name="+prf_tabl+"_ptag]").val(obj.art_ptag);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	}
};