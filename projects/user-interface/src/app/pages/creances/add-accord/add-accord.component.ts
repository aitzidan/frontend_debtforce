import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreancesService } from 'src/app/Api/creances.service';
import { PortefeuilleService } from 'src/app/Api/portefeuille.service';
import { UtilisateursService } from 'src/app/Api/utilisateurs.service';
import { NotificationService } from 'src/app/services/notification.service';
interface listePaiement {
  date : any,
  montant : any,
  type_paiement : any,
  status : any,
  notes : string,
  type_select : any,
}
@Component({
  selector: 'app-add-accord',
  templateUrl: './add-accord.component.html',
  styleUrls: ['./add-accord.component.css']
})
export class AddAccordComponent {
  constructor(
    private CreancesApi: CreancesService,
    public router: Router,
    private route: ActivatedRoute,
    public notify : NotificationService
  ) {}
  id_creance : any 
  div : any = 1
  liste_frenquence : any = [
    {id:1,frenquence:"Mensuel"},
    {id:2,frenquence:"Bimensuel (ou Semi-mensuel) "},
    {id:3,frenquence:"Trimestriel"},
    {id:4,frenquence:"Semestriel"},
    {id:5,frenquence:"Annuel"}
  ]
  totalRestant : number = 0
  total : number = 0
  frenquence_select : number = 1
  montant?: number;
  proposition : number= 1
  echeanciers? : number
  montant_decider : any = 0
  echeanciers_decider :number = 0
  minEcheanciers: number = 1;
  maxEcheanciers: number = 33;
  remise  : number= 1
  interet_decider :number = 0
  start_date? : any 

  type_select : number = 1
  montant_remise : number = 0
  taux_remise : number = 0
  liste_paiement :listePaiement[] = []
  liste_type_paiement :any = []
  isValidateOption : boolean = false
  montant_a_Payer : number = 0 // Montant qu tu peux assigner a cette accord

  
  increment(): void {
    if (this.echeanciers_decider < this.maxEcheanciers) {
      this.echeanciers_decider++;
    }
  }

  decrement(): void {
    if(this.echeanciers_decider > this.minEcheanciers) {
      this.echeanciers_decider--;
    }
  }
  restart(){
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  showProcess(){
    console.log(this.type_select)
    if(this.formatDate(this.start_date) != '' && this.type_select){
      this.liste_paiement = [];
      const frequency = this.liste_frenquence.find((item:any) => item.id === this.frenquence_select);
      const type = this.liste_type_paiement.find((item:any) => item.id === this.type_select);
      if (frequency) {
        const installements = this.echeanciers_decider
        let currentDate = new Date(this.start_date);
        let total = 0;
        if(installements){
          for (let i = 0; i < installements; i++) {
            // let mnt = this.montant_decider
            let montant = parseFloat(this.montant_decider)
            total = montant + total
            if( total>this.montant_a_Payer ){
              montant = this.montant_decider - ( total - this.montant_a_Payer)
            }
            const payment: listePaiement = {
              date: this.formatDate(currentDate),
              montant: montant,
              type_paiement: type.type,
              status: "En cours",
              notes: "",
              type_select : this.type_select
            };
            this.liste_paiement.push(payment);
            currentDate = this.addInterval(currentDate, frequency.id);
          }
        }else{
          this.notify.showError2()
        }
      }else{
        this.notify.showError2()
      }
    }else{
      this.notify.showError("Merci de sélectionner une date début !!")
    }
  }
  addInterval(date: Date, frequencyId: number): Date {
    const newDate = new Date(date);
    switch (frequencyId) {
      case 1: // Mensuel
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case 2: // Bimensuel
        newDate.setMonth(newDate.getMonth() + 2);
        break;
      case 3: // Trimestriel
        newDate.setMonth(newDate.getMonth() + 3);
        break;
      case 4: // Semestriel
        newDate.setMonth(newDate.getMonth() + 6);
        break;
      case 5: // Annuel
        newDate.setFullYear(newDate.getFullYear() + 1);
        break;
    }
    return newDate;
  }
  echeanciersClean(total:number , montant : number , mnt:any){
    const ech = total / mnt
    if (Number.isInteger(ech)) {
      if(ech > this.maxEcheanciers){
        console.log(ech , this.maxEcheanciers)
        return 0
      }
      return ech  
    } else {
      if(ech > this.maxEcheanciers){
        console.log(ech , this.maxEcheanciers)
        return 0
      }
      return Math.floor(ech + 1);
    }
  }
  montantClean(total:number , echeanciers_decider : number , mnt:any){
    const ech = total / mnt
    if (Number.isInteger(ech)){
      
      return ech
    } else {
      return Math.floor(ech + 1);
    }
  }
  createPlan(){
    this.div = 2
  }
  formatDate(date: Date | string): string {
    if (!date) {
      return '';
    }
    if (typeof date === 'string') {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  savePayment(){
    const data = {
      data:this.liste_paiement,
      montant:this.montant_decider,
      type_paiment : this.type_select,
      montant_a_Payer : this.montant_a_Payer,
      date_debut : this.formatDate(this.start_date),
      echeanciers : this.echeanciers_decider
    }
    this.CreancesApi.saveAccords(this.id_creance,data).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
          this.notify.showSuccess(response.message)
          this.router.navigate(['/details-creance/'+this.id_creance])
        }else{
          this.notify.showError(response.message)
        }
      },
      (error: any) => {
        this.notify.showError2()
      }
    );
  }
  
  validatePropo(){
    if(this.montant_a_Payer <= this.montant_a_Payer){
      if(this.proposition == 1){
        if( this.montant && !isNaN(this.montant) && this.montant > 50){
          const mnt = this.montant
          if(this.echeanciersClean( this.montant_a_Payer , this.montant_decider , mnt) !== 0){
            this.montant_decider = this.montant
            this.echeanciers_decider =this.echeanciersClean( this.montant_a_Payer , this.montant_decider , mnt)
            this.isValidateOption = true
          }else{
            this.notify.showError("Veuillez vérifier votre montant !!")
          }
        }else{
          this.notify.showError("Veuillez vérifier votre montant !")
        }
      }
      if(this.proposition == 2){
        if(this.echeanciers && this.echeanciers > 0 && this.echeanciers <= this.maxEcheanciers && this.echeanciers >= this.minEcheanciers){
          const ech = this.echeanciers
          if(this.montantClean(this.totalRestant , this.echeanciers_decider , ech)){
            this.echeanciers_decider = this.echeanciers
            this.montant_decider =this.montantClean(this.totalRestant , this.echeanciers_decider , ech)
            this.isValidateOption = true
          }
        }else{
          this.notify.showError("Veuillez vérifier votre nombre !")
        }
      }
    }else{
      this.notify.showError("Votre montant accord est plus grand à creance")
    }
  }
  getDataCreance(){
      this.CreancesApi.getDataCreacne(this.id_creance).subscribe(
    (response: any) => {
      if(response.codeStatut == "OK"){
        this.totalRestant = response.data.total_restant
        this.montant_a_Payer = response.data.total_restant
        this.total = response.data.total_creance
        this.liste_type_paiement = response.type_paiemennt;
        console.log()
      }else{
      }
    },
    (error: any) => {
      console.log(error)
    }
  );
  }

  isInteger(value: number): boolean {
    return Number.isInteger(value);
  }
  
  
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.id_creance = params['id_creance'];
      if(this.id_creance){
        this.getDataCreance()
      }
    });
  
  }





}
