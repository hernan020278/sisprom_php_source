var ayuda = {
	pag:{
		alias		: 'Ayuda',
		nameWB		: 'brwAyuda',
		nameWP		: 'winAyuda',
		nameWS		: 'selAyuda',
		nameWI		: 'intAyuda',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwAyuda',
		idGridWP	: 'idWinAyuda',
		idGridWS	: 'idSelAyuda',
		idGridWI	: 'idIntAyuda'
	},
	tipPag: {
		"AYUD":{'name': 'Ayuda', 'alias': 'Ayuda Sistema'}
	},
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/poli']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		ayuda.winBrow(w);
	},
	winBrow : function(w){
		ayuda.import(function(){
			if(w==null)w=new Object;
			ayuda.setPagina(w);
			ayuda[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$exploradorMenu = $('#left-panel');
					w.$e = $('#mainPanel');
					ayuda.clickLinkListener($exploradorMenu);
					
//					$exploradorMenu.find('[name="divAyuda"]').find('[name=aPolitica]').on('click',function(event)
//                    {
//						var tmp_link = ( $(this).attr('pol_hijo')!='' ? $(this).attr('pol_hijo') : $(this).attr('pol_link') )
//						$(this).attr('pol_hijo', '');
//						
//						var pol = {pol_kypol: $(this).attr('pol_kypol'), pol_link: tmp_link, pol_dscr: $(this).attr('pol_dscr'), pol_tipo: $(this).attr('pol_tipo')};
//						if(pol.pol_link.trim()!="")
//						{
//	            			var data = {modulo:'ayuda', listaArchivo: [pol.pol_link]};
//	            			Sisem.fileExist(data, function(rpta){
//	            				if(rpta.msg.type=='success')
//	            				{
//	    							console.log('CLICK EN SPAN POLITICA PARA CARGAR HTML - winBrow');
//	    							if(pol.pol_tipo=='LINK')
//	    							{
//	    								var agregarHistorial = true;
//	    								for(var ite = 0; ite < listaHistorial.length; ite++){
//	    									if(listaHistorial[ite].pol_link == pol.pol_link)
//	    									{
//	    										agregarHistorial = false;
//	    		    							break;
//	    									}
//	    								}
//	    								if(agregarHistorial)
//	    								{
//    		    							listaHistorial.push(pol);
//    		    							ayuda.llenarHistorial(w);
//	    								}
//	    							}
//	    							else if(pol.pol_tipo=='MENU')
//	    							{
//	    								listaHistorial = Array();
//	    								$('[name=ulListaHistorial]').empty();
//	    							}
//	    							ayuda.winInt({
//	    								cntInt: 'divContenido',
//	    								tipo: 'AYUD',
//	    								size: 'short',
//	    								enlace: pol.pol_link,
//	    								callback:function(data){
//	    									//console.log('abriendo oper.interior ' + data);
//	    								}
//	    							});
//	            				}//if(rpta.msg.type=='success')
//	            			});//Sisem.fileExist(data, function(rpta){
//						}//if(pol_link.trim()!="")
//                    });//$exploradorMenu.find('[name="divAyuda"]').find('[name=aPolitica]').on('click',function(event)

					$('a[href^="#"], area[href^="#"]').click(function() {
						var destino = $(this.hash);
						if (destino.length == 0) {
							destino = $('a[name="' + this.hash.substr(1) + '"]');
						}
						if (destino.length == 0) {
							destino = $('html');
						}
						$('html, body').animate({ scrollTop: destino.offset().top-50 }, 500);
						return false;
					});
					if( $.isFunction(w.callback) ){ w.callback(); }
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//ayuda.import(function(){
	},
	winInt:function(w){
		ayuda.import(function(){
			if(w==null)w=new Object;
			ayuda.setPagina(w);
			ayuda[w.pag.nameWI] = w;
			w.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWI+'&size='+((w.size)?w.size:'large')+'&dispositivo='+Sisem.dispositivo()+'&enlace='+w.enlace,
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);

					w.$e.find('a[name=aAbrirArchivoLocal], area[name=aAbrirArchivoLocal]').on('click', function(){
						Sisem.ejecutar('cmn/CtrlAyuda',{archivo_local: $(this).attr('archivo_local'), comando: 'ABRIRARCHIVOLOCAL'}, function(rpta){
						});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
					});
					
					ayuda.clickLinkListener(w.$e);
					w.$e.find('[name=paginaNombre]').html(w.descripcion + ' - ' + w.enlace);
//					w.$e.find('a[name=aPolitica], area[name=aPolitica]').on('click', function(){
//						var pol = {pol_kypol: $(this).attr('pol_kypol'), pol_link: $(this).attr('pol_link'), pol_dscr: $(this).attr('pol_dscr'), pol_tipo: $(this).attr('pol_tipo')};
//						if(pol.pol_link.trim()!="")
//						{
//	            			var data = {modulo:'ayuda', listaArchivo: [pol.pol_link]};
//	            			Sisem.fileExist(data, function(rpta){
//	            				if(rpta.msg.type=='success')
//	            				{
//	    							console.log('CLICK EN SPAN POLITICA PARA CARGAR HTML - winInt');
//	    							if(pol.pol_tipo=='LINK')
//	    							{
//	    								var agregarHistorial = true;
//	    								for(var ite = 0; ite < listaHistorial.length; ite++){
//	    									if(listaHistorial[ite].pol_link == pol.pol_link)
//	    									{
//	    										if( (ite+1) < listaHistorial.length)
//	    										{
//	    											listaHistorial = listaHistorial.slice(0, ite);	
//	    										}
//	    										agregarHistorial = false;
//	    		    							break;
//	    									}
//	    								}
//	    								if(agregarHistorial)
//	    								{
//    		    							listaHistorial.push(pol);
//    		    							ayuda.llenarHistorial(w);	    									
//	    								}
//	    							}
//	    							else if(pol.pol_tipo=='MENU')
//	    							{
//	    								listaHistorial = Array();
//	    								$('[name=ulListaHistorial]').empty();
//	    							}
//	    							console.log(pol);
//	    							console.log(listaHistorial);	    							
//	    							ayuda.winInt({
//	    								cntInt: 'divContenido',
//	    								tipo: 'AYUD',
//	    								size: 'short',
//	    								enlace: pol.pol_link,
//	    								callback:function(data){
//	    									//console.log('abriendo oper.interior ' + data);
//	    								}
//	    							});
//	            				}//if(rpta.msg.type=='success')
//	            			});//Sisem.fileExist(data, function(rpta){
//						}//if(pol_link.trim()!="")
//						if(pol.pol_tipo!='MENU')
//						{
//							$exploradorMenu.find('[name="divAyuda"]').find('[name=aPolitica]').each(function (index, ele) {
//								var encontroOpcion = false;
//								if( $(ele).attr('pol_link') )
//								{
//									if( pol.pol_link == $(ele).attr('pol_link') )
//									{
//										encontroOpcion = true;
//									}
//									else if( pol.pol_link.startsWith($(ele).attr('pol_link')) )
//									{
//										encontroOpcion = true;
//									}
//									if(encontroOpcion)
//									{
//									    $(ele).parents('ul').css('display','block');
//									    $(ele).closest('li').removeClass('active').addClass('active');
//									    $(ele).closest('li').parents('li').removeClass('active open').addClass('active open');
//									    return false;
//									}
//								}
//							});        								
//						}//if(pol_menu!='SI')						
//					});//w.$e.find('a[name=aPolitica]').on('click', function(){
					
					$('a[href^="#"], area[href^="#"]').click(function() {
						var destino = $(this.hash);
						if (destino.length == 0) {
							destino = $('a[name="' + this.hash.substr(1) + '"]');
						}
						if (destino.length == 0) {
							destino = $('html');
						}
						$('html, body').animate({ scrollTop: destino.offset().top-60 }, 500);
						return false;
					});					
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//ayuda.import(function(){
	},	
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		var archivo='brw_poli';
		Sisem.import({modulo:'browse', listaArchivo: [archivo]}, function(rpta){
			if(rpta){brw_poli.ejecutar($.extend(w,{modulo:'controllers', archivo: archivo}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){ayuda.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){ayuda.llenarFormulario(w);}
		ayuda.refrescarFormulario(w);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=pol_kypol]').val('');

		w.$e.find('[name=pdr_nomb]').val((typeof w.pdr!='undefined')?w.pdr.pol_nomb:'');
		w.$e.find('[name=pdr_dscr]').val((typeof w.pdr!='undefined')?w.pdr.pol_dscr:'');
		w.$e.find('[name=pol_kypdr]').val((typeof w.pol!='undefined')?w.pol.pol_kypol:'');
		w.$e.find('[name=pol_kypol]').val((typeof w.pol!='undefined')?w.pol.pol_kypol:'');
		w.$e.find('[name=pol_nive]').val((typeof w.pol!='undefined')?parseInt(w.pol.pol_nive)+1:0);

		w.$e.find('[name=pol_tipo]').val('DATO');
		w.$e.find('[name=pol_codi]').val('');
		w.$e.find('[name=pol_nomb]').val('');
		w.$e.find('[name=pol_dscr]').val('');
		w.$e.find('[name=pol_link]').val('');
		w.$e.find('[name=pol_trig]').val('open');
		
		w.$e.find('[name=pol_esta]').val('0001');
		w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			pol_kypol: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=pol_kypol]').val())
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=pol_kypol]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=pol_kypol]').val())){
			Sisem.ejecutar('GetListaAyuda',{pol_kypol: w.$e.find('[name=pol_kypol]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];

					w.$e.find('[name=pdr_nomb]').val(fila.pdr_nomb);
					w.$e.find('[name=pdr_dscr]').val(fila.pdr_dscr);

					w.$e.find('[name=pol_kypol]').val(fila.pol_kypol);
					w.$e.find('[name=pol_kypol]').val(fila.pol_kypol);
					w.$e.find('[name=pol_kypdr]').val(fila.pol_kypdr);
					w.$e.find('[name=pol_tipo]').val(fila.pol_tipo);
					w.$e.find('[name=pol_codi]').val(fila.pol_codi);
					w.$e.find('[name=pol_nomb]').val(fila.pol_nomb);
					w.$e.find('[name=pol_dscr]').val(fila.pol_dscr);
					w.$e.find('[name=pol_link]').val(fila.pol_link);
					w.$e.find('[name=pol_nive]').val(fila.pol_nive);
					w.$e.find('[name=pol_trig]').val(fila.pol_trig);
					w.$e.find('[name=pol_esta]').val(fila.pol_esta);
					if(typeof fila.pol_imin != undefined)
					{
						Sisem.getFile(fila.pol_imin, 'imagen', function(rptaImg){
						  if(rptaImg.msg.type=='success'){w.$e.find('[name=img_foto]').attr('src',rptaImg.listaArchivo[0]).fadeIn();}
						  else{w.$e.find('[name=img_foto]').attr('src','/gestion/sisprom/cmn/imagen/pregunta.png').fadeIn();}
						});
						w.$e.find('[name=pol_imin]').val(fila.pol_imin);
					}//if(typeof fila.pol_imin != undefined)
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaAyuda',{pol_kypol: w.$e.find('[name=pol_kypol]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.$e.find('[name=pol_kypol]').val())){
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
				
				ayuda.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				ayuda.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				ayuda.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		w.$e.find('[name=pol_kypol]').attr('disabled',true);

		Sisem.activar(w.$e.find('[name=pdr_nomb]'), false);
		Sisem.activar(w.$e.find('[name=pdr_dscr]'), false);

		Sisem.activar(w.$e.find('[name=pol_kypdr]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_codi]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=pol_link]'), false);
		Sisem.activar(w.$e.find('[name=pol_esta]'), w.activar);
		if(w.modo=='MODIFICAR')
		{
			Sisem.activar(w.$e.find('[name=pol_trig]'), false);
		}
		else
		{
			Sisem.activar(w.$e.find('[name=pol_trig]'), w.activar);
		}		
		w.$e.find('[name=inp_foto]').css('display','none');
		Sisem.activar(w.$e.find('[name=pol_imin]'), false);
		Sisem.activar(w.$e.find('[name=btnLoadFimg]'), w.activar, 'AZUL');		
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'pol','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='AYUD'}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: ayuda.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+ayuda.tipPag[w.tipo]['name'],
			nameWP		: 'win'+ayuda.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+ayuda.tipPag[w.tipo]['name'],
			nameWI		: 'int'+ayuda.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+ayuda.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+ayuda.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+ayuda.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+ayuda.tipPag[w.tipo]['name']
		});
		ayuda.tipPagAct = w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		ayuda.winPop({
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
			ayuda.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(ayuda.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = ayuda.obtenerDatoFormulario(w);
				Sisem.ejecutar('CtrlAyuda',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=pol_kypol]').val(rpta.pol_kypol);
						$.extend(w,{modo: 'VISUALIZAR'});
						ayuda.cerrarFormulario($.extend(w,{data : ayuda.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
			}//if(ayuda.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			ayuda.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			ayuda.iniciarFormulario(w);
		}
	},
	//////////////////////
	//Metodos Utilitarios//
	//////////////////////
	llenarHistorial: function()
	{
		$('[name=ulListaHistorial]').empty();
		for(var ite = 0; ite < listaHistorial.length; ite++){
			$('[name=ulListaHistorial]').append('<li><a name="aPolitica" href="javascript:void(0);" pol_kypol="'+listaHistorial[ite].pol_kypol+'" pol_link="'+listaHistorial[ite].pol_link+'" pol_tipo="LINK" pol_dscr="'+listaHistorial[ite].pol_dscr+'">'+listaHistorial[ite].pol_dscr+'</a></li>');
		}//for(var ite = 0; ite < listaHistorial.length; ite++){
		ayuda.clickLinkListener($('[name=ulListaHistorial]'));
	},//llenarHistorial: function(w)
	clickLinkListener: function($contenedor)
	{
		$exploradorMenu = $('#left-panel');
		$contenedor.find('a[name=aPolitica], area[name=aPolitica]').on('click', function(){
			var $aPolitica = $(this);
			var pol = {pol_kypol: $(this).attr('pol_kypol'), pol_link: $(this).attr('pol_link'), pol_dscr: ( ( $(this).html().length>0 ) ? $(this).html() : $(this).attr('pol_dscr') ), pol_tipo: $(this).attr('pol_tipo')};
			if(pol.pol_link.trim()!="")
			{
    			var data = {modulo:'ayuda', listaArchivo: [pol.pol_link]};
    			Sisem.fileExist(data, function(rpta){
    				if(rpta.msg.type=='success')
    				{
						console.log('CLICK EN SPAN POLITICA PARA CARGAR HTML - winInt');
						if(pol.pol_tipo=='LINK')
						{
							var agregarHistorial = true;
							for(var ite = 0; ite < listaHistorial.length; ite++){
								if(listaHistorial[ite].pol_link == pol.pol_link)
								{
									if( (ite+1) < listaHistorial.length)
									{
										listaHistorial = listaHistorial.slice(0, (ite+1));	
									}
									agregarHistorial = false;
	    							break;
								}
							}
							if(agregarHistorial)
							{
    							listaHistorial.push(pol);
							}
						}
						else if(pol.pol_tipo=='MENU')
						{
							listaHistorial = Array();
							$('[name=ulListaHistorial]').empty();
						}
						ayuda.llenarHistorial();
						ayuda.winInt({
							cntInt: 'divContenido',
							tipo: 'AYUD',
							size: 'short',
							enlace: pol.pol_link,
							descripcion: pol.pol_dscr,
							callback:function(data){
								//console.log('abriendo oper.interior ' + data);
							}
						});
    				}//if(rpta.msg.type=='success')
    			});//Sisem.fileExist(data, function(rpta){
			}//if(pol_link.trim()!="")
			$exploradorMenu.find('[name="divAyuda"]').find('[name=aPolitica]').each(function (index, ele) {
				var encontroOpcion = false;
				if( $(ele).attr('pol_link') )
				{
					if( pol.pol_link === $(ele).attr('pol_link') )
					{
						encontroOpcion = true;
					}
//					else if( pol.pol_link.startsWith($(ele).attr('pol_link')) )
//					{
//						encontroOpcion = true;
//					}
					if(encontroOpcion)
					{
						$('.active').removeClass('active');
						$(ele).closest('li').addClass('active');
						$(ele).closest('li').parents('li').addClass('active open');
						
						$(ele).addClass('active');
						$(ele).closest('li').parents('li').children('a').addClass('active open');
							
					    return false;
					}
				}
			});        								
		});//$contenedor.find('a[name=aPolitica]').on('click', function(){
	}//clickLinkListener: function($contenedor){
};