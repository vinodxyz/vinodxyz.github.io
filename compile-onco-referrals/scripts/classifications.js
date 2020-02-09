var margin = {top: 50, right: 50, bottom: 50, left: 50}
var width = window.innerWidth - margin.left - margin.right,
    height = window.innerHeight - margin.top - margin.bottom; 


var svg = d3.select("#circle-charts").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + [margin.left, margin.top] + ")")


var config = {
    radius: 5,
    gridLength: 20,
    gridPadding: 20
};
    
var defs = svg.append('defs');
var filter = defs.append('filter').attr('id','gooey');
    filter.append('feGaussianBlur')
    .attr('in','SourceGraphic')
    .attr('stdDeviation', config.radius * 1.8)
    .attr('result','blur');
    filter.append('feColorMatrix')
    .attr("class", "blurValues")
    .attr('in','blur')
    .attr('mode','matrix')
    .attr('values', '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ' + config.radius +' -6')
    .attr('result','gooey');
    filter.append("feBlend")
    .attr("in", "SourceGraphic")
    .attr("in2", "gooey")
    .attr("operator", "atop");


var outboundData = [
    {
        "N1_Primary_Classification": "Anesthesiology",
        "N1_Primary_Specialization": "Pain Medicine",
        "referral_percent": 0.01,
        "cluster": 1
    },
    {
        "N1_Primary_Classification": "Dermatology",
        "N1_Primary_Specialization": "Null, Pediatric Dermatology, Procedural Dermatology",
        "referral_percent": 0.01,
        "cluster": 2
    },
    {
        "N1_Primary_Classification": "Emergency Medicine",
        "N1_Primary_Specialization": "Adolescent Medicine, Advanced Heart Failure And Transplant Cardiology, Allergy & Immunology and 17 more",
        "referral_percent": 0,
        "cluster": 3
    },
    {
        "N1_Primary_Classification": "Family Medicine",
        "N1_Primary_Specialization": "Addiction Medicine",
        "referral_percent": 0,
        "cluster": 4
    },
    {
        "N1_Primary_Classification": "Internal Medicine",
        "N1_Primary_Specialization": "Null, Pediatric Dermatology, Procedural Dermatology",
        "referral_percent": 0,
        "cluster": 5
    },
    {
        "N1_Primary_Classification": "Internal Medicine",
        "N1_Primary_Specialization": "Medical Oncology",
        "referral_percent": 11.53,
        "cluster": 5
    },
    {
        "N1_Primary_Classification": "Internal Medicine",
        "N1_Primary_Specialization": "Hematology & Oncology",
        "referral_percent": 39.54,
        "cluster": 5
    },
    {
        "N1_Primary_Classification": "Internal Medicine",
        "N1_Primary_Specialization": "Anatomic Pathology & Clinical Pathology, Blood Banking & Transfusion Medicine, Hematology",
        "referral_percent": 2.12,
        "cluster": 5
    },
    {
        "N1_Primary_Classification": "Internal Medicine",
        "N1_Primary_Specialization": "Adolescent Medicine, Advanced Heart Failure And Transplant Cardiology, Allergy & Immunology and 17 more",
        "referral_percent": 0.24,
        "cluster": 5
    },
    {
        "N1_Primary_Classification": "Nuclear Medicine",
        "N1_Primary_Specialization": "In Vivo & In Vitro Nuclear Medicine",
        "referral_percent": 0,
        "cluster": 6
    },
    {
        "N1_Primary_Classification": "Nurse Practitioner",
        "N1_Primary_Specialization": "Acute Care & Family",
        "referral_percent": 0.01,
        "cluster": 7
    },
    {
        "N1_Primary_Classification": "Obstetrics & Gynecology",
        "N1_Primary_Specialization": "Gynecologic Oncology",
        "referral_percent": 2.18,
        "cluster": 8
    },
    {
        "N1_Primary_Classification": "Obstetrics & Gynecology",
        "N1_Primary_Specialization": "Female Pelvic Medicine And Reconstructive Surgery, Gynecology, Maternal & Fetal Medicine and 1 more",
        "referral_percent": 0.16,
        "cluster": 9
    },
    {
        "N1_Primary_Classification": "Orthopaedic Surgery",
        "N1_Primary_Specialization": "Adult Reconstructive Orthopaedic Surgery & Orthopaedic Surgery Of The Spine",
        "referral_percent": 0,
        "cluster": 10
    },
    {
        "N1_Primary_Classification": "Otolaryngology",
        "N1_Primary_Specialization": "Otolaryngology/Facial Plastic Surgery, Pediatric Otolaryngology, Plastic Surgery Within The Head & Neck",
        "referral_percent": 0.08,
        "cluster": 11
    },
    {
        "N1_Primary_Classification": "Pathology",
        "N1_Primary_Specialization": "Anatomic Pathology & Clinical Pathology, Blood Banking & Transfusion Medicine, Hematology",
        "referral_percent": 0.07,
        "cluster": 12
    },
    {
        "N1_Primary_Classification": "Pediatrics",
        "N1_Primary_Specialization": "Pediatric Hematology-Oncology",
        "referral_percent": 2.43,
        "cluster": 13
    },
    {
        "N1_Primary_Classification": "Pediatrics",
        "N1_Primary_Specialization": "Adolescent Medicine, Advanced Heart Failure And Transplant Cardiology, Allergy & Immunology and 17 more",
        "referral_percent": 0,
        "cluster": 13
    },
    {
        "N1_Primary_Classification": "Psychiatry & Neurology",
        "N1_Primary_Specialization": "Neurology & Psychiatry",
        "referral_percent": 0.03,
        "cluster": 14
    },
    {
        "N1_Primary_Classification": "Radiology",
        "N1_Primary_Specialization": "Radiation Oncology",
        "referral_percent": 36.86,
        "cluster": 15
    },
    {
        "N1_Primary_Classification": "Radiology",
        "N1_Primary_Specialization": "Diagnostic Radiology",
        "referral_percent": 2.45,
        "cluster": 15
    },
    {
        "N1_Primary_Classification": "Radiology",
        "N1_Primary_Specialization": "Adolescent Medicine, Advanced Heart Failure And Transplant Cardiology, Allergy & Immunology and 17 more",
        "referral_percent": 0.08,
        "cluster": 15
    },
    {
        "N1_Primary_Classification": "Surgery",
        "N1_Primary_Specialization": "Surgical Oncology",
        "referral_percent": 2.06,
        "cluster": 16
    },
    {
        "N1_Primary_Classification": "Surgery",
        "N1_Primary_Specialization": "Pediatric Surgery, Plastic And Reconstructive Surgery, Surgical Critical Care and 2 more",
        "referral_percent": 0.12,
        "cluster": 16
    },
    {
        "N1_Primary_Classification": "Thoracic Surgery (Cardiothoracic Vascular Surgery)",
        "N1_Primary_Specialization": "Null, Pediatric Dermatology, Procedural Dermatology",
        "referral_percent": 0,
        "cluster": 17
    }
    ];
    
