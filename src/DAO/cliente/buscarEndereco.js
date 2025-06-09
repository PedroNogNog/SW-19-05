const {conexao} = require('../conexao.js')


async function buscarEndereco(){
    const sql = `select * from tbl_endereco;`
    
    const conn = await conexao()
    try {
        // Executar a consulta
        const [rows, fields] = await conn.query(sql);
        await conn.end()
        return rows
      } catch (err) {
        return err.message
      }
}

module.exports = {buscarEndereco}