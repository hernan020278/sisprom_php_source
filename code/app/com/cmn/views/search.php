<style>
.resaltarTexto{
/*  color: #000000;*/
    background-color: #FBFF00;
}
</style>

<script src="/sisprom/code/js/jquery/jquery-latest.min.js"></script>

<!-- MAIN PANEL -->
<?php if(isset($_SESSION['q'])):?>
<div id="main" role="main" >
	<!-- MAIN CONTENT -->
	<div id="content">
		<div class="row input-busquedad">
			<div class="col-lg-4 col-md-12">
				<form onSubmit="return Search.loadData();">
					<div class="input-group input-group">
						<input type="text" value="<?php echo $_SESSION['q']?>" name="q" placeholder="Descubre" class="form-control" autocomplete="off">
						<div class="input-group-btn">
							<button class="btn btn-default" type="submit">
								<i class="fa fa-fw fa-search"></i> Buscar
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		<div class="row">
			<div name="_q_result" class="col-lg-12">
				
			</div>
		</div>
	</div>
	<div id="itemReference" style="display:none;">
		<div class="search-results clearfix">
			<h4><a name="_i_title" href="javascript:void(0);"></a>&nbsp;<a name="aAbrirArchivoLocal" href="javascript:void(0);"><i class="fa fa-lg fa-folder-open-o"></i></a></h4>
<!-- 		<img name="_i_image" alt="" src="" width="50px"> -->
			<div>
				<!--<p class="note">
					<a class="text-danger" href="javascript:void(0);"><i class="fa fa-thumbs-up"></i> Like&nbsp;&nbsp;</a>
					<a href="javascript:void(0);"><i class="fa fa-chain"></i> Share this link&nbsp;&nbsp;</a>
					<a href="javascript:void(0);"><i class="fa fa-star txt-color-yellow"></i> Favorite&nbsp;&nbsp;</a>
				</p>-->
				<div name="_i_internal_link" class="url text-success">
					<span name="_i_internal_link">smartadmin/index.html?#ajax/gallery.html</span> <i class="fa fa-caret-down"></i>
				</div>
				<p name="_i_description" class="description" style="margin: 0px;">
					
				</p>
			</div>
		</div>
	</div>
	<!-- END MAIN CONTENT -->
</div>
<script>
jQuery.fn.extend({
    resaltar: function(busqueda, claseCSSbusqueda){
        var regex = new RegExp("(<[^>]*>)|("+ busqueda.replace(/([-.*+?^${}()|[\]\/\\])/g,"\\$1") +')', 'ig');
        var nuevoHtml=this.html(this.html().replace(regex, function(a, b, c){
            return (a.charAt(0) == "<") ? a : "<span class=\""+ claseCSSbusqueda +"\">" + c + "</span>";
        }));
        return nuevoHtml;
    }
});
Search = {
	loadData:function(p){
		var params = $.extend({
			page:1,
			pagerows: 20,
			q: $('[name=q]').val()
		},p);
		Sisem.ejecutar('cmn/search',params, function(rpta){
			if(rpta.items!=null){
				for(var i=0;i<rpta.items.length;i++){
					var $item = $('#itemReference').clone().children();
					$item.find('[name=_i_description]').html(rpta.items[i].pol_dscr);

					if(rpta.items[i].pol_imin!=""){$item.find('[name=_i_image]').attr('src',rpta.items[i].pol_imin);}
					else{$item.find('[name=_i_image]').remove();}
					
					if(rpta.items[i].pol_kypol > 0)
					{
						$item.find('[name=_i_title]').html('PLATAFORMA - '+rpta.items[i].pol_dscr);
						$item.find('[name=_i_title]').attr('href','cmn/applications/p/'+rpta.items[i].pol_kypol);
						$item.find('[name=_i_internal_link]').html('cmn/applications/p/'+rpta.items[i].pol_kypol);
					}
					else
					{
						$item.find('[name=_i_title]').html(rpta.items[i].pol_nomb);
						$item.find('[name=_i_title]').attr('href','/sisprom/code/cmn/applications/ayuda?paginaBuscada='+rpta.items[i].pol_temp);
						$item.find('[name=aAbrirArchivoLocal]').attr('archivo_local', rpta.items[i].pol_arch);
						$item.find('[name=_i_internal_link]').html(rpta.items[i].pol_html);
					}
					$('[name=_q_result]').append($item);
				}
				
				var arrValor = $('[name=q]').val().replace(/( el | la | lo | un | una | de | por | para | las | los |el |la |lo |un |una |de |por |para |las |los )/gi, ' ').split(' ');
				for(key in arrValor){
					$('#main').resaltar(arrValor[key], "resaltarTexto")	
				}

				$('a[name=aAbrirArchivoLocal]').on('click', function(){
					Sisem.ejecutar('cmn/CtrlAyuda',{archivo_local: $(this).attr('archivo_local'), comando: 'ABRIRARCHIVOLOCAL'}, function(rpta){
					});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
				});

			}else{
				$('[name=_q_result]').html('No se encontraron resultados para su busqueda');
			}
		});//Sisem.ejecutar('cmn/search',params, function(rpta){
	}
};
jQuery(document).ready(function(){
	Search.loadData({q:'<?php echo $_SESSION['q']?>'});
});
</script>
<?php else: ?>
<div id="main" role="main" >
	<!-- MAIN CONTENT -->
	<div id="content">
		<div class="row">
			<div class="col-lg-4" style="top: 100px; bottom: 0px; right: 0px; left: 0px; margin: auto; position: absolute;">
				<div class="carousel">
					<center><img src="/gestion/sisprom/cmn/imagen/sisprom_large.png" alt=""></center>
				</div>
				<div class="search-home-container" style="padding-top:10px;">
					<form method="get" action="cmn/search">
						<div class="input-group input-group-lg">
							<input type="text" name="q" placeholder="Descubre" class="form-control input-lg" autocomplete="off">
							<div class="input-group-btn">
								<button class="btn btn-default" type="submit">
									<i class="fa fa-fw fa-search fa-lg"></i> Buscar
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<!-- END MAIN CONTENT -->
	<footer role="contentinfo" style="position:absolute;bottom:0;right:0;">
		<ul class="list-inline">
			<li><a href="about">Acerca de Nosotros</a></li>
			<!--<li><a href="about">Desarrolladores</a></li>-->
			<li><a href="policies/privacy/">Privacidad</a></li>
			<li><a href="policies/terms/">Condiciones</a></li>
		</ul>
	</footer>
</div>
<?php endif;?>