var brw_dash_gene = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:30}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect:((typeof w.multiSelect!="undefined")?w.multiSelect:false),
			search:((typeof w.search!="undefined")?w.search:false),
			refreshButton:((typeof w.refreshButton!="undefined")?w.refreshButton:true),
			autoWidth:((typeof w.autoWidth!="undefined")?w.autoWidth:true),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp.concat([
  		        {name: '', descr:'Cuenta',width:50, search: 'false'},
		        {name: '', descr:'Entid',width:50, search: 'false'},
		        {name: '', descr:'Clase',width:260, search: 'false'},
		        {name: '', descr:'Tot-Cls',width:100, search: 'false'},
		        {name: '', descr:'Tot-Ent',width:100, search: 'false'},
		        {name: '', descr:'Tot-Rub',width:100, search: 'false'}
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
			params: {archivo: w.archivo, listaNombre: dash.listaNombre, 
				ope_otip: w.ope.ope_otip, ope_pini: w.ope.ope_pini, ope_pfin: w.ope.ope_pfin,
				cco_kycco: w.cco.cco_kycco, ope_rubr: w.rub.rub_nomb, ope_clas: w.cls.cls_nomb,
				orderColumn: 'nva_nomb', orderType: 'asc'},
			itemdescr: dash.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+oper.pag.alias+'</button>',
					_toolBarHtml+='<button name="btnDownload'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>',
					_toolBarHtml+='<input name="inp_'+w.tipo.toLowerCase()+'xls" type="file" accept=".xlsx,.xls"/>',
					_toolBarHtml+='<input name="doc_'+w.tipo.toLowerCase()+'xls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>',
					_toolBarHtml+='<button name="btnLoad'+w.tipo.toLowerCase()+'Fxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					dash.btnAddClick(w);
				});
				$el.find('[name=btnRefreshGrid]').click(function(){
					$('#'+w.idGrid).parent('table').data('grid_params').ope_pini = dash.brwDashgeneral.$e.find('[name="ope_pini"]').val();
					$('#'+w.idGrid).parent('table').data('grid_params').ope_pfin = dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val();
					$('#'+w.idGrid).trigger('reloadGrid');
				});
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
	 				/** ********************************************
	 				 ** AGRUPAR DATA POR : RUBRO - ENTIDAD - CLASE *
	 				 ** ********************************************/
					for (var keyNva in rpta.items)
					{
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}
						
						$row.append($('<td>'+rpta.items[keyNva].nva_nomb+'</td>').attr('colspan',3));
						$row.append('<td></td>');
						$row.append('<td></td>');
						$row.append('<td align="right" style="color:'+genColor[rpta.items[keyNva].nva_otip.toLowerCase()]+'">'+Sisem.redondeoString(rpta.items[keyNva].nva_tota)+'</td>');
						
						/** ****************************************
						 ** INICIO : NIVEL 1  :    MENU CONTEXTUAL *
						 ** ****************************************/
						if( w.showMenCtx ){
							$row.data('data', {idx_cer: rpta.items[keyNva].nva_kyniv});
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
							    	var $row = invokedOn.closest('tr');
							    	
							    	$el.find('[id^='+w.idMenCtx+']').hide();
							    	$el.find('#'+w.idMenCtx+'_deta').show();
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			dash.listaValor = ['','',''];
							    			dash.listaValor[0] = $row.data('data').idx_cer;							    		
							    			brw_dash_gene.llenarGridOperacion(w, $row);
							    			break;
							    	}//switch($id){
						    	}//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({
						}//if( w.showMenCtx ){
						/** ****************************************
						 ** FIN : NIVEL 1  :    MENU CONTEXTUAL    *
						 ** ****************************************/
						$tbody.append($row);
						
						for (var keyNvb in rpta.items[keyNva].items)
						{
							var $row = $('<tr class="item" />');
							if(w.showMenCtx){$row.append('<td></td>');}
							
							$row.append('<td></td>');
							$row.append($('<td>'+rpta.items[keyNva].items[keyNvb].nvb_nomb+'</td>').attr('colspan',2));
							$row.append('<td></td>');
							$row.append('<td align="right" style="color:'+genColor[rpta.items[keyNva].items[keyNvb].nvb_otip.toLowerCase()]+'">'+Sisem.redondeoString(rpta.items[keyNva].items[keyNvb].nvb_tota)+'</td>');
							$row.append('<td></td>');

							/** ****************************************
							 ** INICIO : NIVEL 2   :   MENU CONTEXTUAL *
							 ** ****************************************/
							if( w.showMenCtx ){
								$row.data('data', {idx_cer: rpta.items[keyNva].nva_kyniv, idx_uno: rpta.items[keyNva].items[keyNvb].nvb_kyniv});
								$row.contextMenu({
									buttonHelper: true,
								    menuSelector: "#"+w.idMenCtx,
								    onShow:function($el, invokedOn){
								    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
								    	var $row = invokedOn.closest('tr');
								    	
								    	$el.find('[id^='+w.idMenCtx+']').hide();
								    	$el.find('#'+w.idMenCtx+'_deta').show();
								    },
								    menuSelected: function (invokedOn, selectedMenu) {
								    	var $id = selectedMenu.attr('id');
								    	var $row = invokedOn.closest('tr');
								    	switch($id){
								    		case w.idMenCtx+"_deta":
								    			dash.listaValor = ['','',''];
								    			dash.listaValor[0] = $row.data('data').idx_cer;
								    			dash.listaValor[1] = $row.data('data').idx_uno;
								    			brw_dash_gene.llenarGridOperacion(w, $row);
								    			break;
									    }//switch($id){
							    	}//menuSelected: function (invokedOn, selectedMenu) {
								});//$row.contextMenu({
							}//if( w.showMenCtx ){
							/** ****************************************
							 ** FIN : NIVEL 2   :   MENU CONTEXTUAL    *
							 ** ****************************************/
							$tbody.append($row);
							
							for (var keyNvc in rpta.items[keyNva].items[keyNvb].items)
							{
								var $row = $('<tr class="item" />');
								if(w.showMenCtx){$row.append('<td></td>');}
								
								$row.append('<td></td>');
								$row.append('<td></td>');
								$row.append('<td>'+rpta.items[keyNva].items[keyNvb].items[keyNvc].nvc_nomb+'</td>');
								$row.append('<td align="right" style="color:'+genColor[rpta.items[keyNva].items[keyNvb].items[keyNvc].nvc_otip.toLowerCase()]+'">'+Sisem.redondeoString(rpta.items[keyNva].items[keyNvb].items[keyNvc].nvc_tota)+'</td>');
								$row.append('<td></td>');
								$row.append('<td></td>');

								/** ****************************************
								 ** INICIO : NIVEL   3 :   MENU CONTEXTUAL *
								 ** ****************************************/
								if( w.showMenCtx ){
									$row.data('data', {idx_cer: rpta.items[keyNva].nva_kyniv, idx_uno: rpta.items[keyNva].items[keyNvb].nvb_kyniv, idx_dos: rpta.items[keyNva].items[keyNvb].items[keyNvc].nvc_kyniv});
									$row.contextMenu({
										buttonHelper: true,
									    menuSelector: "#"+w.idMenCtx,
									    onShow:function($el, invokedOn){
									    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
									    	var $row = invokedOn.closest('tr');
									    	
									    	$el.find('[id^='+w.idMenCtx+']').hide();
									    	$el.find('#'+w.idMenCtx+'_deta').show();
									    },
									    menuSelected: function (invokedOn, selectedMenu) {
									    	var $id = selectedMenu.attr('id');
									    	var $row = invokedOn.closest('tr');
									    	switch($id){
								    		case w.idMenCtx+"_deta":
								    			dash.listaValor = ['','',''];
								    			dash.listaValor[0] = $row.data('data').idx_cer;
								    			dash.listaValor[1] = $row.data('data').idx_uno;
								    			dash.listaValor[2] = $row.data('data').idx_dos;
								    			brw_dash_gene.llenarGridOperacion(w, $row);
								    			break;							    	
										    }//switch($id){
								    	}//menuSelected: function (invokedOn, selectedMenu) {
									});//$row.contextMenu({
								}//if( w.showMenCtx ){
								/** ****************************************
								 ** FIN : NIVEL 3  :    MENU CONTEXTUAL    *
								 ** ****************************************/
								
								$tbody.append($row);
							}
						}
					}
					/*
					 * RESUMEN DE TOTALES
					 */
