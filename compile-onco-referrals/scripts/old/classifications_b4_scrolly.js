var margin = {top: 50, right: 50, bottom: 50, left: 50}
var width = 1080 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom; 


var svg = d3.select("#circle-charts").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + [margin.left, margin.top] + ")")


var config = {
    radius: 5,
    gridLength: 20,
    gridPadding: 20
};
    
var defs = svg.append('defs');
var filter = defs.append('filter').attr('id','gooey');
    filter.append('feGaussianBlur')
    .attr('in','SourceGraphic')
    .attr('stdDeviation', config.radius * 1.8)
    .attr('result','blur');
    filter.append('feColorMatrix')
    .attr("class", "blurValues")
    .attr('in','blur')
    .attr('mode','matrix')
    .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ' + config.radius +' -6')
    .attr('result','gooey');
    filter.append("feBlend")
    .attr("in", "SourceGraphic")
    .attr("in2", "gooey")
    .attr("operator", "atop");


var outboundPercent = [30, 21, 14, 9, 9, 6, 3, 3, 3, 2];
var inboundPercent = [59, 32, 3, 3, 2, 1];

var outboundData =
[
    {
        "id": "outbound_1",
        "class_name": "Internal Medicine",
        "class_percent": 30
    },
    {
        "id": "outbound_2",
        "class_name": "Family Medicine",
        "class_percent": 21
    },
    {
        "id": "outbound_3",
        "class_name": "Urology",
        "class_percent": 14
    },
    {
        "id": "outbound_4",
        "class_name": "All others",
        "class_percent": 9,
        "Notes": "Acupuncturist, Advanced Practice Midwife and 104 other classifications"
    },
    {
        "id": "outbound_5",
        "class_name": "Surgery",
        "class_percent": 9
    },
    {
        "id": "outbound_6",
        "class_name": "Nurse Practitioner",
        "class_percent": 6
    },
    {
        "id": "outbound_7",
        "class_name": "Otolaryngology",
        "class_percent": 3
    },
    {
        "id": "outbound_8",
        "class_name": "Pediatrics",
        "class_percent": 3
    },
    {
        "id": "outbound_9",
        "class_name": "Obstetrics & Gynecology",
        "class_percent": 3
    },
    {
        "id": "outbound_10",
        "class_name": "Physician assistant",
        "class_percent": 2
    }
]
var inboundData = [
    {
        "id": "inbound_1",
        "class_name": "Internal Medicine",
        "class_percent": 59
    },
    {
        "id": "inbound_2",
        "class_name": "Radiology",
        "class_percent": 32
    },
    {
        "id": "inbound_3",
        "class_name": "Obstetrics & Gynecology",
        "class_percent": 3
    },
    {
        "id": "inbound_4",
        "class_name": "Pediatrics",
        "class_percent": 3
    },
    {
        "id": "inbound_5",
        "class_name": "Surgery",
        "class_percent": 2
    },
    {
        "id": "inbound_6",
        "class_name": "Anesthesiology, Dermatology, Emergency Medicine and 8 more",
        "class_percent": 1
    }
]

var area2radius = d3.scaleSqrt() // instead of scaleLinear()
  .domain([0, 100])
  .range([0, 100])

// var data = d3.range(outboundPercent.length).map(function(i) {
//   return {
//     r: area2radius(outboundPercent[i]),
//     colour: "purple"
//   }
// });

var simulationOutbound = d3.forceSimulation(outboundData)
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
    .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
    .stop()

var circleGroup = svg.append("g")
    .style("filter", "url(#gooey)");

var bigCircle = circleGroup.append("g")
    .append("circle")
    .attr("class", "big-circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", area2radius(100))
    .style("fill", "purple");

var outboundGroup = circleGroup.append("g").attr("id","outbound-group")
var outboundCircles = outboundGroup.selectAll("circle")
        .data(outboundData)
        .enter().append("circle")
        .attr("class", "outbound-circle")
        .attr("r", d => area2radius(d.class_percent))
        .attr("cx", d => d.x = width / 2)
        .attr("cy", d => d.y = height/2)
        .attr("fill", d => "purple");

        
function separateDots() { 

    transitionGooBack(2000);
    for (var i = 0; i < 120; ++i) simulationOutbound.tick(); 
  
  d3.select(".big-circle")
    .transition()
      .duration(1400)
      .attr("r", 0);    
  
  d3.selectAll(".outbound-circle")
    .transition()
    .duration(1500)
    .delay((d,i) => 500+(config.radius - calculateDistance(d, [width/2, height/2])) * 30)
    .attr("cx", (d, i) => (i % config.gridLength) * (config.gridPadding + 100))
    .attr("cy", (d, i) => Math.floor(i / config.gridLength) * (config.gridPadding + area2radius(d.class_percent) * 2));
}

function transitionGooBack(duration) {
    d3.selectAll(".blurValues")
      .transition().duration(duration)
      .attrTween("values", function() {
        return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + config.radius * 8 + " -6", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -6"); 
      }); 
}


