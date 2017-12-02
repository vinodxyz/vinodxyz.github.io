$(document).ready(function(){

    $("#page-2").velocity({opacity:"0"});
    $("#tooltip-railweek").velocity({opacity:"0"});
    $("#tooltip-amazon").velocity({opacity:"0"});
    $("#dailyavg-payama").velocity({opacity:"0"});
    $("#dailyavg-rail").velocity({opacity:"0"});
    
    $("#bescom-tooltip").velocity({opacity:"0"});
    $("#rail-tooltip").velocity({opacity:"0"});
    
    $("#section-railway").mouseover(function(){
        $("#tooltip-railweek").velocity({opacity:"1"});
        $("#dailyavg-group").velocity({opacity:"0.2"});
        $("#dailyavg-rail").velocity({opacity:"5"});
        $("#other-trans").velocity({opacity:"0.2"});
        $("#other-spendings").velocity({opacity:"0.2"});
    });
    
    $("#section-railway").mouseout(function(){
        $("#tooltip-railweek").velocity({opacity:"0"});
        $("#dailyavg-group").velocity({opacity:"1"});
        $("#dailyavg-rail").velocity({opacity:"0"});
        $("#other-trans").velocity({opacity:"1"});
        $("#other-spendings").velocity({opacity:"1"});
    });
    
    $("#section-amapay").mouseover(function(){
        $("#tooltip-amazon").velocity({opacity:"1"});
        $("#dailyavg-group").velocity({opacity:"0.2"});
        $("#dailyavg-payama").velocity({opacity:"5"});
        $("#other-trans").velocity({opacity:"0.2"});
        $("#rail-trans-high").velocity({opacity:"0.2"});
        $("#other-spendings").velocity({opacity:"0.2"});
        $("#rail-spendings").velocity({opacity:"0.2"});
    });
    
    $("#section-amapay").mouseout(function(){
        $("#tooltip-amazon").velocity({opacity:"0"});
        $("#dailyavg-group").velocity({opacity:"1"});
        $("#dailyavg-payama").velocity({opacity:"0"});
        $("#other-trans").velocity({opacity:"1"});
        $("#rail-trans-high").velocity({opacity:"1"});
        $("#other-spendings").velocity({opacity:"1"});
        $("#rail-spendings").velocity({opacity:"1"});
    });
    
    $("#btnLocation").click(function(){
        $("#page-1").velocity({opacity:"0"});
        $("#page-2").velocity({opacity:"1"});
    });
    
    $("#bescom-graph-h").mouseover(function(){
        $("#bescom-tooltip").velocity({opacity:"1"});
    });
    
    $("#bescom-graph-h").mouseout(function(){
        $("#bescom-tooltip").velocity({opacity:"0"});
    });
    
    $("#rail-graph").mouseover(function(){
        $("#rail-tooltip").velocity({opacity:"1"});
    });
    
    $("#rail-graph").mouseout(function(){
        $("#rail-tooltip").velocity({opacity:"0"});
    });
    
    $("#legend-online").mouseover(function(){
        $("#others-mumbai").velocity({opacity:"0.2"});
        $("#others-kerala").velocity({opacity:"0.2"});
        $("#others-bangalore").velocity({opacity:"0.2"});
        $("#uber-graph").velocity({opacity:"0.2"});
        $("#rail-graph").velocity({opacity:"0.2"});
    });
    
    $("#legend-online").mouseout(function(){
        $("#others-mumbai").velocity({opacity:"1"});
        $("#others-kerala").velocity({opacity:"1"});
        $("#others-bangalore").velocity({opacity:"1"});
        $("#uber-graph").velocity({opacity:"1"});
        $("#rail-graph").velocity({opacity:"1"});
    });
    
    $("#btnOverview").click(function(){
        $("#page-1").velocity({opacity:"1"});
        $("#page-2").velocity({opacity:"0"});
    });
    
});