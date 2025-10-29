/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model - da produtora
 *              (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 29/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const produtoraDAO = require('../../model/DAO/produtora.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna uma lista de filmes
const listarProdutoras = async function () {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //Chama a função do DAO para retornar a lista de filmes
        let result = await produtoraDAO.getSelectAllProducer()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status               = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code          = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.producers   = result

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna um filme filtrando pelo ID
const buscarProdutoraId = async function (id) {
    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            //Chama a função para filtrar pelo ID
            let result = await produtoraDAO.getSelectByIdProducer(parseInt(id))
            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.producer = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] invalido!!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}



module.exports = {
    listarProdutoras,
    buscarProdutoraId
}