const agendamentoRepository = require('../repositories/AgendamentoRepository');
const veiculoRepository = require('../repositories/VeiculoRepository');

class AgendamentoService {
  async criarAgendamento(dadosAgendamento) {
    const { data_hora, descricao_servico, veiculo_id } = dadosAgendamento;

    if (!data_hora || !veiculo_id) {
      throw new Error('Data/Hora e Veículo são obrigatórios.');
    }

    // 1. Regra de Negócio: Validar que o veículo existe e tem cliente associado
    const veiculo = await veiculoRepository.buscarPorId(veiculo_id);
    if (!veiculo || !veiculo.cliente_id) {
      throw new Error('Agendamento negado: O veículo informado deve possuir um cliente vinculado.');
    }

    // 2. Regra de Negócio: Prevenção de conflito e perda de horários na oficina
    const horarioOcupado = await agendamentoRepository.buscarHorarioOcupado(data_hora);
    if (horarioOcupado) {
      throw new Error('Conflito de agendamento: Este horário já está reservado para outro atendimento.');
    }

    const agendamentoId = await agendamentoRepository.criar({
      data_hora,
      descricao_servico,
      status: 'AGENDADO',
      veiculo_id
    });

    return { id: agendamentoId, mensagem: 'Agendamento confirmado com sucesso.' };
  }

  async listarAgendamentos() {
    return await agendamentoRepository.listar();
  }
}

module.exports = new AgendamentoService();