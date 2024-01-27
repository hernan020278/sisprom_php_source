<?php 
class brw_doc_not extends Controlador
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
 			
 			$id_docu = ((isset($data['id_docu']))?$data['id_docu']:"");
 			$id_enti = ((isset($data['id_enti']))?$data['id_enti']:"");
 			$main_sel_sucu = ((isset($data['main_sel_sucu']))?$data['main_sel_sucu']:"");
 			$main_kysuc = ((isset($data['main_kysuc']))?$data['main_kysuc']:"");
 			
 			if($main_sel_sucu){$id_sucu = ((!empty($main_kysuc)) ? $main_kysuc : "0");}
 			
 			$tope = ((isset($data['tope']))?$data['tope']:"");
 			$tipo = ((isset($data['tipo']))?$data['tipo']:"");
 			$filtro = ((isset($data['filtro']))?$data['filtro']:"");
 			$text = ((isset($data['text']))?$data['text']:"");
 			
 			$where = "doc.esta!='0000'";
 			
 			if(!empty($id_sucu)){$where.=" and (doc.id_sucu=".$id_sucu.")";}
 			if(!empty($id_enti)){$where.=" and (doc.id_enti = ".$id_usua.")";}
 			
 			if( $filtro!='TODOS' && $filtro!='ALLWITHSALD' && $filtro!='DPADR' && $filtro!='DHIJO' && $tipo!='PRV' && $tipo!='CLI')
 			{
 				if($tope=='0005'){
 					$where.=" and (doc.tope='0005' and doc.tdoc='0016' and doc.ecot='0002' and doc.esta='0001')";
 				}
 				else if($tope=='0009'){$where.="doc.esta='0001' and doc.tope='0009'";}
 				else if($tope=='0006')
 				{
 					if(isset($tipo) && $tipo=='COTI')
 					{
 						$where.=" and (doc.esta='0001' and doc.tope='0005' and doc.tdoc='0016' and doc.ecot='0002')";
 					}
 					else
 					{
 						$where.=" and (doc.esta='0001' and doc.tope='0005' and doc.tdoc='0009' and doc.ecot='0002')";
 					}
 				}
 				else if($tope=='0010'){$where.=" and (doc.esta='0001' and doc.tope='0009')";}
 				else if($tope=='0001'){$where.=" and (doc.esta='0001' and doc.tope='0006')";}
 				else if($tope=='0002'){$where.=" and (doc.esta='0001' and doc.tope='0010')";}
 				else if($tope=='0007'){$where.=" and (doc.esta='0001' and ( doc.tope='0001' or doc.tope='0006' ) )";}
 				else if($tope=='0008'){$where.=" and (doc.esta='0001' and doc.tope='0010')";}
 			}
 			else if( $tipo=='PRV' ){$where.=" and (doc.tope='0001' or doc.tope='0005' or doc.tope='0006')";}
 			else if( $tipo=='CLI' ){$where.=" and (doc.tope='0002' or doc.tope='0009' or doc.tope='0010')";}
 			else if( $filtro=='ALLWITHSALD' )
 			{
 				if($tope=='0000'){$where.=" and (doc.tope='0001' or doc.tope='0002')";}
 				else{$where.=" and (doc.tope='".$tope."')";}
 			}
 			else if( $filtro=="DPADR" ){$where.=" and (doc.id_docu=".$id_docu.")";}
 			else if( $filtro=="DHIJO" ){$where.=" and (doc.id_padr=".$id_docu.")";}
 			else{$where.=" and (doc.tope='".$tope."')";}
 			
 			$having="";
 			if(isset($filtro) && $filtro=='ALLWITHSALD'){$having.=" spag>0";}
 			
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
 			
 			$orderColumn = "tmp.".substr($orderColumn, strpos($orderColumn, ".")+1, strlen($orderColumn));
 			$doc_tdoc=$this->util->getKeyFromValue($this->util->tipDoc, $doc_tdoc);
 			
 			if(isset($text) && !empty($text)){$where.=" (doc.enom like '%".$text."%' or doc.nref like '%".$text."%')";}
 			if(!empty($doc_tdoc)){$where.=" and doc.tdoc like '%".$doc_tdoc."%'";}
 			if(!empty($doc_ndoc)){$where.=" and doc.ndoc like '%".$doc_ndoc."%'";}
 			if(!empty($doc_nref)){$where.=" and doc.nref like '%".$doc_nref."%'";}
 			if(!empty($doc_enom)){$where.=" and doc.enom like '%".$doc_enom."%'";}
 			if(!empty($doc_freg)){$where.=" and doc.freg like '%".$doc_freg."%'";}
 			if(!empty($orderColumn) && !empty($orderType)){$orderby=" order by ".$orderColumn." ".$orderType;}
 									   
			$lista = $this->documento->getListaMix("COUNT", $page_mysql, $per_page, "", "", $where, "", $having, $orderby);
			$data['data']['paging']['rowcount'] = $lista[0]->rowCount;
			$data['data']["items"] = $this->documento->getListaMix("SELECT", $page_mysql, $per_page, "", "", $where, "", $having, $orderby);

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