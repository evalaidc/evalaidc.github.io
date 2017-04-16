// Custom Theme JavaScript

// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});
// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#],[data-toggle],[data-target],[data-slide])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
//#to-top button appears after scrolling
var fixed = false;
$(document).scroll(function() {
    if ($(this).scrollTop() > 250) {
        if (!fixed) {
            fixed = true;
            // $('#to-top').css({position:'fixed', display:'block'});
            $('#to-top').show("slow", function() {
                $('#to-top').css({
                    position: 'fixed',
                    display: 'block'
                });
            });
        }
    } else {
        if (fixed) {
            fixed = false;
            $('#to-top').hide("slow", function() {
                $('#to-top').css({
                    display: 'none'
                });
            });
        }
    }
});

function cycleBackgrounds() {
	var index = 0;

	$imageEls = $('.toggle-image'); // Get the images to be cycled.

	setInterval(function () {
		// Get the next index.  If at end, restart to the beginning.
		index = index + 1 < $imageEls.length ? index + 1 : 0;
		// Show the next image.
		$imageEls.eq(index).addClass('show');
		// Hide the previous image.
		$imageEls.eq(index - 1).removeClass('show');

	}, 3500);
};

// Document Ready.
$(function () {
	cycleBackgrounds();
});


// portfolio wheel rotations
var wheel = Draggable.create("#wheel", {
   type:"rotation",
   throwProps:true,
     snap:function(endValue) {
      return Math.round(endValue / 90) * 90;
   },
    onDrag: function() {},
    onThrowComplete: function() {
      dragActive()
    }
});

TweenMax.set('#wheel li:not(.active) .wheelDetails > *', {
  opacity: 0,
  y: -10
})

// Calculate which product is active
function dragActive() {
  var rot = wheel[0].rotation / 360
  var decimal = rot % 1
  var sliderLength = $('#wheel li').length
  var tempIndex = Math.round(sliderLength * decimal)
  var index

  if (rot < 0) {
    index = Math.abs(tempIndex)
  } else {
    index = sliderLength - tempIndex
  }

  if (decimal === 0) {
    index = 0
  }

  TweenMax.staggerTo('#wheel li.active .wheelDetails > *', 0.6,   {
    opacity: 0,
    y: -10
    }, 0.1)

  $('#wheel li.active').removeClass('active')
  $($('#wheel li')[index]).addClass('active')

  TweenMax.staggerTo('#wheel li.active .wheelDetails > *', 0.6,   {
    opacity: 1,
    y: 0
  }, 0.1)

}

// Tween rotation
function rotateDraggable(deg, callback) {
  var rot = wheel[0].rotation
  var tl = new TimelineMax()

  tl
    .to('#wheel', .5, {
      rotation: rot + deg,
      onComplete: function() {
        callback()
      }
    });

  wheel[0].rotation = rot + deg
}

// Handlers
function nextHandler() {
  var current = $('#wheel li.active')
  var item = current + 1
  if (item > $('#wheel li').length) {
    item = 1
  }
  rotateDraggable(360/$('#wheel li').length, dragActive);
}

function prevHandler() {
  var current = $('#wheel li.active')
  var item = current - 1
  if (item > 1) {
    item = $('#wheel li').length
  }
  rotateDraggable(-360/$('#wheel li').length, dragActive);
}

$('.next').on('click', nextHandler);
$('.prev').on('click', prevHandler);

var square = '<svg x="0px" y="0px" width="1100px" height="600px" viewBox="0 0 1200 600"><rect x="0.002" y="0.499" width="1200" height="600"/></svg>'


// about me word typer
var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };
