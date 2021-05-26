import { User } from '../../../../../models/user.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContactsService } from '../../../../../../app/main/apps/userInv-Manage/contacts.service';
import { OpinionService } from '../../../../../services/opinion-analizer.service';
import { UserService } from '../../../../../services/user.service';

@Component({
    selector: 'contacts-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class ContactsMainSidebarComponent implements OnInit, OnDestroy {
    user: User;
    filterBy: string;
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: ContactsService,
        private userService: UserService
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.filterBy = this._contactsService.filterBy || 'all';
        this.user = this.userService.getMyUser();
     
     

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Change the filter
     *
     * @param filter
     */
    changeFilter(filter): void {
        this.filterBy = filter;
        this._contactsService.onFilterChanged.next(this.filterBy);
    }
}
