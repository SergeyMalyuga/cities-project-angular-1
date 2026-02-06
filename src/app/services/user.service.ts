import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../core/models/user';
import {APIRoute, BASE_URL} from '../core/constants/const';
import {Credentials} from '../core/models/credentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  public checkAuth(): Observable<User> {
    return this.http.get<User>(`${BASE_URL}/${APIRoute.LOGIN}`);
  }

  public login(credentials: Credentials): Observable<User> {
    return this.http.post<User>(`${BASE_URL}/${APIRoute.LOGIN}`, {
      email: credentials.email,
      password: credentials.password
    })
  }

  public logout(): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${APIRoute.LOGOUT}`);
  }
}
