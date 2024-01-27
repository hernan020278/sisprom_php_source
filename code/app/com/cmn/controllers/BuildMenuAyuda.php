<?php 
class BuildMenuAyuda extends Controlador 
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array(
			"dbapp" => "cmn",
			"modulo" => "controllers",
			"archivo" => "BuildMenuAyuda",
			"method" => "ejecutar",
			"pol_kypol" => "0",
			"pol_nive" => "1");
		return $this->ejecutar($data);
	}
	
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio
				
			$data['nvIni'] = $this->util->get($data,"pol_nive",0);
			$data = $this->run("cmn/GetListaMenuAyuda",$data);
			$list = $data['lista']['items'];
			$rpta = array();
			if(count($list)>0){
				foreach($list as $item){
					$item = (Array) $item;
			
					if(!isset($rpta['mn'][$item['kya']]))
					{
						$rpta['mn'][$item['kya']]=Array();
						$rpta['mn'][$item['kya']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['ky']=$item['kya'];
					$rpta['mn'][$item['kya']]['kp']=$item['kpa'];
					$rpta['mn'][$item['kya']]['nv']=$item['nva'];
					$rpta['mn'][$item['kya']]['ds']=$item['dsa'];
					$rpta['mn'][$item['kya']]['lk']=$item['lka'];
						
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]))
					{
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]=Array();
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['ky']=$item['kyb'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['kp']=$item['kpb'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['nv']=$item['nvb'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['ds']=$item['dsb'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lk']=$item['lkb'];
						
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]))
					{
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]=Array();
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['ky']=$item['kyc'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['kp']=$item['kpc'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['nv']=$item['nvc'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['ds']=$item['dsc'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lk']=$item['lkc'];
			
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]))
					{
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]=Array();
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['ky']=$item['kyd'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['kp']=$item['kpd'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['nv']=$item['nvd'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['ds']=$item['dsd'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lk']=$item['lkd'];

					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]))
					{
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]=Array();
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['ky']=$item['kye'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['kp']=$item['kpe'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['nv']=$item['nve'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['ds']=$item['dse'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lk']=$item['lke'];

					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]))
					{
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]=Array();
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['ky']=$item['kyf'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['kp']=$item['kpf'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['nv']=$item['nvf'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['ds']=$item['dsf'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lk']=$item['lkf'];

					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]))
					{
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]=Array();
						$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['ky']=$item['kyg'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['kp']=$item['kpg'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['nv']=$item['nvg'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['ds']=$item['dsg'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lk']=$item['lkg'];

					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]))
					{
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]=Array();
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['ky']=$item['kyh'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['kp']=$item['kph'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['nv']=$item['nvh'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['ds']=$item['dsh'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lk']=$item['lkh'];
					
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]))
					{
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]=Array();
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['ky']=$item['kyi'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['kp']=$item['kpi'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['nv']=$item['nvi'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['ds']=$item['dsi'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lk']=$item['lki'];
					
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]))
					{
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]=Array();
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['ky']=$item['kyj'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['kp']=$item['kpj'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['nv']=$item['nvj'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['ds']=$item['dsj'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lk']=$item['lkj'];
					
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]))
					{
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]=Array();
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['ky']=$item['kyk'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['kp']=$item['kpk'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['nv']=$item['nvk'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['ds']=$item['dsk'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lk']=$item['lkk'];
					
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]))
					{
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]=Array();
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['ky']=$item['kyl'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['kp']=$item['kpl'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['nv']=$item['nvl'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['ds']=$item['dsl'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lk']=$item['lkl'];
					
					if(!isset($rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]))
					{
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]=Array();
					    $rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]['lm']=Array();
					}
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]['ky']=$item['kym'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]['kp']=$item['kpm'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]['nv']=$item['nvm'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]['ds']=$item['dsm'];
					$rpta['mn'][$item['kya']]['lm'][$item['kyb']]['lm'][$item['kyc']]['lm'][$item['kyd']]['lm'][$item['kye']]['lm'][$item['kyf']]['lm'][$item['kyg']]['lm'][$item['kyh']]['lm'][$item['kyi']]['lm'][$item['kyj']]['lm'][$item['kyk']]['lm'][$item['kyl']]['lm'][$item['kym']]['lk']=$item['lkm'];
					
				}//foreach($list as $item){
			}//if(count($list)>0){		

			$data['msg'] = ( ( isset($rpta['mn']) && count($rpta['mn']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
			$result['msg'] = $data['msg'];
			$result['mn'] = $rpta['mn'];

			//$this->listaMenuAyuda($result['mn'], "");
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>