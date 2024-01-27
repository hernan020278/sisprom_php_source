var brw_usuafoto = {
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
			cols: colsTmp.concat([]),
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
			params: {archivo: w.archivo, suc_kysuc: ( ( USERDATA.suc ) ? USERDATA.suc.suc_kysuc : w.suc.suc_kysuc), tipo: ((w.params && typeof w.params.tipo!='undefined')?w.params.tipo:'PRODUCTO'), cate: ((w.params && typeof w.params.cate!='undefined')?w.params.cate:'CATETRES')},
			itemdescr: usua.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="row" name="divOpcion" style="margin-left: 0px;">',
					_toolBarHtml+='<button name="btnAdd'+w.tipo.toLowerCase()+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nuevo Aviso</button>&nbsp;',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo+']').click(function(){
					usua.btnAddClick(w);
				});
				Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc:USERDATA.suc.suc_kysuc, prp_secc: 'TIPSEX'}, function(rpta){
					if(rpta.lista.items.length > 0)
					{
						trab.totaCriterio = rpta.lista.items.length;
						trab.listaProp = rpta.lista.items;
						var htmlBoton = '';
						for(var ite=0;ite<rpta.lista.items.length;ite++)
						{
							var fila = rpta.lista.items[ite];
							htmlBoton += '<button name="btnOpcion'+fila.prp_prop+'" class="btn btn-success" prp_kyprp="'+fila.prp_kyprp+'" prp_kypdr="'+fila.prp_kypdr+'" prp_prop="'+fila.prp_prop+'" prp_valu="">'+fila.prp_prop+'</button>&nbsp;';							
						}
						
						$el.find('[name=divOpcion]').append(htmlBoton);
						$el.find('[name=divOpcion]').find('[name^=btnOpcion]').click(function(){
							var $thisButton = $(this);
							var prp_kyprp = $thisButton.attr('prp_kyprp');
							var prp_prop = $thisButton.attr('prp_prop');
							var prp_valu = $thisButton.attr('prp_valu');
							
							if($thisButton.hasClass('btn-success'))
							{
								
								if(prp_prop=='SERVICIO')
								{
									arti.winSel({
										tipo: 'SERV',
										modo: 'SELECCIONAR',
										art: {art_kypdr: 0},
										callback:function(objSel){
											if(objSel){
												var existeCriterio = false;
												for(var iteTip=0;iteTip<trab.listaTipo.length;iteTip++)
												{
													if(prp_prop==trab.listaTipo[iteTip])
													{
														existeCriterio = true;
														break;
													}
												}
												if(!existeCriterio && trab.cantCriterio < trab.totaCriterio)
												{
													trab.cantCriterio++;
								    				trab.listaTipo[trab.cantCriterio] = prp_prop;
								    				trab.listaValu[trab.cantCriterio] = objSel.art_nomb;
								    				
								    				$thisButton.attr('prp_valu', objSel.art_nomb);
								    				$thisButton.html(objSel.art_nomb);
								    				
								    				Sisem.activar($thisButton, true, 'ROJO');
												}
							    				
							    				$('#'+w.idGrid).parent('[name=grid]').data('grid_params').listaTipo = trab.listaTipo;
							    				$('#'+w.idGrid).parent('[name=grid]').data('grid_params').listaValu = trab.listaValu;
						    					$('#'+w.idGrid).trigger('reloadGrid');

											}//if(objSel){
										}//callback:function(objSel){
									});//trab.winSel({									
								}
								else
								{
									trab.winSel({
										tipo: 'TRAB',
										modo: 'SELECCIONAR',
										prp: {prp_prop: prp_prop},
										callback:function(objSel){
											if(objSel){
												var existeCriterio = false;
												for(var iteTip=0;iteTip<trab.listaTipo.length;iteTip++)
												{
													if(prp_prop==trab.listaTipo[iteTip])
													{
														existeCriterio = true;
														break;
													}
												}
												if(!existeCriterio && trab.cantCriterio < trab.totaCriterio)
												{
													trab.cantCriterio++;
								    				trab.listaTipo[trab.cantCriterio] = prp_prop;
								    				trab.listaValu[trab.cantCriterio] = objSel.tra_valu;
								    				
								    				$thisButton.attr('prp_valu', objSel.tra_valu);
								    				$thisButton.html(objSel.tra_valu);
								    				
								    				Sisem.activar($thisButton, true, 'ROJO');
												}
							    				
							    				$('#'+w.idGrid).parent('[name=grid]').data('grid_params').listaTipo = trab.listaTipo;
							    				$('#'+w.idGrid).parent('[name=grid]').data('grid_params').listaValu = trab.listaValu;
						    					$('#'+w.idGrid).trigger('reloadGrid');

											}//if(objSel){
										}//callback:function(objSel){
									});//trab.winSel({								
								}//else
							}//if($thisButton.hasClass('btn-primary'))
							else
							{
								for(var iteTip=0;iteTip<trab.listaTipo.length;iteTip++)
								{
									if(prp_prop==trab.listaTipo[iteTip])
									{
										Sisem.deleteArray(trab.listaTipo, prp_prop);
										Sisem.deleteArray(trab.listaValu, prp_valu);
										
					    				$thisButton.html(prp_prop);
					    				$thisButton.attr('prp_valu', '');
					    				Sisem.activar($thisButton, true, 'VERDE');

					    				$('#'+w.idGrid).parent('[name=grid]').data('grid_params').listaTipo = trab.listaTipo;
					    				$('#'+w.idGrid).parent('[name=grid]').data('grid_params').listaValu = trab.listaValu;
				    					$('#'+w.idGrid).trigger('reloadGrid');
					    				
					    				trab.cantCriterio--;
										break;
									}//if(prp_prop==trab.listaTipo[iteTip])
								}//for(var iteTip=0;iteTip<trab.listaTipo.length;iteTip++)
							}//else
						});//w.$e.find('[name=divOpcion]').find('[name=btnOpcion]').click(function(){						
					}//if(rpta.lista.items.length > 0)
				});//Sisem.ejecutar('GetListaCategoria',{cat_kycat: w.$e.find('[name=cat_kycat]').val()}, function(rpta){
			},
