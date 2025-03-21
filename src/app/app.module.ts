import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ParcelModule } from 'single-spa-angular/parcel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { ParcelComponent } from './components/parcel/parcel.component';
import { AngularParcelComponent } from './components/parcel/angular-parcel/angular-parcel.component';
import { ReactParcelComponent } from './components/parcel/react-parcel/react-parcel.component';
import { ModalReactApp } from './components/parcel/react-parcel/modal-react/modal-react.component';
import { PopoverModule } from './components/popover/popover.module';

const materialModules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule
];

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ParcelComponent,
    AngularParcelComponent,
    ReactParcelComponent,
    ModalReactApp
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ParcelModule,
    PopoverModule,
    ...materialModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
