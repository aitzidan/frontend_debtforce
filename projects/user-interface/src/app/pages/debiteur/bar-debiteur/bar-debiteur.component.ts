import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'src/app/Api/debiteur.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-bar-debiteur',
  templateUrl: './bar-debiteur.component.html',
  styleUrls: ['./bar-debiteur.component.css']
})
export class BarDebiteurComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService
  ) {}
  id:any
  isDeb : boolean = false
  debiteur:any
  contacts:any
  personnes:any
  
  formatDate(dateString: any) {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so we add 1
    const day = dateObject.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id = params['id-debiteur'];
      });
    })
    // console.log(sessionStorage.getItem("token"))
    this.debApi.getDebiteur(this.id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.debiteur = response.data
          this.personnes = response.personnes
          this.contacts = response.contacts
          this.isDeb = true
        }else{
          this.router.navigate(['/'])
        }
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
}
