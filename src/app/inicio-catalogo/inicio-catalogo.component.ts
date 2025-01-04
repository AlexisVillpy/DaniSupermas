import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-inicio-catalogo',
  standalone: true,
  templateUrl: './inicio-catalogo.component.html',
  styleUrls: ['./inicio-catalogo.component.css'],
  imports: [CommonModule, HttpClientModule, MatIconModule, FormsModule] // Agrega FormsModule
})
export class InicioCatalogoComponent implements OnInit {
  productos: any[] = []; // Lista original de productos
  productosFiltrados: any[] = []; // Lista filtrada de productos
  searchTerm: string = ''; // Término de búsqueda
  selectedCategory: string = ''; // Categoría seleccionada

  categorias: string[] = ['Cerveza', 'Aloe Vera', 'Café', 'San Sebastián', 'Smoothie','Pietro Coricelli']; // Categorías disponibles

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  // Carga inicial de productos
  cargarProductos(): void {
    this.http.get<any[]>('/assets/productos.json').subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          this.productos = response;
          this.productosFiltrados = response; // Inicializa la lista filtrada
        } else {
          console.warn('No se encontraron productos.');
        }
      },
      error: (error) => {
        console.error('Error al cargar productos:', error);
      }
    });
  }

  // Filtra los productos según el término de búsqueda y la categoría seleccionada
  filtrarProductos(): void {
    const termino = this.searchTerm.toLowerCase(); // Normaliza el texto a minúsculas
    this.productosFiltrados = this.productos.filter(producto => {
      const coincideBusqueda = producto.nombre.toLowerCase().includes(termino) ||
        producto.precio.toString().includes(termino) ||
        producto.caja.toString().includes(termino);

      const coincideCategoria = this.selectedCategory ? producto.categoria === this.selectedCategory : true; // Verifica si la categoría seleccionada coincide

      return coincideBusqueda && coincideCategoria;
    });
  }

  // Detecta cuando se cambia la categoría y filtra los productos
  onCategoryChange(): void {
    this.filtrarProductos(); // Refresca la lista cuando la categoría cambie
  }
}
