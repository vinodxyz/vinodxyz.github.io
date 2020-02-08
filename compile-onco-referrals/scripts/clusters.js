
m=17
//color = d3.scaleSequential(d3.interpolateSinebow).domain([0,m-1])
d3.selectAll(".onco-spec").attr("opacity",1); d3.selectAll(".non-onco-spec").attr("opacity",0.2);

colors = ["#C88EB3", "#AAC8CD", "#ED6F6C", "#C0A983", "#9F83C5", "#BF9899", "#EE5673", "#F3B0CE", "#F7AA96", "#B7B7B7", "#60AFC4", "#D19082", "#EFBFA1", "#61999A", "#28B4D4", "#F4E0E9"]
color = d3.scaleOrdinal().range(colors).domain([0,m-1]);
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

var tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden");


var area2radius = d3.scaleSqrt().domain([0, 100]).range([0, 200]);
const node = g.append("g")
    .selectAll("circle")
    .data(outboundData)
    .join("circle")
    .attr("r", d => area2radius(d.referral_percent))
    .style("fill", d => color(d.cluster))
    .style("fill", t.url())
    .attr("class", function(d){ 
        if(d.N1_Primary_Specialization.toLowerCase().includes("onco")) 
            return "onco-spec"; 
        else 
            return "non-onco-spec"  
        })
    //.attr("id", function(d){ return d.N1_Primary_Classification+" - "+d.N1_Primary_Specialization;})
    .on("mouseover", function(d){return tooltip.text(d.N1_Primary_Classification+" - "+d.N1_Primary_Specialization).style("visibility", "visible");})
	.on("mousemove", function(d){return tooltip.style("top", (event.pageY-10)+"px").style("left",(event.pageX+10)+"px");})
	.on("mouseout", function(d){return tooltip.style("visibility", "hidden");});

    d3.selectAll(".onco-spec").attr("opacity",0);

const simulation = d3.forceSimulation()
        .force("collide", forceClusterCollision()
                .radius(d => area2radius(d.referral_percent) + 5)
                .strength(1)
                .clusterPadding(10)
        )
        .force("x", d3.forceX().x(d => d.focusX).strength(0.02))
        .force("y", d3.forceY().y(d => d.focusY).strength(0.02))
    
simulation.nodes(outboundData).on("tick", ticked)

function ticked() {
    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
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