function separateDotsReverse(){

    var finalsimulationOutbound = d3.forceSimulation(outboundData)
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
        .stop()

    d3.select("big-circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2);

    transitionGoo(2000);
    for (var i = 0; i < 120; ++i) finalsimulationOutbound.tick(); 

    d3.select(".big-circle")
        .transition()
        .delay(300)
        .duration(1200)
        .attr("r", area2radius(100));

    d3.selectAll(".outbound-circle")
        .transition()
        .duration(1500)
        .delay((d,i) => 500+(config.radius - calculateDistance(d, [width/2, height/2])) * 30)
        .attr("cx", width/2)
        .attr("cy", height/2);
        
}

function clusterDots() {
    // Interpolate between gooey filter and no gooey filter
    transitionGoo(3000);
    
    d3.select(".big-circle")
        .attr("cx",100)
        .attr("cy",height/2);

    simulationOutbound = d3.forceSimulation(outboundData)
        .force("x", d3.forceX(100))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
        .stop()

    for (var i = 0; i < 120; ++i) simulationOutbound.tick(); 
    
    d3.selectAll(".outbound-circle")
     .transition()
        .duration(1500)
      .delay((d,i) => calculateDistance(d, [100, height/2]) * 30)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y) 
    
    // d3.selectAll(".outbound-circle")
    //     .transition()
    //     .delay(1500)
    //     .attr("opacity",0)

    d3.select(".big-circle")
      .transition()
        .delay(600)
        .duration(900)
        .attr("r", area2radius(100));
}

function clusterDotsReverse() {
    transitionGooBack(3000);

    var newsimulationOutbound = d3.forceSimulation(outboundData)
    .force("x", d3.forceX(100))
    .force("y", d3.forceY(height / 2))
    .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
    .stop()

    for (var i = 0; i < 120; ++i) newsimulationOutbound.tick(); 
    
    d3.selectAll(".outbound-circle")
      .transition()
      .duration(1500)
      .delay((d,i) => 500+(config.radius - calculateDistance(d, [100, height/2])) * 30)
      .attr("cx", (d, i) => (i % config.gridLength) * (config.gridPadding + 100))
      .attr("cy", (d, i) => Math.floor(i / config.gridLength) * (config.gridPadding + area2radius(d.class_percent) * 2));

    d3.select(".big-circle")
      .transition()
        .duration(1500)
        .attr("r", area2radius(0));

    d3.select(".big-circle")
        .transition()
        .delay(1500)
        .attr("cx",width/2)
        .attr("cy",height/2);
}

function transitionGoo(duration) {
    d3.selectAll(".blurValues")
      .transition().duration(duration)
      .attrTween("values", function() {
        return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -6", 
                                                "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + config.radius * 8 + " -6"); 
      }); 
}

function calculateDistance(d, point) {
    return Math.sqrt(Math.pow(point[0] - d.x, 2) + Math.pow(point[1] - d.y, 2))
  }



function moveToRight(){
    d3.selectAll(".big-circle").transition().duration(1000).attr("cx","800");
    outboundGroup.attr("opacity",0);
    //inboundGroup.attr("transform","translate(400)");
}

function moveToLeft(){
    d3.selectAll(".big-circle").transition().duration(1000).attr("cx","100");
    inboundGroup.attr("opacity",0);
    outboundGroup.transition().delay(1000).attr("opacity",1);
}

var inboundGroup = circleGroup.append("g").attr("id","inbound-group")
var inboundCircles = inboundGroup.selectAll("circle")
                    .data(inboundData)
                    .enter().append("circle")
                    .attr("class", "inbound-circle")
                    .attr("r", d => area2radius(d.class_percent))
                    .attr("cx", d => d.x = width / 2)
                    .attr("cy", d => d.y = height/2)
                    .attr("fill", d => "purple")
                    .attr("opacity",0)


function separateDotsAgain() {    
    inboundGroup.attr("opacity",1);
    var bigCircleX = d3.select(".big-circle").attr("cx");
    var bigCircleY = d3.select(".big-circle").attr("cy");
    inboundCircles.attr("cx", d => bigCircleX).attr("cy", d => bigCircleY).attr("opacity",1);
    var simulationInbound = d3.forceSimulation(inboundData)
                                .force("x", d3.forceX(bigCircleX))
                                .force("y", d3.forceY(bigCircleY))
                                .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
                                .stop()
    transitionGooBack(2000);
    for (var i = 0; i < 120; ++i) simulationInbound.tick(); 
    d3.select(".big-circle")
        .transition()
        .duration(1400)
        .attr("r", 0);

    d3.selectAll(".inbound-circle")
        .transition()
        .duration(1500)
        .delay((d,i) => 500+(config.radius - calculateDistance(d, [bigCircleX, bigCircleY])) * 30)
        .attr("cx", (d, i) => (i % config.gridLength) * (config.gridPadding + 100))
        .attr("cy", (d, i) => Math.floor(i / config.gridLength) * (config.gridPadding + area2radius(d.class_percent) * 2));
}


function separateDotsAgainReverse() {    
    
    var bigCircleX = d3.select(".big-circle").attr("cx");
    var bigCircleY = d3.select(".big-circle").attr("cy");
    var simulationInbound = d3.forceSimulation(inboundData)
                                .force("x", d3.forceX(bigCircleX))
                                .force("y", d3.forceY(bigCircleY))
                                .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
                                .stop()
    transitionGoo(2000);
    for (var i = 0; i < 120; ++i) simulationInbound.tick(); 
    d3.select(".big-circle")
        .transition()
        .duration(700)
        .delay(800)
        .attr("r", area2radius(100));

    d3.selectAll(".inbound-circle")
        .transition()
        .duration(1500)
        .delay((d,i) => 500+(config.radius - calculateDistance(d, [bigCircleX, bigCircleY])) * 30)
        .attr("cx", d => bigCircleX)
        .attr("cy", d => bigCircleY);
}




