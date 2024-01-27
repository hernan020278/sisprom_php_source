var aval = {
	wb:null,
	wp:null,
	ws:null,
	wi:null,
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
		"ARTI":{'name': 'Articulo', 'alias': 'Control Articulo'},
		"PROD":{'name': 'Producto', 'alias': 'Control Producto'},
		"SERV":{'name': 'Servicio', 'alias': 'Control Servicio'},
		"AVAL":{'name': 'Validaarticulo', 'alias': 'Validacion de articulos'}
	},
	////////////////////////
	//Metodhs of Interface//
	////////////////////////		
	init:function(w){
		if(w==null)w=new Object();
		aval.winBrow(w);
	},
	winBrow : function(w){
		if(w==null)w=new Object;
		aval.setPagina(w);
		aval.wb=w;
		Sisem.Cargar({
			container: '#mainPanel',
			url:base_url+'cmn/home/grid_stk',
			beforeLoad:function(){
			},
			afterLoad:function(data){
				$main = $('#content');
				w.$e = $('#mainPanel');
				aval.iniciarBrowse($.extend(w,{idGrid:aval.pag.idGridWB, modo:'NAVEGAR'}));
			}
		});
	},
	winPop:function(w){
		if(w==null)w=new Object;
		aval.setPagina(w);
		aval.wp=w;
		aval.pag.modo=((w.modo)?w.modo:'AGREGAR');
		Sisem.Window({
			id:aval.pag.nameWP,
			title:aval.pag.modo+' '+aval.pag.alias,
			width:650,
			height:350,
			url:base_url+'erp/arti/edit?tipo='+w.tipo,
			modal:false,
			buttons : [
				{html : "<i class='fa fa-times'></i><span name='etiCerrar'>Cerrar</span>",
					"class" : "btn btn-danger",
					"name" : "btnCerrar",
					click : function() {
						aval.cerrarFormulario(w);
					}
				}	
			],
			afterLoad:function(){				
				w.$e = $('#'+aval.pag.nameWP);
				Sisem.blockW(w.$e);
				Sisem.formato(w);
				aval.iniciarFormulario(w);
				Sisem.unblockW(w.$e);
				w.$e.find("input[name=art_codi]").focus();
			}
		});		
	},
	winSel:function(w){
		if(w==null)w=new Object;
		aval.setPagina(w);
		aval.ws=w;
		aval.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
		Sisem.Window({
			id:aval.pag.nameWS,
			title:'Seleccionar '+aval.pag.alias,
			width:800,
			height:500,
			url:base_url+'erp/arti/edit?tipo='+w.tipo,
			modal:false,
			buttons : [				
				{html : "<i class='fa fa-times'></i>&nbsp; Finalizar",
					"class" : "btn btn-success",
					click : function() {
						if(aval.validarFormulario($.extend(w, {evento: 'validarItems'}))){
							 aval.cerrarFormulario($.extend(w, {data: w.lisArt}));
						}
					}
				},
				{html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
					"class" : "btn btn-danger",
					click : function() {
						aval.cerrarFormulario(w);
					}
				}
			],
			afterLoad:function(){
				w.$e = $('#'+aval.pag.nameWS);
				Sisem.blockW(w.$e);
				w.$e.on('click','[name=btnAddNex]',function(){
					aval.btnArtNexClick(w);
				});
				w.$e.on('click','[name=btnAddArt]',function(){
					aval.btnArtAddClick(w);
				});
				w.$e.on('click','[name=btnDelArt]',function(){
					aval.btnArtAddClick(w);
				});
				aval.iniciarFormulario(w);
				Sisem.unblockW(w.$e);
			}
		});
	},
	iniciarBrowse: function(w){
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: [
				{descr:'ACC',width:30},
			    {descr:'CODIGO',width:60, search: 'true'},
			    {descr:'UNIDAD',width:50},
			    {descr:'MARCA',width:60},
			    {descr:'CATEGORIA',width:60},
			    {descr:'NOMBRE',width:350, search: 'true'},
			    {descr:'COSTO',width:50},
			    {descr:'STOCK',width:50}
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
			data: base_url+'erp/arti/getValidarLista',
			params: {tipo:w.tipo, id_sucu: ( ( USERDATA.suc ) ? USERDATA.suc.id_sucu : w.suc.id_sucu), art_nomb:w.lisArt[w.iteAct].nomb},
			itemdescr: aval.pag.alias+'(s)',
			//toolbarURL: '',
			//toolbarHTML: '<div class="form-inline"><button name="btnAdd'+w.tipo+'" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+aval.pag.alias+'</button></div>',
			onContentLoaded: function($el){
			},
			// inObject : 'grid',
			fill: function(rpta,$row){				
				$row.append('<td></td>');						
				$row.append('<td>'+rpta.codi+'</td>');
				$row.append('<td>'+rpta.uniNomb+'</td>');
				$row.append('<td>'+rpta.marNomb+'</td>');
				$row.append('<td>'+rpta.catNomb+'</td>');
				$row.append('<td>'+rpta.nomb+'</td>');
				$row.append('<td>'+Sisem.roundFloat(rpta.cost, 2)+'</td>');
				$row.append('<td>'+Sisem.roundFloat(rpta.sact, 0)+'</td>');
				$row.data('data',rpta).dblclick(function(){
					if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal-dialog').find('.modal-footer button:eq(0)').click();}
					else{w.$e.dialog('widget').find('.ui-dialog-buttonpane button:eq(0)').click();}
				});
				$row.click(function(){
					var data = $(this).data('data');
					w.$e.find('[name=art_tipo]').val(data.tipo);
					w.$e.find('[name=art_nomb]').val(data.nomb);
					w.$e.find('[name=mar_nomb]').val(data.marNomb);
					w.$e.find('[name=cat_nomb]').val(data.catNomb);
					w.$e.find('[name=uni_nomb]').val(data.uniNomb);
				});				
				$row.contextMenu({
					buttonHelper: true,
				    menuSelector: "#"+w.idMenCtx,
				    onShow:function($el, invokedOn){
				    	if(w.modo!='NAVEGAR'){$el.css('z-index','1100');}
				    	var $row = invokedOn.closest('tr');
				    	$el.find('#'+w.idMenCtx+'_deta').hide();
				    	$el.find('#'+w.idMenCtx+'_apro').hide();
				    	$el.find('#'+w.idMenCtx+'_anul').hide();
//				    	$el.find('#'+w.idMenCtx+'_dele').hide();
				    	$el.find('#'+w.idMenCtx+'_stck').hide();
				    },
				    menuSelected: function (invokedOn, selectedMenu) {
				    	var $id = selectedMenu.attr('id');
				    	var $row = invokedOn.closest('tr');
				    	switch($id){
				    		case w.idMenCtx+"_deta":
//				    			aval.Details({id:$row.data('data').id_enti});
				    			break;
				    		case w.idMenCtx+"_edit":
				    			aval.winPop({
				    				tipo:w.tipo,
				    				id:$row.data('data').id_arti,
									modo:'MODIFICAR',
									callback:function(){
										if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
									}
				    			});
				    			break;
				    		case w.idMenCtx+"_dele":
				    			var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').nomb, function(rpta){
					    			if(rpta=='Si'){
										$.post(base_url+'erp/arti/delete',{id:$row.data('data').id_enti},function(rpta){
											Sisem.msgBox(rpta.msg.type,rpta.msg.text);
											if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
										},'json');
					    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
				    			});
				    			break;
				    	}
				    }
				});
				return $row;
			}
		});	
	},
	iniciarFormulario:function(w){
		aval.limpiarFormulario(w);
		aval.llenarFormulario(w);
		aval.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
		w.$e.find('[name=ite_nume]').val('');
		w.$e.find('[name=ite_nomb]').val('');
		w.$e.find('[name=ite_unid]').val('');
		
		w.$e.find('[name=art_tipo]').val('');
		w.$e.find('[name=art_nomb]').val('');
		w.$e.find('[name=mar_nomb]').val('');
		w.$e.find('[name=cat_nomb]').val('');
		w.$e.find('[name=uni_nomb]').val('');
//		w.$e.find('[name=gridItemCli]').children('tbody').children().remove();
	},
	obtenerDatoFormulario: function(w){
		var data = {};
		return data;
	},	
	llenarFormulario:function(w){
		$.post(base_url+'erp/arti/filtrarLista',{id_enti: w.ent.id_enti, lisArt:w.lisArt},function(rpta){
			if(rpta!=null)
			{
				w.lisArt=rpta.items;
				aval.nextArticulo(w);
			}
		},'json');
	},
	refrescarFormulario: function(w){
		switch (w.modo){
			case 'VISUALIZAR':
				w.$e.parent().find('[name=etiAgregar]').html('Agregar');
				w.$e.parent().find('[name=etiModificar]').html('Modificar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'AZUL');
				if(!Sisem.isEmpty(w.$e.find('[name=art_kyarti]').val()))
				{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'AZUL');
				}
				else{
					Sisem.activar(w.$e.parent().find('[name=btnModificar]'), false);
				}
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), true);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), true, 'AZUL');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				aval.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				aval.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				aval.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},	
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=ite_nume]'), false);
		Sisem.activar(w.$e.find('[name=ite_nomb]'), false);
		Sisem.activar(w.$e.find('[name=ite_unid]'), false);
		
		Sisem.activar(w.$e.find('[name=art_tipo]'), false);
		Sisem.activar(w.$e.find('[name=art_nomb]'), false);
		Sisem.activar(w.$e.find('[name=mar_nomb]'), false);
		Sisem.activar(w.$e.find('[name=cat_nomb]'), false);
		Sisem.activar(w.$e.find('[name=uni_nomb]'), false);
	},
	validarFormulario:function(w){
		if(w.evento!=null && w.evento=='validarItems'){
			for(key in w.lisArt)
			{
				if(w.lisArt[key].id_arti==0)
				{
					Sisem.msgBox('error','La lista de articulos no esta validada!!!');
					return false;
				}
			}
			for(keyA in w.lisArt)
			{
				for(keyB in w.lisArt)
				{
					if(keyA!=keyB && w.lisArt[keyA].id_arti==w.lisArt[keyB].id_arti)
					{
						Sisem.msgBox('error','Item:'+(keyA+1)+' Nombre: '+w.lisArt[keyA].nomb+' == Item:'+(keyB+1)+' Nombre: '+w.lisArt[keyB].nomb+'!!!');
						return false;
					}
				}
			}
		}
		if(w.evento!=null && w.evento=='validarItemUnico')
		{
			if(w.$e.find('[name=gridItemDoc] tr').length>0){
				for(var i=0;i<w.$e.find('[name=gridItemDoc] tr').length;i++){
					var $row = w.$e.find('[name=gridItemDoc] tr').eq(i);
					if(!Sisem.isEmpty(w.id_arti)){
						if($row.data('data').id_arti==w.id_arti){
							Sisem.msgBox('error','Este articulo ya existe!!!');
							return false;
						}
					}
				}
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
		$.extend(aval.pag, {
			alias		: aval.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+aval.tipPag[w.tipo]['name'],
			nameWP		: 'win'+aval.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+aval.tipPag[w.tipo]['name'],
			nameWI		: 'int'+aval.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+aval.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+aval.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+aval.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+aval.tipPag[w.tipo]['name']
		});
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAgregarClick: function(w){},
	btnModificarClick: function(w){},
	btnImprimirClick: function(w){},		
	btnArtAddClick: function(w){
		arti.winPop({
			tipo:"ARTI",
			art_nomb: w.$e.find('[name=ite_nomb]').val(),
			ent:{
				id_enti: w.ent.id_enti	
			},
			ctl:{
				codi: w.lisArt[w.iteAct].iden
			},
			modo:'AGREGAR',
			callback:function(){
				w.lisArt[w.iteAct].nomb=w.$e.find('[name=ite_nomb]').val();
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnArtNexClick: function(w){
		if(Sisem.isEmpty(w.$e.find('[name=art_nomb]').val()))
		{
			var resp = Sisem.msgAsk('Este articulo NO EXISTE', '�Desea eliminarlo?', function(rpta){
				if(rpta=='Si'){
					w.lisArt.splice(w.iteAct,1);
					aval.nextArticulo(w);
				}
			});
		}//if(!Sisem.isEmpty(w.$e.find('[name=art_nomb]')))
		else
		{
			if(w.$e.find('[name=grid] .highlights').length>0){
				var data = w.$e.find('[name=grid] .highlights').data('data');
				
				data.iden=aval.ws.lisArt[w.iteAct].iden;
				data.cant=aval.ws.lisArt[w.iteAct].cant;
				data.cost=aval.ws.lisArt[w.iteAct].cost;
				
				aval.ws.lisArt[w.iteAct]=data;
				aval.nextArticulo(w);
			}
		}
	},	
	////////////////////////
	//Metodhs Autocomplete//
	////////////////////////
	nextArticulo: function(w){
		if(w.lisArt!=null && ((w.iteAct+1)<w.lisArt.length))
		{
			var isNext=false;
			iteActTmp=(((w.iteAct+1)<w.lisArt.length-1)?w.iteAct+1:w.lisArt.length-1);
			for(var ite=iteActTmp; ite<w.lisArt.length; ite++)
			{
				if(typeof w.lisArt[ite].id_arti==='undefined' || w.lisArt[ite].id_arti==0)
				{
					w.iteAct=ite;
					isNext=true;
					break;
				}
			}
			if(isNext)
			{
				if(w.idGrid)
				{
					$('#'+w.idGrid).parent('table').data('grid_params').art_nomb=w.lisArt[w.iteAct].nomb;
					$('#'+w.idGrid).trigger('reloadGrid');
				}
				else{aval.iniciarBrowse($.extend(w,{idGrid:usua.pag.idGridWB, modo:'NAVEGAR'}));}
				
				aval.limpiarFormulario(w);
				
				w.$e.find('[name=ite_nume]').val(w.iteAct+1);
				w.$e.find('[name=ite_nomb]').val(w.lisArt[w.iteAct].nomb);
				w.$e.find('[name=ite_unid]').val(w.lisArt[w.iteAct].unid);
				if(w.$e.find('[name=grid]').find('tbody').find('tr').length>0){w.$e.find('[name=art_esta]').val('ARTICULO EXISTE');}
				if(w.$e.find('[name=grid]').find('tbody').find('tr').length==0){w.$e.find('[name=art_esta]').val('NO HAY COINCIDENCIAS');}
			}
			else
			{
				Sisem.msgBox('info','No hay mas articulos a VALIDAR');
			}
		}//if(w.lisArt!=null)
		else
		{
			Sisem.msgBox('info','No hay mas articulos a VALIDAR');
		}
	}
};