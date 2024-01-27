<?php 
class CtrlNota extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['nta_kynta'] = 199;
		$data = $this->run("CtrlNota",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"nta_kynta","0")=="0")
			{
// 				$dtmp = Array();
// 				$dtmp['nta_kynta'] = $data['nta_kyalb'];
// 				$dtmp['nta_auto'] = $data['nta_auto'];
// 				$dtmp['nta_nomb'] = $data['nta_nomb'];				
// 				$dtmp = $this->run("mus/GetListaLetra",$dtmp);					
// 				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");}
// 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
// 				if($data['msg']['type']=="success")
// 				{
					$data['nta_esta'] = "0001";
					$data = $this->insert($data, "mus_nota");
// 				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				$this->dbcn->iniciarTransaccion($data);

				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where nta_kynta='".$data['nta_kynta']."'";
				}
				$data = $this->update($data, "mus_nota");
					
				$this->dbcn->finalizarTransaccion($data);
					
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR")
			{
				if ( isset($data['lisKy']) && count($data['lisKy'])>0)
				{
					$this->dbcn->iniciarTransaccion($data);
						
					foreach ($data['lisKy'] as $key=>$val)
					{
						if($this->util->get($data,"where")=="")
						{
							$data['where'] = "where nta_kynta = '".$val['ky']."'";
						}
						$data = $this->delete($data, "mus_nota");
					}//foreach ($data['lisPrp'] as $key=>$val)
			
					$this->dbcn->finalizarTransaccion();
				}//if (count($data['lisKy'])>0)
				else{
					$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)." No se elimino notas");
				}
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")			
			else if($this->util->get($data,"comando") == "ELIMINARLISTANOTA")
			{
				if ( ( isset($data['lisKy']) && count($data['lisKy'])>0 ) || isset($data['ltr_kyltr']) )
				{
					$this->dbcn->iniciarTransaccion($data);

					if ( isset($data['lisKy']) && count($data['lisKy'])>0 )
					{
						foreach ($data['lisKy'] as $key=>$val)
						{
							if($this->util->get($data,"where")=="")
							{
								$data['where'] = "where nta_kynta = '".$val['ky']."'";
							}
							$data = $this->delete($data, "mus_nota");
						}//foreach ($data['lisPrp'] as $key=>$val)
					}//if ( ( isset($data['lisKy']) && count($data['lisKy'])>0 )
					
					$data['ltr_tnta'] = "N";
					$data['where'] = "where ltr_kyltr = '".$data['ltr_kyltr']."'";
					$data = $this->update($data, "mus_letra");
						
					$this->dbcn->finalizarTransaccion();
				}//if (count($data['lisKy'])>0)
				else{
					$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)." No se elimino notas");
				}
			}//else if($this->util->get($data,"comando") == "ELIMINARLISTANOTA" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
				$this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "SUBIRFOTO" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['nta_kynta'] = $this->util->get($data,"nta_kynta");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>