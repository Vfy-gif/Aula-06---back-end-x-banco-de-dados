/********************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o APP e a Model - do Diretor
 *              (Validações, tratamento de dados, tratamento de erros, etc)
 * Data: 22/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import do arquivo DAO para manipular o CRUD no BD
const diretorDAO = require('../../model/DAO/diretor.js')

//Import do arquivo que padroniza todas as mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

//Retorna uma lista de Diretores
const listarDiretores = async function () {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //Chama a função do DAO para retornar a lista de diretores
        let result = await diretorDAO.getSelectAllDiretor()

        if (result) {

            if (result.length > 0) {

                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.directors = result

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

//Retorna um Diretor filtrando pelo ID
const buscarDiretorId = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //Validação de campo obrigatório
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            //Chama a função para filtrar pelo ID
            let result = await diretorDAO.getSelectByIdDiretor(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.director = result

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

//Insere um novo Diretor
const inserirDiretor = async function (diretor, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosDiretor(diretor)
            if (!validarDados) {
                //Chama a função do DAO para inserir um novo Diretor
                let result = await diretorDAO.setInsertDiretor(diretor)

                if (result) {

                    //Chama a função para receber o ID gerado no BD
                    let lastIdDiretor = await diretorDAO.getSelectLastIdDiretor()

                    if (lastIdDiretor) {
                        //Adiciona no JSON de filme o ID que foi gerado pelo BD
                        diretor.id = lastIdDiretor
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = diretor

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

//Atualiza um Diretor filtrando pelo ID
const atualizarDiretor = async function (diretor, id, contentType) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosDiretor(diretor)

            if (!validarDados) {

                let validarID = await buscarDiretorId(id)

                if (validarID.status_code == 200) {

                    //Adicionando o ID no JSON com os dados do genero
                    diretor.id = parseInt(id)

                    let result = await diretorDAO.setUpdateDiretor(diretor)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = diretor

                        return MESSAGE.HEADER //200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarID //Retorno da função de buscarDiretorId (400 ou 404 ou 500)
                }
            } else {
                return validarDados //Retorno da função de validar dados do Diretor 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return MESSAGE.HEADER.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//Apaga um Diretor filtrando pelo ID
const excluirDiretor = async function (id) {

    //Realizando uma cópia do objeto MESSAGE_DEFAULT, permitindo que as alterações desta função
    //não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        let validarID = await buscarDiretorId(id)

        if (validarID.status_code == 200) {

            let result = await diretorDAO.setDeleteDiretor(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETE_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETE_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETE_ITEM.message

                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return validarID //Retorno da função de buscarDiretorId (400 ou 404 ou 500)
        }

    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Validação dos dados de cadastro do Diretor
const validarDadosDiretor = async function (diretor) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (diretor.nome == '' || diretor.nome == null || diretor.nome == undefined || diretor.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [NOME] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento == null || diretor.data_nascimento.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA NASCIMENTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (diretor.data_falecimento !== null && diretor.data_falecimento !== undefined && diretor.data_falecimento.length > 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [DATA FALECIMENTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (diretor.is_ativo == undefined || diretor.is_ativo != true && diretor.is_ativo != false) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [IS_ATIVO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (diretor.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [BIOGRAFIA] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else if (diretor.foto == '' || diretor.foto == null || diretor.foto == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'Atributo [FOTO] invalido!!!'
        return MESSAGE.ERROR_REQUIRED_FIELDS //400

    } else {
        return false
    }
}

module.exports = {
    listarDiretores,
    buscarDiretorId,
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor
}