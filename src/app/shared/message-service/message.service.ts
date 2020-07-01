import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

export class Message {
  id?: string;
  userId: string;
  mail: string;
  color: string;
  text: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: Observable<Message[]>;
  private messageCollection: AngularFirestoreCollection<Message>;

  constructor(private afs: AngularFirestore) {
    this.messageCollection = this.afs.collection<Message>('message');
    this.messages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getMessages(): Observable<Message[]> {
    // return this.messages;
    return this.messages.pipe(
      map( arr => arr.sort ((a,b) => Number(a.createdAt) - Number(b.createdAt))
      )
    );
  }

  addMessage(message: Message): void {
    this.messageCollection.add(message);
  }

}
