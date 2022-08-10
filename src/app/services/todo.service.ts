import { Injectable } from '@angular/core';

let TODOS = [
  { title: 'Install Single-Spa CLI', isDone: true },
  { title: 'Create Angular app', isDone: true },
  { title: 'Finish service functionality', isDone: false },
  { title: 'Setup API', isDone: false },
];

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
    const arTodo = localStorage.getItem('ar-todo');
    if (arTodo) {
      TODOS = JSON.parse(arTodo);
    } else {
      this.storeToLocalStorage();
    }
  }

  get(query = '') {
    return new Promise(resolve => {
      let data;

      if (query === 'completed' || query === 'active'){
        const isCompleted = query === 'completed';
        data = TODOS.filter(todo => todo.isDone === isCompleted);
      } else {
        data = TODOS;
      }

      resolve(data);
    });
  }

  add(data: any) {
    return new Promise(resolve => {
      TODOS.push(data);
      this.storeToLocalStorage();
      resolve(data);
    });
  }

  put(changed: any) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === changed);
      TODOS[index].title = changed.title;
      this.storeToLocalStorage();
      resolve(changed);
    });
  }

  delete(selected: any) {
    return new Promise(resolve => {
      const index = TODOS.findIndex(todo => todo === selected);
      TODOS.splice(index, 1);
      this.storeToLocalStorage();
      resolve(true);
    });
  }

  deleteCompleted() {
    return new Promise(resolve => {
      TODOS = TODOS.filter(todo => !todo.isDone);
      this.storeToLocalStorage();
      resolve(TODOS);
    });
  }

  toggle(selected: any) {
    selected.isDone = !selected.isDone;
    this.storeToLocalStorage();
    return Promise.resolve();
  }

  private storeToLocalStorage() {
    localStorage.setItem('ar-todo', JSON.stringify(TODOS));
  }

}
