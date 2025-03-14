import { Component, inject, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ModalAngularApp } from './modal-angular/modal-angular.component';
import { TodoService } from '../../../services/todo.service';
import { Todo } from '../../../models/todo.model';


@Component({
  selector: 'app-angular-parcel',
  templateUrl: './angular-parcel.component.html',
  styleUrls: ['./angular-parcel.component.scss']
})
export class AngularParcelComponent implements OnInit {

  private todoServ = inject(TodoService);
  private latestTodo!: Todo;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.latestTodo = this.todoServ.getTheLatestTodo();
  }

  openDialog() {
    this.dialog.open(ModalAngularApp, {
      data: {
        applicationName: 'angular-parcel-app',
        title: 'Angular Parcel App',
        todo: this.latestTodo,
      },
      width: '500px',
      autoFocus: false,
    });
  }
}
