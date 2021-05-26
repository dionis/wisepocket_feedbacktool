import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Contact } from '../../../../../app/main/apps/userInv-Manage/contact.model';
import { UserInvService } from '../../../../services/user-inv.service';
import swal from "sweetalert2";

@Component({
    selector: 'contacts-contact-form-dialog',
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ContactsContactFormDialogComponent {
    action: string;
    contact: Contact;
    //contactForm: FormGroup;
    invUserForm: FormGroup;
    dialogTitle: string;

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
        private _formBuilder: FormBuilder
    ) {
        // Set the defaults
        this.action = _data.action;

        if (this.action === 'edit') {
            this.dialogTitle = 'Editar Invitado';

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
        // this.contactForm = this.createContactForm();
    }

    onSave() {
        const data = this.invUserForm.getRawValue();
        console.log(data);
        this.invService.addInvUser(data).subscribe(res => {
            if (res.autorizado) {
                if (res.success)
                    swal.fire('Invitado registrado')
                else {
                    swal.fire('Este usuario ya está registrado')
                }
            } else{
                swal.fire('No está autorizado')
            }

        })
        // -----------------------------------------------------------------------------------------------------
        // @ Public methods
        // -----------------------------------------------------------------------------------------------------

        /**
         * Create contact form
         *
         * @returns {FormGroup}
         */
        /*createContactForm(): FormGroup {
            return this._formBuilder.group({
                id: [this.contact.id],
                name: [this.contact.name],
                lastName: [this.contact.lastName],
                avatar: [this.contact.avatar],
                nickname: [this.contact.nickname],
                company: [this.contact.company],
                jobTitle: [this.contact.jobTitle],
                email: [this.contact.email],
                phone: [this.contact.phone],
                address: [this.contact.address],
                birthday: [this.contact.birthday],
                notes: [this.contact.notes]
            });
        }*/
    }
}
