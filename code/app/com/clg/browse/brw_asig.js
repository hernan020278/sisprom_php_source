var brw_asig = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:30}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect:((typeof w.multiSelect!="undefined")?w.multiSelect:false),
			search:((typeof w.search!="undefined")?w.search:false),
			refreshButton:((typeof w.refreshButton!="undefined") ? w.refreshButton : ((w.cntInt)?true:false)),
			autoWidth:((typeof w.autoWidth!="undefined")?w.autoWidth:false),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp.concat([
			    {name:'asg_nomb', descr:'Asignatura',width:100, search: 'true'},
			    {name:'pfo_nomb', descr:'Profesor',width:250, search: 'true'},
			    {name:'mtr_peri', descr:'Periodo',width:70, search: 'true', visible: ( (w.cntInt) ? false : true ) },
			    {name:'mtr_turn', descr:'Turno',width:80, search: 'true', visible: ( (w.cntInt) ? false : true ) },
			    {name:'mtr_aula', descr:'Aula',width:70, search: 'true', visible: ( (w.cntInt) ? false : true ) },
			    {name:'evl_prop', descr:'Evaluacion',width:70, search: 'true'}
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
				archivo: w.archivo, 
				tipo:w.tipo, 
				suc_kysuc:( ( w.suc ) ? w.suc.id_sucu : gIdSuc ), 
				cntInt: w.cntInt,
				mtr_kyprg:(( w.prg )?w.prg.prg_kyprg:''),
				asg_kymtr:(( w.mtr )?w.mtr.mtr_kymtr:''), 
				filtro:((w.filtro)?w.filtro:'TODOS'), 
				orderColumn: 'asg_nomb', 
				orderType: 'desc'},
			itemdescr: asig.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar && w.cntInt ) ? (
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
					asig.btnAddClick(w);
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
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+USERDATA.app.pol_temp+'/CtrlAsignatura/ejecutar?is_json=true&comando=SUBIRARCHIVO&prf_kyusu='+$('[name=prf_kyusu]').val(), function(rpta){
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
				
//				w.$e.find('[name=tblPrograma]').css('width', $('#'+w.idGrid).width());

				$el.find('[name=btnRefreshGrid]').click(function(){
//					$('#'+w.idGrid).parent('table').data('grid_params').asg_pini = dash.brwDashgeneral.$e.find('[name="asg_pini"]').val();
//					$('#'+w.idGrid).parent('table').data('grid_params').asg_pfin = dash.brwDashgeneral.$e.find('[name="asg_pfin"]').val();					
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
						
						$row.append('<td>'+fila.asg_nomb+'</td>');
					    $row.append('<td>'+fila.pfo_nomb+' '+fila.pfo_apel+'</td>');
					    if(!w.cntInt)
					    {
							$row.append('<td>'+fila.mtr_peri+'</td>');
							$row.append('<td>'+fila.mtr_turn+'</td>');
							$row.append('<td>'+fila.mtr_aula+'</td>');
					    }
						$row.append('<td>'+fila.evl_prop+'</td>');
						
						$row.data('data',fila);
						
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	$el.css('z-index','1100');
							    	var $row = invokedOn.closest('tr');
							    	
							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	
							    	if(w.mtr){$el.find('#'+w.idMenCtx+'_deta').show();}
							    	else
							    	{
							    		$el.find('#'+w.idMenCtx+'_gevl').show();
							    		$el.find('#'+w.idMenCtx+'_gasi').show();
							    	}
							    	
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			asig.winPop({
							    				tipo: w.tipo,
							    				modo:'VISUALIZAR',
							    				size: 'short',
							    				ky: $row.data('data').asg_kyasg,
							    				mtr: {mtr_kymtr: $row.data('data').mtr_kymtr, mtr_peri: $row.data('data').mtr_peri, mtr_turn: $row.data('data').mtr_turn, mtr_aula: $row.data('data').mtr_aula},
							    				alu: w.alu,
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;
							    		case w.idMenCtx+"_gevl":
							    			evlu.winBrow({
							    				tipo:'EVLALU',
							    				prg: w.prg,
							    				pfo: {
							    					pfo_kyusu: $row.data('data').pfo_kyusu,
							    					pfo_nomb: $row.data('data').pfo_nomb,
							    					pfo_apel: $row.data('data').pfo_apel,
							    					pfo_ape2: $row.data('data').pfo_ape2
							    				},
							    				mtr: {
							    					mtr_kymtr: $row.data('data').mtr_kymtr,
							    					mtr_peri: $row.data('data').mtr_peri,
							    					mtr_turn: $row.data('data').mtr_turn,
							    					mtr_aula: $row.data('data').mtr_aula
							    				},
							    				asg: {
							    					asg_kyasg: $row.data('data').asg_kyasg,
							    					asg_kyevl: $row.data('data').evl_kyprp,
							    					asg_nomb: $row.data('data').asg_nomb
							    				},
							    				prp: {
							    					prp_kyprp: $row.data('data').evl_kyprp,
							    					prp_secc: $row.data('data').evl_secc,
							    					prp_prop: $row.data('data').evl_prop
							    				},
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
							    			});
							    			break;
							    		case w.idMenCtx+"_gasi":
							    			asit.winBrow({
							    				tipo:'MATRASIT',
							    				prg: w.prg,
							    				pfo: {
							    					pfo_kyusu: $row.data('data').pfo_kyusu,
							    					pfo_nomb: $row.data('data').pfo_nomb,
							    					pfo_apel: $row.data('data').pfo_apel,
							    					pfo_ape2: $row.data('data').pfo_ape2
							    				},
							    				mtr: {
							    					mtr_kysuc: $row.data('data').mtr_kysuc,
							    					mtr_peri: $row.data('data').mtr_peri,
							    					mtr_turn: $row.data('data').mtr_turn,
							    					mtr_aula: $row.data('data').mtr_aula
							    				},
							    				asg: {
							    					asg_kyasg: $row.data('data').asg_kyasg,
							    					asg_kyevl: $row.data('data').evl_kyprp,
							    					asg_nomb: $row.data('data').asg_nomb
							    				},
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