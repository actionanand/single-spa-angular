import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { mountRootParcel } from 'single-spa';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-modal-react-container',
  templateUrl: './modal-react.component.html'
})
export class ModalReactApp {
  mountRootParcel = mountRootParcel;
  target = document.body;

  applicationName: string ;
  customProperty: any;

  constructor(public dialogRef: MatDialogRef<ModalReactApp>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.customProperty = dialogRef;
    this.applicationName = data.applicationName;
  }

  async configNgParcel() {
    return (window as any).System.import(environment['sspa-apps-map']['@actionanand/react-parcel-app']);
  }

  parcelMountedMyNg():void {
    console.log('React parcel mounted inside Angular mat dialog');
  }
}