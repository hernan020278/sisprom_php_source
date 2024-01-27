<?php 
class GetListaMenuAyuda extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 

			$data['dbResp'] = "LISTA";

			if($this->util->get($data, "pol_trig")=='open')
			{
				$data['pol_nive'] = $data['pol_nive'] + 1;
				$data['pol_kypdr'] = $data['pol_kypol'];
			}

			$where = "WHERE a.pol_nive=".$this->util->get($data, "pol_nive", "1")." AND a.pol_esta='0001'";
			if($this->util->exist($data,'pol_kypol')){$where.=" and (a.pol_kypol='".$data['pol_kypol']."')";}

			$data['sql'] = "SELECT
			    a.pol_kypol kya, a.pol_kypdr kpa, a.pol_nive nva, a.pol_dscr dsa, a.pol_link lka,
			    b.pol_kypol kyb, b.pol_kypdr kpb, b.pol_nive nvb, b.pol_dscr dsb, b.pol_link lkb,
			    c.pol_kypol kyc, c.pol_kypdr kpc, c.pol_nive nvc, c.pol_dscr dsc, c.pol_link lkc,
			    d.pol_kypol kyd, d.pol_kypdr kpd, d.pol_nive nvd, d.pol_dscr dsd, d.pol_link lkd,
			    e.pol_kypol kye, e.pol_kypdr kpe, e.pol_nive nve, e.pol_dscr dse, e.pol_link lke,
			    f.pol_kypol kyf, f.pol_kypdr kpf, f.pol_nive nvf, f.pol_dscr dsf, f.pol_link lkf,
			    g.pol_kypol kyg, g.pol_kypdr kpg, g.pol_nive nvg, g.pol_dscr dsg, g.pol_link lkg,
				h.pol_kypol kyh, h.pol_kypdr kph, h.pol_nive nvh, h.pol_dscr dsh, h.pol_link lkh,
				i.pol_kypol kyi, i.pol_kypdr kpi, i.pol_nive nvi, i.pol_dscr dsi, i.pol_link lki,
				j.pol_kypol kyj, j.pol_kypdr kpj, j.pol_nive nvj, j.pol_dscr dsj, j.pol_link lkj,
				k.pol_kypol kyk, k.pol_kypdr kpk, k.pol_nive nvk, k.pol_dscr dsk, k.pol_link lkk,
				l.pol_kypol kyl, l.pol_kypdr kpl, l.pol_nive nvl, l.pol_dscr dsl, l.pol_link lkl,
				m.pol_kypol kym, m.pol_kypdr kpm, m.pol_nive nvm, m.pol_dscr dsm, m.pol_link lkm	
			FROM cmn_politica a
			    LEFT JOIN cmn_politica b on b.pol_kypdr=a.pol_kypol
			    LEFT JOIN cmn_politica c on c.pol_kypdr=b.pol_kypol
			    LEFT JOIN cmn_politica d on d.pol_kypdr=c.pol_kypol
			    LEFT JOIN cmn_politica e on e.pol_kypdr=d.pol_kypol
			    LEFT JOIN cmn_politica f on f.pol_kypdr=e.pol_kypol
  			    LEFT JOIN cmn_politica g on g.pol_kypdr=f.pol_kypol
 			    LEFT JOIN cmn_politica h on h.pol_kypdr=g.pol_kypol
 			    LEFT JOIN cmn_politica i on i.pol_kypdr=h.pol_kypol
 			    LEFT JOIN cmn_politica j on j.pol_kypdr=i.pol_kypol
 			    LEFT JOIN cmn_politica k on k.pol_kypdr=j.pol_kypol
 			    LEFT JOIN cmn_politica l on l.pol_kypdr=k.pol_kypol
 			    LEFT JOIN cmn_politica m on m.pol_kypdr=l.pol_kypol
			$where
			GROUP BY
			    a.pol_kypol, a.pol_kypdr, a.pol_nomb, a.pol_dscr, a.pol_trig, a.pol_link,
			    b.pol_kypol, b.pol_kypdr, b.pol_nomb, b.pol_dscr, b.pol_trig, b.pol_link,
			    c.pol_kypol, c.pol_kypdr, c.pol_nomb, c.pol_dscr, c.pol_trig, c.pol_link,
			    d.pol_kypol, d.pol_kypdr, d.pol_nomb, d.pol_dscr, d.pol_trig, d.pol_link,
			    e.pol_kypol, e.pol_kypdr, e.pol_nomb, e.pol_dscr, e.pol_trig, e.pol_link,
  			    f.pol_kypol, f.pol_kypdr, f.pol_nomb, f.pol_dscr, f.pol_trig, f.pol_link,
  			    g.pol_kypol, g.pol_kypdr, g.pol_nomb, g.pol_dscr, g.pol_trig, g.pol_link,
  			    h.pol_kypol, h.pol_kypdr, h.pol_nomb, h.pol_dscr, h.pol_trig, h.pol_link,
  			    i.pol_kypol, i.pol_kypdr, i.pol_nomb, i.pol_dscr, i.pol_trig, i.pol_link,
  			    j.pol_kypol, j.pol_kypdr, j.pol_nomb, j.pol_dscr, j.pol_trig, j.pol_link,
  			    k.pol_kypol, k.pol_kypdr, k.pol_nomb, k.pol_dscr, k.pol_trig, k.pol_link,
  			    l.pol_kypol, l.pol_kypdr, l.pol_nomb, l.pol_dscr, l.pol_trig, l.pol_link,
  			    m.pol_kypol, m.pol_kypdr, m.pol_nomb, m.pol_dscr, m.pol_trig, m.pol_link
            ORDER BY a.pol_orde, b.pol_orde, c.pol_orde, d.pol_orde, e.pol_orde, f.pol_orde,
                g.pol_orde, h.pol_orde, i.pol_orde, j.pol_orde, k.pol_orde, l.pol_orde, m.pol_orde";
						
			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>