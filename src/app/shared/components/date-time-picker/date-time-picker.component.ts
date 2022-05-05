import {
  Component,
  OnInit,
  Input,
  forwardRef,
  ViewChild,
  AfterViewInit,
  Injector,
  ChangeDetectorRef,
  SimpleChanges
} from '@angular/core';
import {
  NgbTimeStruct,
  NgbDateStruct,
  NgbPopoverConfig,
  NgbPopover,
  NgbDatepicker,
  NgbDate
} from '@ng-bootstrap/ng-bootstrap';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NgControl
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { noop } from 'rxjs';
import { IfStmt } from '@angular/compiler';
import moment_, { Moment } from 'moment';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons'
import { DaterangepickerComponent } from 'ng2-daterangepicker';
const moment = moment_;
@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true
    }
  ]
})
export class DateTimePickerComponent implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild(DaterangepickerComponent) 
  private picker: DaterangepickerComponent;
  
  @Input()
  format: string = 'DD/MM/YYYY';

  @Input()
  placeholder: string = "";

  @Input()
  isTimePicker: boolean = true;

  @Input()
  maxDate: Date = moment("31/12/2099", "DD/MM/YYYY").toDate();

  @Input()
  minDate: Date = moment("1/1/1920", "DD/MM/YYYY").toDate();

  @Input()
  openPosition: string = 'left'; //Vị trí hiển thị

  public options: any = {
    locale: { 
      format: 'DD/MM/YYYY', 
    },
    singleDatePicker: true,
    alwaysShowCalendars: true,
    showDropdowns: true,
    autoApply: false,
    linkedCalendars: false,
    timePicker: false,
    timePicker24Hour: true,
    timePickerSeconds: true,
    minYear: 1920,
    maxYear: 2099,
    opens: "left",
    autoUpdateInput: false,
  };

  private today = new Date();
  dateShow: string = '';
  private onTouched: () => void = noop;
  private onChange: (_: Date) => void = noop;

  public ngControl: NgControl;

  // dateStruct: NgbDateStruct;
  // timeStruct: NgbTimeStruct;
  // date: Date;
  faCalendarAlt = faCalendarAlt;
  isDisabled: boolean;

  constructor(
    private config: NgbPopoverConfig, 
    private inj: Injector, 
    datePipe: DatePipe,
    private changeDet:ChangeDetectorRef) {
    config.autoClose = 'outside';
    config.placement = 'auto';
  }

  ngOnInit(): void {
    this.options.locale.format = this.format;
    this.options.maxDate = moment(this.maxDate, this.format);
    this.options.minDate = moment(this.minDate, this.format);
    this.options.timePicker = this.isTimePicker;
    this.options.opens = this.openPosition;
    // if (this.min) {
    //   let dateMinTemp = new Date(this.min*1000);
    //   this.minDate = {
    //     year: dateMinTemp.getFullYear(),
    //     month: dateMinTemp.getMonth() + 1,
    //     day: dateMinTemp.getDate()
    //   }
    // }
    // if (this.max) {
    //   let dateMaxTemp = new Date(this.max*1000);
    //   this.maxDate = {
    //     year: dateMaxTemp.getFullYear(),
    //     month: dateMaxTemp.getMonth() + 1,
    //     day: dateMaxTemp.getDate()
    //   }
    // }
    
    // tslint:disable-next-line: deprecation
    this.ngControl = this.inj.get(NgControl);
  }

  ngAfterViewInit(): void {
    this.setDateStringModel();
  }

  writeValue(newModel: Date) {
    if (newModel) {
      this.options.startDate = moment(newModel).format(this.format);
      const temp = moment(newModel);
      this.picker.datePicker.setStartDate(temp);
      this.picker.datePicker.setEndDate(temp);
      this.picker.datePicker.element.val(temp.format(this.options.locale.format)).trigger('change');
    } else {
      if (this.picker) {
        this.picker.datePicker.startDate = null;
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn; 
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }


  onTimeChange(event: NgbTimeStruct) {
    this.setDateStringModel();
  }

  setDateStringModel() {
    
    // if (!this.timeStruct) {
    //   const dateA = new Date();
    //   this.timeStruct = {
    //     hour: dateA.getHours(),
    //     minute: dateA.getMinutes(),
    //     second: dateA.getSeconds()
    //   };
    // }
    
    // if (this.dateStruct) {
    //   this.date = new Date(
    //     this.dateStruct.year,
    //     this.dateStruct.month - 1,
    //     this.dateStruct.day,
    //     this.timeStruct.hour,
    //     this.timeStruct.minute,
    //     this.timeStruct.second
    //   );
    //   this.dateShow = moment(this.date).format(this.format);
    //   this.onChange(this.date);
    // } 
    
  }

  inputBlur(event) {
    this.onTouched();
  }

  isToday = (date: NgbDate) => {
    return date.day == this.today.getDate() && 
      date.month == this.today.getMonth()+1 &&
      date.year == this.today.getFullYear();
  }

  keyUpFunction(e) {
  }

  triggerOpenDatePicker() {
    this.picker.datePicker.toggle();
  }
  
  selectedDate($event: {start: Moment, end: Moment}) {   
    this.updateDateInput(true, $event.start);
    this.onChange($event.start.toDate())
  }

  private updateDateInput(isOnlyUpdateInput: boolean = false, date: Moment = null) {
    if (!isOnlyUpdateInput) {
      this.picker.datePicker.elementChanged();
      const startDate = this.picker.datePicker.startDate.format(this.options.locale.format);
      this.picker.datePicker.element.val(startDate).trigger('change');
    } else {
      this.picker.datePicker.element.val(date.format(this.options.locale.format)).trigger('change');
    }
  }

  onDateChange(event) {
    if (event.target.value) {
      this.updateDateInput();
    } else {
      this.onChange(null)
      this.picker.datePicker.setStartDate(null);
      // this.picker.datePicker.setEndDate(moment());
      this.picker.datePicker.updateView();
    }
  }

}