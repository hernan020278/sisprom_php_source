define(function() {
	var rep_ven_exp_xls = {
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
						var cellNumberStyle = worksheet.cellStyle;
						var fila=0;
						if(rpta.data.lista!=null){
							var workSheetData = [];

							//params rendering
							fila++;workSheetData.push(['']);
							fila++;workSheetData.push(['','Ventas para exportar']);
							fila++;workSheetData.push(['']);
							worksheet.mergeCells('B'+fila, 'I'+fila);
							//data rendering
							fila++;workSheetData.push([
							    '',                
								{value:'NUMERO',metadata: {style: headerStyle.id}},
								{value:'CLIENTE',metadata: {style: headerStyle.id}},
								{value:'CODIGO',metadata: {style: headerStyle.id}},
								{value:'COMENSAL',metadata: {style: headerStyle.id}},
								{value:'FECHA',metadata: {style: headerStyle.id}},
								{value:'HORA',metadata: {style: headerStyle.id}},
								{value:'PRODUCTO',metadata: {style: headerStyle.id}},
								{value:'PRECIO',metadata: {style: headerStyle.id}},
								{value:'CANT',metadata: {style: headerStyle.id}}
							]);
							var cliCodiAct = '';
							var cliCodiPos = '';
							var cliTota = 0;
							var total = 0;
							for(var i=0;i<rpta.data.lista.length;i++)
							{
								fila++;workSheetData.push([
								    '',
									rpta.data.lista[i].ndoc,
									rpta.data.lista[i].pdrNomb,
									rpta.data.lista[i].cliCodi,
									rpta.data.lista[i].cliNomb,
									moment(rpta.data.lista[i].freg).format('DD/MM/YYYY'),
									moment(rpta.data.lista[i].freg).format('hh:mm:ss'),
									rpta.data.lista[i].dscr,
									parseFloat(rpta.data.lista[i].prec),
									parseFloat(rpta.data.lista[i].cant)
								]);
								
								//Ultimo registro
								if((i+1)<rpta.data.lista.length)
								{
									cliCodiAct=rpta.data.lista[i].cliCodi;
									cliCodiPos=rpta.data.lista[i+1].cliCodi;
								}
								else
								{
									cliCodiAct=rpta.data.lista[i].cliCodi;
									cliCodiPos='';
								}
								cliTota+=parseFloat(rpta.data.lista[i].cant);
								total+=parseFloat(rpta.data.lista[i].cant);
								if(cliCodiAct!=cliCodiPos)
								{
									var filEmpty=new Array(8);
									filEmpty[7]={value: 'Total ', metadata: {style: footerStyle.id}};
									filEmpty[8]={value: parseFloat(cliTota), metadata: {style: footerStyle.id}};
									fila++;workSheetData.push(filEmpty);//fila en blanco
									cliTota=0;
								}
							}
							var filEmpty=new Array(8);
							filEmpty[7]={value: 'Total General', metadata: {style: footerStyle.id}};
							filEmpty[8]={value: parseFloat(total), metadata: {style: footerStyle.id}};
							fila++;workSheetData.push(filEmpty);//fila en blanco
							
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 10},
							    {width: 15},
						        {width: 10},
						        {width: 40},
						        {width: 15},
						        {width: 15},
						        {width: 40},
						        {width: 15},
						        {width: 15}
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
	return rep_ven_exp_xls;
});