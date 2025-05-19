const express = require('express')
const { buscarClientes } = require('./src/DAO/cliente/buscarClientes.js')
const app = express()
const {conexao, closeConexao, testarConexao} = require('./src/DAO/conexao.js')

app.get('/empresa_produtos_limpeza/v1', (req, res) => {
    let respInicial = {
        msg: "Aplicação Funcionando"
    }
    res.json(respInicial)
})

app.get('/empresa_produtos_limpeza/v1/cliente', async (req, res) =>{
    let clientes = await buscarClientes()
    res.json(clientes)
})

const porta = 3000

app.listen(porta, () =>{
    console.log("Operando na porta " + porta),
    testarConexao()

})