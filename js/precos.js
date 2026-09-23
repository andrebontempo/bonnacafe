/* ==========================================================================
   Bonna Café - Centralized Menu & Price Data Store (129 Items)
   ========================================================================== */

// BONNA_ITEMS é carregado dinamicamente da API do servidor.
// Não edite aqui — use o painel Admin ou a API /api/menu.
var BONNA_ITEMS = [];


if (typeof window !== 'undefined') {
  window.BonnaMenu = window.BonnaMenu || {};

  window.BonnaMenu.DEFAULT_CATEGORIES = [
  {
    "slug": "combos",
    "name": "Combos Especiais",
    "range": "001 - 049",
    "order": 1,
    "active": true
  },
  {
    "slug": "bonnadodia",
    "name": "Bonna do Dia",
    "range": "050 - 099",
    "order": 2,
    "active": true
  },
  {
    "slug": "cafes-quentes",
    "name": "Cafés & Bebidas Quentes",
    "range": "100 - 149",
    "order": 3,
    "active": true
  },
  {
    "slug": "bebidas-geladas",
    "name": "Sucos, Shakes & Bebidas Geladas",
    "range": "150 - 199",
    "order": 4,
    "active": true
  },
  {
    "slug": "pao-queijo",
    "name": "Tradição Mineira & Pão de Queijo",
    "range": "200 - 249",
    "order": 5,
    "active": true
  },
  {
    "slug": "salgados",
    "name": "Salgados Assados & Folheados",
    "range": "250 - 299",
    "order": 6,
    "active": true
  },
  {
    "slug": "sanduiches",
    "name": "Sanduíches & Pão na Chapa",
    "range": "300 - 349",
    "order": 7,
    "active": true
  },
  {
    "slug": "tapiocas-cuscuz",
    "name": "Tapiocas Artesanais & Cuscuz",
    "range": "350 - 399",
    "order": 8,
    "active": true
  },
  {
    "slug": "refeicoes-omeletes",
    "name": "Omeletes, Crepiocas & Refeições",
    "range": "400 - 449",
    "order": 9,
    "active": true
  },
  {
    "slug": "sobremesas",
    "name": "Sobremesas & Doces",
    "range": "450 - 499",
    "order": 10,
    "active": true
  }
];

  window.BonnaMenu.CATEGORY_RANGES = {
    'combos': { min: 1, max: 49 },
    'bonnadodia': { min: 50, max: 99 },
    'cafes-quentes': { min: 100, max: 149 },
    'bebidas-geladas': { min: 150, max: 199 },
    'pao-queijo': { min: 200, max: 249 },
    'salgados': { min: 250, max: 299 },
    'sanduiches': { min: 300, max: 349 },
    'tapiocas-cuscuz': { min: 350, max: 399 },
    'refeicoes-omeletes': { min: 400, max: 449 },
    'sobremesas': { min: 450, max: 499 }
  };

  window.BonnaMenu.cache = null;

  window.BonnaMenu.getCategoriesAsync = function(callback) {
    var self = this;
    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/categories',
        method: 'GET',
        dataType: 'json',
        cache: false,
        success: function(data) {
          if (Array.isArray(data) && data.length > 0) {
            localStorage.setItem('bonna_categories_v1', JSON.stringify(data));
            if (typeof callback === 'function') callback(data);
          } else {
            if (typeof callback === 'function') callback(self.DEFAULT_CATEGORIES);
          }
        },
        error: function() {
          var cached = localStorage.getItem('bonna_categories_v1');
          var cats = cached ? JSON.parse(cached) : self.DEFAULT_CATEGORIES;
          if (typeof callback === 'function') callback(cats);
        }
      });
    } else {
      if (typeof callback === 'function') callback(self.DEFAULT_CATEGORIES);
    }
  };

  window.BonnaMenu.saveCategoriesAsync = function(cats, callback) {
    localStorage.setItem('bonna_categories_v1', JSON.stringify(cats));
    if (typeof callback === 'function') callback(cats);
    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/categories/save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ categories: cats }),
        success: function() {},
        error: function() {}
      });
    }
  };

  window.BonnaMenu.getCategoryRange = function(categorySlug) {
    var cachedCats = localStorage.getItem('bonna_categories_v1');
    if (cachedCats) {
      try {
        var parsed = JSON.parse(cachedCats);
        if (Array.isArray(parsed)) {
          var target = parsed.find(function(c) { return c && c.slug === categorySlug; });
          if (target && target.range) {
            var parts = target.range.split('-').map(function(s) { return parseInt(s.trim(), 10); });
            if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
              return { min: parts[0], max: parts[1] };
            }
          }
        }
      } catch(e) {}
    }
    return this.CATEGORY_RANGES[categorySlug] || { min: 1, max: 999 };
  };

  window.BonnaMenu.getNextAvailableId = function(category, itemsList) {
    itemsList = itemsList || this.getItems();
    var range = this.getCategoryRange(category);
    var usedIds = {};
    (itemsList || []).forEach(function(it) {
      if (it && it.id) {
        usedIds[String(it.id).trim()] = true;
      }
    });

    for (var i = range.min; i <= range.max; i++) {
      var candidate = ('000' + i).slice(-3);
      if (!usedIds[candidate]) {
        return candidate;
      }
    }

    var nextNum = range.max + 1;
    while (usedIds[('000' + nextNum).slice(-3)]) {
      nextNum++;
    }
    return ('000' + nextNum).slice(-3);
  };

  window.BonnaMenu.getItems = function() {
    // Retorna do cache em memória se disponível
    if (this.cache && Array.isArray(this.cache) && this.cache.length > 0) {
      return this.cache;
    }
    // Tenta restaurar do localStorage
    var storedCatalog = localStorage.getItem('bonna_full_catalog_v4');
    if (storedCatalog) {
      try {
        var parsed = JSON.parse(storedCatalog);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach(function(item) {
            if (item && item.available === undefined) item.available = true;
          });
          this.cache = parsed;
          return this.cache;
        }
      } catch (e) {}
    }
    // Sem dados locais — retorna array vazio (será populado pela API)
    this.cache = [];
    return this.cache;
  };

  window.BonnaMenu.getItemsAsync = function(callback) {
    var self = this;
    var localItems = self.getItems();
    if (callback) callback(localItems);
    self.injectPricesCSS(localItems);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/menu',
        type: 'GET',
        dataType: 'json',
        cache: false,
        timeout: 3000,
        success: function(data) {
          if (Array.isArray(data) && data.length > 0) {
            self.cache = data;
            localStorage.setItem('bonna_full_catalog_v4', JSON.stringify(data));
            if (callback) callback(data);
            self.injectPricesCSS(data);
          } else if (localItems && localItems.length > 0) {
            self.saveCatalog(localItems);
          }
        },
        error: function() {
          // Keep local items
        }
      });
    }
  };

  window.BonnaMenu.saveCatalog = function(itemsList, callback) {
    var self = this;
    if (!itemsList || !Array.isArray(itemsList) || itemsList.length === 0) {
      itemsList = (typeof BONNA_ITEMS !== 'undefined' && Array.isArray(BONNA_ITEMS)) ? BONNA_ITEMS : [];
    }
    itemsList.sort(function(a, b) {
      var numA = parseInt(a.id || a.num || 0, 10);
      var numB = parseInt(b.id || b.num || 0, 10);
      if (numA !== numB) return numA - numB;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });

    self.cache = itemsList;
    localStorage.setItem('bonna_full_catalog_v4', JSON.stringify(itemsList));
    self.injectPricesCSS(itemsList);

    if (callback) callback(itemsList);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/menu/bulk-save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ items: itemsList }),
        timeout: 3000,
        success: function() {},
        error: function() {}
      });
    }
  };

  window.BonnaMenu.createItem = function(itemData, callback) {
    var itemsList = JSON.parse(JSON.stringify(this.getItems()));
    itemsList.push(itemData);
    this.saveCatalog(itemsList, callback);
  };

  window.BonnaMenu.updateItem = function(id, itemData, callback) {
    var itemsList = JSON.parse(JSON.stringify(this.getItems()));
    var idx = -1;
    for (var i = 0; i < itemsList.length; i++) {
      if (String(itemsList[i].id) === String(id)) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      for (var key in itemData) {
        if (itemData.hasOwnProperty(key)) {
          itemsList[idx][key] = itemData[key];
        }
      }
    }
    this.saveCatalog(itemsList, callback);
  };

  window.BonnaMenu.deleteItem = function(id, callback) {
    var itemsList = JSON.parse(JSON.stringify(this.getItems()));
    var filtered = [];
    for (var i = 0; i < itemsList.length; i++) {
      if (String(itemsList[i].id) !== String(id)) {
        filtered.push(itemsList[i]);
      }
    }
    this.saveCatalog(filtered, callback);
  };

  window.BonnaMenu.bulkAdjust = function(bulkData, callback) {
    var itemsList = JSON.parse(JSON.stringify(this.getItems()));
    var factor = 1 + (parseFloat(bulkData.percent) / 100);
    itemsList.forEach(function(item) {
      if (bulkData.category === 'all' || item.category === bulkData.category) {
        var rawNew = item.price * factor;
        if (bulkData.rounding === '0.50') {
          item.price = Math.round(rawNew * 2) / 2;
        } else if (bulkData.rounding === '0.10') {
          item.price = Math.round(rawNew * 10) / 10;
        } else {
          item.price = Math.round(rawNew * 100) / 100;
        }
      }
    });
    this.saveCatalog(itemsList, callback);
  };

  window.BonnaMenu.resetCatalog = function(callback) {
    localStorage.removeItem('bonna_full_catalog');
    localStorage.removeItem('bonna_full_catalog_v2');
    localStorage.removeItem('bonna_full_catalog_v3');
    localStorage.removeItem('bonna_full_catalog_v4');
    var defaultItems = (typeof BONNA_ITEMS !== 'undefined') ? BONNA_ITEMS : [];
    this.cache = JSON.parse(JSON.stringify(defaultItems));
    this.saveCatalog(this.cache, callback);
    return this.cache;
  };

  window.BonnaMenu.formatPrice = function(val) {
    return 'R$ ' + parseFloat(val || 0).toFixed(2).replace('.', ',');
  };

  window.BonnaMenu.injectPricesCSS = function(itemsList) {
    itemsList = itemsList || this.getItems();
    var styleId = 'dynamic-bonna-prices';
    var styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }

    var cssRules = itemsList.map(function(item) {
      var formatted = 'R$ ' + parseFloat(item.price || 0).toFixed(2).replace('.', ',');
      return '#_' + item.id + '::after { content: "' + formatted + '"; }';
    }).join('\n');

    styleEl.innerHTML = cssRules;
  };
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    if (window.BonnaMenu && window.BonnaMenu.getItemsAsync) {
      window.BonnaMenu.getItemsAsync();
    }
  });
}
