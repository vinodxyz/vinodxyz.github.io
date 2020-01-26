var n1_location;
var n2_location;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var projection = d3.geoAlbers()
    .translate([width / 2, height / 2])
    .scale(1280);


var path = d3.geoPath()
    .projection(projection)
    .pointRadius(2.5);


var IDN = "PBE:6X97JLZ8V1ZV";

d3.json("data/us.json").then(function(us) {
  d3.csv("data/zipcodes.csv", typeHospitals).then(function(hospitals) {
    d3.csv("data/oncologists_inbound.csv", typeReferrals).then(function(referrals) {

      var referralsbyIDN = referrals.filter(function(d) { return d.n1_primary_idn_1 == IDN; });
      var hospitalsByZip = d3.map(hospitals, function(d) { return d.zip; });

      referrals.forEach(function(referral) {
        var source = hospitalsByZip.get(referral.node_2_zip_code),
            target = hospitalsByZip.get(referral.node_1_zip_code);

        if((source!=undefined)&&(target!=undefined)){
          source.arcs.coordinates.push([source, target]);
          target.arcs.coordinates.push([target, source]);
        }
          

      });

      hospitals = hospitals.filter(function(d) { return d.arcs.coordinates.length; });

      // svg.append("path")
      //   .datum(topojson.feature(us, us.objects.land))
      //   .attr("class", "land")
      //   .attr("d", path);

      // svg.append("path")
      //   .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      //   .attr("class", "state-borders")
      //   .attr("d", path)

      // svg.append("path")
      //   .datum({type: "MultiPoint", coordinates: hospitals})
      //   .attr("class", "hospital-dots")
      //   .attr("d", path);

      var hospital = svg.selectAll(".hospital")
                        .data(hospitals)
                        .enter().append("g")
                        .attr("class", "hospital");
    
      // hospital.append("title")
      //         .text(function(d) { return d.zip + "\n" + d.arcs.coordinates.length + " hospitals"; });
      
      //console.log(hospitals);
      hospital.append("path")
          .attr("class", "hospital-arc")
          .attr("d", function(d) { return path(d.arcs);})
          //.style("stroke-width", function(d) { return d.tc_6month; })

    });
  });
});


function typeHospitals(d) {
    d[0] = +d.lon;
    d[1] = +d.lat;
    d[2] = +d.zip;
    d.arcs = {type: "MultiLineString", coordinates: []};
    return d;
  }

  function typeReferrals(d) {
    d.node_1_zip_code = +d.node_1_zip_code;
    d.node_2_zip_code = +d.node_2_zip_code;
    d.tc_6month = +d.tc_6month
    return d;
  }