import { LoadingService } from "./../services/loading.service";
import { ApiServices } from "./../services/api.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatTable } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { DetailPokemonDialogComponent } from "../home/detail-pokemon-dialog/detail-pokemon-dialog.component";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Subject } from "rxjs";
@Component({
  selector: "app-pokemon-list",
  templateUrl: "./pokemon-list.component.html",
  styleUrls: ["./pokemon-list.component.scss"],
})
export class PokemonListComponent implements OnInit {
  pageItemsLength: number;
  pageSize: number = 20;
  arrPoke = [];
  pageList = [];
  page: number = 0;
  filterTextChanged = new Subject<string>();

  constructor(
    private dialog: MatDialog,
    private api: ApiServices,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.getPokemon();
  }

  async getPokemon() {
    this.loading.on();
    await this.api.getPokemon(200, 10).subscribe((response: any) => {
      response.results.map((each: any) => {
        this.api.getDetailPokemon(each.name).subscribe((eachPoke: any) => {
          this.arrPoke.push(eachPoke);
        });
      });
      this.loading.off();
      if (this.arrPoke.length > 0) {
        this.pageItemsLength = this.arrPoke.length;
        this.pageList = this.arrPoke.slice(0, 20);
      } else {
        setTimeout(() => {
          this.pageItemsLength = this.arrPoke.length;
          this.pageList = this.arrPoke.slice(0, 20);
        }, 200);
      }
    });
  }

  OnPageChange(event) {
    this.page = event.pageIndex;
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.pageItemsLength) {
      endIndex = this.pageItemsLength;
    }
    this.pageList = this.arrPoke.slice(startIndex, endIndex);
  }

  openDialogPokemonDetail(dataPoke) {
    const dialog = this.dialog.open(DetailPokemonDialogComponent, {
      panelClass: "detail-pokemon",
      data: dataPoke,
    });
  }

  searchPoke(value: string) {
    let eachPoke = [];

    if (value) {
      if (this.filterTextChanged.observers.length === 0) {
        this.filterTextChanged
          .pipe(debounceTime(300), distinctUntilChanged())
          .subscribe((filterQuery) => {
            eachPoke = this.arrPoke.filter((res) => {
              return res.name
                .trim()
                .toLowerCase()
                .match(filterQuery.toLowerCase());
            });
            this.pageList = eachPoke;
          });
      }
      this.filterTextChanged.next(value);
    } else {
      this.pageList = this.arrPoke.slice(0,20);
    }
  }

  pagination(obj) {
    return obj.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }
  ngAfterViewInit(): void {}
}
