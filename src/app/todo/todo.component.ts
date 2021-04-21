import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Item } from "./model/item.model";

import { TodoService } from "./todo.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  public todos;
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

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks() {
    this.todoService.getAllitems().subscribe((items) => {
      this.todos = items;

      console.log(this.todos);
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
      category: this.item.category,
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
  updateOneTask(task: any) {
    var _task = {
      id: task.id,
      label: task.label,
      category: task.category,
      description: task.description,
      done: task.done,
    };
    this.todoService.updateItem(_task).subscribe((data) => {
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
