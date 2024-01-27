<?php 
class CtrlEvaluacion extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['evl_kyevl'] = 199;
		$data = $this->run("CtrlEvaluacion",$data);
		var_dump($data);
	}
	public function ejecutar($data)
	{
		$result = null;
		try
		{
			$data = $this->getFiltro($data);//Inicio

			$this->dbcn->iniciarTransaccion($data);
			$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");
			
			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"evl_kyevl","0")=="0")
			{
				$dtmp = Array();
				$dtmp['evl_kyasg'] = $data['evl_kyasg'];
				$dtmp['evl_kyprp'] = $data['evl_kyprp'];
				$dtmp['evl_nive'] = $data['evl_nive'];
				$dtmp['evl_nomb'] = $data['evl_nomb'];
				$dtmp['evl_dscr'] = $data['evl_dscr'];
				$dtmp['sql'] = "SELECT a.evl_kyevl kya FROM clg_evaluacion a";

				$dtmp = $this->run("clg/GetListaEvaluacion",$dtmp);

				if(count($dtmp['lista']['items'])>0)
				{
					$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");
					$data['evl_kyevl'] = $dtmp['lista']['items'][0]['kya'];
				}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
					$data = $this->insert($data, "clg_evaluacion");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
			    if($this->util->get($data,"where")=="")
			    {
			        $data['where'] = "where evl_kyevl='".$data['evl_kyevl']."'";
			    }
			    $data = $this->update($data, "clg_evaluacion");
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "MODIFICARLISTA")
			{
			    $evl_vers = date("Y-m-d H:i:s");
			    $data['sql'] = "CALL sp_sacar_promedio(".$data['evl_kyevl'].", ".$data['evl_valo'].", '".$evl_vers."', @p_val_resul)";
			    $this->procedure($data);
			    
			    $dtmp = Array();
			    $dtmp['dbapp'] = "clg";
			    $dtmp['evl_vers'] = $evl_vers;
			    $dtmp['sql'] = "SELECT * FROM clg_evaluacion a";
			    $dtmp = $this->run("clg/GetListaEvaluacion",$dtmp);
                $result['listaModificada'] = $dtmp['lista']['items'];
                
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where evl_kyevl = '".$val['ky']."'";
					}
					$data = $this->delete($data, "clg_evaluacion");
				}//foreach ($data['lisPrp'] as $key=>$val)
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "OBTENERALUMNOEVALUACION" || $this->util->get($data,"comando") == "EDITARALUMNOEVALUACION" || $this->util->get($data,"comando") == "GENERARALUMNOEVALUACION")
			{
			    if($this->util->get($data,"comando") == "GENERARALUMNOEVALUACION")
			    {
			        $data['sql'] = "CALL proc_eliminar_evaluacion()";
			        $this->procedure($data);
			        
			        $dtmp = Array();
			        $dtmp['asg_kyasg'] = $data['asg_kyasg'];
			        $dtmp['cntInt'] = "gridCursosAlumno";
			        $dtmp = $this->run("clg/GetListaAsignatura", $dtmp);
			        $listaAsignatura = $dtmp['lista']['items'];
			        
			        $dtmp = Array();
			        $dtmp['prp_secc'] = $listaAsignatura[0]['evl_secc'];
			        $dtmp['prp_prop'] = $listaAsignatura[0]['evl_prop'];
			        $dtmp = $this->run("adm/GetListaPropevaluacion",$dtmp);
			        
			        foreach ($listaAsignatura as $clave => $valor)
			        {
			            $this->generarListaEvaluacion($dtmp['lisCelTab'], 0, $valor['asg_kyasg']);
			        }
			    }//if($this->util->get($data,"comando") == "GENERARALUMNOEVALUACION")
			    $dtmp = Array();
//   				$dtmp['evl_kyasg'] = $data['asg_kyasg'];
			    $dtmp['tipo'] = $data['tipo'];
			    $dtmp['asg_kyasg'] = $data['asg_kyasg'];
			    $dtmp['evl_nive'] = "1";
			    $dtmp = $this->run("clg/GetListaEvaluacion",$dtmp);
			    $dtmp = $this->obtenerTablaEvaluacionPorAlumno($dtmp['lista']['items']);
			    
			    if(count($dtmp['lisCelTab']) > 0)
			    {
			        $result['listaValores'] = $dtmp['lisCelTab'];
			    }//if(count($dtmp['lisCelTab']) > 0)
			}//else if($this->util->get($data,"comando") == "OBTENERALUMNOEVALUACION" || $this->util->get($data,"comando") == "EDITARALUMNOEVALUACION" || $this->util->get($data,"comando") == "GENERARALUMNOEVALUACION")
			else if($this->util->get($data,"comando") == "OBTENERASIGNATURAEVALUACION")
			{
			    $dtmp = Array();
// 				$dtmp['evl_kyasg'] = $data['asg_kyasg'];
			    $dtmp['tipo'] = $data['tipo'];
			    $dtmp['mtr_kymtr'] = $data['mtr_kymtr'];
			    $dtmp['evl_nive'] = "1";
			    $dtmp = $this->run("clg/GetListaEvaluacion",$dtmp);
			    $dtmp = $this->obtenerTablaEvaluacionPorAsignatura($dtmp['lista']['items']);
			    
			    if(count($dtmp['lisCelTab']) > 0)
			    {
			        $result['listaValores'] = $dtmp['lisCelTab'];			    
			    }//if(count($dtmp['lisCelTab']) > 0)
			}//else if($this->util->get($data,"comando") == "OBTENERASIGNATURAEVALUACION")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
				$this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['evl_kyevl'] = $this->util->get($data,"evl_kyevl");

			$this->dbcn->finalizarTransaccion($data);
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	public function generarListaEvaluacion($lisEvl, $evl_kypdr, $evl_kyasg)
	{
		foreach ($lisEvl as $clave => $valor)
		{
			$dtmp = Array();
			$dtmp['comando'] = "AGREGAR";
			$dtmp['dbapp'] = "clg";
			$dtmp['evl_kyevl'] = 0;
			$dtmp['evl_kypdr'] = $evl_kypdr;
			$dtmp['evl_kyasg'] = $evl_kyasg;
			$dtmp['evl_kyprp'] = $lisEvl[$clave]['eky'];
			$dtmp['evl_orde'] = 1;
			$dtmp['evl_nive'] = $lisEvl[$clave]['env'];
			$dtmp['evl_nomb'] = $lisEvl[$clave]['enm'];
			$dtmp['evl_valu'] = $lisEvl[$clave]['eva'];
			$dtmp['evl_dscr'] = $lisEvl[$clave]['eds'];
			$dtmp['evl_esta'] = '0001';
			
			$dtmp = $this->ejecutar($dtmp);

			$arrEvl = array_keys($valor['lisCelTab']);
			if( !empty($arrEvl[0]))
			{
				$this->generarListaEvaluacion($lisEvl[$clave]['lisCelTab'], $dtmp['evl_kyevl'], $evl_kyasg);
			}
		}
	}
	public function obtenerTablaEvaluacionPorAlumno($lisEvl)
	{
		$rpta = null;
		$rpta['lisCelTab'] = Array();
		if(count($lisEvl)>0){
			foreach($lisEvl as $item){
			    if(!isset($rpta['lisCelTab'][$item['cky']]))
			    {
			        $rpta['lisCelTab'][$item['cky']]=Array();
			        $rpta['lisCelTab'][$item['cky']]['lisCelTab']=Array();
			    }
			    $rpta['lisCelTab'][$item['cky']]['cky']=$item['cky'];
			    $rpta['lisCelTab'][$item['cky']]['cnm']=$item['cnm'];
			    
				if(!isset($rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]))
				{
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]=Array();
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab']=Array();
				}
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['eky']=$item['kya'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['ekp']=$item['kpa'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['eep']=$item['epa'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['env']=(int)$item['nva'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['enm']=$item['nma'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['eva']=$item['vaa'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['eds']=$item['dsa'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['evl']=sprintf("%01.1f", $item['vla']);
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['aky']=$item['aky'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['aor']=$item['aor'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['anm']=$item['anm'];

				if(!isset($rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]))
				{
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]=Array();
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab']=Array();
				}
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eky']=$item['kyb'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['ekp']=$item['kpb'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eep']=$item['epb'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['env']=(int)$item['nvb'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['enm']=$item['nmb'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eva']=$item['vab'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eds']=$item['dsb'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['evl']=sprintf("%01.1f", $item['vlb']);
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['aky']=$item['aky'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['aor']=$item['aor'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['anm']=$item['anm'];

				if(!isset($rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]))
				{
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]=Array();
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab']=Array();
				}
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eky']=$item['kyc'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['ekp']=$item['kpc'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eep']=$item['epc'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['env']=(int)$item['nvc'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['enm']=$item['nmc'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eva']=$item['vac'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eds']=$item['dsc'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['evl']=sprintf("%01.1f", $item['vlc']);
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['aky']=$item['aky'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['aor']=$item['aor'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['anm']=$item['anm'];

				if(!isset($rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]))
				{
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]=Array();
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab']=Array();
				}
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eky']=$item['kyd'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['ekp']=$item['kpd'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eep']=$item['epd'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['env']=(int)$item['nvd'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['enm']=$item['nmd'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eva']=$item['vad'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eds']=$item['dsd'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['evl']=sprintf("%01.1f", $item['vld']);
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['aky']=$item['aky'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['aor']=$item['aor'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['anm']=$item['anm'];

				if(!isset($rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]))
				{
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]=Array();
					$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['lisCelTab']=Array();
				}
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eky']=$item['kye'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['ekp']=$item['kpe'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eep']=$item['epe'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['env']=(int)$item['nve'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['enm']=$item['nme'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eva']=$item['vae'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eds']=$item['dse'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['evl']=sprintf("%01.1f", $item['vle']);
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['aky']=$item['aky'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['aor']=$item['aor'];
				$rpta['lisCelTab'][$item['cky']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['anm']=$item['anm'];
					
			}//foreach($list as $item){
		}//if(count($list)>0){
		
		$rpta['msg'] = ( ( isset($rpta['lisCelTab']) && count($rpta['lisCelTab']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
		return $rpta;
	}
	public function obtenerTablaEvaluacionPorAsignatura($lisEvl)
	{
	    $rpta = null;
	    $rpta['lisCelTab'] = Array();
	    if(count($lisEvl)>0){
	        foreach($lisEvl as $item){
	            if(!isset($rpta['lisCelTab'][$item['epa']]))
	            {
	                $rpta['lisCelTab'][$item['epa']]=Array();
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab']=Array();
	            }
	            $rpta['lisCelTab'][$item['epa']]['eep']=$item['epa'];
	            $rpta['lisCelTab'][$item['epa']]['enm']=$item['dsa'];
	            
	            if(!isset($rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]))
	            {
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]=Array();
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab']=Array();
	            }
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['eky']=$item['kya'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['ekp']=$item['kpa'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['eep']=$item['epa'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['env']=(int)$item['nva'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['enm']=$item['nma'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['eva']=$item['vaa'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['eds']=$item['dsa'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['evl']=sprintf("%01.1f", $item['vla']);
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['aky']=$item['aky'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['aor']=$item['aor'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['anm']=$item['anm'];
	            
	            if(!isset($rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]))
	            {
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]=Array();
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab']=Array();
	            }
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eky']=$item['kyb'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['ekp']=$item['kpb'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eep']=$item['epb'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['env']=(int)$item['nvb'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['enm']=$item['nmb'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eva']=$item['vab'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['eds']=$item['dsb'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['evl']=sprintf("%01.1f", $item['vlb']);
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['aky']=$item['aky'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['aor']=$item['aor'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['anm']=$item['anm'];
	            
	            if(!isset($rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]))
	            {
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]=Array();
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab']=Array();
	            }
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eky']=$item['kyc'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['ekp']=$item['kpc'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eep']=$item['epc'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['env']=(int)$item['nvc'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['enm']=$item['nmc'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eva']=$item['vac'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['eds']=$item['dsc'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['evl']=sprintf("%01.1f", $item['vlc']);
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['aky']=$item['aky'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['aor']=$item['aor'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['anm']=$item['anm'];
	            
	            if(!isset($rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]))
	            {
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]=Array();
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab']=Array();
	            }
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eky']=$item['kyd'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['ekp']=$item['kpd'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eep']=$item['epd'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['env']=(int)$item['nvd'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['enm']=$item['nmd'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eva']=$item['vad'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['eds']=$item['dsd'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['evl']=sprintf("%01.1f", $item['vld']);
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['aky']=$item['aky'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['aor']=$item['aor'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['anm']=$item['anm'];
	            
	            if(!isset($rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]))
	            {
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]=Array();
	                $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['lisCelTab']=Array();
	            }
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eky']=$item['kye'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['ekp']=$item['kpe'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eep']=$item['epe'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['env']=(int)$item['nve'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['enm']=$item['nme'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eva']=$item['vae'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['eds']=$item['dse'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['evl']=sprintf("%01.1f", $item['vle']);
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['aky']=$item['aky'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['aor']=$item['aor'];
	            $rpta['lisCelTab'][$item['epa']]['lisCelTab'][$item['kya']]['lisCelTab'][$item['kyb']]['lisCelTab'][$item['kyc']]['lisCelTab'][$item['kyd']]['lisCelTab'][$item['kye']]['anm']=$item['anm'];
	            
	        }//foreach($list as $item){
	    }//if(count($list)>0){
	    
	    $rpta['msg'] = ( ( isset($rpta['lisCelTab']) && count($rpta['lisCelTab']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
	    
	    return $rpta;
	}
}
?>