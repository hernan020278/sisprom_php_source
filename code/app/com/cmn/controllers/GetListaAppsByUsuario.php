<?php 
class GetListaAppsByUsuario extends Controlador
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
 			$data = $this->getFiltro($data);//Inicio 
 		 	
 			$data['dbResp'] = "LISTA";
 			
 			$where = "where 1=1 and app.pol_nive=1";
			
 			if($this->util->exist($data,'pol_kypol')){$where.=" and (app.pol_kypol = '".$data['pol_kypol']."')";}
			if($this->util->exist($data,'com_kycom')){$where.=" and (com.com_kycom = '".$data['com_kycom']."')";}
			if($this->util->exist($data,'usu_kyusu')){$where.=" and (usu.usu_kyusu = '".$data['usu_kyusu']."')";}
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "SELECT com.com_kycom, com.com_ndoc, com.com_nomb, com.com_kyusu, com.com_dscr, com.com_tipo,
                usu.usu_kyusu, usu.usu_nomb, usu.usu_mail, usu.usu_fini, usu.usu_ffin,
                app.pol_kypol, app.pol_nomb, app.pol_dscr, app.pol_imin, app.pol_imax, app.pol_temp, app.pol_nive
                FROM cmn_comapp cap
                INNER JOIN cmn_usuario usu on usu.usu_kyusu=cap.cap_kyusu
                INNER JOIN cmn_comunidad com on com.com_kycom=cap.cap_kycom
                INNER JOIN cmn_politica app on app.pol_kypol=cap.cap_kyapp
                $where
                GROUP BY com.com_kycom, com.com_ndoc, com.com_nomb, com.com_kyusu, com.com_dscr, com.com_tipo,
                usu.usu_kyusu, usu.usu_nomb, usu.usu_mail, usu.usu_fini, usu.usu_ffin,
                app.pol_kypol, app.pol_nomb, app.pol_dscr, app.pol_imin, app.pol_temp";
			}
			else{$data['sql'] = $data['sql'].$where;}

			$data = $this->getLista($data);
			$data['lisCom'] = Array();    
			foreach ($data['lista']['items'] as $clave=> $valor)
			{
			    $dtmp = Array();
			    $dtmp['modulo']  = "imagen";
			    $dtmp['dbapp'] = "cmn";
			    $dtmp['archivo'] = $valor['pol_imin'];
			    $dtmp = $this->util->getPathExterna($dtmp);
			    $valor['pol_imin'] = $dtmp['rutaArchivo'];
			    $data['lista']['items'][$clave]['pol_imin'] = $dtmp['rutaArchivo'];
			    
			    $dtmp['archivo'] = $valor['pol_imax'];
			    $dtmp = $this->util->getPathExterna($dtmp);
			    $valor['pol_imax'] = $dtmp['rutaArchivo'];
			    $data['lista']['items'][$clave]['pol_imax'] = $dtmp['rutaArchivo'];
			    
			    if(isset($valor['com_kycom']))
			    {
			        if(!isset($data['lisCom'][$valor['com_kycom']]))
			        {
			            $data['lisCom'][$valor['com_kycom']]=Array();
			            $data['lisCom'][$valor['com_kycom']]['lisApp']=Array();
			        }
			        $data['lisCom'][$valor['com_kycom']]['com_kycom']=$valor['com_kycom'];
			        $data['lisCom'][$valor['com_kycom']]['com_ndoc']=$valor['com_ndoc'];
			        $data['lisCom'][$valor['com_kycom']]['com_nomb']=$valor['com_nomb'];
			        
			        if(!isset($data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]))
			        {
			            $data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]=Array();
			        }
			        $data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]['pol_kypol']=$valor['pol_kypol'];
			        $data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]['pol_nomb']=$valor['pol_nomb'];
			        $data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]['pol_dscr']=$valor['pol_dscr'];
			        $data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]['pol_imin']=$valor['pol_imin'];
			        $data['lisCom'][$valor['com_kycom']]['lisApp'][$valor['pol_kypol']]['pol_imax']=$valor['pol_imax'];
			    }//if(isset($valor['com_kycom']))
			}
			$result = $data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	
}
?>