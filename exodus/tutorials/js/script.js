//var dataset = [5,10,15,20,25];
//
////Example 1: A bar-chart in div
//d3.select("body")
//    .selectAll("div")
//    .data(dataset)
//    .enter()
//    .append("div")
//    .attr("class","bar")
//    .style("height",function(d){ return (d*5)+"px";})
//    .style("margin-right","10px");
//
////Example 2: A circle plot: SVG
//var w = 500;
//var h = 150;
//
//var svg = d3.select("body").append("svg").attr("height",h).attr("width",w);
//var circles = svg.selectAll("circle").data(dataset).enter().append("circle");
//circles.attr("cx",function(d,i){ return (i*50)+25;})
//    .attr("cy",h/2)
//    .attr("r",function(d){ return d;})
//    .attr("fill","yellow")
//    .attr("stroke","orange")
//    .attr("stroke-width",function(d){return d/2;});
//
//
////Example 3: A bar-chart in SVG
//var dataset = [5,10,15,20,25,2,3,4,1,2,7,9,4,1,6,19];
//var w = 600;
//var h = 600;
//var barpadding = 1;
//var s = 20;
//
//var svg = d3.select("body")
//            .append("svg")
//            .attr("width",w)
//            .attr("height",h);
//
//svg.selectAll("rect")
//    .data(dataset)
//    .enter()
//    .append("rect")
//    .attr("x",function(d,i){ return i*(w/dataset.length);})
//    .attr("width",function(d){ return (w/dataset.length)-barpadding;})
//    .attr("y",function(d){return h-(d * s);})
//    .attr("height",function(d){return d*(s);})
//    .attr("fill",function(d){ return "rgb(0,0,"+Math.round(d*15)+")";});
//
//svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d){return d;})
//    .attr("x",function(d,i){ return (i*(w/dataset.length))+((w/dataset.length)-barpadding)/2;})
//    .attr("y",function(d){return (h-(d * s))+15;})
//    .attr("text-anchor","middle")
//    .attr("fill","white")
//    .style("font-family","Lato")
//    .style("font-size","12");
//
////Example 4: First scatter-plot
//var dataset = [[5,20],[480,90],[250,50],[100,33],[330,95],[410,12],[475,44],[25,67],[85,21],[220,88]];
//var w=800, h=100;
//
//var svg = d3.select("body")
//            .append("svg")
//            .attr("width",w)
//            .attr("height",h);
//
//svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    .attr("cx",function(d){return d[0];})
//    .attr("cy",function(d){return d[1];})
//    .attr("r",function(d){return Math.sqrt(h-d[1]);})
//    .attr("fill","#F1487F");
//
//svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d){return d[0]+","+d[1];})
//    .attr("text-anchor","middle")
//    .attr("x",function(d){return d[0]+5;})
//    .attr("y",function(d){return d[1]-10;})
//    .attr("fill","#F1487F")
//    .style("font-family","Lato")
//    .style("font-size","12");




////Example 5: Scatter-plot + introduction of scales
//var dataset = [[5,20],[480,90],[250,50],[100,33],[330,95],[410,12],[475,44],[25,67],[85,21],[220,88],[600,150]];
//var w=1000, h=300, padding=20;
//
//var svg = d3.select("body")
//            .append("svg")
//            .attr("width",w)
//            .attr("height",h);
//
//var xScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d[0];})]).range([padding,w-2.6*padding]);
//var yScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d[1];})]).range([h-padding,padding]);
//var aScale = d3.scaleSqrt().domain([0,d3.max(dataset, function(d){return d[1];})]).range([0,10]);
//
//svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    .attr("cx",function(d){return xScale(d[0]);})
//    .attr("cy",function(d){return yScale(d[1]);})
//    .attr("r",function(d){return aScale(d[1]);})
//    .attr("fill","#F1487F");
//
//svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d){return d[0]+","+d[1];})
//    .attr("x",function(d){return xScale(d[0]+7);})
//    .attr("y",function(d){return yScale(d[1]);})
//    .attr("fill","#F1487F")
//    .style("font-family","Lato")
//    .style("font-size","10");


