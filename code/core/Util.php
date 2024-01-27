<?php
class Util
{
	private static $instance;
	
	public function __construct(){}
	
	public static function getInst() {
		if (self::$instance == null) {self::$instance = new self();}
		return self::$instance;
	}
	var $PRVDECIPREC = 2;
	var $PRVDECIVIEW = 2;
	var $PRVIGV = 18;
	var $listaMenu = Array();
	
	var $segmentourl;
	
	var $dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
	var $meses = array("","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
	
	var $estado = Array(
		"0000"=>'SINESTADO',
		"0001"=>'APROBADO',
		"0002"=>'PENDIENTE',
		"0003"=>'ANULADO',
		"0004"=>'RECHAZADO',
		"0215"=>'APROBADO',
		"0216"=>'DESAPROBADO',
		"0217"=>'MODIFICADO',
		"0218"=>'REFERENCIADO',
		"0219"=>'ENCREDITO',
		"0220"=>'CANCELADO',
		"0221"=>'ENPROCESO',
		"0222"=>'ENTREGADO',
		"0223"=>'FACTURADO',
		"0224"=>'PAGADO',
		"0225"=>'FINALIZADO',
		"0226"=>'ACTIVO',
		"0227"=>'CESADO',
		"0228"=>'VACACIONES',
		"0229"=>'TRASLADO'
	);
	var $tipDoc = Array(
		'0001'=>'FACTURA VENTA',
		'0002'=>'BOLETA VENTA',
		'0003'=>'RECIBO VENTA',
		'0004'=>'NOTA DE INGRESO CAJA',
		'0005'=>'NOTA DE INGRESO ALMACEN',
		'0006'=>'NOTA DE SALIDA ALMACEN',
		'0007'=>'GUIA DE REMISION INGRESO',
		'0008'=>'NOTA DE PEDIDO',
		'0009'=>'COTIZACION',
		'0010'=>'ORDEN DE COMPRA',
		'0011'=>'PROFORMA',
		'0012'=>'PEDIDO',
		'0013'=>'OPERACION BANCO',
		'0014'=>'ORDEN DE ENTREGA',
		'0015'=>'CONTROL CREDITO',
		'0016'=>'REQ. AREA TECNICA',
		'0017'=>'FACTURA COMPRA',
		'0018'=>'GUIA DE REMISION SALIDA',
		'0019'=>'RECIBO POR HONORARIO',
		'0020'=>'CTA CCI',
		'0021'=>'BOLETA COMPRA',
		'0022'=>'TICKET FACTURA',
		'0023'=>'TICKET BOLETA',
		'0024'=>'NOTA DE COMPRA',
		'0025'=>'PRESUPUESTO',
		'0026'=>'CHEQUE',
		'0027'=>'LETRA',
		'0028'=>'RECIBO COMPRA',
		'0029'=>'RECIBO CAJA'
			
	);
	var $tipOpe = Array(
		'0001'=>'COMPRA',
		'0002'=>'VENTA',
		'0003'=>'TRA-ALM',
		'0004'=>'SAL-INI',
		'0005'=>'COT-PRO',
		'0006'=>'PED-PRO',
		'0007'=>'ING-ALM',
		'0008'=>'EGR-ALM',
		'0009'=>'COT-CLI',
		'0010'=>'PED-CLI',
		'0011'=>'CTR-CAJ',
		'0012'=>'CTR-CTA',
		'0013'=>'PRE-EMP',
		'0014'=>'RETIRO',
		'0015'=>'DEPOSITO',
		'0016'=>'TRANSFERENCIA',
		'0017'=>'PAGO',
		'0018'=>'COBRO',			
		'0019'=>'APERTURA',
		'0020'=>'CAJA',
		'0021'=>'GASTO'
	);
	var $lisDocByOpe = Array(
		'0001' => Array('0017','0021','0022','0023','0019'),
		'0002' => Array('0001','0002','0003'),
		'0003' => Array('0005','0006','0007'),
		'0004' => Array('0005'),
		'0005' => Array('0009','0016'),
		'0006' => Array('0010'),
		'0007' => Array('0005','0007'),
		'0008' => Array('0006','0018'),
		'0009' => Array('0011'),
		'0010' => Array('0014','0012'),
		'0011' => Array('0001','0002','0003','0004','0017','0019'),
		'0012' => Array('0013','0015','0020'),
		'0016' => Array('0013'),//Documentos de TRANSFERENCIA
		'0017' => Array('0029'),//Documentos de PAGO
		'0018' => Array('0029')//Documentos de COBRO					
	);
	var $tipCaBa = Array(
		'0001' => 'CAJA',
		'0002' => 'BANCO',
		'0003' => 'FINANCIERA',
		'0004' => 'TIENDA',
		'0005' => 'ALMACEN',
		'0006' => 'COBRANZA DE CAMPO'
	);
	var $tipCta = Array(
		'0001' => 'AHORRO',
		'0002' => 'CREDITO',
		'0003' => 'CORRIENTE',
		'0004' => 'CCI',
		'0005' => 'DETRACCION',
		'0006' => 'M',
		'0007' => 'S'
	);

	var $forPag = Array('CONTADO', 'CREDITO', 'EFECTIVO');
	
	var $strDia = Array(0=>"DOMINGO",1=>"LUNES",2=>"MARTES",3=>"MIERCOLES",4=>"JUEVES",5=>"VIERNES",6=>"SABADO");
	var $strMes = Array('0'=>"0",'1'=>"ENERO",'2'=>"FEBRERO",'3'=>"MARZO",'4'=>"ABRIL",'5'=>"MAYO",'6'=>"JUNIO",'7'=>"JULIO",'8'=>"AGOSTO",'9'=>"SEPTIEMBRE",'10'=>"OCTUBRE",'11'=>"NOVIEMBRE",'12'=>"DICIEMBRE");
	var $modo = Array('ADMINISTRANDO'=>"ADMINISTRANDO",'VISUALIZANDO'=>"VISUALIZANDO",'AGREGANDO'=>"AGREGANDO",
			'MODIFICANDO'=>"MODIFICANDO",'ELIMINANDO'=>"ELIMINANDO",'BUSCANDO'=>"BUSCANDO",
			'SUSPENDIDO'=>"SUSPENDIDO",'GENERANDO'=>"GENERANDO",'INICIAR_EVENTO'=>"INICIAR EVENTO",
			'FINALIZANDO_EVENTO'=>"FINALIZANDO EVENTO",'EVENTO_EN_ESPERA'=>"EVENTO EN ESPERA");
		
	function fechaActual()
	{
		return date('Y-m-d');
	}

	function obtenerNombreFromUrlJsp($urlJsp)
	{
		$splitPaginaHijo = explode('/', $urlJsp);
		$pagina = "";

		if (count($splitPaginaHijo) > 0)
		{
			$pagina = $splitPaginaHijo[count($splitPaginaHijo) - 1];
			$pagina = str_replace(".php", "", $pagina);

			if (strpos($pagina, "_"))
			{
				$arrayPagina = explode('_', $pagina);
				$pagina = "";

				foreach ($arrayPagina as $iteArrPag)
				{
					$pagina = $pagina . strtoupper(substr($iteArrPag, 0, 1)) . substr($iteArrPag, 1, count($iteArrPag));
				}
			}
			else
			{
				$pagina = strtoupper((substr($pagina, 0, 1))) . substr($pagina, 1, strlen($pagina));
			}
		}
		return "Manejador" . $pagina;
	}

	function obtenerNombrePaginaFromUrlJsp($urlJsp)
	{
		$splitPaginaHijo = explode('/', $urlJsp);
		$pagina = "";

		if (count($splitPaginaHijo) > 0)
		{
			$pagina = $splitPaginaHijo[count($splitPaginaHijo) - 1];
			$pagina = str_replace(".php", "", $pagina);

			if (strpos($pagina, "_"))
			{
				$arrayPagina = explode('_', $pagina);
				$pagina = "";

				foreach ($arrayPagina as $iteArrPag)
				{
					$pagina = $pagina . strtoupper(substr($iteArrPag, 0, 1)) . substr($iteArrPag, 1, count($iteArrPag));
				}
			}
			else
			{
				$pagina = strtoupper((substr($pagina, 0, 1))) . substr($pagina, 1, strlen($pagina));
			}
		}
		return $pagina;
	}
	function cast($destination, $sourceObject)
	{
		if (is_string($destination)) {
			$destination = new $destination();
		}
		$sourceReflection = new ReflectionObject($sourceObject);
		$destinationReflection = new ReflectionObject($destination);
		$sourceProperties = $sourceReflection->getProperties();
		foreach ($sourceProperties as $sourceProperty) {
			$sourceProperty->setAccessible(true);
			$name = $sourceProperty->getName();
			$value = $sourceProperty->getValue($sourceObject);
			if ($destinationReflection->hasProperty($name)) {
				$propDest = $destinationReflection->getProperty($name);
				$propDest->setAccessible(true);
				$propDest->setValue($destination,$value);
			} else {
				$destination->$name = $value;
			}
		}
		return $destination;
	}

	function parsearArchivo($filename) {
		$return = '';
		if ($fp = fopen($filename, 'rb')) {

			while (!feof($fp)) {
				$return .= fread($fp, 1024);
			}
			fclose($fp);
			return $return;
		} else {
			return false;
		}
	}

	function getValor($valor)
	{
		if(isset($valor))
		{
			return $valor;
		}
		else
		{
			return "";
		}
	}
	function set(&$data, $keyBus, $default="")
	{
	  try
	  {
	    
	    $result = $default;
	    foreach ($data as $key=>$value)
	    {
	      if($key == $keyBus)
	      {
	        if(!is_null($value) || !empty($value))
	        {
	          $result = $value;
	        }
	        break;
	      }
	    }
	    $data[$keyBus] = $result;
	    return $data[$keyBus];
	  }
	  catch (Exception $e)
	  {
	    throw $e;
	  }
	}
	function get(&$data, $keyBus, $default="")
	{
		try
		{
			$result = $default;
			$existeKey = false;
			if(isset($data) && is_array($data) && count($data) > 0)
			{
				foreach ($data as $key=>$value)
				{
					if($key == $keyBus)
					{
					  //if(isset($value) || !is_null($value) || !empty($value))
					  if( ( isset($value) && !is_null($value) && $value!=="undefined" && ( ( !empty($value) && strpos($key, "_ky")>-1 ) ||  !strpos($key, "_ky") ) ) || is_bool($value))
					  {
							$result = $value;
							$existeKey = true;
						}
						break;
					}
				}
				if(!$existeKey){
				  $arrKeyBus = explode("_", $keyBus);
				  if(count($arrKeyBus) == 2 && isset($data[$arrKeyBus[0]])){
				    foreach ($data[$arrKeyBus[0]] as $key=>$value)
				    {
				      if($key == $keyBus)
				      {
				        //if( (!is_null($value) && !empty($value) && isset($value) && $value!=null  && $value!="undefined") || is_bool($value) )
				        if( ( isset($value) && !is_null($value) && $value!=="undefined" && ( ( !empty($value) && strpos($key, "_ky")>-1 ) ||  !strpos($key, "_ky") ) ) || is_bool($value))
				        {
				          $result = $value;
				          $existeKey = true;
				        }
				        break;
				      }
				    }
				  }
				}
			}
			return $result;
		}
		catch (Exception $e) 
		{
			throw $e;
		}
	}	
	function exist($data, $keyBus)
	{
		try
		{
			$existeKey = false;
			if(isset($data) && is_array($data) && count($data) > 0)
			{
				foreach ($data as $key=>$value)
				{
					if($key == $keyBus)
					{
					  //if(isset($value) || !is_null($value) || !empty($value))
					  if( ( isset($value) && !is_null($value) && $value!=="undefined" && ( ( !empty($value) && strpos($key, "_ky")>-1 ) ||  !strpos($key, "_ky") ) ) || is_bool($value))
					  {
							$existeKey = true;
						}
						break;
					}
				}
				if(!$existeKey){
				  $arrKeyBus = explode("_", $keyBus);
				  if(count($arrKeyBus) > 0 && isset($data[$arrKeyBus[0]])){
				    foreach ($data[$arrKeyBus[0]] as $key=>$value)
				    {
				      if($key == $keyBus)
				      {
				        //if( (!is_null($value) && !empty($value) && isset($value) && $value!=null  && $value!="undefined") || is_bool($value) )
				        if( ( isset($value) && !is_null($value) && $value!=="undefined" && ( ( !empty($value) && strpos($key, "_ky")>-1 ) ||  !strpos($key, "_ky") ) ) || is_bool($value))
				        {
				          $existeKey = true;
				        }
				        break;
				      }
				    }
				  }
				}
			}
			return $existeKey;
		}
		catch (Exception $e)
		{
			throw $e;
		}
	}
	function esdato($data, $keyBus)
	{
		try
		{
		  $tieneValor = true;
		  
		  if ($this->get($data, $keyBus) == "")
		  {
		    $tieneValor = false;
		  }
		  
		  return $tieneValor;
		}
		catch (Exception $e)
		{
			throw $e;
		}
	}
	function trim($dato)
	{
		return trim(preg_replace('/\t+/', '', $dato));
	}
	function getKeyFromValue($lista, $parValue)
	{
		foreach ($lista as $key=>$value)
		{
		    if($parValue==$value)
			{
				return $key;
			}
		}	
		return $parValue;
	}
	
	function getStringValores($peticion, $clave)
	{
		$paginaValor = '';
		for( $ite=0; $ite < count($peticion); $ite++ )
		{
			if(array_key_exists($clave . $ite, $peticion))
			{
				$paginaValor = $paginaValor . $peticion[$clave . $ite] . ";";
			}
		}
		$paginaValor = substr($paginaValor, 0, strlen($paginaValor) - 1);

		return $paginaValor;

	}

	function getArrayValores($peticion, $clave)
	{
		$aValor = Array();
		$idx = 0;
		for( $ite=0; $ite < count($peticion); $ite++ )
		{
			if(array_key_exists($clave . $ite, $peticion))
			{
				$aValor[$clave . $ite] = $peticion[$clave . $ite];
				$idx;
			}
		}
		return $aValor;
	}

	function getArrayValoresDiv($peticion, $clave, $division)
	{
		$aValor = Array();
		$idx = 0;
		for( $ite=0; $ite < count($peticion); $ite++ )
		{
			if(array_key_exists($clave . $division . $ite, $peticion))
			{
				$aValor[$clave . $division . $ite] = $peticion[$clave . $division . $ite];
				$idx;
			}
		}
		return $aValor;
	}

	function utf8_encode_deep($input)
	{
		if (is_string($input))
		{
			$varRes = utf8_encode($input);
		}
		else if (is_array($input))
		{
			for($ite = 0; $ite < count($input); $ite++)
			{
				$input[$ite] = $this->utf8_encode_deep($input[$ite]);
			}
			$varRes = $input;
		}
		else if (is_object($input))
		{
				
			$varKeys = array_keys(get_object_vars($input));
			$varVals = array_values(get_object_vars($input));

			for($ite = 0; $ite < count($varKeys); $ite++)
			{
				$varKey = $varKeys[$ite];
				$varVal = $varVals[$ite];
				$varVals[$ite] = $this->utf8_encode_deep($varVal);
			}
			$varRes = array_combine($varKeys, $varVals);
		}
		else
		{
			$varRes = $input;
		}
		return $varRes;
	}

	function escribirArchivo($archivo, $texto)
	{
		$contenido = $texto . "\n";

		// Primero vamos a asegurarnos de que el archivo existe y es escribible.
		if (is_writable($archivo)) {

			// En nuestro ejemplo estamos abriendo $nombre_archivo en modo de adiciï¿½n.
			// El puntero al archivo estï¿½ al final del archivo
			// donde irï¿½ $contenido cuando usemos fwrite() sobre ï¿½l.
			if (!$gestor = fopen($archivo, 'a')) {
				echo "No se puede abrir el archivo ($archivo)";
				exit;
			}

			// Escribir $contenido a nuestro archivo abierto.
			if (fwrite($gestor, $contenido) === FALSE) {
				echo "No se puede escribir en el archivo ($archivo)";
				exit;
			}

			// 			echo "ï¿½xito, se escribiï¿½ ($contenido) en el archivo ($archivo)";

			fclose($gestor);

		} else {
			echo "El archivo $archivo no es escribible";
		}
	}

	function crearArchivoSap($archivo)
	{
		$contenido = "\n";

		// Primero vamos a asegurarnos de que el archivo existe y es escribible.
		if (is_writable($archivo))
		{
			unlink($archivo);
			$gestor = fopen($archivo, 'a');
		}
	}

	function utf8encodeall($dat) // -- It returns $dat encoded to UTF8
	{
		if (is_null($dat)) return '';
		if (is_string($dat)) return utf8_encode($dat);
		if (!is_array($dat)) return $dat;
		$ret = array();
		foreach($dat as $i=>$d) $ret[$i] = $this->utf8encodeall($d);
		return $ret;
	}
	/* ....... */

	function utf8decodeall($dat) // -- It returns $dat decoded from UTF8
	{
		if (is_string($dat)) return utf8_decode($dat);
		if (!is_array($dat)) return $dat;
		$ret = array();
		foreach($dat as $i=>$d) $ret[$i] = $this->utf8decodeall($d);
		return $ret;
	}

	function objToArray($data) // -- It returns $dat decoded from UTF8
	{
		if (is_string($data)) return utf8_encode($data);
		if (is_object($data)) return (array)$data;
		if (!is_array($data)) return $data;
		$ret = array();
		foreach($data as $clave=>$valor) $ret[$clave] = $this->objToArray($valor);
		return $ret;
	}

	function fromObjToArray($data) 
	{
	    foreach($data as $objeto) 
	    {
	    	if(count($objeto))
	    	{
	    		$this->fromObjToArray($objeto);	
	    	}
	    	else
	    	{
	    		return (array) $objeto;	
	    	}
	    }
	}
	function fromDecimalToTime($horDec) // -- It returns $dat decoded from UTF8
	{
		$hor=intval($horDec);
		$min=round( ( ( ($hor>0) ? fmod(floatval($horDec),floatval($hor)):$horDec )*60));
		return str_pad($hor, 2, "0", STR_PAD_LEFT).':'.str_pad($min, 2, "0", STR_PAD_LEFT).':00';
	}

	function fromTimeToDecimal($hora) // -- It returns $dat decoded from UTF8
	{
		$hora=date('H:i:s', strtotime($hora));
		$arrHora=explode(':', $hora);
		$hor = ( ( isset($arrHora[0])&&!empty($arrHora[0]) ) ? $arrHora[0] : 0);
		$min = ( ( isset($arrHora[1])&&!empty($arrHora[1]) ) ? $arrHora[1] : 0);
		$seg = ( ( isset($arrHora[2])&&!empty($arrHora[2]) ) ? $arrHora[2] : 0);

		return ($hor + ($min/60) + ($seg/3600));
	}

	function getMonthTwoDate($strFecIni, $strFecFin){

		$fecHor1 = new DateTime(date('Y-m-d',strtotime($strFecIni)));
		$fecHor2 = new DateTime(date('Y-m-d',strtotime($strFecFin)));
		$diff = $fecHor1->diff($fecHor2);

		return (($diff->y * 12)+$diff->m)+2;
	}
	function entreFechas($strFecIni, $strFecFin){
	
		$fecHor1 = new DateTime($strFecIni);
		$fecHor2 = new DateTime($strFecFin);
		$diff = $fecHor1->diff($fecHor2);
	
		return $diff->days;
	}	
	function betweenTwoTimesToString($fecha, $strFecHorIni, $strFecHorFin){    

		$fecAct = date('Y-m-d',strtotime($fecha));
		$fecReg = date('Y-m-d',strtotime('2000-1-1'));

		$fecTmp=date('Y-m-d',strtotime($strFecHorIni));
		$horTmp=date('H:i:s',strtotime($strFecHorIni));
		$fecHorIni = date('Y-m-d H:i:s',strtotime ( '1970-1-1 '.$horTmp ));
		if($fecTmp>$fecReg){
			if($fecTmp>$fecAct){
				$fecHorIni = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( '1970-1-1'.$horTmp )));
			}
		}

