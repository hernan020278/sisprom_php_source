var docu = {
	pag:{
		alias		: 'Documento',
		nameWB		: 'brwDocumento',
		nameWP		: 'winDocumento',
		nameWS		: 'selDocumento',
		nameWI		: 'intDocumento',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwDocumento',
		idGridWP	: 'idWinDocumento',
		idGridWS	: 'idSelDocumento',
		idGridWI	: 'idIntDocumento'
	},
	tipPag: {
		"DOCUMENTO":{'name': 'Documento', 'alias': 'Documento general'},
		"COMPRA":{'name': 'Compra', 'alias': 'Compra'},
		"VENTA":{'name': 'Venta', 'alias': 'Venta'},
		"TRASLADO":{'name': 'Traslado', 'alias': 'Traslado entre almacenes'}
	},
	tipPagAct: '',
	// //////////////////////
	// Metodhs of Interface//
	// //////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/usua','adm/arti','erp/detd','ent/admArt','ent/erpDoc','ent/erpDtd','ent/cmnEnt','ent/cmnPrf','ent/admCco','ent/admOpe']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init: function(w){
		if(w==null)w=new Object();
		docu.winBrow(w);
	},
	winBrow: function(w){
		docu.import(function(){
			if(w==null)w=new Object;
			docu.setPagina(w);
			docu[w.pag.nameWB]=w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					
					/************************
					 **INICIO: BOTON GRAFICO*
					 ************************/
					w.$e.find('[name=btnDashGrafico]').on('click',function(){
						var doc_fini = moment(new Date()).add(-6,'days').format('YYYY-MM-DD');				
						var doc_ffin = moment(new Date()).format('YYYY-MM-DD');

						var valorMaximoDash = 0.00;
						
						var listaVentasJS = Array();
						var listaComprasJS = Array();
						var arrLongDia = Array();
						
						for(var iteDia=0; iteDia<7; iteDia++)
						{
							arrLongDia.push((new Date(moment(new Date()).add(-6+iteDia,'days').format('YYYY/MM/DD'))).getTime());
							listaVentasJS.push([arrLongDia[iteDia], 0.00]);
							listaComprasJS.push([arrLongDia[iteDia], 0.00]);
						}
						Sisem.ejecutar('erp/GetListaDocumento',{method: 'obtenerTotalPeriodo', doc_fini: doc_fini, doc_ffin: doc_ffin}, function(rpta){

							if(rpta.lista.listaVentasDB.length > 0)
							{
								for(var iteFil=0; iteFil<rpta.lista.listaVentasDB.length; iteFil++)
								{
									var fila = rpta.lista.listaVentasDB[iteFil];
									
									for(var iteDia=0; iteDia<listaVentasJS.length; iteDia++)
									{
										if(moment(listaVentasJS[iteDia][0]).format('YYYY/MM/DD') == moment(fila.doc_femi).format('YYYY/MM/DD'))
										{
											listaVentasJS[iteDia][1] =  parseFloat(fila.doc_tota);
											valorMaximoDash = ( parseFloat(fila.doc_tota)>valorMaximoDash ? parseFloat(fila.doc_tota) : valorMaximoDash );
											break;
										}
									}//for(var iteDia=0; iteDia<arrLongDia.length; iteDia++)
								}
							}
							if(rpta.lista.listaComprasDB.length > 0)
							{
								for(var iteFil=0; iteFil<rpta.lista.listaComprasDB.length; iteFil++)
								{
									var fila = rpta.lista.listaComprasDB[iteFil];
									
									for(var iteDia=0; iteDia<listaComprasJS.length; iteDia++)
									{
										if(moment(listaComprasJS[iteDia][0]).format('YYYY/MM/DD') == moment(fila.doc_femi).format('YYYY/MM/DD'))
										{
											listaComprasJS[iteDia][1] =  parseFloat(fila.doc_tota);
											valorMaximoDash = ( parseFloat(fila.doc_tota)>valorMaximoDash ? parseFloat(fila.doc_tota) : valorMaximoDash );
											break;
										}
									}//for(var iteDia=0; iteDia<arrLongDia.length; iteDia++)
								}
							}
							 /**********************************
								*INICIO: CONFIGURACION DASHBOARD *
								**********************************/
								// TAB THREE GRAPH //
								/* TAB 3: Revenew  */
								$(function() {
									var toggles = $("#rev-toggles"), target = $("#flotcontainer");

									var data = [{
										label : "Ventas",
										data : listaVentasJS,
										color : genColor['ROJO'],
										lines : {
											show : true,
											lineWidth : 1,
											fill : true,
											fillColor : {
												colors : [{
													opacity : 0.1
												}, {
													opacity : 0.13
												}]
											}
										},
										points : {
											show: true
										}
									},
									{
										label : "Compras",
										data : listaComprasJS,
										color : genColor['AZUL'],
										lines : {
											show : true,
											lineWidth : 1,
											fill : true,
											fillColor : {
												colors : [{
													opacity : 0.1
												}, {
													opacity : 0.13
												}]
											}
										},
										points : {
											show: true
										}
									}]

									var options = {
										grid : {
											hoverable : true,
											borderWidth : 1,
											borderColor : '#4B4B4B',
											labelMargin : 1
										},
										tooltip : true,
										tooltipOpts : {
											content: '%x - %y',
											//dateFormat: '%b %y',
											defaultTheme : false
										},
										xaxis : {
											ticks : [
												[arrLongDia[0], moment(arrLongDia[0]).format('dddDD').toUpperCase()], 
												[arrLongDia[1], moment(arrLongDia[1]).format('dddDD').toUpperCase()], 
												[arrLongDia[2], moment(arrLongDia[2]).format('dddDD').toUpperCase()], 
												[arrLongDia[3], moment(arrLongDia[3]).format('dddDD').toUpperCase()], 
												[arrLongDia[4], moment(arrLongDia[4]).format('dddDD').toUpperCase()], 
												[arrLongDia[5], moment(arrLongDia[5]).format('dddDD').toUpperCase()],
												[arrLongDia[6], moment(arrLongDia[6]).format('dddDD').toUpperCase()]
											]
										},
										yaxes : {
											tickFormatter : function(val, axis) {
												return "$" + val;
											},
											max : valorMaximoDash + 200
										}
									};

									plot2 = null;

									function plotNow() {
										var d = [];
										toggles.find(':checkbox').each(function() {
											if ($(this).is(':checked')) {
												d.push(data[$(this).attr("name").substr(4, 1)]);
											}
										});
										if (d.length > 0) {
											if (plot2) {
												plot2.setData(d);
												plot2.draw();
											} else {
												plot2 = $.plot(target, d, options);
											}
										}

									};

									toggles.find(':checkbox').on('change', function() {
										plotNow();
									});
									plotNow()

								});//$(function() {	
						   /*******************************
								*FIN: CONFIGURACION DASHBOARD *
								*******************************/
						});//Sisem.ejecutar('erp/GetListaDocumento',{method: 'obtenerTotalPeriodo', doc_fini: doc_fini, doc_ffin: doc_ffin}, function(rpta){
						w.$e.find('[name="etiDashActual"]').html("Grafico");
					});//w.$e.find('[name=btnDashGrafico]').on('click',function(){
					
					docu.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));

				}
			});
		});
	},
	winPop:function(w){
		docu.import(function(){
			if(w==null)w=new Object;
			docu.setPagina(w);
			docu[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				politicaSeguridad: w.politicaSeguridad,
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
							docu.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						placeholder : "Presione ENTER",
						click : function() {
							docu.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
									
					docu.iniciarFormularioRx(w, function(rpta){
						
						docu.refrescarFormulario(w);
		        docu.validarFormulario(w, w.modo);
		        
						Sisem.formato(w);
						Sisem.unblockW(w.$e);

					});
				}
			});
		});
	},
	winSel:function(w){
		docu.import(function(){
			if(w==null)w=new Object;
			docu.setPagina(w);
			docu[w.pag.nameWS] = w;
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
									docu.cerrarFormulario(w);
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
											docu.cerrarFormulario($.extend(w, {data: data}));
									}else{
										Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
									}						
								}
							}
						},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							docu.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					docu.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, multiSelect: true, autoWidth: false}));
					Sisem.unblockW(w.$e);
				}
			});
		});
	},
	// ////////////////////////////
	// Metodhs of Data Management//
	// ////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['erp/brw_docu']}, function(rpta){
			if(rpta){brw_docu.ejecutar($.extend(w,{modulo:'controllers', archivo: 'erp/brw_docu'}));}
		});				
	},
	iniciarFormularioRx:function(w, callback){
		docu.limpiarFormulario(w);
		docu.configurarComponentesRx(w, function(rpta){
			docu.llenarDataEnComponentesRx(w, function(rpta){
				if(w.modo=='VISUALIZAR'){
					docu.llenarFormularioRx(w, function(rpta){
						return callback(rpta);
					});
				} else if(w.modo=='AGREGAR'){
					docu.nuevoRegistroRx(w, function(rpta){
						w.$e.find('[name=cco_nomb]').trigger('change');
						w.$e.find('[name=doc_tdoc]').trigger('change');

						w.$e.find('[name=doc_fpag]').val('CONTADO');
						w.$e.find('[name=doc_tven]').val('MENOR');
						w.$e.find('[name=ent_ndoc]').focus();							

						return callback(rpta);
					});
				}
			});
		});
	},
	configurarComponentesRx(w, callback){
		w.$e.on('change','[name=cco_nomb]',function(idx){
			admCco = $(this).find(":selected").data('data');
		});

		w.$e.on('change','[name=doc_tdoc]',function(){
			if($(this).val())
			{
				Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc:USERDATA.suc.suc_kysuc, prp_secc: 'NUMDOC', prp_dscr: $(this).val()}, function(rpta){
					if(rpta.lista.items.length > 0)
					{
						var prp = rpta.lista.items[0];
						w.$e.find('[name=doc_ndoc]').val(Sisem.llenarCeros(prp.prp_prop, 3) + '-' + Sisem.llenarCeros(parseInt(prp.prp_valu)+1, 6));
					}
					else
					{
						w.$e.find('[name=doc_ndoc]').val('1-1');
					}
					var titleNumDoc = ' '+w.$e.find('[name=doc_tdoc]').val()+' '+w.$e.find('[name=doc_ndoc]').val();
					if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.modo+' '+w.pag.alias+' '+titleNumDoc);}
					else{w.$e.parent().find('.ui-dialog-title').html(w.modo+' '+w.pag.alias+' '+titleNumDoc);}				
				});
			}
		});
		
		w.$e.on('change','[name=doc_fpag]',function(){
			if($(this).val() == "CONTADO")
			{
			  Sisem.activar(w.$e.find('[name=doc_tpag]'), false);
			} else {
			  Sisem.activar(w.$e.find('[name=doc_tpag]'), true);
			  Sisem.validarControlesColor(w.$e,'cco, doc, ent, usu, suc, art, dtd',w.modo)
			}
		});


		w.$e.on('click','[name=btnDelRow]',function(){
			if(docu.validarFormulario(w, 'VALIDAR')){
				var art_kyart = $(this).closest('tr').data('data').dtd_kyart;
				if(Sisem.indiceListaObjeto(pubLisDtd, 'dtd_kyart', art_kyart) > -1) 
				{
					Sisem.eliminarItemListaObjeto(pubLisArt, 'art_kyart', art_kyart);
					Sisem.eliminarItemListaObjeto(pubLisDtd, 'dtd_kyart', art_kyart);
				}
				docu.llenarGridDoc(w, erpDoc, pubLisDtd, pubLisArt);
			}
		});

		w.$e.find("[name=doc_cigv]").on("change", function(event){
			$(this).attr('disabled', true);
		});

		//------------------------------------------------------------
		// KEYPRESS PARA NAVEGAR AL PRESIONAR ENTER
		//------------------------------------------------------------
		w.$e.find("[name=cco_nomb]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=doc_tdoc]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=doc_tdoc]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ent_tdoc]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ent_tdoc]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ent_ndoc]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ent_ndoc]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ent_nomb]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ent_nomb]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ent_dire]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ent_dire]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
				if(w.$e.find('[name=doc_tope]').val() == 'VENTA') 
				{
					w.$e.find('[name=doc_fpag]').focus();				    	
				}
				else if(w.$e.find('[name=doc_tope]').val() == 'COMPRA')
				{
					w.$e.find('[name=doc_fact]').focus();				    	
				}
				event.preventDefault();
	    }
		});
		w.$e.find("[name=doc_fact]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=doc_guia]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=doc_guia]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=doc_fpag]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=doc_fpag]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
				docu.desactivarDlgDocumento(w);
				w.$e.find('[name=art_combo]').focus();
				event.preventDefault();
	    }
		});
		w.$e.find("[name=art_combo]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13)
	    {
				w.$e.find('[name=art_pund]').focus();
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=art_pund]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13)
	    {
				if(w.$e.find('[name=doc_tope]').val() == 'VENTA') 
				{
					w.$e.find('[name=dtd_cant]').focus();				    	
				}
				else if(w.$e.find('[name=doc_tope]').val() == 'COMPRA')
				{
					w.$e.find('[name=art_nomb]').focus();				    	
				}
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=art_nomb]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13)
	    {
				w.$e.find('[name=art_marc]').focus();
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=art_marc]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13)
	    {
				w.$e.find('[name=art_unid]').focus();
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=art_unid]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13)
	    {
				w.$e.find('[name=dtd_cant]').focus();
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=dtd_cant]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13 && w.tipo=='VENTA') 
	    {
	    	docu.obtenerDatoDlgDocumento(w);

	    	docu.ingresarDetdocumentoEnListaDetdocumento(erpDoc, erpDtd, admArt, pubLisDtd, pubLisArt, function(resp){
	    		if(resp==true){
						docu.llenarGridDoc(w, erpDoc, pubLisDtd, pubLisArt);
			    	w.$e.find("[name=art_combo]").val('');
			    	w.$e.find("[name=dtd_cant]").val('');
	    		}
	    	});
				w.$e.find('[name=doc_tpag]').focus();
				event.preventDefault();
	    }
			else if ( ((event.which) ? event.which : event.keyCode)==13 && w.tipo=='COMPRA')
			{
				w.$e.find('[name=dtd_pcos]').focus();
				event.preventDefault();
			}
			
		});	
		w.$e.find("[name=dtd_pcos]").on("keypress", function (event) {
			console.log(w.tipo);
	    if ( ((event.which) ? event.which : event.keyCode)==13 && w.tipo=='COMPRA') 
	    {
	    	docu.obtenerDatoDlgDocumento(w);

	    	docu.ingresarDetdocumentoEnListaDetdocumento(erpDoc, erpDtd, admArt, pubLisDtd, pubLisArt, function(resp){
	    		if(resp==true){
						docu.llenarGridDoc(w, erpDoc, pubLisDtd, pubLisArt);
						
						w.$e.find('[name=art_combo]').val('');
						w.$e.find('[name=art_nomb]').val('');
						w.$e.find('[name=art_unid]').val('');
						w.$e.find('[name=art_pres]').val('');
						w.$e.find('[name=art_conc]').val('');
						w.$e.find('[name=art_marc]').val('');
						w.$e.find('[name=art_titu]').val('');
						w.$e.find('[name=art_frsn]').val('');
						w.$e.find('[name=art_pcos]').val('');
						w.$e.find('[name=art_pund]').val('');
						w.$e.find('[name=dtd_cant]').val('');
						w.$e.find('[name=dtd_pcos]').val('');
	    		}
	    	});

				w.$e.find('[name=doc_tpag]').focus();
				event.preventDefault();
			} 
		});
		w.$e.find("[name=doc_tpag]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
				w.$e.find('[name=art_combo]').focus();
				event.preventDefault();
	    }
		});
		w.$e.find("[name=doc_tpag]").on("keyup", function (event) {

			var doc_tpag = parseFloat($(this).val());
			w.$e.find('[name=doc_vuel]').val((doc_tpag > erpDoc.doc_tota) ? Sisem.redondeoString(doc_tpag - erpDoc.doc_tota) : 0.00);
		});

		w.$e.find("[name=art_frsn]").datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});

		usua.usuarioAutocomplete($.extend(w, {prf_nomb: ( (w.tipo=='VENTA') ? 'CLIENTE' : 'PROVEEDOR'), prf_inpu: 'ent_ndoc', prf_sele: 0}));
		usua.usuarioAutocomplete($.extend(w, {prf_nomb: ( (w.tipo=='VENTA') ? 'CLIENTE' : 'PROVEEDOR'), prf_inpu: 'ent_nomb', prf_sele: 0}));
		arti.articuloAutocomplete($.extend(w, {art_sact: ( (w.tipo=='VENTA') ? 0 : -1 ), prf_grup: 'ARTICULO', prf_inpu: 'art_combo', prf_sele: 0}));
		return callback({msg: {type: 'success', text: ''}});
	},
	llenarDataEnComponentesRx: function(w, callback){
		Sisem.ejecutar('adm/GetListaCtacorriente',{cco_kycom: USERDATA.com.com_kycom}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
				for(var iteCta=0; iteCta<rpta.lista.items.length; iteCta++)
				{
					var fila = rpta.lista.items[iteCta];
					$option = $('<option value="'+fila.cco_kycco+'">'+fila.usu_nomb.substring(0,3)+fila.bnc_prop+fila.cco_ndoc.substring(fila.cco_ndoc.length-4,fila.cco_ndoc.length)+'</option>');
					$option.data('data', fila);
					w.$e.find('[name=cco_nomb]').append($option);	
				}
			}
			Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc: USERDATA.suc.suc_kysuc, prp_secc: 'NUMDOC', prp_nive: 2}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					w.$e.find('[name=doc_tdoc]').empty();
					for(var itePrp=0; itePrp<rpta.lista.items.length; itePrp++){
						w.$e.find('[name=doc_tdoc]').append('<option value="'+rpta.lista.items[itePrp].prp_dscr+'">'+rpta.lista.items[itePrp].prp_dscr+'</option>');
					}
				}
				return callback(rpta);
			});
		});
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

		docu.limpiarInstancias(w);

		w.$e.find('[name=doc_cigv]').attr('checked', 'checked');
		
		w.$e.find('[name=suc_kysuc]').val($('[name=main_kysuc]').val());
		w.$e.find('[name=suc_nomb]').val($('[name=main_kysuc] option:selected').html());
		w.$e.find('[name=doc_tope]').val(w.tipo);
