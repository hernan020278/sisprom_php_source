jQuery(document).ready(function(){
	require.config({
            baseUrl: '',
	    urlArgs: "bust=" + (new Date()).getTime(), //no-cache dev version
            paths: {
                underscore: 'js/underscore/underscore-min',
                JSZip: 'js/jszip/jszip',
                image: 'js/image/image',
                text: 'js/text/text'
            },
            shim: {
                    'underscore': {
                            exports: '_'
                    },
                    'JSZip': {
                            exports: 'JSZip'
                    }
            }
    });
	$.datepicker.regional['es'] = {
		changeMonth: true,
		changeYear: true,
		closeText: 'Cerrar',
		//prevText: ' nextText: 'Sig>',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
		'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
		'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
		dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
		weekHeader: 'Sm',
		dateFormat: 'dd/mm/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''
	};
	$.datepicker.setDefaults($.datepicker.regional['es']);
	
	$.timepicker.regional['es'] = {
		timeOnlyTitle: 'Elegir una hora',
		timeText: 'Hora',
		hourText: 'Horas',
		minuteText: 'Minutos',
		secondText: 'Segundos',
		millisecText: 'Milisegundos',
		microsecText: 'Microsegundos',
		timezoneText: 'Uso horario',
		currentText: 'Hoy',
		closeText: 'Cerrar',
		timeFormat: 'HH:mm',
		amNames: ['a.m.', 'AM', 'A'],
		pmNames: ['p.m.', 'PM', 'P'],
		isRTL: false
	};
	$.timepicker.setDefaults($.timepicker.regional['es']);
	$("input[type='text']").on("click", function () {$(this).select();});
	$("input[type='text']").on("focus", function () {$(this).select();});
	fechor = moment().format('YYYY-MM-DD HH:mm');
	
	Sisem.ejecutar('GetListaSucursal',{suc_kycom: USERDATA.com.com_kycom}, function(rpta){
		if(rpta.lista.items!=null){
			var $cbo = $('[name=main_kysuc]');
			$cbo.empty();
			if(rpta.lista.items.length > 0)
			{
				for(var i=0;i<rpta.lista.items.length;i++){
					$cbo.append('<option value="'+rpta.lista.items[i].suc_kysuc+'">'+rpta.lista.items[i].suc_nomb+'</option>');
				}
				$cbo.data('data',rpta.items);				
			}

			$cbo.change(function(){
				$('#mainPanel').empty();
				var w = new Object();
				$('#mainPanel').append('<div id="menuGrid"></div>');
				w.$e = $('#mainPanel').children('#menuGrid');
				Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: 69, pol_kypdr: 0, pol_nive: 4, pol_trig: 'open'}));
				gIdSuc=$cbo.val();
				
				$lisSuc=$cbo.data('data');	
				for(var i=0;i<$lisSuc.length;i++){							
					if($lisSuc[i].id_sucu==$(this).val())
					{
						USERDATA.suc=$lisSuc[i];
						break;
					}
				}
				
				$('[name=main_suc_nomb]').html($('[name=main_kysuc] option:selected').html());
			});
			if(gIdSuc==0){gIdSuc=$cbo.val();}
//			w=new Object();
//			w.$e=$('#content');
//			Sisem.formato(w);
		}//if(rpta.items!=null){
	});//Sisem.ejecutar('cmn/GetListaSucursal',{}, function(rpta){
	$('[name=main_emp_nomb]').closest('li').css('display','none');
	$('[name=main_suc_nomb]').closest('li').css('display','none');	
});