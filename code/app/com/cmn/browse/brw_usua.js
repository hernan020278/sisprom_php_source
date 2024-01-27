var brw_usua = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:30}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect:((typeof w.multiSelect!="undefined")?w.multiSelect:false),
			search:((typeof w.search!="undefined")?w.search:false),
			refreshButton:((typeof w.refreshButton!="undefined")?w.refreshButton:true),
			autoWidth:((typeof w.autoWidth!="undefined")?w.autoWidth:false),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp.concat([
		        {name: 'usu_tdoc', descr:'Doc',width:50, search: 'false'},
		        {name: 'usu_ndoc', descr:'Numero',width:50, search: 'true'},
				{name: 'usu_nomb', descr:'Nombre',width:350, search: 'true'},
				{name: 'usu_mail', descr:'Mail',width:250, search: 'true'},
				{name: 'usu_tele', descr:'Telefono',width:50, search: 'false'},
				{name: 'usu_fini', descr:'Fec-Ini',width:50, search: 'false'},
				{name: 'usu_ffin', descr:'Fec-Fin',width:50, search: 'false'}
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
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, com_kycom: USERDATA.com.com_kycom, prf_nomb: ((w.prf)?w.prf.prf_nomb:'USUARIO'), orderColumn: 'usu_nomb', orderType: 'asc'},
			itemdescr: usua.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					usua.btnAddClick(w);
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
			},
			// inObject : 'grid',
			//pagination:false,
			//search:false,
			//fill: function(rpta,$row){},
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					for (var key in rpta.items)
					{
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						
						$row.append('<td>'+rpta.items[key].usu_tdoc+'</td>');
						$row.append('<td>'+rpta.items[key].usu_ndoc+'</td>');
						$row.append('<td>'+rpta.items[key].usu_nomb+'</td>');
						$row.append('<td>'+rpta.items[key].usu_mail+'</td>');
						$row.append('<td>'+rpta.items[key].usu_telf+'</td>');
						$row.append('<td>'+rpta.items[key].usu_fini+'</td>');
						$row.append('<td>'+rpta.items[key].usu_ffin+'</td>');

						$row.data('data',rpta.items[key]).dblclick(function(){
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
							    	$el.find('#'+w.idMenCtx+'_deta').show();
							    	$el.find('#'+w.idMenCtx+'_dele').show();							    	
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			usua.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').usu_kyusu,
												modo:'VISUALIZAR',
												callback:function(){
													if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
												}
							    			});
							    			break;
							    		case w.idMenCtx+"_dele":
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').nomb, function(rpta){
								    			if(rpta=='Si'){
								    				var lisEnt = Sisem.getItemSelected(w).items;
													var items=[];
													if(lisEnt.length<=1)
													{
														$.post(base_url+'enti/delete',{usu_kyusu: $row.data('data').usu_kyusu},function(rpta){
															Sisem.msgBox(rpta.items[key].msg.type,rpta.items[key].msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
														},'json');
													}
													else
													{
														for(var i=0; i<lisEnt.length; i++){items.push({usu_kyusu:lisEnt[i].usu_kyusu});}
														$.post(base_url+'enti/deleteList',{lisEnt: items},function(rpta){
															Sisem.msgBox(rpta.items[key].msg.type,rpta.items[key].msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
														},'json');
													}
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
};//var brw_usua = {