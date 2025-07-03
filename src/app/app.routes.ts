import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { TaskPage } from './pages/task-page/task-page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: ':id',
        component: TaskPage,
      },
    ],
  },
];
