var comm = {
	wb:null,
	wp:null,
	ws:null,
	wi:null,
	we:null,
	pag:{
		alias		: 'Comunidad',
		nameWB		: 'brwComunidad',
		nameWP		: 'winComunidad',
		nameWS		: 'selComunidad',
		nameWI		: 'intComunidad',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwComunidad',
		idGridWP	: 'idWinComunidad',
		idGridWS	: 'idSelComunidad',
		idGridWI	: 'idIntComunidad'
	},
	tipPag: {
		"COMM":{'name': 'Comunidad', 'alias': 'Comunidad'}
	},
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:[]}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		comm.winBrow(w);
	},
	winBrow: function(w){
		comm.import(function(){
			if(w==null)w=new Object;
			comm.setPagina(w);
			comm.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					comm.iniciarBrowse($.extend(w,{idGrid:comm.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//comm.import(function(){
	},
	winPop: function(w){
		comm.import(function(){
			if(w==null)w=new Object;
			comm.setPagina(w);
			comm.wp=w;
			comm.pag.modo=((w.modo)?w.modo:'AGREGAR');
			Sisem.Window({
				id:comm.pag.nameWP,
				title:comm.pag.modo+' '+comm.pag.alias,
				width:700,
				height:450,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+comm.pag.nameWP,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						click : function() {
							comm.btnAgregarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						click : function() {
							comm.btnModificarClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						click : function() {
							comm.cerrarFormulario(w);
						}
					}				
				],
				afterLoad:function(){				
					w.$e = $('#'+comm.pag.nameWP);
					Sisem.blockW(w.$e);
					Sisem.formato(w);

					var wizard = w.$e.find('.wizard').wizard();
					wizard.on('finished', function (e, data) {
						comm.btnAgregarClick(w);
					});
					
					w.$e.find('button.btn-next').on('click',function(){
					    var keyword = w.$e.find('[name=com_nomb]').val().replace(/[^A-Za-z0-9 ]/g,'');
					    keyword = keyword.replace(/\s{2,}/g,' ');
					    keyword = keyword.replace(/\s/g, "_");
						w.$e.find('[name=com_lkpr]').val(keyword.toLowerCase());
						w.$e.find('[name=com_dscr]').val(w.$e.find('[name=com_nomb]').val());
						w.$e.find('[name=com_lkpr]').data('_success',false);
						comm.validarServidor(w, function(rpta){
							if(rpta){}//if(rpta)
						});//comm.validarServidor(w, function(rpta){
					});
					comm.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					w.$e.find("input[name=com_nomb]").focus();
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//comm.import(function(){
	},
	winSel:function(w){
		comm.import(function(){
			if(w==null)w=new Object;
			comm.setPagina(w);
			comm.ws=w;
			comm.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:comm.pag.nameWS,
				title:'Seleccionar '+comm.pag.alias,
				width:1200,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; Seleccionar",
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								comm.cerrarFormulario(w);
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
									comm.cerrarFormulario($.extend(w, {data: data}));
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
							comm.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+comm.pag.nameWS);
					Sisem.blockW(w.$e);
					comm.iniciarBrowse($.extend(w,{idGrid:comm.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});//comm.import(function(){
	},
	iniciarBrowse: function(w){
		var archivo='cmn/brw_comm';
		Sisem.import({modulo:'browse', listaArchivo: [archivo]}, function(rpta){
			if(rpta){brw_comm.ejecutar($.extend(w,{modulo:'controllers', archivo: archivo}));}
		});
	},
	iniciarFormulario:function(w){
		comm.limpiarFormulario(w);
		comm.llenarFormulario(w);
		comm.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=usu_kyusu]').val('');
		w.$e.find('[name=com_nomb]').val('');
		w.$e.find('[name=com_dscr]').val('');
		w.$e.find('[name=com_lkpr]').val('');
		w.$e.find('[name=com_biog]').val('');
//		w.$e.find('[name=gridItemCon]').children('tbody').children().remove();
	},
	obtenerDatoFormulario: function(w){
		var data = {
			com_kycom: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=com_kycom]').val()),
			com_nomb: w.$e.find('[name=com_nomb]').val(),
			com_lkpr: w.$e.find('[name=com_lkpr]').val(),
			com_dscr: w.$e.find('[name=com_dscr]').val(),
			com_biog: w.$e.find('[name=com_biog]').val(),
			com_esta: '0001'
		};
		return data;
	},	
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=com_kycom]').val(w.ky);}
		Sisem.ejecutar('cmn/GetListaComunidad',{com_kycom:w.$e.find('[name=com_kycom]').val()}, function(rpta){
			if(rpta.lista.items.length > 0){
				var com = rpta.lista.items[0]; 
				w.$e.find('[name=com_kycom]').val(com.com_kycom);
				w.$e.find('[name=com_nomb]').val(com.com_nomb);
				w.$e.find('[name=com_dscr]').val(com.com_dscr);									
				Sisem.unblockW(w.$e);
			}
		});
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){comm.wp.$e.parent().find('.modal-title').html(w.modo+' '+comm.pag.alias);}
		else{comm.wp.$e.parent().find('.ui-dialog-title').html(w.modo+' '+comm.pag.alias);}
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(w.ky){
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'AZUL');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				comm.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), false, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				comm.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), false, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				comm.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=com_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=com_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=com_lkpr]'), w.activar);
		Sisem.activar(w.$e.find('[name=com_biog]'), w.activar);
		
		w.$e.find('[name=com_nomb]').closest('div.form-group').addClass('has-success');
		w.$e.find('[name=com_dscr]').closest('div.form-group').addClass('has-success');
		w.$e.find('[name=com_lkpr]').closest('div.form-group').addClass('has-success');
		w.$e.find('[name=com_biog]').closest('div.form-group').addClass('has-success');
		
		w.$e.find('[name=com_nomb]').next('span.input-group-addon').empty().append('<i class="fa fa-user"></i>');
		w.$e.find('[name=com_dscr]').next('span.input-group-addon').empty().append('<i class="fa fa-user"></i>');
		w.$e.find('[name=com_lkpr]').next('span.input-group-addon').empty().append('<i class="fa fa-user"></i>');
		w.$e.find('[name=com_biog]').next('span.input-group-addon').empty().append('<i class="fa fa-user"></i>');
		
		Sisem.activar(w.$e.parent().find('.btn-prev'), w.activar, 'AZUL');
		Sisem.activar(w.$e.parent().find('.btn-next'), w.activar, 'VERDE');
	},
	validarServidor: function(w, callback){
		var data=comm.obtenerDatoFormulario(w);
		if(comm.validarFormulario(w))
		{
			Sisem.ejecutar('cmn/GetListaComunidad',data, function(rpta){
				if(rpta.lista.items.length == 0){
					w.$e.find('[name=com_lkpr]').data('_success',true);
					w.$e.find('[name=com_lkpr]').closest('div.form-group').addClass('has-success');
					w.$e.find('[name=com_dscr]').closest('div.form-group').addClass('has-success');
					w.$e.find('[name=com_biog]').closest('div.form-group').addClass('has-success');
					return callback(true);
				}else{
					w.$e.find('[name=com_lkpr]').data('_success',false);
					w.$e.find('[name=com_lkpr]').closest('.form-group').addClass('has-error');
					return callback(false);
				}
			});//Sisem.ejecutar('cmn/GetListaComunidad',{}, function(rpta){
		}//if(comm.validarFormulario(w))
		else{return callback(false);}
	},	
	validarFormulario:function(w){
		//if(Sisem.validarControles(w.$e,'com')){return true;}

		w.$e.find('[name=com_nomb]').closest('div.form-group').removeClass('has-success has-error');
		w.$e.find('[name=com_lkpr]').closest('div.form-group').removeClass('has-success has-error');
		w.$e.find('[name=com_dscr]').closest('div.form-group').removeClass('has-success has-error');
		w.$e.find('[name=com_biog]').closest('div.form-group').removeClass('has-success has-error');
		
		if(w.$e.find('[name=com_nomb]').val()==''){
			w.$e.find('[name=com_nomb]').closest('div.form-group').addClass('has-error');
			w.$e.find('[name=com_nomb]').next('span.input-group-addon').empty().append('<i class="fa fa-times"></i>');
			Sisem.msgBox('error','Debe poner nombre a la comunidad');
		    w.$e.find('.wizard').wizard('selectedItem', {
				step: 1
			});
		    w.$e.find('[name=com_nomb]').focus();
		    return false;
		}
		if(w.$e.find('[name=com_lkpr]').val()==''){
			w.$e.find('[name=com_lkpr]').closest('div.form-group').addClass('has-error');
			w.$e.find('[name=com_lkpr]').next('span.input-group-addon').empty().append('<i class="fa fa-times"></i>');
			Sisem.msgBox('error','Debe poner un enlace para su perfil');
		    w.$e.find('.wizard').wizard('selectedItem', {
				step: 2
			});
		    w.$e.find('[name=com_lkpr]').focus()
			return false;
		}
		if(w.$e.find('[name=com_dscr]').val()==''){
			w.$e.find('[name=com_dscr]').closest('div.form-group').addClass('has-error');
			w.$e.find('[name=com_dscr]').next('span.input-group-addon').empty().append('<i class="fa fa-times"></i>');
			Sisem.msgBox('error','Debe poner un alias para su perfil');
		    w.$e.find('.wizard').wizard('selectedItem', {
				step: 2
			});
		    w.$e.find('[name=com_dscr]').focus();
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
		$.extend(comm.pag, {
			alias		: comm.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+comm.tipPag[w.tipo]['name'],
			nameWP		: 'win'+comm.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+comm.tipPag[w.tipo]['name'],
			nameWI		: 'int'+comm.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+comm.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+comm.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+comm.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+comm.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			comm.limpiarFormulario(w);
			comm.refrescarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(comm.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=comm.obtenerDatoFormulario(w);
				Sisem.ejecutar('cmn/GuardarComunidad',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						comm.cerrarFormulario(w);
					}//if(rpta.msg.type=='success')
				});//Sisem.ejecutar('cmn/GuardarComunidad',{}, function(rpta){
			}//if(comm.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			comm.refrescarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			comm.iniciarFormulario(w);
		}
	},
	btnImprimirClick: function(w){
		rsta.winPop({
			modo: 'AGREGAR',
			tipo: 'REPVENCOB'
		});
	},		
	btnGuardarClick: function(w){
		if(comm.validarFormulario(w)){
			Sisem.blockW(w.$e);
			var data=comm.obtenerDatoFormulario(w);
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
		comm.winPop({
			tipo:w.tipo,
			modo:'AGREGAR',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},		
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	btnSelEntClick: function(w){
		comm.winSel({
			showToolBar: true,
			tipo: ((w.tipo=='COM')?'CLI':'EMP'),
			callback: function(data){
				if(data!=null)
				{
					w.$e.find('[name=pad_kyusu]').val(data.id_enti);
					w.$e.find("[name=pad_tipo]").val(comm.tipPag[data.tipo]['name']);
					w.$e.find('[name=pad_nomb]').val(data.nomb);
				}
			}
		});
	},
	controladorAutocomplete: function (w){
		w.$e.find("[name=usu_nomb]").on('blur', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name=usu_kyusu]").val('0');	
				w.$e.find("[name=usu_codi]").val('');
				w.$e.find("[name=usu_tipo]").val('');
				w.$e.find("[name=usu_tdoc]").val('');
				w.$e.find("[name=usu_ndoc]").val('');
				w.$e.find("[name=usu_nomb]").val('');
			}
		});				
		w.$e.find("[name=usu_nomb]").autocomplete({
			source: base_url+"erp/enti/listaAutoEntidad?tipo="+w.usu_tipo,
			minLength: 2,
			select: function(eve, rpta){
				var ent = rpta.item.value;
				w.$e.find("[name=usu_kyusu]").val(ent.id_enti);
				w.$e.find("[name=usu_codi]").val(ent.codi);
				w.$e.find("[name=usu_tipo]").val(usua.tipPag[ent.tipo].name);
				w.$e.find("[name=usu_tdoc]").val(ent.tdoc);
				w.$e.find("[name=usu_ndoc]").val(ent.ndoc);
				w.$e.find("[name=usu_nomb]").val((ent.nomb+' '+ent.ape1+' '+ent.ape2).trim());
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var ent = rpta.item.value;
				w.$e.find("[name=usu_kyusu]").val(ent.id_enti);
				w.$e.find("[name=usu_codi]").val(ent.codi);
				w.$e.find("[name=usu_tipo]").val(usua.tipPag[ent.tipo].name);
				w.$e.find("[name=usu_tdoc]").val(ent.tdoc);
				w.$e.find("[name=usu_ndoc]").val(ent.ndoc);
				w.$e.find("[name=usu_nomb]").val((ent.nomb+' '+ent.ape1+' '+ent.ape2).trim());
				eve.preventDefault();
		    }
		});
		w.$e.find("[name=usu_nomb]").autocomplete('widget').css('z-index',1100);
	}	
};