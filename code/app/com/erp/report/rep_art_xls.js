define(function() {
	var rep_art_xls = {
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

						if(rpta.data.lista!=null){

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
							    {value:'ID_ARTI',metadata: {style: headerStyle.id}},
							    {value:'CODIGO',metadata: {style: headerStyle.id}},
								{value:'NOMBRE',metadata: {style: headerStyle.id}},
								{value:'MARCA',metadata: {style: headerStyle.id}},
								{value:'CATEGORIA',metadata: {style: headerStyle.id}},
								{value:'UNIDAD',metadata: {style: headerStyle.id}}
							]);
							for(var i=0;i<rpta.data.lista.length;i++){
								workSheetData.push(['',
								    {value:parseInt(rpta.data.lista[i].id_arti),metadata: {style: cellStyle.id}},
								    {value: (($.isNumeric(rpta.data.lista[i].codi))?parseInt(rpta.data.lista[i].codi):rpta.data.lista[i].codi),metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].nomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].marNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].catNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].uniNomb,metadata: {style: cellStyle.id}}
								]);
							}
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 5},
						        {width: 10},
						        {width: 10},
						        {width: 60}
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
	return rep_art_xls;
});