//At this point, I'm kinda glad. I was able to read nearly half the book, in a day. Thank you, Scott Murray!
//Example 6: A datetime example
//var parseTime = d3.timeParse("%m/%d/%y");
//var rowConverter = function(d) {
//    return {
//        Date: parseTime(d.Date),
//        Amount: parseInt(d.Amount)
//    };
//};
//
//var parseDate = d3.timeFormat("%b %e");
//
//d3.csv("time_scale_data.csv",rowConverter, function(data){
//    var w=500,h=300,padding=20;
//    var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//    
//    var xScale = d3.scaleTime().domain([d3.min(data,function(d){return d.Date}),d3.max(data,function(d){return d.Date})]).range([padding,w-padding]);
//    var yScale = d3.scaleLinear().domain([0,d3.max(data,function(d){return d.Amount})]).range([h-padding,padding]);
//
//    svg.selectAll("circle")
//        .data(data)
//        .enter()
//        .append("circle")
//        .attr("cx",function(d){ return xScale(d.Date);})
//        .attr("cy",function(d){return yScale(d.Amount);})
//        .attr("r",2)
//        .attr("fill","#AF81B1");
//    
//    svg.selectAll("text")
//        .data(data)
//        .enter()
//        .append("text")
//        .text(function(d){return parseDate(d.Date);})
//        .attr("x",function(d){ return xScale(d.Date);})
//        .attr("y",function(d){ return yScale(d.Amount);})
//        .style("font-family","Lato")
//        .style("font-size",10)
//        .attr("fill","#AF81B1");
//    
//});

//Lesson learnt: always check return statements in the anonymous functions.

//Example 7: A random scatter-plot, with axes
//var dataset = [];
//var numPoints = 50;
//var xRange = Math.random()*1000;
//var yRange = Math.random()*1000;
//
//for(i=0; i<numPoints; i++){
//    var newNumber1 = Math.floor(Math.random() * xRange);
//    var newNumber2 = Math.floor(Math.random() * yRange);
//    dataset.push([newNumber1,newNumber2]);
//}
//
//var w=500,h=300,xPadding=30,yPadding=20;
//
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//
//var xScale = d3.scaleLinear().domain([d3.min(dataset,function(d){return d[0];}),d3.max(dataset,function(d){return d[0];})]).range([xPadding,w-xPadding]);
//var yScale = d3.scaleLinear().domain([d3.min(dataset,function(d){return d[1];}),d3.max(dataset,function(d){return d[1];})]).range([h-yPadding,yPadding]);
//
//var rColor = Math.floor(Math.random() * 255);
//var gColor = Math.floor(Math.random() * 255);
//var bColor = Math.floor(Math.random() * 255);
//    
//svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    //.attr("cx",function(d){return d[0];}).attr("cy",function(d){return d[1];}).attr("r",function(d){return d[1]/10;});
//    .attr("cx",function(d){return xScale(d[0]+xPadding);})
//    .attr("cy",function(d){return yScale(d[1]);})
//    .attr("r",function(d){return d[1]/50;})
//    .attr("fill","rgb("+rColor+","+gColor+","+bColor+")");
//
//var xAxis = d3.axisBottom().scale(xScale);
//var yAxis = d3.axisLeft().scale(yScale);
//
//svg.append("g").attr("class","axis").attr("transform","translate(0,"+(h-yPadding)+")").call(xAxis);
//svg.append("g").attr("class","axis").attr("transform","translate("+xPadding+",0)").call(yAxis);
//

