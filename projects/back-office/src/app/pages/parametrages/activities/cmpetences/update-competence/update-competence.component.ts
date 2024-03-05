import { Component } from '@angular/core';
import { ParametragesActivityService } from 'projects/back-office/src/app/Api/parametrages-activity.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-competence',
  templateUrl: './update-competence.component.html',
  styleUrls: ['./update-competence.component.css']
})
export class UpdateCompetenceComponent {
  router: any;
  currentRoute: any | undefined;

  constructor( private route: ActivatedRoute , private activityApi : ParametragesActivityService) {
  }
  public familles :any;
  public sousFamilles :any;
  titreValue: string = '';
  public id : any = '';
  isDisabled = false;


  ngOnInit(): void {
    var url_str = window.location.href;
    var url = new URL(url_str);
    var search_params = url.searchParams;
    this.id = search_params.get('id');
    if(!this.id){
      window.location.href = "/addCompetence";
    }
    this.activityApi.getDetailsCompetence(this.id).subscribe(
      (response : any) => {
        console.log(response)
        this.titreValue = response.data.competence.titre;
        this.sousFamilles =  response.data.params;
      },
      (error: any) => {
        console.log(error)
      }
    );
  }
  onSubmit(f: NgForm) {
    const titre = f.value.titreValue;  // { first: '', last: '' }
    const checkedValues: string[] = [];

    Object.keys(f.controls).forEach((key) => {
      const control = f.controls[key];
      const keyToCheck = 'titreValue';

      if(!control.hasOwnProperty(keyToCheck)){
        console.log(f.controls)
        if (control.value) {
          if(key != "titreValue"){
            checkedValues.push(key);
          }
        }
      }
    });
    this.activityApi.updateCompetence(titre,this.id).subscribe(
      (res : any) => {
        if(res.codeStatut == "OK"){
          console.log("OK");
          const data = {
            data_check : checkedValues ,
            id : this.id ,
          }
          this.isDisabled = false;
          this.activityApi.updateDetailsCompetence(data).subscribe(
            (response : any) => {
              console.log(response)
            },
            (error: any) => {
              console.log(error)
            }
          )
          console.log(checkedValues)
        }
      },
      (err: any) => {
        console.log(err)
      }
    )
    
  }
}
