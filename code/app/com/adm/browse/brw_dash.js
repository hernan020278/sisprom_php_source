var brw_dash = {
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
				{name: '', descr:'Descripcion',width:250, search: 'false'},
				{name: '', descr:'Ingresos',width:450, search: 'false'},
				{name: '', descr:'Egreso',width:450, search: 'false'},
				{name: '', descr:'Saldo',width:450, search: 'false'}
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
				
				w.$e.find('[name=ope_pini]').datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});								
				w.$e.find('[name=ope_pfin]').datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});												
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, listaOrden: dash.listaOrden, bal_nact:-1, bal_kybal: w.bal_kybal, bal_dire: 'ADELANTE', 
				bal_niv0: dash.brwDashgeneral.$e.find('[name=bal_niv0]').val(),
				bal_niv1: dash.brwDashgeneral.$e.find('[name=bal_niv1]').val(),
				bal_niv2: dash.brwDashgeneral.$e.find('[name=bal_niv2]').val(),
				ope_pini: dash.brwDashgeneral.$e.find('[name=ope_pini]').val(), 
				ope_pfin: dash.brwDashgeneral.$e.find('[name=ope_pfin]').val(), 
				ope_tope:w.tipo, orderColumn: 'bal_prop', orderType: 'asc'},
			itemdescr: dash.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline" style="margin-top: 10px; margin-bottom: 10px;">',
					_toolBarHtml+='<div class="form-group">',
						_toolBarHtml+='&nbsp;<input type="text" name="ope_pini" autocomplete="off" class="form-control input-sm" style="margin: -7px 0px;" placeholder="yyyy-mm-dd" title="ope" tabindex="1"/>',
						_toolBarHtml+='&nbsp;<input type="text" name="ope_pfin" autocomplete="off" class="form-control input-sm" style="margin: -7px 0px;" placeholder="yyyy-mm-dd" title="ope" tabindex="1"/>',
						_toolBarHtml +='&nbsp;<select name="bal_niv0" class="form-control" title="ope" style="margin: -7px 0px;" placeholder="Entidad" tabindex="14"></select>',
						_toolBarHtml +='&nbsp;<select name="bal_niv1" class="form-control" title="ope" style="margin: -7px 0px;" placeholder="Cuenta" tabindex="14"></select>',
						_toolBarHtml +='&nbsp;<select name="bal_niv2" class="form-control" title="ope" style="margin: -7px 0px;" placeholder="Clase" tabindex="14"></select>',
					_toolBarHtml+='</div>',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					dash.btnAddClick(w);
				});
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var totaAnte = 0.00;
					var totaIngr = 0.00;
					var totaCost = 0.00;
					var totaGast = 0.00;
					var totaUtil = 0.00;
					var prp_prop = '';
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}

						var bal_util = 0;
						var bal_cost = 0;
						if (dash.listaOrden[0] == 'cco_kycco'){
							bal_util = parseFloat(fila.bal_ingr)-parseFloat(fila.bal_gast);
							bal_rest = fila.bal_cost - fila.bal_gast;
							bal_cost = '<span style="color:'+genColor['ROJO']+'">(-'+Sisem.redondeoString(bal_rest)+')&nbsp;</span>' + '<span style="color:'+genColor['AZUL']+'">'+Sisem.redondeoString(fila.bal_cost)+'</span>';
						} else{
							bal_util = parseFloat(fila.bal_ingr)+parseFloat(fila.bal_gast)-parseFloat(fila.bal_cost);
							bal_cost = '<span style="color:'+genColor['AZUL']+'">'+Sisem.redondeoString(fila.bal_cost)+'</span>';
						}

						$row.append('<td>'+fila.bal_prop+'</td>');
						
						$row.append('<td align="right" style="color:'+genColor['VERDE']+'">'+Sisem.redondeoString(fila.bal_ingr)+'</td>');
						$row.append('<td align="right" style="color:'+genColor['CAFE']+'">'+Sisem.redondeoString(fila.bal_gast)+'</td>');
						$row.append('<td align="right" style="color:'+((bal_util<0)?genColor['ROJO']:genColor['VERDE'])+'">'+Sisem.redondeoString(bal_util)+'</td>');
						
						prp_prop = fila.prp_prop;
						/*******************
						 * Suma de totales
						 *******************/
						totaAnte += parseFloat(fila.bal_ante);
						totaIngr += parseFloat(fila.bal_ingr);
						totaCost += parseFloat(fila.bal_cost);
						totaGast += parseFloat(fila.bal_gast);
						totaUtil += parseFloat(bal_util);
						
						$row.data('data',fila).dblclick(function(){
							if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal-dialog').find('.modal-footer button:eq(0)').click();}
							else{w.$e.dialog('widget').find('.ui-dialog-buttonpane button:eq(0)').click();}
						});
						$row.click(function(){
							dash.listaValor[$(this).data('data').bal_nact] = $(this).data('data').bal_kybal;

							var cco_kycco = null;
							var rub_nomb = null;
							var cls_nomb = null;

							dash.listaValor[$(this).data('data').bal_nact] = $(this).data('data').bal_kybal;
							for (var key in dash.listaOrden)
							{
								if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco_kycco = dash.listaValor[key];}
								if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub_nomb = dash.listaValor[key];}
								if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls_nomb = dash.listaValor[key];}
							}
							console.log(dash.listaOrden);
							console.log(dash.listaValor);
							oper.opeRango = 1;
							oper.winInt({
								politicaSeguridad: 'VEROPERACIONES',
								cntInt: 'gridDashOperacion',
								apc: USERDATA.apc,
								caj: USERDATA.suc,
								usu: USERDATA.usu,
								cco_kycco: ((typeof cco_kycco ==="undefined")?'':cco_kycco),
								ope_rubr: ((typeof rub_nomb ==="undefined")?'':rub_nomb),
								ope_clas: ((typeof cls_nomb ==="undefined")?'':cls_nomb),
								ope: {
									ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
									ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val(),
									ope_esta: '0001'
								},
								tipo: 'OPERACI',
								ctrl: w.ctrl,
								size: 'short',
								callback:function(data){
									//console.log('abriendo oper.interior ' + data);
								}
							});

						});
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
							    	var $row = invokedOn.closest('tr');

							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	
									$el.find('#'+w.idMenCtx+'_deta').show();
									$el.find('#'+w.idMenCtx+'_pend').show();
									$el.find('#'+w.idMenCtx+'_dant').show();
									$el.find('#'+w.idMenCtx+'_vpad').show();
									$el.find('#'+w.idMenCtx+'_vhij').show();
									$el.find('#'+w.idMenCtx+'_prin').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
						    		case w.idMenCtx+"_vpad":
						    			
						    			if($row.data('data').bal_nact > 0)
						    			{
						    				dash.listaValor[$row.data('data').bal_nact] = '';						    				
						    				
							    			$('#'+w.idGrid).parent('table').data('grid_params').bal_dire = 'ATRAZ';
							    			$('#'+w.idGrid).parent('table').data('grid_params').bal_nact = $row.data('data').bal_nact;
							    			
							    			for(var ite=0; ite<dash.listaNombre.length; ite++)
							    			{
							    				if(ite<$row.data('data').bal_nact-1)
							    				{
							    					objKy = eval('({'+dash.listaOrden[ite]+':'+dash.listaValor[ite]+'})');
							    				}
							    				else
							    				{
							    					objKy = eval('({'+dash.listaOrden[ite]+':null})');
							    				}
						    					$.extend($('#'+w.idGrid).parent('table').data('grid_params'), objKy);
							    			}
					    					$('#'+w.idGrid).trigger('reloadGrid');
						    			}//if($row.data('data').bal_nact > 0)
						    			break;
						    		case w.idMenCtx+"_vhij":
						    			if($row.data('data').bal_nact < (dash.listaNombre.length-1))
						    			{
						    				dash.listaValor[$row.data('data').bal_nact] = $row.data('data').bal_kybal;
						    				
						    				$('#'+w.idGrid).parent('table').data('grid_params').bal_dire = 'ADELANTE';
							    			$('#'+w.idGrid).parent('table').data('grid_params').bal_nact = $row.data('data').bal_nact;

							    			for(var ite=0; ite<dash.listaNombre.length; ite++)
							    			{
							    				if(ite<=$row.data('data').bal_nact)
							    				{
							    					objKy = eval('({'+dash.listaOrden[ite]+':'+dash.listaValor[ite]+'})');
							    				}
							    				else
							    				{
							    					objKy = eval('({'+dash.listaOrden[ite]+':null})');
							    				}
						    					$.extend($('#'+w.idGrid).parent('table').data('grid_params'), objKy);
							    			}
					    					$('#'+w.idGrid).trigger('reloadGrid');
						    			}				    					
						    			break;
						    		case w.idMenCtx+"_deta":
						    			var cco_kycco = null;
						    			var rub_nomb = null;
						    			var cls_nomb = null;

											dash.listaValor[$row.data('data').bal_nact] = $row.data('data').bal_kybal;
											for (var key in dash.listaOrden)
											{
												if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco_kycco = dash.listaValor[key];}
												if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub_nomb = dash.listaValor[key];}
												if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls_nomb = dash.listaValor[key];}
											}
											console.log(dash.listaOrden);
											console.log(dash.listaValor);
											oper.opeRango = 1;
											oper.winInt({
												politicaSeguridad: 'VEROPERACIONES',
												cntInt: 'gridDashOperacion',
												apc: USERDATA.apc,
												caj: USERDATA.suc,
												usu: USERDATA.usu,
												cco_kycco: ((typeof cco_kycco ==="undefined")?'':cco_kycco),
												ope_rubr: ((typeof rub_nomb ==="undefined")?'':rub_nomb),
												ope_clas: ((typeof cls_nomb ==="undefined")?'':cls_nomb),
												ope: {
													ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
													ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val(),
													ope_esta: '0001'
												},
												tipo: 'OPERACI',
												ctrl: w.ctrl,
												size: 'short',
												callback:function(data){
													//console.log('abriendo oper.interior ' + data);
												}
											});
						    			break;
						    		case w.idMenCtx+"_dant":
						    			var cco_kycco = null;
						    			var rub_nomb = null;
						    			var cls_nomb = null;
						    			
											dash.listaValor[$row.data('data').bal_nact] = $row.data('data').bal_kybal;
											for (var key in dash.listaOrden)
											{
												if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco_kycco = dash.listaValor[key];}
												if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub_nomb = dash.listaValor[key];}
												if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls_nomb = dash.listaValor[key];}
											}
											oper.opeRango = 0;
											oper.winInt({
												politicaSeguridad: 'VEROPERACIONES',
												cntInt: 'gridDashOperacion',
												apc: USERDATA.apc,
												caj: USERDATA.suc,
												tra: USERDATA.tra,
												cco_kycco: ((typeof cco_kycco ==="undefined")?'':cco_kycco),
												ope_rubr: ((typeof rub_nomb ==="undefined")?'':rub_nomb),
												ope_clas: ((typeof cls_nomb ==="undefined")?'':cls_nomb),
												ope: {
													ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
													ope_esta: '0001'
												},
												tipo: 'OPERACIONAL',
												ctrl: w.ctrl,
												size: 'short',
												callback:function(data){
													//console.log('abriendo oper.interior ' + data);
												}
											});
						    			break;
						    		case w.idMenCtx+"_pend":
						    			var cco_kycco = null;
						    			var rub_nomb = null;
						    			var cls_nomb = null;
						    			
										dash.listaValor[$row.data('data').bal_nact] = $row.data('data').bal_kybal;
										for (var key in dash.listaOrden)
										{
											if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco_kycco = dash.listaValor[key];}
											if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub_nomb = dash.listaValor[key];}
											if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls_nomb = dash.listaValor[key];}
										}
										oper.winInt({
											cntInt: 'gridDashOperacion',
											apc: USERDATA.apc,
											caj: USERDATA.suc,
											tra: USERDATA.tra,
											cco_kycco: ((typeof cco_kycco ==="undefined")?'':cco_kycco),
											ope_rubr: ((typeof rub_nomb ==="undefined")?'':rub_nomb),
											ope_clas: ((typeof cls_nomb ==="undefined")?'':cls_nomb),
											ope: {
												ope_esta: '0002'
											},
											tipo: 'OPERACI',
											ctrl: w.ctrl,
											size: 'short',
											callback:function(data){
												//console.log('abriendo oper.interior ' + data);
											}
										});
						    			break;
						    		case w.idMenCtx+"_prin":
						    			
										if(typeof dash.brwDashgeneral.$e.find('[name=bal_niv0] option:selected').html()!='undefined'
											&& typeof dash.brwDashgeneral.$e.find('[name=bal_niv1] option:selected').html()!='undefined'
											&& typeof dash.brwDashgeneral.$e.find('[name=bal_niv1] option:selected').html()!='undefined')
										{
							    			var cco_kycco = null;
							    			var rub_nomb = null;
							    			var cls_nomb = null;

							    			dash.listaOrden[0] = dash.brwDashgeneral.$e.find('[name=bal_niv0]').val();
											dash.listaOrden[1] = dash.brwDashgeneral.$e.find('[name=bal_niv1]').val();
							    			
											dash.listaValor[$row.data('data').bal_nact] = $row.data('data').bal_kybal;
											for (var key in dash.listaOrden)
											{
												if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco_kycco = dash.listaValor[key];}
												if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub_nomb = dash.listaValor[key];}
												if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls_nomb = dash.listaValor[key];}
											}
										
											var data = {
												comando: 'IMPRIMIRESTADOCUENTA',
												apc: USERDATA.apc,
												caj: USERDATA.suc,
												tra: USERDATA.tra,
												cco_kycco: ((typeof cco_kycco ==="undefined")?'':cco_kycco),
												ope_rubr: ((typeof rub_nomb ==="undefined")?'':rub_nomb),
												ope_clas: ((typeof cls_nomb ==="undefined")?'':cls_nomb),
												bal_niv0: w.$e.find('[name=bal_niv0]').val(),
												bal_niv1: w.$e.find('[name=bal_niv1]').val(),
												ope_pini: w.$e.find('[name=ope_pini]').val(),
												ope_pfin: w.$e.find('[name=ope_pfin]').val(),
												listaOrden: dash.listaOrden
											}
					    			
							    			Sisem.printPdf('CtrlOperacion', data, function(rpta){});
							    			break;				    			
											
										}
										else
										{
											alert('falta seleccionar datos del combo');
										}
						    			
						    			
							    	}//switch($id){
							    }//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({								
						}//if( w.showMenCtx ){
						$tbody.append($row);
					}//for (var key in rpta.items)
					/*
					 * RESUMEN DE TOTALES
					 */
					var $row = $('<tr class="item" />');
					$row.click(function(){
						dash.listaValor = ['','',''];
					});
					$row.append('<td></td>');
					$row.append('<td style="color:blue;">Totales</td>');
					
					$row.append('<td align="right" style="color:'+genColor['VERDE']+'">'+Sisem.redondeoString(totaIngr)+'</td>');
					$row.append('<td align="right" style="color:'+genColor['CAFE']+'">'+Sisem.redondeoString(totaGast)+'</td>');
					$row.append('<td align="right" style="color:'+((totaUtil<0)?genColor['ROJO']:genColor['VERDE'])+'">'+Sisem.redondeoString(totaUtil)+'</td>');
					
					if( w.showMenCtx ){
						$row.contextMenu({
							buttonHelper: true,
						    menuSelector: "#"+w.idMenCtx,
						    onShow:function($el, invokedOn){
						    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
						    	var $row = invokedOn.closest('tr');

						    	$el.find('[id^='+w.idMenCtx+']').hide();
						    	
								$el.find('#'+w.idMenCtx+'_deta').show();
								$el.find('#'+w.idMenCtx+'_pend').show();
								$el.find('#'+w.idMenCtx+'_dant').show();
								$el.find('#'+w.idMenCtx+'_vpad').show();
								$el.find('#'+w.idMenCtx+'_vhij').show();
						    },
						    menuSelected: function (invokedOn, selectedMenu) {
						    	var $id = selectedMenu.attr('id');
						    	var $row = invokedOn.closest('tr');
						    	switch($id)
						    	{
						    		case w.idMenCtx+"_deta":
										for (var key in dash.listaOrden)
										{
											if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco = {cco_kycco : dash.listaValor[key]};}
											if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub = {rub_nomb : dash.listaValor[key]};}
											if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls = {cls_nomb : dash.listaValor[key]};}
										}
										oper.winInt({
											cntInt: 'gridDashOperacion',
											apc: USERDATA.apc,
											caj: USERDATA.suc,
											tra: USERDATA.tra,
											cco: ((typeof cco ==="undefined")?cco = {cco_kycco : ''}:cco),
											rub: ((typeof rub ==="undefined")?rub = {rub_nomb : ''}:rub),
											cls: ((typeof cls ==="undefined")?cls = {cls_nomb : ''}:cls),
											ope: {
												ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
												ope_pfin: dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val(),
												ope_esta: '0001'
											},
											tipo: 'OPERACI',
											ctrl: w.ctrl,
											size: 'short',
											callback:function(data){
												//console.log('abriendo oper.interior ' + data);
											}
										});
						    		break;
						    	}//switch($id){
						    }//menuSelected: function (invokedOn, selectedMenu) {
						});//$row.contextMenu({								
					}//if( w.showMenCtx ){
					
					w.$e.find('[name=spnTotaAnte]').html(prp_prop+' '+Sisem.redondeoString(totaAnte));
					w.$e.find('[name=spntotaGast]').html(prp_prop+' '+Sisem.redondeoString(totaGast));
					w.$e.find('[name=spnTotaIngr]').html(prp_prop+' '+Sisem.redondeoString(totaIngr));
					w.$e.find('[name=spnTotaUtil]').html(prp_prop+' '+Sisem.redondeoString(totaUtil));
					
					var arrTota = [totaAnte,totaGast,totaIngr,totaCost,totaUtil];
					var impMayor = 0.00;
					for(ite = 0; ite < arrTota.length; ite++){if(arrTota[ite] > impMayor){impMayor = arrTota[ite];}}
					
					impMayor = impMayor + 100;
					
					prcAnte = parseInt( ( totaAnte * 100 ) / impMayor );
					prcAnte = parseInt( ( totaGast * 100 ) / impMayor );
					prcAnte = parseInt( ( totaIngr * 100 ) / impMayor );
					prcAnte = parseInt( ( totaCost * 100 ) / impMayor );
					prcAnte = parseInt( ( totaUtil * 100 ) / impMayor );
					
					w.$e.find('[name=prgTotaAnte]').css('width',parseInt( ( totaAnte * 100 ) / impMayor )+'%');
					w.$e.find('[name=prgtotaGast]').css('width',parseInt( ( totaGast * 100 ) / impMayor )+'%');
					w.$e.find('[name=prgTotaIngr]').css('width',parseInt( ( totaIngr * 100 ) / impMayor )+'%');
					w.$e.find('[name=prgTotaUtil]').css('width',parseInt( ( totaUtil * 100 ) / impMayor )+'%');
					
					$tbody.append($row);
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_dash = {
