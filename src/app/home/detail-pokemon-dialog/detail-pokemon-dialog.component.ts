import { ApiServices } from './../../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from "@angular/core";

@Component({
  selector: "app-detail-pokemon-dialog",
  templateUrl: "./detail-pokemon-dialog.component.html",
  styleUrls: ["./detail-pokemon-dialog.component.scss"],
})
export class DetailPokemonDialogComponent implements OnInit {
  local_data: any;
  constructor(
    private dialogRef: MatDialogRef<DetailPokemonDialogComponent>,
    // private api: ApiServices,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.local_data = this.data    
    
  }

  ngOnInit(): void {}
}
