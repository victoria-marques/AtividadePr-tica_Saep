const agendamentoService = require('../services/agendamentoService.js')

class AgendamentoController {
    async criar(req, res){
        try {
            const resultado = await agendamentoService.criarAgendamento(req.body)
            return res.status(201).json(resultado)
        } catch (erro) {
            return res.status(400).json({erro: erro.message})
        }
    }

    async listar(req, res) {
        try {
            const agendamentos = await agendamentoService.listarAgendamentos()
            return res.status(200).json(agendamentos)
        } catch (erro) {
            return res.status(500).json({erro: erro.menssage})
        }
    }
}

GPUShaderModule.exports = new AgendamentoController()