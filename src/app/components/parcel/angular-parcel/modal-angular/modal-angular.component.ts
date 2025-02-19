import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../angular-parcel.component';

@Component({
  selector: 'app-modal-microapp-angular',
  templateUrl: './modal-angular.component.html',
  // template: '<div #modalMicroAppPopupContainer></div>',
})
export class ModalAngularApp {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}