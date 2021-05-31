import { SharedVariablesService } from '../../../../services/shared-variables.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInv } from '../../../../models/userInv.model';
import { UserInvService } from '../../../../services/user-inv.service';
import swal from "sweetalert2";

@Component({
  selector: 'app-contact-asociar',
  templateUrl: './contact-asociar.component.html',
  styleUrls: ['./contact-asociar.component.scss']
})
export class ContactAsociarComponent implements OnInit {
  action: string;
  contact: UserInv;
  nameCamp: string

  //contactForm: FormGroup;
  invUserForm: FormGroup;
  dialogTitle: string;
  constructor(public matDialogRef: MatDialogRef<ContactAsociarComponent>, @Inject(MAT_DIALOG_DATA) private _data: any, private _formBuilder: FormBuilder, private invService: UserInvService, private servCamp: SharedVariablesService) {
    this.action = _data.action;

    if (this.action === 'asociar') {
      this.dialogTitle = 'Asociar a Campaña';
      this.contact = _data.contact;
    }
    this.invUserForm = this._formBuilder.group({
      contraseña: ['', Validators.required],
    });
    this.nameCamp = this.servCamp.getName()
    console.log(this.nameCamp);

    this.invUserForm = this.createContactForm();

  }

  ngOnInit(): void {

  }

  procesarTodo(pass, contact) {
    this.updatePass(pass, contact)
    this.asociarAcamp(contact)
    this.updateAcces(contact)
  }
  asociarAcamp(contact) {
    this.invService.AddCampInv(this.nameCamp, contact.id).subscribe(data => {
      console.log(data);
      swal.fire('Usuario asociado con éxito')

    });
  }

  updatePass(pass, contact) {
    this.invService.updatePass(pass.value, contact).subscribe(data => {
      console.log(data);
    });
  }

  updateAcces(contact) {
    let acceso = true
    this.invService.updateAcceso(acceso, contact).subscribe(data => {
      console.log(data);
    });
  }

  createContactForm(): FormGroup {
    console.log("New Form");

    return this._formBuilder.group({
      id: [this.contact.id],
      password: [this.contact.password],
      acceso: [this.contact.acceso],
    });
  }
}
