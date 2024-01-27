var brw_ccor = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colAncho = [10, 100, 40, 60, 40, 40];
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width: colAncho[00], style:'style="width: '+colAncho[00]+'px; max-width: '+colAncho[00]+'px; text-align: center;"'}]: []);
		colsTmp= colsTmp.concat([
			{name:'usu_nomb', width:colAncho[01], style: 'style="width: '+colAncho[01]+'px; max-width: '+colAncho[01]+'px; text-align: left;"', descr:'Usuario', search: 'false'},
			{name:'bnc_prop', width:colAncho[02], style: 'style="width: '+colAncho[02]+'px; max-width: '+colAncho[02]+'px; text-align: center;"', descr:'Banco', search: 'false'},
			{name:'cco_ndoc', width:colAncho[03], style: 'style="width: '+colAncho[03]+'px; max-width: '+colAncho[03]+'px; text-align: left;"', descr:'Numero', search: 'false'},
			{name:'cco_tcta', width:colAncho[04], style: 'style="width: '+colAncho[04]+'px; max-width: '+colAncho[04]+'px; text-align: left;"', descr:'Tipo', search: 'false'},
			{name:'cco_tmon', width:colAncho[05], style: 'style="width: '+colAncho[05]+'px; max-width: '+colAncho[05]+'px; text-align: center;"', descr:'Moneda', search: 'true'}
		]);

		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			search: ((w.search)?w.search:false),
			refreshButton: ((w.refreshButton)?w.refreshButton:true),			
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
			params: {archivo: w.archivo, tipo: w.tipo,id_enti: ((w.cli && w.cli.id_enti)?w.cli.id_enti:''), orderColumn: 'bnc_prop', orderType: 'asc'},
			itemdescr: ccor.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
					_toolBarHtml+='<button name="btnDownloadCcorFxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
					_toolBarHtml+='<input name="inp_ccorxls" type="file" accept=".xlsx,.xls"/>',
					_toolBarHtml+='<input name="doc_ccorxls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
					_toolBarHtml+='<button name="btnLoadCcorFxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnRefreshGrid]').click(function(){
					$('#'+w.idGrid).trigger('reloadGrid');				
				});
				
				$el.find('[name=btnAdd'+w.tipo+']').click(function(){
					ccor.btnAddClick(w);
				});
				$('[name=btnDownloadCcorFxls]').on('click',function(){
					window.open(base_url+'app/com/erp/formatos/cco_formato.xls');
				});
				$('[name=btnLoadCcorFxls]').on('click',function (){
					$('[name=inp_ccorxls]').trigger('click');
				});	
				$('[name=inp_ccorxls]').change(function(event){
					var texto = $el.find('[name=inp_ccorxls]').val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $el.find('[name=inp_ccorxls]')[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//					var fileName=w.tope+'_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=doc_ccorxls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'ccor/uploadCcorFxls?tope='+w.tope, function(rpta){
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
				Sisem.activar(w.$e.find('[name=doc_ccorxls]'), false);
				w.$e.find('[name=inp_ccorxls]').css('display','none');
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					for (var key in rpta.items)
					{
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						
					    $row.append('<td '+colsTmp[01].style+'>'+rpta.items[key].usu_nomb+'</td>');
							$row.append('<td '+colsTmp[02].style+'>'+rpta.items[key].bnc_prop+'</td>');
							$row.append('<td '+colsTmp[03].style+'>'+rpta.items[key].cco_ndoc+'</td>');
							$row.append('<td '+colsTmp[04].style+'>'+rpta.items[key].cco_tcta+'</td>');
							$row.append('<td '+colsTmp[05].style+'>'+rpta.items[key].cco_tmon+'</td>');
							
							$row.data('data',rpta.items[key]).dblclick(function(){
							if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal-dialog').find('.modal-footer button:eq(0)').click();}
							else{w.$e.dialog('widget').find('.ui-dialog-buttonpane button:eq(0)').click();}
						});
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	$el.css('z-index','1100');
							    	var $row = invokedOn.closest('tr');

							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	$el.find('#'+w.idMenCtx+'_deta').show();
							    	$el.find('#'+w.idMenCtx+'_dele').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
											if(w.caj){
												ccor.winPop({
													ky:$row.data('data').cco_kycco,
													modo:'VISUALIZAR',
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
													ky:$row.data('data').cco_kycco,
													modo:'VISUALIZAR',
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
							    			break;
							    		case w.idMenCtx+"_dele":

							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].cco_kycco});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').cco_kycco});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').bnc_prop, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('CtrlCtacorriente',data, function(rpta){
														if(rpta.msg.type=='success')
														{
															Sisem.msgBox(rpta.msg.type, rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
															if(w.callback!=null){w.callback();}
														}//if(rpta.msg.type=='success')
														Sisem.unblockW(w.$e);
													});//Sisem.ejecutar('CtrlCtacorriente',data, function(rpta){
								    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
							    			});
							    			break;

							    		case w.idMenCtx+"_prin":
						    				var url = base_url+'docu/print_Ctacorriente?id_sucu='+$row.data('data').id_sucu+'&tdoc='+$row.data('data').tdoc+'&id='+$row.data('data').cco_kycco;
							    			Sisem.windowPrint({id:'printVent',title:'Imprimir',urlIframe:url});
							    			break;
							    	}//switch($id){
							    }//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({								
						}//if( w.showMenCtx ){
						$tbody.append($row);
					}//for (var key in rpta.items)
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_ccor = {