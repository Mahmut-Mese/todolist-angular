import { Component, Input, OnInit } from "@angular/core";
import { Item } from "./model/item.model";

import { TodoService } from "./todo.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  public todos: Item[];
  public activeTasks;
  public newTodo;
  public path;
  public taskId;
  public itemList;
  public done;
  category: string;
  description: string;
  label: string;
  _id: number;
  @Input() item: Item = new Item();

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks() {
    this.todoService.getAllitems().subscribe((items) => {
      this.todos = items;
    });
  }
  getActiveTasks() {
    this.todoService.getAllitems().subscribe((items) => {
      this.todos = items;
      this.todos = this.todos.filter((todo) => !todo.done);
    });
  }
  getCompletedTasks() {
    this.todoService.getAllitems().subscribe((items) => {
      this.todos = items;
      this.todos = this.todos.filter((todo) => todo.done);
    });
  }
  deleteOneTask(id) {
    this.todoService.deleteItem(id).subscribe();
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  addOneTask(event) {
    event.preventDefault();
    var newTask = {
      label: this.item.label,
      description: this.item.description,
      done: false,
      id: this.item.id,
    };
    this.item.label = "";
    this.item.description = "";
    this.todoService.addItem(newTask).subscribe((task) => {
      this.getAllTasks();
    });
  }

  toggleTask(todo) {
    todo.done = !todo.done;
    this.todoService.updateItem(todo).subscribe((data) => {
      this.getAllTasks();
    });
  }
  updateOneTask(task: Item) {
    this.todoService.updateItem(task).subscribe((data) => {
      this.getAllTasks();
    });
    this.item.label = "";
    this.item.description = "";
  }
  seeTask(task: any) {
    this.todoService.getItem(task.id).subscribe((data) => {
      this.item = data;
    });
  }
}
