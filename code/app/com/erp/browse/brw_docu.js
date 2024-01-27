var brw_docu = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colAncho = [25, 120, 100, 50, 70, 100, 250, 90, 90, 90, 70];
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width: colAncho[00], style:'style="width: '+colAncho[00]+'px; max-width: '+colAncho[00]+'px; text-align: center;"'}]: []);
		colsTmp= colsTmp.concat([
			{name:'usu_nomb', width:colAncho[01], style: 'style="width: '+colAncho[01]+'px; max-width: '+colAncho[01]+'px; text-align: left;"', descr:'Usuario', search: 'false'},
			{name:'doc_tdoc', width:colAncho[02], style: 'style="width: '+colAncho[02]+'px; max-width: '+colAncho[02]+'px; text-align: left;"', descr:'Documento', search: 'false'},
			{name:'doc_cigv', width:colAncho[03], style: 'style="width: '+colAncho[03]+'px; max-width: '+colAncho[03]+'px; text-align: center;"', descr:'Con-Igv', search: 'false'},
			{name:'doc_ndoc', width:colAncho[04], style: 'style="width: '+colAncho[04]+'px; max-width: '+colAncho[04]+'px; text-align: center;"', descr:'Numero', search: 'true'},
			{name:'doc_femi', width:colAncho[05], style: 'style="width: '+colAncho[05]+'px; max-width: '+colAncho[05]+'px; text-align: center;"', descr:'Fec-Reg', search: 'false'},
			{name:'doc_enom', width:colAncho[06], style: 'style="width: '+colAncho[06]+'px; max-width: '+colAncho[06]+'px; text-align: left;"', descr:'Cliente/Proveedor', search: 'false'},
			{name:'doc_tsub', width:colAncho[07], style: 'style="width: '+colAncho[07]+'px; max-width: '+colAncho[07]+'px; text-align: right;"', descr:'Subtotal', search: 'false'},
			{name:'doc_tota', width:colAncho[08], style: 'style="width: '+colAncho[08]+'px; max-width: '+colAncho[08]+'px; text-align: right;"', descr:'Total', search: 'false'},
			{name:'doc_tota', width:colAncho[09], style: 'style="width: '+colAncho[09]+'px; max-width: '+colAncho[09]+'px; text-align: right;"', descr:'Pagado', search: 'false'},
			{name:'doc_esta', width:colAncho[10], style: 'style="width: '+colAncho[10]+'px; max-width: '+colAncho[10]+'px; text-align: right;"', descr:'Estado', search: 'false'}
		]);
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect:((typeof w.multiSelect!="undefined")?w.multiSelect:false),
			search:((typeof w.search!="undefined")?w.search:false),
			refreshButton:((typeof w.refreshButton!="undefined")?w.refreshButton:true),
			autoWidth:((typeof w.autoWidth!="undefined")?w.autoWidth:false),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp,
			onLoading: function(){
				w.$e.find('[name=grid]').block({
					css:{
						border: 'none',
				        padding: '15px', 
				        backgroundColor: '#000',
				        '-webkit-border-radius': '10px',
				        '-moz-border-radius': '10px',
				        opacity: .5,
				        color: '#fff'
					},
					message:'Espere..'
				});
			},
			onComplete: function(){
				w.$e.find('[name=grid]').unblock();
				
				w.$e.find('[name=inpDoc_fini]').datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});								
				w.$e.find('[name=inpDoc_ffin]').datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});												
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, tipo:w.tipo, doc_kysuc:( ( w.suc ) ? w.suc.suc_kysuc : gIdSuc ), doc_fini: '', doc_ffin: '', doc_tope: w.tipo, doc_kyusu:(( w.cli )?w.cli.usu_kyusu:''), filtro:((w.filtro)?w.filtro:'TODOS'), orderColumn: 'doc_femi', orderType: 'desc'},
			itemdescr: docu.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
//					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
//					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
//					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
//					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
//					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
					_toolBarHtml+='<input name="inpDoc_fini" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;" placeholder="yyyy-mm-dd" autocomplete="nocompletes"/>',
					_toolBarHtml+='<input name="inpDoc_ffin" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;" placeholder="yyyy-mm-dd" autocomplete="nocompletes"/>',
