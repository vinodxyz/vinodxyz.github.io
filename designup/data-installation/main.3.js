var dataset;
var databackup;
var jsonID = "14cwnk"

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


getData();

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
            .force("charge", d3.forceManyBody().strength(-200))
            .force("link", d3.forceLink(links).distance(20).strength(1))
            .force("x", d3.forceX())
            .force("y", d3.forceY()).force("center", d3.forceCenter())
            //.force("r", d3.forceRadial(200))
            //.alphaTarget(1)
            .on("tick", ticked);

        let g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")"),
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

    runViz();



function runViz() {

    // Apply the general update pattern to the nodes.
    console.log(links);
    node = node.data(nodes, function(d) { return d.name;});

    node.exit().transition()
        .attr("r", 0)
        .remove();

    node = node.enter().append("circle")
            .attr("fill", function(d) { if(d.type == "user"){ return "#0B24FB"} else { return "#FC0D1B"}})
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

    label.attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y+15; });

    // console.log(node.length);
    // node.each(function(d) { 
    //     if(d.name == "chocolates"){
    //         d.x = 48;
    //         d.y = -140;
    //     }
    //     //if()
    //     //w = 105 * (1 + d.depth); d.x -= (0.2 * (d.x - w)) 
    // })




    }



function updateData(){

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

    if(existingUser == undefined)
    {
        if(existingHave == undefined)
        {
            newLinks.push({source: userIndex, target: haveIndex});
            redrawLinks.push({source: user, target: have});
        }else{
            links.push({source: userIndex, target: existingHaveIndex});
            redrawLinks.push({source: user, target: existingHave});
        }

        if(existingNeed == undefined)
        {
            newLinks.push({source: userIndex, target: needIndex});
            redrawLinks.push({source: user, target: need});
        }else{
            newLinks.push({source: userIndex, target: existingNeedIndex});
            redrawLinks.push({source: user, target: existingNeed});
        }
    }else{
        if(existingHave == undefined)
        {
            newLinks.push({source: existingUserIndex, target: haveIndex});
            redrawLinks.push({source: existingUser, target: have});
        }else{
            newLinks.push({source: existingUserIndex, target: existingHaveIndex});
            redrawLinks.push({source: existingUser, target: existingHave});
        }

        if(existingNeed == undefined)
        {
            newLinks.push({source: existingUserIndex, target: needIndex});
            redrawLinks.push({source: existingUser, target: need});
        }else{
            newLinks.push({source: existingUserIndex, target: existingNeedIndex});
            redrawLinks.push({source: existingUser, target: existingNeed});
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
        success: function(data, textStatus, jqXHR){
            runViz(); 
        }
    });

      
}
