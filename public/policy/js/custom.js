/*jQuery(document).ready(function ($) {
  $("#main-slider").slick({
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 1000,
    fade: true,
    cssEase: "linear",
    arrows:true,
  });
});

jQuery(document).ready(function ($) {
  $(".comman-slider").slick({
    autoplay: false,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: "linear",
    arrows:false,
    adaptiveHeight: false
  });
});


jQuery(document).ready(function ($) {
const slider = $(".oncomman-slider");
slider
  .slick({
    dots: false,
    autoplay: false,
    autoplaySpeed: 6000,
    fade: true,
    cssEase: "linear",
    arrows:false,
    adaptiveHeight: false
  });

slider.on('wheel', (function(e) {
  e.preventDefault();
  if (e.originalEvent.deltaY < 0) {
    $(this).slick('slickNext');
  } else {
    $(this).slick('slickPrev');
  }
}));
});

 

jQuery(document).ready(function($){
  $window = $(window);
  // ShowHideVideoHeading($window.scrollTop());
  var Counter = 0;
    $window.scroll(function() {
          Counter++;
          if(Counter > 60){
            $(".oncomman-slider").slick('slickNext');
            Counter = 0;
          } else {
          }
    });
}); */

// Accordian
var action="click";
var speed="500";
jQuery(document).ready(function($) {
    // Question handler
    $('li.q').on(action, function() {

      if($(this).hasClass('faqquestionactive')){
        $('li.q').removeClass('faqquestionactive');
        $('li.acc_q').removeClass('acc_active');
        $("span.faqarrow").removeClass("faqarrowup");
        $(this).next().slideToggle(speed).siblings('li.a').slideUp();
      } else {
        $('li.q').removeClass('faqquestionactive');
        $('li.acc_q').removeClass('acc_active');
        $("span.faqarrow").removeClass("faqarrowup");
        $(this).next().slideToggle(speed).siblings('li.a').slideUp();
        $(this).find("span.faqarrow").toggleClass("faqarrowup");
        $(this).addClass('faqquestionactive');

      }

    });

  // Question handler
  $('li.acc_q').on(action, function() {
    $(this).siblings('li.acc_q').removeClass('acc_active');
    $(this).toggleClass('acc_active');
    $(this).next().slideToggle(speed).siblings('li.acc_a').slideUp();
    $(this).next('li.acc_a').siblings('li.acc_a').removeClass('acc_active');
    $(this).next('li.acc_a').addClass('acc_active');
  });

  $('li.acc_q').on('click', function () {
    $("span.faqarrow").toggleClass("faqarrowup");
  });

});


jQuery(document).ready(function ($) {
  $('.menu-bar').click(function(){
    $('body').addClass('menu-opned');
  });
  $('.menu-close').click(function(){
    $('body').removeClass('menu-opned');
  });
  $('.mobile-sub-menu-alt a').click(function(){
    $('body').removeClass('menu-opned');
  });
});

jQuery(document).ready(function ($) {
  if(jQuery(document).scrollTop() > 10){
    $(".site-header").addClass("fixed-header");
  } else {
    $(".site-header").removeClass("fixed-header");
  }
  
  $(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
        $(".site-header").addClass("fixed-header");
    } else {
        $(".site-header").removeClass("fixed-header");
    }
  });
});

jQuery(document).ready(function ($) {
  $(".member-popup-wrapper").click(function(){
    $(this).find('.team-popup').toggleClass('show-popup');
  }); 
    $(".popup-close-btn").click(function(){
  }); 
  $(".popupcontdib").click(function(){
      $(".team-popup").removeClass("show-popup");  
  }); 
  
  $('form').keypress(function(event) {
    // Check if Enter key is pressed (key code 13) Enter
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevent form submission
    }
  });

});

