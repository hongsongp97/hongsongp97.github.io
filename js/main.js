/**
 * Navigation for mobile
 */
$('.header').width($('body').width());
$(window).on('resize', () => {
  $('.header').width($('body').width());
})

function menu() {
  let display = $('.navigation-mobile').css('display');
  if (display == "none") {
    $('.navigation-mobile').css('display', 'block');
  } else {
    $('.navigation-mobile').css('display', 'none');
  }
}

$(document).ready(function ($) {
  function scrollToSection(event) {
    event.preventDefault();
    var $section = $($(this).attr('href'));
    $('html, body').animate({
      scrollTop: $section.offset().top - 60
    }, 500);
  }
  $('[data-scroll]').on('click', scrollToSection);
}(jQuery));

$('.navigation-mobile a').on('click', () => {
  $('.navigation-mobile').css('display', 'none');
})
$(window).scroll(() => {
  let top = $(this).scrollTop();
  let bot = top + $(window).height();
  $('.nav-section').each(function () {
    if (top > $(this).offset().top - 100) {
      let currentSection = $(this).attr('id');
      $('.nav-' + currentSection).addClass('selected');
      $('.nav-section').each(function () {
        if ($(this).attr('id') != currentSection) {
          $('.nav-' + $(this).attr('id')).removeClass('selected');
        }
      });
    }
  })
});


/**
 * 3D building event
 */
// var card = $(".building-img");
// $("body").on("mousemove", function (e) {
//   let top = $('.building').offset().top;
//   let bot = top + $('.building').height();
//   if (e.pageY > top && e.pageY < bot) {
//     var ax = -($(window).innerWidth() / 2 - e.pageX) / 20;
//     var ay = ($(window).innerHeight() / 2 - (e.pageY - top)) / 10 - 5;
//     card.attr("style", "transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg);-webkit-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg);-moz-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg)");
//   } else {
//     card.attr("style", "transform: rotateY(0deg) rotateX(0deg);-webkit-transform: rotateY(0deg) rotateX(0deg);-moz-transform: rotateY(0deg) rotateX(0deg)");
//   }
// });

/**
 * Lazy load Timeline and roadmap
 */
let isWebkit = false;
if(navigator.userAgent.indexOf('Safari') !=-1 && navigator.userAgent.indexOf('Chrome') == -1)
{
  isWebkit = true;
}

for (let i = 1; i <= 10; i++) {
  $('#stage-' + i).on('inview', function (event, isInView) {
    if (isInView) {
      $('#stage-' + i).addClass('lz-load');
      if (isWebkit) {
        $('#stage-' + (i - 1) + ' td:first-child').css('border-right', '1px rgba(13, 0, 42, 0) solid');
      }
      $('#stage-' + (i - 1) + ' td:first-child').addClass('lz-load-border');
    }
  });
}

/**
 * Chart
 */
var ctx = document.getElementById("myChart").getContext("2d");
var myDoughnutChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["Teams", "Advisor & Partners", "Bounty & Airdrop",
      "Business Operation", "Product Development",
      "Foundation Reserve", "Private Sales", "Public Sales"],
    datasets: [{
      label: '# of Votes',
      data: [15, 3, 5, 3, 4, 10, 20, 40],
      backgroundColor: [
        'rgba(26, 17, 56, 1)',
        'rgba(229, 107, 16, 1)',
        'rgba(224, 162, 7, 1)',
        'rgba(204, 110, 58, 1)',
        'rgba(135, 125, 12, 1)',
        'rgba(255, 176, 0, 1)',
        'rgba(109, 47, 6, 1)',
        'rgba(229, 107, 16, 1)'
      ],
      borderWidth: 0,
      hoverBackgroundColor: [
        'rgba(26, 17, 56, 1)',
        'rgba(229, 107, 16, 1)',
        'rgba(224, 162, 7, 1)',
        'rgba(204, 110, 58, 1)',
        'rgba(175, 125, 12, 1)',
        'rgba(255, 176, 0, 1)',
        'rgba(109, 47, 6, 1)',
        'rgba(229, 107, 16, 1)'
      ],
      hoverBorderColor: [
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)',
        'rgba(255, 255, 255, 1)'
      ],
      hoverBorderWidth: [
        2, 2, 2, 2, 2, 2, 2, 2
      ]
    }]
  },
  options: {
    cutoutPercentage: 60,
    responsive: true,
    legend: {
      display: false
    },
    hover: {
      onHover: function (evt, item) {
        try {
          for (var i = 0; i < 8; i++) {
            var chartItem = $('#doughnut-item-' + i);
            chartItem.css('font-weight', 'normal');
            chartItem.css('font-size', '1.125rem');
          }
          var chartItem = $('#doughnut-item-' + item[0]._index);
          chartItem.css('font-weight', 'bolder');
          chartItem.css('font-size', '1.2rem');
        } catch (err) {

        }
      }
    },
  }
});
/**
 * Event gallery
 */
