<?php
class newfile
{
  public function X2ExtUBLExtensions($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('ext:UBLExtensions');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
    $xmlEleNiv3 = $xml->createElement('ext:UBLExtension');
    $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
    
    $xmlEleNiv4 = $xml->createElement('ext:ExtensionContent');
    $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
  }
  
  public function Niv2VersionUBL($xml, $Invoice, $valor)
  {
    $xmlNiv2 = $xml->createElement('cbc:UBLVersionID', $valor);
    $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
  }
  public function Niv2VersionPersonalizada($xml, $Invoice, $valor)
  {
    $xmlNiv2 = $xml->createElement('cbc:CustomizationID', $valor);
    $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
  }
  public function Niv2NumeroDocumento($xml, $Invoice, $valor)
  {
    $xmlNiv2 = $xml->createElement('cbc:ID', $valor);
    $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
  }
  public function Niv2FechaEmision($xml, $Invoice, $valor)
  {
    $xmlNiv2 = $xml->createElement('cbc:IssueDate', );
    $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
  }
  public function Niv2HoraEmision($xml, $Invoice, $valor)
  {
    $xmlNiv2 = $xml->createElement('cbc:IssueTime', $valor);
    $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
  }
  
  
  
  
  
  
  public function X2tipoDocumento($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cbc:InvoiceTypeCode', '01');
    $xmlEle = $Invoice->appendChild($xmlEle);
    $xmlEle->setAttribute('listID', "0101");
    $xmlEle->setAttribute('listAgencyName', "PE:SUNAT");
    $xmlEle->setAttribute('listName', "Tipo de Documento");
    $xmlEle->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01");
  }
  public function X2descripcionImporte($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cbc:Note', 'TRES MIL OCHOCIENTOS VENTICUATRO  Y 92/100 SOLES');
    $xmlEle = $Invoice->appendChild($xmlEle);
    $xmlEle->setAttribute('languageLocaleID', "1000");
  }
  public function X2tipoMoneda($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cbc:DocumentCurrencyCode', 'PEN');
    $xmlEle = $Invoice->appendChild($xmlEle);
    $xmlEle->setAttribute('listAgencyName', "United Nations Economic Commission for Europe");
    $xmlEle->setAttribute('listID', "ISO 4217 Alpha");
    $xmlEle->setAttribute('listName', "Currency");
  }
  public function X2ordenReferencia($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:OrderReference');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ID', '17788');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
  }
  public function X2documentoReferencia($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:DespatchDocumentReference');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ID', '0001-0023573');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:DocumentTypeCode', '09');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
  }
  public function X2firmaDigital($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:Signature');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ID', 'SF002-00000044');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:ID', '15710144');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cac:SignatoryParty');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
    
        $xmlEleNiv4 = $xml->createElement('cac:PartyIdentification', "20505463146");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
    
          $xmlEleNiv5 = $xml->createElement('cbc:ID', "20505463146");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
    
        $xmlEleNiv4 = $xml->createElement('cac:PartyName');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
    
          $xmlEleNiv5 = $xml->createElement('cac:Name', "<![CDATA[HEMOCARE S.A.C.]]>");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
    
        $xmlEleNiv4 = $xml->createElement('cac:AgentParty');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
    
          $xmlEleNiv5 = $xml->createElement('cac:PartyIdentification');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
    
            $xmlEleNiv6 = $xml->createElement('cbc:ID', "20505463146");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
    
          $xmlEleNiv5 = $xml->createElement('cac:PartyName');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
    
            $xmlEleNiv6 = $xml->createElement('cac:Name', "<![CDATA[HEMOCARE S.A.C.]]>");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
    
          $xmlEleNiv5 = $xml->createElement('cac:PartyLegalEntity');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
    
            $xmlEleNiv6 = $xml->createElement('cbc:RegistrationName', "<![CDATA[HEMOCARE S.A.C.]]>");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
    
        $xmlEleNiv3 = $xml->createElement('cac:DigitalSignatureAttachment');
        $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
    
          $xmlEleNiv4 = $xml->createElement('cac:ExternalReference');
          $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
    
            $xmlEleNiv5 = $xml->createElement('cbc:URI', "#SignatureSP");
            $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
  }
  public function X2cuantoProveedor($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:AccountingSupplierParty');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cac:Party');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cac:PartyIdentification');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
          $xmlEleNiv5 = $xml->createElement('cbc:ID', "20505463146");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('schemeAgencyName', "PE:SUNAT");
          $xmlEleNiv5->setAttribute('schemeID', "6");
          $xmlEleNiv5->setAttribute('schemeName', "Documento de Identidad");
          $xmlEleNiv5->setAttribute('schemeURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06");
          
        $xmlEleNiv4 = $xml->createElement('cac:PartyName');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
          
          $xmlEleNiv5 = $xml->createElement('cbc:Name', "<![CDATA[HEMOCARE S.A.C.]]>");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
        
        $xmlEleNiv4 = $xml->createElement('cac:PartyLegalEntity');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
          
          $xmlEleNiv5 = $xml->createElement('cbc:RegistrationName', "<![CDATA[HEMOCARE S.A.C.]]>");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          
          $xmlEleNiv5 = $xml->createElement('cac:RegistrationAddress');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          
            $xmlEleNiv6 = $xml->createElement('cbc:AddressTypeCode', "0000");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
            
            $xmlEleNiv6 = $xml->createElement('cac:AddressLine', "0000");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
          
              $xmlEleNiv7 = $xml->createElement('cbc:Line', "AV. ANDRES ARAMBURU URB. LIMATAMBO NRO 856 INTERIOR 201 SURQUILLO LIMA LIMA");
              $xmlEleNiv7 = $xmlEleNiv6->appendChild($xmlEleNiv7);
          
            $xmlEleNiv6 = $xml->createElement('cac:Country');
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
          
              $xmlEleNiv7 = $xml->createElement('IdentificationCode', "PE");
              $xmlEleNiv7 = $xmlEleNiv6->appendChild($xmlEleNiv7);
              $xmlEleNiv7->setAttribute('listAgencyName', "United Nations Economic Commission for Europe");
              $xmlEleNiv7->setAttribute('listID', "ISO 3166-1");
              $xmlEleNiv7->setAttribute('listName', "Country");
  }
  public function X2cuentaCliente($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:AccountingCustomerParty');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cac:Party');
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cac:PartyIdentification');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
          $xmlEleNiv5 = $xml->createElement('cac:ID', "20337889167");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('schemeID', "6");
          $xmlEleNiv5->setAttribute('schemeName', "Documento de Identidad");
          $xmlEleNiv5->setAttribute('schemeAgencyName', "PE:SUNAT");
          $xmlEleNiv5->setAttribute('schemeURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06");
      
        $xmlEleNiv4 = $xml->createElement('cac:PartyLegalEntity');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
          $xmlEleNiv5 = $xml->createElement('cbc:RegistrationName', "<![CDATA[ASOC.PASTORAL DE SERV.MEDICO ASIST. GOOD HOPE DE LA IGLESIA ADVENTISTA DEL SEPTIMO DIA]]>");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          
          $xmlEleNiv5 = $xml->createElement('cac:RegistrationAddress');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          
            $xmlEleNiv6 = $xml->createElement('cac:AddressLine');
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
            
              $xmlEleNiv7 = $xml->createElement('cbc:Line', "<![CDATA[MLC.BALTA NRO. 956 RES. MIRAFLORES (ALTURA PARQUE DEL AMOR), Lima, Perú]]>");
              $xmlEleNiv7 = $xmlEleNiv6->appendChild($xmlEleNiv7);
  }
  public function X2terminosPago1ro($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:PaymentTerms');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ID', "FormaPago");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:PaymentMeansID', "Credito");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:Amount', "3710.17");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
  }
  public function X2terminosPago2ro($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:PaymentTerms');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ID', "FormaPago");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:PaymentMeansID', "Cuota001");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:Amount', "3710.17");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cbc:PaymentDueDate', "2022-03-06");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
  }
  public function X2cargoAsignacion($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:AllowanceCharge');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ChargeIndicator', "62");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('listAgencyName', "PE:SUNAT");
      $xmlEleNiv3->setAttribute('listName', "Cargo/descuento");
      $xmlEleNiv3->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo53");
      
      $xmlEleNiv3 = $xml->createElement('cbc:MultiplierFactorNumeric', "0.03");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:Amount', "114.75");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cbc:BaseAmount', "3824.92");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
  }
  public function X2totalImpuestos($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:TaxTotal');
    $xmlEle = $Invoice->appendChild($xmlEle);
    
      $xmlEleNiv3 = $xml->createElement('cbc:TaxAmount', "583.46");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cac:TaxSubTotal', "0.03");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cbc:TaxableAmount', "3241.46");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        $xmlEleNiv4->setAttribute('currencyID', "PEN");
        
        $xmlEleNiv4 = $xml->createElement('cbc:TaxAmount', "583.46");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        $xmlEleNiv4->setAttribute('currencyID', "PEN");
        
        $xmlEleNiv4 = $xml->createElement('cbc:TaxCategory');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
          $xmlEleNiv5 = $xml->createElement('cbc:ID', "S");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('schemeAgencyName', "United Nations Economic Commission for Europe");
          $xmlEleNiv5->setAttribute('schemeID', "UN/ECE 5305");
          $xmlEleNiv5->setAttribute('schemeName', "Tax Category Identifier");
          
          $xmlEleNiv5 = $xml->createElement('cac:TaxScheme');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          
            $xmlEleNiv6 = $xml->createElement('cbc:ID', "1000");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
            $xmlEleNiv6->setAttribute('schemeID', "UN/ECE 5153");
            $xmlEleNiv6->setAttribute('schemeAgencyID', "6");
            
            $xmlEleNiv6 = $xml->createElement('cbc:Name', "IGV");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
            
            $xmlEleNiv6 = $xml->createElement('cbc:TaxTypeCode', "VAT");
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
  }
  public function X2totalImporteLegal($xml, $Invoice)
  {
    $xmlEle = $xml->createElement('cac:LegalMonetaryTotal');
    $xmlEle = $Invoice->appendChild($xmlEle);
      
      $xmlEleNiv3 = $xml->createElement('cbc:LineExtensionAmount', "3241.46");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cbc:TaxInclusiveAmount', "3824.92");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cbc:AllowanceTotalAmount', "0.00");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cbc:ChargeTotalAmount', "0.00");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cbc:PayableAmount', "3824.92");
      $xmlEleNiv3 = $xmlEle->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
  }
  public function X2lineaFactura($xml, $Invoice)
  {
    $InvoiceLine = $xml->createElement('cac:InvoiceLine');
    $InvoiceLine = $Invoice->appendChild($InvoiceLine);
    
      $xmlEleNiv3 = $xml->createElement('cbc:ID', '1');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      
      $xmlEleNiv3 = $xml->createElement('cbc:InvoicedQuantity', '100.00000');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('unitCode', "ZZ");
      $xmlEleNiv3->setAttribute('unitCodeListID', "UN/ECE rec 20");
      $xmlEleNiv3->setAttribute('unitCodeListAgencyName', "United Nations Economic Commission for Europe");
      
      $xmlEleNiv3 = $xml->createElement('cbc:LineExtensionAmount', '932.00');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      $xmlEleNiv3->setAttribute('currencyID', "PEN");
      
      $xmlEleNiv3 = $xml->createElement('cac:PricingReference');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cac:AlternativeConditionPrice');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
          $xmlEleNiv5 = $xml->createElement('cbc:PriceAmount', "1.997600000");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('currencyID', "PEN");
          
          $xmlEleNiv5 = $xml->createElement('cbc:PriceTypeCode', "01");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('listName', "Tipo de Precio");
          $xmlEleNiv5->setAttribute('listAgencyName', "PE:SUNAT");
          $xmlEleNiv5->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16");
      
      $xmlEleNiv3 = $xml->createElement('cac:TaxTotal');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cbc:TaxAmount', "167.76");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        $xmlEleNiv4->setAttribute('currencyID', "PEN");
        
        $xmlEleNiv4 = $xml->createElement('cbc:TaxableAmount', "932.00");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        $xmlEleNiv4->setAttribute('currencyID', "PEN");
        
        $xmlEleNiv4 = $xml->createElement('cac:TaxCategory');
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
      
          $xmlEleNiv5 = $xml->createElement('cbc:ID', "S");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('schemeID', "UN/ECE 5305");
          $xmlEleNiv5->setAttribute('schemeName', "Codigo de tributos");
          $xmlEleNiv5->setAttribute('schemeAgencyName', "S");
          
          $xmlEleNiv5 = $xml->createElement('cbc:Percent', "18.00");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          
          $xmlEleNiv5 = $xml->createElement('cbc:TaxExemptionReasonCode', "10");
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
          $xmlEleNiv5->setAttribute('listAgencyName', "PE:SUNAT");
          $xmlEleNiv5->setAttribute('listName', "Afectacion del IGV");
          $xmlEleNiv5->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07");
          
          $xmlEleNiv5 = $xml->createElement('cbc:TaxScheme');
          $xmlEleNiv5 = $xmlEleNiv4->appendChild($xmlEleNiv5);
      
            $xmlEleNiv6 = $xml->createElement('cbc:ID');
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
            $xmlEleNiv6->setAttribute('schemeID', "UN/ECE 5153");
            $xmlEleNiv6->setAttribute('schemeName', "Codigo de tributos");
            $xmlEleNiv6->setAttribute('schemeAgencyName', "PE:SUNAT");
            
            $xmlEleNiv6 = $xml->createElement('cbc:Name');
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
            
            $xmlEleNiv6 = $xml->createElement('cbc:TaxTypeCode');
            $xmlEleNiv6 = $xmlEleNiv5->appendChild($xmlEleNiv6);
      
      $xmlEleNiv3 = $xml->createElement('cac:Item');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cbc:Description', "<![CDATA[CONECTOR BIFURCADO CON ADAPTADOR EN Y Lotes: - 21B15-TC  Cant: 100.0 F.V.: 2024-01-15]]>");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
        $xmlEleNiv4 = $xml->createElement('cac:SellersItemIdentification', "<![CDATA[CONECTOR BIFURCADO CON ADAPTADOR EN Y Lotes: - 21B15-TC  Cant: 100.0 F.V.: 2024-01-15]]>");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        
          $xmlEleNiv5 = $xml->createElement('cbc:ID', "PY2101NCM");
          $xmlEleNiv5 = $xmlEleNiv3->appendChild($xmlEleNiv5);
      
      $xmlEleNiv3 = $xml->createElement('cac:Price');
      $xmlEleNiv3 = $InvoiceLine->appendChild($xmlEleNiv3);
      
        $xmlEleNiv4 = $xml->createElement('cbc:PriceAmount', "9.3200000000");
        $xmlEleNiv4 = $xmlEleNiv3->appendChild($xmlEleNiv4);
        $xmlEleNiv4->setAttribute('currencyID', "PEN");
  }
}
?>