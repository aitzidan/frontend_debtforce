import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portefeuille',
  templateUrl: './portefeuille.component.html',
  styleUrls: ['./portefeuille.component.css']
})
export class PortefeuilleComponent implements OnInit{
  constructor(
    private _formBuilder: FormBuilder,
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private headerservice: HeaderService
  ) {}
    public portefeuille:any;


    DeletePtf(id:number){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.userApi.DeletePtf(id).subscribe(
            (res: any) => {
                // alert("Supprimer avec succes");
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
              return res;
            },
            (error: any) => {
              console.log(error);
            }
          );
          
        }
      })
      // this.userApi.DeletePtf(id).subscribe(
      //   (res: any) => {
          
            
      //       alert("Supprimer avec succes");
          
      //     return res;
      //   },
      //   (error: any) => {
      //     console.log(error);
      //   }
      // );
    }
    @ViewChild('cherchInput', { static: false })
  cherchInput!: ElementRef;
  searchTerm:any;
  chercher() {
    const filter = this.searchTerm.toUpperCase();
    const trs = this.cherchInput.nativeElement.parentElement.parentElement.getElementsByTagName('tr');

    for (let i = 0; i < trs.length; i++) {
      const tds = trs[i].getElementsByTagName('td');

      let found = false;
      for (let j = 0; j < tds.length; j++) {
        const txtValue = tds[j].textContent || tds[j].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          found = true;
          break;
        }
      }

      if (found) {
        trs[i].style.display = '';
      } else {
        trs[i].style.display = 'none';
      }
    }
  }
  ngOnInit(): void {
    
    this.userApi.getPtf().subscribe(
      (res: any) => {
        this.portefeuille = res;
        console.log(this.portefeuille);
        return res;
      },
      (error: any) => {}
    );
    const links = [
      { link: 'Listes Portefeuille', route: '/portefeuille' },
      { link: 'Nouveau portefeuille', route: '/portefeuille/ajout' },
      
    ];

    this.headerservice.setLinks(links);
  }
}
