const { conexao } = require('../conexao.js')

async function inseririten(id, id_pedido, id_produto, qnt) {
    const sql = `
        INSERT INTO tbl_itempedido (id, id_pedido, id_produto, qnt)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const conn = await conexao();
    try {
        const [resultado] = await conn.query(sql, [id, id_pedido, id_produto, qnt]);
        await conn.end();
        return { sucesso: true, idInserido: resultado.insertId };
    } catch (err) {
        return { sucesso: false, erro: err.message };
    }
}

module.exports = { inseririten }; 
