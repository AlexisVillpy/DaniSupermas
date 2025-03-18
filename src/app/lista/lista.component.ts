import { Component } from '@angular/core';
import { ListaService } from '../lista.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { PdfMonkeyService } from '../pdf-monkey.service'; // Importar el servicio de PDFMonkey

@Component({
  selector: 'app-lista',
  standalone: true,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css'],
  imports: [CommonModule, RouterModule, MatIconModule, FormsModule],
})
export class ListaComponent {
  productosEnLista: any[] = [];
  isLoading: boolean = true;
  showClientForm: boolean = false;
  clientData = { firstName: '', lastName: '', email: '', sucursal: '', phoneNumber: '' }; // Datos del cliente

  constructor(private listaService: ListaService, private pdfMonkeyService: PdfMonkeyService) {}

  ngOnInit() {
    this.productosEnLista = this.listaService.obtenerLista();
    this.productosEnLista.forEach((producto) => {
      if (!producto.cantidad || producto.cantidad < 1) {
        producto.cantidad = 1;
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  // Mostrar el formulario de cliente
  mostrarFormulario() {
    this.showClientForm = true;
  }

  // Cerrar el formulario (cuando se hace clic fuera o en el botón de cancelar)
  cerrarFormulario() {
    this.showClientForm = false;
  }

  // Enviar el formulario y generar el PDF
  onSubmit(clientForm: any): void {
    if (clientForm.valid) {
      this.generarPDF();
    }
  }

  async generarPDF(): Promise<void> {
    const formatDate = (date: Date): string => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    let invoiceNumber = parseInt(localStorage.getItem('invoiceNumber') || '0', 10);
    invoiceNumber += 1;
    localStorage.setItem('invoiceNumber', invoiceNumber.toString());

    const totalGlobal = Math.round(
      this.productosEnLista.reduce((total, producto) => {
        const precio = parseFloat(producto.precio) || 0;
        const cantidad = parseInt(producto.cantidad, 10) || 0;
        return total + precio * cantidad;
      }, 0)
    );

    const formatPrice = (price: number): string => {
      return price.toLocaleString('es-ES');
    };

    const invoiceData = {
      clientName: `${this.clientData.firstName} ${this.clientData.lastName}`,
      clientEmail: this.clientData.email,
      clientSucursal: this.clientData.sucursal,
      orderDate: formatDate(new Date()),
      products: this.productosEnLista.map((producto) => ({
        name: producto.nombre,
        quantity: parseInt(producto.cantidad, 10) || 0,
        unitPrice: parseFloat(producto.precio) || 0,
        formattedUnitPrice: formatPrice(parseFloat(producto.precio) || 0),
        total: formatPrice(
          (parseFloat(producto.precio) || 0) *
          (parseInt(producto.cantidad, 10) || 0)
        ),
      })),
      invoiceNumber: invoiceNumber.toString().padStart(5, '0'),
      total_without_vat: formatPrice(totalGlobal),
    };

    // Verificar campos obligatorios
    if (!invoiceData.clientName || !invoiceData.clientEmail || !invoiceData.orderDate || !invoiceData.products || !invoiceData.invoiceNumber || !invoiceData.total_without_vat) {
      console.error('Faltan campos obligatorios en los datos de la factura:', invoiceData);
      return;
    }

    console.log('Datos de la factura:', invoiceData);

    await this.pdfMonkeyService.generateInvoicePDF(invoiceData);
  }

  eliminarProducto(producto: any): void {
    this.listaService.eliminarProducto(producto);
    this.productosEnLista = this.listaService.obtenerLista();
  }
}
