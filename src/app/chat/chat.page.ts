import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MessageService, Message } from '../shared/message-service/message.service';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { IonContent } from '@ionic/angular';
import { UserService, User } from '../shared/user-service/user.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, AfterViewInit{

  messages: Observable<Message[]>;

  @ViewChild(IonContent, { static: false }) content: IonContent;

  currentUser = '';
  newMessageText = ''
  userDetalis: User;
  constructor(private messageService: MessageService, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit() {

    this.authService.userId.pipe(
      map(userId => {
        console.log(userId);
        return userId
      }),
      switchMap(userId => {
        if (userId !== null && userId !== undefined) {
          this.currentUser = userId;
          return this.userService.getUserById(userId);
        }
      })
    ).subscribe(users => {
      const user = users[0];
      console.log(user);
      this.userDetalis = {
        mail: user.mail,
        color: user.color
      }
    })

    this.messages = this.messageService.getMessages();
  }

  ngAfterViewInit() {
    console.log('dute jos');
    setTimeout(() => {
      this.content.scrollToBottom(500);
    })

  }
  

  sendMessage() {

    const newMessage: Message = {
      userId: this.currentUser,
      mail: this.userDetalis.mail,
      color: this.userDetalis.color,
      text: this.newMessageText,
      createdAt: String(new Date().getTime())
    }

    this.messageService.addMessage(newMessage);

    this.newMessageText = '';
    setTimeout(() => {
      this.content.scrollToBottom(200);
    })

  }
  

}
