
define([
    'prog/horizontalBarChart',

], function(
    chart
){
	// mocking data.
	var title = "Top Professions";

	var data = [{
		name: "Executive",
		percentage: 65
	}, {
		name: "Scientist"+String.fromCharCode(160)+"&"+String.fromCharCode(160)+"Researcher",
		percentage: 21
	}, {
		name: "Artist",
		percentage: 14
	}];

	// mocking data.
	var anotherTitle = "Top things to do that are fun!";

	var moreData = [{
		name: "Guitar",
		percentage: 53
	}, {
		name: "Baking",
		percentage: 32
	}, {
		name: "Films",
		percentage: 15
	}];

	//grab div from the DOM

	chart(data, title, 'dynChart', $('#chartme'));
	chart(moreData, anotherTitle, 'anotherDynChart', $('#chartyou'));
});