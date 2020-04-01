import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Car } from '../shared/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url: string;

  constructor(private http: HttpClient, ) {
    this.url = `${environment.api}/cars`;
  }

  findAll() {
    return this.http.get(this.url);
  }

  findById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  save(car: Car) {
    return this.http.post(this.url, car);
  }

  update(id: number, car: Car) {
    return this.http.put(`${this.url}/${id}`, car);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
