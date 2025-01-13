import { Component } from '@angular/core';
import { InicioCatalogoComponent } from './inicio/inicio-catalogo.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [InicioCatalogoComponent, MatIconModule, RouterModule],
})
export class AppComponent {}
