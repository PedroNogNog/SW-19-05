const { conexao } = require('../conexao.js')

async function inserirStatus(id, nome,) {
    const sql = `
INSERT INTO tbl_status (id, nome) VALUES`;

    const conn = await conexao();
    try {
        const [resultado] = await conn.query(sql, [id, nome]);
        await conn.end();
        return { sucesso: true, idInserido: resultado.insertId };
    } catch (err) {
        return { sucesso: false, erro: err.message };
    }
}

module.exports = { inserirStatus };