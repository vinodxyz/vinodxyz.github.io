var width = document.getElementById("ftx-viz").clientWidth;
var height = document.getElementById("ftx-viz").clientHeight;
var radius = -20;

var rectWidth = 10;
var rectHeight = 20;

// 1. Load data
var nodes = dataset.nodes;
var links = [];

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
    
            links.push({source: nodes[i].attendee_id, target: current_reason});
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
    reason = g.append("g").selectAll(".reason");


var simulatePeople = d3.forceSimulation(nodes)
                    .force("charge", d3.forceManyBody().strength(-1000))
                    .force("collide", d3.forceCollide().strength(1))
                    .force("r", d3.forceRadial(100).strength(0.1))
                    .force("link", d3.forceLink(links).distance(10).strength(1))
                    .alpha(0.1)
                    .alphaDecay(0.0001)
                    .on("tick", ticked);

    
node = node.data(nodes, function(d) { return d;}); 
function computeNodes(){
    
    node = node.enter().append("circle")
                .attr("fill", "#FFC802")
                .attr("r", 10)
                .attr("id", function(d){ return d.name;})
                .attr("opacity", 0.3)
                .merge(node);
    //simulatePeople.alpha(0.1).restart();
}

link = link.data(links, function(d) { return d; });
function computeLinks(){
    
    link = link.enter()
                .append("line")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1)
                .call(function(link) { 
                    link.transition().attr("stroke-opacity", 0.2); 
                }).merge(link);

    
}
simulatePeople.force("link").links(links);

computeNodes();
computeLinks();


function ticked() {
    // node.attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; });
    node.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x + rectWidth/2; })
        .attr("y2", function(d) { return d.target.y + rectHeight/2; });

    // reason.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
    //     .attr("cy", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });
}

var simulateReasons = d3.forceSimulation(reasons)
                            .force("x2", d3.forceX()).force("center", d3.forceCenter(-width,0))
                            .force("charge", d3.forceManyBody().strength(-30))
                            .alphaTarget(1)
                            .on("tick", ticked_reasons);

reason = reason.data(reasons, function(d) { return d;});

reason = reason.enter().append("rect")
            .attr("fill", "white")
            .attr("height", rectHeight)
            .attr("width", rectWidth)
            //.attr("opacity", 0.2)
            .attr("id", function(d){ return d.reason_name;})
            .merge(reason);

function ticked_reasons() {
    // node.attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; });
    reason.attr("x", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
        .attr("y", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });
}

function addEntry(){
    var user_name = document.getElementById("user_name").value;
    var user_reason_length =  Math.ceil(Math.random() * 8);
    var user_reasons = [];

    for(var i=0; i<user_reason_length; i++){
        user_reasons.push(Math.floor(Math.random() * reasons.length));
    }

    var newNode = {
        attendee_id: nodes.length,
        name: user_name,
        photo: "images/"+user_name+".png",
        designation: "Product designer",
        company: 0,
        experience: user_reason_length,
        reasons: user_reasons
    };

    nodes.push(newNode);
    console.log(nodes);

    for(var j=0; j<user_reason_length; j++){

        var current_reason = "";

        for(var x in reasons){
            if(x == nodes[nodes.length-1].reasons[j]){
                current_reason = reasons[x];
                break;
            }
        }

        links.push({source: nodes[nodes.length-1].attendee_id, target: current_reason});
    }

    computeNodes();
    computeLinks();
    simulatePeople.nodes(nodes);
    simulatePeople.force("link").links(links);
    
    //simulatePeople.nodes(nodes);
    

}