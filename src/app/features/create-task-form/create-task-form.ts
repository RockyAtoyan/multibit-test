import { TaskApi } from './../../entities/task/api/api';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Input } from '../../shared/ui/input/input';
import { Button } from '../../shared/ui/button/button';
import { Input as InputDecorator } from '@angular/core';

@Component({
  selector: 'create-task-form',
  imports: [ReactiveFormsModule, Input, Button],
  templateUrl: './create-task-form.html',
  styleUrl: './create-task-form.scss',
})
export class CreateTaskForm {
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  @InputDecorator() onCreate?: () => void = () => {};

  constructor(private taskApi: TaskApi) {}

  onSubmit() {
    const data = this.form.value;
    if (!data.title) {
      this.form.setErrors({ title: 'Title is required' });
      return;
    }
    this.taskApi.add({
      title: data.title,
      isCompleted: false,
      description: data.description || '',
    });
    this.form.reset({ title: '', description: '' });
    this.onCreate?.();
  }
}
