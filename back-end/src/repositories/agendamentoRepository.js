const db = require('../config/database');

class AgendamentoRepository {
  async criar(agendamento) {
    const sql = `
      INSERT INTO agendamentos (data_hora, descricao_servico, status, veiculo_id) 
      VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [
      agendamento.data_hora,
      agendamento.descricao_servico,
      agendamento.status,
      agendamento.veiculo_id
    ]);
    return result.insertId;
  }

  async buscarPorVeiculoEHorario(veiculoId, dataHora) {
    const sql = `
      SELECT * FROM agendamentos 
      WHERE veiculo_id = ? AND data_hora = ? AND status != 'CANCELADO'
    `;
    const [rows] = await db.execute(sql, [veiculoId, dataHora]);
    return rows[0];
  }

  async buscarHorarioOcupado(dataHora) {
    const sql = `
      SELECT * FROM agendamentos 
      WHERE data_hora = ? AND status != 'CANCELADO'
    `;
    const [rows] = await db.execute(sql, [dataHora]);
    return rows[0];
  }

  async listar() {
    const sql = `
      SELECT a.id, a.data_hora, a.descricao_servico, a.status, v.placa, v.modelo 
      FROM agendamentos a
      JOIN veiculos v ON a.veiculo_id = v.id
      ORDER BY a.data_hora ASC
    `;
    const [rows] = await db.execute(sql);
    return rows;
  }
}

module.exports = new AgendamentoRepository();