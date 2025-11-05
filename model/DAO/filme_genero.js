/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela realização do CRUD de filme no Banco de Dados MySQL referente ao
 *              relacionamento entre gênero e filme
 * Data: 05/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import da biblioteca do PrismaClient
const { PrismaClient } = require('../../generated/prisma')

//Cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

//Retorna todos os gêneros que um filmes e generos pode ter do banco de dados
const getSelectAllFilmsGenres = async function () {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_genero order by id_filme_genero desc`

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

//Retorna um filmeGenero filtrando pelo ID do banco de dados
const getSelectByIdFilmGenre = async function (id) {
    try {
        //Script SQL
        let sql = `select * from tbl_filme_genero where id_filme_genero=${id}`

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

//Retorna os generos filtrando pelo ID do filme do banco de dados
const getSelectGenresByIdFilm = async function (idFilme) {
    try {
        //Script SQL
        let sql = `select tbl_genero.id_genero, tbl_genero.nome
                        from tbl_filme
                                inner join tbl_filme_genero
                                    on tbl_filme.id_filme = tbl_filme_genero.id_filme
                                inner join tbl_genero
                                    on tbl_genero.id_genero = tbl_filme_genero.id_genero
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

//Retorna os filmes filtrando pelo ID do genero do banco de dados
const getSelectFilmsByIdGenre = async function (idGenero) {
    try {
        //Script SQL
        let sql = `select tbl_filme.id_filme, tbl_filme.nome
                        from tbl_filme
                                inner join tbl_filme_genero
                                    on tbl_filme.id_filme = tbl_filme_genero.id_filme
                                inner join tbl_genero
                                    on tbl_genero.id_genero = tbl_filme_genero.id_genero
                        where tbl_genero.id_genero=${idGenero}`

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
        let sql = `select id_filme_genero from tbl_filme_genero order by id_filme_genero desc limit 1`

        //Executa no BD o script SQL
        let result = await prisma.$queryRawUnsafe(sql)

        //Validação para identificar se o retorno do BD é um ARRAY (vazio ou com dados)
        if (Array.isArray(result)){
            return Number(result[0].id_filme_genero) 
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

//Insere um gênero de um filme no banco de dados
const setInsertFilmsGenres = async function (filmeGenero) {
    try {
        let sql = `INSERT INTO tbl_filme_genero (id_filme, id_genero) 
        VALUES(${filmeGenero.id_filme}, ${filmeGenero.id_genero});`

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

//Atualiza um filme genero existente no banco de dados filtrando pelo ID
const setUpdateFilmsGenres = async function (filmeGenero) {
    try {
        let sql = `UPDATE tbl_filme_genero SET
                        id_filme            = ${filmeGenero.id_filme},
                        id_genero           = ${filmeGenero.id_genero}
                    WHERE id_filme_genero = ${filmeGenero.id}`

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

//Apaga um filme genero existente no banco de dados filtrando pelo ID
const setDeleteFilmsGenres = async function (id) {
    try {
        let sql = `DELETE FROM tbl_filme_genero WHERE id_filme_genero=${id}`

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
    getSelectAllFilmsGenres,
    getSelectByIdFilmGenre,
    getSelectGenresByIdFilm,
    getSelectFilmsByIdGenre,
    getSelectLastID,
    setInsertFilmsGenres,
    setUpdateFilmsGenres,
    setDeleteFilmsGenres
}
