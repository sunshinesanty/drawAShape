module Weather.Interfaces {
    export interface IWeatherDrtv extends ng.IScope {
        city: string;
        cityWeather: string;
        weather: any;
        selected: any;
        feed: any;
        feedData: any;
        maxTemperature: string;
        maxTemp: string;
        minTemperature: string;
        minTemp: string;
        maxf1Temperature: string;
        maxf1Temp: string;
        minf1Temperature: string;
        minf1Temp: string;
        maxf2Temperature: string;
        maxf2Temp: string;
        minf2Temperature: string;
        minf2Temp: string;
        weekDay: string;
        f1WeekDay: string;
        f2WeekDay: string;
    }
} 