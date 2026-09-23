const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'bonnacafe_db.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

// Categorias iniciais carregadas do seed_categories.json (primeira inicialização apenas)
const SEED_CATEGORIES_FILE = path.join(DATA_DIR, 'seed_categories.json');

function loadSeedCategories() {
  if (fs.existsSync(SEED_CATEGORIES_FILE)) {
    try {
      const raw = fs.readFileSync(SEED_CATEGORIES_FILE, 'utf8');
      const cats = JSON.parse(raw);
      if (Array.isArray(cats) && cats.length > 0) return cats;
    } catch (e) {
      console.error('Erro ao ler seed_categories.json:', e);
    }
  }
  // Fallback mínimo inline — não adicione mais categorias aqui!
  return [
    { slug: 'combos', name: 'Combos Especiais', range: '001 - 049', order: 1, active: true },
    { slug: 'bonnadodia', name: 'Bonna do Dia', range: '050 - 099', order: 2, active: true },
    { slug: 'cafes-quentes', name: 'Cafés & Bebidas Quentes', range: '100 - 149', order: 3, active: true },
    { slug: 'bebidas-geladas', name: 'Sucos, Shakes & Bebidas Geladas', range: '150 - 199', order: 4, active: true },
    { slug: 'pao-queijo', name: 'Tradição Mineira & Pão de Queijo', range: '200 - 249', order: 5, active: true },
    { slug: 'salgados', name: 'Salgados Assados & Folheados', range: '250 - 299', order: 6, active: true },
    { slug: 'sanduiches', name: 'Sanduíches & Pão na Chapa', range: '300 - 349', order: 7, active: true },
    { slug: 'tapiocas-cuscuz', name: 'Tapiocas Artesanais & Cuscuz', range: '350 - 399', order: 8, active: true },
    { slug: 'refeicoes-omeletes', name: 'Omeletes, Crepiocas & Refeições', range: '400 - 449', order: 9, active: true },
    { slug: 'sobremesas', name: 'Sobremesas & Doces', range: '450 - 499', order: 10, active: true }
  ];
}

function loadCategories() {
  if (!fs.existsSync(CATEGORIES_FILE)) {
    const seed = loadSeedCategories();
    saveCategories(seed);
    return seed;
  }
  try {
    const raw = fs.readFileSync(CATEGORIES_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      return data;
    }
  } catch (e) {
    console.error('Erro ao ler categorias, restaurando seed:', e);
  }
  const seed = loadSeedCategories();
  saveCategories(seed);
  return seed;
}

function saveCategories(cats) {
  if (Array.isArray(cats)) {
    cats.sort((a, b) => (a.order || 0) - (b.order || 0));
  }
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(cats, null, 2), 'utf8');
}

function loadMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8')) || [];
  } catch (e) {
    return [];
  }
}

function saveMessages(msgs) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2), 'utf8');
}

// CATEGORY_RANGES estático — usado como fallback quando a categoria não tem range definido no BD.
// Não é a fonte primária! Use o Gestão de Categorias no Admin para configurar as faixas.
const CATEGORY_RANGES = {
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

function getCategoryRange(categorySlug) {
  const categories = loadCategories();
  const catObj = categories.find(c => c && c.slug === categorySlug);
  if (catObj && catObj.range) {
    const parts = catObj.range.split('-').map(s => parseInt(s.trim(), 10));
    if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
      return { min: parts[0], max: parts[1] };
    }
  }
  return CATEGORY_RANGES[categorySlug] || { min: 1, max: 999 };
}

function getNextAvailableId(category, items) {
  const range = getCategoryRange(category);
  const used = new Set(items.map(it => String(it.id).trim()));
  for (let i = range.min; i <= range.max; i++) {
    const candidate = String(i).padStart(3, '0');
    if (!used.has(candidate)) return candidate;
  }
  let next = range.max + 1;
  while (used.has(String(next).padStart(3, '0'))) next++;
  return String(next).padStart(3, '0');
}


// Itens iniciais do cardápio — carregados do arquivo seed_items.json (primeira inicialização apenas)
const SEED_ITEMS_FILE = path.join(DATA_DIR, 'seed_items.json');

function loadSeedItems() {
  if (fs.existsSync(SEED_ITEMS_FILE)) {
    try {
      const raw = fs.readFileSync(SEED_ITEMS_FILE, 'utf8');
      const items = JSON.parse(raw);
      if (Array.isArray(items) && items.length > 0) return items;
    } catch (e) {
      console.error('Erro ao ler seed_items.json:', e);
    }
  }
  console.warn('seed_items.json não encontrado ou inválido — banco iniciará vazio.');
  return [];
}

