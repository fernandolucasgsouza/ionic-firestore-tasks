import { take } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TasksService } from '../../services/tasks.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';

@Component({
  selector: 'app-task-save',
  templateUrl: './task-save.page.html',
  styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

  pageTitle = '...';
  taskId = undefined;
  form: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _navCtrl: NavController,
    private _activatedRoute: ActivatedRoute,
    private _service: TasksService,
    private _overlayService: OverlayService,
  ) { }

  ngOnInit(): void {
    this._createForm();
    this._init();
  }

  private _init(): void {
    const taskId = this._activatedRoute.snapshot.paramMap.get('id');

    if (!taskId) {
      this.pageTitle = 'Criar Tarefa';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'Editar Tarefa';
    this._service
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done }) => {
        this.form.get('title').setValue(title);
        this.form.get('done').setValue(done);
      })
  }

  private _createForm() {
    this.form = this._fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false],
    });
  }

  async onSubimit(): Promise<void> {
    const loading = await this._overlayService.loading({
      message: 'Salvando...'
    })

    try {
      !this.taskId
        ? await this._service.create(this.form.value)
        : await this._service.update({
          id: this.taskId,
          ...this.form.value
        });
      this._navCtrl.navigateBack('/tasks');
    } catch (error) {
      this._overlayService.toast('error', {
        message: `Ocorreu um erro: ${error.message}`
      })
    } finally {
      loading.dismiss();
    }

  }
}
