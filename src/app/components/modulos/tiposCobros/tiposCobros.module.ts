import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {TiposCobrosRoutingModule} from './tiposCobros-routing.module';
import {TiposCobrosComponent} from './tiposCobros.component';
import {TiposCobrosListComponent} from './list/tiposCobros-list.component';
import {TiposCobrosFormComponent} from './form/tiposCobros-form.component';
import {TiposCobrosService} from '../../../services/tiposCobros.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    TiposCobrosRoutingModule
  ],
  declarations: [
    TiposCobrosComponent,
    TiposCobrosFormComponent,
    TiposCobrosListComponent
  ],
  providers: [
    TiposCobrosService
  ]
})

export class TiposCobrosModule {
}
