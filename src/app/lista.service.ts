import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  private productosEnLista: any[] = [];

  constructor() {
    // Recuperar la lista desde localStorage al inicializar el servicio
    const listaGuardada = localStorage.getItem('listaProductos');
    if (listaGuardada) {
      this.productosEnLista = JSON.parse(listaGuardada);
    }
  }

  private guardarEnLocalStorage(): void {
    localStorage.setItem('listaProductos', JSON.stringify(this.productosEnLista));
  }

  agregarProducto(producto: any) {
    if (!this.productosEnLista.some((p) => p.nombre === producto.nombre)) {
      this.productosEnLista.push(producto);
      this.guardarEnLocalStorage(); // Guardar en localStorage
    }
  }

  obtenerLista(): any[] {
    return this.productosEnLista;
  }

  eliminarProducto(producto: any): void {
    this.productosEnLista = this.productosEnLista.filter((p) => p.nombre !== producto.nombre);
    this.guardarEnLocalStorage(); // Actualizar localStorage
  }

  actualizarCantidad(nombreProducto: string, cantidad: number): void {
    const producto = this.productosEnLista.find((p) => p.nombre === nombreProducto);
    if (producto) {
      producto.cantidad = cantidad;
      this.guardarEnLocalStorage(); // Guardar los cambios
    }
  }
}