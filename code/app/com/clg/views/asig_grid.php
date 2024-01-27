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
</div>
<div class="row" style="margin-left: 3px;" name="grid"></div>