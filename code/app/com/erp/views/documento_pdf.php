<?php
//require_once BASEPATH."/lib/Pdf.php";
require_once(BASEPATH.'/lib/tcpdf/tcpdf.php');
setlocale(LC_ALL,'es_ES');

class documento_pdf extends Controlador
{
  var $pdf;
  
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
      // Obteniendo datos del archivo .XML (factura electrÃ³nica)======================
      $xml = file_get_contents('fact/xmlfirm/20532710066-01-F002-00000026.xml');
      
      #== Obteniendo datos del archivo .XML
      
      $DOM = new DOMDocument('1.0', 'ISO-8859-1');
      $DOM->preserveWhiteSpace = FALSE;
      $DOM->loadXML($xml);
      
      ### DATOS DE LA FACTURA ####################################################
      
      // Obteniendo RUC.
      $DocXML = $DOM->getElementsByTagName('CustomerAssignedAccountID');
      foreach($DocXML as $Nodo){
        $RUC = $Nodo->nodeValue;
      }
      
      // Obteniendo Fecha de emisiÃ³n.
      $DocXML = $DOM->getElementsByTagName('IssueDate');
      foreach($DocXML as $Nodo){
        $FecEmi = $Nodo->nodeValue;
      }
      
      // Obteniendo Nombre o RazÃ³n social.
      $DocXML = $DOM->getElementsByTagName('RegistrationName');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $NomRazSoc = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Obteniendo domicilio.
      $DocXML = $DOM->getElementsByTagName('StreetName');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $Domicilio = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Obteniendo Codigo Hash.
      $DocXML = $DOM->getElementsByTagName('DigestValue');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $CodHash = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Clave del tipo de documento.
      $DocXML = $DOM->getElementsByTagName('InvoiceTypeCode');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $TipoDoc = $Nodo->nodeValue;
        }
        $i++;
      }
      
      
      ### DATOS DEL PRODUCTO O SERVICIO. #########################################
      
      // CÃ³digo del producto o servicio.
      $DocXML = $DOM->getElementsByTagName('PriceTypeCode');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $CodProdServ = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // DescripciÃ³n del producto o servicio.
      $DocXML = $DOM->getElementsByTagName('Description');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $ProdServ = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Cantidad de producto o servicio.
      $DocXML = $DOM->getElementsByTagName('InvoicedQuantity');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $Cant = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Unidad de medida del producto o servicio.
      $DocXML = $DOM->getElementsByTagName('InvoicedQuantity');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          //$UniMed = $Nodo->nodeValue;
          $UniMed = $Nodo->getAttribute('unitCode');
        }
        $i++;
      }
      
      // Precio unitario.
      $DocXML = $DOM->getElementsByTagName('PriceAmount');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==1){
          $Precio = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Importe.
      $DocXML = $DOM->getElementsByTagName('LineExtensionAmount');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==0){
          $Importe = $Nodo->nodeValue;
        }
        $i++;
      }
      
      ### TOTALES DE LA FACTURA ##################################################
      
      // Total gravado.
      $DocXML = $DOM->getElementsByTagName('PayableAmount');
      $i=0;
      foreach($DocXML as $Nodo){
        if ($i==1){
          $TotGrav = $Nodo->nodeValue;
        }
        $i++;
      }
      
      // Total IGV.
      $DocXML = $DOM->getElementsByTagName('TaxAmount');
      $i=0;
      foreach($DocXML as $Nodo){
        $TotIGV = $Nodo->nodeValue;
      }
      
      // Monto total.
      $DocXML = $DOM->getElementsByTagName('PayableAmount');
      $i=0;
      foreach($DocXML as $Nodo){
        $TotMonto = $Nodo->nodeValue;
      }
      
      
      // Crear el grÃ¡fico con el cÃ³digo de barras. ===================================
      $textoCodBar =
      "| $TipoDoc
       | A
       | 123
       | $TotIGV
       | $TotMonto
       | $FecEmi
       | $TipoDoc
       | F002-026
       | VALOR RESUMEN
       | $CodHash
       |";
      
      /****************************
       * Configuracion de pagina  *
       ****************************/
      $this->pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, "A4", true, 'UTF-8', false);
      $this->pdf->SetCreator(PDF_CREATOR);
      
      $this->pdf->SetPrintHeader(false);
      $this->pdf->SetPrintFooter(false);
      
      $this->pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
      $this->pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
      $this->pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);
      $this->pdf->setJPEGQuality(75);
      $fontname = "courier"; 
      $this->pdf->SetFont($fontname,'',10);
      
      $this->pdf->AddPage();
      
      /****************************
       * ENCABEZADO DE FACTURA    *
       ** *************************/
      
      $this->pdf->SetFillColor(255, 255, 255);
