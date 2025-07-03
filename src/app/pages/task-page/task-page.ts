import { TaskApi } from './../../entities/task/api/api';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Checkbox } from '../../shared/ui/checkbox/checkbox';

@Component({
  selector: 'app-task-page',
  imports: [Checkbox, RouterLink],
  templateUrl: './task-page.html',
  styleUrl: './task-page.scss',
})
export class TaskPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  taskId = this.activatedRoute.snapshot.params['id'];

  taskApi = inject(TaskApi);

  ngOnInit(): void {
    const task = this.taskApi.getById(this.taskId);
    if (!task) {
      this.router.navigate(['/tasks']);
      return;
    }
  }

  toggleCompletion() {
    const task = this.taskApi.getById(this.taskId);
    if (!task) return;
    this.taskApi.update(task.id, {
      isCompleted: !task.isCompleted,
    });
  }
}
