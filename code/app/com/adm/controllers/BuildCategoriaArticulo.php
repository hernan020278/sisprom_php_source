<?php 
class BuildCategoriaArticulo extends Controlador 
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array(
			"dbapp" => "cmn",
			"modulo" => "controllers",
			"archivo" => "BuildCategoriaArticulo",
			"method" => "ejecutar",
			"pol_nive" => "3");
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
			$data['art_kycom'] = ( isset($_SESSION['com']) ? $_SESSION['com']['com_kycom'] : $data['art_kycom']);
			$data['sql'] = "SELECT prp.prp_codi, art.art_cate, art.art_clas FROM adm_articulo art INNER JOIN adm_propiedad prp ON prp.prp_prop=art.art_cate WHERE 1=1 AND art.art_kycom='".$data['art_kycom']."' AND prp.prp_kycom='".$data['art_kycom']."' GROUP BY prp.prp_codi, art_cate, art_clas ORDER BY prp.prp_codi ASC";

			$data = $this->run("adm/GetListaArticulo",$data);
			$list = $data['lista']['items'];
			$rpta = array();
			if(count($list)>0){
				foreach($list as $item){
					$item = (Array) $item;
			
					if(!isset($rpta['liscat'][$item['prp_codi']]))
					{
						$rpta['liscat'][$item['prp_codi']]=Array();
						$rpta['liscat'][$item['prp_codi']]['liscls']=Array();
					}
					$rpta['liscat'][$item['prp_codi']]['nomb']=$item['art_cate'];
						
					if(!isset($rpta['liscat'][$item['prp_codi']]['liscls'][$item['art_clas']]))
					{
						$rpta['liscat'][$item['prp_codi']]['liscls'][$item['art_clas']]=Array();
					}
					$rpta['liscat'][$item['prp_codi']]['liscls'][$item['art_clas']]['nomb']=$item['art_clas'];
				}//foreach($list as $item){
			}//if(count($list)>0){		

			$data['msg'] = ( ( isset($rpta['liscat']) && count($rpta['liscat']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
			$result['msg'] = $data['msg'];
			$result['liscat'] = $rpta['liscat'];

			//$this->listaMenuAyuda($result['liscat'], "");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>