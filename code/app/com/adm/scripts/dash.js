var dash = {
	pag:{
		alias		: 'Dashboard',
		nameWB		: 'brwDashboard',
		nameWP		: 'winDashboard',
		nameWS		: 'selDashboard',
		nameWI		: 'intDashboard',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwDashboard',
		idGridWP	: 'idWinDashboard',
		idGridWS	: 'idSelDashboard',
		idGridWI	: 'idIntDashboard'
	},
	tipPag: {
		"DGEN":{'name': 'Dashgeneral', 'alias': 'Dashboard General'},
		"DANT":{'name': 'Dashanterior', 'alias': 'Dashboard Anterior'},
		"DING":{'name': 'Dashingreso', 'alias': 'Dashboard Ingreso'},
		"DEGR":{'name': 'Dashegreso', 'alias': 'Dashboard Egreso'},
		"DCOS":{'name': 'Dashcosto', 'alias': 'Dashboard Costo'},
		"DASH":{'name': 'Dashgrafico', 'alias': 'Dashboard Grafico'}
	},
	tipPagAct: '',
	idBrwDashActual: '',
	listaOrden: ['cco_kycco','rub_nomb','cls_nomb'],
	listaNombre: ['Cuenta','Rubro','Clase'],
	listaValor: ['','',''],	
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['adm/oper','adm/prop']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init:function(w){
		if(w==null)w=new Object();
		dash.winBrow(w);
	},
	winBrow: function(w){
		dash.import(function(rpta){
			if(w==null)w=new Object;
			dash.setPagina(w);
			dash[w.pag.nameWB]=w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');

					/** *****************************************
					 * INICIO : CONTROLES DE FILTRO DE DASHBOARD
					 ** *****************************************/
					tmpListaOrden = JSON.parse(JSON.stringify(dash.listaOrden));
					tmpListaNombre = JSON.parse(JSON.stringify(dash.listaNombre));
					w.$e.find('[name=bal_niv0]').empty();
					w.$e.find('[name=bal_niv1]').empty();
					w.$e.find('[name=bal_niv2]').empty();

					/**
					 * LLENAMOS EL PRIMER COMBO
					 ****************************/
					for(key in tmpListaOrden){w.$e.find('[name=bal_niv0]').append('<option value="'+tmpListaOrden[key]+'">'+tmpListaNombre[key]+'</option');}
					Sisem.deleteArray(tmpListaOrden, tmpListaOrden[0]);
					Sisem.deleteArray(tmpListaNombre, tmpListaNombre[0]);
					/**
					 * LLENAMOS EL SEGUNDO COMBO
					 ****************************/
					for(key in tmpListaOrden){w.$e.find('[name=bal_niv1]').append('<option value="'+tmpListaOrden[key]+'">'+tmpListaNombre[key]+'</option');}
					Sisem.deleteArray(tmpListaOrden, tmpListaOrden[0]);
					Sisem.deleteArray(tmpListaNombre, tmpListaNombre[0]);
					/**
					 * LLENAMOS EL TERCER COMBO
					 ****************************/
					for(key in tmpListaOrden){w.$e.find('[name=bal_niv2]').append('<option value="'+tmpListaOrden[key]+'">'+tmpListaNombre[key]+'</option');}
					Sisem.deleteArray(tmpListaOrden, tmpListaOrden[0]);
					Sisem.deleteArray(tmpListaNombre, tmpListaNombre[0]);
					
					w.$e.find('[name=bal_niv0]').change(function(){
						
//						dash.brwDashgeneral.$e.find('tbody').children().remove();
						$('#'+w.idGrid).find('.table-responsive').find('tbody').empty();
						$('#gridDashIngreso').find('.table-responsive').find('tbody').empty();
						$('#gridDashEgreso').find('.table-responsive').find('tbody').empty();
						
						w.$e.find('[name=bal_niv1]').empty();
						w.$e.find('[name=bal_niv2]').empty();
						
						tmpListaOrden = JSON.parse(JSON.stringify(dash.listaOrden));
						tmpListaNombre = JSON.parse(JSON.stringify(dash.listaNombre));
						
						Sisem.deleteArray(tmpListaOrden, $('option:selected',this).val());
						Sisem.deleteArray(tmpListaNombre, $('option:selected',this).text());
						
						for(key in tmpListaOrden){w.$e.find('[name=bal_niv1]').append('<option value="'+tmpListaOrden[key]+'">'+tmpListaNombre[key]+'</option');}
						
						w.$e.find('[name=bal_niv1]').val('');
					});
					w.$e.find('[name=bal_niv1]').change(function(){
						
						$('#'+w.idGrid).find('.table-responsive').find('tbody').empty();
						$('#gridDashIngreso').find('.table-responsive').find('tbody').empty();
						$('#gridDashEgreso').find('.table-responsive').find('tbody').empty();
						
						w.$e.find('[name=bal_niv2]').empty();

						tmpListaOrden = JSON.parse(JSON.stringify(dash.listaOrden));
						tmpListaNombre = JSON.parse(JSON.stringify(dash.listaNombre));

						Sisem.deleteArray(tmpListaOrden, w.$e.find('[name=bal_niv0] option:selected').val());
						Sisem.deleteArray(tmpListaNombre, w.$e.find('[name=bal_niv0] option:selected').text());

						Sisem.deleteArray(tmpListaOrden, $('option:selected',this).val());
						Sisem.deleteArray(tmpListaNombre, $('option:selected',this).text());
						
						for(key in tmpListaOrden){w.$e.find('[name=bal_niv2]').append('<option value="'+tmpListaOrden[key]+'">'+tmpListaNombre[key]+'</option');}
					});
					w.$e.find('[name=btnRefreshDashgeneral]').click(function(){
						console.log('Refresh : ' + dash.idBrwDashActual);
						$idBrwDashActual = $('#'+dash.idBrwDashActual);
						w.$e.find('[name="etiDashActual"]').html("idDashActual : "+dash.idBrwDashActual);
						
						if(typeof dash.brwDashgeneral.$e.find('[name=bal_niv0] option:selected').html()!='undefined'
						&& typeof dash.brwDashgeneral.$e.find('[name=bal_niv1] option:selected').html()!='undefined'
						&& typeof dash.brwDashgeneral.$e.find('[name=bal_niv2] option:selected').html()!='undefined')
						{							
							dash.listaOrden[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0]').val();
							dash.listaOrden[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1]').val();
							dash.listaOrden[2] = dash.brwDashgeneral.$e.find('[name=bal_niv2]').val();
							
							dash.listaNombre[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0] option:selected').text();
							dash.listaNombre[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1] option:selected').text();
							dash.listaNombre[2] = dash.brwDashgeneral.$e.find('[name=bal_niv2] option:selected').text();

							if(typeof $('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params') != 'undefined')
							{
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').cco_kycco = '';
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').rub_nomb = '';
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').cls_nomb = '';
								
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').bal_nact = -1;
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').bal_dire = 'ADELANTE';
								
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').ope_pini = w.$e.find('[name=ope_pini]').val();
								$('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params').ope_pfin = w.$e.find('[name=ope_pfin]').val();
								
								$('#'+dash.idBrwDashActual).parent('.table-responsive').trigger('reloadGrid')
							}//if(typeof $('#'+dash.idBrwDashActual).parent('.table-responsive').data('grid_params') != 'undefined')
/*
							Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_secc: 'TIPPDO', prp_esta: '0001'}, function(rpta){
								if(rpta.lista.items.length > 0)
								{
									var prp = rpta.lista.items[0];
									var rng = dash.getRangoFecha(moment(w.$e.find('[name=ope_pini]').val()).toDate(), prp);
									
									w.$e.find('[name=prp_kyprp]').val(prp.prp_kyprp);
									w.$e.find('[name=ope_pini]').val(rng.rng_fini);
									w.$e.find('[name=ope_pfin]').val(rng.rng_ffin);
									
									dash.listaOrden[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0]').val();
									dash.listaOrden[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1]').val();
									dash.listaOrden[2] = dash.brwDashgeneral.$e.find('[name=bal_niv2]').val();
									
									dash.listaNombre[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0] option:selected').text();
									dash.listaNombre[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1] option:selected').text();
									dash.listaNombre[2] = dash.brwDashgeneral.$e.find('[name=bal_niv2] option:selected').text();

									if(typeof $('#'+w.idGrid).parent('table').data('grid_params') != 'undefined')
									{
										$('#'+w.idGrid).parent('table').data('grid_params').cco_kycco = '';
										$('#'+w.idGrid).parent('table').data('grid_params').rub_nomb = '';
										$('#'+w.idGrid).parent('table').data('grid_params').cls_nomb = '';
										
										$('#'+w.idGrid).parent('table').data('grid_params').bal_nact = -1;
										$('#'+w.idGrid).parent('table').data('grid_params').bal_dire = 'ADELANTE';
										
										$('#'+w.idGrid).parent('table').data('grid_params').ope_pini = w.$e.find('[name=ope_pini]').val();
										$('#'+w.idGrid).parent('table').data('grid_params').ope_pfin = w.$e.find('[name=ope_pfin]').val();
										
										$('#'+w.idGrid).trigger('reloadGrid');
									}//if(typeof $('#'+w.idGrid).parent('table').data('grid_params') != 'undefined')
								}//if(rpta.lista.items.length > 0)
							});//Sisem.ejecutar('GetListaCategoria',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
*/
						}
						else
						{
							alert('falta seleccionar datos del combo');
						}
					});

					/** *****************************************
					 **  FIN : CONTROLES DE FILTRO DE DASHBOARD
					 ** *****************************************/

					w.$e.find('[name=btnDashGeneral]').on('click',function(){
						w.$e.find('[name="etiDashActual"]').html("General");
						dash.listaValor = ['','',''];
						for (var key in dash.listaOrden)
						{
							if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco = {cco_kycco : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub = {rub_nomb : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls = {cls_nomb : dash.listaValor[key]};}
						}						
						dash.winInt({
							cntInt: 'gridDashGeneral',
							tipo: 'DGEN',
							cco: ((typeof cco==="undefined")?cco = {cco_kycco : ''}:cco),
							rub: ((typeof rub==="undefined")?rub = {rub_nomb : ''}:rub),
							cls: ((typeof cls==="undefined")?cls = {cls_nomb : ''}:cls),
							ope: {
								ope_otip: 'GENERAL',
								ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
								ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val()
							},
							callback:function(data){
								//console.log('Retorna una funcion ');
							}
						});
					});

					w.$e.find('[name=btnDashAnterior]').on('click',function(){
						w.$e.find('[name="etiDashActual"]').html("Anterior");
						dash.listaValor = ['','',''];
						for (var key in dash.listaOrden)
						{
							if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco = {cco_kycco : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub = {rub_nomb : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls = {cls_nomb : dash.listaValor[key]};}
						}						
						dash.winInt({
							cntInt: 'gridDashAnterior',
							tipo: 'DANT',
							cco: ((typeof cco==="undefined")?cco = {cco_kycco : ''}:cco),
							rub: ((typeof rub==="undefined")?rub = {rub_nomb : ''}:rub),
							cls: ((typeof cls==="undefined")?cls = {cls_nomb : ''}:cls),
							ope: {
								ope_otip: 'ANTERIOR',
								ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
								ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val()
							},
							callback:function(data){
								//console.log('Retorna una funcion ');
							}
						});
					});
					w.$e.find('[name=btnDashIngreso]').on('click',function(){
						w.$e.find('[name="etiDashActual"]').html("Ingreso");
						dash.listaValor = ['','',''];
						for (var key in dash.listaOrden)
						{
							if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco = {cco_kycco : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub = {rub_nomb : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls = {cls_nomb : dash.listaValor[key]};}
						}						
						dash.winInt({
							cntInt: 'gridDashIngreso',
							tipo: 'DING',
							cco: ((typeof cco==="undefined")?cco = {cco_kycco : ''}:cco),
							rub: ((typeof rub==="undefined")?rub = {rub_nomb : ''}:rub),
							cls: ((typeof cls==="undefined")?cls = {cls_nomb : ''}:cls),
							ope: {
								ope_otip: 'INGRESO',
								ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
								ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val()
							},
							callback:function(data){
								//console.log('Retorna una funcion ');
							}
						});
					});
					w.$e.find('[name=btnDashEgreso]').on('click',function(){
						w.$e.find('[name="etiDashActual"]').html("Egreso");
						dash.listaValor = ['','',''];
						for (var key in dash.listaOrden)
						{
							if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco = {cco_kycco : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub = {rub_nomb : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls = {cls_nomb : dash.listaValor[key]};}
						}						
						dash.winInt({
							cntInt: 'gridDashEgreso',
							tipo: 'DEGR',
							cco: ((typeof cco==="undefined")?cco = {cco_kycco : ''}:cco),
							rub: ((typeof rub==="undefined")?rub = {rub_nomb : ''}:rub),
							cls: ((typeof cls==="undefined")?cls = {cls_nomb : ''}:cls),
							ope: {
								ope_otip: 'EGRESO',
								ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
								ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val()
							},
							callback:function(data){
								//console.log('Retorna una funcion ');
							}
						});
					});
					w.$e.find('[name=btnDashCosto]').on('click',function(){
						w.$e.find('[name="etiDashActual"]').html("Costo");
						dash.listaValor = ['','',''];
						for (var key in dash.listaOrden)
						{
							if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco = {cco_kycco : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub = {rub_nomb : dash.listaValor[key]};}
							if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls = {cls_nomb : dash.listaValor[key]};}
						}						
						dash.winInt({
							cntInt: 'gridDashCosto',
							tipo: 'DCOS',
							cco: ((typeof cco==="undefined")?cco = {cco_kycco : ''}:cco),
							rub: ((typeof rub==="undefined")?rub = {rub_nomb : ''}:rub),
							cls: ((typeof cls==="undefined")?cls = {cls_nomb : ''}:cls),
							ope: {
								ope_tope: 'COSTO',
								ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
								ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val()
							},
							callback:function(data){
								//console.log('Retorna una funcion ');
							}
						});
					});
					w.$e.find('[name=btnDashOperacion]').on('click',function(){
						oper.winInt({
							cntInt: 'gridDashOperacion',
							apc:USERDATA.apc,
							caj:USERDATA.suc,
							tra:USERDATA.tra,			
							tipo: 'OPERACI',
							ctrl: w.ctrl,
							size: 'short',
							callback:function(data){
								//console.log('abriendo oper.interior ' + data);
							}
						});
					});
					w.$e.find('[name=btnDashGrafico]').on('click',function(){
						w.$e.find('[name="etiDashActual"]').html("Grafico");
					   /** *********************************
						** INICIO : CONFIGURACION DASHBOARD
						** *********************************/
						// TAB THREE GRAPH //
						/* TAB 3: Revenew  */
						var listaMes = [
						    (new Date('2016/01/01')).getTime(),
						    (new Date('2016/02/01')).getTime(),
						    (new Date('2016/03/01')).getTime(),
						    (new Date('2016/04/01')).getTime(),
						    (new Date('2016/05/01')).getTime(),
						    (new Date('2016/06/01')).getTime()
						];
						$(function() {
							var impAnte = [[listaMes[0], 153], [listaMes[1], 658], [listaMes[2], 198], [listaMes[3], 663], [listaMes[4], 801], [listaMes[5], 1080]], 
							impCost     = [[listaMes[0], 53],  [listaMes[1], 65],  [listaMes[2], 98],  [listaMes[3], 83], [listaMes[4], 980], [listaMes[5], 808]], 
							impIngr     = [[listaMes[0], 647], [listaMes[1], 435], [listaMes[2], 214], [listaMes[3], 666], [listaMes[4], 487], [listaMes[5], 463]], 
							impEgre     = [[listaMes[0], 154], [listaMes[1], 743], [listaMes[2], 784], [listaMes[3], 236], [listaMes[4], 327], [listaMes[5], 123]],
							impUtil     = [[listaMes[0], 237], [listaMes[1], 411], [listaMes[2], 222], [listaMes[3], 755], [listaMes[4], 747], [listaMes[5], 533]],
							toggles     = $("#rev-toggles"), target = $("#flotcontainer");

							var data = [{
								label : "Anterior",
								data : impAnte,
								color : genColor['anterior'],
								lines : {
									show : true,
									lineWidth : 1
								},
								points : {
									show: true
								}
							}, {
								label : "Costo",
								data : impCost,
								color : genColor['costo'],
								lines : {
									show : true,
									lineWidth : 1
								},
								points : {
									show: true
								}
							}, {
								label : "Ingreso",
								data : impIngr,
								color : genColor['ingreso'],
								lines : {
									show : true,
									lineWidth : 1
								},
								points : {
									show: true
								}
							}, {
								label : "Egreso",
								data : impEgre,
								color : genColor['egreso'],
								lines : {
									show : true,
									lineWidth : 1
								},
								points : {
									show: true
								}
							}, {
								label : "Utilidad",
								data : impUtil,
								color : genColor['utilidad'],
								lines : {
									show : true,
									lineWidth : 1
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
									labelMargin : 5 
								},
								tooltip : true,
								tooltipOpts : {
									//content: '%x - %y',
									//dateFormat: '%b %y',
									defaultTheme : false
								},
								xaxis : {
									mode : "time"
								},
								yaxes : {
									tickFormatter : function(val, axis) {
										return "$" + val;
									},
									max : 1200
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

						});//	
					   /** ******************************
						** FIN : CONFIGURACION DASHBOARD
						** ******************************/
					});//w.$e.find('[name=btnDashGrafico]').on('click',function(){
					w.$e.find('[name=btnPeriodo]').click(function(){
						prop.winSel({
							tipo: 'TIPPDO',
							modo: 'SELECCIONAR',
							prp: {prp_secc: 'TIPPDO', prp_nive: '2'},
							callback:function(objSel){
								if(objSel){
									var fecha = new Date();
									var prp = objSel;
//									var rng = dash.getRangoFecha(moment(new Date()).toDate(), prp);
									
									w.$e.find('[name=prp_kyprp]').val(prp.prp_kyprp);
									w.$e.find('[name=ope_pini]').val(prp.prp_valu);
									w.$e.find('[name=ope_pfin]').val(prp.prp_dscr);
									
									dash.listaOrden[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0]').val();
									dash.listaOrden[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1]').val();
									dash.listaOrden[2] = dash.brwDashgeneral.$e.find('[name=bal_niv2]').val();
									
									dash.listaNombre[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0] option:selected').text();
									dash.listaNombre[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1] option:selected').text();
									dash.listaNombre[2] = dash.brwDashgeneral.$e.find('[name=bal_niv2] option:selected').text();
									
									if(typeof $('#'+w.idGrid).parent('table').data('grid_params') != 'undefined')
									{
										$('#'+w.idGrid).parent('table').data('grid_params').cco_kycco = '';
										$('#'+w.idGrid).parent('table').data('grid_params').rub_nomb = '';
										$('#'+w.idGrid).parent('table').data('grid_params').cls_nomb = '';
										
										$('#'+w.idGrid).parent('table').data('grid_params').bal_nact = -1;
										$('#'+w.idGrid).parent('table').data('grid_params').bal_dire = 'ADELANTE';
										
										$('#'+w.idGrid).parent('table').data('grid_params').ope_pini = w.$e.find('[name=ope_pini]').val();
										$('#'+w.idGrid).parent('table').data('grid_params').ope_pfin = w.$e.find('[name=ope_pfin]').val();
										
										$('#'+w.idGrid).trigger('reloadGrid');
									}//if(typeof $('#'+w.idGrid).parent('table').data('grid_params') != 'undefined')
//									
//									w.$e.find("[name=pdo_kyprp]").val(objSel.prp_kyprp);
//									w.$e.find("[name=pdo_prop]").val(objSel.prp_prop);
//									w.$e.find("[name=pdo_valu]").val(objSel.prp_valu);
//									w.$e.find("[name=pdo_dscr]").val(objSel.prp_dscr);
								}//if(objSel){
							}//callback:function(objSel){
						});//prop.winSel({
					});//w.$e.find('[name=btnPeriodo]').click(function(){
					
//					w.$e.find('[name="ope_pini"]').val(moment().startOf('month').format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
//					w.$e.find('[name="ope_pfin"]').val(moment().endOf('month').format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
//					
//					dash.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));							
					Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_nive: 2, prp_secc: 'TIPPDO', prp_esta: '0001'}, function(rpta){
						if(rpta.lista.items.length > 0)
						{
							var fecha = new Date();
							var prp = rpta.lista.items[0];
//							var rng = dash.getRangoFecha(moment(new Date()).toDate(), prp);
							
							w.$e.find('[name=prp_kyprp]').val(prp.prp_kyprp);
							w.$e.find('[name=ope_pini]').val(prp.prp_valu);
							w.$e.find('[name=ope_pfin]').val(prp.prp_dscr);
	
						dash.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));
						}
					});			

				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//dash.import(function(){
	},
	winPop:function(w){
		dash.import(function(rpta){
			if(w==null)w=new Object;
			dash.setPagina(w);
			dash[w.pag.nameWP] = w;
			dash.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:400,
				height:350,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						"name" : "btnAgregar",
						click : function() {
							dash.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Modificar</span>",
						"class" : "btn btn-primary",
						"name" : "btnModificar",
						click : function() {
							dash.btnModificarClick(w);
						}
					},
					{
						html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
						"class" : "btn btn-danger",
						"name" : "btnCerrar",
						click : function() {
							dash.cerrarFormulario(w);

						}
					}				
				],
				afterLoad:function(){				
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					Sisem.formato(w);
					dash.iniciarFormulario(w);
					Sisem.validarControlesColor(w.$e,'dash',w.modo);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});		
		});//dash.import(function(){
	},
	winSel:function(w){
		dash.import(function(){
			if(w==null)w=new Object;
			dash.setPagina(w);
			dash[w.pag.nameWS] = w;
			dash.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:650,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								dash.cerrarFormulario(w);
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
										prop.cerrarFormulario($.extend(w, {data: data}));
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
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						click : function() {
							dash.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					dash.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}
			});
		});//dash.import(function(){
	},
	winInt:function(w){
		dash.import(function(){
			if(w==null)w=new Object;
			dash.setPagina(w);
			dash[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					dash.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showoolBar: true, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//oper.import(function(){
	},	
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		dash.idBrwDashActual = w.pag.idGridWB;
		console.log('Tipo : ' + w.tipo + ' idBrwDashActual : ' + dash.idBrwDashActual);
		if(w.tipo=='DGEN')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_dash']}, function(rpta){
				if(rpta){brw_dash.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_dash'}));}
			});
		}
		else
		{
			Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_dash_gene']}, function(rpta){
				if(rpta){brw_dash_gene.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_dash_gene'}));}
			});
		}	
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){dash.limpiarFormulario(w);};
		if(w.modo=='VISUALIZAR'){dash.llenarFormulario(w);}
		dash.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'dash',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=cat_kycate]').val('');
		w.$e.find('[name=cat_nomb]').val('');
		w.$e.find('[name=cat_dscr]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			id_cate: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=cat_kycate]').val()),
			tipo:w.tipo,
			nomb:w.$e.find('[name=cat_nomb]').val(),
			dscr:w.$e.find('[name=cat_dscr]').val(),
			esta: '0001',
			vers: 1
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=cat_kycat]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=cat_kycat]').val())){
			Sisem.ejecutar('GetListaCategoria',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var cat = rpta.lista.items[0];
					w.$e.find('[name=cat_kycat]').val(cat.cat_kycat);
					w.$e.find('[name=cat_nomb]').val(cat.cat_nomb);
					w.$e.find('[name=cat_dscr]').val(cat.cat_dscr);
				}//if(rpta.lista.items.length > 0)
			});//Sisem.ejecutar('GetListaCategoria',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
