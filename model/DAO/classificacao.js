/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL do classificacao do filme
 * Data: 04/11/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os personagemes que um filme pode ter do banco de dados
const getSelectAllClassification = async function () {

    try {
        //Script SQL
        let sql = "select * from tbl_classificacao order by id_classificacao desc"

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

const getSelectByIdClassification = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_classificacao where id_classificacao=${id}`

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

const getSelectLastIdClassification = async function () {
    try {

        let sql = "select id_classificacao from tbl_classificacao order by id_classificacao desc limit 1"

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_classificacao)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const setInsertClassification = async function (classificacao) {

    try {

        let sql = `insert into tbl_classificacao (nome, sigla) 
                        values('${classificacao.nome}', '${classificacao.sigla}')`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateClassification = async function (classificacao) {

    try {

        let sql = `UPDATE tbl_classificacao SET 
                        nome            = '${classificacao.nome}',
                        sigla           = '${classificacao.sigla}'
                    WHERE id_classificacao = ${classificacao.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const setDeleteClassification = async function (id) {

    try {

        let sql = `delete from tbl_classificacao where id_classificacao=${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

module.exports = {
    getSelectAllClassification,
    getSelectByIdClassification,
    getSelectLastIdClassification,
    setInsertClassification,
    setUpdateClassification,
    setDeleteClassification
}
