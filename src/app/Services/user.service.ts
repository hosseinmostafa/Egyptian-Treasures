import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USERModul } from '../component/sgin-in-sign-up/UserModule';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string =
    'https://final-project-ed3dc-default-rtdb.firebaseio.com/users.json';

  constructor(private http: HttpClient) { }

  addUser(user: USERModul) {
    return this.http.post<any>(this.baseURL, user);
  }

  getUsers() {
    return this.http.get<any>(this.baseURL);
  }

  updateUser(user: USERModul) {
    return this.http.put<any>(this.baseURL, user);
  }
  
}
