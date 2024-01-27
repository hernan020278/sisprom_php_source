var brw_cme = {
	ejecutar: function(w)
	{
		brw_cme.cargarComentario(w);
		w.$e.find('[name=btnAgregarComentario]').click(function(){
			come.btnAddClick(w);
		});
		$(window).scroll(function(){
			if ($(window).scrollTop() == $(document).height() - $(window).height()){
				brw_cme.cargarComentario(w);
			}
		});
	},//ejecutar: function(w)
	cargarComentario: function(w)
	{
		var dataCme = w.cme;
		var $divComentario = w.$e.find('[name="divComentario"]');
		dataCme.paging.page++;
		Sisem.ejecutar('brw_cme',{cme_kypdr:dataCme.cme_kypdr, page: dataCme.paging.page, pagerows: dataCme.paging.pagerows}, function(rpta){
			for(keya in rpta.items)
			{
				if(typeof rpta.items[keya].cme_kycme != 'undefined')
				{
					$divComentario.append(brw_cme.getHtmlComent(rpta.items[keya]));
					w.$e.find('[name=ulContenedorComentario'+rpta.items[keya].cme_kycme+']').data('data',rpta.items[keya]);
					w.$e.find('[name="liInputComentario'+rpta.items[keya].cme_kycme+'"]').find('[name=usu_nomb],[name=cme_dscr]').on('keypress',function(event){
					    var charCode = (event.which) ? event.which : event.keyCode;
					    var source = event.target;
					    var valor = source.value;					    
					    if (charCode==13) {
					    	if(Sisem.validarControlesColor($(this).closest('li'), 'cme','VALIDAR'))
					    	{
								var dataSubCme = {
									comando: 'AGREGAR',
									cme_kycme: 0,
									cme_kypdr: $(this).closest('li').find('[name=cme_kycme]').val(),
									cme_kyusu: $(this).closest('li').find('[name=cme_kyusu]').val(),
									cme_freg: Sisem.fechor(),
									usu_nomb: $(this).closest('li').find('[name=usu_nomb]').val(),
									usu_esta: '0001',
									cme_dscr: $(this).closest('li').find('[name=cme_dscr]').val(),
									cme_nive: 2,
									cme_esta: '0001',
									pagerows: 5
								};
								var $thisContenedorComentario = $(this).closest('[name^=ulContenedorComentario]');
						    	Sisem.ejecutar('CtrlComentario',dataSubCme, function(rpta){
						    		$thisContenedorComentario.data('data').paging.rowcount = rpta.rowcount;
						    		w.dataSubCme = rpta.cme;
						    		brw_cme.agregarSubcomentario(w, $thisContenedorComentario);
						    	});
					    	}//if(Sisem.validarControles($(this).closest('li'),'cme'))
					    }//if (charCode==13) {
					});
					
					w.$e.find('[name="aShowComent'+rpta.items[keya].cme_kycme+'"]').on('click', function(){
						$thisContenedorComentario = $(this).closest('[name^=ulContenedorComentario]');
						brw_cme.cargarSubcomentario(w, $thisContenedorComentario);
					});
					w.$e.find('[name="aHideComent'+rpta.items[keya].cme_kycme+'"]').on('click', function(){
						var dataCme = $(this).closest('[name^=ulContenedorComentario]').data('data');
						var $aHideComent = $(this);
						Sisem.ejecutar('brw_cme',{cme_kypdr: dataCme.cme_kycme}, function(rpta){
							dataCme.paging.page = 0;
							$aHideComent.closest('[name^=ulContenedorComentario]').find('[name=liMsgReply]').remove();
							w.$e.find('[name="aShowComent'+dataCme.cme_kycme+'"]').html('Mostrar ('+rpta.items.length+')');
						});//Sisem.ejecutar('brw_cme',{cme_kypdr:dataCme.cme_kycme, page:dataCme.page, pagerows:dataCme.pagerows}, function(rpta){
					});//w.$e.find('[name="aHideComent'+rpta.items[keya].cme_kycme+'"]').data('data',rpta.items[keya]).on('click', function(){
					w.$e.find('[name="aDeleteComent'+rpta.items[keya].cme_kycme+'"]').on('click', function(){
						var $thisPanelComentario = $(this).closest('[name=divPanelComentario]');
						var $thisContenedorComentario = $(this).closest('[name^=ulContenedorComentario]');
						var dataCme = $thisContenedorComentario.data('data');
						var $aDeleteComent = $(this);
						
		    			var lisKySel = [];
		    			if(lisKySel.length==0){lisKySel.push(dataCme);}
		    			var resp = Sisem.msgAsk('Desea eliminar', 'Comentario '+dataCme.cme_kycme, function(rpta){
			    			if(rpta=='Si'){
								var data = {comando: 'ELIMINAR', lisKy: lisKySel};
								Sisem.ejecutar('CtrlComentario',data, function(rpta){
									if(rpta.msg.type=='success')
									{
										Sisem.msgBox(rpta.msg.type, rpta.msg.text);
										$thisPanelComentario.remove();
									}//if(rpta.msg.type=='success')
								});//Sisem.ejecutar('CtrlPropiedad',data, function(rpta){
			    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
		    			});//var resp = Sisem.msgAsk('Desea eliminar', 'Subcomentario '+dataSubCme.cme_kycme, function(rpta){
					});//w.$e.find('[name="aDeleteComent'+rpta.items[keya].cme_kycme+'"]').on('click', function(){
				}//if(jQuery.isEmptyObject(rpta.items[keya].cme_kycme))
			}//for(keya in rpta.items)
		});//Sisem.ejecutar('cmn/',{}, function(rpta){
	},//cargarComentario: function(w)
	agregarSubcomentario: function(w, $thisContenedorComentario)
	{
		dataCme = $thisContenedorComentario.data('data');
		var $thisShowComent = $thisContenedorComentario.find('[name^=aShowComent]');
		var $thisAllComent = $thisContenedorComentario.find('[name^=aAllComent]');

		var dataSubCme = w.dataSubCme;
		var $liLabelComentario = $thisContenedorComentario.find('[name^=liLabelComentario]');
		
		$thisAllComent.html('Todos ('+dataCme.paging.rowcount+')');
		$liLabelComentario.after(brw_cme.getHtmlSubcoment(dataSubCme));

		$thisContenedorComentario.find('[name=usu_nomb],[name=cme_dscr]').val('');		
		$thisContenedorComentario.find('[name=aDeleteSubcoment'+dataSubCme.cme_kycme+']').data('data', dataSubCme).on('click', function(){
			var $aDeleteSubcoment = $(this);
			var lisKySel = [];
			if(lisKySel.length==0){lisKySel.push({cme_kycme: dataSubCme.cme_kycme, cme_kypdr: dataSubCme.cme_kypdr});}
			var resp = Sisem.msgAsk('Desea eliminar', 'Subcomentario '+dataSubCme.cme_kycme, function(rpta){
    			if(rpta=='Si'){
					var data = {comando: 'ELIMINAR', lisKy: lisKySel};
					Sisem.ejecutar('CtrlComentario',data, function(rpta){
						if(rpta.msg.type=='success')
						{
							if(rpta.msg.type=='success')
							{
								dataCme.paging.rowcount = dataCme.paging.rowcount - 1;
								dataCme.paging.pagecount = Math.ceil(dataCme.paging.rowcount/dataCme.paging.pagerows);
								var resto = dataCme.paging.rowcount - (dataCme.paging.page * dataCme.paging.pagerows);
								dataCme.paging.rowresto = ( (resto > 0) ? resto : 0 );

								$thisAllComent.html('All ('+dataCme.paging.rowcount+')');
								$thisShowComent.html('Mostrar ('+dataCme.paging.rowresto+')');
								
								Sisem.msgBox(rpta.msg.type, rpta.msg.text);
								$aDeleteSubcoment.closest('[name=liMsgReply]').remove();
							}//if(rpta.msg.type=='success')
						}//if(rpta.msg.type=='success')
					});//Sisem.ejecutar('CtrlPropiedad',data, function(rpta){
    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
			});							
		});//w.$e.find('[name="aHideComent'+rpta.items[keya].cme_kycme+'"]').data('data',rpta.items[keya]).on('click', function(){
	},//cargarComentario: function(w)
	cargarSubcomentario: function(w, $thisContenedorComentario)
	{
		var dataCme = $thisContenedorComentario.data('data');
		var $thisShowComent = $thisContenedorComentario.find('[name^=aShowComent]');
		var $thisAllComent = $thisContenedorComentario.find('[name^=aAllComent]');

		if(dataCme.paging.page==0){$thisContenedorComentario.find('[name=liMsgReply]').remove();}
		
		if (dataCme.paging.page < dataCme.paging.pagecount)
		{
			dataCme.paging.page++;
			var $liLabelComentario = w.$e.find('[name="liLabelComentario'+dataCme.cme_kycme+'"]');
			Sisem.ejecutar('brw_cme',{cme_kypdr:dataCme.cme_kycme, page: dataCme.paging.page, pagerows: dataCme.paging.pagerows}, function(rpta){
				for(keya in rpta.items)
				{
					var dataSubCme = rpta.items[keya];
					if(typeof dataSubCme.cme_kycme != 'undefined')
					{
						dataCme.paging.rowcount = rpta.paging.rowcount;						
						dataCme.paging.pagecount = rpta.paging.pagecount;
						var resto = dataCme.paging.rowcount - (dataCme.paging.page * dataCme.paging.pagerows);
						dataCme.paging.rowresto = ( (resto > 0) ? resto : 0 );

						$thisShowComent.html('Mostrar ('+dataCme.paging.rowresto+')');
						$liLabelComentario.after(brw_cme.getHtmlSubcoment(dataSubCme));
						
						$thisContenedorComentario.find('[name=aDeleteSubcoment'+dataSubCme.cme_kycme+']').data('data', dataSubCme).on('click', function(){
							var dataSubCme = $(this).data('data');
							var $aDeleteSubcoment = $(this);
							
			    			var lisKySel = [];
			    			if(lisKySel.length==0){lisKySel.push(dataSubCme);}
			    			var resp = Sisem.msgAsk('Desea eliminar', 'Subcomentario '+dataSubCme.cme_kycme, function(rpta){
				    			if(rpta=='Si'){
									var data = {comando: 'ELIMINAR', lisKy: lisKySel};
									Sisem.ejecutar('CtrlComentario',data, function(rpta){
										if(rpta.msg.type=='success')
										{
											dataCme.paging.rowcount = dataCme.paging.rowcount - 1;
											dataCme.paging.pagecount = Math.ceil(dataCme.paging.rowcount/dataCme.paging.pagerows);
											var resto = dataCme.paging.rowcount - (dataCme.paging.page * dataCme.paging.pagerows);
											dataCme.paging.rowresto = ( (resto > 0) ? resto : 0 );
											
											$thisAllComent.html('All ('+dataCme.paging.rowcount+')');
											$thisShowComent.html('Mostrar ('+dataCme.paging.rowresto+')');
											
											Sisem.msgBox(rpta.msg.type, rpta.msg.text);
											$aDeleteSubcoment.closest('[name=liMsgReply]').remove();
										}//if(rpta.msg.type=='success')
									});//Sisem.ejecutar('CtrlPropiedad',data, function(rpta){
				    			}//if(Sisem.msgAsk('Desea eliminar', $row.data('data').nomb)){
			    			});							
						});//w.$e.find('[name="aHideComent'+rpta.items[keya].cme_kycme+'"]').data('data',rpta.items[keya]).on('click', function(){
					}//if(jQuery.isEmptyObject(rpta.items[keya].cme_kycme))
				}//for(keya in rpta.items)
			});//Sisem.ejecutar('cmn/',{}, function(rpta){
		}//if (dataCme.page < dataCme.pagecount)
	},//cargarComentario: function(w)
	getHtmlComent: function(data)
	{
		var _divCme = '';
//		_divCme+='<span class="timeline-seperator text-center"> <span>'+moment(data.cme_freg).format('hh:mm A DD MMMM YYYY')+'</span>';
		_divCme+='<div class="chat-body no-padding profile-message" name="divPanelComentario">';
			_divCme+='<div class="btn-group pull-right">';
				_divCme+='<a href="javascript:void(0);" data-toggle="dropdown" class="btn btn-default btn-xs dropdown-toggle"><span class="caret single"></span></a>';
				_divCme+='<ul class="dropdown-menu text-left">';
					_divCme+='<li><a href="javascript:void(0);">Item menu oculto 1</a></li>';
					_divCme+='<li><a href="javascript:void(0);">Item menu oculto 2</a></li>';
					_divCme+='<li><a href="javascript:void(0);">Item menu oculto 3</a></li>';
				_divCme+='</ul>';
			_divCme+='</div>';
			_divCme+='<ul name="ulContenedorComentario'+data.cme_kycme+'">';
				_divCme+='<li class="message" name="liLabelComentario'+data.cme_kycme+'"><img class="ui-avatar" src="img/avatars/male.png" class="online">';
					_divCme+='<span class="message-text"><a href="javascript:void(0);" class="username">'+data.usu_nomb+'&nbsp;<small class="text-muted pull-right ultra-light"> 2 Minutes ago </small></a>'+data.cme_dscr+'</span>';
					_divCme+='<ul class="list-inline font-xs">';
						_divCme+='<li><a href="javascript:void(0);" class="text-danger"><i class="fa fa-thumbs-up"></i> Me Gusta</a></li>';
						_divCme+='<li><a href="javascript:void(0);" class="text-muted" name="aAllComent'+data.cme_kycme+'">Todos ('+data.paging.rowcount+')</a></li>';
						_divCme+='<li><a href="javascript:void(0);" class="text-muted" name="aShowComent'+data.cme_kycme+'">Mostrar ('+data.paging.rowresto+')</a></li>';
						_divCme+='<li><a href="javascript:void(0);" class="text-muted" name="aHideComent'+data.cme_kycme+'">Ocultar </a></li>';
						_divCme+='<li><a href="javascript:void(0);" class="text-danger" name="aDeleteComent'+data.cme_kycme+'">Borrar</a></li>';
					_divCme+='</ul>';
				_divCme+='</li>';
				_divCme+='<li class="message message-reply" name="liInputComentario'+data.cme_kycme+'">';
					
					_divCme+='<div style="width: 10%; float:left;"><img name="imgSubcomentario" class="ui-avatar" src="img/avatars/hombre_escribiendo.png" class="online"></div>';
					_divCme+='<input name="cme_kycme" type="hidden" value="'+data.cme_kycme+'">';
					_divCme+='<input name="cme_kyusu" type="hidden" value="'+data.cme_kyusu+'">';
					_divCme+='<input name="usu_nomb" title="cme" class="form-control input-comentario" style="width:20%; float:left; margin-left:40px; margin-right:2px" placeholder="Nombre" type="text">';
					_divCme+='<input name="cme_dscr" title="cme" class="form-control input-comentario" style="width:73%; float:left" placeholder="Comentario" type="text"></div>';
						
				_divCme+='</li>';
			_divCme+='</ul>';
		_divCme+='</div>';
		return _divCme;
	},//getHtmlComent: function(w)
	getHtmlSubcoment: function(data)
	{
		var _divSme = '';
		_divSme+='<li class="message message-reply" name="liMsgReply"><img  class="ui-avatar" src="img/avatars/hombre_hablando.png" class="online">';
			_divSme+='<span class="message-text"><a href="javascript:void(0);" class="mail">'+data.usu_nomb+'</a> '+data.cme_dscr+'</span>';	
			_divSme+='<ul class="list-inline font-xs-sub">';
				_divSme+='<li>1 minute ago</li>';
				_divSme+='<li><a href="javascript:void(0);" class="text-danger" name="aDeleteSubcoment'+data.cme_kycme+'">Borrar</a></li>';
			_divSme+='</ul>';
		_divSme+='</li>';
		return _divSme;
	}//getHtmlComent: function(w)
}//var brw_cme = {