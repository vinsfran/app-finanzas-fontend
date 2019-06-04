import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RolesListComponent} from './list/roles-list.component';
import {RolesComponent} from './roles.component';
import {RolesFormComponent} from './form/roles-form.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    children: [
      {
        path: 'roles',
        component: RolesListComponent
      },
      {
        path: 'roles/form',
        component: RolesFormComponent
      },
      {
        path: 'roles/form/:id',
        component: RolesFormComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {
}
