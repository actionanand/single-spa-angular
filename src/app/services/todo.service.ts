import { Injectable } from '@angular/core';

import { Todo } from '../models/todo.model';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private TODOS: Todo[] = [
    { title: 'Install Single-Spa CLI', isDone: true },
    { title: 'Create Angular app', isDone: true },
    { title: 'Finish service functionality', isDone: false },
    { title: 'Setup API', isDone: false },
  ];

  private editLatestTodo = new BehaviorSubject<Todo|null>(null);
  editLatestTodo$ = this.editLatestTodo.asObservable();

  constructor() {
    const arTodo = localStorage.getItem('ar-todo');
    if (arTodo) {
      this.TODOS = JSON.parse(arTodo);
    } else {
      // this.storeToLocalStorage();
    }
  }

  get(query = '') {
    return new Promise(resolve => {
      let data;

      if (query === 'completed' || query === 'active'){
        const isCompleted = query === 'completed';
        data = this.TODOS.filter(todo => todo.isDone === isCompleted);
      } else {
        data = this.TODOS;
      }

      resolve(data);
    });
  }

  add(data: Todo) {
    return new Promise(resolve => {
      this.TODOS.push(data);
      this.storeToLocalStorage();
      resolve(data);
    });
  }

  put(changed: Todo, title: string) {
    return new Promise(resolve => {
      const index = this.TODOS.findIndex(todo => todo === changed);
      this.TODOS[index].title = title;
      this.TODOS[index].editing = false;
      this.storeToLocalStorage();
      resolve(changed);
    });
  }

  updateFromParcel(todo: Todo) {
    return new Promise(resolve => {
      const index = this.TODOS.length - 1;
      this.TODOS[index].title = todo.title;
      this.TODOS[index].isDone = todo.isDone;
      console.log(index, this.TODOS)
      this.storeToLocalStorage();
      resolve(todo);
    });
  }

  delete(selected: Todo) {
    return new Promise(resolve => {
      const index = this.TODOS.findIndex(todo => todo === selected);
      this.TODOS.splice(index, 1);
      this.storeToLocalStorage();
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      this.TODOS = this.TODOS.filter(todo => !todo.isDone);
      this.storeToLocalStorage();
      resolve(this.TODOS);
    });
  }

  toggle(selected: Todo) {
    selected.isDone = !selected.isDone;
    this.storeToLocalStorage();
    return Promise.resolve();
  }

  getTheLatestTodo() {
    if (this.TODOS.length > 0) {
      return this.TODOS.slice(-1)[0];
    } else {
      return { title: 'There\'s no new \'Todo\'', isDone: false };
    }
  }

  updateLatestTodo(todo: Todo) {
    this.editLatestTodo.next(todo);
  }

  private storeToLocalStorage() {
    localStorage.setItem('ar-todo', JSON.stringify(this.TODOS));
  }

}
