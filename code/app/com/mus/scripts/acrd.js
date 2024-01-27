var acrd = {
	pag:{
		alias		: 'Acorde',
		nameWB		: 'brwAcorde',
		nameWP		: 'winAcorde',
		nameWS		: 'selAcorde',
		nameWI		: 'intAcorde',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwAcorde',
		idGridWP	: 'idWinAcorde',
		idGridWS	: 'idSelAcorde',
		idGridWI	: 'idIntAcorde'
	},
	tipPag: {
		"ACRD":{'name': 'Acorde', 'alias': 'Acorde general'}
	},
	tipPagAct: '',
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:[]}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		acrd.winBrow(w);
	},
	winBrow : function(w){
		acrd.import(function(){
			if(w==null)w=new Object;
			acrd.setPagina(w);
			acrd[w.pag.nameWB] = w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					acrd.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth:false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//acrd.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		acrd.import(function(){
			if(w==null)w=new Object;
			acrd.setPagina(w);
			acrd[w.pag.nameWP] = w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:260,
				height:350,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP+'&dispositivo='+Sisem.dispositivo(),
				modal:false,
				buttons : [
					{
						html : "<span name='etiAgregar'>Agregar</span>",
						class : "btn btn-primary",
						name : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							acrd.btnAgregarClick(w);
						}
					},{
						html : "<span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							acrd.btnModificarClick(w);
						}
					},{
						html : "<span name='etiLimpiar'>Limpiar</span>",
						class : "btn btn-primary",
						name : "btnLimpiar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							acrd.btnLimpiarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					var lienzo = document.createElement('canvas');
					document.getElementById("divAcorde").appendChild(lienzo);
					lienzo.setAttribute('name', 'cnvAcorde');
					lienzo.setAttribute('id', 'cnvAcorde');
					acrd.acorde = new Acorde(lienzo);
					acrd.acorde.lienzo.addEventListener('click', function(event){
						acrd.acorde.pintarTraste(event, w.$e.find('[name=acr_capo]').val(), w.$e.find('[name=acr_tras]').val());
					});					

					Sisem.activar(w.$e.parent().find('[name=btnLimpiar]'), true, 'ROJO');

					w.$e.find('[name=acr_vers]').change(function(event){
						
						Sisem.ejecutar('mus/GetListaAcorde',{acr_nota: w.$e.find('[name=acr_nota]').val(), acr_tono: w.$e.find('[name=acr_tono]').val(), acr_vers: w.$e.find('[name=acr_vers]').val()}, function(rpta){
							if(rpta.lista.items.length > 0)
							{
								var acr = rpta.lista.items[0];

								w.$e.find('[name=acr_kyacr]').val(acr.acr_kyacr);
								w.$e.find('[name=acr_nomb]').val(acr.acr_nomb);
								w.$e.find('[name=acr_dscr]').val(acr.acr_dscr);
								w.$e.find('[name=acr_nota]').val(acr.acr_nota);
								w.$e.find('[name=acr_tono]').val(acr.acr_tono);
								w.$e.find('[name=acr_inst]').val(acr.acr_inst);
								w.$e.find('[name=acr_foto]').val(acr.acr_foto);
								w.$e.find('[name=acr_capo]').val(acr.acr_capo);
								w.$e.find('[name=acr_tras]').val(acr.acr_tras);
								w.$e.find('[name=acr_trsa]').val(acr.acr_trsa);
								w.$e.find('[name=acr_trsb]').val(acr.acr_trsb);
								w.$e.find('[name=acr_trsc]').val(acr.acr_trsc);
								w.$e.find('[name=acr_trsd]').val(acr.acr_trsd);
								w.$e.find('[name=acr_trse]').val(acr.acr_trse);
								w.$e.find('[name=acr_trsx]').val(acr.acr_trsx);
								w.$e.find('[name=acr_vers]').val(acr.acr_vers);
								w.$e.find('[name=old_vers]').val(acr.acr_vers);
								
								acrd.acorde.ubicarPuntosAcorde(acr.acr_capo, acr.acr_tras, acr.acr_trsx, acr.acr_trsa, acr.acr_trsb, acr.acr_trsc, acr.acr_trsd, acr.acr_trse);
							}//if(rpta.lista.items.length > 0)
							else
							{
								w.$e.find('[name=acr_vers]').val(w.$e.find('[name=old_vers]').val());
							}
							Sisem.unblockW(w.$e);
						});//Sisem.ejecutar('GetListaAcorde',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
					});
					
					w.$e.find('[name=acr_inst],[name=acr_nota],[name=acr_tono],[name=acr_capo]').change(function(event){
						alert('UNO : ' + w.$e.find('[name=acr_nota]').val());
						w.$e.find('[name=acr_nomb]').val( w.$e.find('[name=acr_nota]').val() + w.$e.find('[name=acr_tono]').val() );
						w.$e.find('[name=acr_dscr]').val( w.$e.find('[name=acr_nota]').val() + w.$e.find('[name=acr_tono]').val() + w.$e.find('[name=acr_vers]').val() );
					});					
					
					w.$e.find('[name=acr_tono]').css('text-transform','none');
					
					acrd.iniciarFormulario(w);
					Sisem.validarControlesColor(w.$e,'acr',w.modo);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//acrd.import(function(){
	},
	winSel:function(w){
		acrd.import(function(){
			if(w==null)w=new Object;
			acrd.setPagina(w);
			acrd[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:770,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
//				buttons : [				
//					{
//						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
//						class : "btn btn-success",
//						click : function() {
//							if(w.modo=='VISUALIZAR'){
//								acrd.cerrarFormulario(w);
//							}else{
//								if(w.$e.find('[name=grid] .highlights').length>0){
//										var data = new Object();
//										if(w.$e.find('[name=grid] .highlights').length>1)
//										{
//											data.items = [];
//											for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
//											{
//												data.items.push(w.$e.find('[name=grid] .highlights').eq(ite).data('data'));
//											}//for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
//										}//if(w.$e.find('[name=grid] .highlights').length==1){
//										else if(w.$e.find('[name=grid] .highlights').length==1)
//										{
//											data = w.$e.find('[name=grid] .highlights').data('data');
//										}
//										acrd.cerrarFormulario($.extend(w, {data: data}));
//								}else{
//									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
//								}						
//							}
//						}
//					},{
//						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
//						"class" : "btn btn-danger",
//						click : function() {
//							acrd.cerrarFormulario(w);
//						}
//					}
//				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					acrd.iniciarBrowse($.extend(w,{idGrid:acrd.pag.idGridWS, showMenCtx: true, showToolBar: true, multiSelect: false}));	
					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//acrd.import(function(){
	},		
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['mus/ctg_acrd']}, function(rpta){
			if(rpta){ctg_acrd.ejecutar($.extend(w,{modulo:'controllers', archivo: 'mus/ctg_acrd'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){acrd.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){acrd.llenarFormulario(w);}
		acrd.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=acr_kyltr]').val('');
		w.$e.find('[name=acr_nomb]').val('');
//		w.$e.find('[name=acr_nota]').val('');
//		w.$e.find('[name=acr_tono]').val('');
//		w.$e.find('[name=acr_inst]').val('');
		w.$e.find('[name=acr_foto]').val('');
		w.$e.find('[name=acr_capo]').val('0');
		w.$e.find('[name=acr_tras]').val('0');
		w.$e.find('[name=acr_trsa]').val('0');
		w.$e.find('[name=acr_trsb]').val('0');
		w.$e.find('[name=acr_trsc]').val('0');
		w.$e.find('[name=acr_trsd]').val('0');
		w.$e.find('[name=acr_trse]').val('0');
		w.$e.find('[name=acr_trsx]').val('0');
		w.$e.find('[name=acr_vers]').val('1');
		w.$e.find('[name=old_vers]').val('1');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			acr_kyacr: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=acr_kyacr]').val())
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=acr_kyacr]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=acr_kyacr]').val())){
			Sisem.ejecutar('mus/GetListaAcorde',{acr_kyacr: w.$e.find('[name=acr_kyacr]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var acr = rpta.lista.items[0];

					w.$e.find('[name=acr_kyacr]').val(acr.acr_kyacr);
					w.$e.find('[name=acr_nomb]').val(acr.acr_nomb);
					w.$e.find('[name=acr_dscr]').val(acr.acr_dscr);
					w.$e.find('[name=acr_nota]').val(acr.acr_nota);
					w.$e.find('[name=acr_tono]').val(acr.acr_tono);
					w.$e.find('[name=acr_inst]').val(acr.acr_inst);
					w.$e.find('[name=acr_foto]').val(acr.acr_foto);
					w.$e.find('[name=acr_capo]').val(acr.acr_capo);
					w.$e.find('[name=acr_tras]').val(acr.acr_tras);
					w.$e.find('[name=acr_trsa]').val(acr.acr_trsa);
					w.$e.find('[name=acr_trsb]').val(acr.acr_trsb);
					w.$e.find('[name=acr_trsc]').val(acr.acr_trsc);
					w.$e.find('[name=acr_trsd]').val(acr.acr_trsd);
					w.$e.find('[name=acr_trse]').val(acr.acr_trse);
					w.$e.find('[name=acr_trsx]').val(acr.acr_trsx);
					w.$e.find('[name=acr_vers]').val(acr.acr_vers);
					w.$e.find('[name=old_vers]').val(acr.acr_vers);
					
					acrd.acorde.ubicarPuntosAcorde(acr.acr_capo, acr.acr_tras, acr.acr_trsx, acr.acr_trsa, acr.acr_trsb, acr.acr_trsc, acr.acr_trsd, acr.acr_trse);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('GetListaAcorde',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=prp_kyprp]').val())){
		else{Sisem.unblockW(w.$e);}
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
				
				acrd.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				acrd.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				acrd.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		Sisem.activar(w.$e.find('[name=acr_kyacr]'), w.activar);
		Sisem.activar(w.$e.find('[name=acr_nomb]'), false);
		Sisem.activar(w.$e.find('[name=acr_dscr]'), false);
		Sisem.activar(w.$e.find('[name=acr_inst]'), w.activar);
		Sisem.activar(w.$e.find('[name=acr_nota]'), w.activar);
		Sisem.activar(w.$e.find('[name=acr_tono]'), w.activar);
		Sisem.activar(w.$e.find('[name=acr_capo]'), w.activar);
		Sisem.activar(w.$e.find('[name=acr_tras]'), w.activar);
		Sisem.activar(w.$e.find('[name=acr_vers]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'acr','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='NOTA'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: acrd.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+acrd.tipPag[w.tipo]['name'],
			nameWP		: 'win'+acrd.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+acrd.tipPag[w.tipo]['name'],
			nameWI		: 'int'+acrd.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+acrd.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+acrd.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+acrd.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+acrd.tipPag[w.tipo]['name']
		});
		acrd.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////
    btnAddClick: function(w){
        acrd.winPop({
            tipo: w.tipo,
            modo:'AGREGAR',
            callback:function(){
                if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
            }
        });
    },
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			acrd.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(acrd.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var files = Array();
//				var archivos = Sisem.dataURItoBlob(acrd.acorde.lienzo.toDataURL("image/png"));
//				files.push(archivos)
				
				w.$e.find('[name=acr_foto]').val(w.$e.find('[name=acr_nota]').val().toLowerCase()+'_'+w.$e.find('[name=acr_tono]').val().toLowerCase()+'_'+w.$e.find('[name=acr_vers]').val()+'.png');
				var data=acrd.obtenerDatoFormulario(w);
				Sisem.ejecutar('mus/CtrlAcorde',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=acr_kyacr]').val(rpta.acr_kyacr);
						$.extend(w,{modo: 'VISUALIZAR'});
						acrd.cerrarFormulario($.extend(w,{data : acrd.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('mus/CtrlAcorde',data, function(rpta){
			}//if(acrd.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			acrd.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			acrd.iniciarFormulario(w);
		}
	},
	btnLimpiarClick: function(w){
		var resp = Sisem.msgAsk('Desea limpiar', 'Acorde', function(rpta){
			if(rpta=='Si'){
				acrd.acorde.borrarLienzo();
			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
		});
	},
	////////////////////////
	//Metodhs varios      //
	////////////////////////
	acorde: null,
};

function Acorde(parLienzo){
	
	this.lienzo = parLienzo;
	this.lienzo.width = 170;
	this.lienzo.height = 120;
	this.lienzo.style.border = '1px solid';
//	lienzo.autoScale();
	this.contexto = this.lienzo.getContext("2d");
	this.canvasLimites = this.lienzo.getBoundingClientRect();
//	lienzo.addEventListener('mousedown',cambiarEstado,false);
//	lienzo.addEventListener('mouseup',cambiarEstado,false);
//	lienzo.addEventListener('mousemove',pintarLinea,false);
	this.lienzo.style.cursor="pointer";
	this.capo = 0;
	this.tras = 0;
	this.cuad = new Cuadricula(this);
	this.trsx = new Traste(this, "black");
	this.trsa = new Traste(this, "black");
	this.trsb = new Traste(this, "black");
	this.trsc = new Traste(this, "black");
	this.trsd = new Traste(this, "black");
	this.trse = new Traste(this, "black");
	this.pintarTraste =  function(event, capo, tras){
		this.capo = capo;
		this.tras = tras;
		var coordenadas=this.obtenerCoordenadas(event);
		this.ubicarPuntosPisada(coordenadas.x, coordenadas.y);
	};
	
	this.obtenerCoordenadas = function(event){
		var posX;
		var posY;
		this.canvasLimites = this.lienzo.getBoundingClientRect();
		if (event.pageX || event.pageY) {
			posX = event.pageX - this.canvasLimites.left;
			posY = event.pageY - this.canvasLimites.top;
		}else{
			posX = event.clientX - this.canvasLimites.left;
			posY = event.clientY - this.canvasLimites.top;
		}
//		console.log('event.pageX : '+event.pageX+' event.pageY : '+event.pageY);
//		console.log('cvLim.left : '+this.canvasLimites.left+' cvLim.top : '+this.canvasLimites.top);
		console.log('posX : '+posX+' posY : '+posY);
		return {x:posX,
			y:posY
		};
	};

	this.obtenerDatoTraste = function(parX, parY, parTipo){
		var posicionAcordes = {
			0: {
				1: {posx: 25, posy: 3},
				2: {posx: 55, posy: 3},
				3: {posx: 85, posy: 3},
				4: {posx: 115, posy: 3},
				5: {posx: 145, posy: 3}
			},
			1: {
				1: {posx: 25, posy: 10},
				2: {posx: 55, posy: 10},
				3: {posx: 85, posy: 10},
				4: {posx: 115, posy: 10},
				5: {posx: 145, posy: 10}
			},
			2: {
				1: {posx: 25, posy: 35},
				2: {posx: 55, posy: 35},
				3: {posx: 85, posy: 35},
				4: {posx: 115, posy: 35},
				5: {posx: 145, posy: 35}
			},
			3: {
				1: {posx: 25, posy: 60},
				2: {posx: 55, posy: 60},
				3: {posx: 85, posy: 60},
				4: {posx: 115, posy: 60},
				5: {posx: 145, posy: 60}
			},
			4: {
				1: {posx: 25, posy: 85},
				2: {posx: 55, posy: 85},
				3: {posx: 85, posy: 85},
				4: {posx: 115, posy: 85},
				5: {posx: 145, posy: 85}
			},
			5: {
				1: {posx: 25, posy: 110},
				2: {posx: 55, posy: 110},
				3: {posx: 85, posy: 110},
				4: {posx: 115, posy: 110},
				5: {posx: 145, posy: 110}
			}
		}
		
		for (var keyCuerda in posicionAcordes) 
		{
			for (var keyTraste in posicionAcordes[keyCuerda])
			{
				switch(parTipo)
				{
					case 'ACORDE':
						if(keyCuerda == parX && keyTraste == parY)
						{
							return {cuerda: keyCuerda, traste: keyTraste, posx: posicionAcordes[keyCuerda][keyTraste].posx, posy: posicionAcordes[keyCuerda][keyTraste].posy, capo: this.capo, tras: this.tras};
						}						
					break;
					case 'PISADA':
						if( ( parX >= posicionAcordes[keyCuerda][keyTraste].posx-15 && parX <= posicionAcordes[keyCuerda][keyTraste].posx + 15 && parY >= posicionAcordes[keyCuerda][keyTraste].posy-5 && parY <= posicionAcordes[keyCuerda][keyTraste].posy + 5 ) ||
							( parX >= posicionAcordes[keyCuerda][keyTraste].posx-15 && parX <= posicionAcordes[keyCuerda][keyTraste].posx + 15 && parY >= posicionAcordes[keyCuerda][keyTraste].posy-2 && parY <= posicionAcordes[keyCuerda][keyTraste].posy + 2 )
						)
						{
							return {cuerda: keyCuerda, traste: keyTraste, posx: posicionAcordes[keyCuerda][keyTraste].posx, posy: posicionAcordes[keyCuerda][keyTraste].posy, capo: this.capo, tras: this.tras};
						}
					break;
				}
			}//for (var keyTraste in posicionAcordes[keyCuerda])
		}//for (var keyCuerda in posicionAcordes)
	};
	
	this.borrarLienzo = function(){
		this.cuad.dibujar();
		this.trsx.reiniciar();
		this.trsa.reiniciar();
		this.trsb.reiniciar();
		this.trsc.reiniciar();
		this.trsd.reiniciar();
		this.trse.reiniciar();
		
		$('[name=acr_capo]').val('0');
		$('[name=acr_tras]').val('0');
		$('[name=acr_trsa]').val('0');
		$('[name=acr_trsb]').val('0');
		$('[name=acr_trsc]').val('0');
		$('[name=acr_trsd]').val('0');
		$('[name=acr_trse]').val('0');
		$('[name=acr_trsx]').val('0');		
	};
	
	this.ubicarPuntosAcorde = function(capo, tras, trsx, trsa, trsb, trsc, trsd, trse)
	{
		this.capo = capo;
		this.tras = tras;
		this.cuad.dibujar();
		this.trsx.dibujar(this.obtenerDatoTraste(0, trsx, 'ACORDE'));
		this.trsa.dibujar(this.obtenerDatoTraste(1, trsa, 'ACORDE'));
		this.trsb.dibujar(this.obtenerDatoTraste(2, trsb, 'ACORDE'));
		this.trsc.dibujar(this.obtenerDatoTraste(3, trsc, 'ACORDE'));
		this.trsd.dibujar(this.obtenerDatoTraste(4, trsd, 'ACORDE'));
		this.trse.dibujar(this.obtenerDatoTraste(5, trse, 'ACORDE'));		
	};
	
	this.ubicarPuntosPisada = function(posx, posy)
	{
		this.cuad.dibujar();

		var objTrs = this.obtenerDatoTraste(posx, posy, 'PISADA');

		if( typeof objTrs != 'undefined' && objTrs.cuerda == 0)
		{
			this.trsx.dibujar(objTrs);
			this.trsa.dibujar(null);
			this.trsb.dibujar(null);
			this.trsc.dibujar(null);
			this.trsd.dibujar(null);
			this.trse.dibujar(null);
		}
		else if( typeof objTrs != 'undefined' && objTrs.cuerda == 1)
		{
			this.trsx.dibujar(null);
			this.trsa.dibujar(objTrs);
			this.trsb.dibujar(null);
			this.trsc.dibujar(null);
			this.trsd.dibujar(null);
			this.trse.dibujar(null);
		}
		else if( typeof objTrs != 'undefined' && objTrs.cuerda == 2)
		{
			this.trsx.dibujar(null);
			this.trsa.dibujar(null);
			this.trsb.dibujar(objTrs);			
			this.trsc.dibujar(null);
			this.trsd.dibujar(null);
			this.trse.dibujar(null);
		}
		else if( typeof objTrs != 'undefined' && objTrs.cuerda == 3)
		{			
			this.trsx.dibujar(null);
			this.trsa.dibujar(null);
			this.trsb.dibujar(null);
			this.trsc.dibujar(objTrs);
			this.trsd.dibujar(null);
			this.trse.dibujar(null);
		}
		else if( typeof objTrs != 'undefined' && objTrs.cuerda == 4)
		{
			this.trsx.dibujar(null);
			this.trsa.dibujar(null);
			this.trsb.dibujar(null);
			this.trsc.dibujar(null);
			this.trsd.dibujar(objTrs);
			this.trse.dibujar(null);
		}
		else if( typeof objTrs != 'undefined' && objTrs.cuerda == 5)
		{
			this.trsx.dibujar(null);
			this.trsa.dibujar(null);
			this.trsb.dibujar(null);
			this.trsc.dibujar(null);
			this.trsd.dibujar(null);
			this.trse.dibujar(objTrs);
		}
		else
		{
			this.trsx.dibujar(null);
			this.trsa.dibujar(null);
			this.trsb.dibujar(null);
			this.trsc.dibujar(null);
			this.trsd.dibujar(null);
			this.trse.dibujar(null);
		}
	};
}

function Traste(acorde, color) {
	this.cuerda = -1;
	this.traste = -1;
	this.posx = 0;
	this.posy = 0;
	this.radio = 6;
	this.color = color;
	this.capo = 0;
	this.tras = 0
	this.acorde = acorde;
	this.reiniciar = function() {
		this.cuerda = -1;
		this.traste = -1;
		this.posx = 0;
		this.posy = 0;
		this.capo = 0;
		this.tras = 0;
		
	}//this.reiniciar = function() {	
	this.dibujar = function(objPos) {
		if( ( objPos != null ) )
		{
			this.cuerda = objPos.cuerda;
			this.traste = ( ( typeof objPos.traste == 'undefined' ) ? this.traste : objPos.traste );
			this.capo = ( ( typeof objPos.capo == 'undefined' ) ? this.capo : objPos.capo );
			this.tras = ( ( typeof objPos.tras == 'undefined' ) ? this.tras : objPos.tras );
			this.posx = objPos.posx;
			this.posy = objPos.posy;
		}
		//===============
		//DIBUJAR CIRCULO
		//===============
		if(this.cuerda > 0 && this.posx > 0 && this.posy > 0 )
		{
			this.acorde.contexto.beginPath();
			this.acorde.contexto.arc(this.posx, this.posy, this.radio, 0, Math.PI * 2);
			this.acorde.contexto.fillStyle = this.color;
			this.acorde.contexto.fill();
			
			this.acorde.contexto.font = "normal normal normal 10px Verdana";
			this.acorde.contexto.fillStyle = "white";
			this.acorde.contexto.fillText(parseInt(this.tras)+parseInt(this.traste), this.posx-3, this.posy+3);
//			console.log('tras : '+this.tras+' traste : '+this.traste);
		}
		//===============
		//DIBUJAR TRASTE
		//===============
		else if(this.cuerda == 0 && this.posx > 0 && parseInt(this.capo) > 0 )
		{
			this.acorde.contexto.beginPath();
			
			this.acorde.contexto.arc(this.posx, 10, 6, 0, Math.PI * 2);
			this.acorde.contexto.fillStyle = this.color;
			this.acorde.contexto.fill();
			
			this.acorde.contexto.fillStyle = this.color;
			this.acorde.contexto.fillRect(this.posx-6, 10, 12, 100);
			
			this.acorde.contexto.font = "normal normal bold 14px Verdana";
			this.acorde.contexto.fillStyle = "white";
			this.acorde.contexto.fillText(this.capo, this.posx-5, 60+5);
			
			this.acorde.contexto.arc(this.posx, 110, 6, 0, Math.PI * 2);
			this.acorde.contexto.fillStyle = this.color;
			this.acorde.contexto.fill();			
		}
		if(this.cuerda==0)
		{
			$('[name=acr_trsx]').val(this.traste);			
		}
		if(this.cuerda==1)
		{
			$('[name=acr_trsa]').val(this.traste);			
		}
		if(this.cuerda==2)
		{
			$('[name=acr_trsb]').val(this.traste);			
		}
		if(this.cuerda==3)
		{
			$('[name=acr_trsc]').val(this.traste);			
		}
		if(this.cuerda==4)
		{
			$('[name=acr_trsd]').val(this.traste);			
		}
		if(this.cuerda==5)
		{
			$('[name=acr_trse]').val(this.traste);			
		}
	}//this.dibujar = function(objPos) {
}//function Traste(radio, color) {

function Cuadricula(acorde) {
	this.acorde = acorde;
	this.dibujar = function(){
		this.acorde.contexto.clearRect(0, 0, acorde.lienzo.width, acorde.lienzo.height);
		
		this.acorde.contexto.beginPath();
		
		this.acorde.contexto.rect(10, 10, 30, 25);
		this.acorde.contexto.rect(40, 10, 30, 25);
		this.acorde.contexto.rect(70, 10, 30, 25);
		this.acorde.contexto.rect(100, 10, 30, 25);
		this.acorde.contexto.rect(130, 10, 30, 25);
		
		this.acorde.contexto.rect(10, 35, 30, 25);
		this.acorde.contexto.rect(40, 35, 30, 25);
		this.acorde.contexto.rect(70, 35, 30, 25);
		this.acorde.contexto.rect(100, 35, 30, 25);
		this.acorde.contexto.rect(130, 35, 30, 25);
		
		this.acorde.contexto.rect(10, 60, 30, 25);
		this.acorde.contexto.rect(40, 60, 30, 25);
		this.acorde.contexto.rect(70, 60, 30, 25);
		this.acorde.contexto.rect(100, 60, 30, 25);
		this.acorde.contexto.rect(130, 60, 30, 25);
		
		this.acorde.contexto.rect(10, 85, 30, 25);
		this.acorde.contexto.rect(40, 85, 30, 25);
		this.acorde.contexto.rect(70, 85, 30, 25);
		this.acorde.contexto.rect(100, 85, 30, 25);
		this.acorde.contexto.rect(130, 85, 30, 25);
		
		this.acorde.contexto.fillStyle = 'red';
		this.acorde.contexto.fillRect(10, 0, 30, 5);
		
		this.acorde.contexto.fillStyle = 'green';
		this.acorde.contexto.fillRect(40, 0, 30, 5);
		
		this.acorde.contexto.fillStyle = 'blue';
		this.acorde.contexto.fillRect(70, 0, 30, 5);
		
		this.acorde.contexto.fillStyle = 'gray';
		this.acorde.contexto.fillRect(100, 0, 30, 5);

		this.acorde.contexto.fillStyle = 'black';
		this.acorde.contexto.fillRect(130, 0, 30, 5);
		
		this.acorde.contexto.stroke();		
	}
	this.dibujar();
}

