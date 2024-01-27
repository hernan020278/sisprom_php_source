var brw_evlu = {
	ejecutar: function(w)
	{
//		Sisem.ejecutar('clg/brw_evlu',{asg_kyasg: 2}, function(rpta){
//			if(rpta.items!=null){
//				var pdr;
//				for(keya in rpta.items)
//				{
//				}//for(keya in rpta.items)
//			}//if(rpta.items!=null){
//		});//Sisem.ejecutar('cmn/',{}, function(rpta){

		var lisCelTab = {
			0: {eky: 0, enm: 'PRM', eds: 'PromedioFinal', evl: '0', env: 1, aky: 0, aor: 'Nro', anm: 'Nombre_Alumno', 
				lisCelTab: {
					0: {eky: 0, enm: 'SM1', eds: '1er Semestr', evl: '0', env: 2, 
						lisCelTab: {
							0: {eky: 0, enm: 'ORA', eds: 'Examen Oral', evl: '0', env: 3, lisCelTab: ''},
							1: {eky: 0, enm: 'EXA', eds: 'Examen escrito', evl: '0', env: 3, lisCelTab: ''},
							2: {eky: 0, enm: 'TRB', eds: 'Trabajo Grupal', evl: '0', env: 3, lisCelTab: ''}
						}
					},
					1: {eky: 0, enm: 'SM2', eds: '1er Semestr', evl: '0', env: 2, 
						lisCelTab: {
							0: {eky: 0, enm: 'PRS', eds: 'Presentacion', evl: '0', env: 3, lisCelTab: ''},
							1: {eky: 0, enm: 'MAN', eds: 'Exposicion', evl: '0', env: 3, lisCelTab: ''}
						}
					},
					2: {eky: 0, enm: 'SM3', eds: '1er Semestr', evl: '0', env: 2, 
						lisCelTab: {
							0: {eky: 0, enm: 'TRI', eds: 'Trabajo inicial', evl: '0', env: 3, lisCelTab: ''},
							1: {eky: 0, enm: 'TRF', eds: 'Trabajo final', evl: '0', env: 3, lisCelTab: ''},
							2: {eky: 0, enm: 'EXF', eds: 'Examen final', evl: '0', env: 3, 
								lisCelTab: {
									0: {eky: 0, enm: 'NT1', eds: 'Nota 1', evl: '0', env: 4, lisCelTab: ''},
									1: {eky: 0, enm: 'NT2', eds: 'Nota 2', evl: '0', env: 4, lisCelTab: ''},
									2: {eky: 0, enm: 'NT3', eds: 'Nota 3', evl: '0', env: 4, lisCelTab: ''}			
								}
							}
						}
					}
				}
			}
		}
//		var objData = {ancho_tabla: 0, total_columna: 0};
//		evlu.imprimirEvaluacion(w.$e.find('[name=theadEncabezado]'), w.$e.find('[name=th_alu_nomb]'), lisCelTab, objData, 'DERECHA', 'th');
//
//		w.$e.find('.table').css('width', objData.ancho_tabla);
//		w.$e.find('.table').find('[name=thEncabezado]').attr('colspan', objData.total_columna);
		
		var lisCelTab = {
			0: {eky: 1, enm: 'PRM', eds: 'PromedioFinal', evl: '1.5', env: 1, aky: 1, aor: 1, anm: 'Hernan Mendoza Ticllahuanaco', 
				lisCelTab: {
					0: {eky: 2, enm: 'SM1', eds: '1er Semestr', evl: '2.5', env: 2, 
						lisCelTab: {
							0: {eky: 3, enm: 'ORA', eds: 'Examen Oral', evl: '3.5', env: 3, lisCelTab: ''},
							1: {eky: 4, enm: 'EXA', eds: 'Examen escrito', evl: '4.5', env: 3, lisCelTab: ''},
							2: {eky: 5, enm: 'TRB', eds: 'Trabajo Grupal', evl: '5.5', env: 3, lisCelTab: ''}
						}
					},
					1: {eky: 6, enm: 'SM2', eds: '1er Semestr', evl: '6.45', env: 2, 
						lisCelTab: {
							0: {eky: 7, enm: 'PRS', eds: 'Presentacion', evl: '7.5', env: 3, lisCelTab: ''},
							1: {eky: 8, enm: 'MAN', eds: 'Exposicion', evl: '8.5', env: 3, lisCelTab: ''}
						}
					},
					2: {eky: 9, enm: 'SM3', eds: '1er Semestr', evl: '9.92', env: 2, 
						lisCelTab: {
							0: {eky: 10, enm: 'TRI', eds: 'Trabajo inicial', evl: '10.23', env: 3, lisCelTab: ''},
							1: {eky: 11, enm: 'TRF', eds: 'Trabajo final', evl: '11.24', env: 3, lisCelTab: ''},
							2: {eky: 12, enm: 'EXF', eds: 'Examen final', evl: '12.76', env: 3, 
								lisCelTab: {
									0: {eky: 13, enm: 'NT1', eds: 'Nota 1', evl: '13.54', env: 4, lisCelTab: ''},
									1: {eky: 14, enm: 'NT2', eds: 'Nota 2', evl: '14.5', env: 4, lisCelTab: ''},
									2: {eky: 15, enm: 'NT3', eds: 'Nota 3', evl: '15.55', env: 4, lisCelTab: ''}			
								}
							}
						}
					}
				}
			},
			1: {eky: 16, enm: 'PRM', eds: 'PromedioFinal', evl: '16.34', env: 1, aky: 2, aor: 2, anm: 'Mayra Vila Daza', 
				lisCelTab: {
					0: {eky: 17, enm: 'SM1', eds: '1er Semestr', evl: '17.5', env: 2, 
						lisCelTab: {
							0: {eky: 18, enm: 'ORA', eds: 'Examen Oral', evl: '18.02', env: 3, lisCelTab: ''},
							1: {eky: 19, enm: 'EXA', eds: 'Examen escrito', evl: '19.23', env: 3, lisCelTab: ''},
							2: {eky: 20, enm: 'TRB', eds: 'Trabajo Grupal', evl: '20.36', env: 3, lisCelTab: ''}
						}
					},
					1: {eky: 21, enm: 'SM2', eds: '1er Semestr', evl: '21.75', env: 2, 
						lisCelTab: {
							0: {eky: 22, enm: 'PRS', eds: 'Presentacion', evl: '22.54', env: 3, lisCelTab: ''},
							1: {eky: 23, enm: 'MAN', eds: 'Exposicion', evl: '23.63', env: 3, lisCelTab: ''}
						}
					},
					2: {eky: 24, enm: 'SM3', eds: '1er Semestr', evl: '24.10', env: 2, 
						lisCelTab: {
							0: {eky: 25, enm: 'TRI', eds: 'Trabajo inicial', evl: '24.13', env: 3, lisCelTab: ''},
							1: {eky: 26, enm: 'TRF', eds: 'Trabajo final', evl: '25.15', env: 3, lisCelTab: ''},
							2: {eky: 27, enm: 'EXF', eds: 'Examen final', evl: '26.85', env: 3, 
								lisCelTab: {
									0: {eky: 28, enm: 'NT1', eds: 'Nota 1', evl: '27.76', env: 4, lisCelTab: ''},
									1: {eky: 29, enm: 'NT2', eds: 'Nota 2', evl: '28.14', env: 4, lisCelTab: ''},
									2: {eky: 30, enm: 'NT3', eds: 'Nota 3', evl: '29.31', env: 4, lisCelTab: ''}			
								}
							}
						}
					}
				}
			}		
		}

//		evlu.imprimirEvaluacion(w.$e.find('[name=tbodyValor]'), w.$e.find('[name=td_alu_nomb]'), lisCelTab, '->', 'DERECHA', 'td');

		if(w.tipo=='EVLALU')
		{
			brw_evlu.generarListaEvaluacion(w, 'OBTENERALUMNOEVALUACION');

			w.$e.find('[name=theadEncabezado]').find('[name=btnEditarEvaluacion]').find('[name=chkEditarEvaluacion]').change(function(e){
				var $chkEditarEvaluacion = $(this);
				var resp = Sisem.msgAsk('¿Desea cambiar edicion?', 'Editar evaluacion', function(rpta){
	    			if(rpta=='Si')
	    			{	    				
	    				if($chkEditarEvaluacion.prop('checked')){brw_evlu.generarListaEvaluacion(w, 'EDITARALUMNOEVALUACION');}
	    				else{brw_evlu.generarListaEvaluacion(w, 'OBTENERALUMNOEVALUACION');}
	    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
	    			else{$chkEditarEvaluacion.prop('checked', !$chkEditarEvaluacion.prop('checked'));}
				});//var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').prp_dscr, function(rpta){
			});//w.$e.find('[name=theadEncabezado]').find('[name=btnGenerarListaEvaluacion]').click(function(e){

			w.$e.find('[name=theadEncabezado]').find('[name=btnGenerarListaEvaluacion]').click(function(e){
				var resp = Sisem.msgAsk('¿Desea eliminar y volver a generar evaluacion?', 'Generar Lista', function(rpta){
	    			if(rpta=='Si'){
	    				brw_evlu.generarListaEvaluacion(w, 'GENERARALUMNOEVALUACION');
	    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
				});//var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').prp_dscr, function(rpta){
				e.preventDefault();
			});//w.$e.find('[name=theadEncabezado]').find('[name=btnGenerarListaEvaluacion]').click(function(e){
		}
		else if(w.tipo=='EVLASG')
		{
			brw_evlu.generarListaEvaluacion(w, 'OBTENERASIGNATURAEVALUACION');
		}
	},//ejecutar: function(w)
	generarListaEvaluacion: function(w, p_comando){
		Sisem.blockW(w.$e);
		
		w.$e.find('[name=thEncabezado]').remove();
		w.$e.find('[name=tbodyValor]').empty();
		
		var data = {comando: p_comando, tipo: w.tipo, alu_kyusu: ((w.alu)?w.alu.alu_kyusu:''), mtr_kymtr: w.mtr.mtr_kymtr, asg_kyasg: w.asg.asg_kyasg, asg_nomb: w.asg.asg_nomb, prp_secc: w.prp.prp_secc, prp_prop: w.prp.prp_prop};
		Sisem.ejecutar('clg/CtrlEvaluacion',data, function(rpta){

			var listaEncabezado = Array();
			var listaValores = Array();
			for(var keyLis in rpta.listaValores)
			{
				for (var keyLisCel in rpta.listaValores[keyLis].lisCelTab)
				{
					listaEncabezado[0] = JSON.parse( JSON.stringify( rpta.listaValores[keyLis].lisCelTab[keyLisCel] ) );
					listaEncabezado[0]['aor'] = 'Nro';
					if(p_comando!='OBTENERASIGNATURAEVALUACION')
					{
						listaEncabezado[0]['aky'] = rpta.listaValores[keyLis]['cky'];
						listaEncabezado[0]['anm'] = rpta.listaValores[keyLis]['cnm'];		
					}
					else
					{
						listaEncabezado[0]['aky'] = rpta.listaValores[keyLis]['eep'];
						listaEncabezado[0]['anm'] = rpta.listaValores[keyLis]['enm'];
					}
					break;
				}
				
				listaValores = rpta.listaValores[keyLis].lisCelTab;

				var objData = {ancho_tabla: 0, total_columna: 0};
				evlu.imprimirEvaluacion(w.$e.find('[name=tbodyValor]'), w.$e.find('[name=th_alu_nomb]'), listaEncabezado, objData, 'DERECHA', 'th');

				w.$e.find('.table').css('width','100px');
				w.$e.find('.tabla-alumno').css('width', objData.ancho_tabla);
				w.$e.find('.table').find('[name=thProfesorAsignatura]').attr('colspan', objData.total_columna);
				
				evlu.imprimirEvaluacion(w.$e.find('[name=tbodyValor]'), w.$e.find('[name=td_alu_nomb]'), listaValores, objData, 'DERECHA', 'td');				
			}//for(rpta.listaValores in keyLis)

			if(p_comando!='OBTENERASIGNATURAEVALUACION')
			{
				w.$e.find('[name=tbodyValor]').find('[name^=tdEvaluacion_]').on('mousedown',function(e){
					e.stopPropagation();
					$(this).css('cursor', 'grabbing');
			    });
				w.$e.find('[name=tbodyValor]').find('[name^=tdEvaluacion_]').on('mouseup',function(e){
					e.stopPropagation();
			        $(this).css('cursor', 'grab');
			    });

				w.$e.find('[name=tbodyValor]').find('[name^=tdEvaluacion_]').click(function(e){
					var $tdEvlu = $(this);
					var dataRow = $(this).data('data');
					
					if($tdEvlu.children().length == 0 && ( p_comando=='OBTENERALUMNOEVALUACION' || p_comando=='GENERARALUMNOEVALUACION' ) )
					{
						$tdEvlu.html('');
						
						$tdEvlu.append('<input name="inpEvaluacion_'+dataRow.evl_kyevl+'" type="text" class="form-control input-evaluacion input-xs">');
						$tdEvlu.find('[name=inpEvaluacion_'+dataRow.evl_kyevl+']').on("focus", function (){$(this).select();});
						$tdEvlu.find('[name=inpEvaluacion_'+dataRow.evl_kyevl+']').val($tdEvlu.data('data').evl).focus();

						$tdEvlu.find('[name=inpEvaluacion_'+dataRow.evl_kyevl+']').blur(function(e){
							var valInpEvl = $tdEvlu.find('[name=inpEvaluacion_'+dataRow.evl_kyevl+']').val();

							if(dataRow.evl != valInpEvl && !isNaN(parseFloat(valInpEvl)))
							{
								Sisem.ejecutar('clg/CtrlEvaluacion',{comando: 'MODIFICARLISTA', evl_kyevl: dataRow.eky, evl_valo: valInpEvl}, function(rpta){
									if(rpta.msg.type=='success')
									{
										$tdEvlu.data('data').evl = valInpEvl;
										$(e.target).remove();
										$tdEvlu.html($tdEvlu.data('data').evl).css('color', ((parseFloat($tdEvlu.data('data').evl) > 10) ? '#0023FF' : '#FF0000') );
										
										var listaCelEvlPdr = '';
										
										for(clave in rpta.listaModificada)
										{
											var celEvlPdr = rpta.listaModificada[clave];
											var $tdEvlPdr = w.$e.find('[name=tbodyValor]').find('[name=tdEvaluacion_'+celEvlPdr.evl_kyevl+']')
											console.log($tdEvlPdr);
											$tdEvlPdr.data('data').evl=Sisem.roundFloat(celEvlPdr.evl_valo, 1);
											$tdEvlPdr.html($tdEvlPdr.data('data').evl);
											
											listaCelEvlPdr+='[name=tdEvaluacion_'+celEvlPdr.evl_kyevl+'],';
										}
										listaCelEvlPdr = listaCelEvlPdr.substr(0, listaCelEvlPdr.length-1);
										
										$(listaCelEvlPdr).each(function(idx){
											var $celEvlPdr = $(this);
											$celEvlPdr.animate({
											    backgroundColor: ( ( parseFloat($celEvlPdr.data('data').evl) > 10 ) ? '#0023FF' :  '#FF0000'),
											    color: '#FFFFFF'
											}, 1000, function () {
												$celEvlPdr.stop().animate({
													backgroundColor:'#FFFFFF',
													color: ( ( parseFloat($celEvlPdr.data('data').evl) > 10 ) ? '#0023FF' :  '#FF0000')
												}, 1000, function(){
													$(this).css('background-color', '').attr('bgcolor', '#FFFFFF');
												});
											});
										});
									}//if(rpta.msg.type=='success')
								});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
							}//if(dataRow.evl != $tdEvlu.find('[name=inpEvaluacion_'+dataRow.evl_kyevl+']').val())
							else
							{
								$(e.target).remove();
								$tdEvlu.html($tdEvlu.data('data').evl);
							}
						});//$tdEvlu.find('[name=inpEvaluacion]').blur(function(e){
					}//if($tdEvlu.children().length == 0 && ( p_comando=='OBTENERALUMNOEVALUACION' || p_comando=='OBTENERALUMNOEVALUACION' ) )
					else
					{
		    			evlu.winSel({
		    				tipo: 'EVLHIS',
		    				evl: {evl_kyevl: dataRow.eky, evl_nive: dataRow.env, evl_nomb: dataRow.enm, evl_dscr: dataRow.eds, evl_valo: dataRow.evl},
							modo:'VISUALIZAR',
							size: 'large',
		    				callback:function(){
		    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
		    				}
		    			});
					}
				});
				
				var idGlobalGrid = 'cm_GlobalGrid';
				
				w.$e.find('[name=tbodyValor]').find('[name^=trAlumno]').contextMenu({
					buttonHelper: true,
				    menuSelector: "#"+idGlobalGrid,
				    onShow:function($el, invokedOn){
				    	$el.css('z-index','1100');
				    	var $row = invokedOn.closest('tr');		    	
				    	$el.find('[id^='+idGlobalGrid+']').hide();

				    	$el.find('#'+idGlobalGrid+'_deta').show();
				    },
				    menuSelected: function (invokedOn, selectedMenu) {
				    	var $id = selectedMenu.attr('id');
				    	var $row = invokedOn.closest('tr');
				    	switch($id){
				    		case idGlobalGrid+"_deta":
				    			console.log($row.data('data'));
				    			break;
					    }//switch($id){
					}//menuSelected: function (invokedOn, selectedMenu) {
				});//w.$e.find('[name=tbodyValor]').find('[name^=trAlumno]').contextMenu({
			}//if(p_comando!='OBTENERASIGNATURAEVALUACION')
			
			Sisem.msgBox('success','Se genero la lista de evaluacion!!!');
			Sisem.unblockW(w.$e);
		});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){		
	}//generarListaEvaluacion: function(w){
};//var brw_doc = {