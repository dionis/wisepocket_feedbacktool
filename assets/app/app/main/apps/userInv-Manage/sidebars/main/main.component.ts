import { UserInvService } from '../../../../../services/user-inv.service';
import { User } from '../../../../../models/user.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContactsService } from '../../../../../../app/main/apps/userInv-Manage/contacts.service';
import { OpinionService } from '../../../../../services/opinion-analizer.service';
import { UserService } from '../../../../../services/user.service';
import { ContactsContactListComponent } from '../../../contacts/contact-list/contact-list.component';

@Component({
    selector: 'contacts-main-sidebar',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class ContactsMainSidebarComponent implements OnInit, OnDestroy {
    user: User;
    filterBy: string;
    filtersXCamp: any[];
    filtersAllInv: any[];
    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ContactsService} _contactsService
     */
    constructor(
        private _contactsService: ContactsService,
        private userService: UserService,
        private userInv: UserInvService
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






        //this.filterBy = this._contactsService.filterBy || 'all';
        this.userService.user
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(user => {
                this.user = user;
            })
    }

    /*filterTEST(filter) {
        this.userInv.getFilter(filter)
    }*/
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
    /*changeFilter(filter): void {
        this.filterBy = filter;
        this._contactsService.onFilterChanged.next(this.filterBy);
    }*/
    changeFilterXCamp(): void {
        this.userInv.getFiltersInvCAMP().then((data) => {
            this.userInv.onFiltersChanged
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(filters => {
                    console.log("XCamp ", filters)
                    this.filtersXCamp = filters;
                    this.userInv.getUsers(this.filtersXCamp)
                });
        })
        this.userInv.onFiltersChanged.next(this.filtersXCamp);
    }

    changeFilterAllInv(): void {
        this.userInv.getFiltersAllInv().then((data) => {
            this.userInv.onFiltersChangedInvAll
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe(filters => {
                    console.log("Todos Inv ", filters)
                    this.filtersAllInv = filters;
                    this.userInv.getUsers(this.filtersAllInv)
                });
        })
        this.userInv.onFiltersChangedInvAll.next(this.filtersAllInv);
    }
}
