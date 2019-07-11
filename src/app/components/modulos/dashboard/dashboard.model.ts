export class DashboardModel {
  totalIngresos: number;
  totalEgresos: number;
  saldoIngresosEgresos: number;

  cantidadPrestamos: number;
  saldoTotalPrestamos: number;
  totalCuotasMontoPrestamos: number;
  proximoVencimientoPrestamos: Date;

  cantidadAhorros: number;
  totalMontoInteresAhorros: number;
  totalMontoCapitalAhorros: number;
  proximoVencimientoAhorros: Date;

  cantidadTarjetas: number;
  totalDeudaTarjetas: number;
  totalLineaTarjetas: number;
}
