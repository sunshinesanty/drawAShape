module Weather.Interfaces {
    export interface IWeatherSvc {
        GetWeather(code: string): ng.IPromise<any>;
    }
} 