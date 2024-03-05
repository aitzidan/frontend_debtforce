import { Component, OnInit, inject, ElementRef,ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatSelectionList } from '@angular/material/list';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


interface Task {
  id: number;
  titreGroupe: string;
  dateCreation: string;
}
interface dossier_data {
  id: number;
  numero_dossier: string;
  date_creation: string;
}
interface creance_data {
  id: number;
  numero_creance: number;
  total_ttc_restant: number;
  total_creance: number;
}

@Component({
  selector: 'app-create-segmentation',
  templateUrl: './create-segmentation.component.html',
  styleUrls: ['./create-segmentation.component.css']
})
export class CreateSegmentationComponent {
  constructor( 
    private notify : NotificationService,
    private segmentationApi : CritereSegmentationService , private headerservice: HeaderService) {
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allArrayTable.slice())),
      );
    }
  @ViewChild('shoes') shoesList!: MatSelectionList;

  titre_segment: string = '';
  liste_groupe: any = []
  liste_groupe_select : any = []
  etat_get_data : boolean = false

  nbr_dossier : number = 0
  dossier_data : dossier_data[] = []

  nbr_creance : number = 0
  creance_data : creance_data[] = []



  displayedColumns: string[] = ['id', 'numero_dossier', 'date_creation'];
  dataSource = new MatTableDataSource<dossier_data>([
  ]); 

  displayedColumns1: string[] = ['id', 'numero_creance', 'total_ttc_initial','total_ttc_restant','total_creance'];
  dataSource1 = new MatTableDataSource<creance_data>([
  ]); 

  // dataSource = new MatTableDataSource<creance_data>([]);

  // displayedColumns: string[] = ['id', 'numero_dossier' , 'date_creation'];

  onchangeregles(item:any) {
    this.liste_groupe_select.push(item);
    const indexToRemove = this.liste_groupe.findIndex((item:any) => item.id);
    if (indexToRemove !== -1) {
      this.liste_groupe.splice(indexToRemove, 1);
    }
  }
  RemoveGroupe(item:any){
    this.liste_groupe.push(item);
    const indexToRemove = this.liste_groupe_select.findIndex((item:any) => item.id);
    if (indexToRemove !== -1) {
      this.liste_groupe_select.splice(indexToRemove, 1);
    }
  }

  create_segment(){
    const data = {
      nom_segment : this.titre_segment,
      liste_groupe : this.todo
    }
    console.log(data)
    this.segmentationApi.saveSegment(data).subscribe(
      (response: any) => {
        if(response.message ==  "OK"){
          this.notify.showSuccess(response.message)
        }else{
          this.notify.showSuccess(response.message)
        }
      },
      (error: any) => {
        this.notify.showError2()
      }
    );
  }
  getDataSegment(){
    const data = {
      liste_groupe : this.done,
      liste_table_select:this.fruits
    }
    this.segmentationApi.getDataSegment(data).subscribe(
      (response: any) => {
        if(response.codeStatut == "OK"){
        this.etat_get_data = true;   

          if(this.fruits.includes('dossier')){
            this.dossier_data = response.data_dossier.dossier_data
            this.nbr_dossier = response.data_dossier.nombre_dossier
            this.dataSource.data = this.dossier_data
          }
          if(this.fruits.includes('creance')){
            this.creance_data = response.data_creance.creance_data
            this.nbr_creance = response.data_creance.nombre_creance
            this.dataSource1.data = this.creance_data
          }
        }else{
          console.log(response);
        }
        console.log(response);

      },
      (error: any) => {
        console.log(error)
      }
    );
  }

  //Mat chips 
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl('');
  filteredFruits: Observable<string[]>;
  fruits: string[] = ['creance'];
  allArrayTable: string[] = ['débiteur', 'dossier', 'téléphone', 'adresse'];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    if(fruit == 'creance'){
      this.notify.showWarning('La créance il sant oubliguatoire !')
    }else{
      const index = this.fruits.indexOf(fruit);
      if (index >= 0) {
        this.fruits.splice(index, 1);
        this.announcer.announce(`Removed ${fruit}`);
      }
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    if(this.fruitInput){
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allArrayTable.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  //Drag and drop
  todo: Task[] = 
    this.liste_groupe
  done: Task[] = []

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  ngOnInit(): void {
    this.segmentationApi.listeGroupe().subscribe(
      (response: any) => {
        console.log(response)
        this.liste_groupe =  response.data
        this.todo = this.liste_groupe
        console.log("groupes",+this.todo)
      },
      (error: any) => {
        console.log(error)
      }
    );
    const links = [
      { link: 'Critères', route: '/create-critere' },
      { link: 'Groupes', route: '/create-groupe-critere' },
      { link: 'Segmentaion', route: '/overview-segment' }
    ];
    this.headerservice.setLinks(links);
  }
}
