import { SharedVariablesService } from '../../../../services/shared-variables.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInv } from '../../../../models/userInv.model';
import { UserInvService } from '../../../../services/user-inv.service';

@Component({
  selector: 'app-contact-asociar',
  templateUrl: './contact-asociar.component.html',
  styleUrls: ['./contact-asociar.component.scss']
})
export class ContactAsociarComponent implements OnInit {
  action: string;
  contact: UserInv;
  nameCamp: string
  servCamp: SharedVariablesService
  //contactForm: FormGroup;
  invUserForm: FormGroup;
  dialogTitle: string;
  constructor(public matDialogRef: MatDialogRef<ContactAsociarComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private _formBuilder: FormBuilder, private invService: UserInvService) {
    this.action = _data.action;

    if (this.action === 'asociar') {
      this.dialogTitle = 'Asociar a Campaña';
      this.contact = _data.contact;
    }
    this.invUserForm = this._formBuilder.group({
      contraseña: ['', Validators.required],
    });
    this.nameCamp = this.servCamp.getName()
   
  }

  ngOnInit(): void {

  }

  asociarAcamp() {

  }
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
