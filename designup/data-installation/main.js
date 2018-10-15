    
var width = $(window).width();
var height = $(window).height();

var svg = d3.select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

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
    .force("link", d3.forceLink(links).distance(200))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    .alphaTarget(1)
    .on("tick", ticked);

var g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
    link = g.append("g").attr("stroke", "#000").attr("stroke-width", 1.5).selectAll(".link"),
    node = g.append("g").attr("stroke", "#fff").attr("stroke-width", 1.5).selectAll(".node");
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

loadViz();



function loadViz() {

  // Apply the general update pattern to the nodes.
  node = node.data(nodes, function(d) { return d.name;});

  node.exit().transition()
      .attr("r", 0)
      .remove();

  node = node.enter().append("circle")
        .attr("fill", function(d) { if(d.type == "user"){ return "blue"} else { return "red"}})
            .call(function(node) { node.transition().attr("r", 8); })
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

  link = link.enter().append("line")
             .call(function(link) { link.transition().attr("stroke-opacity", 1); })
             .merge(link);

  // Update and restart the simulation.
  simulation.nodes(nodes);
  simulation.force("link").links(links);
  simulation.alpha(1).restart();
}

function ticked() {
  node.attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; })

  link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });

      label
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y+15; });
}

function updateData(){

    var userExists = 0;
    var haveExists = 0;
    var needExists = 0;

    var existingUser;
    var existingHave;
    var existingNeed;

    var user = {name: $("#txtUsername").val(), type: "user"};
    var have = {name: $("#txtHave").val(), type: "thing" };
    var need = {name: $("#txtNeed").val(), type: "thing" };
    
    for(var k=0; k<dataset.nodes.length; k++){
        if(user.name == dataset.nodes[k].name){
            userExists = 1; 
            existingUser = dataset.nodes[k];
        }

        if(have.name == dataset.nodes[k].name){
            haveExists = 1;
            existingHave = dataset.nodes[k];
        }

        if(need.name == dataset.nodes[k].name){
            needExists = 1;
            existingNeed = dataset.nodes[k];
        }
    }


    if(userExists != 1){
        nodes.push(user);
    }
    if(haveExists != 1){
        nodes.push(have);
    }
    if(needExists != 1){
        nodes.push(need);
    }

    if(existingUser == undefined)
    {
        if(existingHave == undefined)
        {
            links.push({source: user, target: have});
        }else{
            links.push({source: user, target: existingHave});
        }

        if(existingNeed == undefined)
        {
            links.push({source: user, target: need});
        }else{
            links.push({source: user, target: existingNeed});
        }
    }else{
        if(existingHave == undefined)
        {
            links.push({source: existingUser, target: have});
        }else{
            links.push({source: existingUser, target: existingHave});
        }

        if(existingNeed == undefined)
        {
            links.push({source: existingUser, target: need});
        }else{
            links.push({source: existingUser, target: existingNeed});
        }
    }

    dataset.nodes = nodes;
    dataset.edges = links;
    loadViz();   
}




function onInitFs(fs) {

    fs.root.getFile('log.txt', {create: true}, function(fileEntry) {
  
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function(fileWriter) {
  
        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
        };
  
        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e.toString());
        };
  
        // Create a new Blob and write it to log.txt.
        var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
  
        fileWriter.write(blob);
  
      }, errorHandler);
  
    }, errorHandler);
  
  }
  
  window.requestFileSystem(window.TEMPORARY, 1024*1024, onInitFs, errorHandler);