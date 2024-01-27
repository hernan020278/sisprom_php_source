<?php 
class CtrlLetra extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['ltr_kyltr'] = 199;
		$data = $this->run("CtrlLetra",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"ltr_kyltr","0")=="0")
			{
// 				$dtmp = Array();
// 				$dtmp['ltr_kyltr'] = $data['ltr_kyalb'];
// 				$dtmp['ltr_auto'] = $data['ltr_auto'];
// 				$dtmp['ltr_nomb'] = $data['ltr_nomb'];				
// 				$dtmp = $this->run("mus/GetListaLetra",$dtmp);					
// 				if(count($dtmp['lista']['items'])>0){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");}
// 				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
// 				if($data['msg']['type']=="success")
// 				{   
          $data['ltr_tnta'] = ( $data['ltr_tnta'] == "1" ) ? "S" : "N";
					$data['ltr_esta'] = "0001";
					$data = $this->insert($data, "mus_letra");
// 				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
				$this->dbcn->iniciarTransaccion($data);
				
				if ($this->util->esdato($data, "ltr_tnta")) {
				  $data['ltr_tnta'] = ( $data['ltr_tnta'] == "1" ) ? "S" : "N";
				}
				
				if($this->util->get($data,"where")=="")
				{
					$data['where'] = "where ltr_kyltr='".$data['ltr_kyltr']."'";
				}
				$data = $this->update($data, "mus_letra");
				
				if( isset($data['lisKy']) && count($data['lisKy']) > 0 )
				{
					foreach ($data['lisKy'] as $key=>$val)
					{
						$data['where'] = "where nta_kynta = '".$val['nta_kynta']."'";
						$data['nta_ejex'] = $val['nta_ejex'];
						$data = $this->update($data, "mus_nota");
					}//foreach ($data['lisPrp'] as $key=>$val)
				}//if( count($data['lisKy']) > 0 )
				
				$this->dbcn->finalizarTransaccion($data);
					
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "MODIFICARVARIOS" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				$this->dbcn->iniciarTransaccion($data);

				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['ltr_orde'] = $val['ltr_orde'];
						$data['where'] = "where ltr_kyltr = '".$val['ky']."'";
					}
					$data = $this->update($data, "mus_letra");
				}//foreach ($data['lisPrp'] as $key=>$val)

				$this->dbcn->finalizarTransaccion();

			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				$this->dbcn->iniciarTransaccion($data);

				foreach ($data['lisKy'] as $key=>$val)
				{
					$data['where'] = "where nta_kyltr = '".$val['ky']."'";
					$data = $this->delete($data, "mus_nota");
					
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where ltr_kyltr = '".$val['ky']."'";
					}
					$data = $this->delete($data, "mus_letra");
				}//foreach ($data['lisPrp'] as $key=>$val)

				$this->dbcn->finalizarTransaccion();

			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
				$this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['ltr_kyltr'] = $this->util->get($data,"ltr_kyltr");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>