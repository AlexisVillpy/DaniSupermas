import { Component } from '@angular/core';
import { InicioCatalogoComponent } from './inicio-catalogo/inicio-catalogo.component';  // Importa el componente

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [InicioCatalogoComponent]  // Aquí se importa el componente standalone
})
export class AppComponent {
  // Lógica del componente
}
