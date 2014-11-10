define([
  'jquery',
  'underscore',

], function(
  $,
  _
) {
  function horizontalBarChart(data, title, chartID, elem) {

    var animationSeconds = 1,// Default animation length 1.
      color = '#55ACEE',
      metricValues = data.map(grabPercentage),
      normalizedPercentageArr = normalizePercentages(metricValues),
      barNames = data.map(grabName),
      numberOfBars = barNames.length,
      displayedValuesArr = Array.apply(null, new Array(normalizedPercentageArr.length))
        .map(Number.prototype.valueOf, 0),
      incrementsPerFrameArr = normalizedPercentageArr.map(incFrameFunc),
      start = Date.now();

    setHeading(elem);

    for (var i = 0; i < barNames.length; i++) {
      var $lineHolder, $profession, $child, percentage, bar, barLabel;
      $lineHolder = $('<div></div>').addClass('lineHolder');
      $profession = $('<div></div>').addClass('barContainer smalltext cellpadding');
      $child = $('<div></div>').addClass('child');
      $percentage = $('<div></div>').text(metricValues[i] + '%')
        .addClass('percentage');
      $bar = $('<div></div>')
        .css("width", 0)
        .css("background-color", color)
        .attr("id", chartID + 'Bar' + i)
        .text(String.fromCharCode(160));

      $barLabel = $('<div></div>').addClass('barLabel smalltext textellipsis cellpadding').text(barNames[i]);
      
      $lineHolder.append($barLabel);
      elem.addClass('fivecol');
      elem.append($lineHolder.append($profession.append($percentage).append($child.append($bar))));
    }

    requestAnimationFrame(frame);


    function incFrameFunc(x) {
      return Math.ceil(x / (animationSeconds * 60 /*approx. fps*/ ));
    }

    function grabPercentage(x) {
      return x.percentage;
    }

    function grabName(x) {
      return x.name;
    }

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
      // Print Charts title
      elem.append($('<div></div>').addClass('largetext smallpadding-vertical')
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
      var maxVal = Math.max.apply(null, percentagesArr),
        newPerc = 100 / maxVal,
        normalizedPercentageArray = percentagesArr.map(function(val) {
        return newPerc * val;
      });
      return normalizedPercentageArray;
    }

  }

  return horizontalBarChart;
});