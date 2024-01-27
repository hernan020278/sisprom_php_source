var brw_detd = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colAncho = [25, 10, 250, 30, 30, 30];
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width: colAncho[0], style:'style="width: '+colAncho[0]+'px; max-width: '+colAncho[0]+'px; text-align: center;"'}]: [{width: 0, visible: false}]);
		colsTmp= colsTmp.concat([
			{name:'dtd_cant', width:colAncho[1], style: 'style="width: '+colAncho[1]+'px; max-width: '+colAncho[1]+'px; text-align: center;"', descr:'Cant', search: 'false'},
			{name:'dtd_dscr', width:colAncho[2], style: 'style="width: '+colAncho[2]+'px; max-width: '+colAncho[2]+'px; text-align: left;"', descr:'Descripcion', search: 'false'},
			{name:'dtd_pcos', width:colAncho[3], style: 'style="width: '+colAncho[3]+'px; max-width: '+colAncho[3]+'px; text-align: right;"', descr:'Compra', search: 'true'},
			{name:'doc_pund', width:colAncho[4], style: 'style="width: '+colAncho[4]+'px; max-width: '+colAncho[4]+'px; text-align: right;"', descr:'Venta', search: 'false'},
			{name:'doc_impo', width:colAncho[5], style: 'style="width: '+colAncho[5]+'px; max-width: '+colAncho[5]+'px; text-align: right;"', descr:'Importe', search: 'false'}
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
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, tipo:w.tipo, dtd_kydoc:( ( w.doc ) ? w.doc.doc_kydoc : 0 ), filtro:((w.filtro)?w.filtro:'TODOS'), orderColumn: 'dtd_kydtd', orderType: 'ASC'},
			itemdescr: docu.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
//					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
//					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
//					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
//					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
//					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
//					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
//					_toolBarHtml+='<input name="inpDoc_fini_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;" placeholder="yyyy-mm-dd"/>',
//					_toolBarHtml+='<input name="inpDoc_ffin_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;" placeholder="yyyy-mm-dd"/>',
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
				Sisem.activar(w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]'), false);
				w.$e.find('[name=inp_'+w.tipo.toLowerCase()+'xls]').css('display','none');
			},
			// inObject : 'grid',
			//pagination:false,
			//search:false,
			//fill: function(rpta,$row){},
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var totalDetalle=0;
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td '+colsTmp[0].style+'></td>');}

						$row.append('<td '+colsTmp[1].style+'>'+Sisem.roundFloat(fila.dtd_cant, 0)+'</td>');
						$row.append('<td '+colsTmp[2].style+'>'+'<span style="color: red;">'+Sisem.llenarCeros(fila.dtd_kyart, 5)+'</span>-'+fila.dtd_dscr+'</td>');
						$row.append('<td '+colsTmp[3].style+'>'+fila.dtd_pcos+'</td>');
						$row.append('<td '+colsTmp[4].style+'>'+fila.dtd_pund+'</td>');
						$row.append('<td '+colsTmp[5].style+'>'+fila.dtd_impo+'</td>');

						totalDetalle += parseFloat(fila.dtd_impo);
						
						$row.data('data',fila);
						$row.dblclick(function(){
							if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal-dialog').find('.modal-footer button:eq(0)').click();}
							else{w.$e.dialog('widget').find('.ui-dialog-buttonpane button:eq(0)').click();}
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

//						    	$el.find('#'+w.idMenCtx+'_deta').show();
//						    	$el.find('#'+w.idMenCtx+'_vhij').show();
//						    	$el.find('#'+w.idMenCtx+'_apro').show();
//						    	$el.find('#'+w.idMenCtx+'_anul').show();
//						    	$el.find('#'+w.idMenCtx+'_dele').hide();
//						    	$el.find('#'+w.idMenCtx+'_prin').show();
//							    	
//						    	$el.find('#'+w.idMenCtx+'_apro').html('Sunat');
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
						    		case w.idMenCtx+"_vhij":
											detd.winInt({
												cntInt: 'gridDashDetdocumento',
												doc: {
													doc_kydoc: $row.data('data').doc_kydoc,
												  doc_fini: $row.data('data').doc_fini,
												  doc_ffin: $row.data('data').doc_ffin
												},
												tipo: 'DETDOCUMENTO',
												size: 'short',
												callback:function(data){
													console.log('abriendo oper.interior ' + data);
												}
											});
						    			break;
						    		case w.idMenCtx+"_deta":
						    			docu.winPop({
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
						    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').tdoc+': '+$row.data('data').ndoc, function(rpta){
							    			if(rpta=='Si'){
							    				var lisDoc = Sisem.getItemSelected(w).items;
													var items=[];
													if(lisDoc.length<=1)
													{
														$.post(base_url+'erp/docu/delete',{id: $row.data('data').id_docu},function(rpta){
															Sisem.msgBox(rpta.msg.type,rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
														},'json');
													}
													else
													{
														for(var i=0; i<lisDoc.length; i++){items.push({id_docu:lisDoc[i].id_docu});}
														$.post(base_url+'erp/docu/deleteList',{lisDoc: items},function(rpta){
															Sisem.msgBox(rpta.msg.type,rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
														},'json');
													}
							    			}
						    			});
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
					if(w.showMenCtx){$row.append('<td '+colsTmp[0].style+'></td>');}
					$row.append('<td colspan="4" style="color: red; line-height: 25px; font-size: 14px; font-weight: bold;">Totales</td>');
					
					$row.append('<td align="right" style="color: red; line-height: 25px; font-size: 14px; font-weight: bold;">'+Sisem.redondeoString(totalDetalle)+'</td>');
										
					$tbody.append($row);
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};
