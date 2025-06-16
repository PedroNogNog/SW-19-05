const { conexao } = require('../conexao.js')

async function inserirCliente(codigo, telefone, nome, limite, id_endereco, id_status) {
    const sql = `
        INSERT INTO tbl_cliente (codigo, telefone, nome, limite, id_endereco, id_status) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const conn = await conexao();
    try {
        const [resultado] = await conn.query(sql, [codigo, telefone, nome, limite, id_endereco, id_status]);
        await conn.end();
        return { sucesso: true, idInserido: resultado.insertId };
    } catch (err) {
        return { sucesso: false, erro: err.message };
    }
}

module.exports = { inserirCliente }; 
