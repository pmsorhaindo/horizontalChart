define([
  'jquery',
  'underscore',

], function(
  $,
  _
) {
  function horizontalBarChart(data, title, chartID, elem) {

    elem.append($('<div></div>').addClass('normalfont mediumtext').text(title));
    var animationSeconds = 1; // Default animation length 1.
    var color = '#55ACEE';

    var grabPercentage = function(x) {
      return x.percentage;
    };

    var grabName = function(x) {
      return x.name;
    }

    var metricValues = data.map(grabPercentage);
    var barNames = data.map(grabName);
    var numberOfBars = barNames.length;

    /*for (var i = 0; i < barNames.length; i++) {
      var $profession = $('<div></div>').addClass('barContainer smalltext')
      var $child = $('<div></div>').addClass('child');
      var $percentage = $('<div></div>').text(metricValues[i] + '%')
        .addClass('percentage');
      var $bar = $('<div></div>')
        .css("float", "left")
        .css("width", 0)
        .css("background-color", color)
        .attr("id", chartID + 'Bar' + i)
        .text(barNames[i]);
      elem.append($profession.append($child.append($bar)).append($percentage));
    }*/

    for (var i = 0; i < barNames.length; i++) {
      var $lineHolder = $('<div></div>').addClass('lineHolder');
      var $profession = $('<div></div>').addClass('barContainer smalltext');
      var $child = $('<div></div>').addClass('child');
      var $percentage = $('<div></div>').text(metricValues[i] + '%')
        .addClass('percentage');
      var $bar = $('<div></div>')
        //.css("float", "right")
        .css("width", 0)
        .css("background-color", color)
        .attr("id", chartID + 'Bar' + i)
        .text(String.fromCharCode(160));

      var $barLabel = $('<div></div>').addClass('barLabel smalltext textellipsis').text(barNames[i]);
      $lineHolder.append($barLabel);
      elem.append($lineHolder.append($profession.append($percentage).append($child.append($bar))));
    }

    //<div id="profession">
    //  <div id="child">
    //    <div id="bar1" style="float:left; width:0%;background-color:#55ACEE">Executive</div>
    //    </div>
    //  <div id="percentage">65%</div>
    //</div>

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

      for (var i = 0; i < numberOfBars; i++) {
        $('#' + chartID + 'Bar' + i).css("width", nextValuesArr[i] + "%");
      }



      displayedValuesArr = nextValuesArr;
    }

    function allBarsComplete(nextValuesArr) {
      var complete = true;
      for (var i = 0; i < metricValues.length; i++) {
        if (nextValuesArr[i] < metricValues[i]) {
          complete = false;
        } else {
          nextValuesArr[i] = metricValues[i];
        }
      }
      return complete;
    }

    function normalizePercentages(percentagesArr){
      var maxVal = Math.max.apply(null, arr);
      var newPerc = 100/maxVal;


    }

  }

  return horizontalBarChart;
});