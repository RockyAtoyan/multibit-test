import cuid from 'cuid';
import { Task, TaskBase } from '../model/task';
import { Injectable, signal } from '@angular/core';
import { FilterValue } from '../../../shared/types';

@Injectable({
  providedIn: 'root',
})
export class TaskApi {
  tasks$ = signal(new Map<string, Task>());

  public getAll(filterValue?: FilterValue, searchValue = ''): Task[] | null {
    try {
      return Array.from(this.tasks$().values())
        .filter((task) => {
          return (
            task.title.includes(searchValue) ||
            task.description?.includes(searchValue)
          );
        })
        .sort((t1, t2) => {
          const t1CreatedAt = new Date(t1.createdAt).getTime();
          const t2CreatedAt = new Date(t2.createdAt).getTime();
          if (filterValue === 'createdAt') {
            return t1CreatedAt - t2CreatedAt;
          }
          if (filterValue === 'createdAtDesc') {
            return t2CreatedAt - t1CreatedAt;
          }
          return t1.title.localeCompare(t2.title);
        });
    } catch (error) {
      return null;
    }
  }

  public getById(id: string): Task | null {
    try {
      return this.tasks$().get(id) || null;
    } catch (error) {
      return null;
    }
  }

  public add(taskDto: TaskBase): Task | null {
    try {
      const id = cuid();
      const task = {
        ...taskDto,
        id,
        createdAt: new Date(),
      };
      this.tasks$.set(this.tasks$().set(id, task));
      return task;
    } catch (error) {
      return null;
    }
  }

  public update(id: string, taskDto: Partial<TaskBase>): Task | null {
    try {
      if (!this.tasks$().has(id)) {
        return null;
      }
      const task = { ...this.tasks$().get(id), ...taskDto } as Task;
      this.tasks$.set(this.tasks$().set(task.id, task));
      return task;
    } catch (error) {
      return null;
    }
  }

  public delete(id: string): boolean {
    try {
      if (!this.tasks$().has(id)) {
        return false;
      }
      const tasks = this.tasks$();
      tasks.delete(id);
      this.tasks$.set(tasks);
      return true;
    } catch (error) {
      return false;
    }
  }
}
