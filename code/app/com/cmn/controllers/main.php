<?php 
class main extends Controlador
{
	public function __construct() {parent::__construct();}

	public function index()
	{
    $whereIn = "2,4,5,6,7,";
    echo " AND art_kyart IN (" . substr($whereIn, 0, strlen($whereIn)-1) . ")"; 
    //var_dump("");
	}
	
	public function generarXmlSunat(){
	  $archivo = fopen("D:\sunat.xml" , "w");
	  if ($archivo)
	  {
	    $archivoXML = '<?xml version="1.0" encoding="UTF-8"?>
<!--Certificados Digitales visita www.llama.pe-->
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
         xmlns:ccts="urn:un:unece:uncefact:documentation:2"
         xmlns:ds="http://www.w3.org/2000/09/xmldsig#"
         xmlns:ext="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
         xmlns:qdt="urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2"
         xmlns:udt="urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <ext:UBLExtensions>
    <ext:UBLExtension>
      <ext:ExtensionContent>
        <ds:Signature Id="LlamaPeSign">
          <ds:SignedInfo>
            <ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>
            <ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>
            <ds:Reference URI="">
              <ds:Transforms>
                <ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature"/>
              </ds:Transforms>
              <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
              <ds:DigestValue></ds:DigestValue>
            </ds:Reference>
          </ds:SignedInfo>
          <ds:SignatureValue></ds:SignatureValue>
          <!--Certificados Digitales visita www.llama.pe-->
          <ds:KeyInfo>
            <ds:X509Data>
              <ds:X509SubjectName>DC=LLAMA.PE SA,C=PE,ST=LIMA,L=LIMA,O=TU EMPRESA S.A.,OU=DNI 9999999 RUC 20553510661 - CERTIFICADO PARA DEMOSTRACI\xC3\x93N,CN=NOMBRE REPRESENTANTE LEGAL - CERTIFICADO PARA DEMOSTRACI\xC3\x93N,emailAddress=demo@llama.pe</ds:X509SubjectName>
              <ds:X509Certificate>
                MIIE8TCCA9mgAwIBAgICIMEwDQYJKoZIhvcNAQEFBQAwggENMRswGQYKCZImiZPy
                LGQBGRYLTExBTUEuUEUgU0ExCzAJBgNVBAYTAlBFMQ0wCwYDVQQIDARMSU1BMQ0w
                CwYDVQQHDARMSU1BMRgwFgYDVQQKDA9UVSBFTVBSRVNBIFMuQS4xRTBDBgNVBAsM
                PEROSSA5OTk5OTk5IFJVQyAyMDU1MzUxMDY2MSAtIENFUlRJRklDQURPIFBBUkEg
                REVNT1NUUkFDScOTTjFEMEIGA1UEAww7Tk9NQlJFIFJFUFJFU0VOVEFOVEUgTEVH
                QUwgLSBDRVJUSUZJQ0FETyBQQVJBIERFTU9TVFJBQ0nDk04xHDAaBgkqhkiG9w0B
                CQEWDWRlbW9AbGxhbWEucGUwHhcNMTgwNjAxMDM1OTQyWhcNMjAwNTMxMDM1OTQy
                WjCCAQ0xGzAZBgoJkiaJk/IsZAEZFgtMTEFNQS5QRSBTQTELMAkGA1UEBhMCUEUx
                DTALBgNVBAgMBExJTUExDTALBgNVBAcMBExJTUExGDAWBgNVBAoMD1RVIEVNUFJF
                U0EgUy5BLjFFMEMGA1UECww8RE5JIDk5OTk5OTkgUlVDIDIwNTUzNTEwNjYxIC0g
                Q0VSVElGSUNBRE8gUEFSQSBERU1PU1RSQUNJw5NOMUQwQgYDVQQDDDtOT01CUkUg
                UkVQUkVTRU5UQU5URSBMRUdBTCAtIENFUlRJRklDQURPIFBBUkEgREVNT1NUUkFD
                ScOTTjEcMBoGCSqGSIb3DQEJARYNZGVtb0BsbGFtYS5wZTCCASIwDQYJKoZIhvcN
                AQEBBQADggEPADCCAQoCggEBAOcTW/TzaLk8qiVOCekHvo9uLfoEK97dkNrm6jO/
                qUF8FdTkxxT+ORHGM9ZkvTJ3N0iWO38AA4z/Pi91pWhD4YgapdqOGp1tcwPnI1Ko
                S+B6IO4k/Pe4Pn8AU9tao6Wy3ayrGrxHQnU597IlCcZo5i5ts2GEPRjxT9LY/ekk
                jYTlYif2Yjf2icac9g1XlTWeL4mYxH51p4Hx4/3zfACF6WqN17uVQLwQgPDneehX
                Myy1ja7MSocopedXmTwGFzO1h41+MBqOb30GbjnRBbSk+g6anFHospNYAWifiEen
                WYN+uBWV/b8u2H0U0TNCpad/yYu7ZzPIZ3WJO4fVf1my6MUCAwEAAaNXMFUwHQYD
                VR0OBBYEFDTCxehgCuNRd5lZbmDMWu/NJwO5MB8GA1UdIwQYMBaAFDTCxehgCuNR
                d5lZbmDMWu/NJwO5MBMGA1UdJQQMMAoGCCsGAQUFBwMBMA0GCSqGSIb3DQEBBQUA
                A4IBAQDiGBnjqaW+zJHeRvuvjFnPOzvluRh5NNQrbsupZOLAg+IuHepxL2PUUoFm
                kyXHysHMUtyJNPfpXyUlj0FAR2IJ0L2arnH7lIgH9zmSA7/oePd2XW4dd58HeIg0
                S5Wl05ATsc8rgFo5yRw6i86pdBleHMYrDCq1NvPECOszNOsEnvdHcRA2sQsDTDLM
                xoOs3IN97qVKNE50H+A8FIxu2Mo/0MAm6dvDEYSKLh3HVIcAlJrU8XNW2d6zMydc
                XLMDpNRAQ3Al2ETRVeX6F4MPP5XVJBaN/G/2pe1SuNN4uOLuNevteRCZfvUkthl1
                74yu5W8RhIvhEdKYGIoii5wRb3yc
	      
              </ds:X509Certificate>
            </ds:X509Data>
          </ds:KeyInfo>
          <!--Certificados Digitales visita www.llama.pe-->
        </ds:Signature>
      </ext:ExtensionContent>
    </ext:UBLExtension>
  </ext:UBLExtensions>
  <cbc:UBLVersionID>2.1</cbc:UBLVersionID>
  <cbc:CustomizationID>2.0</cbc:CustomizationID>
  <cbc:ID>F001-1</cbc:ID>
  <cbc:IssueDate>2017-05-14</cbc:IssueDate>
  <cbc:IssueTime>15:42:20</cbc:IssueTime>
  <cbc:DueDate>2017-05-15</cbc:DueDate>
  <cbc:InvoiceTypeCode listID="0101"
                       listAgencyName="PE:SUNAT"
                       listName="SUNAT:Identificador de Tipo de Documento"
                       listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01">01</cbc:InvoiceTypeCode>
  <cbc:Note languageLocaleID="1000">SETENTA Y UN MIL TRESCIENTOS CINCUENTICUATRO Y 99/100</cbc:Note>
  <cbc:DocumentCurrencyCode listID="ISO 4217 Alpha"
                            listName="Currency"
                            listAgencyName="United Nations Economic Commission for Europe">PEN</cbc:DocumentCurrencyCode>
  <cbc:LineCountNumeric>1</cbc:LineCountNumeric>
  <cac:AdditionalDocumentReference>
    <cbc:ID>F001-245</cbc:ID>
    <cbc:DocumentTypeCode
            listName="Documento Relacionado"
            listAgencyName="PE:SUNAT"
            listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo12">02</cbc:DocumentTypeCode>
    <cbc:DocumentStatusCode listName="Anticipo" listAgencyName="PE:SUNAT">F001-245</cbc:DocumentStatusCode>
    <cac:IssuerParty>
      <cac:PartyIdentification>
        <cbc:ID schemeID="6"
                schemeName="Documento de Identidad"
                schemeAgencyName="PE:SUNAT"
                schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20100454523</cbc:ID>
      </cac:PartyIdentification>
    </cac:IssuerParty>
  </cac:AdditionalDocumentReference>
  <cac:Signature>
    <cbc:ID>LlamaSign</cbc:ID>
    <cac:SignatoryParty>
      <cac:PartyIdentification>
        <cbc:ID>20600695771</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>LLAMA.PE SA</cbc:Name>
      </cac:PartyName>
    </cac:SignatoryParty>
    <cac:DigitalSignatureAttachment>
      <cac:ExternalReference>
        <cbc:URI>#LlamaSign</cbc:URI>
      </cac:ExternalReference>
    </cac:DigitalSignatureAttachment>
  </cac:Signature>
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="6"
                schemeName="SUNAT:Identificador de Documento de Identidad"
                schemeAgencyName="PE:SUNAT"
                schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20553510661</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyName>
        <cbc:Name>Hernan Mendoza</cbc:Name>
      </cac:PartyName>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>LLAMA.PE SA</cbc:RegistrationName>
        <cac:RegistrationAddress>
          <cbc:AddressTypeCode>0001</cbc:AddressTypeCode>
        </cac:RegistrationAddress>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cac:PartyIdentification>
        <cbc:ID schemeID="6"
                schemeName="SUNAT:Identificador de Documento de Identidad"
                schemeAgencyName="PE:SUNAT"
                schemeURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06">20000000001</cbc:ID>
      </cac:PartyIdentification>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>TU CLIENTE SAC</cbc:RegistrationName>
      </cac:PartyLegalEntity>
    </cac:Party>
  </cac:AccountingCustomerParty>
  <cac:PrepaidPayment>
    <cbc:ID schemeName="Anticipo"
            schemeAgencyName="PE:SUNAT">F001-245</cbc:ID>
    <cbc:PaidAmount currencyID="PEN">51731.2</cbc:PaidAmount>
    <cbc:PaidDate>2017-05-11</cbc:PaidDate>
    <cbc:PaidTime>10:42:20</cbc:PaidTime>
  </cac:PrepaidPayment>
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="PEN">7891.2</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="PEN">43840.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="PEN">7891.2</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID schemeID="UN/ECE 5305"
                schemeName="Tax Category Identifier"
                schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
        <cac:TaxScheme>
          <cbc:ID schemeID="UN/ECE 5153"
                  schemeAgencyID="6">1000</cbc:ID>
          <cbc:Name>IGV</cbc:Name>
          <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
        </cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>
  <cac:LegalMonetaryTotal>
    <cbc:PrepaidAmount currencyID="PEN">51731.2</cbc:PrepaidAmount>
    <cbc:PayableAmount currencyID="PEN">0.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="BX"
                          unitCodeListID="UN/ECE rec 20"
                          unitCodeListAgencyName="United Nations Economic Commission forEurope">2000</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="PEN">43840.00</cbc:LineExtensionAmount>
    <cac:PricingReference>
      <cac:AlternativeConditionPrice>
        <cbc:PriceAmount currencyID="PEN">38.00</cbc:PriceAmount>
        <cbc:PriceTypeCode listName="SUNAT:Indicador de Tipo de Precio"
                           listAgencyName="PE:SUNAT"
                           listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16">01</cbc:PriceTypeCode>
      </cac:AlternativeConditionPrice>
    </cac:PricingReference>
    <cac:TaxTotal>
      <cbc:TaxAmount currencyID="PEN">7891.2</cbc:TaxAmount>
      <cac:TaxSubtotal>
        <cbc:TaxableAmount currencyID="PEN">43840.00</cbc:TaxableAmount>
        <cbc:TaxAmount currencyID="PEN">7891.2</cbc:TaxAmount>
        <cac:TaxCategory>
          <cbc:ID schemeID="UN/ECE 5305"
                  schemeName="Tax Category Identifier"
                  schemeAgencyName="United Nations Economic Commission for Europe">S</cbc:ID>
          <cbc:Percent>18.00</cbc:Percent>
          <cbc:TaxExemptionReasonCode listAgencyName="PE:SUNAT"
                                      listName="SUNAT:Codigo de Tipo de Afectación del IGV"
                                      listURI="urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07">10</cbc:TaxExemptionReasonCode>
          <cac:TaxScheme>
            <cbc:ID schemeID="UN/ECE 5153"
                    schemeName="Tax Scheme Identifier"
                    schemeAgencyName="United Nations Economic Commission for Europe">1000</cbc:ID>
            <cbc:Name>IGV</cbc:Name>
            <cbc:TaxTypeCode>VAT</cbc:TaxTypeCode>
          </cac:TaxScheme>
        </cac:TaxCategory>
      </cac:TaxSubtotal>
    </cac:TaxTotal>
    <cac:Item>
      <cbc:Description>Cerveza Clásica x 12 bot. 620 ml.</cbc:Description>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="PEN">21.92</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>
<!--Certificados Digitales visita www.llama.pe-->';
	    fputs($archivo, $archivoXML);
	    fclose($archivo);
	    
	  }
	  
	}
	
