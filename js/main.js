/* ==========================================================================
   Bonna Café - Main JavaScript Logic
   ========================================================================== */

function main() {
  (function () {
    'use strict';

    // 1. Smooth Scroll Navigation
    $('a.page-scroll').click(function () {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 70
          }, 800);
          return false;
        }
      }
    });

    // 2. Navbar Sticky Glassmorphic Effect on Scroll
    $(window).bind('scroll', function () {
      if ($(window).scrollTop() > 80) {
        $('.navbar-default').addClass('on');
      } else {
        $('.navbar-default').removeClass('on');
      }
    });

    // 3. Scrollspy & Auto-close Mobile Menu
    $('body').scrollspy({
      target: '.navbar-default',
      offset: 90
    });

    $(".navbar-nav li a").click(function () {
      var toggle = $(".navbar-toggle").is(":visible");
      if (toggle) {
        $(".navbar-collapse").collapse('hide');
      }
    });

    // 4. Cardápio - Filter Pills Logic
    $('.filter-btn').click(function () {
      $('.filter-btn').removeClass('active');
      $(this).addClass('active');

      var category = $(this).attr('data-filter');

      // Clear search input on category change
      $('#menu-search-input').val('');

      if (category === 'all') {
        $('.menu-category-block').show();
        $('.menu-item-card').show();
      } else {
        $('.menu-category-block').hide();
        $('.menu-category-block[data-category="' + category + '"]').fadeIn(300);
        $('.menu-category-block[data-category="' + category + '"] .menu-item-card').show();
      }
    });

    // 5. Cardápio - Live Search Filter
    $('#menu-search-input').on('keyup input', function () {
      var query = $(this).val().toLowerCase().trim();

      // Reset category filter active state to 'all' if searching
      if (query.length > 0) {
        $('.filter-btn').removeClass('active');
        $('.filter-btn[data-filter="all"]').addClass('active');
        $('.menu-category-block').show();
      }

      $('.menu-item-card').each(function () {
        var itemName = $(this).attr('data-name') || '';
        var textContent = $(this).text().toLowerCase();

        if (itemName.toLowerCase().indexOf(query) > -1 || textContent.indexOf(query) > -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });

      // Hide category block if no items inside are visible
      $('.menu-category-block').each(function () {
        var visibleItems = $(this).find('.menu-item-card:visible').length;
        if (visibleItems === 0 && query.length > 0) {
          $(this).hide();
        }
      });
    });

    // 6. Nivo Lightbox for Poesia com Café
    if ($.fn.nivoLightbox) {
      $('.portfolio-item a').nivoLightbox({
        effect: 'slideDown',
        keyboardNav: true
      });
    }

  }());
}

// Admin Password Protection Function
function openAdminModal(e) {
  if (e && e.preventDefault) e.preventDefault();

  if (sessionStorage.getItem('bonna_admin_auth') === 'true') {
    window.location.href = 'reajuste.html';
    return;
  }

  var pass = prompt('🔐 Área Restrita do Administrador Bonna Café\n\nPor favor, digite a senha de acesso:');
  if (pass === null) return;

  if (pass === 'Bonna#27') {
    sessionStorage.setItem('bonna_admin_auth', 'true');
    window.location.href = 'reajuste.html';
  } else {
    alert('❌ Senha incorreta! Acesso negado.');
  }
}
window.openAdminModal = openAdminModal;

$(document).ready(function () {
  main();
});