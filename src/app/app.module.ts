import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FilterPipe } from './filter.pipe';
import { CustomWherePipe } from './custom-where.pipe';
import { TableComponent } from './table/table.component';
// import { RouterModule, Routes } from '@angular/router';

// const appRoutes: Routes = [
//   { path: 'students', component: AppComponent }
// ];
@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    CustomWherePipe,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
