import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task.model';
import { TasksService } from '../../services/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { async } from '@angular/core/testing';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(
    private _tasksService: TasksService,
    private _overlayService: OverlayService,
    private _navCtrl: NavController
  ) { }

  async ngOnInit(): Promise<void> {
    const loading = await this._overlayService.loading();
    this.tasks$ = this._tasksService.getAll();
    this.tasks$.pipe(take(1)).subscribe(task => loading.dismiss());
  }

  onUpdate(task: Task): void {
    this._navCtrl.navigateForward(['tasks', 'edit', task.id]);
  }

  async onDelete(task: Task): Promise<void> {
    await this._overlayService.alert({
      message: `Você deseja realmente excluir a tarefa "${task.title}"`,
      buttons: [
        {
          text: 'Sim',
          handler: async () => {
            await this._tasksService.delete(task);
            await this._overlayService.toast('success', {
              message: `Tarefa "${task.title}" excluida!`,
            })
          }
        },
        'Não'
      ]
    })
  }

  async onDone(task: Task): Promise<void> {
    const tasUpdateDone = { ...task, done: !task.done };

    await this._tasksService.update(tasUpdateDone);
    await this._overlayService.toast(null, {
      message: `Tarefa "${task.title}" ${tasUpdateDone.done ? 'Completada' : 'Atualizada'}!`,
    })
  }
}
