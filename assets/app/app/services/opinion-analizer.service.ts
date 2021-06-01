import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '../../@fuse/utils';

import { Opinion } from '../models/opinion.model';
import { CampaignService } from '../services/campaign.service';
import { environment } from '../../environments/environment';
import { map, takeUntil } from 'rxjs/operators';
import { OpinionTest } from '../models/opinionTest.model';


@Injectable({
    providedIn: 'root',
})
export class OpinionService implements Resolve<any>
{
    deleteSelectedOpinions() {
        throw new Error('Method not implemented.');
    }
    opinions: Opinion[];
    user: string;
    selectedOpinions: Opinion[];
    currentOpinion: Opinion;
    opinionesXidioma: OpinionTest[];
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
    onUserDataChanged: BehaviorSubject<any>;
    onLabelsChanged: BehaviorSubject<any>;
    onSearchTextChanged: BehaviorSubject<any>;

    filterBy: string;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private campaign: CampaignService
    ) {
        // Set the defaults
        this.selectedOpinions = [];
        this.onOpinionsChanged = new BehaviorSubject([]);
        this.onSelectedOpinionsChanged = new BehaviorSubject([]);
        this.onCurrentOpinionChanged = new BehaviorSubject([]);
        this.onFoldersChanged = new BehaviorSubject([]);
        this.onFiltersChanged = new BehaviorSubject([]);
        this.onLabelsChanged = new BehaviorSubject([]);
        this.onUserDataChanged = new BehaviorSubject([]);
        this.onSearchTextChanged = new BehaviorSubject('');
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        console.log("Find Information");

        return new Promise((resolve, reject) => {
            Promise.all([
                this.getFolders(),
                this.getFilters(),
                this.getLabels(),
                this.getOpinions()
            ]).then(
                () => {

                    console.log("Data in resolve");
                    if (this.routeParams.opinionId) {
                        this.setCurrentOpinion(this.routeParams.opinionId);
                    }
                    else {
                        this.setCurrentOpinion(null);
                    }

                    this.onSearchTextChanged.subscribe(searchText => {
                        if (searchText !== '') {
                            this.searchText = searchText;
                            this.getOpinions();
                        }
                        else {
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

    getOpinXIdioma(): Observable<any> {

        let page = 0

        let httpParams = new HttpParams()
            .append("id", this.campaign.getMyCampsID())
            .append("page", page.toString())
            .append("idioma", 'ingles')
        return this._httpClient.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/opinion/getOpinionXIdiomaCamp', { params: httpParams })

    };


    getOpinion(): Observable<any> {
        let page = 0;
        let campaignid:any = this.campaign.getMyCampsIDEx();
        console.log("Data campaing info ", campaignid);
        console.log("Id Data campaing info ", campaignid.id);
        if (typeof(campaignid) === 'undefined' || campaignid === null || campaignid === '')
          return null
        else {
            let httpParams = new HttpParams()
                .append("id", campaignid.id)
                .append("page", page.toString())
            return this._httpClient.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/opinion/getOpinion', { params: httpParams })
        }
      };


    getAspectOpin(oPinID: any): Observable<any> {

        console.log('ID de Opinion ' + oPinID)

        let httpParams = new HttpParams()
            .append("id", oPinID)
        return this._httpClient.get(environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/aspectoopinion/getAspecto', { params: httpParams })
    };

    /**
     * Get all folders
     *
     * @returns {Promise<any>}
     */
    getFolders(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/opinion-folders')
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
    getFilters(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/opinion-filters')
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
    getLabels(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/opinion-labels')
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
    getOpinions(): Promise<Opinion[]> {

        if (this.routeParams.labelHandle) {
            return this.getOpinionsByLabel(this.routeParams.labelHandle);
        }

        if (this.routeParams.filterHandle) {
            return this.getOpinionsByFilter(this.routeParams.filterHandle);
        }

        return this.getOpinionsByFolder(this.routeParams.folderHandle);

    }

    getOpinionById(id) {
        if (id == this.campaign.getCampaignId) {
            {

                if (this.routeParams.labelHandle) {
                    return this.getOpinionsByLabel(this.routeParams.labelHandle);
                }

                if (this.routeParams.filterHandle) {
                    return this.getOpinionsByFilter(this.routeParams.filterHandle);
                }

                return this.getOpinionsByFolder(this.routeParams.folderHandle);

            }
        }

    }

    /**
     * Get opinions by folder
     *
     * @param handle
     * @returns {Promise<Opinion[]>}
     */
    getOpinionsByFolder(handle): Promise<Opinion[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/opinion-folders?handle=' + handle)
                .subscribe((folders: any) => {

                    const folderId = folders[0].id;


                    this._httpClient.get('api/opinion-opinions?folder=' + folderId)

                    this._httpClient.get('api/opinions-opinions?folder=' + folderId)

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
    getOpinionsByFilter(handle): Promise<Opinion[]> {
        return new Promise((resolve, reject) => {

            this._httpClient.get('api/opinions-opinions?' + handle + '=true')
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
    getOpinionsByLabel(handle): Promise<Opinion[]> {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/opinion-labels?handle=' + handle)
                .subscribe((labels: any) => {

                    const labelId = labels[0].id;

                    this._httpClient.get('api/opinions-opinions?labels=' + labelId)
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
    toggleSelectedOpinion(id): void {
        // First, check if we already have that opinion as selected...
        if (this.selectedOpinions.length > 0) {
            for (const opinion of this.selectedOpinions) {
                // ...delete the selected opinion
                if (opinion.id === id) {
                    const index = this.selectedOpinions.indexOf(opinion);

                    if (index !== -1) {
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
    toggleSelectAll(): void {
        if (this.selectedOpinions.length > 0) {
            this.deselectOpinions();
        }
        else {
            this.selectOpinions();
        }

    }

    /**
     * Select opinions
     *
     * @param filterParameter
     * @param filterValue
     */
    selectOpinions(filterParameter?, filterValue?): void {
        this.selectedOpinions = [];

        // If there is no filter, select all opinions
        if (filterParameter === undefined || filterValue === undefined) {
            this.selectedOpinions = this.opinions;
        }
        else {
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
    deselectOpinions(): void {
        this.selectedOpinions = [];

        // Trigger the next event
        this.onSelectedOpinionsChanged.next(this.selectedOpinions);
    }

    /**
     * Set current opinion by id
     *
     * @param id
     */
    setCurrentOpinion(id): void {
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
    toggleLabelOnSelectedOpinions(labelId): void {
        this.selectedOpinions.map(opinion => {

            const index = opinion.labels.indexOf(labelId);

            if (index !== -1) {
                opinion.labels.splice(index, 1);
            }
            else {
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
    setFolderOnSelectedOpinions(folderId): void {
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
    updateOpinion(opinion): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.post('api/opinions-opinions/' + opinion.id, { ...opinion })
                .subscribe(response => {

                    this.getOpinions().then(opinions => {

                        if (opinions && this.currentOpinion) {
                            this.setCurrentOpinion(this.currentOpinion.id);
                        }

                        resolve(opinions);

                    }, reject);
                });
        });
    }

    /*deleteAllOpinion():Promise<any>*/

    /*
    * Getting Opinions from BAckend
    *
    */
   getOpinionsFromBAck(page,limit,criteria,filter){
       return new Promise((resolve,reject)=>this._httpClient.get(
           environment.sails_services_urlpath + ":" + environment.sails_services_urlport + '/opinion/getOpinion',
           {params:{'page':page,
                    'limit': limit,
                    'criteria':criteria,
                    'filter': filter}})
            .subscribe((opinions:any)=>{
                this.opinions = opinions.map(opinion => {
                    return new OpinionTest(opinion);
                });

                this.opinions = FuseUtils.filterArrayByString(this.opinions, this.searchText);

                this.onOpinionsChanged.next(this.opinions);

                resolve(this.opinions);

            },reject));
   }
}