var inboundData = [
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "Adult Medicine",
        "referral_percent": 0.22
    },
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "Geriatric Medicine",
        "referral_percent": 0.15
    },
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.38
    },
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "",
        "referral_percent": 15.16
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Infectious Disease",
        "referral_percent": 0.25
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Endocrinology, Diabetes & Metabolism",
        "referral_percent": 0.36
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Rheumatology",
        "referral_percent": 0.39
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Nephrology",
        "referral_percent": 0.64
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Cardiovascular Disease",
        "referral_percent": 0.67
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Geriatric Medicine",
        "referral_percent": 0.94
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Pulmonary Disease",
        "referral_percent": 1.63
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Medical Oncology",
        "referral_percent": 4.12
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 3
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Hematology & Oncology",
        "referral_percent": 11.83
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "",
        "referral_percent": 15.03
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Surgical Technologist",
        "referral_percent": 0.11
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Mohs-Micrographic Surgery",
        "referral_percent": 0.11
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Otolaryngology/Facial Plastic Surgery",
        "referral_percent": 0.2
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Plastic Surgery Within The Head & Neck",
        "referral_percent": 0.25
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Neurology",
        "referral_percent": 0.58
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Medical",
        "referral_percent": 0.61
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Pediatric Hematology-Oncology",
        "referral_percent": 0.64
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Gynecologic Oncology",
        "referral_percent": 1.58
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Family",
        "referral_percent": 2.2
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 2.79
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "",
        "referral_percent": 13.35
    },
    {
        "N2_Primary_Classification": "Radiology",
        "N2_Primary_Specialization": "Diagnostic Radiology",
        "referral_percent": 0.18
    },
    {
        "N2_Primary_Classification": "Radiology",
        "N2_Primary_Specialization": "Radiation Oncology",
        "referral_percent": 2.96
    },
    {
        "N2_Primary_Classification": "Radiology",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.05
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Plastic And Reconstructive Surgery",
        "referral_percent": 0.27
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Vascular Surgery",
        "referral_percent": 0.46
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Surgical Oncology",
        "referral_percent": 2.33
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.16
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "",
        "referral_percent": 5.85
    },
    {
        "N2_Primary_Classification": "Urology",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.1
    },
    {
        "N2_Primary_Classification": "Urology",
        "N2_Primary_Specialization": "",
        "referral_percent": 10.44
    }
    ];


