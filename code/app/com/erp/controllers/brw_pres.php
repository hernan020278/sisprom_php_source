<?php 
class brw_pres extends Controlador
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

 			$main_sel_sucu = ((isset($data['main_sel_sucu']))?$data['main_sel_sucu']:"");
 			$main_kysuc = ((isset($data['main_kysuc']))?$data['main_kysuc']:"");

 			$text = ((isset($data['text']))?$data['text']:"");
 			
 			if($main_sel_sucu){$id_sucu = ((!empty($main_kysuc)) ? $main_kysuc : "0");}
 			
 			$where = "doc.esta!='0000'";
 			
 			/*
 			 * COLUMN LIST TO FILTER THE BROWSE
 			 */
 			$doc_tdoc = ((isset($data['filter_doc_tdoc']))?$data['filter_doc_tdoc']:"");
 			$doc_ndoc = ((isset($data['filter_doc_ndoc']))?$data['filter_doc_ndoc']:"");
 			$doc_nref = ((isset($data['filter_doc_nref']))?$data['filter_doc_nref']:"");
 			$doc_enom = ((isset($data['filter_doc_enom']))?$data['filter_doc_enom']:"");
 			$doc_freg = ((isset($data['filter_doc_freg']))?$data['filter_doc_freg']:"");
 			
 			/*
 			 * SETTING TO ORDER THE BROWSE
 			 */
 			$orderColumn = ((isset($data['orderColumn']))?str_replace('_','.',$data['orderColumn']):"");
 			$orderType = ((isset($data['orderType']))?$data['orderType']:"");
 			
 			$orderby="";
 			
 			if(isset($text) && !empty($text)){$where.="(prs.nref like '%".$text."%')";}
 			if(!empty($doc_tdoc)){$where.="and doc.tdoc like '%".$doc_tdoc."%'";}
 			if(!empty($doc_ndoc)){$where.="and doc.ndoc like '%".$doc_ndoc."%'";}
 			if(!empty($doc_nref)){$where.="and doc.nref like '%".$doc_nref."%'";}
 			if(!empty($doc_enom)){$where.="and doc.enom like '%".$doc_enom."%'";}
 			if(!empty($doc_freg)){$where.="and doc.freg like '%".$doc_freg."%'";}
 			
 		 	if(!empty($id_sucu)){$where.=" and (doc.id_sucu=".$id_sucu.")";}
 			if(!empty($usu_nomb)){$where.=" and (doc.enomb = ".$usu_nomb.")";}
 			
 			if(!empty($orderColumn) && !empty($orderType)){$orderby="order by ".$orderColumn." ".$orderType;}
 			
			$lista = $this->documento->getLista('COUNT', $page_mysql, $per_page, $where, $having);
			$data['data']['paging']['rowcount'] = $lista[0]->rowCount;
			$data['data']["items"] = $this->documento->getLista('SELECT', $page_mysql, $per_page, $where, $having);
 			 			
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