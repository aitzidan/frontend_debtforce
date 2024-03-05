import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule1 } from './app-routing.module';
import { AppComponentBackOffice } from './app.component';
import { View1Component } from './view1/view1.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {CdkListbox, CdkOption} from '@angular/cdk/listbox';
import {NgFor, AsyncPipe} from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { BmxToastModule } from 'bmx-toast';
import {CKEditorModule} from'ng2-ckeditor';
import {MatChipsModule} from '@angular/material/chips';
import {MatBottomSheetModule,} from '@angular/material/bottom-sheet';
import {MatSlideToggleModule,_MatSlideToggleRequiredValidatorModule,} from '@angular/material/slide-toggle';
import { SequentialWorkflowDesignerModule } from 'sequential-workflow-designer-angular';
import { MatTreeModule } from '@angular/material/tree';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import { JwtModule } from '@auth0/angular-jwt';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import {CdkDrag,CdkDropList,  CdkDropListGroup} from '@angular/cdk/drag-drop';
import { HeaderComponent } from './includes/header/header.component';
import { NavbarComponent } from './includes/navbar/navbar.component';
import { FooterComponent } from './includes/footer/footer.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { ListeDossiersComponent } from './pages/dossiers/liste-dossiers/liste-dossiers.component';
import { DetailsDossierComponent } from './pages/dossiers/details-dossier/details-dossier.component';
import { DetailsDebiteurComponent } from './pages/debiteur/details-debiteur/details-debiteur.component';
import { BarDebiteurComponent } from './pages/debiteur/bar-debiteur/bar-debiteur.component';
import { DebiteurRelationsComponent } from './pages/debiteur/debiteur-relations/debiteur-relations.component';
import { DebiteurContactsComponent } from './pages/debiteur/debiteur-contacts/debiteur-contacts.component';
import { AddEmploiComponent } from './pages/debiteur/add-emploi/add-emploi.component';
import { UpdateEmploiComponent } from './pages/debiteur/update-emploi/update-emploi.component';
import { ModelConfirmationComponent } from './modals/general/model-confirmation/model-confirmation.component';
import { AddEmployeurComponent } from './pages/debiteur/add-employeur/add-employeur.component';
import { UpdateEmployeurComponent } from './pages/debiteur/update-employeur/update-employeur.component';
import { AddTelephoneComponent } from './pages/debiteur/add-contacts/add-telephone/add-telephone.component';
import { AddAdresseComponent } from './pages/debiteur/add-contacts/add-adresse/add-adresse.component';
import { AddEmailComponent } from './pages/debiteur/add-contacts/add-email/add-email.component';
import { UpdateTelephoneComponent } from './pages/debiteur/update-contacts/update-telephone/update-telephone.component';
import { UpdateAdresseComponent } from './pages/debiteur/update-contacts/update-adresse/update-adresse.component';
import { UpdateEmailComponent } from './pages/debiteur/update-contacts/update-email/update-email.component';
import { ListeCreancesComponent } from './pages/creances/liste-creances/liste-creances.component';
import { DetailsCreanceComponent } from './pages/creances/details-creance/details-creance.component';
import { BarCreanceComponent } from './pages/creances/bar-creance/bar-creance.component';
import { AddAccordComponent } from './pages/creances/add-accord/add-accord.component';
import { DebiteursComponent } from './pages/debiteur/debiteurs/debiteurs.component';
import { CreateFileComponent } from './pages/missions/create-file/create-file.component';
import { BarMissionsComponent } from './pages/missions/bar-missions/bar-missions.component';
import { ListeDetailsFileComponent } from './modals/missions/liste-details-file/liste-details-file.component';
import { CreateMissionsComponent } from './pages/missions/create-missions/create-missions.component';
import { ViewStatistiquesComponent } from './pages/statistiques/view-statistiques/view-statistiques.component';
import { ListeUsersComponent } from './modals/general/liste-users/liste-users.component';
import { ToastrModule } from 'ngx-toastr';
import { BarMessagerieComponent } from './pages/Messagerie/bar-messagerie/bar-messagerie.component';
import { MessagerieComponent } from './pages/Messagerie/messagerie/messagerie.component';


export function tokenGetter() {
  return localStorage.getItem('token'); 
}
@NgModule({
  declarations: [
    AppComponentBackOffice,
    View1Component,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    ListeDossiersComponent,
    DetailsDossierComponent,
    DetailsDebiteurComponent,
    BarDebiteurComponent,
    DebiteurRelationsComponent,
    DebiteurContactsComponent,
    AddEmploiComponent,
    UpdateEmploiComponent,
    ModelConfirmationComponent,
    AddEmployeurComponent,
    UpdateEmployeurComponent,
    AddTelephoneComponent,
    AddAdresseComponent,
    AddEmailComponent,
    UpdateTelephoneComponent,
    UpdateAdresseComponent,
    UpdateEmailComponent,
    ListeCreancesComponent,
    DetailsCreanceComponent,
    BarCreanceComponent,
    AddAccordComponent,
    DebiteursComponent,
    CreateFileComponent,
    BarMissionsComponent,
    ListeDetailsFileComponent,
    CreateMissionsComponent,
    ViewStatistiquesComponent,
    ListeUsersComponent,
    BarMessagerieComponent,
    MessagerieComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatProgressBarModule,
    AppRoutingModule1,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }) , 
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      // Define your routes for the shared module
      {path: 'login', component: LoginComponent },
      {path: 'emp', component: AddEmployeurComponent },
      {path: 'dossiers', component: ListeDossiersComponent},///
      {path: 'creances', component: ListeCreancesComponent},///
      {path: 'detail-creance/:id', component: DetailsCreanceComponent},///
      {path: 'detail-dossier/:id', component: DetailsDossierComponent},///
      {path: 'view-statistiques', component: ViewStatistiquesComponent},///
      {path: 'messagerie/:idDistinataire', component: MessagerieComponent},///
    ]),
    CdkListbox, CdkOption,
    NgFor, AsyncPipe,
    MatTableModule,
    MatPaginatorModule,
    RouterModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatButtonModule,
    BmxToastModule,
    MatIconModule,
    CKEditorModule,
    MatChipsModule,
    MatBottomSheetModule,
    MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
    SequentialWorkflowDesignerModule,
    MatInputModule,
    MatTreeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatButtonToggleModule,
    CommonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatListModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatCardModule,
    MatTabsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:4200/"],
      },
    }),
    MatSnackBarModule,
    CdkDrag,
    CdkDropList,
    CdkDropListGroup,
    RouterModule,
    ToastrModule.forRoot() // Import ToastrModule here
  ],
  providers: [],
  bootstrap: [AppComponentBackOffice]
})
export class AppModule { }

// @NgModule({})
// export class App2SharedModule{
//   static forRoot(): ModuleWithProviders<App2SharedModule> {
//     return {
//       ngModule: AppModule,
//       providers: []
//     }
//   }
// }
