const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'bonnacafe_db.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');
const CATEGORIES_FILE = path.join(DATA_DIR, 'categories.json');

const INITIAL_CATEGORIES = [
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

function loadCategories() {
  if (!fs.existsSync(CATEGORIES_FILE)) {
    saveCategories(INITIAL_CATEGORIES);
    return INITIAL_CATEGORIES;
  }
  try {
    const raw = fs.readFileSync(CATEGORIES_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
      data.sort((a, b) => (a.order || 0) - (b.order || 0));
      return data;
    }
  } catch (e) {
    console.error('Erro ao ler categorias, restaurando padrão:', e);
  }
  saveCategories(INITIAL_CATEGORIES);
  return INITIAL_CATEGORIES;
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


// Initial 126 Bonna Café Items
const INITIAL_ITEMS = [
  {
    "id": "001",
    "num": 1,
    "name": "Combo 1",
    "category": "combos",
    "desc": "Suco de Caixinha + Misto quente",
    "available": true,
    "price": 10.5,
    "img": "img/specials/1.jpg"
  },
  {
    "id": "002",
    "num": 2,
    "name": "Combo 2",
    "category": "combos",
    "desc": "Café Longo + Pão de Queijo Recheado",
    "available": true,
    "price": 13.5,
    "img": "img/specials/2.jpg"
  },
  {
    "id": "003",
    "num": 3,
    "name": "Combo 3",
    "category": "combos",
    "desc": "Cappuccino + Biscoito de Queijo",
    "available": true,
    "price": 10.3,
    "img": "img/specials/3.jpg"
  },
  {
    "id": "004",
    "num": 4,
    "name": "Combo 4",
    "category": "combos",
    "desc": "Café com Leite + Pão de Queijo",
    "available": true,
    "price": 10,
    "img": "img/specials/4.jpg"
  },
  {
    "id": "005",
    "num": 5,
    "name": "Combo 5",
    "category": "combos",
    "desc": "Toddynho + Misto Quente",
    "available": true,
    "price": 11.3,
    "img": "img/specials/5.jpg"
  },
  {
    "id": "006",
    "num": 6,
    "name": "Combo 6",
    "category": "combos",
    "desc": "Coca-Cola + Misto Quente",
    "available": true,
    "price": 11,
    "img": "img/specials/6.jpg"
  },
  {
    "id": "050",
    "num": 50,
    "name": "Segunda-feira",
    "category": "bonnadodia",
    "desc": "Sanduíche Natural de Peito de Peru + Suco Natural de Limão 300ml",
    "available": true,
    "price": 15.5,
    "img": "img/bonnadodia/1.jpg"
  },
  {
    "id": "051",
    "num": 51,
    "name": "Terça-feira",
    "category": "bonnadodia",
    "desc": "Salgado Costela de Adão + Guaraná Antarctica 310ml",
    "available": true,
    "price": 11,
    "img": "img/bonnadodia/2.jpg"
  },
  {
    "id": "052",
    "num": 52,
    "name": "Quarta-feira",
    "category": "bonnadodia",
    "desc": "Torta de Frango + Suco de Caixinha",
    "available": true,
    "price": 14.5,
    "img": "img/bonnadodia/3.jpg"
  },
  {
    "id": "053",
    "num": 53,
    "name": "Quinta-feira",
    "category": "bonnadodia",
    "desc": "Bureak de Frango + Suco de Polpa de Cajá",
    "available": true,
    "price": 14,
    "img": "img/bonnadodia/4.jpg"
  },
  {
    "id": "054",
    "num": 54,
    "name": "Sexta-feira",
    "category": "bonnadodia",
    "desc": "Mini Pizza + Coca-Cola 200ml",
    "available": true,
    "price": 10.5,
    "img": "img/bonnadodia/5.jpg"
  },
  {
    "id": "100",
    "num": 100,
    "name": "Expresso Curto",
    "category": "cafes-quentes",
    "desc": "Café puro e forte.",
    "available": true,
    "price": 6
  },
  {
    "id": "101",
    "num": 101,
    "name": "Expresso Longo",
    "category": "cafes-quentes",
    "desc": "Café expresso mais suave.",
    "available": true,
    "price": 7
  },
  {
    "id": "102",
    "num": 102,
    "name": "Café Suave",
    "category": "cafes-quentes",
    "desc": "Xícara leve.",
    "available": true,
    "price": 7
  },
  {
    "id": "103",
    "num": 103,
    "name": "Café com Leite",
    "category": "cafes-quentes",
    "desc": "Pingado clássico.",
    "available": true,
    "price": 7
  },
  {
    "id": "104",
    "num": 104,
    "name": "Cappuccino",
    "category": "cafes-quentes",
    "desc": "Com toque de canela e cacau.",
    "available": true,
    "price": 7
  },
  {
    "id": "105",
    "num": 105,
    "name": "Chocolate Quente",
    "category": "cafes-quentes",
    "desc": "Cremoso e quentinho.",
    "available": true,
    "price": 7
  },
  {
    "id": "106",
    "num": 106,
    "name": "Leite Quente",
    "category": "cafes-quentes",
    "desc": "Puro ou adoçado.",
    "available": true,
    "price": 6
  },
  {
    "id": "107",
    "num": 107,
    "name": "Chá Quente de Limão",
    "category": "cafes-quentes",
    "desc": "Confortável para o dia a dia.",
    "available": true,
    "price": 6
  },
  {
    "id": "150",
    "num": 150,
    "name": "Suco Natural 300ml",
    "category": "bebidas-geladas",
    "desc": "Abacaxi, Laranja, Limão, Maçã ou Mamão.",
    "available": true,
    "price": 7
  },
  {
    "id": "151",
    "num": 151,
    "name": "Suco Natural 500ml",
    "category": "bebidas-geladas",
    "desc": "Abacaxi, Laranja, Limão, Maçã ou Mamão.",
    "available": true,
    "price": 9.5
  },
  {
    "id": "152",
    "num": 152,
    "name": "Suco de Polpa com Água 500ml",
    "category": "bebidas-geladas",
    "desc": "Acerola, Açaí, Cajá, Caju, Cupuaçu, Goiaba, Graviola, Manga, Maracujá, Morango, Umbu ou Uva.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "153",
    "num": 153,
    "name": "Suco de Polpa Misto (2 sabores) 500ml",
    "category": "bebidas-geladas",
    "desc": "Combine 2 sabores de frutas.",
    "available": true,
    "price": 11
  },
  {
    "id": "154",
    "num": 154,
    "name": "Suco de Polpa com Leite 500ml",
    "category": "bebidas-geladas",
    "desc": "Batido com leite.",
    "available": true,
    "price": 9.5
  },
  {
    "id": "155",
    "num": 155,
    "name": "Vitamina Completa 500ml",
    "category": "bebidas-geladas",
    "desc": "Leite + aveia + 2 frutas (Banana, Maçã, Mamão ou Abacate).",
    "available": true,
    "price": 12.5
  },
  {
    "id": "156",
    "num": 156,
    "name": "Polpa de Açaí com Água + 1 Banana 500ml",
    "category": "bebidas-geladas",
    "desc": "Batido com banana.",
    "available": true,
    "price": 11
  },
  {
    "id": "157",
    "num": 157,
    "name": "Polpa de Açaí com Leite + 1 Banana 500ml",
    "category": "bebidas-geladas",
    "desc": "Batido com leite e banana.",
    "available": true,
    "price": 13
  },
  {
    "id": "158",
    "num": 158,
    "name": "Matte Leão Batido com Limão 500ml",
    "category": "bebidas-geladas",
    "desc": "Refrescante batido na hora.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "159",
    "num": 159,
    "name": "Toddy Gelado 300ml",
    "category": "bebidas-geladas",
    "desc": "Cremoso e gelado.",
    "available": true,
    "price": 8
  },
  {
    "id": "160",
    "num": 160,
    "name": "Toddy Gelado 500ml",
    "category": "bebidas-geladas",
    "desc": "Copo grande de 500ml.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "170",
    "num": 170,
    "name": "Água sem Gás",
    "category": "bebidas-geladas",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 4
  },
  {
    "id": "171",
    "num": 171,
    "name": "Água com Gás",
    "category": "bebidas-geladas",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 4.5
  },
  {
    "id": "172",
    "num": 172,
    "name": "H2OH! Limoneto",
    "category": "bebidas-geladas",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 7
  },
  {
    "id": "173",
    "num": 173,
    "name": "Refrigerante 200/220ml",
    "category": "bebidas-geladas",
    "desc": "Garrafinha mini.",
    "available": true,
    "price": 4.5
  },
  {
    "id": "174",
    "num": 174,
    "name": "Refrigerante 310ml (Lata)",
    "category": "bebidas-geladas",
    "desc": "Coca-Cola, Guaraná, Fanta, etc.",
    "available": true,
    "price": 6
  },
  {
    "id": "175",
    "num": 175,
    "name": "Refrigerante 600ml",
    "category": "bebidas-geladas",
    "desc": "Garrafa individual grande.",
    "available": true,
    "price": 7
  },
  {
    "id": "176",
    "num": 176,
    "name": "Chá Gelado",
    "category": "bebidas-geladas",
    "desc": "Pêssego, Pêssego Zero, Limão e Matte Leão.",
    "available": true,
    "price": 6.9
  },
  {
    "id": "177",
    "num": 177,
    "name": "Suco de Caixinha",
    "category": "bebidas-geladas",
    "desc": "Sabores variados.",
    "available": true,
    "price": 4
  },
  {
    "id": "178",
    "num": 178,
    "name": "Toddynho",
    "category": "bebidas-geladas",
    "desc": "Achocolatado de caixinha.",
    "available": true,
    "price": 4.8
  },
  {
    "id": "179",
    "num": 179,
    "name": "Guaraviton",
    "category": "bebidas-geladas",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 7
  },
  {
    "id": "180",
    "num": 180,
    "name": "Energético",
    "category": "bebidas-geladas",
    "desc": "Lata.",
    "available": true,
    "price": 13
  },
  {
    "id": "181",
    "num": 181,
    "name": "Cerveja Long Neck",
    "category": "bebidas-geladas",
    "desc": "Geladíssima.",
    "available": true,
    "price": 10
  },
  {
    "id": "200",
    "num": 200,
    "name": "Pão de Queijo Tradicional",
    "category": "pao-queijo",
    "desc": "Receita mineira clássica e quentinha.",
    "available": true,
    "price": 4.5
  },
  {
    "id": "201",
    "num": 201,
    "name": "Biscoito de Queijo Ferradura",
    "category": "pao-queijo",
    "desc": "Crocante por fora e macio por dentro.",
    "available": true,
    "price": 4.8
  },
  {
    "id": "202",
    "num": 202,
    "name": "Chipa de Queijo (Porção 4 un.)",
    "category": "pao-queijo",
    "desc": "Ideal para compartilhar.",
    "available": true,
    "price": 5.5
  },
  {
    "id": "203",
    "num": 203,
    "name": "Pão de Queijo Recheado Peru e Requeijão",
    "category": "pao-queijo",
    "desc": "Caprichado no recheio.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "204",
    "num": 204,
    "name": "Pão de Queijo Recheado com Nutella",
    "category": "pao-queijo",
    "desc": "Combinação irresistível de doce e salgado.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "205",
    "num": 205,
    "name": "Torta de Frango com Requeijão (Super Lanche)",
    "category": "pao-queijo",
    "desc": "Fatia generosa servida quentinha.",
    "available": true,
    "price": 12
  },
  {
    "id": "250",
    "num": 250,
    "name": "Enroladinho de Presunto e Queijo",
    "category": "salgados",
    "desc": "Presunto, queijo muçarela, tomate e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "251",
    "num": 251,
    "name": "Enroladinho de Queijo",
    "category": "salgados",
    "desc": "Queijo muçarela derretido.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "252",
    "num": 252,
    "name": "Enroladinho de Salsicha",
    "category": "salgados",
    "desc": "Salsicha especial e queijo muçarela.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "253",
    "num": 253,
    "name": "Pastel de Carne com Bacon",
    "category": "salgados",
    "desc": "Carne moída, bacon, tomate, milho, azeitona, cebola e temperos.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "254",
    "num": 254,
    "name": "Esfirra de Carne",
    "category": "salgados",
    "desc": "Carne moída temperada com milho, cebola e pimenta de cheiro.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "255",
    "num": 255,
    "name": "Pão Hambúrguer",
    "category": "salgados",
    "desc": "Carne bovina, muçarela, cheddar, tomate e gergelim.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "256",
    "num": 256,
    "name": "Pão Hambúrguer Integral",
    "category": "salgados",
    "desc": "Hambúrguer, muçarela, cheddar e tomate em pão integral.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "257",
    "num": 257,
    "name": "Pão Napolitano",
    "category": "salgados",
    "desc": "Presunto, muçarela, calabresa, parmesão e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "258",
    "num": 258,
    "name": "Pão Pizza",
    "category": "salgados",
    "desc": "Presunto, muçarela, catupiry, tomate, cebola e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "259",
    "num": 259,
    "name": "Pão Pizza Integral",
    "category": "salgados",
    "desc": "Presunto, muçarela, catupiry e tomate em pão integral.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "260",
    "num": 260,
    "name": "Pão da Vovó",
    "category": "salgados",
    "desc": "Frango desfiado, muçarela, catupiry, temperos e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "261",
    "num": 261,
    "name": "Pão da Vovó Integral",
    "category": "salgados",
    "desc": "Frango, muçarela, catupiry e orégano em pão integral.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "262",
    "num": 262,
    "name": "Religiosa",
    "category": "salgados",
    "desc": "Frango desfiado, muçarela, catupiry, queijo minas e milho.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "263",
    "num": 263,
    "name": "Costela de Adão",
    "category": "salgados",
    "desc": "Presunto, muçarela, frango, catupiry, gergelim e ervas.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "264",
    "num": 264,
    "name": "Croissant de Frango",
    "category": "salgados",
    "desc": "Peito de frango desfiado com milho e azeitona.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "265",
    "num": 265,
    "name": "Croissant de Chocolate",
    "category": "salgados",
    "desc": "Recheio cremoso de chocolate.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "266",
    "num": 266,
    "name": "Coxinha Assada Especial",
    "category": "salgados",
    "desc": "Frango desfiado assado com tempero da casa.",
    "available": true,
    "price": 7
  },
  {
    "id": "267",
    "num": 267,
    "name": "Mini Pizza (Calabresa / Portuguesa)",
    "category": "salgados",
    "desc": "Massa crocante assada na hora.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "268",
    "num": 268,
    "name": "Folheado Bureak de Frango",
    "category": "salgados",
    "desc": "Massa folheada leve recheada com frango.",
    "available": true,
    "price": 8
  },
  {
    "id": "269",
    "num": 269,
    "name": "Folheado Queijo Minas com Peito de Peru",
    "category": "salgados",
    "desc": "Massa folheada leve com queijo minas e peru.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "270",
    "num": 270,
    "name": "Empadão Goiano",
    "category": "salgados",
    "desc": "Frango, muçarela, linguiça suína, palmito, azeitona e batata.",
    "available": true,
    "price": 11
  },
  {
    "id": "300",
    "num": 300,
    "name": "Sanduíche Natural de Ovo",
    "category": "sanduiches",
    "desc": "Pão integral, alface, tomate, muçarela, maionese light e requeijão.",
    "available": true,
    "price": 10
  },
  {
    "id": "301",
    "num": 301,
    "name": "Sanduíche Natural Peito de Peru",
    "category": "sanduiches",
    "desc": "Pão integral, alface, tomate, muçarela, maionese light e requeijão.",
    "available": true,
    "price": 10
  },
  {
    "id": "302",
    "num": 302,
    "name": "Sanduíche Natural Frango",
    "category": "sanduiches",
    "desc": "Pão integral, alface, tomate, muçarela, maionese light e requeijão.",
    "available": true,
    "price": 11.5
  },
  {
    "id": "303",
    "num": 303,
    "name": "Pão com Ovo",
    "category": "sanduiches",
    "desc": "Servido quentinho na chapa.",
    "available": true,
    "price": 8
  },
  {
    "id": "304",
    "num": 304,
    "name": "Pão com Queijo Muçarela",
    "category": "sanduiches",
    "desc": "Queijo derretido no pão francês ou de forma.",
    "available": true,
    "price": 8
  },
  {
    "id": "305",
    "num": 305,
    "name": "Pão com Queijo e Presunto (Misto)",
    "category": "sanduiches",
    "desc": "Clássico misto quente.",
    "available": true,
    "price": 8
  },
  {
    "id": "306",
    "num": 306,
    "name": "Pão com Ovo e Queijo Muçarela",
    "category": "sanduiches",
    "desc": "Reforçado na chapa.",
    "available": true,
    "price": 9
  },
  {
    "id": "307",
    "num": 307,
    "name": "Pão com Ovo, Queijo e Presunto",
    "category": "sanduiches",
    "desc": "Super reforçado.",
    "available": true,
    "price": 9
  },
  {
    "id": "308",
    "num": 308,
    "name": "Pão com Ovo e Peito de Peru",
    "category": "sanduiches",
    "desc": "Proteico e saboroso.",
    "available": true,
    "price": 9
  },
  {
    "id": "309",
    "num": 309,
    "name": "Pão com Queijo e Peito de Peru",
    "category": "sanduiches",
    "desc": "Muçarela derretida com peru.",
    "available": true,
    "price": 9.5
  },
  {
    "id": "310",
    "num": 310,
    "name": "Pão com Ovo, Queijo e Peito de Peru",
    "category": "sanduiches",
    "desc": "Combinação leve e nutritiva.",
    "available": true,
    "price": 10
  },
  {
    "id": "311",
    "num": 311,
    "name": "Pão Completo (Ovo, Queijo, Presunto e Peru)",
    "category": "sanduiches",
    "desc": "Tudo o que você tem direito!",
    "available": true,
    "price": 11
  },
  {
    "id": "350",
    "num": 350,
    "name": "Tapioca com Manteiga",
    "category": "tapiocas-cuscuz",
    "desc": "Massa leve e crocante.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "351",
    "num": 351,
    "name": "Tapioca com Ovo",
    "category": "tapiocas-cuscuz",
    "desc": "Recheada com ovo mexido ou frito.",
    "available": true,
    "price": 9
  },
  {
    "id": "352",
    "num": 352,
    "name": "Tapioca com Queijo Muçarela",
    "category": "tapiocas-cuscuz",
    "desc": "Queijo quentinho.",
    "available": true,
    "price": 10
  },
  {
    "id": "353",
    "num": 353,
    "name": "Tapioca com Queijo e Presunto",
    "category": "tapiocas-cuscuz",
    "desc": "Tapioca tipo misto.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "354",
    "num": 354,
    "name": "Tapioca Peito de Peru, Tomate e Orégano",
    "category": "tapiocas-cuscuz",
    "desc": "Leve estilo napolitana.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "355",
    "num": 355,
    "name": "Tapioca com Ovo e Queijo Muçarela",
    "category": "tapiocas-cuscuz",
    "desc": "Ovo e muçarela derretida.",
    "available": true,
    "price": 11.5
  },
  {
    "id": "356",
    "num": 356,
    "name": "Tapioca com Frango",
    "category": "tapiocas-cuscuz",
    "desc": "Frango desfiado temperado.",
    "available": true,
    "price": 11
  },
  {
    "id": "357",
    "num": 357,
    "name": "Tapioca com Frango e Queijo",
    "category": "tapiocas-cuscuz",
    "desc": "Frango com muçarela.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "358",
    "num": 358,
    "name": "Tapioca com Carne Seca",
    "category": "tapiocas-cuscuz",
    "desc": "Carne seca dessalgada.",
    "available": true,
    "price": 14
  },
  {
    "id": "359",
    "num": 359,
    "name": "Tapioca com Carne Seca e Queijo",
    "category": "tapiocas-cuscuz",
    "desc": "Carne seca com muçarela.",
    "available": true,
    "price": 17
  },
  {
    "id": "360",
    "num": 360,
    "name": "Tapioca com Leite Condensado",
    "category": "tapiocas-cuscuz",
    "desc": "Doce tradicional.",
    "available": true,
    "price": 10
  },
  {
    "id": "361",
    "num": 361,
    "name": "Tapioca com Nutella",
    "category": "tapiocas-cuscuz",
    "desc": "Doce e cremosa.",
    "available": true,
    "price": 11
  },
  {
    "id": "370",
    "num": 370,
    "name": "Cuscuz com Manteiga",
    "category": "tapiocas-cuscuz",
    "desc": "Nordestino tradicional quentinho.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "371",
    "num": 371,
    "name": "Cuscuz com Ovo",
    "category": "tapiocas-cuscuz",
    "desc": "Servido com ovo frito na hora.",
    "available": true,
    "price": 10
  },
  {
    "id": "372",
    "num": 372,
    "name": "Cuscuz com Queijo Muçarela",
    "category": "tapiocas-cuscuz",
    "desc": "Queijo derretido sobre o cuscuz.",
    "available": true,
    "price": 10
  },
  {
    "id": "373",
    "num": 373,
    "name": "Cuscuz com Queijo e Presunto",
    "category": "tapiocas-cuscuz",
    "desc": "Misto no cuscuz.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "374",
    "num": 374,
    "name": "Cuscuz com Ovo e Queijo",
    "category": "tapiocas-cuscuz",
    "desc": "Com ovo e muçarela derretida.",
    "available": true,
    "price": 11
  },
  {
    "id": "375",
    "num": 375,
    "name": "Cuscuz com Frango",
    "category": "tapiocas-cuscuz",
    "desc": "Recheado com frango desfiado.",
    "available": true,
    "price": 12
  },
  {
    "id": "376",
    "num": 376,
    "name": "Cuscuz com Frango e Queijo",
    "category": "tapiocas-cuscuz",
    "desc": "Frango desfiado com muçarela.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "377",
    "num": 377,
    "name": "Cuscuz com Frango e Ovo",
    "category": "tapiocas-cuscuz",
    "desc": "Frango e ovo no cuscuz.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "378",
    "num": 378,
    "name": "Cuscuz com Carne Seca",
    "category": "tapiocas-cuscuz",
    "desc": "Carne seca dessalgada e acebolada.",
    "available": true,
    "price": 14
  },
  {
    "id": "379",
    "num": 379,
    "name": "Cuscuz com Carne Seca e Queijo",
    "category": "tapiocas-cuscuz",
    "desc": "Carne seca com muçarela.",
    "available": true,
    "price": 17
  },
  {
    "id": "380",
    "num": 380,
    "name": "Cuscuz Completo (Carne Seca, Ovo e Queijo)",
    "category": "tapiocas-cuscuz",
    "desc": "Super recheado.",
    "available": true,
    "price": 18
  },
  {
    "id": "400",
    "num": 400,
    "name": "Ovos Mexidos com Orégano",
    "category": "refeicoes-omeletes",
    "desc": "Porção individual simples e leve.",
    "available": true,
    "price": 2.5
  },
  {
    "id": "401",
    "num": 401,
    "name": "Crepioca de Queijo Muçarela",
    "category": "refeicoes-omeletes",
    "desc": "Proteica e leve.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "402",
    "num": 402,
    "name": "Crepioca Queijo e Presunto",
    "category": "refeicoes-omeletes",
    "desc": "Misto na crepioca.",
    "available": true,
    "price": 11
  },
  {
    "id": "403",
    "num": 403,
    "name": "Crepioca Peru, Tomate e Orégano",
    "category": "refeicoes-omeletes",
    "desc": "Combinação leve e saborosa.",
    "available": true,
    "price": 11
  },
  {
    "id": "404",
    "num": 404,
    "name": "Crepioca de Frango",
    "category": "refeicoes-omeletes",
    "desc": "Frango desfiado temperado.",
    "available": true,
    "price": 12.5
  },
  {
    "id": "405",
    "num": 405,
    "name": "Crepioca Frango com Muçarela",
    "category": "refeicoes-omeletes",
    "desc": "Frango desfiado e muçarela.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "406",
    "num": 406,
    "name": "Crepioca de Carne Seca",
    "category": "refeicoes-omeletes",
    "desc": "Carne seca dessalgada.",
    "available": true,
    "price": 14
  },
  {
    "id": "407",
    "num": 407,
    "name": "Crepioca Carne Seca com Muçarela",
    "category": "refeicoes-omeletes",
    "desc": "Carne seca e muçarela.",
    "available": true,
    "price": 17.5
  },
  {
    "id": "408",
    "num": 408,
    "name": "Omelete (2 ovos) - Queijo Muçarela",
    "category": "refeicoes-omeletes",
    "desc": "Feita na hora com muçarela.",
    "available": true,
    "price": 11.5
  },
  {
    "id": "409",
    "num": 409,
    "name": "Omelete (2 ovos) - Queijo e Presunto",
    "category": "refeicoes-omeletes",
    "desc": "Muçarela e presunto.",
    "available": true,
    "price": 12
  },
  {
    "id": "410",
    "num": 410,
    "name": "Omelete (2 ovos) - Peru, Tomate e Orégano",
    "category": "refeicoes-omeletes",
    "desc": "Leve e nutritiva.",
    "available": true,
    "price": 12.5
  },
  {
    "id": "411",
    "num": 411,
    "name": "Omelete (2 ovos) - Frango",
    "category": "refeicoes-omeletes",
    "desc": "Recheada com frango desfiado.",
    "available": true,
    "price": 13
  },
  {
    "id": "412",
    "num": 412,
    "name": "Omelete (2 ovos) - Frango com Queijo",
    "category": "refeicoes-omeletes",
    "desc": "Frango desfiado e muçarela.",
    "available": true,
    "price": 14.5
  },
  {
    "id": "413",
    "num": 413,
    "name": "Omelete (2 ovos) - Carne Seca",
    "category": "refeicoes-omeletes",
    "desc": "Carne seca desfiada acebolada.",
    "available": true,
    "price": 14
  },
  {
    "id": "414",
    "num": 414,
    "name": "Omelete (2 ovos) - Carne Seca com Queijo",
    "category": "refeicoes-omeletes",
    "desc": "Carne seca desfiada e muçarela.",
    "available": true,
    "price": 17.5
  },
  {
    "id": "415",
    "num": 415,
    "name": "Omelete 3 Ovos para Almoço",
    "category": "refeicoes-omeletes",
    "desc": "Escolha 2 recheios: Muçarela, Frango, Peru, Presunto, Tomate ou Orégano.",
    "available": true,
    "price": 20
  },
  {
    "id": "416",
    "num": 416,
    "name": "Macarrão",
    "category": "refeicoes-omeletes",
    "desc": "Escolha sua massa, talharim, penne, espaguete. Escolha 4 ingredientes, frango, carne, milho, azeitona, muçarela, ovos cozidos, tomate, bacon, alho granulado. Escolha os temperos orégano, manjericão, pimenta calabresa, pimenta do reino. Escolha até 2 molhos, molho bolonhesa, molho branco, molho ao sugu.",
    "price": 24.5,
    "available": true
  },
  {
    "id": "417",
    "num": 417,
    "name": "Lasanha de Presunto e Queijo",
    "category": "refeicoes-omeletes",
    "desc": "Camadas de massa fresca, presunto, muçarela e molho bolonhesa.",
    "price": 26,
    "available": true
  },
  {
    "id": "418",
    "num": 418,
    "name": "Lasanha de Frango",
    "category": "refeicoes-omeletes",
    "desc": "Frango desfiado cremoso, molho branco e cobertura de queijo gratinado.",
    "price": 26,
    "available": true
  },
  {
    "id": "450",
    "num": 450,
    "name": "Pudim de Leite Condensado",
    "category": "sobremesas",
    "desc": "Com calda de caramelo caseira.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "451",
    "num": 451,
    "name": "Pudim de Chocolate",
    "category": "sobremesas",
    "desc": "Cremoso e saboroso.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "452",
    "num": 452,
    "name": "Mousse de Maracujá",
    "category": "sobremesas",
    "desc": "Cremosa com sementes de maracujá.",
    "available": true,
    "price": 7
  },
  {
    "id": "453",
    "num": 453,
    "name": "Gelatina Mosaico",
    "category": "sobremesas",
    "desc": "Colorida e cremosa.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "454",
    "num": 454,
    "name": "Gelatina Cremosa",
    "category": "sobremesas",
    "desc": "Doce leve e geladinho.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "455",
    "num": 455,
    "name": "Salada de Frutas Fresca",
    "category": "sobremesas",
    "desc": "Frutas selecionadas do dia.",
    "available": true,
    "price": 8.5
  }
];

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(INITIAL_ITEMS);
    return INITIAL_ITEMS;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length >= 100) {
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
      console.warn('DB file was empty or invalid. Auto-repairing with initial items...');
      saveDB(INITIAL_ITEMS);
      return INITIAL_ITEMS;
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
