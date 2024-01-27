define(function() {
	var rep_ven_con_xls = {
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
						var cellNumberStyle = worksheet.cellNumberStyle;
						var cellIntStyle = worksheet.cellIntStyle;
						var cellDecStyle = worksheet.cellDecStyle;
						var fila=0;
						if(rpta.data.lisVenCli!=null){
							var workSheetData = [];

							//params rendering
							fila++;workSheetData.push(['']);
							fila++;workSheetData.push(['','Ventas para exportar']);
							fila++;workSheetData.push(['']);
							worksheet.mergeCells('B'+fila, 'I'+fila);
							
							//data rendering
							var row = [];
							row.push('');
							row.push({value: 'CLIENTE', metadata: {style: headerStyle.id}});
							row.push({value: 'CODIGO', metadata: {style: headerStyle.id}});
							row.push({value: 'DNI', metadata: {style: headerStyle.id}});
							row.push({value: 'APELLIDOS/NOMBRES', metadata: {style: headerStyle.id}});
							row.push({value: 'TIPO/DESCRIPCION', metadata: {style: headerStyle.id}});
							row.push({value: 'GERENCIA/AREA', metadata: {style: headerStyle.id}});
							row.push({value: 'DENOMINACION', metadata: {style: headerStyle.id}});
							row.push({value: 'DIVISION', metadata: {style: headerStyle.id}});
							row.push({value: 'GRUPO', metadata: {style: headerStyle.id}});
							row.push({value: 'ESTADO', metadata: {style: headerStyle.id}});
							for(id_arti in rpta.data.lisArtHead)
							{
								if(id_arti=='9999')
								{
									row.push({value: rpta.data.lisArtHead[id_arti].headNomb, metadata: {style: headerStyle.id}});	
								}
								else
								{
									row.push({value: rpta.data.lisArtHead[id_arti].headNomb, metadata: {style: headerStyle.id}});
									row.push({value: rpta.data.lisArtHead[id_arti].headPrec, metadata: {style: headerStyle.id}});
								}
							}
							fila++;workSheetData.push(row);
							
							var cliCodiAct = '';
							var cliCodiPos = '';
							var cliTota = 0;
							var total = 0;
							for(cliId_enti in rpta.data.lisVenCli)
							{
								var row = [];
								row.push('');
								row.push({value: rpta.data.lisVenCli[cliId_enti].pdrNomb, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].cliCodi, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].cliNdoc, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].cliNomb, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].catNomb, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].areNomb, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].denNomb, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].divNomb, metadata: {style: cellStyle.id}});
								row.push({value: rpta.data.lisVenCli[cliId_enti].gruNomb, metadata: {style: cellStyle.id}});
								row.push({value: estado[rpta.data.lisVenCli[cliId_enti].cliEsta].text, metadata: {style: cellStyle.id}});								
								for(id_arti in rpta.data.lisVenCli[cliId_enti].lisArtCli)
								{
									if(id_arti=='9999')
									{
										row.push({value: parseFloat(rpta.data.lisVenCli[cliId_enti].lisArtCli[id_arti].impo), metadata: {style: cellDecStyle.id}});
									}
									else
									{
										row.push({value: parseFloat(rpta.data.lisVenCli[cliId_enti].lisArtCli[id_arti].cant), metadata: {style: cellIntStyle.id}});
										row.push({value: parseFloat(rpta.data.lisVenCli[cliId_enti].lisArtCli[id_arti].prec), metadata: {style: cellDecStyle.id}});
									}
								}
								fila++;workSheetData.push(row);	
							}

							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 5},
							    {width: 35},
						        {width: 10},
						        {width: 10},
						        {width: 35},
						        {width: 10},
						        {width: 27},
						        {width: 10},
						        {width: 27},
						        {width: 10},
						        {width: 27},
						        {width: 10}
						    ]);
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
	return rep_ven_con_xls;
});