/** Contact us page popup */
jQuery(document).ready(function ($) {
  $('.dmenu.last-link').click(function(e){
    e.preventDefault();
    $('.site-header').toggleClass('contact-popup-show');
    $('.contact-popup').toggleClass('enable-contact-popup');
    $('html').toggleClass('inner-scroll');
      //$('#con-emailForm')[0].reset();
      //$('input').removeClass('has-value');
      //$('select#type_enq_con').val('').trigger('change');
      //$('.select2-selection').removeClass('is-invalid');
      //$('input, textarea').removeClass('error');
      //$('button#con_submitForm').html(`Get Your Answer <svg width="18" height="18" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      //            <path d="M6.82994 5.29019L2.58994 1.05019C2.49698 0.956464 2.38638 0.88207 2.26452 0.831301C2.14266 0.780533 2.01195 0.754395 1.87994 0.754395C1.74793 0.754395 1.61723 0.780533 1.49537 0.831301C1.37351 0.88207 1.26291 0.956464 1.16994 1.05019C0.983692 1.23756 0.87915 1.49101 0.87915 1.75519C0.87915 2.01938 0.983692 2.27283 1.16994 2.46019L4.70994 6.00019L1.16994 9.54019C0.983692 9.72756 0.87915 9.98101 0.87915 10.2452C0.87915 10.5094 0.983692 10.7628 1.16994 10.9502C1.26338 11.0429 1.3742 11.1162 1.49604 11.166C1.61787 11.2157 1.74834 11.241 1.87994 11.2402C2.01155 11.241 2.14201 11.2157 2.26385 11.166C2.38569 11.1162 2.4965 11.0429 2.58994 10.9502L6.82994 6.71019C6.92367 6.61723 6.99807 6.50663 7.04883 6.38477C7.0996 6.26291 7.12574 6.1322 7.12574 6.00019C7.12574 5.86818 7.0996 5.73748 7.04883 5.61562C6.99807 5.49376 6.92367 5.38316 6.82994 5.29019Z" fill="#0C2696"></path>
      //        </svg>`);
      //$('span[aria-labelledby="select2-country_con-container"]').removeClass('is-invalid');
      //$('span[aria-labelledby="select2-type_enq_con-container"]').removeClass('is-invalid');
      //$('span.error').remove();
  });

  $('.contact-popup-close').click(function(){
    $('.mail-status_con').html('');
    $('.site-header').removeClass('contact-popup-show');
    $('.contact-popup').removeClass('enable-contact-popup');
    $('html').removeClass('inner-scroll');
    //$('#con-emailForm')[0].reset();
    //$('input').removeClass('has-value');
    //$('.intl-tel-input').next('label').removeClass('has-value');
    //$('select#country_con').val('').trigger('change');
    //$('select#type_enq_con').val('').trigger('change');
    //$('.select2-selection').removeClass('is-invalid');
    //$('input, textarea').removeClass('error');
    //$('button#con_submitForm').html(`JOIN THE TEAM <svg width="18" height="18" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    //            <path d="M6.82994 5.29019L2.58994 1.05019C2.49698 0.956464 2.38638 0.88207 2.26452 0.831301C2.14266 0.780533 2.01195 0.754395 1.87994 0.754395C1.74793 0.754395 1.61723 0.780533 1.49537 0.831301C1.37351 0.88207 1.26291 0.956464 1.16994 1.05019C0.983692 1.23756 0.87915 1.49101 0.87915 1.75519C0.87915 2.01938 0.983692 2.27283 1.16994 2.46019L4.70994 6.00019L1.16994 9.54019C0.983692 9.72756 0.87915 9.98101 0.87915 10.2452C0.87915 10.5094 0.983692 10.7628 1.16994 10.9502C1.26338 11.0429 1.3742 11.1162 1.49604 11.166C1.61787 11.2157 1.74834 11.241 1.87994 11.2402C2.01155 11.241 2.14201 11.2157 2.26385 11.166C2.38569 11.1162 2.4965 11.0429 2.58994 10.9502L6.82994 6.71019C6.92367 6.61723 6.99807 6.50663 7.04883 6.38477C7.0996 6.26291 7.12574 6.1322 7.12574 6.00019C7.12574 5.86818 7.0996 5.73748 7.04883 5.61562C6.99807 5.49376 6.92367 5.38316 6.82994 5.29019Z" fill="#0C2696"></path>
    //        </svg>`);
    //$('span[aria-labelledby="select2-country_con-container"]').removeClass('is-invalid');
    //$('span[aria-labelledby="select2-type_enq_con-container"]').removeClass('is-invalid');
    //$('span.error').remove();
  });

  /* Hide error msg div */
  //setTimeout(function() {
  //  $('.mail-status').fadeOut('fast');
  //}, 5000);
});


