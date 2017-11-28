
//var w = $("#war-map").width();
//var h = 200;
//
//var svg = d3.select("#war-map").append("svg").attr("width",w).attr("height",h);
//
//var rowConverter = function(d){
//    return {
//        Year: new Date(d.Year),
//        Event: d.Event,
//        Type: d.Type,
//        Country: d.Country,
//        Magnitude: +(d.Magnitude)
//    };
//};
//
//d3.csv("../csv/war-timeline.csv", rowConverter, function(dataset){
//    
//    data = dataset.filter(function(d){ return d.Type == "Coldwar"});
//    var xScale = d3.scaleTime().domain([d3.min(data, function(d){return d.Year;}),d3.max(data, function(d){return d.Year;})]).range([100,w-100]);
//    var rScale = d3.scaleSqrt().domain(d3.extent(data, function(d) { return d.Magnitude; })).range([h/20,h/10]);
//    
//    var texture_USA = textures.lines().orientation("diagonal").size(8).strokeWidth(2).stroke("#FFFFFF").background("#B11F34");
//    svg.call(texture_USA);
//    
//    var texture_USSR = textures.lines().orientation("diagonal").size(8).strokeWidth(2).stroke("#FFFFFF").background("#FED731");
//    svg.call(texture_USSR);
//    
//    var texture_both = textures.lines().orientation("diagonal").size(8).strokeWidth(2).stroke("#FED731").background("#B11F34");
//    svg.call(texture_both);
//    
//    svg.selectAll("circle")
//        .data(data)
//        .enter()
//        .append("circle")
//        .attr("cx",function(d){ return xScale(d.Year)})
//        .attr("cy",75)
//        .transition()
//        .duration(2000)
//        .attr("r", function(d){ return rScale(d.Magnitude)})
//        .style("fill", function(d){
//            if(d.Country == "US"){
//                return texture_USA.url()
//            }else if(d.Country == "USSR"){
//                return texture_USSR.url()
//            }else{
//                return texture_both.url()
//            }
//        });
//    
//});


$(document).ready(
    function(){
        
        var coldwar = $("#coldwar-map").html();
        var middleeastwar = $("#middleeast-map").html();
        var terrorchart = $("#terrorism-chart").html();
        
        $("#coldwar-map").html(coldwar);
        $("#middleeast-map").html("");
        $("#terrorism-chart").html("");
        generateColdWarMap();
        
        $(function() {
            $.scrollify({
                section : ".scroll-section",
                offset : -50,
                before:function(index) {
                    if(index == 0){
                        $("#coldwar-map").html(coldwar);
                        $("#middleeast-map").html("");
                        $("#terrorism-chart").html("");
                        generateColdWarMap();
                    }
                    else if(index ==1){
                        $("#coldwar-map").html("");
                        $("#middleeast-map").html(middleeastwar);
                        $("#terrorism-chart").html("");
                        generateProxyWarMap();
                    }
                    else if(index ==2){
                        $("#coldwar-map").html("");
                        $("#middleeast-map").html("");
                        $("#terrorism-chart").html(terrorchart);
                        terroristAnimations();
                        
                        $("#btnReplay").click(function(){
                            terroristAnimations();
                        });
                    }
                }
            });
        });
        
    }
);




