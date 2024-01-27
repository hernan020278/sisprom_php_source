var brw_myapps = {
	ejecutar: function(w)
	{
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			search: ((w.search)?w.search:false),
			refreshButton: ((w.refreshButton)?w.refreshButton:true),
			autoWidth: ((w.autoWidth)?w.autoWidth:false),			
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: [
		        {name: '', descr:'ACC',width:30, search: 'false'},
		        {name: '', descr:'Aplicacion',width:150, search: 'false'},
		        {name: '', descr:'Comunidad',width:150, search: 'false'}
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
			params: {archivo: w.archivo, tipo:w.tipo, usu_kyusu:USERDATA.usu.usu_kyusu, orderColumn: 'pol_nomb', orderType: 'asc'},
			itemdescr: myapps.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? '' : ''),
			onContentLoaded: function($el){			
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null)
				{
					for(var i=0;i<rpta.items.length;i++)
					{
						var $ite = rpta.items[i];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						if($ite.cau_type=='ADM'){$row.append('<td><button class="btn btn-default btn-sm"><i class="fa fa-cogs"></i></button></td>');}
						$row.append('<td>'+$ite.pol_dscr+'</td>');
						$row.append('<td>'+$ite.com_nomb+'</td>');

						$row.data('data',$ite).dblclick(function(){
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

							    	$el.find('#'+w.idMenCtx+'_deta').html('Ver Politicas');
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			poli.winSel({
							    				tipo: 'POLI',
							    				tipoBrowse: 'EXPLORADOR',
						    					pol: {
						    						pol_kypol: $row.data('data').pol_kypol,
						    						pol_kypdr: $row.data('data').pol_kypdr,
						    						pol_nomb: $row.data('data').pol_nomb,
						    						pol_nive: $row.data('data').pol_nive
						    					},
							    				modo: 'VISUALIZAR',
							    				size: 'large',
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
					}//for(var i=0;i<rpta.items.length;i++){
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_myapps = {