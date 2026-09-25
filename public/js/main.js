/* ==========================================================================
   Bonna Café - Main JavaScript Logic
   ========================================================================== */

function main() {
  (function () {
    'use strict';

    // 1. Smooth Scroll Navigation sem atraso ou freio inicial
    $('a.page-scroll').click(function (e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          e.preventDefault();
          var targetTop = Math.max(0, target.offset().top - 70);
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
          });
          return false;
        }
      }
    });

    // Ajusta rolagem inicial se a página for aberta com um #hash no link
    if (window.location.hash) {
      var initialTarget = $(window.location.hash);
      if (initialTarget.length) {
        setTimeout(function () {
          window.scrollTo({
            top: Math.max(0, initialTarget.offset().top - 70),
            behavior: 'smooth'
          });
        }, 150);
      }
    }

    // 2. Navbar Sticky Glassmorphic Effect on Scroll
    $(window).bind('scroll', function () {
      if ($(window).scrollTop() > 80) {
        $('.navbar-default').addClass('on');
      } else {
        $('.navbar-default').removeClass('on');
      }
    });

    // 3. Nivo Lightbox Initialization for Poesia com Café
    if ($.fn.nivoLightbox) {
      $('a[data-lightbox-gallery]').nivoLightbox({
        effect: 'fadeScale',
        keyboardNav: true,
        clickOverlayToClose: true,
        beforeShowLightbox: function () {
          $('#menu').css('z-index', '10');
        },
        afterHideLightbox: function () {
          $('#menu').css('z-index', '');
        }
      });
    }

    // 3.1. Scrollspy Guard (Bootstrap 5 compat)
    if ($.fn.scrollspy) {
      $('body').scrollspy({
        target: '.navbar-default',
        offset: 90
      });
    }

    // 3.2. Auto-close Mobile Menu
    $(".navbar-nav li a").click(function () {
      var navbarCollapse = document.getElementById('bs-navbar-collapse');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        if (window.bootstrap && window.bootstrap.Collapse) {
          var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse);
          bsCollapse.hide();
        } else if ($.fn.collapse) {
          $(".navbar-collapse").collapse('hide');
        } else {
          $(navbarCollapse).removeClass('show');
        }
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

    // 7. Máscara Dinâmica de Celular/Telefone (00) 00000-0000
    $(document).on('input', 'input[name="phone"]', function () {
      var val = $(this).val().replace(/\D/g, '').substring(0, 11);
      var formatted = '';
      if (val.length > 0) {
        if (val.length <= 2) {
          formatted = '(' + val;
        } else if (val.length <= 6) {
          formatted = '(' + val.substring(0, 2) + ') ' + val.substring(2);
        } else if (val.length <= 10) {
          formatted = '(' + val.substring(0, 2) + ') ' + val.substring(2, 6) + '-' + val.substring(6);
        } else {
          formatted = '(' + val.substring(0, 2) + ') ' + val.substring(2, 7) + '-' + val.substring(7, 11);
        }
      }
      $(this).val(formatted);
    });

    // 8. AJAX Contact Form Submission without Page Reload
    $('#contact-form').on('submit', function (e) {
      e.preventDefault();
      var $form = $(this);
      var $btn = $form.find('button[type="submit"]');
      var $alertBox = $('#contact-alert');

      var originalBtnText = $btn.html();
      $btn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin"></i> Enviando...');

      var contactVal = ($form.find('input[name="phone"]').val() || $form.find('input[name="email"]').val() || '').trim();
      var formData = {
        name: ($form.find('input[name="name"]').val() || '').trim(),
        phone: contactVal,
        email: contactVal,
        message: ($form.find('textarea[name="message"]').val() || '').trim(),
        _subject: 'Contato via site Bonna Café'
      };

      $.ajax({
        url: '/api/contact',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        dataType: 'json',
        success: function (res) {
          $alertBox
            .stop(true, true)
            .hide()
            .removeClass('alert-danger')
            .addClass('alert alert-success')
            .html('<i class="fa fa-check-circle" style="font-size: 1.15rem; margin-right: 6px;"></i> <strong>Mensagem enviada com sucesso!</strong> Entraremos em contato em breve.')
            .slideDown(300);

          $form[0].reset();
          $btn.prop('disabled', false).html(originalBtnText);

          setTimeout(function () {
            $alertBox.slideUp(400);
          }, 3000);
        },
        error: function (xhr) {
          var errMsg = 'Não foi possível enviar a mensagem agora. Tente novamente ou fale pelo WhatsApp.';
          if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
            errMsg = xhr.responseJSON.error;
          }
          $alertBox
            .stop(true, true)
            .hide()
            .removeClass('alert-success')
            .addClass('alert alert-danger')
            .html('<i class="fa fa-exclamation-circle" style="font-size: 1.15rem; margin-right: 6px;"></i> <strong>Ops!</strong> ' + errMsg)
            .slideDown(300);

          $btn.prop('disabled', false).html(originalBtnText);
        }
      });
    });

  }());
}

