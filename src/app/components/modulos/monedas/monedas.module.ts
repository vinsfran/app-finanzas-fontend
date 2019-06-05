import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ContentHeaderModule} from '../widgets/content-header/content-header.module';
import {PaginationModule} from '../widgets/pagination/pagination.module';
import {MonedasRoutingModule} from './monedas-routing.module';
import {MonedasComponent} from './monedas.component';
import {MonedasListComponent} from './list/monedas-list.component';
import {MonedasFormComponent} from './form/monedas-form.component';
import {MonedasService} from '../../../services/monedas.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContentHeaderModule,
    PaginationModule,
    MonedasRoutingModule
  ],
  declarations: [
    MonedasComponent,
    MonedasFormComponent,
    MonedasListComponent
  ],
  providers: [
    MonedasService
  ]
})

export class MonedasModule {
}