	public function generarXMLConDomDocument(){
	  $data_array = array(
	    array(
	      'title' => 'title1',
	      'content' => 'content1',
	      'pubdate' => '2009-10-11',
	    ),
	    array(
	      'title' => 'title2',
	      'content' => 'content2',
	      'pubdate' => '2009-11-11',
	    )
	  );
	  
	  // conjunto de propiedades
	  $attribute_array = array(
	    'title' => array(
	      'size' => 1
	    )
	  );
	  
	  // Cree un documento XML y configure la versión y la codificación XML. .
	  $dom=new DomDocument('1.0', 'utf-8');
	  
	  // Crear nodo raíz
	  $article = $dom->createElement('article');
	  $dom->appendchild($article);
	  
	  foreach ($data_array as $data) {
	    $item = $dom->createElement('item');
	    $article->appendchild($item);
	    
	    $this->create_item($dom, $item, $data, $attribute_array);
	  }
	  // Output headers
	  header('Content-type: "text/xml"; charset="utf8"');
	  header('Content-disposition: attachment; filename="example.xml"');
	  
	  // Output content
	  echo $dom->saveXML();
	  
	}
	function create_item($dom, $item, $data, $attribute) {
	  if (is_array($data)) {
	    foreach ($data as $key => $val) {
	      // crear elemento
	      $$key = $dom->createElement($key);
	      $item->appendchild($$key);
	      
	      // Crear valor de elemento
	      $text = $dom->createTextNode($val);
	      $$key->appendchild($text);
	      
	      if (isset($attribute[$key])) {
	        // Si hay atributos relacionados en este campo, debe establecer
	        foreach ($attribute[$key] as $akey => $row) {
	          // Crear nodo de atributo
	          $$akey = $dom->createAttribute($akey);
	          $$key->appendchild($$akey);
	          
	          // Crear un nodo de valor de atributo
	          $aval = $dom->createTextNode($row);
	          $$akey->appendChild($aval);
	        }
	      }   //  end if
	    }
	  }   //  end if
	}   //  end function
	
