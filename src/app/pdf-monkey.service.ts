import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class PdfMonkeyService {

  private apiUrl = 'https://api.pdfmonkey.io/v1/documents';
  private apiKey = 'bRzrMx1xbAqQQvnvxWMy';  // Sustituye con tu API key de PDFMonkey

  constructor() { }

  async generateInvoicePDF(invoiceData: any) {
    try {
      // Aquí configuras los datos que van a reemplazar la plantilla de PDFMonkey
      const response = await axios.post(
        this.apiUrl,
        {
          template: 'tu-template-id', // Sustituye con el ID de tu plantilla en PDFMonkey
          data: {
            invoice_number: invoiceData.invoiceNumber,
            invoice_date: invoiceData.invoiceDate,
            client_code: invoiceData.clientCode,
            client_name: invoiceData.clientName,
            client_email: invoiceData.clientEmail,
            line_items: invoiceData.lineItems,
            total_without_vat: invoiceData.totalWithoutVat,
            deposit: invoiceData.deposit || 0,
            due_date: invoiceData.dueDate
          }
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`
          }
        }
      );

      // Descargar el PDF generado
      const pdfUrl = response.data.url;  // URL del PDF generado
      window.open(pdfUrl, '_blank');  // Abre el PDF en una nueva pestaña

    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }
}
