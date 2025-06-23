const {conexao} = require('../conexao.js')


async function buscarPedidos(){
    const sql = `select * from tbl_pedido;`
    
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

module.exports = {buscarPedidos}
