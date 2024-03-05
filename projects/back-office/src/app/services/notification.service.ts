import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastrService: ToastrService
    ) { }
    public showSuccess(message:any): void {
      this.toastrService.success(message, 'Succès');
    }
  
    public showInfo(message:any): void {
      this.toastrService.info(message, 'Info!');
    }
  
    public showWarning(message:any): void {
      this.toastrService.warning(message, 'Attention!');
    }
    public showWarning2(): void {
      this.toastrService.warning("Aucun données ", 'Attention!');
    }
  
    public showError(message:any): void {
      this.toastrService.error(message, 'Erreur!');
    }
    public showError2(): void {
      this.toastrService.error("Une erreur s'est produite !", 'Erreur!');
    }
}
