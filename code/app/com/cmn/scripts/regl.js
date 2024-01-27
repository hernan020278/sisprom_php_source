var regl = {	
	pag:{
		alias		: 'Regla',
		nameWB		: 'brwRegla',
		nameWP		: 'winRegla',
		nameWS		: 'selRegla',
		nameWI		: 'intRegla',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwRegla',
		idGridWP	: 'idWinRegla',
		idGridWS	: 'idSelRegla',
		idGridWI	: 'idIntRegla'
	},
	tipPag: {
		"REGLA":{'name': 'Regla', 'alias': 'Regla'},
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/perf','cmn/poli','ent/cmnReg']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init:function(w){
		if(w==null)w=new Object();
		regl.winBrow(w);
	},
	winBrow : function(w){
		regl.import(function(){
			if(w==null)w=new Object;
			regl.setPagina(w);
			regl[w.pag.nameWB]=w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
        url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					regl.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//regl.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		regl.import(function(){
			if(w==null)w=new Object;
			regl.setPagina(w);
		        regl[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 300 : 400),
				height:((w.size && w.size=='short') ? 350 : 350),
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
							regl.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							regl.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);

					poli.politicaAutocomplete($.extend(w, {prf_nomb: 'POLI' , prf_inpu: 'pol_nomb', prf_sele: 1}));
					poli.politicaAutocomplete($.extend(w, {prf_nomb: 'POLI' , prf_inpu: 'pol_dscr', prf_sele: 1}));
					
					regl.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});//Sisem.WindowBS({
		});//regl.import(function(){
	},
	winSel:function(w){
		regl.import(function(){
			if(w==null)w=new Object;
			regl.setPagina(w);
			regl[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:600,
				height:300,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; "+w.pag.modo,
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								regl.cerrarFormulario(w);
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
									regl.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}
							}
						}
					},{
                                                html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							regl.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					regl.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWS, showMenCtx:true, showToolBar: true, multiSelect: false, autoWidth: true, refreshButton: false}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//regl.import(function(){
	},
	//////////////////////////////
	//Metodos de Interface      //
	//////////////////////////////
	iniciarBrowse:function(w){
		var archivo='cmn/brw_regl';
		Sisem.import({modulo:'browse', listaArchivo: [archivo]}, function(rpta){
			if(rpta){brw_regl.ejecutar($.extend(w,{modulo:'controllers', archivo: archivo}));}
		});			
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){regl.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){regl.llenarFormulario(w);}
		regl.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'pol',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=reg_kyreg]').val('');
		w.$e.find('[name=com_kycom]').val(USERDATA.com.com_kycom);
		w.$e.find('[name=com_nomb]').val(USERDATA.com.com_nomb);
		w.$e.find('[name=prf_kyprf]').val((typeof w.prf!='undefined')?w.prf.prf_kyprf:'');
		w.$e.find('[name=prf_nomb]').val((typeof w.prf!='undefined')?w.prf.prf_nomb:'');
		
		w.$e.find('[name=pol_nomb]').val('');
		w.$e.find('[name=pol_dscr]').val('');
		w.$e.find('[name=pol_link]').val('');
	},
	obtenerDatoFormulario: function(w){

		var data = {};
		
		cmnReg.reg_kyreg = ((w.modo=='AGREGAR')?'0':w.$e.find('[name=reg_kyreg]').val());
		cmnReg.reg_kycom = w.$e.find('[name=com_kycom]').val().toUpperCase();
		cmnReg.reg_kyprf = w.$e.find('[name=prf_kyprf]').val().toUpperCase();
		cmnReg.reg_kypol = w.$e.find('[name=pol_kypol]').val().toUpperCase();

		$.extend(data,{
			reg: cmnReg,
			comando: w.modo
		});
		return data;
	},
	llenarFormulario:function(w){
		Sisem.blockW(w.$e);
		w.$e.find('[name=com_nomb]').val(USERDATA.com.com_nomb);
		w.$e.find('[name=prf_kyprf]').val(w.prf.prf_kyprf);
		w.$e.find('[name=prf_nomb]').val(w.prf.prf_nomb);

		if(w.ky>0){w.$e.find('[name=reg_kyreg]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=reg_kyreg]').val())){
			Sisem.ejecutar('cmn/GetListaRegla',{reg_kyreg: w.$e.find('[name=reg_kyreg]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					w.$e.find('[name=reg_kyreg]').val(fila.reg_kyreg);
					w.$e.find('[name=com_kycom]').val(USERDATA.com.com_kycom);
					w.$e.find('[name=com_nomb]').val(USERDATA.com.com_nomb);
					w.$e.find('[name=prf_kyprf]').val(fila.prf_kyprf);
					w.$e.find('[name=prf_nomb]').val(fila.prf_nomb);
					w.$e.find('[name=pol_kypol]').val(fila.pol_kypol);
					w.$e.find('[name=pol_tipo]').val(fila.pol_tipo);
					w.$e.find('[name=pol_nomb]').val(fila.pol_nomb);
					w.$e.find('[name=pol_dscr]').val(fila.pol_dscr);
					w.$e.find('[name=pol_link]').val(fila.pol_link);
				}//if(rpta.listaOperacion.items.length > 0)					
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaOperacion',{ope_kyope: w.$e.find('[name=ope_kyope]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=ope_kyope]').val())){
		else{Sisem.unblockW(w.$e);}
	},//llenarFormulario:function(w){
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
				
				regl.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				regl.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				regl.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=com_nomb]'), false);
		Sisem.activar(w.$e.find('[name=app_nomb]'), false);
		Sisem.activar(w.$e.find('[name=prf_nomb]'), false);
		Sisem.activar(w.$e.find('[name=usu_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_ape1]'), false);
		Sisem.activar(w.$e.find('[name=usu_mail]'), false);
		Sisem.activar(w.$e.find('[name=pol_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_link]'), false);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'usu','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='USER'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: regl.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+regl.tipPag[w.tipo]['name'],
			nameWP		: 'win'+regl.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+regl.tipPag[w.tipo]['name'],
			nameWI		: 'int'+regl.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+regl.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+regl.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+regl.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+regl.tipPag[w.tipo]['name']
		});
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		regl.winPop({
			tipo:w.tipo,
			modo:'AGREGAR',
			prf: w.prf,
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			regl.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(regl.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=regl.obtenerDatoFormulario(w);
				Sisem.ejecutar('cmn/CtrlRegla',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=reg_kyreg]').val(rpta.reg_kyreg);
						$.extend(w,{modo: 'VISUALIZAR'});
						regl.cerrarFormulario($.extend(w,{data : regl.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarRegla',data, function(rpta){
			}//if(regl.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			regl.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			regl.iniciarFormulario(w);
		}
	}
	////////////////////////
	//Metodos varios      //
	////////////////////////
};
