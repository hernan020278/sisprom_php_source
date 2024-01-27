var ccor = {
	pag:{
		alias		: 'Ctacorriente',
		nameWB		: 'brwCtacorriente',
		nameWP		: 'winCtacorriente',
		nameWS		: 'selCtacorriente',
		nameWI		: 'intCtacorriente',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwCtacorriente',
		idGridWP	: 'idWinCtacorriente',
		idGridWS	: 'idSelCtacorriente',
		idGridWI	: 'idIntCtacorriente'
	},
	tipPag: {
		"ENTGENE":{'name': 'CtaGeneral', 'alias': 'Cuenta General'},
		"CLIPROTRA":{'name': 'Ctacliprotra', 'alias': 'Cuenta Mixta'},
		"CLIPRO":{'name': 'CtaGeneral', 'alias': 'Cta Cliente-Proveedor'},
		"CLI":{'name': 'CtaCliente', 'alias': 'Cuenta Cliente'},
		"PRO":{'name': 'CtaProveedor', 'alias': 'Cuenta Proveedor'},
		"TRA":{'name': 'CtaTrabajador', 'alias': 'Cuenta Trabajador'},
		"TRP":{'name': 'CtaTransportista', 'alias': 'Cuenta Transportista'},
		"EMP":{'name': 'CtaEmpresa', 'alias': 'Cuenta Empresa'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////	
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/usua','adm/prop']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		ccor.winBrow(w);
	},
	winBrow : function(w){
		ccor.import(function(){
			if(w==null)w=new Object;
			ccor.setPagina(w);
			ccor[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					ccor.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, autoWidth: true}));		
					}//afterLoad:function(data){
				});//Sisem.Cargar({
		});//ccor.import(function(){
	},
	winPop:function(w){
		ccor.import(function(){
			if(w==null)w=new Object;
			ccor.setPagina(w);
			ccor[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			w.calcularTotDoc = function(){
				var tota = 0;
				if(w.$e.find('[name=grid_doc] tr').length>0){
					for(var i=0;i<w.$e.find('[name=grid_doc] tr').length;i++){
						var $row = w.$e.find('[name=grid_doc] tr').eq(i);
						var item_tota = $row.find('[name=item_tota]').text();
						item_tota = parseFloat(item_tota);
						if(isNaN(item_tota)) item_tota = 0;
						tota+=item_tota;
						w.$e.find('[name=cco_tota]').val(Sisem.redondeoString(tota));
					}
				}
			};
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:550,
				height:550,
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
							ccor.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							ccor.btnModificarClick(w);
						}
					}				
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					var ahora = moment().format('YYYY-MM-DD');

					w.$e.find('[name=btnAddDoc]').click(function(){ccor.btnAddDocClick(w);});
					w.$e.find('[name=btnSelEnti]').click(function(){ccor.btnSelEntiClick(w);});
					w.$e.find('[name=btnSelBanc]').click(function(){ccor.btnSelBancClick(w);});
				
					ccor.cuentaAutocomplete($.extend(w, {cco_tipo: 'ORIGEN', prf_camp: 'nomb', prf_sele: 1}));
					
					usua.usuarioAutocomplete($.extend(w, {prf_nomb: 'EMPLEADO', prf_inpu: 'usu_nomb', prf_sele: 1}));
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'TIPBNC', prf_inpu: 'bnc_prop', prf_sele: 1, prp_nive: 2}));
					
					ccor.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.validarControlesColor(w.$e,'cco, usu, bnc',w.modo);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//ccor.import(function(){
	},
	winSel:function(w){
		ccor.import(function(){
			if(w==null)w=new Object;
			ccor.setPagina(w);
			ccor[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:700,
				height:420,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [
				    {
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								ccor.cerrarFormulario(w);
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
										ccor.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							ccor.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					ccor.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth: true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//ccor.import(function(){
	},	
	winInt:function(w){
		ccor.import(function(){
			if(w==null)w=new Object;
			ccor.setPagina(w);
			ccor[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					ccor.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//oper.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_ccor']}, function(rpta){
			if(rpta){brw_ccor.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_ccor'}));}
		});		
	},
	iniciarFormulario:function(w){
		
		if(w.modo!='MODIFICAR'){ccor.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){ccor.llenarFormulario(w);}
		ccor.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'cco, usu, bnc',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=cco_kyccor]').val('');
		w.$e.find('[name=usu_kyusu]').val('');
		w.$e.find('[name=usu_dire]').val('');
		w.$e.find('[name=usu_tdoc]').val('');
		w.$e.find('[name=usu_ndoc]').val('');
		w.$e.find('[name=usu_nomb]').val('');
		w.$e.find('[name=suc_nomb]').val('');
		
		w.$e.find('[name=cco_freg]').val(moment(ahora).format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		w.$e.find('[name=cco_banc]').val('');
		
//		w.$e.find('[name=cco_tcta]').val('');
//		w.$e.find('[name=cco_tmon]').val('');
		w.$e.find('[name=cco_ndoc]').val((new Date()).getTime());
		
		w.$e.find('[name=cco_esta]').val(estado['0000'].text);
		w.$e.find('[name=cco_tota]').val('0.00');
		w.$e.find('[name=cco_scan]').val('0.00');
		w.$e.find('[name=cco_spag]').val('0.00');
		w.$e.find('[name=grid_dpe]').children('tbody').children().remove();
		w.$e.find('[name=grid_dap]').children('tbody').children().remove();
		w.$e.find('[name=grid_ope]').children('tbody').children().remove();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			cco_kycco: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=cco_kycco]').val()),
			cco_kyusu: w.$e.find('[name=usu_kyusu]').val(),
			cco_kybnc: w.$e.find('[name=bnc_kyprp]').val(),
			cco_dscr: w.$e.find('[name=bnc_prop]').val(),
		});
		return data;
	},	
	llenarFormulario:function(w){
		w.$e.find('[name=tra_kyusu]').val(((w.tra && w.tra.id_enti)?w.usu.usu_kyusu:USERDATA.usu.usu_kyusu));
		if(w.ky>0){w.$e.find('[name=cco_kycco]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=cco_kycco]').val())){
			Sisem.ejecutar('adm/GetListaCtacorriente',{cco_kycco: w.$e.find('[name=cco_kycco]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var cco = rpta.lista.items[0];

					w.$e.find('[name=usu_kyusu]').val(cco.usu_kyusu);
					w.$e.find('[name=usu_nomb]').val(cco.usu_nomb);
					
					w.$e.find('[name=bnc_kyprp]').val(cco.bnc_kyprp);
					w.$e.find('[name=bnc_prop]').val(cco.bnc_prop);

					//Llenar informacion de cuenta corriente
					w.$e.find('[name=cco_kyccor]').val(cco.cco_kycco);
					w.$e.find('[name=cco_codi]').val(cco.cco_codi);
					w.$e.find('[name=cco_freg]').val(cco.cco_freg);
					w.$e.find('[name=cco_tcta]').val(cco.cco_tcta);
					w.$e.find('[name=cco_ndoc]').val(cco.cco_ndoc);
					w.$e.find('[name=cco_tmon]').val(cco.cco_tmon);
					w.$e.find('[name=cco_tota]').val(Sisem.redondeoString(cco.cco_sant));
					w.$e.find('[name=cco_scan]').val(Sisem.redondeoString(cco.cco_scan));
					w.$e.find('[name=cco_spag]').val(Sisem.redondeoString(cco.cco_spag));
					w.$e.find('[name=cco_esta]').val(estado[cco.cco_esta].text);
					
//					w.lisDap=rpta.lisDap;
//					w.lisPag=rpta.lisPag;
//					
//					ccor.llenarGridDap(w);
//					ccor.llenarGridPag(w);
					
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('GetListaCtacorriente',{cco_kycco: w.$e.find('[name=cco_kycco]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=cco_kycco]').val())){
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
				
				ccor.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				ccor.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				ccor.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		Sisem.activar(w.$e.find('[name=caj_kycaja]'), false);
//		Sisem.activar(w.$e.find('[name=caj_kyapci]'), false);
//		Sisem.activar(w.$e.find('[name=caj_fini]'), false);
//		Sisem.activar(w.$e.find('[name=caj_ffin]'), false);
		Sisem.activar(w.$e.find('[name=caj_freg]'), false);
//		Sisem.activar(w.$e.find('[name=btnSelApc]'), w.activar);
		
//		Sisem.activar(w.$e.find('[name=cco_kyccor]'), false);
//		
//		Sisem.activar(w.$e.find('[name=usu_kyusu]'), false);
//		Sisem.activar(w.$e.find('[name=usu_dire]'), true);
//		Sisem.activar(w.$e.find('[name=usu_tdoc]'), true);
//		Sisem.activar(w.$e.find('[name=usu_ndoc]'), true);
		Sisem.activar(w.$e.find('[name=usu_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnSelEnti]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=bnc_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnSelBanc]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=suc_nomb]'), false);
		
		Sisem.activar(w.$e.find('[name=cco_freg]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_fini]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_ffin]'), w.activar);
	
		Sisem.activar(w.$e.find('[name=cco_tcta]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_fpag]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_tmon]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_tdoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_ndoc]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=cco_tota]'), false);
		Sisem.activar(w.$e.find('[name=cco_scan]'), false);
		Sisem.activar(w.$e.find('[name=cco_spag]'), false);
		Sisem.activar(w.$e.find('[name=cco_esta]'), false);
		
//		if(!Sisem.isEmpty(w.$e.find('[name=cco_kyccor]').val())){
////			Sisem.activar(w.$e.find('[name=btnAddDpe]'), true);
////			Sisem.activar(w.$e.find('[name=btnAddDap]'), false);
////			Sisem.activar(w.$e.find('[name=btnAddOpe]'), true);
////			Sisem.activar(w.$e.find('[name=btnDelOpe]'), true);
//		}else{
////			Sisem.activar(w.$e.find('[name=btnAddDpe]'), false);
////			Sisem.activar(w.$e.find('[name=btnAddDap]'), false);
////			Sisem.activar(w.$e.find('[name=btnAddOpe]'), false);
//			Sisem.activar(w.$e.find('[name=btnDelOpe]'), false);
//		}
	},	
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'cco, usu, bnc','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},	
	setPagina: function(w){		
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='CLIPROTRA'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: ccor.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+ccor.tipPag[w.tipo]['name'],
			nameWP		: 'win'+ccor.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+ccor.tipPag[w.tipo]['name'],
			nameWI		: 'int'+ccor.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+ccor.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+ccor.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+ccor.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+ccor.tipPag[w.tipo]['name']
		});
		ccor.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		if(w.caj){
			ccor.winPop({
				modo:'AGREGAR',
				tipo:w.tipo,
				suc:{
					id_sucu:$('[name=main_kysuc] :selected').val(),
					nomb:$('[name=main_kysuc] :selected').text()
				},
				caj: w.caj,
				tra: w.tra,
				cli: w.cli,
				callback:function(){
					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
				}
			});
		}
		else{
			ccor.winPop({
				modo:'AGREGAR',
				suc:{
					id_sucu:$('[name=main_kysuc] :selected').val(),
					nomb:$('[name=main_kysuc] :selected').text()
				},							
				tipo:w.tipo,
				callback:function(){
					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
				}
			});
		}
	},		
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			ccor.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(ccor.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=ccor.obtenerDatoFormulario(w);
				Sisem.ejecutar('adm/CtrlCtacorriente',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=cco_kycco]').val(rpta.cco_kycco);
						$.extend(w,{modo: 'VISUALIZAR'});
						ccor.cerrarFormulario($.extend(w,{data : ccor.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('adm/CtrlCtacorriente',data, function(rpta){
			}//if(ccor.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			ccor.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			ccor.iniciarFormulario(w);
		}
	},
	btnAddDocClick: function(w){
		$.extend(w,{evento: 'btnAddDocClick'});
		if(w.$e.find('[name=cco_kyccor]').val()=='0' || w.$e.find('[name=cco_kyccor]').val()==''){
			Sisem.msgBox('error','Genere una cuenta corriente');
		}else{
			docu.winSel({
				cli:{
					id_enti: w.$e.find('[name=usu_kyusu]').val()
				},
				suc:w.suc,
				tope: ( ( w.tipo=='PRV' ) ? '0001' : '0002' ),
				showMenCtx: false,
				callback:function(rptadoc){
					if(rptadoc)
					{
						var agregar=true;
						if(w.$e.find('[name=grid_dap]').find('tbody').children('tr').length>0){
							for(var i=0;i<w.$e.find('[name=grid_dap]').find('tbody').children('tr').length;i++){
								var $row = w.$e.find('[name=grid_dap]').find('tbody').children('tr').eq(i);
								if($row.data('data').id_docu==rptadoc.id_docu){
									Sisem.msgBox('error','Este documento ya esta en la cuenta');
									agregar=false;
									break;
								}
							}
						}
						if(agregar){
							$.get(base_url+'ccor/actualizarCuenta',{id_ccor:w.$e.find('[name=cco_kyccor]').val(),id_docu:rptadoc.id_docu},function(rpta){
								ccor.llenarFormulario(w);
//								w.calcularTotDoc();
								Sisem.msgBox(rpta.msg.type,rpta.msg.text);
							},'json');
						}						
					}
				}//callback:function(rptadoc){
			});//docu.winSel({
		}//if(w.$e.find('[name=id_ccor]').val()!='0' || w.$e.find('[name=id_ccor]').val()!=''){		
	},
	btnAddPagClick: function(w){
		$.extend(w,{evento: 'btnAddPagClick'});
		if(Sisem.isEmpty(w.$e.find('[name=cco_kyccor]').val())){
			Sisem.msgBox('error','Genere una cuenta corriente');
		}else{
			pagc.winPop({
				modo:'AGREGAR',
				cco:{id_ccor:w.$e.find('[name=cco_kyccor]').val(), spag:w.$e.find('[name=cco_spag]').val()},
				callback:function(rpta){
					$.get(base_url+'ccor/actualizarCuenta',{id_ccor:w.$e.find('[name=cco_kyccor]').val()},function(rpta){
						ccor.llenarFormulario(w);
//						w.calcularTotDoc();
						Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					},'json');
				}
			});
		}//if(w.$e.find('[name=id_ccor]').val()!='0' || w.$e.find('[name=id_ccor]').val()!=''){		
	},
	llenarGridDap:function(w){
		if(w.lisDap!=null){
			for(var ite=0;ite<w.lisDap.length;ite++){
				var $tbody = w.$e.find('[name=grid_dap]').children('tbody');
//				$tbody.children().remove();
				var $row ='<tr class="item">';
				$row+='<td><label name="item_tdoc">'+w.lisDap[ite].tdoc+'</label></td>';
				$row+='<td><label name="item_ndoc">'+w.lisDap[ite].ndoc+'</label></td>';
				$row+='<td><label name="item_tmon">'+w.lisDap[ite].tmon+'</label></td>';
				$row+='<td><label name="item_tota">'+Sisem.redondeoString(w.lisDap[ite].tota)+'</label></td>';
				$row+='<td><label name="item_scan">'+Sisem.redondeoString(w.lisDap[ite].scan)+'</label></td>';
				$row+='<td><label name="item_spag">'+Sisem.redondeoString(w.lisDap[ite].spag)+'</label></td>';
				$row+='<td><button name="btnDel" class="btn btn-primary">Eliminar</button></td>';
				$row+='</tr>';
				$tbody.append($row);
				$tbody.find('tr:last').click(function(){
					$tbody.find('.item').removeClass('highlights');
					$(this).closest('.item').addClass('highlights');
				});
				$tbody.find('tr:last').data('data',w.lisDap[ite]).on('click','[name=btnDel]',function(){					
					$.post(base_url+'docu/deleteCdoc',{id_ccor:$(this).closest('tr').data('data').id_ccor, id_docu:$(this).closest('tr').data('data').id_docu},function(rpta){
						if(rpta.msg.type=='success'){ccor.iniciarFormulario(w);}
						Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					},'json');
				});
			}					
		}//if(rpta.lisDpe!=null){		
	},
	llenarGridPag:function(w){
		if(w.lisPag!=null){
			for(var ite=0;ite<w.lisPag.length;ite++){
				var $tbody_ope = w.$e.find('[name=grid_ope]').children('tbody');
//				$tbody_ope.children().remove();
				var debe=((parseFloat(w.lisPag[ite].debe)>0)?Sisem.redondeoString(w.lisPag[ite].debe):'');
				var habe=((parseFloat(w.lisPag[ite].habe)>0)?Sisem.redondeoString(w.lisPag[ite].habe):'');
				var $row ='<tr class="item">';
				$row+='<td style="width:60px;"><label name="item_freg">'+w.lisPag[ite].freg+'</label></td>';
				$row+='<td style="width:150px;"><label name="item_enom">'+((w.lisPag[ite].enom)?w.lisPag[ite].enom:'')+'</label></td>';
				$row+='<td style="width:30px;"><label name="item_otip">'+w.lisPag[ite].otip+'</label></td>';
				$row+='<td style="width:40px;"><label name="item_tdos">'+w.lisPag[ite].tdoc+'</label></td>';
				$row+='<td style="width:30px;"><label name="item_ndoc">'+w.lisPag[ite].ndoc+'</label></td>';
				$row+='<td style="width:30px;"><label name="item_tmon">'+w.lisPag[ite].omon+'</label></td>';
				$row+='<td style="width:30px;"><label name="item_debe">'+debe+'</label></td>';
				$row+='<td style="width:30px;"><label name="item_habe">'+habe+'</label></td>';
				$row+='<td style="width:30px;"><label name="item_esta">'+estado[w.lisPag[ite].esta].label+'</label></td>';
				$row+='</tr>';
				$tbody_ope.append($row);
				$tbody_ope.find('tr:last').click(function(){
					$tbody_ope.find('.item').removeClass('highlights');
					$(this).closest('.item').addClass('highlights');
				});
//				$tbody_ope.find('tr:last').data('data',w.lisPag[ite]).dblclick(function(){
//					w.$e.find('[name=btnDelOpe]').trigger('click');
//				});
			}					
		}//if(rpta.lisPag!=null){
	},
	cuentaAutocomplete: function (w){
		var cco_tipo = ((typeof w.cco_tipo=="undefined")?'GENERAL':w.cco_tipo);
		var prf_camp = ((typeof w.prf_camp=="undefined")?'ndoc':w.prf_camp);
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_tab = '';
		
		if(cco_tipo=='ORIGEN'){prf_tab='cor';}
		else if(cco_tipo=='DESTINO'){prf_tab='cde';}
		else{prf_tab=='cco';}

		w.$e.find("[name="+prf_tab+"_"+prf_camp+"]").on('keyup', function(event){			
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor)){
				w.$e.find("[name="+prf_tab+"_kycco]").val('0');
				w.$e.find("[name="+prf_tab+"_kyusu]").val('0');
				w.$e.find("[name="+prf_tab+"_nomb]").val('');
				$(this).autocomplete('enable');
			}//if(Sisem.isEmpty(valor)){
		});

		w.$e.find("[name="+prf_tab+"_"+prf_camp+"]").autocomplete({			
			source: base_url+'GetListaCtacorrienteAuto?campo=cco_'+prf_camp+'&mostrarSeleccion='+prf_sele,			
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},			
			select: function(eve, rpta){
				var obj = rpta.item.value;
				w.$e.find("[name="+prf_tab+"_kycco]").val(obj.cco_kycco);
				w.$e.find("[name="+prf_tab+"_kyusu]").val(obj.usu_kyusu);
				w.$e.find("[name="+prf_tab+"_nomb]").val(obj.usu_nomb);
				if(obj.usu_nomb=='Seleccione')
				{
					ccor.winSel({
						modo: 'SELECCIONAR',
						tipo: 'ENTGENE',
						tra: {
							usu_kyusu: w.$e.find('[name=tra_kyusu]').val(),
							usu_nomb: w.$e.find('[name=tra_nomb]').val()
						},
						caj:{
							suc_kysuc: w.$e.find('[name=suc_kysucu]').val(),
							apc_kyapc: ((w.tipo=='COPEANT')?w.$e.find('[name=ant_kyapci]').val():w.$e.find('[name=apc_kyapc]').val()),
							suc_nomb: w.$e.find('[name=suc_nomb]').val()
						},
						cli: {
							usu_kyusu: w.$e.find('[name=cli_kyusu]').val(),
							usu_nomb: w.$e.find('[name=cli_nomb]').val()
						},					
						callback:function(objSel){
							if(objSel){
								w.$e.find("[name="+prf_tab+"_kycco]").val(objSel.cco_kycco);
								w.$e.find("[name="+prf_tab+"_kyusu]").val(objSel.usu_kyusu);
								w.$e.find("[name="+prf_tab+"_nomb]").val(objSel.usu_nomb);
							}//if(objSel){
						}//callback:function(objSel){
					});//prop.winSel({
				}//if(prp.prp_secc=='Seleccione')
				else
				{
//					if(prp_secc=='PRPLPR'){$(this).trigger('eventoObtenerPrecio');}
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
				w.$e.find("[name="+prf_tab+"_kycco]").val(obj.cco_kycco);
				w.$e.find("[name="+prf_tab+"_kyusu]").val(obj.usu_kyusu);
				w.$e.find("[name="+prf_tab+"_nomb]").val(obj.usu_nomb);
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tab+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);		
	}	
};//var ccor = {