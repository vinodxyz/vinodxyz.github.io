//$(function() {
//    $.scrollify({
//        section : ".scroll-to",
//        setHeights: false,
//        scrollSpeed: 500,
//        overflowScroll: false
//    });
//});

$(document).ready(
function(){
    
    for(var i=1; i<13; i++){
        $("#seed"+i).velocity({translateY: "-400px"});
        $("#seed"+i).velocity({"opacity": "0"});
    }
    $("#sunny_1_").velocity({"opacity": "0"});
    $("#sunny_1_").velocity({"translateX": "500px"});
    
    $("#line1_1_").velocity({"opacity": "0"});
    $("#line2_1_").velocity({"opacity": "0"});
    $("#line3_1_").velocity({"opacity": "0"});
    
    $("#lbl-oct_1_").velocity({"opacity": "0"});
    $("#lbl-nov_1_").velocity({"opacity": "0"});
    $("#lbl-dec_1_").velocity({"opacity": "0"});
    $("#lbl-jan_1_").velocity({"opacity": "0"}); 
    
    $("#growth-nov_1_").velocity({"opacity": "0"});
    $("#fall-dec_1_").velocity({"opacity": "0"});
    $("#harvest-jan_1_").velocity({"opacity": "0"});
    $("#onion-cycle").velocity({"opacity": "0"});
    
    $("#qty-rise").velocity("stop").velocity({'opacity': '0'});
    $("#qty-highlight").velocity({'opacity': '0'});
    
    $("#slice-1").velocity("stop").velocity({'opacity': '0'});
    $("#s1-lasalgaon").velocity("stop").velocity({'opacity': '0'});
    $("#s1-india").velocity("stop").velocity({'opacity': '0'});
    $("#all-slices").velocity("stop").velocity({'opacity': '0'});
    $("#s1-reveal1").velocity("stop").velocity({'opacity': '0'});
    
    $("#page-1").velocity("stop").velocity({'opacity': '0'});
    $("#p1-reveal1").velocity("stop").velocity({'opacity': '0'});
    $("#p1-reveal2").velocity("stop").velocity({'opacity': '0'});
    
    $("#page-2").velocity("stop").velocity({'opacity': '0'});
    $("#p2-reveal1").velocity("stop").velocity({'opacity': '0'});
    $("#p2-reveal2").velocity("stop").velocity({'opacity': '0'});
    
    $("#page-3").velocity("stop").velocity({'opacity': '0'});
    $("#p3-reveal1").velocity("stop").velocity({'opacity': '0'});
    $("#p3-reveal2").velocity("stop").velocity({'opacity': '0'});
    
});


var globalOffset = "100%";
var globalOffset2 = "60%";
var fadeOffset = "50%";
var fadeOffset2 = "70%";


//intro section
var intro1 = new Waypoint({
  element: document.getElementById('intro'),
  handler: function(direction) {
      if (direction === 'down') {
          $('#scrolly-graphs').addClass('graph-fixed');
          $('#header-bar').addClass('header-fixed');
      }
      else{
          $('#scrolly-graphs').removeClass('graph-fixed');
          $('#header-bar').removeClass('header-fixed');
      }
  },
    offset: "110%"
});

//end of intro


//instructions section

var ii1 = new Waypoint({
  element: document.getElementById('instruction-1'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#onion-cycle").velocity({"opacity": "1"});
      }
      else{
          $("#onion-cycle").velocity({"opacity": "0"});
      }
  },
    offset: globalOffset
});

