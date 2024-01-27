define(function() {
	var rep_cli_xls = {
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
							    {value:'TIPO[NAT/JUR]',metadata: {style: headerStyle.id}},
								{value:'CODIGO',metadata: {style: headerStyle.id}},
								{value:'NOMBRE',metadata: {style: headerStyle.id}},
								{value:'TIP-DOC',metadata: {style: headerStyle.id}},
								{value:'NUM-DOC',metadata: {style: headerStyle.id}},
								{value:'DIRECCION',metadata: {style: headerStyle.id}},
								{value:'TELEFONO',metadata: {style: headerStyle.id}},
								{value:'CONTACTO',metadata: {style: headerStyle.id}},
								{value:'Nº DE CONTACTO',metadata: {style: headerStyle.id}},
								{value:'RPM',metadata: {style: headerStyle.id}},
								{value:'CARGO',metadata: {style: headerStyle.id}},
								{value:'E-MAIL',metadata: {style: headerStyle.id}},
								{value:'SUCURSAL',metadata: {style: headerStyle.id}}
							]);
							for(var i=0;i<rpta.data.lisEnt.length;i++){
								workSheetData.push(['',
								    {value:rpta.data.lisEnt[i].tper,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].codi,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].nomb+' '+rpta.data.lisEnt[i].ape1+' '+rpta.data.lisEnt[i].ape2,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].tdoc,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].ndoc,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].dire,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].tele,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].conNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].conTele,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].conMobi,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].carNomb,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].conMail,metadata: {style: cellStyle.id}},
								    {value:rpta.data.lisEnt[i].sucNomb,metadata: {style: cellStyle.id}}
								    //{value:estado[rpta.data.lisEnt[i].esta].text,metadata: {style: cellStyle.id}}
								]);
							}
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 5},
						        {width: 14},
						        {width: 10},
						        {width: 20},
						        {width: 10},
						        {width: 10},
						        {width: 40},
						        {width: 10},
						        {width: 25},
						        {width: 10},
						        {width: 10},
						        {width: 15},
						        {width: 35}
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
	return rep_cli_xls;
});