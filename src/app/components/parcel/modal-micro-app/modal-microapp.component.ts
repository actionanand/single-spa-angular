import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../angular-parcel/angular-parcel.component';

@Component({
  selector: 'app-modal-microapp',
  templateUrl: './modal-microapp.component.html',
})
export class ModalMicroApp {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}