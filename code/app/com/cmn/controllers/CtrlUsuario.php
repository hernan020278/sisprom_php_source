<?php

class CtrlUsuario extends Controlador
{

  public function __construct()
  {
    parent::__construct();
  }

  public function index()
  {
    $data = Array();
    $data['usu_kyusu'] = 199;
    $data['usu_kycom'] = 0;
    $data['usu_kypdr'] = 0;
    $data['usu_tipo'] = 'EMP';
    $data['usu_tdoc'] = 'RUC';
    $data['usu_ndoc'] = $this->util->getKey();
    $data['usu_nomb'] = "prueba";
    $data['usu_esta'] = '0001';
    $data = $this->run("adm/CtrlUsuario", $data);
    var_dump($data);
  }

  public function ejecutar($data)
  {
    $result = null;
    try {
      if (SRVFNT == "SRVAPI") {
        $result = Util::getInst()->sendPost($data);
      } else {
        $result = $this->ejecutarPHP($data);
      }
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function ejecutarPHP($data)
  {
    $result = null;
    try {
      $data = $this->getFiltro($data); // Inicio

      $this->dbcn->iniciarTransaccion($data);
      
      
      if ($this->util->get($data, "comando") == "AGREGAR_MODIFICAR") {
        $dtmp = Array("usu" => Array());
        $dtmp['usu']['prf_nomb'] = $data['prf']['prf_nomb'];
        $dtmp['usu']['usu_mail'] = $data['usu']['usu_mail'];
        $dtmp['usu']['usu_tdoc'] = $data['usu']['usu_tdoc'];
        $dtmp['usu']['usu_ndoc'] = $data['usu']['usu_ndoc'];
        $dtmp = $this->run("cmn/GetListaUsuario", $dtmp['usu']);
        
        if (count($dtmp['lista']['items']) > 0) 
        {
          $data['usu']['usu_kyusu'] = $dtmp['lista']['items'][0]['usu_kyusu'];
          $data['comando'] = "MODIFICAR";
        }
        else 
        {
          $data['usu']['usu_kyusu'] = "0";
          $data['comando'] = "AGREGAR";
        }
      }
      
      if ($this->util->get($data, "comando") == "AGREGAR" && $this->util->get($data,"usu_kyusu","0")=="0") {
        
        $dtmp = Array("usu" => Array());
        $dtmp['usu']['usu_mail'] = $data['usu']['usu_mail'];
        $dtmp['usu']['usu_tdoc'] = $data['usu']['usu_tdoc'];
        $dtmp['usu']['usu_ndoc'] = $data['usu']['usu_ndoc'];
        $dtmp = $this->run("cmn/GetListaUsuario", $dtmp['usu']);

        if (count($dtmp['lista']['items']) > 0) {
          
          $data['usu']['usu_kyusu'] = $dtmp['lista']['items'][0]['usu_kyusu'];
          $data['usu'] = $dtmp['lista']['items'][0];
          $data['msg'] = Array("type"=>"error","text"=>"Clase:".get_class($this)."\nRegistro existe");
          
        }
        else 
        {
          $dtmp = Array();
          $dtmp['usu'] = $data['usu'];
          $dtmp = $this->insert($dtmp['usu'], "cmn_usuario");
          $data['usu']['usu_kyusu'] = $dtmp['usu_kyusu'];
          $data['msg'] = Array("type"=>"success","text"=>"Clase:".get_class($this)."\nExito");
          
          if(isset($data['prf'])){
            
            $dtmp = Array();
            $dtmp['comando'] = "AGREGAR";
            $dtmp['prf']['prf_kyprf'] = "0";
            $dtmp['prf']['prf_nomb'] = $data['prf']['prf_nomb'];
            $dtmp = $this->run("cmn/CtrlPerfil",$dtmp);
            $data['prf'] = $dtmp['prf'];
            $data['prf_kyprf'] = $dtmp['prf_kyprf'];
            
            $dtmp = Array();
            $dtmp['comando'] = "AGREGAR";
            $dtmp['rol']['rol_kyrol'] = "0";
            $dtmp['rol']['rol_kycom'] = $_SESSION['com']['com_kycom'];
            $dtmp['rol']['rol_kyusu'] = $data['usu']['usu_kyusu'];
            $dtmp['rol']['rol_kyprf'] = $data['prf']['prf_kyprf'];
            $dtmp = $this->run("cmn/CtrlRoles",$dtmp);
            $data['rol'] = $dtmp['rol'];
            $data['rol_kyrol'] = $dtmp['rol_kyrol'];
            
          }//if(isset($data['prf'])){
        }
        
        $data['msg'] = Array("type" => "success","text" => "Clase : " . get_class($this) . " Exito");
        
      } else if ($this->util->get($data, "comando") == "MODIFICAR") {
        
        if ($this->util->get($data, "where") == "") {
          $data['where'] = "where usu_kyusu=" . $data['usu']['usu_kyusu'] . "";
        }
        $data = $this->update($data, "cmn_usuario");
        
        if(isset($data['prf'])){
          
          $dtmp = Array();
          $dtmp['comando'] = "AGREGAR";
          $dtmp['prf']['prf_kyprf'] = "0";
          $dtmp['prf']['prf_nomb'] = $data['prf']['prf_nomb'];
          $dtmp = $this->run("cmn/CtrlPerfil",$dtmp);
          $data['prf'] = $dtmp['prf'];
          $data['prf_kyprf'] = $dtmp['prf_kyprf'];
          
          $dtmp = Array();
          $dtmp['comando'] = "AGREGAR";
          $dtmp['rol']['rol_kyrol'] = "0";
          $dtmp['rol']['rol_kycom'] = $_SESSION['com']['com_kycom'];
          $dtmp['rol']['rol_kyusu'] = $data['usu']['usu_kyusu'];
          $dtmp['rol']['rol_kyprf'] = $data['prf']['prf_kyprf'];
          $dtmp = $this->run("cmn/CtrlRoles",$dtmp);
          $data['rol'] = $dtmp['rol'];
          $data['rol_kyrol'] = $dtmp['rol_kyrol'];
          
        }//if(isset($data['prf'])){
        
      } else if ($this->util->get($data, "comando") == "ELIMINAR" && $this->util->exist($data, "lisKy") && count($data['lisKy']) > 0) {
        foreach ($data['lisKy'] as $key => $val) {
          if ($this->util->get($data, "where") == "") {
            $data['where'] = "where usu_kyusu = '" . $val['ky'] . "'";
          }
          $data = $this->delete($data, "cmn_usuario");
        } // foreach ($data['lisPrp'] as $key=>$val)
      } // else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
      else if ($this->util->get($data, "comando") == "SUBIRFOTO") {
        $this->uploadFimg($data);
      } // else if($this->util->get($data,"comando") == "ELIMINAR" && $this->util->get($data,"ope_kyope")!="0")
      else {
        $data['msg'] = Array(
          "type" => "error",
          "text" => "Clase:" . get_class($this) . " No hay comando accion o verificar clave"
        );
      }
      $result['msg'] = $data['msg'];
      $result['usu'] = $this->util->get($data, "usu");
      $result['usu_kyusu'] = $this->util->get($data, "usu_kyusu");

      $this->dbcn->finalizarTransaccion();
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }

  public function uploadFimg($data)
  {
    $data['modulo'] = "images";
    $data['pathFile'] = $this->upload($data);
    $data["msg"] = array(
      "type" => "success",
      "text" => "Archivo subido satisfactorio"
    );
    echo json_encode($data);
  }

  public function agregarEntidadDeUsuario($data)
  {
    $result = null;
    try {
      $data = $this->getFiltro($data); // Inicio

      $this->dbcn->iniciarTransaccion($data);

      $data['msg'] = Array(
        "type" => "success",
        "Exito"
      );

      $dtmp = Array();
      $dtmp['usu_tipo'] = $this->util->get($data, "usu_tipo");
      $dtmp['usu_mail'] = $this->util->get($data, "usu_mail");
      $dtmp = $this->run("cmn/GetListaUsuario", $dtmp);
      if (count($dtmp['lista']['items']) > 0) {
        $data['usu_kyusu'] = $dtmp['lista']['items'][0]['usu_kyusu'];
        $data['msg'] = Array(
          "type" => "error",
          "El correo ya existe"
        );
      }

      if ($data['msg']['type'] == "success") {
        $data = $this->insert($data, "cmn_usuario");
      }
      $result = $data;

      $this->dbcn->finalizarTransaccion($data);
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }
}
?>