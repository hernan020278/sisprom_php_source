var rdoc = {
	wb:null,
	wp:null,
	ws:null,		
	pag:{
		alias		: 'Reporte',
		name		: 'frmReporte',
		acceso		: '',
		modo		: '',
		idGrLisBrw	: 'idGrLisBrwReporte',
		idGrSelStk	: 'idGrSelStkReporte',
		idGrSelObj	: 'idGrSelReporte'
	},
	init:function(w){
		if(w==null)w=new Object;
		rdoc.wp=w;
		Sisem.Cargar({
			container: '#mainPanel',
			url:base_url+'erp/rdoc/rdoc_edit',
			beforeLoad:function(){
			},
			afterLoad:function(data){

				$main = $('#content');
				w.$e = $('#mainPanel');

				var horini = moment(new Date((new Date()).getYear()+1900,(new Date()).getMonth(),(new Date()).getDate(),0,0,0,0)).format('YYYY-MM-DD HH:mm:ss');
				var horfin = moment(new Date((new Date()).getYear()+1900,(new Date()).getMonth(),(new Date()).getDate(),23,59,59,0)).format('YYYY-MM-DD HH:mm:ss');
				
				w.$e.find('[name=fini]').val(horini).datetimepicker({dateFormat:'yy-mm-dd', timeFormat:'HH:mm:ss'});
				w.$e.find('[name=ffin]').val(horfin).datetimepicker({dateFormat:'yy-mm-dd', timeFormat:'HH:mm:ss'});
				
				w.$e.find('[name=titulo]').html('Reporte de '+((w.tipo=='repDocVen')?'Ventas':'Compras'));
				
				w.$e.find('#cmdImprimir').click(function(){
					var params = rdoc.getFormData(w);
					params = $.param(params);
					Sisem.windowPrint({id:'repDocumento',title:'Reporte de Documento',urlIframe:base_url+'erp/rdoc/rdoc_print?'+params});						
				});
				
				w.$e.find('#cmdExportar').click(function(){
					Sisem.blockW(w.$e);
					require(['js/excel-builder/excel-builder'], function (EB) {
						var params = rdoc.getFormData(w);
						params.format = 'json';
						$.get(base_url+'erp/rdoc/rdoc_print',params,function(data){
							if(data.data.respNiv1!=null){
								var book = EB.createWorkbook();
								var worksheet = book.createWorksheet({name: 'Ventas'});
								var stylesheet = book.getStyleSheet();
								var headerStyle = stylesheet.createFormat({
							        font: {
							            bold: true,
							            color:'FFFFFF'
							        },
							        fill: {
							            type: 'pattern',
							            patternType: 'solid',
							            fgColor: '000000'
							        }
							    });
								var workSheetData = [];
								/*if(print_params.length>0){
									for(var i=0;i<print_params.length;i++){
										workSheetData.push(print_params[i]);
									}
								}*/
								
								//params rendering
								workSheetData.push(['Reporte de:',data.data.titu]);
								workSheetData.push(['Desde:',data.data.fini]);
								workSheetData.push(['Hasta:',data.data.ffin]);
								workSheetData.push(['Sucursal:',data.data.sucu]);
								workSheetData.push(['Entidad:',data.data.enti]);
								workSheetData.push(['Tipo de Pago:','TODOS']);
								workSheetData.push(['Forma de Pago:','TODOS']);
								
								//data rendering
								workSheetData.push([
								    {value:'Registrado el',metadata: {style: headerStyle.id}},
									{value:'Estado',metadata: {style: headerStyle.id}},
									{value:'Tipo de Documento',metadata: {style: headerStyle.id}},
									{value:'Numero',metadata: {style: headerStyle.id}},
									{value:'Proveedor (Documento)',metadata: {style: headerStyle.id}},
									{value:'Proveedor (Denominacion)',metadata: {style: headerStyle.id}},
									{value:'Sub-Total',metadata: {style: headerStyle.id}},
									{value:'IGV',metadata: {style: headerStyle.id}},
									{value:'Total',metadata: {style: headerStyle.id}},
									{value:'Cuenta',metadata: {style: headerStyle.id}},
									{value:'Saldo',metadata: {style: headerStyle.id}}
								]);
								for(var i=0;i<data.data.respNiv1.length;i++){
									workSheetData.push([
									    moment(data.data.respNiv1[i].creacion_fecha).format('DD/MM/YYYY hh:mm:ss'),
										estado[data.data.respNiv1[i].esta].text,
										data.data.respNiv1[i].tdoc,
										data.data.respNiv1[i].ndoc,
										data.data.respNiv1[i].endo,
										data.data.respNiv1[i].enom,
										data.data.respNiv1[i].stot,
										data.data.respNiv1[i].igve,
										data.data.respNiv1[i].tota,
										data.data.respNiv1[i].scan,
										data.data.respNiv1[i].spag
									]);
									if(data.data.moda == 'DETALLADO'){
										workSheetData.push([
										    '',
											'',
											'',
											{value:'Codigo',metadata: {style: headerStyle.id}},
											{value:'Unidad',metadata: {style: headerStyle.id}},
											{value:'Desripcion',metadata: {style: headerStyle.id}},
											{value:'Cantidad',metadata: {style: headerStyle.id}},
											{value:'P. Unit',metadata: {style: headerStyle.id}},
											{value:'P. Total',metadata: {style: headerStyle.id}},
											{value:'C. Entregado',metadata: {style: headerStyle.id}},
											{value:'C. Faturado',metadata: {style: headerStyle.id}}
										]);
										for(var j=0;j<data.data.respNiv1[i].detalle.length;j++){
											workSheetData.push([
											    '',
												'',
												'',
												data.data.respNiv1[i].detalle[j].codi,
												data.data.respNiv1[i].detalle[j].unid,
												data.data.respNiv1[i].detalle[j].dscr,
												data.data.respNiv1[i].detalle[j].cant,
												data.data.respNiv1[i].detalle[j].pdto,
												data.data.respNiv1[i].detalle[j].impo,
												data.data.respNiv1[i].detalle[j].cent,
												data.data.respNiv1[i].detalle[j].cfac
											]);
										}
									}
								}
								worksheet.setData(workSheetData); //<-- Here's the important part
								worksheet.setColumns([
								    {width: 20},
							        {width: 20},
							        {width: 25},
							        {width: 25},
							        {width: 20},
							        {width: 40},
							        {width: 15},
							        {width: 15},
							        {width: 15},
							        {width: 15},
							        {width: 15}
							    ]);
								book.addWorksheet(worksheet);
								var data = EB.createFile(book);
								window.open('data:app/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'+data);
								Sisem.unblockW(w.$e);
							}else{
								alert('No se encontraron resultados para el filtro seleccionado');
								Sisem.unblockW(w.$e);
							}
						},'json');
					});
				});
				
				sucu.sucursalReporteAuto(w);
				usua.clienteProveedorAuto(w);
			}
		});
	},
	getFormData:function(w){
		if(w==null)return false;
		var $id_sucu = $('[name=sucursal_ideAuto]').val();
		var $id_enti = $('[name=id_enti]').val();
		
		var $tpag= w.$e.find('[name=tpag] :selected').val();
		var $fpag= w.$e.find('[name=fpag] :selected').val();

		var $fini= ( ( w.$e.find('[name=fini]').val()==null || w.$e.find('[name=fini]').val()=='' ) ? moment().format('YYYY-MM-DD HH:mm:ss') : w.$e.find('[name=fini]').val() );
		var $ffin= ( ( w.$e.find('[name=ffin]').val()==null || w.$e.find('[name=ffin]').val()=='' ) ? moment().format('YYYY-MM-DD HH:mm:ss') : w.$e.find('[name=ffin]').val() );
		
		var $moda= w.$e.find('[name=moda] :selected').val();
		
		var params = {
				id_sucu:$id_sucu,
				id_enti:$id_enti,
				tpag:$tpag,
				fpag:$fpag,
				fini:$fini,
				ffin:$ffin,
				moda:$moda,
				tipo:w.tipo,
				kycom:kycom
		};
		return params;
	}
};
