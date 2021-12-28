import { Campaign } from '../../../../models/campaing.model';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
    selector     : 'campaigns-campaign-form-dialog',
    templateUrl  : './campaign-form.component.html',
    styleUrls    : ['./campaign-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CampaignFormDialogComponent
{
    action: string;
    campaign: Campaign;
    campaignForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<CampaignFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<CampaignFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Campaign';
            this.campaign = _data.campaign;
        }
        else
        {
            this.dialogTitle = 'New Campaign';
            this.campaign = new Campaign({});
        }

        this.campaignForm = this.createCampaignForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create campaign form
     *
     * @returns {FormGroup}
     */
    createCampaignForm(): FormGroup
    {
        return this._formBuilder.group({
            name            : [this.campaign.nombre],
            date            : [this.campaign.fecha],
          //  user            : [this.campaign.userChief],
            description     : [this.campaign.descripcion],
          //  phoneContact    : [this.campaign.contactoTelefono],
          //  firstColor      : [this.campaign.colorPrincipal],
           // secondColor     : [this.campaign.colorSecundario],
           // emailContact    : [this.campaign.contactoEmail],
           // postalCode      : [this.campaign.direccionPostal],
           // telegramContact : [this.campaign.contactoTelegram],
           // whatsappContact : [this.campaign.contactoWhatsapp],
          //  facebookContact : [this.campaign.contactoFacebook],
        });
    }
}
