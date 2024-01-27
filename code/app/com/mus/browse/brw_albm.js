var brw_albm = {
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
			    {name:'alb_tipo', descr:'TIPO',width:80, search: 'true'},
			    {name:'alb_nomb', descr:'ALBUM',width:150, search: 'true'},
			    {name:'alb_dscr', descr:'DESCRIPCION',width:250, search: 'true'},
				{name:'alb_esta', descr:'ESTADO',width:50, search: 'true'}
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
			params: {archivo: w.archivo, tipo:w.tipo, filtro:((w.filtro)?w.filtro:'TODOS'), orderColumn: 'alb_nomb', orderType: 'desc', alb_kycom: USERDATA.com.com_kycom, alb_kysuc: USERDATA.suc.suc_kysuc},
			itemdescr: albm.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
					_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					albm.btnAddClick(w);
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
					window.open(base_url+'app/com/erp/formatos/art_formato.xls');
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
//					var fileName=w.tope+'_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'erp/enti/uploadEntiFxls?tipo='+w.tipo, function(rpta){
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
					$('#'+w.idGrid).parent('table').data('grid_params').alb_pini = dash.brwDashgeneral.$e.find('[name="alb_pini"]').val();
					$('#'+w.idGrid).parent('table').data('grid_params').alb_pfin = dash.brwDashgeneral.$e.find('[name="alb_pfin"]').val();					
					$('#'+w.idGrid).trigger('reloadGrid');				
				});//$el.find('[name=btnRefreshGrid]').click(function(){
			},//onContentLoaded: function($el){
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						
						$row.append('<td>'+fila.alb_tipo+'</td>');
						$row.append('<td>'+fila.alb_nomb+'</td>');
						$row.append('<td>'+fila.alb_dscr+'</td>');
						$row.append('<td>'+fila.alb_esta+'</td>');
						$row.data('data',fila);
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	$el.css('z-index','1100');
							    	var $row = invokedOn.closest('tr');
							    	
							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	$el.find('#'+w.idMenCtx+'_deta').show();
							    	$el.find('#'+w.idMenCtx+'_vhij').show();
							    	$el.find('#'+w.idMenCtx+'_vhij').html('Canciones');
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			albm.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').alb_kyalb,
							    				modo:'MODIFICAR',
							    				tope:w.tope,
							    				ctrl:w.ctrl,
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;			
							    		case w.idMenCtx+"_vhij":
							    			canc.winSel({
							    				alb: {
							    					alb_kyalb:$row.data('data').alb_kyalb,	
							    				},
							    				showMenCtx: true,
							    				tope:w.tipo,
							    				modo:'SELECCIONAR',
							    				ctrl:w.ctrl,
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
								    		});
							    			break;							    			
							    		case w.idMenCtx+"_dele":
							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].alb_kyalb});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').alb_kyalb});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').alb_nomb, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('CtrlAlbum',data, function(rpta){
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
							    		case w.idMenCtx+"_prin":
											var data = {comando: 'IMPRIMIR', pol_nomb: 'ERP_alb_ELIMINAR', alb_kyalb: $row.data('data').alb_kyalb};						    			
							    			Sisem.printPdf('erp/CtrlOperacion', data, function(rpta){});
							    			break;				    			
								    	}//switch($id){
								    }//menuSelected: function (invokedOn, selectedMenu) {
								});//$row.contextMenu({
							}//if( w.showMenCtx ){
						$tbody.append($row);
					}//for(var i=0;i<rpta.items.length;i++){
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){			
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_albm = {