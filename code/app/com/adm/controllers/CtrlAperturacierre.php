<?php 
class CtrlAperturacierre extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

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

			$this->dbcn->iniciarTransaccion($data);

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"apc_kyapc","0")=="0")
			{
				$dtmp = Array();
				$dtmp['apc_kycom'] = $this->util->get($data,"apc_kycom");
				$dtmp['apc_kysuc'] = $this->util->get($data,"apc_kysuc");
				$dtmp['apc_kyusu'] = $this->util->get($data,"apc_kyusu");
				$dtmp['suc_tipo'] = "CAGE";
				$dtmp = $this->run("adm/GetListaAperturacierre",$dtmp);
					
				if(count($dtmp['lista']['items'])>0)
				{
				    $data['msg'] = Array("type"=>"error","text"=>"Clase : ".get_class($this)."\nRegistro existe");
				    $data['apc'] = $dtmp['lista']['items'][0];
				}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase : ".get_class($this)."\nExito");}

				if($data['msg']['type']=="success")
				{
				    $data['apc_esta'] = "0001";
				    $data = $this->insert($data, "adm_aperturacierre");
					$data['apc'] = $this->dbcn->getObjectFromData($data, "adm_aperturacierre");

					$dtmp = Array();
					$dtmp['ope_kycom'] = $data['apc_kycom'];
					$dtmp['ope_kyapc'] = $data['apc_kyapc'];
					$dtmp['ope_peri'] = $data['apc_fini'];;
					$dtmp['ope_freg'] = $data['apc_fini'];
					$dtmp['ope_fope'] = $data['apc_fini'];
					$dtmp['ope_fpag'] = $data['apc_fini'];
					$dtmp['ope_tope'] = "APERTURA";//[0019: APERTURA]
					$dtmp['ope_tdoc'] = "0029";//[0029: RECIBO CAJA]
					$dtmp['ope_ndoc'] = '0-0';
					$dtmp['ope_otip'] = "APERTURA";
					$dtmp['ope_mmon'] = "0001";
					$dtmp['ope_mimp'] = 0.00;
					$dtmp['ope_tcam'] = "CANCELA";
					$dtmp['ope_debe'] = 0.00;
					$dtmp['ope_habe'] = 0.00;
					$dtmp['ope_pobs'] = "APERTURA DE CAJA";
					$dtmp = $this->insert($dtmp, "adm_operacion");
				}
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"apc_kyapc")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				if($this->util->get($data,"apc_secc")=="TIPPDO")
				{
					if($this->util->get($data,"where")==""){
						$data['where'] = "where apc_kycom=".$_SESSION['com']['com_kycom']." and apc_kyapc='".$data['apc_kyapc']."'";
					}
					$data = $this->update($data, "adm_propiedad");

					if($this->util->get($data,"apc_secc")=="TIPPDO" && $this->util->get($data,"apc_esta")=="0001")
					{
						$dtmp['where'] = "where apc_kycom=".$_SESSION['com']['com_kycom']." and apc_kyapc<>'".$data['apc_kyapc']."' and apc_secc='TIPPDO' and apc_nive=2";
						$dtmp['apc_esta'] = "0002";
						$dtmp = $this->update($dtmp, "adm_propiedad");
					}
				}
				else if($this->util->get($data,"apc_secc")=="TIPBNC")
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where apc_kycom='".$_SESSION['com']['com_kycom']."' and apc_kyapc='".$data['apc_kyapc']."'";
					}
					$data = $this->update($data, "adm_propiedad");

					if($this->util->get($data,"apc_secc")=="TIPBNC")
					{
						$dtmp['where'] = "where apc_kybnc='".$data['apc_kyapc']."'";
						$dtmp['apc_dscr'] = $data['apc_prop'];
						$dtmp = $this->update($dtmp, "adm_ctacorriente");
					}
				}
				else
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where apc_kyapc='".$data['apc_kyapc']."'";
					}
					$data = $this->update($data, "adm_propiedad");
				}
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"apc_kyapc")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where apc_kyapc = '".$val['ky']."'";
					}
					$data = $this->delete($data, "adm_propiedad");
				}//foreach ($data['lisPrp'] as $key=>$val)
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['apc'] = $data['apc'];
			$result['apc_kyapc'] = $data['apc_kyapc'];
			$this->dbcn->finalizarTransaccion($data);
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}

}
?>