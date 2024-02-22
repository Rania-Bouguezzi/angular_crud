import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor(private http : HttpClient) { }


  getAllUsers(): Observable<any[]> {  //observable : gérer les évts asynchrones: m à j des data
    return this.http.get<any[]>("http://localhost:3000/users");
  }



  addUser(username: string, email: string, adress: string, phone: string) {
    const user = { username, email, adress, phone };
    return this.http.post<any>('http://localhost:3000/users/add', user, { headers: {'Content-Type': 'application/json'} });

  }
  
updateUser(id:number, user:any):Observable<any>{

return this.http.patch<any>(`http://localhost:3000/users/${id}`, user, { headers: {'Content-Type': 'application/json'} })
}


getUserById(id:number):Observable<any>{
return this.http.get<any>(`http://localhost:3000/users/${id}`)
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/users/${id}`)

  }

}
