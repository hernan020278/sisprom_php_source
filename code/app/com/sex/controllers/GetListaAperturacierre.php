<?php 
class GetListaAperturacierre extends Controlador
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
			
			$where = "where 1=1 and apc.apc_esta!='0000'";
			
			if($this->util->exist($data,'apc_kycom')){$where.=" and (apc.apc_kycom='".$data['apc_kycom']."')";}
			if($this->util->get($data,'suc_tipo')=="CACO"){$where.=" and (suc.suc_tipo='0006')";}
			else if($this->util->get($data,'suc_tipo')=="CABA"){$where.=" and (suc.suc_tipo = '0001' or suc.suc_tipo = '0002' or suc.suc_tipo = '0003')";}
			else if($this->util->get($data,'suc_tipo')=="CAGE"){$where.=" and (suc.suc_tipo = '0001' or suc.suc_tipo = '0002' or suc.suc_tipo = '0003' or suc.suc_tipo = '0004' or suc.suc_tipo = '0006')";}
			else if($this->util->exist($data,'suc_tipo')){$where.=" and (suc.suc_tipo = '".$data['suc_tipo']."')";}
			if($this->util->get($data,'text')!=""){$where.=" and suc.suc_nomb like '%".$data['text']."%'";}
			
			$data['sql'] = "select apc.*, suc.suc_ncta, suc.suc_nomb, ent.usu_nomb,
			ifnull( ( select ope.ope_mmon from sex_operacion ope where ope.ope_kyapc=apc.apc_kyapc and ope.ope_otip='APERTURA'), 0 ) ope_mmon,
			ifnull( ( select ope.ope_mimp from sex_operacion ope where ope.ope_kyapc=apc.apc_kyapc and ope.ope_otip='APERTURA'), 0.00 ) ope_aper,
			ifnull( ( select ope.ope_mimp from sex_operacion ope where ope.ope_kyapc=apc.apc_kyapc and ope.ope_otip='CIERRE'), 0.00 ) ope_cier,
			ifnull( ( select (sum(ope.ope_debe)-sum(ope.ope_habe)) from sex_operacion ope where ope.ope_kyapc=apc.apc_kyapc and ( ope.ope_tope='COSTO' or ope.ope_tope='TRANSFERENCIA') ), 0 ) ope_sald 
			from sex_aperturacierre apc 
			inner join sex_sucursal suc on suc.suc_kysuc=apc.apc_kysuc
			inner join sex_entidad ent on ent.usu_kyusu=apc.apc_kyusu ".$where;
			
			$data = $this->getLista($data);

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>