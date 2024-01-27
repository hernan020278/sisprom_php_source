<?php

class CtrlOperacion extends Controlador
{

  public function __construct()
  {
    parent::__construct();
  }

  public function index($data)
  {
    return $this->ejecutar($data);
  }

  public function ejecutar($data)
  {
    $result = null;
    try {
      $data = $this->getFiltro($data); // Inicio

      $this->dbcn->iniciarTransaccion($data);

      if ($this->util->get($data, "comando") == "AGREGAR" && $this->util->get($data, "ope_kyope", "-1") == "-1") {
        $dtmp = Array();
        $dtmp['ope_kycom'] = $_SESSION['com']['com_kycom'];
        $dtmp['ope_kycco'] = $data['cor_kycco'];
        $dtmp['ope_kyusu'] = $data['cor_kyusu'];
        $dtmp['ope_kyapc'] = $data['ope_kyapc'];
        $dtmp['ope_freg'] = $data['ope_freg'];
        $dtmp['ope_tope'] = $data['ope_tope'];
        $dtmp['ope_tdoc'] = $data['ope_tdoc'];
        $dtmp['ope_ndoc'] = $data['ope_ndoc'];

        $dtmp = $this->run("adm/GetListaOperacion", $dtmp);

        if (count($dtmp['lista']['items']) > 0) {
          $data['msg'] = Array(
            "type" => "error",
            "text" => "Clase:" . get_class($this) . "\n" . $dtmp['ope_tdoc'] . "-" . $dtmp['ope_ndoc'] . "-" . "Operacion existe"
          );
        } else {
          $data['msg'] = Array(
            "type" => "success",
            "text" => "Clase:" . get_class($this) . "\nExito"
          );
        }

        if ($data['msg']['type'] == "success") {
          $data = $this->guardarOperacion($data);
        } // if($data['msg']['type']=="success")
      } // if($this->util->get($data,"comando") == "AGREGAR" && $this->util->get($data,"prp_kyprp")=="-1")
      else if ($this->util->get($data, "comando") == "MODIFICAR" && $this->util->get($data, "ope_kyope") != "-1") {
        if ($_SESSION['com']['com_kyusu'] == $_SESSION['usu']['usu_kyusu']) {
          $data = $this->guardarOperacion($data);
        } else {
          $data['msg'] = Array(
            "type" => "error",
            "text" => "Clase:" . get_class($this) . "\nEsta operacion solo puede ser modificada por usuario creador"
          );
        }
      }
      else if ($this->util->get($data, "comando") == "ELIMINAR" && $this->util->get($data, "ope_kyope") != "-1") 
      {
        if ($_SESSION['com']['com_kyusu'] == $_SESSION['usu']['usu_kyusu']) {
          foreach ($data['lisKy'] as $key => $val) {
            if ($this->util->get($data, "where") == "") {
              $data['where'] = "WHERE ope_kyope = '" . $val['ky'] . "' OR ope_kyope = '" . $val['kyorf'] . "'";
            }
            $data = $this->delete($data, "adm_operacion");

            $this->actualizarDocumento($val);
          }
        } else {
          $data['msg'] = Array(
            "type" => "error",
            "text" => "Clase:" . get_class($this) . "\nEsta operacion solo elimina el usuario creador"
          );
        }
      }
      else if ($this->util->get($data, "comando") == "MODESTA" && $this->util->get($data, "ope_kyope") != "-1") 
      {
        // $data['ope_esta'] = "0001";
        $data['where'] = "where ope_kyope = '" . $data['ope_kyope'] . "'";
        $data = $this->update($data, "adm_operacion");

        $data['comandoPdf'] = "IMPRIMIR";
        $data = $this->generarPdf($data);
      } // else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="-1")
      else if ($this->util->get($data, "comando") == "IMPRIMIR" && $this->util->get($data, "ope_kyope") != "-1") {
        $data['comandoPdf'] = "IMPRIMIR";
        $data = $this->generarPdf($data);
      } // else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="-1")
      else if ($this->util->get($data, "comando") == "IMPRIMIRESTADOCUENTA" && $this->util->get($data, "ope_kyusu") != "-1") {
        $data['comandoPdf'] = "IMPRIMIR";
        $data = $this->generarEstadocuenta($data);
      } // else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="-1")
      else if ($this->util->get($data, "comando") == "ENVIAR_MAIL" && $this->util->get($data, "ope_kyope") != "-1") {
        $data = $this->enviarOperacionMail($data);
      } // else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="-1")
      else {
        $data['msg'] = Array(
          "type" => "error",
          "text" => "Clase:" . get_class($this) . "\nNo hay comando accion o verificar clave"
        );
      }

      $result['msg'] = $data['msg'];
      $result['ope_kyope'] = $this->util->get($data, "ope_kyope");

      $this->dbcn->finalizarTransaccion();
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function generarEstadocuenta($data)
  {
    $result = null;
    try {
      $dtmp = Array();
      $dtmp['bal_dire'] = "ADELANTE";
      $dtmp['bal_nact'] = "-1";
      $dtmp['bal_niv0'] = $this->util->get($data, "bal_niv0");
      $dtmp['bal_niv1'] = $this->util->get($data, "bal_niv1");
      $dtmp['usu_kyusu'] = $this->util->get($data['ent'], "usu_kyusu");
      $dtmp['listaOrden'] = $this->util->get($data, "listaOrden");
      $dtmp['ope_pini'] = $this->util->get($data, "ope_pini");
      $dtmp['ope_pfin'] = $this->util->get($data, "ope_pfin");

      $dtmp = $this->run("adm/GetListaDashboard", $dtmp);
      $listaDash = $dtmp['lista']['items'];

      $dtmp = Array();
      $dtmp['prp_kycom'] = $_SESSION['com']['com_kycom'];
      $dtmp['prp_secc'] = "PRCINT";
      $dtmp['prp_codi'] = "0001";

      $dtmp = $this->run("adm/GetListaPropiedad", $dtmp);
      $listaPrp = $dtmp['lista']['items'];

      $dtmp = Array();
      $dtmp['usu_kyusu'] = $this->util->get($data['ent'], "usu_kyusu");
      $dtmp['ope_pini'] = $this->util->get($data, "ope_pini");
      $dtmp['ope_pfin'] = $this->util->get($data, "ope_pfin");
      $dtmp['ope_esta'] = "0001";

      $dtmp = $this->run("adm/GetListaOperacion", $dtmp);
      $listaOpe = $dtmp['lista']['items'];

      $rpta = Array();
      foreach ($listaDash as $keyDash => $valDash) {
        if ($valDash['usu_kyusu'] == $this->util->get($data['ent'], "usu_kyusu")) {
          if (! isset($rpta['reporte'][0])) {
            $rpta['reporte'][0] = Array();
            $rpta['reporte'][0]['lista'] = Array();
          }
          $rpta['reporte'][0] = $valDash;
          if (count($listaPrp) > 0) {
            $rpta['reporte'][0]['prp_fini'] = $listaPrp[0]['prp_freg'];
            $rpta['reporte'][0]['prp_ffin'] = date('Y-m-d');
            $rpta['reporte'][0]['prp_dias'] = $this->util->entreFechas($listaPrp[0]['prp_freg'], date('Y-m-d'));
            $rpta['reporte'][0]['prp_iano'] = number_format(($listaPrp[0]['prp_valu'] / 100), 5);
            $rpta['reporte'][0]['prp_idia'] = number_format(($rpta['reporte'][0]['prp_iano'] / 365), 5);
            $rpta['reporte'][0]['prp_inte'] = number_format((($valDash['bal_ante'] + $valDash['bal_ingr'] - $valDash['bal_cost']) * $rpta['reporte'][0]['prp_idia'] * $rpta['reporte'][0]['prp_dias']), 2);
            $val_1 = $rpta['reporte'][0]['bal_ingr'];
            $val_2 = $rpta['reporte'][0]['bal_cost'];
            $val_3 = $rpta['reporte'][0]['prp_inte'];
            $rpta['reporte'][0]['bal_util'] = number_format((($rpta['reporte'][0]['bal_ingr'] - $rpta['reporte'][0]['bal_cost']) + $rpta['reporte'][0]['prp_inte']), 2);
          }

          foreach ($listaOpe as $keyOpe => $valOpe) {
            if (! isset($rpta['reporte'][0]['lista'][$valOpe['ope_otip']])) {
              $rpta['reporte'][0]['lista'][$valOpe['ope_otip']] = Array();
            }
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['ope_kyope'] = $valOpe['ope_kyope'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['ope_freg'] = $valOpe['ope_freg'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['usu_kyusu'] = $valOpe['usu_kyusu'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['usu_nomb'] = $valOpe['usu_nomb'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['erf_kyusu'] = $valOpe['erf_kyusu'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['erf_nomb'] = $valOpe['erf_nomb'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['ope_pobs'] = $valOpe['ope_pobs'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['ope_tope'] = $valOpe['ope_tope'];
            $rpta['reporte'][0]['lista'][$valOpe['ope_otip']][$valOpe['ope_kyope']]['ope_oimp'] = $valOpe['ope_oimp'];
          }
          break;
        }
      }

      $data['msg'] = Array(
        "type" => "success",
        "text" => "Clase:" . get_class($this) . "\nExito"
      );
      $comandoPdf = $data['comandoPdf'];

      $data['reporte'] = $rpta['reporte'];
      $data['nombPdf'] = "estadocuenta_pdf.pdf";

      $dataPage = Array();
      $dataPage['dbapp'] = "erp";
      $dataPage['modulo'] = "images";
      $dataPage['mainEmp'] = strtoupper($_SESSION['com']['com_dscr']);

      if ($comandoPdf == "IMPRIMIR") {
        $dataPage['archivo'] = $data['nombPdf'];
        $dataPage = $this->getPath($dataPage);
        $data['nombPdfFile'] = $dataPage['path'];
      } else if ($comandoPdf == "GENERAR") {
        $dataPage['archivo'] = "pdfTemporal.pdf";
        $dataPage = $this->getPath($dataPage);
        $data['nombPdfFile'] = $dataPage['path'];
      }

      $data['comandoPdf'] = $comandoPdf;
      $data = $this->run("adm/estadocuenta_pdf", $data);

      $result = $data;
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function guardarOperacion($data)
  {
    $result = null;
    try {
      $ope_kypdr = $data['ope_kyope'];

      $data['ope_kycom'] = $this->util->get($data, "kycom");
      $data['ope_kycco'] = $data['cor_kycco'];
      $data['ope_kyusu'] = $data['cor_kyusu'];
      $data['ope_kyapc'] = $data["apc_kyapc"];
      $data['ope_ctip'] = $data['cor_otip'];
      $data['ope_otip'] = $data['cor_otip'];
      $data['ope_rubr'] = $data['rub_prop'];
      $data['ope_clas'] = $data['cls_prop'];

      if ($data['cor_tipo'] == "EMP") {
        $data['ope_otip'] = $data['ope_ctip'];
      }
      $data['ope_debe'] = (($data['ope_otip'] == "INGRESO" || $data['ope_otip'] == "ANTICIPO") ? $data['ope_mimp'] : 0.00);
      $data['ope_habe'] = (($data['ope_otip'] == "EGRESO") ? $data['ope_mimp'] : 0.00);
      $data['ope_esta'] = "0001";

      if ($data['comando'] == "AGREGAR")
      {
        $data = $this->insert($data, "adm_operacion");

        $tmpPrp = Array();
        $tmpPrp['comando'] = "MODIFICAR";
        $arrNdoc = explode("-", $data['ope_ndoc']);
        $tmpPrp['prp_prop'] = intVal($arrNdoc[0]);
        $tmpPrp['prp_valu'] = intVal($arrNdoc[1]);
        $tmpPrp['where'] = "WHERE prp_secc = 'NUMDOC' AND prp_kycom = ".$data['ope_kycom']." AND prp_dscr = '".$data['ope_tdoc']."'";
        $tmpPrp = $this->run("adm/CtrlPropiedad",$tmpPrp);

        $this->actualizarDocumento($data);
        
      }
      else if ($data['comando'] == "MODIFICAR")
      {
        $data['where'] = "WHERE ope_kyope = '" . $data['ope_kyope'] . "'";
        $data = $this->update($data, "adm_operacion");

        if ($data['ope_tope'] != "TRANSFERENCIA" && $data['ope_kyorf'] != "-1") {
          $data['where'] = "WHERE ope_kyope = '" . $data['ope_kyorf'] . "'";
          $data = $this->delete($data, "adm_operacion");
        }

        $this->actualizarDocumento($data);
      }

      if ($data['ope_tope'] == "TRANSFERENCIA")
      {
        $data['ope_kyope'] = "-1";
        $data['ope_ndoc'] = "-1";

        if ($data['comando'] == "MODIFICAR") {
          $dtmp = Array();
          $dtmp['ope_kyope'] = $this->util->get($data, "ope_kyorf", "-1");
          $dtmp = $this->run("adm/GetListaOperacion", $dtmp);
          if (count($dtmp['lista']['items']) > 0) {
            $data['ope_kyope'] = $dtmp['lista']['items'][0]['ope_kyope'];
            $data['ope_kyorf'] = $dtmp['lista']['items'][0]['ope_kyorf'];
            $data['ope_ndoc'] = $dtmp['lista']['items'][0]['ope_ndoc'];
          }
        }
        if ($data['comando'] == "AGREGAR" || ($data['comando'] == "MODIFICAR" && $data['ope_kyope'] == "-1")) {
          $dtmp = Array();
          $dtmp['prp_kycom'] = $data['ope_kycom'];
          $dtmp['prp_kysuc'] = $data['caj_kysuc'];
          $dtmp['prp_secc'] = "NUMDOC";
          $dtmp['prp_dscr'] = $data['ope_tdoc'];

          $dtmp = $this->run("adm/GetListaPropiedad", $dtmp);
          if (count($dtmp['lista']['items']) > 0) {
            $prp = $dtmp['lista']['items'][0];
            $data['ope_ndoc'] = $prp['prp_prop'] . "-" . ($prp['prp_valu'] + 1);
          }
        }

        if ($data['ope_ndoc'] != "-1") {
          $data['ope_kycom'] = $this->util->get($data, "kycom");
          $data['ope_kycco'] = $data['cde_kycco'];
          $data['ope_kyusu'] = $data['cde_kyusu'];
          $data['ope_ctip'] = $data['cde_otip'];
          $data['ope_otip'] = $data['cde_otip'];
          $data['ope_rubr'] = $data['rub_prop'];
          $data['ope_clas'] = $data['cls_prop'];

          if ($data['cor_tipo'] == "EMP") {
            $data['ope_otip'] = $data['ope_ctip'];
          }
          $data['ope_debe'] = (($data['ope_otip'] == "INGRESO" || $data['ope_otip'] == "ANTICIPO") ? $data['ope_mimp'] : 0.00);
          $data['ope_habe'] = (($data['ope_otip'] == "EGRESO") ? $data['ope_mimp'] : 0.00);

          if ($data['comando'] == "AGREGAR" || ($data['comando'] == "MODIFICAR" && $data['ope_kyope'] == "-1")) {
            $data['ope_kyorf'] = $ope_kypdr;
            $data = $this->insert($data, "adm_operacion");

            $dtmp = Array();
            $dtmp['ope_kyorf'] = $data['ope_kyope'];
            $dtmp['where'] = "where ope_kyope = '" . $ope_kypdr . "'";
            $dtmp = $this->update($dtmp, "adm_operacion");

            $arrNumDoc = explode("-", $data['ope_ndoc']);
            $dataProp['comando'] = "MODIFICAR";
            $dataProp['prp_prop'] = $arrNumDoc[0];
            $dataProp['prp_valu'] = $arrNumDoc[1];
            $dataProp['where'] = "where prp_kyprp='" . $data['prp_kyprp'] . "'";
            $dataProp = $this->run("adm/CtrlPropiedad", $dataProp);
          } else if ($data['comando'] == "MODIFICAR" && $data['ope_kyope'] != "-1") {
            $data['where'] = "where ope_kyope = '" . $data['ope_kyope'] . "'";
            $data = $this->update($data, "adm_operacion");
          }
        } else {
          $data['msg'] = Array(
            "type" => "error",
            "text" => "Clase:" . get_class($this) . "\nError en numero documento correlativo"
          );
        }
      } // if($data['ope_tope']=="TRANSFERENCIA")

      $data['ope_kyope'] = $ope_kypdr;
      $data['comando'] = "ENVIAR_MAIL";

      $result = $data;
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function guardarNumeroDocumento($data)
  {
    $result = null;
    try {
      $result = $data;
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function generarPdf($data)
  {
    $result = null;
    try {
      $dtmp = Array();
      $dtmp['prp_kycom'] = $_SESSION['com']['com_kycom'];
      $dtmp['prp_secc'] = "PRCINT";
      $dtmp['prp_codi'] = "0001";

      $dtmp = $this->run("adm/GetListaPropiedad", $dtmp);
      $listaPrp = $dtmp['lista']['items'];

      $dtmp = Array();
      $dtmp['ope_kyope'] = $this->util->get($data, "ope_kyope", "-1");
      $dtmp['sql'] = "select emi.usu_nomb emi_nomb, emi.usu_firm emi_firm,
 					ifnull(rec.usu_nomb,'') rec_nomb, ifnull(rec.usu_firm,'') rec_firm,
 					tra.usu_nomb tra_nomb, tra.usu_firm tra_firm,
 					ope.ope_otip, ope.ope_ndoc, ope.ope_oimp, ope.ope_tope, ope.ope_esta ope_esta,
 					ope.ope_tdoc, ope.ope_peri, ope.ope_freg, ope.ope_pobs, ifnull(orf.ope_esta,'') orf_esta
					from adm_operacion ope
					inner join adm_ctacorriente cco on cco.cco_kycco=ope_kycco
					inner join cmn_usuario emi on emi.usu_kyusu=cco.cco_kyusu
 					inner join adm_aperturacierre apc on apc.apc_kyapc=ope.ope_kyapc
					inner join cmn_usuario tra on tra.usu_kyusu=apc.apc_kyusu
					left join adm_operacion orf on orf.ope_kyope=ope.ope_kyorf
					left join cmn_usuario rec on rec.usu_kyusu=orf.ope_kyusu
					inner join adm_propiedad mon on mon.prp_codi=ope.ope_omon and mon.prp_secc='TIPMON' ";
      $dtmp = $this->run("adm/GetListaOperacion", $dtmp);
      if (count($dtmp['lista']['items']) > 0) {
        $comandoPdf = $data['comandoPdf'];
        $data = $dtmp['lista']['items'][0];

        if (count($listaPrp) > 0) {
          $data['prp_fini'] = $listaPrp[0]['prp_freg'];
          $data['prp_ffin'] = date('Y-m-d');
          $data['prp_dias'] = $this->util->entreFechas($listaPrp[0]['prp_freg'], date('Y-m-d'));
          $data['prp_iano'] = number_format(($listaPrp[0]['prp_valu'] / 100), 5);
          $data['prp_idia'] = number_format(($data['prp_iano'] / 365), 5);
          $data['prp_inte'] = number_format(($data['ope_oimp'] * $data['prp_idia'] * $data['prp_dias']), 2);
        } // if(count($listaPrp)>0)
        else {
          $data['prp_fini'] = '1979-01-01';
          $data['prp_ffin'] = '1979-01-01';
          $data['prp_dias'] = 0;
          $data['prp_iano'] = 0;
          $data['prp_idia'] = 0;
          $data['prp_inte'] = 0;
        }
        $data['nombPdf'] = str_replace(" ", "_", $this->util->tipDoc[$data['ope_tdoc']] . $data['ope_ndoc']) . ".pdf";

        $dataPage['dbapp'] = "erp";
        $dataPage['modulo'] = "images";
        $dataPage['mainEmp'] = strtoupper($_SESSION['com']['com_dscr']);

        if ($comandoPdf == "IMPRIMIR") {
          $dataPage['archivo'] = $data['nombPdf'];
          $dataPage = $this->getPath($dataPage);
          $data['nombPdfFile'] = $dataPage['path'];
        } else if ($comandoPdf == "GENERAR") {
          $dataPage['archivo'] = "pdfTemporal.pdf";
          $dataPage = $this->getPath($dataPage);
          $data['nombPdfFile'] = $dataPage['path'];
        }

        $data['comandoPdf'] = $comandoPdf;
        $data = $this->run("adm/recibo_pdf", $data);

        $result = $data;
      }
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function enviarOperacionMail($data)
  {
    $result = null;
    try {
      $emi_nomb = "";
      $emi_urlRech = "";
      $emi_urlApro = "";
      $emi_mail = "";

      $rec_nomb = "";
      $rec_urlRech = "";
      $rec_urlApro = "";
      $rec_mail = "";

      $asunto = "";
      $ope_fimg = "";
      $baseUrl = "http://sisprom.org/sisprom/code/";
      $urlRech = "";
      $urlApro = "";
      $dtmp = Array();
      $dtmp['ope_kyope'] = $this->util->get($data, "ope_kyope");
      $dtmp['ope_esta'] = "TODOS";
      $dtmp = $this->run("adm/GetListaOperacion", $dtmp);
      if (count($dtmp['lista']['items']) > 0) {
        $emi_nomb = $dtmp['lista']['items'][0]['usu_nomb'];
        $emi_mail = $dtmp['lista']['items'][0]['usu_mail'];
        $emi_urlRech = $baseUrl . "cmn/control/ejecutar?archivo=erp/CtrlOperacion&comando=MODESTA&ope_kyope=" . $dtmp['lista']['items'][0]['ope_kyope'] . "&ope_esta=0004";
        $emi_urlApro = $baseUrl . "cmn/control/ejecutar?archivo=erp/CtrlOperacion&comando=MODESTA&ope_kyope=" . $dtmp['lista']['items'][0]['ope_kyope'] . "&ope_esta=0001";

        $asunto = $dtmp['lista']['items'][0]['ope_pobs'];
        $ope_fimg = $dtmp['lista']['items'][0]['ope_fimg'];
        $ope_esta = $dtmp['lista']['items'][0]['ope_esta'];

        if ($this->util->get($dtmp['lista']['items'][0], "ope_tope") == "TRANSFERENCIA") {
          $dtmp = Array();
          $dtmp['ope_kyope'] = $this->util->get($data, "ope_kyorf");
          $dtmp['ope_esta'] = "TODOS";
          $dtmp = $this->run("adm/GetListaOperacion", $dtmp);
          if (count($dtmp['lista']['items']) > 0) {
            $rec_nomb = $dtmp['lista']['items'][0]['usu_nomb'];
            $rec_mail = $dtmp['lista']['items'][0]['usu_mail'];
            $rec_urlRech = $baseUrl . "cmn/control/ejecutar?archivo=erp/CtrlOperacion&comando=MODESTA&ope_kyope=" . $dtmp['lista']['items'][0]['ope_kyope'] . "&ope_esta=0004";
            $rec_urlApro = $baseUrl . "cmn/control/ejecutar?archivo=erp/CtrlOperacion&comando=MODESTA&ope_kyope=" . $dtmp['lista']['items'][0]['ope_kyope'] . "&ope_esta=0001";
          } // if(count($dtmp['lista']['items'])>0)
        }
      } // if(count($dtmp['lista']['items'])>0)

      $dtmp['dbapp'] = "erp";
      $dtmp['modulo'] = "images";
      $dtmp['archivo'] = $ope_fimg;
      $dtmp = $this->getPath($dtmp);
      $body = "<html><body>
 					<table width='200' align='center'>
						<tr height='100'><td align='center'><a href='http://www.sisprom.org/sisprom/code/cmn/applications/ejecutar/" . $this->util->get($data, "kycom", 0) . "-10'><img src='" . $baseUrl . "/gestion/sisprom/cmn/imagen/sisprom_large.png'></a></td></tr>	
 						<tr><td colspan='2' style='border-top:1pt solid #5e5e5e;'></td></tr>
						<tr><td colspan='2'><p style='line-height: 20px;text-align: justify;font-family:Georgia; padding: 5;'>Saludos
							<span style='font-weight: bold;text-decoration:underline;'>" . $emi_nomb . "</span>
							se ha generado un recibo para su aprobacion<p></td></tr>
						<tr><td colspan='2' style='border-top:1pt solid #5e5e5e;'></td></tr>
						<tr height='100'><td align='center'><a href='" . $emi_urlApro . "'><img src='" . $baseUrl . "applications/com/cmn/images/acepta.png'></a></td></tr>
					</table></body></html>";
      $resp = $this->mailer->sendLocal($emi_mail, $asunto, $body, "");
      if ($rec_mail != "") {
        $body = "<html><body>
 					<table width='200' align='center'>
						<tr height='100'><td align='center'><a href='http://www.sisprom.org/sisprom/code/cmn/applications/ejecutar/" . $this->util->get($data, "kycom", 0) . "-10'><img src='" . $baseUrl . "/gestion/sisprom/cmn/imagen/sisprom_large.png'></a></td></tr>
    					<tr><td colspan='2' style='border-top:1pt solid #5e5e5e;'></td></tr>
						<tr><td colspan='2'><p style='line-height: 20px;text-align: justify;font-family:Georgia; padding: 5;'>Saludos
							<span style='font-weight: bold;text-decoration:underline;'>" . $rec_nomb . "</span>
							se ha generado un recibo para su aprobacion<p></td></tr>
						<tr><td colspan='2' style='border-top:1pt solid #5e5e5e;'></td></tr>
						<tr height='100'><td align='center'><a href='" . $rec_urlApro . "'><img src='" . $baseUrl . "applications/com/cmn/images/acepta.png'></a></td></tr>
					</table></body></html>";
        $resp = $this->mailer->sendLocal($rec_mail, $asunto, $body, "");
      } // if($rec_mail!="")

      $resp = true;
      if ($resp) {
        $data['msg'] = Array(
          "type" => "success",
          "text" => "Clase:" . get_class($this) . "\nEl correo fue enviado con EXITO"
        );
      } else {
        $data['msg'] = Array(
          "type" => "error",
          "text" => "Clase:" . get_class($this) . "\nERROR al Enviar correo"
        );
      }
      $result = $data;
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function actualizarDocumento($parVal){
    if(isset($parVal['ope_kydoc']) && $parVal['ope_kydoc'] != '' && intval($parVal['ope_kydoc']) > -1 ) {

      $tmpOpe = Array();
      $tmpOpe['ope_kycom'] = $_SESSION['com']['com_kycom'];
      $tmpOpe['ope_kydoc'] = $parVal['ope_kydoc'];
      $tmpOpe['sql'] = 'SELECT ope.ope_kydoc, SUM(ope.ope_oimp) ope_oimp FROM adm_operacion ope';

      $updDoc = Array();
      $updDoc['doc_tpag'] = 0.00;
      $tmpOpe = $this->run("adm/GetListaOperacion",$tmpOpe);

      if(count($tmpOpe['lista']['items'])>0)
      {
        $tmpOpe = $tmpOpe['lista']['items'][0];
        $updDoc['doc_tpag'] = (is_null($tmpOpe['ope_oimp']) ? 0.00 : floatval($tmpOpe['ope_oimp']));
      }
      $updDoc['where'] = "WHERE doc_kydoc = '" . $parVal['ope_kydoc'] . "'";
      $updDoc = $this->update($updDoc, "erp_documento");
    }

  }
}
?>