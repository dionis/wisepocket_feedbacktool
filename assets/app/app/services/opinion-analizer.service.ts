import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import {FuseUtils} from '../../@fuse/utils';

import { Opinion } from '../models/opinion.model';

@Injectable()
export class OpinionService implements Resolve<any>
{
    opinions: Opinion[];
    selectedOpinions: Opinion[];
    currentOpinion: Opinion;
    searchText = '';

    folders: any[];
    filters: any[];
    labels: any[];
    routeParams: any;

    onOpinionsChanged: BehaviorSubject<any>;
    onSelectedOpinionsChanged: BehaviorSubject<any>;
    onCurrentOpinionChanged: BehaviorSubject<any>;
    onFoldersChanged: BehaviorSubject<any>;
    onFiltersChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.selectedOpinions = [];
        this.onOpinionsChanged = new BehaviorSubject([]);
        this.onSelectedOpinionsChanged = new BehaviorSubject([]);
        this.onCurrentOpinionChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getOpinions()
            ]).then(
                () => {
                    if ( this.routeParams.opinionId )
                    {
                        this.setCurrentOpinion(this.routeParams.opinionId);
                    }
                    else
                    {
                        this.setCurrentOpinion(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if ( searchText !== '' )
                        {
                            this.searchText = searchText;
                            this.getOpinions();
                        }
                        else
                        {
                            this.searchText = searchText;
                            this.getOpinions();
                        }
                    });

                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get all folders
     *
     * @returns {Promise<any>}
     */
    getFolders(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-folders')
                .subscribe((response: any) => {
                    this.folders = response;
                    this.onFoldersChanged.next(this.folders);
                    resolve(this.folders);
                }, reject);
        });
    }

    /**
     * Get all filters
     *
     * @returns {Promise<any>}
     */
    getFilters(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-filters')
                .subscribe((response: any) => {
                    this.filters = response;
                    this.onFiltersChanged.next(this.filters);
                    resolve(this.filters);
                }, reject);
        });
    }

    /**
     * Get all labels
     *
     * @returns {Promise<any>}
     */
    getLabels(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-labels')
                .subscribe((response: any) => {
                    this.labels = response;
                    this.onLabelsChanged.next(this.labels);
                    resolve(this.labels);
                }, reject);
        });
    }

    /**
     * Get all opinions
     *
     * @returns {Promise<Opinion[]>}
     */
    getOpinions(): Promise<Opinion[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/opinions-opinions')
                .subscribe((response: any) => {

        if ( this.routeParams.labelHandle )
        {
            return this.getOpinionsByLabel(this.routeParams.labelHandle);
        }

        if ( this.routeParams.filterHandle )
        {
            return this.getOpinionsByFilter(this.routeParams.filterHandle);
        }

        if( this.routeParams.folderHandle)
        {
            return this.getOpinionsByFolder(this.routeParams.folderHandle);
        }
        this.onOpinionsChanged.next(this.opinions);
                        resolve(this.opinions);
                    }, reject);
                }
        );

    }

    /**
     * Get opinions by folder
     *
     * @param handle
     * @returns {Promise<Opinion[]>}
     */
    getOpinionsByFolder(handle): Promise<Opinion[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/mail-folders?handle=' + handle)
                .subscribe((folders: any) => {

                    const folderId = folders[0].id;

                    this._httpClient.get('api/mail-mails?folder=' + folderId)
                        .subscribe((opinions: any) => {

                            this.opinions = opinions.map(opinion => {
                                return new Opinion(opinion);
                            });

                            this.opinions = FuseUtils.filterArrayByString(this.opinions, this.searchText);

                            this.onOpinionsChanged.next(this.opinions);

                            resolve(this.opinions);

                        }, reject);
                });
        });
    }

    /**
     * Get opinions by filter
     *
     * @param handle
     * @returns {Promise<Opinion[]>}
     */
    getOpinionsByFilter(handle): Promise<Opinion[]>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/mail-mails?' + handle + '=true')
                .subscribe((opinions: any) => {

                    this.opinions = opinions.map(opinion => {
                        return new Opinion(opinion);
                    });

                    this.opinions = FuseUtils.filterArrayByString(this.opinions, this.searchText);

                    this.onOpinionsChanged.next(this.opinions);

                    resolve(this.opinions);

                }, reject);
        });
    }

    /**
     * Get opinions by label
     *
     * @param handle
     * @returns {Promise<Opinion[]>}
     */
    getOpinionsByLabel(handle): Promise<Opinion[]>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/mail-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/mail-mails?labels=' + labelId)
                        .subscribe((opinions: any) => {

                            this.opinions = opinions.map(opinion => {
                                return new Opinion(opinion);
                            });

                            this.opinions = FuseUtils.filterArrayByString(this.opinions, this.searchText);

                            this.onOpinionsChanged.next(this.opinions);

                            resolve(this.opinions);

                        }, reject);
                });
        });
    }

    /**
     * Toggle selected opinion by id
     *
     * @param id
     */
    toggleSelectedOpinion(id): void
    {
        // First, check if we already have that opinion as selected...
        if ( this.selectedOpinions.length > 0 )
        {
            for ( const opinion of this.selectedOpinions )
            {
                // ...delete the selected opinion
                if ( opinion.id === id )
                {
                    const index = this.selectedOpinions.indexOf(opinion);

                    if ( index !== -1 )
                    {
                        this.selectedOpinions.splice(index, 1);

                        // Trigger the next event
                        this.onSelectedOpinionsChanged.next(this.selectedOpinions);

                        // Return
                        return;
                    }
                }
            }
        }

        // If we don't have it, push as selected
        this.selectedOpinions.push(
            this.opinions.find(opinion => {
                return opinion.id === id;
            })
        );

        // Trigger the next event
        this.onSelectedOpinionsChanged.next(this.selectedOpinions);
    }

    /**
     * Toggle select all
     */
    toggleSelectAll(): void
    {
        if ( this.selectedOpinions.length > 0 )
        {
            this.deselectOpinions();
        }
        else
        {
            this.selectOpinions();
        }

    }

    /**
     * Select opinions
     *
     * @param filterParameter
     * @param filterValue
     */
    selectOpinions(filterParameter?, filterValue?): void
    {
        this.selectedOpinions = [];

        // If there is no filter, select all opinions
        if ( filterParameter === undefined || filterValue === undefined )
        {
            this.selectedOpinions = this.opinions;
        }
        else
        {
            this.selectedOpinions.push(...
                this.opinions.filter(opinion => {
                    return opinion[filterParameter] === filterValue;
                })
            );
        }

        // Trigger the next event
        this.onSelectedOpinionsChanged.next(this.selectedOpinions);
    }

    /**
     * Deselect opinions
     */
    deselectOpinions(): void
    {
        this.selectedOpinions = [];

        // Trigger the next event
        this.onSelectedOpinionsChanged.next(this.selectedOpinions);
    }

    /**
     * Set current opinion by id
     *
     * @param id
     */
    setCurrentOpinion(id): void
    {
        this.currentOpinion = this.opinions.find(opinion => {
            return opinion.id === id;
        });

        this.onCurrentOpinionChanged.next(this.currentOpinion);
    }

    /**
     * Toggle label on selected opinions
     *
     * @param labelId
     */
    toggleLabelOnSelectedOpinions(labelId): void
    {
        this.selectedOpinions.map(opinion => {

            const index = opinion.labels.indexOf(labelId);

            if ( index !== -1 )
            {
              opinion.labels.splice(index, 1);
            }
            else
            {
              opinion.labels.push(labelId);
            }

            this.updateOpinion(opinion);
        });
    }

    /**
     * Set folder on selected opinions
     *
     * @param folderId
     */
    setFolderOnSelectedOpinions(folderId): void
    {
        this.selectedOpinions.map(opinion => {
          opinion.folder = folderId;

            this.updateOpinion(opinion);
        });

        this.deselectOpinions();
    }

    /**
     * Update the opinion
     *
     * @param opinion
     * @returns {Promise<any>}
     */
    updateOpinion(opinion): Promise<any>
    {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/mail-mails/' + opinion.id, {...opinion})
                .subscribe(response => {

                    this.getOpinions().then(opinions => {

                        if ( opinions && this.currentOpinion )
                        {
                            this.setCurrentOpinion(this.currentOpinion.id);
                        }

                        resolve(opinions);

                    }, reject);
                });
        });
    }

    /*deleteAllOpinion():Promise<any>*/
}