//					_toolBarHtml+='<button name="btnPeriodo'+w.tipo.toLowerCase()+'" class="btn btn-primary"><i class="fa fa-tasks"/></i></button>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					docu.btnAddClick(w);
				});
				$el.find('[name=sel_all]').click(function(){
					var $lisRow = w.$e.find('[name=grid]').find('tbody').children('tr');
					if($lisRow.length>0){
						for(var i=0;i<$lisRow.length;i++){
							var $row = $lisRow.eq(i);
							if($el.find('[name=sel_all]').prop('checked'))
							{
								$row.addClass('highlights');
							}
							else
							{
								$row.removeClass('highlights');
							}
						}//for(var i=0;i<$lisRow.length;i++){
					}//if($lisRow.length>0){
				});//$el.find('[name=sel_all]').click(function(){
				$('[name=btnDownload'+w.tipo.toLowerCase()+'Fxls]').on('click',function(){
					if(w.tipo=='0009'){window.open(base_url+'app/com/erp/formatos/doc_formato.xlsx');}
					else if(w.tipo=='0010'){window.open(base_url+'app/com/erp/formatos/doc_formato.xlsx');}
					else if(w.tipo=='0002'){window.open(base_url+'app/com/erp/formatos/doc_formato.xlsx');}
					else{Sisem.msgBox('error','No hay formato para esta operacion!!!');}
				});
				$('[name=btnLoad'+w.tipo.toLowerCase()+'Fxls]').on('click',function (){
					$('[name=inp_'+w.tipo.toLowerCase()+'xls]').trigger('click');
				});	
				$('[name=inp_'+w.tipo.toLowerCase()+'xls]').change(function(event){
					var texto = $el.find('[name=inp_'+w.tipo.toLowerCase()+'xls]').val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $el.find('[name=inp_'+w.tipo.toLowerCase()+'xls]')[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//						var fileName=w.tipo+'_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'erp/docu/uploadDocuFxls?tope='+w.tipo, function(rpta){
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						if(rpta.msg.type=='success' || rpta.msg.type=='warning')
						{
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							if(rpta.lisRes.length>0)
							{
								Sisem.printExcel({modulo: 'report', reportName: 'rep_resp', reportTitle :'Lista de Registros erroneos', optFormat:'XLS', rpta: rpta});
							}
						}
					});
				});
				
				$el.find('[name=btnRefreshGrid]').click(function(){
					console.log($('#'+w.idGrid).parent().data('grid_params'));
					$('#'+w.idGrid).parent().data('grid_params').doc_fini = $('#'+w.idGrid).find('[name="inpDoc_fini"]').val();
					$('#'+w.idGrid).parent().data('grid_params').doc_ffin = $('#'+w.idGrid).find('[name="inpDoc_ffin"]').val();
					$('#'+w.idGrid).trigger('reloadGrid');				
				});				

				Sisem.activar(w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]'), false);
				w.$e.find('[name=inp_'+w.tipo.toLowerCase()+'xls]').css('display','none');
			},
			//inObject : 'grid',
			//pagination:false,
			//search:false,
			//fill: function(rpta,$row){},
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var totalFactura=0;
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td '+colsTmp[0].style+'></td>');}

						var esta_img = '';
						if(fila.fimg!=''){
							esta_img='<span name="img_upload" class="label label-warning" data-toggle="tooltip" data-placement="top" title="IMAGEN EXISTENTE"><i class="fa fa-picture-o"></i></span>';
						}
						$row.append('<td '+colsTmp[01].style+'>'+fila.usu_ndoc+':'+fila.usu_nomb.split(' ')[0]+'</td>');
						$row.append('<td '+colsTmp[02].style+'>'+fila.doc_tdoc+'</td>');
						$row.append('<td '+colsTmp[03].style+'>'+(fila.doc_cigv=='1'?'SI':'NO')+'</td>');
						$row.append('<td '+colsTmp[04].style+'>'+fila.doc_ndoc+'</td>');
						$row.append('<td '+colsTmp[05].style+'>'+moment(fila.doc_femi).format('YYYY-MM-DD HH:mm')+'</td>');
						$row.append('<td '+colsTmp[06].style+'>'+fila.doc_enom+'</td>');
						$row.append('<td '+colsTmp[07].style+'>'+fila.doc_tsub+'</td>');
						$row.append('<td '+colsTmp[08].style+'>'+Sisem.redondeoString(fila.doc_tota)+'</td>');
						$row.append('<td '+colsTmp[09].style+'>'+Sisem.redondeoString(fila.doc_tpag)+'</td>');
						$row.append('<td '+colsTmp[10].style+'>'+fila.doc_esta+'</td>');
						
						totalFactura += parseFloat(fila.doc_tota);
						
						$row.dblclick(function(){
							if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal-dialog').find('.modal-footer button:eq(0)').click();}
							else{w.$e.dialog('widget').find('.ui-dialog-buttonpane button:eq(0)').click();}
						});
						$row.data('data',fila).click(function(){
							detd.winInt({
								politicaSeguridad: 'VER_DOCUMENTO',
								cntInt: 'gridDashDetdocumento',
								doc: {
									doc_kydoc: $(this).data('data').doc_kydoc
								},
								tipo: 'DETDOCUMENTO',
								size: 'short',
								callback:function(data){
//								console.log('abriendo oper.interior ' + data);
								}
							});
						});
