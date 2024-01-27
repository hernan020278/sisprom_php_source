var ctg_acrd = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:30}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			autoWidth: ((w.autoWidth)?w.autoWidth:false),
			tableWidth: ((w.tableWidth)?w.tableWidth:'auto'),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: 
			( ( w.showMenCtx ) ?
				[
					{descr:'',width:10},
					{descr:'',width:15},
				    {descr:'',width:50},
					{descr:'',width:50}
				]
			:
				[
				 	{descr:'',width:50},
				    {descr:'',width:50},
				 	{descr:'',width:50},
				 	{descr:'',width:50}
				]
			),
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
			params: {archivo: w.archivo, acr_nota: 'Todos'/*, acr_tono: 'Todos', acr_vers: 1*/, ltr_dscr: ( ( w.ltr ) ? w.ltr.ltr_dscr : '' )},
			itemdescr: acrd.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline">',
					_toolBarHtml+='<button name="btnAdd'+w.tipo+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+acrd.pag.alias+'</button>',
					_toolBarHtml+='<select name="selNota" class="form-control"></select>',
//					_toolBarHtml+='<select name="selTono" class="form-control"></select>',
//					_toolBarHtml+='<select name="selVers" class="form-control"></select>',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo+']').click(function(){
					acrd.btnAddClick(w);
				});
				w.$e.css('overflow','auto');
				
				$el.find('[name=selNota]').on('change', function(){
					if($('#'+w.idGrid).closest('.table-responsive').data('grid_params'))
					{
						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_nota=$('#'+w.idGrid).find('[name=selNota]').val();
						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_tono=$('#'+w.idGrid).find('[name=selTono]').val();
						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_vers=$('#'+w.idGrid).find('[name=selVers]').val();
						$('#'+w.idGrid).trigger('reloadGrid');
					}
				});
//				$el.find('[name=selTono]').on('change', function(){
//					if($('#'+w.idGrid).closest('.table-responsive').data('grid_params'))
//					{
//						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_nota=$('#'+w.idGrid).find('[name=selNota]').val();
//						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_tono=$('#'+w.idGrid).find('[name=selTono]').val();
//						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_vers=$('#'+w.idGrid).find('[name=selVers]').val();
//						$('#'+w.idGrid).trigger('reloadGrid');
//					}
//				});
//				$el.find('[name=selVers]').on('change', function(){
//					if($('#'+w.idGrid).closest('.table-responsive').data('grid_params'))
//					{
//						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_nota=$('#'+w.idGrid).find('[name=selNota]').val();
//						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_tono=$('#'+w.idGrid).find('[name=selTono]').val();
//						$('#'+w.idGrid).closest('.table-responsive').data('grid_params').acr_vers=$('#'+w.idGrid).find('[name=selVers]').val();
//						$('#'+w.idGrid).trigger('reloadGrid');
//					}
//				});				
			},
			// inObject : 'grid',
