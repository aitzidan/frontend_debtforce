import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParametragesFacturationService } from 'projects/back-office/src/app/Api/parametrages-facturation.service';

@Component({
  selector: 'app-update-model-facturation',
  templateUrl: './update-model-facturation.component.html',
  styleUrls: ['./update-model-facturation.component.css']
})
export class UpdateModelFacturationComponent {
  constructor( private facturationApi : ParametragesFacturationService) {}

  panelOpenState = false;
  titre_model:string = '';
  objet_model:string ='';
  titre_regle: string = ''; // Initialize titre_regle variable
  liste_table: any;
  list_column: any;
  list_action: any;

  data: any[] = [];

  table_name: string = '';
  column_name: string = '';
  action_name : string = '';
  type_column : string = '';
  valeur1:  any ;
  valeur2:  string = '';
  action_list_int: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "supOuEgal", name: ">=" },
    { value: "infOuEgal", name: "<=" },
    { value: "entre", name: "entre" },
    { value: "null", name: "NULL" },
    { value: "not null", name: "NOT NULL" }
  ];

  action_list_date: { value: string; name: string }[] = [
    { value: "egal", name: "=" },
    { value: "supOuEgal", name: ">=" },
    { value: "infOuEgal", name: "<=" },
    { value: "entre", name: "entre" },
    { value: "null", name: "NULL" },
    { value: "not null", name: "NOT NULL" }
  ];

  action_list_string: { value: string; name: string }[] = [
    { value: "like", name: "like" },
    { value: "not like", name: "not like" },
    { value: "null", name: "NULL" },
    { value: "not null", name: "NOT NULL" },
    { value: "multiple", name: "Multiple" }
  ];

  add_regle() {
    const i = this.data.length + 1
    const titre = "Régle "+i;
    this.titre_regle = titre;
      const regle = {
          titre: this.titre_regle,
          objet: "test",
          criteres: []
      };
      this.data.push(regle);
  }
  delete_regle(r:number){
    this.data.splice(r,1)
  }
  delete_critere(i:number,k:number){
    this.data[i].criteres.splice(k,1);
  }
  add_detail_critere(i:number,k:number){
    if(this.data[i].criteres[k].table_name != ""){
      const detail_critere = {
        column_name : "",
        action : "",
        valeur1 : "",
        valeur2 : "",
      }
      this.data[i].criteres[k].details_critere.push(detail_critere)
    }else{
      alert("veuillez ...")
    }
  }
  add_critere(i:any){
    const critere = {
      table_name : "",
      column_name : "",
      action : "",
      valeur1 : "",
      valeur2 : "",
      details_critere : [],
    }
    this.data[i].criteres.push(critere)
  }
 ngOnInit(): void {
    //Get list of types de parametrages
    this.facturationApi.getLisTable().subscribe(
      (response: any) => {
      this.liste_table = response.data;
        console.log(this.liste_table)
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
    this.facturationApi.getColumnTable(this.table_name).subscribe(
      (response: any) => {
        this.list_column = response.data;
        return response;// Handle the API response here
      },
      (error: any) => {
      }
    );
  }

  onTableChange(table: string, critere: any) {
    critere.table_name = table;
    this.facturationApi.getColumnTable(table).subscribe(
      (response: any) => {
        critere.list_column = response.data;
        //if change table vider details critere
        critere.details_critere = [];
      },
      (error: any) => {
        // Handle the error
      }
    );
  }
  onColumnChange(table:any , critere: any , list_column:any){
    const type_int: string = "int";
    const type_date: string = "datetime";
    const type_string: string = "varchar";
    
    const column_check = list_column.filter((el: any) => el.Field === critere.column_name);
    const type_col: string = column_check.flat()[0].Type;

    if (type_col.includes(type_int)) {
      critere.list_action = this.action_list_int; // Because int list have the same values in the date list
      critere.type = "int";
    } else if (type_col.includes(type_string)) {
      critere.list_action = this.action_list_string;
      critere.type = "string";
    }
    else if (type_col.includes(type_date)) {
      critere.list_action = this.action_list_date;
      critere.type = "date";
    }
  }

  onColumnChangeDetail(table:any , critere: any , list_column:any){
    const type_int: string = "int";
    const type_date: string = "datetime";
    const type_string: string = "varchar";
    const column_check = list_column.filter((el: any) => el.Field === critere.column_name);
    const type_col: string = column_check.flat()[0].Type;

    if (type_col.includes(type_int)) {
      critere.list_action = this.action_list_int; // Because int list have the same values in the date list
      critere.type = "int";
    } else if (type_col.includes(type_string)) {
      critere.list_action = this.action_list_string;
      critere.type = "string";
    }
    else if (type_col.includes(type_date)) {
      critere.list_action = this.action_list_date;
      critere.type = "date";
    }
    // console.log(list_column)
  }
  onSubmit(f:NgForm , e:any){
    console.log(f);
    this.facturationApi.addModel(this.data , this.titre_model , this.objet_model).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        // Handle the error
        console.log(error)
      }
    );
  }
}
