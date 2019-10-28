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
                    .force("link", d3.forceLink(links).distance(80).strength(1))
                    .alpha(0.1)
                    .alphaDecay(0.0001)
                    .on("tick", ticked);

function computeNodes(){
    node = node.data(nodes, function(d) { return d.attendee_id;})
            .join(
                enter => enter.append("circle")
                .attr("fill", "#FFC802")
                .attr("r", 10)
                .attr("id", function(d){ return d.name;})
                .attr("opacity", 0.3),
                
                update => update
                    .attr("fill", "gray")
            );
}    
computeNodes();

function computePeopleLabels(){
    label = label.data(nodes, function(d) { return d.name;})
            .join(
                enter => enter.append("text")
                .attr("id", function(d) { return "label-"+d.name.replace(/\s/g,''); })
                .attr("fill","white")
                .text(function(d) { return d.name; }),
                
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
                    .attr("stroke", "white")
                    .attr("stroke-width", 1)
                    //.style("mix-blend-mode", "multiply")
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
                                .attr("fill","white")
                                .text(function(d) { return d.reason_name; }),
                                
                                update => update
                                    .attr("fill", "gray")
                            );
}    
computeReasonLabels();

function positionLink(d) {
    return "M" + d[0].x + "," + d[0].y
         + "S" + d[1].x + "," + d[1].y
         + " " + d[2].x + "," + d[2].y;
  }

function ticked() {
    
    // node.attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; });
    node.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x + rectWidth/2; })
        .attr("y2", function(d) { return d.target.y + rectHeight/2; });

    reason.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });

    label.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y+20; });

    lblReason.attr("x", function(d) { return d.x; })
            .attr("y", function(d) { return d.y+20; });
}



var simulateReasons = d3.forceSimulation(reasons)
                            .force("x2", d3.forceX()).force("center", d3.forceCenter(-width+200,0))
                            .force("charge", d3.forceManyBody().strength(-80))
                            .alpha(0.01)
                            .alphaTarget(1)
                            .on("tick", ticked_reasons);

reason = reason.data(reasons, function(d) { return d;})
                .join(
                    enter => enter.append("rect")
                    .attr("fill", "white")
                    .attr("height", rectHeight)
                    .attr("width", rectWidth)
                    .attr("id", function(d){ return d.reason_name;}),
                    
                    update => update
                        .attr("fill", "gray")
                );
            

function ticked_reasons() {
    reason.attr("x", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
            .attr("y", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });
}

function addEntry(){
    var user_name = document.getElementById("txtName").value;
    var user_reasons = [];

    var pushToggles = document.getElementById("pushToggles");
    var tags = [];
    for (var i=0; i<pushToggles.childNodes.length; i++) {
        var child = pushToggles.childNodes[i];
        if ((child.type == "checkbox") && child.checked) {
            tags.push(child.id);      
        }
    }

    for(var i=0; i<reasons.length; i++){
        if(tags.indexOf(reasons[i].tag_id.toString()) != -1){
            user_reasons.push(reasons[i].reason_id);
            //break;
        }
    }

    var newNode = {
        attendee_id: nodes.length,
        name: user_name,
        photo: "images/"+user_name+".png",
        designation: "Product designer",
        company: 0,
        experience: 1,
        reasons: user_reasons,
        pair_freq: 0
    };

    nodes.push(newNode);

    for(var j=0; j<user_reasons.length; j++){

        var current_reason;

        for(var reason in reasons){
            if(reason == user_reasons[j]){
                current_reason = reasons[reason];
                break;
            }
        }

        links.push({source: nodes[nodes.length-1], target: current_reason});
    }

    
    
    simulatePeople.nodes(nodes);
    computeNodes();
    computeLinks();
    computePeopleLabels();
    simulatePeople.force("link", d3.forceLink(links).distance(80+linkDistance).strength(1));
    
    pairingPeople();

}


function pairingPeople(){
    var newestUser = nodes[nodes.length-1];
    var newestReasons = newestUser.reasons;
    var sortedUsers = nodes.sort(function(a, b){
                            return a["pair_freq"]-b["pair_freq"];
                        });
    var pairedArr = [];
    
    for(var n=0; n<newestReasons.length; n++){
        var newReason = newestReasons[n];
        var reasonObj = reasons.filter(reasonobj => reasonobj.reason_id == newReason);
        var newReasonName = reasonObj[0].reason_name;
        console.log(newReasonName);

        for(var p=0; p<sortedUsers.length; p++){
            var person = sortedUsers[p];

            if((person.reasons.indexOf(newReason) != -1) && 
            (newestUser.attendee_id != person.attendee_id)){
                person.pair_freq = person.pair_freq+1;
                pairedArr.push({
                    "paired_attendee_id": person.attendee_id,
                    "paired_attendee_name": person.name,
                    "paired_reason_id": newReason,
                    "paired_reason_name": newReasonName
                });

                break;
            }

        }

    }
    
    // pairedArr.forEach(function(pairedElem){
    //     console.log("Paired with "+pairedElem.paired_attendee_name+" for "+pairedElem.paired_reason_name);
    // })

}