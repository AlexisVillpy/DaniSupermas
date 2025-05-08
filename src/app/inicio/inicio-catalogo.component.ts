import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ListaService } from '../lista.service';

@Component({
  selector: 'app-inicio-catalogo',
  standalone: true,
  templateUrl: './inicio-catalogo.component.html',
  styleUrls: ['./inicio-catalogo.component.css'],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
  ],
})
export class InicioCatalogoComponent implements OnInit, AfterViewInit {
  productos: any[] = []; // Lista de productos
  productosFiltrados: any[] = []; // Productos filtrados por búsqueda/categoría
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedOrder: string = ''; // Nuevo campo para el orden seleccionado
  categorias: string[] = ['Negro', 'Blanco', 'Amarillo', 'Verde']; // Cambiado a colores
  materiales: string[] = ['BD', 'AD']; // Nuevo filtro para materiales
  selectedMaterial: string = ''; // Nuevo campo para el material seleccionado
  litros: string[] = ['100lts', '150lts', '200lts', '250lts', '300lts']; // Nuevo filtro para litros
  selectedLitros: string = ''; // Nuevo campo para los litros seleccionados

  isLoading: boolean = true; // Controla la visibilidad del preloader
  selectedProduct: any = null; // Producto seleccionado para mostrar en el modal

  constructor(private http: HttpClient, private listaService: ListaService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false; // Oculta el preloader después de que Angular haya cargado la vista
    }, 500); // Ajusta este tiempo si es necesario
  }

  cargarProductos(): void {
    this.isLoading = true;
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
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  filtrarProductos(): void {
    const termino = this.searchTerm.toLowerCase();
    this.productosFiltrados = this.productos.filter((producto) => {
      const coincideBusqueda =
        producto.nombre.toLowerCase().includes(termino) ||
        producto.precio.toString().includes(termino) || // Asegurar que se use el campo 'precio'
        producto.caja.toLowerCase().includes(termino);

      const coincideCategoria = this.selectedCategory
        ? producto.color.toLowerCase() === this.selectedCategory.toLowerCase()
        : true;

      const coincideMaterial = this.selectedMaterial
        ? producto.material.toLowerCase() === this.selectedMaterial.toLowerCase()
        : true;

      const coincideLitros = this.selectedLitros
        ? producto.litros.toLowerCase() === this.selectedLitros.toLowerCase()
        : true;

      return coincideBusqueda && coincideCategoria && coincideMaterial && coincideLitros;
    });

    // Ordenar los productos filtrados si se seleccionó un orden
    if (this.selectedOrder === 'asc') {
      this.productosFiltrados.sort((a, b) => a.precio - b.precio); // Usar 'precio' para ordenar
    } else if (this.selectedOrder === 'desc') {
      this.productosFiltrados.sort((a, b) => b.precio - a.precio); // Usar 'precio' para ordenar
    }
  }

  onCategoryChange(): void {
    this.filtrarProductos();
  }

  onOrderChange(): void {
    this.filtrarProductos(); // Reaplicar el filtro y orden
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Desplazamiento suave
    });
  }

  // Método para abrir el modal con los detalles del producto
  verDetalles(producto: any): void {
    this.selectedProduct = producto;
  }

  // Método para cerrar el modal
  cerrarModal(): void {
    this.selectedProduct = null;
  }
}
