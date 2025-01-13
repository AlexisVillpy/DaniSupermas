import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { ContactoComponent } from './app/contacto/contacto.component';
import { InicioCatalogoComponent } from './app/inicio/inicio-catalogo.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Redirige a /inicio por defecto
  { path: 'inicio', component: InicioCatalogoComponent },
  { path: 'contacto', component: ContactoComponent },
];

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)],
}).catch((err) => console.error(err));
