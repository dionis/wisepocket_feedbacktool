import { Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';

import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseUtils } from '../../../../../@fuse/utils';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { Opinion } from '../../../../models/opinion.model';
import { OpinionService } from '../../../../services/opinion-analizer.service';


import { EcommerceOrdersService } from '../../../../../app/main/apps/e-commerce/orders/orders.service';


import { locale as english } from '../../../../../app/main/apps/opinionMailbox/i18n/en';
import { locale as turkish } from '../../../../../app/main/apps/opinionMailbox/i18n/tr';
import { locale as spanish } from '../../../../../app/main/apps/opinionMailbox/i18n/es';

@Component({
    selector     : 'opinion-details',
    templateUrl  : './opinion-details.component.html',
    styleUrls    : ['./opinion-details.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class OpinionDetailsComponent implements OnInit, OnDestroy
{
    opinion: Opinion;
    labels: any[];
    showDetails: boolean;

    dataSource: FilesDataSource | null;
    displayedColumns = ['id', 'aspects', 'total', 'polarity'];
    //['id', 'reference', 'customer', 'total', 'payment', 'status', 'date'];

    @ViewChild(MatPaginator, {static: true})
    paginatorDetails: MatPaginator;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {OpinionService} _opinionService
     */
    constructor(
        private _opinionService: OpinionService,
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        private _ecommerceOrdersService: EcommerceOrdersService

    )
    {
        // Set the defaults
        this.showDetails = false;

        // Set the private defaults
        this._unsubscribeAll = new Subject();

           // Load the translations
           this._fuseTranslationLoaderService.loadTranslations(english, turkish, spanish);


    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
       console.log("Is paginator ", this.sort)
       this.dataSource = new FilesDataSource(this._ecommerceOrdersService, this.paginatorDetails, this.sort);


        // Subscribe to update the current opinion
        this._opinionService.onCurrentOpinionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentOpinion => {
                this.opinion = currentOpinion;
            });

        // Subscribe to update on label change
        this._opinionService.onLabelsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(labels => {
                this.labels = labels;
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
     * Toggle star
     *
     * @param event
     */
    toggleStar(event): void
    {
        event.stopPropagation();

        this.opinion.toggleStar();

        this._opinionService.updateOpinion(this.opinion);
    }

    /**
     * Toggle important
     *
     * @param event
     */
    toggleImportant(event): void
    {
        event.stopPropagation();

        this.opinion.toggleImportant();

        this._opinionService.updateOpinion(this.opinion);
    }
}



export class FilesDataSource extends DataSource<any>
{
    // Private
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {EcommerceOrdersService} _ecommerceOrdersService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private _ecommerceOrdersService: EcommerceOrdersService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort

    )
    {
        super();

        this.filteredData = this._ecommerceOrdersService.orders;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this._ecommerceOrdersService.onOrdersChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange

        ];

        return merge(...displayDataChanges).pipe(map(() => {

                let data = this._ecommerceOrdersService.orders.slice();

                data = this.filterData(data);

                this.filteredData = [...data];

                data = this.sortData(data);

                // Grab the page's slice of data.
                const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                return data.splice(startIndex, this._matPaginator.pageSize);
            })
        );

    }

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'id':
                    [propertyA, propertyB] = [a.id, b.id];
                    break;
                case 'reference':
                    [propertyA, propertyB] = [a.reference, b.reference];
                    break;
                case 'aspects':
                    [propertyA, propertyB] = [a.customer.firstName, b.customer.firstName];
                    break;
                case 'total':
                    [propertyA, propertyB] = [a.total, b.total];
                    break;
                case 'payment':
                    [propertyA, propertyB] = [a.payment.method, b.payment.method];
                    break;
                case 'polarity':
                    [propertyA, propertyB] = [a.status[0].name, b.status[0].name];
                    break;
                case 'date':
                    [propertyA, propertyB] = [a.date, b.date];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
