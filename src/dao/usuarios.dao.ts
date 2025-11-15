import getConnection from "../conexion/connection";
import { Usuarios } from "../models/usuarios";

export const Listar = async (): Promise<Usuarios[]> => {
  try {
    const tsql = "SELECT * FROM Usuarios ORDER BY id";
    const pool = await getConnection();
    const rs = await pool.query<Usuarios>(tsql);
    return rs.recordset ?? [];
  } catch (error) {
    throw error;
  }
};

export const eliminar = async (id: number): Promise<void> => {
  try {
    const tsql = `DELETE FROM Usuarios WHERE id = @id`;
    const pool = await getConnection();
    await pool.request().input("id", id).query(tsql);
  } catch (error) {
    throw error;
  }
};

export const insertar = async (us: Usuarios): Promise<Usuarios> => {
  try {
    const tsql = `
      INSERT INTO Usuarios (Nombre, Carro, Cedula, Placa, Registro_Entrada, Registro_Salida, Reserva, Celular, Email)
      OUTPUT INSERTED.*
      VALUES (@Nombre, @Carro, @Cedula, @Placa, @Registro_Entrada, @Registro_Salida, @Reserva, @Celular, @Email)
    `;

    const pool = await getConnection();
    const result = await pool.request()
      .input("Nombre", us.Nombre)
      .input("Carro", us.Carro)
      .input("Cedula", us.Cedula)
      .input("Placa", us.Placa)
      .input("Registro_Entrada", us.Registro_Entrada ? new Date(us.Registro_Entrada) : null)
      .input("Registro_Salida", us.Registro_Salida ? new Date(us.Registro_Salida) : null)
      .input("Reserva", us.Reserva ? new Date(us.Reserva) : null)
      .input("Celular", us.Celular || '')  
      .input("Email", us.Email || '')      
      .query(tsql);

    return result.recordset[0];
  } catch (error) {
    console.error("Error al insertar usuario:", error);
    throw error;
  }
};

export const actualizar = async (id: number, us: Usuarios): Promise<void> => {
  try {
    const tsql = `
      UPDATE Usuarios
      SET Nombre = @Nombre,
          Carro = @Carro,
          Cedula = @Cedula,
          Placa = @Placa,
          Registro_Entrada = @Registro_Entrada,
          Registro_Salida = @Registro_Salida,
          Reserva = @Reserva,
          Celular = @Celular,    -- ← NUEVO
          Email = @Email         -- ← NUEVO
      WHERE id = @id
    `;
    const pool = await getConnection();
    await pool.request()
      .input("id", id)
      .input("Nombre", us.Nombre)
      .input("Carro", us.Carro)
      .input("Cedula", us.Cedula)
      .input("Placa", us.Placa)
      .input("Registro_Entrada", us.Registro_Entrada)
      .input("Registro_Salida", us.Registro_Salida)
      .input("Reserva", us.Reserva)
      .input("Celular", us.Celular || '')  
      .input("Email", us.Email || '')      
      .query(tsql);
  } catch (error) {
    throw error;
  }
};