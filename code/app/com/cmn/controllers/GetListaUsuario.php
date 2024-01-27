<?php

class GetListaUsuario extends Controlador
{

  public function __construct()
  {
    parent::__construct();
  }

  public function ejecutar($data)
  {
    $result = null;
    try {
      $data = $this->getFiltro($data); // Inicio

      $data['dbResp'] = "LISTA";

      $where = "WHERE 1=1 AND usu.usu_esta='0001'";

      if($this->util->esdato($data,'pol_kypol')){$where.=" AND (cap.cap_kyapp = '".$this->util->get($data, "pol_kypol")."')";}
      if($this->util->esdato($data,'usu_kyusu')){$where.=" AND (usu.usu_kyusu = '".$this->util->get($data, "usu_kyusu")."')";}
      if($this->util->esdato($data,'usu_kypdr')){$where.=" AND (usu.usu_kypdr = '".$this->util->get($data, "usu_kypdr")."')";}
      if($this->util->esdato($data,'usu_mail')){$where.=" AND (usu.usu_mail = '".$this->util->get($data, "usu_mail")."')";}
      if($this->util->esdato($data,'usu_tdoc')){$where.=" AND (usu.usu_tdoc = '".$this->util->get($data, "usu_tdoc")."')";}
      if($this->util->esdato($data,'usu_ndoc')){$where.=" AND (usu.usu_ndoc = '".$this->util->get($data, "usu_ndoc")."')";}
      if($this->util->esdato($data,'usu_nomb')){$where.=" AND (usu.usu_nomb = '".$this->util->get($data, "usu_nomb")."')";}
      if($this->util->esdato($data,'usu_pass')){$where.=" AND (usu.usu_pass = '".$this->util->get($data, "usu_pass")."')";}
      
      if ($this->util->get($data, 'term') != "Seleccione" && $this->util->get($data, 'term') != "") {
        switch (strlen($this->util->get($data, 'term'))) {
          case 1:
            $where .= " AND (usu.usu_nomb like '%' or usu.usu_ndoc like '%')";
            break;
          default:
            $where .= " AND (usu.usu_nomb like '%" . $data['term'] . "%' or usu.usu_ndoc like '%" . $data['term'] . "%')";
            break;
        } // switch(strlen($this->util->get($data,'term'))){
      }
      if ($this->util->get($data, 'sql') == "") {
        if ($this->util->get($data, "prf_nomb") == "ADMINISTRADOR" || $this->util->get($data, "prf_nomb") == "USUARIO") {
          
          if($this->util->esdato($data,'com_kycom')){$where.=" AND (com.com_kycom = '".$this->util->get($data, "com_kycom")."')";}
          
          $data['sql'] = "SELECT com.com_kycom, com.com_nomb, com.com_dscr,prf.prf_nomb,
            usu.usu_kyusu, usu.usu_kycom, usu.usu_kypdr, usu.usu_tdoc, usu.usu_ndoc, usu.usu_nomb, usu.usu_dire,
            usu.usu_mail, usu.usu_pass, usu.usu_fcre, usu.usu_fmod, usu.usu_fini, usu.usu_ffin, usu.usu_telf, usu.usu_firm, usu.usu_foto, usu.usu_esta, usu.usu_vers
            FROM cmn_comapp cap
            INNER JOIN cmn_usuario usu ON usu.usu_kyusu=cap.cap_kyusu
            INNER JOIN cmn_comunidad com ON com.com_kycom=cap.cap_kycom
            INNER JOIN cmn_roles rol ON rol.rol_kyusu=usu.usu_kyusu
            INNER JOIN cmn_perfil prf ON prf.prf_kyprf=rol.rol_kyprf
            $where
            GROUP BY com.com_kycom, com.com_nomb, com.com_dscr,prf.prf_nomb,
            usu.usu_kyusu, usu.usu_kypdr, usu.usu_tdoc, usu.usu_ndoc, usu.usu_nomb, usu.usu_dire,
            usu.usu_mail, usu.usu_pass, usu.usu_fcre, usu.usu_fmod, usu.usu_fini, usu.usu_ffin, usu.usu_telf, usu.usu_firm, usu.usu_foto, usu.usu_esta, usu.usu_vers";
            
        } else {
          
          $data['sql'] = "SELECT usu.usu_kyusu, usu.usu_kycom, usu.usu_kypdr, usu.usu_tdoc, usu.usu_ndoc, usu.usu_nomb, usu.usu_dire,
            usu.usu_mail, usu.usu_pass, usu.usu_fcre, usu.usu_fmod, usu.usu_fini, usu.usu_ffin, usu.usu_telf, usu.usu_firm, usu.usu_foto, usu.usu_esta, usu.usu_vers
            FROM cmn_usuario usu
            INNER JOIN cmn_roles rol ON rol.rol_kyusu=usu.usu_kyusu
            INNER JOIN cmn_perfil prf ON prf.prf_kyprf=rol.rol_kyprf
            $where
            GROUP BY usu.usu_kyusu, usu.usu_kypdr, usu.usu_tdoc, usu.usu_ndoc, usu.usu_nomb, usu.usu_dire,
            usu.usu_mail, usu.usu_pass, usu.usu_fcre, usu.usu_fmod, usu.usu_fini, usu.usu_ffin, usu.usu_telf, usu.usu_firm, usu.usu_foto, usu.usu_esta, usu.usu_vers";
            
        }
        
      } else {
        $data['sql'] = $data['sql'] . " " . $where;
      }

      $data = $this->getLista($data);

      if ($this->util->get($data, 'term') !== "") {
        if ((bool) $this->util->get($data, "mostrarSeleccion")) {
          $lista = Array();
          $obj = Array(
            "usu_kyusu" => "",
            "usu_nomb" => "Seleccione",
            "usu_ndoc" => "Seleccione",
            "prf_nomb" => "GENERAL",
            "usu_tdoc" => "DNI",
            "usu_dire" => "DIRECCION",
            "usu_foto" => ""
          );
          array_push($lista, $obj);
          if (count($data['lista']['items']) > 0) {
            $data['lista']['items'] = array_merge($lista, $data['lista']['items']);
          } else {
            $data['lista']['items'] = $lista;
          }
          if (strlen($this->util->get($data, 'term')) >= 3 && count($data['lista']['items']) == 1) {
            $data['lista']['items'] = Array();
          }
        } // if($data['mostrarSeleccion'])
        else {
          if (strlen($this->util->get($data, 'term')) >= 3 && count($data['lista']['items']) == 0) {
            $data['lista']['items'] = Array();
          }
        }
      } // if($this->util->get($data,'term')=="Seleccione")

      $data['msg'] = ((count($data['lista']) > 0) ? Array(
        "type" => "success",
        "text" => "Exito"
      ) : Array(
        "type" => "error",
        "text" => "Error"
      ));

      $result = $data;
    } catch (Exception $e) {
      throw $e;
    }
    return $result;
  }
}
?>