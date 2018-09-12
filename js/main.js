$(document).ready(() => {
  landingPage = new LandingController().main();
});

/**
 * Lading Controller Class
 */
class LandingController {

  constructor() {
    this._isWebkit = false;
    this.checkBrowser();
  }

  get isWebkit() {
    return this._isWebkit;
  }

  checkBrowser() {
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      this._isWebkit = true;
    }
  }

  /**
   * Set header's width is 100% to parent
   */
  resizeHeader() {
    $('.header').width($('body').width())
    $(window).on('resize', () => {
      $('.header').width($('body').width())
    })
  }

  /**
   * Navigation for screen size < 992px
   */
  displayMinNavigation() {
    $('.navbar-toggler').on('click', () => {
      let displayAttr = $('.navigation-mobile').css('display')
      if (displayAttr == "none") {
        $('.navigation-mobile').css('display', 'block')
      } else {
        $('.navigation-mobile').css('display', 'none')
      }
    })
  }

  setScrollEvent() {
    $(window).scroll(() => {
      let top = $(window).scrollTop()

      $('.nav-section').each((index) => {
        let currentSection = $('.nav-section')[index]
        if (top > $(currentSection).offset().top - 100) {
          let sectionId = $(currentSection).attr('id')
          $('.nav-' + sectionId).addClass('selected')

          $('.nav-section').each((index) => {
            let section = $('.nav-section')[index]
            if ($(section).attr('id') != sectionId) {
              $('.nav-' + $(section).attr('id')).removeClass('selected')
            }
          });

        }
      })
    })
  }

  onClickNavItems() {
    $(document).ready(($) => {
      function scrollToSection(event) {
        event.preventDefault()
        var $section = $($(this).attr('href'))
        $('html, body').animate({
          scrollTop: $section.offset().top - 60
        }, 500)
      }
      $('[data-scroll]').on('click', scrollToSection)
    });
  }

  onClickMinNavItems() {
    $('.navigation-mobile a').on('click', () => {
      $('.navigation-mobile').css('display', 'none')
    })
  }

  /**
   * Lazy load Timeline and roadmap
   */
  setLzLoadTimelineAndRoadmap() {
    $('.timeline table tr').each((index) => {
      let tr = $('.timeline table tr')[index]
      $(tr).on('inview', (event, isInView) => {
        if (isInView) {
          console.log($(tr).children().first().css('border-right'))
          $(tr).addClass('lz-load')
          if (this.isWebkit) {
            $(tr).children().first().css('border-right', '1px rgba(13, 0, 42, 0) solid')
          }
          // Add lz-load-border class to first td of tr[index] that is not last element of table
          if (index != $('.timeline table tr').length - 1) {
            $(tr).children().first().addClass('lz-load-border')
          }
        }
      })
    })
  }

  /**
   * Token Chart in Heta coin-token block
   */
  createTokenChart() {
    let ctx = document.getElementById("myChart").getContext("2d")
    new TokenChart(ctx)
  }

  createEventSlideShow() {
    $('#eventCarousel').on('slide.bs.carousel', (e) => {
      var $e = $(e.relatedTarget)
      var idx = $e.index()
      var itemsPerSlide = 3
      var totalItems = $('#eventCarousel .carousel-item').length;

      if (idx >= totalItems - (itemsPerSlide - 1)) {
        var it = itemsPerSlide - (totalItems - idx)
        for (var i = 0; i < it; i++) {
          // append slides to end
          if (e.direction == "left") {
            $('#eventCarousel .carousel-item').eq(i).appendTo('.carousel-inner')
          }
          else {
            $('#eventCarousel .carousel-item').eq(0).appendTo('.carousel-inner')
          }
        }
      }
    })
  }

  onClickEventImage() {
    $('#eventCarousel img').each((index) => {
      let img = $('#eventCarousel img')[index];
      img.onclick = () => {
        this._openModal()
        this.showSlides(index)
      }
    })
    $("#myModal").on('click', (e) => {
      if (!$('.modal-content').is(':hover')) {
        this._closeModal()
      }
    })
  }

  _openModal() {
    $('#myModal').css('display', "block")
  }

  _closeModal() {
    $('#myModal').css('display', "none")
  }

  showSlides(n) {
    this._slideIndex = n;
    var slides = $('.mySlides')
    if (n >= slides.length) { this._slideIndex = 0 }
    if (n < 0) { this._slideIndex = slides.length - 1 }

    let imgs = $('.mySlides img')
    let captionText = $('#caption')

    $(slides).each((index) => {
      $($(slides)[index]).css('display', 'none')
    })

    $($(slides)[this._slideIndex]).css('display', 'block')
    let img = $(imgs)[this._slideIndex]
    $(captionText).html($(img).attr('alt'))
  }

  onClickNextBtnInSlideShow() {
    $('#myModal .prev').on('click', () => {
      this._plusSlides(-1);
    })
    $('#myModal .next').on('click', () => {
      this._plusSlides(1);
    })
  }

  _plusSlides(n) {
    this.showSlides(this._slideIndex += n);
  }

  /**
   * Hover logo in map
   */
  setAnimationAtMap() {
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
  }

  /**
   * Main
   */
  main() {
    this.resizeHeader()
    this.displayMinNavigation()
    this.setScrollEvent()
    this.onClickNavItems()
    this.onClickMinNavItems()
    this.setLzLoadTimelineAndRoadmap()
    this.createTokenChart()
    this.createEventSlideShow()
    this.onClickEventImage()
    this.onClickNextBtnInSlideShow()
    this.setAnimationAtMap()
  }
}

