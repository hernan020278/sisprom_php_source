<?php 
class CtrlAsistencia extends Controlador
{
	public function __construct() {
		parent::__construct();
	}

	public function index()
	{
		$data = Array();
		$data['ast_kyast'] = 199;
		$data = $this->run("CtrlAsistencia",$data);
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
			
			if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"ast_kyast","0")=="0")
			{
				$dtmp = Array();
				$dtmp['ast_kyasg'] = $data['ast_kyasg'];
				$dtmp['ast_fing'] = $data['ast_fing'];
				$dtmp['ast_fsal'] = $data['ast_fsal'];
				$dtmp['sql'] = "SELECT ast.ast_kyast FROM asi_asistencia ast";

				$dtmp = $this->run("asi/GetListaAsistencia",$dtmp);

				if(count($dtmp['lista']['items'])>0)
				{
					$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");
					$data['ast_kyast'] = $dtmp['lista']['items'][0]['ast_kyast'];
				}
				else{$data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");}
					
				if($data['msg']['type']=="success")
				{
					$data = $this->insert($data, "asi_asistencia");
				}//if($data['msg']['type']=="success")
			}//if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="0")
			else if($this->util->get($data,"comando") == "MODIFICAR")
			{
			    if($this->util->get($data,"where")=="")
			    {
			        $data['where'] = "where ast_kyast='".$data['ast_kyast']."'";
			    }
			    $data = $this->update($data, "asi_asistencia");
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "MODIFICARLISTA")
			{
			    $data['sql'] = "CALL sp_calcular_totalasistencia(".$data['ast_kyast'].", '".$data['ast_eing']."')";
			    $this->procedure($data);
			    
			    $dtmp = Array();
			    $dtmp['ast_kyast'] = $data['ast_kyast'];
			    $dtmp['sql'] = "SELECT ast.ast_kyast, asg_kyasg, asg_kymtr, asg_kypfo, asg_kyevl, asg_nomb, asg_pres, asg_tard, asg_falt, asg_tasi, asg_esta, asg_vers
                FROM clg_asignatura asg INNER JOIN asi_asistencia ast ON ast.ast_kyasg=asg.asg_kyasg";
			    $dtmp = $this->run("asi/GetListaAsistencia",$dtmp);
			    
			    if(count($dtmp['lista']['items'])>0)
			    {
			        $result['asg_kyasg'] = $dtmp['lista']['items'][0]['asg_kyasg'];
			        $result['asg_pres'] = $dtmp['lista']['items'][0]['asg_pres'];
			        $result['asg_tard'] = $dtmp['lista']['items'][0]['asg_tard'];
			        $result['asg_falt'] = $dtmp['lista']['items'][0]['asg_falt'];
			        $result['asg_tasi'] = $dtmp['lista']['items'][0]['asg_tasi'];
			        
			        $data['ast_kyast'] = $dtmp['lista']['items'][0]['ast_kyast'];
			    }
			}//else if($this->util->get($data,"comando") == "MODIFICAR" && $this->util->get($data,"prp_kyprp")!="0")
			else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->exist($data,"lisKy") && count($data['lisKy'])>0)
			{
				foreach ($data['lisKy'] as $key=>$val)
				{
					if($this->util->get($data,"where")=="")
					{
						$data['where'] = "where ast_kyast = '".$val['ky']."'";
					}
					$data = $this->delete($data, "asi_asistencia");
				}//foreach ($data['lisPrp'] as $key=>$val)
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else if($this->util->get($data,"comando") == "GENERARASISTENCIAALUMNO")
			{
			    $dtmp = Array();
		        $dtmp['mtr_peri'] = $data['mtr_peri'];
		        $dtmp['mtr_prog'] = $data['mtr_prog'];
		        $dtmp['mtr_nive'] = $data['mtr_nive'];
		        $dtmp['mtr_grad'] = $data['mtr_grad'];
		        $dtmp['mtr_turn'] = $data['mtr_turn'];
		        $dtmp['mtr_aula'] = $data['mtr_aula'];
		        $dtmp['asg_nomb'] = $data['asg_nomb'];
		        $dtmp = $this->run("clg/GetListaAsignatura", $dtmp);
		        if(count($dtmp['lista']['items'])>0)
		        {
		            foreach($dtmp['lista']['items'] as $clave=>$valor)
		            {
		                $data['where'] = "where ast_kyasg = '".$clave['asg_kyasg']."'";
		                $data = $this->delete($data, "asi_asistencia");
		            }
		        }
		        
		        $dtmp = Array();
		        $dtmp['mtr_peri'] = $data['mtr_peri'];
		        $dtmp['mtr_prog'] = $data['mtr_prog'];
		        $dtmp['mtr_nive'] = $data['mtr_nive'];
		        $dtmp['mtr_grad'] = $data['mtr_grad'];
		        $dtmp['mtr_turn'] = $data['mtr_turn'];
		        $dtmp['mtr_aula'] = $data['mtr_aula'];
		        $dtmp['asg_nomb'] = $data['asg_nomb'];
		        $dtmp['cntInt'] = "gridCursosAlumno";
		        $dtmp = $this->run("clg/GetListaAsignatura", $dtmp);
		        $listaAsignatura = $dtmp['lista']['items'];
		        
		        foreach ($listaAsignatura as $clave => $valor)
		        {
		            $numDias = $this->util->entreFechas($valor['mtr_fini'], $valor['mtr_ffin']) + 1;
		            for($iteDia=0; $iteDia<$numDias; $iteDia++)
		            {
		                $fechaNueva = $this->util->agregarDias($valor['mtr_fini'], $iteDia);
		                
		                $dtmp = Array();
		                $dtmp['comando'] = "AGREGAR";
		                $dtmp['dbapp'] = "clg";
		                $dtmp['ast_kyast'] = 0;
		                $dtmp['ast_kyasg'] = $valor['asg_kyasg'];
		                $dtmp['ast_turn'] = 'MAÑANA';
		                $dtmp['ast_fing'] = $fechaNueva;
		                $dtmp['ast_eing'] = '0000';
		                $dtmp['ast_fsal'] = $fechaNueva;
		                $dtmp['ast_esal'] = '0000';
		                $dtmp['ast_mreg'] = 'PENDIENTE';
		                
		                $dtmp = $this->ejecutar($dtmp);
		            }//for($iteDia=0; $iteDia<$numDias; $iteDia++)
		        }
			}
			else if($this->util->get($data,"comando") == "OBTENERMATRASIT" || $this->util->get($data,"comando") == "EDITARMATRASIT")
			{
		        $dtmp = Array();
		        $dtmp['tipo'] = $data['tipo'];
		        $dtmp['asg_kyasg'] = $data['asg_kyasg'];
		        $dtmp['asg_peri'] = $data['asg_peri'];
		        $dtmp = $this->run("asi/GetListaAsistencia",$dtmp);
		        $dtmp = $this->obtenerTablaAsistenciaPorAlumno($dtmp['lista']['items']);
		        
		        if(count($dtmp['lisAsig']) > 0)
		        {
		            $result['lisAsig'] = $dtmp['lisAsig'];
		        }//if(count($dtmp['lisCelTab']) > 0)

			}//else if($this->util->get($data,"comando") == "OBTENERMATRASIT" || $this->util->get($data,"comando") == "EDITARMATRASIT" || $this->util->get($data,"comando") == "GENERARASISTENCIAALUMNO")
			else if($this->util->get($data,"comando") == "OBTENERASIGNATURAASISTENCIA")
			{
/*			    
			    $dtmp = Array();
// 				$dtmp['ast_kyasg'] = $data['asg_kyasg'];
			    $dtmp['tipo'] = $data['tipo'];
			    $dtmp['mtr_peri'] = $data['mtr_peri'];
			    $dtmp['mtr_prog'] = $data['mtr_prog'];
			    $dtmp['mtr_nive'] = $data['mtr_nive'];
			    $dtmp['mtr_grad'] = $data['mtr_grad'];
			    $dtmp['mtr_turn'] = $data['mtr_turn'];
			    $dtmp['mtr_aula'] = $data['mtr_aula'];
			    $dtmp['alu_kyusu'] = $data['alu_kyusu'];
			    $dtmp['ast_nive'] = "1";
			    $dtmp = $this->run("clg/GetListaEvaluacion",$dtmp);
			    $dtmp = $this->obtenerTablaEvaluacionPorAsignatura($dtmp['lista']['items']);
			    
			    if(count($dtmp['lisCelTab']) > 0)
			    {
			        $result['listaValores'] = $dtmp['lisCelTab'];			    
			    }//if(count($dtmp['lisCelTab']) > 0)
*/			    
			}//else if($this->util->get($data,"comando") == "OBTENERASIGNATURAASISTENCIA")
			else if($this->util->get($data,"comando") == "SUBIRFOTO")
			{
				$this->uploadFimg($data);
			}//else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
			else
			{
				$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");
			}
			$result['msg'] = $data['msg'];
			$result['ast_kyast'] = $this->util->get($data,"ast_kyast");

			$this->dbcn->finalizarTransaccion($data);
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	public function generarListaAsistencia($lisAsig, $ast_fnue, $ast_kyasg)
	{
		foreach ($lisAsig as $clave => $valor)
		{
			$dtmp = Array();
			$dtmp['comando'] = "AGREGAR";
			$dtmp['dbapp'] = "clg";
			$dtmp['ast_kyast'] = 0;
			$dtmp['ast_kyasg'] = $ast_kyasg;
			$dtmp['ast_turn'] = 'MAÑANA';
			$dtmp['ast_fing'] = $ast_fnue;
			$dtmp['ast_eing'] = '0000';
			$dtmp['ast_fsal'] = $ast_fnue;
			$dtmp['ast_esal'] = '0000';
			$dtmp['ast_mreg'] = 'PENDIENTE';
			
			$dtmp = $this->ejecutar($dtmp);
		}
	}
	public function obtenerTablaAsistenciaPorAlumno($lisAsig)
	{
		$rpta = null;
		$rpta['lisAsig'] = Array();
		if(count($lisAsig)>0){
			foreach($lisAsig as $item){
			    if(!isset($rpta['lisAsig'][$item['asg_kyasg']]))
			    {
			        $rpta['lisAsig'][$item['asg_kyasg']]=Array();
			        $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum']=Array();
			    }
			    $rpta['lisAsig'][$item['asg_kyasg']]['asg_kyasg']=$item['asg_kyasg'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['asg_nomb']=$item['asg_nomb'];
			    
			    if(!isset($rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]))
			    {
			        $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]=Array();
			        $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis']=Array();
			    }
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['usu_kyusu']=$item['usu_kyusu'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['usu_nomb']=$item['usu_nomb'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['usu_orde']=$item['usu_orde'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_pres']=$item['asg_pres'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_tard']=$item['asg_tard'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_falt']=$item['asg_falt'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_tasi']=$item['asg_tasi'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_nive']=$item['asg_nive'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_peri']=$item['asg_peri'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_mese']=$item['asg_mese'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_anio']=$item['asg_anio'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['asg_nive']=$item['asg_nive'];
			    
			    if(!isset($rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]))
			    {
			        $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]=Array();
			        $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['lisCelTab']=Array();
			    }
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_kyast']=$item['ast_kyast'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_turn']=$item['ast_turn'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_fing']=$item['ast_fing'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_eing']=$item['ast_eing'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_fsal']=$item['ast_fsal'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_esal']=$item['ast_esal'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_mreg']=$item['ast_mreg'];
			    $rpta['lisAsig'][$item['asg_kyasg']]['lisAlum'][$item['usu_kyusu']]['lisAsis'][$item['ast_kyast']]['ast_nive']=$item['ast_nive'];
			    
			}//foreach($list as $item){
		}//if(count($list)>0){
		
		$rpta['msg'] = ( ( isset($rpta['lisAsig']) && count($rpta['lisAsig']) > 0 ) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );
			
		return $rpta;
	}
}
?>