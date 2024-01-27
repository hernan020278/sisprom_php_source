<?php 
class GetListaAsignatura extends Controlador
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
			
			if($this->util->exist($data,'mtr_kysuc')){$where.=" and (mtr.mtr_kysuc = '".$data['mtr_kysuc']."')";}
			if($this->util->exist($data,'mtr_kyprg')){$where.=" and (mtr.mtr_kyprg = '".$data['mtr_kyprg']."')";}
 			if($this->util->exist($data,'asg_kyasg')){$where.=" and (asg.asg_kyasg = '".$data['asg_kyasg']."')";}
			if($this->util->exist($data,'asg_kymtr')){$where.=" and (asg.asg_kymtr = '".$data['asg_kymtr']."')";}
			if($this->util->exist($data,'asg_kypfo')){$where.=" and (asg.asg_kypfo = '".$data['asg_kypfo']."')";}
			if($this->util->exist($data,'pfo_nomb')){$where.=" and (pfo.usu_nomb like '%".$data['pfo_nomb']."%')";}
			if($this->util->exist($data,'mtr_peri')){$where.=" and (mtr.mtr_peri = '".$data['mtr_peri']."')";}
			if($this->util->exist($data,'mtr_turn')){$where.=" and (mtr.mtr_turn = '".$data['mtr_turn']."')";}
			if($this->util->exist($data,'mtr_aula')){$where.=" and (mtr.mtr_aula = '".$data['mtr_aula']."')";}
			if($this->util->exist($data,'asg_nomb')){$where.=" and (asg.asg_nomb = '".$data['asg_nomb']."')";}
			if($this->util->exist($data,'evl_prop')){$where.=" and (evl.evl_prop = '".$data['evl_prop']."')";}

			if($this->util->get($data,'asg_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'asg_esta') && $this->util->get($data,'asg_esta')!="TODOS")
				{
					$where.=" and asg.asg_esta = '".$data['asg_esta']."'";
				}
				else{$where.=" and asg.asg_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (asg.asg_nomb like '%')";
						break;
					default:
						$where.=" and (asg.asg_nomb like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			

			if($this->util->get($data,'sql')=="")
			{
			    if($this->util->get($data,'cntInt')=="")
			    {
			        $data['sql'] = "SELECT alu.usu_kyusu alu_kyusu, alu.usu_ndoc alu_ndoc, alu.usu_nomb alu_nomb,
                    pfo.usu_kyusu pfo_kyusu, pfo.usu_ndoc pfo_ndoc, pfo.usu_nomb pfo_nomb, pfo.usu_foto pfo_foto,
                    mtr.mtr_peri, mtr.mtr_turn, mtr.mtr_aula, mtr.mtr_freg, mtr.mtr_fini, mtr.mtr_ffin,
                    asg.asg_kyasg, asg.asg_kymtr, asg_kypfo, asg.asg_kyevl, asg.asg_nomb, asg.asg_vers,
                    evl.prp_kyprp evl_kyprp, evl.prp_secc evl_secc, evl.prp_prop evl_prop, evl.prp_valu evl_valu, evl.prp_dscr evl_dscr
                    FROM clg_asignatura asg
                    INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
                    INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
                    INNER JOIN cmn_usuario pfo ON pfo.usu_kyusu=asg.asg_kypfo
                    LEFT JOIN adm_propiedad evl ON evl.prp_kyprp=asg.asg_kyevl
                    ".$where."
                    GROUP BY alu.usu_kyusu, alu.usu_ndoc, alu.usu_nomb, 
                    pfo.usu_kyusu, pfo.usu_ndoc, pfo.usu_nomb, pfo.usu_foto,
                    mtr.mtr_peri, mtr.mtr_turn, mtr.mtr_aula, mtr.mtr_freg, mtr.mtr_fini, mtr.mtr_ffin,
                    asg.asg_kyasg, asg.asg_kymtr, asg_kypfo, asg.asg_nomb, asg.asg_vers,
                    evl.prp_kyprp, evl.prp_secc, evl.prp_prop, evl.prp_valu, evl.prp_dscr ASC";
			    }
			    else 
			    {
			        $data['sql'] = "SELECT alu.usu_kyusu alu_kyusu, alu.usu_ndoc alu_ndoc, alu.usu_nomb alu_nomb,
    				pfo.usu_kyusu pfo_kyusu, pfo.usu_ndoc pfo_ndoc, pfo.usu_nomb pfo_nomb, pfo.usu_foto pfo_foto,
    				mtr.mtr_peri, mtr.mtr_turn, mtr.mtr_aula, mtr.mtr_freg, mtr.mtr_fini, mtr.mtr_ffin,
    				asg.asg_kyasg, asg.asg_kymtr, asg_kypfo, asg.asg_nomb, asg.asg_vers,
    				evl.prp_kyprp evl_kyprp, evl.prp_secc evl_secc, evl.prp_prop evl_prop, evl.prp_valu evl_valu, evl.prp_dscr evl_dscr
    				FROM clg_asignatura asg
    				INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
    				INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
    				INNER JOIN cmn_usuario pfo ON pfo.usu_kyusu=asg.asg_kypfo
    				LEFT JOIN adm_propiedad evl ON evl.prp_kyprp=asg.asg_kyevl
    				".$where."
    				GROUP BY  alu.usu_kyusu, alu.usu_ndoc, alu.usu_nomb,
                    pfo.usu_kyusu, pfo.usu_ndoc, pfo.usu_nomb, pfo.usu_foto,
    				mtr.mtr_peri, mtr.mtr_turn, mtr.mtr_aula, mtr.mtr_freg, mtr.mtr_fini, mtr.mtr_ffin,
    				asg.asg_kyasg, asg.asg_kymtr, asg_kypfo, asg.asg_nomb, asg.asg_vers,
    				evl.prp_kyprp, evl.prp_secc, evl.prp_prop, evl.prp_valu, evl.prp_dscr ASC";
			    }
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("asg_kyasg"=>"", "asg_nomb"=>"Seleccione", "asg_nomb"=>"", "asg_auto"=>"");
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