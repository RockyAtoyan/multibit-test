import { Component, inject } from '@angular/core';
import { Modal } from '../../shared/ui/modal/modal';
import { Button } from '../../shared/ui/button/button';
import { CreateTaskForm } from '../../features/create-task-form/create-task-form';
import { TaskApi } from '../../entities/task/api/api';
import { TaskCard } from '../../entities/task/ui/task-card/task-card';
import { Input } from '../../shared/ui/input/input';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterValue } from '../../shared/types';

@Component({
  selector: 'app-home',
  imports: [Modal, Button, CreateTaskForm, TaskCard, Input],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  showModal = false;

  taskApi = inject(TaskApi);

  searchValue = '';
  searchControl = new FormControl();

  filterValue: FilterValue = 'createdAt';

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.performSearch(term);
      });
  }

  performSearch(term: string) {
    this.searchValue = term;
  }

  setFilter(value: FilterValue) {
    this.filterValue = value;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onModalClosed() {
    this.showModal = false;
  }

  confirmAction() {
    alert('Action confirmed!');
    this.closeModal();
  }
}
