<?php
namespace Api\Controller;

use Zend\View\Model\JsonModel;
use Zend\Db\ResultSet\HydratingResultSet;
use Core\Stdlib\StdClass;
use Core\Hydrator\ObjectProperty;
use Core\Hydrator\Strategy\ValueStrategy;
use Core\Mvc\Controller\AbstractRestfulController;
use Zend\Json\Json;


class CpCeController extends AbstractRestfulController
{
    
    /**
     * Construct
     */
    public function __construct()
    {
        
    }

    public function listarEmpresasAction()
    {
        $data = array();
        
        try {

            $session = $this->getSession();
            $usuario = $session['info'];

            $em = $this->getEntityManager();

            if($usuario['empresa'] != "EC"){

                $sql = "select id_empresa, apelido as nome
                            from ms.empresa 
                        where id_matriz = 1 
                        and apelido = '".$usuario['empresa']."'
                    ";
            }else{

                $sql = "select id_empresa, apelido as nome
                            from ms.empresa 
                        where id_matriz = 1 
                        and id_empresa = 20
                        union all
                        select * from (
                            select id_empresa, apelido as nome from ms.empresa 
                            where id_matriz = 1 
                            and id_empresa not in (26, 11, 28, 27, 20)
                            order by apelido
                        )
                ";

            }
            
            $conn = $em->getConnection();
            $stmt = $conn->prepare($sql);
            
            $stmt->execute();
            $results = $stmt->fetchAll();

            $hydrator = new ObjectProperty;
            $stdClass = new StdClass;
            $resultSet = new HydratingResultSet($hydrator, $stdClass);
            $resultSet->initialize($results);

            $data = array();
            foreach ($resultSet as $row) {
                $data[] = $hydrator->extract($row);
            }

            $this->setCallbackData($data);
            
        } catch (\Exception $e) {
            $this->setCallbackError($e->getMessage());
        }
        
        return $this->getCallbackModel();
    }

    public function listarProdutosAction()
    {
        $data = array();
        
        try {

            $pEmp = $this->params()->fromQuery('emp',null);
            $pCod = $this->params()->fromQuery('codigo',null);

            if(!$pCod){
                throw new \Exception('Parâmetros não informados.');
            }

            $em = $this->getEntityManager();
            
            $sql = "select distinct i.cod_item||c.descricao as cod_item,
                            i.descricao
                        from ms.tb_estoque e,
                             ms.tb_item i,
                             ms.tb_categoria c,
                             ms.tb_item_categoria ic,
                             ms.empresa em,
                             ms.tb_marca m,
                             (SELECT ID_EMPRESA, ID_ITEM, ID_CATEGORIA,
                                    EH_ACESSORIO as acessorio,
                                    GERAR_PRECO_VENDA,
                                    (case when EH_ACESSORIO = 'S' then 17 end) as icms
                             FROM MS.TB_ITEM_CATEGORIA_PARAM
                             ) ace,
                             xtf_param_mb mg
                    where e.id_item = i.id_item
                    and e.id_categoria = c.id_categoria
                    and e.id_empresa = em.id_empresa
                    and e.id_item = ic.id_item
                    and e.id_categoria = ic.id_categoria
                    and ic.id_marca = m.id_marca
                    and e.id_empresa = ace.id_empresa(+)
                    and e.id_item = ace.id_item(+)
                    and e.id_categoria = ace.id_categoria(+)
                    and e.id_empresa = mg.id_empresa
                    and i.cod_item||c.descricao like upper('%$pCod%')
                    --and em.apelido = ?
                    and rownum <= 5";

            $conn = $em->getConnection();
            $stmt = $conn->prepare($sql);
            // $stmt->bindValue(1, $pEmp);
            
            $stmt->execute();
            $results = $stmt->fetchAll();

            $hydrator = new ObjectProperty;
            $hydrator->addStrategy('custo_contabil', new ValueStrategy);
            $hydrator->addStrategy('icms', new ValueStrategy);
            $hydrator->addStrategy('pis_cofins', new ValueStrategy);
            $hydrator->addStrategy('margem', new ValueStrategy);
            $stdClass = new StdClass;
            $resultSet = new HydratingResultSet($hydrator, $stdClass);
            $resultSet->initialize($results);

            $data = array();
            foreach ($resultSet as $row) {
                $data[] = $hydrator->extract($row);
            }

            $this->setCallbackData($data);
            
        } catch (\Exception $e) {
            $this->setCallbackError($e->getMessage());
        }
        
        return $this->getCallbackModel();
    }

