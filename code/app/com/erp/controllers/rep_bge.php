<?php 
class rep_bge extends Controlador
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
 			$cat_tipo = ((isset($data['cat_tipo']))?$data['cat_tipo']:"");
 			
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
 			
 			$where = "doc.esta!='0000' and doc.esta!='0003'";
 			
 			if(!empty($doc_kaut) && $doc_kaut==1){$where.=" and doc.tdoc='0006'";}
 			
 			if(!empty($doc_fini) && !empty($doc_ffin)){$where.=" and (date(doc.freg)>='".$doc_fini."' and date(doc.freg)<='".$doc_ffin."')";}
 			else{$where.="and doc.tope='0002'";}

 			$reportData['data']['respNiv1']=$this->llenarTablaBalance($doc_fini, $doc_ffin, $cat_tipo);
 			
			$data['data']=$reportData['data'];
 			$result=$data;
 		} catch (Exception $e) {
 			throw $e;
 		}
 		return $result;
 	}
 	function llenarTablaBalance($fini, $ffin, $tipo) {
 	
 		$this->igvSunat = (18 / 100.0) + 1.0;
 	
 		$listaBalance = $this->obtenerListaBalance($tipo);
 		$arrKardex = null;
 		$data = Array();
 		for ($ite=0; $ite < count($listaBalance); $ite++) {
 			$this->iniciarCantidadImporteBalance();
 			// String[] regTab = ((String) liBal.get(ite)).split("#");
 			$varArtCat;
 			$varLocDes;
 			$artCatFiltro = $tipo;
 			$dscr='';
 	
 			if ($artCatFiltro == "LOCALES") {
 				$varLocDes = $listaBalance[$ite]->nomb;
 				$varArtCat = "LOCALES";
 			}
 			else {
 				if ($artCatFiltro=="CATEGORIAS") {
 					$varLocDes = "CATEGORIAS";
 					$varArtCat = $listaBalance[$ite]->nomb;
 				}
 				else {
 					$varLocDes = $listaBalance[$ite]->nomb;
 					$varArtCat = $artCatFiltro;
 				}
 			}
 			// 			$this->obtenerCantidadImporteBalance($fini, $ffin, $varLocDes, $varArtCat);
 			$arrKardex = $this->documento->obtenerValoresKardex($fini, $ffin, $varLocDes, $varArtCat);
 			$arrVenta = $this->documento->obtenerValoresVenta($fini, $ffin, $varLocDes, $varArtCat);
 	
 			$data['data'][$ite] = new stdClass();
 			$data['data'][$ite]->nomb=$listaBalance[$ite]->nomb;
 			if(isset($arrKardex[$listaBalance[$ite]->nomb])){
 				$this->sini=$arrKardex[$listaBalance[$ite]->nomb]['sini'];
 	
 				$this->ingr=$arrKardex[$listaBalance[$ite]->nomb]['ingr'];
 				$this->comp=$arrKardex[$listaBalance[$ite]->nomb]['comp'];
 				$this->trin=$arrKardex[$listaBalance[$ite]->nomb]['trin'];
 	
 				$this->egre=$arrKardex[$listaBalance[$ite]->nomb]['egre'];
 				$this->vent=$arrKardex[$listaBalance[$ite]->nomb]['vent'];
 				$this->treg=$arrKardex[$listaBalance[$ite]->nomb]['treg'];
 	
 				$this->sald=$arrKardex[$listaBalance[$ite]->nomb]['sald'];
 				$this->valo=$arrKardex[$listaBalance[$ite]->nomb]['valo'];
 				$this->cove=$arrKardex[$listaBalance[$ite]->nomb]['cove'];
 			}//if(in_array($listaBalance[$ite]->nomb, $arrKardex)){
 	
 	
 			if(isset($arrVenta[$listaBalance[$ite]->nomb]) && isset($arrKardex[$listaBalance[$ite]->nomb])){
 				$this->imve=$arrVenta[$listaBalance[$ite]->nomb]['vent'];
 				$this->imdc=$arrVenta[$listaBalance[$ite]->nomb]['dcto'];
 			}//if(in_array($listaBalance[$ite]->nomb, $arrVenta)){
 	
 			$this->gast=0.00;
 			$this->igve = ( $this->imve / $this->igvSunat * ( $this->igvSunat - 1.0 ) ) - ( $this->cove * ( $this->igvSunat - 1.0 ) );
 			$this->gana = $this->imve - $this->cove;
 			$this->util = $this->gana - $this->gast - $this->igve;
 	
 			$this->igve = $this->igve;
 			$this->gana = $this->gana;
 			$this->util = $this->util;
 	
 			$this->totalsini+=$this->sini;
 			$this->totalingr+=$this->ingr;
 			$this->totalcomp+=$this->egre;
 			$this->totaltrin+=$this->trin;
 			$this->totalegre+=$this->egre;
 			$this->totalvent+=$this->vent;
 			$this->totaltreg+=$this->treg;
 			$this->totalsald+=$this->sald;
 			$this->totalvalo+=$this->valo;
 			$this->totalcove+=$this->cove;
 			$this->totalimve+=$this->imve;
 			$this->totalimdc+=$this->imdc;
 			$this->totalgast+=$this->gast;
 			$this->totaligve+=$this->igve;
 			$this->totalgana+=$this->gana;
 			$this->totalutil+=$this->util;
 	
 			$data['data'][$ite]->sini=number_format($this->sini,0);
 	
 			$data['data'][$ite]->ingr=number_format($this->ingr,0);
 			$data['data'][$ite]->comp=number_format($this->comp,0);
 			$data['data'][$ite]->trin=number_format($this->trin,0);
 	
 			$data['data'][$ite]->egre=number_format($this->egre,0);
 			$data['data'][$ite]->vent=number_format($this->vent,0);
 			$data['data'][$ite]->treg=number_format($this->treg,0);
 	
 			$data['data'][$ite]->sald=number_format($this->sald,0);
 			$data['data'][$ite]->valo=number_format($this->valo,2);
 			$data['data'][$ite]->cove=number_format($this->cove,2);
 	
 			$data['data'][$ite]->imve=number_format($this->imve,2);
 			$data['data'][$ite]->imdc=number_format($this->imdc,2);
 	
 			$data['data'][$ite]->gast=number_format($this->gast,2);
 			$data['data'][$ite]->igve=number_format($this->igve,2);
 			$data['data'][$ite]->gana=number_format($this->gana,2);
 			$data['data'][$ite]->util=number_format($this->util,2);
 		}
 		$data['data'][$ite] = new stdClass();
 		$data['data'][$ite]->nomb='Totales';
 		$data['data'][count($listaBalance)]->sini=number_format($this->totalsini,0);
 	
 		$data['data'][count($listaBalance)]->ingr=number_format($this->totalingr,0);
 		$data['data'][count($listaBalance)]->comp=number_format($this->totalcomp,0);
 		$data['data'][count($listaBalance)]->trin=number_format($this->totaltrin,0);
 	
 		$data['data'][count($listaBalance)]->egre=number_format($this->totalegre,0);
 		$data['data'][count($listaBalance)]->vent=number_format($this->totalvent,0);
 		$data['data'][count($listaBalance)]->treg=number_format($this->totaltreg,0);
 	
 		$data['data'][count($listaBalance)]->sald=number_format($this->totalsald,0);
 		$data['data'][count($listaBalance)]->valo=number_format($this->totalvalo,2);
 		$data['data'][count($listaBalance)]->cove=number_format($this->totalcove,2);
 	
 		$data['data'][count($listaBalance)]->imve=number_format($this->totalimve,2);
 		$data['data'][count($listaBalance)]->imdc=number_format($this->totalimdc,2);
 	
 		$data['data'][count($listaBalance)]->gast=number_format( $this->totalgast,2);
 		$data['data'][count($listaBalance)]->igve=number_format( $this->totaligve,2);
 		$data['data'][count($listaBalance)]->gana=number_format( $this->totalgana,2);
 		$data['data'][count($listaBalance)]->util=number_format( $this->totalutil,2);
 	
 		return $data['data'];
 	}
 	function iniciarCantidadImporteBalance() {
 		$this->sini=0.00;
 	
 		$this->ingr=0.00;
 		$this->comp=0.00;
 		$this->trin=0.00;
 			
 		$this->egre=0.00;
 		$this->vent=0.00;
 		$this->treg=0.00;
 	
 		$this->sald=0.00;
 		$this->valo=0.00;
 		$this->cove=0.00;
 	
 		$this->imve=0.00;
 		$this->imdc=0.00;
 	
 		$this->gast = 0.00;
 		$this->igve = 0.00;
 		$this->gana = 0.00;
 		$this->util = 0.00;
 	}
 	function obtenerCantidadImporteBalance($fini, $ffin, $parLocDes, $parArtCat) {
 		$this->igv = ($this->valorIgv / 100.0) + 1.0;
 	
 		$this->trin = $this->documento->obtenerTransfArticuloLocal($fini, $ffin, $parLocDes, "0003", $parArtCat);
 		$this->ingr = $this->documento->obtenerTransfArticuloLocal($fini, $ffin, $parLocDes, "0007", $parArtCat);
 		$this->egre = $this->documento->obtenerTransfArticuloLocal($fini, $ffin, $parLocDes, "0008", $parArtCat);
 	
 		$this->saldo=0.00;
 		$this->sini = $this->documento->obtenerSaldoAnteriorArticuloLocal($fini, $ffin, $varLocDes, $varArtCat);
 		$this->saldo += $this->sini;
 	
 		$this->ventaMayor = $this->documento->obtenerVentaArticuloLocal($fini, $ffin, $parLocDes, "0002", $parArtCat, "MAYOR");
 		$this->ventaUnid = $this->documento->obtenerVentaArticuloLocal($fini, $ffin, $parLocDes, "0002", $parArtCat, "MENOR");
 	
 		if ($this->chkCompra) {
 			$this->valorizado = $this->documento->obtenerCostoOperacion($fini, $ffin, $parLocDes, "0001", $parArtCat);
 		}
 		else {
 			$this->valorizado = $this->documento->obtenerValorizadoArticuloLocal($fini, $ffin, $parLocDes, $parArtCat);
 		}
 	
 		$this->costoVenta = $this->documento->obtenerCostoOperacion($fini, $ffin, $parLocDes, "0002", $parArtCat);
 	
 		$importe = $this->documento->obtenerValorVenta($fini, $ffin, $parLocDes, "0002", $parArtCat);
 		$this->valorVenta = $importe;
 		$this->valorSunat = $importe;
 		$this->ventaBalance = ($this->chkSunat ? $this->valorSunat : $this->valorVenta);
 	
 		$this->igvSunat = ($this->ventaBalance / $this->igv * ($this->igv - 1.0)) - ($this->costoVenta * ($this->igv - 1.0));
 	
 		$this->gananciaRus = (($this->valorVenta - $this->costoVenta) - ($this->valorSunat / $this->igv * ($this->igv - 1.0)));
 		$this->gananciaRus = $this->gananciaRus + ($this->valorSunat / $this->igv * ($this->igv - 1.0)) - ($this->costoVenta * ($this->igv - 1.0));
 	
 		$this->dsctoVenta = $this->documento->obtenerDsctoVenta($fini, $ffin, $parLocDes, "0002", $parArtCat);
 	
 		$this->valorizado = ($this->chkIgv ? $this->valorizado * $this->igv : $this->valorizado);
 		$tmpCostoVenta = $this->costoVenta;
 		$tmpVentaBalance = $this->ventaBalance;
 	
 		$this->costoVenta = ($this->chkIgv ? $this->costoVenta * $this->igv : $this->costoVenta);
 		$this->ventaBalance = ($this->chkIgv ? $this->ventaBalance : $this->ventaBalance / $this->igv);
 		$this->dsctoVenta = ($this->chkIgv ? $this->dsctoVenta : $this->dsctoVenta / $this->igv);
 	
 		// 		if ($this->chkPrcGan) {
 		if ($this->chkPrcGan) {
 			if ($this->ventaBalance > 0 && $this->costoVenta > 0) {
 				$this->ganancia = (($this->ventaBalance / $this->costoVenta) - 1) * 100;
 			}else{
 				$this->ganancia = 0.00;
 			}
 		}else{
 			$this->ganancia = (($tmpVentaBalance - $tmpCostoVenta) - ($this->valorSunat / $this->igv * ($this->igv - 1.0)));
 		}
 	
 		//		$this->gasto = $this->documento->obtenerTotalGastos($fini, $ffin, $parLocDes, cmbTipoGasto.getSelectedItem().toString());
 		// 		if (cmbCtaNom.getSelectedIndex() > -1 && cmbCtaNom.getSelectedItem().toString().equals("TODOS S"))
 		// 		{
 		// 			$this->gasto = $this->documento->obtenerTotalGastosDeCuenta($fini, $ffin, $parLocDes, 100000);
 		$this->gasto=0.00;
 		// 		}
 		// 		else if (cmbCtaNom.getSelectedIndex() > -1 && cmbCtaNom.getSelectedItem().toString().equals("TODOS NS"))
 		// 		{
 		// 			$this->gasto = $this->documento->obtenerTotalGastosDeCuenta($fini, $ffin, $parLocDes, 200000);
 		// 			$this->gasto=0.00;
 		// 		}else
 		// 		{
 		// 			$this->gasto = $this->documento->obtenerTotalGastosDeCuenta($fini, $ffin, $parLocDes, man.cta.getCta_numcta());
 		// 			$this->gasto=0.00;
 		// 		}
 		$this->utilidad = ($this->chkPrcGan ? 0 : ($this->ganancia - $this->gasto));
 	
 		$this->totalTransf += $this->trin;
 		$this->totalIngreso += $this->ingr;
 		$this->totalEgreso += $this->egre;
 		$this->totalSaldo += $this->saldo;
 		$this->totalVentaMayor += $this->ventaMayor;
 		$this->totalVentaUnid += $this->ventaUnid;
 		$this->totalValorizado += $this->valorizado;
 		$this->totalCostoVenta += $this->costoVenta;
 		$this->totalValorVenta += $this->ventaBalance;
 		$this->totalIgvSunat += $this->igvSunat;
 		$this->totalDsctoVenta += $this->dsctoVenta;
 		$this->totalGanancia += $this->ganancia;
 		$this->totalGasto += $this->gasto;
 		$this->totalUtilidad += $this->utilidad;
 		$this->totalGananciaRus += $this->gananciaRus;
 	}
 	function obtenerListaBalance($artCatFiltro) {
 		$listaBalance = Array();
 		if ($artCatFiltro=="CATEGORIAS"){
 			$listaBalance = $this->documento->obtenerDBListaComboCategoria();
 		}else if ($artCatFiltro=="LOCALES"){
 			$listaBalance = $this->documento->obtenerListaLocales();
 		}
 		return $listaBalance;
 	} 	
 	private $chkCompra;
 	
 	private $sini=0.00;
 	private $ingr=0.00;
 	private $comp=0.00;
 	private $trin=0.00;
 	private $egre=0.00;
 	private $vent=0.00;
 	private $treg=0.00;
 	private $sald=0.00;
 	private $valo=0.00;
 	private $cove=0.00;
 	private $imve=0.00;
 	private $imdc=0.00;
 	private $gast=0.00;
 	private $igve=0.00;
 	private $gana=0.00;
 	
 	private $totalsini=0.00;
 	private $totalingr=0.00;
 	private $totalcomp=0.00;
 	private $totaltrin=0.00;
 	private $totalegre=0.00;
 	private $totalvent=0.00;
 	private $totaltreg=0.00;
 	private $totalsald=0.00;
 	private $totalvalo=0.00;
 	private $totalcove=0.00;
 	private $totalimve=0.00;
 	private $totalimdc=0.00;
 	private $totalgast=0.00;
 	private $totaligve=0.00;
 	private $totalgana=0.00;
 	private $totalutil=0.00;
 	
 	private $chkSunat=false;
 	private $chkIgv = false;
 	private $chkPrcGan = true;
}
?>