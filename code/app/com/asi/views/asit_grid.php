<style>
    .table{
        width: auto;
    }
	.table.table-bordered.tabla-profesor > thead > tr > th{
		padding: 0px 5px;
		font-family: Calibri;
		font-size: 18px;
		font-weight: 100;
	}
	.table.table-bordered.tabla-profesor > tbody > tr > td {
		padding: 0px 5px;
		font-family: Calibri;
		font-size: 16px;
		font-weight: 100;
		color: cadetblue;
		
	}
	.table.table-bordered.tabla-alumno > tbody > tr{
		height: 20px;
	}
	.table.table-bordered.tabla-alumno > thead[name="theadEncabezado"] > tr > th{
		padding: 0px 5px;
		font-family: Calibri;
		font-size: 12px;
		text-align: center;
		overflow-wrap: break-word;
	}
	.table.table-bordered.tabla-alumno > thead[name="theadEncabezado"] > tr > th > p{
		padding: 0px;
		margin: 0px;
	}
	.table.table-bordered.tabla-alumno > tbody > tr > td {
/*		padding: 0px 2px;*/
		font-family: Calibri;
		font-size: 12px;
	}
	.table.table-bordered.tabla-alumno > tbody > tr > td:hover {
		font-family: Calibri;
		font-size: 12px;

/*    	padding: 3px;*/		
        background-color: #F0F0F0;
    	border: 1px solid #bfbfbf;
    	cursor: grab;
    	-webkit-box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, .08);
    	box-shadow: inset 0 0 5px 1px rgba(0, 0, 0, .08);
	}	
	input.form-control.input-asistencia{
		font-family: Calibri;
		font-size: 12px;
		height: 15px;
		padding: 0px;
		text-align: center;
		background-color: #FFFF00;
	}
	.resalta_promedio{
	   background-color: #FF7D33;
	}
</style>
<div class="row" style="margin-left: 3px;">	
	<div class="table-responsive">
		<table name="tblPrograma" class="table table-bordered tabla-profesor">
			<thead>
				<tr>
					<th>Programa</th>
					<th>Grado</th>
					<th>Nivel</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td name="tdPrograma"></td>
					<td name="tdGrado"></td>
					<td name="tdNivel"></td>
				</tr>
			</tbody>
		</table>
		<table class="table table-bordered tabla-profesor">
			<thead>
				<tr>
					<th name="thProfesorAlumno">Profesor</th>
					<th>Asignatura</th>
					<th>Periodo</th>
					<th>Turno</th>
					<th>Aula</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td name="tdProfesorAlumno"></td>
					<td name="tdAsignatura"></td>									
					<td name="tdPeriodo"></td>
					<td name="tdTurno"></td>
					<td name="tdAula"></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class="row">
	<div class="table-responsive" style="margin: 0 15px 0 15px;">
		<div name="divProfesorAsignatura">
<!-- 		<div name="btnEditarAsistencia" class="btn btn-checkbox"><label><input name="chkEditarAsistencia" class="checkbox style-0" type="checkbox"><span>Editar Asistencia</span></label></div> -->
			<button name="btnGenerarListaAsistencia" class="btn btn-primary btn-sm"><span class="fa fa-book"></span>&nbsp;Generar Asistencia</button>
		</div>
		<table class="table table-bordered tabla-alumno">
			<thead name="theadEncabezado">
			</thead>
			<tbody name="tbodyValor">
			</tbody>
		</table>
	</div>
</div>