export class MovimientoModel {
  id: number;
  numeroComprobante: string;
  fechaMovimiento: Date;
  monto: number;
  nombreEntidad: string;
  conceptoId: number;
  conceptoNombre: string;
  tipoConcepto: string;
  monedaId: number;
  monedaNombre: string;
  monedaCodigo: string;
  tipoPagoId: number;
  tipoPagoNombre: string;
  usuarioId: number;
}
