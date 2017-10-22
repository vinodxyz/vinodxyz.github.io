//var linkArray = [];
//var nodeArray = [];
//var finalArray = {};
//var continueArray;
//
//d3.csv("../csv/viz1-flow-all.csv",function(d){
//    for(var i=0;i<d.length;i++){
//        if(+d[i].Year == 2002){
//           linkArray.push({
//                source: d[i].Origin,
//                target: d[i].Destination,
//                value: +d[i].Refugees,
//                optimal: "yes"
//            }); 
//        }
//    }
//    continueArray();
//});
//
//continueArray = function(){
//    d3.csv("../csv/viz1-nodes-2002.csv",function(d){
//        for(var i=0;i<d.length;i++){
//            nodeArray.push({
//                name: d[i].Nodes
//            });
//        }
//        
//        finalArray = {
//            nodes: nodeArray,
//            links: linkArray
//        };
//        
//        var jsonData = JSON.stringify(finalArray);
//        
//        function download(text, name, type) {
//            var a = document.createElement("a");
//            var file = new Blob([text], {type: type});
//            a.href = URL.createObjectURL(file);
//            a.download = name;
//            a.click();
//        }
//        
//        download(jsonData, 'test.txt', 'text/plain');
//    });
//    
//    
//};


//Script to make the Sankey's JSON-object out of the flow diagram:
var initialData;
let finalJSON = {};

//an year array:
var years = [];
for(var z=1961; z<2017; z++){
    years.push(z);
}

d3.csv("../csv/viz1-flow-all.csv",function(data){
    initialData = data;
    generateNodes();
});

var generateNodes = function(){
    
    for(var k=0; k<years.length; k++){
        var yearlyNodeArray = [];
        var yearlyLinkArray = [];
        var currentYear = years[k];
        var arrCountries = [];
        
        
        for(var i=0; i<initialData.length; i++){
            
            if(+initialData[i].Year == years[k]){
                
                arrCountries.push(initialData[i].Origin);
                arrCountries.push(initialData[i].Destination);
                arrCountries = arrCountries.filter(function (e, i, arrCountries) {
                    return arrCountries.lastIndexOf(e) === i;
                });
                
                var linkObj = {
                    source: initialData[i].Origin,
                    target: initialData[i].Destination,
                    value: initialData[i].Refugees,
                    optimal: "yes"
                };
                
                yearlyLinkArray.push(linkObj);
                
            }
        }
        
        for(var a=0; a<arrCountries.length; a++){
            
            var nodeObj = {
                name: arrCountries[a]
            };
            
            yearlyNodeArray.push(nodeObj);
            
        }
        
        var yearObj = {
            nodes:yearlyNodeArray,
            links:yearlyLinkArray
        };
        
        finalJSON[currentYear] = yearObj;
    }
    
//    console.log(finalJSON); 
    
    downloadJSON();
};

var downloadJSON = function(){
    var jsonData = JSON.stringify(finalJSON);

    function download(text, name, type) {
        var a = document.createElement("a");
        var file = new Blob([text], {type: type});
        a.href = URL.createObjectURL(file);
        a.download = name;
        a.click();
    }

    download(jsonData, 'sankey-json-data.txt', 'text/plain');
}
