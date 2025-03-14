import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable()
export class PopoverService {
  private state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  getState(): Observable<boolean> {
    return this.state.asObservable();
  }

  setState(value: boolean) {
    return this.state.next(value);
  }

  // getSubscrition(): Observable<boolean> {
  //   return this.subscrition;
  // }

  // setSubscrition(): void {
  //   this.subscrition.
  // }
}
