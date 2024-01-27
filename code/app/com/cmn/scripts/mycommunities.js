define(function() {
	myCommunities = {
		cu_type:{
			CRE:'Creador',
			ADM:'Administrador',
			INT:'Integrante'
		},
		init:function(w){
			if(w==null)w={};		
			Sisem.Cargar({
				container: '#mainPanel',
				url:'cmn/home/grid',
				beforeLoad:function(){
				},
				afterLoad:function(data){
					$main = $('#content');		
					var $grid = new Sisem.grid({
						id:'idGridAlma',
						$el: $('[name=grid]'),
						cols: [
							{descr:'',width:30},
						    {descr:'NOMBRE',width:230},
						    {descr:'DESCRIPCION',width:200}
						],
						onLoading: function(){
							$('[name=grid]').block({
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
							$('[name=grid]').unblock();
						},
						data: 'cmn/user/my_communities',
						params: {},
						itemdescr: 'comunidad(es)',
						//toolbarURL: '',
						toolbarHTML: '<button name="btnAdd" class="btn btn-success">Nueva Comunidad</button>',
						onContentLoaded: function($el){
							$el.find('[name=btnAdd]').click(function(){
								myCommunities.New();
							});
						},
						//inObject : 'grid',
						pagination:false,
						search:false,
						load: function(data,$tbody){
							if(data!=null){
								for(var i=0;i<data.length;i++){
									var $row = $('<tr />');
									$row.append('<td><button class="btn btn-default btn-sm"><i class="fa fa-cogs"></i></button></td>');
									$row.append('<td>'+data[i].com_nomb+'</td>');
									$row.append('<td>'+data[i].com_dscr+'</td>');
									$row.data('data',data[i]);
									$row.find('button').click(function(){
										myCommunities.Edit({id:$row.data('data').id_comm});
									});
									$tbody.append($row);
								}
							}
							return $tbody;
						}
					});					
				}
			});
		},
		New:function(w){
			if(w==null)w=new Object;
			w.save = function(){
				var data = {
					com_nomb: w.$e.find('[name=com_nomb]').val(),
					p_link_profile: w.$e.find('[name=p_link_profile]').val(),
					p_alias: w.$e.find('[name=p_alias]').val(),
					p_biography: w.$e.find('[name=p_biography]').val()
				};
				if(data.com_nomb==''){
					$.smallBox({
						title: "Informaci&oacute;n requerida",
						content: "Debe poner un nombre a la comunidad",
						color: "#5384AF",
						iconSmall: "fa fa-check bounce animated",
						timeout: 4000
				    });
				    w.$e.find('.wizard').wizard('selectedItem', {
						step: 1
					});
					return w.$e.find('[name=com_nomb]').focus();
				}
				if(data.p_link_profile==''){
					$.smallBox({
						title: "Informaci&oacute;n requerida",
						content: "Debe poner un enlace para su perfil",
						color: "#5384AF",
						iconSmall: "fa fa-check bounce animated",
						timeout: 4000
				    });
				    w.$e.find('.wizard').wizard('selectedItem', {
						step: 2
					});
					return w.$e.find('[name=p_link_profile]').focus();
				}else{
					if(!w.$e.find('[name=p_link_profile]').data('_success')){
						$.smallBox({
							title: "Informaci&oacute;n requerida",
							content: "El enlace de perfil no esta disponible, elija otro",
							color: "#5384AF",
							iconSmall: "fa fa-check bounce animated",
							timeout: 4000
					    });
					    w.$e.find('.wizard').wizard('selectedItem', {
							step: 2
						});
						return w.$e.find('[name=p_link_profile]').focus();
					}
				}
				if(data.p_alias==''){
					$.smallBox({
						title: "Informaci&oacute;n requerida",
						content: "Debe poner un alias para su perfil",
						color: "#5384AF",
						iconSmall: "fa fa-check bounce animated",
						timeout: 4000
				    });
				    w.$e.find('.wizard').wizard('selectedItem', {
						step: 2
					});
					return w.$e.find('[name=p_alias]').focus();
				}
				$.post('cmn/comm/save',data,function(rpta){
					$.smallBox({title : "Respuesta SISPROM",content : rpta.msg,color : rpta.color,timeout: 3000,icon : "fa fa-bell"});
					w.$e.dialog('close');
					myCommunities.init();
				},'json');
			};
			Sisem.Window({
				id:'windowCommNew',
				title:'<div class="widget-header"><h4><i class="fa fa-plus"></i> Nueva Comunidad</h4></div>',
				width:750,
				height:500,
				url:'cmn/comm/edit',
				modal:true,
				buttons : [
					{html : "<i class='fa fa-times'></i>&nbsp; Cerrar",
						"class" : "btn btn-default",
						click : function() {
							$(this).dialog("close");
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#windowCommNew');
					var wizard = w.$e.find('.wizard').wizard();
					wizard.on('finished', function (e, data) {
						w.save();
					    /*$.smallBox({
							title: "Congratulations! Your form was submitted",
							content: "<i class='fa fa-clock-o'></i> <i>1 seconds ago...</i>",
							color: "#5F895F",
							iconSmall: "fa fa-check bounce animated",
							timeout: 4000
					    });*/
					});
					w.$e.find('[name=com_nomb]').blur(function(){
					    var keyword = $(this).val().replace(/[^A-Za-z0-9 ]/g,'');
					    keyword = keyword.replace(/\s{2,}/g,' ');
					    keyword = keyword.replace(/\s/g, "_");
						w.$e.find('[name=p_link_profile]').val(keyword.toLowerCase()).blur();
						w.$e.find('[name=p_alias]').val($(this).val());
					});
					w.$e.find('[name=p_link_profile]').data('_success',false);
					w.$e.find('[name=p_link_profile]').blur(function(){
						$.post('cmn/comm/verify_profile_link',{_t:$(this).val()},function(data){
							if(data.code==0){
								w.$e.find('[name=p_link_profile]').data('_success',true);
								w.$e.find('[name=p_link_profile]').closest('.form-group').addClass('has-success');
							}else{
								w.$e.find('[name=p_link_profile]').data('_success',false);
								w.$e.find('[name=p_link_profile]').closest('.form-group').addClass('has-error');
							}
						},'json');
					});
				}
			});
		},
		Edit:function(w){
			if(w==null)w=new Object;
			Sisem.Window({
				id:'windowCommEdit'+w.id,
				title:'<div class="widget-header"><h4><i class="fa fa-plus"></i> Modificar Comunidad</h4></div>',
				width:400,
				height:400,
				url:'cmn/comm/edit',
				modal:true,
				buttons : [
					{html : "<i class='fa fa-check'></i>&nbsp; Guardar",
						"class" : "btn btn-primary",
						click : function() {
							var data = {
								id_comm:w.id,
								nomb: w.$e.find('[name=name]').val(),
								dscr: w.$e.find('[name=description]').val()
							};
							Sisem.blockW(w.$e);
							$.post('cmn/comm/update',data,function(rpta){
								$.smallBox({title : "Respuesta SISPROM",content : rpta.msg,color : rpta.color,timeout: 3000,icon : "fa fa-bell"});
								w.$e.dialog('close');
								myCommunities.init();
							},'json');
						}
					},
					{html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
						"class" : "btn btn-default",
						click : function() {
							$(this).dialog("close");
						}
					}
				],
				afterLoad:function(){
					w.$e = $('#windowCommEdit'+w.id);
					Sisem.blockW(w.$e);
					$.get('cmn/comm/get',{id:w.id},function(data){
						w.$e.find('[name=name]').val(data.name);
						w.$e.find('[name=description]').val(data.description);
						Sisem.unblockW(w.$e);
					},'json');
				}
			});
		}
	};
	return(myCommunities);
});
