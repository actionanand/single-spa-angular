import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ModalReactApp } from './modal-react/modal-react.component';
import { Todo, TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-react-parcel',
  templateUrl: './react-parcel.component.html',
  styleUrls: ['./react-parcel.component.scss']
})
export class ReactParcelComponent implements OnInit {

  private todoServ = inject(TodoService);
  private latestTodo!: Todo;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.latestTodo = this.todoServ.getTheLatestTodo();
  }

  openDialog() {
    this.dialog.open(ModalReactApp, {
      data: {
        applicationName: '@actionanand/react-parcel-app',
        title: 'Angular Parcel App',
        todo: this.latestTodo,
      },
      width: '500px',
      autoFocus: false,
    });
  }

}
