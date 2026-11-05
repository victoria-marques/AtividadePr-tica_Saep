const { Router } = require('express');
const veiculoController = require('../controllers/VeiculoController');

const router = Router();

// GET /veiculos
router.get('/', (req, res) => veiculoController.listar(req, res));

// POST /veiculos (Service/Controller valida se cliente_id veio, senão 400)
router.post('/', (req, res) => veiculoController.criar(req, res));

// PUT /veiculos/:id (Service/Controller valida se cliente_id veio, senão 400)
router.put('/:id', (req, res) => veiculoController.atualizar(req, res));

// DELETE /veiculos/:id
router.delete('/:id', (req, res) => veiculoController.deletar(req, res));

module.exports = router;