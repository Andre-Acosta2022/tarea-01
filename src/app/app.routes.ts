import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';

export const routes: Routes = [

    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
{
        path: 'prod',
         component: ProductoComponent,
        title: 'Producto'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
