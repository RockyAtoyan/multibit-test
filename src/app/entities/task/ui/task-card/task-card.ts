import { TaskApi } from './../../api/api';
import { Component, Input } from '@angular/core';
import { Task } from '../../model/task';
import { Button } from '../../../../shared/ui/button/button';
import { Checkbox } from '../../../../shared/ui/checkbox/checkbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'task-card',
  imports: [Button, Checkbox, RouterLink],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  @Input() task: Task | null = null;

  constructor(private taskApi: TaskApi) {}

  toggleCompletion() {
    if (!this.task) return;
    this.taskApi.update(this.task.id, {
      isCompleted: !this.task.isCompleted,
    });
  }

  delete() {
    if (!this.task) return;
    this.taskApi.delete(this.task.id);
  }
}
