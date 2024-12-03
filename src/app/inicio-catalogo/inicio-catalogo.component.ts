import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Asegúrate de importar HttpClientModule también
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio-catalogo',
  standalone: true,
  templateUrl: './inicio-catalogo.component.html',
  styleUrls: ['./inicio-catalogo.component.css'],
  imports: [CommonModule, HttpClientModule]  // Asegúrate de importar HttpClientModule aquí
})
export class InicioCatalogoComponent implements OnInit {
  productos: any[] = [];

  constructor(private http: HttpClient) {
    console.log('HttpClient initialized:', !!this.http);
  }

  ngOnInit(): void {
    console.log('Componente cargado');
    this.cargarProductos();
  }
  
  cargarProductos(): void {
    console.log('Cargando productos...');
    this.http.get<any[]>('/assets/productos.json')
.subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        if (response && response.length > 0) {
          this.productos = response;
        } else {
          console.warn('No se encontraron productos.');
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      },
      complete: () => {
        console.log('Solicitud completada.');
      }
    });
  }
  
}  