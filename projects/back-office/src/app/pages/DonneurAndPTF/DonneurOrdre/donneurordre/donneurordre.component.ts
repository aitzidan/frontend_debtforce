import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { HeaderService } from 'projects/back-office/src/app/header.service';
import { DonneurService } from 'projects/back-office/src/app/Api/donneur.service';
import { NotificationService } from 'projects/back-office/src/app/services/notification.service'

export interface Donneur {
  id: number;
  metier: string;
  nom: string;
  date_creation: string;
  date_debut: string;
  raison_sociale: string;
  numero_rc : string;
  cp: string;
  compte_bancaire: string;
  date_fin: string;
}
@Component({
  selector: 'app-donneurordre',
  templateUrl: './donneurordre.component.html',
  styleUrls: ['./donneurordre.component.css'],
})
export class DonneurordreComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    // private userApi: UtilisateursService,
    private userApi: DonneurService,
    private headerservice: HeaderService,
    public notify: NotificationService,
  ) {}
  public donneur: any;
  list_donneurs: Donneur[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = [
    'nom',
    'metier',
    'raison_sociale',
    'numero_rc',
    'cp',
    'operation',
  ];
  // dataSource = new MatTableDataSource<Donneur>([]);
  @ViewChild('cherchInput', { static: false })
  cherchInput!: ElementRef;
  searchTerm:any;
  chercher() {
    const filter = this.searchTerm.toUpperCase();
    const trs = this.cherchInput.nativeElement.parentElement.parentElement.getElementsByTagName('tr');

    for (let i = 0; i < trs.length; i++) {
      const td = trs[i].getElementsByTagName('td')[0];
      if (td) {
        const txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          trs[i].style.display = '';
        } else {
          trs[i].style.display = 'none';
        }
      }
    }
  }


  dataSource = new MatTableDataSource<Donneur>([]);

  DeleteDonneur(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userApi.DeleteDonneur(id).subscribe(
          (res: any) => {
            // alert("Supprimer avec succes");
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            return res;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }

  ngOnInit(): void {
    this.userApi.getDonneur().subscribe(
      (res: any) => {
        this.donneur = res.data;
        this.list_donneurs = res.data;
        this.dataSource.data = this.list_donneurs;
        console.log(this.dataSource.data)

        
      },
      (error: any) => {}
    );

    const links = [
      { link: 'Liste', route: '/donneur_ordre' },
      { link: 'Nouveau donneur', route: '/donneur' },
      // { link: 'Nouveau contact', route: '/donneur/contact' },
    ];
    this.headerservice.setLinks(links);
  }
}
