import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Importar HttpClientModule
import { SlackService } from './slack.service'; // Importar el servicio de Slack

@NgModule({
  declarations: [
    // ...existing code...
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Agregar HttpClientModule a los imports
    // ...existing code...
  ],
  providers: [SlackService], // Agregar SlackService a los providers
  bootstrap: [/* ...existing code... */]
})
export class AppModule { }