var terroristAnimations = function(){
    
        $("#btnReplay").velocity({"opacity":"0"});
        
        $("#ninth").velocity({"opacity":"0"});
        $("#ISIS").velocity({"opacity":"0"});
        $("#bkg-rect").velocity({"opacity":"0"});
        
        
        $("#eighth").velocity({"opacity":"0"});
        $("#isi-text").velocity({"opacity":"0"});
        $("#ISI-mover").velocity({"opacity":"0"});
        $("#ISI").velocity({"opacity":"0"});
        
        
        $("#seventh").velocity({"opacity":"0"});
        $("#hidding-rect2").velocity({"opacity":"0"});
        $("#US-2").velocity({"opacity":"0"});
        $("#bullets-3").velocity({"opacity":"0"});
        $("#AQI2").velocity({"opacity":"0"});
        $("#glitchy").velocity({"opacity":"0"});
        
        $("#sixth").velocity({"opacity":"0"});
        $("#AQI").velocity({"opacity":"0"});
        $("#AQI-mover1").velocity({"opacity":"0"});
        $("#aqi-text").velocity({"opacity":"0"});
        $("#rect-reveal").velocity({"opacity":"0"});
        
        
        $("#fifth").velocity({"opacity":"0"});
        $("#rect-fuller").velocity({"opacity":"0"});
        $("#jamaat-text").velocity({"opacity":"0"});
        $("#jamaat").velocity({"opacity":"0"});
        $("#jamaat-mover1").velocity({"opacity":"0"});
        
        
        $("#fourth").velocity({"opacity":"0"});
        $("#US-flag1").velocity({"opacity":"0"});
        $("#taliban-final").velocity({"opacity":"0"});
        $("#bullets-1").velocity({"opacity":"0"});
        $("#the-line").velocity({"opacity":"0"});
        
        $("#third").velocity({"opacity":"0"});
        $("#wtc").velocity({"opacity":"0"});
        $("#explode-1").velocity({"opacity":"0"});
        $("#explode-2").velocity({"opacity":"0"});
        $("#taliban-plane1").velocity({"opacity":"0"});
        $("#taliban-plane2").velocity({"opacity":"0"});
        $("#taliban-copy").velocity({"opacity":"0"});
        $("#taliban-irri").velocity({"opacity":"0"});
        
        $("#second").velocity({"opacity":"0"});
        $("#taliban").velocity({"opacity":"0"});
        $("#taliban-mover1").velocity({"opacity":"0"});
        $("#taliban-text").velocity({"opacity":"0"});
        $("#alqaeda").velocity({"opacity":"0"});
        $("#alqaeda-copy").velocity({"opacity":"0"});
        $("#alqaeda-text").velocity({"opacity":"0"});
        $("#hidding-rect").velocity({"opacity":"0"});
        
        $("#mujahideen").velocity({"opacity":"0"});
        $("#mujahideen-text").velocity({"opacity":"0"});
        $("#first-rect").velocity({"opacity":"0"});
        
        $("#first-rect").velocity({"opacity":"1"},{"delay":500});
        $("#first-rect").velocity({"width":"213 px"});
        $("#mujahideen").velocity({"opacity":"1"},{"delay":1000});
        $("#mujahideen-text").velocity({"opacity":"1"},{"delay":1000});
        
        $("#first-line1").velocity({"opacity":"0"},{"delay":1000});
        $("#first-line2").velocity({"opacity":"0"},{"delay":1000});
        $("#first-line3").velocity({"opacity":"0"},{"delay":1000});
        $("#first-line4").velocity({"opacity":"0"},{"delay":1000});
        $("#first-line5").velocity({"opacity":"0"},{"delay":1000});
        
        $("#second").velocity({"opacity":"1"},{"delay":2000});
        $("#mujahideen-copy").velocity({"translateY":"77"},{"delay":3000});
        $("#mujahideen-copy").velocity({"opacity":"0"});
        $("#taliban").velocity({"opacity":"1"},{"delay":3000});
        $("#taliban-text").velocity({"opacity":"1"},{"delay":3000});
        $("#alqaeda").velocity({"opacity":"1"},{"delay":3000});
        $("#alqaeda-text").velocity({"opacity":"1"},{"delay":3000});
        
        $("#third").velocity({"opacity":"1"},{"delay":4000});
        $("#taliban-mover1").velocity({"opacity":"1"},{"delay":5000});
        $("#taliban-mover1").velocity({"translateY":"77"});
        $("#taliban-mover1").velocity({"opacity":"0"});
        $("#taliban-copy").velocity({"opacity":"1"},{"delay":6000});
        $("#wtc").velocity({"opacity":"1"},{delay: 6000});
        $("#taliban-plane1").velocity({"opacity":1,"translateX":"205"},{"duration":1000,"delay":6000});
        $("#taliban-plane2").velocity({"opacity":1,"translateX":"225"},{"duration":1000,"delay":6000});
        $("#taliban-plane1").velocity({"opacity":"0"});
        $("#taliban-plane2").velocity({"opacity":"0"});
        $("#explode-1").velocity({"opacity":"1"},{"delay":6500});
        $("#explode-2").velocity({"opacity":"1"},{"delay":6500});
        $("#explode-1").velocity({"opacity":"0"});
        $("#explode-2").velocity({"opacity":"0"});
        $("#wtc").velocity({"opacity":"0"},{delay: 1500});
        
        $("#fourth").velocity({"opacity":"1"},{delay: 8000});
        $("#taliban-irri").velocity({"opacity":"1"},{"delay":8500});
        $("#taliban-irri").velocity({"translateY":"77"});
        $("#taliban-irri").velocity({"opacity":"0"});
        $("#taliban-final").velocity({"opacity":"1"},{"delay":9500});
        $("#US-flag1").velocity({"opacity":"0.85"},{delay: 9500});
        $("#bullets-1").velocity({"opacity":"1"},{delay: 10000});
        $("#bullets-1").velocity({"translateX":"-277","opacity":"0"},{"duration":1500});
        $("#hidding-rect").velocity({"opacity":"1"},{delay: 11500});
        $("#hidding-rect").velocity({"width":"100 px"});
        $("#the-line").velocity({"opacity":"1"},{delay: 12000});
        $("#US-flag1").velocity({"opacity":"0"},{delay: 2000});
        
        $("#fifth").velocity({"opacity":"1"},{delay: 12000});
        $("#rect-fuller").velocity({"opacity":"1"},{delay: 12500});
        $("#rect-fuller").velocity({"width":"154.6 px"});
        $("#jamaat-text").velocity({"opacity":"1"},{delay: 13000});
        $("#jamaat").velocity({"opacity":"1"},{delay: 14000});
        $("#rect-fuller").velocity({"opacity":"0"},{delay: 14500});
        $("#sec-line1").velocity({"opacity":"0"},{"delay":14500});
        $("#sec-line2").velocity({"opacity":"0"},{"delay":14500});
        $("#sec-line3").velocity({"opacity":"0"},{"delay":14500});
        $("#sec-line4").velocity({"opacity":"0"},{"delay":14500});
        $("#sec-line5").velocity({"opacity":"0"},{"delay":14500});
        
        $("#sixth").velocity({"opacity":"1"},{delay: 15000});
        $("#alqaeda-copy").velocity({"opacity":"1"},{delay: 15500});
        $("#alqaeda-copy").velocity({"translateY":"308"});
        $("#jamaat-mover1").velocity({"opacity":"1","height":"36.019 px"},{delay: 15500});
        $("#jamaat-mover1").velocity({"translateY":"75"});
        $("#rect-reveal").velocity({"opacity":"1"},{delay: 16000});
        $("#rect-reveal").velocity({"width":"215.123 px"});
        $("#alqaeda-copy").velocity({"opacity":"0"});
        $("#jamaat-mover1").velocity({"opacity":"0"});
        $("#aqi-text").velocity({"opacity":"1"},{delay: 17000});
        $("#AQI").velocity({"opacity":"1"},{delay: 17000});
        $("#AQI-mover1").velocity({"opacity":"1"},{delay: 17000});
        
        $("#seventh").velocity({"opacity":"1"},{delay: 18500});
        $("#AQI-mover1").velocity({"translateY":"76","opacity":"0"},{delay: 1000});
        $("#US-2").velocity({"opacity":"1"},{delay: 18000});
        $("#AQI2").velocity({"opacity":"1"},{delay: 18500});
        $("#bullets-3").velocity({"opacity":"1"},{delay: 19000});
        $("#bullets-3").velocity({"translateX":"-277","opacity":"0"},{"duration":1500});
        $("#hidding-rect2").velocity({"opacity":"1"},{delay: 20500});
        $("#hidding-rect2").velocity({"width":"250 px"});
        $("#US-2").velocity({"opacity":"0"},{delay: 2000});
        
        $("#eighth").velocity({"opacity":"1"},{delay: 22000});
        $("#glitchy").velocity({"opacity":"1"},{delay: 23000});
        $("#glitchy").velocity({"translateY":"77", "height":"36.05 px"});
        $("#glitchy").velocity({"opacity":"0"},{"loop":2});
        $("#glitchy").velocity({"opacity":"0"});
        $("#ISI").velocity({"opacity":"1"},{delay: 24000});
        $("#ISI").velocity({"opacity":"0"},{"loop":2});
        $("#isi-text").velocity({"opacity":"1"},{delay: 25000});
        
        
        $("#ISI-mover").velocity({"opacity":"1"},{delay: 25000});
        $("#ISI-mover").velocity({"translateY":"77","opacity":"0"},{delay: 1500});
        $("#ninth").velocity({"opacity":"1"},{delay: 27000});
        $("#ISIS").velocity({"opacity":"1", "translateX": "120"},{delay: 29000});
        $("#bkg-rect").velocity({"opacity":"1"},{delay: 27000});
        $("#bkg-rect").velocity({"width":"300 px"},{delay: 1000});
        $("#thir-line1").velocity({"opacity":"0"},{"delay":28500});
        $("#thir-line2").velocity({"opacity":"0"},{"delay":28500});
        $("#thir-line3").velocity({"opacity":"0"},{"delay":28500});
        $("#thir-line4").velocity({"opacity":"0"},{"delay":28500});
        $("#thir-line5").velocity({"opacity":"0"},{"delay":28500});
    
        $("#btnReplay").velocity({"opacity":"1"},{"delay":30000});
        $("#btnReplay").css("cursor","pointer");
    
    
}


