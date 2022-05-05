import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, timeout } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ApiServices {
  constructor(private httpClient: HttpClient) {}

  getListPokemon(limit, offset): Observable<object> {
    let params;
    if (limit || offset) {
      params = `?limit=${limit}&offset=${offset}`;
    } else {
      params = "";
    }
    return this.httpClient.get(`/api/v2/ability/${params}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getGeneration(): Observable<object> {
    return this.httpClient.get(`/api/v2/generation`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getPokemon(limit, offset): Observable<object> {
    let params;
    if (limit || offset) {
      params = `?limit=${limit}&offset=${offset}`;
    } else {
      params = "";
    }
    return this.httpClient.get(`/api/v2/pokemon/${params}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getDetailPokemon(namePoke): Observable<object> {
    return this.httpClient.get(`/api/v2/pokemon/${namePoke}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  getDetailItems(item): Observable<object> {
    return this.httpClient.get(`/api/v2/item/${item}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getItemsPokemon(limit, offset): Observable<object> {
    let params;
    if (limit || offset) {
      params = `?limit=${limit}&offset=${offset}`;
    } else {
      params = "";
    }
    return this.httpClient.get(`/api/v2/item/${params}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
