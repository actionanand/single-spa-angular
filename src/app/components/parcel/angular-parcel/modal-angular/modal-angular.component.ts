import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CustomProps, Parcel, ParcelConfig } from 'single-spa';
import { Observable, from, lastValueFrom } from 'rxjs';
import { tap, map } from 'rxjs/operators';
// import { mapTo } from 'rxjs/operators'; // mapTo is deprecated, use map() instead

import { singleSpaPropsSubject } from '../../../../../single-spa/single-spa-props';
import { DialogData } from '../angular-parcel.component';
import { environment } from '../../../../../environments/environment';

/*
declare global {
  interface Window {
    System: any;
  }
}
*/

declare global {
  interface Window {
    System: {
      import: (app: string) => Promise<ParcelConfig>;
    };
  }
}

/*
let mountParcel;
export const bootstrap = [
  (props: { mountParcel: any; }) => {
    mountParcel = props.mountParcel;
    return Promise.resolve();
  }
  // more bootstrap lifecycles if necessary
];
*/

@Component({
  selector: 'app-modal-angular-container',
  template: '<div #modalMicroAppPopupContainer></div>',
})
export class ModalAngularApp implements OnInit, AfterViewInit, OnDestroy{
  @ViewChild('modalMicroAppPopupContainer', { static: true })
  private microAppPopupContainer!: ElementRef;

  private applicationName: string ;

  private customProperty: object;

  constructor(public dialogRef: MatDialogRef<ModalAngularApp>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.customProperty = dialogRef;
      this.applicationName = data.applicationName;
    }


    private appParcelMap: {
      [appName: string]: Parcel
    } = {};

    ngOnInit(): void { }

    ngAfterViewInit(): void {
      const domElement = this.microAppPopupContainer.nativeElement;

      singleSpaPropsSubject.subscribe(props => {
        window.System.import(environment['sspa-apps-map'][this.applicationName])
          .then((app: ParcelConfig<CustomProps> ) => {
          this.appParcelMap[this.applicationName] = props.mountParcel(app, 
            { 
              domElement, 
              ...this.customProperty 
            });
        });
      });
    }

    async ngOnDestroy() { 
      // await this.unmountApp(this.applicationName).toPromise(); 
      // toPromise() is deprecated, use lastValueFrom()/firstValueFrom() instead
      await lastValueFrom(this.unmountApp(this.applicationName));
    }

    unmountApp(appName: string): Observable<void> {
      return from(this.appParcelMap[appName].unmount()).pipe(
        tap(() => delete this.appParcelMap[appName]),
        // mapTo(null), // mapTo is deprecated, use map() instead
        map(() => undefined)
      );
    }
  
}
