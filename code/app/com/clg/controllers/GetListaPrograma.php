<?php 
class GetListaPrograma extends Controlador
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
			
			if($this->util->exist($data,'prg_kycom')){$where.=" and (prg.prg_kycom = '".$data['prg_kycom']."')";}
			if($this->util->exist($data,'prg_kyprg')){$where.=" and (prg.prg_kyprg = '".$data['prg_kyprg']."')";}
			if($this->util->exist($data,'prg_nomb')){$where.=" and (prg.prg_nomb = '".$data['prg_nomb']."')";}
			if($this->util->exist($data,'prg_grad')){$where.=" and (prg.prg_grad = '".$data['prg_grad']."')";}
			if($this->util->exist($data,'prg_nive')){$where.=" and (prg.prg_nive = '".$data['prg_nive']."')";}
			
			if($this->util->get($data,'prg_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'prg_esta') && $this->util->get($data,'prg_esta')!="TODOS")
				{
					$where.=" and prg.prg_esta = '".$data['prg_esta']."'";
				}
				else{$where.=" and prg.prg_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (prg.prg_dscr like '%')";
						break;
					default:
						$where.=" and (prg.prg_dscr like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT prg.prg_kyprg, prg.prg_kycom, prg.prg_nomb, 
				prg.prg_grad, prg.prg_nive, prg.prg_impo, prg.prg_esta, prg.prg_vers 
				FROM clg_programa prg ".$where. " ORDER BY prg.prg_nomb ASC";
			}

			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("prg_kyprg"=>"", "prg_nomb"=>"Seleccione", "prg_nomb"=>"", "prg_auto"=>"");
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