var arti = {
	pag:{
		alias		: 'Articulo',
		nameWB		: 'brwArticulo',
		nameWP		: 'winArticulo',
		nameWS		: 'selArticulo',
		nameWI		: 'intArticulo',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwArticulo',
		idGridWP	: 'idWinArticulo',
		idGridWS	: 'idSelArticulo',
		idGridWI	: 'idIntArticulo'
	},
	tipPag: {
		"ARTI":{'name': 'Articulo', 'alias': 'Articulo'},
		"SERV":{'name': 'Servicio', 'alias': 'Servicio'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['adm/prop','ent/admArt']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init: function(w){
		if(w==null)w=new Object();
		arti.winBrow(w);
	},
	winBrow: function(w){
		arti.import(function(){
			if(w==null)w=new Object;
			arti.setPagina(w);
			arti[w.pag.nameWB]=w;
			Sisem.Cargar({
				politicaSeguridad: w.politicaSeguridad,
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					arti.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: false}));
				}
			});
		});
	},
	winPop:function(w){
		arti.import(function(){
			if(w==null)w=new Object;
			arti.setPagina(w);
		  arti[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				politicaSeguridad: w.politicaSeguridad,
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 600 : 700),
				height:((w.size && w.size=='short') ? 350 : 400),
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						class : "btn btn-primary",
						name : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							arti.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-warning",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							arti.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);

					$('[name=btnSubirArt_foto]').on('click',function (){
						$('[name=inp_art_foto]').trigger('click');
					});	
					$('[name=inp_art_foto]').change(function(event){
						var texto = w.$e.find('[name=inp_art_foto]').val(); 
						if(texto==''){Sisem.msgBox('error', 'Error! Debe de seleccionar un archivo para subir');return false;} 
						var file = w.$e.find('[name=inp_art_foto]')[0].files[0];
						var fileName = file.name;
						var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
						var fileSize = file.size;
						var fileType = file.type;
						var fileName = (w.$e.find('[name=art_codi]').val().toUpperCase()+'.'+fileExtension).replace(" ","_");
						w.$e.find('[name=art_foto]').val(fileName);

  					var ancho = w.$e.find('[name=pan_art_foto]').outerWidth();
	  				var alto = w.$e.find('[name=pan_art_foto]').outerHeight();
						archivos = [file];
						Sisem.uploadMultipleFiles(w, fileName, archivos, base_url+'adm/CtrlArticulo/uploadFile?modulo=imagen&ancho='+ancho+'&alto='+alto, function(rpta){
							if(rpta.msg.type=='success')
							{
								w.$e.find('[name=img_art_foto]').attr('src',base_url+rpta.pathFile+'?'+(new Date()).getTime()).fadeIn();
								Sisem.msgBox('info', 'Archivo subido satisfactorio!!!');
							}
						});						
					});

					arti.articuloAutocomplete($.extend(w, {art_tipo: 'ARTI'}));

					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPMRC', prf_inpu: 'mrc_prop', prf_sele: 1}));
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPCAT', prf_inpu: 'cat_prop', prf_sele: 1}));
					prop.propiedadAutocomplete($.extend(w, {prp_secc: 'PRPCLS', prf_inpu: 'cls_prop', prf_sele: 1}));

					arti.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
					
					w.$e.find("input[name=art_codi]").focus();
				}
			});
		});
	},
	winSel:function(w){
		arti.import(function(){
			if(w==null)w=new Object;
			arti.setPagina(w);
			arti.ws=w;
			arti.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:arti.pag.nameWS,
				title:'Seleccionar '+arti.pag.alias,
				width:850,
				height:600,
				url:base_url+'cmn/home/grid_stk',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; Seleccionar",
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								arti.cerrarFormulario(w);
							}else{
								if(arti.validarFormulario($.extend(w, {evento: 'gridRowDblclick'}))){
									if(w.$e.find('[name=grid] .highlights').length>0){
										var data = new Object();
										if(w.$e.find('[name=grid] .highlights').length>1)
										{
											data.items = [];
											for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
											{
												data.items.push(w.$e.find('[name=grid] .highlights').eq(ite).data('data'));
											}//for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
										}//if(w.$e.find('[name=grid] .highlights').length==1){
										else if(w.$e.find('[name=grid] .highlights').length==1)
										{
											data = w.$e.find('[name=grid] .highlights').data('data');
										}
										arti.cerrarFormulario($.extend(w, {data: data}));
									}else{
										Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
									}
//									var data = w.$e.find('[name=grid] .highlights').data('data');
//									 if(w.tope==='0002')
//									 {
//										 data['id_lpre']= w.$e.find('[name=grid_pre] .highlights').data('data').id_lpre; //30-03-2015 solo agregamos el id_lprec 
//									 }
//									 arti.cerrarFormulario($.extend(w, {data: data}));
								}
							}						
						}
					},
					{html : "<i class='fa fa-times'></i>&nbsp; Cerrar",
						"class" : "btn btn-danger",
						click : function() {
							arti.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+arti.pag.nameWS);
					Sisem.blockW(w.$e);
					if(w.view && w.view=='CATALOG')
					{
						arti.iniciarBrowseFoto($.extend(w,{idGrid:arti.pag.idGridWS, showMenCtx: false, showToolBar: true, multiSelect: false}));	
					}
					else
					{
						arti.iniciarBrowse($.extend(w,{idGrid:arti.pag.idGridWS, showMenCtx: true, showToolBar: true, multiSelect: false}));	
					}
					Sisem.unblockW(w.$e);
				}
			});
		});
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse: function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['adm/brw_arti']}, function(rpta){
			if(rpta){brw_arti.ejecutar($.extend(w,{modulo:'controllers', archivo: 'adm/brw_arti'}));}
		});
	},	
	iniciarBrowseFoto: function(w){
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			autoWidth: ((w.autoWidth)?w.autoWidth:false),
			tableWidth: ((w.tableWidth)?w.tableWidth:'auto'),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: 
			( ( w.showMenCtx ) ?
				[
					{descr:'ACC',width:10},
					{descr:'FOTO',width:15},
				    {descr:'DESCRIPCION',width:50, search: 'true'}
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
			data: base_url+'adm/arti/getListaCatalog',
			params: {id_sucu: ( ( USERDATA.suc ) ? USERDATA.suc.id_sucu : w.suc.id_sucu), tipo: ((w.params && typeof w.params.tipo!='undefined')?w.params.tipo:'PRODUCTO'), cate: ((w.params && typeof w.params.cate!='undefined')?w.params.cate:'CATETRES')},
			itemdescr: arti.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? '<div class="form-inline"><button name="btnAdd'+w.tipo+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+arti.pag.alias+'</button><select name="selTipo" class="form-control"></select><select name="selCate" class="form-control"></select></div>' : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo+']').click(function(){
					arti.btnAddClick(w);
				});
				w.$e.css('overflow','auto');
				/*$el.find('[name=selTipo]').*/
				$el.find('[name=selTipo]').append('<option value="SERVICIO">SERVICIO</option>');
				$el.find('[name=selTipo]').append('<option value="PRODUCTO">PRODUCTO</option>');
				
				$el.find('[name=selTipo]').on('change', function(){
					var _this=$(this);
					$.post(base_url+'adm/arti/getListaGridCatalog',{tipo: _this.val()},function(rpta){
						$el.find('[name=selCate]').empty();
						if(rpta.lisCat.length > 0){
							for(key in rpta.lisCat)
							{
								$el.find('[name=selCate]').append('<option value="'+rpta.lisCat[key].catNomb+'">'+rpta.lisCat[key].catNomb+'</option>');
							}
							$el.find('[name=selCate]').change();
						}
					},'json');
				});
				$el.find('[name=selCate]').on('change', function(){
					if($('#'+w.idGrid).parent('table').data('grid_params'))
					{
						$('#'+w.idGrid).parent('table').data('grid_params').tipo=$('#'+w.idGrid).parent('table').find('[name=selTipo]').val();
						$('#'+w.idGrid).parent('table').data('grid_params').cate=$('#'+w.idGrid).parent('table').find('[name=selCate]').val();
						$('#'+w.idGrid).trigger('reloadGrid');
					}
				});
				$el.find('[name=selTipo]').change();
			},
			// inObject : 'grid',
//			fill: function(rpta,$row){
			load: function(rpta,$tbody,$cols){
				if(rpta.items!=null)
				{
					var idxCol=1;
					var $row = null;
					var numCol=4;
					for(var ite=0;ite<rpta.items.length;ite++)
					{
						if(idxCol==1){$row=$('<tr>');}
						if(idxCol<=numCol)
						{
							_divPanel="";
//							_divPanel+='<div class="panel panel-'+(((idxCol%2)==0)?'blue':'greenLight')+'">';
							_divPanel+='<div class="panel">';
//								_divPanel+='<div class="panel-heading text-align-center">';
//									_divPanel+='<h3 name="a_name" class="panel-title">'+rpta.items[ite].nomb+'</h3>';
//								_divPanel+='</div>';
								_divPanel+='<div class="panel-body no-padding text-align-center">';
									_divPanel+='<img src="'+base_url+'app/com/adm/images/'+((rpta.items[ite].foto!='')?rpta.items[ite].foto:'pregunta.png')+'"/>';
									_divPanel+='<div class="the-price">';
										_divPanel+='<p style="height: 35px;">'+rpta.items[ite].nomb+'</p>';
									_divPanel+='</div>';
//									_divPanel+='<table>';
//										_divPanel+='<tbody">';
//											_divPanel+='<tr"><td>'+rpta.items[ite].tipo+'</td></tr>';
//											_divPanel+='<tr"><td>'+rpta.items[ite].marNomb+'</td></tr>';
//											_divPanel+='<tr"><td>'+rpta.items[ite].catNomb+'</td></tr>';
//										_divPanel+='</tbody">';
//									_divPanel+='</table>';	
								_divPanel+='</div>';
								_divPanel+='<div class="panel-footer no-padding">';
									_divPanel+='<button name="btnSelPro" class="btn btn-info pull-left">Seleccionar</button>';
									_divPanel+='<button name="btnSelCan" class="btn btn-info pull-right">Para Canje</button>';
//									_divPanel+='<a class="btn bg-color-'+(((idxCol%2)==0)?'blue':'greenLight')+' txt-color-white btn-block" href="javascript:void(0);">'+rpta.items[ite].nomb+'</a>';
								_divPanel+='</div>';	
							_divPanel+='</div>';
							
							$col=$('<td>'+_divPanel+'</td>').data('data',rpta.items[ite]);
							$col.find('button').click(function(event){
								var $col=$(this).closest('td');
								$col.data('data').canj=(($(this).attr('name')=='btnSelCan')?1:0);
								$.post(base_url+'adm/arti/get_stock',{id_arti:$col.data('data').id_arti},function(rptaStk){
									
									if(rptaStk!=null){$col.data('data').sact=rptaStk[0].sact;}
									
									$.post(base_url+'adm/prec/get_precios',{id_arti: $col.data('data').id_arti, id_marc: $col.data('data').id_marc},function(rpta){
										if(rpta!=null)
										{
											$col.data('data').cant=1;
											$col.data('data').prec=rpta[0].prec;
											var data=$col.data('data');
//											_dscr="";
//											_dscr+='<div>';
//												_dscr+='<p><span style="font-weight: bold;">Tipo : </span>'+data.tipo+'</p>';
//												_dscr+='<p><span style="font-weight: bold;">Marca : </span>'+data.marNomb+'</p>';
//												_dscr+='<p><span style="font-weight: bold;">Categoria : </span>'+data.catNomb+'</p>';
//												_dscr+='<p><span style="font-weight: bold;">Nombre : </span>'+data.nomb+'</p>';
//												_dscr+='<p><span style="font-weight: bold;">Precio : </span>'+Sisem.redondeoString(data.prec, 2)+'</p>';
//												_dscr+='<p><span style="font-weight: bold;">Stock : </span>'+Sisem.redondeoString(data.sact, 2)+'</p>';
//											_dscr+='</div>';
//											$col.find('td').eq(1).html(_dscr);
											if($col.data){if(w.callback){w.callback($col.data('data'));}}
										}
									},'json');
								},'json');
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
	},
	iniciarFormulario:function(w){
		arti.limpiarInstancias(w);
		if(w.modo!='MODIFICAR'){arti.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){arti.llenarFormulario(w);}
		if(w.modo=='AGREGAR'){arti.nuevoArticulo(w);}		
		arti.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'art,mrc,cat,cls',w.modo);
	},
	limpiarInstancias(w){
		admArt = {};
	},
	limpiarFormulario:function(w){
		w.$e.find('[name=art_codi]').val('');
		w.$e.find('[name=art_cate]').val('');
		w.$e.find('[name=art_clas]').val('');
		w.$e.find('[name=art_marc]').val('');
		w.$e.find('[name=art_titu]').val('');
		w.$e.find('[name=art_unid]').val('');
		w.$e.find('[name=art_nomb]').val('');
		w.$e.find('[name=art_pcos]').val('');
		w.$e.find('[name=art_pund]').val('');
		w.$e.find('[name=art_sact]').val('');
		w.$e.find('[name=art_pres]').val('');
		w.$e.find('[name=art_conc]').val('');
		w.$e.find('[name=art_nrsn]').val('');
		w.$e.find('[name=art_frsn]').val(moment(new Date()).format('YYYY-MM-DD')).datepicker({ changeMonth: true, changeYear: true, dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
		w.$e.find('[name=art_vers]').val('');
		w.$e.find('[name=img_art_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		
		admArt.art_kyart = ((w.modo=='AGREGAR')?'0':w.$e.find('[name=art_kyart]').val());
		arti.obtenerDatoDlgArticulo(w);
		var data = $.extend(data, {comando: w.modo , art: admArt});

		return data;
	},	
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=art_kyart]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=art_kyart]').val())){
			Sisem.ejecutar('adm/GetListaArticulo',{art_kyart: w.$e.find('[name=art_kyart]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];

					w.$e.find('[name=art_codi]').val(fila.art_codi);
					w.$e.find('[name=art_cate]').val(fila.art_cate);
					w.$e.find('[name=art_clas]').val(fila.art_clas);
					w.$e.find('[name=art_marc]').val(fila.art_marc);
					w.$e.find('[name=art_titu]').val(fila.art_titu);
					w.$e.find('[name=art_unid]').val(fila.art_unid);
					w.$e.find('[name=art_nomb]').val(fila.art_nomb);
					w.$e.find('[name=art_pcos]').val(fila.art_pcos);
					w.$e.find('[name=art_pund]').val(fila.art_pund);
					w.$e.find('[name=art_sact]').val(fila.art_sact);
					w.$e.find('[name=art_pres]').val(fila.art_pres);
					w.$e.find('[name=art_conc]').val(fila.art_conc);
					w.$e.find('[name=art_nrsn]').val(fila.art_nrsn);
					w.$e.find('[name=art_frsn]').val(moment(fila.doc_femi).format('YYYY-MM-DD'));
					w.$e.find('[name=art_foto]').val(fila.art_foto);

					w.$e.find('[name=img_art_foto_min_1]').attr('src','/impkni/img/product-img/'+fila.art_cate.toLowerCase()+'/'+fila.art_nomb.toLowerCase()+'_min_1.jpg').fadeIn();
					w.$e.find('[name=img_art_foto_min_2]').attr('src','/impkni/img/product-img/'+fila.art_cate.toLowerCase()+'/'+fila.art_nomb.toLowerCase()+'_min_2.jpg').fadeIn();
					w.$e.find('[name=img_art_foto_min_3]').attr('src','/impkni/img/product-img/'+fila.art_cate.toLowerCase()+'/'+fila.art_nomb.toLowerCase()+'_min_3.jpg').fadeIn();
					
					w.$e.find('[name=art_foto_min_1]').val(fila.art_nomb.toLowerCase()+'_min_1.jpg');
					w.$e.find('[name=art_foto_min_2]').val(fila.art_nomb.toLowerCase()+'_min_2.jpg');
					w.$e.find('[name=art_foto_min_3]').val(fila.art_nomb.toLowerCase()+'_min_3.jpg');

				}
			});
		}
	},
	refrescarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.parent().find('.modal-title').html(w.modo+' '+w.pag.alias);}
		else{w.$e.parent().find('.ui-dialog-title').html(w.modo+' '+w.pag.alias);}
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(w.ky){
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'NARANJA');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				arti.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				arti.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				arti.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=art_codi]'), false);
		Sisem.activar(w.$e.find('[name=art_cate]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_clas]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_marc]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_titu]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_unid]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pcos]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pund]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_sact]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_pres]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_conc]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_nrsn]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_frsn]'), w.activar);
		Sisem.activar(w.$e.find('[name=art_vers]'), w.activar);
	
		Sisem.activar(w.$e.find('[name=mrc_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=cat_prop]'), w.activar);
		Sisem.activar(w.$e.find('[name=cls_prop]'), w.activar);
		
		Sisem.activar(w.$e.find('[name=art_foto_min_1]'), false);
		Sisem.activar(w.$e.find('[name=art_foto_min_2]'), false);
		Sisem.activar(w.$e.find('[name=art_foto_min_3]'), false);

	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'art,mrc,cat,cls','VALIDAR')){return false;}
		if(w.evento!=null && w.evento=='gridRowDblclick'){
			if(w.$e.find('[name=grid] .highlights').length>0){
				if(w.tope==='0002'){ //Verifico que sea una venta
					if(w.$e.find('[name=grid_pre] .highlights').length==0)
					{
						Sisem.msgBox('error','Seleccione un registro PRECIO!!!');
						return false;
					}
				}
			}else{
				Sisem.msgBox('error','Seleccione un precio!!!');
				return false;
			}						

		}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},		
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='ARTI';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: arti.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+arti.tipPag[w.tipo]['name'],
			nameWP		: 'win'+arti.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+arti.tipPag[w.tipo]['name'],
			nameWI		: 'int'+arti.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+arti.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+arti.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+arti.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+arti.tipPag[w.tipo]['name']
		});
		arti.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		arti.winPop({
			politicaSeguridad: 'NUEVO_ARTICULO',
			tipo:w.tipo,
			modo:'AGREGAR',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			arti.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(arti.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				
				var data = arti.obtenerDatoFormulario(w);
				
				Sisem.ejecutar('adm/CtrlArticulo',data, function(rpta){
					if(rpta.msg.type=='success'){
						w.$e.find('[name=art_kyart]').val(rpta.art_kyart);
						$.extend(w,{modo: 'VISUALIZAR'});
						arti.cerrarFormulario(w);
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('adm/GuardarCategoria',data, function(rpta){
			}//if(arti.validarFormulario($.extend(w,{evento: 'btnGuardarClick'}))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			arti.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			arti.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodhs Miscellanous//
	////////////////////////
	obtenerDatoDlgArticulo: function(w){

		admArt.art_codi = w.$e.find('[name=art_codi]').val().toUpperCase();
		admArt.art_cate = w.$e.find('[name=art_cate]').val().toUpperCase();
		admArt.art_clas = w.$e.find('[name=art_clas]').val().toUpperCase();
		admArt.art_marc = w.$e.find('[name=art_marc]').val().toUpperCase();
		admArt.art_unid = w.$e.find('[name=art_unid]').val().toUpperCase();
		admArt.art_nomb = w.$e.find('[name=art_nomb]').val().toUpperCase();
		admArt.art_pcos = w.$e.find('[name=art_pcos]').val().toUpperCase();
		admArt.art_pund = w.$e.find('[name=art_pund]').val().toUpperCase();
		admArt.art_sact = w.$e.find('[name=art_sact]').val().toUpperCase();
		admArt.art_foto = w.$e.find('[name=art_foto]').val();
		admArt.art_vers = w.$e.find('[name=art_vers]').val().toUpperCase();
	},
	nuevoArticulo: function(w){
		Sisem.ejecutar('adm/GetListaPropiedad',{prp_kycom: USERDATA.com.com_kycom, prp_kysuc: USERDATA.suc.suc_kysuc, prp_secc: 'TBLREG', prp_prop: 'ARTICULO', prp_nive: 2}, function(rpta){
			if(rpta.lista.items.length > 0)
			{
			  parPrp = rpta.lista.items[0];
			  w.$e.find('[name=art_codi]').val('ART'+Sisem.llenarCeros(parPrp.prp_valu, 6));
			} else {
				w.$e.find('[name=art_codi]').val('ART000001');
			}
		});		
	},
	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
	articuloAutocomplete: function (w){
		var prf_solo = ((typeof w.prf_solo=="undefined")?0:w.prf_solo);
		var prf_sele = ((typeof w.prf_sele=="undefined")?0:w.prf_sele);
		var prf_inpu = ((typeof w.prf_inpu=="undefined")?'art_nomb'.split('_'):w.prf_inpu.split('_'));
		var prf_tabl = prf_inpu[0];
		var prf_camp = prf_inpu[1];

		var prf_grup = ((typeof w.prf_grup=="undefined")?'ARTI':w.prf_grup);
		var art_sact = ((typeof w.art_sact=="undefined")?'ARTI':w.art_sact);

		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").on('keyup', function(event){
		    var charCode = (event.which) ? event.which : event.keyCode;
		    var source = event.target;
		    var valor = source.value;
			if(Sisem.isEmpty(valor) && ( charCode == 8 || charCode == 46 )){
				if(prf_solo)
				{
					console.log('solo');
					w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val('');					
				}
				else
				{
					console.log('todos');
					w.$e.find("[name="+prf_tabl+"_combo]").val('');	
					w.$e.find("[name="+prf_tabl+"_kyart]").val('0');	
					w.$e.find("[name="+prf_tabl+"_codi]").val('');
					w.$e.find("[name="+prf_tabl+"_iden]").val('');
					w.$e.find("[name="+prf_tabl+"_tipo]").val('');
					w.$e.find("[name="+prf_tabl+"_unid]").val('');
					w.$e.find("[name="+prf_tabl+"_nomb]").val('');
					w.$e.find("[name="+prf_tabl+"_dscr]").val('');
					w.$e.find("[name="+prf_tabl+"_marc]").val('');
					w.$e.find("[name="+prf_tabl+"_pres]").val('');
					w.$e.find("[name="+prf_tabl+"_conc]").val('');
					w.$e.find("[name="+prf_tabl+"_titu]").val('');
					w.$e.find("[name="+prf_tabl+"_frsn]").val('');
					w.$e.find("[name="+prf_tabl+"_sact]").val('');
					w.$e.find("[name="+prf_tabl+"_pcos]").val('');
					w.$e.find("[name="+prf_tabl+"_pund]").val('');
				}
				$(this).autocomplete('enable');
			}
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete({
			source: base_url+'adm/GetListaArticuloAuto?art_tipo='+prf_grup+'&prf_tabl='+prf_tabl+'&art_sact='+art_sact+'&prf_camp='+prf_camp+'&campo=art_'+prf_camp+'&mostrarSeleccion='+prf_sele+'&orderColumn=art_codi&orderType=DESC',		
			minLength: 1,
			response: function( event, ui ){
				if(ui.content.length==0){$(this).autocomplete('disable');}
			},
			select: function(eve, rpta){
				var obj = rpta.item.value;
				
				if(prf_solo)
				{
					console.log('solo 1');
					for(var idxEle in obj)
					{
						console.log(idxEle);
            if(idxEle==prf_tabl+"_"+prf_camp)
            {
              w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val(obj[idxEle]);
              break;
            }
					}
				}
				else
				{
					console.log('todos 1');
					w.$e.find("[name="+prf_tabl+"_combo]").val(obj['art_combo']);
					w.$e.find("[name="+prf_tabl+"_kyart]").val(obj['art_kyart']);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj['art_codi']);
					w.$e.find("[name="+prf_tabl+"_iden]").val(obj['art_iden']);
					w.$e.find("[name="+prf_tabl+"_tipo]").val(obj['art_tipo']);
					w.$e.find("[name="+prf_tabl+"_unid]").val(obj['art_unid']);
					w.$e.find("[name="+prf_tabl+"_nomb]").val(obj['art_nomb']);
					w.$e.find("[name="+prf_tabl+"_dscr]").val(obj['art_dscr']);
					w.$e.find("[name="+prf_tabl+"_marc]").val(obj['art_marc']);
					w.$e.find("[name="+prf_tabl+"_pres]").val(obj['art_pres']);
					w.$e.find("[name="+prf_tabl+"_conc]").val(obj['art_conc']);
					w.$e.find("[name="+prf_tabl+"_titu]").val(obj['art_titu']);
					w.$e.find("[name="+prf_tabl+"_frsn]").val(obj['art_frsn']);
					w.$e.find("[name="+prf_tabl+"_sact]").val(obj['art_sact']);
					w.$e.find("[name="+prf_tabl+"_pcos]").val(obj['art_pcos']);
					w.$e.find("[name="+prf_tabl+"_pund]").val(obj['art_pund']);
				}
								
				if(obj[prf_tabl+'_nomb']=='Seleccione')
				{
					usua.winSel({
						tipo: prf_grup,
						modo: 'SELECCIONAR',
						prf: {prf_nomb: prf_grup},
						callback:function(objSel){
							if(objSel){
								if(prf_solo)
								{
									for(var idxEle in objSel)
									{
                    if(idxEle==prf_tabl+"_"+prf_camp)
                    {
                      w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val(objSel[idxEle]);
                      break;
                    }
									}					
								}
								else
								{
									w.$e.find("[name="+prf_tabl+"_combo]").val(objSel.art_combo);
									w.$e.find("[name="+prf_tabl+"_kyart]").val(objSel.art_kyart);
									w.$e.find("[name="+prf_tabl+"_codi]").val(objSel.art_codi);
									w.$e.find("[name="+prf_tabl+"_iden]").val(objSel.art_iden);
									w.$e.find("[name="+prf_tabl+"_tipo]").val(objSel.art_tipo);
									w.$e.find("[name="+prf_tabl+"_unid]").val(objSel.art_unid);
									w.$e.find("[name="+prf_tabl+"_nomb]").val(objSel.art_nomb);
									w.$e.find("[name="+prf_tabl+"_dscr]").val(objSel.art_dscr);
									w.$e.find("[name="+prf_tabl+"_marc]").val(objSel.art_dscr);
									w.$e.find("[name="+prf_tabl+"_pres]").val(objSel.art_pres);
									w.$e.find("[name="+prf_tabl+"_conc]").val(objSel.art_conc);
									w.$e.find("[name="+prf_tabl+"_titu]").val(objSel.art_titu);
									w.$e.find("[name="+prf_tabl+"_frsn]").val(objSel.art_frsn);
									w.$e.find("[name="+prf_tabl+"_sact]").val(objSel.art_sact);
									w.$e.find("[name="+prf_tabl+"_pcos]").val(objSel.art_pcos);
									w.$e.find("[name="+prf_tabl+"_pund]").val(objSel.art_pund);
								}								
							}
						}
					});
				}
				else
				{
					Sisem.getFile('adm/'+obj.usu_foto, 'imagen', function(rptaImg){
						if(rptaImg.msg.type=='success'){w.$e.find('[name=img_'+prf_tabl+'_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						else{w.$e.find('[name=img_'+prf_tabl+'_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
					});
					w.$e.find('[name='+prf_tabl+'_foto]').val(obj.usu_foto);					
				}
				/*****************************************
				 * Cambiar el boton al estado original
				 *****************************************/
				$(this).next().children('button').removeClass('btn-success');
				$(this).next().children('button').addClass('btn-info');
				
				$(this).next().children('button').children('i').removeClass('fa-chevron-up');
				$(this).next().children('button').children('i').addClass('fa-chevron-down');

				$(this).autocomplete('close');
				eve.preventDefault();
		    },
		    focus: function(eve, rpta){
				var obj = rpta.item.value;
				
				if(prf_solo)
				{
					for(var idxEle in obj)
					{
					    if(idxEle==prf_tabl+"_"+prf_camp)
					    {
						    w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").val(obj[idxEle]);
						    break;
					    }
					}					
				}
				else
				{
					w.$e.find("[name="+prf_tabl+"_combo]").val(obj.art_combo);
					w.$e.find("[name="+prf_tabl+"_kyart]").val(obj.art_kyart);
					w.$e.find("[name="+prf_tabl+"_codi]").val(obj.art_codi);
					w.$e.find("[name="+prf_tabl+"_iden]").val(obj.art_iden);
					w.$e.find("[name="+prf_tabl+"_tipo]").val(obj.art_tipo);
					w.$e.find("[name="+prf_tabl+"_unid]").val(obj.art_unid);
					w.$e.find("[name="+prf_tabl+"_nomb]").val(obj.art_nomb);
					w.$e.find("[name="+prf_tabl+"_dscr]").val(obj.art_dscr);
					w.$e.find("[name="+prf_tabl+"_marc]").val(obj.art_dscr);
					w.$e.find("[name="+prf_tabl+"_pres]").val(obj.art_pres);
					w.$e.find("[name="+prf_tabl+"_conc]").val(obj.art_conc);
					w.$e.find("[name="+prf_tabl+"_titu]").val(obj.art_titu);
					w.$e.find("[name="+prf_tabl+"_frsn]").val(obj.art_frsn);
					w.$e.find("[name="+prf_tabl+"_sact]").val(obj.art_sact);
					w.$e.find("[name="+prf_tabl+"_pcos]").val(obj.art_pcos);
					w.$e.find("[name="+prf_tabl+"_pund]").val(obj.art_pund);
				}				
				eve.preventDefault();
		    }
		});
		w.$e.find("[name="+prf_tabl+"_"+prf_camp+"]").autocomplete('widget').css('z-index',1100);
	}
};
