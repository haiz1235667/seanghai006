import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Pos } from './pos/pos';
import { Invoice } from './invoice/invoice';

export const routes: Routes = [
  { path: '', component: Home },
  {
    component: Pos,
    path: 'pos',

  },
  {
    component: Invoice,
    path: 'invoice',

  },
  { path: '**', redirectTo: '' },
];
