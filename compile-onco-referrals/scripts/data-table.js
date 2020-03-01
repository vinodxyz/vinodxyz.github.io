d3.csv("data/spec-phy-count.csv").then(
    function(specdata){
        var table = d3.select("#data-table").append("table").append("tbody");

        for(var i=0; i<specdata.length; i++){

            var row = table.append("tr");
            if(i==0){
                row.append("th").append("p").html("Classification").style("text-align","left");
                row.append("th").append("p").html("Specialization").style("text-align","left");
                row.append("th").append("p").html("Doctor(s)").style("text-align","right").style("padding-right","8px");
                row = table.append("tr");
            }

            if(i>9){
                row.attr("class","row-hide")
            }

            row.append("td").style("width","40%").append("p").html(specdata[i].N1_Primary_Classification).style("text-align","left");
            row.append("td").style("width","50%").append("p").html(specdata[i].N1_Primary_Specialization).style("text-align","left");
            row.append("td").style("width","10%").append("p").html(specdata[i].Oncologist_count).style("text-align","right").style("padding-right","8px");
            
        }
        
    }
)


function showAllRows(){

    var hiddenRows = d3.selectAll(".row-hide");
    hiddenRows.attr("class","row-show");
    d3.select("#btnShowSpecs").attr("value","view less").attr("onclick","hideAllRows()");

    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = "#arrow-icon:before {background: url(\"../svg/up.svg\") center / contain no-repeat;}";
    
    Waypoint.refreshAll();
    // var shownRows = d3.selectAll(".row-show");
    // shownRows.attr("class","row-hide");
}


function hideAllRows(){
    var showRows = d3.selectAll(".row-show");
    showRows.attr("class","row-hide");
    d3.select("#btnShowSpecs").attr("value","view all specializations").attr("onclick","showAllRows()");
    document.getElementById('data-table').scrollIntoView();

    var styleElem = document.head.appendChild(document.createElement("style"));
    styleElem.innerHTML = "#arrow-icon:before {background: url(\"../svg/down.svg\") center / contain no-repeat;}";

    Waypoint.refreshAll();
}

