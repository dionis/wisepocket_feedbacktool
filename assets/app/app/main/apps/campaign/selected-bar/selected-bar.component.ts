import { Campaign } from '../../../../models/campaing.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfirmDialogComponent } from '../../../../../@fuse/components/confirm-dialog/confirm-dialog.component';

import { CampaignService } from '../../../../services/campaing.service';

@Component({
    selector   : 'selected-bar',
    templateUrl: './selected-bar.component.html',
    styleUrls  : ['./selected-bar.component.scss']
})
export class CampaignSelectedBarComponent implements OnInit, OnDestroy
{
    confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
    hasSelectedCampaign: boolean;
    isIndeterminate: boolean;
    selectedCampaigns: string[];

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CampaignService} _campaignService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _campignService: CampaignService,
        public _matDialog: MatDialog
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
        this._campignService.onSelectedCampaignChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedCampaign => {
                this.selectedCampaigns = selectedCampaign;
                setTimeout(() => {
                    this.hasSelectedCampaign = selectedCampaign.length > 0;
                    this.isIndeterminate = (selectedCampaign.length !== this._campignService.campaign.length && selectedCampaign.length > 0);
                }, 0);
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
     * Select all
     */
    selectAll(): void
    {
        this._campignService.selectCampaign();
    }

    /**
     * Deselect all
     */
    deselectAll(): void
    {
        this._campignService.deselectCampaigns();
    }

    /**
     * Delete selected campaigns
     */
    deleteSelectedCampaigns(): void
    {
        this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
            disableClose: false
        });

        this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete all selected campaigns?';

        this.confirmDialogRef.afterClosed()
            .subscribe(result => {
                if ( result )
                {
                    this._campignService.deleteSelectedCampaigns();
                }
                this.confirmDialogRef = null;
            });
    }
}