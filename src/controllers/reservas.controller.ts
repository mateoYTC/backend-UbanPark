import * as reservasDao from '../dao/reservas.dao';
import { Reservas } from '../models/reservas';
import { Request, Response } from 'express';

export const getReservas = async (): Promise<Reservas[]> => {
    try {
        let p = await reservasDao.Listar();
        return p;
    } catch (error) {
        throw error;
    }
}

export const eliminarReserva = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    await reservasDao.eliminar(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};

export const crearReserva = async (req: Request, res: Response) => {
  try {
    const nuevaReserva: Reservas = req.body;
    const reservaCreada = await reservasDao.insertar(nuevaReserva);
    res.status(201).json(reservaCreada);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

export const actualizarReserva = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const reservaActualizada: Reservas = req.body;
    await reservasDao.actualizar(id, reservaActualizada);
    res.sendStatus(204);
  } catch (error) {
    console.error("Error al actualizar reserva:", error);
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};