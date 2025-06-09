const express = require('express');
const app = express(); // <--- Esta linha estava faltando

const { buscarClientes } = require('./src/DAO/cliente/buscarClientes.js');
const { buscarProduto } = require('./src/DAO/cliente/buscarProdutos.js');
const { buscarPedidos } = require('./src/DAO/cliente/buscarPedidos.js');
const { inserirProduto } = require('./src/DAO/cliente/addProduto.js');
const { inserirCliente } = require('./src/DAO/cliente/addCliente.js')
const { conexao, closeConexao, testarConexao } = require('./src/DAO/conexao');

// Middleware necessário para usar req.body com JSON
app.use(express.json());

app.get('/empresa_produtos_limpeza/v1', (req, res) => {
    res.json({ msg: "Aplicação Funcionando" });
});

app.get('/empresa_produtos_limpeza/v1/cliente', async (req, res) => {
    let clientes = await buscarClientes();
    res.json(clientes);
});

app.get('/empresa_produtos_limpeza/v1/produtos', async (req, res) => {
    let produtos = await buscarProduto();
    res.json(produtos);
});

app.get('/empresa_produtos_limpeza/v1/pedidos', async (req, res) => {
    let pedidos = await buscarPedidos();
    res.json(pedidos);
});

// Faltava importar ou declarar 'inserirCliente'

app.post('/empresa_produtos_limpeza/v2/cliente', async (req, res) => {
    const { codigo, telefone, nome, limite, id_endereco, id_status } = req.body;

    if (!codigo || !telefone || !nome || !limite || !id_endereco || !id_status) {
        return res.status(400).json({
            mensagem: "Dados incompletos: todos os campos são obrigatórios."
        });
    }

    const resultado = await inserirCliente(codigo, telefone, nome, limite, id_endereco, id_status);

    if (resultado.sucesso) {
        res.status(201).json({
            mensagem: "Cliente inserido com sucesso",
            id: resultado.idInserido
        });
    } else {
        res.status(500).json({
            mensagem: "Erro ao inserir cliente",
            erro: resultado.erro
        });
    }
});


app.post('/empresa_produtos_limpeza/v2/produto', async (req, res) => {
    const { id, nome } = req.body;

    if (!id || !nome) {
        return res.status(400).json({
            mensagem: "Dados incompletos: 'id' e 'nome' são obrigatórios."
        });
    }

    const resultado = await inserirProduto(id, nome);

    if (resultado.sucesso) {
        res.status(201).json({
            mensagem: "Produto inserido com sucesso",
            id: resultado.idInserido
        });
    } else {
        res.status(500).json({
            mensagem: "Erro ao inserir produto",
            erro: resultado.erro
        });
    }
});

const porta = 3000;

app.listen(porta, () => {
    console.log("Operando na porta " + porta);
    testarConexao();
});
