import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';
import { SearchComponent } from './search/search.component';
import { FilterPipePipe } from './pipe/filter-pipe.pipe';
import { InputFilterDirective } from './directive/input.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    appRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    FilterPipePipe,
    InputFilterDirective ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
