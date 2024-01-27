<?php 
class brw_prs extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getDetdocumentoByArticulo($data);
 			
 			$page = floatval($data['page'])-1;
 			$data['data']['paging']['pagerows'] = $data['pagerows'];
 			$per_page = $data['pagerows'];
 			$page_mysql = $page*$per_page;
 			
 			$id_enti = ((isset($data['id_enti']))?$data['id_enti']:"");
 			$prs_kysupa = ((isset($data['prs_kysupa']))?$data['prs_kysupa']:"0");
 			$prs_kysupb = ((isset($data['prs_kysupb']))?$data['prs_kysupb']:"0");
 			$prs_kysupc = ((isset($data['prs_kysupc']))?$data['prs_kysupc']:"0");
 			$prs_kysupd = ((isset($data['prs_kysupd']))?$data['prs_kysupd']:"0");
 			$prs_kysupe = ((isset($data['prs_kysupe']))?$data['prs_kysupe']:"0");
 			$prs_nive = ((isset($data['prs_nive']))?$data['prs_nive']:"0");
 			$main_sel_sucu = ((isset($data['main_sel_sucu']))?$data['main_sel_sucu']:"");
 			$main_kysuc = ((isset($data['main_kysuc']))?$data['main_kysuc']:"");
 			
 			if($main_sel_sucu){$id_sucu = ((!empty($main_kysuc)) ? $main_kysuc : "0");}
 			
 			$filtro = ((isset($data['filtro']))?$data['filtro']:"");
 			$text = ((isset($data['text']))?$data['text']:"");
 			
 			$where = "prs.esta!='0000'";
//  		if(!empty($id_sucu)){$where.=" and prs.id_sucu=".$id_sucu;}
 			if(!empty($id_enti)){$where.=" and prs.id_enti=".$id_enti;}
 			if(!empty($prs_kysupa)){$where.=" and prs.id_supa = ".$prs_kysupa;}
 			if(!empty($prs_kysupb)){$where.=" and prs.id_supb = ".$prs_kysupb;}
 			if(!empty($prs_kysupc)){$where.=" and prs.id_supc = ".$prs_kysupc;}
 			if(!empty($prs_kysupd)){$where.=" and prs.id_supd = ".$prs_kysupd;}
 			if(!empty($prs_kysupe)){$where.=" and prs.id_supe = ".$prs_kysupe;}
 			if(!empty($prs_nive)){$where.=" and prs.nive = ".$prs_nive;}
 			$data['where']=str_replace("prs.", "mat.", $data['where']);
 			
 			$field = "mat.id_supa";
 			if(!empty($prs_nive) && $prs_nive==1){$field = "mat.id_supa";}
 			if(!empty($prs_nive) && $prs_nive==2){$field = "mat.id_supb";}
 			if(!empty($prs_nive) && $prs_nive==3){$field = "mat.id_supc";}
 			if(!empty($prs_nive) && $prs_nive==4){$field = "mat.id_supd";}
 			if(!empty($prs_nive) && $prs_nive==5){$field = "mat.id_supe";}

 			if(isset($data['where']) && !empty($data['where'])){$where.=" and prs.id_pres in (select ".$field." from erp_presupuesto mat where ".$data['where']." group by ".$field.")";}
 			
 			if( $filtro=="DPADR" ){$where.=" and (prs.id_pres=".$id_pres.")";}
 			else if( $filtro=="DHIJO" ){$where.=" and (prs.id_padr=".$id_pres.")";}
 			
 			$having="";
 			if(isset($filtro) && $filtro=='ALLWITHSALD'){$having.=" spag>0";}
 			
 			/*
 			 * COLUMN LIST TO FILTER THE BROWSE
 			 */
 			$prs_tdoc = ((isset($data['filter_prs_codi']))?$data['filter_prs_codi']:"");
 			$prs_ndoc = ((isset($data['filter_prs_dscr']))?$data['filter_prs_dscr']:"");
 			
 			/*
 			 * SETTING TO ORDER THE BROWSE
 			 */
 			$orderColumn = ((isset($data['orderColumn']))?str_replace('_','.',$data['orderColumn']):"");
 			$orderType = ((isset($data['orderType']))?$data['orderType']:"");
 			
 			$orderby="";
 			
 			if(isset($text) && !empty($text)){$where.="(prs.enom like '%".$text."%' or prs.nref like '%".$text."%')";}
 			if(!empty($prs_codi)){$where.="and prs.codi like '%".$prs_codi."%'";}
 			if(!empty($prs_dscr)){$where.="and prs.dscr like '%".$prs_dscr."%'";}
 			if(!empty($orderColumn) && !empty($orderType)){$orderby="order by ".$orderColumn." ".$orderType;}

			$lista = $this->presupuesto->getLista('COUNT', $page_mysql, $per_page, $where, $having);
			$data['data']['paging']['rowcount'] = $lista[0]->rowCount;
			$data['data']["items"] = $this->presupuesto->getLista('SELECT', $page_mysql, $per_page, $where, $having);
 			 			
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
 	public function getDetdocumentoByArticulo($data)
 	{
 		$result = null;
 		try
 		{
 			/**************************************************************************
 			 * FILTRAR EL NOMBRE DE LOS MATERIALES Y EQUIPOS CON VARIAS COINCIDENCIAS *
 			 **************************************************************************/
 			$art_nomb = ((isset($data['art_nomb']))?$data['art_nomb']:"");
 			$where = "";
 			if(isset($art_nomb) && !empty($art_nomb)){$where.="(prs.dscr='".$art_nomb."')";}

 			$data['data']["items"] = $this->presupuesto->getLista('SELECT', 0, 500, $where, "");
 			if(!isset($data['data']["items"][0]))
 			{
 				$arrText=explode(" ", $art_nomb);
 				$strBus=Array();
 				$idx=0;
 				for ($i=0; $i<count($arrText); $i++)
 				{
 					$strBus[$idx]="";
 					for ($ite=0; $ite<=$idx; $ite++)
 					{
 						$strBus[$idx].=$arrText[$ite];
 						if($ite<$idx){
 							$strBus[$idx].=" ";
 						}
 					}
 					$idx++;
 				}
 				$where = "";
 				if(isset($art_nomb) && !empty($art_nomb)){
 					for($ite=(count($strBus)-1); $ite>=0; $ite--)
 					{
 						$where="(prs.dscr like '%".$strBus[$ite]."%')";
 						$data['data']["items"] = $this->presupuesto->getLista('SELECT', 0, 500, $where, "");
 						if(isset($data['data']["items"][0])){break;}
 					}
 				}
 			}
 			$data['where']=$where;
 			$result = $data;
 			/********************************************************************************
 			 * FIN - FILTRAR EL NOMBRE DE LOS MATERIALES Y EQUIPOS CON VARIAS COINCIDENCIAS *
 			 ********************************************************************************/ 			
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>