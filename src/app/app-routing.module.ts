import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const dirComponents = './components/';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: dirComponents + 'login/login.module#LoginModule'
  },
  {
    path: '',
    loadChildren: dirComponents + 'layout/layout.module#LayoutModule'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