//			fill: function(rpta,$row){
			load: function(rpta,$tbody,$cols){
				if(rpta.items!=null)
				{
					var idxCol=1;
					var $row = null;
					var numCol=4;
					if($('[name=selNota] option').size()==0)
					{
						$tbody.closest('table').find('[name=selNota]').empty();
						$tbody.closest('table').find('[name=selTono]').empty();
						if(!jQuery.isEmptyObject(rpta.listaNota))
						{
							$tbody.closest('table').find('[name=selNota]').append('<option value="Todos">Todos</option>');
							for (var keyNota in rpta.listaNota) 
							{
								var dataNota = rpta.listaNota[keyNota];
								$tbody.closest('table').find('[name=selNota]').append('<option value="'+dataNota.acr_nota+'">'+dataNota.acr_nota+'</option>');
							}
							$tbody.closest('table').find('[name=selTono]').append('<option value="Todos">Todos</option>');
							for (var keyTono in rpta.listaTono)
							{
								var dataTono = rpta.listaTono[keyTono];
								$tbody.closest('table').find('[name=selTono]').append('<option value="'+dataTono.acr_tono+'">'+dataTono.acr_tono+'</option>');
							}
							$tbody.closest('table').find('[name=selVers]').append('<option value="Todos">Todos</option>');
							for (var keyVers in rpta.listaVers)
							{
								var dataVers = rpta.listaVers[keyVers];
								$tbody.closest('table').find('[name=selVers]').append('<option value="'+dataVers.acr_vers+'">'+dataVers.acr_vers+'</option>');
							}
							$tbody.closest('table').find('[name=selVers]').val('1');
						}
						llenarComboNota=true;
					}//if(!ctg_acrd.llenarComboNota)
					for(var ite=0;ite<rpta.items.length;ite++)
					{
						var fila = rpta.items[ite];
						if(idxCol==1){$row=$('<tr>');}
						if(idxCol<=numCol)
						{
							_divPanel="";
//							_divPanel+='<div class="panel panel-'+(((idxCol%2)==0)?'blue':'greenLight')+'">';
							_divPanel+='<div class="panel" style="margin-bottom: 5px;">';
//								_divPanel+='<div class="panel-heading text-align-center">';
//									_divPanel+='<h3 name="a_name" class="panel-title">'+fila.nomb+'</h3>';
//								_divPanel+='</div>';
								_divPanel+='<div class="panel-body no-padding text-align-center">';
//									_divPanel+='<a name="acr_nomb_'+fila.acr_kyacrd+'" href="javascript:void(0);"><img src="'+base_url+'app/com/mus/images/'+((fila.acr_foto!='') ? fila.acr_foto+'?'+(new Date()).getTime() : 'charango.png')+'"/></a>';
									_divPanel+='<div name="divCtgAcorde" id="divCtgAcorde">';
										
									_divPanel+='</div>';
									_divPanel+='<div>';
										_divPanel+='<p style="margin: 0px;">'+fila.acr_nomb+' : '+fila.acr_dscr+'</p>';
									_divPanel+='</div>';
						            _divPanel+='<div>';
					                	_divPanel+='<button name="btnEditar_'+fila.acr_kyacrd+'" class="btn btn-primary">Editar</button>';
					                	_divPanel+='<button name="btnEliminar_'+fila.acr_kyacrd+'" class="btn btn-primary">Eliminar</button>';
					                _divPanel+='</div>';
								_divPanel+='</div>';
							_divPanel+='</div>';
							
							$col=$('<td>'+_divPanel+'</td>').data('data',fila);
							
							var lienzo = document.createElement('canvas');
							lienzo.setAttribute('name', 'cnvCtgAcorde_'+fila.acr_kyacr);
							$col.find('[name=divCtgAcorde]').append(lienzo);
							
							var acorde = new Acorde(lienzo);
							acorde.ubicarPuntosAcorde(fila.acr_capo, fila.acr_tras, fila.acr_trsx, fila.acr_trsa, fila.acr_trsb, fila.acr_trsc, fila.acr_trsd, fila.acr_trse);

							$col.find('[name=cnvCtgAcorde_'+fila.acr_kyacr+']').click(function(event){
								var $varCol=$(this).closest('td');
								acrd.cerrarFormulario($.extend(w, {data: $varCol.data('data')}));
							});

//							lienzo.addEventListener('click', function(event){
//								var $col=$(this).closest('td');
//								acrd.cerrarFormulario($.extend(w, {data: $col.data('data')}));
//							});
//							
							$col.find('[name=acr_nomb_'+fila.acr_kyacrd+']').click(function(event){
								var $col=$(this).closest('td');
								acrd.cerrarFormulario($.extend(w, {data: $col.data('data')}));
							});
							
							$col.find('[name=btnEditar_'+fila.acr_kyacrd+']').click(function(event){
								var $col=$(this).closest('td');
				    			acrd.winPop({
				    				tipo: 'ACRD',
				    				ky  : $col.data('data').acr_kyacr,
									modo: 'MODIFICAR',
									callback:function(){
										if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
									}
				    			});
							});

							$row.append($col);

							var agregar=false;
							if( ( idxCol<numCol && (ite+1)==rpta.items.length )
							||  ( idxCol==numCol && (ite+1)==rpta.items.length ) 
							||  ( idxCol==numCol && (ite+1)<rpta.items.length ) )
							{
								agregar=true;
							}
							if(agregar)
							{
								$row.children('td').each(function(idx,_this){
//									$('.cell-wrap').css("max-width", ( $cols[idx].width+"px" ) );
									$(this).addClass('cell-wrap')
								});
								$tbody.append($row);
								idxCol=1;
							}
							else
							{
								idxCol++;
							}
						}//if($col==3)
					}//for(var i=0;i<rpta.items.length;i++){
				}//for(var i=0;i<rpta.items.length;i++){
				return $tbody;
			}
		});
	}//ejecutar: function(w)
};//var ctg_acrd = {