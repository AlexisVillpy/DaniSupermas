import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';  // Importa CommonModule
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { MatIconModule } from '@angular/material/icon';  // Importa MatIconModule

@Component({
  selector: 'app-inicio-catalogo',
  standalone: true,
  templateUrl: './inicio-catalogo.component.html',
  styleUrls: ['./inicio-catalogo.component.css'],
  imports: [
    HttpClientModule,  // Ya está importado
    CommonModule,      // Asegúrate de incluir CommonModule
    FormsModule,       // Incluye FormsModule para ngModel
    MatIconModule      // Incluye MatIconModule para mat-icon
  ]
})
export class InicioCatalogoComponent implements OnInit {
  productos: any[] = [];
  productosFiltrados: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  categorias: string[] = ['Cerveza', 'Aloe Vera', 'Café', 'San Sebastián', 'Smoothie', 'Pietro Coricelli'];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get<any[]>('assets/productos.json').subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.productos = response;
          this.productosFiltrados = response;
        } else {
          console.warn('No se encontraron productos.');
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  filtrarProductos(): void {
    const termino = this.searchTerm.toLowerCase();
    this.productosFiltrados = this.productos.filter(producto => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(termino) ||
        producto.precio.toString().includes(termino) ||
        producto.caja.toString().includes(termino);

      const coincideCategoria = this.selectedCategory ? producto.categoria === this.selectedCategory : true;

      return coincideBusqueda && coincideCategoria;
    });
  }

  onCategoryChange(): void {
    this.filtrarProductos();
  }
}
