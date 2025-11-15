import * as reservasController from '../controllers/reservas.controller';
import express from 'express';

const router = express.Router();

router.get('/', (_, rs) => {
    reservasController.getReservas()
        .then(obj => {
            rs.json(obj);
        })
        .catch(e => {
            rs.status(500).json(e);
        })
});

router.delete('/:id', (req, res) => {
  reservasController.eliminarReserva(req, res);
});

router.post('/', (req, res) => {
  reservasController.crearReserva(req, res);
});

router.put('/:id', (req, res) => {
  reservasController.actualizarReserva(req, res);
});

export default router;