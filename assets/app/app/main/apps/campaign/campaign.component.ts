import { ListCampService } from '../../../../../../.tmp/public/app/app/main/ui/list-camp/list-camp.service';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

import { fuseAnimations } from '../../../../@fuse/animations';
import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';
import {CampaignService} from '../../../services/campaing.service'


import { CampaignFormDialogComponent } from './campaign-form/campaign-form.component';

@Component({
    selector     : 'campaigns',
    templateUrl  : './campaign.component.html',
    styleUrls    : ['./campaign.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class CampaignComponent implements OnInit, OnDestroy
{
    dialogRef: any;
    hasSelectedCampaign: boolean;
    searchInput: FormControl;
    ListaCampanaService: any;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CampaignService} _campaignService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {MatDialog} _matDialog
     */
    constructor(
        private _campaignService: CampaignService,
        private _fuseSidebarService: FuseSidebarService,
        private _matDialog: MatDialog,
        public campaingService: CampaignService
    )
    {
        

        // Set the defaults
        this.searchInput = new FormControl('');

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }
   /* constructor(){

    }*/

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._campaignService.onSelectedCampaignChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedCampaign => {
                this.hasSelectedCampaign = selectedCampaign.length > 0;
            });

        this.searchInput.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(searchText => {
                this._campaignService.onSearchTextChanged.next(searchText);
            });

        /*this.campaingService.getCampaignbyUser().then(res=>{
            this.ListaCampanaService=res;
              console.log(res)
            })
            .catch(err=>{
                console.log("Error", Error);
            });     */  
        
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
     * New campaign
     */
    newCampaign(): void
    {
        this.dialogRef = this._matDialog.open(CampaignFormDialogComponent, {
            panelClass: 'campaign-form-dialog',
            data      : {
                action: 'new'
            }
        });

        this.dialogRef.afterClosed()
            .subscribe((response: FormGroup) => {
                if ( !response )
                {
                    return;
                }

                this._campaignService.updateCampaign(response.getRawValue());
            });
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}