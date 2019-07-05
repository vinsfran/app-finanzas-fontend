export class TarjetaModel {
  id: number;
  numeroTarjeta: string;
  marca: string;
  lineaCredito: number;
  fechaVencimiento: Date;
  estado: boolean;
  entidadFinancieraId: number;
  entidadFinancieraNombre: string;
  usuarioId: number;
}
