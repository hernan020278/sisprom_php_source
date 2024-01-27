<?php

class GetListaRoles extends Controlador
{

    public function __construct()
    {
        parent::__construct();
    }

    public function index()
    {
        $data = Array();
        $data['rol_kyrol'] = 11;
        $data = $this->ejecutar($data);
        var_dump($data);
    }

    public function ejecutar($data)
    {
        $result = null;
        try {
            $data = $this->getFiltro($data);
            $data['dbResp'] = "LISTA";

            $where = "WHERE 1=1";

            if ($this->util->exist($data, 'rol_kycom')) {$where .= " AND (rol.rol_kycom = '" . $data['rol_kycom'] . "')";}
            if ($this->util->exist($data, 'rol_kyusu')) {$where .= " AND (rol.rol_kyusu = '" . $data['rol_kyusu'] . "')";}
            if ($this->util->exist($data, 'rol_kyprf')) {$where .= " AND (rol.rol_kyprf = '" . $data['rol_kyprf'] . "')";}
            if ($this->util->exist($data, 'prf_nomb')) {$where .= " AND (prf.prf_nomb = '" . $data['prf_nomb'] . "')";}

            $data['sql'] = "SELECT rol.rol_kyrol, com.com_kycom, com.com_nomb, usu.usu_kyusu, usu.usu_nomb, prf.prf_kyprf, prf.prf_nomb, prf_dscr
            FROM cmn_roles rol
            INNER JOIN cmn_perfil prf ON prf.prf_kyprf=rol.rol_kyprf
            INNER JOIN cmn_usuario usu ON usu.usu_kyusu=rol.rol_kyusu 
            INNER JOIN cmn_comunidad com ON com.com_kycom=rol.rol_kycom " . $where;

            $data = $this->getLista($data);

            $result = $data;
        } catch (Exception $e) {
            throw $e;
        }
        return $result;
    }
}
?>