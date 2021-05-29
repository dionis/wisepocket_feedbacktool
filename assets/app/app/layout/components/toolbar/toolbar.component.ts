import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'lodash';

import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { FuseSidebarService } from '../../../../@fuse/components/sidebar/sidebar.service';
import { UserService } from '../../../services/user.service';
import { navigation } from '../../../../app/navigation/navigation';
import { User } from '../../../models/user.model';
import { Campaign } from '../../../models/campaing.model';
import { CampaignService } from '../../../services/campaign.service';
import { MatButton } from '@angular/material/button';
import { SharedVariablesService } from '../../../services/shared-variables.service';
import { createThis } from 'typescript';
import { Router } from '@angular/router';

@Component({
    selector     : 'toolbar',
    templateUrl  : './toolbar.component.html',
    styleUrls    : ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy
{
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    navigation: any;
    selectedLanguage: any;
    userStatusOptions: any[];

    // Private
    private _unsubscribeAll: Subject<any>;
    user: User;
    selectedCampaign: any;

    @ViewChild(MatButton, {static: true})
    spn: MatButton;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private _translateService: TranslateService,
        private userService: UserService,
        private campaignService: CampaignService,
        private sharedVarService: SharedVariablesService,
        private router: Router
    )
    {
        // Set the defaults
        this.userStatusOptions = [
            {
                title: 'Online',
                icon : 'icon-checkbox-marked-circle',
                color: '#4CAF50'
            },
            {
                title: 'Away',
                icon : 'icon-clock',
                color: '#FFC107'
            },
            {
                title: 'Do not Disturb',
                icon : 'icon-minus-circle',
                color: '#F44336'
            },
            {
                title: 'Invisible',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD'
            },
            {
                title: 'Offline',
                icon : 'icon-checkbox-blank-circle-outline',
                color: '#616161'
            }
        ];

        this.languages = [
            {
                id   : 'en',
                title: 'English',
                flag : 'us'
            },
            {
                id   : 'es',
                title: 'Spanish',
                flag : 'es'
            }
        ];

        this.navigation = navigation;

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
        console.log(this.userService.getExpiration().seconds());
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
        //Select Campaign
        this.selectedCampaign = JSON.parse(localStorage.getItem('campaign_selected'));
        this.sharedVarService.campaignSelected.pipe(takeUntil(this._unsubscribeAll)).subscribe( camp=>{
            //await this.campaignService.getCampaignbyId(campId).subscribe(camp=>{
                this.selectedCampaign = JSON.parse(camp);
           // })

        })

        // Set the selected language from default languages
        this.selectedLanguage = _.find(this.languages, {id: this._translateService.currentLang});
        // Show User Logged
        // this.user = this.userService.getMyUser();

        /**
         *  Necesary change to obtein a current user data
         */
         this.sharedVarService.userSelected.pipe(takeUntil(this._unsubscribeAll))
         .subscribe( user=>{
          console.log("!!!!!! Warning current user data was change !!!!!")
            this.user = user;

         })

        console.log(this.spn);
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
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void
    {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

    /**
     * Search
     *
     * @param value
     */
    search(value): void
    {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void
    {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this._translateService.use(lang.id);
    }
    onExit(){
        this.userService.logout();
        this.router.navigate(["'/auth/login'"])
    }
}
