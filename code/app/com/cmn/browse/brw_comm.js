var brw_comm = {
	ejecutar: function(w)
	{
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			autoWidth: ((w.autoWidth)?w.autoWidth:false),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: 
			( ( w.showMenCtx ) ?
				[
					{name:'', descr:'ACC',width:50},
					{name: 'com_nomb', descr:'NOMBRE',width:150, search: 'false'},
				    {name: 'com_dscr', descr:'DESCRIPCION',width:350, search: 'false'}
				]
			:
				[
					{name: 'com_nomb', descr:'NOMBRE',width:100, search: 'false'},
				    {name: 'com_dscr', descr:'DESCRIPCION',width:200, search: 'false'}
				]
			),
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
				w.$e.find('[data-toggle="tooltip"]').tooltip();
			},
			data: base_url+'cmn/control/ejecutar',
			params: {dbapp:w.dbapp, archivo: w.archivo, tipo:w.tipo, com_kycom:( ( w.com && w.com.com_kycom ) ? w.com.com_kycom : 0 ), usu_kyusu: USERDATA.usu.usu_kyusu, orderColumn: 'com_nomb', orderType: 'asc'},
			itemdescr: comm.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? '<div class="form-inline"><button name="btnAdd'+w.idGrid+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+comm.pag.alias+'</button></div>' : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.idGrid+']').click(function(){
					comm.btnAddClick(w);
				});			
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					for (var key in rpta.items)
					{
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						$row.append('<td>'+rpta.items[key].com_nomb+'</td>');
						$row.append('<td>'+rpta.items[key].com_dscr+'</td>');
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
							    	//$el.find('#'+w.idMenCtx+'_edit').hide();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
						    		case w.idMenCtx+"_deta":
						    			comm.winPop({
						    				ky:$row.data('data').com_kycom,
						    				modo:'VISUALIZAR',
						    				tipo:w.tipo,
						    				callback:function(){
						    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						    				}
							    		});					    				
						    			break;
						    		case w.idMenCtx+"_edit":
						    			comm.winPop({
						    				ky:$row.data('data').com_kycom,
						    				modo:'MODIFICAR',
						    				tipo:w.tipo,
						    				callback:function(){
						    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						    				}
							    		});					    				
						    			break;
							    	}//switch($id){
							    }//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({
						}//if( w.showMenCtx ){							
						$tbody.append($row);							
					}//for (var key_1 in rpta.items)
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_comm = {