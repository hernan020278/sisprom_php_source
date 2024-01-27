<?php 
class GetListaEvaluacion extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['evl_kyevl'] = 11;
		$data = $this->ejecutar($data);
		var_dump($data);
	}	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "WHERE 1=1";

			if($this->util->exist($data,'alu_kyusu')){$where.=" AND (alu.usu_kyusu='".$data['alu_kyusu']."')";}
			if($this->util->exist($data,'mtr_kymtr')){$where.=" and (mtr.mtr_kymtr='".$data['mtr_kymtr']."')";}
			if($this->util->exist($data,'mtr_peri')){$where.=" and (mtr.mtr_peri='".$data['mtr_peri']."')";}
			if($this->util->exist($data,'mtr_prog')){$where.=" and (mtr.mtr_prog='".$data['mtr_prog']."')";}
			if($this->util->exist($data,'mtr_nive')){$where.=" and (mtr.mtr_nive='".$data['mtr_nive']."')";}
			if($this->util->exist($data,'mtr_grad')){$where.=" and (mtr.mtr_grad='".$data['mtr_grad']."')";}
			if($this->util->exist($data,'mtr_turn')){$where.=" and (mtr.mtr_turn='".$data['mtr_turn']."')";}
			if($this->util->exist($data,'mtr_aula')){$where.=" and (mtr.mtr_aula='".$data['mtr_aula']."')";}
			if($this->util->exist($data,'asg_nomb')){$where.=" and (asg.asg_nomb='".$data['asg_nomb']."')";}
			if($this->util->exist($data,'evl_kyevl')){$where.=" AND (a.evl_kyevl='".$data['evl_kyevl']."')";}
			if($this->util->exist($data,'evl_kypdr')){$where.=" AND (a.evl_kypdr='".$data['evl_kypdr']."')";}
			if($this->util->exist($data,'evl_kyasg')){$where.=" AND (a.evl_kyasg='".$data['evl_kyasg']."')";}
			if($this->util->exist($data,'evl_kyprp')){$where.=" AND (a.evl_kyprp='".$data['evl_kyprp']."')";}
			if($this->util->exist($data,'evl_nive')){$where.=" AND (a.evl_nive='".$data['evl_nive']."')";}
			if($this->util->exist($data,'evl_nomb')){$where.=" AND (a.evl_nomb='".$data['evl_nomb']."')";}
			if($this->util->exist($data,'evl_dscr')){$where.=" AND (a.evl_dscr='".$data['evl_dscr']."')";}
			if($this->util->exist($data,'evl_vers')){$where.=" AND (a.evl_vers='".$data['evl_vers']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
			    if($this->util->get($data,'tipo')=="EVLHIS")
			    {
			        $data['sql'] = "SELECT pdr.evl_nomb pdr_nomb, pdr.evl_dscr pdr_dscr, pdr.evl_valo pdr_valo, a.evl_kyevl, a.evl_kypdr, a.evl_orde, a.evl_nive, a.evl_freg, a.evl_nomb, a.evl_dscr, a.evl_valo 
                    FROM clg_evaluacion a INNER JOIN clg_evaluacion pdr ON pdr.evl_kyevl=a.evl_kypdr ".$where." AND a.evl_esta='0002'";
			    }
			    else if($this->util->get($data,'tipo')=="EVLALU")
			    {
			        $data['sql'] = "SELECT alu.usu_kyusu aky, alu.usu_nomb anm, 1 aor, asg.asg_kyasg cky, asg.asg_nomb cnm,
    				a.evl_kyevl kya,a.evl_kypdr kpa, a.evl_kyprp epa, a.evl_nive nva, a.evl_nomb nma, a.evl_valu vaa, a.evl_dscr dsa, a.evl_valo vla,
    				b.evl_kyevl kyb,b.evl_kypdr kpb, b.evl_kyprp epb, b.evl_nive nvb, b.evl_nomb nmb, b.evl_valu vab, b.evl_dscr dsb, b.evl_valo vlb,
    				c.evl_kyevl kyc,c.evl_kypdr kpc, c.evl_kyprp epc, c.evl_nive nvc, c.evl_nomb nmc, c.evl_valu vac, c.evl_dscr dsc, c.evl_valo vlc,
    				d.evl_kyevl kyd,d.evl_kypdr kpd, d.evl_kyprp epd, d.evl_nive nvd, d.evl_nomb nmd, d.evl_valu vad, d.evl_dscr dsd, d.evl_valo vld,
    				e.evl_kyevl kye,e.evl_kypdr kpe, e.evl_kyprp epe, e.evl_nive nve, e.evl_nomb nme, e.evl_valu vae, e.evl_dscr dse, e.evl_valo vle
    				FROM clg_asignatura asg
    				INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
    				INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
    				LEFT JOIN clg_evaluacion a ON a.evl_kyasg=asg.asg_kyasg AND a.evl_esta='0001'
    				LEFT JOIN clg_evaluacion b ON b.evl_kypdr=a.evl_kyevl AND b.evl_esta='0001'
    				LEFT JOIN clg_evaluacion c ON c.evl_kypdr=b.evl_kyevl AND c.evl_esta='0001'
    				LEFT JOIN clg_evaluacion d ON d.evl_kypdr=c.evl_kyevl AND d.evl_esta='0001'
    				LEFT JOIN clg_evaluacion e ON e.evl_kypdr=d.evl_kyevl AND e.evl_esta='0001'
    				$where
    				GROUP BY alu.usu_kyusu, alu.usu_nomb, asg.asg_kyasg, asg.asg_nomb,
    				a.evl_kyevl, a.evl_kypdr, a.evl_kyprp, a.evl_nive, a.evl_nomb, a.evl_valu, a.evl_dscr, a.evl_valo,
    				b.evl_kyevl, b.evl_kypdr, b.evl_kyprp, b.evl_nive, b.evl_nomb, b.evl_valu, b.evl_dscr, a.evl_valo,
    				c.evl_kyevl, c.evl_kypdr, c.evl_kyprp, c.evl_nive, c.evl_nomb, c.evl_valu, c.evl_dscr, a.evl_valo,
    				d.evl_kyevl, d.evl_kypdr, d.evl_kyprp, d.evl_nive, d.evl_nomb, d.evl_valu, d.evl_dscr, a.evl_valo,
    				e.evl_kyevl, e.evl_kypdr, e.evl_kyprp, e.evl_nive, e.evl_nomb, e.evl_valu, e.evl_dscr, a.evl_valo";
			    }
			    else if($this->util->get($data,'tipo')=="EVLASG")
			    {
			        $data['sql'] = "SELECT asg.asg_kyasg aky, asg.asg_nomb anm, 1 aor, alu.usu_kyusu, alu.usu_nomb,
    				a.evl_kyevl kya,a.evl_kypdr kpa, a.evl_kyprp epa, a.evl_nive nva, a.evl_nomb nma, a.evl_valu vaa, a.evl_dscr dsa, a.evl_valo vla,
    				b.evl_kyevl kyb,b.evl_kypdr kpb, b.evl_kyprp epb, b.evl_nive nvb, b.evl_nomb nmb, b.evl_valu vab, b.evl_dscr dsb, b.evl_valo vlb,
    				c.evl_kyevl kyc,c.evl_kypdr kpc, c.evl_kyprp epc, c.evl_nive nvc, c.evl_nomb nmc, c.evl_valu vac, c.evl_dscr dsc, c.evl_valo vlc,
    				d.evl_kyevl kyd,d.evl_kypdr kpd, d.evl_kyprp epd, d.evl_nive nvd, d.evl_nomb nmd, d.evl_valu vad, d.evl_dscr dsd, d.evl_valo vld,
    				e.evl_kyevl kye,e.evl_kypdr kpe, e.evl_kyprp epe, e.evl_nive nve, e.evl_nomb nme, e.evl_valu vae, e.evl_dscr dse, e.evl_valo vle
    				FROM clg_asignatura asg
    				INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
                    INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
    				LEFT JOIN clg_evaluacion a ON a.evl_kyasg=asg.asg_kyasg AND a.evl_esta='0001'
    				LEFT JOIN clg_evaluacion b ON b.evl_kypdr=a.evl_kyevl AND b.evl_esta='0001'
    				LEFT JOIN clg_evaluacion c ON c.evl_kypdr=b.evl_kyevl AND c.evl_esta='0001'
    				LEFT JOIN clg_evaluacion d ON d.evl_kypdr=c.evl_kyevl AND d.evl_esta='0001'
    				LEFT JOIN clg_evaluacion e ON e.evl_kypdr=d.evl_kyevl AND e.evl_esta='0001'
    				$where
    				GROUP BY asg.asg_kyasg, asg.asg_nomb, alu.usu_kyusu, alu.usu_nomb,
    				a.evl_kyevl, a.evl_kypdr, a.evl_kyprp, a.evl_nive, a.evl_nomb, a.evl_valu, a.evl_dscr, a.evl_valo,
    				b.evl_kyevl, b.evl_kypdr, b.evl_kyprp, b.evl_nive, b.evl_nomb, b.evl_valu, b.evl_dscr, a.evl_valo,
    				c.evl_kyevl, c.evl_kypdr, c.evl_kyprp, c.evl_nive, c.evl_nomb, c.evl_valu, c.evl_dscr, a.evl_valo,
    				d.evl_kyevl, d.evl_kypdr, d.evl_kyprp, d.evl_nive, d.evl_nomb, d.evl_valu, d.evl_dscr, a.evl_valo,
    				e.evl_kyevl, e.evl_kypdr, e.evl_kyprp, e.evl_nive, e.evl_nomb, e.evl_valu, e.evl_dscr, a.evl_valo";
			    }
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>