import getConnection from "../conexion/connection";
import { Reservas } from "../models/reservas";

export const Listar = async (): Promise<Reservas[]> => {
  try {
    const tsql = "SELECT * FROM Reservas ORDER BY created_at DESC";
    const pool = await getConnection();
    const rs = await pool.query<Reservas>(tsql);
    return rs.recordset ?? [];
  } catch (error) {
    throw error;
  }
};

export const insertar = async (reserva: Reservas): Promise<Reservas> => {
  try {
    const tsql = `
      INSERT INTO Reservas (
        idUsuario, placaVehiculo, tipoVehiculo, fechaEntrada, fechaSalida,
        horasTotales, diasTotales, subtotal, descuento, total, estado
      )
      OUTPUT INSERTED.*
      VALUES (
        @idUsuario, @placaVehiculo, @tipoVehiculo, @fechaEntrada, @fechaSalida,
        @horasTotales, @diasTotales, @subtotal, @descuento, @total, @estado
      )
    `;

    const pool = await getConnection();
    const result = await pool.request()
      .input("idUsuario", reserva.idUsuario)
      .input("placaVehiculo", reserva.placaVehiculo)
      .input("tipoVehiculo", reserva.tipoVehiculo)
      .input("fechaEntrada", new Date(reserva.fechaEntrada))
      .input("fechaSalida", new Date(reserva.fechaSalida))
      .input("horasTotales", reserva.horasTotales)
      .input("diasTotales", reserva.diasTotales)
      .input("subtotal", reserva.subtotal)
      .input("descuento", reserva.descuento)
      .input("total", reserva.total)
      .input("estado", reserva.estado)
      .query(tsql);

    return result.recordset[0];
  } catch (error) {
    console.error("Error al insertar reserva:", error);
    throw error;
  }
};

export const eliminar = async (id: number): Promise<void> => {
  try {
    const tsql = `DELETE FROM Reservas WHERE id = @id`;
    const pool = await getConnection();
    await pool.request().input("id", id).query(tsql);
  } catch (error) {
    throw error;
  }
};

export const actualizar = async (id: number, reserva: Reservas): Promise<void> => {
  try {
    const tsql = `
      UPDATE Reservas
      SET idUsuario = @idUsuario,
          placaVehiculo = @placaVehiculo,
          tipoVehiculo = @tipoVehiculo,
          fechaEntrada = @fechaEntrada,
          fechaSalida = @fechaSalida,
          horasTotales = @horasTotales,
          diasTotales = @diasTotales,
          subtotal = @subtotal,
          descuento = @descuento,
          total = @total,
          estado = @estado
      WHERE id = @id
    `;
    const pool = await getConnection();
    await pool.request()
      .input("id", id)
      .input("idUsuario", reserva.idUsuario)
      .input("placaVehiculo", reserva.placaVehiculo)
      .input("tipoVehiculo", reserva.tipoVehiculo)
      .input("fechaEntrada", reserva.fechaEntrada)
      .input("fechaSalida", reserva.fechaSalida)
      .input("horasTotales", reserva.horasTotales)
      .input("diasTotales", reserva.diasTotales)
      .input("subtotal", reserva.subtotal)
      .input("descuento", reserva.descuento)
      .input("total", reserva.total)
      .input("estado", reserva.estado)
      .query(tsql);
  } catch (error) {
    throw error;
  }
};