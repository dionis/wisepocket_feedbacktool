import { UserService } from '../../../../services/user.service';
import { UserInvService } from '../../../../services/user-inv.service';
//import { Campaing } from '../../../../models/campaing.model';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';
import { ContactsContactFormDialogComponent } from '../../../../../app/main/apps/userInv-Manage/contact-form/contact-form.component';
import { ContactAsociarComponent } from '../contact-asociar/contact-asociar.component';
//import {CampaingService} from '../../../../services/campaing.service';
import swal from "sweetalert2";

@Component({
    selector: 'contacts-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ContactsContactListComponent implements OnInit, OnDestroy {
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;


    contacts: any;
    user: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['Nombre', 'Correo', 'Teléfono', 'boton', 'menu'];
    selectedContacts: any[];
    checkboxes: {};
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

        this._contactsService.getInvitados().subscribe(data => {
            console.log(data);
            this._contactsService.getUsers(data.data) ///Esta funcion inyecta los usuarios para mostrar en la tabla

        })


        this.dataSource = new FilesDataSource(this._contactsService);
        console.log(this.dataSource);
        this.dataSource.connect().subscribe(data => {
            console.log(data);
            //console.log(this._contactsService.getInvitadXID(data[0].id))

        })

        /* this._contactsService.onContactsChanged
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe(contacts => {
                 this.contacts = contacts;
 
                 this.checkboxes = {};
                 contacts.map(contact => {
                     this.checkboxes[contact.id] = false;
                 });
             });
 
         /*this._contactsService.onSelectedContactsChanged
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe(selectedContacts => {
                 for (const id in this.checkboxes) {
                     if (!this.checkboxes.hasOwnProperty(id)) {
                         continue;
                     }
 
                     this.checkboxes[id] = selectedContacts.includes(id);
                 }
                 this.selectedContacts = selectedContacts;
             });
 
         this._contactsService.onUserDataChanged
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe(user => {
                 this.user = user;
             });
 
         this._contactsService.onFilterChanged
             .pipe(takeUntil(this._unsubscribeAll))
             .subscribe(() => {
                 this._contactsService.deselectContacts();
             });*/
    }
    quitarAcces(contact) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea quitarle el acceso?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._contactsService.quitarAcceso(contact).subscribe(res => {
                    if (res.success === false) {
                        swal.fire('Aún no está asociado')
                    }
                    else if (res.success) {
                        swal.fire('Acceso deshabilitado')
                    }
                });
            }
            this.confirmDialogRef = null;
        });

    }

    devolverAcces(contact) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea devolverle el acceso?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._contactsService.devolverAcceso(contact).subscribe(res => {
                    if (res.success === false) {
                        swal.fire('Aún no está asociado')
                    }
                    else if (res.success) {
                        swal.fire('Acceso habilitado')
                    }
                });
            }
            this.confirmDialogRef = null;
        });


    }

    desvincular(contact) {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea desvincularlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this._contactsService.deleteRelacion(contact).subscribe(data => {
                    console.log(data);
                });
                this._contactsService.deleteAcces(contact).subscribe(data => {
                    console.log(data);
                });
                this._contactsService.deleteupdatePass(contact).subscribe(data => {
                    console.log(data);
                });
                swal.fire('Desvinculado con éxito')
                this._contactsService.getFiltersInvCAMP().then(data => {
                    console.log(data);
                    this._contactsService.getUsers(data.data)

                })
            }
            this.confirmDialogRef = null;
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
            panelClass: 'contact-form-dialog',
            data: {
                contact: contact,
                action: 'edit'
            }

        });
    }

    asociarCamp(contact): void {
        this.dialogRef = this._matDialog.open(ContactAsociarComponent, {
            width: '600px',
            height: 'auto',
            panelClass: 'asocia-contact-form-dialog',
            data: {
                contact: contact,
                action: 'asociar'
            }
        });


    }

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
        }
        else {
            this.user.starred.push(contactId);
        }

        // this._contactsService.updateUserData(this.user);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     *
     */
    constructor(
        private _contactsService: UserInvService
    ) {
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
    disconnect(): void {
    }
}
