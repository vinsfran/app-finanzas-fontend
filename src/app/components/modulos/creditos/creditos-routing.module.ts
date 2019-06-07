import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreditosListComponent} from './list/creditos-list.component';
import {CreditosComponent} from './creditos.component';
import {CreditosFormComponent} from './form/creditos-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreditosComponent,
    children: [
      {
        path: 'creditos',
        component: CreditosListComponent
      },
      {
        path: 'creditos/form',
        component: CreditosFormComponent
      },
      {
        path: 'creditos/form/:id',
        component: CreditosFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditosRoutingModule {
}
