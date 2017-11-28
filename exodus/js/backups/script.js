//var parseTime = d3.timeParse("%Y");
//var formatTime = d3.timeFormat("%b %Y");
//
//var rowConverter = function(d, i, cols) {
//
//				var row = {
//					date: parseTime(d.Year),
//				};
//
//				for (var i = 1; i < cols.length; i++) {
//					var col = cols[i];
//
//					//If the value exists…
//					if (d[cols[i]]) {
//						row[cols[i]] = +d[cols[i]];  //Convert from string to int
//					} else {  //Otherwise…
//						row[cols[i]] = 0;  //Set to zero
//					}
//				}
//
//				return row;
//			};
//
//var stack = d3.stack().order(d3.stackOrderDescending);
//
//d3.csv("../csv/viz1-refugees-yearly.csv", rowConverter, function(data){
//    
//    var w=1440;
//    var h=600;
//    var padding = 100;
//    
//    var dataset = data;
//    
//    var keys = dataset.columns;
//    keys.shift();
//    stack.keys(keys);
//    var series = stack(dataset);
//    
//    var xScale = d3.scaleTime().domain([d3.min(data,function(d){return d.date;}),d3.max(data,function(d){return d.date;})]).range([padding,w-padding]);
//    var yScale = d3.scaleLinear().domain([0,d3.max(dataset, function(d) {
//										var sum = 0;
//										for (var i = 0; i < keys.length; i++) {
//											sum += d[keys[i]];   
//										};
//										return sum;
//									})]).range([h - padding, padding]).nice();
//    
//    var xAxis = d3.axisBottom().scale(xScale);
//    var yAxis = d3.axisLeft().scale(yScale);
//    
//    
//    var area = d3.area().x(function(d){ return xScale(d.date);}).y0(function(d){ return yScale(d[0]);}).y1(function(d){ return yScale(d[1]);});
//    
//    var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//    svg.selectAll("path").data(series).enter().append("path").attr("class","area").attr("d",area).attr("fill","#242424");
//    
//    svg.append("g").attr("class","x axis").attr("transform","translate(0,"+(h-padding)+")").call(xAxis);
//    svg.append("g").attr("class","y axis").attr("transform","translate("+padding+",0)").call(yAxis);
////    
//});

//LETS  TRY

			//Width and height
			var w = 1440;
			var h = 500;
			var padding = 20;
			
			var dataset, xScale, yScale, xAxis, yAxis, area;  //Empty, for now

			//For converting strings to Dates
			var parseTime = d3.timeParse("%Y");

			//For converting Dates to strings
			var formatTime = d3.timeFormat("%b %Y");

			//Function for converting CSV values from strings to Dates and numbers
			//We assume one column named 'Date' plus several others that will be converted to ints 
			var rowConverter = function(d, i, cols) {

				//Initial 'row' object includes only date
				var row = {
					date: parseTime(d.Year),  //Make a new Date object for each year + month
				};

				//Loop once for each vehicle type
				for (var i = 1; i < cols.length; i++) {
					var col = cols[i];

					//If the value exists…
					if (d[cols[i]]) {
						row[cols[i]] = +d[cols[i]];  //Convert from string to int
					} else {  //Otherwise…
						row[cols[i]] = 0;  //Set to zero
					}
				}

				return row;
			}

			//Set up stack method
			var stack = d3.stack()
						  .order(d3.stackOrderDescending);  // <-- Flipped stacking order

			//Load in data
			d3.csv("../csv/viz1-refugees-yearly.csv", rowConverter, function(data) {

				var dataset = data;
				// console.log(dataset);	

				//Now that we know the column names in the data…
				var keys = dataset.columns;
				keys.shift();  //Remove first column name ('Date')
				stack.keys(keys);  //Stack using what's left (the car names)

				//Data, stacked
				var series = stack(dataset);
				 console.log(series);

				//Create scale functions
				xScale = d3.scaleTime()
							   .domain([
									d3.min(dataset, function(d) { return d.date; }),
									d3.max(dataset, function(d) { return d.date; })
								])
							   .range([padding, w - padding * 2]);

				yScale = d3.scaleLinear()
								.domain([
									0,
									d3.max(dataset, function(d) {
										var sum = 0;

										//Loops once for each row, to calculate
										//the total (sum) of sales of all vehicles
										for (var i = 0; i < keys.length; i++) {
											sum += d[keys[i]];
										};

										return sum;
									})
								])
								.range([h - padding, padding / 2]).nice();

				//Define axes
				xAxis = d3.axisBottom()
						   .scale(xScale)
						   .ticks(10);

				//Define Y axis
				yAxis = d3.axisRight()
						   .scale(yScale)
						   .ticks(5);

				//Define area generator
				area = d3.area()
							.x(function(d) { return xScale(d.data.date); })
							.y0(function(d) { return yScale(d[0]); })
							.y1(function(d) { return yScale(d[1]); });

				//Create SVG element
				var svg = d3.select("body")
							.append("svg")
							.attr("width", w)
							.attr("height", h);

				//Create areas
				svg.selectAll("path")
					.data(series)
					.enter()
					.append("path")
					.attr("class", "area")
					.attr("d", area)
					.attr("fill", function(d, i) {
						return d3.schemeCategory20[i];
					})
					.append("title")  //Make tooltip
					.text(function(d) {
						return d.key;
					});

				//Create axes
				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(0," + (h - padding) + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "axis")
					.attr("transform", "translate(" + (w - padding * 2) + ",0)")
					.call(yAxis);

			});
			