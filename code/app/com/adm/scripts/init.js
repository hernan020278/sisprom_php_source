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

	fechor = moment().format('YYYY-MM-DD HH:mm');

	Sisem.ejecutar('adm/GetListaSucursal',{suc_kycom: USERDATA.com.com_kycom}, function(rpta){
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
				Sisem.buildMenu($.extend(w, {pol_kypol: USERDATA.app.pol_kypol, pol_kypol: 1, pol_kypdr: 0, pol_nive: 1, pol_trig: 'open'}));
				
				$lisSuc=$cbo.data('data');	
				for(var i=0;i<$lisSuc.length;i++){							
					if($lisSuc[i].suc_kysuc==$(this).val())
					{
						USERDATA.suc=$lisSuc[i];
						break;
					}
				}
				
				$('[name=main_suc_nomb]').html($('[name=main_kysuc] option:selected').html());
			});
//			w=new Object();
//			w.$e=$('#content');
//			Sisem.formato(w);
		}//if(rpta.items!=null){
	});//Sisem.ejecutar('cmn/GetListaSucursal',{}, function(rpta){
});