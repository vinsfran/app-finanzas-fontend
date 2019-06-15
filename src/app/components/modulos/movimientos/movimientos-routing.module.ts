import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovimientosListComponent} from './list/movimientos-list.component';
import {MovimientosComponent} from './movimientos.component';
import {MovimientosFormComponent} from './form/movimientos-form.component';

const routes: Routes = [
  {
    path: '',
    component: MovimientosComponent,
    children: [
      {
        path: 'movimientos',
        component: MovimientosListComponent
      },
      {
        path: 'movimientos/form',
        component: MovimientosFormComponent
      },
      {
        path: 'movimientos/form/:id',
        component: MovimientosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule {
}
