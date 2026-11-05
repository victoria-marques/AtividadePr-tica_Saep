const veiculoRepository = require('../repositories/VeiculoRepository');
const clienteRepository = require('../repositories/ClienteRepository');

class VeiculoService {
  async cadastrarVeiculo(dadosVeiculo) {
    const { placa, modelo, marca, ano, cliente_id } = dadosVeiculo;

    if (!placa || !modelo || !cliente_id) {
      throw new Error('Placa, modelo e cliente_id são obrigatórios.');
    }

    // Regra de Negócio: Validar obrigatoriamente se o veículo tem um cliente associado válido
    const cliente = await clienteRepository.buscarPorId(cliente_id);
    if (!cliente) {
      throw new Error('Não é possível cadastrar um veículo sem um cliente válido associado.');
    }

    // Validação de duplicidade de veículo
    const veiculoExistente = await veiculoRepository.buscarPorPlaca(placa);
    if (veiculoExistente) {
      throw new Error('Já existe um veículo cadastrado com esta placa.');
    }

    const veiculoId = await veiculoRepository.criar({
      placa: placa.toUpperCase(),
      modelo,
      marca,
      ano,
      cliente_id
    });

    return { id: veiculoId, mensagem: 'Veículo vinculado ao cliente com sucesso.' };
  }

  async listarPorCliente(clienteId) {
    const cliente = await clienteRepository.buscarPorId(clienteId);
    if (!cliente) {
      throw new Error('Cliente não encontrado.');
    }
    return await veiculoRepository.listarPorCliente(clienteId);
  }
}

module.exports = new VeiculoService();