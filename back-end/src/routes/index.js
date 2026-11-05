const { Router } = require('express');
const authRoutes = require('./authRoutes');
const clienteRoutes = require('./clienteRoutes');
const veiculoRoutes = require('./veiculoRoutes');
const agendamentoRoutes = require('./agendamentoRoutes');
const authMiddleware = require('../middlewares/authMiddleware');

const routes = Router();

// Rota pública
routes.use('/', authRoutes);

// Middleware de proteção global para as rotas abaixo
routes.use(authMiddleware);

// Rotas protegidas (exigem Token JWT)
routes.use('/clientes', clienteRoutes);
routes.use('/veiculos', veiculoRoutes);
routes.use('/agendamentos', agendamentoRoutes);

module.exports = routes;