	public function generarXMLWriter(){
	  $data_array = array(
	    array(
	      'title' => 'hernan',
	      'content' => 'content1',
	      'pubdate' => '2009-10-11',
	    ),
	    array(
	      'title' => 'title2',
	      'content' => 'content2',
	      'pubdate' => '2009-11-11',
	    )
	  );
	  
	  // conjunto de propiedades
	  $attribute_array = array(
	    'title' => array(
	      'size' => 1
	    )
	  );
	  
	  $xml = new XMLWriter();
	  $xml->openUri("php://output");
	  // El método de salida también se puede establecer en una dirección de archivo xml y directamente en un archivo
	  $xml->setIndentString('  ');
	  $xml->setIndent(true);
	  
	  $xml->startDocument('1.0', 'utf-8');
	  // Comienza a crear archivos
	  // nodo raíz
	  $xml->startElement('article');
	  
	  foreach ($data_array as $data) {
	    $xml->startElement('item');
	    
	    if (is_array($data)) {
	      foreach ($data as $key => $row) {
	        $xml->startElement($key);
	        
	        if (isset($attribute_array[$key]) && is_array($attribute_array[$key]))
	        {
	          foreach ($attribute_array[$key] as $akey => $aval) {
	            // Establecer valor de atributo
	            $xml->writeAttribute($akey, $aval);
	          }
	          
	        }
	        
	        $xml-> text ($row); // Establecer contenido
	        $xml->endElement(); // $key
	      }
	      
	    }
	    $xml->endElement(); //  item
	  }
	  
	  $xml->endElement(); //  article
	  $xml->endDocument();
	  
	  header('Content-type: "text/xml"; charset="utf8"');
	  header('Content-disposition: attachment; filename="example.xml"');
	  
	  $xml->flush();
	}
	
