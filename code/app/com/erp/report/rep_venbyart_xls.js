define(function() {
	var rep_venbyart_xls = {
		printReport: function(data)
		{
			require(['js/excel-builder/excel-builder', 'js/excel-builder/download', 'app/com/cmn/scripts/repo'], function (EB, downloader, repo){
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
						var emptyStyle = worksheet.emptyStyle;
						var lista = rpta.data.lisVenbyart;
						
						if(lista!=null){
							var workSheetData = [];
							
							workSheetData.push([]);//fila en blanco
							
							//params rendering
							workSheetData.push([{value:'',metadata: {style: titleStyle.id}},{value:rpta.reportTitle,metadata: {style: titleStyle.id}}]);
							workSheetData.push([{value:'',metadata: {style: paramStyle.id}},{value:'Fecha inicio y final',metadata: {style: paramStyle.id}}]);

							workSheetData.push([]);//fila en blanco
							
							//data rendering
							workSheetData.push(['',
							    {value:'DNI',metadata: {style: headerStyle.id}},
								{value:'CODIGO',metadata: {style: headerStyle.id}},
								{value:'COMENSAL',metadata: {style: headerStyle.id}},
								{value:'FECHA',metadata: {style: headerStyle.id}},
								{value:'HORA',metadata: {style: headerStyle.id}},
								{value:'PRODUCTO',metadata: {style: headerStyle.id}},
								{value:'PRECIO',metadata: {style: headerStyle.id}},
								{value:'CANTIDAD',metadata: {style: headerStyle.id}}
							]);
							
							for(key in lista)
							{
								for(keyDdo in lista[key].lisDdo){
									workSheetData.push([
									    '',
										lista[key].lisDdo[keyDdo].endo,
										lista[key].lisDdo[keyDdo].codi,
										lista[key].lisDdo[keyDdo].enom,
									    moment(lista[key].lisDdo[keyDdo].freg).format('DD/MM/YYYY'),
									    moment(lista[key].lisDdo[keyDdo].freg).format('hh:mm:ss'),
									    lista[key].lisDdo[keyDdo].dscr,
									    lista[key].lisDdo[keyDdo].prec,
									    lista[key].lisDdo[keyDdo].cant
									]);
								}
								workSheetData.push([
								    '',
									{value:lista[key].cliente, metadata: {style: cellStyle.id}},
								    {value:'', metadata: {style: cellStyle.id}},
								    {value:'', metadata: {style: cellStyle.id}},
								    {value:'', metadata: {style: cellStyle.id}},
								    {value:'', metadata: {style: cellStyle.id}},
								    {value:'', metadata: {style: cellStyle.id}},
								    {value:'', metadata: {style: cellStyle.id}},
								    {value:Sisem.redondeoString(lista[key].total), metadata: {style: cellStyle.id}}
								]);
							}
							
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 5},
						        {width: 10},
						        {width: 10},
						        {width: 45},
						        {width: 12},
						        {width: 10},
						        {width: 45},
						        {width: 10},
						        {width: 10}
						    ]);

							worksheet.mergeCells('B2','I2');
							worksheet.mergeCells('B3','I3');

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
	return rep_venbyart_xls;
});