import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Opinion } from '../../../../models/opinion.model';

@Component({
    selector     : 'opinionsAnalytics-form-dialog',
    templateUrl  : './opinionAnalytics-form.component.html',
    styleUrls    : ['./opinionAnalytics-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class OpinionAnalyticsFormDialogComponent
{
    action: string;
    opinion: Opinion;
    opinionForm: FormGroup;
    dialogTitle: string;

    /**
     * Constructor
     *
     * @param {MatDialogRef<OpinionAnalyticsFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<OpinionAnalyticsFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder
    )
    {
        // Set the defaults
        this.action = _data.action;

        if ( this.action === 'edit' )
        {
            this.dialogTitle = 'Edit Opinion';
            this.opinion = _data.opinion;
        }
       /* else
        {
            this.dialogTitle = 'New Contact';
            this.contact = new Contact({});
        }*/

        this.opinionForm = this.createOpinionForm();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create opinion form
     *
     * @returns {FormGroup}
     */
    createOpinionForm(): FormGroup
    {
        return this._formBuilder.group({
            id          : [this.opinion.id],
            user        : [this.opinion.from],
            opinionText : [this.opinion.opinionText]

        });
    }
}