	public function consultaRUC(){
	  $ruta = "https://ruc.com.pe/api/v1/consultas";
	  $token = "804d2211-e953-4c6e-8130-c779fefc3552-f3ebd02f-6e8d-4f63-9567-272e7f845452";
	  
	  $rucaconsultar = '20553510661';
	  
	  $data = array(
	    "token"	=> $token,
	    "ruc"   => $rucaconsultar
	  );
	  
	  $data_json = json_encode($data);
	  
	  // Invocamos el servicio a ruc.com.pe
	  // Ejemplo para JSON
	  $ch = curl_init();
	  curl_setopt($ch, CURLOPT_URL, $ruta);
	  curl_setopt(
	    $ch, CURLOPT_HTTPHEADER, array(
	      'Content-Type: application/json',
	    )
	    );
	  curl_setopt($ch, CURLOPT_POST, 1);
	  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	  curl_setopt($ch, CURLOPT_POSTFIELDS,$data_json);
	  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	  $respuesta  = curl_exec($ch);
	  curl_close($ch);
	  
	  $leer_respuesta = json_decode($respuesta, true);
	  if (isset($leer_respuesta['errors'])) {
	    //Mostramos los errores si los hay
	    echo $leer_respuesta['errors'];
	  } else {
	    //Mostramos la respuesta

	    echo "<pre>";
	    print_r($leer_respuesta, false);
	    echo "</pre>";
	  }
	  
	}
	
}
?>