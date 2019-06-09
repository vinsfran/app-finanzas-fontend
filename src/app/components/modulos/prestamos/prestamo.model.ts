export class PrestamoModel {
  id: number;
  montoPrestamo: number;
  fechaDesembolso: Date;
  fechaVencimiento: Date;
  interes: number;
  tasa: number;
  cantidadCuotas: number;
  cantidadCuotasPagadas: number;
  montoCuota: number;
  montoPagado: number;
  destinoPrestamo: string;
  estado: boolean;
  monedaId: number;
  monedaNombre: string;
  monedaCodigo: string;
  entidadFinancieraId: number;
  entidadFinancieraNombre: string;
  usuarioId: number;
}
