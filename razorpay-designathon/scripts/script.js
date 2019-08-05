
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

var width = 1920;
var height = 1200;
var svg = d3.select("body").append("svg");
var platforms = ["RazorpayX","Capital","2.0 Products"];

    
    // var projection = d3.geoAzimuthalEqualArea()
    //                     .scale(width / 2 / Math.PI)
    //                     .scale(1400)
    //                     .translate([-1100, 1100]);



    var projection = d3.geoOrthographic()
                        .scale(600)
                        .translate([300, 700])
                        .rotate([-80,-10,0]);


    var path = d3.geoPath().projection(projection);
    
    var map = "data/world-110m.geojson";
    var data = "data/ne_50m_populated_places_simple.geojson";

    d3.json(map, function(err, world_geojson) {

        var radialGradient = svg.append("defs")
                                .append("radialGradient")
                                .attr("id", "radial-gradient");
        
        radialGradient.append("stop")
                        .attr("offset", "0%")
                        .attr("stop-color", "#181B44");
        
        radialGradient.append("stop")
                        .attr("offset", "100%")
                        .attr("stop-color", "#0A0E2B");

        svg.append("path") 
            .attr("d", path(world_geojson))//.attr("fill","#232C5C");
            .attr("fill", "url(#radial-gradient)")
            .attr("stroke","#102385");

        //Container for the gradients
        var defs = svg.append("defs");

        //Filter for the outside glow
        var filter = defs.append("filter")
            .attr("id","glow");

        filter.append("feGaussianBlur")
            .attr("stdDeviation","2")
            .attr("result","coloredBlur");

        var feMerge = filter.append("feMerge");
        feMerge.append("feMergeNode")
            .attr("in","coloredBlur");
        feMerge.append("feMergeNode")
            .attr("in","SourceGraphic");

                    
    })
    
    var generateData = function(){
        var noOfPoints = Math.random()*100;
        var dataset = [];
        for(var i=0; i<noOfPoints; i++){
            var obj = new Object();
            obj.x = projection([getRandomInt(68.07,90.25),getRandomInt(8.04,37.05)])[0];
            obj.y  = projection([getRandomInt(68.07,97.25),getRandomInt(8.04,25.05)])[1];
            obj.r = Math.random()*10;
            obj.platform = platforms[Math.floor(Math.random() * platforms.length)];
            var jsonString = JSON.stringify(obj);
            dataset.push(obj);
        }
        return dataset;
    }
    
    var redrawGraph = function(dataset){
    d3.json(data, function(err, places_geojson) {

        var circles = svg.selectAll("circle")
                        .data(dataset);

        circles
            .enter()
            .append("circle")
            .style("filter", "url(#glow)")
            //longitude
            .attr('cx',function(d) {
            return d.x;   
            })
            //latitude
            .attr('cy',function(d) {
            return d.y; 
            })
            .attr("fill", function(d){
                //return "#1B3FEF"
                switch(d.platform){
                    case "RazorpayX":
                        return "#6A00A7";
                    case "Capital":
                        return "#8F0CA4";
                    case "2.0 Products":
                        return "#41059C";
                    default:
                        return "white";
                }
            })
            .merge(circles)
            .attr("opacity",0.9)
            .transition()
            .duration(1000)
            .attr("r", function(d) { return d.r; })

        circles.exit()
            .transition()
            .duration(1000)
            .attr("r", 0)
            .attr("opacity",0)
            .remove();
                                
    })
    }

    redrawGraph(generateData());

    setInterval(function(){ redrawGraph(generateData()); }, 2000);

                    // circles.transition().duration(100)
                    //     .attr("r",)
                    //     .attr("y", y)
                    //     .attr("width", x)

                        // * Math.round(Math.random()*10,0) 

    //setInterval(function(){ getData()}, 100);


  const n = 100;
  const duration = 1000;
  let now = new Date(Date.now() - duration);
  const random = d3.randomNormal(0, .2);
  const datai = d3.range(n).map(random);
  const margin = { top: 20, right: 10, bottom: 20, left: 40 };
  const widthi = 500 - margin.right - margin.left;
  const heighti = 120;

  const xScale = d3.scaleTime()
  	.domain([now - (n - 2) * duration, now - duration])
    .range([0, widthi]);

  const yScale = d3.scaleLinear()
  	.range([heighti, 0])
  	.domain([-1, 1]);

  const area = d3.area()
      .x((d, i)=> xScale(now - (n - 1 - i) * duration))
      .y0(heighti)
      .y1((d, i) => yScale(d))
  		.curve(d3.curveBasis);
  
  var line = d3.line()
    .x((d, i) => xScale(now - (n - 1 - i) * duration))
    .y((d, i) => yScale(d))
    .curve(d3.curveBasis);

  const svgi = d3.select(".graph")
    .append("svg")
    .attr("width", widthi + margin.left + margin.right)
    .attr("height", heighti + margin.top + margin.bottom);
  
  const g = svgi.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svgi.append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", widthi)
    .attr("height", heighti);

  const xAxis = d3.axisBottom(xScale).ticks(15).tickSize(-heighti);
  const yAxis = d3.axisLeft(yScale).ticks(5);

  g.append("g")
    .attr("class", "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis); 
  
  g.append('g')
  	.attr('class', 'axis--y')
  	.call(yAxis);

  let transition = d3
    .transition() 
    .duration(duration)
    .ease(d3.easeLinear);
  
  const areapath = g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(datai)
    .attr("class", "area");

  const pathi = g.append("g")
    .attr("clip-path", "url(#clip)")
    .append("path")
    .datum(datai)
    .attr("class", "line");
	let pause = false;
  let haulted = false;
  tick();
  
  function tick() {
    transition = transition
      .each(function() {
      	if (pause) return
        // update the domains
        now = new Date();
        xScale.domain([now - (n - 2) * duration, now - duration]);
        // push the accumulated count onto the back, and reset the count
        datai.push(random());

        // redraw the line
        d3.select(".line").attr("d", line).attr("transform", null);
        // slide the line left
        d3.select('.line')
          .transition(transition)
          .attr("transform", `translate(${xScale(now - (n - 1) * duration)})`);

        // slide the x-axis left
        d3.select(".axis--x")
          .transition(transition)
          .call(xAxis);
      
      	// Redraw the area.
        d3.select('.area')
          .attr("d", area)
          .attr("transform", null);
          
     		d3.select('.area')
          .transition(transition)
          .attr("transform", `translate(${xScale(now - (n - 1) * duration)})`)

        // pop the old data point off the front
        datai.shift();
      })
      .transition()
      .on("start", tick);
  }
  
  d3.select('#pause').on('click', function() {
    d3.select(this).html(pause ? 'pause' : 'resume');
    pause = !pause;
  })