////Ok, Day-2, here we go:
////Example 8: Bar-chart with scales (Chapter-9)
//var dataset = [5,10,15,20,25,2,3,4,1,2,7,9,4,1,6,19];
//var w = 600;
//var h = 250;
//
//var svg = d3.select("body")
//            .append("svg")
//            .attr("width",w)
//            .attr("height",h);
//
//var xScale = d3.scaleBand().domain(d3.range(dataset.length)).rangeRound([0,w]).paddingInner(0.05);
//var yScale = d3.scaleLinear().domain([0,d3.max(dataset)]).range([0,h]);
//var topPadding = (d3.min(dataset)<5)?(d3.min(dataset)):5;
//
//svg.selectAll("rect")
//    .data(dataset)
//    .enter()
//    .append("rect")
//    .attr("x",function(d,i){ return xScale(i);})
//    .attr("width",xScale.bandwidth())
//    .attr("y",function(d){return yScale(d);})
//    .attr("height",function(d){return h-yScale(d);})
//    .attr("fill",function(d){ return "rgb(0,0,"+Math.round(d*10)+")";});
//
//svg.selectAll("text")
//    .data(dataset)
//    .enter()
//    .append("text")
//    .text(function(d){return d;})
//    .attr("x",function(d,i){ return xScale(i)+(xScale.bandwidth()/2);})
//    .attr("y",function(d){return h-yScale(d)+14;})
//    .attr("text-anchor","middle")
//    .attr("fill","white")
//    .style("font-family","Lato")
//    .style("font-size","12");
//
////Attempt 2: Ctrl+C
////Width and height
//var w = 600;
//var h = 250;
//
//var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
//                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];
//
//var xScale = d3.scaleBand()
//                .domain(d3.range(dataset.length))
//                .rangeRound([0, w])
//                .paddingInner(0.05);
//var yScale = d3.scaleLinear()
//                .domain([0, d3.max(dataset)])
//                .range([0, h]);
//
////Create SVG element
//var svg = d3.select("body")
//            .append("svg")
//            .attr("width", w)
//            .attr("height", h);
////Create bars
//svg.selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("x", function(d, i) {
//        return xScale(i);
//   })
//   .attr("y", function(d) {
//        return h - yScale(d);
//   })
//   .attr("width", xScale.bandwidth())
//   .attr("height", function(d) {
//        return yScale(d);
//   })
//   .attr("fill", function(d) {
//        return "rgb(0, 0, " + Math.round(d * 10) + ")";
//   });
////Create labels
//svg.selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text(function(d) {
//        return d;
//   })
//   .attr("text-anchor", "middle")
//   .attr("x", function(d, i) {
//        return xScale(i) + xScale.bandwidth() / 2;
//   })
//   .attr("y", function(d) {
//        return h - yScale(d) + 14;
//   })
//   .attr("font-family", "sans-serif")
//   .attr("font-size", "11px")
//   .attr("fill", "white");
//
//d3.select("p")
//    .on("click",function(){
//    //dataset = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
//    dataset = [];
//    var newCount = Math.floor(Math.random()*100);
//    var magicNumber = 100;
//    
//    for(i=0;i<newCount;i++){
//        var newNumber = Math.floor(Math.random()*magicNumber);
//        dataset.push(newNumber);
//    }
//    
//    yScale.domain([0,d3.max(dataset)]);
//    
//    svg.selectAll("rect")
//        .data(dataset)
//        .transition()
//        .delay(function(d,i){return i*100;})
//        .duration(500)
//        .attr("y",function(d){return h-yScale(d);})
//        .attr("height",function(d){return yScale(d);})
//        .attr("fill",function(d) {return "rgb(" + Math.round(d * 2) + ", " + Math.round(d * 2) + ", " + Math.round(d * 10) + ")";});
//    
//    svg.selectAll("text")
//       .data(dataset)
//        .transition()
//        .duration(500)
//        .delay(function(d,i){return i*100;})
//       .text(function(d) {
//            return d;
//       })
//       .attr("text-anchor", "middle")
//       .attr("x", function(d, i) {
//            return xScale(i) + xScale.bandwidth() / 2;
//       })
//       .attr("y", function(d) {
//            return h - yScale(d) + 14;
//       })
//       .attr("font-family", "sans-serif")
//       .attr("font-size", "11px")
//       .attr("fill", "white");
//    
//    })


