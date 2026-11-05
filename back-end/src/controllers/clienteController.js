const clienteService = require('../config/database.js')

class ClienteController {
    async criar(req, res) {
        try {
            const resultado = await clienteService.cadastrarCliente(req,body)
            return res.status(201).json(resultado)
        } catch (erro) {
            return res.status(400).json({erro: erro.message})
        }
    }

    async listar(req, res) {
        try {
            const {nome} = req.query
            const clientes = await clienteService.listarClientes(nome)
            return res.status(200).json(clientes)
        } catch (erro) {
            return res.status(500).json({erro: error.message})
        }
    }
}

module.exports = new ClienteController()