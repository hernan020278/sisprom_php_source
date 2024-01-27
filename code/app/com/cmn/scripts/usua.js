var usua = {
	pag:{
		alias		: 'Usuario',
		nameWB		: 'brwUsuario',
		nameWP		: 'winUsuario',
		nameWS		: 'selUsuario',
		nameWI		: 'intUsuario',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwUsuario',
		idGridWP	: 'idWinUsuario',
		idGridWS	: 'idSelUsuario', 
		idGridWI	: 'idIntUsuario'
	},
	tipPag: {
		"GENERAL":{'name': 'Usuageneral', 'alias': 'General'},
		"ADMINISTRADOR":{'name': 'Usuaadministrador', 'alias': 'Administrador'},
		"USUARIO":{'name': 'Usuario', 'alias': 'Usuario'},
		"CLIENTE":{'name': 'Cliente', 'alias': 'Control de Cliente'},
		"PROVEEDOR":{'name': 'Proveedor', 'alias': 'Control de Proveedor'},
		"TRA":{'name': 'Trabajador', 'alias': 'Control de Trabajador'},
		"DOCTOR":{'name': 'Doctor', 'alias': 'Control de Doctor'},
		"PACIENTE":{'name': 'Paciente', 'alias': 'Control de Paciente'},
		"TTA":{'name': 'Transportista', 'alias': 'Control de Transportista'},
		"BANC":{'name': 'Bancos', 'alias': 'Control de Bancos'},
		"COM":{'name': 'Comensal', 'alias': 'Control de Comensales'},
		"EMP":{'name': 'Empresa', 'alias': 'Control de Empresas'},
		"CON":{'name': 'Contacto', 'alias': 'Control de contactos'},
		"CNS":{'name': 'Consumidor', 'alias': 'Control de Consumidor'},
		"SNEW":{'name': 'NEW', 'alias': 'Item temporal seleccionar'},
    "PROFESOR":{'name': 'Profesor', 'alias': 'Profesor'},
    "ALUMNO":{'name': 'Alumno', 'alias': 'Alumno'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/roles']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init: function(w){
		if(w==null)w=new Object();
		usua.winBrow(w);
	},
	winBrow : function(w){
		usua.import(function(){
			if(w==null)w=new Object;
			usua.setPagina(w);
			usua[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					usua.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));
				}
			});
		});
	},
	winPop:function(w){
		usua.import(function(){
			if(w==null)w=new Object;
			usua.setPagina(w);
			usua[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:500,
				height:320,
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
							usua.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							usua.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					w.$e.find('[name=btnAddCon]').click(function(){
						usua.winSel({
							showToolBar: true,
							tipo:'CON',
							modo:'SELECCIONAR',
							multiSelect: true,
							callback:function(data){
								if(data)
								{
									if(usua.validarFormulario($.extend(w,{usu_kyusu: data.kyent, evento: 'validarItemUnico'}))){
										data.usu_kypdr=w.$e.find('[name=usu_kyusu]').val();
										$.post(base_url+'usua/update',data,function(rpta){
											Sisem.msgBox(rpta.msg.type, rpta.msg.text);
											if(rpta.msg.type=='success'){
												usua.iniciarFormulario(w);
											}
										},'json');
									}
								}
							}
						});					
					});
					w.$e.find('[name=btnLoadClgEntFoto]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=usu_ndoc]').val()))
						{
							w.$e.find('[name=inp_foto]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar un numero de documento');
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
//						var fileNameNew='foto'+w.$e.find('[name=usu_ndoc]').val()+'_'+(new Date()).getTime()+'.'+fileExtension;
						var fileNameNew='foto'+w.$e.find('[name=usu_ndoc]').val()+'.'+fileExtension;
						w.$e.find('[name=usu_foto]').val(fileNameNew);
						var ancho = w.$e.find('[name=pan_foto]').outerWidth();
						var alto = w.$e.find('[name=pan_foto]').outerHeight();
						archivos = [file];
//						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'adm/CtrlUsuario/uploadFimg?ancho='+ancho+'&alto='+alto, function(rpta){
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'adm/CtrlUsuario/uploadFile?modulo=imagen&ancho='+ancho+'&alto='+alto, function(rpta){							
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_usu_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});
					});				
					w.$e.find('[name=btnLoadFirm]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=usu_ndoc]').val()))
						{
							$('[name=inp_firm]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar un numero de documento');
						}
					});	
					w.$e.find('[name=inp_firm]').change(function(event){
						var texto = w.$e.find('[name=inp_firm]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = w.$e.find('[name=inp_firm]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
						var fileSize = file.size;
						var fileType = file.type;
						var fileNameNew='firm'+w.$e.find('[name=usu_ndoc]').val()+'_'+(new Date()).getTime()+'.'+fileExtension;
						w.$e.find('[name=usu_firm]').val(fileNameNew);
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'docu/uploadFimg', function(rpta){
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_firm]').attr('src',base_url+rpta.pathFile).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});
					});
					
					usua.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});//Sisem.WindowBS({
		});
	},
	winSel:function(w){
		usua.import(function(){
			if(w==null)w=new Object;
			usua.setPagina(w);
			usua[w.pag.nameWS] = w;
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
								usua.cerrarFormulario(w);
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
									usua.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							usua.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					usua.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth: true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});
	},
	winInt:function(w){
		usua.import(function(){
			if(w==null)w=new Object;
			usua.setPagina(w);
			usua[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					usua.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['cmn/brw_usua']}, function(rpta){
			if(rpta){brw_usua.ejecutar($.extend(w,{modulo:'controllers', archivo: 'cmn/brw_usua'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){usua.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){usua.llenarFormulario(w);}
		usua.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'usu',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=usu_kyusu]').val('');
		w.$e.find('[name=usu_tipo]').val(w.tipo)
		w.$e.find('[name=usu_esta]').val('');
		w.$e.find('[name=usu_nomb]').val('');
		w.$e.find('[name=usu_codi]').val('');
		w.$e.find('[name=usu_tdoc]:checked').val('');
		w.$e.find('[name=usu_ndoc]').val('');
		w.$e.find('[name=usu_tele]').val('');
		w.$e.find('[name=usu_mobi]').val('');
		w.$e.find('[name=usu_mail]').val('');
		w.$e.find('[name=usu_dire]').val('');
		w.$e.find('[name=usu_mpla]').val(''); // 02-04-2015 Datos para el transportista Marca/Placa
		w.$e.find('[name=usu_cins]').val(''); // 02-04-2015 Datos para el transportista Certificado de Inscripcion
		w.$e.find('[name=usu_lcon]').val(''); // 02-04-2015 Datos para el transportista Lincencia de Conducir
		w.$e.find('[name=usu_vers]').val('');
		w.$e.find('[name=usu_foto]').val('');
		w.$e.find('[name=img_usu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();

		w.$e.find('[name=usu_firm]').val('');
		w.$e.find('[name=img_firm]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
		
		w.$e.find('[name=usu_fing]').val(moment(Sisem.fechor()).format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			usu_kyusu: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=usu_kyusu]').val())
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=usu_kyusu]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=usu_kyusu]').val())){
			Sisem.ejecutar('cmn/GetListaUsuario',{usu_kyusu: w.$e.find('[name=usu_kyusu]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					
					w.$e.find('[name=usu_kyusu]').val(fila.usu_kyusu);
					w.$e.find('[name=usu_kypdr]').val(fila.usu_kypdr);
					w.$e.find('[name=usu_codi]').val(fila.usu_codi);
					w.$e.find('[name=usu_tipo]').val(fila.usu_tipo);
					w.$e.find('[name=usu_esta]').val(fila.usu_esta);
					w.$e.find('[name=usu_nomb]').val(fila.usu_nomb);
					w.$e.find('[name=usu_tdoc]').val(fila.usu_tdoc);
					w.$e.find('[name=usu_ndoc]').val(fila.usu_ndoc);
					w.$e.find('[name=usu_tele]').val(fila.usu_tele);
					w.$e.find('[name=usu_mobi]').val(fila.usu_mobi);
					w.$e.find('[name=usu_mail]').val(fila.usu_mail);
					w.$e.find('[name=usu_dire]').val(fila.usu_dire);
					w.$e.find('[name=usu_vers]').val(fila.usu_vers);

					Sisem.getFile('cmn/'+fila.usu_foto, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success'){w.$e.find('[name=img_usu_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						else{w.$e.find('[name=img_usu_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
					});
					w.$e.find('[name=usu_foto]').val(fila.usu_foto);
					
					if(w.modo=='VISUALIZAR')
					{
						roles.winInt({
							cntInt: 'gridRolesUsuario',
							tipo: 'ROLES',
							size: 'short',
							usu: {usu_kyusu: fila.usu_kyusu},
							callback:function(data){}
						});
					}
					else{
						Sisem.blockW(w.$e.find('[id=gridRolesUsuario]'));	
					}
					Sisem.unblockW(w.$e);
				}//if(rpta.lista.items.length > 0)
			});//Sisem.ejecutar('cmn/GetListaUsuario',{usu_kyusu: w.$e.find('[name=usu_kyusu]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=usu_kyusu]').val())){
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
				
				usua.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				usua.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				usua.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
		
		Sisem.activar(w.$e.find('[name=usu_codi]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_tipo]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_esta]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_fing]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_tdoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_ndoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_tele]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_mobi]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_mail]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_dire]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_mpla]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_cins]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_lcon]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_tipo]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_obse]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=usu_foto]'), false);

		w.$e.find('[name=inp_foto]').css('display','none');
		Sisem.activar(w.$e.find('[name=usu_foto]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadClgEntFoto]'), w.activar);

		w.$e.find('[name=inp_firm]').css('display','none');
		Sisem.activar(w.$e.find('[name=usu_firm]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFirm]'), w.activar, 'AZUL');
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'ent','VALIDAR')){return false;}
		if(!Sisem.validarControlesColor(w.$e,'tra','VALIDAR')){return false;}
		if(w.tipo ==='TRA'){
			if(w.evento!=null && w.evento=='validarItemUnico'){
				if(w.$e.find('[name=gridItemCli] tr').length>0){
					for(var i=0;i<w.$e.find('[name=gridItemCli] tr').length;i++){
						var $row = w.$e.find('[name=gridItemCli] tr').eq(i);
						if(!Sisem.isEmpty(w.art_kyart)){
							if($row.data('data').art_kyarti==w.art_kyart){
								Sisem.msgBox('error','Este articulo ya existe!!!');
								return false;
							}//if($row.data('data').art_kyarti==w.art_kyart){
						}//if(!Sisem.isEmpty(w.art_kyart)){
					}//for(var i=0;i<w.$e.find('[name=gridItemCli] tr').length;i++){
				}//if(w.$e.find('[name=gridItemCli] tr').length>0){
			}//if(w.evento!=null && w.evento=='validarItemUnico'){
		}//if(w.tipo ==='TRA'){
		if(w.tipo ==='EMP'){
			if(w.evento!=null && w.evento=='validarItemUnico'){
				if(w.$e.find('[name=gridItemCon] tr').length>0){
					for(var i=0;i<w.$e.find('[name=gridItemCon] tr').length;i++){
						var $row = w.$e.find('[name=gridItemCon] tr').eq(i);
						if(!Sisem.isEmpty(w.ky)){
							if($row.data('data').usu_kyusu==w.ky){
								Sisem.msgBox('error','Este contacto ya existe!!!');
								return false;
							}
						}
					}
				}
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='CLIPRO'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: usua.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+usua.tipPag[w.tipo]['name'],
			nameWP		: 'win'+usua.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+usua.tipPag[w.tipo]['name'],
			nameWI		: 'int'+usua.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+usua.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+usua.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+usua.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+usua.tipPag[w.tipo]['name']
		});
		usua.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		usua.winPop({
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
			usua.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(usua.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = usua.obtenerDatoFormulario(w);
				Sisem.ejecutar('cmn/CtrlUsuario',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=usu_kyusu]').val(rpta.usu_kyusu);
						$.extend(w,{modo: 'VISUALIZAR'});
						usua.cerrarFormulario($.extend(w,{data : usua.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(usua.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			usua.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			usua.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
	usuarioAutocomplete: function (w){

		var prf_solo = ((typeof w.prf_solo=="undefined")?0:w.prf_solo);
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_inpu = ((typeof w.prf_inpu=="undefined")?'usu_nomb'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = prf_inpu[0];
		var prf_camp = prf_inpu[1];

		var prf_nomb = ((typeof w.prf_nomb=="undefined")?'GENERAL':w.prf_nomb);
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor) && ( charCode == 8 || charCode == 46 )){
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
					w.$e.find("[name="+prf_tabl+"_mail]").val('');
					w.$e.find("[name="+prf_tabl+"_dire]").val('');
				}
				$(this).autocomplete('enable');
			}
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
					w.$e.find("[name="+prf_tabl+"_kyusu]").val(obj['usu_kyusu']);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj['usu_codi']);
					w.$e.find("[name="+prf_tabl+"_tipo]").val(obj['usu_tipo']);
					w.$e.find("[name="+prf_tabl+"_tdoc]").val(obj['usu_tdoc']);
					w.$e.find("[name="+prf_tabl+"_ndoc]").val(obj['usu_ndoc']);
					w.$e.find("[name="+prf_tabl+"_nomb]").val(obj['usu_nomb']);
					w.$e.find("[name="+prf_tabl+"_mail]").val(obj['usu_mail']);
					w.$e.find("[name="+prf_tabl+"_dire]").val(obj['usu_dire']);
				}
								
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
									w.$e.find("[name="+prf_tabl+"_tipo]").val(objSel.usu_tipo);
									w.$e.find("[name="+prf_tabl+"_tdoc]").val(objSel.usu_tdoc);
									w.$e.find("[name="+prf_tabl+"_ndoc]").val(objSel.usu_ndoc);
									w.$e.find("[name="+prf_tabl+"_nomb]").val(objSel.usu_nomb);
									w.$e.find("[name="+prf_tabl+"_mail]").val(objSel.usu_mail);
									w.$e.find("[name="+prf_tabl+"_dire]").val(objSel.usu_dire);
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
					w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.usu_tipo);
					w.$e.find("[name="+prf_tabl+"_tdoc]").val(obj.usu_tdoc);
					w.$e.find("[name="+prf_tabl+"_ndoc]").val(obj.usu_ndoc);
					w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.usu_nomb);
					w.$e.find("[name="+prf_tabl+"_mail]").val(obj.usu_mail);
					w.$e.find("[name="+prf_tabl+"_dire]").val(obj.usu_dire);
				}				
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	}
};