//Example 8: Copied the scatterplot, from d3book
//    //Width and height
//    var w = 500;
//    var h = 300;
//    var padding = 30;
//
//    //Dynamic, random dataset
//    var dataset = [];											//Initialize empty array
//    var numDataPoints = 50;										//Number of dummy data points to create
//    var maxRange = Math.random() * 1000;						//Max range of new values
//    for (var i = 0; i < numDataPoints; i++) {					//Loop numDataPoints times
//        var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
//        var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
//        dataset.push([newNumber1, newNumber2]);					//Add new number to array
//    }
//    //Create scale functions
//    var xScale = d3.scaleLinear()
//                         .domain([0, d3.max(dataset, function(d) { return d[0]; })])
//                         .range([padding, w - padding * 2]);
//    var yScale = d3.scaleLinear()
//                         .domain([0, d3.max(dataset, function(d) { return d[1]; })])
//                         .range([h - padding, padding]);
//    //Define X axis
//    var xAxis = d3.axisBottom()
//                      .scale(xScale)
//                      .ticks(5);
//    //Define Y axis
//    var yAxis = d3.axisLeft()
//                      .scale(yScale)
//                      .ticks(5);
//    //Create SVG element
//    var svg = d3.select("body")
//                .append("svg")
//                .attr("width", w)
//                .attr("height", h);
//
//    svg.append("clipPath").attr("id","chart-area").append("rect").attr("x",padding).attr("y",padding).attr("width",w-padding*3).attr("height",h-padding*2);
//
//    //Create circles
//    svg.append("g")
//        .attr("id","circles")
//        .attr("clip-path","url(#chart-area)")
//        .selectAll("circle")
//       .data(dataset)
//       .enter()
//       .append("circle")
//       .attr("cx", function(d) {
//            return xScale(d[0]);
//       })
//       .attr("cy", function(d) {
//            return yScale(d[1]);
//       })
//       .attr("r", 2);
//
//    //Create X axis
//    svg.append("g")
//        .attr("class", "x axis")
//        .attr("transform", "translate(0," + (h - padding) + ")")
//        .call(xAxis);
//
//    //Create Y axis
//    svg.append("g")
//        .attr("class", "y axis")
//        .attr("transform", "translate(" + padding + ",0)")
//        .call(yAxis);
//    //On click, update with new data			
//    d3.select("p")
//        .on("click", function() {
//            //New values for dataset
//            var numValues = dataset.length;						 		//Count original length of dataset
//            var maxRange = Math.random() * 1000;						//Max range of new values
//            dataset = [];  						 				 		//Initialize empty array
//            for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
//                var newNumber1 = Math.floor(Math.random() * maxRange);	//New random integer
//                var newNumber2 = Math.floor(Math.random() * maxRange);	//New random integer
//                dataset.push([newNumber1, newNumber2]);					//Add new number to array
//            }
//
//            //Update scale domains
//            xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
//            yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);
//            //Update all circles
//            svg.selectAll("circle")
//               .data(dataset)
//               .transition()
//               .duration(1000)
//                .on("start",function(){
//                    d3.select(this)
//                        .attr("fill","magenta")
//                        .attr("r",7)
//                })
//               .attr("cx", function(d) {
//                    return xScale(d[0]);
//               })
//               .attr("cy", function(d) {
//                    return yScale(d[1]);
//               })
//                .transition()
//                .duration(1000)
//                .attr("fill","black")
//                .attr("r",2);
//        
//            svg.selectAll(".x.axis").transition().duration(1000).call(xAxis);
//            svg.selectAll(".y.axis").transition().duration(1000).call(yAxis);
//        
//        });


