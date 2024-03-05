import { HeaderService } from 'projects/back-office/src/app/header.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UtilisateursService } from 'projects/back-office/src/app/Api/utilisateurs.service';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
export interface User {
  // image: string;
  nom: string;
  prenom: string;
  cin: string;
  tel: string;
  mobile: string;
  ville: string;
  adresse: string;
  status: string;
  group: string;
  imei: string;
  rayon: string;
  pays: string;
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private userApi: UtilisateursService,
    private headerservice: HeaderService
  ) {}
  public users: any;
  list_users: User[] = []; // Change the type to PeriodicElement[]
  displayedColumns: string[] = [
    "#",
    // 'image',
    'nom',
    'prenom',
    'cin',
    'tel',
    'mobile',
    'ville',
    'adresse',
    'status',
    'group',
    'imei',
    'rayon',
    'pays',
    'operation'
  ];
  dataSource = new MatTableDataSource<User>([]);
  DeleteUser(userId: any) {
    Swal.fire({
      title: 'Are you sure you want to delete this user ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userApi.DeleteUser(userId).subscribe(
          (res: any) => {
            if (res === 'OK')
              Swal.fire('Deleted!', 'User has been deleted.', 'success');
            return res;
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }
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
  ngOnInit(): void {
    this.userApi.getUsers().subscribe(
      (res: any) => {
        //this.users = res;
        this.list_users = res.data;
        this.dataSource.data = this.list_users;
        console.log(this.list_users);
        console.log(res);
        return res;
      },
      (error: any) => {}
    );
    const links = [
      { link: 'Utilisateurs', route: '/User' },
      { link: 'Groupe', route: '/Groupe' },
      { link: 'Profils', route: '/Profile' },
    ];

    this.headerservice.setLinks(links);
  }
}
