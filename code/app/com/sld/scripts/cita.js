var cita = {
	pag:{
		alias		: 'Citas',
		nameWB		: 'brwCita',
		nameWP		: 'winCita',
		nameWS		: 'selCita',
		nameWI		: 'intCita',
		acceso		: '',
		modo		: '',
		idGridWB	: 'idBrwCita',
		idGridWP	: 'idWinCita',
		idGridWS	: 'idSelCita',
		idGridWI	: 'idIntCita'
	},
	tipPag: {
		"CITA":{'name': 'Citageneral', 'alias': 'Citas General'}
	},
	tipPagAct: '',
	eventoAct: '',
	numClick:0,
	////////////////////////
	//Metodhs of Interface//
	////////////////////////
	import: function(callback){
		Sisem.import({listaArchivo:['cmn/usua']}, function(rpta){
			if(callback){callback(rpta);}
		});
	},
	init:function(w){
		if(w==null)w=new Object();
		cita.winBrow(w);
	},
	winBrow : function(w){
		cita.import(function(rpta){
			if(w==null)w=new Object;
			cita.setPagina(w);
			cita[w.pag.nameWB]=w;
			Sisem.Cargar({
				container: '#mainPanel',
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWB,
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');
					w.$e = $('#mainPanel');
					
					$.extend(w, {cit: Sisem.getRangoIniFin(new Date()) });
					w.$e.find('[id=calendar]').empty();
					cita.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//cita.import(function(){
	},
	winPop:function(w){
		cita.import(function(rpta){
			if(w==null)w=new Object;
			cita.setPagina(w);
			cita[w.pag.nameWP] = w;
			cita.pag.modo=((w.modo)?w.modo:'VISUALIZAR');
			Sisem.WindowBS({
				id:w.pag.nameWP,
				title:w.pag.modo+' '+w.pag.alias,
				width:400,
				height:350,
				url:base_url+'cmn/control/edit?tipo='+w.tipo+'&nombreVentana='+w.pag.nameWP,
				modal:false,
				buttons : [
					{
						html : "<i class='fa fa-check'></i><span name='etiAgregar'>Agregar</span>",
						"class" : "btn btn-primary",
						name : "btnAgregar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							cita.btnAgregarClick(w);
						}
					},{
						html : "<i class='fa fa-check'></i><span name='etiModificar'>Cerrar</span>",
						"class" : "btn btn-warning",
						name : "btnModificar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							cita.btnModificarClick(w);
						}
					},{
						html : "<i class='fa fa-times'></i><span name='etiCerrar'>Eliminar</span>",
						"class" : "btn btn-danger",
						"name" : "btnEliminar",
						tabindex : "1",
						placeholder : "Presione ENTER",
						click : function() {
							cita.btnEliminarClick(w);
						}
					}				
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWP);
					Sisem.blockW(w.$e);
					
					Sisem.formato(w);
					
//					w.$e.find('[name=btnSelDoc]').click(function(){cita.btnSelDocClick(w);});
//					w.$e.find('[name=btnSelPac]').click(function(){cita.btnSelPacClick(w);});
					
//					usua.usuarioAutocomplete($.extend(w,{usu_tipo: 'DOC'}));
//					usua.usuarioAutocomplete($.extend(w,{usu_tipo: 'PAC'}));
//					
					usua.usuarioAutocomplete($.extend(w, {prf_nomb: 'DOCTOR', prf_inpu: 'doc_nomb', prf_sele: 1, prf_solo: 1}));
					usua.usuarioAutocomplete($.extend(w, {prf_nomb: 'PACIENTE', prf_inpu: 'pac_nomb', prf_sele: 1, prf_solo: 1}));
					
					cita.iniciarFormulario(w);
					Sisem.validarControlesColor(w.$e,'cit,doc,pac',w.modo);
					Sisem.unblockW(w.$e);
					Sisem.formato(w);
				}
			});
		});//cita.import(function(){
	},
	winSel:function(w){
		cita.import(function(){
			if(w==null)w=new Object;
			cita.setPagina(w);
			cita[w.pag.nameWS] = w;
			cita.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.WindowBS({
				id:w.pag.nameWS,
				title:'Seleccionar '+w.pag.alias,
				width:650,
				height:500,
				url:base_url+'cmn/home/grid',
				modal:false,
				buttons : [				
					{
						html : "<i class='fa fa-times'></i>&nbsp; "+w.modo,
						"class" : "btn btn-success",
						click : function() {
							if(w.modo=='VISUALIZAR'){
								cita.cerrarFormulario(w);
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
										prop.cerrarFormulario($.extend(w, {data: data}));
								}else{
									return $.smallBox({
										title : "Respuesta!",
										content : "Tiene que seleccionar un item para continuar",
										color : "#C46A69",
										timeout: 8000,
										icon : "fa fa-bell swing animated"
									});
								}						
							}
						}
					},{
						html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-danger",
						click : function() {
							cita.cerrarFormulario(w);
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#'+w.pag.nameWS);
					Sisem.blockW(w.$e);
//					cita.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWS}));
					Sisem.unblockW(w.$e);
				}
			});
		});//cita.import(function(){
	},
	winInt:function(w){
		cita.import(function(){
			if(w==null)w=new Object;
			cita.setPagina(w);
			cita[w.pag.nameWI] = w;
			w.pag.modo=((w.modo)?w.modo:'SELECCIONAR');
			Sisem.Cargar({
				container: '#'+w.cntInt,
				url:base_url+'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
	//				$main = $('#content');
					w.$e = $('#'+w.cntInt);
//					cita.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showoolBar: true, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));
				}//afterLoad:function(data){
			});//Sisem.Cargar({
		});//oper.import(function(){
	},	
	//////////////////////////////
	//Metodhs of Data Management//
	//////////////////////////////
	iniciarBrowse:function(w){
		Sisem.import({modulo:'browse', listaArchivo: ['sld/brw_cita']}, function(rpta){
			if(rpta){brw_cita.ejecutar($.extend(w,{modulo:'controllers', archivo: 'sld/brw_cita'}));}
		});
	},
	iniciarFormulario:function(w){
		if(w.modo=='AGREGAR'){cita.limpiarFormulario(w);};
		if(w.modo=='VISUALIZAR' || w.modo=='MODIFICAR'){cita.llenarFormulario(w);}
		cita.refrescarFormulario(w);
		Sisem.validarControlesColor(w.$e,'cit,doc,pac',w.modo);
	},
	limpiarFormulario:function(w){	
//		w.$e.find('[name=cit_kycit]').val('');
		w.$e.find('[name=doc_nomb]').val('');
		w.$e.find('[name=pac_nomb]').val('');
		w.$e.find('[name=cit_moti]').val('');
		
		if(w.cit)
		{
			w.$e.find('[name=cit_fini]').val(w.cit.cit_fini);
			w.$e.find('[name=cit_ffin]').val(w.cit.cit_ffin);
			
			w.$e.find('[name=cit_fdia]').html(w.cit.cit_fdia);
			w.$e.find('[name=cit_hini]').html(w.cit.cit_hini);
			w.$e.find('[name=cit_hfin]').html(w.cit.cit_hfin);
		}		
	},
	obtenerDatoFormulario: function(w){
		var data = Sisem.obtenerParametrosJson(w.$e);
		$.extend(data,{
			comando: w.modo,
			cit_kycit: ((w.modo=='AGREGAR')?'0':w.$e.find('[name=cit_kycit]').val()),
			tipo:w.tipo
		});
		return data;
	},
	llenarFormulario:function(w){
		if(w.ky>0){w.$e.find('[name=cit_kycit]').val(w.ky);}
		if(!Sisem.isEmpty(w.$e.find('[name=cit_kycit]').val())){
			Sisem.ejecutar('sld/GetListaCita',{cit_kycit: w.$e.find('[name=cit_kycit]').val()}, function(rpta){
				if(rpta.lista.items.length > 0)
				{
					var obj = rpta.lista.items[0];
					w.$e.find('[name=cit_kycit]').val(obj.cit_kycit);
					w.$e.find('[name=doc_kyusu]').val(obj.doc_kyusu);
					w.$e.find('[name=doc_nomb]').val(obj.doc_nomb);
					w.$e.find('[name=pac_kyusu]').val(obj.pac_kyusu);
					w.$e.find('[name=pac_nomb]').val(obj.pac_nomb);
					w.$e.find('[name=cit_moti]').val(obj.cit_moti);
					
					w.$e.find('[name=cit_fini]').val(moment(obj.cit_fini).format('YYYY-MM-DD HH:mm'));
					w.$e.find('[name=cit_ffin]').val(moment(obj.cit_ffin).format('YYYY-MM-DD HH:mm'));
					
					w.$e.find('[name=cit_fdia]').html(moment(obj.cit_fini).format('dddd, DD MMMM YYYY').toUpperCase());
					w.$e.find('[name=cit_hini]').html(moment(obj.cit_fini).format('HH:mm'));
					w.$e.find('[name=cit_hfin]').html(moment(obj.cit_ffin).format('HH:mm'));
				}//if(rpta.lista.items.length > 0)
			});//Sisem.ejecutar('erp/GetListaCita',{cit_kycit: w.$e.find('[name=cit_kycit]').val()}, function(rpta){
		}//if(!Sisem.isEmpty(w.ky)){
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
				Sisem.activar(w.$e.parent().find('[name=btnEliminar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), true, 'ROJO');
				
				cita.activarFormulario($.extend(w, {activar: false}));
				break;
			case 'MODIFICAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cerrar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnEliminar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
				
				cita.activarFormulario($.extend(w, {activar: true}));
				break;
			case 'AGREGAR':
				w.$e.parent().find('[name=etiAgregar]').html('Guardar');
				w.$e.parent().find('[name=etiModificar]').html('Cerrar');
				
				Sisem.activar(w.$e.parent().find('[name=btnAgregar]'), true, 'VERDE');
				Sisem.activar(w.$e.parent().find('[name=btnModificar]'), true, 'ROJO');
				Sisem.activar(w.$e.parent().find('[name=btnImprimir]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnBuscar]'), false);
				Sisem.activar(w.$e.parent().find('[name=btnEliminar]'), false);	
				Sisem.activar(w.$e.parent().find('[name=btnCerrar]'), false);
	
				cita.activarFormulario($.extend(w, {activar: true}));
				break;
		}// Fin de switch para estado del formaulario de cliente
	},
	activarFormulario:function(w){
//		w.$e.find('[name=cit_kycit]').attr('disabled',true);
		Sisem.activar(w.$e.find('[name=doc_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnSelDoc]'), w.activar);
		Sisem.activar(w.$e.find('[name=pac_nomb]'), w.activar);
		Sisem.activar(w.$e.find('[name=btnSelPac]'), w.activar);
		Sisem.activar(w.$e.find('[name=cit_moti]'), w.activar);
	},
	validarFormulario:function(w){
		if(!Sisem.validarControlesColor(w.$e,'cit','VALIDAR')){return false;}
		return true;
	},
	cerrarFormulario: function(w){
		if(w.$e.closest('.modal-dialog').length){w.$e.closest('.modal').prev('.modal-backdrop').remove();w.$e.closest('.modal').remove();}
		else{w.$e.closest('.ui-dialog').find('.ui-dialog-content').dialog('close');}
		if(w.callback!=null){if(w.data){w.callback(w.data);}else{w.callback();}}
	},
	setPagina: function(w){
		if(w.tipo==null || typeof w.tipo=='undefined' ){w.tipo='DGEN';}
		w.pag = new Object();
		$.extend(w.pag, {
			alias		: cita.tipPag[w.tipo]['alias'],
			nameWB		: 'brw'+cita.tipPag[w.tipo]['name'],
			nameWP		: 'win'+cita.tipPag[w.tipo]['name'],
			nameWS		: 'sel'+cita.tipPag[w.tipo]['name'],
			nameWI		: 'int'+cita.tipPag[w.tipo]['name'],
			acceso		: '',
			modo		: '',
			idGridWB	: 'idBrw'+cita.tipPag[w.tipo]['name'],
			idGridWP	: 'idWin'+cita.tipPag[w.tipo]['name'],
			idGridWS	: 'idSel'+cita.tipPag[w.tipo]['name'],
			idGridWI	: 'idInt'+cita.tipPag[w.tipo]['name']
		});
		cita.tipPagAct = w.tipo;
	},	
	//////////////////
	//Metodhs Events//
	//////////////////	
	btnAddClick: function(w){
		oper.winPop({
			modo:'AGREGAR',
			apc:USERDATA.apc,
			caj:USERDATA.suc,
			tra:USERDATA.tra,			
			tipo: 'OPERACI',
			ctrl: w.ctrl,
			size: 'short',
			callback:function(){
				if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
			}
		});		
	},	
	btnAgregarClick: function(w){
		if(w.$e.parent().find('[name=etiAgregar]').html()=='Agregar'){
			$.extend(w,{evento: 'btnAgregarClick', modo: 'AGREGAR'});
			cita.iniciarFormulario(w);
		}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
			if(cita.validarFormulario($.extend(w,{evento:'btnGuardarClick'}))){
				Sisem.blockW(w.$e);
				var data=cita.obtenerDatoFormulario(w);
				Sisem.ejecutar('sld/CtrlCita',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						w.$e.find('[name=cit_kycit]').val(rpta.cit_kycit);
						$.extend(w,{modo: 'VISUALIZAR'});
						cita.cerrarFormulario($.extend(w,{data : cita.obtenerDatoFormulario(w)}));
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(cita.validarFormulario($.extend({evento:'btnGuardarClick'},w))){
		}//}else if(w.$e.parent().find('[name=etiAgregar]').html()=='Guardar'){
	},
	btnModificarClick: function(w){
		if(w.$e.parent().find('[name=etiModificar]').html()=='Modificar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'MODIFICAR'});
			cita.iniciarFormulario(w);	
		}else if(w.$e.parent().find('[name=etiModificar]').html()=='Cerrar'){
			$.extend(w,{evento: 'btnModificarClick', modo: 'VISUALIZAR'});
			cita.cerrarFormulario($.extend(w,{callback : null}));
		}
	},
	btnEliminarClick: function(w){
		var lisKySel = [];
		if(lisKySel.length==0){lisKySel.push({ky: w.$e.find('[name=cit_kycit]').val()});}
		var resp = Sisem.msgAsk('Desea eliminar', w.$e.find('[name=pac_nomb]').val(), function(rpta){
			if(rpta=='Si'){
				var data = {comando: 'ELIMINAR', lisKy: lisKySel};
				Sisem.ejecutar('erp/CtrlCita',data, function(rpta){
					if(rpta.msg.type=='success')
					{
						Sisem.msgBox(rpta.msg.type, rpta.msg.text);
						cita.cerrarFormulario($.extend(w,{data : cita.obtenerDatoFormulario(w)}));						
					}//if(rpta.msg.type=='success')
					Sisem.unblockW(w.$e);
				});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){
			}//if(rpta=='Si'){
		});
	},
	btnSelDocClick: function(w){
		w.$e.find('[name=doc_nomb]').val('Seleccione');
		if(w.$e.find('[name=btnSelDoc]').children('i').hasClass('fa-chevron-down'))
		{
			w.$e.find('[name=btnSelDoc]').removeClass('btn-info');
			w.$e.find('[name=btnSelDoc]').addClass('btn-success');
			
			w.$e.find('[name=btnSelDoc]').children('i').removeClass('fa-chevron-down');
			w.$e.find('[name=btnSelDoc]').children('i').addClass('fa-chevron-up');
			
			w.$e.find('[name=doc_nomb]').autocomplete("search");
		}
		else if(w.$e.find('[name=btnSelDoc]').children('i').hasClass('fa-chevron-up'))
		{
			w.$e.find('[name=btnSelDoc]').removeClass('btn-success');
			w.$e.find('[name=btnSelDoc]').addClass('btn-info');
			
			w.$e.find('[name=btnSelDoc]').children('i').removeClass('fa-chevron-up');
			w.$e.find('[name=btnSelDoc]').children('i').addClass('fa-chevron-down');

			w.$e.find('[name=doc_nomb]').autocomplete('close');
		}
	},		
	btnSelPacClick: function(w){
		w.$e.find('[name=pac_nomb]').val('Seleccione');
		if(w.$e.find('[name=btnSelPac]').children('i').hasClass('fa-chevron-down'))
		{
			w.$e.find('[name=btnSelPac]').removeClass('btn-info');
			w.$e.find('[name=btnSelPac]').addClass('btn-success');
			
			w.$e.find('[name=btnSelPac]').children('i').removeClass('fa-chevron-down');
			w.$e.find('[name=btnSelPac]').children('i').addClass('fa-chevron-up');
			
			w.$e.find('[name=pac_nomb]').autocomplete("search");
		}
		else if(w.$e.find('[name=btnSelPac]').children('i').hasClass('fa-chevron-up'))
		{
			w.$e.find('[name=btnSelPac]').removeClass('btn-success');
			w.$e.find('[name=btnSelPac]').addClass('btn-info');
			
			w.$e.find('[name=btnSelPac]').children('i').removeClass('fa-chevron-up');
			w.$e.find('[name=btnSelPac]').children('i').addClass('fa-chevron-down');

			w.$e.find('[name=pac_nomb]').autocomplete('close');
		}
	},
	generarCalendario: function(w){
		   /** ***********************************************
		** INICIO : CONFIGURACION DE CALENDARIO DE CITAS
		** ***********************************************/
	    "use strict";
	
	    var date = new Date();
	    var d = date.getDate();
	    var m = date.getMonth();
	    var y = date.getFullYear();
	
	    var hdr = {
	        left: 'title',
	        center: 'month,agendaWeek,agendaDay',
	        right: 'prev,today,next'
	    };
	
	    var initDrag = function (e) {
	        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
	        // it doesn't need to have a start or end

	        var eventObject = {
	            title: $.trim(e.children().text()), // use the element's text as the event title
	            description: $.trim(e.children('span').attr('data-description')),
	            icon: $.trim(e.children('span').attr('data-icon')),
	            className: $.trim(e.children('span').attr('class')) // use the element's children as the event class
	        };
	        // store the Event Object in the DOM element so we can get to it later
	        e.data('eventObject', eventObject);

	        // make the event draggable using jQuery UI
	        e.draggable({
	            zIndex: 999,
	            revert: true, // will cause the event to go back to its
	            revertDuration: 0 //  original position after the drag
	        });
	    };
	
	    var addEvent = function (title, priority, description, icon) {
	        title = title.length === 0 ? "Untitled Event" : title;
	        description = description.length === 0 ? "No Description" : description;
	        icon = icon.length === 0 ? " " : icon;
	        priority = priority.length === 0 ? "label label-default" : priority;
	
	        var html = $('<li><span class="' + priority + '" data-description="' + description + '" data-icon="' +
	            icon + '">' + title + '</span></li>').prependTo('ul#external-events').hide().fadeIn();
	
	        $("#event-container").effect("highlight", 800);
	
	        initDrag(html);
	    };
		w.$e.find('[id=calendar]').fullCalendar({
	    	defaultView : 'agendaWeek',
	    	firstDay: 0,
	    	monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
	    	monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
	    	dayNames: ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'],
	    	dayNamesShort: ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'],
	    	titleFormat: {
	    		month: 'MMMM yyyy',
	    		week: "MMMM yyyy",
	    		day: 'dddd, MMM d, yyyy'
	    	},
	    	columnFormat: {
	    		month: 'ddd',
	    		week: 'ddd d',
	    		day: 'dddd M/d'
	    	},
	    	allDaySlot: false,
	        header: hdr,
	        buttonText: {
	            prev: '<i class="fa fa-chevron-left"></i>',
	            next: '<i class="fa fa-chevron-right"></i>'
	        },
	        editable: true,
	        droppable: true, // this allows things to be dropped onto the calendar !!!
	
	        drop: function (date, allDay) { // this function is called when something is dropped
	        	console.log('evento drop');
	            // retrieve the dropped element's stored Event Object
	            var originalEventObject = $(this).data('eventObject');
	
	            // we need to copy it, so that multiple events don't have a reference to the same object
	            var copiedEventObject = $.extend({}, originalEventObject);
	
	            // assign it the date that was reported
	            copiedEventObject.start = date;
	            copiedEventObject.allDay = allDay;
	
	            // render the event on the calendar
	            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
	            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
	
	            // is the "remove after drop" checkbox checked?
	            if ($('#drop-remove').is(':checked')) {
	                // if so, remove the element from the "Draggable Events" list
	                $(this).remove();
	            }
	        },
	        select: function (start, end, allDay) {
	        	console.log('event select');
	            var title = prompt('Event Title:');
	            if (title) {
	                calendar.fullCalendar('renderEvent', {
	                        title: title,
	                        start: start,
	                        end: end,
	                        allDay: allDay
	                    }, true // make the event "stick"
	                );
	            }
	            calendar.fullCalendar('unselect');
	        },
	        eventRender: function (event, element, icon) {
	        	element.find('.fc-event-time').hide();
	        	element.bind('dblclick', function() {
					cita.numClick++;
					if(cita.numClick<2){}
					else{cita.numClick=0;}
					
					if(event._id>0)
					{
						cita.winPop({
							tipo :w.tipo,
							ky   : event._id,
							modo : 'MODIFICAR',
							callback:function(){
								$.extend(w, { cit: Sisem.getRangoIniFin( w.$e.find('[name=headerCalendar]').find('[name=cal_fini]').val() ) } );
								w.$e.find('[id=calendar]').empty();
								cita.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));
							}
						});	        		
					}//if(event._id>0)        	         
	        	});//element.bind('dblclick', function() {
//	            if (!event.description == "") {
//	                element.find('.fc-event-title').append("<br/><span class='ultra-light'>" + event.description + "</span>");
//	            }
//	            if (!event.icon == "") {
//	                element.find('.fc-event-title').append("<i class='air air-top-right fa " + event.icon + " '></i>");
//	            }
	        },
	        eventResize: function(event, delta, revertFunc) {
	            console.log('finalizo el cambio');
	        	if(event._id>0)
	        	{
	        		cita.modificarEvento($.extend(w, {
	        			evt: {
		        			cit_kycit: event._id,
		        			cit_fini : moment(event._start).format('YYYY-MM-DD HH:mm'),
		        			cit_ffin : moment(event._end).format('YYYY-MM-DD HH:mm')	
	        			}
	        		}));
	        	}//if(event._id>0)	            
	        },
	        eventDrop: function(event, delta, revertFunc) {
	        	console.log('termino de soltar');
	        	if(event._id>0)
	        	{
	        		cita.modificarEvento($.extend(w, {
	        			evt: {
		        			cit_kycit: event._id,
		        			cit_fini : moment(event._start).format('YYYY-MM-DD HH:mm'),
		        			cit_ffin : moment(event._end).format('YYYY-MM-DD HH:mm')	
	        			}
	        		}));
	        	}//if(event._id>0)	            	        	
	        },	        
	        eventClick: function(event, element) {
//	        	console.log(element);
	        },	        	        
	        windowResize: function (event, ui) {
	        	console.log('evento resize');
	            $('#calendar').fullCalendar('render');
	        },
	        dayClick: function (date, allDay, jsEvent, view) {
	    		cita.winPop({
	    			modo: 'AGREGAR',
	    			tipo: 'CITA',
	    			cit : {
	    				cit_fdia: moment(date).format('dddd, DD MMMM YYYY').toUpperCase(),
	    				cit_hini: moment(date).format('HH:mm'),
	    				cit_hfin: moment(date).add(0.5,'hours').format('HH:mm'),
	    				cit_fini: moment(date).format('YYYY-MM-DD HH:mm'),
	    				cit_ffin: moment(date).add(0.5,'hours').format('YYYY-MM-DD HH:mm')
	    			},
	    			callback:function(data){
	    				$.extend(w, { cit: Sisem.getRangoIniFin( w.$e.find('[name=headerCalendar]').find('[name=cal_fini]').val() ) } );
	    				w.$e.find('[id=calendar]').empty();
	    				cita.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));
	    			}
	    		});
	        }				        
	    });
	    /* hide default buttons */
	    $('.fc-header-right, .fc-header-center').hide();

		$('#calendar-buttons #btn-today').click(function () {
		    $('.fc-button-today').click();
		    return false;
		});

		w.$e.find('.fc-header-left').hide();

		w.$e.find('[name=headerCalendar]').find('[name=btnSetFecCal]').click(function () {
			$.extend(w, { cit: Sisem.getRangoIniFin( w.$e.find('[name=headerCalendar]').find('[name=cal_fini]').val() ) } );
			w.$e.find('[id=calendar]').empty();
			cita.iniciarBrowse($.extend(w,{idGrid:w.pag.idGridWB, showMenCtx: true, showToolBar: false, multiSelect: false, autoWidth: true, search: false, refreshButton: false}));			
		    return false;
		});
		
	   /** ******************************
		** FIN : CONFIGURACION DASHBOARD
		** ******************************/
	},//generarCalendario: function(w){
	modificarEvento: function(w)
	{
		Sisem.blockW(w.$e);
		var data={comando: 'MODIFICAR', cit_kycit: w.evt.cit_kycit, cit_fini: w.evt.cit_fini, cit_ffin: w.evt.cit_ffin};
		Sisem.ejecutar('erp/CtrlCita',data, function(rpta){
			if(rpta.msg.type=='success')
			{
				w.$e.find('[name=cit_kycit]').val(rpta.cit_kycit);
				$.extend(w,{modo: 'VISUALIZAR'});
				cita.iniciarFormulario(w);
			}//if(rpta.msg.type=='success')
			Sisem.unblockW(w.$e);
		});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){				
	}//modificarEvento: function(w)
};