//					var $row = $('<tr class="item" />');
//					$row.append('<td style="color:blue;">Totales</td>');
//					$row.append('<td></td>');
//					
//					$tbody.append($row);
				}//if(rpta.items!=null){
				else
				{
					llenarGridOperacion(w, '');
				}
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	},//ejecutar: function(w)
	llenarGridOperacion: function(w, row)
	{
		var cco_kycco = null;
		var rub_nomb = null;
		var cls_nomb = null;
		for (var key in dash.listaOrden)
		{
			console.log('dash.listaValor['+key+'] = '+dash.listaValor[key]);
			if(dash.listaOrden[key]=='cco_kycco' && dash.listaValor[key]!=''){cco_kycco = dash.listaValor[key];}
			if(dash.listaOrden[key]=='rub_nomb' && dash.listaValor[key]!=''){rub_nomb = dash.listaValor[key];}
			if(dash.listaOrden[key]=='cls_nomb' && dash.listaValor[key]!=''){cls_nomb = dash.listaValor[key];}

		}
		console.log(dash.listaOrden);
		console.log(dash.listaValor);
		console.log(cco_kycco);
		console.log(rub_nomb);
		console.log(cls_nomb);
		oper.winInt({
			cntInt: 'gridDashOperacion',
			apc: USERDATA.apc,
			caj: USERDATA.suc,
			tra: USERDATA.tra,
			cco_kycco: ((typeof cco_kycco ==="undefined")?'':cco_kycco),
			ope_rubr: ((typeof rub_nomb ==="undefined")?'':rub_nomb),
			ope_clas: ((typeof cls_nomb ==="undefined")?'':cls_nomb),
			ope: {
				ope_pini: dash.brwDashgeneral.$e.find('[name="ope_pini"]').val(),
				ope_pfin: ( (dash.tipPagAct!='DANT') ? dash.brwDashgeneral.$e.find('[name="ope_pfin"]').val() : '' ),
				ope_esta: '0001'
			},
			tipo: 'OPERACI',
			ctrl: w.ctrl,
			size: 'short',
			callback:function(data){
				//console.log('abriendo oper.interior ' + data);
			}
		});
	}//llenarGridOperacion: function(row)
};//var brw_dash_gene = {