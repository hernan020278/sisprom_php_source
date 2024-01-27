<?php 
class GetListaAsistencia extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
		$data = Array();
		$data['ast_kyast'] = 11;
		$data = $this->ejecutar($data);
		var_dump($data);
	}	
 	public function ejecutar($data)
 	{
 		$result = null;
 		try
 		{
			$data = $this->getFiltro($data);//Inicio 
			
			$data['dbResp'] = "LISTA";

			$where = "WHERE 1=1";

			if($this->util->exist($data,'alu_kyusu')){$where.=" AND (alu.usu_kyusu='".$data['alu_kyusu']."')";}
			if($this->util->exist($data,'mtr_kymtr')){$where.=" and (mtr.mtr_kymtr='".$data['mtr_kymtr']."')";}
			if($this->util->exist($data,'mtr_peri')){$where.=" and (mtr.mtr_peri='".$data['mtr_peri']."')";}
			if($this->util->exist($data,'mtr_prog')){$where.=" and (mtr.mtr_prog='".$data['mtr_prog']."')";}
			if($this->util->exist($data,'mtr_nive')){$where.=" and (mtr.mtr_nive='".$data['mtr_nive']."')";}
			if($this->util->exist($data,'mtr_grad')){$where.=" and (mtr.mtr_grad='".$data['mtr_grad']."')";}
			if($this->util->exist($data,'mtr_turn')){$where.=" and (mtr.mtr_turn='".$data['mtr_turn']."')";}
			if($this->util->exist($data,'mtr_aula')){$where.=" and (mtr.mtr_aula='".$data['mtr_aula']."')";}
			if($this->util->exist($data,'asg_nomb')){$where.=" and (asg.asg_nomb='".$data['asg_nomb']."')";}
			if($this->util->exist($data,'ast_kyast')){$where.=" AND (ast.ast_kyast='".$data['ast_kyast']."')";}
			if($this->util->exist($data,'ast_kyasg')){$where.=" AND (ast.ast_kyasg='".$data['ast_kyasg']."')";}
			if($this->util->exist($data,'ast_fing')){$where.=" AND (ast.ast_fing='".$data['ast_fing']."')";}
			if($this->util->exist($data,'ast_fsal')){$where.=" AND (ast.ast_fsal='".$data['ast_fsal']."')";}
			if($this->util->exist($data,'asg_peri')){$where.=" AND (CONCAT(YEAR(ast.ast_fing), LPAD(MONTH(ast.ast_fing), 2, '0'))='".$data['asg_peri']."')";}
			
			
			if($this->util->get($data,'sql')=="")
			{
			    if($this->util->get($data,'tipo')=="ASTHIS")
			    {
			        $data['sql'] = "SELECT pdr.ast_nomb pdr_nomb, pdr.ast_dscr pdr_dscr, pdr.ast_valo pdr_valo, ast.ast_kyast, ast.ast_kypdr, ast.ast_orde, ast.ast_nive, ast.ast_freg, ast.ast_nomb, ast.ast_dscr, ast.ast_valo 
                    FROM asi_asistencia ast ".$where;
			    }
			    else if($this->util->get($data,'tipo')=="ASTPERI")
			    {
			        $data['sql'] = "SELECT asg.asg_kyasg, asg.asg_nomb, CONCAT(YEAR(ast.ast_fing), LPAD(MONTH(ast.ast_fing), 2, '0')) asg_peri, YEAR(ast.ast_fing) asg_anio, MONTH(ast.ast_fing) asg_mese
			        FROM clg_asignatura asg
			        INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
			        INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
			        LEFT JOIN asi_asistencia ast ON ast.ast_kyasg=asg.asg_kyasg
			        $where AND YEAR(ast.ast_fing)>0 AND MONTH(ast.ast_fing)>0
			        GROUP BY asg.asg_kyasg, asg.asg_nomb, CONCAT(YEAR(ast.ast_fing), LPAD(MONTH(ast.ast_fing), 2, '0'))";
			        
			    }
		        else if($this->util->get($data,'tipo')=="MATRASIT")
		        {
			        $data['sql'] = "SELECT asg.asg_kyasg, asg.asg_nomb, alu.usu_kyusu, alu.usu_nomb, 1 usu_orde, asg.asg_pres, asg.asg_tard, asg.asg_falt, asg.asg_tasi, 1 asg_nive,
    				CONCAT(YEAR(ast.ast_fing), LPAD(MONTH(ast.ast_fing), 2, '0')) asg_peri, MONTH(ast.ast_fing) asg_mese, YEAR(ast.ast_fing) asg_anio, 2 ´per_nive, 
                    ast.ast_kyast, ast.ast_turn, ast.ast_fing, ast.ast_eing, ast.ast_fsal, ast.ast_esal, ast.ast_mreg, 3 ast_nive
    				FROM clg_asignatura asg
    				INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
    				INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
    				LEFT JOIN asi_asistencia ast ON ast.ast_kyasg=asg.asg_kyasg
    				$where
    				GROUP BY asg.asg_kyasg, asg.asg_nomb, asg.asg_pres, asg.asg_tard, asg.asg_falt, alu.usu_kyusu, alu.usu_nomb,
    				ast.ast_kyast, ast.ast_turn, ast.ast_fing, ast.ast_eing, ast.ast_fsal, ast.ast_esal, ast.ast_mreg";
			    }
			    else if($this->util->get($data,'tipo')=="ASGAST")
			    {
			        $data['sql'] = "SELECT asg.asg_kyasg aky, asg.asg_nomb anm, 1 aor, alu.usu_kyusu, alu.usu_nomb,
    				ast.ast_kyast kya, ast.ast_turn tra, CONCAT(YEAR(ast.ast_fing), '-', LPAD(MONTH(ast.ast_fing), 2, '0')) pra, ast.ast_fing fia, ast.ast_eing eia, ast.ast_fsal fsa, ast.ast_esal esa, ast.ast_mreg mra
    				FROM clg_asignatura asg
    				INNER JOIN clg_matricula mtr ON mtr.mtr_kymtr=asg.asg_kymtr
                    INNER JOIN cmn_usuario alu ON alu.usu_kyusu=mtr.mtr_kyalu
    				LEFT JOIN asi_asistencia ast ON ast.ast_kyasg=asg.asg_kyasg
    				$where
    				GROUP BY asg.asg_kyasg, asg.asg_nomb, alu.usu_kyusu, alu.usu_nomb,
    				ast.ast_kyast, ast.ast_turn, ast.ast_fing, ast.ast_eing, ast.ast_fsal, ast.ast_esal, ast.ast_mreg";
			    }
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);

			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>