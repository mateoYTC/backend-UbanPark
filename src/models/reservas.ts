export interface Reservas {
    id?: number;
    idUsuario: number;
    placaVehiculo: string;
    tipoVehiculo: string;
    fechaEntrada: string;
    fechaSalida: string;
    horasTotales: number;
    diasTotales: number;
    subtotal: number;
    descuento: number;
    total: number;
    estado: string;
    created_at?: string;
}