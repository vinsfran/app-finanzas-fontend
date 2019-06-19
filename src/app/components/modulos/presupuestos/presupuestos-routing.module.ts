import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PresupuestosListComponent} from './list/presupuestos-list.component';
import {PresupuestosComponent} from './presupuestos.component';
import {PresupuestosFormComponent} from './form/presupuestos-form.component';

const routes: Routes = [
  {
    path: '',
    component: PresupuestosComponent,
    children: [
      {
        path: 'presupuestos',
        component: PresupuestosListComponent
      },
      {
        path: 'presupuestos/form',
        component: PresupuestosFormComponent
      },
      {
        path: 'presupuestos/form/:id',
        component: PresupuestosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PresupuestosRoutingModule {
}
