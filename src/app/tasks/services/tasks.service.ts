import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Firestore } from 'src/app/core/classes/firestore.class';
import { Task } from '../models/task.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task>{

  constructor(
    db: AngularFirestore,
    private authService: AuthService
  ) {
    super(db);
    this._init();
  }

  private _init(): void {
    this.authService.authState$.subscribe((user => {
      if (user) {
        this.setColletion(`/users/${user.uid}/tasks`);
        return
      }
      this.setColletion(null);
    }));
  }
}
