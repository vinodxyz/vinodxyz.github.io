var waypoint1 = new Waypoint({
    element: document.getElementById('note-1'),
    handler: function(direction) {
        if(direction=="down"){
            d3.select(".big-circle").transition().duration(800).attr("r",area2radius(100))
            bigCirclePercent.transition().delay(200).duration(800).attr("opacity",1);
            bigCircleRect.transition().delay(200).duration(800).attr("opacity",1);
            // d3.select("#outbound-group").transition().delay(1000).attr("opacity",1)
        }else{
            d3.select(".big-circle").transition().duration(300).attr("r",0)
            bigCirclePercent.transition().duration(300).attr("opacity",0);
            bigCircleRect.transition().duration(300).attr("opacity",0);
            // d3.select("#outbound-group").attr("opacity",0)
        }
    },
    offset: '75%'
  })


var waypoint2 = new Waypoint({
    element: document.getElementById('note-2'),
    handler: function(direction) {
        if(direction=="down"){

            d3.select(".big-circle").transition().duration(1400).attr("r", 0);  
            bigCirclePercent.transition().duration(300).attr("opacity",0);
            bigCircleRect.transition().duration(300).attr("opacity",0);

            outboundCirclesEmerge();
        }
        else{
            d3.select(".fixed").style("z-index",-999);
        }
    },
    offset: '75%'
  })

var waypoint2hover = new Waypoint({
    element: document.getElementById('note-2-hover'),
    handler: function(direction) {
        if(direction=="down"){
            d3.select(".fixed").style("z-index",0);
            d3.select("#note-2-hover").transition().duration(2000).style("opacity","0");
        }
        else{
            
        }
    },
    offset: '50%'
});

var waypoint3 = new Waypoint({
    element: document.getElementById('note-3'),
    handler: function(direction) {
        if(direction=="down"){
            d3.select(".fixed").style("z-index",-999);
            highlightNononco();
        }
        else{
            
        }
    },
    offset: '75%'
})

var waypoint4 = new Waypoint({
    element: document.getElementById('note-4'),
    handler: function(direction) {
        if(direction=="down"){
            highlightOnco();
        }else{
            
        }
    },
    offset: '75%'
})

var waypoint5 = new Waypoint({
    element: document.getElementById('note-5'),
    handler: function(direction) {
        if(direction=="down"){
            outboundDisappear();
        }else{
            
        }
    },
    offset: '75%'
})

var waypoint6 = new Waypoint({
    element: document.getElementById('note-6'),
    handler: function(direction) {
        if(direction=="down"){

            d3.select(".big-circle").transition().duration(1400).attr("r", 0);  
            bigCirclePercent.transition().duration(300).attr("opacity",0);
            bigCircleRect.transition().duration(300).attr("opacity",0);

            inboundCirclesEmerge();
        }else{
            
        }
    },
    offset: '75%'
})

var waypoint7 = new Waypoint({
    element: document.getElementById('note-7'),
    handler: function(direction) {
        if(direction=="down"){
            var positionY = document.getElementById("circle-charts").getBoundingClientRect().top + window.scrollY;
            d3.select("#circle-charts").attr("class","unfixed").style("top",positionY+"px");
        }else{
            
        }
    },
    offset: '100%'
})


var waypoint8 = new Waypoint({
    element: document.getElementById('map-note-1'),
    handler: function(direction) {
        if(direction=="down"){
            //var positionY = document.getElementById("idn-map").getBoundingClientRect().top + window.scrollY;
            d3.select("#idn-map").attr("class","fixed");//.style("top",positionY+"px");
            loadIDNMap("HS:ZLLO5NZLNKQ5K");
        }else{
            
        }
    },
    offset: '100%'
})