var area2radius = d3.scaleSqrt() // instead of scaleLinear()
  .domain([0, 100])
  .range([0, 200])


var simulationOutbound = d3.forceSimulation(outboundData)
    .force("x", d3.forceX(width / 2))
    .force("y", d3.forceY(height / 2))
    .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
    .stop()

var circleGroup = svg.append("g").style("filter", "url(#gooey)");

var bigTexture = textures.lines().size(5).strokeWidth(3).stroke("#FF785C");
svg.call(bigTexture);

var bigCircle = circleGroup.append("g")
    .append("circle")
    .attr("class", "big-circle")
    .attr("cx", width / 2)
    .attr("cy", height / 2)
    .attr("r", 0)
    .style("fill", bigTexture.url());

var bigCircleRect = circleGroup.append("g")
    .append("rect")
    .attr("class", "big-circle-rect")
    .attr("x", width / 2 - 30)
    .attr("y", height / 2 - 15)
    .style("fill","#FF785C")
    .attr("width","80px")
    .attr("height","20px")

var bigCirclePercent = circleGroup.append("g")
    .append("text")
    .attr("class", "big-circle-percent")
    .attr("x", width / 2 - 10)
    .attr("y", height / 2)
    .style("fill", "black")
    .text("100%")

var outboundGroup = circleGroup.append("g").attr("id","outbound-group").attr("opacity",0)
var outboundCircles = outboundGroup.selectAll("circle")
        .data(outboundData)
        .enter().append("circle")
        .attr("class", "outbound-circle")
        .attr("r", d => area2radius(d.class_percent))
        .attr("cx", d => d.x = width / 2)
        .attr("cy", d => d.y = height/2)
        .attr("fill", d => "#FF785C")

        
function separateDots() { 

    transitionGooBack(2000);
    for (var i = 0; i < 120; ++i) simulationOutbound.tick(); 
  
  d3.select(".big-circle")
    .transition()
      .duration(1400)
      .attr("r", 0);    
  
  d3.selectAll(".outbound-circle")
    .transition()
    .duration(1500)
    .delay((d,i) => 500+(config.radius - calculateDistance(d, [width/2, height/2])) * 30)
    .attr("cx", (d, i) => 100 + (i % config.gridLength) * (config.gridPadding + 100))
    .attr("cy", (d, i) => Math.floor(i / config.gridLength) * (config.gridPadding + area2radius(d.class_percent) * 2) + height/2);
}

