import { Component , Inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MissionsService } from 'src/app/Api/missions.service';
import { CreateFileComponent } from 'projects/user-interface/src/app/pages/missions/create-file/create-file.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface liste_details_file {
  numero_dossier: any;
  adresse: any;
  is_in_mission: any;
}
export interface liste_details_file2 {
  id:any;
  numero_dossier: any;
  adresse: any;
  is_in_mission: any;
}
@Component({
  selector: 'app-liste-details-file',
  templateUrl: './liste-details-file.component.html',
  styleUrls: ['./liste-details-file.component.css']
})
export class ListeDetailsFileComponent {
  constructor(private MissionsService : MissionsService , public dialogRef1: MatDialogRef<CreateFileComponent >,
    @Inject(MAT_DIALOG_DATA) public data: any) {}
    displayedColumns: string[] = [ 'numero_dossier', 'adresse', 'is_in_mission'];
    dataSource = new MatTableDataSource<liste_details_file>([]); 
    displayedColumns1: string[] = [ 'numero_dossier', 'adresse', 'is_in_mission'];
    dataSource1 = new MatTableDataSource<liste_details_file2>([]); 
  
    selection = new SelectionModel<liste_details_file2>(true, []);
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource1.data.length;
      return numSelected === numRows;
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource1.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: liste_details_file2): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
    ngOnInit(){
      if(this.data.type == 'liste_details_file'){
        this.MissionsService.getOneFile(this.data.id).subscribe(
          (response: any) => {
            console.log(response)
            this.dataSource.data = response.details
          },
          (error: any) => {
            console.log(error)
          }
        );
      }
      if(this.data.type == 'liste_details_for_check'){console.log(this.data.id)
        this.MissionsService.getOneFile(this.data.id).subscribe(
          (response: any) => {
            console.log(response)
            this.dataSource1.data = response.details
          },
          (error: any) => {
            console.log(error)
          }
        );
      }
    }

}
