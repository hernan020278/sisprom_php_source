var brw_asit = {
	ejecutar: function(w)
	{
		var lisCelTab = {
			0: {aky: 0, anm: 'AST', ads: 'Asistencia', afi: '01/01/2020', aei: '0000', aff: '01/01/2020', aef: '0000', amr: 'ENTRADA', aky: 0, aor: 'Nro', anm: 'Nombre_Alumno', 
				lisCelTab: {
					0: {aky: 0, anm: '20200101', ads: '01/01/2020', afi: '01/01/2020', aei: '0000', aff: '01/01/2020', aef: '0000', amr: 'ENTRADA', 
						lisCelTab: {
							0: {aky: 0, anm: '01', ads: '01/01/2020', afi: '01/01/2020', aei: '0000', aff: '01/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							1: {aky: 1, anm: '02', ads: '02/01/2020', afi: '02/01/2020', aei: '0000', aff: '02/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							2: {aky: 2, anm: '03', ads: '03/01/2020', afi: '03/01/2020', aei: '0000', aff: '03/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							3: {aky: 3, anm: '04', ads: '04/01/2020', afi: '04/01/2020', aei: '0000', aff: '04/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							4: {aky: 4, anm: '05', ads: '05/01/2020', afi: '05/01/2020', aei: '0000', aff: '05/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''}
						}
					}
				}
			}
		}
//		var objData = {ancho_tabla: 0, total_columna: 0};
//		asit.imprimirAsistencia(w.$e.find('[name=theadEncabezado]'), w.$e.find('[name=th_alu_nomb]'), lisCelTab, objData, 'DERECHA', 'th');
//
//		w.$e.find('.table').css('width', objData.ancho_tabla);
//		w.$e.find('.table').find('[name=thEncabezado]').attr('colspan', objData.total_columna);
		var lisCelTab = {
			0: {aky: 0, anm: 'AST', ads: 'Asistencia', afi: '01/01/2020', aei: '0000', aff: '01/01/2020', aef: '0000', amr: 'ENTRADA', aky: 0, aor: '01', anm: 'Hernan Mendoza', 
				lisCelTab: {
					0: {aky: 0, anm: '20200101', ads: '01/01/2020', afi: '01/01/2020', aei: '0000', aff: '01/01/2020', aef: '0000', amr: 'ENTRADA', 
						lisCelTab: {
							0: {aky: 0, anm: '20200101', ads: '01/01/2020', afi: '01/01/2020', aei: '0000', aff: '01/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							1: {aky: 1, anm: '20200102', ads: '02/01/2020', afi: '02/01/2020', aei: '0000', aff: '02/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							2: {aky: 2, anm: '20200103', ads: '03/01/2020', afi: '03/01/2020', aei: '0000', aff: '03/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							3: {aky: 3, anm: '20200104', ads: '04/01/2020', afi: '04/01/2020', aei: '0000', aff: '04/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							4: {aky: 4, anm: '20200105', ads: '05/01/2020', afi: '05/01/2020', aei: '0000', aff: '05/01/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''}
						}
					},
					1: {aky: 0, anm: '20200201', ads: '01/02/2020', afi: '01/02/2020', aei: '0000', aff: '01/02/2020', aef: '0000', amr: 'ENTRADA', 
						lisCelTab: {
							0: {aky: 0, anm: '20200201', ads: '01/02/2020', afi: '01/02/2020', aei: '0000', aff: '01/02/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							1: {aky: 1, anm: '20200202', ads: '02/02/2020', afi: '02/02/2020', aei: '0000', aff: '02/02/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							2: {aky: 2, anm: '20200203', ads: '03/02/2020', afi: '03/02/2020', aei: '0000', aff: '03/02/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							3: {aky: 3, anm: '20200204', ads: '04/02/2020', afi: '04/02/2020', aei: '0000', aff: '04/02/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''},
							4: {aky: 4, anm: '20200205', ads: '05/02/2020', afi: '05/02/2020', aei: '0000', aff: '05/02/2020', aef: '0000', amr: 'ENTRADA', lisCelTab: ''}
						}
					}
				}
			}
		}
//		asit.imprimirAsistencia(w.$e.find('[name=tbodyValor]'), w.$e.find('[name=td_alu_nomb]'), lisCelTab, '->', 'DERECHA', 'td');
		if(w.tipo=='MATRASIT')
		{
//			w.$e.find('[name=theadEncabezado]').find('[name=btnEditarAsistencia]').find('[name=chkEditarAsistencia]').change(function(e){
//				var $chkEditarAsistencia = $(this);
//				var resp = Sisem.msgAsk('¿Desea cambiar edicion?', 'Editar evaluacion', function(rpta){
//	    			if(rpta=='Si')
//	    			{
//	    				if($chkEditarAsistencia.prop('checked')){brw_asit.generarListaAsistencia(w, 'EDITARMATRASIT');}
//	    				else{brw_asit.generarListaAsistencia(w, 'OBTENERMATRASIT');}
//	    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
//	    			else{$chkEditarAsistencia.prop('checked', !$chkEditarAsistencia.prop('checked'));}
//				});//var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').prp_dscr, function(rpta){
//			});//w.$e.find('[name=theadEncabezado]').find('[name=btnEditarAsistencia]').find('[name=chkEditarAsistencia]').change(function(e){
			w.$e.find('[name=divProfesorAsignatura]').find('[name=btnGenerarListaAsistencia]').click(function(e){
				var resp = Sisem.msgAsk('¿Desea eliminar y volver a generar asistencia?', 'Generar Lista', function(rpta){
	    			if(rpta=='Si'){
	    		        var data = {comando: 'GENERARASISTENCIAALUMNO', tipo: w.tipo, alu_kyusu: ((w.alu)?w.alu.alu_kyusu:''), mtr_peri: w.mtr.mtr_peri, mtr_prog: w.mtr.mtr_prog, mtr_nive: w.mtr.mtr_nive, mtr_grad: w.mtr.mtr_grad, mtr_turn: w.mtr.mtr_turn, mtr_aula: w.mtr.mtr_aula, asg_kyasg: w.asg.asg_kyasg, asg_nomb: w.asg.asg_nomb};
	    				Sisem.ejecutar('asi/CtrlAsistencia',data, function(rpta){
	    					brw_asit.generarPeriodoAsistencia(w, 'OBTENERMATRASIT');
	    				});
	    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
				});//var resp = Sisem.msgAsk('Desea eliminar', $row.data('data').prp_dscr, function(rpta){
				e.preventDefault();
			});//w.$e.find('[name=theadEncabezado]').find('[name=btnGenerarListaAsistencia]').click(function(e){
			brw_asit.generarPeriodoAsistencia(w, 'OBTENERMATRASIT');
		}
		else if(w.tipo=='ASTASG')
		{
			brw_asit.generarListaAsistencia(w, 'OBTENERASIGNATURAASISTENCIA');
		}
	},//ejecutar: function(w)
	generarPeriodoAsistencia: function(w, p_comando){
        var data = {comando: p_comando, tipo: 'ASTPERI', alu_kyusu: ((w.alu)?w.alu.alu_kyusu:''), mtr_peri: w.mtr.mtr_peri, mtr_prog: w.mtr.mtr_prog, mtr_nive: w.mtr.mtr_nive, mtr_grad: w.mtr.mtr_grad, mtr_turn: w.mtr.mtr_turn, mtr_aula: w.mtr.mtr_aula, asg_kyasg: w.asg.asg_kyasg, asg_nomb: w.asg.asg_nomb};		
		Sisem.ejecutar('asi/GetListaAsistencia',data, function(rpta){
			var _tagThEncabezado='';
			_tagThEncabezado+='<tr name="thPeriodo">';
				_tagThEncabezado+='<th name="thPeriodoAnterior" colspan="2"><button name="btnPeriodoAnterior" class="btn btn-primary btn-sm">Anterior</button></th>';
				_tagThEncabezado+='<th name="thPeriodoActual"></th>';
				_tagThEncabezado+='<th name="thPeriodoSiguiente" colspan="4"><button name="btnPeriodoSiguiente" class="btn btn-primary btn-sm">Siguiente</button></th>';
			_tagThEncabezado+='</tr>';
			w.$e.find('[name=theadEncabezado]').append(_tagThEncabezado);
			
			w.$e.find('[name=theadEncabezado]').find('[name=btnPeriodoAnterior]').on('click',function(e){
				e.stopPropagation();
				asit.periodoAnterior(w);
				brw_asit.generarListaAsistencia(w, 'OBTENERMATRASIT');
		    });
			w.$e.find('[name=theadEncabezado]').find('[name=btnPeriodoSiguiente]').on('click',function(e){
				e.stopPropagation();
				asit.periodoSiguiente(w);
				brw_asit.generarListaAsistencia(w, 'OBTENERMATRASIT');
		    });
			if(rpta.lista.items.length > 0)
			{
				asit.listaPeriodo = rpta.lista.items;
				asit.posAct = -1;
				asit.periodoSiguiente(w);
				brw_asit.generarListaAsistencia(w, 'OBTENERMATRASIT');
			}
		});		
	},
	generarListaAsistencia: function(w, p_comando){
		Sisem.blockW(w.$e);
		
//		w.$e.find('[name=thEncabezado]').remove();
//		w.$e.find('[name=tbodyValor]').empty();
        var data = {comando: p_comando, tipo: w.tipo, alu_kyusu: ((w.alu)?w.alu.alu_kyusu:''), mtr_peri: w.mtr.mtr_peri, mtr_prog: w.mtr.mtr_prog, mtr_nive: w.mtr.mtr_nive, mtr_grad: w.mtr.mtr_grad, mtr_turn: w.mtr.mtr_turn, mtr_aula: w.mtr.mtr_aula, asg_kyasg: w.asg.asg_kyasg, asg_nomb: w.asg.asg_nomb, asg_peri: asit.listaPeriodo[asit.posAct].asg_peri};
		Sisem.ejecutar('asi/CtrlAsistencia',data, function(rpta){

			var listaEncabezado = Array();
			var listaValores = Array();
			var listaColor = Array();
			listaColor[0] = '#000000';//NEGRO
			listaColor[1] = '#D3FFFE';//CELESTE
			listaColor[2] = '#B2FFB1';//VERDE
			listaColor[3] = '#FFF6B1';//ANARANJADO
			listaColor[4] = '#CAD7FF';//CELESTE OSCURO
			listaColor[5] = '#FF0000';//ROJO
			listaColor[6] = '#0023FF';//AZUL
			listaColor[7] = '#FFFFFF';//BLANCO
			
			w.$e.find('[name=theadEncabezado]').find('[name=thAlumAsig]').remove();
			w.$e.find('[name=tbodyValor]').empty();
			
			for(var keyAsig in rpta.lisAsig)
			{
				var iteAlum = 0;
				for (var keyAlum in rpta.lisAsig[keyAsig].lisAlum)
				{
					iteAlum++;
					var filaAlum = rpta.lisAsig[keyAsig].lisAlum[keyAlum];

					/** ******************
					 * Llenar encabezado *
					 *********************/
					if(iteAlum==1)
					{
						var _tagThEncabezado='';
						_tagThEncabezado+='<tr name="thAlumAsig">';
							_tagThEncabezado+='<th name="thAlumAsigItem" width="35">Nro</th>';
							_tagThEncabezado+='<th name="thAlumAsigNomb" width="150">Alumno</th>';
							_tagThEncabezado+='<th name="thAlumAsigPres" width="35">PRES</th>';
							_tagThEncabezado+='<th name="thAlumAsigTard" width="35">TARD</th>';
							_tagThEncabezado+='<th name="thAlumAsigFalt" width="35">FALT</th>';
							_tagThEncabezado+='<th name="thAlumAsigTasi" width="35">TASI</th>';
						_tagThEncabezado+='</tr>';
						w.$e.find('[name=theadEncabezado]').append(_tagThEncabezado);
						w.$e.find('[name=theadEncabezado]').find('[name=thPeriodoActual]').attr('colspan',Object.keys(filaAlum.lisAsis).length);
						
						for(var keyAsis in filaAlum.lisAsis)
						{
							var filaAsis = filaAlum.lisAsis[keyAsis];
							w.$e.find('[name=theadEncabezado]').find('[name=thAlumAsigPres]').before('<th name="thAlumAsigAsis_'+filaAsis.ast_kyast+'" width="35"><p>'+moment(filaAsis.ast_fing).format('DD')+'</p><p>'+Sisem.diaAbr[moment(filaAsis.ast_fing).day()]+'</p></th>');
						}
					}//if(iteAlum==1)
					var _tagTdValor='';
					_tagTdValor+='<tr name="trAlumAsig_'+filaAlum.usu_kyusu+'">';
						_tagTdValor+='<td name="tdAlumAsigItem_'+filaAlum.usu_kyusu+'" align="center">'+iteAlum+'</td>';
						_tagTdValor+='<td name="tdAlumAsigNomb_'+filaAlum.usu_kyusu+'" align="left">'+filaAlum.usu_nomb+'</td>';
						_tagTdValor+='<td name="tdAlumAsigPres_'+filaAlum.usu_kyusu+'" align="center">'+filaAlum.asg_pres+'</td>';
						_tagTdValor+='<td name="tdAlumAsigTard_'+filaAlum.usu_kyusu+'" align="center">'+filaAlum.asg_tard+'</td>';
						_tagTdValor+='<td name="tdAlumAsigFalt_'+filaAlum.usu_kyusu+'" align="center">'+filaAlum.asg_falt+'</td>';
						_tagTdValor+='<td name="tdAlumAsigFasi_'+filaAlum.usu_kyusu+'" align="center">'+filaAlum.asg_tasi+'</td>';
					_tagTdValor+='</tr>';
					w.$e.find('[name=tbodyValor]').append(_tagTdValor);
					w.$e.find('[name=tbodyValor]').find('[name=trAlumAsig_'+filaAlum.usu_kyusu+']').data('data', filaAlum);
					
					for(var keyAsis in filaAlum.lisAsis)
					{
						var filaAsis = filaAlum.lisAsis[keyAsis];
						w.$e.find('[name=tbodyValor]').find('[name=tdAlumAsigPres_'+filaAlum.usu_kyusu+']').before('<td name="tdAlumAsigAsis_'+filaAsis.ast_kyast+'" align="center" style="color: '+estado[filaAsis.ast_eing].color+'">'+estado[filaAsis.ast_eing].abrv+'</td>');
						w.$e.find('[name=tbodyValor]').find('[name=tdAlumAsigAsis_'+filaAsis.ast_kyast+']').data('data', filaAsis);
					}
				}
				
				var objData = {ancho_tabla: 0, total_columna: 0};
//				asit.imprimirAsistencia(w.$e.find('[name=tbodyValor]'), w.$e.find('[name=th_alu_nomb]'), listaEncabezado, objData, 'DERECHA', 'th');

//				w.$e.find('.table').css('width', objData.ancho_tabla);
//				w.$e.find('.table').find('[name=thProfesorAsignatura]').attr('colspan', objData.total_columna);
				
//				asit.imprimirAsistencia(w.$e.find('[name=tbodyValor]'), w.$e.find('[name=td_alu_nomb]'), listaValores, objData, 'DERECHA', 'td');				
			}//for(rpta.lisAsig in keyLis)
			
			brw_asit.configurarEventosAsistencia(w, p_comando);
			
			Sisem.msgBox('success','Se genero la lista de asistencia!!!');
			Sisem.unblockW(w.$e);
		});//Sisem.ejecutar('erp/GuardarCategoria',data, function(rpta){		
	},//generarListaAsistencia: function(w){
	configurarEventosAsistencia: function(w, p_comando){
		if(p_comando!='OBTENERASIGNATURAASISTENCIA')
		{
			w.$e.find('[name=tbodyValor]').find('[name^=btnAsistencia]').on('mousedown',function(e){
				e.stopPropagation();
				$(this).css('cursor', 'grabbing');
		    });
			w.$e.find('[name=tbodyValor]').find('[name^=btnAsistencia]').on('mouseup',function(e){
				e.stopPropagation();
		        $(this).css('cursor', 'grab');
		    });
			w.$e.find('[name=tbodyValor]').find('[name^=tdAlumAsigAsis]').click(function(e){
				var $tdAsis = $(this);
				var dataAlum = $tdAsis.closest('tr').data('data');
				var dataAsis = $tdAsis.data('data');
				if($tdAsis.children().length == 0 && ( p_comando=='OBTENERMATRASIT' || p_comando=='GENERARASISTENCIAALUMNO' ) )
				{
					$tdAsis.html('');

					$tdAsis.append('<input name="inpAsistencia_'+dataAsis.ast_kyast+'" type="text" class="form-control input-asistencia input-xs" style="text-align:center;">');
					$tdAsis.find('[name=inpAsistencia_'+dataAsis.ast_kyast+']').on("focus", function (){$(this).select();});
					$tdAsis.find('[name=inpAsistencia_'+dataAsis.ast_kyast+']').val(estado[dataAsis.ast_eing].abrv).focus();

					$tdAsis.find('[name=inpAsistencia_'+dataAsis.ast_kyast+']').blur(function(e){
						var valInpAsi = $tdAsis.find('[name=inpAsistencia_'+dataAsis.ast_kyast+']').val().toUpperCase();
						var valTxtAsi = '';

						if(estado[dataAsis.ast_eing].abrv != valInpAsi)
						{
							for(var iteEst in estado){
								if(valInpAsi == estado[iteEst].abrv){
									valTxtAsi = iteEst;
									break;
								}else if(valInpAsi==''){
									valTxtAsi = '0000';
									break;
								}
							}
							Sisem.ejecutar('asi/CtrlAsistencia',{comando: 'MODIFICARLISTA', ast_kyast: dataAsis.ast_kyast, ast_eing: valTxtAsi}, function(rpta){
								if(rpta.msg.type=='success')
								{
									$tdAsis.closest('tr').data('data').asg_pres = rpta.asg_pres;
									$tdAsis.closest('tr').data('data').asg_tard = rpta.asg_tard;
									$tdAsis.closest('tr').data('data').asg_falt = rpta.asg_falt;
									$tdAsis.closest('tr').data('data').asg_tasi = rpta.asg_tasi;
									
									dataAlum = $tdAsis.closest('tr').data('data');
									
									$tdAsis.closest('tr').find('[name=tdAlumAsigPres_'+dataAlum.usu_kyusu+']').html(dataAlum.asg_pres);
									$tdAsis.closest('tr').find('[name=tdAlumAsigTard_'+dataAlum.usu_kyusu+']').html(dataAlum.asg_tard);
									$tdAsis.closest('tr').find('[name=tdAlumAsigFalt_'+dataAlum.usu_kyusu+']').html(dataAlum.asg_falt);
									$tdAsis.closest('tr').find('[name=tdAlumAsigTasi_'+dataAlum.usu_kyusu+']').html(dataAlum.asg_tasi);
									
									$tdAsis.data('data').ast_eing = valTxtAsi;
									$(e.target).remove();
									$tdAsis.html(estado[$tdAsis.data('data').ast_eing].abrv).css('color', estado[$tdAsis.data('data').ast_eing].color);
									
									$tdAsis.css({
										'background-color': estado[$tdAsis.data('data').ast_eing].color,
										'color': '#FFFFFF'
									})
									setTimeout(function() { 
										$tdAsis.css({
											'background-color':'',
											'color' : estado[$tdAsis.data('data').ast_eing].color
										})
									}, 500);  
									
									var prefijo = ((valTxtAsi=='0001')?'Pres':((valTxtAsi=='0002')?'Tard':((valTxtAsi=='0003')?'Falt':'')));
									if(prefijo!='')
									{
										w.$e.find('[name=tbodyValor]').find('[name=tdAlumAsig'+prefijo+'_'+dataAlum.usu_kyusu+']').css({
											'background-color': estado[$tdAsis.data('data').ast_eing].color,
											'color': '#FFFFFF'
										})
										setTimeout(function() { 
											w.$e.find('[name=tbodyValor]').find('[name=tdAlumAsig'+prefijo+'_'+dataAlum.usu_kyusu+']').css({
												'background-color':'',
												'color' : estado[$tdAsis.data('data').ast_eing].color
											})
										}, 500);
									}
								}//if(rpta.msg.type=='success')
								
							});//Sisem.ejecutar('GuardarCategoria',data, function(rpta){
						}//if(dataAsis.ast_eing != $tdAsis.find('[name=inpAsistencia_'+dataAsis.ast_kyast+']').val())
						else
						{
							$(e.target).remove();
							$tdAsis.html(estado[$tdAsis.data('data').ast_eing].abrv);
						}
					});//$tdAsis.find('[name=inpAsistencia]').blur(function(e){
				}//if($tdAsis.children().length == 0 && ( p_comando=='OBTENERALUMNOEVALUACION' || p_comando=='OBTENERALUMNOEVALUACION' ) )
				else if( $tdAsis.children('button').length > 0)
				{
	    			asit.winPop({
	    				tipo: w.tipo,
	    				ky: dataAsis.ast_kyast,
	    				ast: {ast_kyast: dataAsis.ast_kyast, ast_turn: dataAsis.ast_turn, ast_fing: dataAsis.ast_fing, ast_eing: dataAsis.ast_eing},
						modo:'VISUALIZAR',
	    				callback:function(){
	    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
	    				}
	    			});
				}
			});
			
			var idGlobalGrid = 'cm_GlobalGrid';
		/*	
			w.$e.find('[name=tbodyValor]').find('[name^=tdAlumAsig_]').contextMenu({
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
		*/
		}//if(p_comando!='OBTENERASIGNATURAASISTENCIA')		
	}//configurarEventosAsistencia: function(w, p_comando){
};//var brw_doc = {