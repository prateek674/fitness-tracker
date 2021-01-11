import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  imports: [
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  exports: [
    MatButtonModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
