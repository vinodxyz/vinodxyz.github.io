var flagdata;
var countryData;

var padding=50;
var margin = {left: 10, top: 0, right: 20, bottom: -200};

var w = Math.max($("#bubble-line-chart").width(), 840) - margin.left - margin.right;
//var w = Math.min($("#timeline2-div").width(), 840) - margin.left - margin.right;
//var h = w*0.75;
var h= 500;

var warConverter = function(d){
    return {
        Index: +d.Index,
        Origin: d.Origin,
        Event: d.Event,
        Startdate: new Date(d.Startdate),
        Enddate: new Date(d.Enddate),
        Description: d.Description
    };
};

var warsvg = d3.select("#war-chart").append("svg").attr("width",w).attr("height",300);
//var warwrapper = warsvg.append("g").attr("class", "warWrapper").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var warwrapper = warsvg.append("g").attr("class", "warWrapper").attr("transform", "translate(" + margin.left + ",-260)");

d3.csv("../exodus/csv/flag-data.csv",function(data){
    flagdata = data;    
    getCountryData();
});

var getCountryData = function(){
  d3.csv("../exodus/csv/countries-involved.csv",function(data){
        countryData = data;
        generateWarChart();
    });  
};

var generateWarChart = function(){
  d3.csv("../exodus/csv/war-data.csv",warConverter,function(data){
    
//    var xScale = d3.scaleTime().domain([d3.min(data,function(d){ return d.Startdate;}),d3.max(data,function(d){ return d.Enddate;})]).range([0,w-padding*1.5]);
      
    var xScale = d3.scaleTime().domain([new Date("1961"),d3.max(data,function(d){ return d.Enddate;})]).range([0,w-padding*1.5]);
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
                    //.attr("y",function(d,i){return yScale(i);})
                    .attr("y",function(d){ return yScale(+d.Index);})
                    .attr("width",w)
                    .attr("height",barHeight)
                    //.attr("fill",function(d){return colorScale(d.Origin);})
                    .attr("fill","#F5F5F5")
                    //.attr("opacity",0.5)
                    .style("cursor","pointer")
                    .attr("class",function(d){ return d.Origin.replace(/\s+/g, '').replace(/\./g,'')+"-bkg";})
                    //.attr("class",function(d){ return d.Event.split(' ').join('').replace("&","")+"-parent";})
    
//    warwrapper.append("g").attr("class","gaxis").attr("transform","translate(0,460)").call(xAxis);
    //warwrapper.append("g").attr("class","gaxis").attr("transform","translate(100,-10)").call(yAxis);
    
    var wartextwrapper = warwrapper.append("g");
      var wartext = wartextwrapper.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(function(d){
                        if(d.Origin == "Syrian Arab Rep.")
                            return "Syria";
                        if(d.Origin == "Dem. Rep. of the Congo")
                            return "Congo";
                        if(d.Origin == "Viet Nam")
                            return "Vietnam";
                        return d.Origin;
                    })
                    .attr("x",w-10)
                    .attr("y",function(d){ return yScale(+d.Index)+5;})
                    .attr("fill",function(d){return colorScale(d.Origin);})
                    .style("pointer-events","none")
                    .style("text-anchor","end")
                    .attr("class",function(d){ 
                        return d.Origin.replace(/\s+/g, '').replace(/\./g,'')+"-wartext"+" wartextbar";
                    });
      
    var warfrontwrapper = warwrapper.append("g");
    var warchart = warfrontwrapper.selectAll("rect")
                    .data(data)
                    .enter()
                    .append("rect")
                    .attr("x",function(d){ return xScale(d.Startdate);})
                    //.attr("y",function(d,i){return yScale(i);})
                    .attr("y",function(d){ return yScale(+d.Index);})
                    .attr("width",function(d){ return xScale(d.Enddate)-xScale(d.Startdate);})
                    .attr("height",barHeight)
                    .attr("fill",function(d){return colorScale(d.Origin);})
                    .attr("opacity",0.7)
                    .style("cursor","pointer")
                    .attr("class",function(d){ 
                        return d.Event.split(' ').join('').replace("&","")+" "+d.Origin.replace(/\s+/g, '').replace(/\./g,'')+"-bar"+" warbar";
                    })
                    .on("mouseover",function(d){
                        var warRect = $(this);
                        var warClass = $(this).attr('class');
                        warClass = warClass.split(' ');
                        warClass = warClass[0];
                        
                        var warX = parseInt($(this).attr('x'));
                        var warY = parseInt($(this).attr('y'));
                        var warData = data.filter(function(d){ return (d.Event.split(' ').join('').replace("&","") == warClass);})
                        var eventCountryData = countryData.filter(function(d){ return (d.Event.split(' ').join('').replace("&","") == warClass);})
                        var forCountries = eventCountryData.filter(function(d){ return (d.Orientation == "For");})
                        var againstCountries = eventCountryData.filter(function(d){ return (d.Orientation == "Against");})
                        var forFlagImgs = "";
                        
                        for(var i=0; i<forCountries.length; i++){
                            var forFlags = flagdata.filter(function(d){ return (d.Group == forCountries[i].Involved);});
                            var flagPath = "../exodus/images/Flags/"+forFlags[0].Flag;
                            forFlagImgs = forFlagImgs+"<img title=\""+forCountries[i].Involved+"\" src=\""+flagPath+"\" height=\"15\" width=\"30\" style=\"padding-right:5px;\">";
                        }
                        
                        var againstFlagImgs = "";
                        
                        for(var i=0; i<againstCountries.length; i++){
                            var againstFlags = flagdata.filter(function(d){ return (d.Group == againstCountries[i].Involved);});
                            var flagPath = "../exodus/images/Flags/"+againstFlags[0].Flag;
                            againstFlagImgs = againstFlagImgs+"<img title=\""+againstCountries[i].Involved+"\" src=\""+flagPath+"\" height=\"15\" width=\"30\" style=\"padding-right:5px;\">";
                        }
                        
                        var warWidth = d3.select(this).attr("width");
                        
                        var warDetailColor = colorScale(warData[0].Origin);
                        var warDetailPadding = 20;
                        
                        var warToolTip = d3.select("#wartooltip").style("padding",warDetailPadding+"px");
                        var warStartDate = warData[0].Startdate.getFullYear();
                        var warEndDate = warData[0].Enddate.getFullYear();
                            
                        var warHTML = "<div class=\"container-fluid\"><div class=\"col-lg-11\"><span class=\"wartooltip-title\" style=\"color: "+warDetailColor+";\">"+warData[0].Event+"<span class=\"wartooltip-date\">&nbsp;("+warStartDate+" - "+warEndDate+")</span>"+"</span><br><span class=\"wartooltip-flags\">"+forFlagImgs+"vs&nbsp;"+againstFlagImgs+"</span><br><span class=\"wartooltip-desc\">"+warData[0].Description+"</span><br></div></div>";
                        
                        var warDetailX = ((w-warX-(warDetailPadding*2)) < 250) ? (warX-300) : warX;
                        var warDetailY = ((h-warY-(warDetailPadding*2)) < 80) ? (warY-100) : warY;
                        warDetailY = warY+50;// + $("#bubble-line-chart").height();
                        
//                        var warDetailX = warX;
//                        var warDetailY = warY+150;
                        
                        var warDetails = warToolTip.html(warHTML)
                                                    .style("position","absolute")
                                                    .style("top",warDetailY+"px")
                                                    .style("left",warDetailX+"px")
                                                    .style("pointer-events","none")
                                                    .style("opacity",0);
                        
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
                        
                        d3.select("."+warClass).raise();
                        
                        warDetails.transition()
                                    .duration(1500)
                                    .style("opacity",1);
                        
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
                            .duration(1000)
                            .style("opacity",0);
                    });
    
    

      
      
});  
};
