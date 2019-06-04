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
      // {
      //   path: '',
      //   loadChildren: dirDependencias + 'dependencia-form-new/dependencia-form-new.module#DependenciaFormNewModule',
      //   canActivate: [AuthorizationGuard]
      // }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {
}
