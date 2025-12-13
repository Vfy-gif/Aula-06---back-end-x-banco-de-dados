/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL referente ao
 *              relacionamento entre diretor e filme
 * Data: 12/12/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os diretores que um filmes e diretors pode ter do banco de dados
const getSelectAllFilmsDiretors = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_diretor order by id_filme_diretor desc`

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

//Retorna um filmeDiretor filtrando pelo ID do banco de dados
const getSelectByIdFilmDiretor = async function (id) {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_diretor where id_filme_diretor=${id}`

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

//Retorna os diretors filtrando pelo ID do filme do banco de dados
const getSelectDiretorsByIdFilm = async function (idFilme) {
    try {
        //Script SQL
        let sql = `select tbl_diretor.id_diretor, tbl_diretor.nome
                        from tbl_filme
                                inner join tbl_filme_diretor
                                    on tbl_filme.id_filme = tbl_filme_diretor.id_filme
                                inner join tbl_diretor
                                    on tbl_diretor.id_diretor = tbl_filme_diretor.id_diretor
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

//Retorna os filmes filtrando pelo ID do diretor do banco de dados
const getSelectFilmsByIdDiretor = async function (idDiretor) {
    try {
        //Script SQL
        let sql = `select tbl_filme.id_filme, tbl_filme.nome
                        from tbl_filme
                                inner join tbl_filme_diretor
                                    on tbl_filme.id_filme = tbl_filme_diretor.id_filme
                                inner join tbl_diretor
                                    on tbl_diretor.id_diretor = tbl_filme_diretor.id_diretor
                        where tbl_diretor.id_diretor=${idDiretor}`

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
        let sql = `select id_filme_diretor from tbl_filme_diretor order by id_filme_diretor desc limit 1`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)){
            return Number(result[0].id_filme_diretor) 
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Insere um diretor de um filme no banco de dados
const setInsertFilmsDiretors = async function (filmeDiretor) {
    try {
        let sql = `INSERT INTO tbl_filme_diretor (id_filme, id_diretor) 
        VALUES(${filmeDiretor.id_filme}, ${filmeDiretor.id_diretor});`

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

//Atualiza um filme diretor existente no banco de dados filtrando pelo ID
const setUpdateFilmsDiretors = async function (filmeDiretor) {
    try {
        let sql = `UPDATE tbl_filme_diretor SET
                        id_filme            = ${filmeDiretor.id_filme},
                        id_diretor           = ${filmeDiretor.id_diretor}
                    WHERE id_filme_diretor = ${filmeDiretor.id}`

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

//Apaga um filme diretor existente no banco de dados filtrando pelo ID
const setDeleteFilmsDiretors = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id_filme_diretor=${id}`

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

//Apaga um filme diretor existente no banco de dados filtrando pelo ID
const setDeleteByIdDiretorsAndFilmeId = async function (idFilme) {
    try {
        let sql = `DELETE FROM tbl_filme_diretor WHERE id_filme=${idFilme}`

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
    getSelectAllFilmsDiretors,
    getSelectByIdFilmDiretor,
    getSelectDiretorsByIdFilm,
    getSelectFilmsByIdDiretor,
    getSelectLastID,
    setInsertFilmsDiretors,
    setUpdateFilmsDiretors,
    setDeleteFilmsDiretors,
    setDeleteByIdDiretorsAndFilmeId
}
