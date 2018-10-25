$("#list-view").hide();

var dataset;
var databackup;
var jsonID = "rw6es"

function getData(){
    $.ajax({
        async: false,
        type: 'GET',
        url: 'https://api.myjson.com/bins/'+jsonID,
        success: function(data) {
            dataset = data;
            databackup = JSON.parse(JSON.stringify(data));
        }
    });
}

//Should be similar to a hard reset:
function resetView(){
    $("#list-view").hide();
    $("#input-form").show();
    $("#txtUsername").val("");
    $("#txtHave").val("");
    $("#txtNeed").val("");
    $("#txtSearchUser").val("");

    d3.selectAll(".user").attr("opacity","1");
    d3.selectAll(".thing").attr("opacity","0.3");
    d3.selectAll(".link-have").attr("opacity","0.3");
    d3.selectAll(".link-need").attr("opacity","0.3");
    d3.selectAll(".link-need").attr("opacity","0.3");
    d3.selectAll(".nodelabel").attr("opacity","0.3");
}

getData();

        var width = $("#network-viz").width();
        var height = $(window).height();
        var radius = -10;

        var svg = d3.select("#network-viz")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id","network-viz");

        color = d3.scaleOrdinal(d3.schemeCategory10);

        var nodes = [];
        var links = [];

        for(var i=0; i<dataset.nodes.length; i++){
            nodes.push(dataset.nodes[i]);
        }

        for(var j=0; j<dataset.edges.length; j++){
            links.push(dataset.edges[j]);
        }

        var simulation = d3.forceSimulation(nodes)
            .force("charge", d3.forceManyBody().strength(-1000))
            .force("link", d3.forceLink(links).distance(20).strength(1))
            .force("x", d3.forceX()).force("center", d3.forceCenter(0,0))
            .force("y", d3.forceY()).force("center", d3.forceCenter(0,0))
            .force("collide", d3.forceCollide().strength(1))
            .force("r", d3.forceRadial(100).strength(0.3))
            .alphaTarget(0.2)
            .on("tick", ticked);

        let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
            link = g.append("g").selectAll(".link"),
            node = g.append("g").selectAll(".node");
            label = g.append("g").attr("fill", "black").selectAll(".label");

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

    runViz();



function runViz() {
    // Apply the general update pattern to the nodes.
    node = node.data(nodes, function(d) { return d.name;});

    node.exit().transition()
        .attr("r", 0)
        .remove();

    node = node.enter().append("circle")
            .attr("fill", function(d) { if(d.type == "user"){ return "#FFC802"} else { return "#C8037D"}})
            .attr("class", function(d) { return d.type; })
                .call(function(node) { node.transition().attr("r", function(d){
                    if(d.type == "user") { 
                        return 5;
                    }
                    else {
                        var radius = 0;
                        for(var i=0; i<links.length; i++){
                            if(links[i].target.name == d.name){
                                radius++;
                            }
                        }
                        return radius*4;
                    }
                }); })
                .merge(node)
                .call(d3.drag()
                .on("start", dragStarted)
                .on("drag", dragging)
                .on("end", dragEnded));

        label = label.data(nodes, function(d) { return d.name;});

        label = label
            .enter().append("text")
            .attr("class","nodelabel")
            .text(function(d) { return d.name; })
            .merge(label)
            .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragging)
            .on("end", dragEnded));


    // Apply the general update pattern to the links.
    link = link.data(links, function(d) { return d.source.name + "-" + d.target.name; });

    // Keep the exiting links connected to the moving remaining nodes.
    link.exit().transition()
        .attr("stroke-opacity", 0)
        .attrTween("x1", function(d) { return function() { return d.source.x; }; })
        .attrTween("x2", function(d) { return function() { return d.target.x; }; })
        .attrTween("y1", function(d) { return function() { return d.source.y; }; })
        .attrTween("y2", function(d) { return function() { return d.target.y; }; })
        .remove();

    link = link.enter()
                .append("line")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1)
                .attr("class", function(d) { return "link-"+d.status; })
                .attr("stroke-dasharray",function(d){ if(d.status == "need"){ return 2;}})
                .call(function(link) { 
                    link.transition().attr("stroke-opacity", 0.75); 
                }).merge(link);

    // Update and restart the simulation.
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();

    autoCompleteUser();
    }

    function ticked() {
    // node.attr("cx", function(d) { return d.x; })
    //     .attr("cy", function(d) { return d.y; });
    node.attr("cx", function(d) { return d.x = Math.max(Math.max(-1*width/2 - radius*4, d.x), Math.min(width/2 - radius, d.x)); })
        .attr("cy", function(d) { return d.y = Math.max(Math.max(-1*height/2 - radius, d.y), Math.min(height/2 - radius, d.y)); });

    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    label.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y+15; });

    // node.each(function(d) { 
    //     if(d.name == "chocolates"){
    //         d.x = 48;
    //         d.y = -140;
    //     }
    //     //if()
    //     //w = 105 * (1 + d.depth); d.x -= (0.2 * (d.x - w)) 
    // })

    //node.each(function(d){  if(d.name == "chocolates"){ d.x=0; d.y=0;}})
    // node.attr("fx",function(d){ if(d.name == "chocolates"){ return 0;}});
    // node.attr("fy",function(d){ if(d.name == "chocolates"){ return 0;}});

    $("#btnAddUser").removeClass("disabled");

    // $("#txtUsername").val("");
    // $("#txtHave").val("");
    // $("#txtNeed").val("");


}



