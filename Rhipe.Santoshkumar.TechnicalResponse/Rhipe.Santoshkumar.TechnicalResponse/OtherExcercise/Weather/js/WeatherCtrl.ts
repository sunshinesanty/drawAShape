/// <reference path='WeatherSvc.ts'/>

module Weather {
    'use strict';
    export interface IWeatherTimeZoneScope extends ng.IScope {
        weatherItems: any[];
        wItem: ICountryCity;
        callback(i: any, s: string): any;
        DefaultWeather: string;
    }

    interface ICountryCity {
        code: string;
        name: string;
        order: string;
        feed: any;
        conCode: string;
        maxTmp: string;
        minTmp: string;
        f1Code: string;
        maxf1Tmp: string;
        minf1Tmp: string;
        f2Code: string;
        maxf2Tmp: string;
        minf2Tmp: string;
    }

    export class WeatherTimeZoneCtrl {
        private static $inject = ['$scope', 'oDataSvc', '$cookies', 'WeatherSvc', '$q', '$timeout'];
        ListTimestamp = "";

        constructor(private $scope: IWeatherTimeZoneScope,
            private $cookies: ng.cookies.ICookiesService,
            private WeatherSvc: Weather.Interfaces.IWeatherSvc,
            private $q: ng.IQService,
            private $timeout: ng.ITimeoutService) {
       
            var vm = this;
            vm.$scope.weatherItems = [{}];
            vm.$scope.wItem = null;
            vm.$scope.DefaultWeather = "DefaultWeather";
            
            var wDrtv = Weather.Directives.WeatherDrtv(WeatherSvc, $timeout);

            //Retrieve the user preferences for weather and timezone
            vm.GetPreferences().then(preferences => {
                var defered = vm.$q.defer();

                if (preferences.results.length === 0) {
                    var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();
                    var spUrl = rooturl + "/_api/lists/getbytitle('EC Settings')/items?$select=Title,Value&$filter="
                        + "Title eq '" + vm.$scope.DefaultTimeZone1
                        + "' or Title eq '" + vm.$scope.DefaultTimeZone2
                        + "' or Title eq '" + vm.$scope.DefaultTimeZone3
                        + "' or Title eq '" + vm.$scope.DefaultWeather + "'";

                    vm.oDataSvc.GetOdataJson(spUrl).then(defaultsData => {
                        preferences.results.push({
                            "__metadata": null,
                            "Id": -1,
                            "Title": null, //There is no saved record
                            "Weather_x0020_Zone": $.grep(defaultsData.results, (row: any) => { return row.Title == vm.$scope.DefaultWeather })[0].Value
                            "ID": -1
                        });
                        defered.resolve(true);
                    });
                }
                else {
                    defered.resolve(true);
                }

                defered.promise.then(() => {
                    this.LoadDropDwonList(vm.WeatherCodes)
                        .then(function (data) {
                            vm.$scope.weatherItems = data;
                            if (data !== undefined) {
                                vm.$scope.wItem = vm.MatchUserSettingsField(data, preferences.results[0].Weather_x0020_Zone, vm.$scope.DefaultWeather, preferences.results[0].Title);
                            }
                        });
                    this.LoadDropDwonList(vm.TimeZoneCodes)
                        .then(function (data) {
                            vm.$scope.timeZone1 = data;
                            vm.$scope.timeZone2 = data;
                            vm.$scope.timeZone3 = data;
                            //vm.$scope.timeZone4 = data;
                            if (data !== undefined) {

                                vm.$scope.tzItem1 = vm.MatchUserSettingsField(data,
                                    preferences.results[0].Timezone_x0020_One,
                                    vm.$scope.DefaultTimeZone1,
                                    preferences.results[0].Title);
                                vm.$scope.tzItem2 = vm.MatchUserSettingsField(data,
                                    preferences.results[0].Timezone_x0020_Two,
                                    vm.$scope.DefaultTimeZone2,
                                    preferences.results[0].Title);
                                vm.$scope.tzItem3 = vm.MatchUserSettingsField(data,
                                    preferences.results[0].Timezone_x0020_Three,
                                    vm.$scope.DefaultTimeZone3,
                                    preferences.results[0].Title);
                            }
                        });
                });
                
            });

            // directive callback function    
            this.$scope.callback = function (item: ICountryCity, src: any) {
                if (src !== undefined) {
                    vm.SavePreferences(item, src);
                }
            };


        }

