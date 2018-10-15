function loadVisualization(){
    
    d3.select("svg").remove();
    
    var w = $(window).width();
    var h = $(window).height()/2;

    var force = d3.forceSimulation(dataset.nodes)
                    .force("charge", d3.forceManyBody())
                    .force("link", d3.forceLink(dataset.edges))
                    .force("center", d3.forceCenter().x(w/2).y(h/2));

    var colors = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var edges = svg.selectAll("line")
                    .data(dataset.edges)
                    .enter()
                    .append("line")
                    .style("stroke", "#ccc")
                    .style("stroke-width", 1);

    var nodes = svg.selectAll("circle")
                    .data(dataset.nodes)
                    .enter()
                    .append("circle")
                    .attr("r", 10)
                    .style("fill", function(d, i) {
                    return colors(i);
                    })
                    .call(d3.drag()
                    .on("start", dragStarted)
                    .on("drag", dragging)
                    .on("end", dragEnded));

                    
    nodes.append("title")
    .text(function(d) {
    return d.name;
    });


    force.on("tick", function() {

        edges.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

        nodes.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

    });



    function dragStarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragging(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragEnded(d) {
        if (!d3.event.active) force.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

function updateData(){
    var name = $("#txtUsername").val();
    var have = $("#txtHave").val();
    var need = $("#txtNeed").val();

    //change logic to save to file
    //add logic to validate if nodes already exist
    dataset.nodes[dataset.nodes.length] = {"name" : name, "type" : "user"};
    

    dataset.nodes[dataset.nodes.length] = {"name" : have, "type" : "user"};
    //dataset.edges[dataset.edges.length] = {"source": dataset.nodes.length-1, "target": dataset.nodes.length-2};
    // dataset.nodes[dataset.nodes.length] = {"name" : need, "type" : "user"};
    // dataset.edges[dataset.edges.length] = {"source": dataset.nodes.length-1, "target": dataset.nodes.length-3};
    loadVisualization();
}

$(document).ready(function(){
    loadVisualization();
});