    public function listarmarcaAction()
    {
        $data = array();

        $emp         = $this->params()->fromQuery('emp',null);
        // $dtinicio    = $this->params()->fromQuery('dtinicio',null);
        // $dtfim       = $this->params()->fromQuery('dtfim',null);
        $produto     = $this->params()->fromQuery('produto',null);

        try {

            $session = $this->getSession();
            $usuario = $session['info'];

            $andSql = '';
            if($emp  && $emp != "EC"){
                $andSql = " and em.apelido = '$emp'";
            }
            
            // if($dtinicio){
            //     $andSql .= " and trunc(c.data_emissao) >= '$dtinicio'";
            // }

            // if($dtfim){
            //     $andSql .= " and trunc(c.data_emissao) <= '$dtfim'";
            // }

            // if($produto){
            //     $andSql .= " and i.cod_item||c.descricao =  '$produto'";
            // }

            $em = $this->getEntityManager();
            
            $sql = "select distinct g.id_grupo_marca,
                            m.id_marca,
                            m.descricao as marca,
                            count(*) as skus
                    from ms.tb_estoque e,
                            ms.tb_item i,
                            ms.tb_categoria c,
                            ms.tb_item_categoria ic,
                            ms.tb_marca m,
                            ms.tb_grupo_marca g,
                            ms.empresa em
                    where e.id_item = i.id_item
                    and e.id_categoria = c.id_categoria
                    and e.id_item = ic.id_item
                    and e.id_categoria = ic.id_categoria
                    and ic.id_marca = m.id_marca
                    and m.id_grupo_marca = g.id_grupo_marca
                    and e.id_empresa = em.id_empresa
                    --and e.id_curva_abc = 'E'
                    and ( e.ultima_compra > add_months(sysdate, -6) or e.estoque > 0 )
                    $andSql
                    group by g.id_grupo_marca, m.id_marca, m.descricao
                    order by skus desc
            ";
            
            $conn = $em->getConnection();
            $stmt = $conn->prepare($sql);
            
            $stmt->execute();
            $results = $stmt->fetchAll();

            $hydrator = new ObjectProperty;
            $stdClass = new StdClass;
            $resultSet = new HydratingResultSet($hydrator, $stdClass);
            $resultSet->initialize($results);

            $data = array();
            foreach ($resultSet as $row) {
                $data[] = $hydrator->extract($row);
            }

            $this->setCallbackData($data);
            
        } catch (\Exception $e) {
            $this->setCallbackError($e->getMessage());
        }
        
        return $this->getCallbackModel();
    }