//Example 9: Bar-graphs with a new bar,added on every click. A looooong example.
//var dataset=[1,2,37,4,20,3,27,38,14,2,26,8,4,3,11,3,34,17,24];
//var dataset = [ { key: 0, value: 5 },		//dataset is now an array of objects.
//                { key: 1, value: 10 },		//Each object has a 'key' and a 'value'.
//                { key: 2, value: 13 },
//                { key: 3, value: 19 },
//                { key: 4, value: 21 },
//                { key: 5, value: 25 },
//                { key: 6, value: 22 },
//                { key: 7, value: 18 },
//                { key: 8, value: 15 },
//                { key: 9, value: 13 },
//                { key: 10, value: 11 },
//                { key: 11, value: 12 },
//                { key: 12, value: 15 },
//                { key: 13, value: 20 },
//                { key: 14, value: 18 },
//                { key: 15, value: 17 },
//                { key: 16, value: 16 },
//                { key: 17, value: 18 },
//                { key: 18, value: 23 },
//                { key: 19, value: 25 } ];
//
//var w=600;
//var h=200;
//var padding=20;
//var sorted = false;
//
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//
//var xScale = d3.scaleBand().domain(d3.range(dataset.length)).range([padding,w-padding]).paddingInner(0.06);
//var yScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d.value;})]).range([padding,h-padding]);
//var key = function(d){return d.key};
//
//svg.selectAll("rect").data(dataset,key).enter().append("rect").attr("x",function(d,i){return xScale(i);}).attr("y",function(d){ return h-yScale(d.value);}).attr("width",xScale.bandwidth()).attr("height",function(d){ return yScale(d.value);}).attr("fill",function(d){return "rgb(0,0,"+d.value*10+")";});
//
//svg.selectAll("text").data(dataset,key).enter().append("text").text(function(d){return d.value;}).attr("x",function(d,i){return xScale(i)+xScale.bandwidth()/2;}).attr("y",function(d){ return h-yScale(d.value)+14;}).attr("text-anchor","middle").attr("fill","white").style("font-family","Lato").style("font-size","12");
//
//barEvents();
//
//d3.selectAll("p").on("click",function(d){
//    var clickType = d3.select(this).attr("id");
//    
//    if(clickType == "add-bar"){
//        var minValue = 2;
//        var maxValue = 25 - minValue;
//        var newNumber = Math.floor(Math.random() * maxValue) + minValue;
//        var lastKeyValue = dataset[dataset.length - 1].key;
//        dataset.push({
//            key: lastKeyValue + 1,
//            value: newNumber
//        });
//    }
//    else{
//        dataset.shift();
//    }
//    
//    xScale.domain(d3.range(dataset.length));
//    yScale.domain([0,d3.max(dataset,function(d){return d.value;})]);
//    
//    var bars = svg.selectAll("rect").data(dataset,key);
//    bars.enter().append("rect").attr("x",w).attr("y",function(d){return h-yScale(d.value);}).attr("width",xScale.bandwidth()).attr("height",function(d){ return yScale(d.value);}).attr("fill",function(d){return "rgb(0,0,"+d.value*10+")";}).merge(bars).transition().duration(500).attr("x",function(d,i){return xScale(i)}).attr("y",function(d){return h-yScale(d.value);}).attr("width",xScale.bandwidth()).attr("height",function(d){ return yScale(d.value);}).attr("fill",function(d){return "rgb(0,0,"+d.value*10+")";});
//    bars.exit().transition().duration(500).attr("x",-xScale.bandwidth()).remove();
//    
//    var texts = svg.selectAll("text").data(dataset,key);
//    texts.enter().append("text").text(function(d){return d.value;}).attr("x",w).attr("y",function(d){ return h-yScale(d.value)+14;}).attr("text-anchor","middle").attr("fill","white").style("font-family","Lato").style("font-size","12").merge(texts).transition().duration(500).attr("x",function(d,i){return xScale(i)+xScale.bandwidth()/2;}).attr("y",function(d){ return h-yScale(d.value)+14;}).attr("text-anchor","middle").attr("fill","white").style("font-family","Lato").style("font-size","12");
//    texts.exit().transition().duration(500).attr("x",-xScale.bandwidth()).remove();
//    
//    barEvents();
//
//});
//
////Fantastic! I can't believe that I wrote nearly 90% of all this code, without any reference. 
////Now, will I remember all this? 
////Will a crash-course of d3.js (2-day spree: lol) be a problem, in the long run ?
////Definitely, d3 has improved my perspective of looking at dataviz. It all seems to be coming together now.
//
//function barEvents(){
//    svg.selectAll("rect")
//    .on("mouseover",function(d){
//        d3.select(this).transition("restoreBarColor").duration(200).attr("fill","#F1487F");
//        
//        var xPosition = parseFloat(d3.select(this).attr("x"))+xScale.bandwidth()/2;
//        var yPosition = parseFloat(d3.select(this).attr("y"))/2 + h/2;
//        
//        d3.select("#tooltip").style("left",xPosition+"px").style("top",yPosition+"px").classed("hidden",false).select("#value").text(d.value);
//        
//    })
//    .on("mouseout",function(d){
//        d3.select(this).transition("restoreBarColor").duration(200).attr("fill",function(d){return "rgb(0,0,"+(d.value*10)+")";});
//        d3.select("#tooltip").classed("hidden",true);
//    })
//    .on("click", function(){
//        sortBars();
//    })
//}
//
//
//
//function sortBars(){
//    sorted = !sorted;
//    
//    svg.selectAll("rect")
//        .sort(function(a,b){if(sorted){return d3.ascending(a.value,b.value);} else{return d3.descending(a.value,b.value);}})
//        .transition()
//        .delay(function(d,i){return i*50;})
//        .duration(1000)
//        .attr("x",function(d,i){return xScale(i);});
//    
//    svg.selectAll("text")
//        .sort(function(a,b){if(sorted){return d3.ascending(a.value,b.value);} else{return d3.descending(a.value,b.value);}})
//        .transition()
//        .delay(function(d,i){return i*50;})
//        .duration(1000)
//        .attr("x",function(d,i){return xScale(i)+xScale.bandwidth()/2;});
//}

