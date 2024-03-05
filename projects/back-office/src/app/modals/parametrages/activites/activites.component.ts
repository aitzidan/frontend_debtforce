import { Component ,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  param_select_from_dialog: string;
}

@Component({
  selector: 'app-activites',
  templateUrl: './activites.component.html',
  styleUrls: ['./activites.component.css'],
})
export class ActivitesComponent {
  param_select_from_dialog: number | undefined;
  param_select : number = 1;
  constructor(
    public dialogRef: MatDialogRef<ActivitesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
