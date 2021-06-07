import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject,merge } from 'rxjs';
import { takeUntil,tap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '../../../../../@fuse/animations';

import {Opinion} from '../../../../models/opinion.model';
import {OpinionService} from '../../../../services/opinion-analizer.service';
import { OpinionTest } from '../../../../models/opinionTest.model';

@Component({
    selector     : 'mailbox-list',
    templateUrl  : './mailbox-list.componenet.html',
    styleUrls    : ['./mailbox-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class MailboxListComponent implements OnInit, OnDestroy
{
    opinions: OpinionTest[];
    opinionsTemp: OpinionTest[];
    currentOpinion: Opinion;
    pagesSize = 0;
    pageSize = 10;
    pageIndex = 0;

    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ActivatedRoute} _activatedRoute
     * @param {OpinionService} _OpinionService
     * @param {Location} _location
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _opinionService: OpinionService,
        private _location: Location,
        private router: Router
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
        console.log('Total ',this.pagesSize);
        this.pageIndex = this._activatedRoute.snapshot.params?this._activatedRoute.snapshot.params.pageIndex:0;
        this.pageSize = this._activatedRoute.snapshot.params?this._activatedRoute.snapshot.params.pageSize:10;
        // this._activatedRoute.params.subscribe(params=>{
        //     console.log(params);
        //     this.pageSize = params.pageSize;
        //     this.pageIndex = params.pageIndex
        // })
        // Subscribe to update opinions on changes
        this._opinionService.onOpinionsChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(opinions => {
                this.pagesSize = opinions.length;
                console.log('Opiniones ',opinions);
                this.opinions = opinions;
                const i = Number(this.paginator.pageIndex+1)
                const startIndex = this.paginator.pageIndex * this.paginator.pageSize+1;
                const endIndex = i*Number( this.paginator.pageSize);
                this.opinionsTemp = this.opinions.slice(startIndex,endIndex+1);
        });
        // merge(this._opinionService.onOpinionsChanged,this.paginator.page)
        // .pipe(
        //     tap(() => {
        //         const i = Number(this.paginator.pageIndex+1)
        //         const startIndex = this.paginator.pageIndex * this.paginator.pageSize+1;
        //         const endIndex = i*Number( this.paginator.pageSize);
        //         console.log(startIndex)
        //         this.opinions = this.opinions.slice(startIndex,endIndex+1);
        //     })
        // ).subscribe();

        // Subscribe to update current Opinion on changes
        this._opinionService.onCurrentOpinionChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(currentOpinion => {
                if ( !currentOpinion )
                {
                    // Set the current Opinion id to null to deselect the current Opinion
                    this.currentOpinion = null;

                    // Handle the location changes
                    const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
                          filterHandle = this._activatedRoute.snapshot.params.filterHandle,
                          folderHandle = this._activatedRoute.snapshot.params.folderHandle;

                    if ( labelHandle )
                    {
                        this._location.go('apps/opinionMailbox/label/' + labelHandle);
                    }
                    else if ( filterHandle )
                    {
                        this._location.go('apps/opinionMailbox/filter/' + filterHandle);
                    }
                    else
                    {
                        this._location.go('apps/opinionMailbox/' + folderHandle);
                    }
                }
                else
                {
                    this.currentOpinion = currentOpinion;
                }
            });
        this.paginator.page.pipe(takeUntil(this._unsubscribeAll)).subscribe(page=>{
            const i = Number(this.paginator.pageIndex+1)
            const startIndex = this.paginator.pageIndex * this.paginator.pageSize+1;
            const endIndex = i*Number( this.paginator.pageSize);
            this.opinionsTemp = this.opinions.slice(startIndex,endIndex+1); 

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
     * Read Opinion
     *
     * @param opinionId
     */
    readOpinion(opinionId): void
    {
        const labelHandle  = this._activatedRoute.snapshot.params.labelHandle,
              filterHandle = this._activatedRoute.snapshot.params.filterHandle,
              folderHandle = this._activatedRoute.snapshot.params.folderHandle;

        if ( labelHandle )
        {
            this._location.go('apps/opinionMailbox/label/' + labelHandle + '/' + opinionId);
        }
        else if ( filterHandle )
        {
            this._location.go('apps/opinionMailbox/filter/' + filterHandle + '/' + opinionId);
        }
        else
        {
            this._location.go('apps/opinionMailbox/' + folderHandle + '/' + opinionId);
        }

        // Set current Opinion
        this._opinionService.setCurrentOpinion(opinionId);
    }
}
