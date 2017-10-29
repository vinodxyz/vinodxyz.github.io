var padding2=50;
var margin2 = {left: 10, top: 30, right: 20, bottom: 0};

var w2 = Math.min($("#timeline2-div").width(), 840) - margin2.left - margin2.right;
//var h2 = w2*0.65;
var h2 = 40;
var textHeightfromMark = 10;
var t2data;

var warConverter2 = function(d){
    return {
        Year: new Date(d.Year),
        Event: d.Event,
        Type: d.Type
    };
};

d3.csv("../csv/timeline-2.csv",warConverter2,function(data){
    
    t2data = data;
    var t2svg = d3.select("#timeline2").append("svg").attr("width",w2).attr("height",h2);
    
    
    //var xScale = d3.scaleTime().domain([d3.min(data,function(d){ return d.Year;}),d3.max(data,function(d){ return d.Year;})]).range([0,w2-padding2*1.5]);
    var xScale = d3.scaleTime().domain([d3.min(data,function(d){ return d.Year;}),new Date("2016")]).range([0,w2-padding2*1.5]);
    var colorScale = d3.scaleOrdinal().range(["#242424", "#242424", "#242424"]).domain(["Coldwar","Middleeast","Terrorism"]);
    
//    var defs = t2wrapper.append("defs");
//    var linearGradient1 = defs.append("linearGradient").attr("id", "linear-gradient1");
//    linearGradient1.attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
//    linearGradient1.append("stop").attr("offset", "0%").attr("stop-color", "#032862"); 
//    linearGradient1.append("stop").attr("offset", "100%").attr("stop-color", "#FED531");
//    
//    var linearGradient2 = defs.append("linearGradient").attr("id", "linear-gradient2");
//    linearGradient2.attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%");
//    linearGradient2.append("stop").attr("offset", "0%").attr("stop-color", "#D70A16"); 
//    linearGradient2.append("stop").attr("offset", "100%").attr("stop-color", "#0B6B37");

    var xAxis = d3.axisBottom().scale(xScale);
    
    var initialType = "Coldwar";
    var markheight = 7;
    
    var t2bkgwrapper = t2svg.append("g").attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
    var t2bkg = t2bkgwrapper.selectAll("rect")
                    .data(t2data.filter(function(d){ return (d.Type == initialType);}))
                    .enter()
                    .append("rect")
                    .attr("x",0)
                    .attr("y",0)
                    .attr("width",690)
                    .attr("height",markheight)
                    .attr("fill","#F5F5F5");
    
    var t2wrapper = t2bkgwrapper.append("g").attr("class", "t2Wrapper");
    var t2chart = t2wrapper.selectAll("rect")
                    .data(t2data.filter(function(d){ return (d.Type == initialType);}))
                    .enter()
                    .append("rect")
                    .attr("x",function(d){ return xScale(d.Year);})
                    .attr("y",0)
                    .attr("width",markheight)
                    .attr("height",markheight)
                    .attr("fill",function(d){ return colorScale(d.Type);})
                    .attr("opacity",0.7)
                    .attr("class", function(d,i){
                        return "mark-"+d.Year.getFullYear();
                    })
                    .on("mouseover",function(d){
                        d3.select("."+"text-"+d.Year.getFullYear()).attr("opacity",1);
                        t2wrapper.selectAll("rect").attr("opacity",0.2);
                        d3.select(this).attr("opacity",1);
                    })
                    .on("mouseout",function(d){
                        t2wrapper.selectAll("rect").attr("opacity",0.7);
                        d3.select("."+"text-"+d.Year.getFullYear()).attr("opacity",0);
                    });
                    //.attr("class",function(d){ return d.Event.split(' ').join('').replace("&","");})
    
    var t2textwrapper =  t2wrapper.append("g");
    var t2text = t2textwrapper.selectAll("text")
                    .data(t2data.filter(function(d){ return (d.Type == "Coldwar");}))
                    .enter()
                    .append("text")
                    .text(function(d){return d.Event;})
                    .attr("x",function(d){ return xScale(d.Year);})
                    .attr("y",textHeightfromMark*-1)
                    .attr("fill",function(d){ return colorScale(d.Type);})
                    .attr("opacity",0)
                    .style("text-anchor",function(d){
                        if(d.Year.getFullYear()>=2010){
                            return "end";
                        }
                        else{
                            return "start";
                        }
                    })
                    .attr("class", function(d,i){
                        return "t2text text-"+d.Year.getFullYear();
                    });
    
    //t2wrapper.append("g").attr("class","t2axis").attr("transform","translate(0,-20)").call(xAxis);
    
    d3.select("#middleeast-p").on("click",function(){
        updateMarks("Middleeast");
    });
    
    d3.select("#terrorism-p").on("click",function(){
       updateMarks("Terrorism");
    });
    
    d3.select("#coldwar-p").on("click",function(){
       updateMarks("Coldwar");
    });
    
    var updateMarks = function(type){
        
        var marks = t2wrapper.selectAll("rect").data(t2data.filter(function(d){ return (d.Type == type);}));
        
        marks.enter()
            .append("rect")
            .attr("x",function(d){ return xScale(d.Year);})
            .attr("y",0)
            .attr("width",markheight)
            .attr("height",markheight)
            .attr("fill",function(d){ return colorScale(d.Type);})
            .attr("class", function(d,i){
                return "mark-"+d.Year.getFullYear();
            })
            .merge(marks)
            .transition()
            .duration(500)
            .attr("x",function(d){ return xScale(d.Year);})
            .attr("y",0)
            .attr("width",markheight)
            .attr("height",markheight)
            .attr("fill",function(d){ return colorScale(d.Type);})
            .attr("class", function(d,i){
                return "mark-"+d.Year.getFullYear();
            });
        
        t2textwrapper.selectAll("text").remove();
        t2textwrapper.selectAll("text")
            .data(t2data.filter(function(d){ return (d.Type == type);}))
            .enter()
            .append("text")
            .text(function(d){return d.Event;})
            .attr("x",function(d){ return xScale(d.Year);})
            .attr("y",-1*textHeightfromMark)
            .attr("fill",function(d){ return colorScale(d.Type);})
            .attr("opacity",0)
            .attr("class", function(d,i){
                return "t2text text-"+d.Year.getFullYear();
            })
            .style("text-anchor",function(d){
                if(d.Year.getFullYear()>=2010){
                    return "end";
                }
                else{
                    return "start";
                }
            });
        
        marks.exit().transition().duration(500).attr("x",0).remove();
        
        
        t2wrapper.selectAll("rect")
                .on("mouseover",function(d){
                    var textClass = d3.select(this).attr("class").replace("mark","text");
                    d3.select("."+textClass).attr("opacity",1);
                    t2wrapper.selectAll("rect").attr("opacity",0.2);
                    d3.select(this).attr("opacity",1);
                })
                .on("mouseout",function(d){
                    var textClass = d3.select(this).attr("class").replace("mark","text");
                    d3.select("."+textClass).attr("opacity",0);
                    t2wrapper.selectAll("rect").attr("opacity",0.7);
                });
        
    };

});

