<!-- MAIN PANEL -->
<div id="main" role="main" >
	<!-- MAIN CONTENT -->
	<div id="content">
		<div class="row">
			<div class="col-sm-12">
				<div style="width:100%;height:300px;background-color:#296191;overflow:hidden;">
					<img style="width:100%;" src="<?php echo $userdata['app']['pol_imax']?>">
					<div class="air air-bottom-right padding-10" style="right:15px;">
 					<a class="btn txt-color-white bg-color-pinkDark btn-sm" href="cmn/applications/connect/<?php echo $userdata['app']['pol_kypol']?>"><i class="fa fa-link"></i> Conectar</a>
					</div>
				</div>
			</div>

			<div class="col-sm-12">

				<div class="row">

					<div class="col-sm-3 profile-pic">
						<img src="<?php echo $userdata['app']['pol_imin']?>">
						<!-- <div class="padding-10">
							<h4 class="font-md"><strong>1,543</strong>
							<br>
							<small>Followers</small></h4>
							<br>
							<h4 class="font-md"><strong>419</strong>
							<br>
							<small>Connections</small></h4>
						</div>-->
					</div>
					<div class="col-sm-6">
						<h1><span class="semi-bold"><?php echo $userdata['app']['pol_dscr']?></span>
						<br>
						<small><?php echo $userdata['app']['pol_dscr']?></small></h1>

						<ul class="list-unstyled">
							<li>
								<p class="text-muted">
									<i class="fa fa-phone"></i>&nbsp;&nbsp;(<span class="txt-color-darken">+51 +54</span>) <span class="txt-color-darken">349600</span></span>
								</p>
							</li>
							<li>
								<p class="text-muted">
									<i class="fa fa-envelope"></i>&nbsp;&nbsp;<a href="mailto:gstion@sisprom.com">gstion@sisprom.com</a>
								</p>
							</li>
							<li>
								<p class="text-muted">
									<i class="fa fa-skype"></i>&nbsp;&nbsp;<span class="txt-color-darken">Sisprom Labs.</span>
								</p>
							</li>
							<li>
								<p class="text-muted">
									<i class="fa fa-calendar"></i>&nbsp;&nbsp;<span class="txt-color-darken">Libre <a data-original-title="Create an Appointment" data-placement="top" title="" rel="tooltip" href="javascript:void(0);">24 Horas</a></span>
								</p>
							</li>
						</ul>
						<br>
						<p class="font-md">
							<i>Acerca de...</i>
						</p>
						<?php echo $userdata['app']['pol_html']?>
						<br>
						<!-- <a class="btn btn-default btn-xs" href="javascript:void(0);"><i class="fa fa-envelope-o"></i> Send Message</a>-->
						<br>
						<br>

					</div>
					<div class="col-sm-3">
						<h1><small>Connections</small></h1>
						<ul class="list-inline friends-list">
							<li><img alt="friend-1" src="img/avatars/sunny.png">
							</li>
							<li><img alt="friend-2" src="img/avatars/sunny.png">
							</li>
							<li><img alt="friend-3" src="img/avatars/sunny.png">
							</li>
							<li><img alt="friend-4" src="img/avatars/sunny.png">
							</li>
							<li><img alt="friend-5" src="img/avatars/sunny.png">
							</li>
							<li><img alt="friend-6" src="img/avatars/male.png">
							</li>
							<li>
								<a href="javascript:void(0);">413 more</a>
							</li>
						</ul>

						<h1><small>Recent visitors</small></h1>
						<ul class="list-inline friends-list">
							<li><img alt="friend-1" src="img/avatars/male.png">
							</li>
							<li><img alt="friend-2" src="img/avatars/female.png">
							</li>
							<li><img alt="friend-3" src="img/avatars/female.png">
							</li>
						</ul>

					</div>

				</div>

			</div>

		</div>
	</div>
	<!-- END MAIN CONTENT -->
</div>
<script>
Connect = {
	Do:function(w){
		alert('uno');
		if(w==null)w={};
		Sisem.Window({
			id:'windowConnectDo',
			title:'<div class="widget-header"><h4><i class="fa fa-warning"></i> Conectar a Aplicaci&oacute;n</h4></div>',
			width:520,
			height:450,
			url:'gstion/corp/alma/edit',
			modal:true,
			buttons : [
				{html : "<i class='fa fa-check'></i>&nbsp; Guardar",
					"class" : "btn btn-success",
					click : function() {
						var data = {
							pol_nomb: w.$e.find('[name=nomb]').val(),
							pol_dscr: w.$e.find('[name=descr]').val(),
							id_local: w.$e.find('[name=local] :selected').val()
						};
						Sisem.blockW(w.$e);
						$.post('gstion/corp/alma/save',data,function(rpta){
							$.smallBox({title : "Respuesta SISPROM",content : rpta.msg,color : rpta.color,timeout: 3000,icon : "fa fa-bell"});
							w.$e.dialog('close');
							corpAlma.init();
						},'json');
					}
				},
				{html : "<i class='fa fa-times'></i>&nbsp; Cancelar",
					"class" : "btn btn-danger",
					click : function() {
						$(this).dialog("close");
					}
				}
			],
			afterLoad:function(){
				w.$e = $('#windowConnectDo');
				Sisem.blockW(w.$e);
				$.get('gstion/corp/loca/all',{id:w.id},function(data){
					if(data!=null){
						for(var i=0;i<data.length;i++){
							w.$e.find('[name=local]').append('<option value="'+data[i].id_local+'">'+data[i].nomb+'</option>');
						}
					}
					Sisem.unblockW(w.$e);
				},'json');
			}
		});
	}
};
</script>