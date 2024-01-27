var brw_matr = {
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
			    {name:'alu_nomb', descr:'Alumno',width:250, search: 'true'},
			    {name:'mtr_peri', descr:'Periodo',width:70, search: 'true'},
			    {name:'mtr_turn', descr:'Turno',width:80, search: 'true'},				    
				{name:'mtr_aula', descr:'Aula',width:70, search: 'false'},
			    {name:'mtr_fini', descr:'Fec-Ini',width:50, search: 'true'},
			    {name:'mtr_ffin', descr:'Fec-Fin',width:50, search: 'true'}
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
			params: {
				archivo: w.archivo, tipo:w.tipo, 
				prg_kyprg: ( ( typeof w.prg!='undefined' ) ? w.prg.prg_kyprg : '' ),
				filtro:((w.filtro)?w.filtro:'TODOS'), orderColumn: 'mtr_freg', orderType: 'desc'},
			itemdescr: matr.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="'+matr.tipPagAct+'_sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="'+matr.tipPagAct+'_btnAdd" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>',
					_toolBarHtml+='<button name="'+matr.tipPagAct+'_btnDownload" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
					_toolBarHtml+='<input name="'+matr.tipPagAct+'_inpFile" type="file" accept=".xlsx,.xls"/>',
					_toolBarHtml+='<input name="'+matr.tipPagAct+'_txtFile" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
					_toolBarHtml+='<button name="'+matr.tipPagAct+'_btnLoad" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name='+matr.tipPagAct+'_btnAdd]').click(function(){
					matr.btnAddClick(w);
				});
				$el.find('[name='+matr.tipPagAct+'_sel_all]').click(function(){
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
				$('[name='+matr.tipPagAct+'_btnDownload]').on('click',function(){
					Sisem.getFile('clg/matr_formato.xls', 'formato', function(rpta){
						if(rpta.msg.type=='success'){window.open(rpta.listaArchivo[0]);}
						else{Sisem.msgBox(rpta.msg.type,rpta.msg.text);}
					});
				});
				$('[name='+matr.tipPagAct+'_btnLoad]').on('click',function (){
					$('[name='+matr.tipPagAct+'_inpFile]').trigger('click');
				});	
				$('[name='+matr.tipPagAct+'_inpFile]').change(function(event){
					var texto = $(this).val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $(this)[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//					var fileName = w.tope+'_'+(new Date()).getTime()+'.'+fileExtension;
					var fileName = 'temporal_excel.'+fileExtension;
					w.$e.find('[name='+matr.tipPagAct+'_txtFile]').val(fileName);
					archivos = [file];
					var data = {
						politicaSeguridad: '',
						archivoNombre: fileName,
						archivoObjeto: archivos,
						url: base_url+USERDATA.app.pol_temp+'/CtrlMatricula/ejecutar?is_json=true&comando=CARGAREXCEL&prf_kyusu='+$('[name=prf_kyusu]').val()
					};
					Sisem.cargarArchivo(w, data, function(rpta){
						if(rpta.msg.type=='success' || rpta.msg.type=='warning')
						{
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							if(rpta.lisRes && rpta.lisRes.length>0)
							{
								Sisem.printExcel({modulo: 'report', reportName: 'rep_resp', reportTitle :'Lista de Registros erroneos', optFormat:'XLS', rpta: rpta});
							}
						}
						Sisem.unblockW(w.$e);
					});
				});
				Sisem.activar(w.$e.find('[name='+matr.tipPagAct+'_txtFile]'), false);
				w.$e.find('[name='+matr.tipPagAct+'_inpFile]').css('display','none');
				
//				w.$e.find('[name=tblPrograma]').css('width', $('#'+w.idGrid).width());
				
//				$el.find('[name=btnRefreshGrid]').click(function(){
//					$('#'+w.idGrid).parent('table').data('grid_params').mtr_pini = dash.brwDashgeneral.$e.find('[name="mtr_pini"]').val();
//					$('#'+w.idGrid).parent('table').data('grid_params').mtr_pfin = dash.brwDashgeneral.$e.find('[name="mtr_pfin"]').val();					
//					$('#'+w.idGrid).trigger('reloadGrid');				
//				});//$el.find('[name=btnRefreshGrid]').click(function(){
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
						
						$row.append('<td>'+fila.alu_nomb+'</td>');
						$row.append('<td>'+fila.mtr_peri+'</td>');
						$row.append('<td>'+fila.mtr_turn+'</td>');
						$row.append('<td>'+fila.mtr_aula+'</td>');
						$row.append('<td>'+moment(fila.mtr_fini).format('DD/MM/YYYY')+'</td>');
						$row.append('<td>'+moment(fila.mtr_ffin).format('DD/MM/YYYY')+'</td>');

//						$row.append('<td align="right" style="color:'+genColor[fila.mtr_otip.toLowerCase()]+'">'+fila.mon_prop+' '+Sisem.redondeoString(fila.mtr_mimp,2)+'</td>');
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
							    	$el.find('#'+w.idMenCtx+'_gevl').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			matr.winPop({
							    				tipo:w.tipo,
							    				ky:$row.data('data').mtr_kymtr,
							    				modo:'VISUALIZAR',
							    				size: 'short',
							    				prg: {
							    					prg_kyprg: $row.data('data').prg_kyprg,
							    					prg_nomb: $row.data('data').prg_nomb,
							    					prg_grad: $row.data('data').prg_grad,
							    					prg_nive: $row.data('data').prg_nive
							    				},
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;							    	
							    		case w.idMenCtx+"_gevl":
							    			evlu.winBrow({
							    				tipo:'EVLASG',
							    				prg: w.prg,
							    				alu: {
							    					alu_kyusu: $row.data('data').alu_kyusu,
							    					alu_nomb: $row.data('data').alu_nomb
							    				},
							    				mtr: {
							    					mtr_kymtr: $row.data('data').mtr_kymtr,
							    					mtr_peri: $row.data('data').mtr_peri,
							    					mtr_turn: $row.data('data').mtr_turn,
							    					mtr_aula: $row.data('data').mtr_aula
							    				},
							    				asg: {
							    					asg_kyasg: 0,
							    					asg_nomb: 'TODOS'
							    				},
							    				prp: {
							    					prp_kyprp: 0,
							    					prp_secc: 'TODOS',
							    					prp_prop: 'TODOS'
							    				},
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;
						    			case w.idMenCtx+"_dele":							    			
							    			var lisSel= Sisem.getItemSelected(w).items;
							    			var lisKySel = [];
							    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].mtr_kymtr, kyorf: lisSel[i].mtr_kyorf});}
							    			if(lisKySel.length==0){lisKySel.push({ky: $row.data('data').mtr_kymtr, kyorf: $row.data('data').mtr_kyorf});}
							    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').mtr_pobs, function(rpta){
								    			if(rpta=='Si'){
													var data = {comando: 'ELIMINAR', lisKy: lisKySel};
													Sisem.ejecutar('erp/CtrlOperacion',data, function(rpta){
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