var evlu = {
	pag:{
		alias		: 'Evaluacion',
		nameWB		: 'brwEvaluacion',
		nameWP		: 'winEvaluacion',
		nameWS		: 'selEvaluacion',
		nameWI		: 'intEvaluacion',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwEvaluacion',
		idGridWP	: 'idWinEvaluacion',
		idGridWS	: 'idSelEvaluacion',
		idGridWI	: 'idIntEvaluacion'
	},
	tipPag: {
		"EVLALU":{'name': 'Evlalumno', 'alias': 'Evlalumno'},
		"EVLHIS":{'name': 'Evlhistorial', 'alias': 'Evlhistorial'},
		"EVLASG":{'name': 'Evlasignatura', 'alias': 'Evlasignatura'}
	},
	tipPagAct: '',
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
		evlu.winBrow(w);
	},
	winBrow: function(w){
		evlu.import(function(){
			if(w==null)w=new Object;
			evlu.setPagina(w);
			evlu[w.pag.nameWB]=w;			
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
						w.$e.find('[name=btnEditarEvaluacion]').show();
						w.$e.find('[name=btnGenerarListaEvaluacion]').show();
						w.$e.find('[name=thProfesorAlumno]').html('Profesor');
						w.$e.find('[name=tdProfesorAlumno]').html(w.pfo.pfo_nomb+' '+w.pfo.pfo_apel);
					}
					else if(w.alu)
					{
						w.$e.find('[name=btnEditarEvaluacion]').hide();
						w.$e.find('[name=btnGenerarListaEvaluacion]').hide();
						w.$e.find('[name=thProfesorAlumno]').html('Alumno');
						w.$e.find('[name=tdProfesorAlumno]').html(w.alu.alu_nomb);
					}
					w.$e.find('[name=tdAsignatura]').html(w.asg.asg_nomb);					
					
					evlu.iniciarBrowse($.extend(w,{idGrid: w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//evlu.import(function(){
	},//winBrow: function(w){
	winPop:function(w){
		evlu.import(function(){
			if(w==null)w=new Object;
			evlu.setPagina(w);
		    evlu[w.pag.nameWP]=w;
			w.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:((w.size && w.size=='short') ? 500 : 900),
				height:((w.size && w.size=='short') ? 350 : 550),
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
							evlu.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cancelar</span>",
						class : "btn btn-primary",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							evlu.btnModificarClick(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					w.$e.find('[name=evl_freg]').mask("00/00/0000");
					
					evlu.iniciarFormulario(w);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//evlu.import(function(){
	},//winPop:function(w){
	winSel:function(w){
		evlu.import(function(){
			if(w==null)w=new Object;
			evlu.setPagina(w);
			evlu[w.pag.nameWS] = w;
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
								evlu.cerrarFormulario(w);
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
									evlu.cerrarFormulario($.extend(w, {data: data}));
								}else{
									Sisem.msgBox('error','Tiene que seleccionar un item para continuar!!!');
								}						
							}						
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						class : "btn btn-danger",
						click : function() {
							evlu.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
					evlu.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS, showMenCtx: true, showToolBar: true, autoWidth:true}));					
//					var $divExpEvaluacion = w.$e.find('[name="divExpEvaluacion"]');
//					$divExpEvaluacion.data('data', {evl_kyevl: w.evl.evl_kyevl, evl_nive: w.evl.evl_nive});
//					evlu.cargarExploradorEvaluacion($divExpEvaluacion);

					Sisem.unblockW(w.$e);
				}//afterLoad:function(){
			});//Sisem.WindowBS({
		});//evlu.import(function(){
	},		
	winInt:function(w){
		evlu.import(function(){
			if(w==null)w=new Object;
			evlu.setPagina(w);
			evlu[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
					evlu.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: true, multiSelect: false, autoWidth: true}));
					w.callback('hola');
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//evlu.import(function(){
	},
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		var archivo = '';
		if(evlu.tipPagAct=='EVLALU' || evlu.tipPagAct=='EVLASG')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['clg/brw_evlu']}, function(rpta){
				if(rpta){brw_evlu.ejecutar($.extend(w,{modulo:'controllers', archivo: 'clg/brw_evlu'}));}
			});
		}
		else if(evlu.tipPagAct=='EVLHIS')
		{
			Sisem.import({modulo:'browse', listaArchivo: ['clg/brw_evlu_hist']}, function(rpta){
				if(rpta){brw_evlu_hist.ejecutar($.extend(w,{modulo:'controllers', archivo: 'clg/brw_evlu'}));}
			});			
		}
	},
	iniciarFormulario:function(w){
		if(w.modo!='MODIFICAR'){evlu.limpiarFormulario(w);};
		if(w.modo!='AGREGAR'){evlu.llenarFormulario(w);}
		evlu.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'evl',w.modo);
	},
	limpiarFormulario:function(w){
//		w.$e.find('[name=evl_kyevl]').val('');
		w.$e.find('[name=evl_kypdr]').val(w.evl ? w.evl.evl_kyevl : '');
		w.$e.find('[name=pdr_nomb]').val(w.evl ? w.evl.evl_nomb : '');
		w.$e.find('[name=pdr_dscr]').val(w.evl ? w.evl.evl_dscr : '');
		w.$e.find('[name=pdr_valo]').val(w.evl ? w.evl.evl_valo : '');
		w.$e.find('[name=evl_nive]').val(w.evl ? parseInt(w.evl.evl_nive)+1 : '');

		w.$e.find('[name=evl_freg]').val(moment().format('DD/MM/YYYY'));
		w.$e.find('[name=evl_nomb]').val(moment().format('DDMMYYHHmm'));
		w.$e.find('[name=evl_dscr]').val('');
		w.$e.find('[name=evl_valo]').val('');
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			evl_kyevl: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=evl_kyevl]').val()),
			tipo:w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=evl_kyevl]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=evl_kyevl]').val())){
			Sisem.ejecutar('clg/GetListaEvaluacion',{evl_kyevl: w.$e.find('[name=evl_kyevl]').val(), tipo: w.tipo}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var fila = rpta.lista.items[0];
					
					w.$e.find('[name=evl_kypdr]').val(fila.evl_kypdr);
					w.$e.find('[name=pdr_nomb]').val(fila.pdr_nomb);
					w.$e.find('[name=pdr_dscr]').val(fila.pdr_dscr);
					w.$e.find('[name=pdr_valo]').val(fila.pdr_valo);
					
					w.$e.find('[name=evl_orde]').val(fila.evl_orde);
					w.$e.find('[name=evl_nive]').val(fila.evl_nive);
					w.$e.find('[name=evl_freg]').val(moment().format('DD/MM/YYYY'));
					w.$e.find('[name=evl_nomb]').val(fila.evl_nomb);
					w.$e.find('[name=evl_dscr]').val(fila.evl_dscr);
					w.$e.find('[name=evl_valo]').val(fila.evl_valo);
				}//if(rpta.lista.items.length > 0)
				Sisem.unblockW(w.$e);
			});//Sisem.ejecutar('erp/GetListaEvaluacion',{prp_kyprp: w.$e.find('[name=prp_kyprp]').val()}, function(rpta){
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
				
				evlu.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				evlu.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cancelar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				evlu.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},//refrescarFormulario: function(w){
	activarFormulario:function(w){
		Sisem.activar(w.$e.find('[name=pdr_nomb]'), false);
		Sisem.activar(w.$e.find('[name=pdr_dscr]'), false);
		Sisem.activar(w.$e.find('[name=pdr_valo]'), false);
		
		Sisem.activar(w.$e.find('[name=evl_freg]'), w.activar);
		Sisem.activar(w.$e.find('[name=evl_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=evl_dscr]'), w.activar);
		Sisem.activar(w.$e.find('[name=evl_valo]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'evl','VALIDAR')){return false;}
		return true;
	},
	validarServidor: function(w, callback){
		var data=evlu.obtenerDatoFormulario(w);
		$.extend(data, {menu:'Menu_4_3_1', padre:'Menu_4_3', method: w.evento, modo: w.modo});
		Sisem.security(data, function(rpta){
			if(rpta.msg.type=="success")
			{
				return callback(evlu.validarFormulario($.extend(w,{evento:'btnGuardarClick'})));
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
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='EVLU';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: evlu.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+evlu.tipPag[w.tipo]['name'],
			nameWP		: 'win'+evlu.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+evlu.tipPag[w.tipo]['name'],
			nameWI		: 'int'+evlu.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+evlu.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+evlu.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+evlu.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+evlu.tipPag[w.tipo]['name']
		});
		evlu.tipPagAct = w.tipo;
	},
	//////////////////////
	//Metodos Eventos   //
	//////////////////////
	btnAddClick: function(w){
		evlu.winPop({
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
			evlu.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(evlu.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data = evlu.obtenerDatoFormulario(w);
				Sisem.ejecutar('clg/CtrlEvaluacion',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=evl_kyevl]').val(rpta.evl_kyevl);
						$.extend(w,{modo: 'VISUALIZAR'});
						evlu.cerrarFormulario($.extend(w,{data : evlu.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(evlu.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},//btnAgregarClick: function(w){
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			evlu.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cancelar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			evlu.iniciarFormulario(w);
		}
	},
	////////////////////////
	//Metodos varios      //
	////////////////////////
	cargarExploradorEvaluacion: function($parEleExpEvaluacion)
	{
		Sisem.ejecutar('clg/brw_evlu',{evl_kypdr: $parEleExpEvaluacion.data('data').evl_kyevl, evl_nive: $parEleExpEvaluacion.data('data').evl_nive}, function(rpta){

			if(rpta.items.length > 0)
			{
				var $ulEvaluacion = $('<ul></ul>');

				for(var idx=0; idx < rpta.items.length; idx++)
				{
					var fila = rpta.items[idx];
					if(typeof fila.evl_kyevl != 'undefined')
					{
						if(fila.evl_nopc > 0)
						{
							$ulEvaluacion.append('<li class="parent_li"><i class="fa fa-lg fa-folder-o" name="icoCarpeta'+fila.evl_kyevl+'"></i>&nbsp;<span name="spnEvaluacion'+fila.evl_kyevl+'">'+fila.evl_dscr+'</span>&nbsp;<i class="fa fa-lg '+( (fila.evl_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' )+'"></i></li>');
                            $ulEvaluacion.find('[name=icoCarpeta'+fila.evl_kyevl+']').on('click',function(event)
                            {
                                console.log('CLICK EN SPAN CARPETA PARA CARGAR DATA');

                                $(this).removeClass().addClass('fa fa-lg fa-folder-open-o');
                                var $varEleExpEvaluacion = $(this).parent('li.parent_li');
                                if ( $varEleExpEvaluacion.find(' > ul > li').length == 0 ) 
                                {
                                    console.log('CARGAMOS DATA EN ITEM DE LA BD')
                                    evlu.cargarExploradorEvaluacion($varEleExpEvaluacion);
    //                                $(this).off();
                                }
                            });
						}
						else
						{
							$ulEvaluacion.append('<li><i class="fa fa-lg fa-book"></i>&nbsp;<span name="spnEvaluacion'+fila.evl_kyevl+'">'+fila.evl_nomb+'</span>&nbsp;<i class="fa fa-lg '+( (fila.evl_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' )+'"></i></li>');
						}
                        $ulEvaluacion.find('[name=spnEvaluacion'+fila.evl_kyevl+']').closest('li').data('data',fila);

                        $parEleExpEvaluacion.idMenCtx='cm_GlobalGrid';
						$ulEvaluacion.find('[name=spnEvaluacion'+fila.evl_kyevl+']').contextMenu({
							buttonHelper: true,
						    menuSelector: "#"+$parEleExpEvaluacion.idMenCtx,
						    onShow:function($el, invokedOn){
						    	console.log('MOSTRAMOS MENU CONTEXTUAL');
						    	if($parEleExpEvaluacion.modo!='NAVEGAR'){$el.css('z-index','1100');}
						    	var $li = invokedOn.closest('li');

						    	$el.find('[id^='+$parEleExpEvaluacion.idMenCtx+']').hide();
						    	
								$el.find('#'+$parEleExpEvaluacion.idMenCtx+'_ingr').show();
								$el.find('#'+$parEleExpEvaluacion.idMenCtx+'_edit').show();
								$el.find('#'+$parEleExpEvaluacion.idMenCtx+'_dele').show();
						    },
						    menuSelected: function (invokedOn, selectedMenu) {
						    	var $id = selectedMenu.attr('id');
						    	var $li = invokedOn.closest('li');
						    	switch($id){
						    	case $parEleExpEvaluacion.idMenCtx+"_ingr":
						    		evlu.winPop({
						    			tipo: $li.data('data').prp_secc,
					    				modo: 'AGREGAR',
					    				size: 'short',
						    			evl:{
						    				pdr_kyevl :$li.data('data').evl_kyevl,
						    				pdr_nomb :$li.data('data').evl_nomb,
						    				pdr_nive :$li.data('data').evl_nive,
						    			},
					    				callback:function(rptaTmp){
											$li.children('ul').eq(0).remove();
											$li.find('i').eq(0).attr('name','icoCarpeta'+$li.data('data').tbl_kytbl);
											$li.find('i').eq(0).removeClass().addClass('fa fa-lg fa-folder-open-o');
											evlu.cargarExploradorEvaluacion($li);
					    				}
						    		});

					    			break;
						    	case $parEleExpEvaluacion.idMenCtx+"_edit":
						    		evlu.winPop({
						    			tipo: 'POLI',
						    			ky  : $li.data('data').tbl_kytbl,
					    				modo: 'MODIFICAR',
					    				size: 'short',
					    				evl: {
					    					evl_kyevl :$li.data('data').evl_kyevl,
					    					evl_nomb :$li.data('data').evl_nomb,
					    					evl_nive :$li.data('data').evl_nive
					    				},					    				
					    				callback:function(rptaEvl){
					    					var dataEvl = $li.data('data');
					    					$.extend(dataEvl, rptaEvl);
											$li.data('data', dataEvl);
					    					$li.find('span').eq(0).html(dataEvl.evl_nomb);
					    					$li.find('i').eq(1).removeClass().addClass('fa fa-lg '+( (dataEvl.evl_esta=='0001') ? 'fa-eye' : 'fa-eye-slash' ) );		
					    				}
						    		});
					    			break;
						    	case $parEleExpEvaluacion.idMenCtx+"_dele":
//					    			var lisSel= Sisem.getItemSelected(w).items;
									var lisSel= Array({evl_kyevl: $li.data('data').evl_kyevl});
					    			var lisKySel = [];
					    			for(var i=0; i<lisSel.length; i++){lisKySel.push({ky: lisSel[i].evl_kyevl});}
					    			if(lisKySel.length==0){lisKySel.push({ky: $li.data('data').evl_kyevl});}
					    			Sisem.msgAsk('Desea eliminar', $li.data('data').evl_nomb, function(rpta){
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
						});//$ulEvaluacion.find('[name=spnEvaluacion'+fila.prp_kyprp+']').contextMenu({
					}//if(typeof rpta.items[keya].prp_kyprp != 'undefined')
				}//for(var i=0; i < rpta.items.length; i++)

				$parEleExpEvaluacion.append($ulEvaluacion);

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
		});//Sisem.ejecutar('brw_poli',{prp_kypdr: $parEleExpEvaluacion.data('data').prp_kyprp}, function(rpta){
	},//cargarExploradorEvaluacion: function(w)
	imprimirEvaluacion: function($tagBloqTab, $tagTDPuntero, lisCelTab, refObj, direccion, etiTDTH)
	{
		var ancTD = 55;
		var listaColor = Array();
		listaColor[0] = '#000000';//NEGRO
		listaColor[1] = '#D3FFFE';//CELESTE
		listaColor[2] = '#B2FFB1';//VERDE
		listaColor[3] = '#FFF6B1';//ANARANJADO
		listaColor[4] = '#CAD7FF';//CELESTE OSCURO
		listaColor[5] = '#FF0000';//ROJO
		listaColor[6] = '#0023FF';//AZUL
		listaColor[7] = '#FFFFFF';//BLANCO
		
		for(ky in lisCelTab)
		{
			var fila = lisCelTab[ky];
			var colFonTH = (etiTDTH=='th') ? listaColor[fila.env] : listaColor[7];
			var colValTD = (etiTDTH=='th') ? listaColor[0] : ( (parseFloat(fila.evl) > 10) ? listaColor[6] : listaColor[5] );
			var styleCelTDTH = 'bgcolor='+colFonTH+' style="color:'+colValTD+';"'; 
			
			if(etiTDTH=='th'){valTD = fila.eva;}
			else if(etiTDTH=='td'){valTD = fila.evl;}
			nomTD=etiTDTH+'Evaluacion_'+fila.eky;
			
			refObj.total_columna += 1;
			refObj.ancho_tabla += ancTD;
			tagCeldaTabla = '<'+etiTDTH+' align="center"'+((etiTDTH=='th') ? ' width="'+ancTD+'px" ' : ' ')+'name="'+nomTD+'" '+styleCelTDTH+'>'+valTD+'</'+etiTDTH+'>';
			
			var objAlu = {aky: fila.aky, aor: fila.aor, anm: fila.anm};
			var objEvl = {eky: fila.eky, ekp: fila.ekp, eep: fila.eep, enm: fila.enm, eva: fila.eva, eds: fila.eds, evl: fila.evl, env: fila.env};
			
			if(Sisem.esObjJson(fila.lisCelTab))
			{
				/** ************************************
				 * Se genera una nueva fila en la tabla 
				 * cuando es nivel 1
				 * *************************************/
				if(fila.env==1)
				{
					refObj.total_columna += 3;
					refObj.ancho_tabla += 200;
					
					$tagBloqTab.append('<tr '+((etiTDTH=='td') ? 'name="trAluAsg_'+objAlu.aky+'"' :'name="thEncabezado_'+objAlu.aky+'_'+objAlu.anm+'"')+'><'+etiTDTH+' bgcolor="'+colFonTH+'"'+((etiTDTH=='th') ? ' width="30px"' : '')+'></'+etiTDTH+'><'+etiTDTH+' bgcolor="'+colFonTH+'"'+((etiTDTH=='th') ? ' width="20px"' : '')+'>'+fila.aor+'</'+etiTDTH+'><'+etiTDTH+' bgcolor="'+colFonTH+'" width="200px" name="'+etiTDTH+'_anm_'+fila.aky+'">'+fila.anm+'</'+etiTDTH+'></tr>');
					$tagTDPuntero = $tagBloqTab.find('[name='+etiTDTH+'_anm_'+fila.aky+']');
					$tagBloqTab.find('[name=trAluAsg_'+objAlu.aky+']').data('data', objAlu);
				}//if(fila.env==1)

				if(direccion=="DERECHA"){$tagTDPuntero.after(tagCeldaTabla);}
				else{$tagTDPuntero.before(tagCeldaTabla);}

				$tagBloqTab.find('[name='+nomTD+']').data('data', objEvl);
				evlu.imprimirEvaluacion($tagBloqTab, $tagBloqTab.find('[name='+nomTD+']'), fila.lisCelTab, refObj, 'IZQUIERDA', etiTDTH)
			}
			else
			{
				if(direccion=="DERECHA"){$tagTDPuntero.after(tagCeldaTabla);}
				else{$tagTDPuntero.before(tagCeldaTabla);}

				$tagBloqTab.find('[name='+nomTD+']').data('data', objEvl);
			}
		}//for(keya in rpta.items)
	}
};