var come = {
	pag:{
		alias		: 'Comentario',
		nameWB		: 'brwComentario',
		nameWP		: 'winComentario',
		nameWS		: 'selComentario',
		nameWI		: 'intComentario',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwComentario',
		idGridWP	: 'idWinComentario',
		idGridWS	: 'idSelComentario',
		idGridWI	: 'idIntComentario'
	},
	tipPag: {
		"COME":{'name': 'Comentario', 'alias': 'Comentario General'}
	},
	tipPagAct: '',
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
		come.winBrow(w);
	},
	winBrow: function(w){
		come.import(function(){
			if(w==null)w=new Object;
			come.setPagina(w);
			come[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
        url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),				
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					come.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}
			});
		});
	},
	winPop:function(w){
		come.import(function(){
			if(w==null)w=new Object;
			come.setPagina(w);
		    come[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:450,
				height:400,
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
							come.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							come.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){				
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					come.iniciarFormulario(w);
					
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});//Sisem.WindowBS({
		});//come.import(function(){
	},
	winSel:function(w){
		come.import(function(){
			if(w==null)w=new Object;
			come.setPagina(w);
			come[w.pag.nameWS] = w;
			come.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
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
								come.cerrarFormulario(w);
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
									come.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							come.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+come.pag.nameWS);
					Sisem.blockW(w.$e);
					come.iniciarBrowse($.extend(w,{idGrid:come.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});//come.import(function(){
	},
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['brw_cme']}, function(rpta){
			if(rpta){brw_cme.ejecutar($.extend(w,{modulo:'controllers', archivo: 'brw_cme', cme: {cme_kypdr:0, paging: {page:0, pagerows:5}}}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){come.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){come.llenarFormulario(w);}
		come.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'cme',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=usu_kycome]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			cme_kycme: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=cme_kycme]').val()),
			cme_kypdr: 0,
			cme_freg: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			cme_nive: 1,
			cme_esta: '0001',
			cme_vers: 1
		});		
		return data;
	},	
	llenarFormulario:function(w){
		if(w.id>0){w.$e.find('[name=usu_kycome]').val(w.id);}
		if(!Sisem.isEmpty(w.$e.find('[name=usu_kycome]').val())){
			$.get(base_url+'erp/come/get',{id: w.$e.find('[name=usu_kycome]').val()},function(rpta){
				w.ent=rpta.ent;
				w.tra=rpta.tra;
				w.$e.find('[name=usu_kycome]').val(w.ent.id_come);
				w.$e.find('[name=usu_vers]').val(w.ent.vers);
				w.$e.find('[name=usu_tipo]').find('[value='+w.ent.tipo+']').attr('selected','selected');
				w.$e.find('[name=usu_tipo]').change();

				Sisem.unblockW(w.$e);
			},'json');
		}
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
				
				come.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				come.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				come.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=cme_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnLoadFirm]'), w.activar, 'AZUL');
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'cme','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},		
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='COME';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: come.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+come.tipPag[w.tipo]['name'],
			nameWP		: 'win'+come.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+come.tipPag[w.tipo]['name'],
			nameWI		: 'int'+come.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+come.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+come.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+come.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+come.tipPag[w.tipo]['name']
		});
		come.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		come.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			callback:function(){
				come.winBrow(w);
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			come.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(come.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = come.obtenerDatoFormulario(w);
				Sisem.ejecutar('CtrlComentario',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=cme_kycme]').val(rpta.cme_kycme);
						$.extend(w,{modo: 'VISUALIZAR'});
						come.cerrarFormulario($.extend(w,{data : come.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(come.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			come.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			come.iniciarFormulario(w);
		}
	}
};