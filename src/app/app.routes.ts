import { Routes } from '@angular/router';
import { ContactoComponent } from './contacto/contacto.component';
import { AppComponent } from './app.component';
import { InicioCatalogoComponent } from './inicio/inicio-catalogo.component';

export const routes: Routes = [
  { path: '', component: AppComponent }, // Ruta principal
  { path: 'inicio', component: InicioCatalogoComponent }, // Ruta para el componente de inicio
  { path: 'contacto', component: ContactoComponent }, // Ruta para el componente de contacto
];
