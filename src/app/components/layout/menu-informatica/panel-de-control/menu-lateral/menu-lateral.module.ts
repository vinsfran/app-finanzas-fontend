import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MenuLateralRoutingModule} from './menu-lateral-routing.module';
import {ContentHeaderModule} from '../../../widgets/content-header/content-header.module';
import {PaginationModule} from '../../../widgets/pagination/pagination.module';
import {MenuListComponent} from './menu-list/menu-list.component';
import {MenuFormNewComponent} from './menu-form-new/menu-form-new.component';
import {MenuFormEditComponent} from './menu-form-edit/menu-form-edit.component';
import {MenuLateralComponent} from './menu-lateral.component';
import {SimaBackendMenuServiceService} from '../../../../../services/sima-backend/sima-backend-menu.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuLateralRoutingModule,
    ContentHeaderModule,
    PaginationModule
  ],
  declarations: [
    MenuListComponent,
    MenuFormNewComponent,
    MenuFormEditComponent,
    MenuLateralComponent
  ],
  providers: [
    SimaBackendMenuServiceService
  ]
})

export class MenuLateralModule {
}
