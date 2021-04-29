import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais } from '../interfaces/pais'
import { PaisByCode } from '../interfaces/paisByCode'

 
@Injectable({
  providedIn: 'root'
})
export class PaisesServiceService {
  private _regiones:string[]=['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  get regiones():string[]{
    return [...this._regiones]
  }
  constructor(private http:HttpClient) {  }

  getPaises(region:string):Observable<Pais[]>{
    return this.http.get<Pais[]>(`https://restcountries.eu/rest/v2/region/${region}?fields=name;alpha3Code`)
  }

  getFronteras(pais:string):Observable<PaisByCode | null> {

    if (!pais){ return  of(null)}
    return this.http.get<PaisByCode>(`https://restcountries.eu/rest/v2/alpha/${pais}`)
  }
getPaisPorCodigo(codigo:string):Observable<Pais>{
  const url=`https://restcountries.eu/rest/v2/alpha/${codigo}?fields=name;alpha3Code`
  return this.http.get<Pais>(url)
}
  getPaisesPorCodigos(borders:string[]):Observable<Pais[]> {

  if(!borders){
    return of([])
  }
  const peticiones:Observable<Pais>[]=[]


borders.forEach(codigo=>{
  const peticion=this.getPaisPorCodigo(codigo)
  peticiones.push(peticion)
})
    return combineLatest (peticiones)
  }
}
