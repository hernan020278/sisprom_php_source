<?php 
class rep_ven_con extends Controlador
{
	public function __construct() {parent::__construct();}

 	public function printReport($data)
 	{
 		$result = null;
 		try
 		{
			$suc_kysucu = ((isset($data['suc_kysucu']))?$data['suc_kysucu']:"");
 			$usu_kyusu = ((isset($data['usu_kyusu']))?$data['usu_kyusu']:"");
 			$usu_tipo = ((isset($data['usu_tipo']))?$data['usu_tipo']:"");
 			$doc_kaut = ((isset($data['doc_kaut']))?$data['doc_kaut']:"");
 			$doc_fini = ((isset($data['doc_fini']))?$data['doc_fini']:date('Y-m-d'));
 			$doc_ffin = ((isset($data['doc_ffin']))?$data['doc_ffin']:date('Y-m-d'));
 			$doc_fpag = ((isset($data['doc_fpag']))?$data['doc_fpag']:"");
 			
 			$modulo = $data['modulo'];
 			$reportName = $data['reportName'];
 			$reportTitle = $data['reportTitle'];
 			$format = $data['optFormat'];
 			
 			$reportData = Array();
 			
 			$reportData['data']['fini']=$doc_fini;
 			$reportData['data']['ffin']=$doc_ffin;
 			
 			$reportData['data']['tipOpe'] = $this->util->tipOpe;
 			$reportData['data']['tipDoc'] = $this->util->tipDoc;
 			$reportData['data']['estado'] = $this->util->estado;
 			
 			$where = "doc.esta!='9999' and doc.esta!='0003'";
//  			and art.tipo='SERVICIO'
 			
 			if(!empty($suc_kysucu)){$where.=" and doc.id_sucu=".$suc_kysucu;}
 			if(!empty($usu_kyusu))
 			{
 				if(!empty($usu_tipo) && $usu_tipo=="TRA"){$where.=" and doc.id_trab=".$usu_kyusu;}
 				if(!empty($usu_tipo) && ( $usu_tipo=="CLI" || $usu_tipo=="PRO" ) ){$where.=" and pdr.id_enti=".$usu_kyusu;}
 				if(!empty($usu_tipo) && ( $usu_tipo=="COM" ) ){$where.=" and cli.id_enti=".$usu_kyusu;}
 			}
 			if(!empty($doc_fpag)){$where.=" and doc.fpag='".$doc_fpag."'";}
 			if(!empty($doc_fini) && !empty($doc_ffin)){$where.=" and (date(doc.freg)>='".$doc_fini."' and date(doc.freg)<='".$doc_ffin."')";}
 			if(!empty($doc_kaut)){$where.=" and doc.tope='0008' and doc.todr='0002'";}
 			else{$where.=" and doc.tope='0002'";}
 			
 			$lisArt=$this->articulo->getLista("SELECT", 0, 10, "art.esta='0001' and art.tipo='SERVICIO'");
 			$lisArt=$this->util->objToArray($lisArt);
 			$lisArtHead = Array();
 			foreach ($lisArt as $key => $value)
 			{
 				$lisArtHead['9999']['headNomb']='DP';
 				$lisArtHead['9999']['impo']=0.00;
 				$lisArtHead[$value['id_arti']]['id_arti']=$value['id_arti'];
 				$lisArtHead[$value['id_arti']]['headNomb']=$value['nomb'];
 				$lisArtHead[$value['id_arti']]['headPrec']="Precio";
 				$lisArtHead[$value['id_arti']]['cant']=0.00;
 				$lisArtHead[$value['id_arti']]['prec']=0.00;
 			}
 			$data['data']['lisArtHead']=$lisArtHead;
 			
 			$lisVenCli=$this->documento->listaExportWithParent("SELECT", 0, 10000, $where, "");
 			$lisVenCli=$this->util->objToArray($lisVenCli);
 			$rpta = Array();
 			if(count($lisVenCli)>0){
 				foreach($lisVenCli as $item){
 					if(!isset($rpta[$item['cliId_enti']]))
 					{
 						$rpta[$item['cliId_enti']]['pdrNomb']=$item['pdrNomb'];
 						$rpta[$item['cliId_enti']]['cliCodi']=$item['cliCodi'];
 						$rpta[$item['cliId_enti']]['cliNomb']=$item['cliNomb'];
 						
 						$rpta[$item['cliId_enti']]['cliNdoc']=$item['cliNdoc'];
 						$rpta[$item['cliId_enti']]['catNomb']=$item['catNomb'];
 						$rpta[$item['cliId_enti']]['areNomb']=$item['areNomb'];
 						$rpta[$item['cliId_enti']]['denNomb']=$item['denNomb'];
 						$rpta[$item['cliId_enti']]['divNomb']=$item['divNomb'];
 						$rpta[$item['cliId_enti']]['gruNomb']=$item['gruNomb'];
 						$rpta[$item['cliId_enti']]['cliEsta']=$item['cliEsta'];
 						
 						$rpta[$item['cliId_enti']]['lisArtCli']=$lisArtHead;
 						if(isset($lisArtHead[$item['id_arti']])){$rpta[$item['cliId_enti']]['lisArtCli'][$item['id_arti']]['cant']=0.00;}
 						$rpta[$item['cliId_enti']]['total']=0;
 					}
 					if(isset($rpta[$item['cliId_enti']]['lisArtCli'][$item['id_arti']]) && $item['tipo']=="SERVICIO")
 					{
 						$rpta[$item['cliId_enti']]['lisArtCli'][$item['id_arti']]['cant']+=$item['cant'];
 						$rpta[$item['cliId_enti']]['lisArtCli'][$item['id_arti']]['prec']=$item['prec'];
 					}
 					if(!isset($rpta[$item['cliId_enti']]['lisArtCli'][$item['id_arti']]) && $item['tipo']=="PRODUCTO")
 					{
 						$rpta[$item['cliId_enti']]['lisArtCli']['9999']['impo']+=$item['impo'];
 					}
 				}
 			}
			$data['data']['lisVenCli']=$rpta; 			
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
}
?>