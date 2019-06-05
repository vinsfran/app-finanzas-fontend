import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TiposPagosListComponent} from './list/tiposPagos-list.component';
import {TiposPagosComponent} from './tiposPagos.component';
import {TiposPagosFormComponent} from './form/tiposPagos-form.component';

const routes: Routes = [
  {
    path: '',
    component: TiposPagosComponent,
    children: [
      {
        path: 'tipos-pagos',
        component: TiposPagosListComponent
      },
      {
        path: 'tipos-pagos/form',
        component: TiposPagosFormComponent
      },
      {
        path: 'tipos-pagos/form/:id',
        component: TiposPagosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiposPagosRoutingModule {
}
