<?php
class DBconeccion
{
    var $dbapp="default";
    var $coneccion = null;
    var $servidor, $usuario, $password, $basedato;    
    var $oldStateOfAutoCommit = false;
    var $oldStateOfTransactionIsolation = 'TRANSACTION_READ_COMMITTED';
    var $transaccionExito = false;
    var $transaccionIniciada = false;
    var $exitoSql = true;
    public $lisFieldObj = Array();
    public $lisObj = Array();
    
	private static $instance;
	
	public function __construct(){}
	
	public static function getInst() {
		if (self::$instance == null) {self::$instance = new self();}
		return self::$instance;
	}
    	    
// 	public function DBConeccion(String organizacionIde) throws Exception
// 	{
// 		dbapp = organizacionIde;
// 		this.setconeccion(null, organizacionIde);
// 	}

// 	public function DBConeccion($coneccion, $dbapp)
// 	{
// 		$this->setconeccion(coneccion, organizacionIde);
// 	}

	public function conectar($dbapp)
	{
		if(!$this->transaccionIniciada || isset($this->coneccion) || isset($this->coneccion->connect_errno))
		{
			$this->setConexion($dbapp);
			$this->coneccion = new mysqli($this->servidor, $this->usuario, $this->password, $this->basedato);
			if ($this->coneccion->connect_errno) {
				echo "Errno: " . $this->coneccion->connect_errno . "\n";
				echo "Error: " . $this->coneccion->connect_error . "\n";
				exit;
			}//if ($this->coneccion->connect_errno) {
		}//if($this->transaccionIniciada)
	}//public function conectar($dbapp)
	public function cerrar()
	{
		if(!$this->transaccionIniciada)
		{
			$this->coneccion->close();
			unset($this->coneccion);
			unset($this->dbapp);
		}//if($this->transaccionIniciada)
	}
	public function iniciarTransaccion($data, $dbapp="") {
		try {
			if (!$this->transaccionIniciada)
			{
				$this->dbapp = ( ($dbapp!="") ? $dbapp : $this->getDbapp($data) ) ;
				
				$this->setConexion($this->dbapp);
				$this->coneccion = new mysqli($this->servidor, $this->usuario, $this->password, $this->basedato);
				if ($this->coneccion->connect_errno) {
					echo "Errno: " . $this->coneccion->connect_errno . "\n";
					echo "Error: " . $this->coneccion->connect_error . "\n";
					exit;
				}//if ($this->coneccion->connect_errno) {
				
				$this->coneccion->autocommit(false);
				$this->transaccionIniciada = true;
				$this->transaccionExito = false;
			}// Fin de if(coneccion == null)
		} catch (Exception $e) {
			throw $e;
		}
	}//public function iniciarTransaccion($dbapp) {
	public function finalizarTransaccion() {
		try {
			if ($this->transaccionIniciada)
			{
				if($this->transaccionExito)
				{
					$this->coneccion->commit();
				}
				else
				{
					$this->coneccion->rollback();
				}
				
				$this->coneccion->autocommit(true);
				$this->transaccionIniciada = false;
				$this->transaccionExito = true;
				
				$this->coneccion->close();
				unset($this->coneccion);
			}// Fin de if(coneccion == null)
		} catch (Exception $e) {
			throw $e;
		}
	}//public function finalizarTransaccion($dbapp) {
	public function getLista($data) {
		$result=false;
		try
		{
			if (array_key_exists('sql',$data))
			{
				$data["dbResp"]='LISTA';
				$data=$this->ejecutarConsulta($data);
				$result=$data;
			}
		}
		catch (Exception $e){
			throw $e;
		}
		return $result;
	}	
	public function ejecutarConsulta($data) {
		$result = false;
		try 
		{
			$this->dbapp	= $this->getDbapp($data);
			$query 	    	= $data["sql"];
			
//			if(strpos($query, "dba_")){$query = str_replace("dba_", $_SESSION['app']['pol_temp']."_", $query);}
			
			$resp 	    	= $data["dbResp"];
			$res        	= false;
			
			$this->conectar($this->dbapp);
			
			if ( isset($data['archivo']) && strtoupper($data['archivo'])==strtoupper("GetListaArticulo") )
// 			if ( isset($data["dbTipo"]) && $data['dbTipo'] == 'INSERT' )
			{
 				error_log($query."\n", 3, "error.log");
			}
			if ($resp=='ENTIDAD')
			{
				$result = Array();
				$res=$this->ejecutar($query);
				if (count($res)>0){
					$data['one']=$res[0];
				}else{
					$data['one']=new stdClass();
				}
			}
			else if ($resp=='LISTA')
			{
// 			    $data['list'] = Util::getInst()->objToArray($this->ejecutar($query));
				if(SRVFNT == "SRVAPI")
				{
					$dtmp = Array();
					$dtmp['archivo'] = "cmn/CtrlDatabase";
					$dtmp['comando'] = "EJECUTAR_SQL";
					$dtmp['sql'] = $query;
					$dtmp = Util::getInst()->sendPost($dtmp);
					$data['list'] = $dtmp['lista'];
				}
				else
				{
					$data['list'] = $this->ejecutar($query);
				}
			}// Fin de if(respuesta.equals("ENTIDAD")){
			else if ($resp=='BATCH')
			{
 				error_log($query."\n", 3, "error.log");
				$this->ejecutar($query);
				$numRow = $this->affected_rows();

				if( $this->exitoSql || $numRow > 0 )
				{
					if(!(strpos(strtoupper($query), "INSERT")===false))
					{
						$data['id'] = $this->insert_id();
						$data[$this->getId($data)] = $this->insert_id();
					}
					// 					$data[$this->getAlias($data)] = $this->getObjectFromData($data);
					$data["msg"]=array("type"=>"success","text"=>"Exito ".Util::getInst()->get($data,"dbTipo")." ".Util::getInst()->get($data,"obj"));
					$data['successful'] = true;
					$this->transaccionExito = true;
						
				}
				else
				{
					$data["msg"]=array("type"=>"error","text"=>"Error ".Util::getInst()->get($data,"dbTipo")." ".Util::getInst()->get($data,"obj"));
					$data['successful'] = false;
					$this->transaccionExito = false;
				}
			}// Fin de if(respuesta.equals("ENTIDAD")){
			
			$this->cerrar();
			
			$data["tipoSql"]="";
			$data["sql"]="";
			$data["where"]="";
// 			$data["delete"]="";
// 			$data["dbResp"]="";
			$result=$data;
		} catch (Exception $e){
			throw $e;
		}
		return $result;
	}
	private function setDataFromObj($nomObj, $data, $obj){
		if(is_object($obj)){$arrObj=(array) $obj;}
		else if(is_array($obj)){$arrObj=$obj;}
		
		$this->dbapp = $this->getDbapp($data);
		$data['nomObj'] = $nomObj;
		$fields = $this->getLisFieldFromObj($data);
		
		for ($ite=0; $ite<count($fields); $ite++){
			if(isset($arrObj[$fields[$ite]])){
				$data[$fields[$ite]]= $arrObj[$fields[$ite]];
			}else{
				$data[$fields[$ite]]='';
			}
		}
		return $data;
	}
	function getAlias($data)
	{
		$obj_kyobje = $this->getId($data);
		return substr($obj_kyobje, 0, strpos($obj_kyobje, "_"));
	}
	function getId($data)
	{
		$tab_kytab = null;
		$data['nomObj'] = $data['tbl'];
		$fields = $this->getLisFieldFromObj($data);
		if(count($fields) > 0)
		{
			$arrField = explode('_', $fields[0]);
			$tab_kytab = $arrField[0]."_ky".$arrField[0];
		}
		
		return $tab_kytab;
	}
	function fillDataFromObject($data, $arrObj){
		if(is_object($data)){$arrData = (array) $data;}
		else if(is_array($data)){$arrData = $data;}
	
		foreach($arrObj as $key => $val){
			$arrData[$key]=$arrObj[$key];
		}
		return $arrData;
	}
	function getObjectFromData($data, $strObj="")
	{
		$fields = null;
		
		if(is_object($data)){$arrData = (array) $data;}
		else if(is_array($data)){$arrData = $data;}

		$data['nomObj'] = $strObj;
		if( !isset($data['nomObj']) )
		{
			$data['nomObj'] = Util::getInst()->get($arrData, "obj");
			$fields = $this->getLisFieldFromObj( $data );
		}
		$fields = $this->getLisFieldFromObj($data);
		if ($fields == null){$dtmp = null;}
		
		$arrObj = Array();
		for ($ite=0; $ite<count($fields); $ite++){
		  if(Util::getInst()->exist($arrData, $fields[$ite])){
		    $arrObj[$fields[$ite]]=Util::getInst()->get($arrData, $fields[$ite]);
		  }
		}
		return $arrObj;
	}
	function fillFieldFromData($data)
	{
		$this->dbapp = $this->getDbapp($data);
		
		if(is_object($data)){$arrData = (array) $data;}
		else if(is_array($data)){$arrData = $data;}
		$arrData['nomObj'] = $arrData['tbl'];
		$fields = $this->getLisFieldFromObj($arrData);
		$arrObj = Array();
		for ($ite=0; $ite<count($fields); $ite++){
		  if(Util::getInst()->exist($arrData, $fields[$ite])){
		    $arrObj[$fields[$ite]]=Util::getInst()->get($arrData, $fields[$ite]);
		  }
		}
		return $arrObj;
	}
	function getLisFieldFromObj($data)
	{
		$data = $this->getTabla($data);
		$nomObj = $data['nomObj'];
		if(!isset($this->lisFieldObj[$nomObj]))
		{
			$fields = $this->list_fields($nomObj);
			$this->lisFieldObj[$nomObj]=$fields;
		}
		return $this->lisFieldObj[$nomObj];
	}
	function getSql($data)
	{
		if(Util::getInst()->get($data, "sql")=="")
		{
			$query = "";
			$fie = "";
			$dat = "";
					
			if ($data['dbTipo'] == "INSERT"){$query = "INSERT INTO ".$data['tbl'];}
			else if ($data['dbTipo'] == "UPDATE"){$query = "UPDATE ".$data['tbl'];}
			else if ($data['dbTipo'] == "DELETE"){$query = "DELETE FROM ".$data['tbl'];}
			else if ($data['dbTipo'] == "PROCEDURE"){$data['sql'] = $data['sql'];}
			
			if($data['dbTipo']!="PROCEDURE")
			{
				$obj = $this->fillFieldFromData($data);
			
				foreach($obj as $key=>$val)
				{
					$val = Util::getInst()->validarFechaCliente($val, "DD/MM/YYYY");
					if ($data['dbTipo'] == "INSERT" && $this->getId($data) != $key)
					{
						$fie .= $key.",";
						$dat .= "'".$val."',";
					}
					else if ($data['dbTipo'] == "UPDATE" && $this->getId($data) != $key)
					{
					  if(trim($val)!=""){
					    $fie .= $key."='".$val."',";
					  }
					}
				}
			
				$fie = substr($fie, 0, strlen($fie)-1);
				$dat = substr($dat, 0, strlen($dat)-1);
			
				if ($data['dbTipo'] == "INSERT"){$data['sql'] = $query."(".$fie.") VALUES(".$dat.")";}
				if ($data['dbTipo'] == "UPDATE"){$data['sql'] = $query." SET ".$fie;}
				if ($data['dbTipo'] == "DELETE"){$data['sql'] = $query;}
			
				if ($data['dbTipo'] == "UPDATE" || $data['dbTipo'] == "DELETE"){$data['sql'] .= " ".Util::getInst()->get($data,"where","");}
			}//if($data['dbTipo']!="PROCEDURE")
		}//if($data['sql'])
		return $data;
	}
	private function setConexion($dbapp){
		if(isset($GLOBALS['DBCONF'][$dbapp]))
		{
			$this->servidor=$GLOBALS['DBCONF'][$dbapp]['DBHOST'];
			$this->basedato=$GLOBALS['DBCONF'][$dbapp]['DBNAME'];
			$this->usuario=$GLOBALS['DBCONF'][$dbapp]['DBUSER'];
			$this->password=$GLOBALS['DBCONF'][$dbapp]['DBPASS'];
		}
		else
		{
			$this->servidor=DBHOST;
			$this->basedato=DBNAME;
			$this->usuario=DBUSER;
			$this->password=DBPASS;
		}
		$this->dbapp=$dbapp;
		
	}
	public function ejecutar($query)
	{
		$stmt = Array();
		$this->exitoSql = false;
		if(!mysqli_connect_errno())
		{
			$this->last_query = $query;
			$this->coneccion->query("SET NAMES 'utf8'");
			$rspt = $this->coneccion->query($query);
			if (!$rspt) {
				echo "Query: " . $query . "\n";
				echo "Errno: " . $this->coneccion->errno . "\n";
				echo "Error: " . $this->coneccion->error . "\n";
				exit;
			}
			if($rspt && ( strpos(strtoupper($query), "SELECT") >- 1 || strpos(strtoupper($query), "SHOW") >- 1 || strpos(strtoupper($query), "CALL") >- 1 ) )
			{
				while ($fila = $rspt->fetch_assoc()) {$stmt[] = $fila;}
				$rspt->free();
			}//if(!$rspt)
			$this->exitoSql = true;
		}//if(isset($this->coneccion))
		return $stmt;
	}//public function ejecutar($query)
	public function last_query()
	{
		return $this->last_query;
	}
	public function insert_id()
	{
		return mysqli_insert_id($this->coneccion);
	}
	public function affected_rows()
	{
		return mysqli_affected_rows ($this->coneccion);
	}
	public function getObjetoMysql($obj)
	{
		$this->conectar($this->dbapp);
		$resp = $this->ejecutar("select table_schema, table_name, column_name from information_schema.columns where table_schema in ('sisprom_cmn','sisprom_erp') and (table_name like 'cmn_%' or table_name like 'erp_%') and column_name like '".$obj."_%'");
		foreach ($resp as $key=>$val)
		{
			if(!isset($this->lisObj[$key['table_name']]))
			{
				$this->lisObj[$key['table_name']] = Array();
			}
			array_push($this->lisObj[$key['table_name']], $val['column_name']);
		}
		$this->cerrar();
	}
	public function list_fields($tabla)
	{
		$this->conectar($this->getDbapp(Array("dbapp"=>substr($tabla,0,3))));
		$resp = $this->ejecutar("show columns from ".$tabla);
		$flds = Array();
		foreach ($resp as $key=>$val)
		{
			$flds[$key] = $val['Field'];
		}
		$this->cerrar();
		return $flds;
	}
	private function getDbapp($data)
	{
// 		$result = "";
// 		if( Util::getInst()->get($data, "dbapp")!="cmn" && isset($_SESSION['app']) && isset($_SESSION['app']['pol_temp']) )
// 		{
// 			$result = $_SESSION['app']['pol_temp'];
// 		}
// 		else{$result = $data['dbapp'];}
// 		return $result;
		return (isset($data['dbapp']) ? $data['dbapp'] : "" );
	}
	public function getTabla($data)
	{
		$result = "";
		$arrObj = Array();
// 		if (!isset($obj) || is_null($obj) || $obj==""){$obj = "cmn";}
		$arrObj=explode('_', $data['nomObj']);
		if(count($arrObj) == 1 && isset($this->dbapp))
		{
			$data['dbapp'] = $this->dbapp;
			$data['nomObj'] = $this->dbapp."_".$data['nomObj'];
		}
		else if(count($arrObj) > 1)
		{
			$data['dbapp'] = $arrObj[0];
		}
		return $data;
	}
}
?>
