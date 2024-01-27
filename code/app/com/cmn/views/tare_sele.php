<style>
	.tutoEncabezado{
		color: #2e6c80;
		font-family: Century Gothic;
		font-size: 25px;
		line-height: 35px;
		overflow: hidden;
		margin: 0px;
		float: left;
	}
	.tutoParrafo{
	    overflow: hidden;
	    font-size: 15px;
	    font-family: Century Gothic;
	    line-height: 15px;
	    color: #2e6c80;
	    float: left;
	    width: 100%;
	    
	}
	.tutorial.tuto-contenido{
	    overflow-y: scroll !important;
		height: 600px;
	}
</style>
<div class="row">
	<div class="form-inline">
		<div class="btn btn-checkbox"><label><input class="checkbox style-0" type="checkbox" name="sel_all"><span>Seleccionar</span></label></div>
		<button name="btnAddTarea" class="btn btn-primary"><span class="fa fa-book"></span>&nbsp;Nueva '+w.pag.alias+'</button>
		<button name="btnDownloadTareaxls" class="btn btn-primary"><span class="icon-document-alt-stroke"></span>Formato</button>
		<input name="inp_Tareaxls" type="file" accept=".xlsx,.xls"/>
		<input name="doc_Tareaxls" type="text" class="form-control" style="width: 150px; margin-top:0px; margin-bottom:0px;"/>
		<button name="btnLoadTareaxls" class="btn btn-primary"><i class="fa fa-upload"></i></button>
	</div>			

	<div class="col-md-12"><label><input class="checkbox style-0" type="checkbox" name="chkClaseTarea"><span name="spnTituloClaseTarea">Visualizar nombre de clases</span></label></div>
</div>
<div class="row" name="divEncabezado"><div class="div-group"></div></div>
<div class="row">
	<!-- widget content -->
	<div class="col-md-12" style="border-right: 1px solid #e5e5e5;">
		<div class="widget-body">
			<div class="tree smart-form" style="margin-left: 5px;" name="divTarea">
			</div>
		</div>		
	</div>
<!--<div class="col-md-8 tutorial tuto-contenido" id="divContenido"> -->
<!--	<p>Este es un mensaje de contenido</p> -->
<!--</div> -->
	<!-- end widget content -->
</div>