const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'bonnacafe_db.json');

// Initial 126 Bonna Café Items
const INITIAL_ITEMS = [
  // COMBOS (001 - 006)
  { id: "001", num: 1, name: "Combo 1", category: "combos", desc: "Suco de Caixinha + Misto quente", price: 10.50, img: "img/specials/1.jpg" },
  { id: "002", num: 2, name: "Combo 2", category: "combos", desc: "Café Longo + Pão de Queijo Recheado", price: 13.50, img: "img/specials/2.jpg" },
  { id: "003", num: 3, name: "Combo 3", category: "combos", desc: "Cappuccino + Biscoito de Queijo", price: 10.30, img: "img/specials/3.jpg" },
  { id: "004", num: 4, name: "Combo 4", category: "combos", desc: "Café com Leite + Pão de Queijo", price: 10.00, img: "img/specials/4.jpg" },
  { id: "005", num: 5, name: "Combo 5", category: "combos", desc: "Toddynho + Misto Quente", price: 11.30, img: "img/specials/5.jpg" },
  { id: "006", num: 6, name: "Combo 6", category: "combos", desc: "Coca-Cola + Misto Quente", price: 11.00, img: "img/specials/6.jpg" },

  // BONNA DO DIA (007 - 011)
  { id: "007", num: 7, name: "Segunda-feira", category: "bonnadodia", desc: "Sanduíche Natural de Peito de Peru + Suco Natural de Limão 300ml", price: 15.50, img: "img/bonnadodia/1.jpg" },
  { id: "008", num: 8, name: "Terça-feira", category: "bonnadodia", desc: "Salgado Costela de Adão + Guaraná Antarctica 310ml", price: 11.00, img: "img/bonnadodia/2.jpg" },
  { id: "009", num: 9, name: "Quarta-feira", category: "bonnadodia", desc: "Torta de Frango + Suco de Caixinha", price: 14.50, img: "img/bonnadodia/3.jpg" },
  { id: "010", num: 10, name: "Quinta-feira", category: "bonnadodia", desc: "Bureak de Frango + Suco de Polpa de Cajá", price: 14.00, img: "img/bonnadodia/4.jpg" },
  { id: "011", num: 11, name: "Sexta-feira", category: "bonnadodia", desc: "Mini Pizza + Coca-Cola 200ml", price: 10.50, img: "img/bonnadodia/5.jpg" },

  // SALGADOS TRADICIONAIS & ASSADOS (012 - 032)
  { id: "012", num: 12, name: "Enroladinho de Presunto e Queijo", category: "salgados", desc: "Presunto, queijo muçarela, tomate e orégano.", price: 6.50 },
  { id: "013", num: 13, name: "Enroladinho de Queijo", category: "salgados", desc: "Queijo muçarela derretido.", price: 6.50 },
  { id: "014", num: 14, name: "Enroladinho de Salsicha", category: "salgados", desc: "Salsicha especial e queijo muçarela.", price: 6.50 },
  { id: "015", num: 15, name: "Pastel de Carne com Bacon", category: "salgados", desc: "Carne moída, bacon, tomate, milho, azeitona, cebola e temperos.", price: 6.50 },
  { id: "016", num: 16, name: "Esfirra de Carne", category: "salgados", desc: "Carne moída temperada com milho, cebola e pimenta de cheiro.", price: 6.50 },
  { id: "017", num: 17, name: "Pão Hambúrguer", category: "salgados", desc: "Carne bovina, muçarela, cheddar, tomate e gergelim.", price: 6.50 },
  { id: "018", num: 18, name: "Pão Napolitano", category: "salgados", desc: "Presunto, muçarela, calabresa, parmesão e orégano.", price: 6.50 },
  { id: "019", num: 19, name: "Pão Pizza", category: "salgados", desc: "Presunto, muçarela, catupiry, tomate, cebola e orégano.", price: 6.50 },
  { id: "020", num: 20, name: "Pão da Vovó", category: "salgados", desc: "Frango desfiado, muçarela, catupiry, temperos e orégano.", price: 6.50 },
  { id: "021", num: 21, name: "Pão Hambúrguer Integral", category: "salgados", desc: "Hambúrguer, muçarela, cheddar e tomate em pão integral.", price: 6.50 },
  { id: "022", num: 22, name: "Pão da Vovó Integral", category: "salgados", desc: "Frango, muçarela, catupiry e orégano em pão integral.", price: 6.50 },
  { id: "023", num: 23, name: "Pão Pizza Integral", category: "salgados", desc: "Presunto, muçarela, catupiry e tomate em pão integral.", price: 6.50 },
  { id: "024", num: 24, name: "Religiosa", category: "salgados", desc: "Frango desfiado, muçarela, catupiry, queijo minas e milho.", price: 6.50 },
  { id: "025", num: 25, name: "Costela de Adão", category: "salgados", desc: "Presunto, muçarela, frango, catupiry, gergelim e ervas.", price: 6.50 },
  { id: "026", num: 26, name: "Croissant de Frango", category: "salgados", desc: "Peito de frango desfiado com milho e azeitona.", price: 6.50 },
  { id: "027", num: 27, name: "Croissant de Chocolate", category: "salgados", desc: "Recheio cremoso de chocolate.", price: 6.50 },
  { id: "028", num: 28, name: "Empadão Goiano", category: "salgados", desc: "Frango, muçarela, linguiça suína, palmito, azeitona e batata.", price: 11.00 },
  { id: "029", num: 29, name: "Mini Pizza (Calabresa / Portuguesa)", category: "salgados", desc: "Massa crocante assada na hora.", price: 7.50 },
  { id: "030", num: 30, name: "Folheado Bureak de Frango", category: "salgados", desc: "Massa folheada leve recheada com frango.", price: 8.00 },
  { id: "031", num: 31, name: "Folheado Queijo Minas com Peito de Peru", category: "salgados", desc: "Massa folheada leve com queijo minas e peru.", price: 8.50 },
  { id: "032", num: 32, name: "Coxinha Assada Especial", category: "salgados", desc: "Frango desfiado assado com tempero da casa.", price: 7.00 },

  // LINHA PÃO DE QUEIJO (033 - 038)
  { id: "033", num: 33, name: "Torta de Frango com Requeijão (Super Lanche)", category: "pao-queijo", desc: "Fatia generosa servida quentinha.", price: 12.00 },
  { id: "034", num: 34, name: "Pão de Queijo Tradicional", category: "pao-queijo", desc: "Receita mineira clássica e quentinha.", price: 4.50 },
  { id: "035", num: 35, name: "Biscoito de Queijo Ferradura", category: "pao-queijo", desc: "Crocante por fora e macio por dentro.", price: 4.80 },
  { id: "036", num: 36, name: "Chipa de Queijo (Porção 4 un.)", category: "pao-queijo", desc: "Ideal para compartilhar.", price: 5.50 },
  { id: "037", num: 37, name: "Pão de Queijo Recheado Peru e Requeijão", category: "pao-queijo", desc: "Caprichado no recheio.", price: 7.50 },
  { id: "038", num: 38, name: "Pão de Queijo Recheado com Nutella", category: "pao-queijo", desc: "Combinação irresistível de doce e salgado.", price: 8.50 },

  // SANDUÍCHES, TAPIOCAS & CUSCUZ (039 - 080)
  { id: "039", num: 39, name: "Sanduíche Natural de Ovo", category: "sanduiches-tapiocas", desc: "Pão integral, alface, tomate, muçarela, maionese light e requeijão.", price: 10.00 },
  { id: "040", num: 40, name: "Sanduíche Natural Peito de Peru", category: "sanduiches-tapiocas", desc: "Pão integral, alface, tomate, muçarela, maionese light e requeijão.", price: 10.00 },
  { id: "041", num: 41, name: "Sanduíche Natural Frango", category: "sanduiches-tapiocas", desc: "Pão integral, alface, tomate, muçarela, maionese light e requeijão.", price: 11.50 },
  { id: "042", num: 42, name: "Pão com Ovo", category: "sanduiches-tapiocas", desc: "Servido quentinho na chapa.", price: 8.00 },
  { id: "043", num: 43, name: "Pão com Queijo Muçarela", category: "sanduiches-tapiocas", desc: "Queijo derretido no pão francês ou de forma.", price: 8.00 },
  { id: "044", num: 44, name: "Pão com Queijo e Presunto (Misto)", category: "sanduiches-tapiocas", desc: "Clássico misto quente.", price: 8.00 },
  { id: "045", num: 45, name: "Pão com Ovo e Queijo Muçarela", category: "sanduiches-tapiocas", desc: "Reforçado na chapa.", price: 9.00 },
  { id: "046", num: 46, name: "Pão com Ovo, Queijo e Presunto", category: "sanduiches-tapiocas", desc: "Super reforçado.", price: 9.00 },
  { id: "047", num: 47, name: "Pão com Ovo e Peito de Peru", category: "sanduiches-tapiocas", desc: "Proteico e saboroso.", price: 9.00 },
  { id: "048", num: 48, name: "Pão com Queijo e Peito de Peru", category: "sanduiches-tapiocas", desc: "Muçarela derretida com peru.", price: 9.50 },
  { id: "049", num: 49, name: "Pão com Ovo, Queijo e Peito de Peru", category: "sanduiches-tapiocas", desc: "Combinação leve e nutritiva.", price: 10.00 },
  { id: "050", num: 50, name: "Pão Completo (Ovo, Queijo, Presunto e Peru)", category: "sanduiches-tapiocas", desc: "Tudo o que você tem direito!", price: 11.00 },
  { id: "051", num: 51, name: "Cuscuz com Manteiga", category: "sanduiches-tapiocas", desc: "Nordestino tradicional quentinho.", price: 8.50 },
  { id: "052", num: 52, name: "Cuscuz com Ovo", category: "sanduiches-tapiocas", desc: "Servido com ovo frito na hora.", price: 10.00 },
  { id: "053", num: 53, name: "Cuscuz com Ovo e Queijo", category: "sanduiches-tapiocas", desc: "Com ovo e muçarela derretida.", price: 11.00 },
  { id: "054", num: 54, name: "Cuscuz com Queijo Muçarela", category: "sanduiches-tapiocas", desc: "Queijo derretido sobre o cuscuz.", price: 10.00 },
  { id: "055", num: 55, name: "Cuscuz com Queijo e Presunto", category: "sanduiches-tapiocas", desc: "Misto no cuscuz.", price: 10.50 },
  { id: "056", num: 56, name: "Cuscuz com Frango", category: "sanduiches-tapiocas", desc: "Recheado com frango desfiado.", price: 12.00 },
  { id: "057", num: 57, name: "Cuscuz com Frango e Queijo", category: "sanduiches-tapiocas", desc: "Frango desfiado com muçarela.", price: 13.50 },
  { id: "058", num: 58, name: "Cuscuz com Frango e Ovo", category: "sanduiches-tapiocas", desc: "Frango e ovo no cuscuz.", price: 13.50 },
  { id: "059", num: 59, name: "Cuscuz com Carne Seca", category: "sanduiches-tapiocas", desc: "Carne seca dessalgada e acebolada.", price: 14.00 },
  { id: "060", num: 60, name: "Cuscuz com Carne Seca e Queijo", category: "sanduiches-tapiocas", desc: "Carne seca com muçarela.", price: 17.00 },
  { id: "061", num: 61, name: "Cuscuz Completo (Carne Seca, Ovo e Queijo)", category: "sanduiches-tapiocas", desc: "Super recheado.", price: 18.00 },
  { id: "062", num: 62, name: "Tapioca com Manteiga", category: "sanduiches-tapiocas", desc: "Massa leve e crocante.", price: 7.50 },
  { id: "063", num: 63, name: "Tapioca com Ovo", category: "sanduiches-tapiocas", desc: "Recheada com ovo mexido ou frito.", price: 9.00 },
  { id: "064", num: 64, name: "Tapioca com Ovo e Queijo Muçarela", category: "sanduiches-tapiocas", desc: "Ovo e muçarela derretida.", price: 11.50 },
  { id: "065", num: 65, name: "Tapioca com Queijo Muçarela", category: "sanduiches-tapiocas", desc: "Queijo quentinho.", price: 10.00 },
  { id: "066", num: 66, name: "Tapioca com Queijo e Presunto", category: "sanduiches-tapiocas", desc: "Tapioca tipo misto.", price: 10.50 },
  { id: "067", num: 67, name: "Tapioca Peito de Peru, Tomate e Orégano", category: "sanduiches-tapiocas", desc: "Leve estilo napolitana.", price: 10.50 },
  { id: "068", num: 68, name: "Tapioca com Frango", category: "sanduiches-tapiocas", desc: "Frango desfiado temperado.", price: 11.00 },
  { id: "069", num: 69, name: "Tapioca com Frango e Queijo", category: "sanduiches-tapiocas", desc: "Frango com muçarela.", price: 13.50 },
  { id: "070", num: 70, name: "Tapioca com Carne Seca", category: "sanduiches-tapiocas", desc: "Carne seca dessalgada.", price: 14.00 },
  { id: "071", num: 71, name: "Tapioca com Carne Seca e Queijo", category: "sanduiches-tapiocas", desc: "Carne seca com muçarela.", price: 17.00 },
  { id: "072", num: 72, name: "Tapioca com Nutella", category: "sanduiches-tapiocas", desc: "Doce e cremosa.", price: 11.00 },
  { id: "073", num: 73, name: "Tapioca com Leite Condensado", category: "sanduiches-tapiocas", desc: "Doce tradicional.", price: 10.00 },
  { id: "074", num: 74, name: "Crepioca de Queijo Muçarela", category: "sanduiches-tapiocas", desc: "Proteica e leve.", price: 10.50 },
  { id: "075", num: 75, name: "Crepioca Queijo e Presunto", category: "sanduiches-tapiocas", desc: "Misto na crepioca.", price: 11.00 },
  { id: "076", num: 76, name: "Crepioca Peru, Tomate e Orégano", category: "sanduiches-tapiocas", desc: "Combinação leve e saborosa.", price: 11.00 },
  { id: "077", num: 77, name: "Crepioca de Frango", category: "sanduiches-tapiocas", desc: "Frango desfiado temperado.", price: 12.50 },
  { id: "078", num: 78, name: "Crepioca Frango com Muçarela", category: "sanduiches-tapiocas", desc: "Frango desfiado e muçarela.", price: 13.50 },
  { id: "079", num: 79, name: "Crepioca de Carne Seca", category: "sanduiches-tapiocas", desc: "Carne seca dessalgada.", price: 14.00 },
  { id: "080", num: 80, name: "Crepioca Carne Seca com Muçarela", category: "sanduiches-tapiocas", desc: "Carne seca e muçarela.", price: 17.50 },

  // ESPECIAIS COM OVO (081 - 089)
  { id: "081", num: 81, name: "Omelete 3 Ovos para Almoço", category: "ovos", desc: "Escolha 2 recheios: Muçarela, Frango, Peru, Presunto, Tomate ou Orégano.", price: 20.00 },
  { id: "082", num: 82, name: "Ovos Mexidos com Orégano", category: "ovos", desc: "Porção individual simples e leve.", price: 2.50 },
  { id: "083", num: 83, name: "Omelete (2 ovos) - Queijo Muçarela", category: "ovos", desc: "Feita na hora com muçarela.", price: 11.50 },
  { id: "084", num: 84, name: "Omelete (2 ovos) - Queijo e Presunto", category: "ovos", desc: "Muçarela e presunto.", price: 12.00 },
  { id: "085", num: 85, name: "Omelete (2 ovos) - Peru, Tomate e Orégano", category: "ovos", desc: "Leve e nutritiva.", price: 12.50 },
  { id: "086", num: 86, name: "Omelete (2 ovos) - Frango", category: "ovos", desc: "Recheada com frango desfiado.", price: 13.00 },
  { id: "087", num: 87, name: "Omelete (2 ovos) - Frango com Queijo", category: "ovos", desc: "Frango desfiado e muçarela.", price: 14.50 },
  { id: "088", num: 88, name: "Omelete (2 ovos) - Carne Seca", category: "ovos", desc: "Carne seca desfiada acebolada.", price: 14.00 },
  { id: "089", num: 89, name: "Omelete (2 ovos) - Carne Seca com Queijo", category: "ovos", desc: "Carne seca desfiada e muçarela.", price: 17.50 },

  // CAFÉS & BEBIDAS (090 - 120)
  { id: "090", num: 90, name: "Toddynho", category: "bebidas-cafes", desc: "Achocolatado de caixinha.", price: 4.80 },
  { id: "091", num: 91, name: "Suco de Caixinha", category: "bebidas-cafes", desc: "Sabores variados.", price: 4.00 },
  { id: "092", num: 92, name: "Refrigerante 310ml (Lata)", category: "bebidas-cafes", desc: "Coca-Cola, Guaraná, Fanta, etc.", price: 6.00 },
  { id: "093", num: 93, name: "Refrigerante 200/220ml", category: "bebidas-cafes", desc: "Garrafinha mini.", price: 4.50 },
  { id: "094", num: 94, name: "Refrigerante 600ml", category: "bebidas-cafes", desc: "Garrafa individual grande.", price: 7.00 },
  { id: "095", num: 95, name: "Chá Gelado", category: "bebidas-cafes", desc: "Pêssego, Pêssego Zero, Limão e Matte Leão.", price: 6.90 },
  { id: "096", num: 96, name: "Matte Leão Batido com Limão 500ml", category: "bebidas-cafes", desc: "Refrescante batido na hora.", price: 7.50 },
  { id: "097", num: 97, name: "Água com Gás", category: "bebidas-cafes", desc: "Garrafa 500ml.", price: 4.50 },
  { id: "098", num: 98, name: "Água sem Gás", category: "bebidas-cafes", desc: "Garrafa 500ml.", price: 4.00 },
  { id: "099", num: 99, name: "H2OH! Limoneto", category: "bebidas-cafes", desc: "Garrafa 500ml.", price: 7.00 },
  { id: "100", num: 100, name: "Energético", category: "bebidas-cafes", desc: "Lata.", price: 13.00 },
  { id: "101", num: 101, name: "Guaraviton", category: "bebidas-cafes", desc: "Garrafa 500ml.", price: 7.00 },
  { id: "102", num: 102, name: "Cerveja Long Neck", category: "bebidas-cafes", desc: "Geladíssima.", price: 10.00 },
  { id: "103", num: 103, name: "Expresso Curto", category: "bebidas-cafes", desc: "Café puro e forte.", price: 6.00 },
  { id: "104", num: 104, name: "Expresso Longo", category: "bebidas-cafes", desc: "Café expresso mais suave.", price: 7.00 },
  { id: "105", num: 105, name: "Café Suave", category: "bebidas-cafes", desc: "Xícara leve.", price: 7.00 },
  { id: "106", num: 106, name: "Café com Leite", category: "bebidas-cafes", desc: "Pingado clássico.", price: 7.00 },
  { id: "107", num: 107, name: "Cappuccino", category: "bebidas-cafes", desc: "Com toque de canela e cacau.", price: 7.00 },
  { id: "108", num: 108, name: "Chocolate Quente", category: "bebidas-cafes", desc: "Cremoso e quentinho.", price: 7.00 },
  { id: "109", num: 109, name: "Leite Quente", category: "bebidas-cafes", desc: "Puro ou adoçado.", price: 6.00 },
  { id: "110", num: 110, name: "Chá Quente de Limão", category: "bebidas-cafes", desc: "Confortável para o dia a dia.", price: 6.00 },
  { id: "111", num: 111, name: "Toddy Gelado 300ml", category: "bebidas-cafes", desc: "Cremoso e gelado.", price: 8.00 },
  { id: "112", num: 112, name: "Toddy Gelado 500ml", category: "bebidas-cafes", desc: "Copo grande de 500ml.", price: 10.50 },
  { id: "113", num: 113, name: "Suco Natural 300ml", category: "bebidas-cafes", desc: "Abacaxi, Laranja, Limão, Maçã ou Mamão.", price: 7.00 },
  { id: "114", num: 114, name: "Suco Natural 500ml", category: "bebidas-cafes", desc: "Abacaxi, Laranja, Limão, Maçã ou Mamão.", price: 9.50 },
  { id: "115", num: 115, name: "Suco de Polpa com Água 500ml", category: "bebidas-cafes", desc: "Acerola, Açaí, Cajá, Caju, Cupuaçu, Goiaba, Graviola, Manga, Maracujá, Morango, Umbu ou Uva.", price: 7.50 },
  { id: "116", num: 116, name: "Suco de Polpa Misto (2 sabores) 500ml", category: "bebidas-cafes", desc: "Combine 2 sabores de frutas.", price: 11.00 },
  { id: "117", num: 117, name: "Suco de Polpa com Leite 500ml", category: "bebidas-cafes", desc: "Batido com leite.", price: 9.50 },
  { id: "118", num: 118, name: "Vitamina Completa 500ml", category: "bebidas-cafes", desc: "Leite + aveia + 2 frutas (Banana, Maçã, Mamão ou Abacate).", price: 12.50 },
  { id: "119", num: 119, name: "Polpa de Açaí com Água + 1 Banana 500ml", category: "bebidas-cafes", desc: "Batido com banana.", price: 11.00 },
  { id: "120", num: 120, name: "Polpa de Açaí com Leite + 1 Banana 500ml", category: "bebidas-cafes", desc: "Batido com leite e banana.", price: 13.00 },

  // SOBREMESAS (121 - 126)
  { id: "121", num: 121, name: "Gelatina Mosaico", category: "sobremesas", desc: "Colorida e cremosa.", price: 7.50 },
  { id: "122", num: 122, name: "Gelatina Cremosa", category: "sobremesas", desc: "Doce leve e geladinho.", price: 7.50 },
  { id: "123", num: 123, name: "Pudim de Leite Condensado", category: "sobremesas", desc: "Com calda de caramelo caseira.", price: 6.50 },
  { id: "124", num: 124, name: "Pudim de Chocolate", category: "sobremesas", desc: "Cremoso e saboroso.", price: 6.50 },
  { id: "125", num: 125, name: "Salada de Frutas Fresca", category: "sobremesas", desc: "Frutas selecionadas do dia.", price: 8.50 },
  { id: "126", num: 126, name: "Mousse de Maracujá", category: "sobremesas", desc: "Cremosa com sementes de maracujá.", price: 7.00 }
];

// Ensure data folder and DB exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    saveDB(INITIAL_ITEMS);
    return INITIAL_ITEMS;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    const data = JSON.parse(raw);
    if (Array.isArray(data) && data.length > 0) {
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
  fs.writeFileSync(DB_FILE, JSON.stringify(items, null, 2), 'utf8');
}

// MIME types dictionary for static server
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
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
    try {
      callback(null, body ? JSON.parse(body) : {});
    } catch (e) {
      callback(e, {});
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

  // GET /api/menu
  if (pathname === '/api/menu' && method === 'GET') {
    const items = loadDB();
    return sendJSON(res, items);
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
      items[idx] = {
        id: itemId,
        num: items[idx].num,
        name: body.name !== undefined ? String(body.name) : items[idx].name,
        category: body.category !== undefined ? String(body.category) : items[idx].category,
        desc: body.desc !== undefined ? String(body.desc) : items[idx].desc,
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
      const adminPass = process.env.ADMIN_PASSWORD || 'bonna123';
      if (body.password === adminPass || body.password === 'admin') {
        return sendJSON(res, { success: true, token: 'authenticated' });
      }
      return sendJSON(res, { success: false, error: 'Senha incorreta' }, 401);
    });
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
