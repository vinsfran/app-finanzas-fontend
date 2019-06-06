import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EntidadesFinancierasListComponent} from './list/entidadesFinancieras-list.component';
import {EntidadesFinancierasComponent} from './entidadesFinancieras.component';
import {EntidadesFinancierasFormComponent} from './form/entidadesFinancieras-form.component';

const routes: Routes = [
  {
    path: '',
    component: EntidadesFinancierasComponent,
    children: [
      {
        path: 'entidades-financieras',
        component: EntidadesFinancierasListComponent
      },
      {
        path: 'entidades-financieras/form',
        component: EntidadesFinancierasFormComponent
      },
      {
        path: 'entidades-financieras/form/:id',
        component: EntidadesFinancierasFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesFinancierasRoutingModule {
}
