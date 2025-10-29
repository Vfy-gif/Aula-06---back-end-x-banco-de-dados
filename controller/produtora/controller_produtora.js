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