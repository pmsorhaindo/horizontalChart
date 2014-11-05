define([
    'jquery',
    'underscore',

], function(
    $,
    _
){
    function horizontalBarChart(data,element){
      
      console.log("run!");
      var animationSeconds = 1; // Default animation length 1.

      var grabPercentage = function(x) {
        return x.percentage;
      };

      var grabName = function(x){
        return x.name;
      }

      var metricValues = data.map(grabPercentage); //.concat(intrObjArr.map(grabPercentage));
      var barNames = data.map(grabName);

      var incFrameFunc = function(x) {
        return Math.ceil(x / (animationSeconds * 60 /*approx. fps*/ ));
      };
      var displayedValuesArr = Array.apply(null, new Array(metricValues.length)).map(Number.prototype.valueOf, 0);
      var incrementsPerFrameArr = metricValues.map(incFrameFunc);


      var start = Date.now();

      requestAnimationFrame(frame);

      function frame() {
        // calculate next values by adding each corresponding value arrays incrementsPerFrameArr to displayedValuesArr
        var nextValuesArr = _.zip(displayedValuesArr, incrementsPerFrameArr).map(function(x) {
          return x.reduce(function(previousValue, currentValue, index, array) {
            return Number(previousValue) + Number(currentValue);
          });
        });
        if (allBarsComplete(nextValuesArr)) {
          nextValuesArr = metricValues;
        } else {
          requestAnimationFrame(frame);
        }

        $("#bar1").css("width", nextValuesArr[0]+ "%");
        $("#bar2").css("width", nextValuesArr[1] + "%");
        $("#bar3").css("width", nextValuesArr[2] + "%");
        displayedValuesArr = nextValuesArr;
      }

      function allBarsComplete(nextValuesArr) {
        var complete = true;
        for (var i = 0; i < metricValues.length; i++) {
          if (nextValuesArr[i] < metricValues[i]) {
            complete = false;
          }
          else {
            nextValuesArr[i] = metricValues[i];
          }
        }
        return complete;
      }

    }

    return horizontalBarChart;
});