var generateColdWarMap = function(){
    
    $("#dot-1945").velocity({"opacity":"0"});
    $("#dot-1946").velocity({"opacity":"0"});
    $("#dot-1948").velocity({"opacity":"0"});
    $("#dot-1950").velocity({"opacity":"0"});
    $("#dot-1953").velocity({"opacity":"0"});
    $("#dot-1955").velocity({"opacity":"0"});
    $("#dot-1962").velocity({"opacity":"0"});
    $("#dot-1980").velocity({"opacity":"0"});
    
    $("#line1").velocity({"opacity":"0","width":"0%"});
    $("#line2").velocity({"opacity":"0","width":"0%"});
    $("#line3").velocity({"opacity":"0","width":"0%"});
    $("#line4").velocity({"opacity":"0","width":"0%"});
    $("#line5").velocity({"opacity":"0","width":"0%"});
    $("#line6").velocity({"opacity":"0","width":"0%"});
    $("#line7").velocity({"opacity":"0","width":"0%"});
    $("#line8").velocity({"opacity":"0","width":"0%"});
    
    $("#Afghanistan1").velocity({"opacity":"0"});
    $("#Iran1").velocity({"opacity":"0"});
    $("#Vietnam1").velocity({"opacity":"0"});
    $("#NKorea1").velocity({"opacity":"0"});
    $("#SKorea1").velocity({"opacity":"0"});
    $("#China1").velocity({"opacity":"0"});
    $("#Cuba1").velocity({"opacity":"0"});
    $("#Japan1").velocity({"opacity":"0"});
    $("#France1").velocity({"opacity":"0"});
    $("#Germany1").velocity({"opacity":"0"});
    
    $("#Afghanistan-text").velocity({"opacity":"0"});
    $("#Iran-text").velocity({"opacity":"0"});
    $("#Vietnam-text").velocity({"opacity":"0"});
    $("#Korea-text").velocity({"opacity":"0"});
    $("#China-text").velocity({"opacity":"0"});
    $("#Cuba-text").velocity({"opacity":"0"});
    $("#Japan-text").velocity({"opacity":"0"});
    $("#France-text").velocity({"opacity":"0"});
    $("#Germany-text").velocity({"opacity":"0"});
    
    $("#dot-1945").velocity({"opacity":"1"},{delay: 1000});
    
    $("#dot-1946").velocity({"opacity":"1"},{delay: 3000});
    $("#line1").velocity({"opacity":"0.75","width":"100%"},{delay: 3000});
    $("#France1").velocity({"opacity":"0.85"},{delay: 3000});
    $("#France-text").velocity({"opacity":"1"},{delay: 3000});
    
    $("#Japan1").velocity({"opacity":"0.85"},{delay: 3000});
    $("#Japan-text").velocity({"opacity":"1"},{delay: 3000});
    
    $("#dot-1948").velocity({"opacity":"1"},{delay: 5000});
    $("#line2").velocity({"opacity":"0.75","width":"100%"},{delay: 5000});
    $("#Germany1").velocity({"opacity":"0.85"},{delay: 5000});
    $("#Germany-text").velocity({"opacity":"1"},{delay: 5000});
    
    $("#dot-1950").velocity({"opacity":"1"},{delay: 7000});
    $("#line3").velocity({"opacity":"0.75","width":"100%"},{delay: 7000});
    $("#NKorea1").velocity({"opacity":"0.85"},{delay: 7000});
    $("#SKorea1").velocity({"opacity":"0.85"},{delay: 7000});
    $("#Korea-text").velocity({"opacity":"1"},{delay: 7000});
    $("#China1").velocity({"opacity":"0.85"},{delay: 7000});
    $("#China-text").velocity({"opacity":"1"},{delay: 7000});
    
    $("#dot-1953").velocity({"opacity":"1"},{delay: 9000});
    $("#line4").velocity({"opacity":"0.75","width":"100%"},{delay: 9000});
    $("#Iran1").velocity({"opacity":"0.85"},{delay: 9000});
    $("#Iran-text").velocity({"opacity":"1"},{delay: 9000});
    
    $("#dot-1955").velocity({"opacity":"1"},{delay: 11000});
    $("#line5").velocity({"opacity":"0.75","width":"100%"},{delay: 11000});
    $("#Vietnam1").velocity({"opacity":"0.85"},{delay: 11000});
    $("#Vietnam-text").velocity({"opacity":"1"},{delay: 11000});
    
    $("#dot-1962").velocity({"opacity":"1"},{delay: 13000});
    $("#line6").velocity({"opacity":"0.75","width":"100%"},{delay: 13000});
    $("#Cuba1").velocity({"opacity":"0.85"},{delay: 13000});
    $("#Cuba-text").velocity({"opacity":"1"},{delay: 13000});
    
    $("#dot-1980").velocity({"opacity":"1"},{delay: 15000});
    $("#line7").velocity({"opacity":"0.75","width":"100%"},{delay: 15000});
    $("#Afghanistan1").velocity({"opacity":"0.85"},{delay: 16000});
    $("#Afghanistan-text").velocity({"opacity":"1"},{delay: 16000});
    
};