function transitionGooBack(duration) {
    d3.selectAll(".blurValues")
      .transition().duration(duration)
      .attrTween("values", function() {
        return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + config.radius * 8 + " -6", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -6"); 
      }); 
}


function separateDotsReverse(){

    var finalsimulationOutbound = d3.forceSimulation(outboundData)
        .force("x", d3.forceX(width / 2))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
        .stop()

    d3.select("big-circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2);

    transitionGoo(2000);
    for (var i = 0; i < 120; ++i) finalsimulationOutbound.tick(); 

    d3.select(".big-circle")
        .transition()
        .delay(300)
        .duration(1200)
        .attr("r", area2radius(100));

    d3.selectAll(".outbound-circle")
        .transition()
        .duration(1500)
        .delay((d,i) => 500+(config.radius - calculateDistance(d, [width/2, height/2])) * 30)
        .attr("cx", width/2)
        .attr("cy", height/2);
        
}

function clusterDots() {
    // Interpolate between gooey filter and no gooey filter
    transitionGoo(3000);
    
    d3.select(".big-circle")
        .attr("cx",100)
        .attr("cy",height/2);

    simulationOutbound = d3.forceSimulation(outboundData)
        .force("x", d3.forceX(100))
        .force("y", d3.forceY(height / 2))
        .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
        .stop()

    for (var i = 0; i < 120; ++i) simulationOutbound.tick(); 
    
    d3.selectAll(".outbound-circle")
     .transition()
        .duration(1500)
      .delay((d,i) => calculateDistance(d, [100, height/2]) * 30)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y) 
    
    // d3.selectAll(".outbound-circle")
    //     .transition()
    //     .delay(1500)
    //     .attr("opacity",0)

    d3.select(".big-circle")
      .transition()
        .delay(600)
        .duration(900)
        .attr("r", area2radius(100));
}

function clusterDotsReverse() {
    transitionGooBack(3000);

    var newsimulationOutbound = d3.forceSimulation(outboundData)
    .force("x", d3.forceX(100))
    .force("y", d3.forceY(height / 2))
    .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
    .stop()

    for (var i = 0; i < 120; ++i) newsimulationOutbound.tick(); 
    
    d3.selectAll(".outbound-circle")
      .transition()
      .duration(1500)
      .delay((d,i) => 500+(config.radius - calculateDistance(d, [100, height/2])) * 30)
      .attr("cx", (d, i) => (i % config.gridLength) * (config.gridPadding + 100))
      .attr("cy", (d, i) => Math.floor(i / config.gridLength) * (config.gridPadding + area2radius(d.class_percent) * 2) + height/2);

    d3.select(".big-circle")
      .transition()
        .duration(1500)
        .attr("r", area2radius(0));

    d3.select(".big-circle")
        .transition()
        .delay(1500)
        .attr("cx",width/2)
        .attr("cy",height/2);
}

function transitionGoo(duration) {
    d3.selectAll(".blurValues")
      .transition().duration(duration)
      .attrTween("values", function() {
        return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -6", 
                                                "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + config.radius * 8 + " -6"); 
      }); 
}

function calculateDistance(d, point) {
    return Math.sqrt(Math.pow(point[0] - d.x, 2) + Math.pow(point[1] - d.y, 2))
  }



function moveToRight(){
    d3.selectAll(".big-circle").transition().duration(1000).attr("cx","1000").style("fill","#FFC017");
    outboundGroup.attr("opacity",0);
    //inboundGroup.attr("transform","translate(400)");
}

function moveToLeft(){
    d3.selectAll(".big-circle").transition().duration(1000).attr("cx","100").style("fill","#FF785C");
    inboundGroup.attr("opacity",0);
    outboundGroup.transition().delay(1000).attr("opacity",1);
}

