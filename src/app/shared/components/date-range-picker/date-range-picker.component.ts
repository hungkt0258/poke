import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import moment, { Moment } from 'moment';
import { faCalendar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { DaterangepickerComponent } from 'ng2-daterangepicker';

export type DateRangePickerModel = {
  start: Date,
  end: Date
}
@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  @Output() apply: EventEmitter<DateRangePickerModel> = new EventEmitter(); //Click apply
  @Output() reset: EventEmitter<boolean> = new EventEmitter(); //Click reset

  @Input()
  startDate: Date; //Ngày bắt đầu
  
  @Input()
  endDate: Date; //Ngày kết thúc

  @Input()
  isTimePicker: boolean = false; //Hiển thị time picker

  @Input()
  isShowDefault: boolean = false; //Mặc định chọn 7 ngày

  faCalendar = faCalendar;
  faTimes = faTimes;

  selectedDateRange: { start: Moment, end: Moment } = {
    start: moment().subtract(6, 'days'),
    end: moment()
  };

  dateRangeApplied: { start: Moment, end: Moment } = {
    start: null,
    end: null
  };

  ranges: any = {
    [this.translate.instant('today')]: [moment(), moment()],
    [this.translate.instant('yesterday')]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    [this.translate.instant('last_days', {day: 7})]: [moment().subtract(6, 'days'), moment()],
    [this.translate.instant('last_days', {day: 30})]: [moment().subtract(29, 'days'), moment()],
    [this.translate.instant('last_days', {day: 90})]: [moment().subtract(90, 'days'), moment()],
    [this.translate.instant('this_month')]: [moment().startOf('month'), moment().endOf('month')],
    [this.translate.instant('last_month')]: [
      moment().subtract(1, 'month').startOf('month'),
      moment().subtract(1, 'month').endOf('month'),
    ],
  };

  applyLabel = this.translate.instant('confirm');
  cancelLabel = this.translate.instant('cancel');
  customRangeLabel = this.translate.instant('custom_range');

  public options: any = {
    locale: { 
      format: 'DD/MM/YYYY', 
      customRangeLabel: this.customRangeLabel, 
      applyLabel: this.applyLabel, 
      cancelLabel: this.cancelLabel,
      monthNames: moment.months()
    },
    keepCalendarOpeningWithRange: true,
    alwaysShowCalendars: true,
    ranges: this.ranges,
    showDropdowns: true,
    autoApply: false,
    linkedCalendars: false,
    timePicker: false,
    timePicker24Hour: true,
    timePickerSeconds: true,
    opens: "left",
  };

  @ViewChild(DaterangepickerComponent) 
  private picker: DaterangepickerComponent;

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    if (this.startDate && this.endDate) {
      const startTemp = moment(this.startDate);
      const endTemp = moment(this.endDate);
      if (startTemp.isBefore(endTemp)) {
        this.selectedDateRange.start = startTemp;
        this.selectedDateRange.end = endTemp;
        this.dateRangeApplied.start = startTemp;
        this.dateRangeApplied.end = endTemp;
      }
    } else if (this.isShowDefault) {
      this.dateRangeApplied = {...this.selectedDateRange};
    }

    this.options.timePicker = this.isTimePicker;

    if (this.translate.currentLang === 'vi') {
      moment.locale('vi');
      this.options.locale.monthNames = moment.months();
      this.options.locale.format = "DD/MM/YYYY";
      
    } else {
      moment.locale('en');
      this.options.locale.monthNames = moment.monthsShort();
      this.options.locale.format = "MM/DD/YYYY";
    }
    this.options.startDate = this.selectedDateRange.start.format(this.options.locale.format);
    this.options.endDate = this.selectedDateRange.end.format(this.options.locale.format);

    this.translate.onLangChange.subscribe(rs => {
      this.ranges = {
        [this.translate.instant('today')]: [moment(), moment()],
        [this.translate.instant('yesterday')]: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        [this.translate.instant('last_days', {day: 7})]: [moment().subtract(6, 'days'), moment()],
        [this.translate.instant('last_days', {day: 30})]: [moment().subtract(29, 'days'), moment()],
        [this.translate.instant('last_days', {day: 90})]: [moment().subtract(90, 'days'), moment()],
        [this.translate.instant('this_month')]: [moment().startOf('month'), moment().endOf('month')],
        [this.translate.instant('last_month')]: [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
      };
      this.applyLabel = this.translate.instant('confirm');
      this.cancelLabel = this.translate.instant('cancel');
      this.customRangeLabel = this.translate.instant('custom_range');
      //Update date-picker
      this.options.ranges = this.ranges;
      this.options.locale.customRangeLabel = this.customRangeLabel;
      this.options.locale.applyLabel = this.applyLabel;
      this.options.locale.cancelLabel = this.cancelLabel;
      this.options.endDate = moment().format("DD/MM/YYYY");
      if (rs.lang === 'vi') {
        moment.locale('vi');
        this.options.locale.monthNames = moment.months();
        this.options.locale.format = "DD/MM/YYYY";
      } else {
        moment.locale('en')
        this.options.locale.monthNames = moment.monthsShort();
        this.options.locale.format = "MM/DD/YYYY";
      }
      this.options.startDate = this.selectedDateRange.start.format(this.options.locale.format)
      this.options.endDate = this.selectedDateRange.end.format(this.options.locale.format)
    });
  }

  public selectedDate(value: {start: Moment, end: Moment}) {
    this.selectedDateRange.start = value.start;
    this.selectedDateRange.end = value.end;
  }

  formatDateTime(format: string) {
    if (this.isTimePicker) {
      return format.replace('DD', 'dd') + " hh:mm:ss";
    }
    return format.replace('DD', 'dd');
  }

  public calendarApplied(e:any) {
    this.dateRangeApplied = {...this.selectedDateRange};
    this.apply.emit({
      start: this.dateRangeApplied.start.toDate(),
      end: this.dateRangeApplied.end.toDate(),
    });
  }

  hideCalendarDaterangepicker(e) {
    // console.log(e);
  }
  hideDaterangepicker(e) {
    // console.log(e);
  }
  showCalendarDaterangepicker(e) {
    // console.log(e)
  }

  showDaterangepicker(e) {
    if (this.dateRangeApplied.start && this.dateRangeApplied.end) {
      this.selectedDateRange.start = this.dateRangeApplied.start;
      this.selectedDateRange.end = this.dateRangeApplied.end;
      this.picker.datePicker.setStartDate(this.dateRangeApplied.start.format(this.options.locale.format));
      this.picker.datePicker.setEndDate(this.dateRangeApplied.end.format(this.options.locale.format));
      this.picker.datePicker.updateView();
    }
  }

  onResetDateRangePicker() {
    if (this.dateRangeApplied.start || this.dateRangeApplied.end) {
      this.dateRangeApplied = {
        start: null,
        end: null
      }
      this.reset.emit(true);
    }
  }
}
