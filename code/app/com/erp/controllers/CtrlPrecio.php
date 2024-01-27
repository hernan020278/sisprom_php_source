<?php 
class CtrlPrecio extends Controlador
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
 			
 			$data['prc'] = $this->dbcn->getObjectFromData($data, "precio");
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prc_kyprc","0")=="0")
 			{
 				/** *********************************
 				 * Obtener dominio de la propiedad
 				 ************************************/
 				$dtmp = Array();
 				$dtmp['prc_kyart'] = $data['prc']['prc_kyart'];
 				$dtmp['prc_kymrc'] = $data['prc']['prc_kymrc'];
 				$dtmp['prc_kyund'] = $data['prc']['prc_kyund'];
 				$dtmp['prc_kylpr'] = $data['prc']['prc_kylpr'];

 				$dtmp = $this->run("GetListaPrecio",$dtmp);

 				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\Registro existe");}
 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
 				
 				if($data['msg']['type']=="success")
 				{
 					$data = $this->insert($data['prc'], "erp_precio");
 				}//if($data['msg']['type']=="success")
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR")
 			{
 				if($this->util->get($data,"prp_secc")=="TIPPDO")
 				{
 					if($this->util->get($data,"where")=="")
 					{
 						$data['where'] = "where prp_kycom=".$_SESSION['com']['com_kycom']." and prp_kyprp='".$data['prp_kyprp']."'";
 					}
 					$data = $this->update($data, "adm_propiedad");
 					
 					if($this->util->get($data,"prp_secc")=="TIPPDO" && $this->util->get($data,"prp_esta")=="0001")
 					{
 						$dtmp['where'] = "where prp_kycom=".$_SESSION['com']['com_kycom']." and prp_kyprp<>'".$data['prp_kyprp']."' and prp_secc='TIPPDO' and prp_nive=2";
 						$dtmp['prp_esta'] = "0002";
 						$dtmp = $this->update($dtmp, "adm_propiedad");
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
 				$this->dbcn->iniciarTransaccion($data, "erp");
 				
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where prp_kyprp = '".$val['ky']."'";
					}
					$data = $this->delete($data, "adm_propiedad");
				}//foreach ($data['lisPrp'] as $key=>$val)
					
				$this->dbcn->finalizarTransaccion();

 			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
 			else
 			{
 				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
 			}

 			$result['msg'] = $data['msg'];
 			$result['prp_kyprp'] = $this->util->get($data,"prp_kyprp");
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>