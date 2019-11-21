
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
                        .force("link", d3.forceLink(links).distance(10).strength(1))
                        .force("x", d3.forceX()).force("center", d3.forceCenter(0,0))
                        .force("y", d3.forceY()).force("center", d3.forceCenter(0,0))
                        .force("collide", d3.forceCollide().strength(1))
                        .force("r", d3.forceRadial(100).strength(1.0))
                        .alphaTarget(0)
                        .on("tick", ticked);

simulatePeople.force("link").links(links);

var simulateReasons = d3.forceSimulation(reasons)
                            .force("x2", d3.forceX()).force("center2", d3.forceCenter(-width+200,0))
                            .force("charge2", d3.forceManyBody().strength(-1000))
                            .force("collide2", d3.forceCollide().strength(50))
                            .alphaTarget(0)
                            .on("tick", ticked_reasons);

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
                .attr("id", function(d){ return "nodeppl-"+d.attendee_id;})
                .attr("class","people-node")
                .style("cursor", "pointer"),
                
                update => update
                    .attr("fill", "gray")
            ).call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragging)
            .on("end", dragEnded))
            .on("mouseover", showWho)
            .on("mouseout", hideWho);
}  

computeNodes();


//Show the user on a tooltip

function showWho() {

    //Hide all the rest:
    $(".people-label").attr("opacity","0.1");
    $(".people-node").attr("opacity","0.3");
    $("#"+this.id).attr("opacity","1");

    $("#viz-tooltip").show();
    var tooltip = $("#viz-tooltip");
    tooltip.css("position","absolute");
    tooltip.css("left",width/2 + this.x.animVal.value + 30);
    tooltip.css("top", height/2 + this.y.animVal.value + 60);

    var user = getUserbyId(this.id.replace("nodeppl-",""));

    $(".vt-photo").attr("src",user[0].photo);
    $(".vt-name").text(properCase(user[0].name));
    $(".vt-role").text(user[0].designation + " , " + user[0].company);

    var i = 1;
    var div = document.getElementById("vt-tags");
    div.innerHTML = "";

    for(var reason in user[0].reasons){
        
        if(i==4){
            var jug = document.createElement("div");
            jug.id = "jug"
            div.appendChild(jug);
            $("#jug").text(".");
            $("#jug").css("opacity","0")
        }

        var span = document.createElement("span");
        span.id = "vt-tag"+i;
        div.appendChild(span);

        $("#vt-tag"+i).addClass("vt-tag");
        $("#vt-tag"+i).text(getReasonbyId(reason)[0].reason_name);
        $("#vt-tag"+i).attr("style","border-bottom: 2px solid "+ getReasonbyId(reason)[0].reason_color +";")

        i++;
    }

}


function hideWho(){

    $(".people-label").attr("opacity","0.3");
    $(".people-node").attr("opacity","1");

    $("#viz-tooltip").hide();

    $(".vt-photo").attr("src","");
    $(".vt-name").text("");
    $(".vt-role").text("");
    document.getElementById("vt-tags").innerHTML = "";

}

function dragStarted(d) {
    if (!d3.event.active){
        simulatePeople.alphaTarget(0.3).restart();
        simulateReasons.alphaTarget(0.3).restart();
    } 
    d.fx = d.x;
    d.fy = d.y;
}

function dragging(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragEnded(d) {
    if (!d3.event.active){
        simulatePeople.alphaTarget(0);
        simulateReasons.alphaTarget(0);
    }
    d.fx = null;
    d.fy = null;
}

function computePeopleLabels(){
    label = label.data(nodes, function(d) { return d.name;})
            .join(
                enter => enter.append("text")
                .attr("id", function(d) { return "lblppl-"+d.attendee_id; })
                .attr("class","people-label")
                .attr("fill","white")
                .attr("font-size","12px")
                .attr("opacity","0.3")
                .style("user-select","none")
                .text(function(d) { return properCase(d.name).split(' ')[0]; }),
                
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
        //.attr("transform",function(d) { return "rotate("+d.x+","+d.x+","+d.y+")"; });

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


function getUserbyId(attendeeid){
    var user = nodes.filter(function(item){
                                return item.attendee_id == attendeeid;
                            });

    return user;
}

function getUserDesignation(name){
    var user = razorpay_staff.filter(function(item){
                                    return item.name.replace(/[^A-Z0-9]/ig, "_").toLowerCase().replace(" ","") == name.replace(/[^A-Z0-9]/ig, "_").toLowerCase().replace(" ","");
                                });

    return user[0].designation;
}


function getReasonbyId(reasonid){
    var reason = reasons.filter(function(item){
                                return item.reason_id == reasonid;
                            });

    return reason;
}


var circledotted;

function highlightPeople(attendeeid){


    //0. add a circle around / very loudly callout the user who just interacted -- done
    //1. highlight the user as well as the people paired with
    //2. highlight the links + animate them, if possible
    //3. after a time-limit, kill this
    
    $(".people-node").attr("opacity","0.1");
    $(".people-label").attr("opacity","0");
    
    var nodeppl = $("#nodeppl-"+attendeeid);
    $("#nodeppl-"+attendeeid).attr("opacity","1");
    $("#lblppl-"+attendeeid).attr("opacity","0.3");

    var nodecircle = $("#node-circle");
    nodecircle.show();
    nodecircle.css("position","absolute");

    circledotted = setInterval(function(){
                        nodecircle.css("left",width/2 + nodeppl[0].x.animVal.value);
                        nodecircle.css("top", height/2 + nodeppl[0].y.animVal.value + 50);
                    }, 1);

    var newUser = getUserbyId(attendeeid)
    var newUser_pairs = newUser[0].paired_with;

    for(var i=0; i<newUser_pairs.length; i++){
        $("#nodeppl-" + newUser_pairs[i]).attr("opacity","1");
        $("#lblppl-" + newUser_pairs[i]).attr("opacity","0.3");
    }

    
}



function resetHighlightPeople(){
    
    var nodecircle = $("#node-circle");

    nodecircle.hide();
    $(".people-node").attr("opacity","1");
    $(".people-label").attr("opacity","0.3");
    clearInterval(circledotted);

}