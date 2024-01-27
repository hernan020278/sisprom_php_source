<style>
	.lista-historial{
		list-style: none; 
		padding: 0px;
	}
	.lista-historial > li{
		float: left;
		margin: 7px;
		list-style: none;
	}
	.lista-historial > li > a{
		color: black;
		cursor: pointer;
	}
	.lista-historial > li > a:after{
		content: '\f0da';
		font-family: FontAwesome;
		font-weight: normal;
		font-style: normal;
		margin:0px 0px 0px 10px;
		text-decoration:none;
	} 
</style>
<script type="text/javascript">
	var listaHistorial = Array();
</script>
<header id="header">
	<div id="logo-group">
		<span id="logo"> <a href=""><img src="/gestion/sisprom/cmn/imagen/sisprom_small.png" alt="SmartAdmin"></a> </span>
	</div>
	<div class="pull-right">
        <div id="hide-menu" class="btn-header pull-right">
            <span><a title="Collapse Menu" data-action="toggleMenu" href="javascript:void(0);"><i class="fa fa-reorder"></i></a></span>
        </div>
		<!-- input: search field -->
		<form action="http://localhost/sisprom/code/cmn/search" class="header-search pull-right">
			<input id="search-fld"  type="text" name="q" placeholder="Buscar palabras">
			<button type="submit">
				<i class="fa fa-search"></i>
			</button>
			<a href="javascript:void(0);" id="cancel-search-js" title="Cancel Search"><i class="fa fa-times"></i></a>
		</form>
		<!-- end input: search field -->	
	</div>
</header>