    public function listaritemAction()
    {
        $data = array();

        $emp        = $this->params()->fromQuery('emp',null);
        $dtinicio   = $this->params()->fromQuery('dtinicio',null);
        $dtfim      = $this->params()->fromQuery('dtfim',null);
        $dtinicioe  = $this->params()->fromQuery('dtinicioe',null);
        $dtfime     = $this->params()->fromQuery('dtfime',null);
        $nrnota     = $this->params()->fromQuery('nrnota',null);
        $inicio     = $this->params()->fromQuery('start',null);
        $final      = $this->params()->fromQuery('limit',null);

        $marca            = $this->params()->fromQuery('marca',null);
        $produto            = $this->params()->fromQuery('produto',null);
        $curva              = $this->params()->fromQuery('curva',null);
        $faixacli           = $this->params()->fromQuery('faixacli',null);
        $variaUltentrada    = $this->params()->fromQuery('variaUltentrada',null);
        $variaUltcusto      = $this->params()->fromQuery('variaUltcusto',null);
        $variaCustomedio    = $this->params()->fromQuery('variaCustomedio',null);
        $variaEmergmedio    = $this->params()->fromQuery('variaEmergmedio',null);
        $varia3mes          = $this->params()->fromQuery('varia3mes',null);
        $varia6mes          = $this->params()->fromQuery('varia6mes',null);
        $varia12mes         = $this->params()->fromQuery('varia12mes',null);
        
        try {

            $session = $this->getSession();
            $usuario = $session['info'];

            $andSql = '';
            $andSqlVar = '';
            if($emp  && $emp != "EC"){
                $andSql = " and em.apelido = '$emp'";
            }
            
            if($marca){
                $andSql .= " and m.id_marca in ($marca)";
            }

            if($dtinicio){
                $andSql .= " and trunc(c.data_emissao) >= '$dtinicio'";
            }

            if($dtfim){
                $andSql .= " and trunc(c.data_emissao) <= '$dtfim'";
            }

            if($dtinicioe){
                $andSql .= " and trunc(c.data_entrada) >= '$dtinicioe'";
            }

            if($dtfime){
                $andSql .= " and trunc(c.data_entrada) <= '$dtfime";
            }

            if($nrnota){
                $andSql .= " and c.numero_nota||'-'||c.serie_nota like '$nrnota%'";
            }

            if($produto){
                $andSql .= " and i.cod_item||ca.descricao =  '$produto'";
            }

            if($curva){
                $andSql .= " and e.id_curva_abc = '$curva'";
            }

            if($variaUltentrada){
                $andSqlVar = " and (case when custo_anterior > 0 then round(((custo_operacao/custo_anterior)-1)*100,2) end) >= $variaUltentrada";
            }

            if($variaUltcusto){
                $andSqlVar .= " and (case when custo_ult_ano_anterior > 0 then round(((custo_operacao/custo_ult_ano_anterior)-1)*100,2) end) >= $variaUltcusto";
            }

            if($variaCustomedio){
                $andSqlVar .= " and (case when custo_med_ano_anterior > 0 then round(((custo_operacao/custo_med_ano_anterior)-1)*100,2) end) >= $variaCustomedio";
            }

            if($variaEmergmedio){
                $andSqlVar .= " and (case when custo_med_e_ano_anterior > 0 then round(((custo_operacao/custo_med_e_ano_anterior)-1)*100,2) end) >= $variaEmergmedio";
            }

            if($varia3mes){
                $andSqlVar .= " and (case when custo_med_e_3m_anterior > 0 then round(((custo_operacao/custo_med_e_3m_anterior)-1)*100,2) end) >= $varia3mes";
            }
            if($varia6mes){
                $andSqlVar .= " and (case when custo_med_e_6m_anterior > 0 then round(((custo_operacao/custo_med_e_6m_anterior)-1)*100,2) end) >= $varia6mes";
            }
            if($varia12mes){
                $andSqlVar .= " and (case when custo_med_e_12m_anterior > 0 then round(((custo_operacao/custo_med_e_12m_anterior)-1)*100,2) end) >= $varia12mes";
            }

            if(!$andSql){
                $andSql = "and trunc(c.data_emissao) >= sysdate-30";
            }

            $em = $this->getEntityManager();
            $conn = $em->getConnection();
            
            $sql = "select emp,
                            id_operacao,
                            operacao,
                            data_emissao,
                            data_entrada,
                            cnpj,
                            nome,
                            numero_nota,
                            valor_nota,
                            marca,
                            cod_item,
                            descricao,
                            data_compra_anterior,
                            custo_anterior,
                            custo_operacao,
                            custo_resultante,
                            (case when custo_anterior > 0 then round(((custo_operacao/custo_anterior)-1)*100,2) end) as v_ope_anterior,
                            qtde_anterior, qtde_operacao, qtde_resultante,
                            custo_ult_ano_anterior,
                            (case when custo_ult_ano_anterior > 0 then round(((custo_operacao/custo_ult_ano_anterior)-1)*100,2) end) as v_ope_ult_ano_anterior,
                            custo_med_ano_anterior,
                            (case when custo_med_ano_anterior > 0 then round(((custo_operacao/custo_med_ano_anterior)-1)*100,2) end) as v_ope_med_ano_anterior,
                            custo_med_e_ano_anterior,
                            (case when custo_med_e_ano_anterior > 0 then round(((custo_operacao/custo_med_e_ano_anterior)-1)*100,2) end) as v_ope_med_e_ano_anterior,
                            custo_med_e_12m_anterior,
                            (case when custo_med_e_12m_anterior > 0 then round(((custo_operacao/custo_med_e_12m_anterior)-1)*100,2) end) as v_ope_med_e_12m_anterior,
                            custo_med_e_6m_anterior,
                            (case when custo_med_e_6m_anterior > 0 then round(((custo_operacao/custo_med_e_6m_anterior)-1)*100,2) end) as v_ope_med_e_6m_anterior,
                            custo_med_e_3m_anterior,
                            (case when custo_med_e_3m_anterior > 0 then round(((custo_operacao/custo_med_e_3m_anterior)-1)*100,2) end) as v_ope_med_e_3m_anterior
                                
                    from (
                        select em.apelido as emp,
                                c.id_operacao,
                                os.descricao as operacao,
                                trunc(c.data_emissao) as data_emissao,
                                trunc(c.data_entrada) as data_entrada,
                                c.id_pessoa as cnpj,
                                p.nome as nome,
                                c.numero_nota||'-'||c.serie_nota as numero_nota,
                                c.tot_nota as valor_nota,
                                m.descricao as marca,
                                i.cod_item||ca.descricao as cod_item,
                                i.descricao,
                                k.data_compra_anterior,
                                round(k.custo_anterior,2) as custo_anterior,
                                round(k.custo_operacao,2) as custo_operacao,
                                round(k.custo_resultante,2) as custo_resultante,
                                k.qtde_anterior, k.qtde_operacao, k.qtde_resultante,
                                pkg_help_variacao_custo.get_custo_ult_ano_ant(ci.id_empresa, ci.id_item, ci.id_categoria, ci.id_cardex_item) as custo_ult_ano_anterior,
                                pkg_help_variacao_custo.get_custo_med_ano_ant(ci.id_empresa, ci.id_item, ci.id_categoria, ci.id_cardex_item) as custo_med_ano_anterior,
                                pkg_help_variacao_custo.get_custo_med_e_ano_ant(ci.id_empresa, ci.id_item, ci.id_categoria, ci.id_cardex_item) as custo_med_e_ano_anterior,
                                pkg_help_variacao_custo.get_custo_med_e_12m_ant(ci.id_empresa, ci.id_item, ci.id_categoria, ci.id_cardex_item) as custo_med_e_12m_anterior,
                                pkg_help_variacao_custo.get_custo_med_e_6m_ant(ci.id_empresa, ci.id_item, ci.id_categoria, ci.id_cardex_item) as custo_med_e_6m_anterior,
                                pkg_help_variacao_custo.get_custo_med_e_3m_ant(ci.id_empresa, ci.id_item, ci.id_categoria, ci.id_cardex_item) as custo_med_e_3m_anterior
                                
                            from ms.cp_compra c,
                                ms.cp_compra_item ci,
                                (select id_empresa, id_cardex_item, id_item, id_categoria, 
                                        custo_anterior, custo_operacao, custo_resultante,
                                        qtde_anterior_estoque as qtde_anterior, qtde_operacao_estoque as qtde_operacao, qtde_saldo_estoque as qtde_resultante,
                                        trunc((select max(data_created) 
                                            from ms.cardex_item 
                                            where id_empresa = x.id_empresa 
                                            and id_item = x.id_item 
                                            and id_categoria = x.id_categoria
                                            and id_operacao = 1
                                            and status = 'A'
                                            and id_cardex_item < x.id_cardex_item)) as data_compra_anterior
                                    from ms.cardex_item x
                                    where status = 'A') k,
                                ms.pessoa p,
                                ms.empresa em,
                                ms.tb_item_categoria ic,
                                ms.tb_marca m,
                                ms.tb_item i,
                                ms.tb_categoria ca,
                                ms.ms_operacao_sistema os
                            where c.id_empresa = ci.id_empresa
                            and c.id_compra = ci.id_compra
                            and ci.id_empresa = k.id_empresa
                            and ci.id_cardex_item = k.id_cardex_item
                            and c.id_pessoa = p.id_pessoa
                            and c.id_empresa = em.id_empresa
                            and ci.id_item = ic.id_item 
                            and ci.id_categoria = ic.id_categoria
                            and ic.id_marca = m.id_marca
                            and ci.id_item = i.id_item
                            and ci.id_categoria = ca.id_categoria
                            and c.id_operacao = os.id_operacao
                            and c.id_operacao not in (10 /*Devolução de Venda*/, 45/*Entrada para analise de garantia*/, 14 /*Entrada Item em Transferencia*/, 50 /*Entrada para Reclassificac?o*/)
                            and m.descricao not in ('EMERGENCIAL')
                            $andSql
                            and trunc(c.data_emissao) >= '01/01/2020'
                            --and rownum < 100
                    )
                where emp is not null
                $andSqlVar
            ";

            $sql1 = "select count(*) as totalCount from ($sql)";
            $stmt = $conn->prepare($sql1);
            $stmt->execute();
            $resultCount = $stmt->fetchAll();

            $sql = "
                SELECT PGN.*
                  FROM (SELECT ROWNUM AS RNUM, PGN.*
                          FROM ($sql) PGN) PGN
                 WHERE RNUM BETWEEN " . ($inicio +1 ) . " AND " . ($inicio + $final) . "
            ";

            $stmt = $conn->prepare($sql);
            $stmt->execute();
            $results = $stmt->fetchAll();

            $hydrator = new ObjectProperty;
            $hydrator->addStrategy('valor_nota', new ValueStrategy);
            $hydrator->addStrategy('custo_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_operacao', new ValueStrategy);
            $hydrator->addStrategy('custo_resultante', new ValueStrategy);
            $hydrator->addStrategy('var_custo_ope_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_ult_ano_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_med_ano_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_med_e_ano_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_med_e_12m_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_med_e_6m_anterior', new ValueStrategy);
            $hydrator->addStrategy('custo_med_e_3m_anterior', new ValueStrategy);

            $hydrator->addStrategy('v_ope_ult_ano_anterior', new ValueStrategy);
            $hydrator->addStrategy('v_ope_med_ano_anterior', new ValueStrategy);
            $hydrator->addStrategy('v_ope_med_e_ano_anterior', new ValueStrategy);
            $hydrator->addStrategy('v_ope_med_e_12m_anterior', new ValueStrategy);
            $hydrator->addStrategy('v_ope_med_e_6m_anterior', new ValueStrategy);
            $hydrator->addStrategy('v_ope_med_e_3m_anterior', new ValueStrategy);
            $stdClass = new StdClass;
            $resultSet = new HydratingResultSet($hydrator, $stdClass);
            $resultSet->initialize($results);

            $data = array();
            foreach ($resultSet as $row) {
                $data[] = $hydrator->extract($row);
            }

            $this->setCallbackData($data);
            
        } catch (\Exception $e) {
            $this->setCallbackError($e->getMessage());
        }
        
        $objReturn = $this->getCallbackModel();

        $objReturn->total = $resultCount[0]['TOTALCOUNT'];

        return $objReturn;
    }

    public function listarCpCeAction()
    {
        $data = array();

        $emp        = $this->params()->fromQuery('emp',null);

        try {

            $session = $this->getSession();
            $usuario = $session['info'];


            $em = $this->getEntityManager();


            $sql = "
            ";

            $conn = $em->getConnection();
            $stmt = $conn->prepare($sql);
            
            $stmt->execute();
            $results = $stmt->fetchAll();

            $hydrator = new ObjectProperty;
            $stdClass = new StdClass;
            $resultSet = new HydratingResultSet($hydrator, $stdClass);
            $resultSet->initialize($results);

            $data = array();
            foreach ($resultSet as $row) {
                $data[] = $hydrator->extract($row);
            }

            $this->setCallbackData($data);
            
        } catch (\Exception $e) {
            $this->setCallbackError($e->getMessage());
        }
        
        return $this->getCallbackModel();
    }

}
