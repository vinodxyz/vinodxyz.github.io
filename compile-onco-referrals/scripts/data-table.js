d3.csv("data/spec-phy-count.csv").then(
    function(specdata){
        var table = d3.select("#data-table").append("table").append("tbody");

        for(var i=0; i<specdata.length; i++){

            var row = table.append("tr");
            if(i==0){
                row.append("th").append("p").html("Classification").style("text-align","left");
                row.append("th").append("p").html("Specialization").style("text-align","left");
                row.append("th").append("p").html("Doctor count").style("text-align","right").style("padding-right","8px");
                row = table.append("tr");
            }

            if(i>9){
                row.attr("class","row-hide")
            }

            row.append("td").style("width","35%").append("p").html(specdata[i].N1_Primary_Classification).style("text-align","left");
            row.append("td").style("width","55%").append("p").html(specdata[i].N1_Primary_Specialization).style("text-align","left");
            row.append("td").style("width","10%").append("p").html(specdata[i].Oncologist_count).style("text-align","right").style("padding-right","8px");
            
        }
        
    }
)


function showAllRows(){

    var hiddenRows = d3.selectAll(".row-hide");
    hiddenRows.attr("class","row-show");

    // var shownRows = d3.selectAll(".row-show");
    // shownRows.attr("class","row-hide");
}

