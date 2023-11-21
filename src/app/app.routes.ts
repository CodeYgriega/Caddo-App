import { Routes } from '@angular/router';
import { ListComponent } from './features/list/list.component';
import { DetailsComponent } from './features/details/details.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'list/:id',
    component: DetailsComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'notFound',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'notFound',
  },
];
