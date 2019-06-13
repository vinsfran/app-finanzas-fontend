import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AhorrosListComponent} from './list/ahorros-list.component';
import {AhorrosComponent} from './ahorros.component';
import {AhorrosFormComponent} from './form/ahorros-form.component';
import {VerDetallesAhorroFormComponent} from './verDetalles/verDetallesAhorro-form.component';

const routes: Routes = [
  {
    path: '',
    component: AhorrosComponent,
    children: [
      {
        path: 'ahorros',
        component: AhorrosListComponent
      },
      {
        path: 'ahorros/form',
        component: AhorrosFormComponent
      },
      {
        path: 'ahorros/form/:id',
        component: AhorrosFormComponent
      },
      {
        path: 'ahorros/detalles/:id',
        component: VerDetallesAhorroFormComponent
      }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AhorrosRoutingModule {
}
