import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DebiteurService } from 'projects/back-office/src/app/Api/debiteur.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';
export interface Telephone {
  type_telephone: any;
  numero: string;
  status: string;
  active: string;
  note: number;
}
export interface Adresse {
  type_adresse: any;
  adresse_complet: any;
  pays: string;
  ville: string;
  verifier: string;
  status: string;
  code_postal:string;
  province:string;	
  source:string;
  region:string;
  origine:string	
}
export interface Email {
  type_email: any;
  email: string;
  status: string;
  origin: string;
}
@Component({
  selector: 'app-debiteur-contacts',
  templateUrl: './debiteur-contacts.component.html',
  styleUrls: ['./debiteur-contacts.component.css']
})
export class DebiteurContactsComponent {
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public notify : NotificationService,
    public debApi : DebiteurService
  ) {}
  displayedColumns: string[] = ['type_telephone', 'numero', 'status', 'active', 'note','action'];
  displayedColumns1: string[] = ['type_adresse', 'adresse_complet', 'pays', 'ville', 'verifier', 'status', 'code_postal', 'province', 'source', 'region', 'origine'];
  displayedColumns2: string[] = ['type_email', 'email', 'status' , 'origin'];

  telephone : Telephone[] = []
  adresse : Adresse[] = []
  email : Email[] = []
  
  id : any
  dataSource = new MatTableDataSource<Telephone>([]);
  dataSource1 = new MatTableDataSource<Adresse>([]);
  dataSource2 = new MatTableDataSource<Email>([]);

  getContact(){
    this.debApi.getContactsDebiteur(this.id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          console.log(response)
          this.dataSource.data = response.data.telephone
          this.dataSource1.data = response.data.adresse
          this.dataSource2.data = response.data.email

        }else{
          // this.router.navigate(['/'])
        }
        console.log(response)

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  deleteTel(id:any){
    this.debApi.deleteTelephone(this.id , id).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          console.log(response)
          this.notify.showSuccess(response.message)
          this.ngOnInit()
        }else{
          // this.router.navigate(['/'])
          this.notify.showError(response.message)
        }
        console.log(response)

      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  ngOnInit(): void{
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id-debiteur');
      // Perform any necessary logic or data fetching based on the new ID
        this.route.params.subscribe(params => {
        this.id = params['id-debiteur'];
      });
    })
    this.getContact()
  }
}
