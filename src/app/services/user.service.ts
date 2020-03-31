import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.api}/users`;
  }

  findAll() {
    return this.http.get(this.url);
  }

  findById(id: number) {
    return this.http.get(`${this.url}/${id}`);
  }

  save(user: User) {
    return this.http.post(this.url, user);
  }

  update(id: number, user: User) {
    return this.http.put(`${this.url}/${id}`, user);
  }

  remove(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
