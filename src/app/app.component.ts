import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { singleSpaPropsSubject, SingleSpaProps } from 'src/single-spa/single-spa-props';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'single-spa-angular';

  singleSpaProps!: SingleSpaProps;
  subscription!: Subscription;
  utiSub!: Subscription;

  ngOnInit(): void {
    this.subscription = singleSpaPropsSubject.pipe(debounceTime(0), take(1)).subscribe( props => {
      this.singleSpaProps = props;
      console.log(props);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.utiSub.unsubscribe();
  }

  // OR if you don't need to access `singleSpaProps` inside the component
  // then create `Observable` property and use it in template with `async` pipe.
  singleSpaProps$ = singleSpaPropsSubject.asObservable();
}
