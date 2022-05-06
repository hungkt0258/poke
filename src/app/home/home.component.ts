import { LoadingService } from "./../services/loading.service";
import { MatDialog } from "@angular/material/dialog";
import { ApiServices } from "./../services/api.service";
import { Component, OnInit } from "@angular/core";
import { DetailPokemonDialogComponent } from "./detail-pokemon-dialog/detail-pokemon-dialog.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  hasHeader = true;
  arrVideo = [
    {
      video: "https://youtu.be/D0zYJ1RQ-fs", // Youtube url
    },
    {
      video: "https://youtu.be/1roy4o4tqQM", // Youtube url
    },
    {
      video: "https://youtu.be/bILE5BEyhdo", // Youtube url
    },
    {
      video: "https://youtu.be/uBYORdr_TY8", // Youtube url
    },
  ];
  arrPoke = [];
  arrItems = [];
  loadingPoke: boolean = true;
  loadingItems: boolean = true;
  constructor(
    private api: ApiServices,
    private dialog: MatDialog,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
    this.getItemsPoke();
  }
  ngAfterViewInit() {}
  openDialogPokemonDetail(dataPoke) {
    const dialog = this.dialog.open(DetailPokemonDialogComponent, {
      panelClass: "detail-pokemon",
      data: dataPoke,
    });
  }

  async getPokemon() {
    this.loading.on();
    await this.api.getPokemon(10, 10).subscribe((response: any) => {
      response.results.map((each: any) => {
        this.api.getDetailPokemon(each.name).subscribe((eachPoke: any) => {
          this.arrPoke.push(eachPoke);
        });
      });
      this.loading.off();
    });
  }

  async getItemsPoke() {
    this.loading.on();
    await this.api.getItemsPokemon(10, 10).subscribe((response: any) => {
      response.results.map((each: any) => {
        this.api.getDetailItems(each.name).subscribe((eachPoke: any) => {
          this.arrItems.push(eachPoke);
        });
      });
      this.loading.off();
    });
  }
}