var generateProxyWarMap = function(){
    
    $("#dot-1980").velocity({"opacity":"0"});
    $("#dot-2003").velocity({"opacity":"0"});
    $("#dot-2011").velocity({"opacity":"0"});
    $("#line1a").velocity({"opacity":"0"});
    $("#line2a").velocity({"opacity":"0"});
    
    $("#ME-Iraq").velocity({"opacity":"0"});
    $("#ME-Tunisia").velocity({"opacity":"0"});
    $("#ME-Bahrain").velocity({"opacity":"0"});
    $("#ME-Libya").velocity({"opacity":"0"});
    $("#ME-Morocco").velocity({"opacity":"0"});
    $("#ME-Yemen").velocity({"opacity":"0"});
    $("#ME-Syria").velocity({"opacity":"0"});
    $("#ME-Lebannon").velocity({"opacity":"0"});
    
    $("#ME-Iraq-text").velocity({"opacity":"0"});
    $("#ME-Tunisia-text").velocity({"opacity":"0"});
    $("#ME-Bahrain-text").velocity({"opacity":"0"});
    $("#ME-Libya-text").velocity({"opacity":"0"});
    $("#ME-Morocco-text").velocity({"opacity":"0"});
    $("#ME-Yemen-text").velocity({"opacity":"0"});
    $("#ME-Syria-text").velocity({"opacity":"0"});
    $("#ME-Lebanon-text").velocity({"opacity":"0"});
    
    $("#dot-1980").velocity({"opacity":"1"},{delay: 1000});
    $("#line1a").velocity({"opacity":"1"},{delay: 1500});
    $("#dot-2003").velocity({"opacity":"1"},{delay: 2000});
    $("#ME-Iraq").velocity({"opacity":"0.85"},{delay: 1500});
    $("#ME-Iraq-text").velocity({"opacity":"1"},{delay: 1500});
    //$("#ME-Iraq-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#line2a").velocity({"opacity":"1"},{delay: 3000});
    $("#dot-2011").velocity({"opacity":"1"},{delay: 3500});
    $("#ME-Tunisia").velocity({"opacity":"0.85"},{delay: 3500});
    $("#ME-Tunisia-text").velocity({"opacity":"1"},{delay: 3500});
    //$("#ME-Tunisia-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#ME-Bahrain").velocity({"opacity":"0.85"},{delay: 5500});
    $("#ME-Bahrain-text").velocity({"opacity":"1"},{delay: 5500});
    //$("#ME-Bahrain-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#ME-Libya").velocity({"opacity":"0.85"},{delay: 7500});
    $("#ME-Libya-text").velocity({"opacity":"1"},{delay: 7500});
    //$("#ME-Libya-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#ME-Morocco").velocity({"opacity":"0.85"},{delay: 9500});
    $("#ME-Morocco-text").velocity({"opacity":"1"},{delay: 9500});
    //$("#ME-Morocco-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#ME-Yemen").velocity({"opacity":"0.85"},{delay: 11500});
    $("#ME-Yemen-text").velocity({"opacity":"1"},{delay: 11500});
    //$("#ME-Yemen-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#ME-Syria").velocity({"opacity":"0.85"},{delay: 13500});
    $("#ME-Syria-text").velocity({"opacity":"1"},{delay: 13500});
    //$("#ME-Syria-text").velocity({"opacity":"0"},{delay: 5000});
    
    $("#ME-Lebannon").velocity({"opacity":"0.85"},{delay: 15500});
    $("#ME-Lebanon-text").velocity({"opacity":"1"},{delay: 15500});
    //$("#ME-Lebanon-text").velocity({"opacity":"0"},{delay: 5000});
    
};