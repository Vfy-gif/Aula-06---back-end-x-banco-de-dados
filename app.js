/********************************************************************************************************************
 * Objetivo: Arquivo responsavel pelas requisições 
 * Data: 07/10/2025
 * Autor: Vitor Miguel Rodrigues Cezario
 * Versão: 1.0
 ********************************************************************************************************************/

//Import das dependencias
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//Cria um objeto especialista no formato JSON para receber os dados do body (POST E PUT)
const bodyParserJSON = bodyParser.json()

//Define a porta padrão da API, se for em um servidor de nuvem não temos acesso a porta
                // em execução local podemos definir uma porta livre
const PORT          = process.PORT || 7090

//Instancia na classe do express
const app = express()

//configurações do CORS
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') //IP de Origem
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') // Metodos (Verbos) do protocolo HTTP

    app.use(cors())
    next()  //Proximo
})

//Import das controller da API
const controllerFilme = require('./controller/filme/controller_filme.js')

//Endpoint para o CRUD de Filmes

//Retorna a lista de filmes
app.get('/v1/locadora/filme', cors(), async function (request, response){
    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.listarFilmes()

    response.status(filme.status_code)
    response.json(filme)
})

//Retorna a um filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response){

    //Recebe o ID enviado na requisição via parametro
    let idFilme = request.params.id

    //Chama a função da controller para retornar todos os filmes
    let filme = await controllerFilme.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
})

//Insere um novo Filme no BD
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o filme, enviamos os dados os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)

})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe os dados do body
    let dadosBody   = request.body

    //Recebe o id do filme encaminhado pela URL
    let idFilme     = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response){

    //Recebe o id do filme encaminhado pela URL
    let idFilme     = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})

app.listen(PORT, function(){
    console.log('API aguardando requisições!!!')
})