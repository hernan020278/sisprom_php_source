var brw_cedu = {
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
			    {name:'cdu_fing', descr:'Fec-Ing',width:50, search: 'true'},
			    {name:'prf_nomb', descr:'Profesor',width:350, search: 'true'},
			    {name:'cdu_asig', descr:'Nivel',width:90, search: 'true'},
				{name:'cdu_suel', descr:'Grado',width:90, search: 'true'},
				{name:'cdu_esta', descr:'Estado',width:90, search: 'true'}
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
			params: {archivo: w.archivo, tipo:w.tipo, suc_kysuc:( ( w.suc ) ? w.suc.id_sucu : gIdSuc ), prf_kyusu:(( w.prf )?w.prf.usu_kyusu:''), filtro:((w.filtro)?w.filtro:'TODOS'), orderColumn: 'cdu_fing', orderType: 'desc'},
			itemdescr: cedu.pag.alias+'(s)',
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
					cedu.btnAddClick(w);
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
					window.open(base_url+'app/com/clg/formatos/art_formato.xls');
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
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+USERDATA.app.pol_temp+'/CtrlCedula/ejecutar?is_json=true&comando=SUBIRARCHIVO&prf_kyusu='+$('[name=prf_kyusu]').val(), function(rpta){
						if(rpta.msg.type=='success' || rpta.msg.type=='warning')
						{
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							if(rpta.lisRes.length>0)
							{
								Sisem.printExcel({modulo: 'report', reportName: 'rep_resp', reportTitle :'Lista de Registros erroneos', optFormat:'XLS', rpta: rpta});
							}
						}
						Sisem.unblockW(w.$e);
					});
				});
				Sisem.activar(w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'xls]'), false);
				w.$e.find('[name=inp_'+w.tipo.toLowerCase()+'xls]').css('display','none');
				
				$el.find('[name=btnRefreshGrid]').click(function(){
//					$('#'+w.idGrid).parent('table').data('grid_params').cdu_pini = dash.brwDashgeneral.$e.find('[name="cdu_pini"]').val();
//					$('#'+w.idGrid).parent('table').data('grid_params').cdu_pfin = dash.brwDashgeneral.$e.find('[name="cdu_pfin"]').val();					
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

						$row.append('<td>'+moment(fila.cdu_fing,'YYYY-MM-DD').format('DD/MM/YYYY')+'</td>');
						$row.append('<td>'+fila.prf_nomb+'</td>');
						$row.append('<td>'+fila.cdu_asig+'</td>');
						$row.append('<td align="right" style="color:'+genColor['success']+'">'+Sisem.redondeoString(fila.cdu_suel)+'</td>');
						$row.append('<td>'+fila.cdu_esta+'</td>');
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
							    			cedu.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').cdu_kycdu,
							    				modo:'MODIFICAR',
							    				size: 'short',
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;							    	
						    			case w.idMenCtx+"_dele":
							    			
							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].cdu_kycdu, kyorf: lisSel[i].cdu_kyorf});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').cdu_kycdu, kyorf: $row.data('data').cdu_kyorf});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').cdu_pobs, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('clg/CtrlCedula',data, function(rpta){
														if(rpta.msg.type=='success')
														{
															Sisem.msgBox(rpta.msg.type, rpta.msg.text);
															if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
															if(w.callback!=null){w.callback();}
														}//if(rpta.msg.type=='success')
														Sisem.unblockW(w.$e);
													});//Sisem.ejecutar('clg/GuardarCategoria',data, function(rpta){
								    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
							    			});
							    			break;	
								    	case w.idMenCtx+"_prin":
											var data = {comando: 'IMPRIMIR', pol_nomb: 'ERP_cdu_ELIMINAR', cdu_kycdu: $row.data('data').cdu_kycdu};						    			
							    			Sisem.printPdf('clg/CtrlCedula', data, function(rpta){});
							    			break;				    			
								    }//switch($id){
								}//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({
						}//if( w.showMenCtx ){
						$tbody.append($row);
					}//for(var i=0;i<rpta.items.length;i++){
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
//					$row.append('<td>'+Sisem.redondeoString(sald)+'</td>');
//					$row.append('<td></td>');
//					$tbody.append($row);
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){			
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_doc = {