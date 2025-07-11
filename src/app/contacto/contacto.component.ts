import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio-contacto',
  standalone: true,
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule,
  ],
})
export class ContactoComponent implements OnInit, AfterViewInit {
  searchTerm: string = '';
  selectedCategory: string = '';
  categorias: string[] = ['Asunción'];
  whatsappLinks: { [key: string]: string } = {
    Asunción: 'https://wa.me/595992315555',
   // CDE: 'https://wa.me/',
  };

  isLoading: boolean = true; // Controla la visibilidad del preloader
  isContactPage: boolean = true; // Indicador de si estamos en la página de contacto

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false; // Oculta el preloader después de que Angular haya cargado la vista
    }, 500); // Ajusta este tiempo si es necesario
  }

  onCategoryChange(): void {}

  getWhatsAppLink(): string | null {
    return this.whatsappLinks[this.selectedCategory] || null;
  }
}
