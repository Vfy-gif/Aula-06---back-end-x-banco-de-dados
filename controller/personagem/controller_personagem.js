/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model - do Personagem
 *              (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const personagemDAO = require('../../model/DAO/personagem.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna uma lista de Personagem
const listarPersonagem = async function () {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //Chama a função do DAO para retornar a lista de personagens
        let result = await personagemDAO.getSelectAllCharacter()

        if (result) {

            if (result.length > 0) {

                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.caracters = result

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

//Retorna um Personagem filtrando pelo ID
const buscarPersonagemId = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await personagemDAO.getSelectByIdCharacter(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.caracter = result

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

//Insere um novo Personagem
const inserirPersonagem = async function (personagem, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosPersonagem(personagem)
            if (!validarDados) {
                //Chama a função do DAO para inserir um novo Personagem
                let result = await personagemDAO.setInsertCharacter(personagem)

                if (result) {

                    //Chama a função para receber o ID gerado no BD
                    let lastIdCharacter = await personagemDAO.getSelectLastIdCharacter()

                    if (lastIdCharacter) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo BD
                        personagem.id = lastIdCharacter
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = personagem

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

//Atualiza um Personagem filtrando pelo ID
const atualizarPersonagem = async function (personagem, id, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosPersonagem(personagem)

            if (!validarDados) {

                let validarID = await buscarPersonagemId(id)

                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados do genero
                    personagem.id = parseInt(id)

                    let result = await personagemDAO.setUpdateCharacter(personagem)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = personagem

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da função de buscarPersonagemId (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados do Personagem 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.HEADER.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Apaga um Personagem filtrando pelo ID
const excluirPersonagem = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        let validarID = await buscarPersonagemId(id)

        if (validarID.status_code == 200) {

            let result = await personagemDAO.setDeleteCharacter(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarID //Retorno da função de buscarPersonagemId (400 ou 404 ou 500)
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Validação dos dados de cadastro do Personagem
const validarDadosPersonagem = async function (personagem) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (personagem.nome == '' || personagem.nome == null || personagem.nome == undefined || personagem.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (personagem.data_criacao == undefined || personagem.data_criacao == null || personagem.data_criacao.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA CRIACAO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (personagem.is_vivo == undefined || personagem.is_vivo != true && personagem.is_vivo != false) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [IS_VIVO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (personagem.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (personagem.foto == '' || personagem.foto == null || personagem.foto == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
    }
}

module.exports = {
    listarPersonagem,
    buscarPersonagemId,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem
}