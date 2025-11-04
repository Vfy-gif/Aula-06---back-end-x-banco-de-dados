/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model - do Classificacao
 *              (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const classificacaoDAO = require('../../model/DAO/classificacao.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna uma lista de Classificacao
const listarClassificacao = async function () {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //Chama a função do DAO para retornar a lista de classificações
        let result = await classificacaoDAO.getSelectAllClassification()

        if (result) {

            if (result.length > 0) {

                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.classification = result

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

//Retorna um Classificacao filtrando pelo ID
const buscarClassificacaoId = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await classificacaoDAO.getSelectByIdClassification(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.classification = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [ID] invalido!!'
            return MESSAGE.ERROR_REQUIRED_FIELDS //400
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Insere um novo Classificacao
const inserirClassificacao = async function (classificacao, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosClassificacao(classificacao)
            if (!validarDados) {
                //Chama a função do DAO para inserir um novo Classificacao
                let result = await classificacaoDAO.setInsertClassification(classificacao)
                if (result) {

                    //Chama a função para receber o ID gerado no BD
                    let lastIdClassification = await classificacaoDAO.getSelectLastIdClassification()

                    if (lastIdClassification) {
                        //Adiciona no JSON de classificação o ID que foi gerado pelo BD
                        classificacao.id = lastIdClassification
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = classificacao
                        return MESSAGE.HEADER //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }

            } else {
                return validarDados //400
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.HEADER.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Atualiza um Classificacao filtrando pelo ID
const atualizarClassificacao = async function (classificacao, id, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosClassificacao(classificacao)

            if (!validarDados) {

                let validarID = await buscarClassificacaoId(id)

                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados da classificação
                    classificacao.id = parseInt(id)

                    let result = await classificacaoDAO.setUpdateClassification(classificacao)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = classificacao

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da função de buscarClassificacaoId (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados do Classificacao 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.HEADER.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Apaga um Classificacao filtrando pelo ID
const excluirClassificacao = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        let validarID = await buscarClassificacaoId(id)

        if (validarID.status_code == 200) {

            let result = await classificacaoDAO.setDeleteClassification(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarID //Retorno da função de buscarClassificacaoId (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Validação dos dados de cadastro do Classificacao
const validarDadosClassificacao = async function (classificacao) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (classificacao.nome == '' || classificacao.nome == null || classificacao.nome == undefined || classificacao.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (classificacao.sigla == '' || classificacao.sigla == null || classificacao.sigla == undefined || classificacao.sigla.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [SIGLA] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400
    } else {
        return false
    }
}

module.exports = {
    listarClassificacao,
    buscarClassificacaoId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}