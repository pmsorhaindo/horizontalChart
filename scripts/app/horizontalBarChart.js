define([
  'jquery',
  'underscore',

], function(
  $,
  _
) {
  function horizontalBarChart(data, title, chartID, elem) {

    var animationSeconds = 1; // Default animation length 1.
    var color = '#55ACEE';

    var grabPercentage = function(x) {
      return x.percentage;
    };

    var grabName = function(x) {
      return x.name;
    }

    var metricValues = data.map(grabPercentage);
    var normalizedPercentageArr = normalizePercentages(metricValues);
    var barNames = data.map(grabName);
    var numberOfBars = barNames.length;

    setHeading(elem);

    for (var i = 0; i < barNames.length; i++) {
      var $lineHolder = $('<div></div>').addClass('lineHolder');
      var $profession = $('<div></div>').addClass('barContainer smalltext cellpadding');
      var $child = $('<div></div>').addClass('child');
      var $percentage = $('<div></div>').text(metricValues[i] + '%')
        .addClass('percentage');
      var $bar = $('<div></div>')
        //.css("float", "right")
        .css("width", 0)
        .css("background-color", color)
        .attr("id", chartID + 'Bar' + i)
        .text(String.fromCharCode(160));

      var $barLabel = $('<div></div>').addClass('barLabel smalltext textellipsis cellpadding').text(barNames[i]);
      $lineHolder.append($barLabel);
      elem.addClass('fivecol');
      elem.append($lineHolder.append($profession.append($percentage).append($child.append($bar))));
    }

    var incFrameFunc = function(x) {
      return Math.ceil(x / (animationSeconds * 60 /*approx. fps*/ ));
    };
    var displayedValuesArr = Array.apply(null, new Array(normalizedPercentageArr.length))
      .map(Number.prototype.valueOf, 0);
    var incrementsPerFrameArr = normalizedPercentageArr.map(incFrameFunc);


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
        nextValuesArr = normalizedPercentageArr;
      } else {
        requestAnimationFrame(frame);
      }

      for (var i = 0; i < numberOfBars; i++) {
        $('#' + chartID + 'Bar' + i).css("width", nextValuesArr[i] + "%");
      }

      displayedValuesArr = nextValuesArr;
    }

    function setHeading(elem) {
      // Enforce a vertical separator
      elem.append($('<hr />').css('color', '#d3d3d5 c00').css('background-color', '#d3d3d5 '));

      // Print Charts title?
      elem.append($('<div></div>').addClass('largetext smallpadding-vertical')
        //.css('padding-bottom', '12px')
        //.css('padding-top', '6px')
        .text(title.toUpperCase()));
    }

    function allBarsComplete(nextValuesArr) {
      var complete = true;
      for (var i = 0; i < normalizedPercentageArr.length; i++) {
        if (nextValuesArr[i] < normalizedPercentageArr[i]) {
          complete = false;
        } else {
          nextValuesArr[i] = normalizedPercentageArr[i];
        }
      }
      return complete;
    }

    function normalizePercentages(percentagesArr) {
      var maxVal = Math.max.apply(null, percentagesArr);
      var newPerc = 100 / maxVal;
      var normalizedPercentageArray = percentagesArr.map(function(val) {
        return newPerc * val
      });
      return normalizedPercentageArray
    }

  }

  return horizontalBarChart;
});