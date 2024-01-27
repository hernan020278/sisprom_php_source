<?php 
class GetListaMatricula extends Controlador
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
			
			if($this->util->exist($data,'mtr_kymtr')){$where.=" and (mtr.mtr_kymtr = '".$data['mtr_kymtr']."')";}
			if($this->util->exist($data,'prg_kyprg')){$where.=" and (prg.prg_kyprg = '".$data['prg_kyprg']."')";}
			if($this->util->exist($data,'mtr_kyalu')){$where.=" and (mtr.mtr_kyalu = '".$data['mtr_kyalu']."')";}
			if($this->util->exist($data,'mtr_kysuc')){$where.=" and (mtr.mtr_kysuc = '".$data['mtr_kysuc']."')";}
			if($this->util->exist($data,'mtr_peri')){$where.=" and (mtr.mtr_peri = '".$data['mtr_peri']."')";}
			if($this->util->exist($data,'mtr_turn')){$where.=" and (mtr.mtr_turn = '".$data['mtr_turn']."')";}
			if($this->util->exist($data,'mtr_aula')){$where.=" and (mtr.mtr_aula = '".$data['mtr_aula']."')";}
			
			if($this->util->get($data,'mtr_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'mtr_esta') && $this->util->get($data,'mtr_esta')!="TODOS")
				{
					$where.=" and mtr.mtr_esta = '".$data['mtr_esta']."'";
				}
				else{$where.=" and mtr.mtr_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (mtr.mtr_dscr like '%')";
						break;
					default:
						$where.=" and (mtr.mtr_dscr like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT alu.usu_kyusu alu_kyusu, alu.usu_ndoc alu_ndoc, alu.usu_nomb, alu.usu_foto alu_foto, 
                mtr.mtr_kymtr, mtr.mtr_kyalu, mtr.mtr_kysuc, mtr.mtr_freg, mtr.mtr_fini, mtr.mtr_ffin, mtr.mtr_peri, mtr.mtr_turn, mtr.mtr_aula, mtr.mtr_esta, mtr.mtr_vers,
				prg.prg_kyprg, prg.prg_nomb, prg.prg_grad, prg.prg_nive
				FROM cmn_usuario alu 
                INNER JOIN clg_matricula mtr ON alu.usu_kyusu = mtr.mtr_kyalu 
                INNER JOIN clg_programa prg ON prg.prg_kyprg = mtr.mtr_kyprg ".$where. " ORDER BY mtr.mtr_freg ASC";
			}

			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("mtr_kymtr"=>"", "mtr_dscr"=>"Seleccione", "mtr_dscr"=>"", "mtr_auto"=>"");
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