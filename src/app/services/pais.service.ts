import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http:HttpClient) {
   }

   getPaises(){
    return this.http.get('https://restcountries.com/v3.1/lang/spanish#').pipe(
      map( (resp:any ) => {
        return resp.map( pais => {
          return {
            nombre:pais.name['common'],
            codigo:pais.fifa
          }
        });
      })
    )
  }
}
//fifa name.common