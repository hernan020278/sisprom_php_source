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
 			$data = $this->getFiltro($data);//Inicio 
 			
 			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp","0")=="0")
 			{
 				/** *********************************
 				 * Obtener dominio de la propiedad
 				 ************************************/
 				$dtmp = Array();
 				$dtmp['prp_secc'] = $data['prp_secc'];
 				$dtmp['prp_nive'] = "1";
 				$dtmp['prp_codi'] = "0000";

 				$dtmp = $this->run("adm/GetListaPropiedad",$dtmp);

 				if(count($dtmp['lista']['items'])>0)
 				{
 					/**
 					 * Obtener propiedad
 					 *********************/
 					$data['prp_kypdr'] = $dtmp['lista']['items'][0]['prp_kyprp'];
 					$data['prp_nive'] = $dtmp['lista']['items'][0]['prp_nive'] + 1;
 					$data['prp_kysuc'] = $this->util->get($data,"suc_kysuc");
 					$data['prp_codi'] = $this->util->get($data,"prp_codi");
 					
 					$dtmp = Array();
 					$dtmp['prp_kycom'] = $this->util->get($data,"kycom");
 					$dtmp['prp_kysuc'] = $data['prp_kysuc'];
 					$dtmp['prp_codi'] = $data['prp_codi'];
 					$dtmp['prp_secc'] = $data['prp_secc'];
 					$dtmp['prp_prop'] = $data['prp_prop'];
 				
 					$dtmp = $this->run("adm/GetListaPropiedad",$dtmp);
 						
 					if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." Propiedad existe");}
 					else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)." Exito");}
 				
 					if($data['msg']['type']=="success")
 					{
 						$data['prp_kycom'] = $this->util->get($data,"kycom");
 						/**
 						 * Obtener la maxima numeracion para agregar al codigo
 						******************************************************/
 						
 						if(!$this->util->get($data,"prp_secc")=="NUMDOC")
 						{
 							$dtmp['sql'] = "select max(cast(prp_codi as unsigned))+1 prp_codi from erp_propiedad where prp_secc='".$data['prp_secc']."'";
 							$dtmp = $this->run("adm/GetListaPropiedad",$dtmp);
 							if(count($dtmp['lista']['items'])>0)
 							{
 								$data['prp_codi'] = str_pad($dtmp['lista']['items'][0]['prp_codi'], 4, "0", STR_PAD_LEFT);
 							}
 							else{$data['prp_codi'] = str_pad(1, 4, "0", STR_PAD_LEFT);}
 						}
 				
 						if($this->util->get($data,"prp_secc")=="TIPPDO"){$data['prp_esta'] = "0002";}
 						else {$data['prp_esta'] = "0001";}
 						 						
 						$data = $this->insert($data, "adm_propiedad");
 					}//if($data['msg']['type']=="success")
 				}else{$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No existe dominio");} 				
 			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
 			else if($this->util->get($data,"comando") == "MODIFICAR")
 			{
//  				$this->dbcn->iniciarTransaccion($data);
 				
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
//  				$this->dbcn->finalizarTransaccion($data);
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