        public LoadDropDwonList(pageSrc: string): ng.IPromise<any> {
            var vm = this;
            var apiUrl = "";
            var rooturl = DW.Webparts.Common.URLResolver.GetRootURL();
            if (pageSrc == vm.WeatherCodes)//WeatherCodes
                apiUrl = rooturl + "/_api/web/lists/GetByTitle('" + pageSrc + "')/items?$select=Title,WeatherCode,WeatherGrouping,WeatherOrder,FeedData,ConditionCode,MaxTemperature,MinTemperature,Forecast1ConditionCode,Forecast1MaxTemperature,Forecast1MinTemperature,Forecast2ConditionCode,Forecast2MaxTemperature,Forecast2MinTemperature&orderby=WeatherOrder,Title";
            else//TimeZoneCodes
                apiUrl = rooturl + "/_api/web/lists/GetByTitle('" + pageSrc + "')/items?$select=Title,TimezoneCode,TimezoneGrouping,TimezoneOrder&orderby=TimezoneOrder,Title";
            //  console.log("load drop down url " + rooturl);
            var groups: [any[]] = [[]];
            var deferred = vm.$q.defer();
            
            this.oDataSvc.GetOdataJson(apiUrl).then(function (data: any) {
                if (data != null) {
                    var matchGroup: any;
                    var uqGroups = vm.uniqueGrouping(data.results, pageSrc);
                    groups[0] = uqGroups;
                    angular.forEach(uqGroups, function (g: any, i: number) {
                        if (uqGroups.length > 0) {
                            matchGroup = $.grep(data.results, function (e: any) {
                                if (pageSrc === vm.WeatherCodes)
                                    return e.WeatherGrouping == g.group;
                                else
                                    return e.TimezoneGrouping == g.group;

                            });
                            if (matchGroup.length > 0) {
                                angular.forEach(matchGroup, function (group: any) {
                                    if (pageSrc == vm.WeatherCodes)
                                        uqGroups[i].cities.push({ code: group.WeatherCode, name: group.Title, order: group.WeatherOrder, conCode: group.ConditionCode, feed: group.FeedData, maxTemp: group.MaxTemperature, minTemp: group.MinTemperature, f1Code: group.Forecast1ConditionCode, maxf1Temp: group.Forecast1MaxTemperature, minf1Temp: group.Forecast1MinTemperature, f2Code: group.Forecast2ConditionCode, maxf2Temp: group.Forecast2MaxTemperature, minf2Temp: group.Forecast2MinTemperature });
                                    else
                                        uqGroups[i].cities.push({ code: group.TimezoneCode, name: group.Title, order: group.TimezoneOrder });

                                });
                                uqGroups[i].cities.splice(0, 1);
                            }
                        }
                    });
                    deferred.resolve(uqGroups);
                }
                else { deferred.reject("no weather and timezone data returned"); }
            });

            return deferred.promise;
        }
        
        //get unique group list
        public uniqueGrouping(data: any, src: string): any[] {
            var n: any[]; n = [];
            var grouping = [];
            var vm = this;
            var groupName = (src === vm.WeatherCodes) ? "WeatherGrouping" : "TimezoneGrouping";
            data = Common.GeneralFunctions.sort(data, groupName);
            for (var i = 0; i < data.length; i++) {
                var grep = $.grep(n, function (e: any) {
                    if (src === vm.WeatherCodes)
                        return e.group == ((data[i].WeatherGrouping === null) ? "" : data[i].WeatherGrouping)
                    else
                        return e.group == ((data[i].TimezoneGrouping === null) ? "" : data[i].TimezoneGrouping)
                });
                if (grep.length == 0) {
                    if (src === vm.WeatherCodes) {
                        if (data[i].WeatherGrouping !== null && String(data[i].WeatherGrouping) !== "")
                            n.push({ "group": String(data[i].WeatherGrouping).trim(), "cities": [{}] });
                    }
                    else {
                        if (data[i].TimezoneGrouping !== null && String(data[i].TimezoneGrouping) !== "")
                            n.push({ "group": String(data[i].TimezoneGrouping).trim(), "cities": [{}] });
                    }
                }
            }
            return n;
        }