var inboundGroup = circleGroup.append("g").attr("id","inbound-group")
var inboundCircles = inboundGroup.selectAll("circle")
                    .data(inboundData)
                    .enter().append("circle")
                    .attr("class", "inbound-circle")
                    .attr("r", d => area2radius(d.class_percent))
                    .attr("cx", d => d.x = width / 2)
                    .attr("cy", d => d.y = height/2)
                    .attr("fill", d => "#FFC017")
                    .attr("opacity",0)


function separateDotsAgain() {    
    inboundGroup.attr("opacity",1);
    var bigCircleX = d3.select(".big-circle").attr("cx");
    var bigCircleY = d3.select(".big-circle").attr("cy");
    inboundCircles.attr("cx", d => bigCircleX).attr("cy", d => bigCircleY).attr("opacity",1);
    var simulationInbound = d3.forceSimulation(inboundData)
                                .force("x", d3.forceX(bigCircleX))
                                .force("y", d3.forceY(bigCircleY))
                                .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
                                .stop()
    transitionGooBack(2000);
    for (var i = 0; i < 120; ++i) simulationInbound.tick(); 
    d3.select(".big-circle")
        .transition()
        .duration(1400)
        .attr("r", 0);

    d3.selectAll(".inbound-circle")
        .transition()
        .duration(1500)
        .delay((d,i) => 500+(config.radius - calculateDistance(d, [bigCircleX, bigCircleY])) * 30)
        .attr("cx", (d, i) => 300 + (i % config.gridLength) * (config.gridPadding + 120))
        .attr("cy", (d, i) => Math.floor(i / config.gridLength) * (config.gridPadding + area2radius(d.class_percent) * 2) + height/2);
}


function separateDotsAgainReverse() {    
    
    var bigCircleX = d3.select(".big-circle").attr("cx");
    var bigCircleY = d3.select(".big-circle").attr("cy");
    var simulationInbound = d3.forceSimulation(inboundData)
                                .force("x", d3.forceX(bigCircleX))
                                .force("y", d3.forceY(bigCircleY))
                                .force("collide", d3.forceCollide(config.radius + 1.5).iterations(2))
                                .stop()
    transitionGoo(2000);
    for (var i = 0; i < 120; ++i) simulationInbound.tick(); 
    d3.select(".big-circle")
        .transition()
        .duration(700)
        .delay(800)
        .attr("r", area2radius(100));

    d3.selectAll(".inbound-circle")
        .transition()
        .duration(1500)
        .delay((d,i) => 500+(config.radius - calculateDistance(d, [bigCircleX, bigCircleY])) * 30)
        .attr("cx", d => bigCircleX)
        .attr("cy", d => bigCircleY);
}




//Clusters.js added here:
var m=17;
const allbubbleGroup = svg.append("g").attr("transform", `translate(${width/2},${height/2})`).style("filter", "url(#gooey)");

for(var z=0; z<outboundData.length; z++){
    let i = Math.floor(Math.random() * m);
    let focusX = 110 * Math.cos(i / m * Math.PI * 2);
    let focusY = 110 * Math.sin(i / m * Math.PI * 2);
    
    outboundData[z].x = focusX;
    outboundData[z].y = focusY;
    outboundData[z].focusX = focusX;
    outboundData[z].focusY = focusY;
}


var textureGenerators = [
    function(){
    return textures.lines().size(5).strokeWidth(3);
    }
];

var textureScale = d3.scaleOrdinal()
                    .domain([0,m-1])
                    .range(textureGenerators)


var colors = ["#C88EB3", "#AAC8CD", "#ED6F6C", "#C0A983", "#9F83C5", "#BF9899", "#EE5673", "#F3B0CE", "#F7AA96", "#B7B7B7", "#60AFC4", "#D19082", "#EFBFA1", "#61999A", "#28B4D4", "#F4E0E9"]
var colorScale = d3.scaleOrdinal().range(colors).domain([0,m-1]);

var colorTextureScale = d3.scaleOrdinal()
                        .domain(colorScale.domain())
                        .range(colorScale.range().map(function(color){
                            return d3.scaleOrdinal()
                                .domain(textureScale.domain())
                                .range(textureScale.range().map(function(generateTexture){

                                // Generate a new texture for each (color, texture) pair.
                                return colorizeTexture(generateTexture(), color);
                                }))
                            }));