var ii2 = new Waypoint({
  element: document.getElementById('instruction-2'),
  handler: function(direction) {
      if (direction === 'down') {
          
          $("#line1_1_").velocity({"opacity": "1"});
          $("#lbl-oct_1_").velocity({"opacity": "1"});
          $("#sunny_1_").velocity({"opacity": "1"});
          $("#sunny_1_").velocity({"translateX": "0px"});
          $("#sunny_1_").velocity({"opacity": "0.5"}, { loop: 5, easing: "easeInOut", duration: 2000 });
          
          var count = 1;
          
          while(count>0){
              var j = 100;
              
              for(var i=1; i<13; i++){
                  $("#seed"+i).velocity({"opacity": "1"});
                  $("#seed"+i).velocity({translateY: j+"px"});
                  j = j+60;
//                  if(count>0){
//                      $("#seed"+i).velocity({"opacity": "0"});
//                      $("#seed"+i).velocity({translateY: "-400px"});
//                  }
                  
              }
              
              count--;
          }
          
          var j = 100;
          for(var i=1; i<13; i++){
              $("#seed"+i).velocity({"opacity": "1"});
              $("#seed"+i).velocity({translateY: j+"px"});
              j = j+60;
          }
          
      }
      else{
          
          $("#line1_1_").velocity({"opacity": "0"});
          $("#lbl-oct_1_").velocity({"opacity": "0"});
          $("#sunny_1_").velocity({"translateX": "500px"});
          $("#sunny_1_").velocity({"opacity": "0"});
          
          for(var i=1; i<13; i++){
              $("#seed"+i).velocity({"opacity": "1"});
              $("#seed"+i).velocity({translateY: "-400px"});
              $("#seed"+i).velocity({"opacity": "0"});
          }
      }
  },
    offset: globalOffset
});

var ii3 = new Waypoint({
  element: document.getElementById('instruction-3'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#line2_1_").velocity({"opacity": "1"});
          $("#lbl-nov_1_").velocity({"opacity": "1"});
          $("#growth-nov_1_").velocity({"opacity": "1"});
      }
      else{
          $("#line2_1_").velocity({"opacity": "0"});
          $("#lbl-nov_1_").velocity({"opacity": "0"});
          $("#growth-nov_1_").velocity({"opacity": "0"});
      }
  },
    offset: globalOffset
});

var ii4 = new Waypoint({
  element: document.getElementById('instruction-4'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#line3_1_").velocity({"opacity": "1"});
          $("#lbl-dec_1_").velocity({"opacity": "1"});
          $("#harvest-jan_1_").velocity({"opacity": "1"});
      }
      else{
          $("#line3_1_").velocity({"opacity": "0"});
          $("#lbl-dec_1_").velocity({"opacity": "0"});
          $("#harvest-jan_1_").velocity({"opacity": "0"});
      }
  },
    offset: globalOffset
});

var ii5 = new Waypoint({
  element: document.getElementById('instruction-5'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#lbl-jan_1_").velocity({"opacity": "1"});
          $("#fall-dec_1_").velocity({"opacity": "1"});
          
          $("#fall-dec_1_").velocity({"translateY": "-200px"},{delay: 500, duration: 1000});
          //$("#fall-dec_1_").velocity({"translateY": "-250px"}, { loop: 1, easing: "easeInOut", duration: 2000 });
      }
      else{
          $("#lbl-jan_1_").velocity({"opacity": "0"});
          $("#fall-dec_1_").velocity({"opacity": "0"});
          $("#fall-dec_1_").velocity({"translateY": "0px"});
      }
  },
    offset: globalOffset
});
// end of instructions section


// Slices section

var ss1a = new Waypoint({
  element: document.getElementById('slice-1a'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#onion-cycle").velocity({"opacity": "0"});
          
          $("#slice-1").velocity({'opacity': '1'});
          $("#s1-india").velocity({'opacity': '1'});
          $("#all-slices").velocity({'opacity': '1'});
          $("#s1-reveal1").velocity({'opacity': '1'});
      }
      else{
          $("#onion-cycle").velocity({"opacity": "1"});
          
          $("#slice-1").velocity({'opacity': '0'});
          $("#s1-india").velocity({'opacity': '0'});
          $("#all-slices").velocity({'opacity': '0'});
          $("#s1-reveal1").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});

var ss1b = new Waypoint({
  element: document.getElementById('slice-1b'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#s1-reveal1").velocity({'opacity': '0'});
          $("#slice-china_1_").velocity({translateX: "-2000px"},{delay: 400});
          $("#slice-usa_1_").velocity({translateX: "2000px"},{delay: 400});
          $("#slice-iran_1_").velocity({translateX: "2000px"},{delay: 400});
          $("#slice-russia_1_").velocity({translateX: "2000px"},{delay: 400});
      }
      else{
          $("#s1-reveal1").velocity({'opacity': '1'});
          $("#slice-china_1_").velocity({translateX: "0px"});
          $("#slice-usa_1_").velocity({translateX: "0px"});
          $("#slice-iran_1_").velocity({translateX: "0px"});
          $("#slice-russia_1_").velocity({translateX: "0px"});
      }
  },
    offset: globalOffset
});

