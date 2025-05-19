const express = require('express')
const { buscarClientes } = require('./src/DAO/cliente/buscarClientes.js')
const { buscarProduto } = require('./src/DAO/cliente/buscarProdutos.js')
const { buscarPedidos } = require('./src/DAO/cliente/buscarPedidos.js')
const app = express()
const {conexao, closeConexao,testarConexao} = require('./src/DAO/conexao') 


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

app.get('/empresa_produtos_limpeza/v1/produtos', async (req, res) =>{
    let clientes = await buscarProduto()
    res.json(clientes)
})

app.get('/empresa_produtos_limpeza/v1/pedidos', async (req, res) =>{
    let clientes = await buscarPedidos()
    res.json(clientes)
})



const porta = 3000

app.listen(porta, () =>{
    console.log("Operando na porta " + porta),
    testarConexao
})
