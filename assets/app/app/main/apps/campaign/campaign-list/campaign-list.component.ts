
import { Campaign } from '../../../../models/campaing.model';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataSource } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

import { CampaignFormDialogComponent } from '../../../../../app/main/apps/campaign/campaign-form/campaign-form.component';
import {CampaignService} from '../../../../services/campaign.service';


@Component({
    selector     : 'campaigns-campaign-list',
    templateUrl  : './campaign-list.component.html',
    styleUrls    : ['./campaign-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CampaignListComponent implements OnInit, OnDestroy
{
    @ViewChild('dialogContent')
    dialogContent: TemplateRef<any>;

    campaigns: Campaign;
    camp: any;
    dataSource: FilesDataSource | null;
    displayedColumns = ['checkbox', 'avatar', 'name', 'email', 'phone', 'jobTitle', 'buttons'];
    selectedCampaigns: any[];
    checkboxes: {};
    dialogRef: any;
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    //ListaCampanaService: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CampaignService} _campaignService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _campaignService: CampaignService,
        public _matDialog: MatDialog,
       
       // public campaingModel: CampaingModel
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.dataSource = new FilesDataSource(this._campaignService);

        this._campaignService.onCampaignsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(campaigns => {
                this.campaigns = campaigns;

                this.checkboxes = {};
                campaigns.map(campaigns => {
                    this.checkboxes[campaigns.nombre] = false;
                });
            });

        this._campaignService.onSelectedCampaignsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedCampaigns => {
                for ( const nombre in this.checkboxes )
                {
                    if ( !this.checkboxes.hasOwnProperty(nombre) )
                    {
                        continue;
                    }

                    this.checkboxes[nombre] = this.selectedCampaigns.includes(nombre);
                }
                this.selectedCampaigns = this.selectedCampaigns;
            });

        this._campaignService.onCampDataChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(camp => {
                this.camp = camp;
            });

        this._campaignService.onFilterChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(() => {
                this._campaignService.deselectCampaigns();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Edit campaign
     *
     * @param campaign
     */
    editCampaign(campaign): void
    {
        this.dialogRef = this._matDialog.open(CampaignFormDialogComponent, {
            panelClass: 'campaign-form-dialog',
            data      : {
                campaign: campaign,
                action : 'edit'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe(response => {
                if ( !response )
                {
                    return;
                }
                const actionType: string = response[0];
                const formData: FormGroup = response[1];
                switch ( actionType )
                {
                    /**
                     * Save
                     */
                    case 'save':

                        this._campaignService.updateCampaign(formData.getRawValue());

                        break;
                    /**
                     * Delete
                     */
                    case 'delete':

                        this.deleteCampaign(campaign);

                        break;
                }
            });
    }

    /**
     * Delete Campaign
     */
    deleteCampaign(campaign): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';

        this.confirmDialogRef.afterClosed().subscribe(result => {
            if ( result )
            {
                this._campaignService.deleteCampaign(campaign);
            }
            this.confirmDialogRef = null;
        });

    }

    /**
     * On selected change
     *
     * @param campaignNombre
     */
    onSelectedChange(campaignNombre): void
    {
        this._campaignService.toggleSelectedCampaign(campaignNombre);
    }

    /**
     * Toggle star
     *
     * @param campaignNombre
     */
    toggleStar(campaignNombre): void
    {
        if ( this.camp.starred.includes(campaignNombre) )
        {
            this.camp.starred.splice(this.camp.starred.indexOf(campaignNombre), 1);
        }
        else
        {
            this.camp.starred.push(campaignNombre);
        }

      //  this._campaignService.updateCampData(this.camp);
    }
}

export class FilesDataSource extends DataSource<any>
{
    /**
     * Constructor
     *
     * @param {CampaignService} _campaignService
     */
    constructor(
        private _campaignService: CampaignService
    )
    {
        super();
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        return this._campaignService.onCampaignsChanged;
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}