//						$row.find('[name=img_upload]').click(function(){
//							window.open(base_url+'app/com/erp/images/armar/'+fila.doc_fimg);
//						});
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
						    menuSelector: "#"+w.idMenCtx,
						    onShow:function($el, invokedOn){
						    	$el.css('z-index','1100');
						    	var $row = invokedOn.closest('tr');
						    	
						    	$el.find('[id^='+w.idMenCtx+']').hide();

						    	$el.find('#'+w.idMenCtx+'_deta').show();
						    	$el.find('#'+w.idMenCtx+'_apro').show();
						    	$el.find('#'+w.idMenCtx+'_anul').show();
						    	$el.find('#'+w.idMenCtx+'_dele').show();
						    	$el.find('#'+w.idMenCtx+'_prin').show();
							    	
						    	$el.find('#'+w.idMenCtx+'_apro').html('Sunat');
						    	$el.find('#'+w.idMenCtx+'_vhij').html('Items');
						    },
						    menuSelected: function (invokedOn, selectedMenu) {
						    	var $id = selectedMenu.attr('id');
						    	var $row = invokedOn.closest('tr');
						    	switch($id){
						    		case w.idMenCtx+"_cert":
					    				coti.winSel({
						    				tipo: 'COTI',
						    				tipo: w.tipo,
						    				modo: 'SELECCIONAR',
						    				doc_kydoc: w.$e.find('[name=historial]').find('a').last().attr('id_padr'),
						    				doc: w.$e.find('[name=doc_kydocu]').data('data'),
						    				callback:function(data){
						    					if(data)
						    					{
						    						if(docu.validarFormulario($.extend(w,{evento:'validarItemUnico',id_arti:data.id_arti}))){
						    							w.items=new Array(1);
						    							w.items[0]=data;
						    							docu.llenarGridDoc(w);
						    						}//if(docu.validarFormulario($.extend({evento:'validarItemUnico',id_arti:rptaddo[ild].id_arti},w))){
						    					}
						    				},
						    				suc:w.suc
					    				});    				
						    			break;
						    		case w.idMenCtx+"_deta":
						    			docu.winPop({
						    				politicaSeguridad: 'VER_DOCUMENTO',
						    				ky: $row.data('data').doc_kydoc,
						    				modo: 'VISUALIZAR',
						    				suc: {
						    					id_sucu:$('[name=main_kysuc] :selected').val(),
						    					nomb:$('[name=main_kysuc] :selected').text()
						    				},
						    				tipo: w.tipo,
						    				ctrl: w.ctrl,
						    				callback: function(){
						    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						    				}
							    			});					    				
						    			break;
						    		case w.idMenCtx+"_dele":

											var lisSel= Sisem.getItemSelected(w).items;
											var lisKySel = [];

											if(lisKySel.length==0)
											{
												Sisem.ejecutar('erp/GetListaDocumento',{method: 'validarArticuloEnDocumento', doc_kydoc: $row.data('data').doc_kydoc, doc_tope: $row.data('data').doc_tope, doc_kycom: USERDATA.com.com_kycom, doc_femi: $row.data('data').doc_femi}, function(rpta){
													console.log('BORRAMOS!!!');

													for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].doc_kydoc});}
													if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').doc_kydoc});}
		
													var resp = Sisem.msgAsk('Desea eliminar', 'Documentos Venta/Compra', function(rpta){
														if(rpta=='Si'){
														var data = {comando: 'ELIMINAR', lisKy: lisKySel};
														Sisem.ejecutar('erp/CtrlDocumento',data, function(rpta){
															if(rpta.msg.type=='success')
															{
																Sisem.msgBox(rpta.msg.type, rpta.msg.text);
																if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
																if(w.callback!=null){w.callback();}
															}//if(rpta.msg.type=='success')
															Sisem.unblockW(w.$e);
														});//Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
														}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
													});													
												});										
											}
											else 
											{
												Sisem.msgBox('error', 'No se puede eliminar varios documentos');
											}											
											break;

						    		case w.idMenCtx+"_apro":
						    			var resp = Sisem.msgAsk('Desea aprobar', $row.data('data').doc_tdoc+': '+$row.data('data').doc_ndoc, function(rpta){
							    			if(rpta=='Si'){
								    			var data = {comando: 'GENERAR_FACTURA_ELECTRONICA', doc_kydoc: $row.data('data').doc_kydoc};
								    			Sisem.printPdf('erp/CtrlDocumento', data, function(rpta){
								    			});
							    			}
						    			});
						    			break;
						    		case w.idMenCtx+"_anul":
						    			var resp = Sisem.msgAsk('Desea ANULAR', $row.data('data').doc_tdoc+': '+$row.data('data').doc_ndoc, function(rpta){
							    			if(rpta=='Si'){
							    				w.doc_kydoc = $row.data('data').doc_kydoc;
							    				docu.anularDocumento(w);
							    			}
						    			});
					    				break;
						    		case w.idMenCtx+"_vpad":
						    			docu.winSel({
						    				doc: {
						    					id_docu:$row.data('data').id_padr,	
						    				},
						    				filtro:'DPADR',
						    				showMenCtx: true,
						    				tope:w.tipo,
						    				ctrl:w.ctrl,
						    				callback:function(){
						    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						    				}
							    		});					    				
						    			break;
						    		case w.idMenCtx+"_vhij":
						    			docu.winSel({
						    				doc: {
						    					id_docu:$row.data('data').id_docu,	
						    				},
						    				filtro:'DHIJO',
						    				showMenCtx: true,
						    				tope:w.tipo,
						    				ctrl:w.ctrl,
						    				callback:function(){
						    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						    				}
							    		});
						    			break;
						    		case w.idMenCtx+"_prin":
