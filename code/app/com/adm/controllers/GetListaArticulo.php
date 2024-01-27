<?php 
class GetListaArticulo extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index($data)
	{
		return $this->ejecutar($data);
	}
	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";
			
			$where = "WHERE 1=1";
			
		  if($this->util->esdato($data,'art_kycom')){$where.=" AND art.art_kycom='".$data['art_kycom']."'";}
			if($this->util->esdato($data,'art_kyart')){$where.=" AND art.art_kyart='".$data['art_kyart']."'";}
			if($this->util->esdato($data,'art_kysuc')){$where.=" AND art.art_kyart='".$data['art_kysuc']."'";}
			if($this->util->esdato($data,'art_codi')){$where.=" AND art.art_codi='".$data['art_codi']."'";}
			if($this->util->esdato($data,'art_codi_in')){$where.=" AND art.art_codi IN (".$data['art_codi_in'].")";}
			if($this->util->esdato($data,'art_iden')){$where.=" AND art.art_iden='".$data['art_iden']."'";}
			if($this->util->esdato($data,'art_nomb')){$where.=" AND ( art.art_nomb LIKE '".$data['art_nomb']."%' OR art.art_nomb LIKE '%".$data['art_nomb']."%')";}
			if($this->util->esdato($data,'art_marc')){$where.=" AND art.art_marc='".$data['art_marc']."'";}
			if($this->util->esdato($data,'art_cate')){$where.=" AND art.art_cate='".$data['art_cate']."'";}
			if($this->util->esdato($data,'art_clas')){$where.=" AND art.art_clas='".$data['art_clas']."'";}
			if($this->util->esdato($data,'art_sact') && $data['art_sact'] > -1){( ($data['art_sact']==0) ? "" : $where.=" AND art.art_sact > 0");}
			if($this->util->get($data,'art_esta')=="OFERTA")
			{
				$where.=" AND ( art.art_esta='0002' OR art.art_esta='0003' )";
			}
			else if($this->util->get($data,'art_esta')=="CATALOGO")
			{
				$where.=" AND ( art.art_esta='0001' OR art.art_esta='0004' )";
			}
			else if(  strpos($this->util->esdato($data,'art_esta'), "000") > -1 )
			{
				$where.=" AND art.art_esta='".$data['art_esta']."'";
			}
			
			if($this->util->get($data,'text')!=""){$where.=" AND (art.art_nomb LIKE '%".$data['text']."%')";}
			
 			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" AND (art.art_nomb LIKE '%' or art.art_nomb LIKE '%')";
						break;
					default:
						$where.=" AND ( CONCAT(art.art_nomb, ' ', art.art_pres, ' ', art.art_conc) LIKE '%".$data['term']."%' or CONCAT(art.art_nomb, ' ', art.art_pres, ' ', art.art_conc) LIKE '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}
			
			if($this->util->get($data,'sql')=="")
			{
					$data['sql'] = "SELECT art_kyart, art_codi, art_iden, art_nomb, art_marc, art_cate, art_clas, art_dscr, art_pres, 
					art_conc, art_titu, art_frsn, art_unid, art_sact, art_pcos, art_pund
          FROM viewstockarticulolocal art ".$where;
				// if($this->util->get($data,'art_sact')=="-1")
				// {
				// 	$data['sql'] = "SELECT art_kyart,art_kycom,art_codi,art_iden,art_clas,art_cate,art_marc,art_unid,art_nomb,
				// 	art_dscr,art_sact,art_pcos, art_pund, art_impo,art_nlff,art_nsff,art_pres,art_conc,art_frsn,
				// 	art_nrsn,art_titu,art_colo,art_foto,art_fill,art_esta,art_vers
				// 	FROM adm_articulo art ".$where;
				// }
			}
			else{$data['sql'] = $data['sql'];}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("art_kyart"=>"","art_nomb"=>"Seleccione","art_codi"=>"Seleccione","art_pund"=>0.00,
					  "art_tipo"=>"PRODUCTO","art_dscr"=>"DESCRIPCION","art_pres"=>"PRESENTACION","art_conc"=>"CONCENTRACION",
					  "art_titu"=>"TITULAR","art_frsn"=>"FECHA REGISTRO","art_cate"=>"CATEGORIA","art_sact"=>0);
					array_push($lista, $obj);
					if(count($data['lista']['items'])>0){$data['lista']['items'] = array_merge($lista,$data['lista']['items']);}
					else{$data['lista']['items']=$lista;}
					if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 1 ){$data['lista']['items'] = Array();}
				}//if($data['mostrarSeleccion'])
				else{if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 0 ){$data['lista']['items'] = Array();}}
				
			}
					
			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
	
 	public function getStockArticuloLocal($data)
 	{
 		$result = null;
 		try
 		{
 		  $iteRsp = Array("art_kyart"=>0, "art_pcos"=>0, "art_sact"=>0, "suc_sact"=>0);
 		  
	    $data['sql'] = "SELECT vsa.art_kyart, vsa.art_pcos, vsa.art_sact FROM viewstockarticulolocal vsa WHERE vsa.art_kycom=".$data['art_kycom']." AND vsa.art_kyart = ". $data['art_kyart'];
	    $data = $this->getLista($data);
	    if(count($data['lista']['items']) > 0){
	      $iteRsp['art_kyart'] = $this->util->get($data['lista']['items'][0], "art_kyart", $data['art_kyart']);
	      $iteRsp['art_pcos'] = $this->util->get($data['lista']['items'][0], "art_pcos", 0);
	      $iteRsp['art_sact'] = $this->util->get($data['lista']['items'][0], "art_sact", 0);
	    }
	    
	    $data['lista']['items'][0]= $iteRsp;
	    
 			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
 			
 			$result['lista'] = $data['lista'];
 			$result['msg'] = $data['msg'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}

 	public function getValorizadoArticulo($data)
 	{
 		$result = null;
 		try
 		{
 		  $iteRsp = Array("valorizado"=>0);
 		  
	    $data['sql'] = "SELECT SUM(art_sact * art_pcos) valorizado FROM viewstockarticulolocal vsa WHERE vsa.art_kycom=".$data['art_kycom']." AND vsa.art_sact > 0";
	    $data = $this->getLista($data);
	    if(count($data['lista']['items']) > 0){
	      $iteRsp['valorizado'] = $this->util->get($data['lista']['items'][0], "valorizado", 0);
	    }
	    
	    $data['lista']['items'][0]= $iteRsp;
	    
 			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
 			
 			$result['lista'] = $data['lista'];
 			$result['msg'] = $data['msg'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>