//Example i-lost-count: Now, trying to make a line-chart by leveraging the "paths" in svg:
//var w=800, h=400, padding=40;
//
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//var rowConverter = function(d){
//    return{
//        date: new Date(+d.year,+d.month-1),
//        average: parseFloat(d.average)
//    }
//}
//
//d3.csv("co2.csv",rowConverter,function(data){
//    var dataset = data;
//    //console.table(data);
//    
//    var xScale = d3.scaleTime().domain([d3.min(dataset,function(d){return d.date;}),d3.max(dataset,function(d){return d.date;})]).range([padding,w]);
//    //var yScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d.average;})]).range([h,0]);
//    var yScale = d3.scaleLinear().domain([300,d3.max(dataset,function(d){return d.average;})]).range([h-padding,0]);
//    
//    var xAxis = d3.axisBottom().scale(xScale);
//    var yAxis = d3.axisLeft().scale(yScale);
//
//    //uncomment below lines to convert to a line-graph, instead:
////    var line = d3.line().defined(function(d){return (d.average>=0 && d.average<=350);}).x(function(d){return xScale(d.date);}).y(function(d){return yScale(d.average);});
////    var safeLine = d3.line().x(function(d){return xScale(d.date);}).y(function(d){return yScale(350);});
////    var dangerLine = d3.line().defined(function(d){return d.average>350;}).x(function(d){return xScale(d.date);}).y(function(d){return yScale(d.average);});
//    
//    var area = d3.area().defined(function(d){return (d.average>=0);}).x(function(d){return xScale(d.date);}).y0(function(d){return yScale.range()[0];}).y1(function(d){return yScale(d.average);});
//    var safeLine = d3.line().x(function(d){return xScale(d.date);}).y(function(d){return yScale(350);});
//    var dangerArea = d3.area().defined(function(d){return d.average>=350;}).x(function(d){return xScale(d.date);}).y0(function(d){return yScale(350);}).y1(function(d){return yScale(d.average);});
//    
//    svg.append("path").datum(dataset).attr("class","area").attr("d",area);
//    svg.append("path").datum(dataset).attr("class","safeLevel").attr("d",safeLine);
//    svg.append("path").datum(dataset).attr("class","danger-area").attr("d",dangerArea);
//    svg.append("text").text("350 ppm - safe level").attr("x",padding*2).attr("y",function(d){return yScale(352);}).attr("class","safelevel-text").attr("font-size","12");
//    
//    svg.append("g").attr("class","axis").attr("transform","translate(0,"+(h-padding)+")").call(xAxis);
//    svg.append("g").attr("class","axis").attr("transform","translate("+padding+",0)").call(yAxis);
//    
//});


