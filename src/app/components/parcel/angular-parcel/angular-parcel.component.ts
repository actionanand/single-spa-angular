import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { mountRootParcel } from 'single-spa';

import { ModalMicroApp } from '../modal-micro-app/modal-microapp.component';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-angular-parcel',
  templateUrl: './angular-parcel.component.html',
  styleUrls: ['./angular-parcel.component.scss']
})
export class AngularParcelComponent implements OnInit {

  mountRootParcel = mountRootParcel;
  parcelProps = { customProp1: 'Parent prop1' };
  target = document.body;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  async configNgParcel() {
    return (window as any).System.import('angular-parcel-app');
  }

  parcelMountedMyNg():void {
    console.log('Angular parcel mounted');
  }

  openDialog() {
    this.dialog.open(ModalMicroApp, {
      data: {
        animal: 'panda',
      },
    });
  }

}