function updateData(){

    $("#btnAddUser").addClass("disabled");
    var newNodes = databackup.nodes;
    var newLinks = databackup.edges;

    var redrawNodes = dataset.nodes;
    var redrawLinks = dataset.edges;

var userExists = 0;
    var haveExists = 0;
    var needExists = 0;

    var existingUser, existingUserIndex, userIndex;
    var existingHave, existingHaveIndex, haveIndex;
    var existingNeed, existingNeedIndex, needIndex;

    var user = {name: $("#txtUsername").val(), type: "user"};
    var have = {name: $("#txtHave").val(), type: "thing" };
    var need = {name: $("#txtNeed").val(), type: "thing" };
    
    for(var k=0; k<databackup.nodes.length; k++){
        if(user.name == databackup.nodes[k].name){
            userExists = 1; 
            //Changed to dataset 
            existingUser = dataset.nodes[k];
            existingUserIndex = k;
        }

        if(have.name == databackup.nodes[k].name){
            haveExists = 1;
            existingHave = dataset.nodes[k];
            existingHaveIndex = k;
        }

        if(need.name == databackup.nodes[k].name){
            needExists = 1;
            existingNeed = dataset.nodes[k];
            existingNeedIndex = k;
        }
    }

    if(userExists != 1){
        newNodes.push(user);
        redrawNodes.push(user);
        userIndex = newNodes.length-1;
    }
    if(haveExists != 1){
        newNodes.push(have);
        redrawNodes.push(have);
        haveIndex = newNodes.length-1;
    }
    if(needExists != 1){
        newNodes.push(need);
        redrawNodes.push(need);
        needIndex = newNodes.length-1;
    }


    //This code logic is quite unoptimised. Wrote it during the first few days, to test a few things.
    if(existingUser == undefined)
    {

        if(existingHave == undefined)
        {
            newLinks.push({source: userIndex, target: haveIndex, status: "have"});
            redrawLinks.push({source: user, target: have, status: "have"});
        }else{
            newLinks.push({source: userIndex, target: existingHaveIndex, status: "have"});
            redrawLinks.push({source: user, target: existingHave, status: "have"});
        }

        if(existingNeed == undefined)
        {
            newLinks.push({source: userIndex, target: needIndex, status: "need"});
            redrawLinks.push({source: user, target: need, status: "need"});
        }else{
            newLinks.push({source: userIndex, target: existingNeedIndex, status: "need"});
            redrawLinks.push({source: user, target: existingNeed, status: "need"});
        }
    }else{
        if(existingHave == undefined)
        {
            newLinks.push({source: existingUserIndex, target: haveIndex, status: "have"});
            redrawLinks.push({source: existingUser, target: have, status: "have"});
        }else{
            newLinks.push({source: existingUserIndex, target: existingHaveIndex, status: "have"});
            redrawLinks.push({source: existingUser, target: existingHave, status: "have"});
        }

        if(existingNeed == undefined)
        {
            newLinks.push({source: existingUserIndex, target: needIndex, status: "need"});
            redrawLinks.push({source: existingUser, target: need, status: "need"});
        }else{
            newLinks.push({source: existingUserIndex, target: existingNeedIndex, status: "need"});
            redrawLinks.push({source: existingUser, target: existingNeed, status: "need"});
        }
    }

    databackup.nodes = newNodes;
    databackup.edges = newLinks;

    nodes = redrawNodes;
    links = redrawLinks;

    $.ajax({
        url:"https://api.myjson.com/bins/"+jsonID,
        type:"PUT",
        data:JSON.stringify(databackup),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(){
            runViz(); 
            moveUserToCenter(user.name);
        }
    });
      
}


