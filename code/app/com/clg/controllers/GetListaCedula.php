<?php 
class GetListaCedula extends Controlador
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
			
			if($this->util->exist($data,'cdu_kypfo')){$where.=" and (cdu.cdu_kypfo = '".$data['cdu_kypfo']."')";}
			if($this->util->exist($data,'cdu_prof')){$where.=" and (cdu.cdu_prof = '".$data['cdu_prof']."')";}
			
			if($this->util->get($data,'cdu_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'cdu_esta') && $this->util->get($data,'cdu_esta')!="TODOS")
				{
					$where.=" and cdu.cdu_esta = '".$data['cdu_esta']."'";
				}
				else{$where.=" and cdu.cdu_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (pfo.usu_nomb like '%')";
						break;
					default:
						$where.=" and (pfo.usu_nomb like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT cdu.cdu_kycdu, cdu.cdu_kypfo cdu_kypfo,
					pfo.usu_nomb cdu_prof, cdu.cdu_fing, cdu.cdu_asig, 
					cdu.cdu_suel, cdu.cdu_dscr, cdu.cdu_esta, cdu.cdu_vers
					FROM clg_cedula cdu INNER JOIN cmn_usuario pfo ON pfo.usu_kyusu=cdu.cdu_kypfo ".$where. " ORDER BY cdu.cdu_fing ASC";
			}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("cdu_kycdu"=>"", "cdu_codi"=>"Seleccione", "cdu_prof"=>"Seleccione", "cdu_asig"=>"", "cdu_auto"=>"");
					array_push($lista, $obj);
					if(count($data['lista']['items'])>0){$data['lista']['items'] = array_merge($lista,$data['lista']['items']);}
					else{$data['lista']['items']=$lista;}
					if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 1 ){$data['lista']['items'] = Array();}
				}//if($data['mostrarSeleccion'])
				else{if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 0 ){$data['lista']['items'] = Array();}}
			}//if($this->util->get($data,'term')=="Seleccione")
					
			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	} 	
}
?>