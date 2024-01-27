var brw_sucu = {
	ejecutar: function(w)
	{
		console.log('brw_sucu : '+w.tipo);
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: [
		        {descr:'ACC',width:30},
		        {name: 'suc_tipo', descr:'TIPO', width:150, search: 'false'},
		        {name: 'emp_nomb', descr:'EMPRESA', width:200, search: 'false'},
		        {name: 'loc_nomb', descr:'LOCAL', width:200, search: 'false'},
		        {name: 'suc_nomb', descr:'NOMBRE', width:250, search: 'true'},
		        {name: 'suc_esta', descr:'ESTADO', width:100, search: 'false'}
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
			params: {archivo: w.archivo, suc_tipo:((w.tipo)?w.tipo:'SUCU'), orderColumn: 'suc_nomb', orderType: 'asc'},
			itemdescr: sucu.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? '<div class="form-inline"><div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div><button name="btnAdd'+w.tipo+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+sucu.pag.alias+'</button></div>' : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo+']').click(function(){
					sucu.btnAddClick(w);
				});
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					for (var key in rpta.items)
					{
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						$row.append('<td>'+tipCaBa[rpta.items[key].suc_tipo]+'</td>');
						$row.append('<td>'+rpta.items[key].emp_nomb+'</td>');
						$row.append('<td>'+rpta.items[key].loc_nomb+'</td>');
						$row.append('<td>'+rpta.items[key].suc_nomb+'</td>');
						$row.append('<td>'+estado[rpta.items[key].suc_esta].label+'</td>');
						
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
							    	$el.find('#'+w.idMenCtx+'_deta').hide();
							    	$el.find('#'+w.idMenCtx+'_apro').hide();
							    	$el.find('#'+w.idMenCtx+'_anul').hide();
//								    $el.find('#'+w.idMenCtx+'_dele').hide();
							    	$el.find('#'+w.idMenCtx+'_stck').hide();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
//								    			sucu.Details({id:$row.data('data').id_enti});
							    			break;
							    		case w.idMenCtx+"_edit":
							    			sucu.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').suc_kysuc,
												modo:'VISUALIZAR',
												callback:function(){
													if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
												}
							    			});
							    			break;
							    		case w.idMenCtx+"_dele":
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').suc_nomb, function(rpta){
								    			if(rpta=='Si'){
								    				var lisEnt = Sisem.getItemSelected(w).items;
													var items=[];
													if(lisEnt.length<=1)
													{
														$.post(base_url+'enti/delete',{cat_kycat: $row.data('data').cat_kycat},function(rpta){
															Sisem.msgBox(rpta.msg.type,rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
														},'json');
													}
													else
													{
														for(var i=0; i<lisEnt.length; i++){items.push({cat_kycat:lisEnt[i].cat_kycat});}
														$.post(base_url+'enti/deleteList',{lisEnt: items},function(rpta){
															Sisem.msgBox(rpta.msg.type,rpta.msg.text);
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
};//var brw_sucu = {