var ss2 = new Waypoint({
  element: document.getElementById('slice-2'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#all-slices").velocity({'opacity': '0'},{delay: 1000});
          $("#maha-slice").velocity({translateX: "100px"},{delay: 1000});
          $("#karna-slice").velocity({translateY: "100px"},{delay: 1000});
          $("#guja-slice").velocity({translateX: "-100px"},{delay: 1000});
          $("#others-slice").velocity({'opacity': '0'},{delay: 1000});
      }
      else{
          $("#all-slices").velocity({'opacity': '1'});
          $("#maha-slice").velocity({translateX: "0px"});
          $("#karna-slice").velocity({translateY: "0px"});
          $("#guja-slice").velocity({translateX: "0px"});
          $("#others-slice").velocity({'opacity': '1'});
      }
  },
    offset: globalOffset
});

var ss3 = new Waypoint({
  element: document.getElementById('slice-3'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#s1-india").velocity({'opacity': '0'});
          $("#s1-lasalgaon").velocity({'opacity': '1'});
      }
      else{
          $("#s1-india").velocity({'opacity': '1'});
          $("#s1-lasalgaon").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});

//end of slices section

var qty1 = new Waypoint({
  element: document.getElementById('qty-1'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#s1-lasalgaon").velocity({'opacity': '0'});
          $("#qty-rise").velocity({'opacity': '1'});
          $("#qty-highlight").velocity({'opacity': '1'},{delay: 1000});
      }
      else{
          $("#s1-lasalgaon").velocity({'opacity': '1'});
          $("#qty-rise").velocity({'opacity': '0'});
          $("#qty-highlight").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});



var wp1 = new Waypoint({
  element: document.getElementById('scrolly-1'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#qty-rise").velocity({'opacity': '0'});
          $("#page-1").velocity({'opacity': '1'});
      }
      else{
          $("#qty-rise").velocity({'opacity': '1'});
          $("#page-1").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});

var wp1a = new Waypoint({
  element: document.getElementById('scrolly-2'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#p1-reveal1").velocity({'opacity': '1'});
      }
      else{
          $("#p1-reveal1").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});

var wp2 = new Waypoint({
  element: document.getElementById('scrolly-3'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#p1-reveal1").velocity({'opacity': '0'});
          $("#p1-reveal2").velocity({'opacity': '1'});
      }
      else{
          $("#p1-reveal1").velocity({'opacity': '1'});
          $("#p1-reveal2").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});


var wp3 = new Waypoint({
  element: document.getElementById('scrolly-5'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#page-1").velocity({'opacity': '0'});
          $("#page-2").velocity({'opacity': '1'});
          $("#p2-reveal1").velocity({'opacity': '1'});
      }
      else{
          $("#page-2").velocity({'opacity': '0'});
          $("#p2-reveal1").velocity({'opacity': '0'});
          $("#page-1").velocity({'opacity': '1'});
      }
  },
    offset: globalOffset
});


var wp4 = new Waypoint({
  element: document.getElementById('scrolly-6'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#p2-reveal2").velocity({'opacity': '1'});
      }
      else{
          $("#p2-reveal2").velocity({'opacity': '1'});
      }
  },
    offset: globalOffset
});


var wp5 = new Waypoint({
  element: document.getElementById('scrolly-7'),
  handler: function(direction) {
      if (direction === 'down') {
          $("#page-2").velocity({'opacity': '0'});
          $("#page-3").velocity({'opacity': '1'});
          
          $("#p3-reveal1").velocity({'opacity': '1'});
          $("#p3-reveal2").velocity({'opacity': '1'});
      }
      else{
          $("#page-2").velocity({'opacity': '1'});
          $("#page-3").velocity({'opacity': '0'});
          
          $("#p3-reveal1").velocity({'opacity': '0'});
          $("#p3-reveal2").velocity({'opacity': '0'});
      }
  },
    offset: globalOffset
});


var wp6 = new Waypoint({
  element: document.getElementById('scrolly-6'),
  handler: function(direction) {
      if (direction === 'down') {
          
      }
      else{
          
      }
  },
    offset: globalOffset
});

var wp7 = new Waypoint({
  element: document.getElementById('scrolly-7'),
  handler: function(direction) {
      if (direction === 'down') {
          
      }
      else{
          
      }
  },
    offset: globalOffset
});


