var margin = {top: 50, right: 50, bottom: 50, left: 50}
var width = window.innerWidth - margin.right - margin.left,
    height = window.innerHeight - margin.top - margin.bottom; 
var bubbleSize = 200;

if(window.innerWidth < 768){
    bubbleSize = 120;
}

var svg = d3.select("#circle-charts").append("svg")
    .attr("width", width + margin.right + margin.left)
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


var inboundData = [
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
    
var outboundData = [
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "Adult Medicine",
        "referral_percent": 0.22,
        "cluster": 1
    },
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "Geriatric Medicine",
        "referral_percent": 0.15,
        "cluster": 1
    },
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.38,
        "cluster": 1
    },
    {
        "N2_Primary_Classification": "Family Medicine",
        "N2_Primary_Specialization": "",
        "referral_percent": 15.16,
        "cluster": 1
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Infectious Disease",
        "referral_percent": 0.25,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Endocrinology, Diabetes & Metabolism",
        "referral_percent": 0.36,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Rheumatology",
        "referral_percent": 0.39,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Nephrology",
        "referral_percent": 0.64,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Cardiovascular Disease",
        "referral_percent": 0.67,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Geriatric Medicine",
        "referral_percent": 0.94,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Pulmonary Disease",
        "referral_percent": 1.63,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Medical Oncology",
        "referral_percent": 4.12,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 3,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "Hematology & Oncology",
        "referral_percent": 11.83,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Internal Medicine",
        "N2_Primary_Specialization": "",
        "referral_percent": 15.03,
        "cluster": 2
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Surgical Technologist",
        "referral_percent": 0.11,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Mohs-Micrographic Surgery",
        "referral_percent": 0.11,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Otolaryngology/Facial Plastic Surgery",
        "referral_percent": 0.2,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Plastic Surgery Within The Head & Neck",
        "referral_percent": 0.25,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Neurology",
        "referral_percent": 0.58,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Medical",
        "referral_percent": 0.61,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Pediatric Hematology-Oncology",
        "referral_percent": 0.64,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Gynecologic Oncology",
        "referral_percent": 1.58,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Family",
        "referral_percent": 2.2,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 2.79,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Null, Acupuncturist, Advanced Practice Midwife and 108 more",
        "N2_Primary_Specialization": "",
        "referral_percent": 13.35,
        "cluster": 3
    },
    {
        "N2_Primary_Classification": "Radiology",
        "N2_Primary_Specialization": "Diagnostic Radiology",
        "referral_percent": 0.18,
        "cluster": 4
    },
    {
        "N2_Primary_Classification": "Radiology",
        "N2_Primary_Specialization": "Radiation Oncology",
        "referral_percent": 2.96,
        "cluster": 4
    },
    {
        "N2_Primary_Classification": "Radiology",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.05,
        "cluster": 4
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Plastic And Reconstructive Surgery",
        "referral_percent": 0.27,
        "cluster": 5
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Vascular Surgery",
        "referral_percent": 0.46,
        "cluster": 5
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Surgical Oncology",
        "referral_percent": 2.33,
        "cluster": 5
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.16,
        "cluster": 5
    },
    {
        "N2_Primary_Classification": "Surgery",
        "N2_Primary_Specialization": "",
        "referral_percent": 5.85,
        "cluster": 5
    },
    {
        "N2_Primary_Classification": "Urology",
        "N2_Primary_Specialization": "Acute Care, Addiction (Substance Use Disorder), Addiction Medicine and 211 more",
        "referral_percent": 0.1,
        "cluster": 6
    },
    {
        "N2_Primary_Classification": "Urology",
        "N2_Primary_Specialization": "",
        "referral_percent": 10.44,
        "cluster": 6
    }
    ];


var area2radius = d3.scaleSqrt() // instead of scaleLinear()
  .domain([0, 100])
  .range([0, bubbleSize])


var circleGroup = svg.append("g").style("filter", "url(#gooey)");

var bigTexture = textures.lines().size(5).strokeWidth(3).stroke("#B7B7B7");
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
    .style("fill","#B7B7B7")
    .attr("width","80px")
    .attr("height","20px")
    .attr("opacity","0")

