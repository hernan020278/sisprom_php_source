var albm = {
	pag:{
		alias		: 'Album',
		nameWB		: 'brwAlbum',
		nameWP		: 'winAlbum',
		nameWS		: 'selAlbum',
		nameWI		: 'intAlbum',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwAlbum',
		idGridWP	: 'idWinAlbum',
		idGridWS	: 'idSelAlbum',
		idGridWI	: 'idIntAlbum'
	},
	tipPag: {
		"ALBM":{'name': 'Album', 'alias': 'Album'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['mus/canc']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		albm.winBrow(w);
	},
	winBrow: function(w){
		albm.import(function(){
			if(w==null)w=new Object;
			albm.setPagina(w);
			albm[w.pag.nameWB]=w;			
			Sisem.Cargar({
				container: '#mainPanel',
                url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo(),                
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					albm.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//albm.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		albm.import(function(){
			if(w==null)w=new Object;
			albm.setPagina(w);
		    albm[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:550,
				height:450,
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
							albm.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							albm.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					/***********************************
					 * CONFIGURAR EVENTOS DE CONTROLES
					 ***********************************/
					$('[name=btnLoadFoto]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=alb_nomb]').val()))
						{
							$('[name=inp_foto]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar un nombre de album');
						}
					});	
					$('[name=inp_foto]').change(function(event){
						var texto = w.$e.find('[name=inp_foto]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = w.$e.find('[name=inp_foto]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
						var fileSize = file.size;
						var fileType = file.type;
						//var fileNameNew='foto'+'_'+(new Date()).getTime()+'.'+fileExtension;
						var fileNameNew='foto'+'_'+w.$e.find('[name=alb_nomb]').val().replace(/\s/g, '').toUpperCase()+'.'+fileExtension;
						w.$e.find('[name=alb_foto]').val(fileNameNew);
						var ancho = w.$e.find('[name=pan_foto]').outerWidth();
						var alto = w.$e.find('[name=pan_foto]').outerHeight();
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+USERDATA.app.pol_temp+'/CtrlAlbum/uploadFile?ancho='+ancho+'&alto='+alto, function(rpta){
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});						
					});
					
					Sisem.formato(w);
					albm.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					
					w.$e.find("input[name=alb_tipo]").focus();
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//albm.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		albm.import(function(){
			if(w==null)w=new Object;
			albm.setPagina(w);
			albm[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:1200,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								albm.cerrarFormulario(w);
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
									albm.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							albm.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					albm.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},		
	winInt:function(w){
		canc.import(function(){
			if(w==null)w=new Object;
			canc.setPagina(w);
			enti[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					canc.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//canc.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['mus/brw_albm']}, function(rpta){
			if(rpta){brw_albm.ejecutar($.extend(w,{modulo:'controllers', archivo: 'mus/brw_albm'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){albm.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){albm.llenarFormulario(w);}
		albm.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'alb',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=alb_kyalb]').val('');
		w.$e.find('[name=alb_tipo]').val('');
		w.$e.find('[name=alb_nomb]').val('');
		w.$e.find('[name=alb_dscr]').val('');
		w.$e.find('[name=alb_foto]').val('');
		w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();		
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			alb_kyalb: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=alb_kyalb]').val()),
			tipo:w.tipo
		});
		return data;
	},	
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=alb_kyalb]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=alb_kyalb]').val())){
			Sisem.ejecutar('GetListaAlbum',{alb_kyalb: w.$e.find('[name=alb_kyalb]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var alb = rpta.lista.items[0];					
					w.$e.find('[name=alb_kycom]').val(alb.alb_kycom);
					w.$e.find('[name=alb_kyusu]').val(alb.alb_kyusu);
					w.$e.find('[name=alb_kysuc]').val(alb.alb_kysuc);
					w.$e.find('[name=alb_kyalb]').val(alb.alb_kyalb);
					w.$e.find('[name=alb_tipo]').val(alb.alb_tipo);
					w.$e.find('[name=alb_nomb]').val(alb.alb_nomb);
					w.$e.find('[name=alb_dscr]').val(alb.alb_dscr);
					w.$e.find('[name=alb_foto]').val(alb.alb_foto);

					Sisem.getFile(alb.alb_foto, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success'){w.$e.find('[name=img_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						else{w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
					});
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
				
				albm.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				albm.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				albm.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=alb_tipo]'), w.activar);
		Sisem.activar(w.$e.find('[name=alb_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=alb_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=alb_foto]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFoto]'), w.activar, 'AZUL');
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'alb','VALIDAR')){return false;}
		return true;
	},
	validarServidor: function(w, callback){
		var data=albm.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(albm.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='ALBM';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: albm.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+albm.tipPag[w.tipo]['name'],
			nameWP		: 'win'+albm.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+albm.tipPag[w.tipo]['name'],
			nameWI		: 'int'+albm.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+albm.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+albm.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+albm.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+albm.tipPag[w.tipo]['name']
		});
		albm.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		albm.winPop({
			modo:'AGREGAR',
			apc:USERDATA.apc,
			caj:USERDATA.suc,
			tra:USERDATA.tra,			
			tipo: 'ALBM',
			size: 'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});		
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			albm.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(albm.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = albm.obtenerDatoFormulario(w);
				Sisem.ejecutar('mus/CtrlAlbum',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=alb_kyalb]').val(rpta.alb_kyalb);
						$.extend(w,{modo: 'VISUALIZAR'});
						albm.cerrarFormulario($.extend(w,{data : albm.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(albm.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			albm.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			albm.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	btnSelEntClick: function(w){
		albm.winSel({
			showToolBar: true,
			tipo: ((w.tipo=='COM')?'CLI':'EMP'),
			callback: function(data){
				if(data!=null)
				{
					w.$e.find('[name=pad_kyusu]').val(data.id_enti);
					w.$e.find("[name=pad_tipo]").val(albm.tipPag[data.tipo]['name']);
					w.$e.find('[name=pad_nomb]').val(data.nomb);
				}
			}
		});
	},
	propiedadAutocomplete: function (w){
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