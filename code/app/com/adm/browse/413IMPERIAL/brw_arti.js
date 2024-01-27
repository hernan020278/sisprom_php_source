var brw_arti = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colAncho = [35, 100, 200, 120, 120, 100, 50, 50, 150, 100, 100, 70];
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width: colAncho[0], style:'width: '+colAncho[0]+'px; max-width: '+colAncho[0]+'px; text-align: center;'}]: []);
		colsTmp= colsTmp.concat([
			{name:'art_codi', descr:'Codigo',width:colAncho[1], search: 'false', style: 'style="width: '+colAncho[1]+'px; max-width: '+colAncho[1]+'px; text-align: center;"'},
			{name:'art_nomb', descr:'Nombre',width:colAncho[2], search: 'true', style: 'style="width: '+colAncho[2]+'px; max-width: '+colAncho[2]+'px; text-align: left;"'},
			{name:'art_marc', descr:'Marca',width:colAncho[3], search: 'false', style: 'style="width: '+colAncho[3]+'px; max-width: '+colAncho[3]+'px; text-align: left;"'},
			{name:'art_cate', descr:'Categoria',width:colAncho[4], search: 'false', style: 'style="width: '+colAncho[4]+'px; max-width: '+colAncho[4]+'px; text-align: left;"'},
			{name:'art_unid', descr:'Unidad',width:colAncho[5], search: 'false', style: 'style="width: '+colAncho[5]+'px; max-width: '+colAncho[5]+'px; text-align: center;"'},
			{name:'art_sact', descr:'Stock',width:colAncho[6], search: 'false', style: 'style="width: '+colAncho[6]+'px; max-width: '+colAncho[6]+'px; text-align: center;"'},
			{name:'art_pcos', descr:'Costo',width:colAncho[7], search: 'false', style: 'style="width: '+colAncho[7]+'px; max-width: '+colAncho[7]+'px; text-align: right;"'},
			{name:'art_pres', descr:'Presentacion',width:colAncho[8], search: 'false', style: 'style="width: '+colAncho[8]+'px; max-width: '+colAncho[8]+'px; text-align: left;"'},
			{name:'art_conc', descr:'Concentracion',width:colAncho[9], search: 'false', style: 'style="width: '+colAncho[9]+'px; max-width: '+colAncho[9]+'px; text-align: left;"'},
			{name:'art_titu', descr:'Titular',width:colAncho[10], search: 'true', style: 'style="width: '+colAncho[10]+'px; max-width: '+colAncho[10]+'px; text-align: left;"'},
			{name:'art_frsn', descr:'Fec-Registro',width:colAncho[11], search: 'false', style: 'style="width: '+colAncho[11]+'px; max-width: '+colAncho[11]+'px; text-align: center;"'}
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
			params: {archivo: w.archivo, tipo:w.tipo, suc_kysuc: ( ( USERDATA.suc ) ? Sisem.get(USERDATA.suc,'suc_kysuc','0') : w.suc.suc_kysuc), art_nomb: w.art_nomb, orderColumn: 'art_nomb', orderType: 'asc'},
			itemdescr: arti.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
					_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd_'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
					_toolBarHtml+='<button name="btnDownload_'+w.tipo.toLowerCase()+'_xls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'_xls" type="file" accept=".xlsx,.xls"/>',
					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'_xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
					_toolBarHtml+='<button name="btnLoad_'+w.tipo.toLowerCase()+'_xls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd_'+w.tipo.toLowerCase()+']').click(function(){
					arti.btnAddClick(w);
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
				$('[name=btnDownload_'+w.tipo.toLowerCase()+'_xls]').on('click',function(){
					Sisem.getFile('art_formato.xls', 'formatos', function(rpta){
						if(rpta.msg.type=='success'){window.open(rpta.pathFile);}
						else{Sisem.msgBox(rpta.msg.type,rpta.msg.text);}
					});
				});
				$('[name=btnLoad_'+w.tipo.toLowerCase()+'_xls]').on('click',function (){
					$('[name=inp_'+w.tipo.toLowerCase()+'_xls]').trigger('click');
				});	
				$('[name=inp_'+w.tipo.toLowerCase()+'_xls]').change(function(event){
					var texto = $el.find('[name=inp_'+w.tipo.toLowerCase()+'_xls]').val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $el.find('[name=inp_'+w.tipo.toLowerCase()+'_xls]')[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//						var fileName=w.tope+'_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'_xls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'erp/arti/uploadArtiFxls?tipo='+w.tipo, function(rpta){
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
				Sisem.activar(w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'_xls]'), false);
				w.$e.find('[name=btnDownload_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				w.$e.find('[name=inp_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				w.$e.find('[name=btnLoad_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
			},
			//inObject : 'grid',
			//pagination:false,
			//search:false,
			//fill: function(rpta,$row){},
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var sald=0;
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td style="width: '+colsTmp[0].width+'px; max-width: '+colsTmp[0].width+'px;"></td>');}
						
						$row.append('<td '+colsTmp[1].style+'>'+fila.art_codi+'</td>');
						$row.append('<td '+colsTmp[2].style+'>'+fila.art_nomb+'</td>');
						$row.append('<td '+colsTmp[3].style+'>'+fila.art_marc+'</td>');
						$row.append('<td '+colsTmp[4].style+'>'+fila.art_cate+'</td>');
						$row.append('<td '+colsTmp[5].style+'>'+fila.art_unid+'</td>');
						$row.append('<td '+colsTmp[6].style+'>'+fila.art_sact+'</td>');
						$row.append('<td '+colsTmp[7].style+'>'+fila.art_pcos+'</td>');
						$row.append('<td '+colsTmp[8].style+'>'+fila.art_pres+'</td>');
						$row.append('<td '+colsTmp[9].style+'>'+fila.art_conc+'</td>');
						$row.append('<td '+colsTmp[10].style+'>'+fila.art_titu+'</td>');
						$row.append('<td '+colsTmp[11].style+'>'+moment(fila.art_frsn).format('YYYY-MM-DD')+'</td>');
						
						$row.data('data',fila).dblclick(function(){
							if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal-dialog').find('.modal-footer button:eq(0)').click();}
							else{w.$e.dialog('widget').find('.ui-dialog-buttonpane button:eq(0)').click();}
						});						
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
							    	var $row = invokedOn.closest('tr');
							    	
							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	$el.find('#'+w.idMenCtx+'_edit').show();
							    	$el.find('#'+w.idMenCtx+'_dele').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_edit":
							    			arti.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').art_kyart,
												modo:'MODIFICAR',
												callback:function(){
													if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
												}
							    			});
							    			break;
							    		case w.idMenCtx+"_dele":
							    			
							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].art_kyart});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').art_kyart});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').art_nomb, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('adm/CtrlArticulo',data, function(rpta){
														if(rpta.msg.type=='success')
														{
															Sisem.msgBox(rpta.msg.type, rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
															if(w.callback!=null){w.callback();}
														}//if(rpta.msg.type=='success')
														Sisem.unblockW(w.$e);
													});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
								    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
							    			});							    			
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
};//var brw_arti = {