function moveUserToCenter(name) {
    
    for(var i=0; i<links.length; i++){
        if(links[i].source.name == name){
            if(links[i].status == "have"){
                simulation.force("have", isolate(d3.forceX(-width/2), function(d) { return d.name === links[i].target.name; }))
            }
            if(links[i].status == "need"){
                simulation.force("need", isolate(d3.forceX(width/2), function(d) { return d.name === links[i].target.name; }))
            }
        }
    }

    simulation.force('x', d3.forceX().strength(function(d){
        if(d.name == name){
            return 2.5;
        }  else{
            return 0.1;
        }
    }));

    simulation.force('y', d3.forceY().strength(function(d){
        if(d.name == name){
            return 2.5;
        }  else{
            return 0.1;
        }
    }));

    $("#input-form").hide();
    $("#list-view").show();

    listViz(name);
    simulation.alpha(0.1).restart();

    setTimeout(function(){
        $("#input-form").show();
        $("#list-view").hide();
        moveUserToCenter("");
        $("#txtSearchUser").val("");
    },1500000);//change this: remove 2 zeroes

  }



function moveSkillToCenter(name) {

    simulation.force('x', d3.forceX().strength(function(d){
        if(d.name == name){
            return 2.5;
        }  else{
            return 0.1;
        }
    }));

    simulation.force('y', d3.forceY().strength(function(d){
        if(d.name == name){
            return 2.5;
        }  else{
            return 0.1;
        }
    }));

    //listViz(name);
    simulation.alpha(0.1).restart();
    setTimeout(function(){moveSkillToCenter("")},15000);

  }


  function isolate(force, filter) {
    var initialize = force.initialize;
    force.initialize = function() { initialize.call(force, nodes.filter(filter)); };
    return force;
  }

  //setTimeout(function(){setInterval(function(){simulation.alpha(0.5).restart()}, 10000)},10000);


  //To help with autocomplete of a user
  //btw refer to: http://easyautocomplete.com/guide
  function autoCompleteUser(){
    var searchUserOptions = [];

    for(var k=0; k<nodes.length; k++){
        if(nodes[k].type == "user"){
          searchUserOptions.push(nodes[k].name);
        }
    } 
  
  
    var options = {
      data: searchUserOptions,
      list: {
          match: {
              enabled: true
          },
          onClickEvent: function() {
              moveUserToCenter($("#txtSearchUser").val());
          }	
      }
  };
  
    $("#txtSearchUser").easyAutocomplete(options);
  }

  autoCompleteUser();


//Add a bit of visuals: Thanks to Nadieh's code
//source: https://www.visualcinnamon.com/2016/06/glow-filter-d3-visualization
var defs = svg.append("defs");
var filter = defs.append("filter")
    .attr("id","glow");
filter.append("feGaussianBlur")
    .attr("stdDeviation","1.8")
    .attr("result","coloredBlur");

var feMerge = filter.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in","coloredBlur");
feMerge.append("feMergeNode")
    .attr("in","SourceGraphic");

d3.selectAll("circle").style("filter", "url(#glow)");

//Gradients for nodes

var lgUser = defs.append("linearGradient")
    .attr("id", "linear-gradient-user");

lgUser
    .attr("x1", "30%")
    .attr("y1", "30%")
    .attr("x2", "70%")
    .attr("y2", "70%");

lgUser.append("stop")
.attr("offset", "0%")
.attr("stop-color", "#FFC802");

lgUser.append("stop")
.attr("offset", "100%")
.attr("stop-color", "#CE9E06");

var lgThing = defs.append("linearGradient")
    .attr("id", "linear-gradient-thing");

lgThing
    .attr("x1", "30%")
    .attr("y1", "30%")
    .attr("x2", "70%")
    .attr("y2", "70%");

