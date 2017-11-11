//var w=800, h=600, padding=50;
//var svg = d3.select("#onion-radial").append("svg").attr("width",w).attr("height",h);
//
//var rowConverter = function(d){
//  return{
//      "Year" : +(d.Year),
//      "Month" : new Date(d.Month),
//      "Price" : +(d.Price)
//  };  
//};
//
//d3.csv("csv/Onion_Lasalgaon_data.csv",rowConverter,function(data){
//        
//    var margin = {top: 0, right: 10, bottom: 20, left: 10};
//    console.log(data);
//    var width = 960 - margin.left - margin.right,
//    	height = 500 - margin.top - margin.bottom;
//    
//    var svg = d3.select("body").append("svg")
//    	.attr("width", width + margin.left + margin.right)
//      .attr("height", height + margin.top + margin.bottom)
//    .append("g")
//    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//    
//    var g = svg.append("g")
//    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
//    
//    
//    var innerRadius = 100,
//    outerRadius = Math.min(w, h) / 2 - 6;
//    var fullCircle = 2 * Math.PI;
//    
//    var xScale = d3.scaleTime().domain(d3.extent(data, function(d) { return d.Month; })).range([0, fullCircle]);
////    var xScale = d3.scaleTime().domain(d3.range(data.length)).range([0, fullCircle]);
//    var yScale = d3.scaleLinear().domain(d3.extent(data, function(d) { return d.Price; })).range([innerRadius, outerRadius]);
//
//    var line = d3.lineRadial().angle(function(d){return xScale(d.Month);}).radius(function(d){return yScale(d.Price);});
//    g.append("path").datum(data).attr("d",line).attr("fill","none").attr("stroke","black");
//    
//     var xAxis = g.append("g");
//  
//      var xTick = xAxis
//        .selectAll("g")
//        .data(xScale.ticks(12))
//        .enter().append("g")
//          .attr("text-anchor", "middle")
//          .attr("transform", function(d) {
//            return "rotate(" + ((xScale(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
//          });
//      
//      xTick.append("line")
//        .attr("x2", -5)
//        .attr("stroke", "#000");
//
//      xTick.append("text")
//        .attr("transform", function(d) { 
//        var angle = xScale(d);
//        return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
//        .text(function(d) { 
//          return d.Month;
//        })
//      	.style("font-size", 10)
//      	.attr("opacity", 0.6)
//
//});



var rowConverter = function(d){
  return{
      "Year" : +(d.Year),
      "Month" : new Date(d.Month),
      "Rainfall" : +(d.Rainfall)
  };  
};

d3.csv("csv/Onion_Lasalgaon_data.csv",rowConverter,function(data){
    
     var margin = {top: 20, right: 10, bottom: 20, left: 10};
    
    var width = 960 - margin.left - margin.right,
    	height = 500 - margin.top - margin.bottom;
    
    var svg = d3.select("body").append("svg")
    	.attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
    	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    var g = svg.append("g")
    	.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    
    var innerRadius = 100,
        outerRadius = Math.min(width, height) / 2 - 6;
    
    var parseTime = d3.timeParse("%d-%b-%y");
    
    var formatMonth = d3.timeFormat("%b");
    
    var fullCircle = 2 * Math.PI;
    
    var x = d3.scaleTime()
        .range([0, fullCircle]);
    
    var y = d3.scaleRadial()
    		.range([innerRadius, outerRadius]);
    
    var line = d3.lineRadial()
    		.angle(function(d) { return x(d.Month); })
    		.radius(function(d) { return y(d.Rainfall); });
    
      x.domain(d3.extent(data, function(d) { return d.Month; }));
  		y.domain(d3.extent(data, function(d) { return d.Rainfall; }));
      
      var linePlot = g.append("path")
      	.datum(data)
        .attr("fill", "none")
        .attr("stroke", "#4099ff")
        .attr("d", line);
      
      var yAxis = g.append("g")
          .attr("text-anchor", "middle");

      var yTick = yAxis
        .selectAll("g")
        .data(y.ticks(5))
        .enter().append("g");
      
      yTick.append("circle")
          .attr("fill", "none")
          .attr("stroke", "black")
      		.attr("opacity", 0.2)
          .attr("r", y);
      
      yAxis.append("circle")
      		.attr("fill", "none")
          .attr("stroke", "black")
      		.attr("opacity", 0.2)
          .attr("r", function() { return y(y.domain()[0])});
      
      var labels = yTick.append("text")
          .attr("y", function(d) { return -y(d); })
          .attr("dy", "0.35em")
          .attr("fill", "none")
          .attr("stroke", "#fff")
          .attr("stroke-width", 5)
          .attr("stroke-linejoin", "round")
          .text(function(d) { return d; });

      yTick.append("text")
        .attr("y", function(d) { return -y(d); })
        .attr("dy", "0.35em")
        .text(function(d) { return d+" mm"; });
      
      var xAxis = g.append("g");
  
      var xTick = xAxis
        .selectAll("g")
        .data(x.ticks(12))
        .enter().append("g")
          .attr("text-anchor", "middle")
          .attr("transform", function(d) {
            return "rotate(" + ((x(d)) * 180 / Math.PI - 90) + ")translate(" + innerRadius + ",0)";
          });
      
      xTick.append("line")
        .attr("x2", -5)
        .attr("stroke", "#000");

      xTick.append("text")
        .attr("transform", function(d) { 
        var angle = x(d);
        return ((angle < Math.PI / 2) || (angle > (Math.PI * 3 / 2))) ? "rotate(90)translate(0,22)" : "rotate(-90)translate(0, -15)"; })
        .text(function(d) { 
          return formatMonth(d);
        })
      	.style("font-size", 10)
      	.attr("opacity", 0.6)
      
      var title = g.append("g")
      		.attr("class", "title")
      		.append("text")
      		.attr("dy", "-0.2em")
      		.attr("text-anchor", "middle")
      		.text("Rainfall")
      
      var subtitle = g.append("text")
      		.attr("dy", "1em")
          .attr("text-anchor", "middle")
      		.attr("opacity", 0.6)
      		.text("2008");  
     	
      var lineLength = linePlot.node().getTotalLength();
      
      linePlot
        .attr("stroke-dasharray", lineLength + " " + lineLength)
        .attr("stroke-dashoffset", -lineLength)
        .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
});