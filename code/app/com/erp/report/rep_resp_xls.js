define(function() {
	var rep_resp_xls = {
		printReport: function(dataTmp)
		{
			require(['js/excel-builder/excel-builder', 'js/excel-builder/download'], function (EB, downloader){
				var rpta = dataTmp.rpta;
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

					if(rpta.lisRes!=null){
						var workSheetData = [];
						workSheetData.push([]);

						var jsonHead = '[';
						for(key in rpta.lisBrwCol){jsonHead += rpta.lisBrwCol[key].sest+',';}
						jsonHead = jsonHead.substr(0, jsonHead.length-1);
						jsonHead += ']';
						jsonHead = jsonHead.replace(/,\'\' : \'\'/g, '');
						jsonHead = eval("(" + jsonHead + ")");
						workSheetData.push(jsonHead);

						jsonHead = '[';
						for(key in rpta.lisBrwCol){jsonHead += rpta.lisBrwCol[key].stip+',';}
						jsonHead = jsonHead.substr(0, jsonHead.length-1);
						jsonHead += ']';
						jsonHead = jsonHead.replace(/,\'\' : \'\'/g, '');
						jsonHead = eval("(" + jsonHead + ")");
						workSheetData.push(jsonHead);

						jsonHead='[';
						for(key in rpta.lisBrwCol){jsonHead += rpta.lisBrwCol[key].snom+',';}
						jsonHead = jsonHead.substr(0, jsonHead.length-1);
						jsonHead += ']';
						jsonHead = jsonHead.replace(/,\'\' : \'\'/g, '');
						jsonHead = eval("(" + jsonHead + ")");
						workSheetData.push(jsonHead);

						jsonHead='[';
						for(key in rpta.lisBrwCol){jsonHead += rpta.lisBrwCol[key].sali+',';}
						jsonHead = jsonHead.substr(0, jsonHead.length-1);
						jsonHead += ']';
						jsonHead = jsonHead.replace(/,\'\' : \'\'/g, '');
						jsonHead = eval("(" + jsonHead + ")");
						workSheetData.push(jsonHead);

						for(var iteRes=0; iteRes<rpta.lisRes.length; iteRes++)
						{
							var arrRecord = [];
							for(var iteCol in rpta.lisBrwCol){arrRecord.push(rpta.lisRes[iteRes][rpta.lisBrwCol[iteCol].nomb]);}
							workSheetData.push(arrRecord);
						}
						
						worksheet.setData(workSheetData); //<-- Here's the important part
						
						jsonSize='[{width: 3},';
						for(key in rpta.lisBrwCol){jsonSize += rpta.lisBrwCol[key].ssiz+',';}
						jsonSize = jsonSize.substr(0, jsonSize.length-1);
						jsonSize += ']';
						jsonSize = jsonSize.replace(/,\'\' : \'\'/g, '');
						jsonSize = eval("(" + jsonSize + ")");
						
						worksheet.setColumns(jsonSize);

						workbook.addWorksheet(worksheet);
						var data = EB.createFile(workbook);
						downloader(((dataTmp.reportName.indexOf('.xlsx')>-1)?dataTmp.reportName:dataTmp.reportName+'.xlsx'), data);
						Sisem.unblockW(w.$e);
					}else{
						Sisem.unblockW(w.$e);
					}
				}//if(rpta!=null){
			});
		}
	}
	return rep_resp_xls;
});