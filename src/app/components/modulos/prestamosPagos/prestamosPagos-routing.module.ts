import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrestamosPagosListComponent} from './list/prestamosPagos-list.component';
import {PrestamosPagosComponent} from './prestamosPagos.component';
import {PrestamosPagosFormComponent} from './form/prestamosPagos-form.component';

const routes: Routes = [
  {
    path: '',
    component: PrestamosPagosComponent,
    children: [
      {
        path: 'prestamos-pagos',
        component: PrestamosPagosListComponent
      },
      {
        path: 'prestamos-pagos/form',
        component: PrestamosPagosFormComponent
      },
      {
        path: 'prestamos-pagos/form/:id',
        component: PrestamosPagosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestamosPagosRoutingModule {
}