var bigCirclePercent = circleGroup.append("g")
    .append("text")
    .attr("class", "big-circle-percent")
    .attr("x", width / 2 - 10)
    .attr("y", height / 2)
    .style("fill", "black")
    .text("100%")
    .attr("opacity","0")

function transitionGooBack(duration) {
    d3.selectAll(".blurValues")
      .transition().duration(duration)
      .attrTween("values", function() {
        return d3.interpolateString("1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 " + config.radius * 8 + " -6", "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 6 -6"); 
      }); 
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


//Clusters.js added here:
var m=6;
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


var outboundColors = ["#C0A983", "#AAC8CD", "#C88EB3",
                "#EC5875", "#9F83C5", "#BF9899"]

var colorScale = d3.scaleOrdinal().range(outboundColors).domain([0,m-1]);

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
                        //return colorTextureScale(d.cluster)(d.cluster).url();
                        return colorScale(d.cluster);
                    })
                    .attr("class", function(d){ 

                        var totalClass = "";
                        var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                        //famil, inter, urolo

                        if(d.N2_Primary_Specialization.toLowerCase().includes("onco")) 
                            totalClass += "bubble onco-spec "+classId; 
                        else 
                            totalClass += "bubble non-onco-spec "+classId;

                        return totalClass;

                    })
                    .style("cursor","pointer")
                    //.attr("id", function(d){ return d.N2_Primary_Classification+" - "+d.N2_Primary_Specialization;})
                    .on("mouseover", function(d){ 

                            d3.selectAll(".bubble").style("opacity",0.2);
                            d3.selectAll(".bubble-text").style("opacity",0);
                            d3.selectAll(".bubble-percent").style("opacity",0);
                            d3.selectAll(".bubble-text-hide").style("opacity",0);
                            d3.selectAll(".bubble-percent-hide").style("opacity",0);

                            d3.select(this).style("opacity",1);

                            var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            var specId = d.N2_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            
                            d3.selectAll("#percent-"+classId+"-"+specId).style("opacity",1);  

                            d3.selectAll("#label-"+classId+"-"+specId).style("opacity",1)
                            .html(function(d){ 

                                var classId = d.N2_Primary_Classification;
                                var spec = d.N2_Primary_Specialization;

                                var finalClass = "";
                                var finalSpec = "";
                                
                                if(classId.toLowerCase().includes("midwife")){
                                    finalClass = "Others"
                                }
                                else{
                                    finalClass = classId;
                                }

                                if(spec.length>20){
                                    finalSpec = spec.substring(0,20) + "...";
                                }
                                else if(spec == ""){
                                    finalSpec = "General";
                                }
                                else{
                                    finalSpec = spec;
                                }
                                
                                specWidth = getTextWidth(finalSpec, "12px Rubik");
                                
                                var finalHTML = "<tspan text-anchor='start'>"+finalSpec+"</tspan>"; 
                                finalHTML += "<tspan opacity=0.5 fill='#333' text-anchor='start' dy='15' dx='-"+specWidth+"'>("+finalClass+")</tspan>";
                                return finalHTML;
                                
                            });

                              
                    
                        })

                    .on("mouseout", function(d){

                        d3.selectAll(".bubble").style("opacity",1);
                        d3.selectAll(".bubble-text").style("opacity",1);
                        d3.selectAll(".bubble-percent").style("opacity",1);
                        d3.selectAll(".bubble-text-hide").style("opacity",0);
                        d3.selectAll(".bubble-percent-hide").style("opacity",0);

                        var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                        var specId = d.N2_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            
                        if (d.referral_percent < 2.3){
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

                            var totalClass = "";
                            var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            if (d.referral_percent > 2.3)
                                totalClass += "bubble-text"
                            else
                                totalClass += "bubble-text bubble-text-hide"

                            if(d.N2_Primary_Specialization.toLowerCase().includes("onco")) 
                                totalClass += " onco-spec "+classId;
                            else 
                                totalClass += " non-onco-spec "+classId;

                            return totalClass;
                    })
                    .attr("id",function(d){
                            var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            var specId = d.N2_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            return "label-"+classId+"-"+ specId ;
                    })
                    .html(function(d){ 

                            var classId = d.N2_Primary_Classification;
                            var spec = d.N2_Primary_Specialization;

                            var finalClass = "";
                            var finalSpec = "";
                            
                            if(classId.toLowerCase().includes("midwife")){
                                finalClass = "Others"
                            }
                            else{
                                finalClass = classId;
                            }
                        

                            if(spec.length>20){
                                finalSpec = spec.substring(0,20) + "...";
                            }
                            else if(spec == ""){
                                finalSpec = "General";
                            }
                            else{
                                finalSpec = spec;
                            }
                            
                           var specWidth = getTextWidth(finalSpec, "12px Rubik");
                            
                            var finalHTML = "<tspan text-anchor='start'>"+finalSpec+"</tspan>"; 
                            finalHTML += "<tspan opacity=0.5 fill='#333' text-anchor='start' dy='15' dx='-"+specWidth+"'>("+finalClass+")</tspan>";
                            return finalHTML;
                            
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

                            var totalClass = "";
                            var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            if (d.referral_percent > 2.3)
                                totalClass += "bubble-percent"
                            else
                                totalClass += "bubble-percent bubble-percent-hide"

                            if(d.N2_Primary_Specialization.toLowerCase().includes("onco")) 
                                totalClass += " onco-spec "+classId; 
                            else 
                                totalClass += " non-onco-spec "+classId;

                            return totalClass;
                            
                        })
                        .attr("id",function(d){
                            var classId = d.N2_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            var specId = d.N2_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

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

const simulationLabels = d3.forceSimulation(outboundData)
                            .force("collide", forceClusterCollision()
                                    .radius(d => area2radius(d.referral_percent) + 5)
                                    .strength(1)
                                    .clusterPadding(10)
                            )
                            .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                            .force("y", d3.forceY().y(d => d.focusY).strength(0.02))
                            .on("tick", tickedLabels)//.stop();

const simulationPercents = d3.forceSimulation(outboundData)
                                .force("collide", forceClusterCollision()
                                        .radius(d => area2radius(d.referral_percent) + 5)
                                        .strength(1)
                                        .clusterPadding(10)
                                )
                                .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                                .force("y", d3.forceY().y(d => d.focusY).strength(0.02))
                                .on("tick", tickedPercents)//.stop();

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

function tickedPercents() {
    nodePercents
        .attr("x", d => d.x - area2radius(d.referral_percent)/2)
        .attr("y", d => d.y-10)
}



function outboundCirclesEmerge(){

    transitionGooBack(2000);   
    
    d3.select("#bubble-group").transition().delay(500).attr("opacity",1);
    d3.select("#bubble-rect-group").transition().delay(1000).attr("opacity",1);
    d3.select("#bubble-label-group").transition().delay(1000).attr("opacity",1);
    d3.select("#bubble-percent-group").transition().delay(1000).attr("opacity",1);

    simulationBubbles.tick();
    simulationLabels.tick();
    simulationPercents.tick();

    d3.selectAll(".bubble")
        .transition()
        .duration(1500)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    
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



    function highlightNononco(){

        d3.selectAll(".non-onco-spec").style("opacity",0.1);
        d3.selectAll(".onco-spec").transition().duration(200).style("opacity",0.1);

        d3.selectAll(".famil").style("opacity",1);
        d3.selectAll(".inter").style("opacity",1);
        d3.selectAll(".urolo").style("opacity",1);

        d3.selectAll(".bubble-text-hide").style("opacity",0);
        d3.selectAll(".bubble-percent-hide").style("opacity",0);
        
        
    }


    function highlightOnco(){

        d3.selectAll(".non-onco-spec").style("opacity",0.1);
        d3.selectAll(".onco-spec").style("opacity",1);

        d3.selectAll(".bubble-rect-hide").style("opacity",0);
        d3.selectAll(".bubble-text-hide").style("opacity",0);
        d3.selectAll(".bubble-percent-hide").style("opacity",0);

        //This code was removed because all that force moving around is irritating:
        // simulationRects.restart(0.01);
        // simulationRects.force('y', d3.forceY()
        // .y(function(d){
        //     if(d.N2_Primary_Specialization.toLowerCase().includes("onco")){
        //         return 100;
        //     }else{
        //         return d.focusY;
        //     }
        // })
        // .strength(function(d){
        //     if(d.N2_Primary_Specialization.toLowerCase().includes("onco")){
        //         return 0.2;
        //     }
        //     else{
        //         return 0.02;
        //     }
        // }));

        

    }

function outboundDisappear(){

    transitionGoo(2000);   
    setTimeout(function(){transitionGooBack(0)}, 2000);
    
    d3.select("#bubble-rect-group").transition().delay(200).attr("opacity",0);
    d3.select("#bubble-label-group").transition().delay(200).attr("opacity",0);
    d3.select("#bubble-percent-group").transition().delay(200).attr("opacity",0);

    d3.selectAll(".bubble")
        .transition()
        .duration(2000)
        //.delay((d,i) => 500+(config.radius - calculateDistance(d, [width/2, height/2])) * 30)
        .attr("cx", 0)
        .attr("cy", 0);

    d3.select("#bubble-group").transition().duration(1000).delay(500).attr("opacity",0);
    d3.select("#bubble-label-group").transition().duration(1000).delay(500).attr("opacity",0);
    d3.select("#bubble-percent-group").transition().duration(1000).delay(500).attr("opacity",0);
        
    simulationBubbles.stop();
    simulationLabels.stop();
    simulationPercents.stop();

    d3.select(".big-circle")
      .transition()
        .duration(1500)
        .attr("r", area2radius(100))
        .style("fill", bigTexture.url());

    bigCirclePercent.transition().duration(300).delay(1500).attr("opacity",1);
    bigCircleRect.transition().duration(300).delay(1500).attr("opacity",1);
}


//inbound simulations: from here

var mIN = 17;
const allbubbleGroupIN = svg.append("g").attr("transform", `translate(${width/2},${height/2})`).style("filter", "url(#gooey)");

for(var z=0; z<inboundData.length; z++){
    let i = Math.floor(Math.random() * mIN);
    let focusX = 110 * Math.cos(i / mIN * Math.PI * 2);
    let focusY = 110 * Math.sin(i / mIN * Math.PI * 2);
    
    inboundData[z].x = focusX;
    inboundData[z].y = focusY;
    inboundData[z].focusX = focusX;
    inboundData[z].focusY = focusY;
}

var textureScaleIN = d3.scaleOrdinal()
                    .domain([0,mIN-1])
                    .range(textureGenerators)


var inboundColors = ["#C88EB3", "#AAC8CD", "#ED6F6C", 
                "#C0A983", "#9F83C5", "#BF9899", 
                "#EE5673", "#F3B0CE", "#F7AA96", 
                "#B7B7B7", "#60AFC4", "#D19082", 
                "#EFBFA1", "#61999A", "#28B4D4", 
                "#F4E0E9"]

var colorScaleIN = d3.scaleOrdinal().range(inboundColors).domain([0,mIN-1]);

var colorTextureScaleIN = d3.scaleOrdinal()
                            .domain(colorScaleIN.domain())
                            .range(colorScaleIN.range().map(function(color){
                                return d3.scaleOrdinal()
                                    .domain(textureScaleIN.domain())
                                    .range(textureScaleIN.range().map(function(generateTexture){

                                    // Generate a new texture for each (color, texture) pair.
                                    return colorizeTextureIN(generateTexture(), color);
                                    }))
                                }));


function colorizeTextureIN(texture, color){
    var texture = texture.stroke(color);
    if(texture.fill){
        texture.fill(color);
    }
    return texture;
}

colorTextureScaleIN.range().forEach(function(scale){
    scale.range().forEach(svg.call, svg);
});

var nodeBubbleGroupIN = allbubbleGroupIN.append("g").attr("id","bubble-group-in").attr("opacity",0);
const nodeBubbleIN = nodeBubbleGroupIN
                    .selectAll("circle")
                    .data(inboundData)
                    .join("circle")
                    .attr("r", d => area2radius(d.referral_percent))
                    .attr("cx", d => d.x = 0)
                    .attr("cy", d => d.y = 0)
                    .style("fill", function(d){
                        //return colorTextureScaleIN(d.cluster)(d.cluster).url();
                        return colorScaleIN(d.cluster);
                    })
                    .attr("class", function(d){ 

                        var totalClass = "";
                        var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                        //famil, inter, urolo

                        if(d.N1_Primary_Specialization.toLowerCase().includes("onco")) 
                            totalClass += "bubble onco-spec-in "+classId; 
                        else 
                            totalClass += "bubble non-onco-spec-in "+classId;

                        return totalClass;

                    })
                    .style("pointer-events","none");

        
var nodeLabelGroupIN = allbubbleGroupIN.append("g").attr("id","bubble-label-group-in").attr("opacity",0);
const nodeLabelsIN = nodeLabelGroupIN
                    .selectAll("text")
                    .data(inboundData)
                    .join("text")
                    .style("fill", function(d){
                        return "black";
                    })
                    .attr("x", d => d.x = 0)
                    .attr("y", d => d.y = 0)
                    .attr("class", function(d){ 

                            var totalClass = "";
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            if (area2radius(d.referral_percent) > 20)
                                totalClass += "bubble-text"
                            else
                                totalClass += "bubble-text bubble-text-hide"

                            if(d.N1_Primary_Specialization.toLowerCase().includes("onco")) 
                                totalClass += " onco-spec-in "+classId;
                            else 
                                totalClass += " non-onco-spec-in "+classId;

                            return totalClass;
                    })
                    .attr("id",function(d){
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);
                            var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            return "label-"+classId+"-"+ specId ;
                    })
                    .html(function(d){ 

                            var classId = d.N1_Primary_Classification;
                            var spec = d.N1_Primary_Specialization;

                            var finalClass = "";
                            var finalSpec = "";
                            
                            if(classId.toLowerCase().includes("midwife")){
                                finalClass = "Others"
                            }
                            else{
                                finalClass = classId;
                            }
                        

                            if(spec.length>20){
                                finalSpec = spec.substring(0,20) + "...";
                            }
                            else if(spec == ""){
                                finalSpec = "General";
                            }
                            else{
                                finalSpec = spec;
                            }
                            
                           var specWidth = getTextWidth(finalSpec, "12px Rubik");
                            
                            var finalHTML = "<tspan text-anchor='start'>"+finalSpec+"</tspan>"; 
                            finalHTML += "<tspan opacity=0.5 fill='#333' text-anchor='start' dy='15' dx='-"+specWidth+"'>("+finalClass+")</tspan>";
                            return finalHTML;
                            
                        })

var nodePercentGroupIN = allbubbleGroupIN.append("g").attr("id","bubble-percent-group-in").attr("opacity",0);
const nodePercentsIN = nodePercentGroupIN
                        .selectAll("text")
                        .data(inboundData)
                        .join("text")
                        .style("fill", function(d){
                            return "black";
                        })
                        .attr("x", d => d.x = 0)
                        .attr("y", d => d.y = 0)
                        .attr("class", function(d){ 

                            var totalClass = "";
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            if (area2radius(d.referral_percent) > 20)
                                totalClass += "bubble-percent"
                            else
                                totalClass += "bubble-percent bubble-percent-hide"

                            if(d.N1_Primary_Specialization.toLowerCase().includes("onco")) 
                                totalClass += " onco-spec-in "+classId; 
                            else 
                                totalClass += " non-onco-spec-in "+classId;

                            return totalClass;
                            
                        })
                        .attr("id",function(d){
                            var classId = d.N1_Primary_Classification.toLowerCase().replace(" ","").substring(0,5);
                            var specId = d.N1_Primary_Specialization.toLowerCase().replace(" ","").replace("null","").replace(",","").substring(0,5);

                            return "percent-"+classId+"-"+ specId ;
                        })
                        .html(function(d){ 
                            return d.referral_percent+" %"; 
                        })


const simulationBubblesIN = d3.forceSimulation(inboundData)
                            .force("collide", forceClusterCollision()
                                    .radius(d => area2radius(d.referral_percent) + 5)
                                    .strength(1)
                                    .clusterPadding(10)
                            )
                            .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                            .force("y", d3.forceY().y(d => d.focusY).strength(0.02))
                            .on("tick", tickedIN).stop()

// const simulationRectsIN = d3.forceSimulation()
//                             .force("collide", forceClusterCollision()
//                                     .radius(d => area2radius(d.referral_percent) + 5)
//                                     .strength(1)
//                                     .clusterPadding(10)
//                             )
//                             .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
//                             .force("y", d3.forceY().y(d => d.focusY).strength(0.02));

// simulationRectsIN.nodes(inboundData).on("tick", tickedRectsIN);

const simulationLabelsIN = d3.forceSimulation()
                            .force("collide", forceClusterCollision()
                                    .radius(d => area2radius(d.referral_percent) + 5)
                                    .strength(1)
                                    .clusterPadding(10)
                            )
                            .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                            .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationLabelsIN.nodes(inboundData).on("tick", tickedLabelsIN);

const simulationPercentsIN = d3.forceSimulation()
                                .force("collide", forceClusterCollision()
                                        .radius(d => area2radius(d.referral_percent) + 5)
                                        .strength(1)
                                        .clusterPadding(10)
                                )
                                .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
                                .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationPercentsIN.nodes(inboundData).on("tick", tickedPercentsIN);

function newFunction() {
    return "width";
}

function tickedIN() {
    nodeBubbleIN
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
}

function tickedLabelsIN() {
    nodeLabelsIN
        .attr("x", d => d.x - area2radius(d.referral_percent)/2 -20)
        .attr("y", d => d.y+10)
}

// function tickedRectsIN() {
//     nodeRectsIN
//         .attr("x", d => d.x - area2radius(d.referral_percent)/2)
//         .attr("y", d => d.y)
// }

function tickedPercentsIN() {
    nodePercentsIN
        .attr("x", d => d.x - area2radius(d.referral_percent)/2)
        .attr("y", d => d.y-10)
}


function inboundCirclesEmerge(){

    transitionGooBack(2000);   
    
    d3.select("#bubble-group-in").transition().delay(500).attr("opacity",1);
    d3.select("#bubble-rect-group-in").transition().delay(1000).attr("opacity",1);
    d3.select("#bubble-label-group-in").transition().delay(1000).attr("opacity",1);
    d3.select("#bubble-percent-group-in").transition().delay(1000).attr("opacity",1);

    d3.selectAll(".bubble")
        .transition()
        .duration(1500)
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)

    // d3.selectAll(".onco-spec").attr("opacity",0);

    //    d3.selectAll(".onco-spec").attr("opacity",1); 
    //    d3.selectAll(".non-onco-spec").attr("opacity",0.2);

    

    // for (var i = 0; i < 120; ++i){
        simulationBubblesIN.tick();
    //}
    
}


function getTextWidth(text, font = "500 12px sans-serif") {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.font = font;
    return context.measureText(text).width;
  }

function breakString(word, maxWidth, hyphenCharacter='-') {
    const characters = word.split("");
    const lines = [];
    let currentLine = "";
    characters.forEach((character, index) => {
      const nextLine = `${currentLine}${character}`;
      const lineWidth = getTextWidth(nextLine);
      if (lineWidth >= maxWidth) {
        const currentCharacter = index + 1;
        const isLastLine = characters.length === currentCharacter;
        const hyphenatedNextLine = `${nextLine}${hyphenCharacter}`;
        lines.push(isLastLine ? nextLine : hyphenatedNextLine);
        currentLine = "";
      } else {
        currentLine = nextLine;
      }
    });
    return { hyphenatedStrings: lines, remainingWord: currentLine };
}

function wrapLabel(label, maxWidth) {
    const words = label.split(" ");
    const completedLines = [];
    let nextLine = "";
    words.forEach((word, index) => {
      const wordLength = getTextWidth(`${word} `);
      const nextLineLength = getTextWidth(nextLine);
      if (wordLength > maxWidth) {
        const { hyphenatedStrings, remainingWord } = breakString(word, maxWidth);
        completedLines.push(nextLine, ...hyphenatedStrings);
        nextLine = remainingWord;
      } else if (nextLineLength + wordLength >= maxWidth) {
        completedLines.push(nextLine);
        nextLine = word;
      } else {
        nextLine = [nextLine, word].filter(Boolean).join(" ");
      }
      const currentWord = index + 1;
      const isLastWord = currentWord === words.length;
      if (isLastWord) {
        completedLines.push(nextLine);
      }
    });
    return completedLines.filter(line => line !== "");
}


