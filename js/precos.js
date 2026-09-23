/* ==========================================================================
   Bonna Café - Menu & Price Store
   Fonte de dados: API do servidor (/api/menu, /api/categories)
   Sem dados hardcoded — tudo é editável pelo painel Admin.
   ========================================================================== */

// Variável global mantida para compatibilidade (sempre vazia — dados vêm da API)
var BONNA_ITEMS = [];

if (typeof window !== 'undefined') {
  window.BonnaMenu = window.BonnaMenu || {};

  // Cache interno em memória
  window.BonnaMenu.cache = null;
  window.BonnaMenu._categoriesCache = null;

  // Faixas de IDs por categoria — usadas como FALLBACK se a categoria não tiver range definido no BD.
  // A configuração principal está em data/categories.json, editável pelo Admin.
  window.BonnaMenu.CATEGORY_RANGES = {
    'combos':            { min: 1,   max: 49  },
    'bonnadodia':        { min: 50,  max: 99  },
    'cafes-quentes':     { min: 100, max: 149 },
    'bebidas-geladas':   { min: 150, max: 199 },
    'pao-queijo':        { min: 200, max: 249 },
    'salgados':          { min: 250, max: 299 },
    'sanduiches':        { min: 300, max: 349 },
    'tapiocas-cuscuz':   { min: 350, max: 399 },
    'refeicoes-omeletes':{ min: 400, max: 449 },
    'sobremesas':        { min: 450, max: 499 }
  };

  // ---------------------------------------------------------------------------
  // CATEGORIAS — leitura da API, com fallback para localStorage
  // ---------------------------------------------------------------------------

  window.BonnaMenu.getCategories = function() {
    if (this._categoriesCache && Array.isArray(this._categoriesCache) && this._categoriesCache.length > 0) {
      return this._categoriesCache;
    }
    var cached = localStorage.getItem('bonna_categories_v1');
    if (cached) {
      try {
        var parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this._categoriesCache = parsed;
          return parsed;
        }
      } catch(e) {}
    }
    return [];
  };

  window.BonnaMenu.getCategoriesAsync = function(callback) {
    var self = this;

    // Se protocolo HTTP, busca do servidor
    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/categories',
        method: 'GET',
        dataType: 'json',
        cache: false,
        timeout: 8000,
        success: function(data) {
          if (Array.isArray(data) && data.length > 0) {
            self._categoriesCache = data;
            localStorage.setItem('bonna_categories_v1', JSON.stringify(data));
            if (typeof callback === 'function') callback(data);
          } else {
            // API retornou vazio — usa localStorage
            var local = self.getCategories();
            if (typeof callback === 'function') callback(local);
          }
        },
        error: function() {
          // Sem conexão — usa localStorage
          var local = self.getCategories();
          if (typeof callback === 'function') callback(local);
        }
      });
    } else {
      // Protocolo file:// (abertura direta) — usa localStorage
      if (typeof callback === 'function') callback(self.getCategories());
    }
  };

  window.BonnaMenu.saveCategoriesAsync = function(cats, callback) {
    var self = this;
    self._categoriesCache = cats;
    localStorage.setItem('bonna_categories_v1', JSON.stringify(cats));
    if (typeof callback === 'function') callback(cats);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/categories/bulk-save',  // Rota correta no servidor
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ categories: cats }),
        success: function() {},
        error: function() {}
      });
    }
  };

  window.BonnaMenu.getCategoryRange = function(categorySlug) {
    var cats = this.getCategories();
    if (cats && cats.length > 0) {
      var target = cats.find(function(c) { return c && c.slug === categorySlug; });
      if (target && target.range) {
        var parts = target.range.split('-').map(function(s) { return parseInt(s.trim(), 10); });
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          return { min: parts[0], max: parts[1] };
        }
      }
    }
    return this.CATEGORY_RANGES[categorySlug] || { min: 1, max: 999 };
  };

  window.BonnaMenu.getNextAvailableId = function(category, itemsList) {
    itemsList = itemsList || this.getItems();
    var range = this.getCategoryRange(category);
    var usedIds = {};
    (itemsList || []).forEach(function(it) {
      if (it && it.id) usedIds[String(it.id).trim()] = true;
    });

    for (var i = range.min; i <= range.max; i++) {
      var candidate = ('000' + i).slice(-3);
      if (!usedIds[candidate]) return candidate;
    }
    var nextNum = range.max + 1;
    while (usedIds[('000' + nextNum).slice(-3)]) nextNum++;
    return ('000' + nextNum).slice(-3);
  };

  // ---------------------------------------------------------------------------
  // ITENS — leitura da API, com cache em memória e localStorage
  // ---------------------------------------------------------------------------

  window.BonnaMenu.getItems = function() {
    // 1. Cache em memória (mais rápido)
    if (this.cache && Array.isArray(this.cache) && this.cache.length > 0) {
      return this.cache;
    }
    // 2. localStorage
    var stored = localStorage.getItem('bonna_full_catalog_v4');
    if (stored) {
      try {
        var parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          parsed.forEach(function(item) {
            if (item && item.available === undefined) item.available = true;
          });
          this.cache = parsed;
          return this.cache;
        }
      } catch (e) {}
    }
    // 3. Sem dados locais — retorna vazio (será preenchido via API)
    this.cache = [];
    return this.cache;
  };

  /**
   * getItemsAsync — busca itens do servidor e chama callback APÓS receber resposta.
   * Se já houver cache local, chama callback imediatamente E depois atualiza.
   */
  window.BonnaMenu.getItemsAsync = function(callback) {
    var self = this;
    var localItems = self.getItems();

    // Se já temos cache, entrega imediatamente para renderização rápida
    if (localItems && localItems.length > 0 && typeof callback === 'function') {
      callback(localItems);
      self.injectPricesCSS(localItems);
    }

    // Sempre busca do servidor para ter dados atualizados
    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/menu',
        type: 'GET',
        dataType: 'json',
        cache: false,
        timeout: 8000,
        success: function(data) {
          if (Array.isArray(data) && data.length > 0) {
            self.cache = data;
            localStorage.setItem('bonna_full_catalog_v4', JSON.stringify(data));
            self.injectPricesCSS(data);
            // Atualiza o menu com dados do servidor (mesmo se já tinha dados locais)
            if (typeof callback === 'function') callback(data);
          } else if (!localItems || localItems.length === 0) {
            // API retornou vazio e não há cache — informa erro
            if (typeof callback === 'function') callback([]);
          }
          // Se API retornou vazio mas havia cache local, mantém cache (não sobrescreve)
        },
        error: function() {
          // Erro de rede — se não havia cache, informa com array vazio
          if (!localItems || localItems.length === 0) {
            if (typeof callback === 'function') callback([]);
          }
        }
      });
    } else {
      // Protocolo file:// — sem servidor disponível
      if (typeof callback === 'function') callback(localItems);
    }
  };

  // ---------------------------------------------------------------------------
  // CRUD DE ITENS — operações que persistem no servidor
  // ---------------------------------------------------------------------------

  window.BonnaMenu.saveCatalog = function(itemsList, callback) {
    var self = this;
    if (!Array.isArray(itemsList)) itemsList = [];

    itemsList.sort(function(a, b) {
      var numA = parseInt(a.id || a.num || 0, 10);
      var numB = parseInt(b.id || b.num || 0, 10);
      if (numA !== numB) return numA - numB;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });

    self.cache = itemsList;
    localStorage.setItem('bonna_full_catalog_v4', JSON.stringify(itemsList));
    self.injectPricesCSS(itemsList);

    if (typeof callback === 'function') callback(itemsList);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/menu/bulk-save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ items: itemsList }),
        timeout: 8000,
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
    for (var i = 0; i < itemsList.length; i++) {
      if (String(itemsList[i].id) === String(id)) {
        for (var key in itemData) {
          if (itemData.hasOwnProperty(key)) itemsList[i][key] = itemData[key];
        }
        break;
      }
    }
    this.saveCatalog(itemsList, callback);
  };

  window.BonnaMenu.deleteItem = function(id, callback) {
    var itemsList = JSON.parse(JSON.stringify(this.getItems()));
    var filtered = itemsList.filter(function(it) {
      return String(it.id) !== String(id);
    });
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
    // Remove todos os caches locais
    ['bonna_full_catalog', 'bonna_full_catalog_v2', 'bonna_full_catalog_v3', 'bonna_full_catalog_v4'].forEach(function(k) {
      localStorage.removeItem(k);
    });
    this.cache = [];
    // Busca dados frescos do servidor
    this.getItemsAsync(callback);
  };

  // ---------------------------------------------------------------------------
  // UTILITÁRIOS
  // ---------------------------------------------------------------------------

  window.BonnaMenu.formatPrice = function(val) {
    return 'R$ ' + parseFloat(val || 0).toFixed(2).replace('.', ',');
  };

  window.BonnaMenu.injectPricesCSS = function(itemsList) {
    if (!itemsList || !itemsList.length) return;
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

// Pré-carrega itens em background quando a página carrega
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    if (window.BonnaMenu && window.BonnaMenu.getItemsAsync) {
      window.BonnaMenu.getItemsAsync();
    }
  });
}
