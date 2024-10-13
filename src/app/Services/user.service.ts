import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { USERModul } from '../component/signup/UserModule';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private baseURL: string =
    'https://egyption-treasure-89099-default-rtdb.firebaseio.com/Users.json';

  constructor(private http: HttpClient) { }

  addUser(user: USERModul) : Observable<any> {
    return this.http.post<any>(this.baseURL, user);
  }

  getUsers(): Observable<USERModul[]> {
    return this.http.get<USERModul[]>(this.baseURL);
  }

  chekIfEmailExists(email :string): Observable<boolean>{
    return this.getUsers().pipe(
      map((users :USERModul[]) =>{
        const emailExists =users
        ? Object.values(users).some((user:USERModul) => user.email === email)
        : false;
        return emailExists

      } )
    )

  }

  updateUser(user: USERModul) {
    return this.http.put<any>(this.baseURL, user);
  }






}
