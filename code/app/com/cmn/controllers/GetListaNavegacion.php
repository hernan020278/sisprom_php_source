<?php 
class GetListaNavegacion extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1 and a.pol_nive=1";
			switch ($data['niveIni'])
			{
				case 4:$where .= " and a.pol_kypol=".$data['pol_kypol'];break;
				case 5:$where .= " and b.pol_kypol=".$data['pol_kypol'];break;
				case 6:$where .= " and c.pol_kypol=".$data['pol_kypol'];break;
				case 7:$where .= " and d.pol_kypol=".$data['pol_kypol'];break;
				case 8:$where .= " and e.pol_kypol=".$data['pol_kypol'];break;
			}//switch ($nive)
					
			$data['sql'] = "SELECT
			    CONCAT(a.pol_orde, a.pol_kypol) oda, a.pol_kypol kya, a.pol_kypdr kpa, a.pol_nive nva, a.pol_nomb nma, a.pol_imin ima, a.pol_dscr dsa, a.pol_trig tga, a.pol_esta esa,
			    CONCAT(b.pol_orde, b.pol_kypol) odb, b.pol_kypol kyb, b.pol_kypdr kpb, b.pol_nive nvb, b.pol_nomb nmb, b.pol_imin imb, b.pol_dscr dsb, b.pol_trig tgb, b.pol_esta esb,
			    CONCAT(c.pol_orde, c.pol_kypol) odc, c.pol_kypol kyc, c.pol_kypdr kpc, c.pol_nive nvc, c.pol_nomb nmc, c.pol_imin imc, c.pol_dscr dsc, c.pol_trig tgc, c.pol_esta esc,
			    CONCAT(d.pol_orde, d.pol_kypol) odd, d.pol_kypol kyd, d.pol_kypdr kpd, d.pol_nive nvd, d.pol_nomb nmd, d.pol_imin imd, d.pol_dscr dsd, d.pol_trig tgd, d.pol_esta esd,
			    CONCAT(e.pol_orde, e.pol_kypol) ode, e.pol_kypol kye, e.pol_kypdr kpe, e.pol_nive nve, e.pol_nomb nme, e.pol_imin ime, e.pol_dscr dse, e.pol_trig tge, e.pol_esta ese
			FROM cmn_regla reg
			    LEFT JOIN cmn_politica a on a.pol_kypol=reg.reg_kypol AND a.pol_tipo='MENU'
			    LEFT JOIN cmn_politica b on b.pol_kypdr=a.pol_kypol AND b.pol_tipo='MENU'
			    LEFT JOIN cmn_politica c on c.pol_kypdr=b.pol_kypol AND c.pol_tipo='MENU'
			    LEFT JOIN cmn_politica d on d.pol_kypdr=c.pol_kypol AND d.pol_tipo='MENU'
			    LEFT JOIN cmn_politica e on e.pol_kypdr=d.pol_kypol AND e.pol_tipo='MENU'
			$where
			GROUP BY
			    a.pol_kypol, a.pol_kypdr, a.pol_nomb, a.pol_dscr, a.pol_trig, a.pol_esta,
			    b.pol_kypol, b.pol_kypdr, b.pol_nomb, b.pol_dscr, b.pol_trig, b.pol_esta,
			    c.pol_kypol, c.pol_kypdr, c.pol_nomb, c.pol_dscr, c.pol_trig, c.pol_esta,
			    d.pol_kypol, d.pol_kypdr, d.pol_nomb, d.pol_dscr, d.pol_trig, d.pol_esta,
			    e.pol_kypol, e.pol_kypdr, e.pol_nomb, e.pol_dscr, e.pol_trig, e.pol_esta
			ORDER BY a.pol_orde ASC";
						
			$data = $this->getLista($data);
			
			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>