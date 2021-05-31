import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';

import { Opinion } from '../../../models/opinion.model';
import { OpinionService } from '../../../services/opinion-analizer.service';
import { EstadXidiomaService } from '../../../services/estad-xidioma.service';

import { CampaignService } from '../../../services/campaign.service';
import { UserService } from '../../../services/user.service';
import * as moment from 'moment';


import { locale as english } from '../../../../app/main/apps/opinionMailbox/i18n/en';
import { locale as turkish } from '../../../../app/main/apps/opinionMailbox/i18n/tr';

@Component({
    selector     : 'opinion',
    templateUrl  : './opinionMailbox.component.html',
    styleUrls    : ['./opinionMailbox.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class OpinionMailboxComponent implements OnInit, OnDestroy
{
    hasSelectedOpinions: boolean;
    isIndeterminate: boolean;
    folders: any[];
    filters: any[];
    labels: any[];
    searchInput: FormControl;
    currentOpinion: Opinion;

    showOpinionList:boolean = true;
    campaigns: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {OpinionService} _opinionService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    constructor(
        private _opinionService: OpinionService,
        private _fuseSidebarService: FuseSidebarService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _camapignService: CampaignService,
        private _userService: UserService,
        private _estadPrueba: EstadXidiomaService,
    )
    {
        // Load the translations
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);

        // Set the defaults
        this.searchInput = new FormControl('');

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
        this._opinionService.onSelectedOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(selectedOpinions => {
                setTimeout(() => {
                    this.hasSelectedOpinions = selectedOpinions.length > 0;
                    this.isIndeterminate = (selectedOpinions.length !== this._opinionService.opinions.length && selectedOpinions.length > 0);
                }, 0);
            });

        this._opinionService.onFoldersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.folders = this._opinionService.folders;
            });

        this._opinionService.onFiltersChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(folders => {
                this.filters = this._opinionService.filters;
            });

        this._opinionService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = this._opinionService.labels;
            });

        this._opinionService.onCurrentOpinionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentOpinion => {
                if ( !currentOpinion )
                {
                    this.currentOpinion = null;
                }
                else
                {
                    this.currentOpinion = currentOpinion;
                }
            });

        this.searchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            distinctUntilChanged()
        )
        .subscribe(searchText => {
                this._opinionService.onSearchTextChanged.next(searchText);
        });
        let currentCamapingId: string = "";
        //console.log(" Get information about USER ", this._userService.user.id);
        this._camapignService.getCampaignbyUser('0','','','');


        /*if (typeof (this._camapignService.campaign) !== 'undefined' && this._camapignService.campaign.length > 0) {
            //Selecciona el id de la campana escogida por el usuario
          /*************************************************
             ERASE IN PRODUCTION
          **************************************************/
             /*this._camapignService.testSelectedRandomCamaping()
                  .then( (_)=>{
                    const camapIgnObjet = this._camapignService.selectedCampaign;

                    console.log("Campaign ID", camapIgnObjet)
                    console.log("Campaingn list ", this._camapignService.campaign);

                    currentCamapingId = camapIgnObjet.id;
                    this._estadPrueba.setCurrentCamaignId(currentCamapingId);

                    this.campaigns = this._camapignService.getMyCamps();
                    console.log(this.campaigns);

                    let currentDate =  moment().format("YYYY-MM-DD hh:mm a");


                  })
                  .catch(error=>console.error(error))


            }*/

    }

    ngOnDestroy(): void{
    // @ Public methods
        this._opinionService.toggleSelectAll();
    }

    /**
     * Select opinions
     *
     * @param filterParameter
     * @param filterValue
     */
    selectOpinions(filterParameter?, filterValue?): void
    {
        this._opinionService.selectOpinions(filterParameter, filterValue);
    }

    /**
     * Deselect Opinions
     */
    deselectOpinions(): void
    {
        this._opinionService.deselectOpinions();
    }

    /**
     * Deselect current Opinion
     */
    deselectCurrentOpinion(): void
    {
        this._opinionService.onCurrentOpinionChanged.next(null);
    }

    /**
     * Toggle label on selected Opinions
     *
     * @param labelId
     */
    toggleLabelOnSelectedOpinions(labelId): void
    {
        this._opinionService.toggleLabelOnSelectedOpinions(labelId);
    }

    /**
     * Set folder on selected Opinions
     *
     * @param folderId
     */
    setFolderOnSelectedOpinions(folderId): void
    {
        this._opinionService.setFolderOnSelectedOpinions(folderId);
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

    toggleSelectAll():void {

    }
}
