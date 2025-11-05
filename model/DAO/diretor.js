/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL da diretor do filme
 * Data:  04/11/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

const getSelectAllDiretor = async function () {

    try {
        //Script SQL
        let sql = "select * from tbl_diretor order by id_diretor desc"

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

const getSelectByIdDiretor = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_diretor where id_diretor=${id}`

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

const getSelectLastIdDiretor = async function () {

    try {

        let sql = "select id_diretor from tbl_diretor order by id_diretor desc limit 1"

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_diretor)
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

const setInsertDiretor = async function (diretor) {

    try {

        if (diretor.data_falecimento == null) {
            let sql = `insert into tbl_diretor (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) 
                        values('${diretor.nome}', '${diretor.data_nascimento}', ${diretor.data_falecimento}, ${diretor.is_ativo}, '${diretor.biografia}', '${diretor.foto}')`
            let result = await prisma.$queryRawUnsafe(sql)

            if (result)
                return true
            else
                return false

        } else {
            let sql = `insert into tbl_diretor (nome, data_nascimento, data_falecimento, is_ativo, biografia, foto) 
                        values('${diretor.nome}', '${diretor.data_nascimento}', '${diretor.data_falecimento}', ${diretor.is_ativo}, '${diretor.biografia}', '${diretor.foto}')`
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

const setUpdateDiretor = async function (diretor) {

    try {

        if (diretor.data_falecimento == null) {
            let sql = `update tbl_diretor set 
                            nome                = '${diretor.nome}',
                            data_nascimento     = '${diretor.data_nascimento}',
                            data_falecimento    = ${diretor.data_falecimento},
                            is_ativo            = ${diretor.is_ativo},
                            biografia           = '${diretor.biografia}',
                            foto                = '${diretor.foto}'
                            where id_diretor       = ${diretor.id}`

            let result = await prisma.$executeRawUnsafe(sql)

            if (result) {
                return true
            } else {
                return false
            }
        } else {
            let sql = `update tbl_diretor set 
                            nome                = '${diretor.nome}',
                            data_nascimento     = '${diretor.data_nascimento}',
                            data_falecimento    = '${diretor.data_falecimento}',
                            is_ativo            = ${diretor.is_ativo},
                            biografia           = '${diretor.biografia}',
                            foto                = '${diretor.foto}'
                            where id_diretor       = ${diretor.id}`

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

const setDeleteDiretor = async function (id) {

    try {
        let sql = `DELETE FROM tbl_diretor WHERE id_diretor = ${id}`

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
    getSelectAllDiretor,
    getSelectByIdDiretor,
    getSelectLastIdDiretor,
    setInsertDiretor,
    setUpdateDiretor,
    setDeleteDiretor
}