var n1_location;
var n2_location;

var margin = {top: 50, right: 50, bottom: 50, left: 50}
var width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom;


//var IDN = "HS:ZLLO5NZLNKQ5K";

var IDNs = 
    [
      {
        "IDN_Id" :"HS:QQV516N32Y0XJ",
        "IDN_Name" : "The Cleveland Clinic Foundation"
      },
      {
        "IDN_Id" :"HS:58X72OO6X9N4W",
        "IDN_Name" : "Partners Healthcare"
      },
      {
        "IDN_Id" :"HS:ZLLO5NZLNKQ5K",
        "IDN_Name" : "Mayo Clinic"
      },
      {
        "IDN_Id" :"PBE:76LNM4KRYJJN",
        "IDN_Name" : "Texas Oncology Pa"
      },
      {
        "IDN_Id" :"HS:P578J5Z0N9O8M",
        "IDN_Name" : "Hca Healthcare, Inc"
      },
      {
        "IDN_Id" :"HS:OJYN982R214P4",
        "IDN_Name" : "University Of Pennsylvania"
      },
      {
        "IDN_Id" :"PBE:6131857XLLZJ3",
        "IDN_Name" : "Maryland Oncology Hematology Pa"
      },
      {
        "IDN_Id" :"PBE:WWVMV3MXONYM",
        "IDN_Name" : "Florida Cancer Specialists & Research Institute, Llc"
      },
      {
        "IDN_Id" :"HS:WQ2O0PJQ2OWY",
        "IDN_Name" : "New York University"
      },
      {
        "IDN_Id" :"HS:OW8L23Z8JL42",
        "IDN_Name" : "Mount Sinai Health System Inc"
      }
    ];

function generateIDNddl(){
  var option;
  for(var i=0; i<IDNs.length; i++){
    option += "<option value='"+IDNs[i].IDN_Id+"'>"+IDNs[i].IDN_Name+"</option>";
    d3.select("#ddl-idn").html(option);
  }
}

generateIDNddl();

function loadIDNMap(IDN){

  d3.select("#idn-map").select("svg").remove();
  var idn_map = d3.select("#idn-map").append("svg").attr("width",width).attr("height",height);

  var projection = d3.geoAlbers()
      .translate([width / 2, height / 2])
      .scale(1280);


  var path = d3.geoPath()
      .projection(projection)
      .pointRadius(2.5);

  d3.json("data/us.json").then(function(us) {
    d3.csv("data/zipcodes.csv", typeHospitals).then(function(hospitals) {
      d3.csv("data/oncologists_inbound.csv", typeReferrals).then(function(referrals) {

        var referralsbyIDN = referrals.filter(function(d) { return d.n1_primary_idn == IDN; });
        var hospitalsByZip = d3.map(hospitals, function(d) { return d.zip; });

        referralsbyIDN.forEach(function(referral) {
          var source = hospitalsByZip.get(referral.node_2_zip_code),
              target = hospitalsByZip.get(referral.node_1_zip_code);

          if((source!=undefined)&&(target!=undefined)){
            source.arcs.coordinates.push([source, target]);
            target.arcs.coordinates.push([target, source]);
          }
            

        });

        hospitals = hospitals.filter(function(d) { return d.arcs.coordinates.length; });

        idn_map.append("path")
          .datum(topojson.feature(us, us.objects.land))
          .attr("class", "land")
          .attr("d", path);

        idn_map.append("path")
          .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
          .attr("class", "state-borders")
          .attr("d", path)

        // idn_map.append("path")
        //   .datum({type: "MultiPoint", coordinates: hospitals})
        //   .attr("class", "hospital-dots")
        //   .attr("d", path);

        var hospital = idn_map.selectAll(".hospital")
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

}


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