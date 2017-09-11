/// <reference path="genfunctions.ts" />

module Weather.Data.Interfaces {
    export interface IODataService {
        storageKey: string;
        $http: ng.IHttpService;
        $q: ng.IQService;
        $cookies: ng.cookies.ICookiesService;
        GetOdataJson(apiUrl: string): ng.IPromise<any>;
    }
}