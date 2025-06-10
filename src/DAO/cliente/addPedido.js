const { conexao } = require('../conexao.js')

async function inserirPedido(numero, data_elaboracao, cliente) {
    const sql = `
INSERT INTO tbl_pedido (numero, data_elaboracao, cliente_id) VALUES`;

    const conn = await conexao();
    try {
        const [resultado] = await conn.query(sql, [numero, data_elaboracao, cliente]);
        await conn.end();
        return { sucesso: true, idInserido: resultado.insertId };
    } catch (err) {
        return { sucesso: false, erro: err.message };
    }
}

module.exports = { inserirPedido };