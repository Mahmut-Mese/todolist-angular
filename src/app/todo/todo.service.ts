import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Item } from "./model/item.model";

@Injectable({
  providedIn: "root",
})
export class TodoService {
  public item: any;
  private host = "http://localhost:3000";

  constructor(private http: HttpClient) {}
  getAllitems() {
    return this.http.get<Item[]>(this.host + "/tasks/");
  }
  deleteItem(id) {
    return this.http.delete(this.host + "/tasks/" + id);
  }

  addItem(item: Item) {
    return this.http.post(this.host + "/tasks", item);
  }
  updateItem(_task: Item) {
    return this.http.put(this.host + "/tasks/" + _task.id, _task);
  }
  getItem(id) {
    console.log(id);
    return this.http.get<Item>(this.host + "/tasks/" + id);
  }
}
