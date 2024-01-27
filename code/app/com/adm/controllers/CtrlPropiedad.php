<?php 
class CtrlPropiedad extends Controlador
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
 			$data = $this->getFiltro($data);
 			$this->dbcn->iniciarTransaccion($data);
 			$data['prp_kycom'] = $_SESSION['com']['com_kycom'];
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp","0")=="0")
 			{
 				$dtmp = Array();
 				$dtmp['prp_secc'] = $this->util->get($data, "prp_secc");
 				$dtmp['prp_prop'] = $this->util->get($data, "prp_prop");
 				$dtmp['prp_dscr'] = $this->util->get($data, "prp_dscr");
 				$dtmp['prp_nive'] = $this->util->get($data, "prp_nive");

 				$dtmp = $this->run("adm/GetListaPropiedad",$dtmp);

 				if(count($dtmp['lista']['items'])>0)
 				{
 				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
 				    $data['prp_kyprp'] = $dtmp['lista']['items'][0]['prp_kyprp'];
 				    $data['prp'] = $dtmp['lista']['items'][0];
 				}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}
 				
  				if($data['msg']['type']=="success")
 				{
					$data = $this->insert($data, "adm_propiedad");
					$data['prp'] = $this->dbcn->getObjectFromData($data, "adm_propiedad");
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
 			{
 				if($this->util->get($data,"prp_secc")=="TIPPDO")
 				{
 					if($this->util->get($data,"where")==""){$data['where'] = "where prp_kycom=".$_SESSION['com']['com_kycom']." and prp_kyprp='".$data['prp_kyprp']."'";}
 					$data = $this->update($data, "adm_propiedad");
 					
 					if($this->util->get($data,"prp_secc")=="TIPPDO" && $this->util->get($data,"prp_esta")=="0001")
 					{
 						$dtmp['where'] = "where prp_kycom=".$_SESSION['com']['com_kycom']." and prp_kyprp<>'".$data['prp_kyprp']."' and prp_secc='TIPPDO' and prp_nive=2";
 						$dtmp['prp_esta'] = "0002";
 						$dtmp = $this->update($dtmp, "adm_propiedad");
 					}
 				}
 				else if($this->util->get($data,"prp_secc")=="TIPBNC")
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where prp_kycom='".$_SESSION['com']['com_kycom']."' and prp_kyprp='".$data['prp_kyprp']."'";
 					}
 					$data = $this->update($data, "adm_propiedad");
 				
 					if($this->util->get($data,"prp_secc")=="TIPBNC")
 					{
 						$dtmp['where'] = "where cco_kybnc='".$data['prp_kyprp']."'";
 						$dtmp['cco_dscr'] = $data['prp_prop'];
 						$dtmp = $this->update($dtmp, "adm_ctacorriente");
 					}
 				}
 				else 
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where prp_kyprp='".$data['prp_kyprp']."'";
 					}
 					$data = $this->update($data, "adm_propiedad");
 				}
 			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
 			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
 			{
 				foreach ($data['lisKy'] as $key=>$val)
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where prp_kypdr = '".$val['ky']."'";
 						$data = $this->delete($data, "adm_propiedad");
 				
 						$data['where'] = "where prp_kyprp = '".$val['ky']."'";
 						$data = $this->delete($data, "adm_propiedad");
 					}
 				}//foreach ($data['lisPrp'] as $key=>$val)
 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['prp_kyprp'] = $this->util->get($data, "prp_kyprp");
 			$result['prp'] = $this->util->get($data, "prp");
 			
 			$this->dbcn->finalizarTransaccion($data);
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>