        private formatTimeZoneData(code: string, name: string): string {
            return code + "_" + name;
        }

        public SavePreferences(item: ICountryCity, src: string): void {
            var vm = this;
            if (src !== undefined) {
                this.WeatherSvc.GetUserSettings().then(data => {
                    var weatherInfo = src.indexOf('Weather') > 0 ? item.code : vm.$scope.wItem.code;
                    var timezone1 = src.indexOf('TimeZone1') > 0 ? vm.formatTimeZoneData(item.code, item.name) : vm.formatTimeZoneData(vm.$scope.tzItem1.code, vm.$scope.tzItem1.name);
                    var timezone2 = src.indexOf('TimeZone2') > 0 ? vm.formatTimeZoneData(item.code, item.name) : vm.formatTimeZoneData(vm.$scope.tzItem2.code, vm.$scope.tzItem2.name);
                    var timezone3 = src.indexOf('TimeZone3') > 0 ? vm.formatTimeZoneData(item.code, item.name) : vm.formatTimeZoneData(vm.$scope.tzItem3.code, vm.$scope.tzItem3.name);
                    var timezone4 = null; //src.indexOf('TimeZone4') > 0 ? vm.formatTimeZoneData(item.code, item.name) : vm.formatTimeZoneData(vm.$scope.tzItem4.code, vm.$scope.tzItem4.name);

                    if (data.results.length > 0) {
                        this.WeatherSvc.UpdateUserSetting(
                            data.results[0].ID,
                            weatherInfo,
                            timezone1,
                            timezone2,
                            timezone3,
                            timezone4
                        );
                    }
                    else {
                        this.WeatherSvc.AddNewUserSetting(
                            weatherInfo,
                            timezone1,
                            timezone2,
                            timezone3,
                            timezone4);
                    }
                });
            }
        }

        public GetPreferences(): ng.IPromise<DW.Webparts.Services.IWeatherTimeZoneUserSettingsData> {
            return this.WeatherSvc.GetUserSettings();
        }


        MatchUserSettingsField(data: any, settings: any, src: string, key: string): any {
            var result: any = {};
            var res: any; var vm = this;
            angular.forEach(data, function (g: any, i: number) {
                if (src === vm.$scope.DefaultWeather)
                    res = $.grep(g.cities, function (d: any) { return d.code === settings });
                else
                    //If key is null then the user has not set their weather preferences
                    res = $.grep(g.cities, function (d: any) { return (key !== null) ? d.code + "_" + d.name.trim() === settings : d.code === settings });
                if (res.length > 0) {
                    //hasResult = true;
                    return result = { code: res[0].code, name: res[0].name, feed: res[0].feed, conCode: res[0].conCode, maxTemp: res[0].maxTemp, minTemp: res[0].minTemp, f1Code: res[0].f1Code, maxf1Temp: res[0].maxf1Temp, minf1Temp: res[0].minf1Temp, f2Code: res[0].f2Code, maxf2Temp: res[0].maxf2Temp, minf2Temp: res[0].minf2Temp };
                }
            });
            return result;
        }
    }

    $(function () {
        var IE9;
        if ($('body').is('.ie9')) {
            IE9 = true;
        }
        if (IE9) {
            // Change between weather and time function for IE9save
            $('.flip-container').each(function () {
                var flipper = $(this);
                var $time = $("#timeZones");
                var $weather = $(".weather");
                $('.flipper').find('.toggle').click(function () {
                    if (flipper.hasClass("time-front")) {
                        $weather.hide();
                        $time.fadeTo("slow", 1);
                        flipper.removeClass("time-front");
                    }
                    else {
                        $time.hide();
                        $weather.fadeTo("slow", 1);
                        flipper.addClass("time-front");
                    }
                });
            });
        }
        else {
            // Flip between time and weather
            $('.flip-container').each(function () {
                var flipper = $(this);
                flipper.find('.toggle').click(function () { flipper.toggleClass('flipped'); });
            });
        }
    });
}