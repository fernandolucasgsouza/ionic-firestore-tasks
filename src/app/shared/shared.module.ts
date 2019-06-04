import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToogleComponent } from './components/menu-toogle/menu-toogle.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';

@NgModule({
  declarations: [LogoutButtonComponent, MenuToogleComponent],
  imports: [IonicModule],
  exports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    LogoutButtonComponent,
    MenuToogleComponent
  ]
})
export class SharedModule { }
