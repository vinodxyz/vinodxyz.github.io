if($(window).width() >= 992) {
  var header = $('header');
  var range = 200;

  var scrollTop;
  var offsetHeader;
  var offsetFixTrigger;
  // var offsetBimg2Trigger;
  // var offsetBimg3Trigger;
  // var offsetBimg4Trigger;
  var heightHeader;
  var calc;
  var offsetBimgPadding = $(window).height()*0.5;
  var offsetGoingPadding;
  if ($(window).width() >= 992) {
    offsetGoingPadding = 250;
  }
  else {
    offsetGoingPadding = 350;
  }
  var offsetGoingTrigger;
  var offsetImgWrapper;
  var textColumnPadding;



  $(window).on('scroll', function () {
      
      //header opacity fade on scroll
      scrollTop = $(this).scrollTop();
      offsetHeader = header.offset().top;
      heightHeader = header.outerHeight();
      offsetHeader = offsetHeader + heightHeader / 1.5;
      calc = 1 - (scrollTop - offsetHeader + range) / range;
    
      header.css({ 'opacity': calc });
    
      if ( calc > '1' ) {
        header.css({ 'opacity': 1 });
      } else if ( calc < '0' ) {
        header.css({ 'opacity': 0 });
      }
  });

  $(document).ready(function() {

    //adding countries-graph to DOM
    // $.get('../images/countries-bars.svg', function(data) {
    //   $('#countries-graph').append(data.documentElement);
    //   init();
    // });

    //setting b-img width to fill parent

    

    $('.b-img').css({'width': $('.col-sm-6').width()});

    var waypoint = new Waypoint({
      element: document.getElementById('fix-trigger'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#img-wrapper').addClass('fix');
        }
        else {
          $('#img-wrapper').removeClass('fix');
        }
      },
    });

    var waypoint = new Waypoint({
      element: document.getElementById('b-img2-trigger'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#b-img2').addClass('show');
        }
        else {
          $('#b-img2').removeClass('show');
        }
      },
      offset: offsetBimgPadding
    });

    var waypoint = new Waypoint({
      element: document.getElementById('b-img3-trigger'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#b-img3').addClass('show b-img3-reveal');
        }
        else {
          $('#b-img3').removeClass('show b-img3-reveal');
        }
      },
      offset: offsetBimgPadding
    });

    var waypoint = new Waypoint({
      element: document.getElementById('b-img4-trigger'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#b-img4').addClass('show');
        }
        else {
          $('#b-img4').removeClass('show');
        }
      },
      offset: offsetBimgPadding
    });

    var waypoint = new Waypoint({
      element: document.getElementById('b-img4-trigger'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#b-img4').addClass('show');
        }
        else {
          $('#b-img4').removeClass('show');
        }
      },
      offset: offsetBimgPadding
    });

    var waypoint = new Waypoint({
      element: document.getElementById('b-img4-trigger'),
      handler: function(direction) {
        if (direction === 'down') {
          $('#img-wrapper').addClass('going');
        }
        else {
          $('#img-wrapper').removeClass('going');
        }
      },
      offset: offsetGoingPadding
    });

    var waypoint = new Waypoint({
      element: document.getElementById('countries-graph'),
      handler: function() {
          $('#countries-graph').addClass('anim-trigger');
      },
      offset: $(window).height()*0.6
    });

    var waypoint = new Waypoint({
      element: document.getElementById('billboard-graph'),
      handler: function() {
          $('#billboard-graph').addClass('anim-trigger');
      },
      offset: $(window).height()*0.7
    });

    if ($(window).width() >= 992) {
      $('.zoom').magnify({
        speed: 200,
      });
    }
  });
}