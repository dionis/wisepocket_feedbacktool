import { UserInvService } from "../../../../services/user-inv.service";
//import { Campaing } from '../../../../models/campaing.model';
import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DataSource } from "@angular/cdk/collections";
import { Observable, Subject } from "rxjs";
import { fuseAnimations } from "../../../../../@fuse/animations";
import { FuseConfirmDialogComponent } from "../../../../../@fuse/components/confirm-dialog/confirm-dialog.component";
import { ContactsContactFormDialogComponent } from "../../../../../app/main/apps/userInv-Manage/contact-form/contact-form.component";
//import {CampaingService} from '../../../../services/campaing.service';
import swal from "sweetalert2";
import { takeUntil } from "rxjs/operators";
import { SharedVariablesService } from "../../../../services/shared-variables.service";

@Component({
  selector: "contacts-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.scss"],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
})
export class ContactsContactListComponent implements OnInit, OnDestroy {
  @ViewChild("dialogContent")
  dialogContent: TemplateRef<any>;

  contacts: any;
  user: any;
  dataSource: FilesDataSource | null;
  displayedColumns = ["Nombre", "Correo", "Teléfono", "boton", "menu"];
  selectedContacts: any[];
  checkboxes: {};
  //showStatus: boolean;
  dialogRef: any;
  confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  ListaCampanaService: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {User_contactsService} _contactsService
   * @param {MatDialog} _matDialog
   */
  constructor(
    private _contactsService: UserInvService,
    public _matDialog: MatDialog,
    private servCamp: SharedVariablesService,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this._contactsService.getInvitados().subscribe((data) => {
      console.log(data);
    });

    this.dataSource = new FilesDataSource(this._contactsService);
    console.log(this.dataSource);
    this.dataSource.connect().subscribe((data) => {
      this.statusAsociado(data);
      //console.log(data);
      //console.log(this._contactsService.getInvitadXID(data[0].id))
    });

    this._contactsService.onContactsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((contacts) => {
        this.contacts = contacts;
      });
    
  }
  quitarAcces(contact) {
    swal
      .fire({
        title: "¿Está seguro que desea quitarle el acceso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this._contactsService.getStatusAsociado(contact).subscribe((res) => {
            console.log(res.success);
            if (res.success != true) {
              this._contactsService.quitarAcceso(contact).subscribe((res) => {
                swal.fire({
                  title: "Acceso deshabilitado",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2500,
                });
                this.statusAcces(contact);
              });
            } else {
              swal.fire({
                title: "No está asociado",
                icon: "info",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        }
      });
  }

  devolverAcces(contact) {
    swal
      .fire({
        title: "¿Está seguro que desea devolverle el acceso?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this._contactsService.getStatusAsociado(contact).subscribe((res) => {
            console.log(res.success);
            if (res.success != true) {
              this._contactsService.devolverAcceso(contact).subscribe((res) => {
                swal.fire({
                  title: "Acceso habilitado",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2500,
                });
                this.statusAcces(contact);
              });
            } else {
              swal.fire({
                title: "No está asociado",
                icon: "info",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        }
      });
  }

  desvincular(contact) {
    swal
      .fire({
        title: "¿Está seguro que desea desvincularlo?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this._contactsService.getStatusAsociado(contact).subscribe((res) => {
            console.log(res.success);
            if (res.success != true) {
              this._contactsService
                .deleteRelacion(contact)
                .subscribe((data) => {
                  console.log(data);
                });
              this._contactsService.deleteAcces(contact).subscribe((data) => {
                console.log(data);
              });
              this._contactsService
                .deleteupdatePass(contact)
                .subscribe((data) => {
                  console.log(data);
                });
              swal.fire({
                title: "Desvinculado con éxito",
                icon: "success",
                showConfirmButton: false,
                timer: 2500,
              });
              this._contactsService.getFiltersInvCAMP().subscribe((data) => {
                console.log(data);
              });
            } else {
              swal.fire({
                title: "No está asociado",
                icon: "info",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        }
      });
  }

  /*asociarAcamp(contact) {
    swal
      .fire({
        title:
          "¿Está seguro que desea vincular a " +
          contact.nombre +
          " y darle acceso a la campaña " +
          this.servCamp.getName() +
          "?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
        allowOutsideClick: true,
      })
      .then((result) => {
        if (result.value) {
          this._contactsService.getStatusAsociado(contact).subscribe((res) => {
            console.log(res.success);
            if (res.success) {
              this._contactsService.AddCampInv(contact).subscribe((res) => {
                if (res.message === "Asociado a la Campaña con éxito") {
                  this.updateAcces(contact);
                  swal.fire({
                    title:
                      "Ahora el usuario tiene acceso a la Campaña: " +
                      this.servCamp.getName(),
                    html: "<h3>Para cambiar la contraseña vaya a la opción Editar</h3>",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 4000,
                  });
                  this._contactsService.getFiltersInvCAMP().subscribe((data) => {
                    console.log(data);
                  });
                } else if (res.success === false) {
                  swal.fire({
                    title: "Fallo la operación",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2500,
                  });
                }
                this.statusAcces(contact);
              });
            } else {
              swal.fire({
                title: "Ya está asociado",
                icon: "info",
                showConfirmButton: false,
                timer: 2500,
              });
            }
          });
        }
      });
  }*/

  updateAcces(contact) {
    this._contactsService.darAcceso(contact).subscribe((data) => {
      console.log(data);
    });
  }

  statusAsociado(contact): any {
    this._contactsService.getStatusAsociado(contact).subscribe((res) => {
      console.log(res.success);
      return res.success;
    });
  }
  statusAcces(invitado) {
    this._contactsService.getStatusAcceso(invitado).subscribe((res) => {
      if (res.success) {
        //this.showStatus = true;
      } else {
        //this.showStatus = false;
      }
    });
  }

  
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Edit contact
   *
   * @param contact
   */
  editContact(contact): void {
    this.dialogRef = this._matDialog.open(ContactsContactFormDialogComponent, {
      panelClass: "contact-form-dialog",
      data: {
        contact: contact,
        action: "edit",
      },
    });
  }

  /*asociarCamp(contact): void {
    this.dialogRef = this._matDialog.open(ContactAsociarComponent, {
      width: "600px",
      height: "auto",
      panelClass: "asocia-contact-form-dialog",
      data: {
        contact: contact,
        action: "asociar",
      },
    });
  }*/

  /**
   * Delete Contact
   */

  /**
   * On selected change
   *
   * @param contactId
   */
  onSelectedChange(contactId): void {
    //this._contactsService.toggleSelectedContact(contactId);
  }

  /**
   * Toggle star
   *
   * @param contactId
   */
  toggleStar(contactId): void {
    if (this.user.starred.includes(contactId)) {
      this.user.starred.splice(this.user.starred.indexOf(contactId), 1);
    } else {
      this.user.starred.push(contactId);
    }

    // this._contactsService.updateUserData(this.user);
  }
}

export class FilesDataSource extends DataSource<any> {
  /**
   * Constructor
   *
   *
   */
  constructor(private _contactsService: UserInvService) {
    super();
  }

  /**
   * Connect function called by the table to retrieve one stream containing the data to render.
   * @returns {Observable<any[]>}
   */
  connect(): Observable<any[]> {
    return this._contactsService.onContactsChanged;
  }

  /**
   * Disconnect
   */
  disconnect(): void {}
}
