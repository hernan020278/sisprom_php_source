var brw_canc = {
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
			    {name:'cnc_auto', descr:'AUTOR',width:100, search: 'true'},
			    {name:'cnc_nomb', descr:'NOMBRE',width:150, search: 'true'},
			    {name:'cnc_urla', descr:'AUDIO',width:200, search: 'true'},
				{name:'cnc_esta', descr:'ESTADO',width:50, search: 'true'}
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
				canc.selCancion.$e.find('#idSelCancion').find('td').css('max-width','200px');
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, tipo:w.tipo, filtro:((w.filtro)?w.filtro:'TODOS'), orderColumn: 'cnc_nomb', orderType: 'desc', cnc_kyalb: w.alb.alb_kyalb},
			itemdescr: canc.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
					_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd_'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
					_toolBarHtml+='<button name="btnDownload_'+w.tipo.toLowerCase()+'_xls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'_xls" type="file" accept=".txt"/>',
					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'_xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
					_toolBarHtml+='<button name="btnLoad_'+w.tipo.toLowerCase()+'_xls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
					_toolBarHtml+='<input type="hidden" name="cnc_kycnc"/>',
				_toolBarHtml+='</div>') : ''),			
			onContentLoaded: function($el){
				$el.find('[name=btnAdd_'+w.tipo.toLowerCase()+']').click(function(){
					canc.btnAddClick(w);
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
					Sisem.getFile('prp_formato.xls','formatos', function(rpta){
						if(rpta.msg.type=='success'){window.open(rpta.pathFile);}
						else{Sisem.msgBox(rpta.msg.type,rpta.msg.text);}
					});
				});
				$('[name=btnLoad_'+w.tipo.toLowerCase()+'_xls]').on('click',function (){
					$('[name=inp_'+w.tipo.toLowerCase()+'_xls]').trigger('click');
				});	
				$('[name=inp_'+w.tipo.toLowerCase()+'_xls]').on('change', function(event){
					var selected_file_name = $(this).val();
					console.log(selected_file_name);
					if ( selected_file_name.length > 0 ) {
						Sisem.blockW(w.$e);
						var texto = $el.find('[name=inp_'+w.tipo.toLowerCase()+'_xls]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = $el.find('[name=inp_'+w.tipo.toLowerCase()+'_xls]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
						var fileSize = file.size;
						var fileType = file.type;
						var fileName = "temporal.txt";
//							var fileName=w.tope+'_'+(new Date()).getTime()+'.'+fileExtension;
						w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'_xls]').val(fileName);
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+USERDATA.app.pol_temp+'/CtrlCancion/ejecutar?is_json=true&comando=SUBIRARCHIVO&cnc_kycnc='+$('[name=cnc_kycnc]').val(), function(rpta){
							if(rpta.msg.type=='success')
							{
								Sisem.unblockW(w.$e);
							}
						});
					}
				});
				Sisem.activar(w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'_xls]'), false);
				w.$e.find('[name=btnDownload_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				w.$e.find('[name=inp_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				w.$e.find('[name=doc_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				w.$e.find('[name=btnLoad_'+w.tipo.toLowerCase()+'_xls]').css('display','none');
				
				$el.find('[name=btnRefreshGrid]').click(function(){
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
						
						$row.append('<td>'+fila.cnc_auto+'</td>');
						$row.append('<td>'+fila.cnc_nomb+'</td>');
						$row.append('<td>'+fila.cnc_urla+'</td>');
						$row.append('<td>'+ estado[fila.cnc_esta].text+'</td>');
						$row.data('data',fila);
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	$el.css('z-index','1100');
							    	var $row = invokedOn.closest('tr');
							    	
							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	$el.find('#'+w.idMenCtx+'_ingr').show();
							    	$el.find('#'+w.idMenCtx+'_edit').show();
							    	$el.find('#'+w.idMenCtx+'_vhij').show();
							    	$el.find('#'+w.idMenCtx+'_dele').show();
							    	$el.find('#'+w.idMenCtx+'_prin').show();
							    	
							    	$el.find('#'+w.idMenCtx+'_ingr').html('Importar');
							    	$el.find('#'+w.idMenCtx+'_vhij').html('Letra');
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_ingr":
							    			$('[name=cnc_kycnc]').val($row.data('data').cnc_kycnc);
							    			$('[name=inp_'+w.tipo.toLowerCase()+'_xls]').trigger('click');
							    			break;
							    		case w.idMenCtx+"_edit":
							    			canc.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').cnc_kycnc,
							    				modo:'MODIFICAR',
							    				tope:w.tope,
							    				ctrl:w.ctrl,
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;			
							    		case w.idMenCtx+"_vhij":
							    			letr.winPop({
							    				ky: $row.data('data').cnc_kycnc,
							    				cnc: $row.data('data'),
							    				showMenCtx: true,
							    				tipo:'LISTLETRA',
							    				modo: 'VISUALIZAR',
							    				size: 'large',
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
								    		});
							    			break;							    			
							    		case w.idMenCtx+"_dele":
							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].cnc_kycnc});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').cnc_kycnc});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').cnc_nomb, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('mus/CtrlCancion',data, function(rpta){
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
							    			console.log($row.data('data'));
											var data = {comando: 'IMPRIMIR', 
							    				cnc_kycnc: $row.data('data').cnc_kycnc, 
							    				cnc_nomb: $row.data('data').cnc_nomb, 
							    				cnc_auto: $row.data('data').cnc_auto,
							    				cnc_urla: $row.data('data').cnc_urla,		
							    				cnc_urlb: $row.data('data').cnc_urlb,		
							    				cnc_urlc: $row.data('data').cnc_urlc,		
							    				cnc_urld: $row.data('data').cnc_urld,		
							    				cnc_urle: $row.data('data').cnc_urle,		
							    				cnc_urlf: $row.data('data').cnc_urlf,		
							    				cnc_urlg: $row.data('data').cnc_urlg,		
							    				cnc_urlh: $row.data('data').cnc_urlh,		
							    				cnc_urli: $row.data('data').cnc_urli,		
							    				cnc_urlj: $row.data('data').cnc_urlj	
							    		};						    			
							    			Sisem.printPdf('mus/CtrlCancion', data, function(rpta){});
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
};//var brw_canc = {
