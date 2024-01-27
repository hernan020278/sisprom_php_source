<?php 
class GetListaDetdocumento extends Controlador
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
			
			if($this->util->exist($data,'dtd_kydoc')){$where.=" and dtd.dtd_kydoc='".$data['dtd_kydoc']."'";}
						
			if($this->util->get($data,'text')!=""){$where.=" and (doc.dtd_tdoc='".$data['text']."' or doc.dtd_ndoc='".$data['text']."' or doc.dtd_enom='".$data['text']."' or doc.dtd_esta='".$data['text']."')";}
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT dtd.dtd_kydtd, dtd.dtd_kydoc, dtd.dtd_kyart, dtd.dtd_kcod, dtd.dtd_acod, dtd.dtd_cant, 
          dtd.dtd_unid, dtd.dtd_dscr, dtd.dtd_pund, dtd.dtd_dcto, dtd.dtd_pdto, dtd.dtd_impo, dtd.dtd_ingr, 
          dtd.dtd_egre, dtd.dtd_sact, dtd.dtd_pant, dtd.dtd_pcos, dtd.dtd_valo, dtd.dtd_esta, dtd.dtd_vers 
          FROM erp_detdocumento dtd ".$where;
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>