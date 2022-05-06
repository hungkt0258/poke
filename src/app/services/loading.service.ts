import { Injectable, } from '@angular/core';
import $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingEl = null;

  constructor() { }

  initLoadingElement() {
    this.loadingEl = $('#loading-page');
    this.loadingEl.addClass('hide');
  }

  off() {
    if (this.loadingEl) {
      this.loadingEl.addClass('hide');
    }
  }

  on() {
    if (this.loadingEl) {
      this.loadingEl.removeClass('hide');
    }
  }
}
