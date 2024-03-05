import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagerieService } from '../../../Api/messagerie.service';
import { UserListService } from '../../../../app/user-list.service';

@Component({
  selector: 'app-bar-messagerie',
  templateUrl: './bar-messagerie.component.html',
  styleUrls: ['./bar-messagerie.component.css']
})
export class BarMessagerieComponent {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private messagerieApi: MessagerieService,
    private userListService: UserListService
    ) { 

      this.userListService.userList$.subscribe((users) => {
        // Update your user list in BarMessagerieComponent here
        this.list_users = users;
        this.filteredData = this.list_users;
      });
    

    }




  list_users : any = []
  filteredData : any = []
  user_selected : any
  schemaId : number = 0;
  path : any
  filterValue : String = ''


  filterData() {

    this.filteredData = this.list_users.filter((item:any) => {
      const titreMatch = item.titre.toLowerCase().includes(this.filterValue.toLowerCase());
      const dateCreationMatch = item.dateCreation.includes(this.filterValue);
      
      return titreMatch || dateCreationMatch;
    });
  }

  getData(){
    this.messagerieApi.getUsersLastMessages().subscribe(
      (res: any) => {

        //this.users = res;
        this.list_users = res.data;
        this.filteredData = this.list_users;
        return res;
      },
      (error: any) => {}
    );
  }

  ngOnInit(): void{

    this.getData();

  }


  formatMessengerDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();

    // Calculate the time difference in milliseconds
    const diffMilliseconds = now.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);

    if (diffSeconds < 60) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else if (diffHours < 48) {
      return 'Yesterday';
    } else {
      // Format the date as desired
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      return date.toLocaleDateString(undefined, options);
    }
  }


  GetConversation(id:number){
    this.user_selected = id;
    this.router.navigate(['/messagerie/'+id])
  }


  goToNewMessage()
  {
    this.router.navigate(['/messagerie/0'])
  }
  
}

