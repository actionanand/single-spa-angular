import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

import { getData, state$ } from '@actionanand/utility';

import { singleSpaPropsSubject } from '../../../single-spa/single-spa-props';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  public todos: any;
  public activeTasks!: string;
  public newTodo!: string;
  public path!: string;

  routerSub!: Subscription;
  singleSpaProbSub!: Subscription;
  utiSub!: Subscription;
  todoUpdateSub!: Subscription;

  title = 'Angular Todo';

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routerSub = this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });

    this.singleSpaProbSub = singleSpaPropsSubject.pipe(debounceTime(0), take(1)).subscribe((props: any) => {
      this.title = props.angTitle;
    });

    this.todoUpdateSub = this.todoService.editLatestTodo$.subscribe((todo) => {
      if (!todo) {
        return;
      }
      
      this.todoService.updateFromParcel(todo).then(() => {
        return this.getTodos();
      });
    });

    getData('/data').then((data: any) => {
      console.log('angular ', data);
    });

    this.utiSub = state$.subscribe((resp: any) => {
      // console.log('angular ', resp.data.angTodo);
      const newTodoTxt = resp.data?.angTodo;
      if (newTodoTxt) {
        this.newTodo = newTodoTxt;
        this.addTodo();
        this.newTodo = '';
        // state$.next('');
      }
    });
  }

  addTodo(){
    this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = ''; // clear input form value
    });
  }

  getTodos(query = ''){
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.todos.filter((todo: { isDone: any; }) => !todo.isDone).length;
    });
  }

  updateTodo(todo: Todo, newTitle: string) {
    return this.todoService.put(todo, newTitle).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo: Todo) {
    this.todoService.delete(todo).then(() => {
      return this.getTodos();
    });
  }

  clearCompleted() {
    this.todoService.deleteCompleted().then(() => {
      return this.getTodos();
    });
  }

  toggleTodo(todo: Todo) {
    this.todoService.toggle(todo).then(() => {
      return this.getTodos();
    });
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    
    if (this.singleSpaProbSub) {
      this.singleSpaProbSub.unsubscribe();
    }

    if (this.utiSub) {
      this.utiSub.unsubscribe();
    }

    if (this.todoUpdateSub) {
      this.todoUpdateSub.unsubscribe();
    }
  }
}
