import { NgImageSliderModule } from "ng-image-slider";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetailPokemonDialogComponent } from "./detail-pokemon-dialog/detail-pokemon-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [HomeComponent, DetailPokemonDialogComponent],
  imports: [
    HomeRoutingModule,
    CommonModule,
    NgImageSliderModule,
    NgbModule,
    MatDialogModule,
    FormsModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  exports: [MatProgressSpinnerModule],
  entryComponents: [DetailPokemonDialogComponent],
})
export class HomeModule {}
