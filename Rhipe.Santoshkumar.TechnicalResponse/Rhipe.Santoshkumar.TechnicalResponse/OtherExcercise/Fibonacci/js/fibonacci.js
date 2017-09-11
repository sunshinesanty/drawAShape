var Fibonacci;
(function (Fibonacci) {
    Fibonacci.GenerateFibonacciSeries = function (seriesIteration, elementToShow) {
        try {
            var generatedSeries = [0, 1];
            for (var i = 0; i < seriesIteration - 2; i++) {
                generatedSeries.push(generatedSeries[i] + generatedSeries[i + 1]);
            }
            renderData(elementToShow, generatedSeries.join(','));
        }
        catch (e) {
            Fibonacci.SetUpErrorMessage('Error Calculating and displaying Fibonacci Series. ' + e.toString(), 'fSeries');
        }
    };
    var renderData = function (elementId, textToRender) {
        var element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<div class="fiboWidth">' + textToRender + '</div>';
        }
    };
    Fibonacci.SetUpErrorMessage = function (message, elementToShow) {
        renderData(elementToShow, message);
    };
})(Fibonacci || (Fibonacci = {}));
function onFibonaciSubmit(e) {
    var seriesLimitControl = document.getElementById('seriesLimit');
    if (seriesLimitControl) {
        Fibonacci.GenerateFibonacciSeries(parseInt(seriesLimitControl.value), 'fSeries');
    }
    else {
        Fibonacci.SetUpErrorMessage('Cannot find teh input control to read the series limit from', 'fSeries');
    }
}