function colorizeTexture(texture, color){
    var texture = texture.stroke(color);
    if(texture.fill){
        texture.fill(color);
    }
    return texture;
}

colorTextureScale.range().forEach(function(scale){
    scale.range().forEach(svg.call, svg);
});

var nodeBubbleGroup = allbubbleGroup.append("g").attr("id","bubble-group").attr("opacity",0);
const nodeBubble = nodeBubbleGroup
                    .selectAll("circle")
                    .data(outboundData)
                    .join("circle")
                    .attr("r", d => area2radius(d.referral_percent))
                    .attr("cx", d => d.x = 0)
                    .attr("cy", d => d.y = 0)
                    .style("fill", function(d){
                        return colorTextureScale(d.cluster)(d.cluster).url();
                    })
                    .attr("class", function(d){ 
                        if(d.N1_Primary_Specialization.toLowerCase().includes("onco")) 
                            return "bubble onco-spec"; 
                        else 
                            return "bubble non-onco-spec"  
                    })
                    .style("cursor","pointer")
                    //.attr("id", function(d){ return d.N1_Primary_Classification+" - "+d.N1_Primary_Specialization;})
                    .on("mouseover", function(d){ 

                            d3.selectAll(".bubble").style("opacity",0.2);
                            d3.selectAll(".bubble-rect").style("opacity",0.2);
                            d3.selectAll(".bubble-text").style("opacity",0.2);
                            d3.selectAll(".bubble-percent").style("opacity",0.2);
                            d3.selectAll(".bubble-rect-hide").style("opacity",0);
                            d3.selectAll(".bubble-text-hide").style("opacity",0);
                            d3.selectAll(".bubble-percent-hide").style("opacity",0);

                            d3.select(this).style("opacity",1);

                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").substring(0,5);
                            var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            d3.selectAll("#label-"+classId+"-"+specId).style("opacity",1);
                            d3.selectAll("#rect-"+classId+"-"+specId).style("opacity",1);
                            d3.selectAll("#percent-"+classId+"-"+specId).style("opacity",1);                
                    
                        })

                    .on("mouseout", function(d){

                        d3.selectAll(".bubble").style("opacity",1);
                        d3.selectAll(".bubble-rect").style("opacity",1);
                        d3.selectAll(".bubble-text").style("opacity",1);
                        d3.selectAll(".bubble-percent").style("opacity",1);
                        d3.selectAll(".bubble-rect-hide").style("opacity",0);
                        d3.selectAll(".bubble-text-hide").style("opacity",0);
                        d3.selectAll(".bubble-percent-hide").style("opacity",0);

                        var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").substring(0,5);
                        var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                        if (area2radius(d.referral_percent) < 20){
                            d3.selectAll("#label-"+classId+"-"+specId).style("opacity",0);
                            d3.selectAll("#rect-"+classId+"-"+specId).style("opacity",0);
                            d3.selectAll("#percent-"+classId+"-"+specId).style("opacity",0); 
                        }
                        else{
                            d3.selectAll("#label-"+classId+"-"+specId).style("opacity",1);
                            d3.selectAll("#rect-"+classId+"-"+specId).style("opacity",1); 
                            d3.selectAll("#percent-"+classId+"-"+specId).style("opacity",1); 
                        }

                    });


var nodeRectGroup = allbubbleGroup.append("g").attr("id","bubble-rect-group").attr("opacity",0);
const nodeRects = nodeRectGroup
                    .selectAll("rect")
                    .data(outboundData)
                    .join("rect")
                    .style("fill", function(d){
                            return colorScale(d.cluster);
                    })
                    .attr("x", d => d.x = 0)
                    .attr("y", d => d.y = 0)
                    .attr("class", function(d){
                        if (area2radius(d.referral_percent) > 20)
                            return "bubble-rect"
                        else
                            return "bubble-rect bubble-rect-hide"
                    })
                    .attr("id",function(d){
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").substring(0,5);
                            var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            return "rect-"+classId+"-"+specId;
                        })
                    .attr("width", d => area2radius(d.referral_percent)+20)
                    .attr("height","15px")
                    .style("margin-top","-30px")

        
