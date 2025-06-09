const { conexao } = require('../conexao.js')

async function inserirProduto(codigo, nome, id_categoria, preco) {
    const sql = `
        INSERT INTO tbl_produtos (codigo, nome, id_categoria, preco)
        VALUES (?, ?, ?, ?);
    `;

    const conn = await conexao();
    try {
        const [resultado] = await conn.query(sql, [codigo, nome, id_categoria, preco]);
        return { sucesso: true, idInserido: resultado.insertId };
    } catch (err) {
        return { sucesso: false, erro: err.message };
    } finally {
        await conn.end();
    }
}

module.exports = { inserirProduto }; 