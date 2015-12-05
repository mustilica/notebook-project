/*!
 * Start Bootstrap - Agnecy Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
  if ($(".navbar").offset().top > 50) {
    $(".navbar-fixed-top").addClass("navbar-shrink");
  } else {
    $(".navbar-fixed-top").removeClass("navbar-shrink");
  }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
  $('a.page-scroll').bind('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: $($anchor.attr('href')).offset().top
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
  });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
  target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  $('.navbar-toggle:visible').click();
});

$('div.modal').on('show.bs.modal', function() {
  var modal = this;
  var hash = modal.id;
  window.location.hash = hash;
  window.onhashchange = function() {
    if (!location.hash) {
      $(modal).modal('hide');
    }
  }
});

var isMobile = {
  Android: function() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

// Parallax
$('.parallax').each(function() {
  if (!isMobile.any()) {
    $(this).parallax('50%', 0.3, true);
  } else {
    $(this).css('background-attachment', 'initial');
  }
});

// MailChimp
(function($) {

  var lang = "en",
    originalMessages = [
      '',
      'Please enter a value.',
      'An email address must contain a single @ character.',
      'The domain portion of the email address is invalid.',
      'The username portion of the email address is invalid.',
      'This email address looks fake or invalid. Please enter a real email address.',
      'Too many subscribe attempts for this email address. Please try again in about 5 minutes.'
    ],
    languages = {
      tr: {
        0: 'Lütfen size gönderdiğimiz onay e-postasındaki linke tıklayınız.',
        1: 'Lütfen bir değer giriniz.',
        2: 'E-posta adresi sadece bir tane @ karakteri içermelidir.',
        3: 'E-posta adresinizin alan adı kısmı geçersizdir. (@ karekterinden sonraki kısım: #1)',
        4: 'E-posta adresinizin kullanıcı adı kısmı geçersizdir. (@ karekterinden önceki kısım: #1)',
        5: 'E-posta adresiniz hatalı veya geçersiz gözüküyor. Lütfen geçerli bir e-posta adresi giriniz.',
        6: 'Bu e-posta adresi için çok fazla deneme yaptınız. Lütfen 5 dakika içinde tekrar deneyiniz.',
        errorMsg: 'Hata!',
        successMsg: 'Neredeyse bitti.',
        connectionError: 'Bağlantı hatası. Lütfen daha sonra tekrar deneyiniz.',
        scriptError: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.'
      },
      en: {
        errorMsg: 'Error!',
        successMsg: '',
        connectionError: 'Connection error. Please try again later.',
        scriptError: 'An error occoured. Please try again later.'
      }
    },
    messages = "tr" !== lang ? languages.en : languages.tr;

  function translate(originalMessage, messages) {
    if ("tr" !== lang) {
      return originalMessage;
    }
    var index,
      postfix = '';
    for (var i = 0, msg; msg = originalMessages[i++];) {
      if (originalMessage.search(msg) != -1) {
        index = i - 1;
        break;
      }
    }

    if (index != undefined) {
      if (index == 3 || index == 4) {
        postfix = originalMessage.substring(originalMessage.search("@:") + 3, originalMessage.length - 1);
      }
      return messages[index].replace('#1', postfix);
    } else {
      return originalMessage;
    }
  }

  $('#subscribe-form').submit(function(e) {
    e.preventDefault();

    var id = $(this).attr('id'),
      $btn = $("#" + id + "-btn"),
      $responses = $("#" + id + "-responses");

    $btn.button('loading');
    ga || ga('send', 'event', 'get-notified-button', 'click', 'send-' + id);

    $.ajax({
      url: '//kulu.us1.list-manage1.com/subscribe/post-json?u=b4cab138316e3ce36eec50df8&amp;id=083c158cc9',
      type: 'GET',
      data: $(this).serialize(),
      dataType: 'jsonp',
      jsonp: 'c',
      contentType: "application/json; charset=utf-8",
      error: function(err) {
        $responses.empty().append('<div class="alert alert-danger" role="alert">' + messages.connectionError + '</div>');
        $btn.button('reset');
      },
      success: function(data) {
        if (data['result'] != "success") {
          // Fail
          $responses.empty().append('<div class="alert alert-danger" role="alert"><strong>' + messages.errorMsg + '</strong> ' + translate(data['msg'], messages) + '</div>');
          ga || ga('send', 'event', 'mail-chimp', 'response-error-' + id);
        } else {
          // Success
          $(".input-group").hide();
          $responses.empty().append('<div class="alert alert-success" role="alert"><strong><i class="fa fa-check fa-fw"></i></span>' + messages.successMsg + '</strong> ' + translate(data['msg'], messages) + '</div>');
          ga || ga('send', 'event', 'mail-chimp', 'response-success-' + id);
          setTimeout(function() {
            $('#myModal').modal('hide');
            $(".input-group").show();
            $responses.empty();
          }, 30000);
        }
        $btn.button('reset');
      }
    });
  });
})(jQuery);
