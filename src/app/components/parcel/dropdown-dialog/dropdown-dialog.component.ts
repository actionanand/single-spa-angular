import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DialogData } from '../angular-parcel/angular-parcel.component';

@Component({
  selector: 'app-dropdown-dialog',
  templateUrl: './dropdown-dialog.component.html',
})
export class DropdownDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}