//							    			Sisem.msgAsk('Desea imprimir PDF', '', function(rpta){
//								    			var tipoFormato = 'XLS';
//							    				if(rpta=='Si'){tipoFormato = 'PDF';}
						    				var data = {
						    					doc_kydoc: $row.data('data').doc_kydoc
						    				};
						    				if(tipoFormato=='PDF'){Sisem.windowPrint({id:'printVent',title:'Imprimir',urlIframe: base_url+'erp/docu/print_documento?'+$.param(data)});}
						    				else if(tipoFormato=='XLS'){$.get(base_url+'erp/docu/print_documento', data, function(rpta){window.open(base_url+rpta.url,'_blank' );},'json');}
//							    			});
						    			break;
						    	}//switch($id){
						    }//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({
						}//if( w.showMenCtx ){						
						$tbody.append($row);
					}//for(var i=0;i<rpta.items.length;i++){
					/**********************
					 * RESUMEN DE TOTALES *
					 **********************/
					var $row = $('<tr class="item" />');
					if(w.showMenCtx){$row.append('<td '+colsTmp[00].style+'></td>');}
					$row.append('<td colspan="5" style="color: red; line-height: 25px; font-size: 14px; font-weight: bold;">Totales</td>');
					$row.append('<td align="right" style="color: red; line-height: 25px; font-size: 14px; font-weight: bold;">'+Sisem.redondeoString(totalFactura)+'</td>');
										
					$tbody.append($row);
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};
