import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';
import {AuthorizationGuard} from '../../authorization/authorization.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard' },
      // {path: '', redirectTo: 'inicio'},
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
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
