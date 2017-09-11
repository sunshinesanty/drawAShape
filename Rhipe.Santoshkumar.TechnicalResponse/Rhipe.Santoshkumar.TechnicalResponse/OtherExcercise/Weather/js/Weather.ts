/// <reference path="DropdownListDrtv.ts" />
/// <reference path='WeatherDrtv.ts' />
/// <reference path='WeatherCtrl.ts' />
module Weather {
    angular.module('weatherApp', ['ngSanitize', 'ui.bootstrap', 'ngStorage', 'ngCookies'])
        .controller('WeatherCtrl', ['$scope', 'oDataSvc', '$cookies', 'WeatherSvc', '$q', '$timeout', DW.Webparts.WeatherTimeZone.WeatherTimeZoneCtrl])
        .service('WeatherTimeZoneSvc', DW.Webparts.Services.WeatherTimeZoneSvc)
        .service('oDataSvc', ['$http', '$q', '$cookies', DW.Webparts.Common.Services.SPDataService])
        .directive('cityWeather', ['WeatherTimeZoneSvc', '$timeout', DW.Webparts.Directives.WeatherDrtv]) 
        .directive('dwDropdown', [Weather.Directives.dwDropdown]) 
        .filter('numberFixedLen', [DW.Webparts.Common.GeneralFunctions.fixedLenNumber]);
} 