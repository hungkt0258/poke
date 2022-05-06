import { SharedModule } from "./shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { NgxImageZoomModule } from "ngx-image-zoom";
import { HomeModule } from "./home/home.module";
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { FooterComponent } from './footer/footer.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    NgxImageZoomModule,
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    HomeModule,
    FontAwesomeModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
