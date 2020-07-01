import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class User {
  id?: string;
  mail: string;
  color: string;
  rol?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Observable<User[]>;
  private userCollection: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection<User>('users');
    this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.users;
  }

  getUserAfterEmail(mail: string): Observable<User> {
    return this.users.pipe(
      map( arr => arr.filter ( r => r.mail === mail)
      )
    )[0];
  }

  getUserById(id: string): Observable<User[]> {
    return this.users.pipe(
      map( arr => arr.filter ( r => r.id === id)
      )
    );
  }

  addUser(user: User, id: string): void {
    user.id = id;
    this.userCollection.doc(`/${id}`).set(user);
  }

}