var nodeLabelGroup = allbubbleGroup.append("g").attr("id","bubble-label-group").attr("opacity",0);
const nodeLabels = nodeLabelGroup
                    .selectAll("text")
                    .data(outboundData)
                    .join("text")
                    .style("fill", function(d){
                        return "black";
                    })
                    .attr("x", d => d.x = 0)
                    .attr("y", d => d.y = 0)
                    .attr("class", function(d){ 
                            if (area2radius(d.referral_percent) > 20)
                                return "bubble-text"
                            else
                                return "bubble-text bubble-text-hide"
                    })
                    .attr("id",function(d){
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").substring(0,5);
                            var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            return "label-"+classId+"-"+ specId ;
                    })
                    .html(function(d){ 
                            return "<tspan text-anchor='start'>"+(d.N1_Primary_Specialization.length>40) ? d.N1_Primary_Specialization.substring(0,40)+".." : d.N1_Primary_Specialization +"</tspan>"; 
                        })

var nodePercentGroup = allbubbleGroup.append("g").attr("id","bubble-percent-group").attr("opacity",0);
const nodePercents = nodePercentGroup
                        .selectAll("text")
                        .data(outboundData)
                        .join("text")
                        .style("fill", function(d){
                            return "black";
                        })
                        .attr("x", d => d.x = 0)
                        .attr("y", d => d.y = 0)
                        .attr("class", function(d){ 
                            if (area2radius(d.referral_percent) > 20)
                                return "bubble-percent"
                            else
                                return "bubble-percent bubble-percent-hide"
                        })
                        .attr("id",function(d){
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").substring(0,5);
                            var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            return "percent-"+classId+"-"+ specId ;
                        })
                        .html(function(d){ 
                            return d.referral_percent+" %"; 
                        })


const simulationBubbles = d3.forceSimulation(outboundData)
                            .force("collide", forceClusterCollision()
                                    .radius(d => area2radius(d.referral_percent) + 5)
                                    .strength(1)
                                    .clusterPadding(10)
                            )
                            .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                            .force("y", d3.forceY().y(d => d.focusY).strength(0.02))
                            .on("tick", ticked).stop()
                            
    
// simulationBubbles.nodes(outboundData);

const simulationRects = d3.forceSimulation()
                            .force("collide", forceClusterCollision()
                                    .radius(d => area2radius(d.referral_percent) + 5)
                                    .strength(1)
                                    .clusterPadding(10)
                            )
                            .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                            .force("y", d3.forceY().y(d => d.focusY).strength(0.02));

simulationRects.nodes(outboundData).on("tick", tickedRects);

const simulationLabels = d3.forceSimulation()
                            .force("collide", forceClusterCollision()
                                    .radius(d => area2radius(d.referral_percent) + 5)
                                    .strength(1)
                                    .clusterPadding(10)
                            )
                            .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                            .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationLabels.nodes(outboundData).on("tick", tickedLabels);

const simulationPercents = d3.forceSimulation()
                                .force("collide", forceClusterCollision()
                                        .radius(d => area2radius(d.referral_percent) + 5)
                                        .strength(1)
                                        .clusterPadding(10)
                                )
                                .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                                .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationPercents.nodes(outboundData).on("tick", tickedPercents);

function ticked() {
    nodeBubble
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
}

function tickedLabels() {
    nodeLabels
        .attr("x", d => d.x - area2radius(d.referral_percent)/2)
        .attr("y", d => d.y+10)
}

function tickedRects() {
    nodeRects
        .attr("x", d => d.x - area2radius(d.referral_percent)/2)
        .attr("y", d => d.y)
}

