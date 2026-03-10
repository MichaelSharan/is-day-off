import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/today-status/pages/today-status-main/today-status-main.component').then(m => m.TodayStatusMainComponent)
    }
];
