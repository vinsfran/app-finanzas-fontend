import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {MesesRoutingModule} from './meses-routing.module';
import {MesesComponent} from './meses.component';
import {MesesListComponent} from './list/meses-list.component';
import {MesesFormComponent} from './form/meses-form.component';
import {MesesService} from '../../../services/meses.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    MesesRoutingModule
  ],
  declarations: [
    MesesComponent,
    MesesFormComponent,
    MesesListComponent
  ],
  providers: [
    MesesService
  ]
})

export class MesesModule {
}
