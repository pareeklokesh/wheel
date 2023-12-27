$(document).ready(function () {
  $(window).on('load', function () {
    setTimeout(function () {
      // Animate loader off screen
      $(".se-pre-con").fadeOut("fast", function () {});
    }, 1000);
  });

  $('a[href^="#"]').click(function (event) {
    var id = $(this).attr("href");

    var hasAnimate = $(id).hasClass("aos-animate");
    var offset = -200;

    var target = $(id).position().top - offset;
    $('html, body').animate({
      scrollTop: target
    }, 500);

    event.preventDefault();
  });

  $(function () {
    if (location.hash.replace(/^#/, '')) {
      var id = "#" + location.hash.replace(/^#/, '');
      var hasAnimate = $(id).hasClass("aos-animate");

      var offset = -200;

      var target = $(id).position().top - offset;

      $('html, body').animate({
        scrollTop: target
      }, 500);
    }
  });

  // set content on click
  $('.login_switch').click(function (e) {
    e.preventDefault();
    setContent($(this));
  });

  // set content on load
  $('.login_switch.active').length && setContent($('.login_switch.active'));

  function setContent($el) {
    $('.login_switch').removeClass('active');
    $('.login_container').hide();

    $el.addClass('active');
    $($el.data('rel')).show();
  }


  $(function () {
    $('input').on('change', function () {
      var input = $(this);
      if (input.val().length) {
        input.addClass('populated');
      } else {
        input.removeClass('populated');
      }
    });

    $('form input[type="text"]').each(function (index, item) {
      var input = $(item);
      if (input.val().length) {
        input.addClass('populated');
      } else {
        input.removeClass('populated');
      }

    });

    setTimeout(function () {
      $('#fname').trigger('focus');
    }, 500);
  });

  InitScrollMagic();

  var rellax = new Rellax('.rellax');

  if ($(".rellax").length > 0) {
    rellax = new Rellax('.rellax');
    rellax.destroy();
  }

  if ($(".centerRellax").length > 0) {
    centerRellax = new Rellax('.centerRellax', {
      center: true,
      speed: 2,
    });
  }

  function InitScrollMagic() {
    var controller = new ScrollMagic.Controller();

    $(".anim_scroll_fade_out").each(function () {

      let scene = new ScrollMagic.Scene({
          triggerElement: this,
          duration: 500,
          triggerHook: 0
        }).setTween(this, {
          opacity: 0
        })
        .addTo(controller);
    });

    $(".anim_scroll_fade_in").each(function () {

      let scene = new ScrollMagic.Scene({
          triggerElement: this,
          duration: 300,
          triggerHook: 1
        }).setTween(this, {
          opacity: 1
        })
        .addTo(controller);
    });
  }

  $(".anim_fade_slide").each(function () {
    let slideTween = TweenLite.fromTo(
      this,
      0.5, {
        y: "40px",
        opacity: 0
      }, {
        y: "0",
        opacity: 1,
        ease: Power1.easeInOut
      }
    );
  });


  $(".anim_fade_slide_right").each(function () {
    let slideTween = TweenLite.fromTo(
      this,
      0.5, {
        x: "-40px",
        opacity: 0
      }, {
        x: "0",
        opacity: 1,
        ease: Power1.easeInOut
      }
    );
  });

  $(".anim_fade_slide_down").each(function () {
    let slideTween = TweenLite.fromTo(
      this,
      0.5, {
        y: "-40px",
        opacity: 0
      }, {
        y: "0",
        opacity: 1,
        ease: Power1.easeInOut
      }
    );
  });

  var textarea = null;
  window.addEventListener("load", function () {
    textarea = window.document.querySelector("textarea");
    if (textarea != undefined) {
      textarea.addEventListener("keypress", function () {
        if (textarea.scrollTop != 0) {
          textarea.style.height = textarea.scrollHeight + "px";
        }
      }, false);
    }
  }, false);

});

/*!* jQuery mobileMenu v2.0.8
 * @Copyright (C) 2012-2014 Chris Wharton @ MeanThemes (https://github.com/meanthemes/meanMenu)
 * you can change the resolution with: mobileScreenWidth:"1920"
 **/
! function ($) {
  "use strict";
  $.fn.mobilemenu = function (e) {
    var n = {
      mobileMenuTarget: jQuery(this),
      mobileMenuContainer: "body",
      mobileMenuClose: "X",
      mobileMenuCloseSize: "18px",
      mobileMenuOpen: "<span /><span /><span />",
      mobileRevealPosition: "right",
      mobileRevealPositionDistance: "0",
      mobileRevealColour: "",
      mobileScreenWidth: "1920",
      mobileNavPush: "",
      mobileShowChildren: !0,
      mobileExpandableChildren: !0,
      mobileExpand: "+",
      mobileContract: "-",
      mobileRemoveAttrs: !1,
      onePage: !1,
      mobileDisplay: "block",
      removeElements: ""
    };
    e = $.extend(n, e);
    var a = window.innerWidth || document.documentElement.clientWidth;
    return this.each(function () {
      var n = e.mobileMenuTarget,
        t = e.mobileMenuContainer,
        r = e.mobileMenuClose,
        i = e.mobileMenuCloseSize,
        s = e.mobileMenuOpen,
        u = e.mobileRevealPosition,
        m = e.mobileRevealPositionDistance,
        l = e.mobileRevealColour,
        o = e.mobileScreenWidth,
        c = e.mobileNavPush,
        v = ".mobilemenu-reveal",
        h = e.mobileShowChildren,
        d = e.mobileExpandableChildren,
        y = e.mobileExpand,
        j = e.mobileContract,
        Q = e.mobileRemoveAttrs,
        f = e.onePage,
        g = e.mobileDisplay,
        p = e.removeElements,
        C = !1;
      (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/Windows Phone/i)) && (C = !0), (navigator.userAgent.match(/MSIE 8/i) || navigator.userAgent.match(/MSIE 7/i)) && jQuery("html").css("overflow-y", "scroll");
      var w = "",
        x = function () {
          if ("center" === u) {
            var e = window.innerWidth || document.documentElement.clientWidth,
              n = e / 2 - 22 + "px";
            w = "left:" + n + ";right:auto;", C ? jQuery(".mobilemenu-reveal").animate({
              left: n
            }) : jQuery(".mobilemenu-reveal").css("left", n)
          }
        },
        A = !1,
        E = !1;
      "right" === u && (w = "right:" + m + ";left:auto;"), "left" === u && (w = "left:" + m + ";right:auto;"), x();
      var M = "",
        P = function () {
          M.html(jQuery(M).is(".mobilemenu-reveal.mobileclose") ? r : s)
        },
        W = function () {
          jQuery(".mobile-bar,.mobile-push").remove(), jQuery(t).removeClass("mobile-container"), jQuery(n).css("display", g), A = !1, E = !1, jQuery(p).removeClass("mobile-remove")
        },
        b = function () {
          var e = "background:" + l + ";color:" + l + ";" + w;
          if (o >= a) {
            jQuery(p).addClass("mobile-remove"), E = !0, jQuery(t).addClass("mobile-container"), jQuery(".mobile-container").prepend('<div class="mobile-bar"><a href="#nav" class="mobilemenu-reveal" style="' + e + '">Show Navigation</a><nav class="mobile-nav"></nav></div>');
            var r = jQuery(n).html();
            jQuery(".mobile-nav").html(r), Q && jQuery("nav.mobile-nav ul, nav.mobile-nav ul *").each(function () {
              jQuery(this).is(".mobile-remove") ? jQuery(this).attr("class", "mobile-remove") : jQuery(this).removeAttr("class"), jQuery(this).removeAttr("id")
            }), jQuery(n).before('<div class="mobile-push" />'), jQuery(".mobile-push").css("margin-top", c), jQuery(n).hide(), jQuery(".mobilemenu-reveal").show(), jQuery(v).html(s), M = jQuery(v), jQuery(".mobile-nav ul:not(:first)").hide(), h ? d ? (jQuery(".mobile-nav ul ul").each(function () {
              jQuery(this).children().length && jQuery(this, "li:first").parent().append('<a class="mobile-expand" href="#" style="font-size: ' + i + '">' + y + "</a>")
            }), jQuery(".mobile-expand").on("click", function (e) {
              e.preventDefault(), jQuery(this).hasClass("mobile-clicked") ? (jQuery(this).text(y), jQuery(this).prev("ul").slideUp(300, function () {})) : (jQuery(this).text(j), jQuery(this).prev("ul").slideDown(300, function () {})), jQuery(this).toggleClass("mobile-clicked")
            })) : jQuery(".mobile-nav ul ul").show() : jQuery(".mobile-nav ul ul").hide(), jQuery(".mobile-nav ul li").last().addClass("mobile-last"), M.removeClass("mobileclose"), jQuery(M).click(function (e) {
              e.preventDefault(), A === !1 ? (M.css("text-align", "center"), M.css("text-indent", "0"), M.css("font-size", i), jQuery(".mobile-nav ul:first").slideDown(), A = !0) : (jQuery(".mobile-nav ul:first").slideUp(), A = !1), M.toggleClass("mobileclose"), P(), jQuery(p).addClass("mobile-remove")
            }), f && jQuery(".mobile-nav ul > li > a:first-child").on("click", function () {
              jQuery(".mobile-nav ul:first").slideUp(), A = !1, jQuery(M).toggleClass("mobileclose").html(s)
            })
          } else W()
        };
      C || jQuery(window).resize(function () {
        a = window.innerWidth || document.documentElement.clientWidth, a > o, W(), o >= a ? (b(), x()) : W()
      }), jQuery(window).resize(function () {
        a = window.innerWidth || document.documentElement.clientWidth, C ? (x(), o >= a ? E === !1 && b() : W()) : (W(), o >= a && (b(), x()))
      }), b()
    })
  }
}(jQuery);

$('.mobilemenu-reveal').on('click', function () {
  $('.mobile-bar').toggle();
});