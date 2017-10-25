var flagdata;
var countryData;

var padding=50;
var margin = {left: 10, top: 0, right: 20, bottom: 160};

var w = Math.min($("#bubble-line-chart").width(), 840) - margin.left - margin.right;
var h = w*0.65;

var warConverter = function(d){
    return {
        Origin: d.Origin,
        Event: d.Event,
        Startdate: new Date(d.Startdate),
        Enddate: new Date(d.Enddate),
        Description: d.Description
    };
};

var warsvg = d3.select("#war-chart").append("svg").attr("width",w).attr("height",h);
var warwrapper = warsvg.append("g").attr("class", "warWrapper").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("../csv/flag-data.csv",function(data){
    flagdata = data;    
    getCountryData();
});

var getCountryData = function(){
  d3.csv("../csv/countries-involved.csv",function(data){
        countryData = data;
        generateWarChart();
    });  
};

var generateWarChart = function(){
  d3.csv("../csv/war-data.csv",warConverter,function(data){
    
    var xScale = d3.scaleTime().domain([d3.min(data,function(d){ return d.Startdate;}),d3.max(data,function(d){ return d.Enddate;})]).range([0,w-padding]);
    var yScale = d3.scaleBand().domain(d3.range(data.length)).range([h-padding,0]);
    var colorScale = d3.scaleOrdinal()
                .range(["#EFB605", "#E58903", "#E01A25", "#C20049", "#991C71", "#66489F", "#2074A0", "#10A66E", "#7EB852", "#AAA9AA", "#5CEAEA"])
                .domain(['Rwanda', 'Syrian Arab Rep.', 'Afghanistan', 'Dem. Rep. of the Congo', 'Iraq', 'Viet Nam', 'Burundi', 'Ethiopia', 'Myanmar', 'Somalia', 'Sudan']);
    
    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft().scale(yScale);
    var barHeight = 5;
    
    var warbkgwrapper = warwrapper.append("g");
    var warbkg = warbkgwrapper.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x",0)
                    .attr("y",function(d,i){return yScale(i);})
                    .attr("width",620)
                    .attr("height",barHeight*2)
                    .attr("fill",function(d){return colorScale(d.Origin);})
                    .attr("opacity",0.1)
                    .style("cursor","pointer")
                    .attr("class",function(d){ return d.Event.split(' ').join('').replace("&","")+"-parent";})
                    .on("mouseover",function(d){
                        var warClass = $(this).attr('class').replace("-parent","");
                        d3.selectAll("."+warClass).dispatch("mouseover");
                    })
                    .on("mouseout",function(d){
                        var warClass = $(this).attr('class').replace("-parent","");
                        d3.selectAll("."+warClass).dispatch("mouseout");
                    })
    
    var warfrontwrapper = warwrapper.append("g");
    var warchart = warfrontwrapper.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x",function(d){ return xScale(d.Startdate);})
                    .attr("y",function(d,i){return yScale(i);})
                    .attr("width",function(d){ return xScale(d.Enddate)-xScale(d.Startdate);})
                    .attr("height",barHeight)
                    .attr("fill",function(d){return colorScale(d.Origin);})
                    .attr("opacity",0.7)
                    .style("cursor","pointer")
                    .attr("class",function(d){ return d.Event.split(' ').join('').replace("&","");})
                    .on("mouseover",function(d){
                        var warRect = $(this);
                        var warClass = $(this).attr('class');
                        var warX = parseInt($(this).attr('x'));
                        var warY = parseInt($(this).attr('y'));
                        var warData = data.filter(function(d){ return (d.Event.split(' ').join('').replace("&","") == warClass);})
                        var eventCountryData = countryData.filter(function(d){ return (d.Event.split(' ').join('').replace("&","") == warClass);})
                        var forCountries = eventCountryData.filter(function(d){ return (d.Orientation == "For");})
                        var againstCountries = eventCountryData.filter(function(d){ return (d.Orientation == "Against");})
                        
                        var forFlagImgs = "";
                        
                        for(var i=0; i<forCountries.length; i++){
                            var forFlags = flagdata.filter(function(d){ return (d.Group == forCountries[i].Involved);});
                            var flagPath = "../images/Flags/"+forFlags[0].Flag;
                            forFlagImgs = forFlagImgs+"<img title=\""+forCountries[i].Involved+"\" src=\""+flagPath+"\" height=\"15\" width=\"30\" style=\"padding-right:5px;\">";
                        }
                        
                        var againstFlagImgs = "";
                        
                        for(var i=0; i<againstCountries.length; i++){
                            var againstFlags = flagdata.filter(function(d){ return (d.Group == againstCountries[i].Involved);});
                            var flagPath = "../images/Flags/"+againstFlags[0].Flag;
                            againstFlagImgs = againstFlagImgs+"<img title=\""+againstCountries[i].Involved+"\" src=\""+flagPath+"\" height=\"15\" width=\"30\" style=\"padding-right:5px;\">";
                        }
                        
                        
                        
                        var warWidth = d3.select(this).attr("width");
                        
                        var warDetailColor = colorScale(warData[0].Origin);
                        var warDetailPadding = 20;
                        
                        var warToolTip = d3.select("#wartooltip").style("padding",warDetailPadding+"px");
                        
                        var warHTML = "<div class=\"container-fluid\"><div class=\"col-lg-12\"><span class=\"wartooltip-title\" style=\"color: "+warDetailColor+";\">"+warData[0].Event+"</span><br><span>"+forFlagImgs+""+againstFlagImgs+"</span><br><span class=\"wartooltip-desc\">"+warData[0].Description+"</span><br></div></div>";
                        
                        var warDetailX = ((w-warX-(warDetailPadding*2)) < 250) ? (warX-300) : warX;
                        var warDetailY = ((h-warY-(warDetailPadding*2)) < 80) ? (warY-100) : warY;
                            
                        var warDetails = warToolTip.html(warHTML).style("position","absolute").style("top",warY+"px").style("left",warDetailX+"px").style("pointer-events","none").style("opacity",0);
                        
                        var warDetailHeight = +(warDetails.style("height").replace("px",""));
                        var warDetailWidth = +(warDetails.style("width").replace("px",""));
                        
                        d3.select("."+warClass)
                            
                            .transition()
                            .duration(1000)
                        .attr("x",warDetailX)
                            //.attr("y",warDetailY)
                            .attr("width",warDetailWidth)
                            .attr("fill",function(d){return "#242424";})
                            .attr("opacity",1)
                            
                            .attr("height",warDetailHeight);
                        
                        warDetails.transition().duration(1500).style("opacity",1);
                        
                    })
                    .on("mouseout",function(d){
                        
                        d3.select(this)
                            .transition().delay(200)
                            .duration(1000)
                            .attr("opacity",0.7)
                            .attr("x",function(d){ return xScale(d.Startdate);})
                            //.attr("y",function(d,i){return yScale(i);})
                            .attr("fill",function(d){return colorScale(d.Origin);})
                            .attr("height",barHeight)
                            .attr("width",function(d){ return xScale(d.Enddate)-xScale(d.Startdate);});
                        
                        d3.select("#wartooltip")
                            .transition()
                            .duration(500)
                            .style("opacity",0);
                    })
    
    
//    warwrapper.append("g").attr("class","gaxis").attr("transform","translate(0,50)").call(xAxis);
//    warwrapper.append("g").attr("class","gaxis").attr("transform","translate(100,-10)").call(yAxis);
    
    
});  
};