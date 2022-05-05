import { ApiServices } from "./../services/api.service";
import { Component, NgModule, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import $ from "jquery";
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { Subject } from "rxjs";
import { RoleConfig } from "../utils/constant";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  listGame: any;
  listGeneration: any;
  private ngUnsubscribe = new Subject();

  constructor(private api: ApiServices) {}
  ngOnInit() {
    this.getListPokemon();
    this.getGeneration();
  }

  ngAfterViewInit() {
    $(window).scroll(function () {
      let appHeader = $("#appHeader");
      if (appHeader && appHeader.offset().top != 0) {
        appHeader.addClass("on-scroll");
      } else {
        appHeader.removeClass("on-scroll");
      }
    });
  }

  ngOnDestroy() {}

  getListPokemon() {
    this.api.getListPokemon(null, null).subscribe((response: any) => {
      this.listGame = response.results;
    });
  }
  getGeneration() {
    this.api.getGeneration().subscribe((response: any) => {
      this.listGeneration = response.results;
    });
  }
}
