define(function() {
	var rep_com_xls = {
		printReport: function(data)
		{
			require(['js/excel-builder/excel-builder', 'js/excel-builder/download'], function (EB, downloader){
				$.get(base_url+'cmn/repo/printReport',data,function(rpta){
					if(rpta!=null){
						var workbook = EB.createWorkbook();
						var worksheet = workbook.createWorksheet({name: rpta.reportName});
						var worksheet = repo.getStyleSheet(workbook, worksheet);
						
						var titleStyle = worksheet.titleStyle;
						var subtitleStyle = worksheet.subtitleStyle;
						var paramStyle = worksheet.paramStyle;
						var headerStyle = worksheet.headerStyle;
						var footerStyle = worksheet.footerStyle;
						var cellStyle = worksheet.cellStyle;

						if(rpta.data.lisEnt!=null){

							var workSheetData = [];
							workSheetData.push([]);//fila en blanco
							
							//params rendering
							workSheetData.push([
							    {value:'',metadata: {style: titleStyle.id}},
								{value:rpta.reportTitle,metadata: {style: titleStyle.id}}
							]);
							workSheetData.push([
							    {value:'',metadata: {style: paramStyle.id}},
								{value:'Nombre like %'+rpta.usu_nomb+'%',metadata: {style: paramStyle.id}}
							]);
							
							workSheetData.push([]);//fila en blanco
							//data rendering
							workSheetData.push(['',
							    {value:'EMPRESA',metadata: {style: headerStyle.id}},
							    {value:'CODIGO',metadata: {style: headerStyle.id}},
								{value:'DNI',metadata: {style: headerStyle.id}},
								{value:'NOMBRES Y APELLIDOS',metadata: {style: headerStyle.id}},
								{value:'TIPO',metadata: {style: headerStyle.id}},
								{value:'POSICION/PUESTO',metadata: {style: headerStyle.id}},
								{value:'GERENCIA/AREA',metadata: {style: headerStyle.id}},
								{value:'DENOMINACION/RRHH',metadata: {style: headerStyle.id}},
								{value:'DIVISION',metadata: {style: headerStyle.id}},
								{value:'GRUPO',metadata: {style: headerStyle.id}},
								{value:'SISTEMA LABORAL',metadata: {style: headerStyle.id}},
								{value:'REGIMEN',metadata: {style: headerStyle.id}},
								{value:'DESCRIPCION REGIMEN',metadata: {style: headerStyle.id}},
								{value:'CONVENIO',metadata: {style: headerStyle.id}},
								{value:'DESCRIPCION CONVENIO',metadata: {style: headerStyle.id}},
								{value:'OBSERVACIONES',metadata: {style: headerStyle.id}},
								{value:'ESTADO',metadata: {style: headerStyle.id}},
								{value:'CORREO',metadata: {style: headerStyle.id}},
								{value:'TELEFONO',metadata: {style: headerStyle.id}},
							]);
							for(var i=0;i<rpta.data.lisEnt.length;i++){
								workSheetData.push(['',
								    {value:rpta.data.lisEnt[i].pdrNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].codi,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].ndoc,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].nomb+' '+rpta.data.lisEnt[i].ape1+' '+rpta.data.lisEnt[i].ape2,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].catNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].carNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].araNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].denNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].dviNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].gruNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].sisNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].regNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].regDscr,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].cnvNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].cnvDscr,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].obse,metadata: {style: cellStyle.id}},
								    {value:estado[rpta.data.lisEnt[i].esta].text,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].mail,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].tele,metadata: {style: cellStyle.id}}
								]);
							}
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 5},
						        {width: 23},
						        {width: 12},
						        {width: 17},
						        {width: 45},
						        {width: 60},
						        {width: 11},
						        {width: 24},
						        {width: 24},
						        {width: 20},
						        {width: 25},
						        {width: 20},
						        {width: 20},
						        {width: 30},
						        {width: 20},
						        {width: 30},
						        {width: 40},
						        {width: 15},
						        {width: 30},
						        {width: 20}
						    ]);
							worksheet.mergeCells('B2','G2');
							worksheet.mergeCells('B3','G3');
							workbook.addWorksheet(worksheet);
							var data = EB.createFile(workbook);
							downloader(((rpta.reportName.indexOf('.xlsx')>-1)?rpta.reportName:rpta.reportName+'.xlsx'), data);
							Sisem.unblockW(w.$e);
						}else{
							Sisem.unblockW(w.$e);
						}
					}//if(rpta!=null){
				},'json');//$.get(base_url+'cmn/repo/printReport',data,function(rpta){
			});
		}
	}
	return rep_com_xls;
});