(function($) {
  "use strict"

  var responsiveNav = $('#responsive-nav'),
    catToggle = $('#responsive-nav .category-nav .category-header'),
    catList = $('#responsive-nav .category-nav .category-list'),
    menuToggle = $('#responsive-nav .menu-nav .menu-header'),
    menuList = $('#responsive-nav .menu-nav .menu-list');

  catToggle.on('click', function() {
    menuList.removeClass('open');
    catList.toggleClass('open');
  });

  menuToggle.on('click', function() {
    catList.removeClass('open');
    menuList.toggleClass('open');
  });

  $(document).click(function(event) {
    if (!$(event.target).closest(responsiveNav).length) {
      if (responsiveNav.hasClass('open')) {
        responsiveNav.removeClass('open');
        $('#navigation').removeClass('shadow');
      } else {
        if ($(event.target).closest('.nav-toggle > button').length) {
          if (!menuList.hasClass('open') && !catList.hasClass('open')) {
            menuList.addClass('open');
          }
          $('#navigation').addClass('shadow');
          responsiveNav.addClass('open');
        }
      }
    }
  });

  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.0';
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  $(document).ready(function(){
    $('#home-slick').slick({
      autoplay: true,
      infinite: true,
      speed: 500,
      arrows: true,
      fade: true
    });

  $('#product-slick-2').slick({
      slidesToShow: 4,
      slidesToScroll: 2,
      autoplay: true,
      infinite: true,
      speed: 300,
      dots: true,
      arrows: false,
      appendDots: '.product-slick-dots-2',
      responsive: [{
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            dots: false,
            arrows: true,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
      ]
    });

    $('#product-main-view').slick({
      infinite: true,
      speed: 300,
      dots: false,
      arrows: true,
      fade: true,
      asNavFor: '#product-view',
    });

    $('#product-view').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      centerMode: true,
      focusOnSelect: true,
      asNavFor: '#product-main-view',
    });

    $('#product-main-view .product-view').zoom();

    var slider = document.getElementById('price-slider');
    if (slider) {
      noUiSlider.create(slider, {
        start: [1, 999],
        connect: true,
        tooltips: [true, true],
        format: {
          to: function(value) {
            return value.toFixed(2) + '$';
          },
          from: function(value) {
            return value
          }
        },
        range: {
          'min': 1,
          'max': 999
        }
      });
    }
    $(".input").change(function(){
      var quantity = $(this).val();
      var product_id = $(this).prev("input").val();
      $.ajax({
        url: "carts/" + product_id,
        method: "put",
        data: {quantity: quantity}
      });
    });
  });
})(jQuery);
