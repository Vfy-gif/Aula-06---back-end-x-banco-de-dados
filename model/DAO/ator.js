/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL do ator do filme
 * Data: 22/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os atores que um filme pode ter do banco de dados
const getSelectAllActor = async function () {

    try {
        //Script SQL
        let sql = "select * from tbl_ator order by id_ator desc"

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

const getSelectByIdActor = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_ator where id_ator=${id}`

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

const getSelectLastIdActor = async function () {
    try {

        let sql = "select id_ator from tbl_ator order by id_ator desc limit 1"

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_ator)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const setInsertActor = async function (ator) {

    try {

        if (ator.data_falecimento == null) {
            let sql = `insert into tbl_ator (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) 
                        values('${ator.nome}', '${ator.data_nascimento}', ${ator.data_falecimento}, ${ator.is_ativo}, '${ator.biografia}', '${ator.foto}')`
            let result = await prisma.$queryRawUnsafe(sql)

            if (result)
                return true
            else
                return false

        } else {
            let sql = `insert into tbl_ator (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) 
                        values('${ator.nome}', '${ator.data_nascimento}', '${ator.data_falecimento}', ${ator.is_ativo}, '${ator.biografia}', '${ator.foto}')`
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

const setUpdateActor = async function (ator) {

    try {

        if (ator.data_falecimento == null) {
            let sql = `update tbl_ator set 
                            nome                = '${ator.nome}',
                            data_nascimento     = '${ator.data_nascimento}',
                            data_falecimento    = ${ator.data_falecimento},
                            is_ativo            = ${ator.is_ativo},
                            biografia           = '${ator.biografia}',
                            foto                = '${ator.foto}'
                            where id_ator       = ${ator.id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                return true
            } else {
                return false
            }
        } else {
            let sql = `update tbl_ator set 
                            nome                = '${ator.nome}',
                            data_nascimento     = '${ator.data_nascimento}',
                            data_falecimento    = '${ator.data_falecimento}',
                            is_ativo            = ${ator.is_ativo},
                            biografia           = '${ator.biografia}',
                            foto                = '${ator.foto}'
                            where id_ator       = ${ator.id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                return true
            } else {
                return false
            }
        }

    } catch (error) {
        return false
    }

}

const setDeleteActor = async function (id) {

    try {

        let sql = `delete from tbl_ator where id_ator = ${id}`

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
    getSelectAllActor,
    getSelectByIdActor,
    getSelectLastIdActor,
    setInsertActor,
    setUpdateActor,
    setDeleteActor
}
