const { Router } = require('express');
const agendamentoController = require('../controllers/AgendamentoController');

const router = Router();

// GET /agendamentos (JOIN com veiculos e clientes, ordenado por data)
router.get('/', (req, res) => agendamentoController.listar(req, res));

// POST /agendamentos
router.post('/', (req, res) => agendamentoController.criar(req, res));

// PUT /agendamentos/:id (Alterar data/hora)
router.put('/:id', (req, res) => agendamentoController.atualizarData(req, res));

// DELETE /agendamentos/:id
router.delete('/:id', (req, res) => agendamentoController.deletar(req, res));

module.exports = router;