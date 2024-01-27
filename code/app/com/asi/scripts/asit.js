var asit = {
	pag:{
		alias		: 'Asistencia',
		nameWB		: 'brwAsistencia',
		nameWP		: 'winAsistencia',
		nameWS		: 'selAsistencia',
		nameWI		: 'intAsistencia',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwAsistencia',
		idGridWP	: 'idWinAsistencia',
		idGridWS	: 'idSelAsistencia',
		idGridWI	: 'idIntAsistencia'
	},
	tipPag: {
		"MATRASIT":{'name': 'Asialumno', 'alias': 'Asialumno'},
		"ASTHIS":{'name': 'Asihistorial', 'alias': 'Asihistorial'},
		"ASTASG":{'name': 'Asiasignatura', 'alias': 'Asiasignatura'}
	},
	tipPagAct: '',
	listaPeriodo: [],
	posAnt: 0,
	posAct: 0,
	posSig: 0,
	////////////////////////
	//Metodhs de Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['clg/matr']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},	
	init:function(w){
		if(w==null)w=new Object();
		asit.winBrow(w);
	},
	winBrow: function(w){
		asit.import(function(){
			if(w==null)w=new Object;
			asit.setPagina(w);
			asit[w.pag.nameWB]=w;			
			Sisem.Cargar({
				container: '#mainPanel',
                url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB+'&dispositivo='+Sisem.dispositivo(),
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');

					w.$e.find('[name=tdPrograma]').html(w.prg.prg_nomb);
					w.$e.find('[name=tdGrado]').html(w.prg.prg_grad);
					w.$e.find('[name=tdNivel]').html(w.prg.prg_nive);
					
					w.$e.find('[name=tdPeriodo]').html(w.mtr.mtr_peri);
					w.$e.find('[name=tdTurno]').html(w.mtr.mtr_turn);
					w.$e.find('[name=tdAula]').html(w.mtr.mtr_aula);
					

					if(w.pfo)
					{
						w.$e.find('[name=btnEditarAsistencia]').show();
						w.$e.find('[name=btnGenerarListaAsistencia]').show();
						w.$e.find('[name=thProfesorAlumno]').html('Profesor');
						w.$e.find('[name=tdProfesorAlumno]').html(w.pfo.pfo_nomb+' '+w.pfo.pfo_apel+' '+w.pfo.pfo_ape2);
					}
					else if(w.alu)
					{
						w.$e.find('[name=btnEditarAsistencia]').hide();
						w.$e.find('[name=btnGenerarListaAsistencia]').hide();
						w.$e.find('[name=thProfesorAlumno]').html('Alumno');
						w.$e.find('[name=tdProfesorAlumno]').html(w.alu.alu_nomb);
					}
					w.$e.find('[name=tdAsignatura]').html(w.asg.asg_nomb);
					
					asit.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//asit.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		asit.import(function(){
			if(w==null)w=new Object;
			asit.setPagina(w);
		    asit[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 400 : 600),
				height:((w.size && w.size=='short') ? 350 : 500),
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
							asit.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							asit.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					w.$e.find('[name=radIngreso]').click(function(e){
						var index = $('[name=radIngreso]').index(this);
						switch(index) {
							case 0:
								w.$e.find('[name=ast_eing]').val('0001');
								break;
							case 1:
								w.$e.find('[name=ast_eing]').val('0002');
								break;
							case 2:
								w.$e.find('[name=ast_eing]').val('0003');
								break;
						}
						asit.btnAgregarClick(w);
					});
					w.$e.find('[name=radSalida]').click(function(e){
						var index = $('[name=radSalida]').index(this);
						switch(index) {
							case 0:
								w.$e.find('[name=ast_esal]').val('0001');
								break;
							case 1:
								w.$e.find('[name=ast_esal]').val('0002');
								break;
							case 2:
								w.$e.find('[name=ast_esal]').val('0003');
								break;
						}
						asit.btnAgregarClick(w);
					});
					asit.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//asit.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		asit.import(function(){
			if(w==null)w=new Object;
			asit.setPagina(w);
			asit[w.pag.nameWS] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:((w.size && w.size=='short') ? 400 : 700),
				height:((w.size && w.size=='short') ? 500 : 550),
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						class : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								asit.cerrarFormulario(w);
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
									asit.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							asit.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					asit.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));					
//					var $divExpAsistencia = w.$e.find('[name="divExpAsistencia"]');
//					$divExpAsistencia.data('data', {ast_kyast: w.evl.ast_kyast, ast_nive: w.evl.ast_nive});
//					asit.cargarExploradorAsistencia($divExpAsistencia);

					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//asit.import(function(){
	},		
	winInt:function(w){
		asit.import(function(){
			if(w==null)w=new Object;
			asit.setPagina(w);
			asit[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					asit.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//asit.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		var archivo = '';
		if(asit.tipPagAct=='MATRASIT' || asit.tipPagAct=='ASTASG')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['asi/brw_asit']}, function(rpta){
				if(rpta){brw_asit.ejecutar($.extend(w,{modulo:'controllers', archivo: 'asi/brw_asit'}));}
			});
		}
		else if(asit.tipPagAct=='ASTHIS')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['asi/brw_asit_hist']}, function(rpta){
				if(rpta){brw_asit_hist.ejecutar($.extend(w,{modulo:'controllers', archivo: 'asi/brw_asit'}));}
			});			
		}
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){asit.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){asit.llenarFormulario(w);}
		asit.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'evl',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=ast_kyast]').val('');
		w.$e.find('[name=alu_nomb]').val('');
		w.$e.find('[name=alu_apel]').val('');
		w.$e.find('[name=ast_fing]').val(moment().format('DD/MM/YYYY HH:mm'));
		w.$e.find('[name=ast_eing]').val('');
		w.$e.find('[name=ast_fsal]').val(moment().format('DD/MM/YYYY HH:mm'));
		w.$e.find('[name=ast_esal]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			ast_kyast: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=ast_kyast]').val()),
			tipo:w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=ast_kyast]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=ast_kyast]').val())){
			Sisem.ejecutar('asi/GetListaAsistencia',{ast_kyast: w.$e.find('[name=ast_kyast]').val(), tipo: w.tipo}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];

					w.$e.find('[name=ast_kyast]').val(fila.kya);
					w.$e.find('[name=ast_kyasg]').val(fila.cky);
					
					w.$e.find('[name=alu_nomb]').val(fila.anm);
					w.$e.find('[name=ast_fing]').val(moment(fila.fia).format('DD/MM/YYYY HH:mm'));
					w.$e.find('[name=ast_eing]').val(fila.eia);
					w.$e.find('[name=ast_fsal]').val(moment(fila.fsa).format('DD/MM/YYYY HH:mm'));
					w.$e.find('[name=ast_esal]').val(fila.esa);
					
					if(fila.eia=="0001"){$('[name=radIngreso]').eq(0).prop('checked',true);}
					if(fila.eia=="0002"){$('[name=radIngreso]').eq(1).prop('checked',true);}
					if(fila.eia=="0003"){$('[name=radIngreso]').eq(2).prop('checked',true);}
					
					if(fila.esa=="0001"){$('[name=radSalida]').eq(0).prop('checked',true);}
					if(fila.esa=="0002"){$('[name=radSalida]').eq(1).prop('checked',true);}
					if(fila.esa=="0003"){$('[name=radSalida]').eq(2).prop('checked',true);}
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaAsistencia',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
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
				
				asit.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				asit.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				asit.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=alu_nomb]'), false);
		Sisem.activar(w.$e.find('[name=eti_fing]'), false);
		Sisem.activar(w.$e.find('[name=eti_fsal]'), false);
		Sisem.activar(w.$e.find('[name=ast_fing]'), w.activar);
		Sisem.activar(w.$e.find('[name=ast_eing]'), w.activar);
		Sisem.activar(w.$e.find('[name=ast_fsal]'), w.activar);
		Sisem.activar(w.$e.find('[name=ast_esal]'), w.activar);
		Sisem.activar(w.$e.find('[name=radIngreso]'), w.activar);
		Sisem.activar(w.$e.find('[name=radSalida]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'evl','VALIDAR')){return false;}
		return true;
	},
	validarServidor: function(w, callback){
		var data=asit.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(asit.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='MATRASIT';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: asit.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+asit.tipPag[w.tipo]['name'],
			nameWP		: 'win'+asit.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+asit.tipPag[w.tipo]['name'],
			nameWI		: 'int'+asit.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+asit.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+asit.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+asit.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+asit.tipPag[w.tipo]['name']
		});
		asit.tipPagAct = w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		asit.winPop({
			tipo: w.tipo,
			modo:'AGREGAR',
			size: 'short',
			evl: w.evl,
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			asit.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(asit.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = asit.obtenerDatoFormulario(w);
				Sisem.ejecutar('asi/CtrlAsistencia',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=ast_kyast]').val(rpta.ast_kyast);
						$.extend(w,{modo: 'VISUALIZAR'});
						asit.cerrarFormulario($.extend(w,{data : asit.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(asit.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			asit.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			asit.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodos varios      //
	////////////////////////
	cargarExploradorAsistencia: function($parEleExpAsistencia)
	{
		Sisem.ejecutar('asi/brw_asit',{ast_kypdr: $parEleExpAsistencia.data('data').ast_kyast, ast_nive: $parEleExpAsistencia.data('data').ast_nive}, function(rpta){

			if(rpta.items.length > 0)
			{
				var $ulAsistencia = $('<ul></ul>');

				for(var idx=0; idx < rpta.items.length; idx++)
				{
					var fila = rpta.items[idx];
					if(typeof fila.ast_kyast != 'undefined')
					{
						if(fila.ast_nopc > 0)
						{
							$ulAsistencia.append('<li class="parent_li"><i class="fa fa-lg fa-folder-o" name="icoCarpeta'+fila.ast_kyast+'"></i>&nbsp;<span name="spnAsistencia'+fila.ast_kyast+'">'+fila.ast_dscr+'</span>&nbsp;<i class="fa fa-lg '+( (fila.ast_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' )+'"></i></li>');
                            $ulAsistencia.find('[name=icoCarpeta'+fila.ast_kyast+']').on('click',function(event)
                            {
                                console.log('CLICK EN SPAN CARPETA PARA CARGAR DATA');

                                $(this).removeClass().addClass('fa fa-lg fa-folder-open-o');
                                var $varEleExpAsistencia = $(this).parent('li.parent_li');
                                if ( $varEleExpAsistencia.find(' > ul > li').length == 0 ) 
                                {
                                    console.log('CARGAMOS DATA EN ITEM DE LA BD')
                                    asit.cargarExploradorAsistencia($varEleExpAsistencia);
    //                                $(this).off();
                                }
                            });
						}
						else
						{
							$ulAsistencia.append('<li><i class="fa fa-lg fa-book"></i>&nbsp;<span name="spnAsistencia'+fila.ast_kyast+'">'+fila.ast_nomb+'</span>&nbsp;<i class="fa fa-lg '+( (fila.ast_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' )+'"></i></li>');
						}
                        $ulAsistencia.find('[name=spnAsistencia'+fila.ast_kyast+']').closest('li').data('data',fila);

                        $parEleExpAsistencia.idMenCtx='cm_GlobalGrid';
						$ulAsistencia.find('[name=spnAsistencia'+fila.ast_kyast+']').contextMenu({
							buttonHelper: true,
						    menuSelector: "#"+$parEleExpAsistencia.idMenCtx,
						    onShow:function($el, invokedOn){
						    	console.log('MOSTRAMOS MENU CONTEXTUAL');
						    	if($parEleExpAsistencia.modo!='NAVEGAR'){$el.css('z-index','1100');}
						    	var $li = invokedOn.closest('li');

						    	$el.find('[id^='+$parEleExpAsistencia.idMenCtx+']').hide();
						    	
								$el.find('#'+$parEleExpAsistencia.idMenCtx+'_ingr').show();
								$el.find('#'+$parEleExpAsistencia.idMenCtx+'_edit').show();
								$el.find('#'+$parEleExpAsistencia.idMenCtx+'_dele').show();
						    },
						    menuSelected: function (invokedOn, selectedMenu) {
						    	var $id = selectedMenu.attr('id');
						    	var $li = invokedOn.closest('li');
						    	switch($id){
						    	case $parEleExpAsistencia.idMenCtx+"_ingr":
						    		asit.winPop({
						    			tipo: $li.data('data').prp_secc,
					    				modo: 'AGREGAR',
					    				size: 'short',
						    			evl:{
						    				pdr_kyast :$li.data('data').ast_kyast,
						    				pdr_nomb :$li.data('data').ast_nomb,
						    				pdr_nive :$li.data('data').ast_nive,
						    			},
					    				callback:function(rptaTmp){
											$li.children('ul').eq(0).remove();
											$li.find('i').eq(0).attr('name','icoCarpeta'+$li.data('data').tbl_kytbl);
											$li.find('i').eq(0).removeClass().addClass('fa fa-lg fa-folder-open-o');
											asit.cargarExploradorAsistencia($li);
					    				}
						    		});

					    			break;
						    	case $parEleExpAsistencia.idMenCtx+"_edit":
						    		asit.winPop({
						    			tipo: 'POLI',
						    			ky  : $li.data('data').tbl_kytbl,
					    				modo: 'MODIFICAR',
					    				size: 'short',
					    				evl: {
					    					ast_kyast :$li.data('data').ast_kyast,
					    					ast_nomb :$li.data('data').ast_nomb,
					    					ast_nive :$li.data('data').ast_nive
					    				},					    				
					    				callback:function(rptaAsi){
					    					var dataAsi = $li.data('data');
					    					$.extend(dataAsi, rptaAsi);
											$li.data('data', dataAsi);
					    					$li.find('span').eq(0).html(dataAsi.ast_nomb);
					    					$li.find('i').eq(1).removeClass().addClass('fa fa-lg '+( (dataAsi.ast_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) );		
					    				}
						    		});
					    			break;
						    	case $parEleExpAsistencia.idMenCtx+"_dele":
//					    			var lisSel= Sisem.getItemSelected(w).items;
									var lisSel= Array({ast_kyast: $li.data('data').ast_kyast});
					    			var lisKySel = [];
					    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].ast_kyast});}
					    			if(lisKySel.length==0){lisKySel.push({ky: $li.data('data').ast_kyast});}
					    			Sisem.msgAsk('Desea eliminar', $li.data('data').ast_nomb, function(rpta){
						    			if(rpta=='Si'){
											var data = {comando: 'ELIMINAR', lisKy: lisKySel};
											Sisem.ejecutar('CtrlPropiedad',data, function(rpta){
												$li.remove();
											});//Sisem.ejecutar('CtrlOperacion',data, function(rpta){
						    			}//if(Sisem.msgAsk('Desea eliminar', $li.data('data').nomb)){
					    			});
					    			break;
						    	}//switch($id){
						    }//menuSelected: function (invokedOn, selectedMenu) {
						});//$ulAsistencia.find('[name=spnAsistencia'+fila.prp_kyprp+']').contextMenu({
					}//if(typeof rpta.items[keya].prp_kyprp != 'undefined')
				}//for(var i=0; i < rpta.items.length; i++)

				$parEleExpAsistencia.append($ulAsistencia);

			}//if(rpta.items.length > 0)

			// PAGE RELATED SCRIPTS
			$('.tree > ul').attr('role', 'tree').find('ul').attr('role', 'group');
			$('.tree').find('li:has(ul)').addClass('parent_li').attr('role', 'treeitem').find(' > i').attr('title', 'Collapse this branch');

			$('.tree').find('li:has(ul)').find(' > i[name^="icoCarpeta"]').off('click');
			$('.tree').find('li:has(ul)').find(' > i[name^="icoCarpeta"]').on('click', function(e) {
				var children = $(this).parent('li.parent_li').find(' > ul > li');

				if (children.is(':visible')) {
					console.log('CLICK EN SPAN PARA CERRAR');
					children.hide('fast');
					$(this).attr('title', 'Expandir esta rama').removeClass().addClass('fa fa-lg fa-folder-o');
				} else {
					console.log('CLICK EN SPAN PARA ABRIR');
					children.show('fast');
					$(this).attr('title', 'Recoger esta rama').removeClass().addClass('fa fa-lg fa-folder-open-o');
				}
				e.stopPropagation();
			});
		});//Sisem.ejecutar('brw_poli',{prp_kypdr: $parEleExpAsistencia.data('data').prp_kyprp}, function(rpta){
	},//cargarExploradorAsistencia: function(w)
	periodoAnterior: function(w){
		if(asit.listaPeriodo.length > 0)
		{
			if(asit.posAct > 0)
			{
				asit.posAct--;
				asit.posSig = ( ((asit.posAct + 1) <= (asit.listaPeriodo.length-1)) ? asit.posAct + 1 : -1); 
				asit.posAnt = ( ((asit.posAct - 1) > -1) ? asit.posAct - 1 : -1);
				asit.refrescarControlPeriodo(w);
			}
		}
	},
	periodoSiguiente: function(w){
		if(asit.listaPeriodo.length > 0)
		{
			var objPer;
			if((asit.posAct + 1) < asit.listaPeriodo.length)
			{
				asit.posAct++;
				asit.posSig = ( ((asit.posAct + 1) <= (asit.listaPeriodo.length-1)) ? asit.posAct + 1 : -1); 
				asit.posAnt = ( ((asit.posAct - 1) > -1) ? asit.posAct - 1 : -1);
				asit.refrescarControlPeriodo(w);
			}
		}
	},
	refrescarControlPeriodo: function(w){
		if(typeof asit.listaPeriodo[asit.posAnt]!=='undefined')
		{
			objPer = asit.listaPeriodo[asit.posAnt];
			w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoAnterior]').find('[name=btnPeriodoAnterior]').show();
			w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoAnterior]').find('[name=btnPeriodoAnterior]').html(strMes[objPer.asg_mese]+'-'+objPer.asg_anio);	
		}
		else{w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoAnterior]').find('[name=btnPeriodoAnterior]').hide();}
		
		if(typeof asit.listaPeriodo[asit.posAct]!=='undefined')
		{
			objPer = asit.listaPeriodo[asit.posAct];
			w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoActual]').html(strMes[objPer.asg_mese]+'-'+objPer.asg_anio);	
		}else{w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoActual]').html('');}
		
		if(typeof asit.listaPeriodo[asit.posSig]!=='undefined')
		{
			objPer = asit.listaPeriodo[asit.posSig];
			w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoSiguiente]').find('[name=btnPeriodoSiguiente]').show();
			w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoSiguiente]').find('[name=btnPeriodoSiguiente]').html(strMes[objPer.asg_mese]+'-'+objPer.asg_anio);	
		}else{w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoSiguiente]').find('[name=btnPeriodoSiguiente]').hide();}
	}
};