const INITIAL_ITEMS = loadSeedItems();

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(INITIAL_ITEMS);
    return INITIAL_ITEMS;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
      const loadedCats = loadCategories();
      const validCategories = new Set(loadedCats.map(c => String(c.slug || '').toLowerCase().trim()));

      // Mapeia faixas de código de todas as categorias cadastradas
      const catRanges = loadedCats.map(c => {
        if (c && c.range) {
          const parts = String(c.range).split('-').map(s => parseInt(s.trim(), 10));
          if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            return { slug: c.slug, min: parts[0], max: parts[1] };
          }
        }
        return null;
      }).filter(Boolean);

      let needsSave = false;
      data.forEach(it => {
        if (it) {
          const numId = parseInt(it.id, 10);
          let matchedRangeCat = null;
          if (!isNaN(numId)) {
            const rangeMatch = catRanges.find(r => numId >= r.min && numId <= r.max);
            if (rangeMatch) matchedRangeCat = rangeMatch.slug;
          }

          if (it.category) {
            const normCat = String(it.category).toLowerCase().trim();
            if (matchedRangeCat && normCat !== matchedRangeCat) {
              it.category = matchedRangeCat;
              needsSave = true;
            } else if (normCat === 'salgados-assados') { it.category = 'salgados'; needsSave = true; }
            else if (normCat === 'tapiocas' || normCat === 'cuscuz') { it.category = 'tapiocas-cuscuz'; needsSave = true; }
            else if (normCat === 'sanduiches-tapiocas') { it.category = 'sanduiches'; needsSave = true; }
            else if (normCat === 'ovos' || normCat === 'massas') { it.category = 'refeicoes-omeletes'; needsSave = true; }
            else if (normCat === 'bebidas-cafes') { it.category = 'bebidas-geladas'; needsSave = true; }
            else if (normCat === 'doces') { it.category = 'sobremesas'; needsSave = true; }
            else if (!validCategories.has(normCat)) {
              const matchByName = loadedCats.find(c => String(c.name || '').toLowerCase().trim() === normCat);
              if (matchByName) {
                it.category = matchByName.slug;
                needsSave = true;
              } else {
                it.category = matchedRangeCat || 'salgados';
                needsSave = true;
              }
            } else if (it.category !== normCat) {
              it.category = normCat;
              needsSave = true;
            }
          } else if (matchedRangeCat) {
            it.category = matchedRangeCat;
            needsSave = true;
          }
        }
      });

      if (needsSave) {
        saveDB(data);
      }
      return data;
    } else {
      // BD vazio — inicializar com dados seed
      console.warn('BD vazio ou inválido. Inicializando com seed_items.json...');
      if (INITIAL_ITEMS.length > 0) {
        saveDB(INITIAL_ITEMS);
        return INITIAL_ITEMS;
      }
      return [];
    }
  } catch (e) {
    console.error('Error reading DB, resetting to initial items:', e);
    saveDB(INITIAL_ITEMS);
    return INITIAL_ITEMS;
  }
}

