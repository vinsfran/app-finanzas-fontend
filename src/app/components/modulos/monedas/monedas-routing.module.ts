import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MonedasListComponent} from './list/monedas-list.component';
import {MonedasComponent} from './monedas.component';
import {MonedasFormComponent} from './form/monedas-form.component';

const routes: Routes = [
  {
    path: '',
    component: MonedasComponent,
    children: [
      {
        path: 'monedas',
        component: MonedasListComponent
      },
      {
        path: 'monedas/form',
        component: MonedasFormComponent
      },
      {
        path: 'monedas/form/:id',
        component: MonedasFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonedasRoutingModule {
}
