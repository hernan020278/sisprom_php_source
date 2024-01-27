<style>
 	.ayuda-cuerpo{
/* 		background-color: rgb(255,255,255);*/
        padding: 0px 0px 5px 0px; 
 	} 
 	.ayuda-cuerpo > .row > .col-md-12 > .ayuda-titulo 
 	{ 
 		font-size: 25px; 
 		color: rgb(255,255,255); 
 	} 
 	.ayuda-cuerpo > .row > .col-md-12 > .ayuda-subtitulo 
 	{ 
 		font-size: 16px; 
 		color: rgb(255,255,255); 
 	} 
 	.ayuda-cuerpo > .row > h1 
 	{ 
 		font-family: arial,sans-serif; 
 		font-size: 25px; 
 		font-weight: 600; 
 		margin: 10px 0px 10px 0px; 
 	} 
 	.ayuda-cuerpo > .row > h2 
 	{ 
 		font-family: verdana,arial,sans-serif;  
 		font-size: 20px; 
 		font-weight:600; 
 		margin: 10px 0px 10px 0px; 
 	} 
 	.ayuda-cuerpo > .row > ul { 
 		font-family: verdana,arial,sans-serif; 
 		font-size: 20p 
 		list-style-type:circle; 
 		padding: 0px; 
 	} 
 	.ayuda-cuerpo > .row > ul > li { 
 		list-style: circle; 
 		list-style-type: circle; 
 	} 
 	.ayuda-cuerpo > .row > ol { 
 		list-style: none; 
 		counter-reset: li; 
 		padding: 0px; 
 	} 
 	.ayuda-cuerpo > .row > ol > li { 
 		counter-increment: li; 
 		line-height: 18px; 
 	} 
 	.ayuda-cuerpo > .row > ol > li::before { 
 		content: counter(li) ". "; 
 		/*color: red;*/ 
 		font-weight: bold; 
 	} 
 	.ayuda-cuerpo > .row 
 	{ 
 		font-family: verdana,arial,sans-serif;  
 		font-size: 12px; 
 		margin: 0px; 
 	}
/************************************************
 * CONFIGURACION DE TABLE DENTRO DE CUERPO AYUDA
 ************************************************/
 	.ayuda-cuerpo > .row > div > table > thead > tr > th,
	.ayuda-cuerpo > .row > div > table > tbody > tr > td
 	{ 
		padding: 5px;
 	}	
    .ayuda-cuerpo > .row > div > table > tbody > tr > td > a,
    .ayuda-cuerpo > .row > div > table > tbody > tr > td > i
    {
        color: blue;
        font-size: 15px;
    }
/*********************************************************
 * CONFIGURACION RESPONSIVE PARA ELEMENTOS DENTRO DE ROW
 *********************************************************/
 	@media ( max-width :767px) {
        .col-xs-4 > img 
        { 
            width: 100%;
        }
		.row > img
        { 
            width: 100%;
        }
 	} 
 	 
/* 	aside { */
/* 		background: rgba(0, 0, 0, 0) linear-gradient(to right, rgb(11,58,112) 93%, rgb(2,35,69) 100%) repeat scroll 0 0; */
/* 		display: block; */
/* 		min-height: 100%; */
/* 		overflow: hidden; */
/* 		top: 75px !important; */
/* 		width: 280px; */
/* 	}	 */
</style>

<!-- MAIN PANEL -->
<!-- <div class="div-clear"></div> -->
<input type="hidden" name="paginaBuscada" value="<?php echo substr($userdata['paginaBuscada'], 0,strlen($userdata['paginaBuscada'])-4);?>"/>
<aside id="left-panel">
	<nav name="divAyuda" width="100%">
		<?php Util::getInst()->mostrarMenu();?>
	</nav>
</aside>
<div id="main" role="main">
    <div id="ribbon"><ul name="ulListaHistorial" class="lista-historial"></ul></div>
	<div id="divContenido" class="ayuda-cuerpo"></div>
</div>
<script>
USERDATA = {};
jQuery(document).ready(function(){
//  INICIO : HIDE MENU
	$('#hide-menu >:first-child > a').on('mousedown',function(e){
		e.preventDefault();
        $('body').toggleClass("hidden-menu");
		$(this).css('cursor', 'grabbing');
    });
	$('#hide-menu >:first-child > a').on('mouseup',function(e){
		e.preventDefault();
        $(this).css('cursor', 'grab');
    });
//  FIN : HIDE MENU
//    function scrollHorizontally(e) {
//        e = window.event || e;
//        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
//        document.getElementById('#main').scrollLeft -= (delta*40); // Multiplied by 40
//        e.preventDefault();
//    }
//    if (document.getElementById('#main').addEventListener) {
//        // IE9, Chrome, Safari, Opera
//        document.getElementById('#main').addEventListener("mousewheel", scrollHorizontally, false);
//        // Firefox
//        document.getElementById('#main').addEventListener("DOMMouseScroll", scrollHorizontally, false);
//    } else {
//        // IE 6/7/8
//        document.getElementById('#main').attachEvent("onmousewheel", scrollHorizontally);
//    }
	Sisem.import({listaArchivo: ['cmn/ayuda']}, function(rpta){
		ayuda.init({tipo:'AYUD', politicaSeguridad: 'VALIDADO', callback: function(){
			$exploradorMenu.find('[name="divAyuda"]').find('[name=aPolitica]').each(function (index, ele) {
				var encontroOpcion = false;
				if( $('[name=paginaBuscada]').val()!='' && $(ele).attr('pol_link')!='' )
				{
					if( $('[name=paginaBuscada]').val() === $(ele).attr('pol_link') )
					{
						encontroOpcion = true;
					}
					if(encontroOpcion)
					{
						$('.active').removeClass('active');
						$(ele).closest('li').addClass('active');
						$(ele).closest('li').parents('li').addClass('active open');
						
						$(ele).addClass('active');
						$(ele).closest('li').parents('li').children('a').addClass('active open');
					    
					    $(ele).trigger('click');
					    return false;
					}
				}
			});
		}});
	});
});
</script>
<!--<script src="<?php echo BASURL?>app/com/cmn/scripts/init.js"></script>-->