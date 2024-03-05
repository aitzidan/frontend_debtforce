import { Component, OnInit } from '@angular/core';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';
import { FactureService } from 'projects/back-office/src/app/Api/facture.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service';

@Component({
  selector: 'app-nouvellefacture',
  templateUrl: './nouvellefacture.component.html',
  styleUrls: ['./nouvellefacture.component.css']
})
export class NouvellefactureComponent implements OnInit{
  constructor(
    private userApi: UtilisateursService,
    private donnerApi: DonneurService,
    private factureApi: FactureService,
    private jwtHelper: JwtHelperService,
    public router:Router,
    private headerservice: HeaderService,
    public notify : NotificationService
  ) {}
  products:any = []
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  delete_product(i:any){
    this.products.splice(i, 1);
  }

  public donneur:any;
  selectedDonneurId:number=0;
  tokenId:number=0;
  user:any;
  selectedDonneur:any;
  panelOpenState = false;
  regles:any;
  modeles:any;
  selectedModelId:number=0;
  Regles: any=[];
  type:any;
  date_echeance:any;
  objet : any = ''
  productListe :any = []
  totalttc : number = 0
  donneurOrdre : any 
  liste_type_paiement : any = []
  type_selected : any = ''
  note : any =  ''
  isSelectedRegles(Regles: any): boolean {
    return this.Regles.some((regle: any) => regle.id === Regles.id);
  }
  delet_product(i:any)
  {

  }
  addProduct()
  {
    const product = {
      "reference" : "",
      "titre":"",
      "qte":1,
      "prix_u":0.00,
      "totalttc":0.00,
      "remise":0
    }
    this.products.push(product)
  }
  selectedProduct : any 
  getDetailsDonneur(){
    this.donnerApi.getOneDonneur(this.selectedDonneurId).subscribe(
      (res: any) => {
        this.donneurOrdre = res.donneur[0]
        // this.selectedDonneur = res;
        console.log(this.donneurOrdre)
      },
      (error: any) => {

      }
    );
  }
  calculTTC(i: any, newValue: any) {
    console.log(newValue);
    // Now 'newValue' should contain the updated value
    this.products[i].qte = newValue;

    this.products[i].totalttc = newValue * this.products[i].prix_u
  }
  
  getDetailsProducts(i:any)
  {
    this.donnerApi.getOneProduct(this.selectedProduct).subscribe(
      (res: any) => {
        if(res.codeStatut == "OK")
        {
          this.products[i].prix_u = res.data.prix_u
          this.products[i].totalttc = res.data.prix_u
          this.products[i].titre = res.data.nom
        }
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  getValue(){
    let totalTTC = 0;

    for (const product of this.products) {
      totalTTC += product.prix_u * product.qte
    }
    return totalTTC
  }
  calculRemise(i:any , newRemise :any){
  //   // remise = 10%
  //     const remisePercentage = newRemise / 100;

  //   // Calculate the discounted amount
  //   const discountedAmount = this.products[i].prix_u * this.products[i].qte * remisePercentage;

  //   // Subtract the discount from the total
  //   this.products[i].totalttc = (this.products[i].prix_u * this.products[i].qte) - discountedAmount;

  }
   onchangeregles(Regles: any) {
    const index = this.Regles.findIndex((regle: any) => regle.id === Regles.id);
  
    if (index !== -1) {
      this.Regles.splice(index, 1);
    } else {
      this.Regles.push({
        id: Regles.id,
        nom: Regles.nom,
      });
    }
    // const index = this.Regles.indexOf(Regles.id);
    // if (index !== -1) {
    //   this.Regles.splice(index, 1);
    // } else {
    //   this.Regles.push(Regles.id);
    // }
  
    console.log(this.Regles);
  }
  
  AjouterFacture(date:any){
    const newArray = this.Regles.map((item: { id: any; }) => item.id);
    const formdata= {
      donneur_ordre:1,
      type:this.type,
      date_echeance:date,
      regle:newArray
    }
    console.log(formdata);
    this.factureApi.AddFacture(formdata).subscribe(
      (res: any) => {
          console.log(res);
          if(res.codeStatut === "OK"){
            this.router.navigate(['/Ajouter_model_affichage2']);
          }
        return res;
      },
      (error: any) => {}
    );
    
  }

  changeModel(){
    console.log(this.selectedModelId);
    
    this.factureApi.getRegles(this.selectedModelId).subscribe(
      (res: any) => {
        this.regles = res;
          //console.log(res);
        return res;
      },
      (error: any) => {}
    );
    
  }
  RemoveRegle(item: any) {
    const index = this.Regles.findIndex((selectedItem: any) => selectedItem.id === item.id);
    if (index !== -1) {
      this.Regles.splice(index, 1);
    }
  }
  
  
  liste_donneur : any = []
  changeDonneur(){
    this.donnerApi.getOneDonneur(this.selectedDonneurId).subscribe(
      (res: any) => {
        this.selectedDonneur = res;
      },
      (error: any) => {

      }
    );
  }
  validerFacture(){
    const data = {
      type_paiement : this.type_selected,
      products : this.products,
      donneur : this.selectedDonneurId,
      objet : this.objet,
      totalTTC : this.getValue()
    }
    this.donnerApi.saveFacture(data).subscribe(
      (res: any) => {
        if(res.codeStatut=="OK"){
          this.router.navigate(['/Listefacture']);
          this.notify.showSuccess(res.message)
        }else{
          this.notify.showError(res.message)
        }

      },
      (error: any) => {
        this.notify.showError2()
      }
    );
  }
  
  ngOnInit(): void {
    this.donnerApi.listeTypePaiement().subscribe(
      (res: any) => {
        console.log(res)
        this.liste_type_paiement = res.data;
      },
      (error: any) => {
        console.log(error)
      }
    );
    this.donnerApi.listeProducts().subscribe(
      (res: any) => {
        console.log(res)
        this.productListe = res.data;
      },
      (error: any) => {
        console.log(error)
      }
    );
    this.donnerApi.getDonneur().subscribe(
      (res: any) => {
        this.liste_donneur = res.data;
        console.log(res)
      },
      (error: any) => {
        console.log(error)
      }
    );
    this.donnerApi.getDonneur().subscribe(
      (res: any) => {
        this.donneur = res;
        return res;
      },
      (error: any) => {}
    );
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      // console.log(decodedToken);
      this.tokenId=decodedToken.id
    } else {
      console.log('Token not found.');
    }
    this.userApi.getUser(this.tokenId).subscribe(
      (res: any) => {
        console.log(res);
        this.user = res;
        // console.log(this.user);
        return res;
      },
      (error: any) => {}
    );
    this.factureApi.getModeles().subscribe(
      (res: any) => {
        this.modeles = JSON.parse(res);
         console.log(this.modeles);
        return res;
      },
      (error: any) => {}
    ); 
    const links = [
      { link: 'Créer une Facture', route: '/nouvelle-facture' },
      { link: 'Liste facture', route: '/Listefacture' },
    ];
    
    this.headerservice.setLinks(links);
  }

}
