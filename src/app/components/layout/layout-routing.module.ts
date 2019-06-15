import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../authorization/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // Ruta para Dashboard
      {
        path: '',
        loadChildren: '../modulos/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Clientes
      {
        path: '',
        loadChildren: '../modulos/clientes/clientes.module#ClientesModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Roles
      {
        path: '',
        loadChildren: '../modulos/roles/roles.module#RolesModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Monedas
      {
        path: '',
        loadChildren: '../modulos/monedas/monedas.module#MonedasModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Tipos de Ahorros
      {
        path: '',
        loadChildren: '../modulos/tiposAhorros/tiposAhorros.module#TiposAhorrosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Tipos de Cobros
      {
        path: '',
        loadChildren: '../modulos/tiposCobros/tiposCobros.module#TiposCobrosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Tipos de Cobros
      {
        path: '',
        loadChildren: '../modulos/tiposPagos/tiposPagos.module#TiposPagosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Entidades Financieras
      {
        path: '',
        loadChildren: '../modulos/entidadesFinancieras/entidadesFinancieras.module#EntidadesFinancierasModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Prestamos
      {
        path: '',
        loadChildren: '../modulos/prestamos/prestamos.module#PrestamosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Prestamos Pagos
      {
        path: '',
        loadChildren: '../modulos/prestamosPagos/prestamosPagos.module#PrestamosPagosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Ahorros
      {
        path: '',
        loadChildren: '../modulos/ahorros/ahorros.module#AhorrosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Conceptos
      {
        path: '',
        loadChildren: '../modulos/conceptos/conceptos.module#ConceptosModule',
        canActivate: [AuthorizationGuard]
      },
      // Ruta para Movimientos
      {
        path: '',
        loadChildren: '../modulos/movimientos/movimientos.module#MovimientosModule',
        canActivate: [AuthorizationGuard]
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