//An attempt to make a bar-chart, with a threshold-slider:
//var dataset = [5,10,13,19,21,25,22,18,15,13,11,12,15,20,18,17,16,18,23,25];
//
//var w=800, h=400, padding=40;
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//
//var xScale = d3.scaleBand().domain(d3.range(dataset.length)).range([padding,w-padding]).paddingInner(0.05);
//var yScale = d3.scaleLinear().domain([0,d3.max(dataset)]).range([padding,h-padding]);
//
//var bars = svg.selectAll("rect").data(dataset).enter().append("rect").attr("x",function(d,i){return xScale(i);}).attr("y",function(d){return h-yScale(d);}).attr("width",xScale.bandwidth()).attr("height",function(d){return yScale(d);}).attr("fill",function(d){return "rgb(0,0,"+d*10+")"});
//
//var text = svg.selectAll("text").data(dataset).enter().append("text").text(function(d){return d;}).attr("text-anchor","middle").attr("x",function(d,i){return xScale(i)+xScale.bandwidth()/2;}).attr("y",function(d){return h-yScale(d)+14;}).attr("fill","white").attr("font-family","Lato").attr("font-size",10);
//
//d3.select("input").on("change",function(){
//    var threshold = +d3.select(this).node().value;
//    svg.selectAll("rect").attr("fill",function(d){return "rgb(0,0,"+d*10+")"}).filter(function(d){return d <= threshold;}).attr("fill","#F5AFAE");
//});

//Worked, with a lot of bugs :(

//A freaky example:
//var dataset = [];
//var dataGenerator = function(){
//    var numPoints = 50;
//    var numLimit = Math.random() * 100;
//
//    for(i=0; i<numPoints; i++){
//        var numX = Math.floor(Math.random() * numLimit);
//        var numY = Math.floor(Math.random() * numLimit);
//        dataset.push([numX,numY]);
//    }
//};
//
//dataGenerator();
//
//var w=800,h=600,padding=50;
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//svg.append("clipPath").attr("id","chart-area").append("rect").attr("x",padding).attr("y",padding).attr("width",w-padding*2).attr("height",h-padding*2);
//
//var xScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d[0];})]).range([padding,w-padding]);
//var yScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){return d[1];})]).range([h-padding,padding]);
//
//svg.selectAll("circle").data(dataset).enter().append("circle").attr("clip-path","url(#chart-area)").attr("cx",function(d){return xScale(d[0]);}).attr("cy",function(d){return yScale(d[1]);}).attr("r",2);
//
//var xAxis = d3.axisBottom().scale(xScale).ticks(5);
//var yAxis = d3.axisLeft().scale(yScale).ticks(5);
//
//svg.append("g").attr("class","x axis").attr("transform","translate(0,"+(h-padding)+")").call(xAxis);
//svg.append("g").attr("class","y axis").attr("transform","translate("+padding+")",0).call(yAxis);
//
//d3.select("#btn1").on("click",function(){
//    var freakOut = function(d,i){
//        var color= d3.schemeCategory20;
//        var colorIndex = Math.round(Math.random() * 20);
//        d3.select(this).transition().duration(2000).delay(i*25).ease(d3.easeElasticOut).attr("fill",color[colorIndex]).attr("r",25);
//    };
//    
//    svg.selectAll("circle").each(freakOut);
//});
//
//d3.select("#btn2").on("click",function(){
//    var freakOut = function(d,i){
//        var color= d3.schemeCategory20;
//        var colorIndex = Math.round(Math.random() * 20);
//        d3.select(this).transition().duration(2000).delay(i*25).ease(d3.easeElasticOut).attr("fill",color[colorIndex]).attr("r",25);
//    };
//    
//    dataGenerator();
//    svg.selectAll("circle").data(dataset).enter().append("circle").attr("clip-path","url(#chart-area)").attr("cx",function(d){return xScale(d[0]);}).attr("cy",function(d){return yScale(d[1]);}).attr("r",2);
//    svg.selectAll("circle").each(freakOut);
//});