//	w.$e.find('[name=doc_tdoc]').val((w.tipo=='VENTA') ? 'TICKET' : 'GUIA');
		w.$e.find('[name=doc_ndoc]').val('');
		w.$e.find('[name=doc_femi]').val(moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
		w.$e.find('[name=ent_tdoc]').val((w.tipo=='VENTA') ? 'DNI' : 'RUC');
		w.$e.find('[name=ent_ndoc]').val('');
		w.$e.find('[name=ent_nomb]').val('');
		w.$e.find('[name=ent_dire]').val('');
		w.$e.find('[name=ent_mail]').val('');
		w.$e.find('[name=usu_nomb]').val(USERDATA.usu.usu_nomb);
		w.$e.find('[name=doc_fpag]').val('');
		w.$e.find('[name=doc_tven]').val('');
		w.$e.find('[name=doc_tpag]').val('0.00');


		w.$e.find('[name=art_combo]').val('');
		w.$e.find('[name=art_pund]').val('');
		
		w.$e.find('[name=val_item]').val('0');
		w.$e.find('[name=val_arti]').val('0');

  	w.$e.find('[name=gridItemDoc]').children().remove();
	},
	obtenerDatoFormulario: function(w){},
	llenarFormularioRx:function(w, callback){
		Sisem.blockW(w.$e);
		if(w.ky>0){w.$e.find('[name=doc_kydoc]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=doc_kydoc]').val())){
			Sisem.ejecutar('erp/GetListaDocumento',{doc_kydoc: w.$e.find('[name=doc_kydoc]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					$.extend(erpDoc, fila);

					w.$e.find('[name=doc_kydoc]').val(fila.doc_kydoc);
					w.$e.find('[name=suc_nomb]').val(fila.suc_nomb);
					w.$e.find('[name=doc_tope]').val(fila.doc_tope);

					if(fila.doc_cigv == 1){w.$e.find('[name=doc_cigv]').attr('checked', 'checked');}
					else{w.$e.find('[name=doc_cigv]').removeAttr('checked');}

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
					w.$e.find('[name=doc_tpag]').val(Sisem.redondeoString(fila.doc_tpag));
					w.$e.find('[name=doc_tsub]').val(Sisem.redondeoString(fila.doc_tsub));
					w.$e.find('[name=doc_tigv]').val(Sisem.redondeoString(fila.doc_tigv));
					w.$e.find('[name=doc_tota]').val(Sisem.redondeoString(fila.doc_tota));
				}
				Sisem.ejecutar('erp/GetListaDetdocumento',{dtd_kydoc: w.$e.find('[name=doc_kydoc]').val()}, function(rpta){
					if(rpta.lista.items.length > 0){
						pubLisDtd = rpta.lista.items;
						docu.llenarGridDoc(w, erpDoc, pubLisDtd, {});
					}
					return callback(rpta);
				});
			});
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
				
				docu.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				docu.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				docu.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=suc_nomb]'), false);
