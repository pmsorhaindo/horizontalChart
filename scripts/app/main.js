
define([
    'prog/horizontalBarChart',

], function(
    chart
){
	// mocking data.
	data = [{
		name: "Executive",
		percentage: 65
	}, {
		name: "Scientist&nbsp;&amp;&Researcher",
		percentage: 21
	}, {
		name: "Artist",
		percentage: 14
	}];

	//grab div from the DOM

	chart(data,1)
});