//			$.get(base_url+'dash/get',{id: w.$e.find('[name=cat_kycate]').val()},function(rpta){
//				w.cat=rpta.cat;
//				w.$e.find('[name=cat_kycate]').val(w.cat.id_cate);
//				w.$e.find('[name=cat_nomb]').val(w.cat.nomb);
//				w.$e.find('[name=cat_dscr]').val(w.cat.dscr);
//			},'json');
		}//if(!Sisem.isEmpty(w.ky)){
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){dash.wp.$e.parent().find('.modal-title').html(w.modo+' '+dash.pag.alias);}
		else{dash.wp.$e.parent().find('.ui-dialog-title').html(w.modo+' '+dash.pag.alias);}
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
				
				dash.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				dash.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				dash.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		w.$e.find('[name=cat_kycate]').attr('disabled',true);
		Sisem.activar(w.$e.find('[name=cat_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=cat_dscr]'), w.activar);
	},
	validarFormulario:function(w){
		if(Sisem.validarControles(w.$e,'cat')){return true;}
		return false;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='DGEN';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: dash.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+dash.tipPag[w.tipo]['name'],
			nameWP		: 'win'+dash.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+dash.tipPag[w.tipo]['name'],
			nameWI		: 'int'+dash.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+dash.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+dash.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+dash.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+dash.tipPag[w.tipo]['name']
		});
		dash.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////	
	btnAddClick: function(w){
		oper.winPop({
			modo:'AGREGAR',
			apc:USERDATA.apc,
			caj:USERDATA.suc,
			tra:USERDATA.tra,			
			tipo: 'OPERACI',
			ctrl: w.ctrl,
			size: 'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});		
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			dash.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(dash.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=dash.obtenerDatoFormulario(w);
				Sisem.ejecutar('GuardarCategoria',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=cat_kycat]').val(rpta.cat_kycat);
						$.extend(w,{modo: 'VISUALIZAR'});
						dash.iniciarFormulario(w);
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(dash.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	getRangoFecha: function(fecha, prp){
		var prp_fini;
		var prp_ffin;
		var prp_fnex;
		var iniDia = parseInt(prp.prp_valu);
		var numInt = parseInt(prp.prp_dscr);
		
		switch(prp.prp_prop)
		{
			case 'DIA':
				prp_fini = moment(fecha).format('YYYY-MM')+'-'+Sisem.llenarCeros(iniDia,2);
				prp_ffin = moment(prp_fini).add(parseInt(numInt),'days').format('YYYY-MM-DD');				
			break;
			case 'SEMANA':
				prp_fini = moment(fecha).format('YYYY-MM')+'-'+Sisem.llenarCeros(iniDia,2);
				prp_ffin = moment(prp_fini).add(parseInt(numInt),'week').format('YYYY-MM-DD');				
			break;
			case 'MES':
				for(var ite=-1; ite<=1; ite++)
				{
					prp_fite = moment(fecha).add(parseInt(ite),'month').format('YYYY-MM-DD');
					prp_fini = moment(prp_fite).format('YYYY-MM')+'-'+Sisem.llenarCeros(iniDia,2);
					prp_ffin = moment(prp_fini).add(parseInt(numInt),'month').format('YYYY-MM-DD');
					prp_ffin = moment(prp_ffin).add(-1,'days').format('YYYY-MM-DD');
					
					fact = moment(fecha);
					fini = moment(prp_fini);
					ffin = moment(prp_ffin);
					
					if(fini <= fact && fact <= ffin)
					{
						break;
					}//if(fini <= fecha && fecha <= ffin)					
				}//for(var ite=0; ite<3; ite++)
			break;
		}
		return {rng_fini: prp_fini, rng_ffin: prp_ffin};
	}//getRangoFecha: function(fecha, prp){	
};