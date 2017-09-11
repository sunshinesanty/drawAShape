module Weather.Directives {

    export function WeatherDrtv(WeatherSvc: Weather.Interfaces.IWeatherSvc, $timeout: ng.ITimeoutService): ng.IDirective {
        return {
            //require: 'dropdown',
            scope: {
                cityWeather: '@',
                feedData: '@',
                conCode: '@',
                maxTemperature: '@',
                minTemperature: '@',
                f1Code: '@',
                maxf1Temperature: '@',
                minf1Temperature: '@',
                f2Code: '@',
                maxf2Temperature: '@',
                minf2Temperature: '@'
            },
            restrict: 'A',
            templateUrl: '/OtherExcercise/Weather/html/Weather.html',
            link: (scope: Weather.Interfaces.IWeatherDrtv) => {
                scope.$watch('cityWeather', function () {
                    scope.city = scope.$eval(scope.cityWeather);
                    if (scope.city !== "") {
                        try {
                           // scope.weather = JSON.parse(scope.feedData).query.results.channel;
                            scope.maxTemp = scope.maxTemperature;
                            scope.minTemp = scope.minTemperature;
                            scope.maxf1Temp = scope.maxf1Temperature;
                            scope.minf1Temp = scope.minf1Temperature;
                            scope.maxf2Temp = scope.maxf2Temperature;
                            scope.minf2Temp = scope.minf2Temperature;
                            var currDate = new Date();
                            scope.weekDay = currDate.toString().split(' ')[0];
                            currDate.setDate(currDate.getDate() + 1);
                            scope.f1WeekDay = currDate.toString().split(' ')[0];
                            currDate.setDate(currDate.getDate() + 1);
                            scope.f2WeekDay = currDate.toString().split(' ')[0];
                      
                        }
                        catch (e) {
                            console.log("Invalid Weather FeedData");
                            
                        }
                    }
                });
            }
        };
    }
   
}