$('#eventCarousel').on('slide.bs.carousel', (e) => {
  var $e = $(e.relatedTarget);
  var idx = $e.index();
  var itemsPerSlide = 3;
  var totalItems = $('#eventCarousel .carousel-item').length;

  if (idx >= totalItems - (itemsPerSlide - 1)) {
    var it = itemsPerSlide - (totalItems - idx);
    for (var i = 0; i < it; i++) {
      // append slides to end
      if (e.direction == "left") {
        $('#eventCarousel .carousel-item').eq(i).appendTo('.carousel-inner');
      }
      else {
        $('#eventCarousel .carousel-item').eq(0).appendTo('.carousel-inner');
      }
    }
  }
});

$('#eventCarousel img').each((index) => {
  let img = $('#eventCarousel img').get(index);
  img.onclick = () => {
    openModal();
  };
});
function openModal() {
  $('#myModal').css('display', "block");
}
function closeModal() {
  $('#myModal').css('display', "none");
}
$("#myModal").on('click', (e) => {
  if (!$('.modal-content').is(':hover')) {
    closeModal();
  }
});

var slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var slides = $('.mySlides');
  var imgs = $('.mySlides img');
  var captionText = $('#caption');
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  captionText.text(imgs[slideIndex - 1].alt);
}

/**
 * Hover logo in map
 */
$(".map .logos .logo-1").hover(() => {
  $(".line-1").css('filter', 'invert(0)');
  $(".line-2").css('filter', 'invert(0)');
  $(".line-3").css('filter', 'invert(0)');
}, () => {
  $(".line-1").css('filter', 'invert(0.3)');
  $(".line-2").css('filter', 'invert(0.3)');
  $(".line-3").css('filter', 'invert(0.3)');
});
$(".map .logos .logo-2").hover(() => {
  $(".line-3").css('filter', 'invert(0)');
  $(".line-4").css('filter', 'invert(0)');
}, () => {
  $(".line-3").css('filter', 'invert(0.3)');
  $(".line-4").css('filter', 'invert(0.3)');
});
$(".map .logos .logo-3").hover(() => {
  $(".line-1").css('filter', 'invert(0)');
  $(".line-5").css('filter', 'invert(0)');
  $(".line-6").css('filter', 'invert(0)');
}, () => {
  $(".line-1").css('filter', 'invert(0.3)');
  $(".line-5").css('filter', 'invert(0.3)');
  $(".line-6").css('filter', 'invert(0.3)');
});
$(".map .logos .logo-4").hover(() => {
  $(".line-2").css('filter', 'invert(0)');
  $(".line-7").css('filter', 'invert(0)');
}, () => {
  $(".line-2").css('filter', 'invert(0.3)');
  $(".line-7").css('filter', 'invert(0.3)');
});
$(".map .logos .logo-5").hover(() => {
  $(".line-4").css('filter', 'invert(0)');
  $(".line-6").css('filter', 'invert(0)');
  $(".line-8").css('filter', 'invert(0)');
}, () => {
  $(".line-4").css('filter', 'invert(0.3)');
  $(".line-6").css('filter', 'invert(0.3)');
  $(".line-8").css('filter', 'invert(0.3)');
});
$(".map .logos .logo-6").hover(() => {
  $(".line-7").css('filter', 'invert(0)');
  $(".line-9").css('filter', 'invert(0)');
}, () => {
  $(".line-7").css('filter', 'invert(0.3)');
  $(".line-9").css('filter', 'invert(0.3)');
});
$(".map .logos .logo-7").hover(() => {
  $(".line-5").css('filter', 'invert(0)');
  $(".line-8").css('filter', 'invert(0)');
  $(".line-9").css('filter', 'invert(0)');
}, () => {
  $(".line-5").css('filter', 'invert(0.3)');
  $(".line-8").css('filter', 'invert(0.3)');
  $(".line-9").css('filter', 'invert(0.3)');
});

setInterval(() => {

});