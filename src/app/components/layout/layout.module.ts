import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutRoutingModule} from './layout-routing.module';
import {LayoutComponent} from './layout.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {SidebarMenuComponent} from './sidebar-menu/sidebar-menu.component';
import {SettingsComponent} from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SettingsComponent,
    SidebarMenuComponent,
    FooterComponent
  ],
  providers: []
})
export class LayoutModule {
}
