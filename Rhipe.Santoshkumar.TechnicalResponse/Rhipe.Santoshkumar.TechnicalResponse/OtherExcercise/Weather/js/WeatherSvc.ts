module DW.Webparts.Services {
    interface IMetadata {
        id: string;
        uri: string;
        etag: string;
        type: string;
    }
    interface IResult {
        __metadata: IMetadata;
        Id: number;
        Title: string;
        Weather_x0020_Zone: string;
        Timezone_x0020_One: string;
        Timezone_x0020_Two: string;
        Timezone_x0020_Three: string;
        Timezone_x0020_Four?: any;
        ID: number;
    }
    export interface IWeatherTimeZoneUserSettingsData {
        results: IResult[];
    }

    export class WeatherTimeZoneSvc {
        userId: string;
        userName: string;
        private storageKey: string = "wtzData|";
        private storage: Webparts.Common.GeneralFunctions.genStorageClass;

        static $inject = ['$http', '$q', '$cookies'];
        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private $cookies: ng.cookies.ICookiesService) {
            this.userId = String(_spPageContextInfo.userId);
        }

        public GetWeather(code: string): ng.IPromise<any> {
            var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();
            var uri = rooturl + "/_api/web/lists/GetByTitle('Weather Codes')/items?$filter=(WeatherCode eq '" + code + "')&$select=FeedData";
            
            var oData = new DW.Webparts.Common.Services.SPDataService(this.$http, this.$q, this.$cookies);
            return oData.GetOdataJson(uri);
        }

        public GetUserSettings(breakCache: boolean = false): ng.IPromise<IWeatherTimeZoneUserSettingsData> {
            var userService = new DW.Webparts.Common.Services.UserService(this.$http, this.$q, this.$cookies);
            var loginName = this.userName = _spPageContextInfo.systemUserKey;  
            var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();
            var uri = rooturl + "/_api/web/lists/GetByTitle('UserSettings')/items?$select=ID,Title,Weather_x0020_Zone,Timezone_x0020_One,Timezone_x0020_Two,Timezone_x0020_Three,Timezone_x0020_Four&$filter=(Title eq '" + encodeURIComponent(loginName) + "')";
            var oData = new DW.Webparts.Common.Services.SPDataService(this.$http, this.$q, this.$cookies);
            return oData.GetOdataJson(uri, breakCache);
        }

        public AddNewUserSetting(weatherInfo: string, timezone1Info: string, timezone2Info: string, timezone3Info: string, timezone4Info: string): ng.IPromise<any> {
            var self = this;
            var defered = self.$q.defer();
            this.getFormDigest().then(function (response) {
                var loginName = self.userName;
                if (loginName !== undefined && loginName.length > 0) {
                    var config = {
                        headers: {
                            "X-RequestDigest": response,
                            "X-HTTP-Method": "",
                            "accept": "application/json;odata=verbose",
                            "content-type": "application/json;odata=verbose"
                        }
                    };
                    var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();
                    var url = rooturl + "/_api/web/lists/getbytitle('UserSettings')/items";

                    self.$http.post(url, {
                        __metadata: {
                            type: "SP.Data.UserSettingsListItem"
                        },
                        Title: loginName,
                        Weather_x0020_Zone: weatherInfo,
                        Timezone_x0020_One: timezone1Info,
                        Timezone_x0020_Two: timezone2Info,
                        Timezone_x0020_Three: timezone3Info,
                        Timezone_x0020_Four: timezone4Info

                    }, config).success(function (data) { //success
                        //Refresh the cache and resolve
                        self.GetUserSettings(true).then(() => { defered.resolve(true); });
                    }).error(function (data) {
                        defered.reject("error adding user settings");
                    });
                }
            });
            return defered.promise;
        }

        public UpdateUserSetting(userItemID: string, weatherInfo: string, timezone1Info: string, timezone2Info: string, timezone3Info: string, timezone4Info: string): ng.IPromise<any> {
            var self = this;
            var defered = self.$q.defer();
            this.getFormDigest().then(function (response: any) {
                var config = {
                    headers: {
                        "X-RequestDigest": response, 
                        "IF-MATCH": "*",
                        "X-HTTP-Method": "MERGE",
                        "accept": "application/json;odata=verbose",
                        "content-type": "application/json;odata=verbose"
                    }
                };
                var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();
                var url = rooturl + "/_api/web/lists/getbytitle('UserSettings')/items(" + userItemID + ")";
                self.$http.post(url, {
                    __metadata: {
                        type: "SP.Data.UserSettingsListItem"
                    },
                    Weather_x0020_Zone: weatherInfo,
                    Timezone_x0020_One: timezone1Info,
                    Timezone_x0020_Two: timezone2Info,
                    Timezone_x0020_Three: timezone3Info,
                    Timezone_x0020_Four: timezone4Info

                }, config).success(function (data) { // sucess
                    //Refresh the cache and resolve
                    self.GetUserSettings(true).then(() => { defered.resolve(true); });
                }).error(function (data) {
                    defered.reject("error updating user settings");
                });
            });
            return defered.promise;
        }


        public getFormDigest(): ng.IPromise<any> {
            var dfd = this.$q.defer();
            var config = {
                headers: {
                    'Accept': 'application/json;odata=verbose'
                }
            };
            var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();

            this.$http.post(rooturl + "/_api/contextinfo", {
                data: ''
            }, config).success(function (data: any) {
                dfd.resolve(data.d.GetContextWebInformation.FormDigestValue);
            }).error(function () {
                dfd.reject("error finding form digest");
            });
            return dfd.promise;
        } 
    }
}