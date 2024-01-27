<?php
require_once BASEPATH."/lib/Excel.php";
require_once BASEPATH.'/lib/PHPExcel/IOFactory.php';
setlocale(LC_ALL,'es_ES');

class CargarMatricula extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
	    $data = Array();
	    $data['archivoExcel'] = '../../gestion/sisprom/clg/formato/matr_formato.xls';
		return $this->ejecutar($data);
	}

	public function ejecutar($data)
	{
		$result = null;		
		try
		{
		    /** *****************************************
		     *  Coordenadas de mapeo de celdas de excel *
		     ** *****************************************/
		    try 
		    {
		        $objPHPExcel = new Excel();
		        $inputFileType = PHPExcel_IOFactory::identify($data['archivoExcel']);
		        $objReader = PHPExcel_IOFactory::createReader($inputFileType);
		        $objPHPExcel = $objReader->load($data['archivoExcel']);
		    }
		    catch(Exception $e) 
		    {
		        die('Error loading file "'.pathinfo($data['archivoExcel'],PATHINFO_BASENAME).'": '.$e->getMessage());
		    }
		    $hoja = $objPHPExcel->getSheet(0);
		    $ultimafila = $hoja->getHighestRow();
		    $ultimaColumna = $hoja->getHighestColumn();
		    /** **************************************************************
		     ** Buscar nombre de EVALUACION si existe lo obtiene si no lo crea
		     ** **************************************************************/
		    $dtmp = Array();
		    $dtmp['comando'] = "AGREGAR";
		    $dtmp['dbapp'] = "cmn";
		    $dtmp['prp_kyprp'] = 0;
		    $dtmp['prp_secc'] = "PRPEVL";
		    $dtmp['prp_prop'] = "PRMPRI";
		    $dtmp = $this->run("adm/CtrlPropiedad",$dtmp);
		    $data['evl'] = $dtmp['prp'];
		    $data['msg'] = $dtmp['msg'];
		    
		    /** *********************************************************************
		     ** Se agrega un nuevo PERFIL de PROFESOR para operaciones con evaluacion
		     ** *********************************************************************/
		    $dtmp = Array();
		    $dtmp['comando'] = "AGREGAR";
		    $dtmp['dbapp'] = "cmn";
		    $dtmp['prf_kyprf'] = "0";
		    $dtmp['prf_nomb'] = "PROFESOR";
		    $dtmp = $this->run("cmn/CtrlPerfil",$dtmp);
		    $data['prf'] = $dtmp['prf'];
		    $data['msg'] = $dtmp['msg'];

		    $listaProfAsig = Array();
		    for ($fil = 9; $fil <= 18; $fil++)
		    {
		        /** **************************
		         ** Validar si hay fila VACIA
		         ** **************************/
		        $totalVacio = 0;
		        $listaColumna = Array(0=>2, 1=>3, 2=>5, 3=>7, 4=>10);
		        foreach($listaColumna as $key=>$val)
		        {
		            $valor = $hoja->getCellByColumnAndRow($listaColumna[$key], $fil)->getValue();
		            if(trim($valor)==""){$totalVacio++;}
		        }
		        if($totalVacio==count($listaColumna)){break;}
		        /** **************************************************************
		         ** Buscar nombre de ASIGNATURA si existe lo obtiene si no lo crea
		         ** **************************************************************/
		        $dtmp = Array();
		        $dtmp['comando'] = "AGREGAR";
		        $dtmp['dbapp'] = "clg";
		        $dtmp['prp_kyprp'] = 0;
		        $dtmp['prp_secc'] = "PRPASG";
		        $dtmp['prp_prop'] = $hoja->getCellByColumnAndRow(10, $fil)->getValue();
		        $dtmp['prp_dscr'] = $hoja->getCellByColumnAndRow(10, $fil)->getValue();
		        $dtmp['prp_nive'] = 2;
		        $dtmp = $this->run("adm/CtrlPropiedad",$dtmp);
		        $data['asg'] = $dtmp['prp'];
		        
		        /** **************************************************************
		         ** Registrar un nuevo usuario aqui se ingresa lo siguiente
		         ** **************************************************************/
		        $dtmp = Array();
		        $dtmp["usu_kyusu"] = 0;
		        $dtmp["usu_tdoc"] = "DNI";
		        $dtmp['usu_ndoc'] = $hoja->getCellByColumnAndRow(2, $fil)->getValue();
		        $dtmp['usu_nomb'] = $hoja->getCellByColumnAndRow(3, $fil)->getValue();
		        $dtmp['usu_mail'] = $hoja->getCellByColumnAndRow(7, $fil)->getValue();
		        $dtmp["usu_pass"] = "1234";
		        $dtmp = $this->run("cmn/register",$dtmp);
		        $data['pfo'] = $dtmp['usu'];

		        /** *****************************************************
		         ** Si se agrego un nuevo ROL para relacionarlo al PERFIL
		         ** *****************************************************/
		        $dtmp = Array();
		        $dtmp['comando'] = "AGREGAR";
		        $dtmp['dbapp'] = "cmn";
		        $dtmp['rol_kyrol'] = "0";
		        $dtmp['rol_kycom'] = $_SESSION['com']['com_kycom'];
		        $dtmp['rol_kyusu'] = $data['pfo']['usu_kyusu'];
		        $dtmp['rol_kyprf'] = $data['prf']['prf_kyprf'];
		        $dtmp = $this->run("cmn/CtrlRoles",$dtmp);
		        $data['rol'] = $dtmp['rol'];
		        $data['msg'] = $dtmp['msg'];
		        
		        $dtmp = Array();
		        $dtmp['asg_kyasg'] = 0;
		        $dtmp['asg_kypfo'] = $data['pfo']['usu_kyusu'];
		        $dtmp['asg_kymtr'] = "";
		        $dtmp['asg_kyevl'] = $data['evl']['prp_kyprp'];
		        $dtmp['asg_nomb'] = $data['asg']['prp_prop'];
		        $data['asg'] = $dtmp;
		        
		        $dtmp = Array("pfo"=>$data['pfo'], "asg"=>$data['asg']);
		        
		        array_push($listaProfAsig, Array("pfo"=>$data['pfo'], "asg"=>$data['asg']));
		    }
		    /** *********************************************************************
		     ** Se agrega un nuevo PERFIL de PROFESOR para operaciones con evaluacion
		     ** *********************************************************************/
		    $dtmp = Array();
		    $dtmp['comando'] = "AGREGAR";
		    $dtmp['dbapp'] = "cmn";
		    $dtmp['prf_kyprf'] = "0";
		    $dtmp['prf_nomb'] = "ALUMNO";
		    $dtmp = $this->run("cmn/CtrlPerfil",$dtmp);
		    $data['prf'] = $dtmp['prf'];
		    $data['msg'] = $dtmp['msg'];

		    for($ite=0; $ite<count($listaProfAsig); $ite++)
		    {
		        $data['pfo'] = $listaProfAsig[$ite]['pfo'];
		        $data['asg'] = $listaProfAsig[$ite]['asg'];
		        for ($fil = 23; $fil <= $ultimafila; $fil++)
		        {
		            /** **************************
		             ** Validar campos con dato
		             ** **************************/
		            $totalVacio = 0;
		            $listaColumna = Array(0=>2, 1=>3, 2=>5, 3=>7, 4=>10, 5=>12);
		            foreach($listaColumna as $key=>$val)
		            {
		                $valor = $hoja->getCellByColumnAndRow($listaColumna[$key], $fil)->getValue();
		                if(trim($valor)==""){$totalVacio++;}
		            }
		            if($totalVacio > 0){break;}
		            
		            /** ***************************
		             ** Registrar un nuevo usuario
		             ** ***************************/
		            $usu_fnac = $hoja->getCellByColumnAndRow(12, $fil)->getValue();
		            $usu_fnac = substr($usu_fnac, 6, 4)."-".substr($usu_fnac, 3, 2)."-".substr($usu_fnac, 0, 2);
		            $dtmp = Array();
		            $dtmp["usu_kyusu"] = 0;
		            $dtmp["usu_tdoc"] = "DNI";
		            $dtmp["usu_ndoc"] = $hoja->getCellByColumnAndRow(2, $fil)->getValue();
		            $dtmp["usu_nomb"] = $hoja->getCellByColumnAndRow(3, $fil)->getValue();
		            $dtmp["usu_dire"] = $hoja->getCellByColumnAndRow(7, $fil)->getValue();
		            $dtmp["usu_mail"] = $hoja->getCellByColumnAndRow(10, $fil)->getValue();
		            $dtmp["usu_pass"] = "1234";
		            $dtmp["usu_fnac"] = $usu_fnac;
		            $dtmp = $this->run("cmn/register",$dtmp);
		            $data['alu'] = $dtmp['usu'];
		            
		            /** *****************************************************
		             ** Si se agrego un nuevo ROL para relacionarlo al PERFIL
		             ** *****************************************************/
		            $dtmp = Array();
		            $dtmp['comando'] = "AGREGAR";
		            $dtmp['dbapp'] = "cmn";
		            $dtmp['rol_kyrol'] = "0";
		            $dtmp['rol_kycom'] = $_SESSION['com']['com_kycom'];
		            $dtmp['rol_kyusu'] = $data['alu']['usu_kyusu'];
		            $dtmp['rol_kyprf'] = $data['prf']['prf_kyprf'];
		            $dtmp = $this->run("cmn/CtrlRoles",$dtmp);
		            $data['rol'] = $dtmp['rol'];
		            $data['msg'] = $dtmp['msg'];

		            /** *****************************************************
		             ** Si se agrego un nuevo ROL para relacionarlo al PERFIL
		             ** *****************************************************/
		            $dtmp = Array();
		            $dtmp['comando'] = "AGREGAR";
		            $dtmp['dbapp'] = "clg";
		            $dtmp['mtr_kymtr'] = 0;
		            $dtmp['alu_kyusu'] = $data['alu']['usu_kyusu'];
		            $dtmp['main_kysuc'] = $_SESSION['suc']['suc_kysuc'];
		            $dtmp['mtr_peri'] = $hoja->getCellByColumnAndRow(2, 4)->getValue();
		            $dtmp['mtr_prog'] = $hoja->getCellByColumnAndRow(4, 4)->getValue();
		            $dtmp['mtr_grad'] = $hoja->getCellByColumnAndRow(6, 4)->getValue();
		            $dtmp['mtr_turn'] = $hoja->getCellByColumnAndRow(8, 4)->getValue();
		            $dtmp['aul_prop'] = $hoja->getCellByColumnAndRow(10, 4)->getValue();
		            $dtmp['mtr_nive'] = $hoja->getCellByColumnAndRow(12, 4)->getValue();
	                $dtmp = $this->run("clg/CtrlMatricula",$dtmp);
	                $data['mtr'] = $dtmp['mtr'];
	                $data['msg'] = $dtmp['msg'];

	                $dtmp = Array();
	                $dtmp['comando'] = "AGREGAR";
	                $dtmp['dbapp'] = "clg";
	                $dtmp['asg_kyasg'] = 0;
	                $dtmp['pfo_kyusu'] = $data['pfo']['usu_kyusu'];
	                $dtmp['asg_kymtr'] = $data['mtr']['mtr_kymtr'];
	                $dtmp['evl_kyprp'] = $data['evl']['prp_kyprp'];
	                $dtmp['asg_prop'] = $data['asg']['asg_nomb'];
	                $dtmp = $this->run("clg/CtrlAsignatura",$dtmp);
	                $data['asg'] = $dtmp['asg'];
	                $data['msg'] = $dtmp['msg'];
		        }
		    }//for($ite=0; $ite<= count($listaProfAsig); $ite++)
		    if(!isset($data['msg'])){$data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)." No hay comando accion o verificar clave");}
		    $result = $data;
		    
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
}
?>