//A pie chart time?
//var dataset = [5,10,20,45,6,25];
//var w = 300;
//var h=300;
//
//var pie = d3.pie();
//var outerRadius=w/2;
//var innerRadius = w/3;
//var color = d3.scaleOrdinal(d3.schemeCategory20b);
//
//var arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//var arcs = svg.selectAll("g.arc").data(pie(dataset)).enter().append("g").attr("class","arc").attr("transform","translate("+outerRadius+","+outerRadius+")");
//
//arcs.append("path").attr("fill",function(d,i){return color(i);}).attr("d",arc);
//arcs.append("text").attr("transform",function(d){ return "translate("+arc.centroid(d)+")";}).attr("text-anchor","middle").text(function(d){return d.value;}).attr("fill","white");

//Moving on: A stacked bar-chart:
//var w = 500;
//var h = 300;
//
//var dataset = [
//    { apples: 5, oranges: 10, grapes: 22 },
//    { apples: 4, oranges: 12, grapes: 28 },
//    { apples: 2, oranges: 19, grapes: 32 },
//    { apples: 7, oranges: 23, grapes: 35 },
//    { apples: 23, oranges: 17, grapes: 43 }
//];
//
//var stack =  d3.stack().keys(["apples","oranges","grapes"]).order(d3.stackOrderDescending);
//var series = stack(dataset);
//
//var colors = d3.scaleOrdinal(d3.schemeCategory10);
//
//var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);
//var groups = svg.selectAll("g").data(series).enter().append("g").style("fill",function(d,i){return colors(i);});
//
//var xScale = d3.scaleBand().domain(d3.range(dataset.length)).range([0,w]).paddingInner(0.05);
//var yScale = d3.scaleLinear().domain([0,d3.max(dataset,function(d){ return d.apples+d.oranges+d.grapes;})]).range([h,0]);
//
//var rects = groups.selectAll("rect").data(function(d){return d;}).enter().append("rect").attr("x",function(d,i){return xScale(i)}).attr("y",function(d){ return yScale(d[1])}).attr("height",function(d){ return yScale(d[0])-yScale(d[1]);}).attr("width",xScale.bandwidth());
//

//So, I skipped stacked area-chart and a flow-diagram. Will do it post-lunch.
// Now, it's time for the complex - map visualizations.

var w=800;
var h=600;

var svg = d3.select("body").append("svg").attr("width",w).attr("height",h);

d3.json("us-states.json",function(json){
    var projection = d3.geoAlbersUsa().translate([w/2,h/2]).scale([750]);
    var path = d3.geoPath().projection(projection);
    
    var color = d3.scaleQuantize().range(["rgb(237,248,233)","rgb(186,228,179)","rgb(116,196,118)","rgb(49,163,84)","rgb(0,109,44)"]);
    
    d3.csv("us-ag-productivity.csv",function(data){
        
        color.domain([d3.min(data,function(d){ return d.value;}),d3.max(data,function(d){ return d.value;})]);
        
        for(var i=0;i<data.length;i++){
            var state = data[i].state;
            var dataValue = parseFloat(data[i].value);

            for(var j=0;j<json.features.length;j++){
                if(json.features[j].properties.name == state){
                    json.features[j].properties.value = dataValue;
                    break;
                    }
                }
            }

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d",path)
            .style("fill",function(d){
                var dValue = d.properties.value;
            
                if(dValue){
                    return color(dValue);
                }
                else{
                    return "#ccc";
                }   
            });
    
        }); //end of us-ag-productivity.csv. Lesson-learnt: While SVG is being drawn, it must be in  same "context" aka function, as that of the csv read
    
    d3.csv("us-cities.csv",function(data){
        svg.selectAll("circle").data(data).enter().append("circle").attr("cx",function(d){return projection([d.lon,d.lat])[0]}).attr("cy",function(d){return projection([d.lon,d.lat])[1]}).attr("r",function(d){return Math.sqrt(parseInt(d.population)*0.00004);}).style("fill","yellow").style("stroke","gray").style("stroke-width",0.25).style("opacity",0.75).append("title").text(function(d){return d.place+": Pop."+d.population;});
    });
});

