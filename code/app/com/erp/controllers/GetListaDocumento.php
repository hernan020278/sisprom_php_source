<?php 
class GetListaDocumento extends Controlador
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
			
			$where = "where 1=1";
			
			if($this->util->exist($data,'doc_kydoc')){$where.=" and doc.doc_kydoc='".$data['doc_kydoc']."'";}
			if($this->util->exist($data,'doc_kycom')){$where.=" and doc.doc_kycom='".$data['doc_kycom']."'";}
			if($this->util->exist($data,'doc_kyusu')){$where.=" and doc.doc_kyusu='".$data['doc_kyusu']."'";}
			if($this->util->exist($data,'doc_nive')){$where.=" and doc.doc_nive='".$data['doc_nive']."'";}
			if($this->util->exist($data,'doc_tope')){$where.=" and doc.doc_tope='".$data['doc_tope']."'";}
			if($this->util->exist($data,'doc_tdoc')){$where.=" and doc.doc_tdoc='".$data['doc_tdoc']."'";}
			if($this->util->exist($data,'doc_ndoc')){$where.=" and doc.doc_ndoc='".$data['doc_ndoc']."'";}
			
			if( $this->util->esdato($data,'doc_fini') && $this->util->esdato($data,'doc_ffin') )
			{
			  $where.=" AND DATE(doc.doc_femi)>='".$data['doc_fini']."' AND DATE(doc.doc_femi)<='".$data['doc_ffin']."'";
			}
			else if($this->util->esdato($data,'doc_fini') && !$this->util->esdato($data,'doc_ffin'))
			{
			  $where.=" AND DATE(doc.doc_femi)<'".$data['doc_fini']."'";
			}
			
			if($this->util->get($data,'main_sel_sucu')=="1")
			{
			  $where.=" and doc.doc_kysuc='".$data['main_kysuc']."'";
			}
			
			if($this->util->get($data,'doc_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'doc_esta') && $this->util->get($data,'doc_esta')!="TODOS")
				{
					$where.=" and doc.doc_esta = '".$data['doc_esta']."'";
				}
				else{$where.=" and doc.doc_esta = 'APROBADO'";}
			}
			
			if($this->util->get($data,'text')!=""){$where.=" and (doc.doc_tdoc='".$data['text']."' or doc.doc_ndoc='".$data['text']."' or doc.doc_enom='".$data['text']."' or doc.doc_esta='".$data['text']."')";}

      if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
      {
        switch(strlen($this->util->get($data,'term'))){
          case 1:
            $where.=" AND doc.doc_ndoc LIKE '%'";
            break;
          default:
            $where.=" AND doc.doc_ndoc LIKE '%".$data['term']."%'";
            break;
        }//switch(strlen($this->util->get($data,'term'))){
      }

			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT
          doc.doc_kydoc, doc.doc_kycom, doc.doc_kysuc, doc.doc_kyusu, 
          doc.doc_kyent, doc.doc_kykrf, doc.doc_kcod, doc.doc_tope, 
          doc.doc_tdoc, doc.doc_ndoc, doc.doc_fact, doc.doc_guia, 
          doc.doc_tcon, doc.doc_cigv, doc.doc_etdo, doc.doc_endo, 
          doc.doc_enom, doc.doc_edir, doc.doc_femi, doc.doc_tven, 
          doc.doc_fpag, doc.doc_tmon, doc.doc_dcto, doc.doc_tsub, 
          doc.doc_tigv, doc.doc_tota, doc.doc_dimp, doc.doc_fimg, 
          doc.doc_tpag, doc.doc_esta, doc.doc_vers,
          suc.suc_nomb, usu.usu_ndoc, usu.usu_nomb
        FROM cmn_usuario usu
        INNER JOIN erp_documento doc ON doc.doc_kyusu=usu.usu_kyusu
        INNER JOIN adm_sucursal suc ON suc.suc_kysuc=doc.doc_kysuc ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);

			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("doc_kydoc"=>"","doc_tope"=>"Seleccione","doc_tdoc"=>"Seleccione","doc_ndoc"=>"Seleccione","doc_enom"=>"Seleccione","doc_tota"=>"","doc_tpag"=>"");
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
 	public function obtenerTotalPeriodo($data)
 	{
 	  $result = null;
 	  try
 	  {
 	    $dtmp = Array("lista"=>Array());
 	    
 	    $data['sql'] = "SELECT DATE(doc.doc_femi) AS doc_femi, SUM(doc.doc_tota) AS doc_tota
        FROM cmn_usuario ent 
        INNER JOIN erp_documento doc ON doc.doc_kyusu=ent.usu_kyusu
        WHERE 1=1 AND DATE(doc.doc_femi)>='".$data['doc_fini']."' AND DATE(doc.doc_femi)<='".$data['doc_ffin']."'
        AND doc.doc_tope = 'VENTA'        
        GROUP BY DATE(doc.doc_femi)";
 	    $data = $this->getLista($data);
 	    
 	    $dtmp['lista']['listaVentasDB'] = $data['lista']['items'];
 	    
 	    $data['sql'] = "SELECT DATE(doc.doc_femi) AS doc_femi, SUM(doc.doc_tota) AS doc_tota
        FROM cmn_usuario ent
        INNER JOIN erp_documento doc ON doc.doc_kyusu=ent.usu_kyusu
        WHERE 1=1 AND DATE(doc.doc_femi)>='".$data['doc_fini']."' AND DATE(doc.doc_femi)<='".$data['doc_ffin']."'
        AND doc.doc_tope = 'COMPRA'
        GROUP BY DATE(doc.doc_femi)";
 	    $data = $this->getLista($data);
 	    
 	    $dtmp['lista']['listaComprasDB'] = $data['lista']['items'];
 	    
 	    $dtmp['msg'] = ((count($dtmp['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
 	    
 	    $result['lista'] = $dtmp['lista'];
 	    $result['msg'] = $dtmp['msg'];
 	  } catch (Exception $e) {
 	    throw $e;
 	  }
 	  return $result;
 	}

 	public function validarArticuloEnDocumento($data)
 	{
 		$result = null;
 		try
 		{
			$doc_tope = ($data['doc_tope']=="VENTA") ? "COMPRA" : "VENTA";
 		  
	    $data['sql'] = "SELECT tmpArtDocAct.art_kyart, tmpArtDocAct.art_nomb FROM 
			(SELECT dtd.dtd_kyart art_kyart, dtd.dtd_dscr art_nomb FROM erp_documento doc INNER JOIN erp_detdocumento dtd ON dtd.dtd_kydoc = doc.doc_kydoc WHERE doc.doc_kycom = ".$data['doc_kycom']." AND doc.doc_kydoc = ".$data['doc_kydoc'].") AS tmpArtDocAct
			INNER JOIN
				(SELECT dtd.dtd_kyart art_kyart, dtd.dtd_dscr art_nomb FROM erp_documento doc INNER JOIN erp_detdocumento dtd ON dtd.dtd_kydoc = doc.doc_kydoc WHERE doc.doc_kycom = ".$data['doc_kycom']." AND doc.doc_tope = '".$doc_tope."' AND doc.doc_femi >= '".$data['doc_femi']."') AS tmpArtDocBus
			ON tmpArtDocAct.art_kyart = tmpArtDocBus.art_kyart
			INNER JOIN 
				(SELECT art.art_kyart, art.art_nomb FROM adm_articulo art) AS tmpArt 
			ON tmpArtDocBus.art_kyart = tmpArt.art_kyart";

	    $data = $this->getLista($data);

 			$data['msg'] = ((count($data['lista']['items']) == 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Existe un articulo ".($doc_tope=="VENTA" ? "VENDIDO" : "COMPRADO")) );
 			
 			$result['lista'] = $data['lista'];
 			$result['msg'] = $data['msg'];
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}	
}
?>