function saveDB(items) {
  if (Array.isArray(items)) {
    items.sort((a, b) => {
      const numA = parseInt(a.id || a.num || 0, 10);
      const numB = parseInt(b.id || b.num || 0, 10);
      if (numA !== numB) return numA - numB;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(items, null, 2), 'utf8');
}

// MIME types dictionary for static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function parseRequestBody(req, callback) {
  let body = '';
  req.on('data', chunk => { body += chunk.toString(); });
  req.on('end', () => {
    if (!body) return callback(null, {});
    try {
      callback(null, JSON.parse(body));
    } catch (e) {
      try {
        const querystring = require('querystring');
        const parsed = querystring.parse(body);
        callback(null, parsed);
      } catch (err2) {
        callback(null, {});
      }
    }
  });
}

function sendJSON(res, data, statusCode = 200) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Enable CORS Preflight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    return res.end();
  }

  // --- API ENDPOINTS ---

  // GET /api/menu ou /api/items
  if ((pathname === '/api/menu' || pathname === '/api/items') && method === 'GET') {
    const items = loadDB();
    return sendJSON(res, items);
  }

  // --- CATEGORIES ENDPOINTS ---

  // GET /api/categories (Listar categorias)
  if (pathname === '/api/categories' && method === 'GET') {
    const categories = loadCategories();
    return sendJSON(res, categories);
  }

  // POST /api/categories (Criar categoria)
  if (pathname === '/api/categories' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      if (err || !body.slug || !body.name) {
        return sendJSON(res, { error: 'Slug e Nome são obrigatórios.' }, 400);
      }
      let cats = loadCategories();
      const slug = String(body.slug).toLowerCase().trim().replace(/[^a-z0-9\-]/g, '-');
      if (cats.some(c => c.slug === slug)) {
        return sendJSON(res, { error: 'Já existe uma categoria com este Slug/ID.' }, 400);
      }
      const newCat = {
        slug: slug,
        name: String(body.name).trim(),
        range: String(body.range || '').trim(),
        order: parseInt(body.order, 10) || (cats.length + 1),
        active: body.active !== false
      };
      cats.push(newCat);
      saveCategories(cats);
      return sendJSON(res, newCat, 201);
    });
  }

  // POST /api/categories/bulk-save (Salvar lista completa de categorias)
  if (pathname === '/api/categories/bulk-save' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      if (err || !Array.isArray(body.categories)) {
        return sendJSON(res, { error: 'Payload de categorias inválido' }, 400);
      }
      saveCategories(body.categories);
      return sendJSON(res, { message: 'Categorias salvas com sucesso', count: body.categories.length });
    });
  }

  // PUT /api/categories/:slug (Atualizar categoria)
  if (pathname.startsWith('/api/categories/') && method === 'PUT') {
    const catSlug = decodeURIComponent(pathname.replace('/api/categories/', ''));
    return parseRequestBody(req, (err, body) => {
      let cats = loadCategories();
      const idx = cats.findIndex(c => c.slug === catSlug);
      if (idx === -1) {
        return sendJSON(res, { error: 'Categoria não encontrada.' }, 404);
      }
      cats[idx] = {
        slug: catSlug,
        name: body.name !== undefined ? String(body.name).trim() : cats[idx].name,
        range: body.range !== undefined ? String(body.range).trim() : cats[idx].range,
        order: body.order !== undefined ? parseInt(body.order, 10) : cats[idx].order,
        active: body.active !== undefined ? Boolean(body.active) : cats[idx].active
      };
      saveCategories(cats);
      return sendJSON(res, cats[idx]);
    });
  }

  // DELETE /api/categories/:slug (Excluir categoria)
  if (pathname.startsWith('/api/categories/') && method === 'DELETE') {
    const catSlug = decodeURIComponent(pathname.replace('/api/categories/', ''));
    let cats = loadCategories();
    const filtered = cats.filter(c => c.slug !== catSlug);
    if (filtered.length === cats.length) {
      return sendJSON(res, { error: 'Categoria não encontrada.' }, 404);
    }
    saveCategories(filtered);
    return sendJSON(res, { message: 'Categoria excluída com sucesso', slug: catSlug });
  }

  // POST /api/menu/bulk-save (Save entire catalog)
  if (pathname === '/api/menu/bulk-save' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      if (err || !Array.isArray(body.items)) {
        return sendJSON(res, { error: 'Invalid items payload' }, 400);
      }
      saveDB(body.items);
      return sendJSON(res, { message: 'Catalog saved successfully', count: body.items.length });
    });
  }

  // POST /api/menu (Create)
  if (pathname === '/api/menu' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      if (err || !body.id || !body.name || body.price === undefined) {
        return sendJSON(res, { error: 'ID, name and price are required.' }, 400);
      }
      let items = loadDB();
      const newItem = {
        id: String(body.id),
        num: body.num || parseInt(body.id, 10) || (items.length + 1),
        name: String(body.name),
        category: String(body.category || 'salgados'),
        desc: String(body.desc || ''),
        available: true,
    price: parseFloat(body.price),
        img: body.img ? String(body.img) : null
      };
      items.push(newItem);
      saveDB(items);
      return sendJSON(res, newItem, 201);
    });
  }

  // PUT /api/menu/:id (Update)
  if (pathname.startsWith('/api/menu/') && method === 'PUT') {
    const itemId = decodeURIComponent(pathname.replace('/api/menu/', ''));
    return parseRequestBody(req, (err, body) => {
      let items = loadDB();
      const idx = items.findIndex(it => it.id === itemId);
      if (idx === -1) {
        return sendJSON(res, { error: 'Item não encontrado.' }, 404);
      }
      const updatedId = body.id !== undefined ? String(body.id) : itemId;
      const updatedNum = parseInt(updatedId, 10) || items[idx].num;
      items[idx] = {
        id: updatedId,
        num: updatedNum,
        name: body.name !== undefined ? String(body.name) : items[idx].name,
        category: body.category !== undefined ? String(body.category) : items[idx].category,
        desc: body.desc !== undefined ? String(body.desc) : items[idx].desc,
        available: body.available !== undefined ? (body.available === true || body.available === 'true') : (items[idx].available !== false),
        price: body.price !== undefined ? parseFloat(body.price) : items[idx].price,
        img: body.img !== undefined ? (body.img ? String(body.img) : null) : items[idx].img
      };
      saveDB(items);
      return sendJSON(res, items[idx]);
    });
  }

  // DELETE /api/menu/:id (Delete)
  if (pathname.startsWith('/api/menu/') && method === 'DELETE') {
    const itemId = decodeURIComponent(pathname.replace('/api/menu/', ''));
    let items = loadDB();
    const filtered = items.filter(it => it.id !== itemId);
    if (filtered.length === items.length) {
      return sendJSON(res, { error: 'Item não encontrado.' }, 404);
    }
    saveDB(filtered);
    return sendJSON(res, { message: 'Item excluído com sucesso', id: itemId });
  }

  // POST /api/menu/bulk (Bulk percentage adjustment)
  if (pathname === '/api/menu/bulk' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      const percent = parseFloat(body.percent);
      const category = body.category || 'all';
      const rounding = body.rounding || '0.50';

      if (isNaN(percent)) {
        return sendJSON(res, { error: 'Valor de percentual inválido.' }, 400);
      }

      let items = loadDB();
      const factor = 1 + (percent / 100);
      let updatedCount = 0;

      items.forEach(item => {
        if (category === 'all' || item.category === category) {
          let rawNew = item.price * factor;
          if (rounding === '0.50') {
            item.price = Math.round(rawNew * 2) / 2;
          } else if (rounding === '0.10') {
            item.price = Math.round(rawNew * 10) / 10;
          } else {
            item.price = Math.round(rawNew * 100) / 100;
          }
          updatedCount++;
        }
      });

      saveDB(items);
      return sendJSON(res, { message: 'Reajuste em massa concluído com sucesso', updatedCount });
    });
  }

  // POST /api/admin/login
  if (pathname === '/api/admin/login' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      const adminPass = process.env.ADMIN_PASSWORD || 'Bonna#27';
      if (body.password === adminPass) {
        return sendJSON(res, { success: true, token: 'authenticated' });
      }
      return sendJSON(res, { success: false, error: 'Senha incorreta' }, 401);
    });
  }

  // POST /api/contact (Salvar mensagem do formulario de contato)
  if (pathname === '/api/contact' && method === 'POST') {
    return parseRequestBody(req, (err, body) => {
      body = body || {};
      const name = String(body.name || '').trim();
      let rawContact = String(body.phone || body.email || body.celular || body.contato || body.telefone || '').trim();
      if (rawContact === 'undefined' || rawContact === 'null') rawContact = '';
      const message = String(body.message || '').trim();

      if (!name || !message) {
        return sendJSON(res, { error: 'Nome e mensagem são obrigatórios.' }, 400);
      }
      if (!rawContact) {
        return sendJSON(res, { error: 'Por favor, informe seu celular para contato.' }, 400);
      }

      let msgs = loadMessages();
      const newMsg = {
        id: Date.now().toString(),
        name: name,
        phone: rawContact,
        email: rawContact,
        message: message,
        date: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
      };
      msgs.unshift(newMsg);
      saveMessages(msgs);

      // Disparar copia via FormSubmit de forma assincrona em background
      try {
        const postData = JSON.stringify({
          name: newMsg.name,
          email: newMsg.email,
          message: newMsg.message,
          _subject: 'Contato via site Bonna Café'
        });
        const fsReq = http.request({
          hostname: 'formsubmit.co',
          path: '/ajax/bonnacafe.oficial@gmail.com',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
          }
        });
        fsReq.on('error', () => {});
        fsReq.write(postData);
        fsReq.end();
      } catch (e) {}

      return sendJSON(res, { success: true, message: 'Mensagem enviada com sucesso!' });
    });
  }

  // GET /api/messages (Listar mensagens no Admin)
  if (pathname === '/api/messages' && method === 'GET') {
    return sendJSON(res, loadMessages());
  }

  // DELETE /api/messages/:id (Excluir mensagem)
  if (pathname.startsWith('/api/messages/') && method === 'DELETE') {
    const msgId = decodeURIComponent(pathname.replace('/api/messages/', ''));
    let msgs = loadMessages();
    const filtered = msgs.filter(m => m.id !== msgId);
    saveMessages(filtered);
    return sendJSON(res, { success: true, message: 'Mensagem excluída' });
  }

  // POST /api/admin/reset
  if (pathname === '/api/admin/reset' && method === 'POST') {
    saveDB(INITIAL_ITEMS);
    return sendJSON(res, { message: 'Catálogo restaurado para o padrão de fábrica' });
  }

  // --- STATIC FILE SERVER ---
  let reqPath = pathname === '/' ? '/index.html' : pathname;
  let safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

// Initialize DB on start
loadDB();

server.listen(PORT, () => {
  console.log(`☕ Bonna Café Server (Node.js nativo) rodando em http://localhost:${PORT}`);
});
