import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemListComponent } from './components/items/item-list/item-list.component';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ItemComponent } from './components/items/item/item.component';
import { ItemDetailsComponent } from './components/items/item-details/item-details.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    ItemListComponent,
    ItemComponent,
    SafeHtmlPipe,
    ItemDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
