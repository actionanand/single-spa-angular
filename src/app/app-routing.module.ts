import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, TitleStrategy } from '@angular/router';

import { PageTitleStrategyService } from './services/page-title-strategy.service';
import { EmptyRouteComponent } from './empty-route/empty-route.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  {path: 'angular', redirectTo: 'angular/all', pathMatch: 'full', title: 'All todos'},
  { path: 'angular/:status', component: TodoComponent, title: 'Todos' },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: APP_BASE_HREF, useValue: "/" },
    {provide: TitleStrategy,  useClass: PageTitleStrategyService}
  ],
})
export class AppRoutingModule { }
