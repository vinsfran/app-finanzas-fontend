export class AhorroModel {
  id: number;
  montoCapital: number;
  fechaInicio: Date;
  fechaVencimiento: Date;
  plazoTotal: number;
  interes: number;
  tasa: number;
  cantidadCuotas: number;
  cantidadCuotasPagadas: number;
  montoCuota: number;
  montoInteresCuota: number;
  cantidadCobro: number;
  estado: boolean;
  tipoAhorroId: number;
  tipoAhorroNombre: string;
  monedaId: number;
  monedaNombre: string;
  monedaCodigo: string;
  entidadFinancieraId: number;
  entidadFinancieraNombre: string;
  tipoCobroId: number;
  tipoCobroNombre: string;
  usuarioId: number;
}