//			inObject : 'grid',
//			fill: function(rpta,$row){
			load: function(rpta,$tbody){
				if(rpta.items!=null)
				{
					var idxCol=1;
					var $row = null;
					var numCol=4;
					var _divPanel = '';
					_divPanel+='<div class="row">';
		            _divPanel+='<div class="col-md-12" style="padding-left: 23px; padding-right: 23px;">';
		            _divPanel+='<div class="row">';
					// ================
		            // IMAGEN 218 x 168
		            // ================
					for(var ite=0;ite<rpta.items.length;ite++)
					{
						var fila = rpta.items[ite];
						var arrDiffFec = Sisem.entreFechas(fila.ctl_fing, Sisem.fechor());
						var tmpIng = ((arrDiffFec[0]>0)?arrDiffFec[0]+' A�os':((arrDiffFec[1]>0)?arrDiffFec[1]+' Meses':((arrDiffFec[2]>0)?arrDiffFec[2]+' Dias':((arrDiffFec[3]>0)?arrDiffFec[3]+' Horas':arrDiffFec[4]+' Minutos'))));
						
						var arrDiffFec = Sisem.entreFechas(fila.usu_fnac, Sisem.fechor());
						var tmpEda = ((arrDiffFec[0]>0)?arrDiffFec[0]+' A�os':((arrDiffFec[1]>0)?arrDiffFec[1]+' Meses':((arrDiffFec[2]>0)?arrDiffFec[2]+' Dias':((arrDiffFec[3]>0)?arrDiffFec[3]+' Horas':arrDiffFec[4]+' Minutos'))));
						
						_divPanel+='<div class="col-xs-12 col-sm-4 col-md-3 col-lg-2" >';
						    _divPanel+='<div class="col-prod"><center>';
						        _divPanel+='<div class="hover">';
						            _divPanel+='<div style="margin: 0px;">';
						                _divPanel+='<a href="javascript:void(0);"><img src="'+base_url+'app/com/sex/images/'+((fila.usu_foto!='')?fila.usu_codi+'.jpg':'pregunta.png')+'"/></a>';
						            _divPanel+='</div>';
						            _divPanel+='<div style="font-size: 12px; text-align: left;">';
						            	_divPanel+='<table style="border-top: solid 1px; width: 100%;">';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Vive</td><td>&nbsp;'+fila.tra_vive+'</td>';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Nacio</td><td>&nbsp;'+fila.tra_nace+'</td>';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Edad</td><td>&nbsp;'+tmpEda+'</td>';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Precio</td><td>&nbsp;S/. '+Sisem.redondeoString(fila.ctl_prec)+'</td>';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Telef</td><td>&nbsp;'+fila.usu_tele+'</td></tr>';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Horario</td><td>&nbsp;'+fila.tra_hor1+'</td></tr>';
						            		_divPanel+='<tr style="border-bottom: 1px dotted gray;"><td style="border-right: 1px dotted gray;">&nbsp;Atencion</td><td>&nbsp;'+fila.tra_aten+'</td></tr>';
						            		_divPanel+='<tr><td style="border-right: 1px dotted gray;">&nbsp;Publicado</td><td>&nbsp;'+tmpIng+'</td></tr>';
						            	_divPanel+='</table>';
						                //_divPanel+='<a href="javascript:void(0);" style="text-decoration: underline;"><span style="margin-left: 3px; color: black;">&nbsp;Usuario&nbsp;</span></a><span style="margin-left: 3px; color: grey;">-&nbsp;Servicio *****&nbsp;-</span><span style="margin-left: 3px; background-color: grey; color: white; -moz-border-radius: 2px; -khtml-border-radius: 2px; -webkit-border-radius: 2px; border-radius: 2px;">&nbsp;S/ 80</span>';
						            _divPanel+='</div>';
						        _divPanel+='</div>';
						    _divPanel+='</div></center>';
						_divPanel+='</div>';
					}//for(var i=0;i<rpta.items.length;i++){
		            _divPanel+='</div>';
		            _divPanel+='</div>';
		            _divPanel+='</div>';
		            $tbody.append($(_divPanel));
				}//if(rpta.items!=null)
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_usuafoto = {