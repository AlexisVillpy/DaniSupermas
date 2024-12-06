import { Component } from '@angular/core';
import { InicioCatalogoComponent } from './inicio-catalogo/inicio-catalogo.component';  // Importa el componente
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    InicioCatalogoComponent,
    MatIconModule  // Agrega MatIconModule aquí
  ]
})
export class AppComponent {
  // Lógica del componente
}