function tickedPercents() {
    nodePercents
        .attr("x", d => d.x - area2radius(d.referral_percent)/2)
        .attr("y", d => d.y-10)
}



function outboundCirclesEmerge(){

    transitionGooBack(2000); 
  
    d3.select(".big-circle")
        .transition()
        .duration(1400)
        .attr("r", 0);    
    
    d3.select("#bubble-group").transition().delay(500).attr("opacity",1);
    d3.select("#bubble-rect-group").transition().delay(1000).attr("opacity",1);
    d3.select("#bubble-label-group").transition().delay(1000).attr("opacity",1);
    d3.select("#bubble-percent-group").transition().delay(1000).attr("opacity",1);

    d3.selectAll(".bubble")
        .transition()
        .duration(1500)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)

    // d3.selectAll(".onco-spec").attr("opacity",0);

    //    d3.selectAll(".onco-spec").attr("opacity",1); 
    //    d3.selectAll(".non-onco-spec").attr("opacity",0.2);

    

    // for (var i = 0; i < 120; ++i){
        simulationBubbles.tick();
    //}
    
}

function forceClusterCollision() {
    let nodes
    let radii
    let strength = 1
    let iterations = 1
    let clusterPadding = 0 //addition
    
    function radius(d) { return d.r }
    function x(d) { return d.x + d.vx }
    function y(d) { return d.y + d.vy }
    function constant(x) { return function() { return x } }
    function jiggle() { return 1e-6 } //change - PLEASE no Math.random() in there ಥ﹏ಥ
    // function jiggle() { return (Math.random() - 0.5) * 1e-6 }
    
    function force() {
        let i
        let n = nodes.length
        let tree
        let node
        let xi
        let yi
        let ri
        let ri2
    
        for (let k = 0; k < iterations; ++k) {
        tree = d3.quadtree(nodes, x, y).visitAfter(prepare)
        for (i = 0; i < n; ++i) {
            node = nodes[i]
            ri = radii[node.index]
            ri2 = ri * ri
            xi = node.x + node.vx
            yi = node.y + node.vy
            tree.visit(apply)
        }//for i
        }//for k
    
        function apply(quad, x0, y0, x1, y1) {
        let data = quad.data
        let rj = quad.r
        let r = ri + rj + clusterPadding //change
        if (data) {
            if (data.index > node.index) {
            let x = xi - data.x - data.vx
            let y = yi - data.y - data.vy
            let l = x * x + y * y
            r = ri + rj + (node.cluster !== quad.data.cluster ? clusterPadding : 0) //addition
    
            if (l < r * r) {
                if (x === 0) x = jiggle(), l += x * x
                if (y === 0) y = jiggle(), l += y * y
                l = (r - (l = Math.sqrt(l))) / l * strength
                node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj))
                node.vy += (y *= l) * r
                data.vx -= x * (r = 1 - r)
                data.vy -= y * r
            }//if
            }//if
            return
        }//if
            return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r
        }//apply
        }//force
    
        function prepare(quad) {
        if (quad.data) return quad.r = radii[quad.data.index];
        for (let i = quad.r = 0; i < 4; ++i) {
            if (quad[i] && quad[i].r > quad.r) {
            quad.r = quad[i].r
            }//if
        }//for i
        }
    
        function initialize() {
        if (!nodes) return;
        let i, n = nodes.length, node
        radii = new Array(n)
        for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes)
        }
    
        force.initialize = function (_) {
        nodes = _
        initialize()
        return force
        }
    
        force.iterations = function (_) {
        return arguments.length ? (iterations = +_, force) : iterations
        }
    
        //I wish strength could be a function of the node as well...
        force.strength = function (_) {
        return arguments.length ? (strength = +_, force) : strength
        }
    
        force.radius = function (_) {
        return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), force) : radius
        }
        
        //addition - the actual pixels of padding
        force.clusterPadding = function (_) {
        return arguments.length ? (clusterPadding = +_, force) : clusterPadding
        }
    
        return force
    }//function forceCollision