//		w.$e.find('[name=doc_cigv]').attr('disabled', w.activar);
		
		if(w.tipo=='VENTA'){w.$e.find('[name=doc_cigv]').attr('disabled', true);}
		else{w.$e.find('[name=doc_cigv]').attr('disabled', !w.activar);}
		
		Sisem.activar(w.$e.find('[name=doc_tope]'), false);
		Sisem.activar(w.$e.find('[name=doc_femi]'), false);
		Sisem.activar(w.$e.find('[name=doc_tdoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=doc_ndoc]'), false);
		Sisem.activar(w.$e.find('[name=doc_tmon]'), false);
		Sisem.activar(w.$e.find('[name=cco_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_tdoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_ndoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=ent_dire]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_nomb]'), false);		
		Sisem.activar(w.$e.find('[name=doc_fpag]'), w.activar);
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
		Sisem.activar(w.$e.find('[name=eti_tpag]'), false);
		Sisem.activar(w.$e.find('[name=doc_tpag]'), w.activar);
		Sisem.activar(w.$e.find('[name=eti_vuel]'), false);
		Sisem.activar(w.$e.find('[name=doc_vuel]'), false);

		Sisem.activar(w.$e.find('[name=art_combo]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_marc]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_unid]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pres]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_conc]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_titu]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_frsn]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pcos]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pund]'), w.activar);

		Sisem.activar(w.$e.find('[name=dtd_cant]'), w.activar);
		Sisem.activar(w.$e.find('[name=dtd_pcos]'), w.activar);
	},
	validarFormulario:function(w, tipo){
		if(!Sisem.validarControlesColor(w.$e,'cco, doc, ent, usu, suc, art, dtd', tipo))
		{
			return false;
		}
		if(tipo=='VALIDAR')
		{
			if(w.$e.find('[name=gridItemDoc] tr').length>0){
				for(var i=0;i<w.$e.find('[name=gridItemDoc] tr').length;i++){
					var $row = w.$e.find('[name=gridItemDoc] tr').eq(i);
					var item_cant=parseFloat($row.find('[name=item_cant]').val());
					var item_pope = parseFloat($row.find('[name=item_pope]').val());
					var ccot = parseFloat($row.data('data').dtd_ccot);
					
				}
			}else{
				Sisem.msgBox('error','El documento no tiene items!!!');
				return false;
			}

			erpDoc.doc_tota = parseFloat(w.$e.find('[name=doc_tota]').val());
			erpDoc.doc_tpag = parseFloat(w.$e.find('[name=doc_tpag]').val());
			
			if(w.$e.find('[name=doc_fpag]').val() == 'CONTADO')
			{
				if(erpDoc.doc_tpag < erpDoc.doc_tota)
				{
					Sisem.msgBox('error','El efectivo es menor al total');
					return false;
				}
				erpDoc.doc_tpag = erpDoc.doc_tota;
			}
			else if(w.$e.find('[name=doc_fpag]').val() == 'CREDITO')
			{
				if(erpDoc.doc_tpag > erpDoc.doc_tota)
				{
					erpDoc.doc_tpag = erpDoc.doc_tota;
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='COMPRA';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: docu.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+docu.tipPag[w.tipo]['name'],
			nameWP		: 'win'+docu.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+docu.tipPag[w.tipo]['name'],
			nameWI		: 'int'+docu.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+docu.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+docu.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+docu.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+docu.tipPag[w.tipo]['name']
		});
		docu.tipPagAct = w.tipo;
	},
	// ////////////////
	// Metodhs Events//
	// ////////////////
	btnAddClick: function(w){
		docu.winPop({
			politicaSeguridad: 'NUEVO_DOCUMENTO',
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
			docu.iniciarFormularioRx(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(docu.validarFormulario(w, 'VALIDAR')){
				Sisem.blockW(w.$e);
				
				docu.verificarNumeroOperacionDocumentoRx(w, function(rpta){

					erpDoc.doc_kydoc = ((w.modo=='AGREGAR')?'0':w.$e.find('[name=doc_kydoc]').val());
					
					var data = $.extend(data, {comando: w.modo , doc: erpDoc, lisDtd: pubLisDtd, lisArt: pubLisArt});
					
					Sisem.ejecutar('erp/CtrlDocumento',data, function(rpta){
						if(rpta.msg.type=='success')
						{
						  erpDoc.doc_kydoc = rpta.doc_kydoc;
							w.$e.find('[name=doc_kydoc]').val(rpta.doc_kydoc);
							$.extend(w,{modo: 'VISUALIZAR'});
							docu.cerrarFormulario($.extend(w,{data : docu.obtenerDatoFormulario(w)}));
							docu.guardarOperacion(w);
						}
						Sisem.unblockW(w.$e);
					});
				});
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar')
		{
			// $.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			// docu.limpiarFormulario(w);
			// docu.llenarFormularioRx(w, function(rpta){
			// 	docu.refrescarFormulario(w);
			// 	docu.validarFormulario(w, w.modo);	
			// });
		}
		else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar')
		{
			// $.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			// docu.limpiarFormulario(w);
			// docu.llenarFormularioRx(w, function(rpta){
			// 	docu.refrescarFormulario(w);
			// 	docu.validarFormulario(w, w.modo);	
			// });
		}
	},
	// /////////////////
	// Metodos Varios //
	// /////////////////
	documentoAutocomplete: function (w){
		var prf_solo = ((typeof w.prf_solo=="undefined")?0:w.prf_solo);
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_inpu = ((typeof w.prf_inpu=="undefined")?'doc_ndoc'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = prf_inpu[0];
		var prf_camp = prf_inpu[1];

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
					w.$e.find("[name="+prf_tabl+"_kydoc]").val('0');
					w.$e.find("[name="+prf_tabl+"_tope]").val('');
					w.$e.find("[name="+prf_tabl+"_tdoc]").val('');
					w.$e.find("[name="+prf_tabl+"_ndoc]").val('');
					w.$e.find("[name="+prf_tabl+"_enom]").val('');
					w.$e.find("[name="+prf_tabl+"_tota]").val('');
					w.$e.find("[name="+prf_tabl+"_tpag]").val('');
				}
				$(this).autocomplete('enable');
			}
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'erp/GetListaDocumentoAuto?campo='+prf_tabl+'_'+prf_camp+'&mostrarSeleccion='+prf_sele+'&orderColumn=doc_femi&orderType=DESC&doc_tope='+w.tipoOperacion,
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
				} else if(obj[prf_tabl+'_nomb']=='Seleccione') {

          docu.winSel({
            tipo: prf_grup,
            modo: 'SELECCIONAR',
            prf: {prf_nomb: prf_grup},
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
                   w.$e.find("[name="+prf_tabl+"_kydoc]").val(objSel.doc_kydoc);
                   w.$e.find("[name="+prf_tabl+"_tope]").val(objSel.doc_tdoc);
                   w.$e.find("[name="+prf_tabl+"_tdoc]").val(objSel.doc_tdoc);
                   w.$e.find("[name="+prf_tabl+"_ndoc]").val(objSel.doc_ndoc);
                   w.$e.find("[name="+prf_tabl+"_enom]").val(objSel.doc_enom);
                   w.$e.find("[name="+prf_tabl+"_tota]").val(objSel.doc_tota);
                   w.$e.find("[name="+prf_tabl+"_tpag]").val(objSel.doc_tpag);
                }
              }
            }
          });
				}
				else
				{
					console.log('todos 1');
					w.$e.find("[name="+prf_tabl+"_kydoc]").val(obj['doc_kydoc']);
  			  w.$e.find("[name="+prf_tabl+"_tope]").val(obj['doc_tope']);
  			  w.$e.find("[name="+prf_tabl+"_tdoc]").val(obj['doc_tdoc']);
					w.$e.find("[name="+prf_tabl+"_ndoc]").val(obj['doc_ndoc']);
					w.$e.find("[name="+prf_tabl+"_enom]").val(obj['doc_enom']);
					w.$e.find("[name="+prf_tabl+"_tota]").val(obj['doc_tota']);
					w.$e.find("[name="+prf_tabl+"_tpag]").val(obj['doc_tpag']);
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
          w.$e.find("[name="+prf_tabl+"_kydoc]").val(obj.doc_kydoc);
          w.$e.find("[name="+prf_tabl+"_tope]").val(obj.doc_tope);
          w.$e.find("[name="+prf_tabl+"_tdoc]").val(obj.doc_tdoc);
          w.$e.find("[name="+prf_tabl+"_ndoc]").val(obj.doc_ndoc);
          w.$e.find("[name="+prf_tabl+"_enom]").val(obj.doc_enom);
          w.$e.find("[name="+prf_tabl+"_tota]").val(obj.doc_tota);
          w.$e.find("[name="+prf_tabl+"_tpag]").val(obj.doc_tpag);
        }
        eve.preventDefault();
      }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	},
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
	anularDocumento: function(w){
		//INICIO: OBTENER DOCUMENTO
		Sisem.ejecutar('erp/GetListaDocumento',{doc_kydoc: w.doc_kydoc}, function(rpta){
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
  													
  													erpDtd.dtd_pcos = erpDtd.dtd_pant;
  													
  												  //INICIO: CALCULAR REGISTRO DE INGRESO O SALIDA DE ARTICULO
														docu.ingresarDetdocumentoEnListaDetdocumento(erpDoc, erpDtd, admArt, pubLanDtd, pubLanArt, function(resp){
											    		if(resp==true){
											    			if( iteDtd == pubLisDtd.length){
												    			//INICIO: GUARDAR DOCUMENTO Y LISTA DE DETALLE DE DOCUMENTO
																	var dtmp = {comando: 'AGREGAR_ANULAR' , doc: erpDoc, lisDtd: pubLanDtd, lisArt: pubLanArt};
																	Sisem.ejecutar('erp/CtrlDocumento',dtmp, function(rpta){
																		if(rpta.msg.type=='success')
																		{
																			Sisem.msgBox('success','El documento se anulo correctamente!!!');
																			if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
	//																		w.$e.find('[name=doc_kydoc]').val(rpta.doc_kydoc);
	//																		$.extend(w,{modo: 'VISUALIZAR'});
	//																		docu.cerrarFormulario($.extend(w,{data : docu.obtenerDatoFormulario(w)}));
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
					Sisem.msgBox('error','ESTE DOCUMENTO ESTA : ' + erpDoc.doc_esta);
				}
			}
		});
	  //FIN: OBTENER DOCUMENTO
	},
	verificarNumeroOperacionDocumentoRx(w, callback){
	  admOpe.ope_tdoc = 'RECIBO';
		Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc: USERDATA.suc.suc_kysuc, prp_secc: 'NUMDOC', prp_dscr: admOpe.ope_tdoc, prp_nive: 2}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
			  var prp = rpta.lista.items[0];
			  admOpe.ope_ndoc = Sisem.llenarCeros(prp.prp_prop, 3) + '-' + Sisem.llenarCeros(parseInt(prp.prp_valu)+1, 6);
			  var prp_kyprp = prp.prp_kyprp;
			  
				Sisem.ejecutar('adm/GetListaOperacion',{ope_ndoc: admOpe.ope_ndoc}, function(rpta){
					if(rpta.lista.items.length > 0)
					{
						Sisem.msgBox('error', "RECIBO: "+admOpe.ope_ndoc+" existe");
					} else {
						Sisem.ejecutar('erp/GetListaDocumento',{doc_tdoc: w.$e.find('[name=doc_tdoc]').val(), doc_ndoc: w.$e.find('[name=doc_ndoc]').val()}, function(rpta){
							if(rpta.lista.items.length > 0)
							{
								Sisem.msgBox('error', w.$e.find('[name=doc_tdoc]').val()+": "+w.$e.find('[name=doc_ndoc]').val()+" existe");						
							} else {
								return callback(rpta);
							}
						});
					}
				});
			}
		});
	},
	guardarOperacion(w){
		var data = {
			comando: 'AGREGAR',
			archivo: 'adm/CtrlOperacion',
			com_kycom: USERDATA.com.com_kycom,

			apc_kyapc: USERDATA.apc.apc_kyapc,
			caj_kysuc: USERDATA.suc.suc_kysuc,
			
			cor_kycco: admCco.cco_kycco,
			cor_kyusu: USERDATA.usu.usu_kyusu,
			cor_nomb: admCco.usu_nomb.substring(0,3)+admCco.bnc_prop+admCco.cco_ndoc.substring(admCco.cco_ndoc.length-4,admCco.cco_ndoc.length),
			cor_otip: ((erpDoc.doc_tcon=='INGRESO') ? 'EGRESO' : 'INGRESO'),
			cor_tipo: 'EMP',
			
			ope_kyope: '0',
			ope_kydoc: erpDoc.doc_kydoc,
			ope_kyapc: USERDATA.apc.apc_kyapc,
			ope_kyusu: USERDATA.usu.usu_kyusu,
			ope_ccmp: '2.35',
			ope_cven: '2.45',
			ope_esta: '0001',
			ope_fpag: 'EFECTIVO',
			ope_freg: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
			
			rub_prop: USERDATA.usu.usu_nomb.split(' ')[0],
			cls_prop: erpDoc.doc_tope,
			
			ope_rubr: 'NEGOCIO',
			ope_clas: erpDoc.doc_tope,
			ope_mimp: erpDoc.doc_tpag,
			ope_tdoc: admOpe.ope_tdoc,
			ope_ndoc: admOpe.ope_ndoc,
			ope_oimp: erpDoc.doc_tpag,
			ope_mmon: '0001',
			ope_omon: '0001',
			ope_otip: ((erpDoc.doc_tcon=='INGRESO') ? 'EGRESO' : 'INGRESO'),
			ope_peri: moment(new Date()).format('YYYY-MM-DD'),
			ope_pobs: 'Por la ' + erpDoc.doc_tope+' CON '+erpDoc.doc_tdoc+' - '+erpDoc.doc_ndoc+' al '+erpDoc.doc_fpag,
			ope_refe: 'ACUENTA',
			ope_tcam: 'SINCAMBIO',
			ope_tope: ((erpDoc.doc_tcon=='INGRESO') ? 'GASTO' : 'COBRO'),

			prp_kysuc: USERDATA.suc.suc_kysuc,
			prp_nive: '2',
			prp_secc: 'NUMDOC'
		};

		Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
			if(rpta.msg.type=='success')
			{
				Sisem.msgBox('success', "¡¡¡Operacion registrada correctamente!!!");
			}
		});

	},
	obtenerDatoDlgEntidad: function(w){

		cmnPrf.prf_nomb = ( ( w.tipo == 'VENTA' ) ? 'CLIENTE' : 'PROVEEDOR' );

		cmnEnt.usu_kyusu = w.$e.find('[name=ent_kyusu]').val().toUpperCase();
		cmnEnt.usu_mail = w.$e.find('[name=ent_mail]').val();
		cmnEnt.usu_tdoc = w.$e.find('[name=ent_tdoc]').val().toUpperCase();
		cmnEnt.usu_ndoc = w.$e.find('[name=ent_ndoc]').val().toUpperCase();
		cmnEnt.usu_nomb = w.$e.find('[name=ent_nomb]').val().toUpperCase();
		cmnEnt.usu_dire = w.$e.find('[name=ent_dire]').val().toUpperCase();
	},
	obtenerDatoDlgDocumento: function(w){
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
		erpDoc.doc_cigv =  (w.$e.find('[name=doc_cigv]').is(':checked') ? 1 : 0);
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
		erpDoc.doc_tpag =  parseFloat(w.$e.find('[name=doc_tpag]').val());
		erpDoc.doc_tmon =  'SOLES';
		erpDoc.doc_dcto =  0.00;
		erpDoc.doc_tsub =  parseFloat(w.$e.find('[name=doc_tsub]').val());
		erpDoc.doc_tigv =  parseFloat(w.$e.find('[name=doc_tigv]').val());
		erpDoc.doc_tota =  parseFloat(w.$e.find('[name=doc_tota]').val());
		erpDoc.doc_dimp =  w.$e.find('[name=doc_dimp]').val().toUpperCase();
		erpDoc.doc_vers =  moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
		
		docu.obtenerDatoDlgArticulo(w);
		docu.copiarArticuloADetalle(admArt, erpDoc, erpDtd);
		docu.obtenerDatoDlgDetalle(w);
		
	},
	obtenerDatoDlgArticulo: function(w){
		admArt.art_kyart = w.$e.find('[name=art_kyart]').val().toUpperCase();
		admArt.art_kycom = USERDATA.com.com_kycom;
		admArt.art_codi = w.$e.find('[name=art_codi]').val().toUpperCase();
		admArt.art_unid = w.$e.find('[name=art_unid]').val().toUpperCase();
		admArt.art_nomb = w.$e.find('[name=art_nomb]').val().toUpperCase();
		admArt.art_marc = w.$e.find('[name=art_marc]').val().toUpperCase();
		admArt.art_clas = w.$e.find('[name=art_clas]').val().toUpperCase();
		admArt.art_pcos = parseFloat(w.$e.find('[name=dtd_pcos]').val());
		admArt.art_pund = parseFloat(w.$e.find('[name=art_pund]').val());		
	},
	copiarArticuloADetalle: function(parArt, parDoc, parDtd) 
	{
		parDtd.dtd_kyart = parArt.art_kyart;
		
		parDtd.dtd_codi = parArt.art_codi;
		parDtd.dtd_unid = parArt.art_unid;
		parDtd.dtd_dscr = parArt.art_nomb+' : '+parArt.art_marc;
		
		parDtd.dtd_cant = 0;
		parDtd.dtd_pcos = ( (parDoc.doc_tcon=='INGRESO') ? 0.00 : parArt.art_pcos );
		parDtd.dtd_impo = 0.00;
		
		parDtd.dtd_sact = parArt.art_sact;
		parDtd.dtd_pant = parArt.art_pcos;
		parDtd.dtd_impo = parArt.art_impo;

		parDtd.dtd_ingr = 0;
		parDtd.dtd_egre = 0;		
	},	
	obtenerDatoDlgDetalle: function(w){
		var CIGV = ( w.$e.find('[name=doc_cigv]').is(':checked') ? 0 : 1 );

		erpDtd.dtd_kydtd = 0;
		erpDtd.dtd_cant = parseInt(w.$e.find('[name=dtd_cant]').val());
		erpDtd.dtd_pund = (erpDoc.doc_tcon=='INGRESO') ? parseFloat(w.$e.find('[name=art_pund]').val()) : parseFloat(w.$e.find('[name=art_pund]').val());
  	erpDtd.dtd_pcos = (erpDoc.doc_tcon=='INGRESO') ? parseFloat(w.$e.find('[name=dtd_pcos]').val()) : parseFloat(w.$e.find('[name=art_pcos]').val());

		erpDtd.dtd_pund = Sisem.IGV(erpDtd.dtd_pund, CIGV);
		erpDtd.dtd_pcos = Sisem.IGV(erpDtd.dtd_pcos, CIGV);

		erpDtd.dtd_dcto = 0.00;
		erpDtd.dtd_pdto = erpDtd.dtd_pund;		
	},
	nuevoRegistroRx: function(w, callback){
		Sisem.ejecutar('cmn/GetListaUsuario',{usu_kycom: USERDATA.com.com_kycom, prf_nomb: ((w.tipo=='VENTA') ? 'CLIENTE' : 'PROVEEDOR'),  usu_ndoc: ((w.tipo=='VENTA') ? '12345678' : '12345678901')}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
			  cmnUsu = rpta.lista.items[0];
			  w.$e.find('[name=ent_kyusu]').val(cmnUsu.usu_kyusu);
			  w.$e.find('[name=ent_tdoc]').val(cmnUsu.usu_tdoc);
			  w.$e.find('[name=ent_ndoc]').val(cmnUsu.usu_ndoc);
			  w.$e.find('[name=ent_nomb]').val(cmnUsu.usu_nomb);
			  w.$e.find('[name=ent_dire]').val(cmnUsu.usu_dire);
			  w.$e.find('[name=ent_mail]').val(cmnUsu.usu_mail);
			}
			return callback(rpta);
		});
	},
	llenarGridDoc:function(w, parDoc, parLisDtd, parLisArt){
		// var CIGV = ( w.$e.find('[name=doc_cigv]').is(':checked') ? 0 : 1 );
		if(parLisDtd!=null){
			w.$e.find('[name=gridItemDoc]').children().remove();
			var var_tota = 0.00;
			var doc_tcos = 0.00;
			
			var totItem = 0;
			var totArti = 0;

			for(var iteDtd=0;iteDtd<parLisDtd.length;iteDtd++){
				var filaDtd = parLisDtd[iteDtd];
				var $row = w.$e.find('[name=gridRef]').clone().children();

				$row.find('[name=grid_dtd_cant]').html(Sisem.roundFloat(filaDtd.dtd_cant, 0));
				$row.find('[name=grid_dtd_dscr]').html(filaDtd.dtd_dscr);
				$row.find('[name=grid_dtd_pund]').html(filaDtd.dtd_pund);
				$row.find('[name=grid_dtd_impo]').html(filaDtd.dtd_impo);

				$row.find('[name=grid_dtd_dcto]').html(filaDtd.dtd_dcto);
				$row.find('[name=grid_dtd_pdto]').html(filaDtd.dtd_pdto);

				$row.find('[name=grid_dtd_pcos]').html(filaDtd.dtd_pcos);
				$row.find('[name=grid_dtd_sact]').html(filaDtd.dtd_sact);
				
				indice = Sisem.indiceListaObjeto(parLisArt, 'art_kyart', filaDtd.dtd_kyart);
				if (indice != -1){
					varArt = parLisArt[indice];
					$row.find('[name=grid_art_pund]').html(varArt.art_pund);
				}

				var_tota = var_tota + filaDtd.dtd_impo;
				doc_tcos = doc_tcos + filaDtd.dtd_cost;

				$row.data('data',filaDtd);
				w.$e.find('[name=gridItemDoc]').append($row);
				
				totArti = totArti + filaDtd.dtd_cant;
				totItem++;
			}

			parDoc.doc_tota = var_tota
			parDoc.doc_tsub = parDoc.doc_tota / (1 + (PRVIGV / 100));
			parDoc.doc_tigv = parDoc.doc_tota - parDoc.doc_tsub;
			parDoc.doc_tcos = doc_tcos;
			parDoc.doc_tpag = parDoc.doc_tota;
			
			w.$e.find('[name=val_item]').val(totItem);
			w.$e.find('[name=val_arti]').val(Sisem.roundFloat(totArti, 0));

			w.$e.find('[name=doc_dcto]').val(0.00);
			w.$e.find('[name=doc_tsub]').val(Sisem.redondeoString(parDoc.doc_tsub));
			w.$e.find('[name=doc_tigv]').val(Sisem.redondeoString(parDoc.doc_tigv));
			w.$e.find('[name=doc_tota]').val(Sisem.redondeoString(parDoc.doc_tota));
			w.$e.find('[name=doc_tcos]').val(Sisem.redondeoString(parDoc.doc_tcos));

		}else{
			w.$e.find('[name=doc_dcto]').val(0.00);
			w.$e.find('[name=doc_tsub]').val(0.00);
			w.$e.find('[name=doc_tigv]').val(0.00);
			w.$e.find('[name=doc_tota]').val(0.00);
			w.$e.find('[name=doc_tcos]').val(0.00);
			w.$e.find('[name=doc_tpag]').val(0.00);
			w.$e.find('[name=doc_vuel]').val(0.00);
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
						if ( parDtd.dtd_pcos <= parArt.art_pund ) {
							if ( ( ( parDoc.doc_tope == 'VENTA' || parDoc.doc_tope == 'COMPRA_ANULADA' ) && parDtd.dtd_cant <= stockTotal ) || parDoc.doc_tope == 'VENTA_ANULADA' || parDoc.doc_tope == 'COMPRA' ) {
								
								docu.calcularRegistroDetDocumento(parDoc, parDtd, parArt);
				
								Sisem.verificarListaObjeto(parLisArt, 'art_kyart', parArt);
								Sisem.verificarListaObjeto(parLisDtd, 'dtd_kyart', parDtd);
				
								resp = true;
							}
							else if (parDtd.dtd_cant > stockTotal) 
							{
								Sisem.msgBox('error', "EN " + USERDATA.suc.suc_nomb + " DE " + parArt.art_nomb + " HAY " + stockTotal + " EN STOCK!!!");
								resp = false;
							}							
						}
						else 
						{
							Sisem.msgBox('error', "EL COSTO ES MAYOR A LA VENTA!!!");
							resp = false;
						}
					} else {
						Sisem.msgBox('error', "EL PRECIO DE VENTA ES <= 0");
						resp = false;
					}
				} else {
					Sisem.msgBox('error', "LA CANTIDAD ES <= 0");
					resp = false;
				}
				if(typeof callback == 'function'){callback(resp);};
			});
		}
	},
	calcularRegistroDetDocumento: function(parDoc, parDtd, parArt) 
	{
		parArt.art_sact = parseInt(parArt.art_sact);
		parArt.art_pcos = ( parArt.art_sact > 0 ? parArt.art_pcos : 0.00 );
		parArt.art_impo = parArt.art_sact * parArt.art_pcos;

		parDtd.dtd_cant = parseInt(parDtd.dtd_cant);
		parDtd.dtd_pund = parseFloat(parDtd.dtd_pund);
		parDtd.dtd_pant = parseFloat(parDtd.dtd_pant);
		parDtd.dtd_dcto = parseFloat(parDtd.dtd_dcto);
		parDtd.dtd_pdto = parseFloat(parDtd.dtd_pdto);
		
		var importeCosto = parDtd.dtd_cant * parDtd.dtd_pcos;
		var importeVenta = parDtd.dtd_cant * parDtd.dtd_pund;
		var stockActual = 0;
		var totalValorizado = parArt.art_impo, precioCosto = parArt.art_pcos;
		if (parDoc.doc_tcon == "INGRESO") {
			if (importeCosto > 0) 
			{
				stockActual = parArt.art_sact + parDtd.dtd_cant;
				totalValorizado = parDoc.doc_tope=="TRASLADO" ? parArt.art_impo : (parArt.art_impo + importeCosto);
				precioCosto = parDoc.doc_tope=="TRASLADO" ? parArt.art_pcos : (totalValorizado / stockActual);
			}
		} 
		else if (parDoc.doc_tcon == "SALIDA")
		{
			if (importeVenta > 0) {

				stockActual = parArt.art_sact - parDtd.dtd_cant;
				if (stockActual == 0) {

					totalValorizado = 0.00;
					precioCosto = 0.00;
					
				}
				else {

					totalValorizado = parDoc.doc_tope=="TRASLADO" ? parArt.art_impo : (parArt.art_impo - importeCosto);
				  precioCosto = parDoc.doc_tope=="TRASLADO" ? parArt.art_pcos : (totalValorizado / stockActual);
					
				}
			}
		}

		if (parDoc.doc_tcon == "INGRESO") {
			parDtd.dtd_ingr = parDtd.dtd_cant;
			parDtd.dtd_egre = 0;
			parDtd.dtd_cost = 0.00;
			parDtd.dtd_impo = Sisem.redondeoDouble(importeCosto);
		} else if (parDoc.doc_tcon == "SALIDA") {
			parDtd.dtd_ingr = 0;
			parDtd.dtd_egre = parDtd.dtd_cant;
			parDtd.dtd_cost = Sisem.redondeoDouble(importeCosto);
			parDtd.dtd_impo = Sisem.redondeoDouble(importeVenta);
		}


		parDtd.dtd_acod = parArt.art_codi;
		parDtd.dtd_sact = stockActual;
		parDtd.dtd_pcos = Sisem.redondeoDouble(precioCosto);
		parDtd.dtd_valo = Sisem.redondeoDouble(totalValorizado);
		
		parArt.art_pcos = Sisem.redondeoDouble(precioCosto);
		parArt.art_sact = stockActual;
	},
	desactivarDlgDocumento: function(w){
		if(Sisem.validarControlesColor(w.$e, 'ent', 'VALIDAR')){
			Sisem.activar(w.$e.find('[name=cco_nomb]'), false);
			Sisem.activar(w.$e.find('[name=doc_tdoc]'), false);
			Sisem.activar(w.$e.find('[name=ent_tdoc]'), false);
			Sisem.activar(w.$e.find('[name=ent_ndoc]'), false);
			Sisem.activar(w.$e.find('[name=ent_nomb]'), false);
			Sisem.activar(w.$e.find('[name=ent_dire]'), false);
			Sisem.activar(w.$e.find('[name=doc_fact]'), false);
			Sisem.activar(w.$e.find('[name=doc_guia]'), false);
			Sisem.activar(w.$e.find('[name=doc_fpag]'), false);
			// Sisem.activar(w.$e.find('[name=doc_tpag]'), (w.$e.find('[name=doc_fpag]').val()=="CONTADO") ? false : true);

			Sisem.validarControlesColor(w.$e, 'ent, doc, art, dtd', 'AGREGAR');
			docu.obtenerDatoDlgEntidad(w);							
			var data = $.extend(data, {comando: 'AGREGAR_MODIFICAR' , usu: cmnEnt, prf: cmnPrf});
			Sisem.ejecutar('cmn/CtrlUsuario',data, function(rpta){
				if(rpta.msg.type=='success')
				{
					w.$e.find('[name=ent_kyusu]').val(rpta.usu.usu_kyusu);
				}
			});
			event.preventDefault();
		}
	}
};
