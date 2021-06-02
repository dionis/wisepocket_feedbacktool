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

  asociarAcamp(contact) {
    this.invService.AddCampInv(contact).subscribe(res => {
      if (res.message === "Asociado a la Campaña con éxito") {
        this.updatePass(contact)
        this.updateAcces(contact)
        this.statusAcces(contact)
        swal.fire('Ahora el usuario tiene acceso a la Campaña: ' + this.servCamp.getName())
      }
      else if (res.success === false) {
        swal.fire('Fallo la operación')
      }

    });
  }

  updatePass(contact) {
    this.invService.updatePass(contact).subscribe(data => {
      console.log(data);
    });
  }

  updateAcces(contact) {
    this.invService.darAcceso(contact).subscribe(data => {
      console.log(data);
    });
  }

  quitarAcces(contact) {
    this.invService.quitarAcceso(contact).subscribe(res => {
      if (res.success === false) {
        swal.fire('Aún no está asociado')
      }
      else if (res.success === true) {
        swal.fire('Acceso deshabilitado')
      }
    });
  }

  statusAcces(contact) {
    this.invService.getStatusAcceso(contact).subscribe(data => {
      console.log(data);
    });
  }

  createContactForm(): FormGroup {
    console.log("New Form");

    return this._formBuilder.group({
      id: [this.contact.id],
      nombre: [this.contact.nombre],
      correo: [this.contact.correo],
      telefono: [this.contact.telefono],
      password: [this.contact.password],
      direccion: [this.contact.direccion]
    });
  }
}
