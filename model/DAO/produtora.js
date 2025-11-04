/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da produtora do filme
 * Data: 29/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

const getSelectAllProducer = async function () {

    try {
        //Script SQL
        let sql = "select * from tbl_produtora order by id_produtora desc"

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}

const getSelectByIdProducer = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_produtora where id_produtora=${id}`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }

}

const getSelectLastIdProducer = async function () {

    try {

        let sql = "select id_produtora from tbl_produtora order by id_produtora desc limit 1"

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_produtora)
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const setInsertProducer = async function (produtora) {

    try {

        if (produtora.data_encerramento == null) {
            let sql = `insert into tbl_produtora (nome, data_criacao, data_encerramento, descricao) 
                        values('${produtora.nome}', '${produtora.data_criacao}', ${produtora.data_encerramento}, '${produtora.descricao}')`

            let result = await prisma.$queryRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        } else {
            let sql = `insert into tbl_produtora (nome, data_criacao, data_encerramento, descricao) 
                    values('${produtora.nome}', '${produtora.data_criacao}', '${produtora.data_encerramento}', '${produtora.descricao}')`

            let result = await prisma.$queryRawUnsafe(sql)

            if (result)
                return true
            else
                return false
        }


    } catch (error) {
        return false
    }
}

const setUpdateProducer = async function (produtora) {

    try {
        let sql = `UPDATE tbl_produtora SET 
                        nome                = '${produtora.nome}',
                        data_criacao        = '${produtora.data_criacao}',
                        data_encerramento   = '${produtora.data_encerramento}',
                        descricao           ='${produtora.descricao}'
                    WHERE id_produtora  = ${produtora.id}`

        // $executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

const setDeleteProducer = async function (id) {

    try {
        let sql = `DELETE FROM tbl_produtora WHERE id_produtora = ${id}`

        // $executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllProducer,
    getSelectByIdProducer,
    getSelectLastIdProducer,
    setInsertProducer,
    setUpdateProducer,
    setDeleteProducer
}