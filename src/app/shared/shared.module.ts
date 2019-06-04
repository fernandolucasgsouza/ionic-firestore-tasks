import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuToogleComponent } from './components/menu-toogle/menu-toogle.component';

@NgModule({
  declarations: [MenuToogleComponent],
  imports: [IonicModule],
  exports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MenuToogleComponent
  ]
})
export class SharedModule { }
