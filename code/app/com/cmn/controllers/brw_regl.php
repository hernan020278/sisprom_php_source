<?php 
class brw_regl extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data['obtenerRowCount'] = true;
 			
 			$data['sql'] = "SELECT prf.prf_kyprf, prf.prf_nomb, prf.prf_dscr, pol.pol_kypol, pol.pol_nomb, pol.pol_dscr, pol.pol_imin, pol.pol_temp, pol.pol_link, pol.pol_esta, reg.reg_kyreg, reg.reg_kycom, reg.reg_kyprf, reg.reg_kypol, reg.reg_esta
            FROM cmn_regla reg
            INNER JOIN cmn_politica pol ON pol.pol_kypol=reg.reg_kypol
            INNER JOIN cmn_perfil prf ON prf.prf_kyprf=reg.reg_kyprf
            INNER JOIN cmn_comunidad com ON com.com_kycom=reg.reg_kycom
            WHERE
			GROUP BY prf.prf_kyprf, prf.prf_nomb, prf.prf_dscr, pol.pol_kypol, pol.pol_nomb, pol.pol_dscr, pol.pol_imin, pol.pol_temp, pol.pol_link, pol.pol_esta, reg.reg_kyreg, reg.reg_kycom, reg.reg_kyprf, reg.reg_kypol, reg.reg_esta";

 			$data = $this->run("cmn/GetListaRegla",$data);
 			
 			$result = $data['lista'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	} 	
}
?>