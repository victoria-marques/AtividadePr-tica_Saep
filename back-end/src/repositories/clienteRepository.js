const db = require('../config/database');

class ClienteRepository {
  async criar(cliente) {
    const sql = `
      INSERT INTO clientes (nome, email, cpf, telefone) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      cliente.nome,
      cliente.email,
      cliente.cpf,
      cliente.telefone
    ]);
    return result.insertId;
  }

  async buscarPorId(id) {
    const sql = `SELECT * FROM clientes WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  async buscarPorCpf(cpfCriptografado) {
    const sql = `SELECT * FROM clientes WHERE cpf = ?`;
    const [rows] = await db.execute(sql, [cpfCriptografado]);
    return rows[0];
  }

  async listar(nomeFiltro) {
    let sql = `SELECT id, nome, email, telefone FROM clientes`;
    const params = [];

    if (nomeFiltro) {
      sql += ` WHERE nome LIKE ?`;
      params.push(`%${nomeFiltro}%`);
    }

    const [rows] = await db.execute(sql, params);
    return rows;
  }
}

module.exports = new ClienteRepository();