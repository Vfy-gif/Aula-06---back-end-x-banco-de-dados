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
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerAtor = require('./controller/ator/controller_ator.js')
const controllerProdutora = require('./controller/produtora/controller_produtora.js')
const controllerDiretor = require('./controller/diretor/controller_diretor.js')
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')

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

//Retorna a lista de generos
app.get('/v1/locadora/genero', cors(), async function (request, response) {

    let genero = await controllerGenero.listarGeneros()

    response.status(genero.status_code)
    response.json(genero)
})

//Retorna a um genero filtrando pelo ID
app.get('/v1/locadora/genero/:id', cors(), async function (request, response) {

    let IdGenero    = request.params.id

    let genero      = await controllerGenero.buscarGeneroId(IdGenero)

    response.status(genero.status_code)
    response.json(genero)
    
})

//Insere um novo Genero no BD
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function (request, response) {
    
    let dadosBody   = request.body

    let contentType = request.headers['content-type']

    let genero      = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)

})

app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function (request, response) {
    
    dadosBody   = request.body

    IdGenero    = request.params.id

    contentType = request.headers['content-type']

    genero      = await controllerGenero.atualizarGenero(dadosBody, IdGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)

})

app.delete('/v1/locadora/genero/:id', cors(), async function (request,response) {

    IdGenero = request.params.id

    genero   = await controllerGenero.excluirGenero(IdGenero)

    response.status(genero.status_code)
    response.json(genero)
    
})

//Retorna a lista de atores
app.get('/v1/locadora/ator', cors(), async function (request, response){
    //Chama a função da controller para retornar todos os filmes
    let ator = await controllerAtor.listarAtor()

    response.status(ator.status_code)
    response.json(ator)
})

//Retorna a um ator filtrando pelo ID
app.get('/v1/locadora/ator/:id', cors(), async function (request, response){

    //Recebe o ID enviado na requisição via parametro
    let idAtor = request.params.id

    //Chama a função da controller para retornar todos os Ator
    let ator = await controllerAtor.buscarAtorId(idAtor)
    response.status(ator.status_code)
    response.json(ator)
})

//Insere um novo Ator no BD
app.post('/v1/locadora/ator', cors(), bodyParserJSON, async function (request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o ator, enviamos os dados os dados do body e o content-type
    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code)
    response.json(ator)

})

app.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe os dados do body
    let dadosBody   = request.body

    //Recebe o id do ator encaminhado pela URL
    let idAtor     = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code)
    response.json(ator)
})

app.delete('/v1/locadora/ator/:id', cors(), async function (request, response){

    //Recebe o id do ator encaminhado pela URL
    let idAtor     = request.params.id

    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code)
    response.json(ator)
})

//Retorna a lista de Produtora
app.get('/v1/locadora/produtora', cors(), async function (request, response){
    //Chama a função da controller para retornar todos as produtoras
    let produtora = await controllerProdutora.listarProdutoras()

    response.status(produtora.status_code)
    response.json(produtora)
})

//Retorna uma produtora filtrando pelo ID
app.get('/v1/locadora/produtora/:id', cors(), async function (request, response){

    //Recebe o ID enviado na requisição via parametro
    let idProdutora = request.params.id

    //Chama a função da controller para retornar todos as produtoras
    let produtora = await controllerProdutora.buscarProdutoraId(idProdutora)
    response.status(produtora.status_code)
    response.json(produtora)
})

//Insere uma nova Produtora no BD
app.post('/v1/locadora/produtora', cors(), bodyParserJSON, async function (request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir a produtora, enviamos os dados os dados do body e o content-type
    let produtora = await controllerProdutora.inserirProdutora(dadosBody, contentType)

    response.status(produtora.status_code)
    response.json(produtora)

})

app.put('/v1/locadora/produtora/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe os dados do body
    let dadosBody   = request.body

    //Recebe o id da produtora encaminhado pela URL
    let idProdutora     = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let produtora = await controllerProdutora.atualizarProdutora(dadosBody, idProdutora, contentType)

    response.status(produtora.status_code)
    response.json(produtora)
})

app.delete('/v1/locadora/produtora/:id', cors(), async function (request, response){

    //Recebe o id da produtora encaminhado pela URL
    let idProdutora = request.params.id

    let produtora = await controllerProdutora.excluirProdutora(idProdutora)

    response.status(produtora.status_code)
    response.json(produtora)
})

