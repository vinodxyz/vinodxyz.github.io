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
    offset: "3%"
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
    offset: "30%"
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
    offset: "30%"
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
    offset: "30%"
});