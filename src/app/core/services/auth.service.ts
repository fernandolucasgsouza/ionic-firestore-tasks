import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

import { auth } from 'firebase/app';
import { User, AuthProvider, AuthOptions } from './auth.types';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState$: Observable<firebase.User>

  constructor(private _afAuth: AngularFireAuth) {
    this.authState$ = this._afAuth.authState;
  }

  get isAuthenticated(): Observable<boolean> {
    return this.authState$.pipe(map(user => user !== null));
  }

  authentication({ isSignIn, provider, user }: AuthOptions) {
    let operation: Promise<auth.UserCredential>;

    if (provider !== AuthProvider.Email) {
      operation = this._singnUpPopup(provider);
    } else {
      operation = isSignIn ? this._singnInWithEmail(user) : this._singnUpWithEmail(user);
    }

    return operation;
  }

  logout(): Promise<void> {
    return this._afAuth.auth.signOut();
  }

  private _singnInWithEmail({ email, password }: User): Promise<auth.UserCredential> {
    return this._afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  private _singnUpWithEmail({ email, password, name }: User): Promise<auth.UserCredential> {
    return this._afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credentials =>
        credentials.user
          .updateProfile({ displayName: name, photoURL: null })
          .then(() => credentials)
      );
  }

  private _singnUpPopup(provider: AuthProvider): Promise<auth.UserCredential> {
    let singninProvider = null;


    switch (provider) {
      case AuthProvider.Facebook:
        singninProvider = new auth.FacebookAuthProvider();
        break;
    }

    return this._afAuth.auth.signInWithPopup(singninProvider);
  }


}