//Retorna a lista de diretores
app.get('/v1/locadora/diretor', cors(), async function (request, response){
    //Chama a função da controller para retornar todos os filmes
    let diretor = await controllerDiretor.listarDiretores()

    response.status(diretor.status_code)
    response.json(diretor)
})

//Retorna a um diretor filtrando pelo ID
app.get('/v1/locadora/diretor/:id', cors(), async function (request, response){

    //Recebe o ID enviado na requisição via parametro
    let idDiretor = request.params.id

    //Chama a função da controller para retornar todos os Ator
    let diretor = await controllerDiretor.buscarDiretorId(idDiretor)
    response.status(diretor.status_code)
    response.json(diretor)
})

//Insere um novo Diretor no BD
app.post('/v1/locadora/diretor', cors(), bodyParserJSON, async function (request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o ator, enviamos os dados os dados do body e o content-type
    let diretor = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    response.status(diretor.status_code)
    response.json(diretor)

})

app.put('/v1/locadora/diretor/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe os dados do body
    let dadosBody   = request.body

    //Recebe o id do ator encaminhado pela URL
    let idDiretor     = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let diretor = await controllerAtor.atualizarAtor(dadosBody, idDiretor, contentType)

    response.status(diretor.status_code)
    response.json(diretor)
})

app.delete('/v1/locadora/diretor/:id', cors(), async function (request, response){

    //Recebe o id do ator encaminhado pela URL
    let idDiretor     = request.params.id

    let diretor = await controllerDiretor.excluirDiretor(idDiretor)

    response.status(diretor.status_code)
    response.json(diretor)
})

//Retorna a lista de personagens
app.get('/v1/locadora/personagem', cors(), async function (request, response){
    //Chama a função da controller para retornar todos os filmes
    let personagem = await controllerPersonagem.listarPersonagem()

    response.status(personagem.status_code)
    response.json(personagem)
})

//Retorna um personagem filtrando pelo ID
app.get('/v1/locadora/personagem/:id', cors(), async function (request, response){

    //Recebe o ID enviado na requisição via parametro
    let idPersonagem = request.params.id

    //Chama a função da controller para retornar todos os Personagem
    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)
    response.status(personagem.status_code)
    response.json(personagem)
})

//Insere um novo Personagem no BD
app.post('/v1/locadora/personagem', cors(), bodyParserJSON, async function (request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o personagem, enviamos os dados os dados do body e o content-type
    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code)
    response.json(personagem)

})

app.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe os dados do body
    let dadosBody   = request.body

    //Recebe o id do personagem encaminhado pela URL
    let idPersonagem     = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(personagem.status_code)
    response.json(personagem)
})

app.delete('/v1/locadora/personagem/:id', cors(), async function (request, response){

    //Recebe o id do personagem encaminhado pela URL
    let idPersonagem     = request.params.id

    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)

    response.status(personagem.status_code)
    response.json(personagem)
})


//Retorna a lista de classificação
app.get('/v1/locadora/classificacao', cors(), async function (request, response){
    //Chama a função da controller para retornar todos as classificações
    let classificacao = await controllerClassificacao.listarClassificacao()

    response.status(classificacao.status_code)
    response.json(classificacao)
})

//Retorna um classificação filtrando pelo ID
app.get('/v1/locadora/classificacao/:id', cors(), async function (request, response){

    //Recebe o ID enviado na requisição via parametro
    let idClassificacao = request.params.id

    //Chama a função da controller para retorna uma classificação pelo ID 
    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao)
    response.status(classificacao.status_code)
    response.json(classificacao)
})

//Insere um novo Classificação no BD
app.post('/v1/locadora/classificacao', cors(), bodyParserJSON, async function (request, response){
    //Recebe o objeto JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição
    let contentType = request.headers['content-type']

    //Chama a função da controller para inserir o personagem, enviamos os dados os dados do body e o content-type
    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)

})

app.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async function (request, response){
    //Recebe os dados do body
    let dadosBody   = request.body

    //Recebe o id do personagem encaminhado pela URL
    let idClassificacao     = request.params.id

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType)

    response.status(classificacao.status_code)
    response.json(classificacao)
})

app.delete('/v1/locadora/classificacao/:id', cors(), async function (request, response){

    //Recebe o id da classificação encaminhado pela URL
    let idClassificacao     = request.params.id

    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(classificacao.status_code)
    response.json(classificacao)
})




app.listen(PORT, function(){
    console.log('API aguardando requisições!!!')
})