<?php 
class GetListaRegla extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "where 1=1 and reg.reg_esta='0001'";
			
			if($this->util->exist($data,'reg_kyreg')){$where.=" and (reg.reg_kyreg = '".$data['reg_kyreg']."')";}
			if($this->util->exist($data,'reg_kycom')){$where.=" and (reg.reg_kycom = '".$data['reg_kycom']."')";}
			if($this->util->exist($data,'reg_kyprf')){$where.=" and (reg.reg_kyprf = '".$data['reg_kyprf']."')";}
			if($this->util->exist($data,'reg_kypol')){$where.=" and (reg.reg_kypol = '".$data['reg_kypol']."')";}
			if($this->util->exist($data,'usu_kyusu')){$where.=" and (usu.usu_kyusu = '".$data['usu_kyusu']."')";}
			if($this->util->exist($data,'rol_kyrol')){$where.=" and (rol.rol_kyrol = '".$data['rol_kyrol']."')";}
			if($this->util->exist($data,'pol_kysup')){$where.=" and (pol.pol_kysup = '".$data['pol_kysup']."')";}
			if($this->util->exist($data,'pol_codi')){$where.=" and (pol.pol_codi = '".$data['pol_codi']."')";}
			if($this->util->exist($data,'pol_nive')){$where.=" and (pol.pol_nive = '".$data['pol_nive']."')";}
			if($this->util->exist($data,'pol_nomb')){$where.=" and (pol.pol_nomb = '".$data['pol_nomb']."')";}

			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT com.com_kycom, com.com_kyusu, com.com_nomb, com.com_dscr, usu.usu_kyusu, usu.usu_ndoc, usu.usu_nomb, usu.usu_mail, prf.prf_kyprf, prf.prf_nomb, prf.prf_dscr, pol.pol_kypol, pol.pol_nomb, pol.pol_dscr, pol.pol_imin, pol.pol_temp, pol.pol_link, pol.pol_esta, reg.reg_kyreg, reg.reg_kycom, reg.reg_kyprf, reg.reg_kypol, reg.reg_esta
                FROM cmn_regla reg
                INNER JOIN cmn_politica pol ON pol.pol_kypol=reg.reg_kypol
                INNER JOIN cmn_perfil prf ON prf.prf_kyprf=reg.reg_kyprf
                INNER JOIN cmn_roles rol ON rol.rol_kyprf=prf.prf_kyprf
                INNER JOIN cmn_usuario usu ON usu.usu_kyusu=rol.rol_kyusu
                INNER JOIN cmn_comunidad com ON com.com_kycom=reg.reg_kycom
				".$where."
				GROUP BY com.com_kycom, com.com_nomb, com.com_kyusu, com.com_dscr, usu.usu_kyusu, usu.usu_ndoc, usu.usu_nomb, usu.usu_mail, prf.prf_kyprf, prf.prf_nomb, prf.prf_dscr, pol.pol_kypol, pol.pol_nomb, pol.pol_dscr, pol.pol_imin, pol.pol_temp, pol.pol_link, pol.pol_esta, reg.reg_kyreg, reg.reg_kycom, reg.reg_kyprf, reg.reg_kypol, reg.reg_esta";
			}
			else
			{
			    $data['sql'] = str_replace("WHERE", $where, $data['sql']);
			}
											
			$data = $this->getLista($data);
			
			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>