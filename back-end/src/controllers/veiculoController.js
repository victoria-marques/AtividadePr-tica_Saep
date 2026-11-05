const veiculoService = require('../services/veiculoService.js')

class VeiculoController {
    async criar(req, res) {
        try {
            const resultado = await veiculoService.cadastrarVeiculo(req.body)
            return res.status(201).json(resultado)
        } catch (erro) {
            return res.status(400).json({erro: erro.message})
        }
    }

    async listarPorCliente(req, res){
        try {
            const {clienteId} = req.params
            const veiculos = await veiculoService.listarPorCliente(clienteId)
            return res.status(200).json(veiculo)
        } catch (erro) {
            return res.status(400).json({erro: erro.message})
        }
    }
}

module.exports = new VeiculoController