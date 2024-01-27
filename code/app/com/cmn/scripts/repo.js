var repo = {
	wb:null,
	wp:null,
	ws:null,
	we:null,
	pag:{
		alias		: 'Reporte',
		nameWB		: 'brwReporte',
		nameWP		: 'winReporte',
		nameWS		: 'selReporte',
		nameWI		: 'intReporte',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwReporte',
		idGridWP	: 'idWinReporte',
		idGridWS	: 'idSelReporte',
		idGridWI	: 'idIntReporte'
	},
	tipPag: {
		"REPCOMPRA":{'name': 'Repcompra', 'alias': 'Reporte de Compras'},
		"REPVENTA":{'name': 'Repventa', 'alias': 'Reporte de Ventas'},
		"REPLOGISTICA":{'name': 'Replogistica', 'alias': 'Reporte de Logistica'},
		"REPMAESTRO":{'name': 'RepMaestro', 'alias': 'Reporte de Maestros'},
		"REPCUENTA":{'name': 'RepCuenta', 'alias': 'Reporte de Cuentas'},
		"REPCAJA":{'name': 'RepCaja', 'alias': 'Reporte de Caja'}
	},
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import(['app/com/erp/scripts/cate'], function(rpta){
			if(callback){return callback(rpta);}
		});
	},		
	init: function(w){
		if(w==null)w=new Object();
		repo.winBrow(w);
	},
	winBrow: function(w){
		repo.import(function(rpta){
			if(w==null)w=new Object;
			repo.setPagina(w);
			repo.wb=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/report',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					
					$.post(base_url+'cmn/repo/getListaReporte',{modulo: 'formatos', archivo:'erp_reporte.xls', rep_modu: w.tipo},function(rpta){
						if(rpta.msg.type=='success')
						{
							for(key in rpta.lisRep)
							{
								$_ul='';
								$_ul+='<ul id="ulReport" class="inbox-menu-lg">';
									$_ul+='<li><a href="javascript: void(0);" name="lnkReporte" nomb="'+rpta.lisRep[key].rep_nomb+'" titu="'+rpta.lisRep[key].rep_titu+'">'+rpta.lisRep[key].rep_titu+'</a></li>';
								$_ul+='</ul>';
								$('#listReport').append($_ul);
							}
							w.$e.find('[name=lnkReporte]').click(function(){
								repo.winPop({
									modulo:w.tipo,
									modo: 'Reporte '+$(this).attr('titu'),
									rep:{
										modu: w.tipo,
										nomb: $(this).attr('nomb'),
										titu: $(this).attr('titu')
									}
								});
							});
							w.$e.find('[name=lnkReporte]').hover(function(){
								w.$e.find('[name=imgReport]').removeAttr('src');
								w.$e.find('[name=imgReport]').attr('src',base_url+'app/com/erp/images/'+$(this).attr('nomb')+'.png').fadeIn();
							});
//							w.$e.find('[name=lnkReporte]').mouseout(function(){
//								w.$e.find('[name=imgReport]').fadeOut();
//							});					
						}
						else{Sisem.msgBox(rpta.msg.type,rpta.msg.text);}
					},'json');
					//repo.iniciarBrowse($.extend(w,{idGrid:repo.pag.idGridWB, modo:'NAVEGAR'}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//repo.import(function(){
	},
	winPop:function(w){
		repo.import(function(){
			if(w==null)w=new Object;
			repo.setPagina(w);
			repo.wp=w;
			repo.pag.modo=((w.modo)?w.modo:'AGREGAR');
			Sisem.Window({
				id:repo.pag.nameWP,
				title:repo.pag.modo+' '+repo.pag.alias,
				width:650,
				height:450,
				url:base_url+'cmn/repo/edit?app=erp&modulo=views&page='+w.rep.nomb+'&mrep='+w.tipo,
				modal:false,
				buttons : [
					{html : "<i class='fa fa-check'></i>&nbsp; Imprimir",
						"class" : "btn btn-success",
						"name" : "btnImprimir",
						click : function() {
							repo.btnImprimirClick(w);
						}
					},
					{html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						"name" : "btnCancelar",
						click : function() {
							$(this).dialog("close");
						}
					}				
				],
				afterLoad:function(){				
					w.$e = $('#'+repo.pag.nameWP);
					Sisem.blockW(w.$e);
//					w.$e.find('#btnImprimir').click(function(){
//						repo.btnImprimirClick(w);
//					});
					sucu.sucursalAutocomplete($.extend(w, {suc_tipo:'SUCURSAL'}));
					if(USERDATA.com.com_nomb=='SASMI'){usua.usuarioAutocomplete($.extend(w, {usu_tipo:'CLICOMTRA'}));}
					else{usua.usuarioAutocomplete($.extend(w, {usu_tipo:'CLIPROTRA'}));}
					
					//arti.articuloAuto(w);
					//arti.articuloCodiAuto(w);
					//arti.codigoskuAutocomplete($.extend(w, {usu_kyusu:'PRODUCTO'}));
					
					repo.iniciarFormulario(w);
					
					Sisem.formato(w);
					Sisem.unblockW(w.$e);
				}
			});//Sisem.Window({	
		});//repo.import(function(){
	},
	iniciarFormulario:function(w){
		repo.limpiarFormulario(w);
		repo.llenarFormulario(w);
		repo.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
		var horini = moment(new Date((new Date()).getYear()+1900,(new Date()).getMonth(),(new Date()).getDate(),0,0,0,0)).format('YYYY-MM-DD');
		var horfin = moment(new Date((new Date()).getYear()+1900,(new Date()).getMonth(),(new Date()).getDate(),23,59,59,0)).format('YYYY-MM-DD');
		
		w.$e.find('[name=suc_kysucu]').val('');
		w.$e.find('[name=suc_nomb]').val('');
		w.$e.find('[name=kar_fini]').val(horini).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		w.$e.find('[name=kar_ffin]').val(horfin).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});

		w.$e.find('[name*=_fini]').datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		w.$e.find('[name*=_ffin]').datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		
		w.$e.find('[name*=_pini]').datepicker({dateFormat:'yy-mm',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		w.$e.find('[name*=_pfin]').datepicker({dateFormat:'yy-mm',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		
		cate.llenarComboAmbito($.extend(w, {cat_tipo: 'AMB'}), function(rpta){w.$e.find('[name=amb_nomb]').val('');});
		cate.llenarComboClase($.extend(w, {cat_tipo: 'CLA'}), function(rpta){w.$e.find('[name=cla_nomb]').val('');});
		
		w.$e.find('[name=doc_tdoc]').val('');
		w.$e.find('[name=ope_fpag]').val('');
	},
	activarFormulario:function(w){
		w.$e.find('[name=suc_kysucu]').attr('disabled',!w.activar);
		w.$e.find('[name=suc_nomb]').attr('disabled',!w.activar);
		
		Sisem.activar(w.$e.find('[name=suc_tipo]'), false);
		Sisem.activar(w.$e.find('[name=usu_tipo]'), false);
		
		w.$e.find('[name=kar_fini]').attr('disabled',!w.activar);
		w.$e.find('[name=kar_ffin]').attr('disabled',!w.activar);
	},
	llenarFormulario:function(w){
		if(w.rep.nomb=='rep_prv')
		{
			Sisem.activar(w.$e.find('[name=suc_nomb]'), false);
			Sisem.activar(w.$e.find('[name=doc_fini]'), false);
			Sisem.activar(w.$e.find('[name=doc_ffin]'), false);
			Sisem.activar(w.$e.find('[name=doc_fpag]'), false);
			Sisem.activar(w.$e.find('[name=moda]'), false);
			Sisem.activar(w.$e.find('[name=optFormat]'), false);
			w.$e.find('[name=optFormat]').eq(1).attr('checked', true);
		}
		if(w.rep.modu=='REPCOMPRA')
		{
			w.$e.find('[name=doc_tope]').append('<option value="0001">COMPRA</option>');
			w.$e.find('[name=doc_tope]').append('<option value="0007">INGRESO ALMACEN</option>');
		}
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){repo.wp.$e.parent().find('.modal-title').html(w.modo);}
		else{repo.wp.$e.parent().find('.ui-dialog-title').html(w.modo);}
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.find('[name=btnImprimir]').attr('disabled',!false);
				w.$e.find('[name=btnCancelar]').attr('disabled',!false);
				repo.activarFormulario($.extend(w,{activar:false}));
				break;
			case 'MODIFICAR':
				w.$e.find('[name=btnImprimir]').attr('disabled',!true);
				w.$e.find('[name=btnCancelar]').attr('disabled',!false);
				repo.activarFormulario($.extend(w,{activar:true}));
				break;
			case 'AGREGAR':
				w.$e.find('[name=btnImprimir]').attr('disabled',!true);
				w.$e.find('[name=btnCancelar]').attr('disabled',!true);
				repo.activarFormulario($.extend(w,{activar:true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	validarFormulario:function(w){
		if(!Sisem.validarControles(w.$e,'rep')){
			return false;
		}
		return true;
	},
	btnImprimirClick: function(w){
		if(repo.validarFormulario(w))
		{
			Sisem.blockW(w.$e);
			var data=repo.obtenerDatoFormulario(w);
			$.extend(data,{modulo: w.rep.modu, reportName: w.rep.nomb, reportTitle :w.rep.titu});
			
			if(typeof data.optFormat!=='undefined' && data.optFormat=='PDF'){Sisem.printPdf(data);}
			else{Sisem.printExcel(data);}
			
			Sisem.unblockW(w.$e);
		}
	},
	obtenerDatoFormulario: function(w){
		var seri=w.$e.find('[name=doc_seri]').val();
		var nume=w.$e.find('[name=doc_nume]').val();
		w.$e.find('[name=doc_ndoc]').val(((seri && nume)?(seri+'-'+nume):''));
		
		var tipo=w.$e.find('[name=usu_tipo]').val();
		w.$e.find('[name=usu_tipo]').val(Sisem.getKeyFromValue(usua.tipPag, w.$e.find('[name=usu_tipo]').val()));
		var data = Sisem.obtenerParametrosJson(w.$e);
		w.$e.find('[name=usu_tipo]').val(tipo);
		
		$.extend(data, {tipo: w.tipo,});
		return data;
	},
	setPagina: function(w){
		$.extend(repo.pag, {
			alias		: repo.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+repo.tipPag[w.tipo]['name'],
			nameWP		: 'win'+repo.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+repo.tipPag[w.tipo]['name'],
			nameWI		: 'int'+repo.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+repo.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+repo.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+repo.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+repo.tipPag[w.tipo]['name']
		});	
	},		
	getStyleSheet: function(workbook, sheet)
	{
		var stylesheet = workbook.getStyleSheet();
		sheet.titleStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "center",
	            vertical: "center"
	        },
	        font: {
	            bold: true,						           
	            size: 12
	        },
	        fill: {			        	
//	            type: 'pattern',
//	            patternType: 'solid',
//	            fgColor: 'FCEBD2'
//            	type: 'gradient',
//                degree: 90,
//                start: 'D7B884',
//                end: {pureAt: 0.8, color: 'FFFFFF'}			            	
	        }
	    });						
		sheet.subtitleStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "left",
	            vertical: "center"
	        },
	        font: {
	            bold: true,						           
	            size: 12
	        },
	        fill: {			        	
//	            type: 'pattern',
//	            patternType: 'solid',
//	            fgColor: 'FCEBD2'
//            	type: 'gradient',
//                degree: 90,
//                start: 'D7B884',
//                end: {pureAt: 0.8, color: 'FFFFFF'}			            	
	        }
	    });						
		sheet.paramStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "center",
	            vertical: "center"
	        },
	        font: {
	            bold: false,						           
	            size: 12
	        },
	        fill: {			        	
//	            type: 'pattern',
//	            patternType: 'solid',
//	            fgColor: 'FCEBD2'
//            	type: 'gradient',
//                degree: 90,
//                start: 'D7B884',
//                end: {pureAt: 0.8, color: 'FFFFFF'}			            	
	        }
	    });						
		sheet.headerStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "center",
	            vertical: "center"
	        },
	        font: {
//	        	fontName: 'Lao UI',
//	        	italic: true,
	            bold: false,
	            size: 11
	        },
	        fill: {
	            type: 'pattern',
	            patternType: 'solid',
	        	fgColor: 'FCEBD2'
//            	type: 'gradient',
//                degree: 90,
//                start: '9DB7C8',
//                end: {pureAt: 0.8, color: 'FFFFFF'}			            	
	        },
	        border: {
		        bottom: {color: '000000', style: 'thin'},
		        top: {color: '000000', style: 'thin'},
		        left: {color: '000000', style: 'thin'},
		        right: {color: '000000', style: 'thin'}						        	
	        }
	    });
		sheet.footerStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "center",
	            vertical: "center"
	        },
	        font: {
	        	fontName: 'Lao UI',
//	        	italic: true,
	            bold: true,
	            size: 12
	        },
	        fill: {
	            type: 'pattern',
	            patternType: 'solid',
	            fgColor: 'FFFFFF'
//            	type: 'gradient',
//                degree: 90,
//                start: '9DB7C8',
//                end: {pureAt: 0.8, color: 'FFFFFF'}			            	
	        },
	        border: {
		        bottom: {color: '000000', style: 'thin'},
		        top: {color: '000000', style: 'thin'},
		        left: {color: '000000', style: 'thin'},
		        right: {color: '000000', style: 'thin'}						        	
	        }
	    });
		sheet.cellStyle = stylesheet.createFormat({
	        font: {
	            size: 12
	        },
	        fill: {
	            type: 'pattern',
	            patternType: 'solid'
//	            fgColor: 'FFFFFF',
//	                start: '000000',
//	                end: {pureAt: .8, color: 'FFFFFF'}						            	
	        },
	        border: {
		        bottom: {color: '000000', style: 'thin'},
		        top: {color: '000000', style: 'thin'},
		        left: {color: '000000', style: 'thin'},
		        right: {color: '000000', style: 'thin'}						        	
	        }
	    });
		sheet.cellNumberStyle = stylesheet.createFormat({
			format: '#,##0.00',
	        font: {
	            size: 12
	        },
	        fill: {
	            type: 'pattern',
	            patternType: 'solid'
//	            fgColor: 'FFFFFF',
//	                start: '000000',
//	                end: {pureAt: .8, color: 'FFFFFF'}						            	
	        },
	        border: {
		        bottom: {color: '000000', style: 'thin'},
		        top: {color: '000000', style: 'thin'},
		        left: {color: '000000', style: 'thin'},
		        right: {color: '000000', style: 'thin'}						        	
	        }
	    });
		sheet.cellIntStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "center",
	            vertical: "center"
	        },
			format: '#,##0.00',
	        font: {
	            size: 12
	        },
	        fill: {
	            type: 'pattern',
	            patternType: 'solid'
//	            fgColor: 'FFFFFF',
//	                start: '000000',
//	                end: {pureAt: .8, color: 'FFFFFF'}						            	
	        },
	        border: {
		        bottom: {color: '000000', style: 'thin'},
		        top: {color: '000000', style: 'thin'},
		        left: {color: '000000', style: 'thin'},
		        right: {color: '000000', style: 'thin'}						        	
	        }
	    });
		sheet.cellDecStyle = stylesheet.createFormat({
			alignment: {
	            horizontal: "right",
	            vertical: "center"
	        },
			format: '#,##0.00',
	        font: {
	            size: 12
	        },
	        fill: {
	            type: 'pattern',
	            patternType: 'solid'
//	            fgColor: 'FFFFFF',
//	                start: '000000',
//	                end: {pureAt: .8, color: 'FFFFFF'}						            	
	        },
	        border: {
		        bottom: {color: '000000', style: 'thin'},
		        top: {color: '000000', style: 'thin'},
		        left: {color: '000000', style: 'thin'},
		        right: {color: '000000', style: 'thin'}						        	
	        }
	    });			
		return sheet;
	}
};
	