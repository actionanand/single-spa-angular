import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DropdownDialog } from '../dropdown-dialog/dropdown-dialog.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-angular-parcel',
  templateUrl: './angular-parcel.component.html',
  styleUrls: ['./angular-parcel.component.scss']
})
export class AngularParcelComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(DropdownDialog, {
      data: {
        animal: 'panda',
      },
    });
  }

}
