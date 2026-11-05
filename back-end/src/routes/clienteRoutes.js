const { Router } = require('express');
const clienteController = require('../controllers/ClienteController');

const router = Router();

// GET /clientes?busca=termo
router.get('/', (req, res) => clienteController.listar(req, res));

// POST /clientes
router.post('/', (req, res) => clienteController.criar(req, res));

// PUT /clientes/:id
router.put('/:id', (req, res) => clienteController.atualizar(req, res));

// DELETE /clientes/:id
router.delete('/:id', (req, res) => clienteController.deletar(req, res));

module.exports = router;