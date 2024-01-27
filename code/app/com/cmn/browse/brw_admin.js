var brw_admin = {
	ejecutar: function(w)
	{
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect: ((w.multiSelect)?w.multiSelect:false),
			id:w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: [
		        {name: 'USUARIO', descr:'CODIGO',width:250, search: 'false'},
		        {name: 'EMAIL', descr:'DOCUMENTO',width:200, search: 'false'}
			],
			onLoading: function(){
				w.$e.find('[name=grid]').block({
					css:{
						border: 'none', 
				        padding: '15px', 
				        backgroundColor: '#000', 
				        '-webkit-border-radius': '10px', 
				        '-moz-border-radius': '10px', 
				        opacity: .5, 
				        color: '#fff'
					},
					message:'Espere..'
				});
			},
			onComplete: function(){
				w.$e.find('[name=grid]').unblock();
			},
			data: base_url+'cmn/control/ejecutar',
			params: {archivo: w.archivo, tipo:w.tipo, orderColumn: 'usu_nomb', orderType: 'asc'},
			itemdescr: myapps.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? '' : ''),
			onContentLoaded: function($el){
				w.$e.find('[name=cau_kycaus]').val(USERDATA.id_caus);
				w.$e.find('[name=cau_kycom]').val(USERDATA.kycom);
				
				$.post('cmn/grup/getLista',{id_comapp:w.kycom},function(rpta){
					w.$e.find('[name=gru_nombre]').empty();
					for(var i=0;i<rpta.items.length;i++){
						w.$e.find('[name=gru_nombre]').append('<option value="'+rpta.items[i].id_grupo+'">'+rpta.items[i].nombre+'</option>');
					}
				},'json');
				w.$e.find('[name=btnGuardar]').click(function(){
					var data = myapps.obtenerDatoFormulario(w);
					$.post('cmn/app/save_communitypol_users',data,function(rpta){
						$.smallBox({title : "Respuesta SISPROM",content : rpta.msg,color : rpta.color,timeout: 3000,icon : "fa fa-bell"});
						if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
					},'json');
				});
				usua.usuarioAutocomplete(w);
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null)
				{
					for(var i=0;i<rpta.items.length;i++)
					{
						var $ite = rpta.items[i];
						var $row = $('<tr class="item" />');
						if(w.showMenCtx){$row.append('<td></td>');}

						$row.append('<td>'+$ite.usu_nomb+'</td>');
						$row.append('<td>'+$ite.usu_mail+'</td>');
						$row.data('data',$ite);
						$row.click(function(){
							var _data = $row.data('data');
							w.$e.find('[name=usu_nomb]').val($ite.usu_nomb+" ("+$ite.usu_mail+")").data('id',$ite.usu_kyusu);
							w.$e.find('[name=usu_nomb]').closest('.form-group').removeClass('has-error').addClass('has-success');
							w.$e.find('[name=usu_nomb]').attr('disabled','disabled');
							//w.$e.find('[name=tipo] option').removeAttr('selected');
							w.$e.find('[name=tipo]').val($ite.cau_tipo);
							//w.$e.find('[name=tipo]').change();
							w.$e.find('[name=accion]').html('Modificando');
							w.$e.find('[name=accion]').data('id',$ite.cau_kycaus);
						});
						
						if( w.showMenCtx ){
							$row.contextMenu({
								buttonHelper: true,
							    menuSelector: "#"+w.idMenCtx,
							    onShow:function($el, invokedOn){
							    	$el.css('z-index','1100');
							    	var $row = invokedOn.closest('tr');
							    	$el.find('#'+w.idMenCtx+'_deta').hide();
							    	$el.find('#'+w.idMenCtx+'_edit').hide();
//									    	$el.find('#'+w.idMenCtx+'_vpad').hide();
//									    	$el.find('#'+w.idMenCtx+'_vhij').hide();
							    	$el.find('#'+w.idMenCtx+'_adap').hide();
							    	$el.find('#'+w.idMenCtx+'_adan').hide();
							    	$el.find('#'+w.idMenCtx+'_apro').hide();
							    	$el.find('#'+w.idMenCtx+'_anul').hide();
//									    	$el.find('#'+w.idMenCtx+'_dele').hide();
							    	$el.find('#'+w.idMenCtx+'_stck').hide();
//									    	$el.find('#'+w.idMenCtx+'_prin').hide();
							    	
							    	if(USERDATA.prf.prf_nomb=='ADMINISTRADOR'){$el.find('#'+w.idMenCtx+'_adap').show();}
							    	if(USERDATA.prf.prf_nomb=='ADMINISTRADOR'){$el.find('#'+w.idMenCtx+'_adan').show();}
							    	
							    	if($row.data('data').esta=='0002'){// PENDIENTE
							    		$el.find('#'+w.idMenCtx+'_apro').show();
							    	}else if( $row.data('data').esta=='0001' ){ //&& !( $row.data('data').tope=='0003' || $row.data('data').tope=='0007' || $row.data('data').tope=='0008' ) ){// APROBADO
							    		$el.find('#'+w.idMenCtx+'_deta').show();
							    		$el.find('#'+w.idMenCtx+'_anul').show();
							    		$el.find('#'+w.idMenCtx+'_dele').show();
							    	}else if($row.data('data').esta=='0003'){// ANULADO
							    		$el.find('#'+w.idMenCtx+'_apro').show();
							    	}
							    },
							    menuSelected: function (invokedOn, selectedMenu) {
							    	var $id = selectedMenu.attr('id');
							    	var $row = invokedOn.closest('tr');
							    	switch($id){
							    		case w.idMenCtx+"_deta":
							    			docu.winPop({
							    				id:$row.data('data').id_docu,
							    				modo:'VISUALIZAR',
							    				suc:{
							    					id_sucu:$('[name=main_kysuc] :selected').val(),
							    					nomb:$('[name=main_kysuc] :selected').text()
							    				},
							    				tope:w.tope,
							    				ctrl:w.ctrl,
							    				callback:function(){
							    					if(w.idGrid){$('#'+w.idGrid).trigger('reloadGrid');}
							    				}
								    			});					    				
							    			break;
							    	}//switch($id){
							    }//menuSelected: function (invokedOn, selectedMenu) {
							});//$row.contextMenu({
						}//if( w.showMenCtx ){								
						$tbody.append($row);							
					}//for(var i=0;i<rpta.items.length;i++){
				}//if(rpta.items!=null){
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_admin = {