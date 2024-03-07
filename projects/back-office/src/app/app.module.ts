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
import { AjoutprofileComponent } from './pages/utilisateurs/profile/ajoutprofile/ajoutprofile.component';
// import { ActivitesComponent } from './modals/parametrages/activites/activites.component';
import { ActivitesComponent } from './modals/parametrages/activites/activites.component'; 
import { ModifierprofileComponent } from './pages/utilisateurs/profile/modifierprofile/modifierprofile.component';
import { AjoutergroupeComponent } from './pages/utilisateurs/goupe/ajoutergroupe/ajoutergroupe.component';
import { ModifiergroupeComponent } from './pages/utilisateurs/goupe/modifiergroupe/modifiergroupe.component';
import { AjouteruserComponent } from './pages/utilisateurs/user/ajouteruser/ajouteruser.component';
import { ModifieruserComponent } from './pages/utilisateurs/user/modifieruser/modifieruser.component';
import { AjoutdonneurComponent } from './pages/DonneurAndPTF/DonneurOrdre/ajoutdonneur/ajoutdonneur.component';
import { AjoutcontactComponent } from './pages/DonneurAndPTF/DonneurOrdre/ajoutcontact/ajoutcontact.component';
import { DonneurordreComponent } from './pages/DonneurAndPTF/DonneurOrdre/donneurordre/donneurordre.component';
import { ModifiercontactComponent } from './pages/DonneurAndPTF/DonneurOrdre/modifiercontact/modifiercontact.component';
import { ModifierdonneurComponent } from './pages/DonneurAndPTF/DonneurOrdre/modifierdonneur/modifierdonneur.component';
import { AjoutptfComponent } from './pages/DonneurAndPTF/Portefeuille/ajoutptf/ajoutptf.component';
import { PortefeuilleComponent } from './pages/DonneurAndPTF/Portefeuille/portefeuille/portefeuille.component';
import { ModifierptfComponent } from './pages/DonneurAndPTF/Portefeuille/modifierptf/modifierptf.component';
import { ChampsmodalComponent } from './pages/modals/champsmodal/champsmodal.component';
import { AjoutermodelComponent } from './pages/affichage_parametre/ajoutermodel/ajoutermodel.component';
import { ModelComponent } from './pages/affichage_parametre/model/model.component';
import { ModifiermodelComponent } from './pages/affichage_parametre/modifiermodel/modifiermodel.component';
import { ChampsmodalUpdateComponent } from './pages/modals/champsmodal-update/champsmodal-update.component';
import { ContactmodalComponent } from './pages/modals/contactmodal/contactmodal.component';
import { Ajoutermodel2Component } from './pages/affichage_parametre/ajoutermodel2/ajoutermodel2.component';
import { Modifiermodel2Component } from './pages/affichage_parametre/modifiermodel2/modifiermodel2.component';
import { ModelaffichagemodelComponent } from './pages/modals/modelaffichagemodel/modelaffichagemodel.component';
import { UsersComponent } from './pages/utilisateurs/user/users/users.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { AddCompetenceComponent } from './pages/parametrages/activities/cmpetences/add-competence/add-competence.component';
import { UpdateCompetenceComponent } from './pages/parametrages/activities/cmpetences/update-competence/update-competence.component';
import { AddModelFacturationComponent } from './pages/parametrages/activities/facturation/add-model-facturation/add-model-facturation.component';
import { UpdateModelFacturationComponent } from './pages/parametrages/activities/facturation/update-model-facturation/update-model-facturation.component';
import { AddSchemaComponent } from './pages/integration-extraction/add-schema/add-schema.component';
import { ImportationComponent } from './pages/integration-extraction/importation/importation.component';
import { NouvellefactureComponent } from './pages/facturation/nouvellefacture/nouvellefacture.component';
import { AjoutmodelsmsComponent } from './pages/Models/modelsms/ajoutmodelsms/ajoutmodelsms.component';
import { ModelsmsmodalComponent } from './pages/modals/modelsmsmodal/modelsmsmodal.component';
import { AjoutmodelcourierComponent } from './pages/Models/modelcourier/ajoutmodelcourier/ajoutmodelcourier.component';
import { ModelcouriermodalComponent } from './pages/modals/modelcouriermodal/modelcouriermodal.component';
import { ModifiermodelsmsComponent } from './pages/Models/modelsms/modifiermodelsms/modifiermodelsms.component';
import { ModifiermodelcourierComponent } from './pages/Models/modelcourier/modifiermodelcourier/modifiermodelcourier.component';
import { ListefactureComponent } from './pages/facturation/listefacture/listefacture.component';
import { CreateCritereComponent } from './pages/segmentation/create-critere/create-critere.component';
import { CreateGroupeCritereComponent } from './pages/segmentation/create-groupe-critere/create-groupe-critere.component';
import { ListeModeleFacturationComponent } from './pages/parametrages/activities/facturation/liste-modele-facturation/liste-modele-facturation.component';
import { BarSchemaComponent } from './pages/integration-extraction/bar-schema/bar-schema.component';
import { UpdateSchemaComponent } from './pages/integration-extraction/update-schema/update-schema.component';
import { ActivityBarComponent } from './pages/parametrages/activities/activity-bar/activity-bar.component';
import { ActivityUpdateComponent } from './pages/parametrages/activities/activity-update/activity-update.component';
import { ActivityComponent } from './pages/parametrages/activities/activity/activity.component';
import { CreateSegmentationComponent } from './pages/segmentation/create-segmentation/create-segmentation.component';
import { OverviewSegmentationComponent } from './pages/segmentation/overview-segmentation/overview-segmentation.component';
import { BarSegmentationComponent } from './pages/segmentation/bar-segmentation/bar-segmentation.component';
import { UpdateSegmentationComponent } from './pages/segmentation/update-segmentation/update-segmentation.component';
import { UpdateIntegrationComponent } from './pages/integration-extraction/update-integration/update-integration.component';
import { BarIntegrationComponent } from './pages/integration-extraction/bar-integration/bar-integration.component';
import { GenerateWorkflowComponent } from './pages/workflow/generate-workflow/generate-workflow.component';
import { SaveWorkflowComponent } from './pages/workflow/save-workflow/save-workflow.component';
import { BarWorkflowComponent } from './pages/workflow/bar-workflow/bar-workflow.component';
import { ListeDossiersComponent } from './pages/dossiers/liste-dossiers/liste-dossiers.component';
import { DetailsDossierComponent } from './pages/dossiers/details-dossier/details-dossier.component';
import { AddCritereComponent } from 'projects/back-office/src/app/modals/workflow/add-critere/add-critere.component';
import { ExportDataComponent } from './modals/workflow/export-data/export-data.component';
import { BarQueueComponent } from './pages/segmentation/bar-queue/bar-queue.component';
import { PredefinedOverviewComponent } from './pages/segmentation/predefined-overview/predefined-overview.component';
import { PredefinedDetailsComponent } from './pages/segmentation/predefined-details/predefined-details.component';
import { GroupeQueuesComponent } from './modals/segmentation/groupe-queues/groupe-queues.component';
import { ViewCritereComponent } from './modals/segmentation/view-critere/view-critere.component';
import { CreateIntegrationComponent } from './pages/integration-extraction/create-integration/create-integration.component';
import { AppelCustomerComponent } from './modals/workflow/appel-customer/appel-customer.component';
import { SendCommunicationComponent } from './modals/workflow/send-communication/send-communication.component';
import { ApprovalStepComponent } from './modals/workflow/approval-step/approval-step.component';
import { TransferStepComponent } from './modals/workflow/transfer-step/transfer-step.component';
import { AssignWorkflowToQueueComponent } from './pages/workflow/assign-workflow-to-queue/assign-workflow-to-queue.component';
import { DetailsIntegrationComponent } from './pages/integration-extraction/details-integration/details-integration.component';
import { SegmentationComponent } from './modals/segmentation/segmentation/segmentation.component';
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
import { BarEncaissementComponent } from './pages/encaissement/bar-encaissement/bar-encaissement.component';
import { CreateImportPaiementComponent } from './pages/encaissement/create-import-paiement/create-import-paiement.component';
import { ProcessImportComponent } from './pages/encaissement/process-import/process-import.component';
// import { TestModelComponent } from './Models/test-model/test-model.component';
import { BarAffichageComponent } from './pages/affichage_parametre/bar-affichage/bar-affichage.component';
import { ListeCreancesComponent } from './pages/creances/liste-creances/liste-creances.component';
import { DetailsCreanceComponent } from './pages/creances/details-creance/details-creance.component';
import { BarCreanceComponent } from './pages/creances/bar-creance/bar-creance.component';
import { AddAccordComponent } from './pages/creances/add-accord/add-accord.component';
import { DebiteursComponent } from './pages/debiteur/debiteurs/debiteurs.component';
import { HistoriqueListeComponent } from './pages/historique/historique-liste/historique-liste.component';
import { BarHistoriqueComponent } from './pages/historique/bar-historique/bar-historique.component';
import { HistoriqueAddresseComponent } from './pages/historique/historique-addresse/historique-addresse.component';
import { HistoriqueTelephoneComponent } from './pages/historique/historique-telephone/historique-telephone.component';
import { HistoriqueEmploiComponent } from './pages/historique/historique-emploi/historique-emploi.component';
import { HistoriqueEmployeurComponent } from './pages/historique/historique-employeur/historique-employeur.component';
import { CreateFileComponent } from './pages/missions/create-file/create-file.component';
import { BarMissionsComponent } from './pages/missions/bar-missions/bar-missions.component';
import { ListeDetailsFileComponent } from './modals/missions/liste-details-file/liste-details-file.component';
import { CreateMissionsComponent } from './pages/missions/create-missions/create-missions.component';
import { ViewStatistiquesComponent } from './pages/statistiques/view-statistiques/view-statistiques.component';
import { HistoriquePaiementComponent } from './pages/historique/historique-paiement/historique-paiement.component';
import { ListeUsersComponent } from './modals/general/liste-users/liste-users.component';
import { ToastrModule } from 'ngx-toastr';
import { ConfigureWorkflowComponent } from './pages/workflow/configure-workflow/configure-workflow.component';
import { ChampModalAddComponent } from './modals/parametrages/champ-modal-add/champ-modal-add.component';

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
    ActivitesComponent,
    ActivityComponent,
    ActivityBarComponent,
    AjoutprofileComponent,
    ModifierprofileComponent,
    AjoutergroupeComponent,
    ModifiergroupeComponent,
    AjouteruserComponent,
    ModifieruserComponent,
    AjoutdonneurComponent,
    AjoutcontactComponent,
    DonneurordreComponent,
    ModifiercontactComponent,
    ModifierdonneurComponent,
    AjoutptfComponent,
    PortefeuilleComponent,
    ModifierptfComponent,
    ChampsmodalComponent,
    AjoutermodelComponent,
    ModelComponent,
    ModifiermodelComponent,
    ChampsmodalUpdateComponent,
    ContactmodalComponent,
    Ajoutermodel2Component,
    Modifiermodel2Component,
    ModelaffichagemodelComponent,
    UsersComponent,
    LoginComponent,
    AddCompetenceComponent,
    UpdateCompetenceComponent,
    AddModelFacturationComponent,
    UpdateModelFacturationComponent,
    AddSchemaComponent,
    ImportationComponent,
    NouvellefactureComponent,
    AjoutmodelsmsComponent,
    ModelsmsmodalComponent,
    AjoutmodelcourierComponent,
    ModelcouriermodalComponent,
    ModifiermodelsmsComponent,
    ModifiermodelcourierComponent,
    ListefactureComponent,
    CreateCritereComponent,
    CreateGroupeCritereComponent,
    ListeModeleFacturationComponent,
    BarSchemaComponent,
    UpdateSchemaComponent,
    ActivityBarComponent,
    ActivityUpdateComponent,
    // ActivitesComponent,
    // ActivityComponent,
    CreateSegmentationComponent,
    OverviewSegmentationComponent,
    BarSegmentationComponent,
    UpdateSegmentationComponent,
    UpdateIntegrationComponent,
    BarIntegrationComponent,
    GenerateWorkflowComponent,
    SaveWorkflowComponent,
    BarWorkflowComponent,
    ListeDossiersComponent,
    DetailsDossierComponent,
    AddCritereComponent,
    ExportDataComponent,
    BarQueueComponent,
    PredefinedOverviewComponent,
    PredefinedDetailsComponent,
    GroupeQueuesComponent,
    ViewCritereComponent,
    CreateIntegrationComponent,
    AppelCustomerComponent,
    SendCommunicationComponent,
    ApprovalStepComponent,
    TransferStepComponent,
    AssignWorkflowToQueueComponent,
    DetailsIntegrationComponent,
    SegmentationComponent,
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
    BarEncaissementComponent,
    CreateImportPaiementComponent,
    ProcessImportComponent,
    // TestModelComponent,
    BarAffichageComponent,
    ListeCreancesComponent,
    DetailsCreanceComponent,
    BarCreanceComponent,
    AddAccordComponent,
    DebiteursComponent,
    HistoriqueListeComponent,
    BarHistoriqueComponent,
    HistoriqueAddresseComponent,
    HistoriqueTelephoneComponent,
    HistoriqueEmploiComponent,
    HistoriqueEmployeurComponent,
    CreateFileComponent,
    BarMissionsComponent,
    ListeDetailsFileComponent,
    CreateMissionsComponent,
    ViewStatistiquesComponent,
    HistoriquePaiementComponent,
    ListeUsersComponent,
    ConfigureWorkflowComponent,
    ChampModalAddComponent,
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
      {path: 'testett2', component: View1Component },
      {path: 'login', component: LoginComponent },
      {path: 'activity', component: ActivityComponent},///
      {path: 'Profile', component: AjoutprofileComponent},///
      {path: 'emp', component: AddEmployeurComponent },
      {path: 'add-schema', component: AddSchemaComponent},
      {path: 'importation', component: ImportationComponent},
      {path: 'create-integration', component: CreateIntegrationComponent},
      {path: 'ModifierProfile/:profilId', component: ModifierprofileComponent},///
      {path: 'Groupe', component: AjoutergroupeComponent},///
      {path: 'ModifierGroupe/:groupId', component: ModifiergroupeComponent},///
      {path: 'User', component: AjouteruserComponent},///
      {path: 'ModifierUser/:userId', component: ModifieruserComponent},///
      {path: 'Users', component: UsersComponent},///
      {path: 'donneur', component: AjoutdonneurComponent},///
      {path: 'donneur/contact', component: AjoutcontactComponent},///

      {path: 'dossiers', component: ListeDossiersComponent},///
      {path: 'detail-dossier/:id', component: DetailsDossierComponent},///

      {path: 'donneur_ordre', component: DonneurordreComponent},///
      {path: 'ModifierContact/:contactId', component: ModifiercontactComponent},///
      {path: 'ModifierDonneur/:donneurId', component: ModifierdonneurComponent},///
      {path: 'portefeuille/ajout', component: AjoutptfComponent},///
      {path: 'portefeuille', component: PortefeuilleComponent},///
      {path: 'ModifierPtf/:ptfId', component: ModifierptfComponent},///
      {path: 'Ajouter_model_affichage', component: AjoutermodelComponent},//
      {path: 'Ajouter_model_affichage2', component: Ajoutermodel2Component},///
      {path: 'model_affichage', component: ModelComponent},///
      {path: 'modifier_model_affichage/:ModelId', component: ModifiermodelComponent},//
      {path: 'modifier_model_affichage2/:ModelId', component: Modifiermodel2Component},///
      {path: 'addCompetence', component: AddCompetenceComponent},
      {path: 'updateCompetence/:competenceId', component: UpdateCompetenceComponent},
      {path: 'AddModelFacturation', component: AddModelFacturationComponent},      
      {path: 'updateModelFacturation', component: UpdateModelFacturationComponent},

      {path: 'add-schema', component: AddSchemaComponent},
      {path: 'importation', component: ImportationComponent},
      {path: 'update-importation/:id_integration', component: UpdateIntegrationComponent},
      {path: 'create-integration', component: CreateIntegrationComponent},
      {path: 'details-integration/:id_integration', component: DetailsIntegrationComponent},

      {path: 'nouvelle-facture', component: NouvellefactureComponent},///
      {path: 'Listefacture', component: ListefactureComponent},///
      {path: 'model_sms', component: AjoutmodelsmsComponent},///
      {path: 'modifier_model_sms/:modelSmsId', component: ModifiermodelsmsComponent},///
      {path: 'model_courier', component: AjoutmodelcourierComponent},///
      {path: 'modifier_model_courier/:modelCourierId', component: ModifiermodelcourierComponent},///
      {path: 'liste-parametrages-facturation', component: ListeModeleFacturationComponent},///
      
      {path: 'create-groupe-critere', component: CreateGroupeCritereComponent},///
      {path: 'create-critere', component: CreateCritereComponent},///
      {path: 'create-segment', component: CreateSegmentationComponent},///
      {path: 'overview-segment', component: OverviewSegmentationComponent},///
      {path: 'update-segment/:idSegment', component: UpdateSegmentationComponent},///

      {path: 'overview-predefined', component: PredefinedOverviewComponent},///

      {path: 'generate-workflow', component: GenerateWorkflowComponent},///
      {path: 'save-workflow/:idWorkflow', component: SaveWorkflowComponent},///
      {path: 'configure-workflow/:idWorkflow', component: ConfigureWorkflowComponent},///
      {path: 'assign-queue', component: AssignWorkflowToQueueComponent},///
      {path: 'historique', component: HistoriqueListeComponent},///
      
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