lgThing.append("stop")
.attr("offset", "0%")
.attr("stop-color", "#C8037D");

lgThing.append("stop")
.attr("offset", "100%")
.attr("stop-color", "#931168");

d3.selectAll(".user").style("fill", "url(#linear-gradient-user)");
d3.selectAll(".thing").style("fill", "url(#linear-gradient-thing)");

//Moving gradient for links:
//Four different colors
var lgcolours = ["#FFC802", "#F9D667", "#F964C7", "#C8037D"];
var lgAnimate = defs.append("linearGradient")
    .attr("id","animate-gradient")
    .attr("x1","0%")
    .attr("y1","0%")
    .attr("x2","100%")
    .attr("y2","0")
    .attr("spreadMethod", "reflect");

lgAnimate.selectAll(".stop")
    .data(lgcolours)
    .enter().append("stop")
    .attr("offset", function(d,i) { return i/(lgcolours.length-1); })
    .attr("stop-color", function(d) { return d; });

lgAnimate.append("animate")
    .attr("attributeName","x1")
    .attr("values","0%;200%") //let x1 run to 200% instead of 100%
    .attr("dur","7s")
    .attr("repeatCount","indefinite");

lgAnimate.append("animate")
    .attr("attributeName","x2")
    .attr("values","100%;300%") //let x2 run to 300% instead of 200%
    .attr("dur","7s")
    .attr("repeatCount","indefinite");

d3.selectAll(".link-have").style("stroke", "url(#animate-gradient)");
d3.selectAll(".link-need").style("stroke", "url(#animate-gradient)");

//Generate need and have list for a user's name:
function listViz(name){

    var have, need;
    var havelist = [];
    var needlist = [];

    for(var i=0; i<links.length; i++){
        if(links[i].source.name == name){
            if(links[i].status == "have"){
                have = links[i].target.name;
            }
            if(links[i].status == "need"){
                need = links[i].target.name;
            }
        }
    }

    for(var i=0; i<links.length; i++){
        if((links[i].target.name == have) && (links[i].status == "need")){
            havelist.push(links[i].source.name);
        }
        if((links[i].target.name == need) && (links[i].status == "have")){
            needlist.push(links[i].source.name);
        }
    }

    var havePeople="", needPeople="";

    for(var i=0; i<havelist.length; i++){
        havePeople = havePeople + "<li>"+havelist[i]+"</li>";
    }

    for(var i=0; i<needlist.length; i++){
        needPeople = needPeople + "<li>"+needlist[i]+"</li>";
    }
    
    if(needlist.length != 0){
        d3.select("#have-header").html(needlist.length+" folks can help "+name+" with "+need+":");
    }else{
        d3.select("#have-header").html("Apologies! Looks like no one here can help with "+need+".");
    }

    if(havelist.length != 0){
        d3.select("#need-header").html("While, "+havelist.length+" folks would love to get help with "+have+" from "+name+":");
    }else{
        d3.select("#need-header").html("Apologies! Looks like no one here can help with "+have+".");
    }
    
    d3.select("#have-list").html(needPeople);
    d3.select("#need-list").html(havePeople);
}


//Let's autocomplete needs and haves:
function autoCompleteSkills(){
    var searchSkillOptions = [];

    for(var k=0; k<nodes.length; k++){
        if(nodes[k].type == "thing"){
            searchSkillOptions.push(nodes[k].name);
        }
    } 
  
  
    var options = {
      data: searchSkillOptions,
      list: {
          match: {
              enabled: true
          },
          onClickEvent: function() {
              //add code here to highlight the respective skill in the diagram: moving bubble around + opacity changes
          }	
      }
  };
  
    $("#txtHave").easyAutocomplete(options);
  }


  //Function to highlight nodes:
  function highlightNode(name){

    d3.selectAll(".user").attr("opacity","0.3");
    d3.selectAll(".thing").attr("opacity","0.3");
    d3.selectAll(".link-have").attr("opacity","0.3");
    d3.selectAll(".link-need").attr("opacity","0.3");
    d3.selectAll(".link-need").attr("opacity","0.3");
    d3.selectAll(".nodelabel").attr("opacity","0.3");

    d3.selectAll("#"+name).attr("opacity","1");

  }