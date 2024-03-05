import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSelectionList } from '@angular/material/list';
import { CritereSegmentationService } from 'projects/back-office/src/app/Api/critere-segmentation.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
interface Task {
  id: number;
  titre: string;
  dateCreation: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-create-groupe-critere',
  templateUrl: './create-groupe-critere.component.html',
  styleUrls: ['./create-groupe-critere.component.css']
})
export class CreateGroupeCritereComponent implements OnInit{
  constructor( private segmentationApi : CritereSegmentationService ,
    private notify : NotificationService,
    private headerservice: HeaderService) {}
  @ViewChild('shoes') shoesList!: MatSelectionList;
  titre_critere:string = ""
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers','Boodddts', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers',];
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25];
  
  currentPage = 0;
  pagedShoes: string[] = [];
  panelOpenState = false;
  titre_groupe: string = '';
  liste_criteres : any = []
  liste_criteres_select : any = []
  listes_groupes : any = []
  
  groupe_selected : any  = 0


  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updatePagedShoes();
  }
  
  updatePagedShoes(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedShoes = this.typesOfShoes.slice(startIndex, endIndex);
  }
  onSubmit(f:NgForm , e:any){
    
  }
  

  onchangeregles(item:any) {
    this.liste_criteres_select.push(item);
    const indexToRemove = this.liste_criteres.findIndex((item:any) => item.id);
    if (indexToRemove !== -1) {
      this.liste_criteres.splice(indexToRemove, 1);
    }
  }
  RemoveCritere(item:any){
    this.liste_criteres.push(item);
    const indexToRemove = this.liste_criteres_select.findIndex((item:any) => item.id);
    if (indexToRemove !== -1) {
      this.liste_criteres_select.splice(indexToRemove, 1);
    }
  }
  create_groupe(){
    const data = {
      titre : this.titre_groupe,
      list_critere : this.done
    }
    console.log(data)
    this.segmentationApi.saveGroupeCritere(data).subscribe(
        (response: any) => {
          if(response.codeStatut == "OK"){
            this.notify.showSuccess(response.message)
          }  else{
            this.notify.showError(response.message)
          }
        
        },
        (error: any) => {
          this.notify.showError2()
        },
      (error: any) => {
        console.log(error)
      }
    );
  }
  onShoeSelectionChange(id:number){
    this.groupe_selected = id;
    console.log(this.groupe_selected)
    console.log("is selected")
  }


  todo: Task[] = 
    this.liste_criteres
    // Add more tasks as needed
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
    console.log(this.done)
  }
  ngOnInit(): void {
    this.updatePagedShoes();
    this.segmentationApi.listeParentCriteres().subscribe(
      (response: any) => {
        this.liste_criteres =  response.data
        console.log(this.liste_criteres);
        this.todo = this.liste_criteres
      },
      (error: any) => {
        console.log(error)
      }
    );
    this.segmentationApi.listeGroupe().subscribe(
      (response: any) => {
        this.listes_groupes =  response.data
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
