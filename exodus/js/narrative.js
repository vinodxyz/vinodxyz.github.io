var globalOffset = "40%";

var wp1 = new Waypoint({
  element: document.getElementById('wc-text-title'),
  handler: function(direction) {
      if (direction === 'down') {
          $('#warchart-wrapper').addClass('graph-fixed');
      }
      else{
          $('#warchart-wrapper').removeClass('graph-fixed');
      }
  },
    offset: "10%"
});

var wp2 = new Waypoint({
  element: document.getElementById('main-insight-afghan'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".legendSquareAfghanistan").dispatch("mouseover");
      }
      else{
          d3.selectAll(".legendSquareAfghanistan").dispatch("mouseout");
      }
  },
    offset: globalOffset
});

var wp3 = new Waypoint({
  element: document.getElementById('main-insight-syria'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".legendSquare").dispatch("mouseout");
          d3.selectAll(".legendSquareSyrianArabRep").dispatch("mouseover");
      }
      else{
         d3.selectAll(".legendSquareSyrianArabRep").dispatch("mouseout");
          d3.selectAll(".legendSquareAfghanistan").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var wp4 = new Waypoint({
  element: document.getElementById('main-insight-ethiopia'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".legendSquare").dispatch("mouseout");
          d3.selectAll(".legendSquareEthiopia").dispatch("mouseover");
      }
      else{
          d3.selectAll(".legendSquareEthiopia").dispatch("mouseout");
          d3.selectAll(".legendSquareSyrianArabRep").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw0 = new Waypoint({
  element: document.getElementById('main-coldwar'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".legendSquare").dispatch("mouseout");
          d3.select("#coldwar-p").dispatch("click");
      }
      else{
          d3.selectAll(".legendSquare").dispatch("mouseout");
          d3.selectAll(".legendSquareEthiopia").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw1 = new Waypoint({
  element: document.getElementById('main-cw1'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1945").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1945").dispatch("mouseout");
          d3.selectAll(".legendSquare").dispatch("mouseout");
          d3.select("#coldwar-p").dispatch("click");
      }
  },
    offset: globalOffset
});

var cw2 = new Waypoint({
  element: document.getElementById('main-cw2'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1945").dispatch("mouseout");
          d3.selectAll(".mark-1948").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1948").dispatch("mouseout");
          d3.selectAll(".mark-1945").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw3 = new Waypoint({
  element: document.getElementById('main-cw3'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1948").dispatch("mouseout");
          d3.selectAll(".mark-1946").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1946").dispatch("mouseout");
          d3.selectAll(".mark-1948").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw4 = new Waypoint({
  element: document.getElementById('main-cw4'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1946").dispatch("mouseout");
          d3.selectAll(".mark-1962").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1962").dispatch("mouseout");
          d3.selectAll(".mark-1946").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw5 = new Waypoint({
  element: document.getElementById('main-cw5'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.select(".VietnamWar").dispatch("mouseover");
          d3.selectAll(".mark-1962").dispatch("mouseout");
          d3.selectAll(".mark-1950").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1950").dispatch("mouseout");
          d3.select(".VietnamWar").dispatch("mouseout");
          d3.selectAll(".mark-1962").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw6 = new Waypoint({
  element: document.getElementById('main-cw6'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1950").dispatch("mouseout");
          d3.select(".VietnamWar").dispatch("mouseout");
          d3.selectAll(".mark-1953").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1953").dispatch("mouseout");
          d3.selectAll(".mark-1950").dispatch("mouseover");
          d3.select(".VietnamWar").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw7 = new Waypoint({
  element: document.getElementById('main-cw7'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1953").dispatch("mouseout");
          d3.select(".SovietwarinAfghanistan").dispatch("mouseover");
      }
      else{
          d3.select(".SovietwarinAfghanistan").dispatch("mouseout");
          d3.selectAll(".mark-1953").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var cw8 = new Waypoint({
  element: document.getElementById('main-cw8'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.select(".SovietwarinAfghanistan").dispatch("mouseout");
          d3.selectAll(".mark-1980").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1980").dispatch("mouseout");
          d3.select(".SovietwarinAfghanistan").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me0 = new Waypoint({
  element: document.getElementById('main-me0'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1980").dispatch("mouseout");
          d3.select("#middleeast-p").dispatch("click");
      }
      else{
          d3.select("#coldwar-p").dispatch("click");
          d3.selectAll(".mark-1980").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me1 = new Waypoint({
  element: document.getElementById('main-me1'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1950").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1950").dispatch("mouseout");
      }
  },
    offset: globalOffset
});

var me2 = new Waypoint({
  element: document.getElementById('main-me2'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1950").dispatch("mouseout");
          d3.selectAll(".mark-1953").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1953").dispatch("mouseout");
          d3.selectAll(".mark-1950").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me3 = new Waypoint({
  element: document.getElementById('main-me3'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1953").dispatch("mouseout");
          d3.selectAll(".mark-1979").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1979").dispatch("mouseout");
          d3.selectAll(".mark-1953").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me4 = new Waypoint({
  element: document.getElementById('main-me4'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1979").dispatch("mouseout");
          d3.selectAll(".mark-1980").dispatch("mouseover");
          d3.selectAll(".Iran-IraqWar").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1980").dispatch("mouseout");
          d3.selectAll(".Iran-IraqWar").dispatch("mouseout");
          d3.selectAll(".mark-1979").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me5 = new Waypoint({
  element: document.getElementById('main-me5'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1980").dispatch("mouseout");
          d3.selectAll(".Iran-IraqWar").dispatch("mouseout");
          d3.selectAll(".IraqWar").dispatch("mouseover");
          d3.selectAll(".mark-2003").dispatch("mouseover");
      }
      else{
          d3.selectAll(".IraqWar").dispatch("mouseout");
          d3.selectAll(".mark-2003").dispatch("mouseout");
          d3.selectAll(".mark-1980").dispatch("mouseover");
          d3.selectAll(".Iran-IraqWar").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me6 = new Waypoint({
  element: document.getElementById('main-me6'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".IraqWar").dispatch("mouseout");
          d3.selectAll(".mark-2003").dispatch("mouseout");
          d3.selectAll(".mark-2010").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2010").dispatch("mouseout");
          d3.selectAll(".IraqWar").dispatch("mouseover");
          d3.selectAll(".mark-2003").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var me7 = new Waypoint({
  element: document.getElementById('main-me7'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-2010").dispatch("mouseout");
          d3.selectAll(".mark-2011").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2011").dispatch("mouseout");
          d3.selectAll(".mark-2010").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te0 = new Waypoint({
  element: document.getElementById('main-te0'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-2011").dispatch("mouseout");
          d3.selectAll("#terrorism-p").dispatch("click");
      }
      else{
          d3.selectAll("#middleeast-p").dispatch("click");
          d3.selectAll(".mark-2011").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te1 = new Waypoint({
  element: document.getElementById('main-te1'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1980").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1980").dispatch("mouseout");
      }
  },
    offset: globalOffset
});

var te2 = new Waypoint({
  element: document.getElementById('main-te2'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1980").dispatch("mouseout");
          d3.selectAll(".mark-1989").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-1989").dispatch("mouseout");
          d3.selectAll(".mark-1980").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te3 = new Waypoint({
  element: document.getElementById('main-te3'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-1989").dispatch("mouseout");
          d3.selectAll(".mark-2001").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2001").dispatch("mouseout");
          d3.selectAll(".mark-1989").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te4 = new Waypoint({
  element: document.getElementById('main-te4'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-2001").dispatch("mouseout");
          d3.selectAll(".IraqWar").dispatch("mouseover");
          d3.selectAll(".mark-2003").dispatch("mouseover");
      }
      else{
          d3.selectAll(".IraqWar").dispatch("mouseout");
          d3.selectAll(".mark-2003").dispatch("mouseout");
          d3.selectAll(".mark-2001").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te5 = new Waypoint({
  element: document.getElementById('main-te5'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".IraqWar").dispatch("mouseout");
          d3.selectAll(".mark-2003").dispatch("mouseout");
          d3.selectAll(".mark-2004").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2004").dispatch("mouseout");
          d3.selectAll(".IraqWar").dispatch("mouseover");
          d3.selectAll(".mark-2003").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te6 = new Waypoint({
  element: document.getElementById('main-te6'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-2004").dispatch("mouseout");
          d3.selectAll(".mark-2006").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2006").dispatch("mouseout");
          d3.selectAll(".mark-2004").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te7 = new Waypoint({
  element: document.getElementById('main-te7'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-2006").dispatch("mouseout");
          d3.selectAll(".mark-2011").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2011").dispatch("mouseout");
          d3.selectAll(".mark-2006").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var te8 = new Waypoint({
  element: document.getElementById('main-te8'),
  handler: function(direction) {
      if (direction === 'down') {
          d3.selectAll(".mark-2011").dispatch("mouseout");
          d3.selectAll(".mark-2014").dispatch("mouseover");
          d3.selectAll(".SyrianCivilWar").dispatch("mouseover");
      }
      else{
          d3.selectAll(".mark-2014").dispatch("mouseout");
          d3.selectAll(".SyrianCivilWar").dispatch("mouseout");
          d3.selectAll(".mark-2011").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

var reset = new Waypoint({
  element: document.getElementById('reset-viz1'),
  handler: function(direction) {
      if (direction === 'down') {
          //$('#warchart-wrapper').removeClass('graph-fixed');
          d3.selectAll(".mark-2014").dispatch("mouseout");
          d3.selectAll(".SyrianCivilWar").dispatch("mouseout");
          //$("#warchart-wrapper").fadeOut("slow");
          
      }
      else{
          //$('#warchart-wrapper').addClass('graph-fixed');
          //$("#warchart-wrapper").fadeIn("slow");
          d3.selectAll(".mark-2014").dispatch("mouseover");
          d3.selectAll(".SyrianCivilWar").dispatch("mouseover");
      }
  },
    offset: globalOffset
});

