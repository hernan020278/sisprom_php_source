var brw_apci = {
	ejecutar: function(w)
	{
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			autoWidth: ((w.autoWidth)?w.autoWidth:false),
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: [
		        {descr:'ACC',width:30},
				{name:'apc_fini', descr:'FECHA',width:50, search:'false'},
				{name:'suc_nomb', descr:'FUENTE',width:100, search:'false'},
				{name:'usu_nomb', descr:'TRABAJADOR',width:250, search:'false'},
				{name:'ope_mmon', descr:'MONEDA',width:30, search:'false'},
				{name:'ope_aper', descr:'APERTURA',width:70, search:'false'},
				{name:'ope_sald', descr:'SALDO',width:70, search:'false'},
			    {name:'ope_cier', descr:'CIERRE',width:70, search:'false'}
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
			params: {archivo: w.archivo, suc_tipo:w.tipo, usu_kyusu: ((w.tra && w.usu.usu_kyusu)?w.usu.usu_kyusu:0), orderColumn: 'apc_fini', orderType: 'desc'},
			itemdescr: apci.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? '<div class="form-inline"><button name="btnAdd'+w.tipo+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+apci.pag.alias+'</button>'+
			'<button name="btnDownloadOperFxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>'+
			'<input name="inp_operxls" type="file" accept=".xlsx,.xls"/>'+
			'<input name="ope_operxls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>'+
			'<button name="btnLoadOperFxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>'+
//				'<input name="inp_detrxls" type="file" accept=".xlsx,.xls"/>'+
//				'<input name="ope_detrxls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>'+
//				'<button name="btnLoadDetrFxls" class="btn btn-primary"><i class="fa fa-upload"></i>Detraciones</button>'+
			'<input name="inp_concxls" type="file" accept=".xlsx,.xls"/>'+
			'<input name="ope_concxls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>'+
			'<button name="btnDownloadConcXls" class="btn btn-warning"><i class="fa fa-download"></i>Pagos</button>'+
			'<button name="btnLoadConcXls" class="btn btn-success"><i class="fa fa-upload"></i>Pagos</button>'+
			'</div>' : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo+']').click(function(){
					apci.btnAddClick(w);
				});
				$('[name=btnDownloadOperFxls]').on('click',function(){
					window.open(base_url+'app/com/erp/formatos/ope_formato.xlsx');
				});
				$('[name=btnLoadOperFxls]').on('click',function (){
					$('[name=inp_operxls]').trigger('click');
				});	
				$('[name=inp_operxls]').change(function(event){
					var texto = $el.find('[name=inp_operxls]').val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $el.find('[name=inp_operxls]')[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//						var fileNameNew='ope_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=ope_operxls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'oper/uploadOperFxls', function(rpta){
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						if(rpta.msg.type=='success' || rpta.msg.type=='warning')
						{
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						}
					});
				});

				$('[name=btnLoadDetrFxls]').on('click',function (){
					$('[name=inp_detrxls]').trigger('click');
				});	
				$('[name=inp_detrxls]').change(function(event){
					var texto = $el.find('[name=inp_detrxls]').val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $el.find('[name=inp_detrxls]')[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//						var fileNameNew='ope_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=ope_detrxls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'oper/uploadDetrFxls', function(rpta){
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						if(rpta.msg.type=='success' || rpta.msg.type=='warning')
						{
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						}
					});
				});
				$('[name=btnDownloadConcXls]').on('click',function(){
					window.open(base_url+'app/com/erp/formatos/conc_formato.xls');
				});
				$('[name=btnLoadConcXls]').on('click',function (){
					$('[name=inp_concxls]').trigger('click');
				});	
				$('[name=inp_concxls]').change(function(event){
					var texto = $el.find('[name=inp_concxls]').val(); 
					if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
					var file = $el.find('[name=inp_concxls]')[0].files[0];
					var fileName = file.name;
					var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
					var fileSize = file.size;
					var fileType = file.type;
//						var fileNameNew='ope_'+(new Date()).getTime()+'.'+fileExtension;
					w.$e.find('[name=ope_concxls]').val(fileName);
					archivos = [file];
					Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'oper/uploadConcFxls', function(rpta){
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						if(rpta.msg.type=='success' || rpta.msg.type=='warning')
						{
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							if(rpta.lisRes.length>0)
							{
								Sisem.printExcel({modulo: 'report', reportName: 'rep_resp', reportTitle :'Lista de Registros erroneos', optFormat:'XLS', rpta: rpta});
							}
						}
					});
				});
				
				Sisem.activar(w.$e.find('[name=ope_operxls]'), false);
				Sisem.activar(w.$e.find('[name=ope_detrxls]'), false);
				Sisem.activar(w.$e.find('[name=ope_concxls]'), false);
				w.$e.find('[name=inp_operxls]').css('display','none');								
				w.$e.find('[name=inp_detrxls]').css('display','none');
				w.$e.find('[name=inp_concxls]').css('display','none');			
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
						for (var key in rpta.items)
						{
							var $row = $('<tr class="item" />');
							if(w.showMenCtx){$row.append('<td></td>');}
							$row.append('<td>'+rpta.items[key].apc_fini+'</td>');
							$row.append('<td>'+rpta.items[key].suc_nomb+'</td>');
							$row.append('<td>'+rpta.items[key].usu_nomb+'</td>');
							$row.append('<td>'+rpta.items[key].ope_mmon+'</td>');				
							$row.append('<td>'+Sisem.redondeoString(rpta.items[key].ope_aper)+'</td>');
							$row.append('<td>'+Sisem.redondeoString(rpta.items[key].ope_sald)+'</td>');				
							$row.append('<td>'+Sisem.redondeoString(rpta.items[key].ope_cier)+'</td>');
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
								    	$el.find('#'+w.idMenCtx+'_abri').hide();
								    	$el.find('#'+w.idMenCtx+'_ingr').hide();
								    	$el.find('#'+w.idMenCtx+'_edit').hide();
								    	$el.find('#'+w.idMenCtx+'_vpad').hide();
								    	$el.find('#'+w.idMenCtx+'_anul').hide();
								    	$el.find('#'+w.idMenCtx+'_dele').hide();
								    	
								    	if(rpta.items[key].ope_cier==0){
								    		$el.find('#'+w.idMenCtx+'_abri').hide();
								    		$el.find('#'+w.idMenCtx+'_ingr').show();
								    		$el.find('#'+w.idMenCtx+'_cerr').show();				    		
								    	}else{
								    		$el.find('#'+w.idMenCtx+'_abri').show();
								    		$el.find('#'+w.idMenCtx+'_ingr').hide();
								    		$el.find('#'+w.idMenCtx+'_cerr').hide();				    		
								    	}
								    },
								    menuSelected: function (invokedOn, selectedMenu) {
								    	var $id = selectedMenu.attr('id');
								    	var $row = invokedOn.closest('tr');
								    	switch($id){
								    	case w.idMenCtx+"_ingr":
								    		oper.init({
								    			apc:{
									    			apc_kyapc:$row.data('data').apc_kyapc,
									    			apc_fini:$row.data('data').apc_fini,
								    			},
								    			caj:{
									    			suc_kysuc:$row.data('data').apc_kysuc,
									    			suc_nomb:$row.data('data').suc_nomb,
								    			},
								    			tra:{
								    				usu_kyusu:$row.data('data').apc_kyusu,
								    				usu_nomb:$row.data('data').usu_nomb
								    			},
								    			tipo: 'OPERACI'
								    		});
							    			break;				    	
								    	case w.idMenCtx+"_cerr":
							    			apci.winPop({
							    				ky: $row.data('data').apc_kyapc,
							    				tipo: w.tipo,
												modo:'MODIFICAR',
												callback:function(){
													if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
												}
							    			});									
						    				break;				    	
							    		case w.idMenCtx+"_abri":
							    			$.SmartMessageBox({
												title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Desea abrir la caja <span class='txt-color-orangeDark'><strong>" + $row.data('data').ncta+ "</strong></span>",
												content : "Desea abrir la caja?",
												buttons : '[No][Si]'

											}, function(ButtonPressed) {
												if (ButtonPressed == "Si") {
													$.post(base_url+'apci/deleteByTipo',{apc_kyapc:$row.data('data').apc_kyapc, otip: 'CIERRE'},function(rpta){
														Sisem.msgBox(rpta.msg.type, rpta.msg.text);
														if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
//														apci.init();
													},'json');
												}
											});
							    			break;
							    		case w.idMenCtx+"_prin":
//						    				var url = base_url+'docu/print_documento?id_sucu='+$row.data('data').id_sucu+'&tdoc='+$row.data('data').tdoc+'&id='+$row.data('data').id_docu;
//							    			Sisem.windowPrint({id:'printVent',title:'Imprimir',urlIframe:url});
							    			rsta.winPop({
							    				modo: 'AGREGAR',
							    				tipo: 'REPVENCOB'
							    			});
							    			break;				    						    			
								    	}//switch($id){
								    }//menuSelected: function (invokedOn, selectedMenu) {
								});//$row.contextMenu({
							}//if( w.showMenCtx ){
							$tbody.append($row);
						}//for (var key in rpta.items[key].items)
				}//if(rpta.items[key].items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_apci = {