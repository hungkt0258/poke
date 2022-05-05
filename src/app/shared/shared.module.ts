import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { NgxPermissionsModule } from 'ngx-permissions';
import { DateTimePickerComponent } from "./components/date-time-picker/date-time-picker.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { Daterangepicker } from 'ng2-daterangepicker';

@NgModule({
  declarations: [DateTimePickerComponent, DateRangePickerComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    FontAwesomeModule,
    TranslateModule,
    Daterangepicker
  ],
  exports: [TranslateModule, NgxPermissionsModule, DateTimePickerComponent, DateRangePickerComponent],
})
export class SharedModule {}
