export class CreditoModel {
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
  entidadeFinancieraId: number;
  monedaId: number;
}
