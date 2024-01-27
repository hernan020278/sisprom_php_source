var brw_poli = {
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
			    {name:'pol_nomb', descr:'Nombre',width:154, search: 'true'},
			    {name:'pol_dscr', descr:'Descripcion',width:250, search: 'true'},
				{name:'pol_orde', descr:'Orde',width:80, search: 'true'},
				{name:'pol_nive', descr:'Nivel',width:80, search: 'true'},
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
			params: {archivo: w.archivo, tipo:w.tipo, pol_kypdr: w.pol.pol_kypdr, pol_nive: w.pol.pol_nive, orderColumn: 'pol_orde', orderType: 'asc'},
			itemdescr: poli.pag.alias+'(s)',
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
					poli.btnAddClick(w);
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

				Sisem.activar(w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]'), false);
				w.$e.find('[name=inp_'+w.tipo.toLowerCase()+'xls]').css('display','none');
				
				$el.find('[name=btnRefreshGrid]').click(function(){
//					$('#'+w.idGrid).parent('table').data('grid_params').tbl_pini = dash.brwDashgeneral.$e.find('[name="tbl_pini"]').val();
//					$('#'+w.idGrid).parent('table').data('grid_params').tbl_pfin = dash.brwDashgeneral.$e.find('[name="tbl_pfin"]').val();					
					$('#'+w.idGrid).trigger('reloadGrid');				
				});//$el.find('[name=btnRefreshGrid]').click(function(){
			},//onContentLoaded: function($el){
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var sald=0;
//					for(var i=0;i<rpta.items.length;i++){
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						
						$row.append('<td>'+fila.pol_nomb+'</td>');
						$row.append('<td>'+fila.pol_dscr+'</td>');
						$row.append('<td name="tdPolitica_'+fila.pol_kypol+'">'+fila.pol_orde+'</td>');
						$row.append('<td>'+fila.pol_nive+'</td>');

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
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
						    		case w.idMenCtx+"_deta":
						    			oper.winPop({
						    				tipo:w.tipo,
						    				ky:$row.data('data').tbl_kytbl,
						    				modo:'MODIFICAR',
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
										var data = {comando: 'ENVIAR_MAIL', tbl_kytbl: $row.data('data').tbl_kytbl, tbl_kyorf: $row.data('data').tbl_kyorf};
										Sisem.ejecutar('erp/CtrlTabla',data, function(rpta){
											if(rpta.msg.type=='success')
											{
												Sisem.msgBox(rpta.msg.type, rpta.msg.text);
											}//if(rpta.msg.type=='success')
										});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
						    			break;							    	
						    		case w.idMenCtx+"_oper":
							    			poli.winPop({
							    				ky:$row.data('data').tbl_kydoc,
							    				modo:'VISUALIZAR',
							    				suc:{
							    					id_sucu:$('[name=main_kysuc] :selected').val(),
							    					nomb:$('[name=main_kysuc] :selected').text()
							    				},
							    				tope:'0002',
							    				caj:{
							    					id_caja:w.caj.id_caja,
							    					id_apci:w.caj.id_apci,
							    					nomb:w.caj.nomb
							    				},
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;
							    		case w.idMenCtx+"_dele":
							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].tbl_kytbl, kyorf: lisSel[i].tbl_kyorf});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').tbl_kytbl, kyorf: $row.data('data').tbl_kyorf});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').tbl_pobs, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('erp/CtrlTabla',data, function(rpta){
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
											var data = {comando: 'IMPRIMIR', pol_nomb: 'ERP_tbl_ELIMINAR', tbl_kytbl: $row.data('data').tbl_kytbl};						    			
							    			Sisem.printPdf('erp/CtrlTabla', data, function(rpta){});
							    			break;				    			
							    	}//switch($id){
							    }//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({
						}//if( w.showMenCtx ){
						$tbody.append($row);
					}//for(var i=0;i<rpta.items.length;i++){
					
					$tbody.find('[name^=tdPolitica_]').click(function(e){
						var $tdPoli = $(this);
						var dataRow = $(this).parent().data('data');
						
						if($tdPoli.children().length == 0)
						{
							$tdPoli.html('');
							
							$tdPoli.append('<input name="pol_orde_'+dataRow.pol_kypol+'" type="text" class="form-control input-xs">');
							$tdPoli.find('[name=pol_orde_'+dataRow.pol_kypol+']').on("focus", function (){$(this).select();});
							$tdPoli.find('[name=pol_orde_'+dataRow.pol_kypol+']').val(dataRow.pol_orde).focus();
							
							$tdPoli.find('[name=pol_orde_'+dataRow.pol_kypol+']').blur(function(e){
								Sisem.ejecutar('cmn/CtrlPolitica',{comando: 'MODIFICAR', pol_kypol: dataRow.pol_kypol, pol_orde: $tdPoli.find('[name=pol_orde_'+dataRow.pol_kypol+']').val()}, function(rpta){
									if(rpta.msg.type=='success')
									{
										$tdPoli.parent().data('data').pol_orde=$tdPoli.find('[name=pol_orde_'+dataRow.pol_kypol+']').val();
										dataRow = $tdPoli.parent().data('data');
										$(e.target).remove();
										$tdPoli.html(dataRow.pol_orde);
									}//if(rpta.msg.type=='success')
								});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
							});
						}
					});					
					/*
					 * RESUMEN DE TOTALES
					 */
//					var $row = $('<tr class="item" />');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td></td>');
//					$row.append('<td>TOTAL</td>');
//					$row.append('<td>'+Sisem.redondeoString(sald,2)+'</td>');
//					$row.append('<td></td>');
//					$tbody.append($row);
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){			
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_doc = {