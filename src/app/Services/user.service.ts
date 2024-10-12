import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USERModul } from '../component/sgin-in-sign-up/UserModule';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL: string =
    'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users.json';

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
