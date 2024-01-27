var back = {
	wb:null,
	wp:null,
	ws:null,
	wi:null,
	we:null,
	pag:{
		alias		: 'back',
		nameWB		: 'brwControlador',
		nameWP		: 'winControlador',
		nameWS		: 'selControlador',
		nameWI		: 'intControlador',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwControlador',
		idGridWP	: 'idWinControlador',
		idGridWS	: 'idSelControlador',
		idGridWI	: 'idIntControlador'
	},
	tipPag: {
		"BACKUP":{'name': 'back', 'alias': 'Control de Sistema de backup'}
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
		back.winBrow(w);
	},
	winBrow : function(w){
		back.import(function(){
			if(w==null)w=new Object;
			back.setPagina(w);
			back.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					back.iniciarBrowse($.extend(w,{idGrid:back.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}
			});
		});//back.import(function(){
	},
	winPop:function(w){
		back.import(function(){
			if(w==null)w=new Object;
			back.wp=w;
			back.pag.modo=((w.modo)?w.modo:'AGREGAR');
			Sisem.Window({
				id:back.pag.nameWP,
				title:back.pag.modo+' '+back.pag.alias,
				width:550,
				height:450,
				url:base_url+'erp/back/edit?tipo='+w.tipo,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						click : function() {
							back.btnAgregarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						click : function() {
							back.btnModificarClick(w);
						}
					},
					{html : "<i class='fa fa-check'></i><span name='etiBuscar'>Imprimir</span>",
						"class" : "btn btn-primary",
						"name" : "btnImprimir",
						click : function() {
							back.btnImprimirClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						click : function() {
							back.cerrarFormulario(w);
						}
					}				
				],
				afterLoad:function(){				
					w.$e = $('#'+back.pag.nameWP);
					Sisem.blockW(w.$e);
					Sisem.formato(w);
					
					w.$e.find('[name=btnAddGru]').click(function(){back.btnAddGruClick(w);});
					w.$e.find('[name=btnAddCon]').click(function(){
						back.winSel({
							showToolBar: true,
							tipo:'CON',
							modo:'SELECCIONAR',
							multiSelect: true,
							callback:function(data){
								if(data)
								{
									if(back.validarFormulario($.extend(w,{id_enti: data.id_enti, evento: 'validarItemUnico'}))){
										data.id_padr=w.$e.find('[name=usu_kyusu]').val();
										$.post(base_url+'erp/enti/update',data,function(rpta){
											Sisem.msgBox(rpta.msg.type, rpta.msg.text);
											if(rpta.msg.type=='success'){
												back.iniciarFormulario(w);
											}
										},'json');
									}
								}
							}
						});					
					});
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
		});//back.import(function(){
	},
	winSel:function(w){
		back.import(function(){
			if(w==null)w=new Object;
			back.setPagina(w);
			back.ws=w;
			back.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:back.pag.nameWS,
				title:'Seleccionar '+back.pag.alias,
				width:1200,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{html : "<i class='fa fa-times'></i>&nbsp; Seleccionar",
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								back.cerrarFormulario(w);
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
									back.cerrarFormulario($.extend(w, {data: data}));
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
							back.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+back.pag.nameWS);
					Sisem.blockW(w.$e);
					back.iniciarBrowse($.extend(w,{idGrid:back.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}
			});//Sisem.WindowBS({
		});//back.import(function(){
	},
	iniciarBrowse: function(w){
		var archivo='';
		if(w.tipo=='CLI' || w.tipo=='COM'){archivo='brw_'+w.tipo.toLowerCase();}
		else{archivo='cmn/brw_usua';}
		Sisem.iniciarBrowse($.extend(w, {archivo: archivo}));
	},
	iniciarFormulario:function(w){
		back.limpiarFormulario(w);
		back.llenarFormulario(w);
		back.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=usu_kyusu]').val('');
		w.$e.find('[name=usu_tipo]:checked').val('');
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
		w.$e.find('[name=img_foto]').attr('src',base_url+'app/com/erp/images/pregunta.png').fadeIn();

		w.$e.find('[name=usu_firm]').val('');
		w.$e.find('[name=img_firm]').attr('src',base_url+'app/com/erp/images/pregunta.png').fadeIn();
		
		w.$e.find('[name=gru_nomb]').val('');
		w.$e.find('[name=div_nomb]').val('');
		w.$e.find('[name=reg_nomb]').val('');
		w.$e.find('[name=cat_nomb]').val('');
		w.$e.find('[name=car_nomb]').val('');
		w.$e.find('[name=usu_obse]').val('');
		
		w.$e.find('[name=usu_fing]').val(moment(Sisem.fechor()).format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		
		w.$e.find('[name=tra_codi]').val('');
		w.$e.find('[name=tra_fnac]').val('');
		w.$e.find('[name=tra_fing]').val('');
		w.$e.find('[name=tra_fces]').val('');
		w.$e.find('[name=tra_cate]').val(0);
		w.$e.find('[name=tra_sisp]').val(0);
		w.$e.find('[name=tra_cusp]').val('');
		w.$e.find('[name=tra_nuhi]').val('0');
		w.$e.find('[name=tra_deal]').val(0);
		w.$e.find('[name=gridItemCli]').children('tbody').children().remove();
		w.$e.find('[name=gridItemCon]').children('tbody').children().remove();
	},
	obtenerDatoFormulario: function(w){
		var data = {
			id_enti: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=usu_kyusu]').val()),
			id_padr: w.$e.find('[name=pad_kyusu]').val(),
			id_grup: w.$e.find('[name=gru_nomb] :selected').val(),
			id_divi: w.$e.find('[name=div_nomb] :selected').val(),
			id_regi: w.$e.find('[name=reg_nomb] :selected').val(),
			id_cate: w.$e.find('[name=cat_nomb] :selected').val(),
			id_carg: w.$e.find('[name=car_nomb] :selected').val(),
			id_area: w.$e.find('[name=are_nomb] :selected').val(),
			id_deno: w.$e.find('[name=den_nomb] :selected').val(),
			id_conv: w.$e.find('[name=cnv_nomb] :selected').val(),
			id_sisp: w.$e.find('[name=sis_nomb] :selected').val(),
			id_sucu: Sisem.get(USERDATA.suc,'id_sucu','0'),
			codi: w.$e.find('[name=usu_codi]').val(),
			fing: w.$e.find('[name=usu_fing]').val(),
			nomb: w.$e.find('[name=usu_nomb]').val(),
			tdoc:w.$e.find('[name=usu_tdoc] :selected').val(),
			ndoc:(!Sisem.isEmpty(w.$e.find('[name=usu_ndoc]').val()) ? w.$e.find('[name=usu_ndoc]').val() : (new Date()).getTime() ),
			tele:w.$e.find('[name=usu_tele]').val(),
			mobi:w.$e.find('[name=usu_mobi]').val(),
			mail:w.$e.find('[name=usu_mail]').val(),
			dire:w.$e.find('[name=usu_dire]').val(),
			mpla:w.$e.find('[name=usu_mpla]').val(),// 02-04-2015 Datos para el transportista Marca/Placa
			cins:w.$e.find('[name=usu_cins]').val(),// 02-04-2015 Datos para el transportista Certificado de Inscripcion
		    lcon:w.$e.find('[name=usu_lcon]').val(),// 02-04-2015 Datos para el transportista Lincencia de Conducir	
			tipo:w.tipo,
			obse:w.$e.find('[name=usu_obse]').val(),
			foto:w.$e.find('[name=usu_foto]').val(),
			firm:w.$e.find('[name=usu_firm]').val(),
			esta:((w.$e.find('[name=usu_esta]').length>0) ? w.$e.find('[name=usu_esta]').val() : '0001'),
			vers:1
		};
		if(w.tipo=='TRA'){
			data.trabajador = {};
			data.trabajador.codi = w.$e.find('[name=tra_codi]').val();
			data.trabajador.fnac = w.$e.find('[name=tra_fnac]').val();
			data.trabajador.fing = w.$e.find('[name=tra_fing]').val();
			data.trabajador.fces = w.$e.find('[name=tra_fces]').val();
			data.trabajador.cate = w.$e.find('[name=tra_cate] :selected').val();
			data.trabajador.sisp = w.$e.find('[name=tra_sisp] :selected').val();
			data.trabajador.cusp = w.$e.find('[name=tra_cusp]').val();
			data.trabajador.nuhi = w.$e.find('[name=tra_nuhi]').val();
			data.trabajador.deal = w.$e.find('[name=tra_deal] :selected').val();
		}
		return data;
	},	
	llenarFormulario:function(w){
		if(w.$e.find('[name=cat_nomb]').length>0){cate.llenarComboCategoria($.extend(w, {cat_tipo: w.tipo}));}
		if(w.$e.find('[name=gru_nomb]').length>0){cate.llenarComboGrupo($.extend(w, {cat_tipo: 'GRU'}));}
		if(w.$e.find('[name=div_nomb]').length>0){cate.llenarComboDivision($.extend(w, {cat_tipo: 'DIV'}));}
		if(w.$e.find('[name=reg_nomb]').length>0){cate.llenarComboRegimen($.extend(w, {cat_tipo: 'REG'}));}
		if(w.$e.find('[name=car_nomb]').length>0){cate.llenarComboCargo($.extend(w, {cat_tipo: 'CAR'}));}
		if(w.$e.find('[name=are_nomb]').length>0){cate.llenarComboArea($.extend(w, {cat_tipo: 'ARE'}));}
		if(w.$e.find('[name=den_nomb]').length>0){cate.llenarComboDenominacion($.extend(w, {cat_tipo: 'DEN'}));}
		if(w.$e.find('[name=cnv_nomb]').length>0){cate.llenarComboConvenio($.extend(w, {cat_tipo: 'CNV'}));}
		if(w.$e.find('[name=sis_nomb]').length>0){sisp.llenarComboSistema(w);};
		if(w.$e.find('[name=pad_nomb]').length>0)
		{
			if(w.tipo=='COM'){back.padreAutocomplete($.extend(w, {usu_tipo:'CLI'}));}
			else{back.padreAutocomplete($.extend(w, {usu_tipo:'EMP'}));}
		}
		if(w.id>0){w.$e.find('[name=usu_kyusu]').val(w.id);}
		if(!Sisem.isEmpty(w.$e.find('[name=usu_kyusu]').val())){
			$.get(base_url+'erp/enti/get',{id: w.$e.find('[name=usu_kyusu]').val()},function(rpta){
				w.ent=rpta.ent;
				w.tra=rpta.tra;
				w.$e.find('[name=usu_kyusu]').val(w.ent.id_enti);
				w.$e.find('[name=pad_kyusu]').val(w.ent.id_padr);
				w.$e.find('[name=gru_nomb]').val(w.ent.id_grup);
				w.$e.find('[name=div_nomb]').val(w.ent.id_divi);
				w.$e.find('[name=reg_nomb]').val(w.ent.id_regi);
				w.$e.find('[name=cat_nomb]').val(w.ent.id_cate);
				w.$e.find('[name=car_nomb]').val(w.ent.id_carg);
				w.$e.find('[name=are_nomb]').val(w.ent.id_area);
				w.$e.find('[name=den_nomb]').val(w.ent.id_deno);
				w.$e.find('[name=cnv_nomb]').val(w.ent.id_conv);
				w.$e.find('[name=sis_nomb]').val(w.ent.id_sisp);
				w.$e.find('[name=usu_codi]').val(w.ent.codi);
				w.$e.find('[name=usu_tipo]').val(w.ent.tipo);
				w.$e.find('[name=usu_esta]').val(w.ent.esta);
				w.$e.find('[name=usu_nomb]').val(w.ent.nomb);
				w.$e.find('[name=usu_tdoc]').val(w.ent.tdoc);
				w.$e.find('[name=usu_ndoc]').val(w.ent.ndoc);
				w.$e.find('[name=usu_tele]').val(w.ent.tele);
				w.$e.find('[name=usu_mobi]').val(w.ent.mobi);
				w.$e.find('[name=usu_mail]').val(w.ent.mail);
				w.$e.find('[name=usu_dire]').val(w.ent.dire);
				w.$e.find('[name=usu_mpla]').val(w.ent.mpla); // 02-04-2015 Datos para el transportista Marca/Placa
				w.$e.find('[name=usu_cins]').val(w.ent.cins); // 02-04-2015 Datos para el transportista Certificado de Inscripcion
				w.$e.find('[name=usu_lcon]').val(w.ent.lcon); // 02-04-2015 Datos para el transportista Lincencia de Conducir	
				w.$e.find('[name=usu_vers]').val(w.ent.vers);
				w.$e.find('[name=usu_tipo]').find('[value='+w.ent.tipo+']').attr('selected','selected');
				w.$e.find('[name=usu_tipo]').change();

				Sisem.getFile(((typeof w.ent.firm==='undefined' || w.ent.firm=='')?'pregunta.png':w.ent.firm), 'images',function(rpta){
					if(rpta.msg.type=='success'){w.$e.find('[name=img_foto]').attr('src',rpta.pathFile).fadeIn();}
					else{w.$e.find('[name=img_foto]').attr('src',base_url+'app/com/erp/images/pregunta.png').fadeIn();}
				});
				w.$e.find('[name=usu_foto]').val(w.ent.foto);
				
				Sisem.getFile(((typeof w.ent.firm==='undefined' || w.ent.firm=='')?'pregunta.png':w.ent.firm), 'images',function(rpta){
					if(rpta.msg.type=='success'){w.$e.find('[name=img_firm]').attr('src',rpta.pathFile).fadeIn();}
					else{w.$e.find('[name=img_foto]').attr('src',base_url+'app/com/erp/images/pregunta.png').fadeIn();}
				});
				w.$e.find('[name=usu_firm]').val(w.ent.firm);

				w.$e.find('[name=gru_nomb]').val(w.ent.id_grup);
				w.$e.find('[name=div_nomb]').val(w.ent.id_divi);
				w.$e.find('[name=reg_nomb]').val(w.ent.id_regi);
				w.$e.find('[name=cat_nomb]').val(w.ent.id_cate);
				w.$e.find('[name=car_nomb]').val(w.ent.id_carg);
				w.$e.find('[name=usu_obse]').val(w.ent.obse);
				
				if(w.tipo==='TRA')
				{
					w.$e.find('[name=tra_codi]').val(w.tra.codi);
					w.$e.find('[name=tra_fnac]').val(w.tra.fnac);
					w.$e.find('[name=tra_fing]').val(w.tra.fing);
					w.$e.find('[name=tra_fces]').val(w.tra.fces);
					w.$e.find('[name=tra_cate]').val(w.tra.cate);
					w.$e.find('[name=tra_sisp]').val(w.tra.sisp);
					w.$e.find('[name=tra_cusp]').val(w.tra.cusp);
					w.$e.find('[name=tra_nuhi]').val(w.tra.nuhi);
					w.$e.find('[name=tra_deal]').val(w.tra.deal);
					$.get(base_url+'erp/enti/get_lis_cli/',{tipo:'CLI',id:w.ent.id_enti},function(rpta){
						back.llenarGridCli($.extend(w,{items:rpta.items}));
					},'json');									
				}
				if(w.tipo=='EMP')
				{
					$.get(base_url+'erp/enti/getEmpresa',{id:w.$e.find('[name=pad_kyusu]').val(), nomb: w.$e.find('[name=usu_nomb]').val()},function(rpta){
						if(rpta.emp)
						{
							w.$e.find('[name=pad_kyusu]').val(rpta.emp.id_empr);
							w.$e.find('[name=pad_nomb]').val(rpta.emp.nomb);
						}
					},'json');
				}
				else
				{
					if(!Sisem.isEmpty(w.$e.find('[name=pad_kyusu]').val())){
						$.get(base_url+'erp/enti/get',{id:w.$e.find('[name=pad_kyusu]').val()},function(rpta){
							if(rpta.ent)
							{
								w.$e.find('[name=pad_kyusu]').val(rpta.ent.id_enti);
								w.$e.find('[name=pad_tipo]').val(back.tipPag[rpta.ent.tipo]['name']);
								w.$e.find('[name=pad_nomb]').val(rpta.ent.nomb);
							}
						},'json');
					}
				}
				$.get(base_url+'erp/enti/getLisHij/',{tipo:'CON',id:w.ent.id_enti},function(rpta){
					back.llenarGridCon($.extend(w,{items:rpta.items}));
				},'json');									
				Sisem.unblockW(w.$e);
			},'json');
		}
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){back.wp.$e.parent().find('.modal-title').html(w.modo+' '+back.pag.alias);}
		else{back.wp.$e.parent().find('.ui-dialog-title').html(w.modo+' '+back.pag.alias);}
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
				
				back.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				back.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				back.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
		w.$e.find('[name=usu_tipo]:checked').attr('disabled',!w.activar),
		w.$e.find('[name=usu_esta]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_nomb]').attr('disabled',!w.activar);
		Sisem.activar(w.$e.find('[name=usu_codi]'), w.activar);
		
		w.$e.find('[name=usu_fing]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_tdoc]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_ndoc]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_tele]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_mobi]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_mail]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_dire]').attr('disabled',!w.activar);		
		w.$e.find('[name=usu_mpla]').attr('enabled',!w.activar); // 02-04-2015 Datos para el transportista Marca/Placa
		w.$e.find('[name=usu_cins]').attr('disabled',!w.activar); // 02-04-2015 Datos para el transportista Certificado de Inscripcion
		w.$e.find('[name=usu_lcon]').attr('disabled',!w.activar); // 02-04-2015 Datos para el transportista Lincencia de Conducir		
		w.$e.find('[name=usu_vers]').attr('disabled',!w.activar);
		w.$e.find('[name=usu_tipo]').attr('disabled',!w.activar);
		
		Sisem.activar(w.$e.find('[name=gru_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddGru]'), w.activar);
		Sisem.activar(w.$e.find('[name=div_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddDiv]'), w.activar);
		Sisem.activar(w.$e.find('[name=reg_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddReg]'), w.activar);
		Sisem.activar(w.$e.find('[name=cat_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddCat]'), w.activar);
		Sisem.activar(w.$e.find('[name=car_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddCar]'), w.activar);
		Sisem.activar(w.$e.find('[name=are_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddAre]'), w.activar);
		Sisem.activar(w.$e.find('[name=den_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddDen]'), w.activar);
		Sisem.activar(w.$e.find('[name=cnv_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddCnv]'), w.activar);
		Sisem.activar(w.$e.find('[name=sis_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnAddSis]'), w.activar);
		Sisem.activar(w.$e.find('[name=pad_tipo]'), w.activar);
		Sisem.activar(w.$e.find('[name=pad_nomb]'), w.activar);Sisem.activar(w.$e.find('[name=btnSelEmp]'), w.activar);
		Sisem.activar(w.$e.find('[name=usu_obse]'), w.activar);
		
		w.$e.find('[name=tra_codi]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_fnac]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_fing]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_fces]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_cate]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_sisp]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_cusp]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_nuhi]').attr('disabled',!w.activar);
		w.$e.find('[name=tra_deal]').attr('disabled',!w.activar);
		w.$e.find('[name=inp_foto]').css('display','none');
		Sisem.activar(w.$e.find('[name=usu_foto]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFimg]'), w.activar, 'AZUL');

		w.$e.find('[name=inp_firm]').css('display','none');
		Sisem.activar(w.$e.find('[name=usu_firm]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFirm]'), w.activar, 'AZUL');
	},
	validarFormulario:function(w){
		if(Sisem.validarControles(w.$e,'ent')){return true;}
		if(Sisem.validarControles(w.$e,'tra')){return true;}
		if(w.tipo ==='TRA'){
			if(w.evento!=null && w.evento=='validarItemUnico'){
				if(w.$e.find('[name=gridItemCli] tr').length>0){
					for(var i=0;i<w.$e.find('[name=gridItemCli] tr').length;i++){
						var $row = w.$e.find('[name=gridItemCli] tr').eq(i);
						if(!Sisem.isEmpty(w.id_arti)){
							if($row.data('data').id_arti==w.id_arti){
								Sisem.msgBox('error','Este articulo ya existe!!!');
								return false;
							}
						}
					}
				}
			}
		}
		if(w.tipo ==='EMP'){
			if(w.evento!=null && w.evento=='validarItemUnico'){
				if(w.$e.find('[name=gridItemCon] tr').length>0){
					for(var i=0;i<w.$e.find('[name=gridItemCon] tr').length;i++){
						var $row = w.$e.find('[name=gridItemCon] tr').eq(i);
						if(!Sisem.isEmpty(w.usu_kyusu)){
							if($row.data('data').id_enti==w.id_enti){
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
		$.extend(back.pag, {
			alias		: back.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+back.tipPag[w.tipo]['name'],
			nameWP		: 'win'+back.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+back.tipPag[w.tipo]['name'],
			nameWI		: 'int'+back.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+back.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+back.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+back.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+back.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			back.limpiarFormulario(w);
			back.refrescarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(back.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=back.obtenerDatoFormulario(w);
				$.post(base_url+'erp/enti/save',data,function(rpta){
					Sisem.msgBox(rpta.msg.type,rpta.msg.text);
					Sisem.unblockW(w.$e);
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=usu_kyusu]').val(rpta.id_enti);
						$.extend(w,{modo: 'VISUALIZAR'});
						back.iniciarFormulario(w);
					}
				},'json');
			}
		}
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			back.refrescarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			back.iniciarFormulario(w);
		}
	},
	btnImprimirClick: function(w){
		rsta.winPop({
			modo: 'AGREGAR',
			tipo: 'REPVENCOB'
		});
	},		
	btnGuardarClick: function(w){
		if(back.validarFormulario(w)){
			Sisem.blockW(w.$e);
			var data=back.obtenerDatoFormulario(w);
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
		back.winPop({
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
	llenarGridCli:function(w){
		if(w.items!=null){
			var $tbody = w.$e.find('[name=gridItemCli]').children('tbody');
			$tbody.children().remove();
			for(var ite=0;ite<w.items.length;ite++){
				var $row ='<tr class="item">';
				$row+='<td><input type="hidden" name="item_kyusu" value="'+w.items[ite].id_enti+'"/>'+w.items[ite].ndoc+'</td>';
				$row+='<td>'+w.items[ite].nomb+' '+w.items[ite].ape1+' '+w.items[ite].ape2+'</td>';
				$row+='<td><button name="btnDelete" class="btn btn-primary">Eliminar</button></td>';
				$row+='</tr>';
				$tbody.append($row);
				$tbody.find('tr:last').data('data',w.items[ite]).on('click','[name=btnDelete]',function(){					
					$.post(base_url+'erp/enti/update',{id_enti:$(this).closest('tr').find('[name=item_kyusu]').val(), id_padr:0},function(rpta){
						if(rpta.msg.type=='success'){back.iniciarFormulario(w);}
						else{Sisem.msgBox(rpta.msg.type,rpta.msg.text);}
					},'json');
				});
			}					
		}	
	},
	btnSelEntClick: function(w){
		back.winSel({
			showToolBar: true,
			tipo: ((w.tipo=='COM')?'CLI':'EMP'),
			callback: function(data){
				if(data!=null)
				{
					w.$e.find('[name=pad_kyusu]').val(data.id_enti);
					w.$e.find("[name=pad_tipo]").val(back.tipPag[data.tipo]['name']);
					w.$e.find('[name=pad_nomb]').val(data.nomb);
				}
			}
		});
	}
};