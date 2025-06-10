const { conexao } = require('../conexao.js')

async function inserirEndereço(id, lagradouro, cep, nomero, bairro, cidade) {
    const sql = `
       INSERT INTO tbl_endereco (id, logradouro, cep, numero, bairro,  cidade) VALUES (?, ?, ?, ?, ?, ?)`;

    const conn = await conexao();
    try {
        const [resultado] = await conn.query(sql, [id, lagradouro, cep, nomero, bairro, cidade]);
        await conn.end();
        return { sucesso: true, idInserido: resultado.insertId };
    } catch (err) {
        return { sucesso: false, erro: err.message };
    }
}

module.exports = { inserirEndereço }; 