/** contact us form validation */ /*
jQuery(document).ready(function ($) {

  jQuery.validator.addMethod("validate_email", function(value, element) {
      if (/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value)) {
          return true;
      } else {
          return false;
      }
  }, "Please enter a valid Email.");

  jQuery.validator.addMethod("validate_phone_number", function(value, element) {
      if(value.length > 8 && value.length < 11){
        return true;
      } else {
          return false;
      }
  }, "Please enter a valid Email.");

  $("form[name='con-registration']").validate({
    errorPlacement: function(error, element) {
			$( element ).closest( ".form-group, .form-group_wrapper, #message_con" ).after( error );
		},
    errorElement: "span",
    rules: {
      firstname_con: "required",
      lastname_con: "required",
      mobile_num: "required",
      email_con: "required",
      company_con: "required",
      country_con: "required",
      type_enq_con: "required",
      message_con: "required",
      email_con: {
        required: true,
        email: true,
        validate_email: true
      },
      mobile_num: {
        required: true,
        validate_phone_number: true,
      }
    },
    messages: {
      firstname_con: "Please enter first name",
      lastname_con: "Please enter last name",
      mobile_num: "Please enter valid phone number",
      email_con: "Please enter a valid email address",
      company_con: "Please enter company name",
      country_con: "Please select your country",
      type_enq_con: "Please select your enquiry type",
      message_con: "Please enter message",
    }
  });
}); */

/** enquiry form validation */ /*
jQuery(document).ready(function ($) {
  $("form[name='enquiry_registration']").validate({
    errorPlacement: function(error, element) {
			$( element ).closest( ".form-group, .form-group_wrapper, #message_enq" ).after( error );
		},
    errorElement: "span",
    rules: {
      firstname_enq: "required",
      lastname_enq: "required",
      mobile_code_enq: "required",
      email_enq: "required",
      company_enq: "required",
      type_enq: "required",
      country_enq: "required",
      message_enq: "required",
      email_enq: {
        required: true,
        email: true,
        validate_email: true
      },
      mobile_code_enq: {
        required: true,
        validate_phone_number: true,
      }
    },
    messages: {
      firstname_enq: "Please enter first name",
      lastname_enq: "Please enter last name",
      mobile_code_enq: "Please enter your mobile number",
      email_enq: "Please enter a valid email address",
      company_enq: "Please enter company name",
      type_enq: "Please select your enquiry type",
      message_enq: "Please enter your message",
      country_enq: "Please select your country",
    }
  });
});
*/


/*
$("button").click(function(){
  $("p").toggleClass("main");
});
*/

 // cookie policy
function acceptCookies() {
  var d = new Date();
  d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days
  var expires = "expires=" + d.toUTCString();
  document.cookie = "cookieConsent=accepted; " + expires + "; path=/";
  document.getElementsByClassName("cookie-bar")[0].style.display = "none";
}

window.onload = function () {
  var cookieBar = document.getElementsByClassName("cookie-bar")[0];
  var cookieConsent = getCookie("cookieConsent");
  if (cookieConsent !== "accepted") {
      cookieBar.style.display = "block";
  }
}

function getCookie(name) {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length + 1, cookie.length);
      }
  }
  return "";
}

/*
AOS.init({
  duration: 1200,
  disable: function() {
    var maxWidth = 1150;
    return window.innerWidth < maxWidth;
  }
});
*/
 


jQuery(document).ready(function($) {
  $('.sidebarsection').find('a').click(function(e) {
    e.preventDefault();
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top - 200
    }, 1000);
  });
});

jQuery(document).ready(function ($) {
  $(document).on('click','.inline-contact',function(e){
    $('.site-header').toggleClass('contact-popup-show');
    $('.contact-popup').toggleClass('enable-contact-popup');
    $('html').toggleClass('inner-scroll');
  })
});

jQuery(document).ready(function ($) {
  $(document).on('click','.mobile_main_menu_link',function(e){
    //e.preventDefault();
      var SubMenuDiv = $(this).next('.mobile-sub-menu-alt');
      if(SubMenuDiv.hasClass('d-none')) {
          $(".mobile-sub-menu-alt").addClass('d-none');
          SubMenuDiv.removeClass('d-none');
      } else {
          $(".mobile-sub-menu-alt").addClass('d-none');
      }
  }); 
});

jQuery(document).ready(function ($) {
  $('.dao-dropdown').select2();
});