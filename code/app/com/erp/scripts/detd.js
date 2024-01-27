var detd = {
	pag:{
		alias		: 'Detdocumento',
		nameWB		: 'brwDetdocumento',
		nameWP		: 'winDetdocumento',
		nameWS		: 'selDetdocumento',
		nameWI		: 'intDetdocumento',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwDetdocumento',
		idGridWP	: 'idWinDetdocumento',
		idGridWS	: 'idSelDetdocumento',
		idGridWI	: 'idIntDetdocumento'
	},
	tipPag: {
		"DETDOCUMENTO":{'name': 'Detdocumento', 'alias': 'Detdocumento general'}
	},
	tipPagAct: '',
	// //////////////////////
	// Metodhs of Interface//
	// //////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['ent/erpDoc','ent/erpDtd','ent/cmnEnt']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init: function(w){
		if(w==null)w=new Object();
		detd.winBrow(w);
	},
	winBrow: function(w){
		detd.import(function(){
			if(w==null)w=new Object;
			detd.setPagina(w);
			detd[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					detd.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));

				}
			});
		});
	},
	winPop:function(w){
		detd.import(function(){
			if(w==null)w=new Object;
			detd.setPagina(w);
			detd[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 600 : 950),
				height:((w.size && w.size=='short') ? 350 : 700),
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						class : "btn btn-primary",
						name : "btnAgregar",
						placeholder : "Presione ENTER",
						click : function() {
							detd.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						placeholder : "Presione ENTER",
						click : function() {
							detd.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					w.$e.on('click','[name=btnDelRow]',function(){
						if(detd.validarFormulario($.extend(w,{evento:'btnDelRowClick'}))){
							console.log($(this).closest('tr').data('data'));
//							$(this).closest('tr').remove();
						}
					});

					detd.iniciarFormulario(w);

					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});
		});
	},
	winSel:function(w){
		detd.import(function(){
			if(w==null)w=new Object;
			detd.setPagina(w);
			detd[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Window({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:650,
				height:500,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWS+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&tipoBrowse='+((w.tipoBrowse)?w.tipoBrowse:''),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
								if(w.modo=='VISUALIZAR'){
									detd.cerrarFormulario(w);
								}else{
									if(w.$e.find('[name=grid] .highlights').length>0){
											var data = new Object();
											if(w.$e.find('[name=grid] .highlights').length>1)
											{
												data.items = [];
												for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
												{
													data.items.push(w.$e.find('[name=grid] .highlights').eq(ite).data('data'));
												}// for(var ite=0; ite<w.$e.find('[name=grid]
													// .highlights').length; ite++)
											}// if(w.$e.find('[name=grid] .highlights').length==1){
											else if(w.$e.find('[name=grid] .highlights').length==1)
											{
												data = w.$e.find('[name=grid] .highlights').data('data');
											}
											detd.cerrarFormulario($.extend(w, {data: data}));
									}else{
										Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
									}						
								}
							}
						},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							detd.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					detd.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: false, multiSelect: true, autoWidth: false, refreshButton: false}));
					Sisem.unblockW(w.$e);
				}
			});
		});
	},
	winInt:function(w){
		detd.import(function(){
			if(w==null)w=new Object;
			detd.setPagina(w);
			detd[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					detd.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: false, showToolBar: false, multiSelect: false, autoWidth: true, refreshButton: false}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//oper.import(function(){
	},
	// ////////////////////////////
	// Metodhs of Data Management//
	// ////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['erp/brw_detd']}, function(rpta){
			if(rpta){brw_detd.ejecutar($.extend(w,{modulo:'controllers', archivo: 'erp/brw_detd'}));}
		});				
	},
	iniciarFormulario:function(w){
		detd.limpiarInstancias(w);
		if(w.modo!='MODIFICAR'){detd.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){detd.llenarFormulario(w);}
		if(w.modo=='AGREGAR'){detd.nuevoDetdocumento(w);}
		detd.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'doc, ent, usu, suc, art',w.modo);
	},
	limpiarInstancias(w){
		admArt = {};
		erpDoc = {};
		erpDtd = {};
		cmnEnt = {};
		cmnPrf = {};
		pubLisDtd = Array();
		pubLisArt = Array();
		pubLanDtd = Array();
		pubLanArt = Array();
	},
	limpiarFormulario:function(w){
		w.$e.find('[name=suc_kysuc]').val($('[name=main_kysuc]').val());
		w.$e.find('[name=suc_nomb]').val($('[name=main_kysuc] option:selected').html());
		w.$e.find('[name=doc_tope]').val(w.tipo);
		w.$e.find('[name=doc_tdoc]').val((w.tipo=='VENTA') ? 'TICKET' : 'GUIA');
		w.$e.find('[name=doc_ndoc]').val('');
		w.$e.find('[name=doc_femi]').val(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
		w.$e.find('[name=ent_tdoc]').val((w.tipo=='VENTA') ? 'DNI' : 'RUC');
		w.$e.find('[name=ent_ndoc]').val('');
		w.$e.find('[name=ent_nomb]').val('');
		w.$e.find('[name=ent_dire]').val('');
		w.$e.find('[name=usu_nomb]').val(USERDATA.usu.usu_nomb);
		w.$e.find('[name=doc_fpag]').val('');
		w.$e.find('[name=doc_tven]').val('');

		w.$e.find('[name=art_combo]').val('');
		w.$e.find('[name=art_cant]').val('');
		w.$e.find('[name=art_pund]').val('');
		
		w.$e.find('[name=val_item]').val('0');
		w.$e.find('[name=val_arti]').val('0');

  	w.$e.find('[name=gridItemDoc]').children().remove();
	},
	obtenerDatoFormulario: function(w){},
	llenarFormulario:function(w){
		Sisem.blockW(w.$e);
		if(w.ky>0){w.$e.find('[name=doc_kydoc]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=doc_kydoc]').val())){
			Sisem.ejecutar('erp/GetListaDetdocumento',{doc_kydoc: w.$e.find('[name=doc_kydoc]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					$.extend(erpDoc, fila);

					w.$e.find('[name=doc_kydoc]').val(fila.doc_kydoc);
					w.$e.find('[name=suc_nomb]').val(fila.suc_nomb);
					w.$e.find('[name=doc_tope]').val(fila.doc_tope);
					w.$e.find('[name=doc_tdoc]').val(fila.doc_tdoc);
					w.$e.find('[name=doc_ndoc]').val(fila.doc_ndoc);
					w.$e.find('[name=doc_femi]').val(moment(fila.doc_femi).format('YYYY-MM-DD'));
					w.$e.find('[name=ent_kyusu]').val(fila.doc_kyent);
					w.$e.find('[name=ent_tdoc]').val(fila.doc_etdo);
					w.$e.find('[name=ent_ndoc]').val(fila.doc_endo);
					w.$e.find('[name=ent_nomb]').val(fila.doc_enom);
					w.$e.find('[name=ent_dire]').val(fila.doc_edir);
					w.$e.find('[name=usu_nomb]').val(USERDATA.usu.usu_nomb);
					w.$e.find('[name=doc_fpag]').val(fila.doc_fpag);
					w.$e.find('[name=doc_tven]').val(fila.doc_tven);
					w.$e.find('[name=doc_tsub]').val(Sisem.redondeoString(fila.doc_tsub));
					w.$e.find('[name=doc_tigv]').val(Sisem.redondeoString(fila.doc_tigv));
					w.$e.find('[name=doc_tota]').val(Sisem.redondeoString(fila.doc_tota));
				}
				Sisem.unblockW(w.$e);
			});

			Sisem.ejecutar('erp/GetListaDetdocumento',{dtd_kydoc: w.$e.find('[name=doc_kydoc]').val()}, function(rpta){
				if(rpta.lista.items.length > 0){
					pubLisDtd = rpta.lista.items;
					detd.llenarGridDoc(w, erpDoc, pubLisDtd, {});
				}
				/*
				 * for(iteDet = 0; iteDet < rpta.lista.items.length; iteDet++) {
				 * pubLisDtd = rpta.lista.items; var filaDtd = rpta.lista.items[iteDet];
				 * var $row = w.$e.find('[name=gridRef]').clone().children();
				 * 
				 * $row.find('[name=dtd_cant]').html(filaDtd.dtd_cant);
				 * $row.find('[name=dtd_dscr]').html(filaDtd.dtd_dscr);
				 * $row.find('[name=dtd_pcos]').html(filaDtd.dtd_pund);
				 * $row.find('[name=dtd_dcto]').html(filaDtd.dtd_dcto);
				 * $row.find('[name=dtd_pdto]').html(filaDtd.dtd_pdto);
				 * $row.find('[name=dtd_impo]').html(filaDtd.dtd_impo);
				 * 
				 * $row.data('data',filaDtd);
				 * w.$e.find('[name=gridItemDoc]').append($row); }
				 */
				Sisem.unblockW(w.$e);
			});
		}else{
			Sisem.unblockW(w.$e);
		}
	},
	refrescarFormulario: function(w){
// if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.modo+'
// '+w.pag.alias);}
// else{w.$e.parent().find('.ui-dialog-title').html(w.modo+' '+w.pag.alias);}
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
				
				detd.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				detd.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				detd.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=suc_nomb]'), false);
		Sisem.activar(w.$e.find('[name=doc_tope]'), false);
		Sisem.activar(w.$e.find('[name=doc_femi]'), false);
		Sisem.activar(w.$e.find('[name=doc_tdoc]'), false);
		Sisem.activar(w.$e.find('[name=doc_ndoc]'), false);
		Sisem.activar(w.$e.find('[name=doc_tmon]'), false);
		Sisem.activar(w.$e.find('[name=ent_tdoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_ndoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_dire]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_nomb]'), false);		
		Sisem.activar(w.$e.find('[name=doc_fpag]'), false);
		Sisem.activar(w.$e.find('[name=doc_tven]'), false);
		Sisem.activar(w.$e.find('[name=doc_guia]'), w.activar);
		Sisem.activar(w.$e.find('[name=doc_fact]'), w.activar);

		Sisem.activar(w.$e.find('[name=doc_dimp]'), false);
		Sisem.activar(w.$e.find('[name=eti_tsub]'), false);
		Sisem.activar(w.$e.find('[name=doc_tsub]'), false);
		Sisem.activar(w.$e.find('[name=eti_item]'), false);
		Sisem.activar(w.$e.find('[name=eti_arti]'), false);
		Sisem.activar(w.$e.find('[name=eti_paga]'), false);
		Sisem.activar(w.$e.find('[name=val_paga]'), false);
		Sisem.activar(w.$e.find('[name=eti_tigv]'), false);
		Sisem.activar(w.$e.find('[name=doc_tigv]'), false);
		Sisem.activar(w.$e.find('[name=val_item]'), false);
		Sisem.activar(w.$e.find('[name=val_arti]'), false);
		Sisem.activar(w.$e.find('[name=eti_vuel]'), false);
		Sisem.activar(w.$e.find('[name=val_vuel]'), false);
		Sisem.activar(w.$e.find('[name=eti_tota]'), false);
		Sisem.activar(w.$e.find('[name=doc_tota]'), false);

		Sisem.activar(w.$e.find('[name=art_combo]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_unid]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pres]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_conc]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_titu]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_frsn]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_cant]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pcos]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pund]'), w.activar);
	},
	validarFormulario:function(w){
		if(w.evento!=null && w.evento=='validarDatosItem')
		{
			if(!Sisem.validarControlesColor(w.$e,'doc, ent, usu, suc, art',w.modo))
			{
				Sisem.msgBox('error','Debe ingresar datos ARTICULO!!!');
				return false;				
			}			
		}// if(w.evento!=null && w.evento=='validarDatosItem')
		if(w.evento!=null && w.evento=='validarItemUnico')
		{
			if(w.$e.find('[name=gridItemDoc] tr').length>0){
				for(var i=0;i<w.$e.find('[name=gridItemDoc] tr').length;i++){
					var $row = w.$e.find('[name=gridItemDoc] tr').eq(i);
					if(!Sisem.isEmpty(w.art_kyart)){
						if($row.data('data').dtd_kyart==w.art_kyart){
							return false;
						}
					}
				}
			}
		}// if(w.evento!=null && w.evento=='validarItemUnico')
		if(w.evento!=null && ( w.evento=='btnGuardarClick' || w.evento=='btnDelRowClick' ) ){
			if(!Sisem.validarControlesColor(w.$e,'doc','VALIDAR') && w.evento=='btnGuardarClick'){
				Sisem.msgBox('error','Ingrese datos obligatorios!!!');
				return false;
			}
			/* Validacion de Items unicos Servicios/Productos */
			// console.log(w);
			if( ( w.tipo=='0001' )){
				var tipo = null;
				var bad_items = 0;
				if(w.$e.find('[name=gridItemDoc] tr').length>2){
					tipo = w.$e.find('[name=gridItemDoc] tr').eq(0).data('data').tipo;
					for(var i=0;i<w.$e.find('[name=gridItemDoc] tr').length;i++){
						var $row = w.$e.find('[name=gridItemDoc] tr').eq(i);
						if($row.data('data')!=null){
							if($row.data('data').art_tipo!=tipo){
								bad_items++;
							}
						}
					}
					if(bad_items>0){
						Sisem.msgBox('error','Los Items seleccionados deben ser Servicios o Productos, no ambos!!!');
						return false;
					}
				}
			}

			if(w.modo=='AGREGAR')
			{
				if(w.$e.find('[name=gridItemDoc] tr').length>0){
					for(var i=0;i<w.$e.find('[name=gridItemDoc] tr').length;i++){
						var $row = w.$e.find('[name=gridItemDoc] tr').eq(i);
						var item_cant=parseFloat($row.find('[name=item_cant]').val());
						var item_pope = parseFloat($row.find('[name=item_pope]').val());
						var ccot = parseFloat($row.data('data').dtd_ccot);
						var cped = parseFloat($row.data('data').dtd_cped);
						var cent = parseFloat($row.data('data').dtd_cent);
						var cfac = parseFloat($row.data('data').dtd_cfac);
						var sact = parseFloat($row.data('data').dtd_sact);
						var tipo = $row.data('data').dtd_tipo;
						
						if ( w.evento=='btnGuardarClick' || w.evento=='btnDelRowClick' ){
							if( ( w.tipo=='0005' || w.tipo=='0009' ) && w.evento=='btnGuardarClick' ){
								if( item_cant < cped ){
									Sisem.msgBox('error',tipOpe[w.tipo]+' es menor que lo pedido!!!');
									return false;
								}
							} else if( ( w.tipo=='0006' || w.tipo=='0010' ) && w.evento=='btnGuardarClick' ){
								if( item_cant < cent ){
									Sisem.msgBox('error',tipOpe[w.tipo]+' es menor que lo entregado!!!');
									return false;
								}
							}
							if( ( w.tipo=='0005' || w.tipo=='0009' ) && w.evento=='btnDelRowClick' ){
								if( ( cped > 0 || cent > 0 || cfac ) > 0 && w.evento=='btnDelRowClick'){
									Sisem.msgBox('error','No se puede eliminar si hay un pedido, entrega o factura!!!');
									return false;
								}
							}
							if( ( w.tipo=='0006' || w.tipo=='0010' ) && w.evento=='btnDelRowClick' ){
								if( ( cent > 0 || cfac ) > 0 && w.evento=='btnDelRowClick'){
									Sisem.msgBox('error','No se puede eliminar si hay entrega o factura!!!');
									return false;
								}
							}
						}
						if ( w.evento=='btnGuardarClick' ){
							if(!Sisem.isEmpty(w.$e.find('[name=doc_kypdr]').val()) ){
								if( ( w.tipo=='0007' || w.tipo=='0008' ) && !Sisem.isEmpty(w.$e.find('[name=doc_kypdr]').val()) && ( w.$e.find('[name=doc_kypdr]').data('data').tope=='0006' || w.$e.find('[name=doc_kypdr]').data('data').tope=='0010' ) ){
									if( w.tipo=='0008' && item_cant>sact ){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede el stock');
										return false;
									}
									if( (w.tipo=='0007' || w.tipo=='0008') && (item_cant+cent)>cped ){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede lo pedido');
										return false;
									}
								}else if( ( w.tipo=='0001' || w.tipo=='0002' ) && !Sisem.isEmpty(w.$e.find('[name=doc_kypdr]').val()) && ( w.$e.find('[name=doc_kypdr]').data('data').tope=='0006' || w.$e.find('[name=doc_kypdr]').data('data').tope=='0010' ) ){
									if( (item_cant+cfac) > cped ){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede lo pedido');
										return false;
									}
								}else if( w.tipo=='0007' && !Sisem.isEmpty(w.$e.find('[name=doc_kypdr]').val()) && w.$e.find('[name=doc_kypdr]').data('data').tope=='0001' ){
									if( (item_cant+cent) > cfac){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede lo facturado');
										return false;
									}
								}else if( w.tipo=='0008' && !Sisem.isEmpty(w.$e.find('[name=doc_kypdr]').val()) && w.$e.find('[name=doc_kypdr]').data('data').tope=='0002' ){
									if( (item_cant+cent) > cfac ){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede lo facturado');
										return false;
									}
									if( (item_cant+cent)>sact ){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede el stock');
										return false;
									}
								}
							}// if(Sisem.isEmpty(w.$e.find('[name=doc_kypdr]').val())){

							if( ( w.tipo=='0002' || w.tipo=='0009' || w.tipo=='0010') && w.$e.find('[name=doc_kaut]').prop('checked')==true){
								if(tipo=='PRODUCTO')
								{
									if(item_cant>sact){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede el stock');
										return false;
									}
								}
								else if(tipo=='SERVICIO')
								{
									if(sact!=1){
										Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' no tiene como stock 1');
										return false;
									}
								}
							}
							if( ( ( ( w.tipo=='0003' || w.tipo=='0008' ) && w.$e.find('[name=kar_tctr]').val()=='EGRESO' ) ) ){
								if(item_cant>sact){
									Sisem.msgBox('error',tipOpe[w.tipo]+' de '+$row.data('data').nomb+' excede el stock');
									return false;
								}
							}
							
							if( w.tipo=='0003' && ( w.$e.find('[name=suc_kysucu]').val()==w.$e.find('[name=usu_kyusu]').val() ) ){
								Sisem.msgBox('error','Los traslados no pueden ser a la misma sucursal!!!');
								return false;
							}

							if( ( w.tipo=='0002' || w.tipo=='0009' || w.tipo=='0010' || w.tipo=='0001' || w.tipo=='0006' ) && item_pope==0){
								Sisem.msgBox('error','El precio de '+$row.data('data').nomb+' es 0!!!');
								return false;
							}
							if(item_cant==0){
								Sisem.msgBox('error','La cantidad de '+$row.data('data').nomb+' es 0!!!');
								return false;
							}						
						}
					}
				}else{
					Sisem.msgBox('error','El documento no tiene items!!!');
					return false;
				}
			}// if(w.modo=='AGREGAR')
		}// if(w.evento!=null && ( w.evento=='btnGuardarClick' ||
			// w.evento=='btnDelRowClick' ) ){
		if(w.evento!=null && w.evento=='btnAddDocClick'){
			if(w.$e.find('[name=gridItemDoc] tr').length>0){
				Sisem.msgBox('error','Existe items agregados');
				return false;
			}
			if( w.tipo=='0003' ){
				Sisem.msgBox('error','No se puede agregar documento en un traslado!!!');
				return false;
			}
		}
		if(w.evento!=null && w.evento=='btnModificarClick'){
			if( w.$e.find('[name=doc_kydoc]').data('data') && w.$e.find('[name=doc_kydoc]').data('data').esta=='0001' ){
				Sisem.msgBox('error','No se puede modificar por que esta aprobado!!!');
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='COMPRA';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: detd.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+detd.tipPag[w.tipo]['name'],
			nameWP		: 'win'+detd.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+detd.tipPag[w.tipo]['name'],
			nameWI		: 'int'+detd.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+detd.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+detd.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+detd.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+detd.tipPag[w.tipo]['name']
		});
		detd.tipPagAct = w.tipo;
	},
	// ////////////////
	// Metodhs Events//
	// ////////////////
	btnAddClick: function(w){
		detd.winPop({
			modo:'AGREGAR',
			suc:{
				id_sucu:$('[name=main_kysuc] :selected').val(),
				nomb:$('[name=main_kysuc] :selected').text()
			},
			tipo:w.tipo,
			tope:w.tipo,
			ctrl:w.ctrl,
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			detd.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(detd.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				
				erpDoc.doc_kydoc = ((w.modo=='AGREGAR')?'0':w.$e.find('[name=doc_kydoc]').val());
				
				var data = $.extend(data, {comando: w.modo , doc: erpDoc, lisDtd: pubLisDtd, lisArt: pubLisArt});
				
				Sisem.ejecutar('erp/CtrlDetdocumento',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=doc_kydoc]').val(rpta.doc_kydoc);
						$.extend(w,{modo: 'VISUALIZAR'});
						detd.cerrarFormulario($.extend(w,{data : detd.obtenerDatoFormulario(w)}));
					}
					Sisem.unblockW(w.$e);
				});
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			detd.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			detd.iniciarFormulario(w);
		}
	},
	// //////////////////////
	// Metodhs Miscellanous//
	// //////////////////////
	calcularTotDoc: function(w){
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
	},
	anularDetdocumento: function(w){
		//INICIO: OBTENER DOCUMENTO
		Sisem.ejecutar('erp/GetListaDetdocumento',{doc_kydoc: w.doc_kydoc}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
				var fila = rpta.lista.items[0];
				$.extend(erpDoc, fila);
				
				if((erpDoc.doc_tope=='VENTA' || erpDoc.doc_tope == 'COMPRA') && erpDoc.doc_esta == 'APROBADO')
				{
				
					//INICIO: OBTENER LISTA DE DETALLES DE DOCUMENTO
					Sisem.ejecutar('erp/GetListaDetdocumento',{dtd_kydoc: w.doc_kydoc}, function(rpta){
						if(rpta.lista.items.length > 0)
						{
							pubLisDtd = rpta.lista.items;
							
							var strSelectIn = '';
							for(var iteDtd=0; iteDtd<pubLisDtd.length; iteDtd++)
							{
								strSelectIn += "'" + pubLisDtd[iteDtd].dtd_acod + "',"
							}
							strSelectIn = strSelectIn.substr(0,strSelectIn.length-1);
						  
							//INICIO: OBTENER LISTA DE ARTICULOS
							Sisem.ejecutar('adm/GetListaArticulo',{art_codi_in: strSelectIn}, function(rpta){
								if(rpta.lista.items.length > 0)
								{
									pubLisArt = rpta.lista.items;
									
									erpDoc.doc_tdoc = ( (erpDoc.doc_tope == 'VENTA') ? 'NOTA_INGRESO' : 'NOTA_SALIDA');
									erpDoc.doc_tcon = ( (erpDoc.doc_tope == 'VENTA') ? 'INGRESO' : 'SALIDA');
									erpDoc.doc_tope = ( (erpDoc.doc_tope == 'VENTA') ? 'VENTA_ANULADA' : 'COMPRA_ANULADA');
									erpDoc.doc_esta = 'ANULADO';
									erpDoc.doc_femi = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
									
								  //INICIO: OBTENER LISTA DE ARTICULO
									Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc: USERDATA.suc.suc_kysuc, prp_secc: 'NUMDOC', prp_dscr: erpDoc.doc_tdoc, prp_nive: 2}, function(rpta){
										if(rpta.lista.items.length > 0)
										{
										  parPrp = rpta.lista.items[0];
										  erpDoc.doc_ndoc = Sisem.llenarCeros(parPrp.prp_prop, 3) + '-' + Sisem.llenarCeros(parseInt(parPrp.prp_valu)+1, 6);

											for(var iteDtd=0; iteDtd<pubLisDtd.length; iteDtd++)
											{
												$.extend(erpDtd, pubLisDtd[iteDtd]);
												
												for(var iteArt=0; iteArt<pubLisArt.length; iteArt++)
												{
													if(erpDtd.dtd_acod == pubLisArt[iteArt].art_codi)
													{
  													$.extend(admArt, pubLisArt[iteArt]);
  												  //INICIO: CALCULAR REGISTRO DE INGRESO O SALIDA DE ARTICULO
														detd.ingresarDetdocumentoEnListaDetdocumento(erpDoc, erpDtd, admArt, pubLanDtd, pubLanArt, function(resp){
											    		if(resp==true){
											    			if( iteDtd == pubLisDtd.length){
												    			//INICIO: GUARDAR DOCUMENTO Y LISTA DE DETALLE DE DOCUMENTO
																	var dtmp = {comando: 'AGREGAR_ANULAR' , doc: erpDoc, lisDtd: pubLanDtd, lisArt: pubLanArt};
																	Sisem.ejecutar('erp/CtrlDetdocumento',dtmp, function(rpta){
																		if(rpta.msg.type=='success')
																		{
																			Sisem.msgBox('success','El documento se anulo correctamente!!!');
																			if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
	//																		w.$e.find('[name=doc_kydoc]').val(rpta.doc_kydoc);
	//																		$.extend(w,{modo: 'VISUALIZAR'});
	//																		detd.cerrarFormulario($.extend(w,{data : detd.obtenerDatoFormulario(w)}));
																		}
																	});//FIN: GUARDAR DOCUMENTO Y LISTA DE DETALLE DE DOCUMENTO
											    			}
											    		}
											    	});//FIN: CALCULAR REGISTRO DE INGRESO O SALIDA DE ARTICULO
													}
												}
											}
										}
										else
										{
											Sisem.msgBox('error','No se pudo establecer el numero de documento!!!');
										}
									});
								//FIN: OBTENER LISTA DE ARTICULO
								}
								else
								{
									Sisem.msgBox('error','Esta factura no tiene articulos relacionados!!!');
								}
							});
						//INICIO: OBTENER NUMERO DE DOCUMENTO
						}
						else
						{
							Sisem.msgBox('error','La Factura no tiene items!!!');
						}
					});	
				  //FIN: OBTENER LISTA DE DETALLES DE DOCUMENTO
				}
				else
				{
					Sisem.msgBox('error','Esta factura no se puede anular!!!');
				}
			}
		});
	  //FIN: OBTENER DOCUMENTO
	},
	obtenerDatoDlgEntidad: function(w){

		cmnPrf.prf_nomb = ( ( w.tipo == 'VENTA' ) ? 'CLIENTE' : 'PROVEEDOR' );

		cmnEnt.usu_kyusu = w.$e.find('[name=ent_kyusu]').val().toUpperCase();
		cmnEnt.usu_tipo =  'ADMINISTRADOR';
		cmnEnt.usu_tdoc =  w.$e.find('[name=ent_tdoc]').val().toUpperCase();
		cmnEnt.usu_ndoc =  w.$e.find('[name=ent_ndoc]').val().toUpperCase();
		cmnEnt.usu_nomb =  w.$e.find('[name=ent_nomb]').val().toUpperCase();
		cmnEnt.usu_dire =  w.$e.find('[name=ent_dire]').val().toUpperCase();
	},
	obtenerDatoDlgDetdocumento: function(w){
		/***************************************************************************
		 * REGISTRO DE VENTA
		 **************************************************************************/
		erpDoc.doc_kydoc =  w.$e.find('[name=doc_kydoc]').val().toUpperCase();
		erpDoc.doc_kycom =  USERDATA.com.com_kycom;
		erpDoc.doc_kysuc =  USERDATA.suc.suc_kysuc;
		erpDoc.doc_kyusu =  USERDATA.usu.usu_kyusu;
		erpDoc.doc_kyent =  w.$e.find('[name=ent_kyusu]').val().toUpperCase();
// erpDoc.doc_kykrf = w.$e.find('[name=doc_tdoc]').val().toUpperCase();
// erpDoc.doc_kcod = w.$e.find('[name=doc_tdoc]').val().toUpperCase();
		erpDoc.doc_tope =  w.$e.find('[name=doc_tope]').val().toUpperCase();
		erpDoc.doc_tdoc =  w.$e.find('[name=doc_tdoc]').val().toUpperCase();
		erpDoc.doc_ndoc =  w.$e.find('[name=doc_ndoc]').val().toUpperCase();
  	erpDoc.doc_fact =  w.$e.find('[name=doc_fact]').val().toUpperCase();
  	erpDoc.doc_guia =  w.$e.find('[name=doc_guia]').val().toUpperCase();
		erpDoc.doc_tcon =  (w.$e.find('[name=doc_tope]').val() == 'VENTA') ? 'SALIDA' : 'INGRESO';
		erpDoc.doc_etdo =  w.$e.find('[name=ent_tdoc]').val().toUpperCase();
		erpDoc.doc_endo =  w.$e.find('[name=ent_ndoc]').val().toUpperCase();
		erpDoc.doc_enom =  w.$e.find('[name=ent_nomb]').val().toUpperCase();
		erpDoc.doc_edir =  w.$e.find('[name=ent_dire]').val().toUpperCase();
		erpDoc.doc_femi =  w.$e.find('[name=doc_femi]').val().toUpperCase();
// erpDoc.doc_dref = w.$e.find('[name=doc_tdoc]').val().toUpperCase();
		erpDoc.doc_tven =  w.$e.find('[name=doc_tven]').val().toUpperCase();
		erpDoc.doc_fpag =  w.$e.find('[name=doc_fpag]').val().toUpperCase();
		erpDoc.doc_tmon =  'SOLES';
		erpDoc.doc_dcto =  0.00;
		erpDoc.doc_tsub =  parseFloat(w.$e.find('[name=doc_tsub]').val());
		erpDoc.doc_tigv =  parseFloat(w.$e.find('[name=doc_tigv]').val());
		erpDoc.doc_tota =  parseFloat(w.$e.find('[name=doc_tota]').val());
		erpDoc.doc_dimp =  w.$e.find('[name=doc_dimp]').val().toUpperCase();
		erpDoc.doc_vers =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
		
		detd.obtenerDatoDlgDetalle(w);
		
	},
	obtenerDatoDlgDetalle: function(w){

		admArt.art_kyart = w.$e.find('[name=art_kyart]').val().toUpperCase();
		admArt.art_kycom = USERDATA.com.com_kycom;
		admArt.art_codi = w.$e.find('[name=art_codi]').val().toUpperCase();
		admArt.art_unid = w.$e.find('[name=art_unid]').val().toUpperCase();
		admArt.art_nomb = w.$e.find('[name=art_nomb]').val().toUpperCase();
		admArt.art_pres = w.$e.find('[name=art_pres]').val().toUpperCase();
		admArt.art_conc = w.$e.find('[name=art_conc]').val().toUpperCase();
		admArt.art_titu = w.$e.find('[name=art_titu]').val().toUpperCase();
		admArt.art_frsn = w.$e.find('[name=art_frsn]').val().toUpperCase();
		admArt.art_cant = parseInt(w.$e.find('[name=art_cant]').val());
		admArt.art_sact = parseInt(w.$e.find('[name=art_sact]').val());
		admArt.art_pcos = parseFloat(w.$e.find('[name=art_pcos]').val());
		admArt.art_pund = parseFloat(w.$e.find('[name=art_pund]').val());
		admArt.art_impo = parseFloat(w.$e.find('[name=art_impo]').val());

		erpDtd.dtd_kydtd = 0;
		erpDtd.dtd_kyart = w.$e.find('[name=art_kyart]').val().toUpperCase();
		erpDtd.dtd_dscr = admArt.art_nomb+' : '+admArt.art_pres+' '+admArt.art_conc+' '+admArt.art_titu;
		erpDtd.dtd_unid = w.$e.find('[name=art_unid]').val().toUpperCase();
		erpDtd.dtd_cant = parseInt(w.$e.find('[name=art_cant]').val());
		erpDtd.dtd_pund = (w.$e.find('[name=doc_tope]').val() == 'VENTA') ? parseFloat(w.$e.find('[name=art_pund]').val()) : parseFloat(w.$e.find('[name=art_pcos]').val());
		erpDtd.dtd_pant = parseFloat(w.$e.find('[name=art_pcos]').val());
		erpDtd.dtd_dcto = 0.00;
		erpDtd.dtd_pdto = erpDtd.dtd_pund;

	},
	nuevoDetdocumento: function(w){
		Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc: USERDATA.suc.suc_kysuc, prp_secc: 'NUMDOC', prp_dscr: w.$e.find('[name=doc_tdoc]').val(), prp_nive: 2}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
			  parPrp = rpta.lista.items[0];
			  w.$e.find('[name=doc_ndoc]').val(Sisem.llenarCeros(parPrp.prp_prop, 3) + '-' + Sisem.llenarCeros(parseInt(parPrp.prp_valu)+1, 6));
			} else {
				w.$e.find('[name=doc_ndoc]').val('001-000000');
			}
		});
		
		Sisem.ejecutar('cmn/GetListaUsuario',{usu_kycom: USERDATA.com.com_kycom, prf_nomb: ((w.tipo=='VENTA') ? 'CLIENTE' : 'PROVEEDOR'),  usu_nomb: ((w.tipo=='VENTA') ? 'CLIENTE TEMPORAL' : 'PROVEEDOR TEMPORAL')}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
			  cmnUsu = rpta.lista.items[0];
			  w.$e.find('[name=ent_kyusu]').val(cmnUsu.usu_kyusu);
			  w.$e.find('[name=ent_tdoc]').val(cmnUsu.usu_tdoc);
			  w.$e.find('[name=ent_ndoc]').val(cmnUsu.usu_ndoc);
			  w.$e.find('[name=ent_nomb]').val(cmnUsu.usu_nomb);
			  w.$e.find('[name=ent_dire]').val(cmnUsu.usu_dire);
			}
		});
		w.$e.find('[name=doc_fpag]').val('CONTADO');
		w.$e.find('[name=doc_tven]').val('MENOR');
	},
	llenarGridDoc:function(w, parDoc, parLisDtd, parLisArt){
		if(parLisDtd!=null){
			w.$e.find('[name=gridItemDoc]').children().remove();
			parDoc.doc_tota = 0.00;
			
			var totItem = 0;
			var totArti = 0;

			for(var iteDtd=0;iteDtd<parLisDtd.length;iteDtd++){
				var filaDtd = parLisDtd[iteDtd];
				var $row = w.$e.find('[name=gridRef]').clone().children();
				
				$row.find('[name=grid_dtd_cant]').html(Sisem.roundFloat(filaDtd.dtd_cant, 0));
				$row.find('[name=grid_dtd_dscr]').html(filaDtd.dtd_dscr);
				$row.find('[name=grid_dtd_pund]').html(Sisem.redondeoString(filaDtd.dtd_pund));
				$row.find('[name=grid_dtd_dcto]').html(Sisem.redondeoString(filaDtd.dtd_dcto));
				$row.find('[name=grid_dtd_pdto]').html(Sisem.redondeoString(filaDtd.dtd_pdto));
				$row.find('[name=grid_dtd_impo]').html(Sisem.redondeoString(filaDtd.dtd_impo));
				$row.find('[name=grid_dtd_sact]').html(filaDtd.dtd_sact);
				$row.find('[name=grid_dtd_pcos]').html(Sisem.redondeoString(filaDtd.dtd_pcos));
				
				indice = Sisem.indiceListaObjeto(parLisArt, 'art_kyart', filaDtd.dtd_kyart);
				if (indice != -1){
					varArt = parLisArt[indice];
					$row.find('[name=grid_art_pund]').html(Sisem.redondeoString(varArt.art_pund));
				}

				$row.data('data',filaDtd);
				w.$e.find('[name=gridItemDoc]').append($row);

				parDoc.doc_tota = parDoc.doc_tota + filaDtd.dtd_impo;
				
				totArti = totArti + filaDtd.dtd_cant;
				totItem++;
			}

			w.$e.find('[name=val_item]').val(totItem);
			w.$e.find('[name=val_arti]').val(Sisem.roundFloat(totArti, 0));
			
			parDoc.doc_tsub = Sisem.redondeoDouble(parDoc.doc_tota / 1.18);
			parDoc.doc_tigv = Sisem.redondeoDouble(parDoc.doc_tsub * 0.18);

			if(!w.$e.find('[name=doc_cigv]').is(':checked'))
			{
				parDoc.doc_tsub = parDoc.doc_tota;
				parDoc.doc_tigv = parDoc.doc_tsub * (Sisem.getProp('MISC','IGV',18.00)/100);
				parDoc.doc_tota = parDoc.doc_tsub + parDoc.doc_tigv;
			}
			w.$e.find('[name=doc_dcto]').val(Sisem.redondeoString(0.00));
			w.$e.find('[name=doc_tsub]').val(Sisem.redondeoString(parDoc.doc_tsub));
			w.$e.find('[name=doc_tigv]').val(Sisem.redondeoString(parDoc.doc_tigv));
			w.$e.find('[name=doc_tota]').val(Sisem.redondeoString(parDoc.doc_tota));
			
		}else{
			w.$e.find('[name=doc_dcto]').val(0.00);
			w.$e.find('[name=doc_tsub]').val(0.00);
			w.$e.find('[name=doc_tigv]').val(0.00);
			w.$e.find('[name=doc_tota]').val(0.00);
		}
	},
	ingresarDetdocumentoEnListaDetdocumento: function(parDoc, parDtd, parArt, parLisDtd, parLisArt, callback) 
	{
		resp = false;
		if(Sisem.indiceListaObjeto(parLisDtd, 'dtd_kyart', parArt.art_kyart) > -1) 
		{
			Sisem.eliminarItemListaObjeto(parLisArt, 'art_kyart', parArt.art_kyart);
			Sisem.eliminarItemListaObjeto(parLisDtd, 'dtd_kyart', parArt.art_kyart);
		}
		if(Sisem.indiceListaObjeto(parLisDtd, 'dtd_kyart', parArt.art_kyart) == -1) 
		{
			Sisem.ejecutar('adm/GetListaArticulo',{method: 'getStockArticuloLocal', art_kycom: USERDATA.com.com_kycom, suc_kysuc:USERDATA.suc.suc_kysuc, art_kyart: parArt.art_kyart}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					itemDtd = rpta.lista.items[0];			
					stockTotal = parseInt(itemDtd.art_sact);
					stockLocal = parseInt(itemDtd.suc_sact);

					parArt.art_pcos = Sisem.redondeoDouble(itemDtd.art_pcos);
					parArt.art_impo = Sisem.redondeoDouble(stockTotal * parArt.art_pcos);
				}

				parArt.art_sact = stockTotal;

				if ( parDtd.dtd_cant > 0 ) {
					if ( parDtd.dtd_pund > 0 ) {
						if (( parDoc.doc_tope == 'VENTA' && parDtd.dtd_cant <= stockLocal ) || ( parDoc.doc_tope == 'VENTA_ANULADA') || ( parDoc.doc_tope == 'COMPRA' ) || ( parDoc.doc_tope == 'COMPRA_ANULADA' ) && parDtd.dtd_cant <= stockLocal ) {
							
							detd.calcularRegistroDetDetdocumento(parDoc, parDtd, parArt);
			
							Sisem.verificarListaObjeto(parLisArt, 'art_kyart', parArt);
							Sisem.verificarListaObjeto(parLisDtd, 'dtd_kyart', parDtd);
			
							resp = true;
						}
						else if (parDtd.dtd_cant > stockLocal) 
						{
							Sisem.msgBox('error', "¡¡¡EN LA TIENDA " + USERDATA.suc.suc_nomb + "\nSOLO TIENE " + stockLocal + " EN STOCK!!!");
							resp = false;
						}
					} else {
						Sisem.msgBox('error', "¡¡¡EN LA TIENDA " + USERDATA.suc.suc_nomb + "\nEl precio de venta es "+parDtd.dtd_pund);
						resp = false;
					}
				} else {
					Sisem.msgBox('error', "<p>¡¡¡EN LA TIENDA " + USERDATA.suc.suc_nomb + "</p>\nDebe ingresar una cantidad mayor a "+parDtd.dtd_cant);
					resp = false;
				}
				if(typeof callback == 'function'){callback(resp);};
			});
		}
	},
	calcularRegistroDetDetdocumento: function(parDoc, parDtd, parArt) 
	{
		parArt.art_cant = parseInt(parArt.art_cant);
		parArt.art_sact = parseInt(parArt.art_sact);
		parArt.art_pcos = parseInt(parArt.art_pcos);
		parArt.art_pund = parseInt(parArt.art_pund);
		parArt.art_impo = parseInt(parArt.art_impo);

		parDtd.dtd_cant = parseInt(parDtd.dtd_cant);
		parDtd.dtd_pund = parseFloat(parDtd.dtd_pund);
		parDtd.dtd_pant = parseFloat(parDtd.dtd_pant);
		parDtd.dtd_dcto = parseFloat(parDtd.dtd_dcto);
		parDtd.dtd_pdto = parseFloat(parDtd.dtd_pdto);
		
		var importe = parDtd.dtd_cant * parDtd.dtd_pund;
		var stockActual = 0;
		var totalValorizado = parArt.art_impo, precioCosto = parArt.art_pcos;
		if (parDoc.doc_tcon == "INGRESO") {
			if (importe > 0) 
			{
				stockActual = parArt.art_sact + parDtd.dtd_cant;
				totalValorizado = parDoc.doc_tope=="TRASLADO" ? parArt.art_impo : (parArt.art_impo + importe);
				precioCosto = parDoc.doc_tope=="TRASLADO" ? parArt.art_pcos : (totalValorizado / stockActual);
			}
		} else if (parDoc.doc_tcon == "SALIDA")
		{
			if (importe > 0) {

				stockActual = parArt.art_sact - parDtd.dtd_cant;
				if (stockActual == 0) {

					totalValorizado = 0.00;
					precioCosto = 0.00;
					
				}
				else {

					totalValorizado = parDoc.doc_tope=="TRASLADO" ? parArt.art_impo : (parArt.art_impo - importe);
					precioCosto = parDoc.doc_tope=="TRASLADO" ? parArt.art_pcos : (totalValorizado / stockActual);
					
				}
			}
		}

		if (parDoc.doc_tcon == "INGRESO") {
			parDtd.dtd_ingr = parDtd.dtd_cant;
			parDtd.dtd_egre = 0;
		} else if (parDoc.doc_tcon == "SALIDA") {
			parDtd.dtd_ingr = 0;
			parDtd.dtd_egre = parDtd.dtd_cant;
		}

		parDtd.dtd_acod = parArt.art_codi;
		parDtd.dtd_sact = stockActual;
		parDtd.dtd_impo = Sisem.redondeoDouble(importe);
		parDtd.dtd_pcos = Sisem.redondeoDouble(precioCosto);
		parDtd.dtd_valo = Sisem.redondeoDouble(totalValorizado);
	}
};
