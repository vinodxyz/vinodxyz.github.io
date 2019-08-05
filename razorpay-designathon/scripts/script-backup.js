
// mapboxgl.accessToken = 'pk.eyJ1Ijoidmlub2R4eXoiLCJhIjoiY2owczFscm1hMDAzbDM4bHIzeGZoZXg4cSJ9.OsBqNXFDc4SfyodyrGwHGw';
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/vinodxyz/cjytwobhl0ie81cl4b7w6eaqm',
//     center: [90, 22],
//     zoom: 4.5
// });


//var container = map.getCanvasContainer();
//var svg = d3.select(container).append("svg");

//Switch to D3 maps

var width = 1920;
var height = 1200;
var svg = d3.select("body").append("svg")
    
    var projection = d3.geoMercator()
                        .scale(width / 2 / Math.PI)
                        .scale(200)
                        .translate([width / 2, height / 2]);

    var path = d3.geoPath().projection(projection);
    
    var url = "world-110m.geojson";
    var url2 = "ne_50m_populated_places_simple.geojson";

    
    d3.json(url, function(err, world_geojson) {

        svg.append("path")
        	.attr("d", path(world_geojson))
                    .attr("fill","lightgray")
                    
    })

    d3.json(url2, function(err, places_geojson) {
    var circles = svg.selectAll("circle")
                    .data(places_geojson.features)
                    .enter()
                    .append("circle")
                    .attr("r", function(d) {
                    return d.properties.pop_max/1000000;
                    })
                    .attr('cx',function(d) {
                    return projection(d.geometry.coordinates)[0]   
                    })
                    .attr('cy',function(d) {
                    return projection(d.geometry.coordinates)[1]
                    })
                    .attr("fill",function(d) {
                    if(d.properties.megacity == 1) {
                        return "darkgreen";
                    } else {
                        return "salmon";
                    }
                    })
                    .attr("opacity",0.5)
                        
                    })


                    // circles.transition().duration(100)
                    //     .attr("r",)
                    //     .attr("y", y)
                    //     .attr("width", x)

                        // * Math.round(Math.random()*10,0) 

    //setInterval(function(){ getData()}, 100);


