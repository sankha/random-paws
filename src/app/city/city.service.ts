import { CityElements } from './city.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { backend } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) { }

  /**
   * This method returns students details
   */


  getCityList(): Observable<CityElements[]>{
    const href = backend;

    return this.httpClient.get<CityElements[]>(`${href}city/cityList`);
  }

  editCity(city){
    const href = backend;

    this.httpClient.put<CityElements[]>(`${href}city/cityList`, city)
    .subscribe(data => city);
  }
}
