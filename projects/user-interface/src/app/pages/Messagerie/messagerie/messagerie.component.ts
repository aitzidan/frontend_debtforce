import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagerieService } from '../../../Api/messagerie.service';
import { UserListService } from '../../../../app/user-list.service';

@Component({
  selector: 'app-messagerie',
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.css']
})
export class MessagerieComponent {

  conversationId: any;
  list_messages : any = [];
  listUsers : any = [];
  recipients : any = [] ;
  newMessage : string = '';
  showUserList  = false;
  constructor(private route: ActivatedRoute,
    private messagerieApi: MessagerieService,
    private userListService: UserListService
    ) { }

  
    ngOnInit(): void {
      // Subscribe to route parameter changes
      this.route.params.subscribe(params => {
        this.conversationId = params['idDistinataire'];
        this.getdata();
       });
    }

    getdata()
    {
      this.messagerieApi.getUsersConversation(this.conversationId).subscribe(
        (res: any) => {
  
          this.list_messages = res.data; 
          this.markLu();
          
        },
        (error: any) => {}
      );

      this.messagerieApi.getListUsers().subscribe(
        (res: any) => {
  
          this.listUsers = res.data; 
          console.log(this.listUsers);
          
        },
        (error: any) => {}
      );

      
    }

    sendMessage()
    {
        var data = {message:this.newMessage,recipient:this.conversationId};

        this.messagerieApi.sendMessage(data).subscribe(
          (res: any) => {
    
            this.getdata();
            this.newMessage = '';
            
            this.messagerieApi.getUsersLastMessages().subscribe(
              (res: any) => {
        
                this.userListService.updateUsers(res.data)
                return res;
              },
              (error: any) => {}
            );

          },
          (error: any) => {}
        );
    }

    markLu()
    {
      
      this.messagerieApi.messageLu(this.conversationId).subscribe(
        (res: any) => {
  
          
        },
        (error: any) => {}
      );

    }


    toggleRecipient(user: any) {
      if (user.selected) {
        this.recipients.push(user.id);
      } else {
        const index = this.recipients.findIndex((recipient : any) => recipient.id === user.id);
        if (index !== -1) {
          this.listUsers.splice(index, 1);
        }
      }
    }


    sendMessageAll()
    {
        var data = {message:this.newMessage,recipients:this.recipients};

        this.messagerieApi.sendMessageAll(data).subscribe(
          (res: any) => {
    
            this.getdata();
            this.newMessage = '';
            
          },
          (error: any) => {}
        );
    }
    
}