/**
 * Token Chart Class
 */
class TokenChart {

  constructor(ctx) {
    this.labels = []
    this.data = []
    this.borderWidth = 0
    this.backgroundColor = []
    this.hoverBackgroundColor = []
    this.hoverBorderWidth = []
    this.cutoutPercentage = 50
    this.hover = {}
    this.init(ctx);
  }

  config() {
    this.labels = [
      "Teams",
      "Advisor & Partners",
      "Bounty & Airdrop",
      "Business Operation",
      "Product Development",
      "Foundation Reserve",
      "Private Sales",
      "Public Sales"
    ]
    this.data = [15, 3, 5, 3, 4, 10, 20, 40]
    this.borderWidth = 0
    this.backgroundColor = [
      'rgba(26, 17, 56, 0.9)',
      'rgba(229, 107, 16, 0.9)',
      'rgba(224, 162, 7, 0.9)',
      'rgba(204, 110, 58, 0.9)',
      'rgba(135, 125, 12, 0.9)',
      'rgba(255, 176, 0, 0.9)',
      'rgba(109, 47, 6, 0.9)',
      'rgba(229, 107, 16, 0.9)'
    ]
    this.hoverBackgroundColor = [
      'rgba(26, 17, 56, 1)',
      'rgba(229, 107, 16, 1)',
      'rgba(224, 162, 7, 1)',
      'rgba(204, 110, 58, 1)',
      'rgba(175, 125, 12, 1)',
      'rgba(255, 176, 0, 1)',
      'rgba(109, 47, 6, 1)',
      'rgba(229, 107, 16, 1)'

    ]
    this.hoverBorderColor = [
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)',
      'rgba(255, 255, 255, 1)'
    ]
    this.hoverBorderWidth = [
      2, 2, 2, 2, 2, 2, 2, 2
    ]
    this.cutoutPercentage = 60
    this.hover = {
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
    }
  }

  init(ctx) {
    this.config();
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [{
          data: this.data,
          backgroundColor: this.backgroundColor,
          borderWidth: this.borderWidth,
          hoverBackgroundColor: this.hoverBackgroundColor,
          hoverBorderColor: this.hoverBorderColor,
          hoverBorderWidth: this.hoverBorderWidth
        }]
      },
      options: {
        cutoutPercentage: this.cutoutPercentage,
        responsive: true,
        legend: {
          display: false
        },
        hover: this.hover,
      }
    })
  }
}