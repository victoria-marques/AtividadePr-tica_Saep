const crypto = require('crypto');
const clienteRepository = require('../repositories/ClienteRepository');

const ALGORITMO = 'aes-256-cbc';
const CHAVE_SECRETA = Buffer.from(process.env.LGPD_SECRET_KEY, 'hex'); // 32 bytes

class ClienteService {
  // Regra de Proteção de Dados (LGPD): Criptografia de CPF
  criptografarCPF(cpf) {
    const cpfLimpo = cpf.replace(/\D/g, '');
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITMO, CHAVE_SECRETA, iv);
    let criptografado = cipher.update(cpfLimpo, 'utf8', 'hex');
    criptografado += cipher.final('hex');
    return `${iv.toString('hex')}:${criptografado}`;
  }

  async cadastrarCliente(dadosCliente) {
    const { nome, email, cpf, telefone } = dadosCliente;

    if (!nome || !cpf || !email) {
      throw new Error('Nome, E-mail e CPF são obrigatórios.');
    }

    const cpfCriptografado = this.criptografarCPF(cpf);

    // Evita duplicidade de registros
    const clienteExistente = await clienteRepository.buscarPorCpf(cpfCriptografado);
    if (clienteExistente) {
      throw new Error('Cliente já cadastrado com este CPF.');
    }

    const clienteId = await clienteRepository.criar({
      nome,
      email,
      cpf: cpfCriptografado,
      telefone
    });

    return { id: clienteId, mensagem: 'Cliente cadastrado com sucesso e dados protegidos (LGPD).' };
  }

  async listarClientes(nomeFiltro) {
    // Decisão de negócio: se passado o filtro de nome, a service repassa a regra de busca
    return await clienteRepository.listar(nomeFiltro);
  }
}

module.exports = new ClienteService();