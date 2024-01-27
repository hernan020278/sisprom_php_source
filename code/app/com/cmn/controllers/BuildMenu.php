<?php 
class BuildMenu extends Controlador 
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
				
			$data['niveIni'] = $this->util->get($data,"pol_nive",0);
			$data = $this->run("cmn/GetListaMenu",$data);
			$list = $data['lista']['items'];
			$rpta = array();
			if(count($list)>0){
				foreach($list as $item){
					$item = (Array) $item;
			
					if(!isset($rpta['mn']['lm']))
					{
					    $rpta['mn']['lm']=Array();
					}

					if(!isset($rpta['mn']['lm'][$item['oda']]))
					{
						$rpta['mn']['lm'][$item['oda']]=Array();
						$rpta['mn']['lm'][$item['oda']]['lm']=Array();
					}
					$rpta['mn']['lm'][$item['oda']]['ky']=$item['kya'];
					$rpta['mn']['lm'][$item['oda']]['kp']=$item['kpa'];
					$rpta['mn']['lm'][$item['oda']]['nv']=$item['nva'];
					$rpta['mn']['lm'][$item['oda']]['nm']=$item['nma'];
					$rpta['mn']['lm'][$item['oda']]['im']=$item['ima'];
					$rpta['mn']['lm'][$item['oda']]['ds']=$item['dsa'];
					$rpta['mn']['lm'][$item['oda']]['tg']=$item['tga'];
					$rpta['mn']['lm'][$item['oda']]['es']=$item['esa'];
						
					if(!isset($rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]))
					{
						$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]=Array();
						$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm']=Array();
					}
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['ky']=$item['kyb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['kp']=$item['kpb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['nv']=$item['nvb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['nm']=$item['nmb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['im']=$item['imb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['ds']=$item['dsb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['tg']=$item['tgb'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['es']=$item['esb'];
						
					if(!isset($rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]))
					{
						$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]=Array();
						$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['lm']=Array();
					}
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['ky']=$item['kyc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['kp']=$item['kpc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['nv']=$item['nvc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['nm']=$item['nmc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['im']=$item['imc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['ds']=$item['dsc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['tg']=$item['tgc'];
					$rpta['mn']['lm'][$item['oda']]['lm'][$item['odb']]['lm'][$item['odc']]['es']=$item['esc'];
				}//foreach($list as $item){
			}//if(count($list)>0){
			
			/*
			 * GENERAR CONSULTA PARA NAVEGACION
			*/
			$data = $this->run("cmn/GetListaNavegacion",$data);
			$list = $data['lista']['items'];
			$rpta['na'] = Array();
			if(count($list)>0){
				foreach($list as $item){
					$item = (Array) $item;
					if(!isset($rpta['na']['ln']))
					{
						$rpta['na']['ln']=Array();
					}
			
					if(!isset($rpta['na']['ln'][$item['oda']]))
					{
						$rpta['na']['ln'][$item['oda']]=Array();
						$rpta['na']['ln'][$item['oda']]['ln']=Array();
					}
					$rpta['na']['ln'][$item['oda']]['ky']=$item['kya'];
					$rpta['na']['ln'][$item['oda']]['kp']=$item['kpa'];
					$rpta['na']['ln'][$item['oda']]['nv']=$item['nva'];
					$rpta['na']['ln'][$item['oda']]['nm']=$item['nma'];
					$rpta['na']['ln'][$item['oda']]['im']=$item['ima'];
					$rpta['na']['ln'][$item['oda']]['ds']=$item['dsa'];
					$rpta['na']['ln'][$item['oda']]['tg']=$item['tga'];
					$rpta['na']['ln'][$item['oda']]['es']=$item['esa'];

					if(!isset($rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]))
					{
						$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]=Array();
						$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln']=Array();
					}
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ky']=$item['kyb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['kp']=$item['kpb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['nv']=$item['nvb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['nm']=$item['nmb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['im']=$item['imb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ds']=$item['dsb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['tg']=$item['tgb'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['es']=$item['esb'];

					if(!isset($rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]))
					{
						$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]=Array();
						$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['ln']=Array();
					}
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['ky']=$item['kyc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['kp']=$item['kpc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['nv']=$item['nvc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['nm']=$item['nmc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['im']=$item['imc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['ds']=$item['dsc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['tg']=$item['tgc'];
					$rpta['na']['ln'][$item['oda']]['ln'][$item['odb']]['ln'][$item['odc']]['es']=$item['esc'];
				}
			}
			if( isset($rpta['mn']) && isset($rpta['na']) && count($rpta['mn']) > 0 && count($rpta['na']) > 0)
			{
			    $result['msg'] = Array("type"=>"success","text"=>"Exito");
			    $result['mn'] = $rpta['mn'];
			    $result['na'] = $rpta['na'];
			}
			else
			{
			    $result['msg'] = Array("type"=>"error","text"=>"Error");
			    $result['mn'] = Array();
			    $result['na'] = Array();
			}
			
			$result['msg'] = $data['msg'];
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>