<?php 
class CtrlCtacorriente extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['usu_kyusu'] = 199;
		$data = $this->run("adm/CtrlCtacorriente",$data);
		var_dump($data);
	}
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
 			$data = $this->getFiltro($data);//Inicio 

 			$this->dbcn->iniciarTransaccion($data);
 			
 			$is_trab = false;
 			$data_trab = array();
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cco_kycco","0")=="0")
 			{
 				/** *********************************
 				 * Validar existencia de Ctacorriente
 				 ************************************/ 				
 				$dtmp['cco_kycom'] = $this->util->get($data,"kycom");
				$dtmp['cco_tcta'] = $this->util->get($data,"cco_tcta");
				$dtmp['cco_tdoc'] = $this->util->get($data,"cco_tdoc");
				$dtmp['cco_ndoc'] = $this->util->get($data,"cco_ndoc");
				$dtmp = $this->run("adm/GetListaCtacorriente",$dtmp);
				 		 	
				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Ctacorriente existe");}
				else{$data['msg'] = Array("type"=>"success","text"=>"Exito");}
 				 				
 				if($data['msg']['type']=="success")
 				{
 					$data['cco_kycom'] = $this->util->get($data,"kycom");
 					$data['cco_esta'] = "0001";
 					$data = $this->insert($data, "adm_ctacorriente");
 				}
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"cco_kycco")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR")
 			{
 				if($this->util->get($data,"where")=="")
 				{
 					$data['where'] = "where cco_kycco='".$data['cco_kycco']."'";
 				}
 				$data = $this->update($data, "adm_ctacorriente");
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
 			{ 				 					
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where cco_kycco = '".$val['ky']."'";
					}
					$data = $this->delete($data, "adm_ctacorriente");
				}//foreach ($data['lisPrp'] as $key=>$val)
				
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['cco_kycco'] = $this->util->get($data,"cco_kycco");
 			
 			$this->dbcn->finalizarTransaccion(); 			
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>