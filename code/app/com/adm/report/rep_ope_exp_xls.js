define(function() {
	var rep_ope_exp_xls = {
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
						var cellNumberStyle = worksheet.cellStyle;
						
						if(rpta.data.items!=null){
							var workSheetData = [];

							//params rendering
							workSheetData.push(['']);
							workSheetData.push(['','Reporte',rpta.reportTitle]);
							workSheetData.push(['','Desde',rpta.doc_fini]);
							workSheetData.push(['','Desde',rpta.doc_ffin]);
							workSheetData.push(['','Entidad',rpta.usu_nomb]);
							workSheetData.push(['','Caja',rpta.suc_nomb]);
							var arrCol = new Array(23);
							var tot_ing = 0;
							var tot_egr = 0;
							for(ite=0;ite<23;ite++){arrCol[ite]=(ite+1);}
							//workSheetData.push(arrCol);
							//workSheetData.push(['','ENCABEZADO DE FACTURA','','','','','','','','','','','','','ITEMS PRODUCTO','','','','','','','','','']);
							//data rendering
							workSheetData.push(['',
								{value:'FECHA',metadata: {style: headerStyle.id}},
								{value:'CAJA',metadata: {style: headerStyle.id}},
								{value:'TRABAJADOR',metadata: {style: headerStyle.id}},
								{value:'CLI/PRV',metadata: {style: headerStyle.id}},
								{value:'TIP-CTA',metadata: {style: headerStyle.id}},
								{value:'NUM-CTA',metadata: {style: headerStyle.id}},
								{value:'OPERACION',metadata: {style: headerStyle.id}},
								{value:'FORM-PAGO',metadata: {style: headerStyle.id}},
								{value:'TIP-OPE',metadata: {style: headerStyle.id}},
								{value:'TIP-DOC',metadata: {style: headerStyle.id}},
								{value:'NUM-DOC',metadata: {style: headerStyle.id}},
								{value:'MONEDA',metadata: {style: headerStyle.id}},
								{value:'INGRESO',metadata: {style: headerStyle.id}},
								{value:'EGRESO',metadata: {style: headerStyle.id}},
								{value:'ESTADO',metadata: {style: headerStyle.id}},
								{value:'GLOSA',metadata: {style: headerStyle.id}}
							]);
							for(var i=0;i<rpta.data.items.length;i++){
								workSheetData.push(['',
								    moment(rpta.data.items[i].freg).format('DD/MM/YYYY hh:mm:ss'),
								    rpta.data.items[i].suc_nomb,
								    rpta.data.items[i].tra_nomb,
								    rpta.data.items[i].usu_nomb,
								    rpta.data.items[i].cco_tcta,
								    rpta.data.items[i].cco_ndoc,
								    tipOpe[rpta.data.items[i].ope_tope],
								    rpta.data.items[i].ope_fpag,
								    rpta.data.items[i].ope_otip,
								    rpta.data.items[i].ope_tdoc,
								    rpta.data.items[i].ope_ndoc,
								    rpta.data.items[i].ope_omon,
								    Sisem.redondeoString(parseFloat(rpta.data.items[i].ope_debe)),
								    Sisem.redondeoString(parseFloat(rpta.data.items[i].ope_habe)),
								    estado[rpta.data.items[i].ope_esta].text,
								    rpta.data.items[i].ope_pobs
								]);
								tot_ing+=parseFloat(rpta.data.items[i].ope_debe);
								tot_egr+=parseFloat(rpta.data.items[i].ope_habe);
							}
							workSheetData.push(['','','','','','','','','','','','','','','','','','','','','',Sisem.redondeoString(tot_ing),Sisem.redondeoString(tot_egr)]);
							worksheet.setData(workSheetData); //<-- Here's the important part
							worksheet.setColumns([
							    {width: 4},
							    {width: 10},
						        {width: 20},
						        {width: 25},
						        {width: 10},
						        {width: 20},
						        {width: 10},
						        {width: 15},
						        {width: 15},
						        {width: 15},
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
	return rep_ope_exp_xls;
});