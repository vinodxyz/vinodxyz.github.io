var rowConverter = function(d){
    return {
        date: new Date(d.Year),
        refugees: +(d.Refugees),
        dead: +(d.Deaths),
        origin: d.Origin
    };
};

var mobileScreen = ($( window ).innerWidth() < 500 ? true : false);

d3.csv("../csv/viz1-scatter-death.csv",rowConverter, function(data){
    
    var padding=50;
    var margin = {left: 10, top: 30, right: 20, bottom: 0};
    var w = Math.min($("#bubble-line-chart").width(), 840) - margin.left - margin.right;
    var w = Math.min($("#timeline2-div").width(), 840) - margin.left - margin.right;
	//var h = w*2/3;
    var h = 400;
    
    var opacityCircles = 0.7,
        opacityLines = 0.2,
	    maxDistanceFromPoint = 30;
    
    var svg = d3.select("#bubble-line-chart").append("svg").attr("width",w).attr("height",h);
    //var wrapper = svg.append("g").attr("class", "chordWrapper").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var wrapper = svg.append("g").attr("class", "chordWrapper").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    

    //var xScale = d3.scaleTime().domain([1940,d3.max(data,function(d){return d.date;})]).range([0,w-padding]);
    var xScale = d3.scaleTime().domain([new Date("1945"),new Date("2016")]).range([0,w-padding*1.5]);
    var yScale = d3.scaleLinear().domain([0,d3.max(data,function(d){return d.refugees;})]).range([h-padding,padding]);
    var color = d3.scaleOrdinal().range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852","#AAA9AA","#5CEAEA"]).domain(['Rwanda','Syrian Arab Rep.','Afghanistan','Dem. Rep. of the Congo','Iraq','Viet Nam','Burundi','Ethiopia','Myanmar','Somalia','Sudan']);
    var rScale = d3.scaleSqrt().range([mobileScreen ? 1 : 2, mobileScreen ? 10 : 16]).domain(d3.extent(data, function(d) { return d.dead; }));
    
    //Set up X axis label
//    wrapper.append("g")
//        .append("text")
//        .attr("class", "x title")
//        .attr("text-anchor", "end")
//        .style("font-size", (mobileScreen ? 8 : 12) + "px")
//        .attr("transform", "translate(" + w + "," + (h - 10) + ")")
//        .text("Years");
    
    var refugeeFilter = 450000;
    
    //Set up y axis label
    wrapper.append("g")
        .append("text")
        .attr("class", "y title")
        .attr("text-anchor", "end")
        .style("font-size", (mobileScreen ? 8 : 12) + "px")
        .attr("transform", "translate(70,60) rotate(-90)")
        .text("# of Refugees");
    
    //a line chart connecting trends
    
    var line = d3.line().x(function(d){return xScale(d.date);}).y(function(d){ return yScale(d.refugees);});
    var lineGroup = wrapper.append("g").attr("class", "lineWrapper"); 
    
    var dataNest = d3.nest().key(function(d) {return d.origin;}).entries(data.filter(function(d){return d.refugees > refugeeFilter;}));
     dataNest.forEach(function(d) { 
        lineGroup.append("path")
            .attr("class", "line "+d.key.replace(/\s+/g, '').replace(/\./g,''))
            .attr("fill", "none")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("opacity",opacityLines)
            .style("stroke", function() { // Add the colours dynamically
                return d.color = color(d.key); })
            .attr("d", line(d.values));

    });
    
    // Use the same variables of the data in the .x and .y as used in the cx and cy of the circle call
    svg._tooltipped = svg._voronoi = null;
    svg.on('mousemove', function() {
      if (!svg._voronoi) {
        svg._voronoi = d3.voronoi()
          .x(function(d) { return xScale(d.date); })
          .y(function(d) { return yScale(d.refugees); })
        (data.filter(function(d){return d.refugees > refugeeFilter;}));
          
      }
        
      var p = d3.mouse(this), site;
      p[0] -= margin.left;
      p[1] -= margin.top;
        
      if (p[0] < 5 || p[1] < 5) {
        site = null;
      } else {
        site = svg._voronoi.find(p[0], p[1], maxDistanceFromPoint);
      }
        
      if (site !== svg._tooltipped) {
        if (svg._tooltipped) removeTooltip(svg._tooltipped.data)
        if (site) showTooltip(site.data);
        svg._tooltipped = site;
      }
    });
    
    
    var circleGroup = wrapper.append("g").attr("class", "circleWrapper"); 
    var formatTime = d3.timeFormat("%Y");
    
    circleGroup.selectAll("circle")
        .data(data.filter(function(d){return d.refugees > refugeeFilter;}))
        .enter().append("circle")
        .attr("class", function(d,i) {
            var deathclass = (d.dead==0)?"unknown":"known";
            var country = (d.origin).replace(/\s+/g, '').replace(/\./g,'');
            return "countries "+country+" "+country+formatTime(d.date)+" "+deathclass;
        })
        .attr("cx",function(d){return xScale(d.date);})
        .attr("cy",function(d){return yScale(d.refugees);})
        .attr("r", function(d) {return rScale(d.dead);})
        .attr("fill",function(d){ return color(d.origin);})
        .attr("opacity",opacityCircles);
    
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale).ticks(5);
    
    wrapper.append("g").attr("class","x axis").attr("transform","translate(0,"+(h-padding)+")").call(xAxis);
    //wrapper.append("g").attr("class","y axis").attr("transform","translate("+padding+",0)").call(yAxis);
    
    //Hide the tooltip when the mouse moves away
    function removeTooltip (d, i) {
        //Save the chosen circle (so not the voronoi)
        
        var allLines = d3.selectAll(".line");
        allLines.style("opacity", opacityLines);
        d3.selectAll(".countries").style("opacity", opacityCircles);
        
        var country = (d.origin).replace(/\s+/g, '').replace(/\./g,'');
        var element = d3.selectAll("."+country+formatTime(d.date));
        
        //Fade out the bubble again
        element.style("opacity", opacityCircles);

        //Hide tooltip
        $('.popover').each(function() {
            $(this).remove();
        }); 

        //Fade out guide lines, then remove them
        d3.selectAll(".guide")
            .transition().duration(200)
            .style("opacity",  0)
            .remove();
    }

    //Show the tooltip on the hovered over slice
    function showTooltip (d, i) {

        //Save the chosen circle (so not the voronoi)
        var country = (d.origin).replace(/\s+/g, '').replace(/\./g,'');
        var element = d3.select("."+country+formatTime(d.date)),
          el = element._groups[0];
        
        //Define and show the tooltip
        $(el).popover({
            placement: 'auto top',
            container: '#bubble-line-chart',
            trigger: 'manual',
            html : true,
            content: function() { 
                //return "<span style='font-size: 11px; text-align: center;'>" +d.origin + "</span>"; }
                var dead;
                if(d.dead == 0){
                    dead = "unknown";
                }
                else{
                    dead = d.dead.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                };
                
                return "<span style='font-size: 11px; text-align: center;'><strong>" +d.origin + "</strong><br/> # dead: "+dead+"</span>"; }
        });
        $(el).popover('show');
        
        d3.selectAll(".countries").style("opacity", 0.02);
        d3.selectAll(".countries."+country).style("opacity", opacityCircles);
        
        //Make chosen circle more visible
        element.style("opacity", 1);
        
        d3.selectAll(".line").style("opacity", 0.02);
        d3.select(".line."+country).style("opacity", opacityLines);
        
        //Place and show tooltip
        var x = +element.attr("cx"),
            y = +element.attr("cy"),
            color = element.style("fill");
        //Append lines to bubbles that will be used to show the precise data points

        //vertical line
        wrapper
            .append("line")
            .attr("class", "guide")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", y)
            .attr("y2", ((h-padding)+30))
            .style("stroke", color)
            .style("opacity",  0)
            .transition().duration(200)
            .style("opacity", 0.5);
        //Value on the axis
        wrapper
            .append("text")
            .attr("class", "guide")
            .attr("x", x)
            .attr("y", ((h-padding)+30))
            .style("fill", color)
            .style("opacity",  0)
            .style("text-anchor", "middle")
            .text(formatTime(d.date).toString())
            .transition().duration(200)
            .style("opacity", 0.5);

        //horizontal line
        wrapper
            .append("line")
            .attr("class", "guide")
            .attr("x1", x)
            .attr("x2", -20)
            .attr("y1", y)
            .attr("y2", y)
            .style("stroke", color)
            .style("opacity",  0)
            .transition().duration(200)
            .style("opacity", 0.5);
        //Value on the axis
        wrapper
            .append("text")
            .attr("class", "guide")
            .attr("x", padding+3)
            .attr("y", y-(padding)/3)
            .attr("dy", "0.35em")
            .style("fill", color)
            .style("opacity",  0)
            .style("text-anchor", "end")
            .text((d.refugees).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
            .transition().duration(200)
            .style("opacity", 0.5);			
    }

    function selectLegend(mode) {
        return function(d, i) {
            var opacityCircle;
            var opacityAllLines;
            var opacityChosenLine;

            switch(+mode){
                case 0:
                    opacityCircle= 0.02;
                    opacityAllLines= 0.02;
                    opacityChosenLine= opacityLines;
                    break;
                case 1:
                    opacityCircle= opacityCircles;
                    opacityAllLines= opacityLines;
                    opacityChosenLine= opacityLines;
                    break;
                default:
                    break;
            };
            
            var chosen = color.domain()[i];
            
            wrapper.selectAll(".countries")
                .filter(function(d) { return d.origin != chosen; })
                .transition()
                .duration(500)
                .style("opacity", opacityCircle);
            
            var allLines = d3.selectAll(".line");
            allLines.style("opacity", opacityAllLines);
            
            var country = chosen.replace(/\s+/g, '').replace(/\./g,'');
            var chosenLine = d3.select(".line."+country);
            chosenLine.style("opacity", opacityChosenLine);
          };
    }
    
    if (!mobileScreen) {
        
        var chartHeight = d3.select("#bubble-line-chart").select("svg").attr("height");
        
        //Legend			
        var	legendMargin = {left: 5, top: 0, right: 5, bottom: 10},
            legendWidth = 145,
            legendHeight = +chartHeight;//270;
        
        var svgLegend = d3.select("#legend").append("svg")
                    .attr("width", (legendWidth + legendMargin.left + legendMargin.right))
                    //.attr("height", (legendHeight + legendMargin.top + legendMargin.bottom));			
                    .attr("height",legendHeight);			

        var legendWrapper = svgLegend.append("g").attr("class", "legendWrapper")
                        .attr("transform", "translate(" + legendMargin.left + "," + legendMargin.top +")");

        var rectSize = 15, //dimensions of the colored square
            rowHeight = 20, //height of a row in the legend
            maxWidth = 144; //widht of each row

        //Create container per rect/text pair  
        var legend = legendWrapper.selectAll('.legendSquare')  	
                  .data(color.range())                              
                  .enter().append('g')   
                  .attr('class', 'legendSquare') 
                  .attr("transform", function(d,i) { return "translate(" + 0 + "," + (i * rowHeight) + ")"; })
                  .style("cursor", "pointer")
                  .on("mouseover", selectLegend(0))
                  .on("mouseout", selectLegend(1));

        //Non visible white rectangle behind square and text for better hover
        legend.append('rect')                                     
              .attr('width', maxWidth) 
              .attr('height', rowHeight) 			  		  
              .style('fill', "white");
        //Append small squares to Legend
        legend.append('rect')                                     
              .attr('width', rectSize) 
              .attr('height', rectSize) 			  		  
              .style('fill', function(d) {return d;});                                 
        //Append text to Legend
        legend.append('text')                                     
              .attr('transform', 'translate(' + 22 + ',' + (rectSize/2) + ')')
              .attr("class", "legendText")
              .style("font-size", "10px")
              .attr("dy", ".35em")		  
              .text(function(d,i) {
            
                if(color.domain()[i] == "Syrian Arab Rep.")
                    return "Syria";
                if(color.domain()[i] == "Dem. Rep. of the Congo")
                    return "Congo";
                if(color.domain()[i] == "Viet Nam")
                    return "Vietnam";
            
                    return color.domain()[i]; 
                });  

        //Create g element for bubble size legend
        var bubbleSizeLegend = legendWrapper.append("g")
                                .attr("transform", "translate(" + (legendWidth/2 - 30) + "," + (color.domain().length*rowHeight + 20) +")");
        //Draw the bubble size legend
    //	bubbleLegend(bubbleSizeLegend, rScale, legendSizes = [1e11,3e12,1e13], legendName = "GDP (Billion $)");		
    }//if !mobileScreen
    else {
        d3.select("#legend").style("display","none");
    }  
    
    d3.select("#show-voronoi").property("disabled", false).on("change", function() { 
        if($("#show-voronoi").prop("checked")){
            var voronoiGroup = wrapper.append("g").attr("class","voronoi-group");
            var vor=d3.voronoi().x(function(d) { return xScale(d.date); }).y(function(d) { return yScale(d.refugees); })(data).polygons();
            voronoiGroup.append("g").selectAll("path").data(vor).enter().append("path").attr("opacity",0.1).style("stroke","#242424").style("fill","none").attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; });
            
            console.clear();
        }
        else{
            d3.select(".voronoi-group").remove();
        }
         
    });
    
});