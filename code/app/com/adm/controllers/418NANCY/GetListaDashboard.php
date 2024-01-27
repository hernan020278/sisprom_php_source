<?php 
class GetListaDashboard extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1 and ope.ope_esta='0001'";
			$whope =  "where 1=1 and opeTmp.ope_esta='0001' and opeTmp.ope_omon=ope_omon";
			$feant = "";
			$feact = "";
			
			if($this->util->exist($data,'ope_kycom')){$where.=" and ope.ope_kycom='".$data['ope_kycom']."'";$whope.=" and opeTmp.ope_kycom='".$data['ope_kycom']."'";}
			if($this->util->exist($data,'apc_kyapc')){$where.=" and ope.ope_kyapc='".$data['apc_kyapc']."'";$whope.=" and opeTmp.ope_kyapc='".$data['apc_kyapc']."'";}
			if($this->util->exist($data,'suc_kysuc')){$where.=" and ope.ope_kysuc='".$data['suc_kysuc']."'";$whope.=" and opeTmp.ope_kysuc='".$data['suc_kysuc']."'";}
			if($this->util->exist($data,'ope_pini') && $this->util->exist($data,'ope_pfin'))
			{
				$feant.=" and date(opeTmp.ope_freg)<'".$data['ope_pini']."'";
				$feact.=" and date(opeTmp.ope_freg)>='".$data['ope_pini']."' and date(opeTmp.ope_freg)<='".$data['ope_pfin']."'";
				$where.=" and date(ope.ope_freg)>='".$data['ope_pini']."' and date(ope.ope_freg)<='".$data['ope_pfin']."'";
			}
			else if($this->util->exist($data,'ope_pini') && !$this->util->exist($data,'ope_pfin'))
			{
				$feact.=" and date(opeTmp.ope_peri)<'".$data['ope_pini']."'";
			}
				
			if($this->util->get($data,"bal_dire")=="ADELANTE"){$data['bal_nact'] = $this->util->get($data,'bal_nact',0) + 1;}
			else if($this->util->get($data,"bal_dire")=="ATRAZ"){$data['bal_nact'] = $this->util->get($data,'bal_nact',0) - 1;}
			
			$filAn2 = (($data['bal_nact'] > 1) ? $data['listaOrden'][$data['bal_nact']-2] : "");
			$filAn1 = (($data['bal_nact'] > 0) ? $data['listaOrden'][$data['bal_nact']-1] : "");
			$filAct = $data['listaOrden'][$data['bal_nact']];

			if($data['bal_nact'] > 1 && $filAn2 == "cco_kycco" && $this->util->exist($data, "cco_kycco")){$where .= " and cco.cco_kycco = ".$data['cco_kycco'];$whope .= " and opeTmp.ope_kycco = ".$data['cco_kycco'];}
			if($data['bal_nact'] > 1 && $filAn2 == "rub_nomb" && $this->util->exist($data, "rub_nomb")){$where .= " and ope.ope_rubr = ".$data['rub_nomb'];$whope .= " and opeTmp.ope_rubr = ".$data['rub_nomb'];}
			if($data['bal_nact'] > 1 && $filAn2 == "cls_nomb" && $this->util->exist($data, "cls_nomb")){$where .= " and ope.ope_clas = ".$data['cls_nomb'];$whope .= " and opeTmp.ope_clas = ".$data['cls_nomb'];}
			
			if($data['bal_nact'] > 0 && $filAn1 == "cco_kycco" && $this->util->exist($data, "cco_kycco")){$where .= " and cco.cco_kycco = ".$data['cco_kycco'];$whope .= " and opeTmp.ope_kycco = ".$data['cco_kycco'];}
			if($data['bal_nact'] > 0 && $filAn1 == "rub_nomb" && $this->util->exist($data, "rub_nomb")){$where .= " and ope.ope_rubr = ".$data['rub_nomb'];$whope .= " and opeTmp.ope_rubr = ".$data['rub_nomb'];}
			if($data['bal_nact'] > 0 && $filAn1 == "cls_nomb" && $this->util->exist($data, "cls_nomb")){$where .= " and ope.ope_clas = ".$data['cls_nomb'];$whope .= " and opeTmp.ope_clas = ".$data['cls_nomb'];}
			
			if($filAct == "cco_kycco"){$whope .= " and opeTmp.ope_kycco = ope.ope_kycco";}
  			if($filAct == "rub_nomb"){$whope .= " and opeTmp.ope_rubr = ope.ope_rubr";}
  			if($filAct == "cls_nomb"){$whope .= " and opeTmp.ope_clas = ope.ope_clas";}
 			
			if( $filAct == "cco_kycco"){$data['sql'] = "select ".$data['bal_nact']." bal_nact, cco.cco_kycco bal_kybal, concat(UPPER(SUBSTR(ent.usu_nomb,1,3)),cco_dscr,substr(cco_ndoc,-4)) bal_prop,";}
			if( $filAct == "rub_nomb"){$data['sql'] = "select ".$data['bal_nact']." bal_nact, ope.ope_rubr bal_kybal, ope.ope_rubr bal_prop,";}
			if( $filAct == "cls_nomb"){$data['sql'] = "select ".$data['bal_nact']." bal_nact, ope.ope_clas bal_kybal, ope.ope_clas bal_prop,";}

			if($data['listaOrden'][0]=="cco_kycco"){
				$data['sql'] .="
				cco.cco_kycco, cco.cco_dscr, cco.cco_ndoc,
				ope.ope_rubr, ope.ope_clas,
				ent.usu_kyusu usu_kyusu, ent.usu_nomb usu_nomb, ent.usu_dire,
				(
					IFNULL((SELECT sum(opeTmp.ope_oimp) FROM adm_operacion opeTmp ".$whope." and opeTmp.ope_otip='INGRESO'".$feant."),0.00) -
					IFNULL((SELECT sum(opeTmp.ope_oimp) FROM adm_operacion opeTmp ".$whope." and opeTmp.ope_otip='EGRESO'".$feant."),0.00)
				) bal_ante,
				sum(ope.ope_debe) bal_ingr,
				IFNULL((SELECT sum(opeTmp.ope_oimp) FROM adm_operacion opeTmp ".$whope." and (opeTmp.ope_tope='GASTO' OR opeTmp.ope_tope='TRANSFERENCIA')".$feact."),0.00) bal_gast,
                IFNULL((SELECT sum(opeTmp.ope_oimp) FROM adm_operacion opeTmp ".$whope." and ( opeTmp.ope_tope='COSTO' AND opeTmp.ope_rubr NOT IN ('HERNAN','ROMULO','SOFIA','NANCY','KELLY','MAMA') )".$feact."),0.00) bal_cost
			FROM adm_operacion ope
				INNER JOIN adm_ctacorriente cco on cco.cco_kycco=ope_kycco
				INNER JOIN cmn_usuario ent on ent.usu_kyusu=ope.ope_kyusu ".$where;
			}else{
				$data['sql'] .="
				cco.cco_kycco, cco.cco_dscr, cco.cco_ndoc,
				ope.ope_rubr, ope.ope_clas,
				ent.usu_kyusu usu_kyusu, ent.usu_nomb usu_nomb, ent.usu_dire,
				(
					ifnull((select sum(opeTmp.ope_oimp) from adm_operacion opeTmp ".$whope." and opeTmp.ope_otip='INGRESO'".$feant."),0.00) -
					ifnull((select sum(opeTmp.ope_oimp) from adm_operacion opeTmp ".$whope." and opeTmp.ope_otip='EGRESO'".$feant."),0.00)
				) bal_ante,
				sum(ope.ope_debe) bal_ingr,
				ifnull((select sum(opeTmp.ope_oimp) from adm_operacion opeTmp ".$whope." and ( opeTmp.ope_tope='GASTO' OR opeTmp.ope_tope='TRANSFERENCIA' )".$feact."),0.00) bal_gast,
                ifnull((select sum(opeTmp.ope_oimp) from adm_operacion opeTmp ".$whope." and ( opeTmp.ope_tope='COSTO' )".$feact."),0.00) bal_cost
			from adm_operacion ope
				inner join adm_ctacorriente cco on cco.cco_kycco=ope_kycco
				inner join cmn_usuario ent on ent.usu_kyusu=ope.ope_kyusu ".$where;
			}
			
			if( $filAct == "cco_kycco"){$data['sql'] .= " group by cco.cco_kycco, cco.cco_dscr";}
			if( $filAct == "rub_nomb"){$data['sql'] .= " group by ope.ope_rubr";}
			if( $filAct == "cls_nomb"){$data['sql'] .= " group by ope.ope_clas";}
			
			$data = $this->getLista($data);

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>