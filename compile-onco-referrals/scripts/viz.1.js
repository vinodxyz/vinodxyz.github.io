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

d3.json("data/us.json").then(function(us) {
    
    svg.append("path")
        .datum(topojson.feature(us, us.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
        .attr("class", "state-borders")
        .attr("d", path);

    //for
    n2_zipcode = 29325;
    n1_zipcode = 29651;
    getLocationData(n1_zipcode, n2_zipcode)

    setTimeout(function(){
        
        n1_coordinates = [n1_location.lon,n1_location.lat];
        n2_coordinates = [n2_location.lon,n2_location.lat];
        
        svg.selectAll("circle")
            .data([n1_coordinates,n2_coordinates]).enter()
            .append("circle")
            .attr("cx", function (d) { return projection(d)[0]; })
            .attr("cy", function (d) { return projection(d)[1]; })
            .attr("r", "2px")
            .attr("fill", "red");

        var link = [];
        source = [+n2_coordinates[0], +n2_coordinates[1]];
        target = [+n1_coordinates[0], +n1_coordinates[1]];
        topush = {type: "LineString", coordinates: [source, target]};
        link.push(topush);

        svg.selectAll("myPath")
        .data(link)
        .enter()
        .append("path")
            .attr("d", function(d){ return path(d)})
            .style("fill", "none")
            .style("stroke", "red")
            .style("stroke-width", 2)
    }, 2000);

})



// var what;
// getData(52242);
// var what2 = getData(52722);


//   function test(){

//     var request = new XMLHttpRequest();
//     request.open("GET","https://nominatim.openstreetmap.org/search?postalcode=29651&format=json",true);
//     request.onload = function() {
//         var data = JSON.parse(this.response)
//         console.log(data);
//       }
//   }


// function getData(zipcode){
//     $.ajax({
//         async: false,
//         dataType: "json",
//         type: 'GET',
//         url: 'https://nominatim.openstreetmap.org/search?postalcode='+zipcode+'&format=json',
//         success: function(data) {
//             dataset = data;
//             databackup = JSON.parse(JSON.stringify(data));
//             n2_zip = data[0].display_name;
//            // console.log(data[0].display_name);
//         }
//     });
// }

// function getData(zipcode){ // URL, callback, just a placeholder
//     c = new XMLHttpRequest;
//     c.open('GET', 'https://nominatim.openstreetmap.org/search?postalcode='+zipcode+'&format=json');
//     c.onload = function(e){
//         return(this.response)
//     };
//     c.send()
//   }


function getLocationData(zipcode_n1, zipcode_n2){
    fetch('https://nominatim.openstreetmap.org/search?postalcode='+zipcode_n1+'&format=json')
    .then((response) => {
        return response.json();
    })
    .then((osm_data) => {
        n1_location = osm_data[0];
    });

    fetch('https://nominatim.openstreetmap.org/search?postalcode='+zipcode_n2+'&format=json')
    .then((response) => {
        return response.json();
    })
    .then((osm_data) => {
        n2_location = osm_data[0];
    });
}


