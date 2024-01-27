<?php 
class brw_com extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$page = floatval($data['page'])-1;
 			$data['data']['paging']['pagerows'] = $data['pagerows'];
 			$per_page = $data['pagerows'];
 			$page_mysql = $page*$per_page;
 			
 			$tipo = $data['tipo'];
 			$text = $data['text'];
 			$id_padr = $data['id_padr'];
 			
 			if(isset($data['main_sel_sucu']) && !empty($data['main_sel_sucu'])){$suc_kysucu = ((isset($data['main_kysuc'])) ? $data['main_kysuc'] : "0");}
 			/*
 			 * COLUMN LIST TO FILTER THE BROWSE
 			 */
 			$pdr_nomb = ((isset($data['filter_pdr_nomb']))?$data['filter_pdr_nomb']:"");
 			$usu_ndoc = ((isset($data['filter_usu_ndoc']))?$data['filter_usu_ndoc']:"");
 			$car_nomb = ((isset($data['filter_car_nomb']))?$data['filter_car_nomb']:"");
 			$div_nomb = ((isset($data['filter_div_nomb']))?$data['filter_div_nomb']:"");
 			$gru_nomb = ((isset($data['filter_gru_nomb']))?$data['filter_gru_nomb']:"");
 			$usu_nomb = ((isset($data['filter_usu_nomb']))?$data['filter_usu_nomb']:"");
 			$usu_esta = ((isset($data['filter_usu_esta']))?$data['filter_usu_esta']:"");
 			
 			/*
 			 * SETTING TO ORDER THE BROWSE
 			 */
 			$orderColumn = ((isset($data['orderColumn']))?str_replace('_','.',$data['orderColumn']):"");
 			$orderType = ((isset($data['orderType']))?$data['orderType']:"");
 			
 			if(!empty($usu_esta)){$where="ent.esta='".$this->util->getKeyFromValue($this->util->estado,$usu_esta)."'";}else{$where="ent.esta='0226'";}
 			$orderby="";
 			
 			if(!empty($suc_kysucu)){$where.=" and (ctg.id_sucu='".$suc_kysucu."')";}
 			if(isset($id_padr) && !empty($id_padr)){$where.=" and (ent.id_padr='".$id_padr."')";}
 			if(isset($tipo) && $tipo=='CLIPRO'){$where.="and (ent.tipo='CLI' or ent.tipo='PRV')";}
 			else if(isset($tipo) && $tipo=='CLIPROTRA'){$where.="and (ent.tipo='CLI' or ent.tipo='PRV' or ent.tipo='TRA')";}
 			else if(isset($tipo) && $tipo=='CLITRA'){$where.="and (ent.tipo='CLI' or ent.tipo='TRA')";}
 			else if(isset($tipo) && !empty($tipo)){$where.="and (ent.tipo='".$tipo."')";}
 			
 			if(isset($text) && !empty($text)){
 				$where.=" and( ((ent.nomb like '%".$text."%')";
 				$where.=" or (ent.ape1 like '%".$text."%'))";
 				$where.=" or (ent.ape2 like '%".$text."%'))";
 			}
 			
 			if(!empty($pdr_nomb)){$where.=" and pdr.nomb like '%".$pdr_nomb."%'";}
 			if(!empty($usu_ndoc)){$where.=" and ent.ndoc like '%".$usu_ndoc."%'";}
 			if(!empty($car_nomb)){$where.=" and car.nomb like '%".$car_nomb."%'";}
 			if(!empty($div_nomb)){$where.=" and dvi.nomb like '%".$div_nomb."%'";}
 			if(!empty($gru_nomb)){$where.=" and gru.nomb like '%".$gru_nomb."%'";}
 			if(!empty($usu_nomb)){$where.=" and ent.nomb like '%".$usu_nomb."%'";}
 			if(!empty($orderColumn) && !empty($orderType)){$orderby="order by ".(($orderColumn=="div.nomb")?"dvi.nomb":$orderColumn)." ".$orderType;}
 			
 			$lista = $this->entidades->getListaWithCategoriaSucursal('COUNT', $page_mysql, $per_page, $where, $orderby);
 			$data['data']['paging']['rowcount'] = $lista[0]->rowCount;
 			$data['data']['items'] = $this->entidades->getListaWithCategoriaSucursal('SELECT', $page_mysql, $per_page, $where, $orderby);
 			
 			$data['data']['paging']['pagerows'] = count($data['data']['items']);
 			$data['data']['paging']['pagecount'] = ceil($data['data']['paging']['rowcount']/$data['data']['paging']['pagerows']);
 			if($data['data']['paging']['pagecount']<1)$data['data']['paging']['pagecount']=1;
 			$data['data']['paging']['page'] = $page+1;

 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>