import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {RolesRoutingModule} from './roles-routing.module';
import {RolesComponent} from './roles.component';
import {RolesListComponent} from './list/roles-list.component';
import {RolesFormComponent} from './form/roles-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    RolesRoutingModule
  ],
  declarations: [
    RolesComponent,
    RolesFormComponent,
    RolesListComponent
  ],
  providers: []
})

export class RolesModule {
}
