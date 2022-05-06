import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { PokemonListComponent } from './pokemon-list.component';

const routes: Routes = [
  {
    path: "",
    component: PokemonListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonListRoutingModule { }
