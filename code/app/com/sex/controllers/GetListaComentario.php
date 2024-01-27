<?php 
class GetListaComentario extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp']="LISTA";
			
			$where = "where 1=1 and cma.cme_esta='0001'";
			
			if($this->util->exist($data,'cme_kycme')){$where.=" and cma.cme_kycme = '".$data['cme_kycme']."'";}
			if($this->util->exist($data,'cme_kypdr')){$where.=" and cma.cme_kypdr = '".$data['cme_kypdr']."'";}
			
			$data['sql'] = "select cma.cme_kycme, cma.cme_kypdr, ena.usu_nomb, cma.cme_freg, cma.cme_dscr, cma.cme_nive, ".
			"count(cmb.cme_kycme) rowcount ".
			"from sex_comentario cma ".
			"inner join sex_entidad ena on ena.usu_kyusu=cma.cme_kyusu ".
			"left join sex_comentario cmb on cmb.cme_kypdr=cma.cme_kycme ".
			"left join sex_entidad enb on enb.usu_kyusu=cmb.cme_kyusu ".$where." ".
			"group by cma.cme_kycme";

			$data['orderColumn'] = "cme_kycme";
			$data['orderType'] = "desc";
			$data = $this->getLista($data);
			
			if(count($data['lista']['items'])>0)
			{
				for($ite=0; $ite<count($data['lista']['items']); $ite++)
				{
					$data['lista']['items'][$ite]['paging']['rowcount'] = $data['lista']['items'][$ite]['rowcount'];
					$data['lista']['items'][$ite]['paging']['rowresto'] = $data['lista']['items'][$ite]['rowcount'];
					$data['lista']['items'][$ite]['paging']['page'] = 0;
					$data['lista']['items'][$ite]['paging']['pagerows'] = 3;
					$data['lista']['items'][$ite]['paging']['pagecount'] = ceil($data['lista']['items'][$ite]['rowcount'] / 3);
				}//for($ite=0; $ite<count($data['lista']['items']); $ite++)
			}//if(count($data['lista']['items'])>0)
			
			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}	
}
?>