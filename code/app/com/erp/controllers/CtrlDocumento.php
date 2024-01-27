<?php
require_once (BASEPATH . '/lib/XMLSecLibs/xmlseclibs.php');
require_once (BASEPATH . '/lib/pclzip.lib.php'); // LibrerÃ­a que comprime archivos en .ZIP

use RobRichards\XMLSecLibs\XMLSecurityDSig;
use RobRichards\XMLSecLibs\XMLSecurityKey;

class CtrlDocumento extends Controlador
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

            if ($this->util->get($data, "comando") == "AGREGAR" && $this->util->get($data['doc'], "doc_kydoc", "0") == "0") {
                $data = $this->guardarDocumento($data);
                $data['msg'] = Array(
                    "type" => "success",
                    "text" => $data['doc']['doc_tdoc'] . " registrada"
                );
            } else if ($this->util->get($data, "comando") == "AGREGAR_ANULAR") {
                $doc_kydoc = $data['doc']['doc_kydoc'];
                $data = $this->guardarDocumento($data);

                $tmpDtd = Array();
                $tmpDtd['doc']['doc_kydoc'] = $doc_kydoc;
                $tmpDtd['doc']['doc_esta'] = "ANULADO";
                $tmpDtd['doc']['where'] = "where doc_kydoc='" . $tmpDtd['doc']['doc_kydoc'] . "'";
                $tmpDtd['doc'] = $this->update($tmpDtd['doc'], "erp_documento");
                $data['msg'] = Array(
                    "type" => "success",
                    "text" => $data['doc']['doc_tdoc'] . " registrada"
                );
            } else if ($this->util->get($data, "comando") == "MODIFICAR" && $this->util->get($data, "doc_kydoc") != "0") {
                $data = $this->guardarDocumento($data);
                $data['msg'] = Array(
                    "type" => "success",
                    "text" => $data['doc']['doc_tdoc'] . " registrada"
                );
            } else if ($this->util->get($data, "comando") == "ELIMINAR" && $this->util->get($data, "ope_kydoc") != "-1") {
                if ($_SESSION['com']['com_kyusu'] == $_SESSION['usu']['usu_kyusu']) {
                    foreach ($data['lisKy'] as $key => $val) {

                        $tmpDtd = Array();
                        $tmpDtd['where'] = "WHERE dtd_kydoc = '" . $val['ky'] . "'";
                        $tmpDtd = $this->delete($tmpDtd, "erp_detdocumento");

                        $tmpOpe = Array();
                        $tmpOpe['where'] = "WHERE ope_kydoc = '" . $val['ky'] . "'";
                        $tmpOpe = $this->delete($tmpOpe, "adm_operacion");

                        $data['where'] = "WHERE doc_kydoc = '" . $val['ky'] . "'";
                        $data = $this->delete($data, "erp_documento");

                        $tmpDtd = Array();
                        $tmpDtd['dtd_kydoc'] = $val['ky'];
                    }
                } else {
                    $data['msg'] = Array(
                        "type" => "error",
                        "text" => "Clase:" . get_class($this) . "\nEsta operacion solo elimina el usuario creador"
                    );
                }
            } else if ($this->util->get($data, "comando") == "IMPRIMIR" && $this->util->get($data, "doc_kydoc") != "0") {
                $data['comandoPdf'] = "IMPRIMIR";
                $data = $this->generarPdf($data);
            } else if ($this->util->get($data, "comando") == "GENERAR_FACTURA_ELECTRONICA") {
                $data = $this->generarFacturaElectronica($data);
            } else {
                $data['msg'] = Array(
                    "type" => "error",
                    "text" => "Clase:" . get_class($this) . "\nNo hay comando accion o verificar clave"
                );
            }

            $result['msg'] = $data['msg'];
            $result['doc_kydoc'] = $this->util->get($data, "doc_kydoc");
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function guardarDocumento($data)
    {
        $result = null;
        try {

            $tmpDoc = Array();
            $tmpDoc = $data['doc'];

            if ($data['comando'] == "AGREGAR") {
                $tmpDoc['doc_esta'] = $this->util->get($tmpDoc['doc'], "doc_esta", "APROBADO");
                $tmpDoc = $this->insert($tmpDoc, "erp_documento");

                for ($iteDtd = 0; $iteDtd < count($data['lisDtd']); $iteDtd ++) {
                    $data['lisDtd'][$iteDtd]['dtd_kydtd'] = "0";
                    $data['lisDtd'][$iteDtd]['dtd_kydoc'] = $tmpDoc['doc_kydoc'];

                    $tmpDtd = Array(
                        "dtd" => Array()
                    );
                    $tmpDtd['dtd'] = $data['lisDtd'][$iteDtd];

                    $tmpDtd['comando'] = "AGREGAR";
                    $tmpDtd = $this->run("erp/CtrlDetdocumento", $tmpDtd);
                    $data['lisDtd'][$iteDtd]['dtd_kydtd'] = $tmpDtd['dtd_kydtd'];

                    for ($iteArt = 0; $iteArt < count($data['lisArt']); $iteArt ++) {
                        $tmpArt = Array(
                            "art" => Array()
                        );
                        $tmpArt['art'] = $data['lisArt'][$iteArt];

                        if ($data['lisDtd'][$iteDtd]['dtd_sact'] <= 0) {
                            if ($tmpArt['art']['art_clas'] == "PRODUCTO") {
                                $tmpArt['art']['art_sact'] = 0;
                                $tmpArt['art']['art_pcos'] = 0;
                                $tmpArt['art']['art_pund'] = 0;
                                $tmpArt['art']['art_impo'] = 0;
                            } else {
                                unset($tmpArt['art']['art_sact']);
                                unset($tmpArt['art']['art_pcos']);
                                unset($tmpArt['art']['art_pund']);
                                unset($tmpArt['art']['art_impo']);
                            }
                        } else {
                            unset($tmpArt['art']['art_pund']);
                            $tmpArt['art']['art_sact'] = $data['lisDtd'][$iteDtd]['dtd_sact'];
                            $tmpArt['art']['art_pcos'] = $data['lisDtd'][$iteDtd]['dtd_pcos'];
                            $tmpArt['art']['art_pund'] = $data['lisDtd'][$iteDtd]['dtd_pund'];
                            $tmpArt['art']['art_impo'] = $data['lisDtd'][$iteDtd]['dtd_valo'];
                        }
                        $tmpArt['comando'] = "MODIFICAR";
                        $tmpArt['where'] = "where art_kyart='" . $tmpArt['art']['art_kyart'] . "'";
                        $tmpArt = $this->run("adm/CtrlArticulo", $tmpArt);
                    }
                }
                $tmpPrp = Array();
                $tmpPrp['comando'] = "MODIFICAR";
                $arrNdoc = explode("-", $data['doc']['doc_ndoc']);
                $tmpPrp['prp_prop'] = intVal($arrNdoc[0]);
                $tmpPrp['prp_valu'] = intVal($arrNdoc[1]);
                $tmpPrp['where'] = "WHERE prp_secc = 'NUMDOC' AND prp_kycom = " . $data['doc']['doc_kycom'] . " AND prp_dscr = '" . $data['doc']['doc_tdoc'] . "'";
                $tmpPrp = $this->run("adm/CtrlPropiedad", $tmpPrp);
            } else if ($data['comando'] == "MODIFICAR") {
                $tmpDoc['where'] = "WHERE doc_kydoc = '" . $tmpDoc['doc_kydoc'] . "'";
                $tmpDoc = $this->update($tmpDoc, "erp_documento");
            }

            $data['doc']['doc_kydoc'] = $tmpDoc['doc_kydoc'];

            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function getLisDetLog($data)
    {
        $result = null;
        try {
            $lisSuc = Array();
            for ($ite = 0; $ite < count($data['dol']['items']); $ite ++) {
                if ($data['dol']['items'][$ite]['art_tipo'] == 'PRODUCTO' || (($data['dol']['doc_tope'] == '0007') && $data['dol']['items'][$ite]['art_tipo'] == 'SERVICIO')) {
                    $item = $data['dol']['items'][$ite];
                    $dtd_kysuc = $item['dtd_kysuc'];

                    if (! isset($lisSuc[$dtd_kysuc])) {
                        $lisSuc[$dtd_kysuc]['dol'] = Array();
                        $lisSuc[$dtd_kysuc]['kar'] = Array();

                        $lisSuc[$dtd_kysuc]['dol'] = $data['dol'];

                        if (count($data['dol']) > 0) {
                            foreach ($data['dol'] as $key => $val) {
                                $karKey = str_replace("doc_", "kar_", $key);
                                $lisSuc[$dtd_kysuc]['kar'][$karKey] = $val;
                            } // foreach ($data['dol'] as $key=>$val)
                        } // if(count($data['dol'])>0)
                        $lisSuc[$dtd_kysuc]['kar'] = $this->dbcn->getObjectFromData($lisSuc[$dtd_kysuc]['kar'], "kardex");

                        $lisSuc[$dtd_kysuc]['dol']['doc_kysuc'] = $dtd_kysuc;
                        $lisSuc[$dtd_kysuc]['kar']['kar_kysuc'] = $dtd_kysuc;

                        $lisSuc[$dtd_kysuc]['dol']['items'] = Array();
                        $lisSuc[$dtd_kysuc]['kar']['items'] = Array();
                    }

                    array_push($lisSuc[$dtd_kysuc]['dol']['items'], $this->dbcn->getObjectFromData($item, "detdocumento"));

                    $itemDtk = Array();
                    if (count($data['dol']['items']) > 0) {
                        for ($idxDtk = 0; $idxDtk < count($data['dol']['items']); $idxDtk ++) {
                            $itemDtkTmp = $data['dol']['items'][$idxDtk];
                            foreach ($itemDtkTmp as $keyDtk => $valDtk) {
                                $keyDtkTmp = str_replace("dtd_", "dtk_", $keyDtk);
                                $itemDtk[$keyDtkTmp] = $valDtk;
                            } // foreach ($data['dol'] as $key=>$val)
                            $lisSuc[$dtd_kysuc]['kar']['items'][$idxDtk] = $this->dbcn->getObjectFromData($itemDtk, "detkardex");
                        } // for($idxDtk = 0; $idxDtk < count($data['kar']); $idxDtk++)
                    } // if(count($data['dol'])>0)
                } // if($item[$ite]['tipo']=='PRODUCTO')
            }

            foreach ($lisSuc as $keySuc => $iteSuc) {
                $items = $iteSuc['dol']['items'];

                $iteSuc['dol']['doc_tota'] = 0.00;
                $iteSuc['dol']['doc_dcto'] = 0.00;

                foreach ($items as $keyDtd => $valDtd) {
                    if ($iteSuc['kar']['kar_tctr'] == 'INGRESO') {
                        $valDtd['dtd_pdto'] = $valDtd['dtd_cost'] - $valDtd['dtd_dcto'];
                    } else if ($iteSuc['kar']['kar_tctr'] == 'EGRESO') {
                        $valDtd['dtd_pdto'] = $valDtd['dtd_prec'] - $valDtd['dtd_dcto'];
                    }
                    $valDtd['dtd_impo'] = $valDtd['dtd_cant'] * $valDtd['dtd_pdto'];

                    $iteSuc['dol']['doc_tota'] = $iteSuc['dol']['doc_tota'] + $valDtd['dtd_impo'];
                    $iteSuc['dol']['doc_dcto'] = $iteSuc['dol']['doc_dcto'] + $valDtd['dtd_dcto'];

                    $items[$keyDtd] = $valDtd;
                } // foreach($iteSuc['lisDtd'] as $keyDtd=>$valDtd){

                $iteSuc['dol']['doc_stot'] = $iteSuc['dol']['doc_tota'] / 1.18;
                $iteSuc['dol']['doc_igve'] = $iteSuc['dol']['doc_tota'] * 0.18;

                $iteSuc['dol']['items'] = $items;
                $lisSuc[$keySuc]['dol'] = $iteSuc['dol'];
            }
            $result = $lisSuc;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function saveDocumentoLogistica($data)
    {
        $result = null;
        try {
            if (($data['dol']['doc_tope'] == '0005' || $data['dol']['doc_tope'] == '0006' || $data['dol']['doc_tope'] == '0007' || $data['dol']['doc_tope'] == '0008')) {
                $lisSuc = $this->getLisDetLog($data);

                foreach ($lisSuc as $iteSuc) {
                    $data['dol'] = $iteSuc['dol'];

                    $tmpDtd = Array();
                    $tmpDtd['prp_kycom'] = $_SESSION['com']['com_kycom'];
                    $tmpDtd['prp_kysuc'] = $data['dol']['doc_kysuc'];
                    $tmpDtd['prp_secc'] = "NUMDOC";
                    $tmpDtd['prp_codi'] = $data['dol']['doc_tdoc'];

                    $tmpDtd = $this->run("adm/GetListaPropiedad", $tmpDtd);

                    if (count($tmpDtd['lista']['items']) > 0) {
                        $prp = $tmpDtd['lista']['items'][0];
                        $data['dol']['doc_ndoc'] = $prp['prp_prop'] . "-" . ($prp['prp_valu'] + 1);
                    } // if(count($tmpDtd['lista']['items'])>0)
                    $data['dol']['comando'] = "AGREGAR";

                    $tmpDtd = $this->ejecutar($data['dol']);
                    $data['dol']['doc_kydoc'] = $tmpDtd['doc_kydoc'];

                    $data['kar'] = $iteSuc['kar'];
                    $data['kar']['comando'] = "AGREGAR";
                    $data['kar']['kar_kykar'] = 0;
                    $data['kar']['kar_kypdr'] = $this->util->get($data['dol'], "doc_kypdr");
                    $data['kar']['kar_kydrf'] = $this->util->get($data['dol'], "doc_kydoc");
                    $data['kar']['kar_toar'] = $data['dol']['doc_tope'];
                    $data['kar']['kar_glos'] = 'POR ' . $this->util->tipOpe[$data['dol']['doc_tope']] . ' Nro: ' . $data['dol']['doc_ndoc'];

                    $data['kar'] = $this->run("CtrlKardex", $data['kar']);

                    $data['kar']['comando'] = "APROBAR";
                    $data['kar'] = $this->run("CtrlKardex", $data['kar']);

                    // $doc=$data;
                    // if($doc->id_dref>0 && $doc->id_dref!=$doc->id_docu)
                    // {
                    // $data['resp']=$this->documento->updateIdDrefFromIdDocu(Array('id_docu'=>$doc->id_dref,'id_dref'=>$doc->id_docu));
                    // }
                } // foreach ($lisSuc as $iteSuc)
            } // if( ( $data['dol']['doc_tope']=='0005' || $data['dol']['doc_tope']=='0006' || $data['dol']['doc_tope']=='0007' || $data['dol']['doc_tope']=='0008' ) )
            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function generarFacturaElectronica($data)
    {
        $result = null;
        try {

            $data = $this->generarArchivosPEM($data);
            $data = $this->generarFacturaXML($data);
            $data = $this->firmarFacturaXML($data);
            $data = $this->enviarFacturaXML($data);
            $data = $this->imprimirFacturaElectronica($data);

            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function generarArchivosPEM($data)
    {
        $result = null;
        try {
            header('Content-Type: text/html; charset=UTF-8');

            // CONTRASEÑA DEL CERTIFICADO
            $contrasena = 'surmotriz486255';

            // NOMBRE DEL CERTIFICADO EN FORMATO .pfx
            $nombreArchivo = 'fact/archcert/MPS20161014372689.pfx';

            // DEVOLVEMOS EL CERTIFICADO COMO UN STRING (CADENA)
            $pkcs12 = file_get_contents($nombreArchivo);

            // DECLARAMOS UN ARREGLO PARA RECUPERAR LOS CERTIFICADOS
            $certificados = array();

            // PASAMOS LOS PARAMETROS
            $respuesta = openssl_pkcs12_read($pkcs12, $certificados, $contrasena);

            // SI LA RESPUESTRA ES TRUE ES PORQUE SE HA RECUPERADO CORRECTAMENTE LOS CERTIFICADOS
            if ($respuesta) {

                $publicKeyPem = $certificados['cert']; // ARCHIVO PUBLICO
                $privateKeyPem = $certificados['pkey']; // ARCHIVO PRIVADO

                // GUARDO LA CLAVE PUBLICA Y PRIVADA EN MI DIRECTORIO EN FORMATO .pem
                file_put_contents('fact/archpem/private_key.pem', $privateKeyPem);
                file_put_contents('fact/archpem/public_key.pem', $publicKeyPem);
                chmod("fact/archpem/private_key.pem", 0777);
                chmod("fact/archpem/public_key.pem", 0777);
            } else {
                echo openssl_error_string();
            }
            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function generarFacturaXML($data)
    {
        $result = null;
        try {

            header('Content-Type: text/html; charset=UTF-8');

            $xml = new DomDocument('1.0', 'ISO-8859-1');

            $xml->standalone = false;
            $xml->preserveWhiteSpace = false;

            $Invoice = $xml->createElement('Invoice');
            $Invoice = $xml->appendChild($Invoice);
            // ESTABLECER ATTRIBUTOS
            $Invoice->setAttribute('xmlns', 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2');
            $Invoice->setAttribute('xmlns:cac', 'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2');
            $Invoice->setAttribute('xmlns:cbc', 'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2');
            $Invoice->setAttribute('xmlns:ccts', "urn:un:unece:uncefact:documentation:2");
            $Invoice->setAttribute('xmlns:ds', "http://www.w3.org/2000/09/xmldsig#");
            $Invoice->setAttribute('xmlns:ext', "urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2");
            $Invoice->setAttribute('xmlns:qdt', "urn:oasis:names:specification:ubl:schema:xsd:QualifiedDatatypes-2");
            $Invoice->setAttribute('xmlns:sac', "urn:sunat:names:specification:ubl:peru:schema:xsd:SunatAggregateComponents-1");
            // $Invoice->setAttribute('xmlns:schemaLocation', "urn:oasis:names:specification:ubl:schema:xsd:Invoice-2 ../xsd/maindoc/UBLPE-Invoice-1.0.xsd");
            $Invoice->setAttribute('xmlns:udt', "urn:un:unece:uncefact:data:specification:UnqualifiedDataTypesSchemaModule:2");

            $this->extUBLExtensions($xml, $Invoice);
            $this->versionUBL($xml, $Invoice, "2.1");
            $this->versionPersonalizada($xml, $Invoice, "2.0");
            $this->numeroDeDocumento($xml, $Invoice, "F002-00000026");
            $this->fechaDeEmision($xml, $Invoice, "2016-12-12");
            $this->horaDeEmision($xml, $Invoice, "00:00:00");
            $this->tipoDeDocumento($xml, $Invoice, "01");
            $this->descripcionImporte($xml, $Invoice, "TRES MIL OCHOCIENTOS VENTICUATRO  Y 92/100 SOLES");
            $this->tipoDeMoneda($xml, $Invoice, "PEN");
            // $this->ordenReferencia($xml, $Invoice, "17788");
            // $this->documentoReferencia($xml, $Invoice, "0001-0023573", "09");

            $this->firmaDigital($xml, $Invoice, "F002-00000026", "780086", "20532710066", "DESARROLLO DE SISTEMAS INTEGRADOS DE GESTIÓN", "FERNANDO CARMELO MAMANI BLAS ", "SIGN");

            $this->datosDelEmisor($xml, $Invoice, "20532710066", "DESARROLLO DE SISTEMAS INTEGRADOS DE GESTIÓN", "FERNANDO CARMELO MAMANI BLAS ", "AV. ANDRES ARAMBURU URB. LIMATAMBO NRO 856 INTERIOR 201 SURQUILLO LIMA LIMA");

            $this->datosDelReceptor($xml, $Invoice, "F002-00000026", "20455108757", "VIP", "VIP");

            // $this->datosDelProveedor($xml, $Invoice);

            $this->formaDePago($xml, $Invoice, "Contado", "100.00");

            // $this->cuotaDePago($xml, $Invoice, "Cuota001", "3710.17", "20221-03-15");

            // $this->totalDsctoDeLaFactura($xml, $Invoice, "10", "11.80", "118.00");

            $this->totalImpuestoDeLaFactura($xml, $Invoice, "18.00", "100.00");

            $this->totalLegalDeLaFactura($xml, $Invoice, "100.00", "118.00");

            $this->datosDetalleFactura($xml, $Invoice, "1", "ALM", "100.00", "CLAVO PARA CONCRETO DE  2", "1.00", "1.80", "18.00", "100.00");

            // $this->datosDetalleFactura($xml, $Invoice, "2", "EL506", "100", "PUNZON PERFORADOR PARA CONEXION A FRASCO O BOLSA CON VALVULA ANTIRETORNO Lotes: - 21C22-TW Cant: 100.0 F.V.: 2024-02-22", "84700", "9.9946", "152.46", "847.00");

            // $this->datosDetalleFactura($xml, $Invoice, "3", "PHCC", "576", "PAÑO PARA LA HIGIENE CORPORAL CON SOLUCION JABONOSA DE CLORHEXIDINA Lotes: - 1074 Cant: 576.0 F.V.: 2024-03-01", "2.5389930556", "2.9960069444", "263.24", "1462.46");

            $xml->formatOutput = true;
            $xml->saveXML();
            $xml->save('fact/xmlprev/20532710066-01-F002-00000026.xml');

            chmod('fact/xmlprev/20532710066-01-F002-00000026.xml', 0777);

            $data['msg'] = Array(
                "type" => "success",
                "text" => "Clase:" . get_class($this) . "\nExito"
            );

            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function firmarFacturaXML($data)
    {
        $result = null;
        try {

            header('Content-Type: text/html; charset=UTF-8');

            // CARGAR EL XML A FIRMAR
            $doc = new DOMDocument();
            $doc->load('fact/xmlprev/20532710066-01-F002-00000026.xml');

            // CREAR UN NUEVO OBJETO DE SEGURIDAD
            $objDSig = new XMLSecurityDSig();

            // UTILIZAR LA CANONIZACION EXCLUSIVA DE c14n
            $objDSig->setCanonicalMethod(XMLSecurityDSig::EXC_C14N);

            // FIRMAR CON SHA-256
            $objDSig->addReference($doc, XMLSecurityDSig::SHA1, array(
                'http://www.w3.org/2000/09/xmldsig#enveloped-signature'
            ), array(
                'force_uri' => true
            ));

            // CREAR UNA NUEVA CLAVE DE SEGURIDAD (PRIVADA)
            $objKey = new XMLSecurityKey(XMLSecurityKey::RSA_SHA1, array(
                'type' => 'private'
            ));

            // CARGAMOS LA CLAVE PRIVADA
            $objKey->loadKey('fact/archpem/private_key.pem', true);
            $objDSig->sign($objKey);

            // AGREGUE LA CLAVE PUBLICA ASOCIADA A LA FIRMA
            $objDSig->add509Cert(file_get_contents('fact/archpem/public_key.pem'), true, false, array(
                'subjectName' => true
            )); // array('issuerSerial' => true, 'subjectName' => true));

            // ANEXAR LA FIRMA AL XML
            $objDSig->appendSignature($doc->getElementsByTagName('ExtensionContent')
                ->item(1));

            // GUARDAR EL XML FIRMADO
            $doc->save('fact/xmlfirm/20532710066-01-F002-00000026.xml');
            chmod('fact/xmlfirm/20532710066-01-F002-00000026.xml', 0777);

            $data['msg'] = Array(
                "type" => "success",
                "text" => "Clase:" . get_class($this) . "\nExito"
            );

            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function enviarFacturaXML($data)
    {
        $result = null;
        try {

            header('Content-Type: text/html; charset=UTF-8');

            $ruta = "fact/xmlfirm/";
            // $ruta = "";
            // NOMBRE DE ARCHIVO A PROCESAR.
            $NomArch = '20532710066-01-F002-00000026';

            $zip = new PclZip($ruta . $NomArch . ".zip");
            $zip->create($ruta . $NomArch . ".xml", PCLZIP_OPT_REMOVE_ALL_PATH);
            // $zip->add($ruta.$NomArch.".xml",PCLZIP_OPT_REMOVE_ALL_PATH);
            chmod($ruta . $NomArch . ".zip", 0777);

            // URL para enviar las solicitudes a SUNAT
            $wsdlURL = 'https://e-beta.sunat.gob.pe/ol-ti-itcpfegem-beta/billService?wsdl';
            // $wsdlURL = "https://e-factura.sunat.gob.pe/ol-ti-itcpfegem/billService?wsdl";

            // Estructura del XML para la conexiÃ³n
            $XMLString = '<?xml version="1.0" encoding="UTF-8"?>
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.sunat.gob.pe" xmlns:wsse="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-secext-1.0.xsd">
 <soapenv:Header>
     <wsse:Security>
         <wsse:UsernameToken Id="ABC-123">
             <wsse:Username>20532710066MODDATOS</wsse:Username>
             <wsse:Password>MODDATOS</wsse:Password>
         </wsse:UsernameToken>
     </wsse:Security>
 </soapenv:Header>
 <soapenv:Body>
     <ser:sendBill>
        <fileName>' . $NomArch . '.zip</fileName>
        <contentFile>' . base64_encode(file_get_contents($ruta . $NomArch . '.zip')) . '</contentFile>
     </ser:sendBill>
 </soapenv:Body>
</soapenv:Envelope>';

            // REALIZAMOS LA LLAMADA A NUESTRA FUNCION
            $result = $this->soapCall($wsdlURL, $callFunction = "sendBill", $XMLString);

            // DESCARGAMOS EL ARCHIVO RESPONSE
            $archivo = fopen($ruta . 'C' . $NomArch . '.xml', 'w+');
            fputs($archivo, $result);
            fclose($archivo);

            /* LEEMOS EL ARCHIVO XML */
            $xml = simplexml_load_file($ruta . 'C' . $NomArch . '.xml');
            foreach ($xml->xpath('//applicationResponse') as $response) {}

            /* AQUI DESCARGAMOS EL ARCHIVO CDR(CONSTANCIA DE RECEPCION) */
            $cdr = base64_decode($response);
            $archivo = fopen($ruta . 'R-' . $NomArch . '.zip', 'w+');
            fputs($archivo, $cdr);
            fclose($archivo);
            chmod($ruta . 'R-' . $NomArch . '.zip', 0777);

            $archive = new PclZip($ruta . 'R-' . $NomArch . '.zip');
            if ($archive->extract($ruta) == 0) {
                die("Error : " . $archive->errorInfo(true));
            } else {
                chmod($ruta . 'R-' . $NomArch . '.xml', 0777);
            }

            /* Eliminamos el Archivo Response */
            unlink($ruta . 'C' . $NomArch . '.xml');

            $data['msg'] = Array(
                "type" => "success",
                "text" => "Clase:" . get_class($this) . "\nExito"
            );

            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function imprimirFacturaElectronica($data)
    {
        $result = null;
        try {
            $tmpDtd = Array();
            $tmpDtd['doc_kycom'] = $_SESSION['com']['com_kycom'];
            $tmpDtd['doc_kydoc'] = $data['doc_kydoc'];
            $tmpDtd['doc_kysuc'] = $_SESSION['suc']['suc_kysuc'];

            $tmpDtd = $this->run("erp/GetListaDocumento", $tmpDtd);
            if (count($tmpDtd['lista']['items']) > 0) {
                $data['doc'] = $tmpDtd['lista']['items'][0];

                $tmpDtd = Array();
                $tmpDtd['dtd_kydoc'] = $data['doc']['doc_kydoc'];

                $tmpDtd = $this->run("erp/GetListaDetDocumento", $tmpDtd);
                if (count($tmpDtd['lista']['items']) > 0) {
                    $data['lisDtd'] = $tmpDtd['lista']['items'];
                    // $dataPage['dbapp'] = "erp";
                    // $dataPage['modulo'] = "images";
                    // $dataPage['mainEmp'] = strtoupper($_SESSION['com']['com_dscr']);

                    // $dataPage['archivo'] = "pdfTemporal.pdf";
                    // $dataPage['ruta'] = "pdf";
                    // $data['nombPdfFile'] = "pdf/pdfTemporal.pdf";

                    $data['comandoPdf'] = "PREVIEW";
                    $data = $this->run("erp/documento_pdf", $data);

                    $result = $data;
                }
            }
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }

    public function soapCall($wsdlURL, $callFunction = "", $XMLString)
    {
        $client = new feedSoap($wsdlURL, array(
            'trace' => true
        ));
        $reply = $client->SoapClientCall($XMLString);

        // echo "REQUEST:\n" . $client->__getFunctions() . "\n";
        $client->__call("$callFunction", array(), array());
        // $request = prettyXml($client->__getLastRequest());
        // echo highlight_string($request, true) . "<br/>\n";
        return $client->__getLastResponse();
    }

    public function extUBLExtensions($xml, $Invoice)
    {
        $xmlNiv2 = $xml->createElement('ext:UBLExtensions');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('ext:UBLExtension');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('ext:ExtensionContent');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('sac:AdditionalInformation');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('sac:AdditionalMonetaryTotal');
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv7 = $xml->createElement('cbc:ID', '1001');
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);

        $xmlNiv7 = $xml->createElement('cbc:PayableAmount', '0.00');
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);
        $xmlNiv7->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('ext:UBLExtension');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('ext:ExtensionContent', " ");
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);
    }

    public function versionUBL($xml, $Invoice, $valor)
    {
        $xmlNiv2 = $xml->createElement('cbc:UBLVersionID', $valor);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function versionPersonalizada($xml, $Invoice, $versionEstructuraDocumento)
    {
        $xmlNiv2 = $xml->createElement('cbc:CustomizationID', $versionEstructuraDocumento);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function numeroDeDocumento($xml, $Invoice, $valor)
    {
        $xmlNiv2 = $xml->createElement('cbc:ID', $valor);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function fechaDeEmision($xml, $Invoice, $fechaEmision)
    {
        $xmlNiv2 = $xml->createElement('cbc:IssueDate', $fechaEmision);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function horaDeEmision($xml, $Invoice, $valor)
    {
        $xmlNiv2 = $xml->createElement('cbc:IssueTime', $valor);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function tipoDeDocumento($xml, $Invoice, $valor)
    {
        $xmlNiv2 = $xml->createElement('cbc:InvoiceTypeCode', $valor);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
        $xmlNiv2->setAttribute('listID', "0101");
        $xmlNiv2->setAttribute('listAgencyName', "PE:SUNAT");
        $xmlNiv2->setAttribute('listName', "Tipo de Documento");
        $xmlNiv2->setAttribute('name', "Tipo de Operacion");
        $xmlNiv2->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo01");
        $xmlNiv2->setAttribute('listSchemeURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo51");
    }

    public function descripcionImporte($xml, $Invoice, $valor)
    {
        $xmlNiv2 = $xml->createElement('cbc:Note', $valor);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function tipoDeMoneda($xml, $Invoice, $valor)
    {
        $xmlNiv2 = $xml->createElement('cbc:DocumentCurrencyCode', $valor);
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);
    }

    public function ordenReferencia($xml, $Invoice, $numeroOrdenReferencia)
    {
        $xmlNiv2 = $xml->createElement('cac:OrderReference');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:ID', $numeroOrdenReferencia);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
    }

    public function documentoReferencia($xml, $Invoice, $docNume, $docTipo)
    {
        $xmlNiv2 = $xml->createElement('cac:DespatchDocumentReference');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:ID', $docNume);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:DocumentTypeCode', $docTipo);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
    }

    public function firmaDigital($xml, $Invoice, $numeroFactura, $validadorID, $rucEmisor, $nombreRazonSocial, $nombreApellidos, $uriFirmaDigital)
    {
        $xmlNiv2 = $xml->createElement('cac:Signature');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:ID', $rucEmisor);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:Note', "Elaborado por Sistema de Emision Electronica Facturador SUNAT (SEE-SFS) 1.0.0");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:ValidatorID', $validadorID);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cac:SignatoryParty');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cac:PartyIdentification');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', $rucEmisor);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv4 = $xml->createElement('cac:PartyName');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:Name', $nombreRazonSocial);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv4 = $xml->createElement('cac:AgentParty');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cac:PartyIdentification');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cbc:ID', $rucEmisor);
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv5 = $xml->createElement('cac:PartyName');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cbc:Name', $nombreApellidos);
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv5 = $xml->createElement('cac:PartyLegalEntity');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cbc:RegistrationName', $nombreApellidos);
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv3 = $xml->createElement('cac:DigitalSignatureAttachment');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cac:ExternalReference');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:URI', $uriFirmaDigital);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
    }

    public function datosDelEmisor($xml, $Invoice, $numeroRuc, $nombreComercial, $nombreApellidos, $domicilioFiscal)
    {
        $xmlNiv2 = $xml->createElement('cac:AccountingSupplierParty');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:CustomerAssignedAccountID', "20532710066");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:AdditionalAccountID', "6");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cac:Party');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cac:PartyIdentification');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', $numeroRuc);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        $xmlNiv5->setAttribute('schemeAgencyName', "PE:SUNAT");
        $xmlNiv5->setAttribute('schemeID', "6");
        $xmlNiv5->setAttribute('schemeName', "Documento de Identidad");
        $xmlNiv5->setAttribute('schemeURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06");

        $xmlNiv4 = $xml->createElement('cac:PartyName');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:Name', $nombreComercial);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv4 = $xml->createElement('cac:PostalAddress');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', "040101");
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv5 = $xml->createElement('cbc:StreetName', "Mercado 3 de Octubre Av-Brasil, B4, Comité 1 - JLB y Rivero");
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv5 = $xml->createElement('cac:Country');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cbc:IdentificationCode', "PER");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv4 = $xml->createElement('cac:PartyLegalEntity');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:RegistrationName', $nombreApellidos);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv5 = $xml->createElement('cac:RegistrationAddress');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cbc:AddressTypeCode', "0000");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv6 = $xml->createElement('cac:AddressLine');
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv7 = $xml->createElement('cbc:Line', $domicilioFiscal);
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);

        $xmlNiv6 = $xml->createElement('cac:Country');
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv7 = $xml->createElement('cbc:IdentificationCode', "PE");
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);
        $xmlNiv7->setAttribute('listAgencyName', "United Nations Economic Commission for Europe");
        $xmlNiv7->setAttribute('listID', "ISO 3166-1");
        $xmlNiv7->setAttribute('listName', "Country");
    }

    public function datosDelReceptor($xml, $Invoice, $numeroDocumento, $numeroRuc, $nombreRazonSocial, $direccion)
    {
        $xmlNiv2 = $xml->createElement('cac:AccountingCustomerParty');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:CustomerAssignedAccountID', $numeroRuc);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:AdditionalAccountID', "6");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cac:Party');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cac:PartyIdentification');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', $numeroRuc);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        $xmlNiv5->setAttribute('schemeID', "6");
        $xmlNiv5->setAttribute('schemeName', "Documento de Identidad");
        $xmlNiv5->setAttribute('schemeAgencyName', "PE:SUNAT");
        $xmlNiv5->setAttribute('schemeURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo06");

        $xmlNiv4 = $xml->createElement('cac:PartyLegalEntity');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:RegistrationName', $nombreRazonSocial);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv5 = $xml->createElement('cac:RegistrationAddress');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cac:AddressLine');
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv7 = $xml->createElement('cbc:Line', $direccion);
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);
    }

    public function datosDelProveedor($xml, $Invoice)
    {
        $xmlNiv2 = $xml->createElement('cac:SellerSupplierParty');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cac:Party');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cac:PostalAddress');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:AddressTypeCode', "0");
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
    }

    public function formaDePago($xml, $Invoice, $codigoDetraccion, $montoDetraccion)
    {
        $xmlNiv2 = $xml->createElement('cac:PaymentTerms');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:ID', "FormaPago");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:PaymentMeansID', $codigoDetraccion);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:Amount', $montoDetraccion);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");
    }

    public function cuotaDePago($xml, $Invoice, $codigoCuota, $montoCuota, $fechaVencimiento)
    {
        $xmlNiv2 = $xml->createElement('cac:PaymentTerms');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:ID', "FormaPago");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:PaymentMeansID', $codigoCuota);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:Amount', $montoCuota);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cbc:PaymentDueDate', $fechaVencimiento);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
    }

    public function totalDsctoDeLaFactura($xml, $Invoice, $porcentajeDescuento, $totalDescuento, $totalVentaConIgv)
    {
        $xmlNiv2 = $xml->createElement('cac:AllowanceCharge');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:ChargeIndicator', "false");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:AllowanceChargeReasonCode', "62");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('listAgencyName', "PE:SUNAT");
        $xmlNiv3->setAttribute('listName', "Cargo/descuento");
        $xmlNiv3->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo53");

        $xmlNiv3 = $xml->createElement('cbc:MultiplierFactorNumeric', $porcentajeDescuento);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:Amount', $totalDescuento);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cbc:BaseAmount', $totalVentaConIgv);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");
    }

    public function totalImpuestoDeLaFactura($xml, $Invoice, $totalImpuesto, $totalVentaSinIgv)
    {
        $xmlNiv2 = $xml->createElement('cac:TaxTotal');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:TaxAmount', $totalImpuesto);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cac:TaxSubtotal');
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cbc:TaxableAmount', $totalVentaSinIgv);
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);
        $xmlNiv4->setAttribute('currencyID', "PEN");

        $xmlNiv4 = $xml->createElement('cbc:TaxAmount', $totalImpuesto);
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);
        $xmlNiv4->setAttribute('currencyID', "PEN");

        $xmlNiv4 = $xml->createElement('cac:TaxCategory');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', "S");
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        $xmlNiv5->setAttribute('schemeAgencyName', "United Nations Economic Commission for Europe");
        $xmlNiv5->setAttribute('schemeID', "UN/ECE 5305");
        $xmlNiv5->setAttribute('schemeName', "Tax Category Identifier");

        $xmlNiv5 = $xml->createElement('cac:TaxScheme');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv6 = $xml->createElement('cbc:ID', "1000");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv6 = $xml->createElement('cbc:Name', "IGV");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv6 = $xml->createElement('cbc:TaxTypeCode', "VAT");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);
    }

    public function totalLegalDeLaFactura($xml, $Invoice, $totalVentaSinIgv, $totalVentaConIgv)
    {
        $xmlNiv2 = $xml->createElement('cac:LegalMonetaryTotal');
        $xmlNiv2 = $Invoice->appendChild($xmlNiv2);

        $xmlNiv3 = $xml->createElement('cbc:LineExtensionAmount', $totalVentaSinIgv);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cbc:TaxInclusiveAmount', $totalVentaConIgv);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cbc:AllowanceTotalAmount', "0.00");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cbc:ChargeTotalAmount', "0.00");
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cbc:PayableAmount', $totalVentaConIgv);
        $xmlNiv3 = $xmlNiv2->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");
    }

    public function datosDetalleFactura($xml, $Invoice, $numItem, $codigoProducto, $cantidad, $descripcion, $precioSinIgv, $precioConIgv, $importeImpuesto, $importeVentaSinIgv)
    {
        $InvoiceLine = $xml->createElement('cac:InvoiceLine');
        $InvoiceLine = $Invoice->appendChild($InvoiceLine);

        $xmlNiv3 = $xml->createElement('cbc:ID', $numItem);
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);

        $xmlNiv3 = $xml->createElement('cbc:InvoicedQuantity', $cantidad);
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('unitCode', "ZZ");
        // $xmlNiv3->setAttribute('unitCodeListID', "UN/ECE rec 20");
        // $xmlNiv3->setAttribute('unitCodeListAgencyName', "United Nations Economic Commission for Europe");

        $xmlNiv3 = $xml->createElement('cbc:LineExtensionAmount', $importeVentaSinIgv);
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);
        $xmlNiv3->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cac:PricingReference');
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cac:AlternativeConditionPrice');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:PriceAmount', $precioConIgv);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        $xmlNiv5->setAttribute('currencyID', "PEN");

        $xmlNiv5 = $xml->createElement('cbc:PriceTypeCode', "01");
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        // $xmlNiv5->setAttribute('listName', "Tipo de Precio");
        // $xmlNiv5->setAttribute('listAgencyName', "PE:SUNAT");
        // $xmlNiv5->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo16");

        // $xmlNiv3 = $xml->createElement('cac:AllowanceCharge');
        // $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);

        // $xmlNiv4 = $xml->createElement('cbc:ChargeIndicator', "false");
        // $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        // $xmlNiv4 = $xml->createElement('cbc:Amount', "0.00");
        // $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);
        // $xmlNiv4->setAttribute('currencyID', "PEN");

        $xmlNiv3 = $xml->createElement('cac:TaxTotal');
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cbc:TaxAmount', $importeImpuesto);
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);
        $xmlNiv4->setAttribute('currencyID', "PEN");

        $xmlNiv4 = $xml->createElement('cac:TaxSubtotal');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:TaxableAmount', $importeVentaSinIgv);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        $xmlNiv5->setAttribute('currencyID', "PEN");

        $xmlNiv5 = $xml->createElement('cbc:TaxAmount', $importeImpuesto);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);
        $xmlNiv5->setAttribute('currencyID', "PEN");

        $xmlNiv5 = $xml->createElement('cac:TaxCategory');
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        // $xmlNiv6 = $xml->createElement('cbc:ID', "S");
        // $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);
        // $xmlNiv6->setAttribute('schemeID', "UN/ECE 5305");
        // $xmlNiv6->setAttribute('schemeName', "Codigo de tributos");
        // $xmlNiv6->setAttribute('schemeAgencyName', "PE:SUNAT");

        $xmlNiv6 = $xml->createElement('cbc:Percent', "18.00");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv6 = $xml->createElement('cbc:TaxExemptionReasonCode', "10");
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);
        // $xmlNiv6->setAttribute('listAgencyName', "PE:SUNAT");
        // $xmlNiv6->setAttribute('listName', "Afectacion del IGV");
        // $xmlNiv6->setAttribute('listURI', "urn:pe:gob:sunat:cpe:see:gem:catalogos:catalogo07");

        $xmlNiv6 = $xml->createElement('cac:TaxScheme');
        $xmlNiv6 = $xmlNiv5->appendChild($xmlNiv6);

        $xmlNiv7 = $xml->createElement('cbc:ID', "1000");
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);
        // $xmlNiv7->setAttribute('schemeID', "UN/ECE 5153");
        // $xmlNiv7->setAttribute('schemeName', "Codigo de tributos");
        // $xmlNiv7->setAttribute('schemeAgencyName', "PE:SUNAT");

        $xmlNiv7 = $xml->createElement('cbc:Name', "IGV");
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);

        $xmlNiv7 = $xml->createElement('cbc:TaxTypeCode', "VAT");
        $xmlNiv7 = $xmlNiv6->appendChild($xmlNiv7);

        $xmlNiv3 = $xml->createElement('cac:Item');
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cbc:Description', $descripcion);
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv4 = $xml->createElement('cac:SellersItemIdentification');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', $codigoProducto);
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv4 = $xml->createElement('cac:AdditionalItemIdentification');
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);

        $xmlNiv5 = $xml->createElement('cbc:ID', "A");
        $xmlNiv5 = $xmlNiv4->appendChild($xmlNiv5);

        $xmlNiv3 = $xml->createElement('cac:Price');
        $xmlNiv3 = $InvoiceLine->appendChild($xmlNiv3);

        $xmlNiv4 = $xml->createElement('cbc:PriceAmount', $precioSinIgv);
        $xmlNiv4 = $xmlNiv3->appendChild($xmlNiv4);
        $xmlNiv4->setAttribute('currencyID', "PEN");
    }
}

# ==============================================================================
# Procedimiento para enviar comprobante a la SUNAT
class feedSoap extends SoapClient
{

    public $XMLStr = "";

    public function setXMLStr($value)
    {
        $this->XMLStr = $value;
    }

    public function getXMLStr()
    {
        return $this->XMLStr;
    }

    public function __doRequest($request, $location, $action, $version, $one_way = 0)
    {
        $request = $this->XMLStr;

        $dom = new DOMDocument('1.0');

        try {
            $dom->loadXML($request);
        } catch (DOMException $e) {
            die($e->code);
        }

        $request = $dom->saveXML();

        // Solicitud
        return parent::__doRequest($request, $location, $action, $version, $one_way = 0);
    }

    public function SoapClientCall($SOAPXML)
    {
        return $this->setXMLStr($SOAPXML);
    }
}
?>