<?php 
class GetListaCtacorriente extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}//public function index()
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "where 1=1";
			$data['usu_kycom'] = $_SESSION['com']['com_kycom'];
			if($this->util->exist($data,'cco_kycom')){$where.=" and (cco.cco_kycom='".$data['cco_kycom']."')";}
			if($this->util->exist($data,'usu_kyusu')){$where.=" and (ent.usu_kyusu='".$data['usu_kyusu']."')";}
			if($this->util->exist($data,'usu_nomb')){$where.=" and (ent.usu_nomb like '%".$data['usu_nomb']."%')";}
			if($this->util->exist($data,'cco_kycco')){$where.=" and (cco.cco_kycco='".$data['cco_kycco']."')";}
			if($this->util->exist($data,'bnc_prop')){$where.=" and (bnc.prp_prop like '%".$data['bnc_prop']."%')";}
			if($this->util->exist($data,'cco_tcta')){$where.=" and (cco.cco_tcta='".$data['cco_tcta']."')";}
			if($this->util->exist($data,'cco_ndoc')){$where.=" and (cco.cco_ndoc='".$data['cco_ndoc']."')";}

			if($this->util->get($data,'cco_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'cco_esta') && $this->util->get($data,'cco_esta')!="TODOS")
				{
					$where.=" and cco.cco_esta = '".$data['cco_esta']."'";
				}
			}
 		 	if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (ent.usu_nomb like '%')";
						break;
					default:
						$where.=" and (ent.usu_nomb like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
				
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select ent.usu_kyusu, ent.usu_nomb, ent.usu_tipo, bnc.prp_kyprp bnc_kyprp, bnc.prp_prop bnc_prop, cco.cco_kycco, cco.cco_tcta, cco.cco_ndoc, cco.cco_tmon, cco.cco_freg, cco.cco_esta,
				ifnull((select sum(opeTmp.ope_debe) from adm_operacion opeTmp where opeTmp.ope_kycco=cco.cco_kycco and opeTmp.ope_kycom='".$data['usu_kycom']."' and opeTmp.ope_ctip='INGRESO'),0.00) cco_sant,
				ifnull((select sum(opeTmp.ope_habe) from adm_operacion opeTmp where opeTmp.ope_kycco=cco.cco_kycco and opeTmp.ope_kycom='".$data['usu_kycom']."' and opeTmp.ope_ctip='EGRESO'),0.00) cco_scan,
				ifnull((select sum(opeTmp.ope_debe)-sum(opeTmp.ope_habe) from adm_operacion opeTmp where opeTmp.ope_kycco=cco.cco_kycco and (opeTmp.ope_ctip='INGRESO' or opeTmp.ope_ctip='EGRESO') and opeTmp.ope_kycom='".$data['usu_kycom']."'),0.00) cco_spag
				from adm_ctacorriente cco
				inner join cmn_usuario ent on ent.usu_kyusu=cco.cco_kyusu
				inner join adm_propiedad bnc on bnc.prp_kyprp=cco.cco_kybnc ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
							
			$data = $this->getLista($data);
				
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("cco_kycco"=>"", "usu_kyusu"=>"", "usu_nomb"=>"Seleccione", "bnc_prop"=>"");
					array_push($lista, $obj);
					if(count($data['lista']['items'])>0){$data['lista']['items'] = array_merge($lista,$data['lista']['items']);}
					else{$data['lista']['items']=$lista;}
					if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 1 ){$data['lista']['items'] = Array();}
				}//if($data['mostrarSeleccion'])
				else{if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 0 ){$data['lista']['items'] = Array();}}
			}//if($this->util->get($data,'term')=="Seleccione")
			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>