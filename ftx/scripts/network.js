
//This script mostly covers anything to do with the visualization

var width = document.getElementById("ftx-viz").clientWidth;
var height = document.getElementById("ftx-viz").clientHeight;
var radius = -20;

var rectWidth = 10;
var rectHeight = 20;
var linkDistance = 20;

// 1. Load data
var nodes = dataset.nodes;
var links = [];
var bilinks = [];

//Generate link data recursively for each node ;)
function computeLinkData(){
    for(var i=0; i<nodes.length; i++){
        for(var j=0; j<nodes[i].reasons.length; j++){
    
            var current_reason = "";
    
            for(var x in reasons){
                if(x == nodes[i].reasons[j]){
                    current_reason = reasons[x];
                    break;
                }
            }
            
            links.push({source: nodes[i], target: current_reason});
        }
    }

}


computeLinkData();


var svg = d3.select("#ftx-viz")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id", "graph");

let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").selectAll(".link"),
    node = g.append("g").selectAll(".node"),
    reason = g.append("g").selectAll(".reason"),
    label = g.append("g").selectAll(".label"),
    lblReason = g.append("g").selectAll(".label");

let line;


var simulatePeople = d3.forceSimulation(nodes)
                    .force("charge", d3.forceManyBody().strength(-1000))
                    .force("collide", d3.forceCollide().strength(1))
                    .force("r", d3.forceRadial(100).strength(1))
                    .force("link", d3.forceLink(links).strength(1))
                    .alpha(0.01)
                    .alphaDecay(0.001)
                    .on("tick", ticked);



function getRandomMark(){
    var allMarks = [1,2,3];
    return allMarks[Math.floor(Math.random() * allMarks.length)];
};

function computeNodes(){
    node = node.data(nodes, function(d) { return d.attendee_id;})
            .join(
                enter => enter.append("image")
                // .attr("fill", "#FFC802")
                // .attr("r", 10)
                .attr("href", function(d){return "data/marks/mark-"+getRandomMark()+".svg"})
                .attr("id", function(d){ return d.name;}),
                
                update => update
                    .attr("fill", "gray")
            ).call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragging)
            .on("end", dragEnded));
}    
computeNodes();

function dragStarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragEnded(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function computePeopleLabels(){
    label = label.data(nodes, function(d) { return d.name;})
            .join(
                enter => enter.append("text")
                .attr("id", function(d) { return "label-"+d.name.replace(/\s/g,''); })
                .attr("fill","white")
                .attr("font-size","12px")
                .attr("opacity","0.5")
                .text(function(d) { return properCase(d.name); }),
                
                update => update
                    .attr("fill", "gray")
            );
}    
computePeopleLabels();

function computeLinks(){

    link = link.data(links, function(d) { return d; })
                .join(
                    enter => enter.append("line")
                    .attr("fill", "none")
                    .attr("stroke", function(d){ return returnColor(d.target.reason_id);})
                    .attr("stroke-width", 1)
                    .attr("opacity", "1")
                    .attr("stroke-dasharray","2,2")
                    // .style("mix-blend-mode", "multiply")
                    .call(function(link) { 
                        link.transition().attr("stroke-opacity", 0.2); 
                    }),
                    //.attr("d", line),
                    
                    update => update
                        .attr("stroke", "gray")
                );
}
computeLinks();
simulatePeople.force("link").links(links);


function computeReasonLabels(){
    lblReason = lblReason.data(reasons, function(d) { return d.reason_name;})
                            .join(
                                enter => enter.append("text")
                                .attr("id", function(d) { return "label-"+d.reason_name.replace(/\s/g,''); })
                                .attr("fill", function(d){ return d.reason_color; })
                                .attr("opacity","0.8")
                                .text(function(d) { return properCase(d.reason_name); })
                                .attr("font-size","12px"),
                                
                                update => update
                                    .attr("fill", "gray")
                            );
}    
computeReasonLabels();

// function positionLink(d) {
//     return "M" + d[0].x + "," + d[0].y
//          + "S" + d[1].x + "," + d[1].y
//          + " " + d[2].x + "," + d[2].y;
//   }

function ticked() {
    
    node.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("transform",function(d) { return "rotate("+d.x+","+d.x+","+d.y+")"; });

    // node.attr("x", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
    //     .attr("y", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    reason.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });

    label.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y+10; });

    lblReason.attr("x", function(d) { return d.x - 25; })
            .attr("y", function(d) { return d.y + 5; });
}



var simulateReasons = d3.forceSimulation(reasons)
                            .force("x2", d3.forceX()).force("center", d3.forceCenter(-width+200,0))
                            .force("charge", d3.forceManyBody().strength(-100))
                            .alpha(0.001)
                            .alphaTarget(1)
                            .on("tick", ticked_reasons);

reason = reason.data(reasons, function(d) { return d;})
                .join(
                    enter => enter.append("circle")
                    .attr("fill", function(d){ return d.reason_color; })
                    .attr("fill-opacity", 0.1)
                    .attr("stroke", function(d){ return d.reason_color; })
                    .attr("stroke-dasharray","2,2")
                    .attr("r", 50)
                    .attr("id", function(d){ return d.reason_name;}),
                    
                    update => update
                        .attr("fill", "gray")
                );
            

function ticked_reasons() {
    reason.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
            .attr("cy", function(d) { return d.y = Math.min(height/2.5 - radius, d.y + 80); });
}


function properCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};