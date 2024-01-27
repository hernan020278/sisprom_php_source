var brw_oper = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:10}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect:((typeof w.multiSelect!="undefined")?w.multiSelect:false),
			search:((typeof w.search!="undefined")?w.search:false),
			refreshButton:((typeof w.refreshButton!="undefined")?w.refreshButton:true),
			autoWidth:((typeof w.autoWidth!="undefined")?w.autoWidth:false),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp.concat([
			    {name:'ope_freg', descr:'FECHA',width:20, search: 'true'},
			    {name:'ope_tope', descr:'TIPO',width:20, search: 'true'},
			    {name:'ope_rubr', descr:'DESTINO',width:30, search: 'true'},				    
			    {name:'ope_clas', descr:'CLASE',width:30, search: 'true'},				    
//			    {name:'ope_tope', descr:'OPERACION',width:60, search: 'true'},
			    {name:'ope_pobs', descr:'GLOSA',width:200, search: 'true'},
			    {name:'ope_debe', descr:'INGRESO',width:30, search: 'false'},
			    {name:'ope_habe', descr:'EGRESO',width:30, search: 'false'}
   			]),
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
				console.log(w);
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, apc_kyapci:w.apc.apc_kyapc, tope: w.tope, modo: ((w.modo)? w.modo : 'SELECCIONAR'), 
				tipo: ((w.tipo)? w.tipo : ''), cco_kycco: ((w.cco_kycco) ? w.cco_kycco : ''), ope_rubr: ((w.ope_rubr) ? w.ope_rubr : ''), ope_clas: ((w.ope_clas) ? w.ope_clas : ''), 
				ope_pini: ((w.ope) ? w.ope.ope_pini : ''), ope_pfin: ((w.ope) ? w.ope.ope_pfin : ''), ope_esta: ((w.ope) ? w.ope.ope_esta : ''), orderColumn: 'ope_freg', orderType: 'desc'},
			itemdescr: oper.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+oper.pag.alias+'</button>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'Venta" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nuevo Pago Venta</button>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'Compra" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva Pago Compra</button>',
