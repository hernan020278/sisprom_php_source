var oper = {
	pag:{
		alias		: 'Operacion',
		nameWB		: 'brwOperacion',
		nameWP		: 'winOperacion',
		nameWS		: 'selOperacion',
		nameWI		: 'intOperacion',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwOperacion',
		idGridWP	: 'idWinOperacion',
		idGridWS	: 'idSelOperacion',
		idGridWI	: 'idIntOperacion'
	},
	tipPag: {
			"OPERACI":{'name': 'Flujooperacion', 'alias': 'Operacion'},
			"OPEADM":{'name': 'Flujoadministra', 'alias': 'Operaciones administracion'},
			"COPEANT":{'name': 'Ctrlanticipo', 'alias': 'Control de Anticipo'},
			"COPETRA":{'name': 'Ctrlvendedor', 'alias': 'Control de Vendedor'}
	},
	tipPagAct: '',
	opeRango: 1,
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['adm/prop','cmn/usua','adm/sucu','adm/ccor','erp/docu','ent/erpDoc']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init: function(w){
		if(w==null)w=new Object();
		oper.winBrow(w);
	},
	winBrow: function(w){
		oper.import(function(){
			if(w==null)w=new Object;
			oper.setPagina(w);
			oper[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					oper.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}
			});//Sisem.Cargar({
		});
	},
	winPop:function(w){
		oper.import(function(rpta){
			if(w==null)w=new Object;
			oper.setPagina(w);
			oper[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 600 : 900),
				height:((w.size && w.size=='short') ? 350 : 550),
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
							oper.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							oper.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);

					oper.iniciarFormularioRx(w, function(rpta){

						oper.refrescarFormulario(w);
						oper.validarFormulario(w, w.modo);

            var ahora = moment(new Date()).format('YYYY-MM-DD');
            w.$e.find('[name=ope_freg]').val(ahora).datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});

            Sisem.unblockW(w.$e);
            Sisem.formato(w);

					});
				}
			});
		});
	},
	winSel:function(w){
		oper.import(function(){
			if(w==null)w=new Object;
			oper.setPagina(w);
			oper[w.pag.nameWS] = w;
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
							oper.cerrarFormulario(w);
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
										oper.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							oper.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					oper.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showToolBar: true}));
					Sisem.unblockW(w.$e);
				}
			});
		});
	},
	winInt:function(w){
		oper.import(function(){
			if(w==null)w=new Object;
			oper.setPagina(w);
			oper[w.pag.nameWI] = w;
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
					oper.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//oper.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_oper']}, function(rpta){
			if(rpta){brw_oper.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_oper'}));}
		});
	},
  iniciarFormularioRx:function(w, callback){
    oper.limpiarFormulario(w);
    oper.configurarComponentesRx(w, function(rpta){
      oper.llenarDataEnComponentesRx(w, function(rpta){
        if(w.modo=='VISUALIZAR' || w.modo=='MODIFICAR'){
          oper.llenarFormularioRx(w, function(rpta){
            return callback(rpta);
          });
        } else if(w.modo=='AGREGAR'){
          oper.nuevoRegistroRx(w, function(rpta){

						if(w.tipoOperacion == 'OPERACION'){w.$e.find('[name=ope_tope]').val('COBRO').trigger('change');}
						if(w.tipoOperacion == 'VENTA'){w.$e.find('[name=ope_tope]').val('COBRO').trigger('change');}
						if(w.tipoOperacion == 'COMPRA'){w.$e.find('[name=ope_tope]').val('GASTO').trigger('change');}

						oper.mostrarCamposVentaCompra(w);

						w.$e.find('[name=cor_nomb]').focus();
			
						return callback(rpta);
          });
        }
      });
    });
  },
	configurarComponentesRx(w, callback){

    if(w.tipo=='OPERACI'){sucu.cajaAutocomplete($.extend(w, {suc_tipo:'CAGE'}));}
    else if(w.tipo=='COPEANT'){sucu.cajaAutocomplete($.extend(w, {suc_tipo:'CACO'}));}
    else if(w.tipo=='COPETRA'){sucu.cajaAutocomplete($.extend(w, {suc_tipo:'CABA'}));}

    w.$e.find('[name=btnAddDoc]').click(function(){
      oper.btnAddDocClick(w);
    });
    w.$e.on('keyup','[name=ope_oimp]',function(){
      var ope_tcam = w.$e.find('[name=ope_tcam] :selected').val();
      var ope_omon = w.$e.find('[name=ope_omon] :selected').val();
      var ope_mmon = w.$e.find('[name=ope_mmon] :selected').val();
      var ope_oimp = parseFloat(w.$e.find('[name=ope_oimp]').val());
      var ope_spag = parseFloat(w.$e.find('[name=ope_spag]').val());

      if( !Sisem.isEmpty(w.$e.find('[name=cco_tmon]').val()) || !Sisem.isEmpty(w.$e.find('[name=doc_tmon]').val()) )
      {
        ope_mmon=((!Sisem.isEmpty(w.$e.find('[name=cco_tmon]').val()))?w.$e.find('[name=cco_tmon]').val():w.$e.find('[name=doc_tmon]').val());
      }
      else{ope_mmon=ope_omon;}
      w.$e.find('[name=ope_mmon]').val(ope_mmon);

      if(ope_mmon != ope_omon){
        var tipCmb = 0.00;
        var importe = 0.00;
        if(ope_tcam=='COMPRA'){
          tipCmb = parseFloat(w.$e.find('[name=ope_ccmp]').val());
          w.$e.find('[name=ope_mimp]').val((ope_oimp * tipCmb));
        }else if(ope_tcam=='VENTA'){
          tipCmb = parseFloat(w.$e.find('[name=ope_cven]').val());
          w.$e.find('[name=ope_mimp]').val((ope_oimp / tipCmb));
        }
      }else{
        w.$e.find('[name=doc_tcam]').val('SINCAMBIO');
        w.$e.find('[name=ope_mimp]').val(ope_oimp);
      }

      if(parseFloat(w.$e.find('[name=ope_mimp]').val())==parseFloat(w.$e.find('[name=ope_spag]').val())){w.$e.find('[name=ope_refe]').val('CANCELAR');}
      else{w.$e.find('[name=ope_refe]').val('ACUENTA');}
    });

    w.$e.on('change','[name=ope_tope]',function(){
      var $ope_tope = $(this).val();

      w.$e.find('[name=cde_kycco]').val('');
      w.$e.find('[name=cde_kyusu]').val('');
      w.$e.find('[name=cde_nomb]').val('');

      if($ope_tope)
      {
        if($ope_tope=='RETIRO' || $ope_tope=='TRANSFERENCIA' || $ope_tope=='COSTO' || $ope_tope=='GASTO'){w.$e.find('[name=ope_otip]').val('EGRESO');w.$e.find('[name=cor_otip]').val('EGRESO');w.$e.find('[name=cde_otip]').val('INGRESO');}
        if($ope_tope=='COBRO' || $ope_tope=='DEPOSITO' || $ope_tope=='APERTURA'){w.$e.find('[name=ope_otip]').val('INGRESO');w.$e.find('[name=cor_otip]').val('INGRESO');w.$e.find('[name=cde_otip]').val('EGRESO');}
        if($ope_tope=='TRANSFERENCIA')
        {
          w.$e.find('[name=cde_nomb]').attr('title','ope');
          oper.refrescarFormulario(w);
          oper.validarFormulario(w,'VALIDAR');
        }
        else
        {
          w.$e.find('[name=cde_nomb]').attr('title','');
          oper.refrescarFormulario(w);
          oper.validarFormulario(w,'VALIDAR');
        }
      }
    });
    /** **********************************************************************
     * Area para descargar y subir archivos de imagen de comprobante de pago *
     *************************************************************************/
    $('[name=btnOpeImagDown]').on('click',function(){
      Sisem.getFile('adm/'+w.$e.find('[name=ope_fimg]').val().toLowerCase(), 'imagen', function(rpta){
        if(w.$e.find('[name=ope_fimg]').val()!=''){window.open(rpta.listaArchivo[0]);}
      });
    });
    $('[name=btnOpeImagUp]').on('click',function (){
      $('[name=inp_ope_fimg]').trigger('click');
    });
    $('[name=inp_ope_fimg]').change(function(event){
      var texto = w.$e.find('[name=inp_ope_fimg]').val();
      if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;}
      var file = w.$e.find('[name=inp_ope_fimg]')[0].files[0];
      var fileName = file.name;
      var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
      var fileSize = file.size;
      var fileType = file.type;
      var fileName = (w.$e.find('[name=ope_tdoc]').val().toUpperCase()+'_'+USERDATA.com.com_dscr+'_'+w.$e.find('[name=ope_ndoc]').val().replace('-','_')+'.'+fileExtension).replace(" ","_");
      w.$e.find('[name=ope_fimg]').val(fileName);

      var ancho = w.$e.find('[name=pan_fimg]').outerWidth();
      var alto = w.$e.find('[name=pan_fimg]').outerHeight();
      archivos = [file];
      Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+USERDATA.app.pol_temp+'/CtrlOperacion/uploadFile?modulo=imagen&ancho='+ancho+'&alto='+alto, function(rpta){
        if(rpta.msg.type=='success')
        {
          w.$e.find('[name=img_fimg]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
          Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
        }
      });
    });

    usua.usuarioAutocomplete($.extend(w, {usu_tipo:'CLIPRO'}));
    usua.usuarioAutocomplete($.extend(w, {usu_tipo:'TRA'}));

    ccor.cuentaAutocomplete($.extend(w,{cco_tipo: 'ORIGEN', prf_camp: 'nomb', prf_sele: 1}));
    ccor.cuentaAutocomplete($.extend(w,{cco_tipo: 'DESTINO', prf_camp: 'nomb', prf_sele: 1}));
    prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPCLS', prf_inpu: 'cls_prop', prf_sele: 1, prp_nive: 2}));
    prop.propiedadAutocomplete($.extend(w, {prp_secc: 'TIPRUB', prf_inpu: 'rub_prop', prf_sele: 1, prp_nive: 2}));
		docu.documentoAutocomplete($.extend(w, {prf_inpu: 'doc_ndoc', prf_sele: 0, doc_tope: w.tipoOperacion}));

		//------------------------------------------------------------
		// KEYPRESS PARA NAVEGAR AL PRESIONAR ENTER
		//------------------------------------------------------------
		w.$e.find("[name=cor_nomb]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
				if(w.$e.find('[name=ope_tope]').val() == 'TRANSFERENCIA')
				{
					w.$e.find('[name=cde_nomb]').focus();
				}
				else 
				{
					w.$e.find('[name=ope_freg]').focus();
				}
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=cde_nomb]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ope_freg]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ope_freg]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=rub_prop]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=rub_prop]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=cls_prop]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=cls_prop]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
				if(w.tipoOperacion == 'OPERACION')
				{
					w.$e.find('[name=ope_tope]').focus();
				}
				else 
				{
					w.$e.find('[name=ope_pobs]').focus();
				}
	  		
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ope_tope]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ope_pobs]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ope_pobs]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ope_oimp]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ope_oimp]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=ope_esta]').focus();				    	
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=ope_esta]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
				if(w.tipoOperacion == 'OPERACION')
				{
					w.$e.find('[name=cor_nomb]').focus();
				}
				else 
				{
					w.$e.find('[name=doc_ndoc]').focus();
				}
	    	event.preventDefault();
	    }
		});
		w.$e.find("[name=doc_ndoc]").on("keypress", function (event) {
	    if ( ((event.which) ? event.which : event.keyCode)==13) 
	    {
	  		w.$e.find('[name=cor_nomb]').focus();				    	
	    	event.preventDefault();
	    }
		});


		return callback({msg: {type: 'success', text: ''}});
	},
	llenarDataEnComponentesRx: function(w, callback){
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
	},
	limpiarFormulario:function(w){

		w.$e.find('[name=ope_kycco]').val(((w.cco) ? w.cco.cco_kycco : 0));
		w.$e.find('[name=ope_kyapc]').val(((w.apc) ? w.apc.apc_kyapc : USERDATA.apc.apc_kyapc));

		w.$e.find('[name=apc_kyapc]').val(((w.apc) ? w.apc.apc_kyapc : USERDATA.apc.apc_kyapc));
		w.$e.find('[name=apc_fini]').val(((w.apc) ? w.apc.apc_fini : moment(ahora).format('YYYY-MM-DD')));
		
		w.$e.find('[name=caj_kysuc]').val(((w.caj) ? w.caj.suc_kysuc : USERDATA.suc.suc_kysuc));
		w.$e.find('[name=caj_nomb]').val(((w.caj) ? w.caj.suc_nomb : USERDATA.suc.suc_nomb));
		
		w.$e.find('[name=tra_kyusu]').val(((w.usu) ? w.usu.usu_kyusu : USERDATA.usu.usu_kyusu));
		w.$e.find('[name=tra_nomb]').val(((w.usu) ? w.usu.usu_nomb : USERDATA.usu.usu_nomb));
		
		w.$e.find('[name=cor_kyusu]').val('');
		w.$e.find('[name=cor_kycco]').val('');
		w.$e.find('[name=cde_kyusu]').val('');
		w.$e.find('[name=cde_kycco]').val('');
		
		w.$e.find('[name=cor_tipo]').val('');
		w.$e.find('[name=cor_nomb]').val('');
		w.$e.find('[name=bor_nomb]').val('');
		w.$e.find('[name=cor_tmon]').val('');
		w.$e.find('[name=cor_ndoc]').val('');
		
		w.$e.find('[name=cde_tipo]').val('');
		w.$e.find('[name=cde_nomb]').val('');
		w.$e.find('[name=bde_nomb]').val('');
		w.$e.find('[name=cde_tmon]').val('');
		w.$e.find('[name=cde_ndoc]').val('');
		
//		w.$e.find('[name=ope_tope]').val('');
		w.$e.find('[name=ope_fpag]').val('EFECTIVO');
		w.$e.find('[name=ope_peri]').val(dash.brwDashgeneral.$e.find('[name=ope_pini]').val());
		w.$e.find('[name=ope_freg]').val(moment(new Date()).format('YYYY-MM-DD'));
		w.$e.find('[name=ope_hreg]').val(moment(new Date()).format('HH:mm:ss'));
		w.$e.find('[name=ope_ccmp]').val('2.35');
		w.$e.find('[name=ope_cven]').val('2.45');
		w.$e.find('[name=ope_otip]').val('INGRESO');
		w.$e.find('[name=ope_tdoc]').val('RECIBO');
		w.$e.find('[name=ope_ndoc]').val('');
		w.$e.find('[name=ope_esta]').val('0001');
//		w.$e.find('[name=ope_mmon]').val('');
		w.$e.find('[name=ope_mimp]').val('0.00');
//		w.$e.find('[name=ope_omon]').val('');
		w.$e.find('[name=ope_oimp]').val('0.00');
		w.$e.find('[name=ope_tcam]').val('');
		w.$e.find('[name=ope_refe]').val('');
		w.$e.find('[name=ope_pobs]').val('');
		w.$e.find('[name=ope_fimg]').val('');
		
		w.$e.find('[name=doc_tmon]').val('');
		w.$e.find('[name=doc_tota]').val('0.00');
		w.$e.find('[name=doc_enom]').val('');
		w.$e.find('[name=doc_tpag]').val('0.00');
		w.$e.find('[name=doc_scan]').val('0.00');
		w.$e.find('[name=doc_spag]').val('0.00');
//		w.$e.find('[name=btnSelDoc]').val('');

		w.$e.find('[name=grid_ope]').children('tbody').children().remove();	
    w.$e.find('[name=divDocumento]').hide();
	},
	obtenerDatoFormulario: function(w){
		var fechaHora = w.$e.find('[name=ope_freg]').val()+' '+w.$e.find('[name=ope_hreg]').val();
		var data = Sisem.obtenerParametrosJson(w.$e);
		data.ope_kydoc = data.doc_kydoc;
		data.ope_fimg = w.$e.find('[name=ope_fimg]').val();
		$.extend(data,{
			comando: w.modo,
			ope_kyope: ((w.modo=='AGREGAR')?'-1':w.$e.find('[name=ope_kyope]').val()),
			ope_freg : fechaHora
		});
		return data;
	},
	llenarFormularioRx:function(w, callback){
		Sisem.blockW(w.$e);
		if(w.ky>0){w.$e.find('[name=ope_kyope]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=ope_kyope]').val())){
			Sisem.ejecutar('adm/GetListaOperacion',{ope_kyope: w.$e.find('[name=ope_kyope]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					w.$e.find('[name=ope_kyope]').val(fila.ope_kyope);
					w.$e.find('[name=ope_kyorf]').val(fila.ope_kyorf);
					w.$e.find('[name=ope_kyapc]').val(fila.ope_kyapc);

					w.$e.find('[name=cor_kyusu]').val(fila.usu_kyusu);
					w.$e.find('[name=cor_kycco]').val(fila.cco_kycco);
					w.$e.find('[name=cor_tipo]').val(fila.usu_tipo);
					w.$e.find('[name=cor_nomb]').val(fila.usu_nomb.substr(0,3)+fila.cco_dscr+fila.cco_ndoc.substr(-4));
					w.$e.find('[name=cor_tmon]').val(fila.cco_tmon);
					w.$e.find('[name=cor_ndoc]').val(fila.cco_ndoc);
					w.$e.find('[name=cor_otip]').val(fila.ope_ctip);

					w.$e.find('[name=rub_prop]').val(fila.ope_rubr);
					w.$e.find('[name=cls_prop]').val(fila.ope_clas);

					w.$e.find('[name=ope_tdoc]').val(fila.ope_tdoc);
					w.$e.find('[name=ope_tope]').val(fila.ope_tope);
					w.$e.find('[name=ope_fpag]').val(fila.ope_fpag);
					w.$e.find('[name=ope_peri]').val(moment(fila.ope_peri).format('YYYY-MM-DD'));
					w.$e.find('[name=ope_freg]').val(moment(fila.ope_freg).format('YYYY-MM-DD'));
					w.$e.find('[name=ope_hreg]').val(moment(fila.ope_freg).format('HH:mm:ss'));
					w.$e.find('[name=ope_ctip]').val(fila.ope_ctip);
					w.$e.find('[name=ope_dtip]').val(fila.ope_dtip);
					w.$e.find('[name=ope_otip]').val(fila.ope_otip);

					w.$e.find('[name=ope_ndoc]').val(fila.ope_ndoc);

					w.$e.find('[name=ope_onom]').val(fila.ope_onom);
					w.$e.find('[name=ope_omon]').val(fila.ope_omon);
					w.$e.find('[name=ope_oimp]').val(fila.ope_oimp);
					w.$e.find('[name=ope_mmon]').val(fila.ope_mmon);
					w.$e.find('[name=ope_mimp]').val(fila.ope_mimp);
					w.$e.find('[name=ope_tcam]').val(fila.ope_tcam);
					w.$e.find('[name=ope_ccmp]').val(Sisem.redondeoString(fila.ope_ccmp));
					w.$e.find('[name=ope_cven]').val(Sisem.redondeoString(fila.ope_cven));
					w.$e.find('[name=ope_debe]').val(Sisem.redondeoString(fila.ope_debe));
					w.$e.find('[name=ope_habe]').val(Sisem.redondeoString(fila.ope_habe));
					w.$e.find('[name=ope_pobs]').val(fila.ope_pobs);
					w.$e.find('[name=ope_fimg]').val(fila.ope_fimg);
					w.$e.find('[name=ope_esta]').val(fila.ope_esta);
					w.$e.find('[name=ope_eori]').val(fila.ope_esta);
					w.$e.find('[name=ope_vers]').val(fila.ope_vers);

					w.$e.find('[name=apc_kyapc]').val(fila.apc_kyapc);
					w.$e.find('[name=apc_fini]').val(moment(fila.apc_fini).format('YYYY-MM-DD'));
					w.$e.find('[name=apc_ffin]').val(moment(fila.apc_ffin).format('YYYY-MM-DD'));

					w.$e.find('[name=caj_kysuc]').val(fila.suc_kysuc);
					w.$e.find('[name=caj_nomb]').val(fila.suc_nomb);

					w.$e.find('[name=tra_kyusu]').val(fila.tra_kyusu);
					w.$e.find('[name=tra_nomb]').val(fila.tra_nomb);

					var ancho = w.$e.find('[name=pan_fimg]').outerWidth();
					var alto = w.$e.find('[name=pan_fimg]').outerHeight();

					Sisem.getFile('adm/'+fila.ope_fimg, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success')
						{
							w.$e.find('[name=img_fimg]').attr('src',rptaImg.listaArchivo[0]+'?'+(new Date()).getTime()).fadeIn();
						}
						else{w.$e.find('[name=img_fimg]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
						w.$e.find('[name=img_fimg]').css('width',ancho+'px');
					});

					/** ******************************************************
					 ** PONIENDO TITULO EN EL ENCABEZADO DE LA OPERACION
					 ** ******************************************************/
					var titleNumDoc = ' '+w.$e.find('[name=ope_tdoc]').val()+' '+w.$e.find('[name=ope_ndoc]').val();
					if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.pag.modo+' '+w.pag.alias+titleNumDoc);}
					else{w.$e.parent().find('.ui-dialog-title').html(w.pag.modo+' '+w.pag.alias+titleNumDoc);}

          if(fila.ope_kydoc){
            Sisem.ejecutar('erp/GetListaDocumento',{doc_kydoc: fila.ope_kydoc}, function(rpta){
              if(rpta.lista.items.length > 0)
              {
                $.extend(erpDoc, rpta.lista.items[0]);

                w.$e.find('[name=doc_kydoc]').val(erpDoc.doc_kydoc);
                w.$e.find('[name=doc_tdoc]').val(erpDoc.doc_tdoc);
                w.$e.find('[name=doc_ndoc]').val(erpDoc.doc_ndoc);
                w.$e.find('[name=doc_enom]').val(erpDoc.doc_enom);
                w.$e.find('[name=doc_tota]').val(Sisem.redondeoString(erpDoc.doc_tota));
                w.$e.find('[name=doc_tpag]').val(Sisem.redondeoString(erpDoc.doc_tpag));

                oper.mostrarCamposVentaCompra(w);
              }
            });
          }
					if(fila.ope_kyorf>0)
					{
						Sisem.ejecutar('adm/GetListaOperacion',{ope_kyope: fila.ope_kyorf}, function(rptaOrf){
							if(rptaOrf.lista.items.length > 0)
							{
								var filaOrf = rptaOrf.lista.items[0];

								w.$e.find('[name=cde_kyusu]').val(filaOrf.usu_kyusu);
								w.$e.find('[name=cde_kycco]').val(filaOrf.cco_kycco);
								w.$e.find('[name=cde_tipo]').val(filaOrf.usu_tipo);
								w.$e.find('[name=cde_nomb]').val(filaOrf.usu_nomb.substr(0,3)+filaOrf.cco_dscr+filaOrf.cco_ndoc.substr(-4));
								w.$e.find('[name=cde_tmon]').val(filaOrf.cco_tmon);
								w.$e.find('[name=cde_ndoc]').val(filaOrf.cco_ndoc);
								w.$e.find('[name=cde_otip]').val(filaOrf.ope_ctip);

								Sisem.unblockW(w.$e);
								return callback(rpta);

							}
						});
					} else {
            Sisem.unblockW(w.$e);
            return callback(rpta);
					}
				}
			});
		}else{
			Sisem.unblockW(w.$e);
			return callback(rpta);
		}
	},
	refrescarFormulario: function(w){
//		if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.modo+' '+w.pag.alias);}
//		else{w.$e.parent().find('.ui-dialog-title').html(w.modo+' '+w.pag.alias);}
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
				
				oper.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				oper.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				oper.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){

//		Sisem.activar(w.$e.find('[name=tra_kyusu]'), false);
//		Sisem.activar(w.$e.find('[name=caj_kysuc]'), false);
		Sisem.activar(w.$e.find('[name=caj_nomb]'), w.activar);

//		Sisem.activar(w.$e.find('[name=apc_kyapc]'), false);
		Sisem.activar(w.$e.find('[name=apc_fini]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=cco_kycco]'), w.activar);
		Sisem.activar(w.$e.find('[name=cco_dscr]'), w.activar);

		Sisem.activar(w.$e.find('[name=rub_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=cls_prop]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=cor_tipo]'), false);
		Sisem.activar(w.$e.find('[name=cor_nomb]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=bor_nomb]'), false);
		Sisem.activar(w.$e.find('[name=cor_tmon]'), false);
		Sisem.activar(w.$e.find('[name=cor_ndoc]'), false);
		Sisem.activar(w.$e.find('[name=cor_otip]'), false);
		
		Sisem.activar(w.$e.find('[name=cde_tipo]'), false);
		Sisem.activar(w.$e.find('[name=cde_nomb]'), ((w.$e.find('[name=ope_tope] option:selected').html()=='TRANSFERENCIA')?w.activar:false));
		Sisem.activar(w.$e.find('[name=btnSelCde]'), ((w.$e.find('[name=ope_tope] option:selected').html()=='TRANSFERENCIA')?w.activar:false));
		Sisem.activar(w.$e.find('[name=bde_nomb]'), false);
		Sisem.activar(w.$e.find('[name=cde_tmon]'), false);
		Sisem.activar(w.$e.find('[name=de_ndoc]'), false);
		Sisem.activar(w.$e.find('[name=cde_otip]'), false);
		
		Sisem.activar(w.$e.find('[name=ope_tope]'), (w.tipoOperacion=='OPERACION') ? w.activar : false);
		Sisem.activar(w.$e.find('[name=ope_fpag]'), false);
		Sisem.activar(w.$e.find('[name=ope_peri]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_freg]'), w.activar);
		Sisem.activar(w.$e.find('[name=pe_ccmp]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_cven]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_otip]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_tdoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_ndoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_esta]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_mmon]'), false);
		Sisem.activar(w.$e.find('[name=ope_mimp]'), false);
		Sisem.activar(w.$e.find('[name=ope_omon]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_oimp]'), w.activar);
		Sisem.activar(w.$e.find('[name=ope_tcam]'), false);
		Sisem.activar(w.$e.find('[name=ope_refe]'), false);
		Sisem.activar(w.$e.find('[name=ope_pobs]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnOpeImagUp]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnOpeImagDown]'), !w.activar);
		Sisem.activar(w.$e.find('[name=ope_fimg]'), false);

//		Sisem.activar(w.$e.find('[name=doc_kyccor]'), false);
		Sisem.activar(w.$e.find('[name=doc_tope]'), false);
		Sisem.activar(w.$e.find('[name=doc_tdoc]'), false);
		Sisem.activar(w.$e.find('[name=doc_ndoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=doc_enom]'), false);
		Sisem.activar(w.$e.find('[name=doc_tmon]'), false);
		Sisem.activar(w.$e.find('[name=doc_tota]'), false);
		Sisem.activar(w.$e.find('[name=doc_tpag]'), false);
		Sisem.activar(w.$e.find('[name=doc_scan]'), false);
		Sisem.activar(w.$e.find('[name=doc_spag]'), false);
		Sisem.activar(w.$e.find('[name=btnSelDoc]'), w.activar);
	},
	validarFormulario: function(w, modo){
	  var preTbl = 'ope, cor, cde, rub, cls, doc';
		if(modo == 'VALIDAR' && w.tipoOperacion!='OPERACION')
		{
			var ope_kydoc = parseInt(w.$e.find('[name=ope_kydoc]').val());
			var doc_kydoc = parseInt(w.$e.find('[name=doc_kydoc]').val());
			var ope_oimp = parseFloat(w.$e.find('[name=ope_oimp]').val());
			var doc_tpag = parseFloat(w.$e.find('[name=doc_tpag]').val());
			var doc_tota = parseFloat(w.$e.find('[name=doc_tota]').val());
			if( ope_kydoc > 0 && (ope_oimp + doc_tpag) > doc_tota ){
				Sisem.msgBox('error','Excede el total del documento!!!');
				return false;
			}
			if( ope_kydoc > 0 && doc_kydoc < 1 || isNaN(doc_kydoc) ){
				Sisem.msgBox('error','Ingrese un documento de ' + w.tipoOperacion);
				return false;
			}
		}
		if(!Sisem.validarControlesColor(w.$e, preTbl, modo))
		{
			console.log('Controles no validados!!!');
			return false;
		}
		return true;
	},
	validarServidor: function(w, callback){
		var data=docu.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(docu.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
			}
			else if(rpta.msg.type=="error")
			{
				Sisem.msgBox(rpta.msg.type, rpta.msg.text);
				return callback(false);
			}
		});
	},
  nuevoRegistroRx: function(w, callback){
    Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc:USERDATA.suc.suc_kysuc, prp_secc: 'NUMDOC',prp_dscr:w.$e.find('[name=ope_tdoc]').val(), prp_nive: 2}, function(rpta){
      if(rpta.lista.items.length > 0)
      {
        var prp = rpta.lista.items[0];
        w.$e.find('[name=prp_kyprp]').val(prp.prp_kyprp);
        w.$e.find('[name=ope_ndoc]').val(Sisem.llenarCeros(prp.prp_prop, 3) + '-' + Sisem.llenarCeros(parseInt(prp.prp_valu)+1, 6));
      }//if(rpta.lista.items.length > 0)
      else
      {
        w.$e.find('[name=ope_ndoc]').val('001-000000');
      }
      var titleNumDoc = ' '+w.$e.find('[name=ope_tdoc]').val()+' '+w.$e.find('[name=ope_ndoc]').val();
      if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.pag.modo+' '+w.pag.alias+titleNumDoc);}
      else{w.$e.parent().find('.ui-dialog-title').html(w.pag.modo+' '+w.pag.alias+titleNumDoc);}
      return callback(rpta);
    });
  },
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},	
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='OPERA'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: oper.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+oper.tipPag[w.tipo]['name'],
			nameWP		: 'win'+oper.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+oper.tipPag[w.tipo]['name'],
			nameWI		: 'int'+oper.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+oper.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+oper.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+oper.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+oper.tipPag[w.tipo]['name']
		});
		oper.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		console.log('DEBUG 5: ' + w.tipoOperacion);
		oper.winPop({
			tipoOperacion: w.tipoOperacion,
			tipo: w.tipo,
			modo:'AGREGAR',
			apc: ((w.apc)?w.apc:USERDATA.apc),
			caj: ((w.apc)?w.suc:USERDATA.suc),
			tra: ((w.apc)?w.tra:USERDATA.tra),			
			tipo:w.tipo,
			ctrl:w.ctrl,
			size:'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			oper.llenarFormularioRx(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(oper.validarFormulario(w,'VALIDAR')){
				Sisem.blockW(w.$e);
				var data = oper.obtenerDatoFormulario(w);
				Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=ope_kyope]').val(rpta.ope_kyope);
						$.extend(w,{modo: 'VISUALIZAR'});
						oper.cerrarFormulario($.extend(w,{data : oper.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar')
		{
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});	
			oper.limpiarFormulario(w);
			oper.llenarFormularioRx(w, function(rpta){
				oper.refrescarFormulario(w);
				oper.validarFormulario(w, w.modo);	
			});			
		}
		else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar')
		{
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			oper.limpiarFormulario(w);
			oper.llenarFormularioRx(w, function(rpta){
				oper.refrescarFormulario(w);
				oper.validarFormulario(w, w.modo);	
			});			
		}
	},
	btnEliminarClick: function(w){
		var lisKySel = [];
		if(lisKySel.length==0){lisKySel.push({ky: w.$e.find('[name=ope_kyope]').val()});}
		var resp = Sisem.msgAsk('Desea eliminar', w.$e.find('[name=ope_pobs]').val(), function(rpta){
			if(rpta=='Si'){
				var data = {comando: 'ELIMINAR', lisKy: lisKySel};
				Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						oper.cerrarFormulario($.extend(w,{data : oper.obtenerDatoFormulario(w)}));						
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
			}//if(rpta=='Si'){
		});
	},	
	abrirReferencia: function(url){
		Sisem.windowPrint({id:'printVent',title:'Imprimir',urlIframe:url});
	},
	llenarCtacorrienteOrigen:function(w, cor){
		w.$e.find('[name=cor_kyusu]').val(cor.usu_kyusu);
		w.$e.find('[name=cor_tipo]').val(cor.usu_tipo);
		w.$e.find('[name=cor_nomb]').val(cor.usu_nomb);
		w.$e.find('[name=bor_nomb]').val(cor.bnc_prop);
		
		w.$e.find('[name=cor_kycco]').val(cor.cco_kycco);
		w.$e.find('[name=cor_tdoc]').val(cor.cco_tdoc);
		w.$e.find('[name=cor_ndoc]').val(cor.cco_ndoc);
		w.$e.find('[name=cor_tmon]').val(cor.cco_tmon);
		w.$e.find('[name=cor_tota]').val(Sisem.redondeoString(cor.cco_sant));
		w.$e.find('[name=cor_scan]').val(Sisem.redondeoString(cor.cco_scan));
		w.$e.find('[name=cor_spag]').val(Sisem.redondeoString(cor.cco_spag));						
	},
	llenarCtacorrienteDestino:function(w, cde){
		w.$e.find('[name=cde_kyusu]').val(cde.usu_kyusu);
		w.$e.find('[name=cde_tipo]').val(cde.usu_tipo);
		w.$e.find('[name=cde_nomb]').val(cde.usu_nomb);
		w.$e.find('[name=bde_nomb]').val(cde.bnc_prop);
		
		w.$e.find('[name=cde_kycco]').val(cde.cco_kycco);
		w.$e.find('[name=cde_tdoc]').val(cde.cco_tdoc);
		w.$e.find('[name=cde_ndoc]').val(cde.cco_ndoc);
		w.$e.find('[name=cde_tmon]').val(cde.cco_tmon);
		w.$e.find('[name=cde_tota]').val(Sisem.redondeoString(cde.cco_sant));
		w.$e.find('[name=cde_scan]').val(Sisem.redondeoString(cde.cco_scan));
	},
	llenarGridDoc:function(w){
		if(w.items!=null){
			for(var ite=0;ite<w.items.length;ite++){
				var $row = w.$e.find('[name=gridRef]').clone().children();
				$row.find('[name=item_ide]').val(w.items[ite].id_arti);
				$row.find('[name=item_cod]').val(w.items[ite].codi);
				$row.find('[name=item_nomb]').val(w.items[ite].nomb);
				$row.find('[name=item_marc]').val(w.items[ite].marNomb);
				$row.find('[name=item_unid]').val(w.items[ite].uniNomb);

				$row.find('[name=item_cant]').val(Sisem.redondeoString(w.items[ite].cant));
				$row.find('[name=item_cost]').val(Sisem.redondeoString(w.items[ite].cost));
				$row.find('[name=item_prec]').val(Sisem.redondeoString(w.items[ite].prec));

				$row.find('[name=item_dcto]').val(Sisem.redondeoString(w.items[ite].dcto));
				$row.find('[name=item_pdto]').val(Sisem.redondeoString(w.items[ite].pdto));
				
				if(w.tope=='0001' || w.tope=='0003' ||w.tope=='0005' || w.tope=='0006' || w.tope=='0007' || w.tope=='0008'){$row.find('[name=item_pope]').val(Sisem.redondeoString(w.items[ite].cost));}
				else{$row.find('[name=item_pope]').val(Sisem.redondeoString(w.items[ite].prec));}
				
				$row.find('[name=item_ccot]').html(Sisem.redondeoString(w.items[ite].ccot));
				$row.find('[name=item_cped]').html(Sisem.redondeoString(w.items[ite].cped));
				$row.find('[name=item_cent]').html(Sisem.redondeoString(w.items[ite].cent));
				$row.find('[name=item_cfac]').html(Sisem.redondeoString(w.items[ite].cfac));
				
				$row.find('[name=item_sact]').html(Sisem.redondeoString(w.items[ite].sact));
				$row.data('data',w.items[ite]);
				w.$e.find('[name=gridItemDoc]').append($row);
			}					
		}//if(rpta.lisCdo!=null){		
	},	
	////////////////////////
	//Metodhs Miscellanous//
	////////////////////////		
	calcular: function(w){
		var tota = 0;
		var totDcto = 0;
		if(w.$e.find('[name=gridItemDoc] tr').length>0){
			for(var i=0;i<w.$e.find('[name=gridItemDoc] tr').length;i++){
				var $row = w.$e.find('[name=gridItemDoc] tr').eq(i);
				var cant = $row.find('[name=item_cant]').val();
				var pope = $row.find('[name=item_pope]').val();
				var dcto = $row.find('[name=item_dcto]').val();
				
				cant = parseFloat(cant);
				pope = parseFloat(pope);
				dcto = parseFloat(dcto);
				
				if(isNaN(cant)) {cant = 0;$row.find('[name=item_cant]').val(Sisem.redondeoString(cant));}
				if(isNaN(pope)) {pope = 0;$row.find('[name=item_pope]').val(Sisem.redondeoString(pope));}
				if(isNaN(dcto)) {dcto = 0; $row.find('[name=item_dcto]').val(Sisem.redondeoString(dcto));}
				
				var pdto = pope-dcto;
				var impo = cant*pdto;
				
				totDcto+=dcto;
				tota+=impo;
				$row.find('[name=item_pdto]').val(Sisem.redondeoString(pdto));
				$row.find('[name=item_impo]').val(Sisem.redondeoString(impo));
				
				$row.find('[name=item_cost]').val(Sisem.redondeoString(parseFloat($row.find('[name=item_cost]').val())));
				$row.find('[name=item_prec]').val(Sisem.redondeoString(parseFloat($row.find('[name=item_prec]').val())));
			}
			var igve = tota*0.18;
			var stot = tota/1.18;
			w.$e.find('[name=stot]').val(Sisem.redondeoString(stot));
			w.$e.find('[name=dcto]').val(Sisem.redondeoString(totDcto));
			w.$e.find('[name=igve]').val(Sisem.redondeoString(igve));
			w.$e.find('[name=tota]').val(Sisem.redondeoString(tota));
			
		}else{
			w.$e.find('[name=stot]').val(0.00);
			w.$e.find('[name=dcto]').val(0.00);
			w.$e.find('[name=igve]').val(0.00);
			w.$e.find('[name=tota]').val(0.00);
			w.$e.find('[name=id_padr]').val('');
		}
	},
	mostrarCamposVentaCompra: function(w){
		if(w.tipoOperacion == "VENTA" || w.tipoOperacion == "COMPRA")
		{
			w.$e.find('[name=divDocumento]').show();
			w.$e.find('[name=doc_ndoc]').val('');
		} else {
			w.$e.find('[name=divDocumento]').hide();
			w.$e.find('[name=doc_kydoc]').val('-1');
			w.$e.find('[name=doc_ndoc]').val('000-000000');
		}
	}
};
