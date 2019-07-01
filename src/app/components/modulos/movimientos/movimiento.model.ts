export class MovimientoModel {
  id: number;
  numeroComprobante: string;
  fechaMovimiento: Date;
  montoPagado: number;
  nombreEntidad: string;
  prestamoId: number;
  ahorroId: number;
  numeroCuota: number;
  conceptoId: number;
  conceptoNombre: string;
  tipoConcepto: string;
  codigoConcepto: string;
  monedaId: number;
  monedaNombre: string;
  monedaCodigo: string;
  tipoPagoId: number;
  tipoPagoNombre: string;
  usuarioId: number;
}