//       $this->pdf->RoundedRect(10, 10, 110, 25, 1, '1234', '');
      $this->pdf->RoundedRect(130, 10, 70, 25, 2, '1234', '');
      
      $this->pdf->Image("../../gestion/sisprom/erp/img/logo.jpg", 10, 10, 110, 25, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 0, false, false, false);
      
      $this->pdf->SetFont($fontname,'B',14);
      $this->pdf->SetTextColor(203, 30, 34);
      $this->pdf->MultiCell(70, 8, "RUC: 20600874374", 0, "C", false, 1, 130, 12, true, 0, false, true, 8, "M");
      
      $this->pdf->SetFont($fontname,'B',16);
      $this->pdf->SetTextColor(0, 0, 0);
      $this->pdf->MultiCell(70, 8, "FACTURA ELECTRONICA", 0, "C", false, 1, 130, 20, true, 0, false, true, 8, "M");
      
      $this->pdf->SetFont($fontname,'',12);
      $this->pdf->SetTextColor(32, 60, 154);
      $this->pdf->MultiCell(70, 8, "F002-026", 0, "C", false, 1, 130, 28, true, 0, false, true, 8, "M");
      
      /****************************
       * DATOS DE CLIENTE         *
       ** *************************/
      $h=6;
      $ancFac=190;
      $this->pdf->SetFillColor(255, 255, 255);
      $this->pdf->RoundedRect(10, 43, $ancFac, 35, 2, '1234', '');
      
      $this->pdf->SetFont($fontname,'B',13);
      $this->pdf->SetTextColor(0, 0, 0);
      $x=12;
      $y=45;

      $this->pdf->MultiCell(30, $h, "Señores",       0, "L", false, 1, $x, $y+=00, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(30, $h, "Dirección",     0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(30, $h, "RUC",           0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(30, $h, "Fecha Emision", 0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(30, $h, "Moneda",        0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      
      $this->pdf->SetFont($fontname,'',13);
      $this->pdf->SetTextColor(0, 0, 0);
      $x=37;
      $y=45;
      
      $this->pdf->MultiCell(155, $h, ":", 0, "L", false, 1, $x, $y+=00, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, ":", 0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, ":", 0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, ":", 0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, ":", 0, "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      
      $this->pdf->SetFont($fontname,'',13);
      $this->pdf->SetTextColor(0, 0, 0);
      $x=40;
      $y=45;
      
      $this->pdf->MultiCell(155, $h, $data['doc']['doc_enom'], "B", "L", false, 1, $x, $y+=00, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, $data['doc']['doc_edir'], "B", "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, $data['doc']['doc_endo'], "B", "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, $data['doc']['doc_femi'], "B", "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell(155, $h, $data['doc']['doc_tmon'], "B", "L", false, 1, $x, $y+=$h, true, 0, false, true, $h, "M");
      /****************************
       * DETALLE DE FACTURA       *
       ** *************************/
      $this->pdf->SetFont($fontname,'',10);
      $x=10;
      $y=85;
      $h = 8;
      $w1 = 25;$w2 = 15;$w3 = 75;$w4 = 25;$w5 = 25;$w6 = 25;
      
      $x1=$x;
      $x2=$x+$w1;
      $x3=$x+$w1+$w2;
      $x4=$x+$w1+$w2+$w3;
      $x5=$x+$w1+$w2+$w3+$w4;
      $x6=$x+$w1+$w2+$w3+$w4+$w5;
      
      $this->pdf->MultiCell($w1, $h, "Codigo",   1, "C", false, 1, $x1, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w2, $h, "Cant",     1, "C", false, 1, $x2, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w3, $h, "Producto", 1, "C", false, 1, $x3, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w4, $h, "Unidad",   1, "C", false, 1, $x4, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w5, $h, "Precio",   1, "C", false, 1, $x5, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w6, $h, "Importe",  1, "C", false, 1, $x6, $y, true, 0, false, true, $h, "M");

      $lista = Array();
      array_push($lista, Array("dtd_codi"=>"ART001", "dtd_cant"=>"1", "dtd_dscr"=>"PANADOL FORTE 500", "dtd_unid"=>"PASTILLA", "dtd_prec"=>"15.456", "dtd_impo"=>"452.546"));
      array_push($lista, Array("dtd_codi"=>"ART001", "dtd_cant"=>"1", "dtd_dscr"=>"PANADOL FORTE 500", "dtd_unid"=>"PASTILLA", "dtd_prec"=>"15.456", "dtd_impo"=>"452.546"));
      array_push($lista, Array("dtd_codi"=>"ART001", "dtd_cant"=>"1", "dtd_dscr"=>"PANADOL FORTE 500", "dtd_unid"=>"PASTILLA", "dtd_prec"=>"15.456", "dtd_impo"=>"452.546"));
      array_push($lista, Array("dtd_codi"=>"ART001", "dtd_cant"=>"1", "dtd_dscr"=>"PANADOL FORTE 500", "dtd_unid"=>"PASTILLA", "dtd_prec"=>"15.456", "dtd_impo"=>"452.546"));
      array_push($lista, Array("dtd_codi"=>"ART001", "dtd_cant"=>"1", "dtd_dscr"=>"PANADOL FORTE 500", "dtd_unid"=>"PASTILLA", "dtd_prec"=>"15.456", "dtd_impo"=>"452.546"));
      
      $y+=5;
      $h = 5;
      foreach($data['lisDtd'] as $item)
      {
        $y+=$h;
        $this->pdf->MultiCell($w1, $h, $item['dtd_acod'], 0, "C", false, 1, $x1, $y, true, 0, false, true, $h, "M");
        $this->pdf->MultiCell($w2, $h, $item['dtd_cant'], 0, "C", false, 1, $x2, $y, true, 0, false, true, $h, "M");
        $this->pdf->MultiCell($w3, $h, $item['dtd_dscr'], 0, "L", false, 1, $x3, $y, true, 0, false, true, $h, "M");
        $this->pdf->MultiCell($w4, $h, $item['dtd_unid'], 0, "C", false, 1, $x4, $y, true, 0, false, true, $h, "M");
        $this->pdf->MultiCell($w5, $h, $item['dtd_pdto'], 0, "R", false, 1, $x5, $y, true, 0, false, true, $h, "M");
        $this->pdf->MultiCell($w6, $h, $item['dtd_impo'], 0, "R", false, 1, $x6, $y, true, 0, false, true, $h, "M");
      }
      
      /***********************
       * PIE DE FACTURA      *
       ***********************/
    //$y=230;
      $y+=6;
      $this->pdf->Line($x, $y, $x+190, $y);
      $y+=1;
      
      
      $style = array('border' => true,'padding' => 3,'fgcolor' => array(0,0,0),'bgcolor' => false);
      $this->pdf->write2DBarcode($textoCodBar, 'QRCODE,Q', 10, $y, 40, 40, $style, 'N');
      
//      $this->pdf->Image("../../gestion/sisprom/erp/img/CodigoQR.png", 10, $y, 50, 50, 'PNG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 1, false, false, false);
      
      $this->pdf->MultiCell($w1, $h, "SubTotal S/.",   0, "R", false, 1, $x+$ancFac-50, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w1, $h, $data['doc']['doc_tsub'],   0, "R", false, 1, $x+$ancFac-25, $y, true, 0, false, true, $h, "M");
      $y+=$h;
      $this->pdf->MultiCell($w1, $h, "I.G.V. S/.",   0, "R", false, 1, $x+$ancFac-50, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w1, $h, $data['doc']['doc_tigv'],   0, "R", false, 1, $x+$ancFac-25, $y, true, 0, false, true, $h, "M");
      $y+=$h;
      $this->pdf->MultiCell($w1, $h, "Total S/.",   0, "R", false, 1, $x+$ancFac-50, $y, true, 0, false, true, $h, "M");
      $this->pdf->MultiCell($w1, $h, $data['doc']['doc_tota'],   0, "R", false, 1, $x+$ancFac-25, $y, true, 0, false, true, $h, "M");
      
      //$this->pdf->loadImage("erp/logo.jpg",$x+10,6,32,26,'','', $data);
      //$this->pdf->Image("erp/logo.jpg", $x+10, 6, 32, 26, 'JPG', 'http://www.tcpdf.org', '', true, 150, '', false, false, 1, false, false, false);
      
      /****************************
       * Generar archivo PDF      *
       ****************************/
      if($this->util->get($data,"comandoPdf")=="IMPRIMIR"){$this->pdf->Output($data['nombPdfFile'], 'I');}
      if($this->util->get($data,"comandoPdf")=="PREVIEW"){$this->pdf->Output("temporal.pdf", 'I');}
      setlocale(LC_ALL,'US');

      $result = $data;
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }
  
}
?>