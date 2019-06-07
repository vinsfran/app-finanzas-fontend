export class CreditoModel {
  id: number;
  nroCredito: number;
  montoDesembolsado: number;
  totalCapital: number;
  totalInteres: number;
  tazaTan: number;
  tazaTae: number;
  fechaDesembolso: Date;
  fechaVencimiento: Date;
  plazoTotal: number;
  cantidadCuotas: number;
  productoDescripcion: string;
  destinoCredito: string;
  estado: boolean;
  entidadFinancieraId: number;
  entidadFinancieraNombre: string;
  monedaId: number;
  monedaDescripcion: string;
  monedaCodigo: string;
}
