var listaTest = null;
var grup = {
	wb:null,
	wp:null,
	ws:null,
	wi:null,
	we:null,
	pag:{
		alias		: 'Grupo',
		nameWB		: 'brwGrupo',
		nameWP		: 'winGrupo',
		nameWS		: 'selGrupo',
		nameWI		: 'intGrupo',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwGrupo',
		idGridWP	: 'idWinGrupo',
		idGridWS	: 'idSelGrupo',
		idGridWI	: 'idIntGrupo'
	},
	listaMenu:{},
	listaPermiso:{},
	tipPag: {
		"GRUPO":{'name': 'grupo', 'alias': 'Control de Grupos'}
	},
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import([], function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		grup.winBrow(w);
	},
	winBrow : function(w){
		grup.import(function(){
			if(w==null)w=new Object;
			grup.setPagina(w);
			grup.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					if(USERDATA.com.com_nomb=='SASMI'){grup.iniciarBrowse($.extend(w,{idGrid:grup.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: true}));}
					else{grup.iniciarBrowse($.extend(w,{idGrid:grup.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));}
				}
			});
		});//grup.import(function(){
	},
	winPop:function(w){
		grup.import(function(){
			if(w==null)w=new Object;
			grup.wp=w;
			grup.pag.modo=((w.modo)?w.modo:'AGREGAR');
			Sisem.Window({
				id:grup.pag.nameWP,
				title:grup.pag.modo+' '+grup.pag.alias,
				width:550,
				height:450,
				url:base_url+'cmn/grup/edit?tipo='+w.tipo,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						click : function() {
							grup.btnAgregarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						click : function() {
							grup.btnModificarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiBuscar'>Imprimir</span>",
						"class" : "btn btn-primary",
						"name" : "btnImprimir",
						click : function() {
							grup.btnImprimirClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						click : function() {
							grup.cerrarFormulario(w);
						}
					}				
				],
				afterLoad:function(){				
					w.$e = $('#'+grup.pag.nameWP);
					Sisem.blockW(w.$e);
					Sisem.formato(w);
					
					grup.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					w.$e.find("input[name=grup_nombre]").focus();
				}
			});//Sisem.WindowBS({
		});//grup.import(function(){
	},
	winSel:function(w){
		grup.import(function(){
			if(w==null)w=new Object;
			grup.setPagina(w);
			grup.ws=w;
			grup.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:grup.pag.nameWS,
				title:'Seleccionar '+grup.pag.alias,
				width:1200,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; Seleccionar",
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								grup.cerrarFormulario(w);
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
									grup.cerrarFormulario($.extend(w, {data: data}));
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
							grup.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+grup.pag.nameWS);
					Sisem.blockW(w.$e);
					grup.iniciarBrowse($.extend(w,{idGrid:grup.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});//grup.import(function(){
	},
	iniciarBrowse: function(w){
		var archivo='';
		if(w.tipo=='CLI' || w.tipo=='COM'){archivo='brw_'+w.tipo.toLowerCase();}
		else{archivo='brw_gru';}
		Sisem.iniciarBrowse($.extend(w, {archivo: archivo}));
	},
	iniciarFormulario:function(w){
		tipEst = {
			'0000':'',
			'0001':'checked'
		};
		grup.limpiarFormulario(w);
		grup.llenarFormulario(w);
		grup.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=gru_kygrupo]').val('');
		w.$e.find('[name=gru_nombre]').val('');
		w.$e.find('[name=gru_sucu]').empty();
	},
	obtenerDatoFormulario: function(w){
		var data = {
			id_grupo: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=gru_kygrupo]').val()),
			nombre: w.$e.find('[name=gru_nombre]').val(),
			sucu:w.$e.find('[name=gru_sucu]').val()
		};
		if(data.sucu && data.sucu.length==0){
			Sisem.msgBox('error','Debe sucursales asignadas para el grupo');
			return w.$e.find('[name=gru_sucu]').focus();
		}else if(data.sucu){
			data.sucu = data.sucu.join();
		}
		if(data.nomb==''){
			Sisem.msgBox('error','Debe ingresar un nombre para el grupo');
			return w.$e.find('[name=nombre]').focus();
		}
//		}
		return data;
	},	
	llenarFormulario:function(w){
//		grup.sucursalAutocomplete($.extend(w, {usu_tipo:'CLI'}));
		if(w.id>0){w.$e.find('[name=gru_kygrupo]').val(w.id);}
		if(!Sisem.isEmpty(w.$e.find('[name=gru_kygrupo]').val())){
			$.get(base_url+'cmn/grup/get',{id: w.$e.find('[name=gru_kygrupo]').val()},function(rptaGru){
				if(rptaGru!=null){
					
					w.$e.find('[name=gru_nombre]').val(rptaGru.nombre);
					$.get(base_url+'cmn/grup/getListaMenu',{pol_kypol: USERDATA.app.pol_kypol, id_grupo: w.$e.find('[name=gru_kygrupo]').val()},function(rpta){
						if(rpta!=null){
							//var listaMenu = eval("("+rpta.seg.permisos+")");
							var listaMenu = rpta;
							listaTest = rpta;
							grup.listaMenu=rpta;
							//grup.listaPermiso=rpta.lisPer;
							var _divMenu='';
							var menNiv='ABIERTO';
							var menNiv_1='ABIERTO';
							var menNiv_2='ABIERTO';
							var menNiv_3='ABIERTO';
							_divMenu+='<div class="tree smart-form">';
								
								_divMenu+='<ul>';
								
								for (var keyMenu in listaMenu) 
								{
									
									if(listaMenu[keyMenu].listaMenu.length==0)
									{
										_divMenu+='<li>';
										_divMenu+='<span><label class="checkbox inline-block"><input type="checkbox" name="checkbox-inline" id="'+listaMenu[keyMenu].id_poli+'" '+tipEst[listaMenu[keyMenu].esta]+'><i></i>'+listaMenu[keyMenu].nomb+'</label></span>';
										_divMenu+='</li>';
									}
									else
									{
										_divMenu+='<li>';
										_divMenu+='<span><i class="fa fa-lg fa-minus-circle"></i> '+listaMenu[keyMenu].nomb+'</span>';
										_divMenu+='<ul>';
										
										for (var keyMenu_1 in listaMenu[keyMenu].listaMenu) 
									    {
											if(listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu.length==0 
											||  listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu.hasOwnProperty(''))
											{
												_divMenu+='<li>';
												_divMenu+='<span> <label class="checkbox inline-block"><input type="checkbox" name="checkbox-inline" id="'+listaMenu[keyMenu].listaMenu[keyMenu_1].id_poli+'" '+tipEst[listaMenu[keyMenu].listaMenu[keyMenu_1].esta]+'><i></i>'+listaMenu[keyMenu].listaMenu[keyMenu_1].nomb+'</label></span>';
												_divMenu+='</li>';
											}
											else
											{
												_divMenu+='<li>';
												_divMenu+='<span><i class="fa fa-lg fa-minus-circle"></i>'+listaMenu[keyMenu].listaMenu[keyMenu_1].nomb+'</span>';
												_divMenu+='<ul>';
												
										        for (var keyMenu_2 in listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu) 
										        {
													if(listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu.length==0)
													{
														_divMenu+='<li>';
														_divMenu+='<span> <label class="checkbox inline-block"><input type="checkbox" name="checkbox-inline" id="'+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].id_poli+'" '+tipEst[listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].esta]+'><i></i>'+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].nomb+'</label></span>';
														_divMenu+='</li>';
													}
													else
													{
														_divMenu+='<li>';
														_divMenu+='<span><i class="fa fa-lg fa-minus-circle"></i> '+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].nomb+'</span>';
														_divMenu+='<ul>';
														
														for (var keyMenu_3 in listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu)
														{
															if(listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].listaMenu.length==0)
															{
																_divMenu+='<li>';
																	_divMenu+='<span> <label class="checkbox inline-block"><input type="checkbox" name="checkbox-inline" id="'+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].id_poli+'" '+tipEst[listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].esta]+'><i></i>'+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].nomb+'</label></span>';
																_divMenu+='</li>';
															}
															else
															{
																_divMenu+='<li>';
																_divMenu+='<span><i class="fa fa-lg fa-minus-circle"></i> '+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].nomb+'</span>';
																_divMenu+='<ul>';
																
																for (var keyMenu_4 in listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].listaMenu)
																{
																	_divMenu+='<li>';
																		_divMenu+='<span> <label class="checkbox inline-block"><input type="checkbox" name="checkbox-inline" id="'+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].listaMenu[keyMenu_4].id_poli+'" '+tipEst[listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].listaMenu[keyMenu_4].esta]+'><i></i>'+listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].listaMenu[keyMenu_4].nomb+'</label></span>';
																	_divMenu+='</li>';
																}
																
																_divMenu+='</ul>';
																_divMenu+='</li>';	
															}
															
														}
														
														_divMenu+='</ul>';
														_divMenu+='</li>';	
													}
										        }//for (var keyMenu_2 in listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu)
										        
										        _divMenu+='</ul>';
										        _divMenu+='</li>';
												
											}//else if(listaMenu[keyMenu].listaMenu[keyMenu_1].nomb!='Regresar')
												
									    }//for (var keyMenu_1 in listaMenu[keyMenu].listaMenu)
										
										_divMenu+='</ul>';
										_divMenu+='</li>';
										
									}//else if(listaMenu[keyMenu].nomb!='Regresar')
									
								}//for (var keyMenu in listaMenu) {
								
								_divMenu+='</ul>';

							_divMenu+='</div>';
							
							$('[name=divMenu]').append(_divMenu);
							
							$(document).ready(function() {
								
								pageSetUp();
								
								// PAGE RELATED SCRIPTS
							
								$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
								$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > span').attr('title', 'Collapse this branch').on('click', function(e) {
									var children = $(this).parent('li.parent_li').find(' > ul > li');
									if (children.is(':visible')) {
										children.hide('fast');
										$(this).attr('title', 'Expand this branch').find(' > i').removeClass().addClass('fa fa-lg fa-plus-circle');
									} else {
										children.show('fast');
										$(this).attr('title', 'Collapse this branch').find(' > i').removeClass().addClass('fa fa-lg fa-minus-circle');
									}
									e.stopPropagation();
								});
							})
							$('[name^=checkbox-inline]').on('click', function(event){
						        var id_poli = $(this).attr('id');
						        var esta = (($(this).prop('checked'))?'0001':'0000');
						        //var listaMenu=grup.listaMenu;
						        //var lisMenSav=Array();
//								for ( var keyMenu in listaMenu) {
//									if (listaMenu[keyMenu].name == nameMenu) {
//										lisMenSav.push(listaMenu[keyMenu].name);
//										listaMenu[keyMenu].permiso = permiso;
//										break;
//									}
//									for ( var keyMenu_1 in listaMenu[keyMenu].listaMenu) {
//										if (listaMenu[keyMenu].listaMenu[keyMenu_1].name == nameMenu) {
//											lisMenSav.push(listaMenu[keyMenu].name);
//											lisMenSav.push(listaMenu[keyMenu].listaMenu[keyMenu_1].name);
//											listaMenu[keyMenu].listaMenu[keyMenu_1].permiso = permiso;
//											break;
//										}
//										for ( var keyMenu_2 in listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu) {
//											if (listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].name == nameMenu) {
//												lisMenSav.push(listaMenu[keyMenu].name);
//												lisMenSav.push(listaMenu[keyMenu].listaMenu[keyMenu_1].name);
//												lisMenSav.push(listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].name);
//												listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].permiso = permiso;
//												break;
//											}
//											for ( var keyMenu_3 in listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu) {
//												if (listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].name == nameMenu) {
//													lisMenSav.push(listaMenu[keyMenu].name);
//													lisMenSav.push(listaMenu[keyMenu].listaMenu[keyMenu_1].name);
//													lisMenSav.push(listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].name);
//													lisMenSav.push(listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].name);
//													listaMenu[keyMenu].listaMenu[keyMenu_1].listaMenu[keyMenu_2].listaMenu[keyMenu_3].permiso = permiso;
//													break;
//												}
//											}
//										}
//									}
//								}//for (var keyMenu in listaMenu) {
						        $.get(base_url+'cmn/grup/updatePolitica',{id_grupo: w.$e.find('[name=gru_kygrupo]').val(), id_poli: id_poli, esta: esta},function(rpta){
						        	Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						        },'json');
//						        console.log(listaMenu);
						        grup.listaMenu = listaMenu;
							});
						}//if(rpta!=null){
						$.get(base_url+'erp/sucu/all_sucursal',{segu:'disabled'},function(rptaSuc){
							if(rptaSuc!=null){
								if(rptaSuc.length>0){
									for(var i=0;i<rptaSuc.length;i++){
										w.$e.find('[name=gru_sucu]').append('<option value="'+rptaSuc[i].id_sucu+'">'+rptaSuc[i].nomb+'</option>');
									}
									if(rptaGru.sucu!=''){
										//console.log('entro');
//										console.log(rptaGru.sucu.split(','));
										w.$e.find('[name=gru_sucu]').val(rptaGru.sucu.split(','));
									}
									if(typeof(callback)==='function'){callback()};
								}else{
									if(typeof(callback)==='function')callback();
								}
							}else{
								if(typeof(callback)==='function')callback();
							}
						},'json');
					},'json');							
				}//if(rpta!=null){
			},'json');//$.get(base_url+'cmn/grup/get',{id: w.$e.find('[name=gru_kygrupo]').val()},function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=gru_kygrupo]').val())){
		else{w.$e.find('[name=gru_sucu]').closest('.row').hide(); if(typeof(callback)==='function')callback();}
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){grup.wp.$e.parent().find('.modal-title').html(w.modo+' '+grup.pag.alias);}
		else{grup.wp.$e.parent().find('.ui-dialog-title').html(w.modo+' '+grup.pag.alias);}
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
				
				grup.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				grup.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				grup.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=gru_nombre]'), w.activar);
		Sisem.activar(w.$e.find('[name=gru_sucu]'), w.activar);
	},
	validarFormulario:function(w){
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},		
	setPagina: function(w){
		$.extend(grup.pag, {
			alias		: grup.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+grup.tipPag[w.tipo]['name'],
			nameWP		: 'win'+grup.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+grup.tipPag[w.tipo]['name'],
			nameWI		: 'int'+grup.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+grup.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+grup.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+grup.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+grup.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			grup.limpiarFormulario(w);
			grup.refrescarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(grup.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=grup.obtenerDatoFormulario(w);
				$.get(base_url+'cmn/grup/save',data,function(rpta){
					Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					Sisem.unblockW(w.$e);
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=usu_kyusu]').val(rpta.id_enti);
						$.extend(w,{modo: 'VISUALIZAR'});
						grup.iniciarFormulario(w);
					}
				},'json');
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			grup.refrescarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			grup.iniciarFormulario(w);
		}
	},
	btnImprimirClick: function(w){
		rsta.winPop({
			modo: 'AGREGAR',
			tipo: 'REPVENCOB'
		});
	}
	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
};