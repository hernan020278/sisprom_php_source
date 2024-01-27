<style>
    label input.radiobox[type="radio"] + span::before{
        font-size: 15px;
        height: 20px;
        width: 20px;
        line-height: 20px;
        min-width: 20px;
        margin-right: 2px;
    }
</style>
<header>Informacion de Asignatura</header>
<div class="row">
	<div class="col-md-12">
		<input type="text" name="alu_nomb" class="form-control" placeholder="Alumno" tabIndex="">
	</div>
</div>
<div class="row">
	<input type="hidden" name="ast_kyast">
	<input type="hidden" name="ast_kyusu">
	<input type="hidden" name="ast_kycas">
	<input type="hidden" name="ast_kyasg">
	<input type="hidden" name="ast_kycth">
	<input type="hidden" name="ast_kytrn">
	<input type="hidden" name="ast_eing">
	<input type="hidden" name="ast_esal">
	
	<div class="col-md-6">
	
    	<!-- FILA -->
    	
    	<header>Ingreso</header>
    	<div class="div-group"></div>

    	<div class="col-md-5">
    		<input type="text" name="eti_fing" class="form-control" value="Hora de Ingreso">
    	</div>
    	<div class="col-md-7">
    		<input type="text" name="ast_fing" class="form-control" placeholder="Fecha Ingreso" tabIndex="">
    	</div>

    	<!-- FILA -->

    	<div class="form-group">
        	<div class="col-md-4">
        		<div class="radio"><label><input class="radiobox style-0" type="radio" name="radIngreso"><span class="radPresente">Presente</span></label></div>
        	</div>
        	<div class="col-md-4">
        		<div class="radio"><label><input class="radiobox style-0" type="radio" name="radIngreso"><span class="radTarde">Tarde</span></label></div>
        	</div>
        	<div class="col-md-4">
        		<div class="radio"><label><input class="radiobox style-0" type="radio" name="radIngreso"><span class="radFalta">Falta</span></label></div>
        	</div>
    	</div>
	</div>
	<div class="col-md-6">
	
    	<!-- FILA -->
    	
    	<header>Salida</header>
    	<div class="div-group"></div>

    	<div class="col-md-5">
    		<input type="text" name="eti_fsal" class="form-control" value="Hora de Salida">
    	</div>
    	<div class="col-md-7">
    		<input type="text" name="ast_fsal" class="form-control" placeholder="Fecha Salida" tabIndex="">
    	</div>
    	
    	<!-- FILA -->
    	
    	<div class="form-group">
        	<div class="col-md-4">
        		<div class="radio"><label><input class="radiobox style-0" type="radio" name="radSalida"><span class="radPresente">Presente</span></label></div>
        	</div>
        	<div class="col-md-4">
        		<div class="radio"><label><input class="radiobox style-0" type="radio" name="radSalida"><span class="radTarde">Tarde</span></label></div>
        	</div>
        	<div class="col-md-4">
        		<div class="radio"><label><input class="radiobox style-0" type="radio" name="radSalida"><span class="radFalta">Falta</span></label></div>
        	</div>
    	</div>
	</div>
</div>