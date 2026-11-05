const db = require('../config/database');

class VeiculoRepository {
  async criar(veiculo) {
    const sql = `
      INSERT INTO veiculos (placa, modelo, marca, ano, cliente_id) 
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      veiculo.placa,
      veiculo.modelo,
      veiculo.marca,
      veiculo.ano,
      veiculo.cliente_id
    ]);
    return result.insertId;
  }

  async buscarPorPlaca(placa) {
    const sql = `SELECT * FROM veiculos WHERE placa = ?`;
    const [rows] = await db.execute(sql, [placa]);
    return rows[0];
  }

  async buscarPorId(id) {
    const sql = `SELECT * FROM veiculos WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  }

  async listarPorCliente(clienteId) {
    const sql = `SELECT * FROM veiculos WHERE cliente_id = ?`;
    const [rows] = await db.execute(sql, [clienteId]);
    return rows;
  }
}

module.exports = new VeiculoRepository();