module Fibonacci {
    export const GenerateFibonacciSeries = (seriesIteration: number, elementToShow: string) => {
        try {
            const generatedSeries: number[] = [0, 1];
            // - 2 is added as the array is prepopulated with 2 values
            for (let i = 0; i < seriesIteration - 2; i++) {
                generatedSeries.push(generatedSeries[i] + generatedSeries[i + 1]);
            }
            renderData(elementToShow, generatedSeries.join(','));
        } catch (e) {
            Fibonacci.SetUpErrorMessage('Error Calculating and displaying Fibonacci Series. ' + e.toString(), 'fSeries');
        }
    }

    const renderData = (elementId: string, textToRender: string) => {
        // this is to render the series
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML ='<div class="fiboWidth">' + textToRender + '</div>';
        }
    }

    export const SetUpErrorMessage = (message: string, elementToShow: string) => {        
        renderData(elementToShow, message);
    }
}

function onFibonaciSubmit(e) {
    const seriesLimitControl = document.getElementById('seriesLimit') as HTMLInputElement;
    if (seriesLimitControl) {
        Fibonacci.GenerateFibonacciSeries(parseInt(seriesLimitControl.value), 'fSeries');
    } else {
        Fibonacci.SetUpErrorMessage('Cannot find teh input control to read the series limit from', 'fSeries');
    }
}