//					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
//					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
//					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
//					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					oper.btnAddClick($.extend(w,{tipoOperacion: 'OPERACION'}));
				});
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+'Venta]').click(function(){
					oper.btnAddClick($.extend(w,{tipoOperacion: 'VENTA'}));
				});
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+'Compra]').click(function(){
					oper.btnAddClick($.extend(w,{tipoOperacion: 'COMPRA'}));
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
					window.open(base_url+'app/com/erp/formatos/usu_formato.xls');
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
//						var fileName=w.tope+'_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'enti/uploadEntiFxls?tipo='+w.tipo, function(rpta){
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
				
				$el.find('[name=btnRefreshGrid]').click(function(){
					$('#'+w.idGrid).parent('table').data('grid_params').ope_pini = dash.brwDashgeneral.$e.find('[name="ope_pini"]').val();
					if(oper.opeRango==1){$('#'+w.idGrid).parent('table').data('grid_params').ope_pfin = dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val();}
					$('#'+w.idGrid).trigger('reloadGrid');				
				});				
			},
			// inObject : 'grid',
			//pagination:false,
			//search:false,
			//fill: function(rpta,$row){},
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var totalDebe=0;
					var totalHabe=0;
//					for(var i=0;i<rpta.items.length;i++){
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						
						$row.append('<td>'+moment(fila.ope_freg).format('YY-MM-DD')+'</td>');
						$row.append('<td>'+fila.ope_tope+'</td>');
						$row.append('<td>'+fila.ope_rubr+'</td>');
						$row.append('<td>'+fila.ope_clas+'</td>');
						
						//TIPO DE OPERACION TRANSFERENCIA
//						if(fila.ope_tope=='0016')
//						{
//							if(fila.ope_otip=='INGRESO')
//							{
//								$row.append('<td>'+fila.erf_nomb+'</td>');
//								$row.append('<td>'+fila.usu_nomb+'</td>');
//							}
//							else if(fila.ope_otip=='EGRESO')
//							{
//								$row.append('<td>'+fila.usu_nomb+'</td>');
//								$row.append('<td>'+fila.erf_nomb+'</td>');
//							}
//						}//if(fila.ope_tope=='0016')
//						else
//						{
//							$row.append('<td>'+fila.usu_nomb+'</td>');
//							$row.append('<td>'+fila.erf_nomb+'</td>');						
//						}
//						$row.append('<td>'+tipOpe[fila.ope_tope]+'</td>');
						$row.append('<td>'+fila.ope_pobs+'</td>');
						$row.append('<td align="right" style="color:'+genColor['ingreso']+'">'+(fila.ope_debe > 0 ? Sisem.redondeoString(fila.ope_debe) : '')+'</td>');
						$row.append('<td align="right" style="color:'+genColor['egreso']+'">'+(fila.ope_habe > 0 ? Sisem.redondeoString(fila.ope_habe) : '')+'</td>');
						totalDebe = totalDebe + parseFloat(fila.ope_debe);
						totalHabe = totalHabe + parseFloat(fila.ope_habe);
						
						if( w.showMenCtx ){
							$row.data('data',fila);
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
							    	var $row = invokedOn.closest('tr');
							    	
							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	$el.find('#'+w.idMenCtx+'_deta').show();
							    	$el.find('#'+w.idMenCtx+'_mail').show();
							    	$el.find('#'+w.idMenCtx+'_dele').show();
							    	$el.find('#'+w.idMenCtx+'_prin').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
											case w.idMenCtx+"_deta":
												oper.winPop({
													tipo:w.tipo,
													ky:$row.data('data').ope_kyope,
													modo:'VISUALIZAR',
													suc:{
														suc_kysuc:$('[name=main_kysuc] :selected').val(),
														suc_nomb:$('[name=main_kysuc] :selected').text()
													},
													tope:w.tope,
													ctrl:w.ctrl,
													size: 'short',
													callback:function(){
														if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
													}
												});
												break;							    	
											case w.idMenCtx+"_mail":
												var data = {comando: 'ENVIAR_MAIL', ope_kyope: $row.data('data').ope_kyope, ope_kyorf: $row.data('data').ope_kyorf};
												Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
													if(rpta.msg.type=='success')
													{
														Sisem.msgBox(rpta.msg.type, rpta.msg.text);
													}//if(rpta.msg.type=='success')
												});//Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
												break;							    	
											case w.idMenCtx+"_dele":
												
												var lisSel= Sisem.getItemSelected(w).items;
												var lisKySel = [];
												for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].ope_kyope, kyorf: lisSel[i].ope_kyorf, ope_kydoc: lisSel[i].ope_kydoc, ope_oimp: lisSel[i].ope_oimp});}
												if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').ope_kyope, kyorf: $row.data('data').ope_kyorf, ope_kydoc: $row.data('data').ope_kydoc, ope_oimp: $row.data('data').ope_oimp});}
												
												Sisem.msgAsk('Desea eliminar', $row.data('data').ope_pobs, function(rpta){
													if(rpta=='Si'){
														var data = {comando: 'ELIMINAR', lisKy: lisKySel};
														Sisem.ejecutar('adm/CtrlOperacion',data, function(rpta){
															if(rpta.msg.type=='success')
															{
																Sisem.msgBox(rpta.msg.type, rpta.msg.text);
																if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
																if(w.callback!=null){w.callback();}
															}//if(rpta.msg.type=='success')
															Sisem.unblockW(w.$e);
														});
													}
												});
												break;
												
											case w.idMenCtx+"_pend":

												$.SmartMessageBox({
													title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Actualizar <span class='txt-color-orangeDark'><strong></strong></span>",
													content : "Desea actualizar registro?",
													buttons : '[No][Si]'
												}, function(ButtonPressed) {
													if (ButtonPressed == "Si") {
														$.post(base_url+'oper/update',{id_oper:$row.data('data').ope_kyope, esta: '0002',id_ccor:$row.data('data').ope_kyccor,id_padr:$row.data('data').doc_kypdr},function(rpta){
															Sisem.msgBox(rpta.msg.type, rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
														},'json');
													}
												});							    			
												break;

											case w.idMenCtx+"_prin":
												var data = {comando: 'IMPRIMIR', pol_nomb: 'ERP_OPE_ELIMINAR', ope_kyope: $row.data('data').ope_kyope};						    			
													Sisem.printPdf('adm/CtrlOperacion', data, function(rpta){});
													break;				    			
								  	}//switch($id){
								  }//menuSelected: function (invokedOn, selectedMenu) {
								});//$row.contextMenu({
							}//if( w.showMenCtx ){
						$tbody.append($row);
					}//for(var i=0;i<rpta.items.length;i++){
					/*
					 * RESUMEN DE TOTALES
					 */
					var $row = $('<tr class="item" />');
					$row.append('<td></td>');
					$row.append('<td></td>');
					$row.append('<td></td>');
					$row.append('<td></td>');
					$row.append('<td></td>');					
					$row.append('<td align="center" style="color:'+genColor['costo']+'">Total</td>');
					$row.append('<td align="right" style="color:'+genColor['ingreso']+'">'+(Sisem.redondeoString(totalDebe) > 0 ? Sisem.redondeoString(totalDebe) : '')+'</td>');
					$row.append('<td align="right" style="color:'+genColor['egreso']+'">'+(Sisem.redondeoString(totalHabe) > 0 ? Sisem.redondeoString(totalHabe) : '')+'</td>');
					$tbody.append($row);
				}
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};
