import { ApiServices } from "./../services/api.service";
import { Component, OnInit } from "@angular/core";
import $ from "jquery";
import { Subject } from "rxjs";
import { Router,NavigationEnd, NavigationCancel} from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  listGame: any;
  listGeneration: any;
  private ngUnsubscribe = new Subject();
  currentUrl: string = "";
  constructor(private api: ApiServices, private router: Router) {}
  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd || e instanceof NavigationCancel) {
        this.currentUrl = e.url;
      }
    });
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
  navigate(target) {
    this.router.navigate([target]);
  }
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
