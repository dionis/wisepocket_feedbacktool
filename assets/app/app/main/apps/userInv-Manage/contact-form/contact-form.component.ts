import { UserInv } from '../../../../models/userInv.model';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';

import { Contact } from '../../../../../app/main/apps/userInv-Manage/contact.model';
import { UserInvService } from '../../../../services/user-inv.service';
import swal from "sweetalert2";
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsContactFormDialogComponent {
    action: string;
    contact: UserInv;
    //contactForm: FormGroup;
    invUserForm: FormGroup;
    dialogTitle: string;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;

    /**
     * Constructor
     *
     * @param {MatDialogRef<ContactsContactFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private invService: UserInvService,
        public matDialogRef: MatDialogRef<ContactsContactFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        public _matDialog: MatDialog,
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Editar Invitado';
            this.contact = _data.contact;

        }
        else {
            this.dialogTitle = 'Nuevo Invitado';

        }
        this.invUserForm = this._formBuilder.group({
            nombre: ['', Validators.required],
            correo: ['', [Validators.required, Validators.email]],
            telefono: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
            direccion: ['', Validators.required],
        });

        if (this.action === 'edit') {
            this.invUserForm = this.createContactForm();
        }


    }



    onSave() {
        const data = this.invUserForm.getRawValue();
        console.log(data);
        this.invService.addInvUser(data).subscribe(res => {

            if (res.success && res.autorizado) {
                swal.fire('Invitado registrado')
                this.contact = data
                this.invService.getInvitados().subscribe(data => {
                    console.log(data);
                    this.invService.getUsers(data.data)

                })
            }
            else if (res.success === false) {
                swal.fire('Este usuario ya está registrado')
            } if (res.autorizado === false) {
                swal.fire('No está autorizado')
            }


        })
    }

    onSaveEdit() {
        this.invService.updateInfo(this.invUserForm.getRawValue()).subscribe(data => {
            console.log(data);
            swal.fire('Usuario actualizado')
            this.invService.getInvitados().subscribe(data => {
                console.log(data);
                this.invService.getUsers(data.data)

            })
        });
    }

    onDelete() {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = '¿Está seguro que desea eliminarlo?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.invService.deleteUserInv(this.invUserForm.getRawValue()).subscribe(data => {
                    console.log(data);
                });
                this.invService.getInvitados().subscribe(data => {
                    console.log(data);
                    this.invService.getUsers(data.data)

                })
                
            }
            this.confirmDialogRef = null;
        });

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create contact form
     *
     * @returns {FormGroup}
     */
    createContactForm(): FormGroup {
        console.log("New Form");

        return this._formBuilder.group({
            id: [this.contact.id],
            nombre: [this.contact.nombre],
            correo: [this.contact.correo],
            telefono: [this.contact.telefono],
            direccion: [this.contact.direccion],
            acceso: [this.contact.acceso],

        });
    }

}


