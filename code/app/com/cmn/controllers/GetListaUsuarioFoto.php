<?php 
class GetListaUsuarioFoto extends Controlador
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
			
			$where = "where 1=1";
			
			if($this->util->exist($data,'usu_kyusu')){$where.=" and (usu.usu_kyusu = '".$data['usu_kyusu']."')";}
			if($this->util->exist($data,'usu_kyusu')){$where.=" and (usu.usu_kyusu = '".$data['usu_kyusu']."')";}
 			if($this->util->exist($data,'usu_kycom')){$where.=" and (usu.usu_kycom = '".$data['usu_kycom']."')";}
			if($this->util->exist($data,'usu_kypdr')){$where.=" and (usu.usu_kypdr = '".$data['usu_kypdr']."')";}
			if($this->util->exist($data,'usu_nomb')){$where.=" and (usu.usu_nomb = '".$data['usu_nomb']."')";}
			if($this->util->exist($data,'usu_tdoc')){$where.=" and (usu.usu_tdoc = '".$data['usu_tdoc']."')";}
			if($this->util->exist($data,'usu_ndoc')){$where.=" and (usu.usu_ndoc = '".$data['usu_ndoc']."')";}
			if($this->util->exist($data,'usu_mail')){$where.=" and (usu.usu_mail = '".$data['usu_mail']."')";}			
			
			if($this->util->get($data,'usu_tipo')!="" 
			&& $this->util->get($data,'usu_tipo')!='ENTGENE' && $this->util->get($data,'usu_tipo')!='CLIPRO'
			&& $this->util->get($data,'usu_tipo')!='CLIPROTRA' && $this->util->get($data,'usu_tipo')!='CLITRA')
			{
				$where.=" and (usu.usu_tipo='".$data['usu_tipo']."')";
			}
			else if($this->util->get($data,'usu_tipo')=='ENTGENE'){$where.=" and (usu.usu_tipo='CLI' or usu.usu_tipo='PRV' or usu.usu_tipo='TRA' or usu.usu_tipo='EMP')";}
			else if($this->util->get($data,'usu_tipo')=='CLIPRO'){$where.=" and (usu.usu_tipo='CLI' or usu.usu_tipo='PRV')";}
			else if($this->util->get($data,'usu_tipo')=='CLIPROTRA'){$where.=" and (usu.usu_tipo='CLI' or usu.usu_tipo='PRV' or usu.usu_tipo='TRA')";}
			else if($this->util->get($data,'usu_tipo')=='CLITRA'){$where.=" and (usu.usu_tipo='CLI' or usu.usu_tipo='TRA')";}
			
			if($this->util->exist($data, "listaTipo"))
			{
				for($ite=0;$ite<count($data['listaTipo']);$ite++)
				{
					if($data['listaTipo'][$ite]=="SERVICIO")
					{
						$where.=" and art.art_tipo='".$data['listaTipo'][$ite]."' and art.art_nomb='".$data['listaValu'][$ite]."'";
					}
					else
					{
						$where.=" and tra.tra_".strtolower(substr($data['listaTipo'][$ite], 0, 4))."='".$data['listaValu'][$ite]."'";
					}
				}
			}

			if($this->util->get($data,'usu_esta','TODOS')!="TODOS")
			{
				if($this->util->exist($data,'usu_esta') && $this->util->get($data,'usu_esta')!="TODOS")
				{
					$where.=" and usu.usu_esta = '".$data['usu_esta']."'";
				}
				else{$where.=" and usu.usu_esta = '0001'";}
			}
				
			if($this->util->get($data,'term')!="Seleccione" && $this->util->get($data,'term')!="")
			{
				switch(strlen($this->util->get($data,'term'))){
					case 1:
						$where.=" and (usu.usu_nomb like '%' or usu.usu_ndoc like '%')";
						break;
					default:
						$where.=" and (usu.usu_nomb like '%".$data['term']."%' or usu.usu_ndoc like '%".$data['term']."%')";
						break;
				}//switch(strlen($this->util->get($data,'term'))){
			}			
			
			if($this->util->get($data,'sql')=="")
			{
				$data['sql'] = "select usu.usu_kyusu, usu.usu_codi, usu.usu_tipo,usu.usu_nomb,usu.usu_fnac,usu.usu_tele,usu.usu_mobi,usu.usu_mail,usu.usu_dire,usu.usu_firm,usu.usu_foto,
				tra.tra_vive, tra.tra_nace, tra.tra_aten, tra.tra_hor1, ctl.ctl_fing, ctl.ctl_prec
				from sex_entidad ent 
				inner join sex_trabajador tra on tra.tra_kyusu=usu.usu_kyusu
				inner join sex_catalogo ctl on ctl.ctl_kyusu=usu.usu_kyusu
				inner join sex_articulo art on art.art_kyart=ctl.ctl_kyart ".$where.
				" group by usu.usu_kyusu order by usu.usu_nomb asc";
			}
			else{$data['sql'] = $data['sql']." ".$where;}
			
			$data = $this->getLista($data);
			
			if($this->util->get($data,'term')!=="")
			{
				if((bool)$this->util->get($data, "mostrarSeleccion"))
				{
					$lista = Array();
					$obj = Array("usu_kyusu"=>"", "usu_nomb"=>"Seleccione", "usu_ndoc"=>"Seleccione", "usu_tipo"=>"EMP", "usu_tdoc"=>"DNI");
					array_push($lista, $obj);
					if(count($data['lista']['items'])>0){$data['lista']['items'] = array_merge($lista,$data['lista']['items']);}
					else{$data['lista']['items']=$lista;}
					if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 1 ){$data['lista']['items'] = Array();}
				}//if($data['mostrarSeleccion'])
				else{if(strlen($this->util->get($data,'term')) >= 3 && count($data['lista']['items']) == 0 ){$data['lista']['items'] = Array();}}
			}//if($this->util->get($data,'term')=="Seleccione")
					
			$data['msg'] = ((count($data['lista']) > 0) ? Array("type"=>"success","text"=>"Exito") : Array("type"=>"error","text"=>"Error") );

			$result = $data;
		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	} 	
}
?>