var brw_perf = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:30}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			search: ((w.search)?w.search:false),
			refreshButton: ((w.refreshButton)?w.refreshButton:true),
			autoWidth: ((w.autoWidth)?w.autoWidth:false),			
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: [
		        {descr:'ACC',width:30},
		        {name: 'prf_nomb', descr:'NOMBRE',width:100, search: 'false'},
		        {name: 'prf_dscr', descr:'DESCRIPCION',width:200, search: 'false'}
			],
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
			params: {archivo: w.archivo, orderColumn: 'prf_nomb', orderType: 'asc'},
			itemdescr: perf.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
//					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
//					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
//					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
//					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
//					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					perf.btnAddClick(w);
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
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null)
				{
					for(var i=0;i<rpta.items.length;i++)
					{
						var fila = rpta.items[i];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}

						$row.append('<td>'+fila.prf_nomb+'</td>');
						$row.append('<td>'+fila.prf_dscr+'</td>');

						$row.data('data',fila);
						
						$row.dblclick(function(){
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
							    	$el.find('#'+w.idMenCtx+'_vhij').show();
									$el.find('#'+w.idMenCtx+'_dele').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_vhij":
							    			regl.winSel({
							    				showMenCtx: true,
							    				tipo:'REGLA',
							    				modo:'SELECCIONAR',
							    				prf:{prf_kyprf: $row.data('data').prf_kyprf, prf_nomb: $row.data('data').prf_nomb},
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
								    		});
							    			break;							    	
							    		case w.idMenCtx+"_deta":
							    			perf.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').prf_kyprf,
							    				modo:'VISUALIZAR',
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;								    	
							    		case w.idMenCtx+"_dele":
							    			var lisDel= Sisem.getItemSelected(w).items;
							    			var lisKyDel = [];
							    			for(var i=0; i<lisDel.length; i++){lisKyDel.push({prf_kyprf: lisDel[i].prf_kyprf});}
							    			if(lisKyDel.length==0){lisKyDel.push({prf_kyprf: $row.data('data').prf_kyprf});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').prf_nomb, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKyDel};
													Sisem.ejecutar('cmn/CtrlPerfil',data, function(rpta){
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
					}//for(var i=0;i<rpta.items.length;i++){
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_perf = {