/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model - do ator
 *              (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const atorDAO = require('../../model/DAO/ator.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna uma lista de Ator
const listarAtor = async function () {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //Chama a função do DAO para retornar a lista de gêneros
        let result = await atorDAO.getSelectAllActor()

        if (result) {

            if (result.length > 0) {

                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.actors = result

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

//Retorna um Ator filtrando pelo ID
const buscarAtorId = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await atorDAO.getSelectByIdActor(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.actor = result

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

//Insere um novo Ator
const inserirAtor = async function (ator, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosAtor(ator)

            if (!validarDados) {
                if(ator.data_falecimento != null) {
                    ator.data_falecimento = `'${ator.data_falecimento}'`
                }

                //Chama a função do DAO para inserir um novo ator
                let result = await atorDAO.setInsertActor(ator)

                ator.data_falecimento = ator.data_falecimento.replace(/'/g, '')
                if (result) {

                    //Chama a função para receber o ID gerado no BD
                    let lastIdActor = await atorDAO.getSelectLastIdActor()

                    if (lastIdActor) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo BD
                        ator.id = lastIdActor
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = ator

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

//Atualiza um Ator filtrando pelo ID
const atualizarAtor = async function (ator, id, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosAtor(ator)

            if (!validarDados) {

                let validarID = await buscarAtorId(id)

                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados do genero
                    ator.id = parseInt(id)

                    let result = await atorDAO.setUpdateActor(ator)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = ator

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da função de buscarAtorId (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados do Ator 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.HEADER.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Apaga um Ator filtrando pelo ID
const excluirAtor = async function name(id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        let validarID = await buscarAtorId(id)

        if (validarID.status_code == 200) {

            let result = await atorDAO.setDeleteActor(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarID //Retorno da função de buscarGeneroId (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Validação dos dados de cadastro do Ator
const validarDadosAtor = async function (ator) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (ator.nome == '' || ator.nome == null || ator.nome == undefined || ator.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.data_nascimento == undefined || ator.data_nascimento == null || ator.data_nascimento.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA NASCIMENTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.data_falecimento == undefined || ator.data_falecimento.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA FALECIMENTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.is_ativo == undefined || ator.is_ativo != true && ator.is_ativo != false) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [IS_ATIVO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (ator.foto == '' || ator.foto == null || ator.foto == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
    }
}

module.exports = {
    listarAtor,
    buscarAtorId,
    inserirAtor,
    atualizarAtor,
    excluirAtor
}