// Admin Password Protection Function
function openAdminModal(e) {
  if (e && e.preventDefault) e.preventDefault();

  if (sessionStorage.getItem('bonna_admin_auth') === 'true') {
    window.location.href = 'admin.html';
    return;
  }

  var pass = prompt('🔐 Área Restrita do Administrador Bonna Café\n\nPor favor, digite a senha de acesso:');
  if (pass === null) return;

  if (pass === 'Bonna#27') {
    sessionStorage.setItem('bonna_admin_auth', 'true');
    window.location.href = 'admin.html';
  } else {
    alert('❌ Senha incorreta! Acesso negado.');
  }
}
window.openAdminModal = openAdminModal;

// Renderização Dinâmica de Destaques da Landing Page (Combos & Bonna do Dia)
function renderLandingHighlights(items) {
  if (!items || !Array.isArray(items) || items.length === 0) return;

  // 1. Combos Especiais (Categoria: 'combos')
  var combos = items.filter(function (it) { return it && (it.category === 'combos'); });
  combos.sort(function (a, b) {
    var numA = parseInt(a.id || a.num || 0, 10);
    var numB = parseInt(b.id || b.num || 0, 10);
    if (numA !== numB) return numA - numB;
    return String(a.id || '').localeCompare(String(b.id || ''));
  });

  var $combosContainer = $('#combos-container');
  if ($combosContainer.length > 0 && combos.length > 0) {
    $combosContainer.empty();
    combos.forEach(function (item, idx) {
      var priceFormatted = window.BonnaMenu ? window.BonnaMenu.formatPrice(item.price) : ('R$ ' + parseFloat(item.price || 0).toFixed(2).replace('.', ','));
      var defaultImg = 'img/specials/' + ((idx % 6) + 1) + '.jpg';
      var imgPath = item.img ? item.img : defaultImg;
      var isAvail = (item.available !== false);

      var cardHtml = '<div class="col-12 col-sm-6 col-md-4">' +
        '<div class="card-item' + (!isAvail ? ' opacity-75' : '') + '">' +
          '<img src="' + imgPath + '" alt="' + (item.name || 'Combo') + '" />' +
          '<h3>' + (item.name || '') + ' <span class="price-tag">' + priceFormatted + '</span></h3>' +
          '<p>' + (item.desc || '') + (!isAvail ? ' <br/><small class="text-danger" style="font-weight:700;">(Em falta hoje)</small>' : '') + '</p>' +
        '</div>' +
      '</div>';
      $combosContainer.append(cardHtml);
    });
  }

  // 2. Bonna do Dia (Categoria: 'bonnadodia')
  var bonnadodia = items.filter(function (it) { return it && (it.category === 'bonnadodia'); });
  bonnadodia.sort(function (a, b) {
    var numA = parseInt(a.id || a.num || 0, 10);
    var numB = parseInt(b.id || b.num || 0, 10);
    if (numA !== numB) return numA - numB;
    return String(a.id || '').localeCompare(String(b.id || ''));
  });

  var $bonnaContainer = $('#bonnadodia-container');
  if ($bonnaContainer.length > 0 && bonnadodia.length > 0) {
    $bonnaContainer.empty();
    bonnadodia.forEach(function (item, idx) {
      var priceFormatted = window.BonnaMenu ? window.BonnaMenu.formatPrice(item.price) : ('R$ ' + parseFloat(item.price || 0).toFixed(2).replace('.', ','));
      var defaultImg = 'img/bonnadodia/' + ((idx % 5) + 1) + '.jpg';
      var imgPath = item.img ? item.img : defaultImg;
      var isAvail = (item.available !== false);

      var currentColClass = (bonnadodia.length === 5)
        ? ((idx < 2) ? 'col-12 col-sm-6 col-md-6' : 'col-12 col-sm-4 col-md-4')
        : 'col-12 col-sm-6 col-md-4';

      var cardHtml = '<div class="' + currentColClass + '">' +
        '<div class="card-item' + (!isAvail ? ' opacity-75' : '') + '">' +
          '<img src="' + imgPath + '" alt="' + (item.name || 'Bonna do Dia') + '" />' +
          '<h3>' + (item.name || '') + ' <span class="price-tag">' + priceFormatted + '</span></h3>' +
          '<p>' + (item.desc || '') + (!isAvail ? ' <br/><small class="text-danger" style="font-weight:700;">(Em falta hoje)</small>' : '') + '</p>' +
        '</div>' +
      '</div>';
      $bonnaContainer.append(cardHtml);
    });
  }
}

$(document).ready(function () {
  main();
  if (window.BonnaMenu && window.BonnaMenu.getItemsAsync) {
    window.BonnaMenu.getItemsAsync(function (items) {
      renderLandingHighlights(items);
    });
  }
});

// 7. PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
      .then(function (reg) {
        console.log('[PWA] Service Worker registrado com sucesso no escopo:', reg.scope);
      })
      .catch(function (err) {
        console.warn('[PWA] Falha ao registrar Service Worker:', err);
      });
  });
}