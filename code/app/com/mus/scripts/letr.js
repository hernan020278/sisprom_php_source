var letr = {
	pag:{
		alias		: 'Letra',
		nameWB		: 'brwLetra',
		nameWP		: 'winLetra',
		nameWS		: 'selLetra',
		nameWI		: 'intLetra',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwLetra',
		idGridWP	: 'idWinLetra',
		idGridWS	: 'idSelLetra',
		idGridWI	: 'idIntLetra'
	},
	tipPag: {
		"LISTLETRA":{'name': 'Listletra', 'alias': 'Letra'},
	    "EDITLETRA":{'name': 'Editletra', 'alias': 'Editletra'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['mus/acrd']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		letr.winBrow(w);
	},
	winBrow : function(w){
		letr.import(function(){
			if(w==null)w=new Object;
			letr.setPagina(w);
			letr[w.pag.nameWB] = w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),				
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					letr.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//letr.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		letr.import(function(){
			if(w==null)w=new Object;
			letr.setPagina(w);
		    letr[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 400 : 600),
				height:((w.size && w.size=='short') ? 300 : 450),
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
							letr.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							letr.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					letr.iniciarFormulario(w);
					Sisem.validarControlesColor(w.$e,'ltr',w.modo);
					Sisem.unblockW(w.$e);
					//Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//letr.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		letr.import(function(){
			if(w==null)w=new Object;
			letr.setPagina(w);
			letr[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:700,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times-circle'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								letr.cerrarFormulario(w);
							}else{
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
									letr.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times-circle'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							letr.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					letr.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//prop.import(function(){
	},		
	winInt:function(w){
		letr.import(function(){
			if(w==null)w=new Object;
			letr.setPagina(w);
			enti[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					letr.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//letr.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: [USERDATA.app.pol_temp+'/brw_letr']}, function(rpta){
			if(rpta){brw_letr.ejecutar($.extend(w,{modulo:'controllers', archivo: USERDATA.app.pol_temp+'/brw_letr'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){letr.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){letr.llenarFormulario(w);}
		letr.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=cnc_kycnc]').val(w.ky);
		if(w.tipo == 'LISTLETRA')
		{
			w.$e.find('[name=cnc_auto]').html(w.cnc.cnc_auto);
			w.$e.find('[name=cnc_nomb]').html(w.cnc.cnc_nomb);
			Sisem.getFile('mus/'+w.cnc.cnc_audi, 'audio', function(rptaImg){
				if(rptaImg.msg.type=='success')
				{
					w.$e.find('[name=cnc_audi]').attr('src', rptaImg.listaArchivo[0]);
				}
			});
		}
		else if (w.tipo == 'EDITLETRA') 
		{
			w.$e.find('[name=ltr_dscr]').html('');
			w.$e.find('[name=ltr_link]').html('');
			w.$e.find('[name=ltr_tnta]').prop('checked', false);
		}
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJsonCamelCase(w.$e);
		$.extend(data,{
			comando   : w.modo,
			ltr_kyltr : ((w.modo=='AGREGAR')?'0':w.$e.find('[name=ltr_kyltr]').val()),
			tipo      : w.tipo
		});
		return data;
	},	
	llenarFormulario:function(w){
		if(w.tipo == 'LISTLETRA')
		{
			if(w.ky>0){w.$e.find('[name=cnc_kycnc]').val(w.ky);}
			if(!Sisem.isEmpty(w.$e.find('[name=cnc_kycnc]').val())){
				Sisem.ejecutar('mus/GetListaLetraNota',{ltr_kycnc: w.$e.find('[name=cnc_kycnc]').val()}, function(rpta){
					if(!jQuery.isEmptyObject(rpta.lista.items))
					{
						for(var keyLtr in rpta.lista.items)
						{
							w.letra = rpta.lista.items[keyLtr];
							letr.agregarLetraHtml(w);
						}
						$.each( w.$e.find('[name=ltr_dscr]') , function( key, obj ) {
							Sisem.activar($(obj), false);
						});
					}//if(rpta.lista.items.length > 0)
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('mus/GetListaLetraNota',{ltr_kycnc: w.$e.find('[name=cnc_kycnc]').val()}, function(rpta){				
			}//if(!Sisem.isEmpty(w.$e.find('[name=prp_kyprp]').val())){
			else{Sisem.unblockW(w.$e);}
		}//if(w.tipo == 'LISTLETRA')
		else if(w.tipo == 'EDITLETRA') 
		{
			if(w.ky>0){w.$e.find('[name=ltr_kyltr]').val(w.ky);}
			if(!Sisem.isEmpty(w.$e.find('[name=ltr_kyltr]').val())){
				Sisem.ejecutar('mus/GetListaLetra',{ltr_kyltr: w.$e.find('[name=ltr_kyltr]').val()}, function(rpta){
					if(rpta.lista.items.length > 0)
					{
						var ltr = rpta.lista.items[0];					
						w.$e.find('[name=ltr_kyltr]').val(ltr.ltr_kyltr);
						w.$e.find('[name=ltr_kycnc]').val(ltr.ltr_kycnc);
						w.$e.find('[name=ltr_dscr]').val(ltr.ltr_dscr);
						w.$e.find('[name=ltr_link]').val(ltr.ltr_link);
						w.$e.find('[name=ltr_tnta]').prop("checked", ((ltr.ltr_tnta=='S') ? true : false) );
					}//if(rpta.lista.items.length > 0)
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('mus/GetListaCancion',{cnc_kycnc: w.$e.find('[name=cnc_kycnc]').val()}, function(rpta){
			}//if(!Sisem.isEmpty(w.$e.find('[name=prp_kyprp]').val())){
			else{Sisem.unblockW(w.$e);}
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
				
				letr.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				letr.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				letr.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
//		Sisem.activar(w.$e.find('[name=cnc_nomb]'), w.activar);
//		Sisem.activar(w.$e.find('[name=cnc_auto]'), w.activar);
//		Sisem.activar(w.$e.find('[name=cnc_audi]'), false);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'ltr','VALIDAR')){return false;}
		return true;
	},
	validarServidor: function(w, callback){
		var data=letr.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(letr.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
			}
			else if(rpta.msg.type=="error")
			{
				Sisem.msgBox(rpta.msg.type, rpta.msg.text);
				return callback(false);
			}
		});
	},	
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='LISTLETRA';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: letr.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+letr.tipPag[w.tipo]['name'],
			nameWP		: 'win'+letr.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+letr.tipPag[w.tipo]['name'],
			nameWI		: 'int'+letr.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+letr.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+letr.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+letr.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+letr.tipPag[w.tipo]['name']
		});
		letr.tipPagAct = w.tipo;
	},
	//////////////////
	//Metodhs Events//
	//////////////////
	btnAddClick: function(w){
		letr.winPop({
			modo:'AGREGAR',
			alb :w.alb,
			tipo: 'LISTLETRA',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});		
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			if(w.tipo == 'LISTLETRA')
			{
				Sisem.blockW(w.$e);
				var data={comando: 'AGREGAR', ltr_kycnc: w.$e.find('[name=cnc_kycnc]').val(), ltr_kyltr: '0', ltr_orde: w.$e.find('[name^=divContenedorLetra_]').length+1};
				Sisem.ejecutar('mus/CtrlLetra',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						rpta.ltr_dscr = '';
						rpta.ltr_tnta = 'S';
						$.extend(w, {letra: rpta});
						letr.agregarLetraHtml(w);						
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){	
			}
			else if(w.tipo == 'EDITLETRA')
			{
				$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
				letr.iniciarFormulario(w);
			}
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(letr.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=letr.obtenerDatoFormulario(w);
				Sisem.ejecutar('mus/CtrlLetra',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=ltr_kyltr]').val(rpta.ltr_kyltr);
						$.extend(w,{modo: 'VISUALIZAR'});
						letr.cerrarFormulario($.extend(w,{data : letr.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('adm/CtrlPropiedad',data, function(rpta){
			}//if(prop.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnAgregarNotaClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			Sisem.blockW(w.$e);
			
			var data={comando: 'AGREGAR', nta_kyltr: w.letraNota.nta_kyltr, nta_kynta: '0'};			
			Sisem.ejecutar('mus/CtrlLetra',data, function(rpta){
				if(rpta.msg.type=='success')
				{
					rpta.acr_nomb = '';
					$.extend(w, {fila: rpta});
					letr.agregarLetraHtml(w);
					
				}//if(rpta.msg.type=='success')
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){			
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			w.$e.parent().find('[name=etiModificar]').html('Cancelar');
			$( '[name=divContenedorListaLetras]' ).sortable({
				revert: true,
				cursor: 'move',
				items: '[name^=divContenedorLetra]',
				stop: function( event, ui){
					var ite = 0;
	    			var lisKySel = [];
					$( '[name^=divContenedorLetra]' ).each(function( key, val ) {
						ite++;
						$(this).attr('ltr_orde', ite);
						
						var dataLetr = $(this).data('data');
		    			lisKySel.push({ky: dataLetr.ltr_kyltr, ltr_orde: $(this).attr('ltr_orde')});
					});
					
					var data = {comando: 'MODIFICARVARIOS', lisKy: lisKySel};
					Sisem.ejecutar('mus/CtrlLetra',data, function(rpta){
						if(rpta.msg.type=='success')
						{
							Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						}//if(rpta.msg.type=='success')
					});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
				}
			});
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			w.$e.parent().find('[name=etiModificar]').html('Modificar');
			$( '[name=divContenedorListaLetras]' ).sortable('destroy');			
		}
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	agregarLetraHtml: function(w){
		var letra='';
		letra+='<div class="row ltr-sepa" name="divContenedorLetra_'+w.letra.ltr_kyltr+'" ltr_orde="'+w.letra.ltr_orde+'">';
			letra+='<div class="col-md-12 ltr-letra" name="divLetra_'+w.letra.ltr_kyltr+'">';
				letra+='<div class="input-group input-group-sm">';
					letra+='<span class="input-group-btn ltr-span">';
						letra+='<button name="btnEliminarLetra_'+w.letra.ltr_kyltr+'" title="EliminarLetra" class="btn btn-primary ltr-boton"><i class="fa fa-minus-square"></i></button>';
					letra+='</span>';
					letra+='<span class="input-group-btn ltr-span">';
						letra+='<button name="btnEditarLetra_'+w.letra.ltr_kyltr+'" title="Modificar" class="btn btn-primary ltr-boton"><i class="fa fa-pencil-square"></i></button>';
					letra+='</span>';
					letra+='<input name="ltr_kyltr" value="'+w.letra.ltr_kyltr+'" type="hidden"/>';
					letra+='<input name="ltr_tnta" value="'+w.letra.ltr_tnta+'" type="hidden"/>';
					letra+='<input name="ltr_dscr" style="text-transform: none;" value="'+w.letra.ltr_dscr+'" type="text" class="form-control ltr-texto" placeholder="Ingrese letra"/>';
				letra+='</div>';
			letra+='</div>';
      console.log(w.letra.ltr_tnta);
			if(w.letra.ltr_tnta=='S')
			{
				letra+='<div class="col-md-12 ltr-letra" name="divContenedorListaNota_'+w.letra.ltr_kyltr+'">';
				letra+='<div class="input-group input-group-sm">';
					letra+='<span class="input-group-btn ltr-span">';
						letra+='<button name="btnEliminarListaNota_'+w.letra.ltr_kyltr+'" class="btn btn-primary ltr-boton"><i class="fa fa-times-circle"></i></button>';	
					letra+='</span>';
					letra+='<span class="input-group-btn ltr-span">';
					letra+='<button name="btnAgregarNota_'+w.letra.ltr_kyltr+'" class="btn btn-primary ltr-boton"><i class="fa fa-music"></i></button>';
					letra+='</span>';
					letra+='<div class="form-control ltr-nota" name="divListaNota_'+w.letra.ltr_kyltr+'">';
					if( !jQuery.isEmptyObject(w.letra.listaNota) )
					{
						for(var keyNta in w.letra.listaNota)
						{
							var dataNota = w.letra.listaNota[keyNta];
							letra+='<a name="aNota_'+dataNota.nta_kynta+'" title="'+dataNota.nta_kynta+'" nta_ejex="'+dataNota.nta_ejex+'" href="javascript:void(0);" style="left: '+dataNota.nta_ejex+'px; position: absolute;">'+dataNota.acr_nomb+'</a>';
						}						
					}
					letra+='</div>';
				letra+='</div>';
			letra+='</div>';
			}//if(w.letra.ltr_tnta=='S')
		letra+='</div>';
		
		w.$e.find('[name=divContenedorListaLetras]').append(letra);
				
		w.$e.find('[name=divContenedorLetra_'+w.letra.ltr_kyltr+']').data('data', w.letra);
		
		w.$e.find('[name=btnEliminarLetra_'+w.letra.ltr_kyltr+']').on('click', function(){
			var $btnEliminarLetra = $(this);
			console.log($btnEliminarLetra.attr('title'));
			var dataLetr = $btnEliminarLetra.parents('[name^=divContenedorLetra]').data('data');
			if($btnEliminarLetra.attr('title') == 'EliminarLetra'){
				var resp = Sisem.msgAsk('Desea eliminar', dataLetr.ltr_dscr, function(rpta){
	    			if(rpta=='Si'){
		    			var lisKySel = [];
		    			lisKySel.push({ky: dataLetr.ltr_kyltr});
						var data = {comando: 'ELIMINAR', lisKy: lisKySel};
						Sisem.ejecutar('mus/CtrlLetra',data, function(rpta){
							if(rpta.msg.type=='success')
							{
								Sisem.msgBox(rpta.msg.type, rpta.msg.text);
								$btnEliminarLetra.parents('[name^=divContenedorLetra]').remove();
							}//if(rpta.msg.type=='success')
							Sisem.unblockW(w.$e);
						});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
	    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
				});				
			}//if($btnEliminarLetra.attr('title') == 'EliminarLetra'){
			if($btnEliminarLetra.attr('title') == 'EditarLetra'){
				var arrNota = dataLetr.ltr_dscr.split(':');
				if(arrNota[0].toUpperCase().trim()=='RASGUEO'){
					acrd.winSel({
						tipo:'ACRD',
						modo: 'SELECCIONAR',
						view: 'CATALOG', 
						showMenCtx: false, 
						showToolBar: true,
						autoWidth: false,
						tableWidth: '100%',
						ltr: {
							ltr_dscr: dataLetr.ltr_dscr
						},
						callback:function(dataAcrd){
						}
					});
				}//if(arrNota[0].toUpperCase()=='RASQUEO'){
				else
				{
					letr.winPop({
						ky: dataLetr.ltr_kyltr,
						modo:'MODIFICAR',
						ltr : dataLetr,
						tipo: 'EDITLETRA',
						size: 'short',
						callback:function(){

							$btnEliminarLetra.removeClass('btn-danger').addClass('btn-primary');
							$btnEliminarLetra.attr('title', 'EliminarLetra');
							$btnEliminarLetra.find('i').removeClass('fa-music').addClass('fa-minus-square');

							$btnEliminarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEditarLetra]').removeClass('btn-danger').addClass('btn-primary');
							$btnEliminarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEditarLetra]').attr('title', 'Modificar');
							$btnEliminarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEditarLetra]').find('i').removeClass('fa-save').addClass('fa-pencil-square');
							
							Sisem.activar($btnEliminarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]'), false);
							$btnEliminarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]').focus();
							
							if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
						}
					});
				}
			}
		});
		
		w.$e.find('[name=btnEditarLetra_'+w.letra.ltr_kyltr+']').on('click', function(){
			var $btnEditarLetra = $(this);
			var dataLetr = $btnEditarLetra.parents('[name^=divContenedorLetra_]').data('data');

			if($btnEditarLetra.attr('title')=="Modificar")
			{
				$btnEditarLetra.removeClass('btn-primary').addClass('btn-danger');
				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEliminarLetra]').removeClass('btn-primary').addClass('btn-danger');
				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEliminarLetra]').attr('title', 'EditarLetra');
				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEliminarLetra]').find('i').removeClass('fa-minus-square').addClass('fa-music');
				
				$btnEditarLetra.attr('title', 'Guardar');
				$btnEditarLetra.find('i').removeClass('fa-pencil-square').addClass('fa-save');
				Sisem.activar($btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]'), true);
				$btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]').focus();
				////////////////////////////////////
				//INICIO : EDITAR NOTAS MUSICALES //
				////////////////////////////////////
				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=aNota]').draggable({ containment: '[name^=divListaNota]', axis: 'x',
					stop: function(){
						if($(this).position().left <= 0)
						{
							var $aNota = $(this);
							var nta_kynta = $(this).attr('title'); 
							var resp = Sisem.msgAsk('Desea eliminar', $aNota.html(), function(rpta){
				    			if(rpta=='Si'){
					    			var lisKySel = [];
					    			lisKySel.push({ky: nta_kynta});
									var data = {comando: 'ELIMINAR', lisKy: lisKySel};
									Sisem.ejecutar('mus/CtrlNota',data, function(rpta){
										if(rpta.msg.type=='success')
										{
											Sisem.msgBox(rpta.msg.type, rpta.msg.text);
											$aNota.remove();
										}//if(rpta.msg.type=='success')
									});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
				    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
							});
						}//if($(this).position().left < 0)
					},
					drag: function() {
						$(this).attr('nta_ejex', $(this).position().left);
			        }
				});				
				/////////////////////////////////
				//FIN : EDITAR NOTAS MUSICALES //
				/////////////////////////////////
				
			}//if($btnEditarLetra.attr('title')=="Modificar")
			else if($btnEditarLetra.attr('title')=="Guardar")
			{
				$btnEditarLetra.removeClass('btn-danger').addClass('btn-primary');
				$btnEditarLetra.attr('title', 'Modificar');
				$btnEditarLetra.find('i').removeClass('fa-save').addClass('fa-pencil-square');

				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEliminarLetra]').removeClass('btn-danger').addClass('btn-primary');
				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEliminarLetra]').attr('title', 'EliminarLetra');
				$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=btnEliminarLetra]').find('i').removeClass('fa-music').addClass('fa-minus-square');

				Sisem.activar($btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]'), false);
				$btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]').focus();
				
   			var lisKySel = [];
				$.each( $btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=aNota]') , function( key, obj ) {
					lisKySel.push({nta_kynta: $(obj).attr('title'), nta_ejex: $(obj).attr('nta_ejex')});
				});
				var data={
					comando: 'MODIFICAR', 
					ltr_kycnc: $btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=cnc_kycnc]').val(), 
					ltr_kyltr: $btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_kyltr]').val(),
					ltr_dscr: $btnEditarLetra.parents('[name=divLetra_'+dataLetr.ltr_kyltr+']').find('[name=ltr_dscr]').val(),
					lisKy: lisKySel
				};
				Sisem.ejecutar('mus/CtrlLetra',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						$btnEditarLetra.parents('[name^=divContenedorLetra_]').find('[name^=aNota]').draggable('destroy');
					}//if(rpta.msg.type=='success')
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){			
			}
		});
		
		w.$e.find('[name=btnEliminarListaNota_'+w.letra.ltr_kyltr+']').on('click', function(){
			var $btnEliminarListaNota = $(this);
			var dataLetr = $btnEliminarListaNota.parents('[name^=divContenedorLetra_]').data('data');
			var resp = Sisem.msgAsk('Eliminar lista notas de ', dataLetr.ltr_dscr, function(rpta){
    			if(rpta=='Si'){
	    			var lisKySel = [];
					$.each( $btnEliminarListaNota.parents('[name^=divContenedorLetra_]').find('[name^=aNota]') , function( key, obj ) {
						lisKySel.push({ky: $(obj).attr('title')});
					});
					var data = {comando: 'ELIMINARLISTANOTA', lisKy: lisKySel, ltr_kyltr: dataLetr.ltr_kyltr};

					Sisem.ejecutar('mus/CtrlNota',data, function(rpta){
						if(rpta.msg.type=='success')
						{
							Sisem.msgBox(rpta.msg.type, rpta.msg.text);
							$btnEliminarListaNota.parents('[name^=divContenedorLetra_]').find('[name^=divContenedorListaNota]').remove();
						}//if(rpta.msg.type=='success')
						Sisem.unblockW(w.$e);
					});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
			});
		});
		
		w.$e.find('[name=btnAgregarNota_'+w.letra.ltr_kyltr+']').on('click', function(){
			var $btnAgregarNota = $(this);
			var dataLetr = $btnAgregarNota.parents('[name^=divContenedorLetra_]').data('data');

			acrd.winSel({
				tipo:'ACRD',
				modo: 'SELECCIONAR',
				view: 'CATALOG', 
				showMenCtx: false, 
				showToolBar: true,
				autoWidth: false,
				tableWidth: '100%',
				callback:function(dataAcrd){
					if($btnAgregarNota.parents('[name^=divContenedorLetra_]').find('[name^=btnEditarLetra]').attr('title')=="Modificar"){
						if(dataAcrd)
						{
							Sisem.blockW(w.$e);
							var dataNota = { comando: 'AGREGAR', nta_kyltr: dataLetr.ltr_kyltr, nta_kyacr: dataAcrd.acr_kyacr, acr_nomb: dataAcrd.acr_nomb};

							Sisem.ejecutar('mus/CtrlNota',dataNota, function(rpta){
								if(rpta.msg.type=='success')
								{
	    							var $divListaNota = $btnAgregarNota.parents('[name^=divContenedorLetra]').find('[name^=divListaNota]');
									$divListaNota.append('<a name="aNota_'+rpta.nta_kynta+'" title="'+rpta.nta_kynta+'" nta_ejex="0" href="javascript:void(0);">'+dataNota.acr_nomb+'</a>');

								}//if(rpta.msg.type=='success')
								Sisem.unblockW(w.$e);
							});//Sisem.ejecutar('mus/CtrlAcorde',data, function(rpta){
						}					
					}
					if($btnAgregarNota.parents('[name^=divContenedorLetra_]').find('[name^=btnEditarLetra]').attr('title')=="Guardar"){
						$btnAgregarNota.parents('[name^=divContenedorLetra_]').find('[name=ltr_dscr]').val($btnAgregarNota.parents('[name^=divContenedorLetra_]').find('[name=ltr_dscr]').val()+'-'+dataAcrd.acr_dscr);
						
					}
				}//callback:function(dataAcrd){
			});//acrd.winSel({
		});
	}	
};