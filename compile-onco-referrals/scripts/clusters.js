
m=17
//color = d3.scaleSequential(d3.interpolateSinebow).domain([0,m-1])
width = 1080
height = 900



const svg = d3.select("svg").attr("width",width).attr("height", height)
const g = svg.append("g").attr("transform", `translate(${width/2},${height/2})`)
var t = textures.circles().lighter();

svg.call(t);

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


for(var z=0; z<outboundData.length; z++){
    let i = Math.floor(Math.random() * m);
    let focusX = 110 * Math.cos(i / m * Math.PI * 2);
    let focusY = 110 * Math.sin(i / m * Math.PI * 2);
    
    outboundData[z].x = focusX;
    outboundData[z].y = focusY;
    outboundData[z].focusX = focusX;
    outboundData[z].focusY = focusY;
}

// var tooltip = d3.select("body")
//                 .append("div")
//                 .style("position", "absolute")
//                 .style("z-index", "10")
//                 .style("visibility", "hidden");

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

var area2radius = d3.scaleSqrt().domain([0, 100]).range([0, 200]);
const node = g.append("g")
    .selectAll("circle")
    .data(outboundData)
    .join("circle")
    .attr("r", d => area2radius(d.referral_percent))
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

   // d3.selectAll(".onco-spec").attr("opacity",0);

//    d3.selectAll(".onco-spec").attr("opacity",1); 
//    d3.selectAll(".non-onco-spec").attr("opacity",0.2);

const nodeRects = g.append("g")
   .selectAll("rect")
   .data(outboundData)
   .join("rect")
   .style("fill", function(d){
        return colorScale(d.cluster);
   })
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

const nodeLabels = g.append("g")
   .selectAll("text")
   .data(outboundData)
   .join("text")
   .style("fill", function(d){
       return "black";
   })
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

const nodePercents = g.append("g")
    .selectAll("text")
    .data(outboundData)
    .join("text")
    .style("fill", function(d){
        return "black";
    })
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

const simulation = d3.forceSimulation()
        .force("collide", forceClusterCollision()
                .radius(d => area2radius(d.referral_percent) + 5)
                .strength(1)
                .clusterPadding(10)
        )
        .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
        .force("y", d3.forceY().y(d => d.focusY).strength(0.02))
    
simulation.nodes(outboundData).on("tick", ticked)

const simulationRects = d3.forceSimulation()
        .force("collide", forceClusterCollision()
                .radius(d => area2radius(d.referral_percent) + 5)
                .strength(1)
                .clusterPadding(10)
        )
        .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
        .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationRects.nodes(outboundData).on("tick", tickedRects)

const simulationLabels = d3.forceSimulation()
        .force("collide", forceClusterCollision()
                .radius(d => area2radius(d.referral_percent) + 5)
                .strength(1)
                .clusterPadding(10)
        )
        .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
        .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationLabels.nodes(outboundData).on("tick", tickedLabels)

const simulationPercents = d3.forceSimulation()
        .force("collide", forceClusterCollision()
                .radius(d => area2radius(d.referral_percent) + 5)
                .strength(1)
                .clusterPadding(10)
        )
        .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
        .force("y", d3.forceY().y(d => d.focusY).strength(0.02))

simulationPercents.nodes(outboundData).on("tick", tickedPercents)

function ticked() {
    node
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