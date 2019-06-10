import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PrestamosListComponent} from './list/prestamos-list.component';
import {PrestamosComponent} from './prestamos.component';
import {PrestamosFormComponent} from './form/prestamos-form.component';
import {RealizarPagoPrestamoFormComponent} from './realizarPagoPrestamo/realizarPagoPrestamo-form.component';

const routes: Routes = [
  {
    path: '',
    component: PrestamosComponent,
    children: [
      {
        path: 'prestamos',
        component: PrestamosListComponent
      },
      {
        path: 'prestamos/form',
        component: PrestamosFormComponent
      },
      {
        path: 'prestamos/form/:id',
        component: PrestamosFormComponent
      },
      {
        path: 'prestamos/pagar',
        component: RealizarPagoPrestamoFormComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestamosRoutingModule {
}
