<?php 
class home extends Controlador
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
			$data['opc'] = ((isset($data['opc']))?$data['opc']:"");
			if(isset($_SESSION['crearComunidad']) && $_SESSION['crearComunidad'])
			{
				$template = Array();
				$_SESSION['crearComunidad']=false;
				$template["header"] = $this->vista('cmn/header', Array("userdata"=>(isset($_SESSION) ? $_SESSION : null)), true);
				$template["body"] = $this->vista('cmn/body', Array("userdata"=>(isset($_SESSION) ? $_SESSION : null)), true);
				$this->vista("cmn/template",Array(
						"userdata"=>$_SESSION,
						"template"=>$template
				));
			}
			else
			{
				unset($_SESSION['q']);
				$template["header"] = $this->vista('cmn/header', Array("userdata"=>(isset($_SESSION) ? $_SESSION : null)), true);
				$template["body"] = $this->vista('cmn/search', Array("userdata"=>(isset($_SESSION) ? $_SESSION : null)), true);
				$this->vista("cmn/template",Array(
						"template"=>$template,
						'title'=>'Sisprom - La nube es solo el principio',
						'metadata'=>Array(
								'description'=>'Sisprom es la Red de Negocios mas completa y poderosa donde podras interacturar personal y comercialmente con empresas, instituciones o personas',
								'keywords'=>'sisprom, sisprom.com, sisprom srl, sisprom labs, empresas, pymes, mypes, compras online, ventas online, sistemas de informacion, online, comunidades, foros, aplicaciones'
						)
				));
			}
		}
		catch (Exception $e) 
		{
			throw $e;
		}
		return $result;				
	}
	public function grid(){
		$this->vista("cmn/grid");
	}
	public function grid_stk(){
		$this->vista("erp/grid_stk");
	}
}
?>