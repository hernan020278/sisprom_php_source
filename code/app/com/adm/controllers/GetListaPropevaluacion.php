<?php 
class GetListaPropevaluacion extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		$dtmp = Array();
		$dtmp['prp_nive'] = 2;
		$dtmp['prp_prop'] = 'PRMPRI';
		
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "WHERE 1=1";
			
			if($this->util->exist($data,'prp_secc')){$where.=" AND (a.prp_secc='".$data['prp_secc']."')";}
			if($this->util->exist($data,'prp_prop')){$where.=" AND (a.prp_prop='".$data['prp_prop']."')";}
				
			$data['sql'] = "SELECT 
			a.prp_kyprp kya,a.prp_kypdr kpa, a.prp_nive-1 nva, a.prp_prop pra, a.prp_valu vaa, a.prp_dscr dsa,
			b.prp_kyprp kyb,b.prp_kypdr kpb, b.prp_nive-1 nvb, b.prp_prop prb, b.prp_valu vab, b.prp_dscr dsb,
			c.prp_kyprp kyc,c.prp_kypdr kpc, c.prp_nive-1 nvc, c.prp_prop prc, c.prp_valu vac, c.prp_dscr dsc,
			d.prp_kyprp kyd,d.prp_kypdr kpd, d.prp_nive-1 nvd, d.prp_prop prd, d.prp_valu vad, d.prp_dscr dsd,
			e.prp_kyprp kye,e.prp_kypdr kpe, e.prp_nive-1 nve, e.prp_prop pre, e.prp_valu vae, e.prp_dscr dse
			FROM adm_propiedad a 
			LEFT JOIN adm_propiedad b on b.prp_kypdr=a.prp_kyprp
			LEFT JOIN adm_propiedad c on c.prp_kypdr=b.prp_kyprp
			LEFT JOIN adm_propiedad d on d.prp_kypdr=c.prp_kyprp
			LEFT JOIN adm_propiedad e on e.prp_kypdr=d.prp_kyprp
			$where
			GROUP BY
			a.prp_kyprp, a.prp_kypdr, a.prp_prop, a.prp_valu, a.prp_dscr,
			b.prp_kyprp, b.prp_kypdr, b.prp_prop, b.prp_valu, b.prp_dscr,
			c.prp_kyprp, c.prp_kypdr, c.prp_prop, c.prp_valu, c.prp_dscr,
			d.prp_kyprp, d.prp_kypdr, d.prp_prop, d.prp_valu, d.prp_dscr,
			e.prp_kyprp, e.prp_kypdr, e.prp_prop, e.prp_valu, e.prp_dscr";
			
			$data = $this->getLista($data);

			if(count($data['lista']['items'])>0){
				foreach($data['lista']['items'] as $item){
					if(!isset($rpta['lisCelTab'][$item['kya']]))
					{
						$rpta['lisCelTab'][$item['kya']]=Array();
						$rpta['lisCelTab'][$item['kya']]['lisCelTab']=Array();
					}
					$rpta['lisCelTab'][$item['kya']]['eky']=$item['kya'];
					$rpta['lisCelTab'][$item['kya']]['ekp']=$item['kpa'];
					$rpta['lisCelTab'][$item['kya']]['env']=(int)$item['nva'];
					$rpta['lisCelTab'][$item['kya']]['enm']=$item['pra'];
					$rpta['lisCelTab'][$item['kya']]['eva']=$item['vaa'];
					$rpta['lisCelTab'][$item['kya']]['eds']=$item['dsa'];
					$rpta['lisCelTab'][$item['kya']]['evl']=0;
					$rpta['lisCelTab'][$item['kya']]['aky']=0;
					$rpta['lisCelTab'][$item['kya']]['aor']=1;
					$rpta['lisCelTab'][$item['kya']]['anm']="Nombre Alumno";
			
					if(!isset($rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]))
					{
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]=Array();
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab']=Array();
					}
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eky']=$item['kyb'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['ekp']=$item['kpb'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['env']=(int)$item['nvb'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['enm']=$item['prb'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eva']=$item['vab'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eds']=$item['dsb'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['evl']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['aky']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['aor']=1;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['anm']="Nombre Alumno";
			
					if(!isset($rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]))
					{
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]=Array();
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab']=Array();
					}
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eky']=$item['kyc'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['ekp']=$item['kpc'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['env']=(int)$item['nvc'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['enm']=$item['prc'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eva']=$item['vac'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eds']=$item['dsc'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['evl']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['aky']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['aor']=1;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['anm']="Nombre Alumno";
						
					if(!isset($rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]))
					{
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]=Array();
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab']=Array();
					}
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eky']=$item['kyd'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['ekp']=$item['kpd'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['env']=(int)$item['nvd'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['enm']=$item['prd'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eva']=$item['vad'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eds']=$item['dsd'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['evl']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['aky']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['aor']=1;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['anm']="Nombre Alumno";
			
					if(!isset($rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]))
					{
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]=Array();
						$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['lisCelTab']=Array();
					}
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eky']=$item['kye'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['ekp']=$item['kpe'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['env']=(int)$item['nve'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['enm']=$item['pre'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eva']=$item['vae'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eds']=$item['dse'];
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['evl']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['aky']=0;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['aor']=1;
					$rpta['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['anm']="Nombre Alumno";
				}//foreach($list as $item){
			}//if(count($list)>0){

			$data['msg'] = ( ( isset($rpta['lisCelTab']) && count($rpta['lisCelTab']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
			$result['msg'] = $data['msg'];
			$result['lisCelTab'] = $rpta['lisCelTab'];

 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>