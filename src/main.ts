import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, Routes } from '@angular/router';
import { ContactoComponent } from './app/contacto/contacto.component';
import { InicioCatalogoComponent } from './app/inicio/inicio-catalogo.component';
import { ListaComponent } from './app/lista/lista.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioCatalogoComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'lista', component: ListaComponent },
];

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    FormsModule, // Asegúrate de incluir FormsModule aquí
  ],
}).catch((err) => console.error(err));
