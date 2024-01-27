var brw_cita = {
	ejecutar: function(w)
	{
		var _toolBarHtml = '';
		var colsTmp = ((w.showMenCtx) ? [{descr:'ACC',width:30}]: []);		
		if(w.idMenCtx==null){w.idMenCtx='cm_GlobalGrid';}
		var $grid = new Sisem.grid({
			multiSelect:((typeof w.multiSelect!="undefined")?w.multiSelect:false),
			search:((typeof w.search!="undefined")?w.search:false),
			refreshButton:((typeof w.refreshButton!="undefined")?w.refreshButton:true),
			autoWidth:((typeof w.autoWidth!="undefined")?w.autoWidth:false),
			id: w.idGrid,
			$el: w.$e.find('[name=grid]'),
			cols: colsTmp.concat([
		        {name: '', descr:'Descripcion',width:250, search: 'false'},
			    {name: '', descr:'Anterior',width:450, search: 'false'},
			    {name: '', descr:'Costos',width:450, search: 'false'},
			    {name: '', descr:'Ingresos',width:450, search: 'false'},
			    {name: '', descr:'Egresos',width:450, search: 'false'},
		        {name: '', descr:'Utilidad',width:450, search: 'false'}
			]),
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
				cita.generarCalendario(w);
			},
			onComplete: function(){
				w.$e.find('[name=grid]').unblock();
			},
			data: base_url+'cmn/control/ejecutar',
			params: {
			    archivo: w.archivo,
				doc_kyusu: ((w.doc && w.doc.doc_kyusu) ? w.doc_kyusu : ''),
				doc_kyusu: ((w.pac && w.pac.pac_kyusu) ? w.pac_kyusu : ''),
				cit_fini:  ((w.cit && w.cit.cit_fini) ? w.cit.cit_fini : ''), 
				cit_ffin:  ((w.cit && w.cit.cit_ffin) ? w.cit.cit_ffin : '')
			},
			itemdescr: cita.pag.alias+'(s)',
			// toolbarURL: '',
			toolbarHTML: ( ( w.showToolBar ) ? (
				_toolBarHtml+='<div class="form-inline" style="margin-top: 10px; margin-bottom: 10px;">',
					_toolBarHtml+='<div class="form-group">',
						_toolBarHtml+='&nbsp;<input type="text" name="ope_pini" class="form-control input-sm" style="margin: -7px 0px;" placeholder="yyyy-mm-dd" title="ope" tabindex="1"/>',
						_toolBarHtml+='&nbsp;<input type="text" name="ope_pfin" class="form-control input-sm" style="margin: -7px 0px;" placeholder="yyyy-mm-dd" title="ope" tabindex="1"/>',
						_toolBarHtml +='&nbsp;<select name="bal_niv0" class="form-control" title="ope" style="margin: -7px 0px;" placeholder="Rubro" tabindex="14"></select>',
						_toolBarHtml +='&nbsp;<select name="bal_niv1" class="form-control" title="ope" style="margin: -7px 0px;" placeholder="Clase" tabindex="14"></select>',
						_toolBarHtml +='&nbsp;<select name="bal_niv2" class="form-control" title="ope" style="margin: -7px 0px;" placeholder="Entidad" tabindex="14"></select>',
					_toolBarHtml+='</div>',
				_toolBarHtml+='</div>') : ''),
			onContentLoaded: function($el){
				$el.find('[name=btnAdd'+w.tipo.toLowerCase()+']').click(function(){
					cita.btnAddClick(w);
				});
				w.$e.find('[name=headerCalendar]').find('[name=cal_fini]').val(moment(w.cit.cit_fini).format('YYYY-MM-DD')).datepicker({dateFormat:'yy-mm-dd',prevText : '<i class="fa fa-chevron-left"></i>',nextText : '<i class="fa fa-chevron-right"></i>'});
			},
			// inObject : 'grid',
			load: function(rpta,$tbody){
				if(rpta.items!=null){
					var eventos = Array();
					w.$e.find('[id=calendar]').fullCalendar( 'removeEvents' );
					for (var key in rpta.items)
					{
						var fila = rpta.items[key];
						var evento = {
							id: fila.cit_kycit,
							title: fila.pac_nomb,
							start: new Date(fila.cit_fini),
							end: new Date(fila.cit_ffin),
							allDay: false,
							className: ["event", "bg-color-blue"]
						};
						w.$e.find('[id=calendar]').fullCalendar( 'renderEvent', evento, true );
					}//for (var key in rpta.items)
				}//if(rpta.items!=null){
				w.$e.find('[id=calendar]').fullCalendar('gotoDate', moment(w.cit.cit_fini).toDate());
				return $tbody;
			}//load: function(rpta,$tbody){
		});//var $grid = new Sisem.grid({
	}//ejecutar: function(w)
};//var brw_cita = {