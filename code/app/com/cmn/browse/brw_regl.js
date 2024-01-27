var brw_regl = {
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
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp.concat([
		        {name: 'pol_nomb', descr:'Politica',width:150, search: 'false'},
		        {name: 'pol_dscr', descr:'Descripcion',width:350, search: 'false'},
		        {name: 'pol_esta', descr:'Estado',width:100, search: 'false'}
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
			params: {archivo: w.archivo, tipo:w.tipo, reg_kycom: USERDATA.com.com_kycom, reg_kyprf: w.prf.prf_kyprf, orderColumn: 'pol_nomb', orderType: 'asc'},
			itemdescr: regl.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
//					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
//					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
//					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
//					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
//					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
					_toolBarHtml+='<input type="text" name="com_nomb" class="form-control" placeholder="Comunidad" value="Comunidad"/>',
					_toolBarHtml+='<input type="text" name="prf_nomb" class="form-control" placeholder="Perfil" value="Perfil"/>',
				_toolBarHtml+='</div>'
			) : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					regl.btnAddClick(w);
				});
				$el.find('[name=com_nomb]').val('Comunidad : '+USERDATA.com.com_nomb);
				$el.find('[name=prf_nomb]').val('Perfil    : '+w.prf.prf_nomb);
				Sisem.activar($el.find('[name=com_nomb]'), false);
				Sisem.activar($el.find('[name=prf_nomb]'), false);
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
						
						$row.append('<td>'+fila.pol_nomb+'</td>');
						$row.append('<td>'+fila.pol_dscr+'</td>');
						$row.append('<td>'+fila.pol_esta+'</td>');

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
									$el.find('#'+w.idMenCtx+'_dele').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
						    			case w.idMenCtx+"_deta":
							    			regl.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').reg_kyreg,
							    				modo:'VISUALIZAR',
							    				prf: w.prf,							    				
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;								    	
							    		case w.idMenCtx+"_dele":
							    			if($row.data('data').reg_kyusu!=USERDATA.com.com_kyusu)
							    			{
								    			var lisDel= Sisem.getItemSelected(w).items;
								    			var lisKyDel = [];
								    			for(var i=0; i<lisDel.length; i++){lisKyDel.push({ky: lisDel[i].reg_kyreg});}
								    			if(lisKyDel.length==0){lisKyDel.push({ky: $row.data('data').reg_kyreg});}
								    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').pol_dscr, function(rpta){
									    			if(rpta=='Si'){
														var data = {comando: 'ELIMINAR', lisKy: lisKyDel};
														Sisem.ejecutar('cmn/CtrlRegla',data, function(rpta){
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
							    			}//if($row.data('data').usu_kyusu!=USERDATA.usu.usu_kyusu)
							    			else{Sisem.msgBox('error', 'No se puede eliminar al usuario creador');}
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
};//var brw_regl = {