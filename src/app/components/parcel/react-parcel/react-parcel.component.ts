import { Component, inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ModalReactApp } from './modal-react/modal-react.component';
import { TodoService } from '../../../services/todo.service';
import { Todo, TodoParcelData } from '../../../models/todo.model';

@Component({
  selector: 'app-react-parcel',
  templateUrl: './react-parcel.component.html',
  styleUrls: ['./react-parcel.component.scss']
})
export class ReactParcelComponent implements OnInit {

  private todoServ = inject(TodoService);
  private latestTodo!: Todo;
  private todoParcelData!: TodoParcelData;

  modalRef!: MatDialogRef<any>;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.latestTodo = this.todoServ.getTheLatestTodo();
  }

  openDialog() {
    this.modalRef = this.dialog.open(ModalReactApp, {
      data: {
        applicationName: '@actionanand/react-parcel-app',
        title: 'React Parcel App',
        todo: this.latestTodo,
      },
      width: '500px',
      autoFocus: false,
      disableClose: true,
      panelClass:'icon-outside' // if you remove this line, the icons will be inside the dialog
    });

    this.modalRef.afterClosed().subscribe((result: TodoParcelData) => {
      this.todoParcelData = result;

      if (this.todoParcelData.data) {
        this.todoServ.updateLatestTodo(this.todoParcelData.data);
      }

      console.log('Data coming from react parcel after closing dialog: ', result);
    });
  }
}
