import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, from, EMPTY } from 'rxjs';
import { User } from './user.model';
import { map, tap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Plugins } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { UserService } from '../shared/user-service/user.service';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  get userIsAuthenticated() {
    return this._user
      .asObservable()
      .pipe(
        map(user => {
          if (user) {
            return !!user.token;
          } else {
            return false;
          }
        }));
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return null;
        }
      }));
  }

  get user() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.id;
        } else {
          return EMPTY;
        }
      }),
      switchMap(userId => {
        if (userId !== undefined && userId !== null) {
          return this.userService.getUserById(String(userId));
        }
      })
    );
  }

  constructor(private http: HttpClient, private userService: UserService) { }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' }))
      .pipe(
        map(storedData => {
          if (!storedData || !storedData.value) {
            return null;
          }
          const parsedData = JSON.parse(storedData.value) as
            {
              token: string;
              tokenExpirationDate: string;
              userId: string;
              email: string;
              rol: string
            };
          const expirationTime = new Date(parsedData.tokenExpirationDate);
          const user = new User
            (
              parsedData.userId,
              parsedData.email,
              parsedData.token,
              expirationTime,
              parsedData.rol
            );
          return user;
        }), tap(user => {
          if (user) {
            this._user.next(user);
          }
        }),
        map(user => {
          return !!user;
        })
      );
  }


  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${
      environment.firebaseAPIKey
      }`,
      { email, password, returnSecureToken: true }
    ).pipe(
      tap(
        this.setUserData.bind(this)
      )
    );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
      environment.firebaseAPIKey
      }`,
      { email, password, returnSecureToken: true }
    ).pipe(
      tap(
        this.setUserData.bind(this)
      )
    );
  }

  logout() {
    Plugins.Storage.remove({ key: 'authData' });
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(
      new Date().getTime() + +userData.expiresIn * 1000);
    const user = new User(
      userData.localId,
      userData.email,
      userData.idToken,
      expirationTime);

    this._user.next(user);
    this.storeAuthData(userData.localId, userData.idToken, expirationTime.toString(), userData.email);
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string
  ) {
    const data = JSON.stringify({ userId, token, tokenExpirationDate, email });
    Plugins.Storage.set({ key: 'authData', value: data });
  }

}
