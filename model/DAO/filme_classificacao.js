/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL referente ao
 *              relacionamento entre classificação e filme
 * Data: 12/12/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os classificaçãos que um filmes e classificacaos pode ter do banco de dados
const getSelectAllFilmsClassifications = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_classificacao order by id_filme_classificacao desc`

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

//Retorna um filmeclassificacao filtrando pelo ID do banco de dados
const getSelectByIdFilmClassification = async function (id) {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_classificacao where id_filme_classificacao=${id}`

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

//Retorna os classificacaos filtrando pelo ID do filme do banco de dados
const getSelectClassificationsByIdFilm = async function (idFilme) {
    try {
        //Script SQL
        let sql = `select tbl_classificacao.id_classificacao, tbl_classificacao.nome
                        from tbl_filme
                                inner join tbl_filme_classificacao
                                    on tbl_filme.id_filme = tbl_filme_classificacao.id_filme
                                inner join tbl_classificacao
                                    on tbl_classificacao.id_classificacao = tbl_filme_classificacao.id_classificacao
                        where tbl_filme.id_filme=${idFilme}`

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

//Retorna os filmes filtrando pelo ID do classificacao do banco de dados
const getSelectFilmsByIdClassification = async function (idClassificacao) {
    try {
        //Script SQL
        let sql = `select tbl_filme.id_filme, tbl_filme.nome
                        from tbl_filme
                                inner join tbl_filme_classificacao
                                    on tbl_filme.id_filme = tbl_filme_classificacao.id_filme
                                inner join tbl_classificacao
                                    on tbl_classificacao.id_classificacao = tbl_filme_classificacao.id_classificacao
                        where tbl_classificacao.id_classificacao=${idClassificacao}`

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

//Retorna o último ID gerado no BD
const getSelectLastID = async function () {
    try {
        //Script SQL
        let sql = `select id_filme_classificacao from tbl_filme_classificacao order by id_filme_classificacao desc limit 1`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)){
            return Number(result[0].id_filme_classificacao) 
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Insere um classificação de um filme no banco de dados
const setInsertFilmsClassifications = async function (filmeClassificacao) {
    try {
        let sql = `INSERT INTO tbl_filme_classificacao (id_filme, id_classificacao) 
        VALUES(${filmeClassificacao.id_filme}, ${filmeClassificacao.id_classificacao});`

        // $executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Atualiza um filme classificacao existente no banco de dados filtrando pelo ID
const setUpdateFilmsClassifications = async function (filmeClassificacao) {
    try {
        let sql = `UPDATE tbl_filme_classificacao SET
                        id_filme            = ${filmeClassificacao.id_filme},
                        id_classificacao           = ${filmeClassificacao.id_classificacao}
                    WHERE id_filme_classificacao = ${filmeClassificacao.id}`

        // $executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Apaga um filme classificacao existente no banco de dados filtrando pelo ID
const setDeleteFilmsClassifications = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_classificacao WHERE id_filme_classificacao=${id}`

        // $executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

//Apaga um filme classificacao existente no banco de dados filtrando pelo ID
const setDeleteByIdClassificationsAndFilmeId = async function (idFilme) {
    try {
        let sql = `DELETE FROM tbl_filme_classificacao WHERE id_filme=${idFilme}`

        // $executeRawUnsafe() -> Permite apenas executar scripts SQL que não tem retorno de dados (INSERT, UPDATE, DELETE)
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllFilmsClassifications,
    getSelectByIdFilmClassification,
    getSelectClassificationsByIdFilm,
    getSelectFilmsByIdClassification,
    getSelectLastID,
    setInsertFilmsClassifications,
    setUpdateFilmsClassifications,
    setDeleteFilmsClassifications,
    setDeleteByIdClassificationsAndFilmeId
}
