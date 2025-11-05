/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL do personagem do filme
 * Data:  04/11/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os personagemes que um filme pode ter do banco de dados
const getSelectAllCharacter = async function () {

    try {
        //Script SQL
        let sql = "select * from tbl_personagem order by id_personagem desc"

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

const getSelectByIdCharacter = async function (id) {

    try {
        //Script SQL
        let sql = `select * from tbl_personagem where id_personagem=${id}`

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

const getSelectLastIdCharacter = async function () {
    try {

        let sql = "select id_personagem from tbl_personagem order by id_personagem desc limit 1"

        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result)) {
            return Number(result[0].id_personagem)
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const setInsertCharacter = async function (personagem) {

    try {

        let sql = `insert into tbl_personagem (nome, is_vivo, data_criacao, biografia, foto) 
                        values('${personagem.nome}',${personagem.is_vivo}, '${personagem.data_criacao}', '${personagem.biografia}', '${personagem.foto}')`
        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateCharacter = async function (personagem) {

    try {

        let sql = `update tbl_personagem set 
                            nome                = '${personagem.nome}',
                            is_vivo            = ${personagem.is_vivo},
                            data_criacao     = '${personagem.data_criacao}',
                            biografia           = '${personagem.biografia}',
                            foto                = '${personagem.foto}'
                            where id_personagem       = ${personagem.id}`

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

const setDeleteCharacter = async function (id) {

    try {

        let sql = `delete from tbl_personagem where id_personagem=${id}`

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
    getSelectAllCharacter,
    getSelectByIdCharacter,
    getSelectLastIdCharacter,
    setInsertCharacter,
    setUpdateCharacter,
    setDeleteCharacter
}
