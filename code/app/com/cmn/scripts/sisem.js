var $prvEleDom = "input[type='text'], input[type='number'], textarea, select";
// IIFE to ensure safe use of $
(function( $ ) {
	  // Create plugin
	$.fn.tooltips = function(w) {
		var $tooltip, $body = $('body'), $el;
		var $idx = w.ultimoTabIndex;
		// Ensure chaining works
		return this.each(function(i, el) {
			if( ( $(el).prop('type')=='text' || $(el).prop('type')=='number' || $(el).prop('type')=='textarea' || $(el).prop('type')=='select-one') ){
				if((typeof $(el).attr("data-tooltip")==='undefined') && (typeof $(el).attr('tabIndex') != "undefined") && $(el).attr('tabIndex')!=""){
					$idx++;
					$(el).attr("title", $(el).attr("placeholder"));
					$(el).attr("tabIndex", $idx);
					$el = $(el).attr("data-tooltip", $idx);
					// Make DIV and append to page 
					var placeholder=''
					if(typeof $el.attr('placeholder') === "undefined"){placeholder = 'Ingrese';}
					else{placeholder = $el.attr('placeholder');}
	
					var $tooltip = $('<div class="tooltip" data-tooltip="' + $idx + '">' + placeholder + '<div class="arrow"></div></div>').appendTo($el.parent());
					
					$el
					// Get rid of yellow box popup
					//.removeAttr("title")
					// Mouseen
					.on('focus', function(e){
						$el = $(this);
						$tooltip = w.$e.parent().find('div[data-tooltip=' + $el.data('tooltip') + ']');
						// Reposition tooltip, in case of page movement e.g. screen resize    
						var linkPosition = $el.position();

						$tooltip.css({
						  top: linkPosition.top - $tooltip.outerHeight() - 12,
						  left: linkPosition.left
						});
						// Adding class handles animation through CSS
						$tooltip.addClass("active");
						// Mouseleave
						e.stopPropagation();
			    })
			    //On Blur
			    .on('blur', function(e){
						$el = $(this);
						// Temporary class for same-direction fadeout
						$tooltip = w.$e.parent().find('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");
						// Remove all classes
						setTimeout(function() {
							$tooltip.removeClass("active").removeClass("out");
						}, 300);
						e.stopPropagation();
			    });
				}
			}
		});
	}
})(jQuery);

var Sisem = {
	politicaSeguridad: '',
	version:'1.0',
	Cargar: function(opts){
		Sisem.seguridad(opts.politicaSeguridad, function(rpta){
			var options = $.extend({
				url:null,
				type:'POST',
				contentHTML:null,
				beforeLoad:null,	
				afterLoad:null,
				container:'#content',
				data:null,
				store:false,
			},opts);
			if($.isFunction(options.beforeLoad)) options.beforeLoad();
			Sisem.sendXHR(options);
			return this;
		});
	},
	sendXHR:function(options){
		Sisem.block({$element:$('body')});
		if(options.store)
			if($.jStorage.get(options.url, false)){
				$.jStorage.get(options.url);
	        	$(options.container).html($.jStorage.get(options.url));
	        	if($.isFunction(options.afterLoad))
					options.afterLoad();
				return;
			}
		var mainsuc='main_sel_sucu='+(($('[name=main_sel_sucu]').prop('checked')==true)?1:0)+'&main_kysuc='+$('[name=main_kysuc] :selected').val();
		if(typeof USERDATA!='undefined' && typeof USERDATA.com!='undefined' && USERDATA.com!=null){options.url = ((options.url.indexOf('?')>-1)?options.url+'&kycom='+USERDATA.com.com_kycom+'&'+mainsuc : options.url+'?kycom='+USERDATA.com.com_kycom+'&'+mainsuc);}
		$.ajax({
	        url: options.url,
	        data: options.data,
	        error: function(e, xhr, opts, error){
	        	console.log("error");
	        },
	        success: function(rpta){
	        	if(options.store) $.jStorage.set(options.url, rpta);
	        	$(options.container).html(rpta);
            	if($.isFunction(options.afterLoad)) options.afterLoad();
	        },
	        complete: function(){
//	        	$('.modal-dialog').draggable();
	        	if (window.matchMedia('(min-width: 768px)').matches)
	        	{
	        		$(options.container).closest('.modal-dialog').css({"width": options.width, "margin": "30px auto"});
	        	}
	        	if (window.matchMedia('(min-width: 992px)').matches)
	        	{
	        		$(options.container).closest('.modal-dialog').css({"width": options.width, "margin": "30px auto"});
	        	}
	        	$(options.container).css('overflow','hidden');
	        	Sisem.unblock({$element:$('body')});
	        },
	        type: options.type
		});
	},
	WindowBS:function(opts){
		var options = $.extend({
			id:null,
			title:'Ventana',
			
			url:null,
			urlIframe:null,
			modal:true,
			
			width:200,
			height:200,
			
			resizable:false,
			draggable:true,
			
			onOpen:null,
			beforeLoad:null,
			afterLoad:null,
			onClose:null,
			
			buttons:null,
			
		},opts);
		Sisem.seguridad(opts.politicaSeguridad, function(rpta){
			opts.politicaSeguridad='VALIDADO';
			var $element = $('<div id="'+options.id+'-dialog" class="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" />');
			$element.append('<div class="modal-dialog">'
								+'<div class="modal-content">'
									+'<div class="modal-header">'
										+'<button name="btnCerrarWindowBSModal" type="button" class="close" data-dismiss="modal" aria-hidden="true">'
											+'&times;'
										+'</button>'
										+'<h4 class="modal-title" id="myModalLabel" style="cursor: move;">'+options.title+'</h4>'
									+'</div>'
									+'<div id="'+options.id+'" class="modal-body"></div>'
									+'<div id="'+options.id+'-footer" class="modal-footer" style="padding: 5px 0px 5px 0px;"></div>'
								+'</div>'
							+'</div>');
			if(options.buttons){
				if(options.buttons.length>0){
					var $footer = $element.find('.modal-footer');
					if(options.buttons){
						$.each(options.buttons, function(id, ele) {
							var tabIndex = ((ele.tabIndex)?' tabIndex="'+ele.tabIndex+'"':'');
							var placeholder = ((ele.placeholder)?' placeholder="'+ele.placeholder+'"':'');
							if($.type(ele)=='function'){
								$footer.append('<div style="display:inline-block"><button type="button" class="btn btn-default"'+placeholder+tabIndex+'>'+id+'</button></div>&nbsp;').find('button:last').click(function(){ ele(); });
							}else{
								$footer.append('<div style="display:inline-block"><button type="button" name="'+ele.name+'"'+placeholder+tabIndex+'>'+ele.html+'</button></div>&nbsp;').find('button:last').click(function(eve){ele.click(eve);}).addClass(ele.class);
							}
				    });
					}
				}
			}
			$element.modal();
			$element.on('shown.bs.modal',function(){
				if(options.url==null){
					if($.isFunction(options.afterLoad)) setTimeout(options.afterLoad(),2000);
				}
				if(options.url!=null){
					Sisem.Cargar({
						politicaSeguridad: options.politicaSeguridad,
						url:options.url,
						type:'GET',
					    width:options.width,
					    height:options.height,
						container:'#'+options.id,
						beforeLoad:options.beforeLoad,
						afterLoad:options.afterLoad
					});
				}
				if(options.urlIframe!=null){
					alert('tres');
					$('<iframe />', {
					    name: 'iframe_print',
					    id:   'iframe_print',
					    src:   options.urlIframe,
					    width:options.width-50,
					    height:options.height-150
					}).appendTo('#'+options.id);
				}
				if(options.embedData!=null){
					$('<embed />', {
					    name: 'embed_print',
					    id:   'embed_print',
					    src:   options.embedData,
					    width:options.width-50,
					    height:options.height-150
					}).appendTo('#'+options.id);
				}
			});
			$element.on('hide.bs.modal',function(){
				return false;
//				$element.remove();
			});
			$element.find('[name=btnCerrarWindowBSModal]').on('click',function(){
				$element.closest('.modal').prev('.modal-backdrop').remove();
				$element.closest('.modal').remove();
//				$element.remove();
			});
			$element.find('.modal-title').on('mousedown',function(){
				$('.modal-dialog').draggable();
			});
			$element.find('.modal-title').on('mouseup',function(){
				$('.modal-dialog').draggable('destroy');
			});		
			//return true;			
		});//Sisem.seguridad(opts.politicaSeguridad, function(rpta){
	},
	Window:function(opts){
		var options = $.extend({
			id:null,
			title:'Ventana',
			
			url:null,
			urlIframe:null,
			modal:true,
			
			width:200,
			height:200,
			
			resizable:false,
			draggable:true,
			
			onOpen:null,
			beforeLoad:null,
			afterLoad:null,
			onClose:null,
			
			buttons:null,
			
		},opts);
		var url = this.href;
		var winBack= $('<div class="modal" id="winbBack'+options.id+'" style="display:block; background:black; opacity:0.3;overflow-y:auto">').appendTo('body');
		var dialog = $('<div id="'+options.id+'" style="display:none" class="loading"></div>').appendTo('body');
		dialog.dialog({
			title:options.title,
			width:options.width,
			height:options.height,
			resizable:options.resizable,
			draggable:options.draggable,
			open:function(){
				$(this).dialog('widget').find("span.ui-dialog-title").empty().append(options.title);
				if($.isFunction(options.onOpen)) options.onOpen();
				if(options.url!=null){
					Sisem.Cargar({
						politicaSeguridad: options.politicaSeguridad,
						url:options.url,
						type:'GET',
						container:'#'+options.id,
						beforeLoad:options.beforeLoad,
						afterLoad:options.afterLoad
					});
				}
				if(options.urlIframe!=null){
					var mainsuc='main_sel_sucu='+(($('[name=main_sel_sucu]').prop('checked')==true)?1:0)+'&main_kysuc='+$('[name=main_kysuc] :selected').val();
					if(typeof USERDATA!='undefined'){options.urlIframe = ((options.urlIframe.indexOf('?')>-1)?options.urlIframe+'&kycom='+USERDATA.com.com_kycom+'&'+mainsuc : options.urlIframe+'?kycom='+USERDATA.com.com_kycom+'&'+mainsuc);}
					$('<iframe />', {
					    name: 'iframe_print',
					    id:   'iframe_print',
					    src:   options.urlIframe,
					    width:options.width-50,
					    height:options.height-150
					}).appendTo('#'+options.id);
				}
				if(options.embedData!=null){
					$('<embed />', {
					    name: 'embed_print',
					    id:   'embed_print',
					    src:   options.embedData,
					    width:options.width-50,
					    height:options.height-150
					}).appendTo('#'+options.id);
				}
			},
			close: function(event, ui) {
				winBack.remove();
				dialog.remove();
				if($.isFunction(options.onClose)) options.onClose();
			},
			modal: options.modal,
			buttons: options.buttons
		});
		return false;
	},
	windowPrint:function(opts){
		var options = $.extend({
			title:'Vista Previa',
			width:$(window).width(),
			height:$(window).height(),
			resizable:false,
			draggable:false,
			buttons:{
				"Cerrar Impresion":function(){
					$(this).dialog('close');
				}
			},
			onOpen:function(){
				$('body').addClass('printing');
			},
			onClose:function(){
				$('body').removeClass('printing');
			}
		},opts);
		new Sisem.Window(options);
	}
};
Sisem.llenarCombo = function(urlList,nameEle){
	$.get(urlList,function(rpta){
		$('[name='+nameEle+']').append('<option value="0">Seleccione</option>');
		for(var ite=0;ite<rpta.length;ite++){
			$('[name='+nameEle+']').append('<option value="'+rpta[ite].id+'">'+rpta[ite].ds+'</option>');	
		}
	},'json');
}
Sisem.IGV = function(parValor, parTipo) {
	if (parTipo > 0) {
		parValor = parValor * (1 + (PRVIGV / 100));
	} else if (parTipo < 0) {
		parValor = parValor / (1 + (PRVIGV / 100));
	}
	return Sisem.redondeoString(parValor);
}
Sisem.strIGV = function(strNumero)
{
	var numero = parseFloat(strNumero);
	var cifras = Math.pow(10, PRVDECIPREC);
	if (parTipo > 0) {
		parValor = parValor * (1 + (PRVIGV / 100));
	} else if (parTipo < 0) {
		parValor = parValor / (1 + (PRVIGV / 100));
	}
	var valor = Math.round(numero*cifras)/cifras;
	var strVal = valor.toString();
	var arrStrVal = strVal.split('.');
	var valInt = '';
	var valDec = '';
	if(arrStrVal.length > 1){
		valInt = arrStrVal[0];
		valDec = arrStrVal[1];
	}else {
		valInt = arrStrVal[0];
		valDec = '0';		
	}
	var strDec = Sisem.llenarCaracter(valDec, 5, 'D', '0');
}
Sisem.llenarCeros=function(n, length) {
  var  n = n.toString();
  while(n.length < length)
       n = "0" + n;
return n;
}
Sisem.llenarCaracter=function(parValor, canCar, ubicacion, letra) {
  numCero = canCar - parValor.toString().length;
  if (numCero > 0) {
    for (var i = 1; i <= numCero; i++) {
      if(ubicacion=='D'){
        parValor = parValor + letra;
      }
      else if(ubicacion=='I'){
        parValor = letra + parValor;
      }
    }
  }
  return parValor.substr(0, canCar);;
}
Sisem.redondeoString = function(numero)
{
	var resultado = Sisem.redondeoDouble(numero);
	resultado = resultado.toFixed(GLBDECIMAL);
	return resultado;
}
Sisem.redondeoDouble = function(numero)
{
	var flotante = parseFloat(numero);
	return Math.round(flotante*Math.pow(10, GLBDECIMAL))/Math.pow(10, GLBDECIMAL);
}
Sisem.roundFloat = function(numero, decimales)
{
	var flotante = parseFloat(numero);
	var resultado = Math.round(flotante*Math.pow(10,decimales))/Math.pow(10,decimales);
	resultado = resultado.toFixed(decimales);
	return parseFloat(resultado);
}
Sisem.randomHora = function(inferior, superior)
{ 
   	var numPosibilidades = superior - inferior 
   	var aleat = Math.random() * numPosibilidades 
   	aleat = Math.round(aleat) 
   	return parseInt(inferior) + aleat 
}
Sisem.block = function(opts){
	var left= 0;
	left= ($(window).width()-50)/2;
	var style = '';
	if(opts==null){
		style = 'style="position:fixed;top:40%;left:'+left+'px;width:50px;"';
	}
	var options = $.extend({
		element:$('body'),
		overlayCSS: { backgroundColor: '#FFF' },
		/*css:{
			border: 'none', 
	        padding: '15px', 
	        backgroundColor: '#FFF',
	        '-webkit-border-radius': '10px', 
	        '-moz-border-radius': '10px', 
	        opacity: .5, 
	        color: '#0000'
		},*/
		css:{
			/*centerY: 0,
			top:'0px',
			left:'',
			right:'0px',*/
			border: 'none', 
	        backgroundColor: 'transparent',
		},
        /*message:'<div class="container-loading">'
		  	+'<div class="cube">'
			+'    <div class="side side1"></div>'
			+'    <div class="side side2"></div>'
			+'    <div class="side side3"></div>'
			+'    <div class="side side4"></div>'
			+'    <div class="side side5"></div>'
			+'    <div class="side side6"></div>'
		  	+'</div>'
		+'</div>'*/
		message: '<div '+style+' class="loader">'
		+'<h1></h1>'
		+'<span></span>'
		+'<span></span>'
		+'<span></span>'
		+'</div>'
	},opts);

	options.element.block(options);
};
Sisem.unblock = function(opts){
	var options = $.extend({
		element:$('body')	
	},opts);
	options.element.unblock();
};
Sisem.blockW = function($element){
	Sisem.block({element:$element});
	if($element.data('ui-dialog')!=null){
		$element.dialog('widget').find('.ui-dialog-buttonpane button').attr('disabled','disabled');
	}else{
		$element.closest('.modal').find('.modal-footer button').attr('disabled','disabled');
	}
	//$element.css({'overflow':'hidden'});
	//$element.dialog('widget').find('.')
};
Sisem.unblockW = function($element){
	Sisem.unblock({element:$element});
	if($element.data('ui-dialog')!=null){
		$element.dialog('widget').find('.ui-dialog-buttonpane button').removeAttr('disabled');
	}else{
		$element.closest('.modal').find('.modal-footer button').removeAttr('disabled');
	}
	//$element.css({'overflow':'auto'});
};
Sisem.confirm = function (dialogText, okFunc, cancelFunc, dialogTitle) {
  	$('<div style="padding: 10px; max-width: 500px; word-wrap: break-word;">' + dialogText + '</div>').dialog({
	    draggable: false,
	    modal: true,
	    resizable: false,
	    width: 'auto',
	    title: dialogTitle || 'Confirmar',
	    minHeight: 75,
	    buttons: {
	      	Si: function () {
		        if (typeof (okFunc) == 'function') {
		          setTimeout(okFunc, 50);
		        }
		        $(this).dialog('destroy');
	      	},
	      	No: function () {
		        if (typeof (cancelFunc) == 'function') {
		          setTimeout(cancelFunc, 50);
		        }
		        $(this).dialog('destroy');
	      	}
	    }
	});
};
Sisem.entreFechas = function(fec1,fec2){
	fec1 = moment(fec1);
	fec2 = moment(fec2);
	var anio = fec2.diff(fec1,'years',true);
	var mese = fec2.diff(fec1,'months',true);
	var dias = fec2.diff(fec1,'days',true);
	var hora = fec2.diff(fec1,'hours',true);
	var minu = fec2.diff(fec1,'minutes',true);
	var segu = fec2.diff(fec1,'seconds',true);;
	
	anio = Math.floor(anio);
	mese = Math.floor(mese);
	dias = Math.floor(dias);
	hora = Math.floor(hora);
	minu = Math.floor(minu);
	segu = Math.floor(segu);

	return [anio, mese, dias, hora, minu, segu];
};
//Sisem.validarFechaCliente = function($elemento, formatoCliente){
//	
//	var txtDivisor = ( (formatoCliente.indexOf('/') >- 1) ? '/' : ( (formatoCliente.indexOf('-') >- 1) ? '-' : '' ) );
//	var arrValores = formatoCliente.split(txtDivisor);
//	var arrFecha = Arrya();
//	var formatoPlaceholder = '';
//	var idxDia = -1;
//	var idxMes = -1;
//	var idxAno = -1;
//	
//	for(clave in arrValores)
//	{
//		if(arrValores[clave]=='DD'){idxDia=clave;arrFecha.push('d'); formatoCliente+='d'+txtDivisor; formatoPlaceholder+='__'+txtDivisor}
//		if(arrValores[clave]=='MM'){idxMes=clave;arrFecha.push('m'); formatoCliente+='m'�+txtDivisor; formatoPlaceholder+='__'+txtDivisor}
//		if(arrValores[clave]=='YYYY'){idxAno=clave;arrFecha.push('Y'); formatoCliente+='Y'+txtDivisor; formatoPlaceholder+='____'+txtDivisor}
//	}
//	
//	formatoPlaceholder = substr(formatoPlaceholder, 0, 10);
//	$elemento.attr("placeholder", formatoPlaceholder);
//	$elemento.mask(formatoPlaceholder.replace(/_/g, "0"););
//};
Sisem.grid = function(p){
	if(p==null) return false;
	if(p.pagination==null) p.pagination = true;
	if(p.search==null) p.search = false;
	if(p.headfixed==null) p.headfixed = true;
	if(p.id==null) p.id = "datatable_id";
	if(p.refreshButton==null)p.refreshButton = false;
	if(p.autoWidth==null){p.autoWidth=false};
	if(p.tableCatalogo==null){p.tableCatalogo=false};
	if(p.tableWidth==null){p.tableWidth='auto'};
	if(p.multiSelect==null){p.multiSelect=false};
	var $table=null;
	var totalWidth = 0;
	$.each(p.cols, function (index, column) {
		if(column.visible==null) column.visible = true;
		if(column.visible){
			totalWidth+=column.width;
		}
	});
	if(p.autoWidth){$table = $('<table id="'+p.id+'" class="table table-bordered table-hover datagrid" style="width: 100%">');}
	else{$table = $('<table id="'+p.id+'" class="table table-bordered table-hover datagrid" style="width: '+totalWidth+'px">');}
	
	var $thead = $('<thead class="header"><tr></tr></thead>');
	var $tfoot = $('<tfoot><tr></tr></tfoot>');
	var _head_th='<th>';
		_head_th+='<div class="datagrid-header-title text-center"></div>';
		_head_th+='<div class="datagrid-header-left" style="float:left;"></div>';
		_head_th+='<div class="datagrid-header-right" style="float:right;">';
			if(p.search){
				/* search elements */
				_head_th+='<div class="input-group search">';
				    _head_th+='<input type="text" name="appendedInputButton" class="form-control" placeholder="Search...">';
				    _head_th+='<div class="input-group-btn">';
				    	_head_th+='<button type="button" class="btn btn-default btn-primary"><i class="fa fa-search"></i> Search</button>';
				    _head_th+='</div>';
			    _head_th+='</div>';
			    /* end search elements */
			}//if(p.refreshButton){
			if(p.refreshButton){
				_head_th+='<div class="input-group">';
					_head_th+='<button type="button" name="btnRefreshGrid" class="btn btn-small btn-success"><span class="fa fa-refresh"></span></button>';
				_head_th+='</div>';
			}
		_head_th+='</div>';
	_head_th+='</th>';
	
	var _foot ='<th>';
		_foot+='<div class="dataTables_info datagrid-footer-left" style="margin-top: 10px; width:50%;display:none;">';
			_foot+='<div class="grid-controls">';
				_foot+='<span><i class="datagrid-start"></i> - <i class="datagrid-end"></i> de <i class="datagrid-count"></i></span>&nbsp;';
				_foot+='<select class="datagrid-pagesize input-small" style="float:none;"><option value="10" selected>10</option><option value="20">20</option><option value="50">50</option><option value="100">100</option><option value="300">300</option></select>';
				_foot+='<span>&nbsp;Por Pag</span>';
			_foot+='</div>';
		_foot+='</div>';
		_foot+='<div class="dataTables_paginate datagrid-footer-right" style="width:50%;display:none;">';
			_foot+='<div class="datagrid-pager">';
				_foot+='<button type="button" class="btn btn-primary btn-xs datagrid-prevpage"><span class="fa fa-arrow-circle-left"></span></button>';
				_foot+='<span>Pag</span>';
				_foot+='<select class="datagrid-pages-all" style="float:none;"></select>';
				_foot+='<span>de <i class="grid-pages"></i></span>';
				_foot+='<button type="button" class="btn btn-primary btn-xs datagrid-nextpage"><span class="fa fa-arrow-circle-right"></span></button>';
			_foot+='</div>';
		_foot+='</div>';
	_foot+='</th>';
	$thead.find('tr').append(_head_th);
	$tfoot.find('tr').append(_foot);
	$table.append($thead);
	$table.append($tfoot);
	p.$el.append($table);
	p.$thead = p.$el.find('thead');
	p.$theadTitle = p.$el.find('.datagrid-header-title');
	p.$theadleft = p.$el.find('.datagrid-header-left');
	p.$tfoot = p.$el.find('tfoot');
	p.$footer = p.$el.find('tfoot th');
	p.$footerchildren = p.$footer.children().show().css('visibility', 'hidden');
	p.$topheader = p.$el.find('thead th');
	p.$searchcontrol = p.$el.find('.search');
	/*this.$filtercontrol = this.$element.find('.filter');*/
	p.$pagesize = p.$el.find('.datagrid-pagesize');
	p.$pagedropdown = p.$el.find('.datagrid-pages-all');
	p.$prevpagebtn = p.$el.find('.datagrid-prevpage');
	p.$nextpagebtn = p.$el.find('.datagrid-nextpage');
	p.$pageslabel = p.$el.find('.datagrid-pages');
	p.$countlabel = p.$el.find('.datagrid-count');
	p.$startlabel = p.$el.find('.datagrid-start');
	p.$endlabel = p.$el.find('.datagrid-end');
//p.$tbody = $('<tbody style="height: '+p.$height+'px; overflow: auto">').insertAfter(p.$thead);
	p.$tbody = $('<tbody style="overflow: auto">').insertAfter(p.$thead);
	p.$colheader = $('<tr>').appendTo(p.$thead);
	p.$footer.attr('colspan', p.cols.length);
	p.$topheader.attr('colspan', p.cols.length);

	if(!p.tableCatalogo)
	{
		var _cssColHtml = '';
		$.each(p.cols, function (index, column) {
			if(column.visible==null) column.visible = true;
      if(column.visible)
      {
				var _cssColWidth='';
				var widthPorc = column.width*100/totalWidth;

				if(p.autoWidth){_cssColWidth=' width="'+Sisem.roundFloat(widthPorc,2)+'%"';}
//			else{_cssColWidth=' style="width='+column.width+'px; max-width='+column.width+'px;"';}

				var cssHeaderColumnAlign = '';
				if(column.style) 
				{
					cssHeaderColumnAlign = column.style.substring(column.style.indexOf('text-align'), column.style.length - 1);
				}
	
				var divFiltro = '';
				divFiltro += '<button name="col_'+column.name+'" style="width: 100%;" class="btn btn-info btn-xs"  '+((column.search=='true')?'':'')+'><i class="fa fa-reorder"></i>&nbsp'+column.descr+'</button>';
				divFiltro += '<input type="text" name="filter_'+column.name+'" style="width: 100%;' + cssHeaderColumnAlign + '" class="form-control input-xs" title="ope" '+((column.search=='true')?'':'disabled')+'/>';			

				if (column.name)
				{
					_cssColHtml += '<th'+_cssColWidth+'>'+divFiltro+'</th>';
				}
				else
				{
					if(column.descr=='ACC')
						_cssColHtml += '<th'+_cssColWidth+'>'+column.descr+'</th>';
					else
						_cssColHtml += '<th'+_cssColWidth + ' style="padding-left: 5px;">'+column.descr+'</th>';
				}	        	
      }
		});
		
		p.$colheader.append(_cssColHtml);
		
		$.each(p.cols, function (index, column) {
			if (column.name && column.visible){
				p.$colheader.find('[name=col_' + column.name + ']').css( 'cursor', 'pointer' );
				p.$colheader.find('[name=col_' + column.name + ']').click(function(){	
					var orderColumn=$(this).attr('name');
					var orderType=p.$el.data('grid_params').orderType;
					
					$(this).closest('tr').children('th').find('.fa').removeClass('fa-sort-amount-desc');
					$(this).closest('tr').children('th').find('.fa').removeClass('fa-sort-amount-asc');
					
					p.$el.data('grid_params').orderColumn=orderColumn.substring(orderColumn.indexOf('_')+1,orderColumn.length);
					if(orderType.toLowerCase()=='asc'){p.$el.data('grid_params').orderType='desc';$(this).closest('th').find('.fa').addClass('fa-sort-amount-desc');}
					if(orderType.toLowerCase()=='desc'){p.$el.data('grid_params').orderType='asc';$(this).closest('th').find('.fa').addClass('fa-sort-amount-asc');}
//					p.$searchcontrol.find('button').click();
					p.renderData();
				});
			}
		});		
	}//if(!p.tableCatalogo)
	if(p.toolbarURL!=null||p.toolbarHTML!=null){
		if(p.toolbarURL!=null){
			$.post(p.toolbarURL,function(html){
				p.$theadleft.append(html);
				if($.isFunction(p.onContentLoaded))
					p.onContentLoaded(p.$theadleft);
			});
		}else{
			p.$theadleft.append(p.toolbarHTML);
			if($.isFunction(p.onContentLoaded))
				p.onContentLoaded(p.$thead);
		}
	}
	if(p.titleHTML!=null){
		p.$theadTitle.append(p.titleHTML);
	}
	if(p.paramSearch!=null){
		p.$thead.find('#appendedInputButton').before('<select name="paramSearch"></select>');
		if(p.paramSearch.length>0){
			for(var i=0;i<p.paramSearch.length;i++){
				p.$thead.find('[name=paramSearch]').append('<option value="'+p.paramSearch[i].val+'">'+p.paramSearch[i].txt+'</option>');
			}
		}
	}
	$.extend(p,{
		updatePageDropdown: function(data){
			if(data==null){
//				$.smallBox({
//					title : "Respuesta!",
//					content : "No se han encontrado coincidencias para la busqueda",
//					color : "#C46A69",
//					timeout: 8000,
//					icon : "fa fa-bell swing animated"
//				});
				return false;
			}else{
				if(parseInt(data.rowcount)==0){					
//					$.smallBox({
//						title : "Respuesta!",
//						content : "No se han encontrado coincidencias para la busqueda",
//						color : "#C46A69",
//						timeout: 8000,
//						icon : "fa fa-bell swing animated"
//					});
					return false;
				}
			}	
			p.$pagedropdown.empty();
			var pageHTML = '';
			for (var i = 1; i <= data.pagecount; i++) {
				pageHTML += '<option value="'+i+'">' + i + '</option>';
			}
			p.$pagedropdown.html(pageHTML);
			p.$pagedropdown.find('option[value='+data.page+']').attr('selected','selected');
			p.$pageslabel.text(data.pagecount);
//			p.$countlabel.html(data.rowcount + ' ' + p.itemdescr);
			p.$countlabel.html(data.rowcount + ' Reg');
			var ini = 1 + (data.page-1)*data.pagerows;
			p.$startlabel.text(ini);
			p.$endlabel.text(ini+parseInt(data.pagerows)-1);
		
			p.$prevpagebtn.removeAttr('disabled');
			p.$nextpagebtn.removeAttr('disabled');
			if(parseInt(data.page)==1){
				p.$prevpagebtn.attr('disabled',"disabled");
			}
			if(parseInt(data.page)==parseInt(data.pagecount)){
				p.$nextpagebtn.attr('disabled',"disabled");
			}
		},
		renderData: function(page){
			if($.isFunction(p.params)){
				p.params = p.params();
			}
			if($.isFunction(p.checkRender)){
				if(p.checkRender(p.$theadleft)==false) return p;
			}
			
			$.extend(p.params,Sisem.obtenerParametrosJson(p.$thead));
			$.extend(p.params,{
				main_sel_sucu: (($('[name=main_sel_sucu]').prop('checked')==true)?1:0),
				main_kysuc: $('[name=main_kysuc] :selected').val()
			});
			if(p.pagination==true){
				var paramSearch = '';
				if(p.paramSearch!=null){				
					paramSearch = p.$thead.find('[name=paramSearch] :selected').val();
				}
				$.extend(p.params,{
					main_sel_sucu: (($('[name=main_sel_sucu]').prop('checked')==true)?1:0),
					main_kysuc: $('[name=main_kysuc] :selected').val(),
					text: p.$searchcontrol.find('input').val(),
					paramSearch: paramSearch,
					pagerows: p.$pagesize.find('option:selected').val(),
					pagecount: p.$pagesize.find('option:selected').val(),
					page: (page) ? page : (p.$pagedropdown.find('option:selected').val()?p.$pagedropdown.find('option:selected').val():1)
				});
			}
			p.$tbody.empty();
			if($.isFunction(p.onLoading)){
				p.onLoading();
			}
			$.post(p.data,p.params,function(data){
				if(p.pagination==true){
					p.$footerchildren.css('visibility', function () {
						if(p.inObject!=null){
							return (data[p.inObject].paging.rowcount > 0) ? 'visible' : 'hidden';
						}else{
							return (data.paging.rowcount > 0) ? 'visible' : 'hidden';
						}
					});
					if(p.inObject!=null){
						p.updatePageDropdown(data[p.inObject].paging);
					}else{
						p.updatePageDropdown(data.paging);
					}
				}
				if(p.inObject!=null){
					if($.isFunction(p.fill)){
						if(data[p.inObject].paging!=null){
							if(data[p.inObject].items!=null)
								for(var i=0,j=data[p.inObject].items.length; i<j; i++){
									p.$tbody.append(p.fill(data[p.inObject].items[i],$('<tr class="item">')));
								}
						}else{
							if(data!=null)
								p.fill(data[p.inObject],p.$tbody);
						}
					}else p.load(data,p.$tbody,p.cols);
				}else{
					if($.isFunction(p.fill)){
						if(data.paging!=null){
							if(data.items!=null)
								for(var i=0,j=data.items.length; i<j; i++){
									p.$tbody.append(p.fill(data.items[i],$('<tr class="item">')));
								}
						}else{
							if(data!=null)
								p.fill(data,p.$tbody);
						}
					}else p.load(data,p.$tbody,p.cols);
				}	
				//K.resetModals();
				if($.isFunction(p.onComplete)){
					p.onComplete();
				}
				p.$tbody.find('.item').css( 'cursor', 'grab' );
				p.$tbody.find('.item').click(function(){
					if(p.multiSelect)
					{
						if($(this).closest('.highlights').length>0)
						{
							$(this).closest('.item').removeClass('highlights');
						}
						else
						{
							$(this).closest('.item').addClass('highlights');	
						}
					}
					else
					{
						p.$tbody.find('.item').removeClass('highlights');
						$(this).closest('.item').addClass('highlights');
					}
				});
				/**  Saving params in element p.$el */
				p.$el.data('grid_params',p.params);
				console.log('Tabla parametros : '+p.id);
				console.log(p.$el.data('grid_params'));
			},'json');
		},
		reinit: function(newP){
			$.extend(p,newP);
			p.renderData();
		}
	});
	if(p.pagination==true){
		p.$prevpagebtn.click(function(){
			var val = parseInt(p.$pagedropdown.find('option:selected').val());
			p.$pagedropdown.find('option[value='+(val--)+']').attr('selected','selected');
			p.renderData(val);
		});
		p.$nextpagebtn.click(function(){
			var val = parseInt(p.$pagedropdown.find('option:selected').val());
			p.$pagedropdown.find('option:selected').removeAttr('selected');
			p.$pagedropdown.find('option[value='+(val++)+']').attr('selected','selected');
			p.renderData(val);
		});
		p.$pagesize.change(function(){ p.renderData(); });
		p.$pagedropdown.change(function(){ p.renderData(); });
	}else{
		p.$tfoot.remove();
	}
	if(p.search==true){
		p.$searchcontrol.find('input').keyup(function(e){
			if(e.keyCode == 13) p.$searchcontrol.find('button').click();
		});
		p.$searchcontrol.find('button').click(function(){
			p.renderData();
		});
	}else{
		p.$searchcontrol.remove();
	}
	p.renderData();
	p.$el.on("reloadGrid",function(){
		var newP = p.$el.data('grid_params');
		$.extend(p,newP);
		if(p.onReloadGrid!=null){
			if($.isFunction(p.onReloadGrid)){
				p.onReloadGrid();
			}
		}else{
			p.renderData();
		}
	});
//	p.$el.find('[name=btnRefreshGrid]').click(function(){
//		p.$el.trigger('reloadGrid');
//	});
	//p.$tbody.css({height:$(window).height()-p.$thead.height()-p.$tfoot.height()-$('#titleBar').height()-$('#dock').height()-10});
	return p;
};
Sisem.cmd = function(cmd,callback){
	if(!window.listCommands) listCommands = [];
	if(listCommands[cmd]){
		requirejs(listCommands[cmd],
		function() {
			//eval(cmd);
			if($.isFunction(callback))
				callback();
		});
	}else{
		console.log('el comando no existe');
	}
}
Sisem.isEmpty = function(s){
	//paramTest || ( paramTest = false );
	return ((s == undefined) || (s == null) || (s.length == 0) || (s == 0) || (s == '0') || (s == '0.00'));
};
Sisem.msgBox = function(type, text){
	$.smallBox({title : "SISPROM",content : text,color : genColor[type],timeout: 3000,icon : "fa fa-bell"});
};
Sisem.msgAsk = function(title, text, callback){
	$.SmartMessageBox({
		title : "<i class='fa fa-sign-out txt-color-orangeDark'></i>"+title+"<span class='txt-color-orangeDark'><strong>&nbsp;"+text+"</strong></span>",
		content : "",
		buttons : '[No][Si]'
	}, function(ButtonPressed) {
		if(typeof callback == 'function'){callback(ButtonPressed);};
	});
};
Sisem.msgAskInp = function(title, callback){
	$.SmartMessageBox({
		title : "<i class='fa fa-sign-out txt-color-orangeDark'></i>"+title+"</strong></span>",
		content : "",
		buttons : '[Cancelar][Aceptar]',
		input: 'text',
		inputValue : moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
	}, function(ButtonPressed, ValuePressed) {
		if(typeof callback == 'function'){callback(ButtonPressed, ValuePressed);};
	});
};
Sisem.activar = function($ele, activo, color) {
	var arrColor = Array();
	arrColor['ROJO']='btn-danger';
	arrColor['AZUL']='btn-primary';
	arrColor['INFO']='btn-info';
	arrColor['NARANJA']='btn-warning';
	arrColor['WARN']='btn-warning';
	arrColor['VERDE']='btn-success';
	arrColor['ENABLED']='btn-success';
	arrColor['DISABLED']='disabled';

	if($ele.prop('tagName')=='BUTTON')
	{
		$ele.removeClass('btn-danger btn-primary btn-info btn-warning btn-success btn-default disabled');
		if(activo){
			$ele.attr('disabled',false);
			if(!Sisem.isEmpty(color) && color){
				$ele.addClass(arrColor[color]);
			}
		}
		else{
			if(!Sisem.isEmpty(color) && color){
				$ele.addClass(arrColor[color]);
			} else {
				$ele.addClass('btn-default');
			}
			$ele.addClass(arrColor['DISABLED']);
			$ele.attr('disabled','disabled');
		}
	}
	else if($ele.prop('type')=='text' || $ele.prop('type')=='number' || $ele.prop('type')=='textarea' || $ele.prop('type')=='select-one' || $ele.prop('type')=='checkbox')
	{
		$ele.attr('disabled',!activo);
		if(activo)
		{
			$ele.attr('tabindex','1');
			$ele.css('border-color',genColor['bordeenabled']);
			$ele.css('background-color',genColor['backenabled']);
		}
		else
		{
			$ele.removeAttr('tabindex');
			$ele.css('border-color',genColor['bordedisabled']);
			$ele.css('background-color',genColor['backdisabled']);			
		}			
	}
};
Sisem.edit = function($ele, activo, color) {
	var arrColor = Array();
	arrColor['ROJO']='btn-danger';
	arrColor['AZUL']='btn-primary';
	arrColor['VERDE']='btn-success';
	arrColor['ENABLED']='btn-success';
	arrColor['DISABLED']='btn-default disabled';

	if($ele.prop('tagName')=='BUTTON')
	{
		$ele.removeClass('btn-success btn-primary btn-danger btn-default disabled');
		if(activo){
			$ele.attr('readonly',false);
			if(color && !Sisem.isEmpty(color)){
				$ele.addClass(arrColor[color]);
			}else{
				$ele.addClass(arrColor['ENABLED']);
			}
		}
		else{
			$ele.attr('readonly',true);
			if(color && !Sisem.isEmpty(color)){
				$ele.addClass(arrColor[color]);
			}else{
				$ele.addClass(arrColor['DISABLED']);
			}
		}
	}else{
		$ele.attr('readonly',!activo);
	}
};
Sisem.validarControles = function($win,grupo)
{
	return Sisem.validarControlesColor($win,grupo,'error');
}
Sisem.validarControlesColor = function($win,grupo,modo)
{
	modo = ((typeof modo!='undefined')?modo:'VISUALIZAR');
	var color = ((modo=='VALIDAR')?'error':'success');
	var textAreas = $win.children().find('textarea');
	var inputs = $win.children().find('input');
	var selects = $win.children().find('select');
	
	if(textAreas.length==0){textAreas = $win.find('textarea');}
	if(inputs.length==0){inputs = $win.find('input');}
	if(selects.length==0){selects = $win.find('select');}
		
	var validado = true;
	
	for ( var iteTxtA = 0; iteTxtA < textAreas.length; iteTxtA++) 
	{
		if(textAreas[iteTxtA].name.length>0){
	    	if($win.find("[name=" + textAreas[iteTxtA].name+"]").hasClass('disabled')){$win.find("[name=" + textAreas[iteTxtA].name+"]").attr('disabled',true);}
	    	if(typeof $win.find("[name=" + textAreas[iteTxtA].name+"]").attr('disabled')!='undefined')
	    	{
	    		$win.find("[name=" + textAreas[iteTxtA].name+"]").css('border-color',colorInputHTML.PLOMO.colorBorde);
	    		$win.find("[name=" + textAreas[iteTxtA].name+"]").css('background-color',colorInputHTML.PLOMO.colorFondo);
	    	}
	    	else
	    	{
				if( modo=='VALIDAR' && textAreas[iteTxtA].getAttribute('obligatorio')!='NO' && textAreas[iteTxtA].tabIndex > 0 && (grupo.indexOf(textAreas[iteTxtA].name.substr(0,3)) > -1) && (textAreas[iteTxtA].value.trim() == "" || textAreas[iteTxtA].value.trim() == "Seleccione"))
				{
					$win.find("[name=" + textAreas[iteTxtA].name+"]").css('border-color',colorInputHTML.ROJO.colorBorde);
					$win.find("[name=" + textAreas[iteTxtA].name+"]").css('background-color',colorInputHTML.ROJO.colorFondo);
					validado = false;
				}
				else if(( modo=='AGREGAR' || modo=='MODIFICAR' ) && textAreas[iteTxtA].tabIndex > 0 &&  (grupo.indexOf(textAreas[iteTxtA].name.substr(0,3)) > -1) )
				{
					$win.find("[name=" + textAreas[iteTxtA].name+"]").css('border-color', colorInputHTML.VERDE.colorBorde);
					$win.find("[name=" + textAreas[iteTxtA].name+"]").css('background-color', colorInputHTML.VERDE.colorFondo);
				}
				else
				{
		    		$win.find("[name=" + textAreas[iteTxtA].name+"]").css('border-color', colorInputHTML.BLANCO.colorBorde);
		    		$win.find("[name=" + textAreas[iteTxtA].name+"]").css('background-color', colorInputHTML.BLANCO.colorFondo);
				}
	    	}
		}
	}
	for ( var iteInp = 0; iteInp < inputs.length; iteInp++) {
		if(inputs[iteInp].name.length>0){
			if ((inputs[iteInp].type == "text")
					|| (inputs[iteInp].type == "number")
					|| (inputs[iteInp].type == "password")
					|| (inputs[iteInp].type == "radio")
					|| (inputs[iteInp].type == "checked")) 
			{
		    	if($win.find("[name=" + inputs[iteInp].name+"]").hasClass('disabled')){$win.find("[name=" + inputs[iteInp].name+"]").attr('disabled',true);}
		    	if(typeof $win.find("[name=" + inputs[iteInp].name+"]").attr('disabled')!='undefined')
		    	{
		    		$win.find("[name=" + inputs[iteInp].name+"]").css('border-color',colorInputHTML.PLOMO.colorBorde);
		    		$win.find("[name=" + inputs[iteInp].name+"]").css('background-color',colorInputHTML.PLOMO.colorFondo);
		    	}
		    	else
		    	{
					if( modo=='VALIDAR' && inputs[iteInp].getAttribute('obligatorio')!='NO' && inputs[iteInp].tabIndex > 0 && (grupo.indexOf(inputs[iteInp].name.substr(0,3)) > -1) && (inputs[iteInp].value.trim() == "" || inputs[iteInp].value == "0" || inputs[iteInp].value == "0.00" || inputs[iteInp].value == "Seleccione"))
					{
						$win.find("[name=" + inputs[iteInp].name+"]").css('border-color',colorInputHTML.ROJO.colorBorde);
						$win.find("[name=" + inputs[iteInp].name+"]").css('background-color',colorInputHTML.ROJO.colorFondo);
						validado = false;
					}
					else if(( modo=='AGREGAR' || modo=='MODIFICAR' ) && inputs[iteInp].tabIndex > 0 && (grupo.indexOf(inputs[iteInp].name.substr(0,3)) > -1) )
					{
						$win.find("[name=" + inputs[iteInp].name+"]").css('border-color',colorInputHTML.VERDE.colorBorde);
						$win.find("[name=" + inputs[iteInp].name+"]").css('background-color',colorInputHTML.VERDE.colorFondo);
					}
					else
					{
			    		$win.find("[name=" + inputs[iteInp].name+"]").css('border-color',colorInputHTML.BLANCO.colorBorde);
			    		$win.find("[name=" + inputs[iteInp].name+"]").css('background-color',colorInputHTML.BLANCO.colorFondo);						
					}
		    	}				
			}			
		}
	}
	for ( var iteSel = 0; iteSel < selects.length; iteSel++) 
	{
		if(selects[iteSel].name.length>0){
			if (selects[iteSel].type == "select-one") 
			{
				var index = selects[iteSel].options.selectedIndex;
		    	if($win.find("[name=" + selects[iteSel].name+"]").hasClass('disabled')){$win.find("[name=" + selects[iteSel].name+"]").attr('disabled',true);}
		    	if(typeof $win.find("[name=" + selects[iteSel].name+"]").attr('disabled')!='undefined')
		    	{
		    		$win.find("[name=" + selects[iteSel].name+"]").css('border-color',genColor['bordedisabled']);
		    		$win.find("[name=" + selects[iteSel].name+"]").css('background-color',genColor['backdisabled']);
		    	}
		    	else
		    	{
					if( modo=='VALIDAR' && selects[iteSel].getAttribute('obligatorio')!='NO' && selects[iteSel].tabIndex > 0 && (grupo.indexOf(selects[iteSel].name.substr(0,3)) > -1) && index < 0 )
					{
						$win.find("[name=" + selects[iteSel].name+"]").css('border-color',genColor['bordeerror']);
						$win.find("[name=" + selects[iteSel].name+"]").css('background-color',genColor['backerror']);
						validado = false;
					}
					else if(( modo=='AGREGAR' || modo=='MODIFICAR' ) && selects[iteSel].tabIndex > 0 && (grupo.indexOf(selects[iteSel].name.substr(0,3)) > -1) )
					{
						$win.find("[name=" + selects[iteSel].name+"]").css('border-color',genColor['bordesuccess']);
						$win.find("[name=" + selects[iteSel].name+"]").css('background-color',genColor['backsuccess']);
					}
					else
					{
			    		$win.find("[name=" + selects[iteSel].name+"]").css('border-color',genColor['bordeenabled']);
			    		$win.find("[name=" + selects[iteSel].name+"]").css('background-color',genColor['backenabled']);
			    	}
		    	}
			}			
		}
	}
	return validado;
}
Sisem.listaOrdenadaTabIndex = function($contenedor, $parEleDom){
	/** 
	 *  Buscar primer y ultimo elemento con tab index de la pantalla actual
	 */
	var arrEleTabIndex = new Array();
	var arrEleDuplicado = new Array();
	var $lisEleTabIndex = $contenedor.find($parEleDom).filter(function( index ) {
	  return (( typeof $(this).attr("data-tooltip")!='undefined' &&  typeof $(this).attr('tabindex') != 'undefined' && $(this).attr('tabindex') != '') ? $(this) : null)
	});
	$lisEleTabIndex.each(function() {
		if($(this).attr('tabindex')!=''){
			arrEleTabIndex.push(parseInt($(this).attr('tabindex')));
			arrEleTabIndex.sort(Sisem.ordenarNumero);
		}
	});
	for (let idx = 0; idx < arrEleTabIndex.length; idx++) {
		if (arrEleTabIndex[idx + 1] === arrEleTabIndex[idx]) {
			arrEleDuplicado.push("Elemento : " + $contenedor.find("[tabIndex='"+idx+"']").attr('name') + " - tabindex : " + arrEleTabIndex[idx]);
		}
	}
	if(arrEleDuplicado.length >- 1){
//		console.log('Duplicados');
//		console.log(arrEleDuplicado)
	}
	return arrEleTabIndex;
}
Sisem.obtenerVentana=function(w){
	var $pagina = null;
	if(w.$e.closest('.modal-content').length){$pagina = w.$e.closest('.modal-content');}
	else{$pagina = w.$e.closest('.ui-content');}
	return $pagina;
};
Sisem.refreshKeyenter=function(w){
	w.$e.parent().find($prvEleDom).on("keypress", function (event, keyFromClick) {
		keyFromClick = ((typeof keyFromClick==undefined)?false:keyFromClick);
    var charCode = (event.which) ? event.which : event.keyCode;
    var source = event.target;
    var valor = source.value;
    var setFoco = false; 
    var salir = false;

    if($(this).parents('.ui-dialog').length>0){$dialog = $(this).parents('.ui-dialog');}
    else{$dialog = $(this).closest('.modal-dialog');}
  	var tabIndex = parseInt($(this).attr('tabindex'));

  	var arrEleTabIndex = Sisem.listaOrdenadaTabIndex($dialog, $prvEleDom);
  	var primerTabIndex = arrEleTabIndex[0];
  	var ultimoTabIndex = arrEleTabIndex[arrEleTabIndex.length-1];
  	if (charCode==9 && event.shiftKey) 
    {
    	Sisem.buscarElementoActivo($dialog,tabIndex,'ATRAZ', setFoco, primerTabIndex, ultimoTabIndex);
    	event.preventDefault();
    }//if (code==13) {
    else if (charCode==13 || keyFromClick) 
    {
    	Sisem.buscarElementoActivo($dialog,tabIndex,'ADELANTE', setFoco, primerTabIndex, ultimoTabIndex);
    	event.preventDefault();
    }//if (code==13) {
    else if ($(this).prop('tagName')=='BUTTON' && charCode==13)
    {
    	$tooltip = w.$e.parent().find('div[data-tooltip=' + $(this).data('tooltip') + ']').addClass("out");
    	setTimeout(function() {$tooltip.removeClass("active").removeClass("out");}, 300);
    	$(this).trigger('click');
    	event.preventDefault();
    }
	});
	$("button").on("click", function (event) {
		$el = $(this);
		// Temporary class for same-direction fadeout
		$tooltip = w.$e.parent().find('div[data-tooltip=' + $el.data('tooltip') + ']').addClass("out");
		setTimeout(function() {$tooltip.removeClass("active").removeClass("out");}, 300);        
//		$(this).trigger('keypress', true);
        event.preventDefault();
	});		
}
Sisem.buscarElementoActivo=function($dialog, tabIndex, direccion, setFoco, primerTabIndex, ultimoTabIndex)
{
//	var totEleDis = 0;
//	var salir = false;
//	while(!salir)
//	{
//		totEleDis++;
		switch (direccion)
		{
			case 'ADELANTE':
				
		    	if(tabIndex < ultimoTabIndex){tabIndex++;}
		    	else{tabIndex=primerTabIndex;}
				
				break;
			case 'ATRAZ':
				
		    	if(tabIndex > 1){tabIndex--;}
		    	else{tabIndex=ultimoTabIndex;}
				
				break;
		}
    	
//    	if($dialog.find("[tabIndex='"+tabIndex+"']").hasClass('disabled')){$dialog.find("[tabIndex='"+tabIndex+"']").attr('disabled',true);}
//		console.log($dialog.find("[tabIndex='"+tabIndex+"']").attr('name') + " - tabindex="+tabIndex);
    	if($dialog.find("[tabIndex='"+tabIndex+"']").length > 0 && typeof $dialog.find("[tabIndex='"+tabIndex+"']").attr('disabled')==='undefined')
    	{
//    		console.log('existe boton '+direccion+' activo');
//    		console.log($dialog.find("[tabIndex='"+tabIndex+"']"));
//    		salir=true;
    		setFoco=true;
    		if(setFoco){$dialog.find("[tabIndex='"+tabIndex+"']").focus();}
    	}
    	else
    	{
//    		console.log('elemento tabIndex '+tabIndex+' desactivado');
//    		console.log($dialog.find("[tabIndex='"+tabIndex+"']"));
    	}
//		if(totEleDis==$dialog.find('[tabIndex]').length && setFoco==false){console.log('todos los elementos estan desactivados');salir=true;}
//	    if(totEleDis>$dialog.find('[tabIndex]').length){alert('Error elementos a visualiza mayor que los que tienen index');}
//	}//while(!exito)
}
Sisem.ordenarNumero = function(a, b){
	return a - b;
}
Sisem.formato=function(w){
	var arrEleTabIndex = Sisem.listaOrdenadaTabIndex($(document), $prvEleDom);
	w.ultimoTabIndex = 0;
	if(arrEleTabIndex.length > 0){w.ultimoTabIndex = arrEleTabIndex[arrEleTabIndex.length-1]};
	var $lisEleTabIndex = w.$e.parent().find($prvEleDom).filter(function( index ) {
		return ( ( (typeof $(this).attr("data-tooltip")==='undefined') && typeof $(this).attr('tabindex') != 'undefined' && $(this).attr('tabindex') != '' ) ? $(this) : null )
	});

	$lisEleTabIndex.tooltips(w);
	Sisem.refreshKeyenter(w);
	
	$("input[type='text'], input[type='number'], textarea").on("click", function () {$(this).select();});
//	$("input[type='text'], textarea").on("focus", function () {$(this).select();});
}
Sisem.obtenerParametrosJson=function($win)
{
	var strJson = "{"; 
	var textAreas = $win.children().find('textarea');
	var inputs = $win.children().find('input').filter(function( index ) {
		if($win.excluirFilter)
		{
			return !$(this).attr('name').startsWith('filter_');	
		}
		else
		{
			return $(this)
		}
	});
	var selects = $win.children().find('select');
	var aParam = new Array();

	for ( var iteTxtA = 0; iteTxtA < textAreas.length; iteTxtA++) 
	{
		if(!Sisem.isEmpty(textAreas[iteTxtA].name))
		{
			strJson = strJson + "'" + textAreas[iteTxtA].name + "' : '" + textAreas[iteTxtA].value.toUpperCase() + "',";	
		}
	}
	for ( var iteInp = 0; iteInp < inputs.length; iteInp++) 
	{
		if(!Sisem.isEmpty(inputs[iteInp].name))
		{
			if (inputs[iteInp].type == "password") 
			{
				if(inputs[iteInp].name != 'aux')
				{
					strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + inputs[iteInp].value + "',";	
				}
			}
			if (inputs[iteInp].type == "text" || inputs[iteInp].type == "number" || inputs[iteInp].type == "hidden") 
			{
				if(inputs[iteInp].name != 'aux')
				{
					strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + inputs[iteInp].value.toUpperCase() + "',";	
				}
			}
			if(inputs[iteInp].type == "radio" && inputs[iteInp].checked)
			{
				strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + inputs[iteInp].value + "',";
			}
			if(inputs[iteInp].type == "checkbox")
			{
				strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + ((inputs[iteInp].checked)?1:0) + "',";
			}
		}//if(!Sisem.isEmpty(inputs[iteInp].name))
	}
	for ( var iteSel = 0; iteSel < selects.length; iteSel++) 
	{
		if (!Sisem.isEmpty(selects[iteSel].name) && selects[iteSel].type == "select-one") 
		{
			var index = selects[iteSel].options.selectedIndex;
			if (index > -1) 
			{
				strJson = strJson +  "'" + selects[iteSel].name + "' : '" + selects[iteSel].options[index].value + "',";
			}
		}
	}
	if(strJson.length > 1)
	{
		strJson = strJson.substr(strJson, strJson.length - 1, strJson.length);
		strJson += '}';
		strJson = strJson.replace(/,\'\' : \'\'/g, '');
	}//if(strJson.length > 1)
	else{strJson = '{}';}
	return eval("(" + strJson + ")");
}

Sisem.obtenerParametrosJsonCamelCase=function($win)
{
	var strJson = "{"; 
	var textAreas = $win.children().find('textarea');
	var inputs = $win.children().find('input').filter(function( index ) {
		if($win.excluirFilter)
		{
			return !$(this).attr('name').startsWith('filter_');	
		}
		else
		{
			return $(this)
		}
	});
	var selects = $win.children().find('select');
	var aParam = new Array();

	for ( var iteTxtA = 0; iteTxtA < textAreas.length; iteTxtA++) 
	{
		if(!Sisem.isEmpty(textAreas[iteTxtA].name))
		{
			strJson = strJson + "'" + textAreas[iteTxtA].name + "' : '" + textAreas[iteTxtA].value + "',";	
		}
	}
	for ( var iteInp = 0; iteInp < inputs.length; iteInp++) 
	{
		if(!Sisem.isEmpty(inputs[iteInp].name))
		{
			if (inputs[iteInp].type == "password") 
			{
				if(inputs[iteInp].name != 'aux')
				{
					strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + inputs[iteInp].value + "',";	
				}
			}
			if (inputs[iteInp].type == "text" || inputs[iteInp].type == "number" || inputs[iteInp].type == "hidden") 
			{
				if(inputs[iteInp].name != 'aux')
				{
					strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + inputs[iteInp].value + "',";	
				}
			}
			if(inputs[iteInp].type == "radio" && inputs[iteInp].checked)
			{
				strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + inputs[iteInp].value + "',";
			}
			if(inputs[iteInp].type == "checkbox")
			{
				strJson = strJson +  "'" + inputs[iteInp].name + "' : '" + ((inputs[iteInp].checked)?1:0) + "',";
			}
		}//if(!Sisem.isEmpty(inputs[iteInp].name))
	}
	for ( var iteSel = 0; iteSel < selects.length; iteSel++) 
	{
		if (!Sisem.isEmpty(selects[iteSel].name) && selects[iteSel].type == "select-one") 
		{
			var index = selects[iteSel].options.selectedIndex;
			if (index > -1) 
			{
				strJson = strJson +  "'" + selects[iteSel].name + "' : '" + selects[iteSel].options[index].value + "',";
			}
		}
	}
	if(strJson.length > 1)
	{
		strJson = strJson.substr(strJson, strJson.length - 1, strJson.length);
		strJson += '}';
		strJson = strJson.replace(/,\'\' : \'\'/g, '');
	}//if(strJson.length > 1)
	else{strJson = '{}';}
	return eval("(" + strJson + ")");
}
Sisem.mergeEnti=function(obj1, obj2, tabla)
{
  for (var prop in obj2) {
    if(tabla && tabla!=''){
      if(prop.substring(0,4).indexOf(tabla)>-1){ obj1[prop] = obj2[prop]; }
    } else{
      if (prop in obj1) { obj1[prop] = obj2[prop]; }
    }
  }
}
Sisem.getProp=function(secc,prop,defa)
{
	var value = defa;
	if (USERDATA.lisPro!=null)
	{
		for(key in USERDATA.lisPro)
		{
			if(USERDATA.lisPro[key].secc==secc && USERDATA.lisPro[key].prop==prop)
			{
				value=USERDATA.lisPro[key].valu;
			}
		}
	}
	return value;
}
Sisem.getDocBySuc=function(idCommunityApp,idSucu,tdoc,defa)
{
	var value = defa;
	if (USERDATA.lisPro!=null)
	{
		for(key in USERDATA.lisPro)
		{
			if(parseInt(USERDATA.lisPro[key].id_sucu)==parseInt(idSucu)
			&& parseInt(USERDATA.lisPro[key].kycom)==parseInt(idCommunityApp)
		    && USERDATA.lisPro[key].secc==tdoc)
			{
				value=USERDATA.lisPro[key].prop+'-'+USERDATA.lisPro[key].valu;
			}
		}
	}
}
Sisem.getDocBySucAjax=function(idCommunityApp,idSucu,tdoc,defa, callback)
{
	var value = defa;
	$.get('cmn/prop/getDocBySuc',{id_sucu:idSucu,tdoc:tdoc},function(data){
		if(data!=null){
			if(data.length>0){
				value = data[0].prop+'-'+data[0].valu;
			}
		}
		callback(value);
	},'json');
}
Sisem.buildMenu=function(w){
	Sisem.block({element:$('#mainPanel')});
	if(jQuery.isEmptyObject(lm) && jQuery.isEmptyObject(ln))
	{
		/*************************************
		 *  RECUPERANDO LA LISTA DE MENUS
		 *************************************/
		Sisem.ejecutar('cmn/BuildMenu',{pol_kypol: w.pol_kypol, pol_kypdr: w.pol_kypdr, pol_nive: w.pol_nive, pol_trig: w.pol_trig}, function(rpta){
			if(rpta!=null){
				opcionMenu = Array();
				ln = rpta.na.ln;
				lm = rpta.mn.lm;

				Sisem.getopcionMenu(w.pol_kypol, w.pol_trig);
				Sisem.refreshMenu(w);
				Sisem.unblock({element:$('#mainPanel')});
			}//if(rpta!=null){
		});
	}//if(jQuery.isEmptyObject(lm) && jQuery.isEmptyObject(ln))
	else
	{
		Sisem.getopcionMenu(w.pol_kypol, w.pol_trig);
		Sisem.refreshMenu(w);
	}
}
Sisem.getopcionMenu=function(pol_kypol, pol_trig)
{
	if(pol_trig.toUpperCase()=='OPEN')
	{
		for (var km in lm) 
		{
			if(lm[km].ky == pol_kypol)
			{
				nombreMenu  = lm[km].nm;
				tituloMenu = lm[km].ds;
				opcionMenu = lm[km].lm;
				break;
			}
			else
			{
				for (var km_1 in lm[km].lm) 
			    {
					if(lm[km].lm[km_1].ky == pol_kypol)
					{
						nombreMenu  = lm[km].lm[km_1].nm;
						tituloMenu = lm[km].lm[km_1].ds;
						opcionMenu = lm[km].lm[km_1].lm;
						break;
					}
					else if(lm[km].lm[km_1].ds!='Regresar')
					{
				        for (var km_2 in lm[km].lm[km_1].lm) 
				        {
				        	if(lm[km].lm[km_1].lm[km_2].ky == pol_kypol)
				        	{
								nombreMenu  = lm[km].lm[km_1].lm[km_2].nm;
								tituloMenu = lm[km].lm[km_1].lm[km_2].ds;
				        		opcionMenu = lm[km].lm[km_1].lm[km_2].lm;
				        		break;
				        	}
							else if(lm[km].lm[km_1].lm[km_2].ds!='Regresar')
							{
								for (var km_3 in lm[km].lm[km_1].lm[km_2].lm)
								{
									if(lm[km].lm[km_1].lm[km_2].lm[km_3].ky == pol_kypol)
									{
										nombreMenu  = lm[km].lm[km_1].lm[km_2].lm[km_3].nm;
										tituloMenu = lm[km].lm[km_1].lm[km_2].lm[km_3].ds;
										opcionMenu = lm[km].lm[km_1].lm[km_2].lm[km_3].lm;
										break;
									}
								}//for (var km_3 in lm[km].lm[km_1].lm[km_2].ln)
							}//else if(lm[km].lm[km_1].lm[km_2].ds!='Regresar')
				        }//for (var km_2 in lm[km].lm[km_1].lm)
					}//else if(lm[km].ds!='Regresar')
				}//for (var km in lm) {
			}//else
		}//for (var km in lm)
	}//if(pol_trig.toUpperCase()=='OPEN')	
}
Sisem.refreshMenu=function(w)
{
	w.menuBoton = ((typeof w.menuBoton!="undefined")?w.menuBoton:false);
	var menuBotonTemp = w.menuBoton;
	if(!jQuery.isEmptyObject(lm) && !jQuery.isEmptyObject(ln))
	{
		/*
		 *  CONSTRUYENDO EL HISTORIAL DE NAVEGACION
		 */
		var _olMenHist = '';
		for (var km in ln) 
		{
			if(ln[km].ky == w.pol_kypol)
			{
				_olMenHist+='<li style="float: left; margin-left: -15px; margin-right: 16px; margin-top: 3px;">';
					_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ky+'" pol_kypdr="'+ln[km].kp+'" pol_nomb="'+ln[km].nm+'" pol_nive="'+ln[km].nv+'" pol_trig="'+ln[km].tg+'" title="'+ln[km].nm+'">'+ln[km].ds+'</a>';
				_olMenHist+='</li>';
				break;
			}
			else if(ln[km].ds!='Regresar')
			{
				for (var km_1 in ln[km].ln) 
			    {
					if(ln[km].ln[km_1].ky == w.pol_kypol)
					{
						_olMenHist+='<li style="float: left; margin-left: -15px; margin-right: 16px; margin-top: 3px;">';
							_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ky+'" pol_kypdr="'+ln[km].kp+'" pol_nomb="'+ln[km].nm+'" pol_nive="'+ln[km].nv+'" pol_trig="'+ln[km].tg+'" title="'+ln[km].ds+'">'+ln[km].ds+'</a>';
						_olMenHist+='</li>';
						_olMenHist+='<li style="float: left; margin-left: 5px; margin-right: 16px; margin-top: 3px;">';
							_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ln[km_1].ky+'" pol_kypdr="'+ln[km].ln[km_1].kp+'" pol_nomb="'+ln[km].ln[km_1].nm+'" pol_nive="'+ln[km].ln[km_1].nv+'" pol_trig="'+ln[km].ln[km_1].tg+'" title="'+ln[km].ln[km_1].ds+'">'+ln[km].ln[km_1].ds+'</a>';
						_olMenHist+='</li>';
						break;
					}
					else if(ln[km].ln[km_1].ds!='Regresar')
					{
				        for (var km_2 in ln[km].ln[km_1].ln) 
				        {
				        	if(ln[km].ln[km_1].ln[km_2].ky == w.pol_kypol)
				        	{
								_olMenHist+='<li style="float: left; margin-left: -15px; margin-right: 16px; margin-top: 3px;">';
									_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ky+'" pol_kypdr="'+ln[km].kp+'" pol_nomb="'+ln[km].nm+'" pol_nive="'+ln[km].nv+'" pol_trig="'+ln[km].tg+'" title="'+ln[km].ds+'">'+ln[km].ds+'</a>';
								_olMenHist+='</li>';
								_olMenHist+='<li style="float: left; margin-left: 5px; margin-right: 16px; margin-top: 3px;">';
									_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ln[km_1].ky+'" pol_kypdr="'+ln[km].ln[km_1].kp+'" pol_nomb="'+ln[km].ln[km_1].nm+'" pol_nive="'+ln[km].ln[km_1].nv+'" pol_trig="'+ln[km].ln[km_1].tg+'" title="'+ln[km].ln[km_1].ds+'">'+ln[km].ln[km_1].ds+'</a>';
								_olMenHist+='</li>';
								_olMenHist+='<li style="float: left; margin-left: 5px; margin-right: 16px; margin-top: 3px;">';
									_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ln[km_1].ln[km_2].ky+'" pol_kypdr="'+ln[km].ln[km_1].ln[km_2].kp+'"  pol_nomb="'+ln[km].ln[km_1].ln[km_2].nm+'" pol_nive="'+ln[km].ln[km_1].ln[km_2].nv+'" pol_trig="'+ln[km].ln[km_1].ln[km_2].tg+'" title="'+ln[km].ln[km_1].ln[km_2].ds+'">'+ln[km].ln[km_1].ln[km_2].ds+'</a>';
								_olMenHist+='</li>';
				        		break;
				        	}
							else if(ln[km].ln[km_1].ln[km_2].ds!='Regresar')
							{
								for (var km_3 in ln[km].ln[km_1].ln[km_2].ln)
								{
									if(ln[km].ln[km_1].ln[km_2].ln[km_3].ky == w.pol_kypol)
									{
										_olMenHist+='<li style="float: left; margin-left: -15px; margin-right: 16px; margin-top: 3px;">';
											_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ky+'" pol_kypdr="'+ln[km].kp+'" pol_nomb="'+ln[km].nm+'" pol_nive="'+ln[km].nv+'" pol_trig="'+ln[km].tg+'" title="'+ln[km].ds+'">'+ln[km].ds+'</a>';
										_olMenHist+='</li>';
										_olMenHist+='<li style="float: left; margin-left: 5px; margin-right: 16px; margin-top: 3px;">';
											_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ln[km_1].ky+'" pol_kypdr="'+ln[km].ln[km_1].kp+'" pol_nomb="'+ln[km].ln[km_1].nm+'" pol_nive="'+ln[km].ln[km_1].nv+'" pol_trig="'+ln[km].ln[km_1].tg+'" title="'+ln[km].ln[km_1].ds+'">'+ln[km].ln[km_1].ds+'</a>';
										_olMenHist+='</li>';
										_olMenHist+='<li style="float: left; margin-left: 5px; margin-right: 16px; margin-top: 3px;">';
											_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ln[km_1].ln[km_2].ky+'" pol_kypdr="'+ln[km].ln[km_1].ln[km_2].kp+'" pol_nomb="'+ln[km].ln[km_1].ln[km_2].nm+'" pol_nive="'+ln[km].ln[km_1].ln[km_2].nv+'" pol_trig="'+ln[km].ln[km_1].ln[km_2].tg+'" title="'+ln[km].ln[km_1].ln[km_2].ds+'">'+ln[km].ln[km_1].ln[km_2].ds+'</a>';
										_olMenHist+='</li>';
										_olMenHist+='<li style="float: left; margin-left: 5px; margin-right: 16px; margin-top: 3px;">';
											_olMenHist+='<a href="javascript:void(0);" pol_kypol="'+ln[km].ln[km_1].ln[km_2].ln[km_3].ky+'" pol_kypdr="'+ln[km].ln[km_1].ln[km_2].ln[km_3].kp+'" pol_nomb="'+ln[km].ln[km_1].ln[km_2].ln[km_3].nm+'" pol_nive="'+ln[km].ln[km_1].ln[km_2].ln[km_3].nv+'" pol_trig="'+ln[km].ln[km_1].ln[km_2].ln[km_3].tg+'" title="'+ln[km].ln[km_1].ln[km_2].ln[km_3].ds+'">'+ln[km].ln[km_1].ln[km_2].ln[km_3].ds+'</a>';
										_olMenHist+='</li>';
										break;
									}
									else if(ln[km].ln[km_1].ln[km_2].ln[km_3].ds!='Regresar')
									{
										for (var km_4 in ln[km].ln[km_1].ln[km_2].ln[km_3].ln)
										{
											_olMenHist+='<li>'+ln[km].ln[km_1].ln[km_2].ln[km_3].ln[km_4].ds+'</li>';
										}
									}
								}//for (var km_3 in ln[km].ln[km_1].ln[km_2].ln)
							}//else if(ln[km].ln[km_1].ln[km_2].ds!='Regresar')
				        }//for (var km_2 in ln[km].ln[km_1].ln)
					}//else if(ln[km].ln[km_1].ds!='Regresar')
			    }//for (var km_1 in ln[km].ln)
			}//else if(ln[km].ds!='Regresar')
		}//for (var km in ln) {
		$('[name=olMenuHistorial]').empty();
		$('[name=olMenuHistorial]').append(_olMenHist);
		$('[name=olMenuHistorial]').children('li').children('a').mouseover(function(e) {
//			$(this).stop(true,true).animate({ 
//				height: $(this).height()-20
//			}, 100);
//			$(this).closest('.panel').stop(true,true).animate({ 
//				marginTop: "10"
//			}, 100);
			e.stopPropagation();
		}).mouseout(function(e) {
//			$(this).stop(true,true).animate({ 
//				height: $(this).height()+20
//			}, 100);
//			$(this).closest('.panel').stop(true,true).animate({ 
//				marginTop: "0"
//			}, 100);
			e.stopPropagation();
		}).click(function(){
			var $a=$(this);
			var winTmp = new Object();
			$('#mainPanel').empty()
			$('#mainPanel').append('<div id="menuGrid"></div>');
			winTmp.$e = $('#mainPanel').children('#menuGrid');
			if($a.attr('pol_trig').toUpperCase()=='CLICK')
			{
				$('#mainPanel').empty();
				Sisem.abrirOpcionMenu($a.attr('title'));
//				Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: $img.attr('pol_kypol'), pol_kypdr: 0, pol_nive: $img.attr('pol_nive'), pol_trig: $img.attr('pol_trig')}));
			}
			else
			{
				Sisem.buildMenu($.extend(winTmp, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: $a.attr('pol_kypol'), pol_kypdr: 0, pol_nive: $a.attr('pol_nive'), pol_trig: $a.attr('pol_trig'), menuBoton: menuBotonTemp}));
			}
		});
		/*
		 *  INICIO : CONSTRUYENDO EL MENU DE OPCIONES
		 */
		if(w.pol_trig.toUpperCase()=='OPEN')
		{
			var numItem=6;
			var idxItem=1;
			var $menuGrid = $('#mainPanel').children('#menuGrid');
			$menuGrid.empty();
			var _divMenu='';
			for (var km in opcionMenu) {
				if(opcionMenu[km].es=='0001'){
					var img = (opcionMenu[km].im.toLowerCase().indexOf('reporte')>-1?'reporte.png':opcionMenu[km].im.toLowerCase());
					
					if(idxItem==1){_divMenu+='<div class="row">';}
                    _divMenu+='<div class="col-xs-2 col-sm-2 col-md-2">';					
						_divMenu+='<div class="panel panel-blue">';
							if(!w.menuBoton)
							{
								_divMenu+='<div class="panel-heading text-align-center">';
									_divMenu+='<h3 name="a_name" class="panel-title">'+tituloMenu+'</h3>';
								_divMenu+='</div>';
								_divMenu+='<div class="panel-body no-padding text-align-center">';
									_divMenu+='<div class="the-price" name="divOpcMenu_'+opcionMenu[km].ky+'" id="divOpcMenu_'+opcionMenu[km].ky+'">';
									_divMenu+='</div>';
	//                              _divMenu+='<div class="the-price">';
	//                              	_divMenu+='<img src="/gestion/sisprom/cmn/imagen/pregunta.png" pol_kypol="'+opcionMenu[km].ky+'" pol_kypdr="'+opcionMenu[km].kp+'" pol_nive="'+opcionMenu[km].nv+'" pol_trig="'+opcionMenu[km].tg+'" title="'+opcionMenu[km].ds+'"/>';
	//                              _divMenu+='</div>';
								_divMenu+='</div>';								
							}
							_divMenu+='<div class="panel-footer no-padding">';
								_divMenu+='<a class="btn bg-color-blue txt-color-white btn-block" href="javascript:void(0);" pol_kypol="'+opcionMenu[km].ky+'" pol_kypdr="'+opcionMenu[km].kp+'" pol_nomb="'+opcionMenu[km].nm+'" pol_nive="'+opcionMenu[km].nv+'" pol_trig="'+opcionMenu[km].tg+'" title="'+opcionMenu[km].ds+'">'+opcionMenu[km].ds+'</a>';
							_divMenu+='</div>';	
						_divMenu+='</div>';
					_divMenu+='</div>';
					/*_divMenu+='</div>';*/
					if(idxItem==numItem)
					{
						_divMenu+='</div>';
						idxItem=1;
					}
					else
					{
						idxItem++;
					}
				}//if(opcionMenu[km].es=='0001'){
			}//for (var km in opcionMenu) {

			w.$e.append(_divMenu);
			
            for (var km in opcionMenu)
            {
                if(opcionMenu[km].es=='0001')
                {
                   var lienzo = document.createElement('canvas');
                    lienzo.setAttribute('name', 'cnvOpcMenu');                   
                    var opcmen = new Sisem.LienzoMenu(lienzo);
                    opcmen.dibujarOpcion(opcionMenu[km].ds, parseInt(opcionMenu[km].nv));
                    
                    var imagen = new Image();
                    imagen.src = lienzo.toDataURL();
                    imagen.setAttribute('pol_kypol', opcionMenu[km].ky);
                    imagen.setAttribute('pol_kypdr', opcionMenu[km].kp);
                    imagen.setAttribute('pol_nomb', opcionMenu[km].nm);
                    imagen.setAttribute('pol_nive', opcionMenu[km].nv);
                    imagen.setAttribute('pol_trig', opcionMenu[km].tg);
                    imagen.setAttribute('title', opcionMenu[km].ds);
                    
                    w.$e.find('[name=divOpcMenu_'+opcionMenu[km].ky+']').append(imagen);
                }//if(opcionMenu[km].es=='0001')
            }//for (var km in opcionMenu)
            			
//			w.$e.find(".panel").children('.panel-footer').children('a').click(function(){
//				var $a=$(this);
//				if($a.attr('pol_trig').toUpperCase()=='CLICK')
//				{
//					$('#mainPanel').empty();
//					Sisem.abrirOpcionMenu($a.attr('title'));
////					Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: $a.attr('pol_kypol'), pol_kypdr: 0, pol_nive: $a.attr('pol_nive'), pol_trig: $a.attr('pol_trig'), menuBoton: menuBotonTemp}));
//				}
//				else
//				{
//					var w = new Object();
//					$('#mainPanel').empty()
//					$('#mainPanel').append('<div id="menuGrid"></div>');
//					w.$e = $('#mainPanel').children('#menuGrid');
//					Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: $img.attr('pol_kypol'), pol_kypdr: 0, pol_nive: $img.attr('pol_nive'), pol_trig: $img.attr('pol_trig'), menuBoton: menuBotonTemp}));
//				}
//			})
			w.$e.find(".panel").children('.panel-body').children('.the-price').children('img').mouseover(function(e) {
				$(this).stop(true,true).animate({ 
					height: $(this).height()-20
				}, 100);
				$(this).closest('.panel').stop(true,true).animate({ 
					marginTop: "10"
				}, 100);
				e.stopPropagation();
			}).mouseout(function(e) {
				$(this).stop(true,true).animate({ 
					height: $(this).height()+20
				}, 100);
				$(this).closest('.panel').stop(true,true).animate({ 
					marginTop: "0"
				}, 100);
				e.stopPropagation();
			}).click(function(){
				var $img=$(this);
				Sisem.seguridad($img.attr('pol_nomb'), function(rpta){
					$img.closest(".panel").hide( "explode", {pieces: 32 }, 250 , function(){
						if($img.attr('pol_trig').toUpperCase()=='CLICK'){
							Sisem.abrirOpcionMenu($img.attr('title'));
							$('#mainPanel').empty();
							Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: $img.attr('pol_kypol'), pol_kypdr: 0, pol_nive: $img.attr('pol_nive'), pol_trig: $img.attr('pol_trig')}));
						}
						else
						{
							var w = new Object();
							$('#mainPanel').empty()
							$('#mainPanel').append('<div id="menuGrid"></div>');
							w.$e = $('#mainPanel').children('#menuGrid');
							Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: $img.attr('pol_kypol'), pol_kypdr: 0, pol_nive: $img.attr('pol_nive'), pol_trig: $img.attr('pol_trig')}));
						}
					});					
				});//Sisem.seguridad($img.attr('pol_nomb'), function(rpta){
			});//}).click(function(){
			Sisem.unblock({element:$('#mainPanel')});
		}//if(w.pol_trig.toUpperCase()=='OPEN')
		/*
		 *  FIN : CONSTRUYENDO EL MENU DE OPCIONES
		 */
	}//if(!jQuery.isEmptyObject(lm) && !jQuery.isEmptyObject(ln)){
}//Sisem.refreshMenu=function(win){
Sisem.abrirOpcionMenu=function(title){
	console.log(title);
	switch(title.toLowerCase()){
		case 'historias': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/hist',tipo:'HISTORIA'});break;
		case 'citas': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/cita',tipo:'CITA'});break;
		case 'dashboard': Sisem.abrirFronEnd({archivo:'adm/dash',tipo:'DGEN'});break;
		case 'tarea': Sisem.abrirFronEnd({archivo:'cmn/tare',tipo:'TARE'});break;
		case 'local': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/sucu',tipo:'LOCA'});break;
		case 'sucursal': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/sucu',tipo:'SUCU'});break;
		case 'cliente': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/enti',tipo:'CLI'});break;
		case 'profesor': Sisem.abrirFronEnd({archivo:'cmn/usua',tipo:'ENTPFO'});break;
		case 'cedula': Sisem.abrirFronEnd({archivo:'clg/cedu',tipo:'CEDU'});break;
		case 'matricula': Sisem.abrirFronEnd({archivo:'clg/matr',tipo:'MATRIC',politicaSeguridad: title});break;
		case 'programa': Sisem.abrirFronEnd({archivo:'clg/prog',tipo:'PROGRA',politicaSeguridad: title});break;
		case 'asignatura': Sisem.abrirFronEnd({archivo:'clg/asig',tipo:'ASIGNATURA'});break;
		case 'evaluacion': Sisem.abrirFronEnd({archivo:'clg/evlu',tipo:'EVLU'});break;
		case 'grados': Sisem.abrirFronEnd({archivo:'adm/prop',tipo:'PRPGRA'});break;
		case 'alumno': Sisem.abrirFronEnd({archivo:'cmn/usua',tipo:'ENTALU'});break;
		case 'proveedor': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/enti',tipo:'PRV'});break;
		case 'trabajador': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/enti',tipo:'TRA'});break;
		case 'transportista': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/enti',tipo:'TTA'});break;
		case 'articulo': Sisem.abrirFronEnd({archivo:'adm/arti',tipo:'ARTI'});break;
		case 'marca': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/marc',tipo:''});break;
		case 'unidad': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/unid',tipo:''});break;
		case 'precio': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/lpre',tipo:''});break;
		case 'caja y bancos': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/sucu',tipo:'CAGE'});break;
		case 'categoria': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/prop',tipo:'TIPART'});break;
		case 'rubro': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/prop',tipo:'TIPRUB'});break;
		case 'clase': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/prop',tipo:'TIPCLS'});break;
		case 'comensal': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/enti',tipo:'COM'});break;
		case 'reporte_maestro': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/repo',tipo:'REPMAESTRO'});break;
		case 'cuentas mroveedor': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/ccor',tipo:'PRV'});break;
		case 'cuentas cliente': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/ccor',tipo:'CLI'});break;
		case 'cuentas empresa': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/ccor',tipo:'EMP'});break;
		case 'cuentas trabajador': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/ccor',tipo:'TRA'});break;
		case 'reporte cuenta': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/repo',tipo:'REPCUENTA'});break;
		case 'caja local': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/apci',tipo:'CAGE'});break;
		case 'caja campo': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/apci',tipo:'CACO'});break;
		case 'reporte caja': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/repo',tipo:'REPCAJA'});break;							
		case 'compra': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docu',tipo:'COMPRA'});break;
		case 'pedido Cliente': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docu',tipo:'0010'});break;
		case 'venta': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docu',tipo:'VENTA'});break;
		case 'control consumo': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docuCons',tipo:'DOCUCONS'});break;
		case 'reporte ventas': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/repo',tipo:'REPVENTA'});break;
		case 'reporte compras': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/repo',tipo:'REPCOMPRA'});break;
		case 'reporte Maestro': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/repo',tipo:'REPMAESTRO'});break;
		case 'traslado': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docu',tipo:'0003'});break;
		case 'ingreso': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docu',tipo:'0007'});break;
		case 'egreso': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/docu',tipo:'0008'});break;
		case 'kardex': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/kard',tipo:''});break;
		case 'reporte logistica': rsta.init({tipo:'REPLOGISTICA'}); break;
		case 'grupos': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/grup',tipo:'GRUPO'});break;
		case 'parametros': Sisem.abrirFronEnd({archivo:'adm/prop',tipo:'PRPPDR'});break;
		case 'backup': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/back',tipo:'BACK'});break;		
		
		case 'Asistencia':require(['scripts/asi/asit'],function(asis){asis.init();});break;
		
		case 'adm_operacion':require(['scripts/adm/oper'],function(oper){oper.init();});break;
		case 'adm_categoria':require(['scripts/adm/cate'],function(cate){cate.init();});break;
		case 'adm_tipo':require(['scripts/adm/tipo'],function(tipo){tipo.init();});break;
		case 'adm_entidad':require(['scripts/cmn/usua'],function(enti){usua.init();});break;
		case 'rep_balance':require(['scripts/adm/rope'],function(rope){rope.init({tipRep:'REPBAL'});});break;
		case 'rep_lista_operaciones':require(['scripts/adm/rope'],function(rope){rope.init({tipRep:'REPLOP'});});break;
		
		case 'sistema pension': sisp.init(); break;
		case 'planilla': plan.init({tipo:'CONS'}); break;
		case 'categoria empleado': trac.init(); break;
		case 'concepto': conc.init({tipo:'CON'}); break;
		
		case 'comunidades': Sisem.abrirFronEnd({archivo:'cmn/comm',tipo:'COMM'});break;
		case 'aplicativos': Sisem.abrirFronEnd({archivo:'cmn/myapps',tipo:'APPS'});break;
		case 'perfil': Sisem.abrirFronEnd({archivo:'cmn/perf',tipo:'PERFIL'});break;
		case 'usuarios': Sisem.abrirFronEnd({archivo:'cmn/usua',tipo:'GENERAL'});break;		
		
		case 'sexo': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/enti',tipo:'TRA'});break;
		case 'streaper': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/arti',tipo:'STRE'});break;
		case 'videos': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/usua',tipo:'VIDE'});break;
		case 'videoChat': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/arti',tipo:'VICH'});break;
		case 'video Vivo': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/arti',tipo:'VIVO'});break;
		case 'foro': Sisem.abrirFronEnd({archivo:USERDATA.app.pol_temp+'/come',tipo:'COME'});break;
		
		case 'album': Sisem.abrirFronEnd({archivo:'mus/albm',tipo:'ALBM'});break;
	}//switch(title){
}
Sisem.cargarArchivo=function(w, data, callback){
	Sisem.seguridad(data.politicaSeguridad, function(rpta){

		var limit = 1048576*10;//2MB
		var xhr;
		var mainsuc='main_sel_sucu='+(($('[name=main_sel_sucu]').prop('checked')==true)?1:0)+'&main_kysuc='+$('[name=main_kysuc] :selected').val();
		if(typeof USERDATA!='undefined'){data.url = ((data.url.indexOf('?')>-1)?data.url+'&kycom='+USERDATA.com.com_kycom+'&'+mainsuc : data.url+'?kycom='+USERDATA.com.com_kycom+'&'+mainsuc);}
		//mensaje = select('div#resultado');
		if( data.archivoObjeto != undefined && data.archivoObjeto[0] != undefined ){
//			if( !confirm('Realmente desea cargar ese archivo?') ) return false;
//			Sisem.msgBox('warning', 'Empezando la carga!!!');
			for(var i=0;i<data.archivoObjeto.length;i++){
				var current_file = data.archivoObjeto[i];
//				Sisem.msgBox('warning', 'Cargando archivo!!!');
				if( current_file.size < limit ){
					xhr = new XMLHttpRequest();
					xhr.upload.addEventListener('error',function(e){
						Sisem.msgBox('error', 'Ha habido un errror cargando el archivo!!!');
						return callback("error");
					}, false);
					xhr.upload.addEventListener("loadstart", function (evt) {
				    	if(w.$e.hasClass('widget-body')){Sisem.block({element:w.$e});}
				    	else if(w.$e.hasClass('ui-dialog-content')){Sisem.blockW(w.$e);}
					}, false);
					xhr.upload.addEventListener("progress", function (evt) {
					    if (evt.lengthComputable)
					    {
					        var valorBarraProgreso = Math.round( ( evt.loaded / evt.total ) * 100 ) + "%";
					        w.$e.find('[name=divBarraProgreso]').css('width',valorBarraProgreso);
					    } 
					    else 
					    {
					    	Sisem.msgBox('error', 'Tamano desconocido!!!');
					    	return callback("error");
					    }
					}, false);
					xhr.upload.addEventListener("loadend", function (evt) {
				    	if(w.$e.hasClass('widget-body')){Sisem.unblock({element:w.$e});}
				    	else if(w.$e.hasClass('ui-dialog-content')){Sisem.unblockW(w.$e);}
					}, false);
//			        xhr.addEventListener("load", Sisem.transferComplete, false);
//			        xhr.addEventListener("abort", Sisem.transferCanceled, false);
			        
//					readyState	Holds the status of the XMLHttpRequest. Changes from 0 to 4: 
//						0: request not initialized 
//						1: server connection established
//						2: request received 
//						3: processing request 
//						4: request finished and response is ready
//					status	200: "OK"
//						    404: Page not found
						
					xhr.open('POST', data.url);
		            xhr.setRequestHeader("Cache-Control", "no-cache");
		            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		            xhr.setRequestHeader("X-File-Name", data.archivoNombre);//current_file.name
		            xhr.send(current_file);
		            xhr.onreadystatechange = function(aEvt) {
		            	var strJson=xhr.responseText;
						if (xhr.readyState == 4) {
							if (xhr.status == 200)
							{
								
								strJson = strJson.replace(/,\'\' : \'\'/g, '');
								rptaJson = eval("(" + strJson + ")");

								if(rptaJson.msg.type=='success')
								{
									Sisem.msgBox('success', 'Carga completa!!!');
									return callback(rptaJson);
								}
								else{Sisem.msgBox(rptaJson.msg.type, rptaJson.msg.text);}
							}
							else
							{
								//console.log(xhr.statusText);
								rptaJson={msg: {type:'error', text: xhr.statusText}};
								Sisem.msgBox(rptaJson.msg.type, rptaJson.msg.text);	
								//return callback(rpta);
							}
						}
		            };
				}
				else
				{
					Sisem.msgBox('error', 'El archivo pesa '+current_file.size+'MB no debe ser mayor de "2MB!!!');
					return callback("error");
				}
			}
		}
		else
		{
			return callback("error");
		}
		
	});
};
Sisem.uploadMultipleFiles=function(w, archivoNombre, archivoObjeto,url, callback){
	var limit = 1048576*10;//2MB
	var xhr;
	var mainsuc='main_sel_sucu='+(($('[name=main_sel_sucu]').prop('checked')==true)?1:0)+'&main_kysuc='+$('[name=main_kysuc] :selected').val();
	if(typeof USERDATA!='undefined'){url = ((url.indexOf('?')>-1)?url+'&kycom='+USERDATA.com.com_kycom+'&'+mainsuc : url+'?kycom='+USERDATA.com.com_kycom+'&'+mainsuc);}
	//mensaje = select('div#resultado');
	if( archivoObjeto != undefined && archivoObjeto[0] != undefined ){
//		if( !confirm('Realmente desea cargar ese archivo?') ) return false;
//		Sisem.msgBox('warning', 'Empezando la carga!!!');
		for(var i=0;i<archivoObjeto.length;i++){
			var current_file = archivoObjeto[i];
//			Sisem.msgBox('warning', 'Cargando archivo!!!');
			if( current_file.size < limit ){
				xhr = new XMLHttpRequest();
				xhr.upload.addEventListener('error',function(e){
					Sisem.msgBox('error', 'Ha habido un errror cargando el archivo!!!');
					return callback("error");
				}, false);
				xhr.upload.addEventListener("loadstart", function (evt) {
			    	if(w.$e.hasClass('widget-body')){Sisem.block({element:w.$e});}
			    	else if(w.$e.hasClass('ui-dialog-content')){Sisem.blockW(w.$e);}
				}, false);
				xhr.upload.addEventListener("progress", function (evt) {
				    if (evt.lengthComputable)
				    {
				        var valorBarraProgreso = Math.round( ( evt.loaded / evt.total ) * 100 ) + "%";
				        w.$e.find('[name=divBarraProgreso]').css('width',valorBarraProgreso);
				    } 
				    else 
				    {
				    	Sisem.msgBox('error', 'Tamano desconocido!!!');
				    	return callback("error");
				    }
				}, false);
				xhr.upload.addEventListener("loadend", function (evt) {
			    	if(w.$e.hasClass('widget-body')){Sisem.unblock({element:w.$e});}
			    	else if(w.$e.hasClass('ui-dialog-content')){Sisem.unblockW(w.$e);}
				}, false);
//		        xhr.addEventListener("load", Sisem.transferComplete, false);
//		        xhr.addEventListener("abort", Sisem.transferCanceled, false);
		        
//				readyState	Holds the status of the XMLHttpRequest. Changes from 0 to 4: 
//					0: request not initialized 
//					1: server connection established
//					2: request received 
//					3: processing request 
//					4: request finished and response is ready
//				status	200: "OK"
//					    404: Page not found
					
				xhr.open('POST', url);
	            xhr.setRequestHeader("Cache-Control", "no-cache");
	            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	            xhr.setRequestHeader("X-File-Name", archivoNombre);//current_file.name
	            xhr.send(current_file);
	            xhr.onreadystatechange = function(aEvt) {
	            	var strJson=xhr.responseText;
					if (xhr.readyState == 4) {
						if (xhr.status == 200)
						{
							
							strJson = strJson.replace(/,\'\' : \'\'/g, '');
							rptaJson = eval("(" + strJson + ")");

							if(rptaJson.msg.type=='success')
							{
								Sisem.msgBox('success', 'Carga completa!!!');
								return callback(rptaJson);
							}
							else{Sisem.msgBox(rptaJson.msg.type, rptaJson.msg.text);}
						}
						else
						{
							//console.log(xhr.statusText);
							rptaJson={msg: {type:'error', text: xhr.statusText}};
							Sisem.msgBox(rptaJson.msg.type, rptaJson.msg.text);	
							//return callback(rpta);
						}
					}
	            };
			}
			else
			{
				Sisem.msgBox('error', 'El archivo pesa '+current_file.size+'MB no debe ser mayor de "2MB!!!');
				return callback("error");
			}
		}
	}
	else
	{
		return callback("error");
	}
}
Sisem.urlExists=function(url){
	var http = new XMLHttpRequest();
	http.open('HEAD', base_url + '', false);
	http.send();
	if (http.readyState === 4) 
	{ // 4 = Response from server has been// completely loaded.
		if (http.status == 200 && http.status < 300) // http status between 200 to 299 are all successful
		{
			return true;
		}
	} 
	else 
	{
		return false;
	}
	if (http.status == 404) 
	{
		return false;
	}
}
Sisem.obtenerArchivo=function(data, callback){
	$.post(base_url+'cmn/control/fileExist',data,function(rpta){
		if(rpta){return callback(rpta);}
		else{callback(rpta);}
	},'json');
}
Sisem.fileExist=function(data, callback){
	$.post(base_url+'cmn/control/fileExist',data,function(rpta){
		if(rpta){return callback(rpta);}
		else{callback(rpta);}
	},'json');
}
Sisem.getFile=function(file, modulo, callback){
	Sisem.fileExist({modulo:modulo, listaArchivo: Array(file)}, function(rpta){
		rpta.pathFile=base_url+rpta.path;
		if(rpta){return callback(rpta);}
	});
}//
Sisem.seguridad=function(politicaSeguridad, callback){
	if(typeof USERDATA.com != 'undefined' && USERDATA.com.com_kyusu != USERDATA.usu.usu_kyusu)
	{
		if(typeof politicaSeguridad != 'undefined' && politicaSeguridad!='')
		{
			if(politicaSeguridad!='VALIDADO')
			{
				Sisem.ejecutar('cmn/GetListaRegla',{com_kycom: USERDATA.com_kycom, usu_kyusu: USERDATA.usu.usu_kyusu, pol_nomb: politicaSeguridad}, function(rpta){
					if(rpta.lista.items.length > 0)
					{
						return callback(true);
					}//if(rpta.listaOperacion.items.length > 0)
					else
					{
						Sisem.msgBox('error', 'Politica '+politicaSeguridad+' restringido');
					}
				});//Sisem.ejecutar('erp/GetListaOperacion',{ope_kyope: w.$e.find('[name=ope_kyope]').val()}, function(rpta){
			}
			else{return callback(true);}
		}else{Sisem.msgBox('error', 'No tiene politica');}
	}else{return callback(true);}
}//Sisem.seguridad=function(politicaNombre, callback){
Sisem.import=function(dataObj, callback)
{
//	eval('(typeof(catenew) == "undefined")')
//	(typeof(window['oper']) == "undefined")
//	('repo' in window)
//  dbapp:'erp',modulo:'scripts',archivo:'sucu'
	try
	{
		var arrUrl = dataObj.listaArchivo;
		var arrUrlTmp = Array();
		for(key in arrUrl)
		{
			var url = arrUrl[key];
			if(url != null && url.length > 0)
			{
				var urlArr = url.split('/');
				var obj = urlArr[urlArr.length-1]
				if(!(obj in window) || eval(obj)===undefined)
				{
					//console.log('Creando : '+obj);
					arrUrlTmp.push(url);	
				}//if(obj in window)
				else
				{
					//console.log('Ya existe : '+obj);
				}
			}//if(url != null && url.length > 0)
		}//for(key in arrUrl)
		
		if(arrUrlTmp != null && arrUrlTmp.length > 0)
		{
			var data = {modulo:((dataObj.modulo)?dataObj.modulo:'scripts'), listaArchivo: arrUrlTmp};
			Sisem.fileExist(data, function(rpta){
				if(rpta.msg.type=='success')
				{
					require(rpta.listaArchivo,function () {
						if(typeof(callback)=='function'){callback(true);}
					});//require([base_url+obj+'.js'],function () {					
				}//if(rpta.msg.type=='success')
				else
				{
					Sisem.msgBox(rpta.msg.type, rpta.msg.text);
//					if(typeof(callback)=='function'){callback(false);}
				}
			});//Sisem.fileExist(data, function(rpta){
		}//if(arrUrl != null && arrUrl.length > 0)
		else{if(typeof(callback)=='function'){callback(true);}}
	}
	catch (err)
	{
		Sisem.msgBox('error', err);
		console.log(err);
	}
}
/****************************************************************************
 * Metodo para ejectuar todas las llamadas al servidor
 *  app 	: Nombre de la aplicacion [cmn, erp]
 *	modulo 	: Nombre del modulo [controller]
 *	mainEmp : Nombre de la empresa 
 *	archivo : Nombre del archivo controlador donde se ejecutara la peticion
 *  method  : Nombre del metodo o evento a ejecutar en el controlador
 ****************************************************************************/
Sisem.ejecutar=function(archivoTmp,dataTmp,callback) {
	$.post(base_url+'cmn/control/ejecutar',$.extend(dataTmp, {archivo: archivoTmp, main_kysuc:$('[name=main_kysuc] :selected').val()}),function(rpta){
		if( rpta.msg && rpta.msg.type=='error' ){Sisem.msgBox(rpta.msg.type, rpta.msg.text);}
		else if(typeof(callback)==='function'){callback(rpta);}
	},'json');
}//Sisem.ejecutar=function(archivoTmp,dataTmp,callback) {
Sisem.realizar=function(archivoTmp,dataTmp,callback) {
	$.extend(dataTmp, {archivo: archivoTmp, main_kysuc:$('[name=main_kysuc] :selected').val()});
	$.ajax({
		type: 'POST',
		dataType: "JSON",
		contentType: "application/json",
		url: "https://sisemwebapi.herokuapp.com/cmn/control/ejecutar",
		data: JSON.stringify(dataTmp),
		success:function(rpta){
			if( rpta.msg && rpta.msg.type=='error' ){Sisem.msgBox(rpta.msg.type, rpta.msg.text);}
			if(typeof(callback)==='function'){callback(rpta);}
		},
		error: function(e) {
			Sisem.msgBox('Error', 'Error en Microservicio');
		}
	});
}//Sisem.realizar=function(archivoTmp,dataTmp,callback) {
Sisem.abrirFronEnd=function(w){
	//rpta.path.replace(/.js/g, '')
	var arrArc = w.archivo.split('/');
	var archivo = arrArc[arrArc.length-1];
	Sisem.import({listaArchivo: Array(w.archivo)}, function(rpta){
		if(rpta){eval(archivo+'.init({tipo:"'+w.tipo+'",politicaSeguridad:"VALIDADO"})');}
	});
}
Sisem.printExcel=function(data){
	var dataTmp = data;
	var rptaTmp = ((typeof data.rpta != "undefined") ? data.rpta : "");
	$.extend(dataTmp, {modulo:'report', listaArchivo: Array(((data.dbapp)?data.dbapp:'cmn')+'/'+data.reportName+"_xls.js")});
	Sisem.import(dataTmp, function(rpta){
		if(rpta.msg.type=='success')
		{
			require([base_url+rpta.listaArchivo[0]], function (reporte) {
				$.extend(dataTmp, { modulo:'report', archivo:data.reportName, rpta:rptaTmp});
				reporte.printReport(dataTmp);
				Sisem.unblockW(w.$e);
			});
		}else{Sisem.msgBox(rpta.msg.type, rpta.msg.text);}
	});
}//Sisem.printExcel=function(data){

Sisem.printPdf=function(archivoTmp,dataTmp,callback) {
	var data = dataTmp;
	
	$.extend(data, {modulo:'report',archivo:archivoTmp});
	param=$.param(data);
	Sisem.windowPrint({id:'printVent',title:data.reportTitle,urlIframe:base_url+'cmn/control/ejecutar?'+param});
}

Sisem.fecact = function(){return moment(new Date()).format('YYYY-MM-DD');}
Sisem.fechor = function(){return moment(new Date()).format('YYYY-MM-DD hh:mm:ss');}
Sisem.diaNom = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sábado'];
Sisem.diaAbr = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab'];
$.maxZIndex = $.fn.maxZIndex = function(opt){
    /// <summary>
    /// Returns the max zOrder in the document (no parameter)
    /// Sets max zOrder by passing a non-zero number
    /// which gets added to the highest zOrder.
    /// </summary>    
    /// <param name="opt" type="object">
    /// inc: increment value, 
    /// group: selector for zIndex elements to find max for
    /// </param>
    /// <returns type="jQuery" />
    var def = { inc: 10, group: "*" };
    $.extend(def, opt);
    var zmax = 0;
    $(def.group).each(function() {
        var cur = parseInt($(this).css('z-index'));
        zmax = cur > zmax ? cur : zmax;
    });
    if (!this.jquery)
        return zmax;

    return this.each(function() {
        zmax += def.inc;
        $(this).css("z-index", zmax);
    });
}
Sisem.getItemSelected=function(w){
	var data = new Object();
	data.items = [];
	if(w.$e.find('[name=grid] .highlights').length>0)
	{
		for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
		{
			if(typeof w.$e.find('[name=grid] .highlights').eq(ite).data('data')!='undefined')
			{
				data.items.push(w.$e.find('[name=grid] .highlights').eq(ite).data('data'));	
			}			
		}//for(var ite=0; ite<w.$e.find('[name=grid] .highlights').length; ite++)
	}//if(w.$e.find('[name=grid] .highlights').length==1){
	return data;
}
Sisem.getKeyFromValue=function(lista, clave)
{
	for (key in lista)
	{
		if(clave==lista[key]['name'])
		{
			return key;
		}
	}	
	return "";
}
Sisem.randomTwoDate=function(strFecHorIni, strFecHorFin){
	mlsFecHor1 = (new Date(strFecHorIni)).getTime();
	mlsFecHor2 = (new Date(strFecHorFin)).getTime();

	return moment(Sisem.randomHora(mlsFecHor1, mlsFecHor2)).format("YYYY-MM-DD hh:mm:ss");
}
Sisem.betweenTwoTimesToDecimal=function(fecha, strFecHorIni, strFecHorFin){
	fecReg = moment('2000-01-01').format('YYYY-MM-DD');
	fecAct = moment(fecha).format('YYYY-MM-DD');

	fecIniTmp = moment(strFecHorIni).format('YYYY-MM-DD');
	horIniTmp = moment(strFecHorIni).format('hh:mm:ss');
	fecHorIni = moment('1970-01-01 '+horIniTmp).format('YYYY-MM-DD hh:mm:ss');
	if(fecIniTmp > fecReg){
		if(fecIniTmp > fecAct){
			fecHorIni = moment(fecHorIni).add('days', 1).format('YYYY-MM-DD hh:mm:ss'); 
		}
	}

	fecFinTmp = moment(strFecHorFin).format('YYYY-MM-DD');
	horFinTmp = moment(strFecHorFin).format('hh:mm:ss');
	fecHorFin = moment('1970-01-01 '+horFinTmp).format('YYYY-MM-DD hh:mm:ss');
	
	if(fecFinTmp > fecReg){
		if(fecFinTmp > fecAct){
			fecHorFin = moment(fecHorFin).add('days', 1).format('YYYY-MM-DD hh:mm:ss');
		}
	}

	fecHor1 = moment(fecHorIni);
	fecHor2 = moment(fecHorFin);
	
	mls = fecHor2.diff(fecHor1, 'milliseconds');
	seg = (mls / 1000) % 60;
	min = (mls / 1000 / 60) % 60;
	hor = parseInt(mls / (1000 * 60 * 60));
	
//	years = fecHor1.diff(fecHor2, 'years');
//	month = fecHor1.diff(fecHor2, 'month');
//	weeks = fecHor1.diff(fecHor2, 'weeks');
//	days = fecHor1.diff(fecHor2, 'days');
//	hours = fecHor1.diff(fecHor2, 'hours');
//	minutes = fecHor1.diff(fecHor2, 'minutes');
//	seconds = fecHor1.diff(fecHor2, 'seconds');
//	milliseconds = fecHor1.diff(fecHor2, 'milliseconds');

	return (hor + (min / 60) + (seg / 3600));
}
Sisem.fromTimeToDecimal=function(fecHor) // -- It returns $dat decoded from UTF8
{
	fecHor=moment(fecHor).format('hh:mm:ss');
	arrHora=fecHor.split(':');
	hor = parseInt(arrHora[0]);
	min = parseInt(arrHora[1]);
	seg = parseInt(arrHora[2]);

	return (hor + (min / 60) + (seg / 3600));
}
Sisem.get=function(data, keyBus, defecto)
{
	try
	{
		result = defecto;
		if(typeof data!='undefined' || data!=null)
		{
			for (key in data)
			{
				val = data[key];
				if(key == keyBus)
				{
					if(typeof val!='undefined' || val!=null || val!='')
					{
						result = val;
					}
					break;
				}
			}
			//data[keyBus] = result;
		}//if(typeof data!='undefined' || data!=null)
		return result;
	}
	catch (err)
	{
		Sisem.msgBox('error', err);
	}
}//Sisem.get=function(data, keyBus, defecto)
Sisem.log=function(data){return data;}
Sisem.exist=function(data, keyBus, defecto)
{
	try
	{
		result = defecto;
		if(typeof data!='undefined' || data!=null)
		{
			for (key in data)
			{
				val = data[key];
				if(key == keyBus)
				{
					if(typeof val!='undefined' || val!=null || val!='')
					{
						result = val;
					}
					break;
				}
			}
			//data[keyBus] = result;
		}//if(typeof data!='undefined' || data!=null)
		return ((result=='')?false:true);
	}
	catch (err)
	{
		Sisem.msgBox('error', err);
	}
}
Function.prototype.clone = function() {
    var that = this;
    var temp = function temporary() { return that.apply(this, arguments); };
    for(var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
}
Sisem.deleteArray=function(arr, item){
	for(var i = arr.length; i--;) {
		if(arr[i] === item) {
			arr.splice(i, 1);
		}
	}
}
//Sisem.removerItemArray=function(item, lista)
//{
//	if ( lista === null || typeof lista !== 'object' ) {return lista;}
//    
//	var temp = lista.constructor();
//	
//    for ( var key in lista ) 
//    {
//    	if(item!=key){temp[ key ] = obj[ key ];}
//    }
//    return temp;	
//}
Sisem.dispositivo=function()
{
		if ((screen.width>=800) && (screen.height>=600)){return 'pantalla';}
		else{return 'mobil'}
}
Sisem.getRangoIniFin=function(fecha){
	var dia = moment(fecha).day();
	var fini = '';
	var ffin = '';
	switch(dia)
	{
	    case 0://domigo
	      fini = moment(fecha).add(0,'days').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(6,'days').format('YYYY-MM-DD');
	      break;
	    case 1://lunes
	      fini = moment(fecha).add(-1,'d').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(5,'d').format('YYYY-MM-DD');    
	      break;
	    case 2://martes
	      fini = moment(fecha).add(-2,'d').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(4,'d').format('YYYY-MM-DD');    
	      break;
	    case 3://miercoles
	      fini = moment(fecha).add(-3,'d').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(3,'d').format('YYYY-MM-DD');    
	      break;
	    case 4://jueves
	      fini = moment(fecha).add(-4,'d').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(2,'d').format('YYYY-MM-DD');    
	      break;
	    case 5://viernes
	      fini = moment(fecha).add(-5,'d').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(1,'d').format('YYYY-MM-DD');    
	      break;
	    case 6://sabado
	      fini = moment(fecha).add(-6,'d').format('YYYY-MM-DD');
	      ffin = moment(fecha).add(0,'d').format('YYYY-MM-DD');    
	      break;
	}//switch(dia)
	return {cit_fini: fini, cit_ffin: ffin};
}//Sisem.getRangoIniFin=function(fecha){
Sisem.dataURItoBlob=function(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
	    byteString = atob(dataURI.split(',')[1]);
	else
	    byteString = unescape(dataURI.split(',')[1]);
	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
	    ia[i] = byteString.charCodeAt(i);
	}
	return new Blob([ia], {type:mimeString});
}
Sisem.LienzoMenu=function(parLienzo) {
	var ancho = 170;
	var alto = 120;
    var tamltr = 60;
    
    this.lienzo = parLienzo;
    this.lienzo.width = ancho;
    this.lienzo.height = alto;
//  lienzo.autoScale();
    this.contexto = this.lienzo.getContext("2d");
    this.canvasLimites = this.lienzo.getBoundingClientRect();
//    lienzo.addEventListener('mousedown',cambiarEstado,false);
//    lienzo.addEventListener('mouseup',cambiarEstado,false);
//    lienzo.addEventListener('mousemove',pintarLinea,false);
    this.lienzo.style.cursor="pointer";
    this.lienzo.style.border="thick solid #0000FF";
    this.dibujarOpcion =  function(texto, nivel){
        this.contexto.beginPath();

//      this.contexto.textAlign = "center";
//      this.contexto.textBaseline = "middle";                
//      var tamltr = parseInt(170/nivel);
        totalNivel = 3;
        var posx = (parseInt(ancho/2)-(((totalNivel)/2)*(tamltr))) + 5;
        for(var ite=0; ite<(totalNivel); ite++)
        {
            this.contexto.font = tamltr+'px FontAwesome';
            if(ite < (nivel-1))
            {
//            	this.contexto.shadowBlur = 3;
            	this.contexto.fillStyle = "#016895";
            	this.contexto.fillText('\uF005',posx+(ite*(tamltr-5)),tamltr);	
            }
            else
            {
            	this.contexto.fillText('\uF006',posx+(ite*(tamltr-5)),tamltr);
            }
        }
        this.contexto.font = "normal normal bold 20px Verdana";
        this.contexto.fillStyle = "black";
        this.contexto.textAlign = "center";
//      this.contexto.textBaseline = "middle";        
        this.contexto.strokeText(texto, parseInt(ancho/2), 110, ancho);
        
		this.contexto.rect(0, 0, ancho, alto);		
		this.contexto.stroke();
    };
    this.borrarLienzo = function(){
        this.opcmen.dibujar();    
    };
}

Sisem.esObjJson = function(arrayObjeto){
	if(typeof arrayObjeto=='undefined')
	{
		return false;
	}
	else
	{
		for(clave in arrayObjeto)
		{
			if(clave==null || clave=='' || typeof clave=='undefined' || typeof arrayObjeto[clave]=='undefined')
			{
				return false;
				break;
			}
		}
	}
	return true;
}
Sisem.verificarListaObjeto = function(parListaObjeto, parCampo, parObjeto) {
	indice = Sisem.indiceListaObjeto(parListaObjeto, parCampo, parObjeto[parCampo]);
	if (indice != -1) 
	{
		parListaObjeto[indice] = JSON.parse(JSON.stringify(parObjeto));
	} else 
	{
		parListaObjeto.push(JSON.parse(JSON.stringify(parObjeto)));
	}
},
Sisem.indiceListaObjeto = function(parListaObjeto, parCampo, parValor) {
	for(idx in parListaObjeto){
		varTabla = parListaObjeto[idx];
		if(varTabla[parCampo] == parValor){
			return idx;
		}
	}
	return -1;
},
Sisem.eliminarItemListaObjeto = function(parListaObjeto, parCampo, parValor) {
	var indice = Sisem.indiceListaObjeto(parListaObjeto, parCampo, parValor);
	if (indice != -1) {
		parListaObjeto.splice(indice, 1);
	}
}	
console.log('Modo Pagina : ' + Sisem.dispositivo());
