import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuLateralComponent} from './menu-lateral.component';
import {MenuFormNewComponent} from './menu-form-new/menu-form-new.component';
import {MenuFormEditComponent} from './menu-form-edit/menu-form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MenuLateralComponent,
    children: [
      {
        path: 'menu-informatica/panel-de-control/menu-lateral/list',
        component: MenuListComponent
      },
      {
        path: 'menu-informatica/panel-de-control/menu-lateral/form-new',
        component: MenuFormNewComponent
      },
      {
        path: 'menu-informatica/panel-de-control/menu-lateral/form-edit',
        component: MenuFormEditComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuLateralRoutingModule {
}
