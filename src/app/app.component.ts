import { LoadingService } from "./services/loading.service";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import vi from "../assets/i18n/vi.json";
import en from "../assets/i18n/en.json";
import { Component, OnInit, AfterViewInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = "test-dashboard";
  childsLoadDone = false;

  hasHeader = true;

  // constructor(private loading: LoadingService) {}

  locale = "";
  _lang = "";
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private loading: LoadingService
  ) {
    this.translate.setTranslation("en", en);
    this.translate.setTranslation("vi", vi);
    this.translate.setDefaultLang("vi");

    this.route.queryParams.subscribe((params) => {
      if (!localStorage.getItem("language")) {
        localStorage.setItem("language", "vi");
      }
      this.translate.use(localStorage.getItem("language"));
    });
  }
  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loading.initLoadingElement();
    });
  }
}
