define(function() {
	var rep_cco_xls = {
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
							    {value:'ID_CTA',metadata: {style: headerStyle.id}},
								{value:'ENTIDAD',metadata: {style: headerStyle.id}},
								{value:'TIPO',metadata: {style: headerStyle.id}},
								{value:'NUMERO',metadata: {style: headerStyle.id}},
								{value:'MONEDA',metadata: {style: headerStyle.id}},
								{value:'TOTAL',metadata: {style: headerStyle.id}},
								{value:'GASTADO',metadata: {style: headerStyle.id}},
								{value:'SALDO',metadata: {style: headerStyle.id}}
							]);
							for(var i=0;i<rpta.data.lista.length;i++){
								workSheetData.push(['',
								    {value:parseInt(rpta.data.lista[i].id_ccor),metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].enom,metadata: {style: cellStyle.id}},
								    {value:tipCta[rpta.data.lista[i].tcta],metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].ndoc,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lista[i].tmon,metadata: {style: cellStyle.id}},
								    {value:Sisem.roundFloat(rpta.data.lista[i].sant,2),metadata: {style: cellStyle.id}},
								    {value:Sisem.roundFloat(rpta.data.lista[i].scan,2),metadata: {style: cellStyle.id}},
								    {value:Sisem.roundFloat(rpta.data.lista[i].spag,2),metadata: {style: cellStyle.id}}
								]);
							}
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 5},
						        {width: 10},
						        {width: 100}
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
	return rep_cco_xls;
});