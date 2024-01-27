var myapps = {
	wb:null,
	wp:null,
	ws:null,
	wi:null,
	we:null,
	pag:{
		alias		: 'Myapps',
		nameWB		: 'brwMyapps',
		nameWP		: 'winMyapps',
		nameWS		: 'selMyapps',
		nameWI		: 'intMyapps',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwMyapps',
		idGridWP	: 'idWinMyapps',
		idGridWS	: 'idSelMyapps',
		idGridWI	: 'idIntMyapps'
	},
	tipPag: {
		"APPS":{'name': 'Myapps', 'alias': 'Control de Sistema de Myapps'}
	},
	cau_type:{
		ADM:'Administrador',
		COL:'Colaborador',
		OBS:'Observador'
	},	
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/poli','cmn/perf']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		myapps.winBrow(w);
	},
	winBrow : function(w){
		myapps.import(function(){
			if(w==null)w=new Object;
			myapps.setPagina(w);
			myapps.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					myapps.iniciarBrowse($.extend(w,{idGrid:myapps.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));
				}
			});
		});//myapps.import(function(){
	},
	winPop:function(w){
		myapps.import(function(){
			if(w==null)w=new Object;
			myapps.wp=w;
			myapps.pag.modo=((w.modo)?w.modo:'AGREGAR');
			Sisem.Window({
				id:myapps.pag.nameWP,
				title:myapps.pag.modo+' '+myapps.pag.alias,
				width:550,
				height:450,
				url:base_url+'erp/myapps/edit?tipo='+w.tipo,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						click : function() {
							myapps.btnAgregarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						click : function() {
							myapps.btnModificarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiBuscar'>Imprimir</span>",
						"class" : "btn btn-primary",
						"name" : "btnImprimir",
						click : function() {
							myapps.btnImprimirClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						click : function() {
							myapps.cerrarFormulario(w);
						}
					}				
				],
				afterLoad:function(){				
					w.$e = $('#'+myapps.pag.nameWP);
					Sisem.blockW(w.$e);
					Sisem.formato(w);
					
					w.$e.find('[name=btnAddGru]').click(function(){myapps.btnAddGruClick(w);});
					w.$e.find('[name=btnAddCon]').click(function(){
						myapps.winSel({
							showToolBar: true,
							tipo:'CON',
							modo:'SELECCIONAR',
							multiSelect: true,
							callback:function(data){
								if(data)
								{
									if(myapps.validarFormulario($.extend(w,{id_enti: data.id_enti, evento: 'validarItemUnico'}))){
										data.id_padr=w.$e.find('[name=usu_kyusu]').val();
										$.post(base_url+'erp/enti/update',data,function(rpta){
											Sisem.msgBox(rpta.msg.type, rpta.msg.text);
											if(rpta.msg.type=='success'){
												myapps.iniciarFormulario(w);
											}
										},'json');
									}
								}
							}
						});					
					});
					if(w.tipo==='TRA'){
						w.$e.find('[name=tra_fing], [name=tra_fces], [name=tra_fnac]').datepicker({dateFormat:'yy-mm-dd'});
						w.$e.find('[name=btnAddcli]').click(function(){
							myapps.winSel({
								showToolBar: true,
								tipo:'CLI',
								modo:'SELECCIONAR',
								cli_nomb:w.$e.find('[name=art_nomb]').val(),
								callback:function(data){
									data.id_padr=w.$e.find('[name=usu_kyusu]').val();
									$.post(base_url+'erp/enti/update',data,function(rpta){
										if(rpta.msg.type=='success'){
											myapps.iniciarFormulario(w);
										}else{Sisem.msgBox(rpta.msg.type, rpta.msg.text);}
									},'json');
								}
							});			
						});
						$.get(base_url+'erp/trac/all',function(trac){
							if(trac!=null){
								w.$e.find('[name=tra_cate]').empty();
								for(var i=0;i<trac.length;i++){
									w.$e.find('[name=tra_cate]').append('<option value="'+trac[i].id_trac+'">'+trac[i].nomb+'</option>');
								}
								$.get(base_url+'erp/sisp/all',function(rpta){
									if(rpta!=null){
										for(var i=0;i<rpta.length;i++){
											w.$e.find('[name=tra_sisp]').append('<option value="'+rpta[i].id_sisp+'">'+rpta[i].nomb+'</option>');
										}
										myapps.iniciarFormulario(w);
										Sisem.unblockW(w.$e);
									}else{
										alert("Es necesario tener Sistemas de Pension");
									}
								},'json');
							}else{
								alert("Es necesario tener categorias de trabajadores");
							}
							myapps.iniciarFormulario(w);
							Sisem.unblockW(w.$e);
						},'json');
					}else{
						myapps.iniciarFormulario(w);
						Sisem.unblockW(w.$e);
					}
					$('[name=btnLoadFoto]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=usu_ndoc]').val()))
						{
							$('[name=inp_foto]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar un numero de documento');
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
						var fileNameNew='foto'+w.$e.find('[name=usu_ndoc]').val()+'_'+(new Date()).getTime()+'.'+fileExtension;
						w.$e.find('[name=usu_foto]').val(fileNameNew);
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'erp/docu/uploadFimg', function(rpta){
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_foto]').attr('src',base_url+rpta.pathFile).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});
					});				
					$('[name=btnLoadFirm]').on('click',function (){
						if(!Sisem.isEmpty(w.$e.find('[name=usu_ndoc]').val()))
						{
							$('[name=inp_firm]').trigger('click');	
						}
						else
						{
							Sisem.msgBox('error', 'Debe ingresar un numero de documento');
						}
					});	
					$('[name=inp_firm]').change(function(event){
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
						Sisem.uploadMultipleFiles(w, fileNameNew, archivos, base_url+'erp/docu/uploadFimg', function(rpta){
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_firm]').attr('src',base_url+rpta.pathFile).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});
					});						
				}
			});//Sisem.WindowBS({
		});//myapps.import(function(){
	},
	winSel:function(w){
		myapps.import(function(){
			if(w==null)w=new Object;
			myapps.setPagina(w);
			myapps.ws=w;
			myapps.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:myapps.pag.nameWS,
				title:'Seleccionar '+myapps.pag.alias,
				width:1200,
				height:500,
				url:base_url+'cmn/app/admin_app',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; Seleccionar",
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								myapps.cerrarFormulario(w);
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
									myapps.cerrarFormulario($.extend(w, {data: data}));
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
							myapps.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+myapps.pag.nameWS);
					Sisem.blockW(w.$e);
					myapps.iniciarBrowse($.extend(w,{idGrid:myapps.pag.idGridWS, showMenCtx:true, showToolBar: false, multiSelect: false, autoWidth: false}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});//myapps.import(function(){
	},
	iniciarBrowse: function(w){
		var archivo='';
		if(w.idGrid=='idBrwMyapps')
		{
			archivo='cmn/brw_myapps';
			Sisem.import({modulo:'browse', listaArchivo: [archivo]}, function(rpta){
				if(rpta){brw_myapps.ejecutar($.extend(w,{modulo:'controllers', archivo: archivo}));}
			});			
		}
		else
		{
			archivo='cmn/brw_admin';
			Sisem.import({modulo:'browse', listaArchivo: [archivo]}, function(rpta){
				if(rpta){brw_admin.ejecutar($.extend(w,{modulo:'controllers', archivo: archivo}));}
			});			
		}
	},
	iniciarFormulario:function(w){
		myapps.limpiarFormulario(w);
		myapps.llenarFormulario(w);
		myapps.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=usu_kyusu]').val('');
		w.$e.find('[name=pol_kyusu]').val('');
		w.$e.find('[name=pol_nomb]').val('');
		w.$e.find('[name=pol_dscr]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = {
			id_caus:w.$e.find('[name=cau_kycaus]').val(),
			kycom:w.$e.find('[name=cau_kycom]').val(),
			id_grupo:w.$e.find('[name=gru_kygrupo]').val(),
			id_user:w.$e.find('[name=usu_kyusu]').val(),
			tipo:'ADM'
		};
		return data;
	},
	llenarFormulario:function(w){
		if(w.id>0){w.$e.find('[name=pol_kyusu]').val(w.id);}
		if(!Sisem.isEmpty(w.$e.find('[name=pol_kyusu]').val())){
			$.get(base_url+'erp/apps/one',{id: w.$e.find('[name=pol_kyusu]').val()},function(rpta){
				w.$e.find('[name=pol_kyusu]').val(rpta.app.pol_kyusu);
				w.$e.find('[name=pol_nomb]').val(rpta.app.nomb)

				Sisem.unblockW(w.$e);
			},'json');
		}
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){myapps.wp.$e.parent().find('.modal-title').html(w.modo+' '+myapps.pag.alias);}
		else{myapps.wp.$e.parent().find('.ui-dialog-title').html(w.modo+' '+myapps.pag.alias);}
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(w.id){
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'AZUL');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				myapps.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				myapps.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				myapps.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
//		Sisem.activar(w.$e.find('[name=pol_kypol]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_dscr]'), w.activar);
	},
	validarFormulario:function(w){
		if(Sisem.validarControles(w.$e,'ent')){return true;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},		
	setPagina: function(w){
		$.extend(myapps.pag, {
			alias		: myapps.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+myapps.tipPag[w.tipo]['name'],
			nameWP		: 'win'+myapps.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+myapps.tipPag[w.tipo]['name'],
			nameWI		: 'int'+myapps.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+myapps.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+myapps.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+myapps.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+myapps.tipPag[w.tipo]['name']
		});
	},
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			myapps.limpiarFormulario(w);
			myapps.refrescarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(myapps.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=myapps.obtenerDatoFormulario(w);
				$.post(base_url+'erp/enti/save',data,function(rpta){
					Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					Sisem.unblockW(w.$e);
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=usu_kyusu]').val(rpta.id_enti);
						$.extend(w,{modo: 'VISUALIZAR'});
						myapps.iniciarFormulario(w);
					}
				},'json');
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			myapps.refrescarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			myapps.iniciarFormulario(w);
		}
	},
	btnImprimirClick: function(w){
		rsta.winPop({
			modo: 'AGREGAR',
			tipo: 'REPVENCOB'
		});
	},		
	btnGuardarClick: function(w){
		if(myapps.validarFormulario(w)){
			Sisem.blockW(w.$e);
			var data=myapps.obtenerDatoFormulario(w);
			if(Sisem.isEmpty(data.id_enti)){
				$.post(base_url+'erp/enti/save',data,function(rpta){
					Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					w.$e.find('[name=usu_kyusu]').val(rpta.id_enti);
					Sisem.unblockW(w.$e);
					w.$e.dialog("close");
					if(w.callback!=null){w.callback(rpta);}
				},'json');
			}else{
				$.get(base_url+'erp/enti/update',data,function(rpta){
					Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					w.$e.find('[name=id_enti]').val(rpta.id_enti);
					Sisem.unblockW(w.$e);
					w.$e.dialog("close");
					if(w.callback!=null){w.callback(rpta);}
				},'json');
			}
		}
	},
	btnAddClick: function(w){
		myapps.winPop({
			tipo:w.tipo,
			modo:'AGREGAR',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAddGruClick: function(w){
		cate.winSel({
			tipo: 'GRU',
			modo:'VISUALIZAR',
			callback:function(){
				cate.llenarComboGrupo($.extend(w,{cat_tipo:'GRU'}));
			}
		});
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	btnSelEntClick: function(w){
		myapps.winSel({
			showToolBar: true,
			tipo: ((w.tipo=='COM')?'CLI':'EMP'),
			callback: function(data){
				if(data!=null)
				{
					w.$e.find('[name=pad_kyusu]').val(data.id_enti);
					w.$e.find("[name=pad_tipo]").val(myapps.tipPag[data.tipo]['name']);
					w.$e.find('[name=pad_nomb]').val(data.nomb);
				}
			}
		});
	}
};