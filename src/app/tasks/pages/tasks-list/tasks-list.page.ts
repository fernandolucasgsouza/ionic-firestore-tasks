import { Component, OnInit } from '@angular/core';
import { TasksService } from '../../services/tasks.service';
import { Observable, of } from 'rxjs';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private _tasksService: TasksService) { }

  ngOnInit() {
  //   this.tasks$ = of([
  //     {
  //     id:'123',
  //     title:'Ionic',
  //     done:false
  //   },{
  //       id: '124',
  //       title: 'Angular',
  //       done:true
  //   }
  // ])
    this.tasks$ = this._tasksService.getAll();
  }

}
