export class PrestamoPagoModel {
  id: number;
  numeroCuota: number;
  fechaPago: Date;
  montoPagado: number;
  prestamoId: number;
  destinoPrestamo: string;
  tipoPagoId: number;
  tipoPagoNombre: string;
  usuarioId: number;
}
