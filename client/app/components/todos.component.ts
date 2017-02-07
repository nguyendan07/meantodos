import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todos.service';
import { Todo } from '../todo';

@Component({
  moduleId: module.id,
  selector: 'todos',
  templateUrl: `todos.component.html`
})
export class TodosComponent implements OnInit{
  todos: Todo[];
  constructor(private _todoService: TodoService){

  }

  ngOnInit(){
    this.todos = [];
    this._todoService.getTodo().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(event, todoText){
    var result;
    var newTodo = {
      text: todoText.value;
      isCompleted: false;
    };

    result = this._todoService.saveTodo(newTodo);
    result.subscribe(x => {
      this.todos.push(newTodo);
      todoText.value = '';
    })
  }
}