		$fecTmp=date('Y-m-d',strtotime($strFecHorFin));
		$horTmp=date('H:i:s',strtotime($strFecHorFin));
		$fecHorFin = date('Y-m-d H:i:s',strtotime ( '1970-1-1 '.$horTmp ));
		if($fecTmp>$fecReg){
			if($fecTmp>$fecAct){
				$fecHorFin = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( '1970-1-1'.$horTmp )));
			}
		}

		$fecHor1 = new DateTime($fecHorIni);
		$fecHor2 = new DateTime($fecHorFin);
		$diff = $fecHor1->diff($fecHor2);

		$par_t = "0";
		$hor=$diff->h;
		$min=$diff->i;
		$seg=$diff->s;
		$totalMinutos = $par_t+$diff->d*24*60+$diff->h*24+$diff->i;
		return $fecAct.' '.$hor.':'.$min.':'.$seg;
	}

	function getTotalHoraDecimal($fechaHoraInicio, $fechaHoraFinal)
	{
		$fecHor1 = new DateTime($fechaHoraInicio);
		$fecHor2 = new DateTime($fechaHoraFinal);
		$diff = $fecHor1->diff($fecHor2);
		
		$par_t = "0";
		$hor=$diff->h;
		$min=$diff->i;
		$seg=$diff->s;
		$totalMinutos = $par_t+$diff->d*24*60+$diff->h*24+$diff->i;
		$durDatetime=$hor.':'.$min.':'.$seg;
		return $this->fromTimeToDecimal($durDatetime);
	}
	
	function betweenTwoTimesToDecimal($fecha, $strFecHorIni, $strFecHorFin){

		$fecReg = date('Y-m-d',strtotime('2000-1-1'));
		$fecAct = date('Y-m-d',strtotime($fecha));

		$fecIniTmp=date('Y-m-d',strtotime($strFecHorIni));
		$horIniTmp=date('H:i:s',strtotime($strFecHorIni));
		$fecHorIni = date('Y-m-d H:i:s',strtotime ( '1970-1-1 '.$horIniTmp ));
		if($fecIniTmp>$fecReg){
			if($fecIniTmp>$fecAct){
				$fecHorIni = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( '1970-1-1'.$horIniTmp )));
			}
		}

		$fecIniTmp=date('Y-m-d',strtotime($strFecHorFin));
		$horIniTmp=date('H:i:s',strtotime($strFecHorFin));
		$fecHorFin = date('Y-m-d H:i:s',strtotime ( '1970-1-1 '.$horIniTmp ));
		if($fecIniTmp>$fecReg){
			if($fecIniTmp>$fecAct){
				$fecHorFin = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( '1970-1-1'.$horIniTmp )));
			}
		}

		$fecHor1 = new DateTime($fecHorIni);
		$fecHor2 = new DateTime($fecHorFin);
		$diff = $fecHor1->diff($fecHor2);

		$par_t = "0";
		$hor=$diff->h;
		$min=$diff->i;
		$seg=$diff->s;
		$totalMinutos = $par_t+$diff->d*24*60+$diff->h*24+$diff->i;
		$durDatetime=$fecAct.' '.$hor.':'.$min.':'.$seg;
		return $this->fromTimeToDecimal($durDatetime);
	}

	function agregarDias($fhor, $numDias){
		// 		$horIniTmp=date('Y-m-d',strtotime($fhor));
		// 		$horTmp=date('H:i:s',strtotime($fhor));
		// 		$fecHorFin = date('Y-m-d H:i:s',strtotime ( '1970-1-1 '.$horTmp ));
		$fecHorFin = date('Y-m-d H:i:s',strtotime ( '+'.$numDias.' day' , strtotime ( $fhor )));
		return $fecHorFin;
	}

	function agregarDiasTimestamp($fecAct, $fechaHora, $numDias){
	
		$fec = date('Y-m-d',strtotime ($fechaHora));
		$hor = date('H:i:s',strtotime ($fechaHora)); 
		$fechaHora = date('Y-m-d H:i:s',strtotime($fecAct.' '.$hor));
		$fechaTemp = date('Y-m-d H:i:s',strtotime ( '+'.$numDias.' day' , strtotime ($fechaHora)));
		$fechaHora = $fechaTemp;
		return $fechaHora;
	}
	
	function restarDias($fhor, $numDias){
		// 		$fecTmp=date('Y-m-d',strtotime($fhor));
		// 		$horTmp=date('H:i:s',strtotime($fhor));
		// 		$fecHorFin = date('Y-m-d H:i:s',strtotime ( '1970-1-1 '.$horTmp ));
		$fecHorFin = date('Y-m-d H:i:s',strtotime ( '-'.$numDias.' day' , strtotime ( $fhor )));
		return $fecHorFin;
	}
	function getDatetimeFromFecha($fecha, $strFecHor){

		$fecAct = date('Y-m-d',strtotime($fecha));
		$fecReg = date('Y-m-d',strtotime('2000-1-1'));
		$fecPos = date('Y-m-d',strtotime('1970-1-2'));

		$fecTmp=date('Y-m-d',strtotime($strFecHor));
		$horTmp=date('H:i:s',strtotime($strFecHor));
		$fecHor = date('Y-m-d H:i:s', strtotime ( $fecAct.' '.$horTmp ));
		if($fecTmp<$fecReg){
			if($fecTmp==$fecPos){
				$fecHor = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( $fecAct.' '.$horTmp )));
			}
		}
		return $fecHor;
	}
	function existeEnRango($fecha, $hora, $strFecHorIni, $strFecHorFin){
		$result=false;
		$fecAct = date('Y-m-d',strtotime($fecha));
		$fecReg = date('Y-m-d',strtotime($hora));
		$horReg = date('H:i:s',strtotime($hora));
		$fecHorReg = date('Y-m-d H:i:s',strtotime('1970-1-1 '.$horReg));

		$fecHorIni=date('Y-m-d H:i:s', strtotime($strFecHorIni));
		$fecHorFin=date('Y-m-d H:i:s', strtotime($strFecHorFin));

		if($fecReg>$fecAct){
			$fecHorReg = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( $fecHorReg )));
		}

		if( ( $fecHorReg>=$fecHorIni && $fecHorReg<=$fecHorFin ) ){
			$result=true;
		}
		return $result;
	}

	function existeHoraEnRango($fecHorReg, $horaInicio, $horaFin)
	{
		$respuesta = false;
		if($fecHorReg >= $horaInicio && $fecHorReg <= $horaFin){$respuesta = true;}
		return $respuesta;
	}
	
	function existeHoraEnRangoIngSal($fecHorRegIng, $fecHorRegSal, $horaInicio, $horaFin)
	{
		$respuesta = false;	
		$fecHorTemp = date('Y-m-d H:i:s');
	
		if($fecHorTemp==$fecHorRegSal)
		{//INGRESO
			$fecHorRegIngTmp = date('Y-m-d H:i:s');
			$fecHorRegIngTmp = date('Y-m-d H:i:s',strtotime('1970-1-1 '.date('H:i:s',strtotime($fecHorRegIng))));
			if($fecHorRegIngTmp >= $horaInicio && $fecHorRegIngTmp <= $horaFin){$respuesta = true;}
		}
		else{//SALIDA
			$fecRegIng = date('Y:m:d', strtotime($fecHorRegIng));
			$fecRegSal = date('Y:m:d', strtotime($fecHorRegSal));
			$fecHorRegSalTmp = date('Y-m-d H:i:s',strtotime('1970-1-1 '.date('H:i:s',strtotime($fecHorRegSal))));
			
 			if($fecRegSal > $fecRegIng){$fecHorRegSalTmp=$this->agregarDias($fecHorRegSalTmp, 1);}
			if($fecHorRegSalTmp >= $horaInicio && $fecHorRegSalTmp <= $horaFin){$respuesta = true;}
		}
	
		return $respuesta;
	}
	
	function menorHoraInicio($fecHorRegIng, $fecHorRegSal, $horaInicio)
	{
		$respuesta = false;
		$fecHorTemp = date('Y-m-d H:i:s');
	
		if($fecHorTemp==$fecHorRegSal){//INGRESO
			$fecHorRegIngTmp = date('Y-m-d H:i:s', strtotime('1970-1-1 '.date('H:i:s',strtotime($fecHorRegIng))));
			if($fecHorRegIngTmp < $horaInicio){$respuesta = true;}
		}
		return $respuesta;
	}
	
	function menorFechahora($fecha, $hora, $strFecHor){
		$result=false;
		$fecAct = date('Y-m-d',strtotime($fecha));
		$fecReg = date('Y-m-d',strtotime($hora));
		$horReg = date('H:i:s',strtotime($hora));
		$fecHorReg = date('Y-m-d H:i:s',strtotime('1970-1-1 '.$horReg));

		$fecHor=date('Y-m-d H:i:s', strtotime($strFecHor));

		if($fecReg>$fecAct){
			$fecHorReg = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( $fecHorReg )));
		}

		if( ( $fecHorReg<$fecHor) ){
			$result=true;
		}
		return $result;
	}

	function mayorFechahora($fecha, $hora, $strFecHor){
		$result=false;
		$fecAct = date('Y-m-d',strtotime($fecha));
		$fecReg = date('Y-m-d',strtotime($hora));
		$horReg = date('H:i:s',strtotime($hora));
		$fecHorReg = date('Y-m-d H:i:s',strtotime('1970-1-1 '.$horReg));

		$fecHor=date('Y-m-d H:i:s', strtotime($strFecHor));

		if($fecReg>$fecAct){
			$fecHorReg = date('Y-m-d H:i:s',strtotime ( '+1 day' , strtotime ( $fecHorReg )));
		}

		if( ( $fecHorReg>$fecHor) ){
			$result=true;
		}
		return $result;
	}

	function fromDatetimeToSecond($strDatetime){
		//echo 'Hora : '.$strDatetime;
		$hor=date("H",strtotime($strDatetime))*60*60;
		$min=date("i",strtotime($strDatetime))*60;
		$seg=date("s",strtotime($strDatetime));
		$par_t = "0";
		//$totalMinutos = $par_t+$diff->d*24*60+$diff->h*24+$diff->i;
		return $hor+$min+$seg;
	}

	function formatMilliseconds($milliseconds) {
		$seconds = floor($milliseconds / 1000);
		$minutes = floor($seconds / 60);
		$hours = floor($minutes / 60);
		$milliseconds = $milliseconds % 1000;
		$seconds = $seconds % 60;
		$minutes = $minutes % 60;

		$format = '%u:%02u:%02u.%03u';
		$time = sprintf($format, $hours, $minutes, $seconds, $milliseconds);
		return rtrim($time, '0');
	}

	function getDiasDelMes($mes, $ano){
		switch($mes){
			case 1:  // Enero
			case 3:  // Marzo
			case 5:  // Mayo
			case 7:  // Julio
			case 8:  // Agosto
			case 10: // Octubre
			case 12: // Diciembre
				return 31;
			case 4:  // Abril
			case 6:  // Junio
			case 9:  // Septiembre
			case 11: // Noviembre
				return 30;
			case 2:  // Febrero


				if ( ( (fmod($ano,100) == 0) && (fmod($ano,400) == 0) ) || ( (fmod($ano,100) != 0) && (fmod($ano,4) == 0) ) )
					return 29;  // Año Bisiesto
				else
					return 28;
			default:
				throw $e;
		}
		return 0;
	}

	function getUltimoDiaMes($ano,$mes) {
		return date("d",(mktime(0,0,0,$mes+1,1,$ano)-1));
	}
	public function stringToDate($date, $frmIni = 'Y-m-d', $frmDes = 'Y-m-d')
	{
		return DateTime::createFromFormat($frmIni, $date)->format($frmDes);
	}	
	public function getKey(){
		$timeparts = explode(" ",microtime());
		return bcadd(($timeparts[0]*1000),bcmul($timeparts[1],1000));
	}
	function validarFechaCliente($datoCampo, $FormCampo)
	{
		$tmpDatoCampo = substr($datoCampo, 0, 10);
		$divFormCampo = ( (strpos($FormCampo, "/") >- 1) ? "/" : ( (strpos($FormCampo, "-") >- 1) ? '-' : '' ) ); 
		$arrDatoCampo = explode($divFormCampo, $tmpDatoCampo);
		$arrFormCampo = explode($divFormCampo, $FormCampo);
		$idxDia = -1;
		$idxMes = -1;
		$idxAno = -1;

		$arrFrmFecHor = Array();
		foreach ($arrFormCampo as $clave => $valor)
		{
		    if(strtoupper($valor)=="DD"){  $idxDia=$clave; array_push($arrFrmFecHor, "d");}
		    if(strtoupper($valor)=="MM"){  $idxMes=$clave; array_push($arrFrmFecHor, "m");}
		    if(strtoupper($valor)=="YYYY"){$idxAno=$clave; array_push($arrFrmFecHor, "Y");}
		}
		if(count($arrDatoCampo) == 3 && intval($arrDatoCampo[$idxDia]) && intval($arrDatoCampo[$idxMes]) && intval($arrDatoCampo[$idxAno]) && checkdate($arrDatoCampo[$idxMes], $arrDatoCampo[$idxDia], $arrDatoCampo[$idxAno]))
		{
		    $arrFechaHora = explode(" ", $datoCampo);
			if(count($arrFechaHora) > 1) 
			{
			    $valHora = "";
			    $arrHora = explode(":", $arrFechaHora[1]);
			    
			    if(count($arrHora)==1){$valHora = $arrHora[0].":00:00";}
			    if(count($arrHora)==2){$valHora = $arrHora[0].":".$arrHora[1].":00";}
			    if(count($arrHora)==3){$valHora = $arrHora[0].":".$arrHora[1].":".$arrHora[2];}
			    
			    $resDatoCampo = $arrDatoCampo[$idxAno]."-".$arrDatoCampo[$idxMes]."-".$arrDatoCampo[$idxDia]." ".$valHora;				
			}
			else 
			{
			    $resDatoCampo = $arrDatoCampo[$idxAno]."-".$arrDatoCampo[$idxMes]."-".$arrDatoCampo[$idxDia];
			}
			return $resDatoCampo;
		}
		return $datoCampo;
	}
	function mysql_charspecial($inp) {
		if(is_array($inp))
			return array_map(__METHOD__, $inp);
	
		if(!empty($inp) && is_string($inp)) {
			return str_replace(array('\\', "\0", "\n", "\r", "'", '"', "\x1a"), array('\\\\', '\\0', '\\n', '\\r', "\\'", '\\"', '\\Z'), $inp);
		}
	
		return $inp;
	}
	function getPathExterna($data)
	{
		$result = null;
		$existe = false;
		try
		{
			$modulo  = ( isset($data['modulo']) ? $data['modulo'] :"sn");
			$mainEmp = ((isset($data['mainEmp']) && !empty($data['mainEmp']))?$data['mainEmp']:"sn");			
			$dbapp   = ( (isset($data['dbapp'])) ? $data['dbapp'] : "sn" );
			if($modulo == "ayuda")
			{
				$file = (isset($data['archivo'])) ? ( strpos($data['archivo'], ".") ? $data['archivo'] : $data['archivo'].".php" ) : "sn";
			}
			else
			{
				$file = (isset($data['archivo']) && !empty($data['archivo'])) ? $data['archivo'] : "sn";
			}
			
			$ruta = URLFTP."gestion/sisprom/".$dbapp."/".$modulo."/".$mainEmp."/";
			$rutaArchivo = URLFTP."gestion/sisprom/".$dbapp."/".$modulo."/".$mainEmp."/".$file;

			if (file_exists($rutaArchivo))
			{
				$existe = true;
			}
			else 
			{
				$ruta = URLFTP."gestion/sisprom/".$dbapp."/".$modulo."/";
				$rutaArchivo = URLFTP."gestion/sisprom/".$dbapp."/".$modulo."/".$file;
				if (file_exists($rutaArchivo))
				{
					$existe = true;
				}
				else if($modulo == "ayuda")
				{
					$lisDir = $this->obtenerListaDeArchivos("gestion/sisprom", true, "Directorio");
					
					foreach ($lisDir as $key=>$val)
					{
						if($val['tipo']=="Directorio")
						{
							$ruta = $val['url'];
							$rutaArchivo = $val['url'].$file;
							if (file_exists($rutaArchivo))
							{
								$existe = true;
								break;
							}
						}
					}//foreach ($lisDir as $key=>$val)
				}//if($modulo == "ayuda")
			}
			$data['rutaArchivo']=$rutaArchivo;
			$data['ruta']=$ruta;
			if($existe)
			{
				$data['msg'] = array("type"=>"success","text"=>"Archivo ".$data['rutaArchivo']." encontrado!!!");
			}
			else
			{
			  $data['msg'] = array("type"=>"error","text"=>"No existe ".$data['rutaArchivo']);
			  $data['rutaArchivo'] = URLFTP."gestion/sisprom/cmn/imagen/pregunta.png";
			}
			$result=$data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}	
	function getPath($data)
	{
		$result = null;
		$existe = true;
		try
		{
			$modulo  = ((isset($data['modulo']) && !empty($data['modulo']))?((strpos($data['archivo'],"_pdf"))?"views":((strpos($data['archivo'],"_xls"))?"report":$data['modulo'])):"sn");
			$mainEmp = ((isset($data['mainEmp']) && !empty($data['mainEmp']))?$data['mainEmp']:"sn");
			$dbapp   = ( (isset($data['dbapp'])) ? $data['dbapp'] : "sn" );
			
			if($modulo == "scripts" || $modulo == "browse")
			{
				$file = ( (isset($data['archivo'])) ? ( strpos($data['archivo'], ".") ? $data['archivo'] : $data['archivo'].".js" ) : "sn" );
			}
			else if($modulo == "fotmatos")
			{
				$file = ( (isset($data['archivo'])) ? ( strpos($data['archivo'], ".") ? $data['archivo'] : $data['archivo'].".xls" ) : "sn" );
			} 
			else
			{
				$file = ( (isset($data['archivo'])) ? ( strpos($data['archivo'], ".") ? $data['archivo'] : $data['archivo'].".php" ) : "sn" );
			}
			$ruta = APPPATH."com/".$dbapp."/".$modulo."/".$mainEmp."/";
			$rutaArchivo = APPPATH."com/".$dbapp."/".$modulo."/".$mainEmp."/".$file;
			
			if (!file_exists($rutaArchivo))
			{
				$ruta = APPPATH."com/".$dbapp."/".$modulo."/";
				$rutaArchivo = APPPATH."com/".$dbapp."/".$modulo."/".$file;
				
				if (!file_exists($rutaArchivo))
				{
					$existe = false;
				}
			}
			if($existe)
			{
				if($modulo=="views"||$modulo=="controllers"||$modulo=="browse"||$modulo=="imagen"||$modulo=="formatos"||$modulo=="report"||$modulo=="scripts"||$modulo=="uploads"){$data['rutaArchivo'] = $rutaArchivo; $data['ruta'] = $ruta;}
				else{$data['rutaArchivo'] = $dbapp."/".$modulo."/".$file; $data['ruta'] = $dbapp."/".$modulo;}
				$data['msg'] = array("type"=>"success","text"=>"Archivo ".$data['rutaArchivo']." encontrado!!!");
			}
			else
			{
				$data['rutaArchivo']=$rutaArchivo;
				$data['ruta']=$ruta;
				$data['msg'] = array("type"=>"error","text"=>"Archivo no existe alternativo ".$data['rutaArchivo']);
			}
			$result=$data;
		} catch (Exception $e) {
			throw $e;
		}
		return $result;
	}
	/**
	 * Tipo de columnas
	 * O : Columna OPCIONAL Este dato puede ir vacio
	 * U : Columna UNICA el dato de esta columna no debe repetirse en ninguna de las otras filas
	 * R : Columna REQUERIDA el dato de esta columna debe existir
	 * @param array con los datos que se le va a retornar despues de validado $data
	 * @param Retorna un array con todo validado $return
	 * @return Ambigus<number, boolean>|multitype:string Exception
	 */
	public function validarExcel($data=Array(), $return=false)
	{
		$result = null;
		try
		{
			$data["msg"]=array("type"=>"success","text"=>"Inicio operacion!!!");
			$data['exito']=true;
			$rowIni = $data['rowIni'];
			$numCol = 0;
			$highestRow = $data['highestRow'];
			$worksheet = $data['worksheet'];
			//$lisBrwCol = $data['lisBrwCol'];
			$lisBrwCol = Array();
			$lisBrwCol[$numCol]=Array("size"=>"", "esta"=>"", "nomb"=>"", "alia"=>"", "tipo"=>"",
			"ssiz"=>"",
			"sest"=>"",
			"stip"=>"",
			"snom"=>"",
			"sali"=>"");
			$numCol++;
			for($col = 1; $col <= 100; $col++)
			{
				$colSiz = trim($worksheet->getCellByColumnAndRow($col, $rowIni-5)->getValue());
				$colEst = trim($worksheet->getCellByColumnAndRow($col, $rowIni-4)->getValue());
				$colTip = trim($worksheet->getCellByColumnAndRow($col, $rowIni-3)->getValue());
				$colNom = trim($worksheet->getCellByColumnAndRow($col, $rowIni-2)->getValue());
				$colAli = trim($worksheet->getCellByColumnAndRow($col, $rowIni-1)->getValue());
				if(!empty($colNom) && !empty($colAli))
				{
					$lisBrwCol[$numCol]=Array("size"=>$colSiz, "esta"=>$colEst, "nomb"=>$colNom, "alia"=>$colAli, "tipo"=>$colTip,
					"ssiz"=>"{width: ".$colSiz."}",
					"sest"=>"{value: '".$colEst."', metadata: {style: headerStyle.id}}",
					"stip"=>"{value: '".$colTip."', metadata: {style: headerStyle.id}}",
					"snom"=>"{value: '".$colNom."', metadata: {style: headerStyle.id}}",
					"sali"=>"{value: '".$colAli."', metadata: {style: headerStyle.id}}");
					$numCol++;
				}
				else{break;}
			}
			for ($row = $rowIni; $row <= $highestRow; $row++)
			{
				$iteObl=0;
				$iteVac=0;
				for($col = 1; $col <= $numCol; $col++)
				{
					$value = trim($worksheet->getCellByColumnAndRow($col, $row)->getValue());
					$value = ((strpos($value,"=")==false)?trim($worksheet->getCellByColumnAndRow($col, $row)->getCalculatedValue()):$value);
					$iteVac = (empty($value)?$iteVac+1:$iteVac);
					if($iteVac==$numCol)
					{
						$highestRow=$row-1;
						break 2;
					}
				}
			}
			
			$arrValUni = Array();
			$arrValUni[0] = Array();
			for ($row = $rowIni; $row <= $highestRow; $row++)
			{
				for($col = 1; $col < $numCol; $col++)
				{
					$value = trim($worksheet->getCellByColumnAndRow($col, $row)->getValue());
					$value = ((strpos($value,"=")==false)?trim($worksheet->getCellByColumnAndRow($col, $row)->getCalculatedValue()):$value);
					
					if(isset($lisBrwCol[$col]['esta']) && $lisBrwCol[$col]['esta']=="R")
					{
						if(empty($value))
						{
							$data["msg"]=array("type"=>"error","text"=>"Valor requerido fila: ".$row." columna: ".$col);
							$data['exito']=false;
							break 2;
						}
					}
					if(isset($lisBrwCol[$col]['esta']) && $lisBrwCol[$col]['esta']=="U")
					{
						$idx = (($row > $rowIni) ? array_search($value,$arrValUni[$col],true) : -1);
						if($idx > -1)
						{
							$data["msg"]=array("type"=>"error","text"=>"Valor fila: ".$row." columna: ".$col." se repite en fila: ".$idx." columna: ".$col);
							$data['exito']=false;
							break 2;
						}
						else{$arrValUni[$col][$row] = $value;}
					}//if(isset($lisBrwCol[$col]['esta']) && $lisBrwCol[$col]['esta']=="U")
					if(!isset($arrValUni[$col])){$arrValUni[$col]=Array();}
				}//for($col = 1; $col < 24; $col++)
			}//for ($row = 6; $row <= $highestRow; $row++)
			
			$data['numCol']=$numCol;
			$data['lisBrwCol']=$lisBrwCol;
			$data['highestRow']=$highestRow;
			$result=$data;
			if($return){return $result;}
			else{echo json_encode($result);}
		} 
		catch (Exception $e) 
		{
			$result["msg"]=array("type"=>"error","text"=>$e);
			return $result;
		}
	}
	function verificarValorUnico($array, $valor)
	{
		foreach ($array as $key=>$value)
		{
			if(empty($value))
			{
				$data["msg"]=array("type"=>"error","text"=>"Campo requerido esta vacio fila: ".$row." columna: ".$col);
				$data['exito']=false;
				break 1;
			}
		}//foreach ($arrValUni as $key=>$value)
	}
	function multiArrayUnique($array, $lisBrw){
		$arrTmp = Array();
		if(count($array)>0)
		{
			foreach($array as $iteArr)
			{
				
				$arrSer = Array();
				for($col = 0; $col < count($lisBrw); $col++)
				{
					if(isset($lisBrw[$col]['esta']) && $lisBrw[$col]['esta']=="U")
					{
						//print_r($lisBrw);
						//print_r($iteArr);
						//die();
						if(isset($iteArr[$lisBrw[$col]['nomb']])){
							array_push($arrSer, $iteArr[$lisBrw[$col]['nomb']]);
						}
					}
				}
				$arrSer = serialize($arrSer);
				$existe = false;
				if(count($arrTmp)>0)
				{
					foreach($arrTmp as $iteArrTmp)
					{
						$arrSerTmp = Array();
						for($col = 0; $col < count($lisBrw); $col++)
						{
							if(isset($lisBrw[$col]['esta']) && $lisBrw[$col]['esta']=="U")
							{
								if(isset($iteArrTmp[$lisBrw[$col]['nomb']])){
									array_push($arrSerTmp, $iteArrTmp[$lisBrw[$col]['nomb']]);
								}
							}
						}
						$arrSerTmp = serialize($arrSerTmp);
						
						if($arrSer == $arrSerTmp){$existe=true;break 1;}
					}
				}//if(count($arrTmp)>0)
				if(!$existe){array_push($arrTmp, $iteArr);}
			}
		}//if(count($array)>0)
		return $arrTmp;
	}
	function verificarSessionCookie() 
	{
		if (isset($_COOKIE["ci_session"])) {
			$data = $_COOKIE["ci_session"];
			$serialized_data = serialize($data);
			$size = strlen($serialized_data);
			echo 'Length : ' . strlen($data)."<br/>";
			echo 'Size : ' . round(($size * 8 / 1024),2) . ' Kb'."<br/>";
		}
		$rawCookies = isset($_SERVER['HTTP_COOKIE']) ? $_SERVER['HTTP_COOKIE'] : null;
		$rawLength  = strlen($rawCookies);
		echo $rawLength."<br/>";
		echo  print_r('"<script>console.log('.json_encode($this->session->all_userdata()).')</script>');
	}
	public function redimensionarImagen($archivoOrigen, $archivoDestino, $anchoPanel, $altoPanel, $margen=0)
	{
		$fileHandle = @fopen($archivoOrigen, 'r');
		if(!$fileHandle) {return false;}
		//$imagenOrigen = imagecreatefromstring(stream_get_contents($archivoOrigen));
		switch(strtolower(pathinfo($archivoOrigen, PATHINFO_EXTENSION))) {
			case 'jpg':
			case 'jpeg':
				$imagenOrigen = imagecreatefromjpeg($archivoOrigen);
				break;
			case 'png':
				$imagenOrigen = imagecreatefrompng($archivoOrigen);
				break;
			case 'gif':
				$imagenOrigen = imagecreatefromgif($archivoOrigen);
				break;
		}
		fclose($fileHandle);
		if(!$imagenOrigen) {return false;}
		list($anchoImgOri, $altoImgOri) = array(imagesx($imagenOrigen), imagesy($imagenOrigen));

		/** ******************************************************************
         * REDIMENSIONAR LAS DIMENSIONES DE LA IMAGEN PARA AJUSTAR A UN PANEL
		 *********************************************************************/
		$anchoRedim = $anchoImgOri;
		$altoRedim = $altoImgOri;

		if($anchoImgOri >= $altoImgOri)
		{
		  $prcImg = ($altoImgOri * 100.00) / $anchoImgOri;
		  $anchoRedim = $anchoPanel - $margen;
		  $altoRedim = $anchoRedim * ($prcImg / 100.00);
		}
		else
		{
		  $prcImg = ($anchoImgOri * 100.00) / $altoImgOri;
		  $altoRedim = $altoPanel - $margen;
		  $anchoRedim = $altoRedim * ($prcImg / 100.00);
		}
		
		$coordX = 0;
		$coordY = (int) ($altoPanel - $altoRedim) / 2;

		$imagenRedimensionada = imagecreatetruecolor($anchoRedim, $altoRedim);
		imagecopyresampled($imagenRedimensionada, $imagenOrigen, 0, 0, 0, 0, $anchoRedim, $altoRedim, $anchoImgOri, $altoImgOri);
		switch(strtolower(pathinfo($archivoOrigen, PATHINFO_EXTENSION))) {
			case 'gif':
			case 'jpg':
			case 'jpeg':
				imagefill($imagenRedimensionada, 0, 0, imagecolorallocate($imagenRedimensionada, 255, 0, 0));

				$panelDestino = imagecreatetruecolor($anchoPanel, $altoPanel);
				imagefill($panelDestino, 0, 0, imagecolorallocate($panelDestino, 255, 255, 255));
				break;
			case 'png':
				imagealphablending($imagenRedimensionada, true);
				imagesavealpha($imagenRedimensionada, true);
				imagefill($imagenRedimensionada, 0, 0, imagecolorallocatealpha($imagenRedimensionada, 255, 0, 0, 127));

				$panelDestino = imagecreatetruecolor($anchoPanel, $altoPanel);
				imagealphablending($panelDestino, true);
				imagesavealpha($panelDestino, true);
				imagefill($panelDestino, 0, 0, imagecolorallocatealpha($panelDestino, 255, 255, 255, 127));
				break;
		}

		$margenIzquierdo = ($anchoPanel - $anchoRedim) / 2;
		$margenSuperior = ($altoPanel - $altoRedim) / 2;

		imagecopy($panelDestino, $imagenRedimensionada, $margenIzquierdo, $margenSuperior, 0, 0, $anchoRedim, $altoRedim);

		if (file_exists($archivoDestino)) {unlink($archivoDestino);}

		//GESTIONAR DIFERENTES TIPOS DE IMAGENES
		//imagepng() uses quality 0-9
		switch(strtolower(pathinfo($archivoOrigen, PATHINFO_EXTENSION))) {
			case 'jpg':
			case 'jpeg':
				imagejpeg($panelDestino, $archivoDestino, 95);
				break;
			case 'png':
				imagepng($panelDestino, $archivoDestino, 8.5);
				break;
			case 'gif':
				imagegif($panelDestino, $archivoDestino);
				break;
		}
		//DESTRUIR IMAGENES TEMPORALES
		array_map('unlink', glob($archivoOrigen));
		imagedestroy($panelDestino);
		imagedestroy($imagenOrigen);
	}
	public function mostrarMenu()
	{
		echo "<ul style='width: 600px;'>";
		$this->listaMenuAyuda($this->listaMenu, "");
		echo "</ul>";
	}
	public function listaMenuAyuda($listaMenu, $espacio)
	{
		foreach ($listaMenu as $clave => $valor)
		{
			$arrMenu = array_keys($valor['lm']);
			if( !empty($arrMenu[0]))
			{
				echo $espacio.'    <li>';
				echo $espacio.'        <a name="aPolitica" href="javascript:void(0);" pol_kypol="'.$listaMenu[$clave]['ky'].'" pol_link="'.$listaMenu[$clave]['lk'].'" pol_hijo="" pol_tipo="MENU" pol_dscr="'.$listaMenu[$clave]['ds'].'" title="'.$listaMenu[$clave]['lk'].'">'.$listaMenu[$clave]['ds'].'</a>';
				echo $espacio.'        <ul>';
				$this->listaMenuAyuda($listaMenu[$clave]['lm'], $espacio."        ");
				echo $espacio.'        </ul>';
				echo $espacio.'    </li>';
			}
			else
			{
				echo $espacio.'    <li><a name="aPolitica" href="javascript:void(0);" pol_kypol="'.$listaMenu[$clave]['ky'].'" pol_link="'.$listaMenu[$clave]['lk'].'" pol_hijo="" pol_tipo="MENU" pol_dscr="'.$listaMenu[$clave]['ds'].'" title="'.$listaMenu[$clave]['lk'].'">'.$listaMenu[$clave]['ds'].'</a></li>';
			}
		}
	}
	function ftp_esDirectorio($conn_id,$dir)
	{
		if(@ftp_chdir($conn_id,$dir)) {
			ftp_cdup($conn_id);
			return true;
		} else {
			return false;
		}
	}	
	public function obtenerListaDeArchivos($directorio, $recursivo=false, $tipo="Todo"){
	
		// Array en el que obtendremos los resultados
		$res = array();
	
		// Agregamos la barra invertida al final en caso de que no exista
		if(substr($directorio, -1) != "/") $directorio .= "/";
		
		if( strpos(URLFTP, "ftp") > -1 )
		{
			$test=URLFTP;
			$ftp_conn = ftp_connect(URLFTP) or die("Could not connect to $ftp_server");
			$login_result = ftp_login($ftp_conn, USRFTP, PSSFTP);
			$dir = ftp_nlist($ftp_conn, "public_html/".$directorio);
			
			foreach ($dir as $key => $archivo)
			{
				if($archivo == "." || $archivo == "..") continue;
				$dirtmp = ftp_nlist($ftp_conn, "public_html/".$directorio.$archivo);
				if( $this->ftp_esDirectorio($ftp_conn, "public_html/".$directorio.$archivo) )
				{
				    if( $tipo=="Directorio" || $tipo=="Todo"  && $archivo == "ayuda" )
					{
						$res[] = array(
								"tipo" => "Directorio",
								"archivo" => "",
								"titulo" => "",
								"url" => URLFTP.$directorio . $archivo . "/",
								"tamano" => 0,
								"modificado" => ""
						);
					}//if( $tipo=="Directorio" || $tipo=="Todo" )
						
					$directorioInterior= $directorio.$archivo."/";
					$res = array_merge($res, $this->obtenerListaDeArchivos($directorioInterior, true, $tipo));
				}
				else
				{
					if ( ( $tipo=="Archivo" || $tipo=="Todo" ) && !strpos($archivo, ".png") && !strpos($archivo, ".jpg") && !strpos($archivo, ".gif") )
					{
						$res[] = array(
								"tipo" => "Archivo",
								"archivo" => $archivo,
								"titulo" => "",
								"url" => URLFTP.$directorio . $archivo,
								"tamano" => 0,
								"modificado" => "",
								"lineaTexto" => ""
						);
					}//if ( $tipo=="Archivo" || $tipo=="Todo" )
				}
			}
		}
		else
		{
			$dir = @dir(URLFTP.$directorio) or die("getFileList: Error abriendo el directorio $directorio para leerlo");
			
			while(($archivo = $dir->read()) !== false) {
				// Obviamos los archivos ocultos
				if($archivo[0] == ".") continue;
				if( is_dir(URLFTP.$directorio . $archivo) )
				{
				    if( ( $tipo=="Directorio" || $tipo=="Todo" )  && $archivo == "ayuda")
					{
						$res[] = array(
								"tipo" => "Directorio",
								"archivo" => "",
								"titulo" => "",
								"url" => URLFTP.$directorio . $archivo . "/",
								"tamano" => 0,
								"modificado" => filemtime(URLFTP.$directorio . $archivo)
						);
					}//if( $tipo=="Directorio" || $tipo=="Todo" )
					if($recursivo && is_readable(URLFTP.$directorio . $archivo . "/")) {
						$directorioInterior= $directorio . $archivo . "/";
						$res = array_merge($res, $this->obtenerListaDeArchivos($directorioInterior, true, $tipo));
					}
				}
				else if ( !is_dir(URLFTP.$directorio . $archivo) && is_readable(URLFTP.$directorio . $archivo) && strpos(URLFTP.$directorio, "ayuda") > -1 )
				{
					if ( ( $tipo=="Archivo" || $tipo=="Todo" ) && !strpos($archivo, ".png") && !strpos($archivo, ".jpg") && !strpos($archivo, ".gif") )
					{
						$res[] = array(
								"tipo" => "Archivo",
								"archivo" => $archivo,
								"titulo" => "",
								"url" => URLFTP.$directorio . $archivo,
								"tamano" => filesize(URLFTP.$directorio . $archivo),
								"modificado" => filemtime(URLFTP.$directorio . $archivo),
								"lineaTexto" => ""
						);
					}//if ( $tipo=="Archivo" || $tipo=="Todo" )
				}
			}
			$dir->close();			
		}

		return $res;
	}
	public function limpiarLinea($lineaTexto)
	{
		$resultado = "";
		$lineaTexto = rtrim(ltrim($lineaTexto));
		$posTxtIni = 0;
		$posTxtFin = 0;
		$buscaTexto = false;
		
		for($iteIni=0;$iteIni<strlen($lineaTexto);$iteIni++)
		{
			$caracter = substr($lineaTexto, $iteIni, 1);
			if($caracter=="<")
			{
				for($iteFin=$iteIni+1;$iteFin<strlen($lineaTexto);$iteFin++)
				{
					$caracter = substr($lineaTexto, $iteFin, 1);
					if($caracter==">")
					{
						$txtReemplazo = substr($lineaTexto, $iteIni, $iteFin-$iteIni+1);
						$lineaTexto = str_replace($txtReemplazo, " ", $lineaTexto);
						$lineaTexto = str_replace("&nbsp;", " ", $lineaTexto);
						$lineaTexto = rtrim(ltrim($lineaTexto));
						$iteIni = -1;
						break;
					}//if($caracter==">")
				}//for($iteFin=$iteIni+1;$iteFin<strlen($lineaTexto);$iteFin++)
			}//if($caracter=="<")
		}//for($iteIni=0;$iteIni<strlen($lineaTexto);$iteIni++)
		$resultado = $lineaTexto;
		return $resultado;
	}
    public function sendPost($data)
    {
		$payload = json_encode($data);

		// Prepare new cURL resource
		$ch = curl_init('http://localhost:9090/cmn/control/ejecutar');
// 		$ch = curl_init('https://sisemwebapi.herokuapp.com/cmn/control/ejecutar');
		
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLINFO_HEADER_OUT, true);
		curl_setopt($ch, CURLOPT_POST, true);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

		// Set HTTP Header for POST request 
		curl_setopt($ch, CURLOPT_HTTPHEADER, array(
		'Content-Type: application/json',
		'Content-Length: ' . strlen($payload))
		);

		// Submit the POST request
		$respJSON = curl_exec($ch);

		// Close cURL session handle
		curl_close($ch);

        if(!$respJSON) {
            return false;
        }else{
            return json_decode($respJSON, true);
        }
    }

    public function sendPut()
    {
        //datos a enviar
        $data = array("a" => "a");
        //url contra la que atacamos
        $ch = curl_init("http://localhost:8080/WebService/API_Rest/api.php");
        //a true, obtendremos una respuesta de la url, en otro caso, 
        //true si es correcto, false si no lo es
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //establecemos el verbo http que queremos utilizar para la petición
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        //enviamos el array data
        curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
        //obtenemos la respuesta
        $response = curl_exec($ch);
        // Se cierra el recurso CURL y se liberan los recursos del sistema
        curl_close($ch);
        if(!$response) {
            return false;
        }else{
            var_dump($response);
        }
    }

    public function sendGet()
    {
        //datos a enviar
        $data = array("a" => "a");
        //url contra la que atacamos
        $ch = curl_init("http://localhost:8080/WebService/API_Rest/api.php");
        //a true, obtendremos una respuesta de la url, en otro caso, 
        //true si es correcto, false si no lo es
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //establecemos el verbo http que queremos utilizar para la petición
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
        //enviamos el array data
        curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
        //obtenemos la respuesta
        $response = curl_exec($ch);
        // Se cierra el recurso CURL y se liberan los recursos del sistema
        curl_close($ch);
        if(!$response) {
            return false;
        }else{
            var_dump($response);
        }
    }

    public function sendDelete()
    {
        //datos a enviar
        $data = array("a" => "a");
        //url contra la que atacamos
        $ch = curl_init("http://localhost:8080/WebService/API_Rest/api.php");
        //a true, obtendremos una respuesta de la url, en otro caso, 
        //true si es correcto, false si no lo es
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        //establecemos el verbo http que queremos utilizar para la petición
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        //enviamos el array data
        curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
        //obtenemos la respuesta
        $response = curl_exec($ch);
        // Se cierra el recurso CURL y se liberan los recursos del sistema
        curl_close($ch);
        if(!$response) {
            return false;
        }else{
            var_dump($response);
        }
    }
	function CallAPI($method, $url, $data = false)
	{
	    $curl = curl_init();

	    switch ($method)
	    {
	        case "POST":
	            curl_setopt($curl, CURLOPT_POST, 1);

	            if ($data)
	                curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
	            break;
	        case "PUT":
	            curl_setopt($curl, CURLOPT_PUT, 1);
	            break;
	        default:
	            if ($data)
	                $url = sprintf("%s?%s", $url, http_build_query($data));
	    }

	    // Optional Authentication:
	    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
	    curl_setopt($curl, CURLOPT_USERPWD, "username:password");

	    curl_setopt($curl, CURLOPT_URL, $url);
	    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

	    $result = curl_exec($curl);

	    curl_close($curl);

	    return $result;
	}

	public function llenarCaracter($parValor, $canCar, $ubicacion="D", $letra="_") {
	  $numCero = $canCar - strlen($parValor);
	  if ($numCero > 0) {
	    for ($i = 1; $i <= $numCero; $i++) {
	      if($ubicacion=="D"){
	        $parValor = $parValor . $letra;
	      }
	      else if($ubicacion=="I"){
	        $parValor = $letra . $parValor;
	      }
	    }
	  }
	  return substr($parValor, 0, $canCar);
	}// Fin de fuencion para sacar el codigo de una tabla

	public function IGV($parValor, $parTipo) {
	  $cifras = intVal(pow(10, $this->PRVDECIPREC));
	  if ($parTipo > 0) {
	    $parValor = $parValor * (1 + ($this->PRVIGV / 100));
	  } else if ($parTipo < 0) {
	    $parValor = $parValor / (1 + ($this->PRVIGV / 100));
	  }
	  return round($parValor * $cifras) / $cifras;
	}// Fin de redondearNumero(Double numOpe, Integer numDec)
	
	public function strIGV($parValor, $parTipo) {
	  $cifras = intVal(pow(10, $this->PRVDECIPREC));
	  if ($parTipo > 0) {
	    $parValor = $parValor * (1 + ($this->PRVIGV / 100));
	  } else if ($parTipo < 0) {
	    $parValor = $parValor / (1 + ($this->PRVIGV / 100));
	  }
	  $valor = round($parValor * $cifras) / $cifras;
	  $strVal = strval($valor);
	  $arrStrVal = explode(".", $strVal);
	  if(count($arrStrVal) > 1) {
	    $valInt = $arrStrVal[0];
	    $valDec = $arrStrVal[1];
	  } else {
	    $valInt = $arrStrVal[0];
	    $valDec = "0";
	  }
	  $strDec = $this->llenarCaracter($valDec, $this->PRVDECIPREC, "I", "0");
	  return $valInt . "." . $strDec;
	}// Fin de redondearNumero(Double numOpe, Integer numDec)
	
	public function redStrPrec($numOpe) {
	  $cifras = intVal(pow(10, $this->PRVDECIPREC));
	  $valor = round($numOpe * $cifras) / $cifras;
	  $strVal = strval($valor);
	  $arrStrVal = explode(".", $strVal);
	  if(count($arrStrVal) > 1) {
	    $valInt = $arrStrVal[0];
	    $valDec = $arrStrVal[1];
	  } else {
	    $valInt = $arrStrVal[0];
	    $valDec = "0";
	  }	  
	  $strDec = $this->llenarCaracter($valDec, $this->PRVDECIPREC, "I", "0");
	  return $valInt . "." . $strDec;
	}
	
	public function URLRequest($url, array $encabezado, array $parametros, $tipo = "json", $isPost = false, $cuerpo = "")
  {
    $method = ($isPost ? "POST" : "GET");

    $queryStr = "?";
    foreach($parametros as $key=>$val)
        $queryStr .= $key . "=" . $val . "&";

    //trim the last '&'
    $queryStr = rtrim($queryStr, "&");

    $url = $url . $queryStr;

    $request = curl_init();
    curl_setopt($request, CURLOPT_URL, $url);
    curl_setopt($request, CURLOPT_HEADER, 1);
    curl_setopt($request, CURLOPT_HTTPHEADER, $encabezado);
    curl_setopt($request, CURLOPT_RETURNTRANSFER, 1);
    //curl_setopt($request, CURLOPT_SSL_VERIFYPEER, false);

    if($method == "POST")
    {
        curl_setopt($request, CURLOPT_POST, 1);
        curl_setopt($request, CURLOPT_POSTFIELDS, $cuerpo);

        //this prevents an additions code 100 from getting returned
        //found it in some forum - seems kind of hacky
        curl_setopt($request, CURLOPT_HTTPHEADER, array("Expect:"));
    }

    $response = curl_exec($request);
    curl_close($request);

    preg_match("%(?<=HTTP/[0-9]\.[0-9] )[0-9]+%", $response, $code);

    $resp = "";
    if($tipo == "json")
    {
        //parse response
    }
    elseif($tipo == "xml")
    {
        //parse response
    }
    return $response;
  }
}
?>