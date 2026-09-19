/* ==========================================================================
   Bonna Café - Centralized Menu & Price Data Store (126 Items)
   ========================================================================== */

var BONNA_ITEMS = [
  {
    "id": "001",
    "num": 1,
    "name": "Combo 1",
    "category": "combos",
    "desc": "Suco de Caixinha + Misto quente",
    "available": true,
    "price": 10.5,
    "img": "img/specials/1.jpg",
  },
  {
    "id": "002",
    "num": 2,
    "name": "Combo 2",
    "category": "combos",
    "desc": "Café Longo + Pão de Queijo Recheado",
    "available": true,
    "price": 13.5,
    "img": "img/specials/2.jpg",
  },
  {
    "id": "003",
    "num": 3,
    "name": "Combo 3",
    "category": "combos",
    "desc": "Cappuccino + Biscoito de Queijo",
    "available": true,
    "price": 10.3,
    "img": "img/specials/3.jpg",
  },
  {
    "id": "004",
    "num": 4,
    "name": "Combo 4",
    "category": "combos",
    "desc": "Café com Leite + Pão de Queijo",
    "available": true,
    "price": 10,
    "img": "img/specials/4.jpg",
  },
  {
    "id": "005",
    "num": 5,
    "name": "Combo 5",
    "category": "combos",
    "desc": "Toddynho + Misto Quente",
    "available": true,
    "price": 11.3,
    "img": "img/specials/5.jpg",
  },
  {
    "id": "006",
    "num": 6,
    "name": "Combo 6",
    "category": "combos",
    "desc": "Coca-Cola + Misto Quente",
    "available": true,
    "price": 11,
    "img": "img/specials/6.jpg",
  },
  {
    "id": "011",
    "num": 11,
    "name": "Segunda-feira",
    "category": "bonnadodia",
    "desc": "Sanduíche Natural de Peito de Peru + Suco Natural de Limão 300ml",
    "available": true,
    "price": 15.5,
    "img": "img/bonnadodia/1.jpg",
  },
  {
    "id": "012",
    "num": 12,
    "name": "Terça-feira",
    "category": "bonnadodia",
    "desc": "Salgado Costela de Adão + Guaraná Antarctica 310ml",
    "available": true,
    "price": 11,
    "img": "img/bonnadodia/2.jpg",
  },
  {
    "id": "013",
    "num": 13,
    "name": "Quarta-feira",
    "category": "bonnadodia",
    "desc": "Torta de Frango + Suco de Caixinha",
    "available": true,
    "price": 14.5,
    "img": "img/bonnadodia/3.jpg",
  },
  {
    "id": "014",
    "num": 14,
    "name": "Quinta-feira",
    "category": "bonnadodia",
    "desc": "Bureak de Frango + Suco de Polpa de Cajá",
    "available": true,
    "price": 14,
    "img": "img/bonnadodia/4.jpg",
  },
  {
    "id": "015",
    "num": 15,
    "name": "Sexta-feira",
    "category": "bonnadodia",
    "desc": "Mini Pizza + Coca-Cola 200ml",
    "available": true,
    "price": 10.5,
    "img": "img/bonnadodia/5.jpg",
  },
  {
    "id": "021",
    "num": 21,
    "name": "Enroladinho de Presunto e Queijo",
    "category": "salgados",
    "desc": "Presunto, queijo muçarela, tomate e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "022",
    "num": 22,
    "name": "Enroladinho de Queijo",
    "category": "salgados",
    "desc": "Queijo muçarela derretido.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "023",
    "num": 23,
    "name": "Enroladinho de Salsicha",
    "category": "salgados",
    "desc": "Salsicha especial e queijo muçarela.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "024",
    "num": 24,
    "name": "Pastel de Carne com Bacon",
    "category": "salgados",
    "desc": "Carne moída, bacon, tomate, milho, azeitona, cebola e temperos.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "025",
    "num": 25,
    "name": "Esfirra de Carne",
    "category": "salgados",
    "desc": "Carne moída temperada com milho, cebola e pimenta de cheiro.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "026",
    "num": 26,
    "name": "Pão Hambúrguer",
    "category": "salgados",
    "desc": "Carne bovina, muçarela, cheddar, tomate e gergelim.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "027",
    "num": 27,
    "name": "Pão Napolitano",
    "category": "salgados",
    "desc": "Presunto, muçarela, calabresa, parmesão e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "028",
    "num": 28,
    "name": "Pão Pizza",
    "category": "salgados",
    "desc": "Presunto, muçarela, catupiry, tomate, cebola e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "029",
    "num": 29,
    "name": "Pão da Vovó",
    "category": "salgados",
    "desc": "Frango desfiado, muçarela, catupiry, temperos e orégano.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "030",
    "num": 30,
    "name": "Pão Hambúrguer Integral",
    "category": "salgados",
    "desc": "Hambúrguer, muçarela, cheddar e tomate em pão integral.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "031",
    "num": 31,
    "name": "Pão da Vovó Integral",
    "category": "salgados",
    "desc": "Frango, muçarela, catupiry e orégano em pão integral.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "032",
    "num": 32,
    "name": "Pão Pizza Integral",
    "category": "salgados",
    "desc": "Presunto, muçarela, catupiry e tomate em pão integral.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "033",
    "num": 33,
    "name": "Religiosa",
    "category": "salgados",
    "desc": "Frango desfiado, muçarela, catupiry, queijo minas e milho.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "034",
    "num": 34,
    "name": "Costela de Adão",
    "category": "salgados",
    "desc": "Presunto, muçarela, frango, catupiry, gergelim e ervas.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "035",
    "num": 35,
    "name": "Croissant de Frango",
    "category": "salgados",
    "desc": "Peito de frango desfiado com milho e azeitona.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "036",
    "num": 36,
    "name": "Croissant de Chocolate",
    "category": "salgados",
    "desc": "Recheio cremoso de chocolate.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "037",
    "num": 37,
    "name": "Empadão Goiano",
    "category": "salgados",
    "desc": "Frango, muçarela, linguiça suína, palmito, azeitona e batata.",
    "available": true,
    "price": 11
  },
  {
    "id": "038",
    "num": 38,
    "name": "Mini Pizza (Calabresa / Portuguesa)",
    "category": "salgados",
    "desc": "Massa crocante assada na hora.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "039",
    "num": 39,
    "name": "Folheado Bureak de Frango",
    "category": "salgados",
    "desc": "Massa folheada leve recheada com frango.",
    "available": true,
    "price": 8
  },
  {
    "id": "040",
    "num": 40,
    "name": "Folheado Queijo Minas com Peito de Peru",
    "category": "salgados",
    "desc": "Massa folheada leve com queijo minas e peru.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "041",
    "num": 41,
    "name": "Coxinha Assada Especial",
    "category": "salgados",
    "desc": "Frango desfiado assado com tempero da casa.",
    "available": true,
    "price": 7
  },
  {
    "id": "042",
    "num": 42,
    "name": "Matte Leão Batido com Limão 500ml",
    "category": "salgados",
    "desc": "Refrescante batido na hora.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "051",
    "num": 51,
    "name": "Torta de Frango com Requeijão (Super Lanche)",
    "category": "pao-queijo",
    "desc": "Fatia generosa servida quentinha.",
    "available": true,
    "price": 12
  },
  {
    "id": "052",
    "num": 52,
    "name": "Pão de Queijo Tradicional",
    "category": "pao-queijo",
    "desc": "Receita mineira clássica e quentinha.",
    "available": true,
    "price": 4.5
  },
  {
    "id": "053",
    "num": 53,
    "name": "Biscoito de Queijo Ferradura",
    "category": "pao-queijo",
    "desc": "Crocante por fora e macio por dentro.",
    "available": true,
    "price": 4.8
  },
  {
    "id": "054",
    "num": 54,
    "name": "Chipa de Queijo (Porção 4 un.)",
    "category": "pao-queijo",
    "desc": "Ideal para compartilhar.",
    "available": true,
    "price": 5.5
  },
  {
    "id": "055",
    "num": 55,
    "name": "Pão de Queijo Recheado Peru e Requeijão",
    "category": "pao-queijo",
    "desc": "Caprichado no recheio.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "056",
    "num": 56,
    "name": "Pão de Queijo Recheado com Nutella",
    "category": "pao-queijo",
    "desc": "Combinação irresistível de doce e salgado.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "081",
    "num": 81,
    "name": "Sanduíche Natural de Ovo",
    "category": "sanduiches-tapiocas",
    "desc": "Pão integral, alface, tomate, muçarela, maionese light e requeijão.",
    "available": true,
    "price": 10
  },
  {
    "id": "082",
    "num": 82,
    "name": "Sanduíche Natural Peito de Peru",
    "category": "sanduiches-tapiocas",
    "desc": "Pão integral, alface, tomate, muçarela, maionese light e requeijão.",
    "available": true,
    "price": 10
  },
  {
    "id": "083",
    "num": 83,
    "name": "Sanduíche Natural Frango",
    "category": "sanduiches-tapiocas",
    "desc": "Pão integral, alface, tomate, muçarela, maionese light e requeijão.",
    "available": true,
    "price": 11.5
  },
  {
    "id": "084",
    "num": 84,
    "name": "Pão com Ovo",
    "category": "sanduiches-tapiocas",
    "desc": "Servido quentinho na chapa.",
    "available": true,
    "price": 8
  },
  {
    "id": "085",
    "num": 85,
    "name": "Pão com Queijo Muçarela",
    "category": "sanduiches-tapiocas",
    "desc": "Queijo derretido no pão francês ou de forma.",
    "available": true,
    "price": 8
  },
  {
    "id": "086",
    "num": 86,
    "name": "Pão com Queijo e Presunto (Misto)",
    "category": "sanduiches-tapiocas",
    "desc": "Clássico misto quente.",
    "available": true,
    "price": 8
  },
  {
    "id": "087",
    "num": 87,
    "name": "Pão com Ovo e Queijo Muçarela",
    "category": "sanduiches-tapiocas",
    "desc": "Reforçado na chapa.",
    "available": true,
    "price": 9
  },
  {
    "id": "088",
    "num": 88,
    "name": "Pão com Ovo, Queijo e Presunto",
    "category": "sanduiches-tapiocas",
    "desc": "Super reforçado.",
    "available": true,
    "price": 9
  },
  {
    "id": "089",
    "num": 89,
    "name": "Pão com Ovo e Peito de Peru",
    "category": "sanduiches-tapiocas",
    "desc": "Proteico e saboroso.",
    "available": true,
    "price": 9
  },
  {
    "id": "090",
    "num": 90,
    "name": "Pão com Queijo e Peito de Peru",
    "category": "sanduiches-tapiocas",
    "desc": "Muçarela derretida com peru.",
    "available": true,
    "price": 9.5
  },
  {
    "id": "091",
    "num": 91,
    "name": "Pão com Ovo, Queijo e Peito de Peru",
    "category": "sanduiches-tapiocas",
    "desc": "Combinação leve e nutritiva.",
    "available": true,
    "price": 10
  },
  {
    "id": "092",
    "num": 92,
    "name": "Pão Completo (Ovo, Queijo, Presunto e Peru)",
    "category": "sanduiches-tapiocas",
    "desc": "Tudo o que você tem direito!",
    "available": true,
    "price": 11
  },
  {
    "id": "093",
    "num": 93,
    "name": "Tapioca com Manteiga",
    "category": "sanduiches-tapiocas",
    "desc": "Massa leve e crocante.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "094",
    "num": 94,
    "name": "Tapioca com Ovo",
    "category": "sanduiches-tapiocas",
    "desc": "Recheada com ovo mexido ou frito.",
    "available": true,
    "price": 9
  },
  {
    "id": "095",
    "num": 95,
    "name": "Tapioca com Ovo e Queijo Muçarela",
    "category": "sanduiches-tapiocas",
    "desc": "Ovo e muçarela derretida.",
    "available": true,
    "price": 11.5
  },
  {
    "id": "096",
    "num": 96,
    "name": "Tapioca com Queijo Muçarela",
    "category": "sanduiches-tapiocas",
    "desc": "Queijo quentinho.",
    "available": true,
    "price": 10
  },
  {
    "id": "097",
    "num": 97,
    "name": "Tapioca com Queijo e Presunto",
    "category": "sanduiches-tapiocas",
    "desc": "Tapioca tipo misto.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "098",
    "num": 98,
    "name": "Tapioca Peito de Peru, Tomate e Orégano",
    "category": "sanduiches-tapiocas",
    "desc": "Leve estilo napolitana.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "099",
    "num": 99,
    "name": "Tapioca com Frango",
    "category": "sanduiches-tapiocas",
    "desc": "Frango desfiado temperado.",
    "available": true,
    "price": 11
  },
  {
    "id": "100",
    "num": 100,
    "name": "Tapioca com Frango e Queijo",
    "category": "sanduiches-tapiocas",
    "desc": "Frango com muçarela.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "101",
    "num": 101,
    "name": "Tapioca com Carne Seca",
    "category": "sanduiches-tapiocas",
    "desc": "Carne seca dessalgada.",
    "available": true,
    "price": 14
  },
  {
    "id": "102",
    "num": 102,
    "name": "Tapioca com Carne Seca e Queijo",
    "category": "sanduiches-tapiocas",
    "desc": "Carne seca com muçarela.",
    "available": true,
    "price": 17
  },
  {
    "id": "103",
    "num": 103,
    "name": "Tapioca com Nutella",
    "category": "sanduiches-tapiocas",
    "desc": "Doce e cremosa.",
    "available": true,
    "price": 11
  },
  {
    "id": "104",
    "num": 104,
    "name": "Tapioca com Leite Condensado",
    "category": "sanduiches-tapiocas",
    "desc": "Doce tradicional.",
    "available": true,
    "price": 10
  },
  {
    "id": "111",
    "num": 111,
    "name": "Cuscuz com Manteiga",
    "category": "ovos",
    "desc": "Nordestino tradicional quentinho.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "112",
    "num": 112,
    "name": "Cuscuz com Ovo",
    "category": "ovos",
    "desc": "Servido com ovo frito na hora.",
    "available": true,
    "price": 10
  },
  {
    "id": "113",
    "num": 113,
    "name": "Cuscuz com Ovo e Queijo",
    "category": "ovos",
    "desc": "Com ovo e muçarela derretida.",
    "available": true,
    "price": 11
  },
  {
    "id": "114",
    "num": 114,
    "name": "Cuscuz com Queijo Muçarela",
    "category": "ovos",
    "desc": "Queijo derretido sobre o cuscuz.",
    "available": true,
    "price": 10
  },
  {
    "id": "115",
    "num": 115,
    "name": "Cuscuz com Queijo e Presunto",
    "category": "ovos",
    "desc": "Misto no cuscuz.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "116",
    "num": 116,
    "name": "Cuscuz com Frango",
    "category": "ovos",
    "desc": "Recheado com frango desfiado.",
    "available": true,
    "price": 12
  },
  {
    "id": "117",
    "num": 117,
    "name": "Cuscuz com Frango e Queijo",
    "category": "ovos",
    "desc": "Frango desfiado com muçarela.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "118",
    "num": 118,
    "name": "Cuscuz com Frango e Ovo",
    "category": "ovos",
    "desc": "Frango e ovo no cuscuz.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "119",
    "num": 119,
    "name": "Cuscuz com Carne Seca",
    "category": "ovos",
    "desc": "Carne seca dessalgada e acebolada.",
    "available": true,
    "price": 14
  },
  {
    "id": "120",
    "num": 120,
    "name": "Cuscuz com Carne Seca e Queijo",
    "category": "ovos",
    "desc": "Carne seca com muçarela.",
    "available": true,
    "price": 17
  },
  {
    "id": "121",
    "num": 121,
    "name": "Cuscuz Completo (Carne Seca, Ovo e Queijo)",
    "category": "ovos",
    "desc": "Super recheado.",
    "available": true,
    "price": 18
  },
  {
    "id": "122",
    "num": 122,
    "name": "Crepioca de Queijo Muçarela",
    "category": "ovos",
    "desc": "Proteica e leve.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "123",
    "num": 123,
    "name": "Crepioca Queijo e Presunto",
    "category": "ovos",
    "desc": "Misto na crepioca.",
    "available": true,
    "price": 11
  },
  {
    "id": "124",
    "num": 124,
    "name": "Crepioca Peru, Tomate e Orégano",
    "category": "ovos",
    "desc": "Combinação leve e saborosa.",
    "available": true,
    "price": 11
  },
  {
    "id": "125",
    "num": 125,
    "name": "Crepioca de Frango",
    "category": "ovos",
    "desc": "Frango desfiado temperado.",
    "available": true,
    "price": 12.5
  },
  {
    "id": "126",
    "num": 126,
    "name": "Crepioca Frango com Muçarela",
    "category": "ovos",
    "desc": "Frango desfiado e muçarela.",
    "available": true,
    "price": 13.5
  },
  {
    "id": "127",
    "num": 127,
    "name": "Crepioca de Carne Seca",
    "category": "ovos",
    "desc": "Carne seca dessalgada.",
    "available": true,
    "price": 14
  },
  {
    "id": "128",
    "num": 128,
    "name": "Crepioca Carne Seca com Muçarela",
    "category": "ovos",
    "desc": "Carne seca e muçarela.",
    "available": true,
    "price": 17.5
  },
  {
    "id": "129",
    "num": 129,
    "name": "Omelete 3 Ovos para Almoço",
    "category": "ovos",
    "desc": "Escolha 2 recheios: Muçarela, Frango, Peru, Presunto, Tomate ou Orégano.",
    "available": true,
    "price": 20
  },
  {
    "id": "130",
    "num": 130,
    "name": "Ovos Mexidos com Orégano",
    "category": "ovos",
    "desc": "Porção individual simples e leve.",
    "available": true,
    "price": 2.5
  },
  {
    "id": "131",
    "num": 131,
    "name": "Omelete (2 ovos) - Queijo Muçarela",
    "category": "ovos",
    "desc": "Feita na hora com muçarela.",
    "available": true,
    "price": 11.5
  },
  {
    "id": "132",
    "num": 132,
    "name": "Omelete (2 ovos) - Queijo e Presunto",
    "category": "ovos",
    "desc": "Muçarela e presunto.",
    "available": true,
    "price": 12
  },
  {
    "id": "133",
    "num": 133,
    "name": "Omelete (2 ovos) - Peru, Tomate e Orégano",
    "category": "ovos",
    "desc": "Leve e nutritiva.",
    "available": true,
    "price": 12.5
  },
  {
    "id": "134",
    "num": 134,
    "name": "Omelete (2 ovos) - Frango",
    "category": "ovos",
    "desc": "Recheada com frango desfiado.",
    "available": true,
    "price": 13
  },
  {
    "id": "135",
    "num": 135,
    "name": "Omelete (2 ovos) - Frango com Queijo",
    "category": "ovos",
    "desc": "Frango desfiado e muçarela.",
    "available": true,
    "price": 14.5
  },
  {
    "id": "136",
    "num": 136,
    "name": "Omelete (2 ovos) - Carne Seca",
    "category": "ovos",
    "desc": "Carne seca desfiada acebolada.",
    "available": true,
    "price": 14
  },
  {
    "id": "137",
    "num": 137,
    "name": "Omelete (2 ovos) - Carne Seca com Queijo",
    "category": "ovos",
    "desc": "Carne seca desfiada e muçarela.",
    "available": true,
    "price": 17.5
  },
  {
    "id": "141",
    "num": 141,
    "name": "Spaghetti à Bolonhesa",
    "category": "massas",
    "desc": "Massa tradicional com molho caseiro à bolonhesa.",
    "available": true,
    "price": 24.5
  },
  {
    "id": "142",
    "num": 142,
    "name": "Lasanha de Presunto e Queijo",
    "category": "massas",
    "desc": "Lasanha de presunto, queijo muçarela e molho artesanal.",
    "available": true,
    "price": 26
  },
  {
    "id": "143",
    "num": 143,
    "name": "Lasanha de Frango com Catupiry",
    "category": "massas",
    "desc": "Lasanha cremosíssima de frango com catupiry.",
    "available": true,
    "price": 26
  },
  {
    "id": "171",
    "num": 171,
    "name": "Toddynho",
    "category": "bebidas-cafes",
    "desc": "Achocolatado de caixinha.",
    "available": true,
    "price": 4.8
  },
  {
    "id": "172",
    "num": 172,
    "name": "Suco de Caixinha",
    "category": "bebidas-cafes",
    "desc": "Sabores variados.",
    "available": true,
    "price": 4
  },
  {
    "id": "173",
    "num": 173,
    "name": "Refrigerante 310ml (Lata)",
    "category": "bebidas-cafes",
    "desc": "Coca-Cola, Guaraná, Fanta, etc.",
    "available": true,
    "price": 6
  },
  {
    "id": "174",
    "num": 174,
    "name": "Refrigerante 200/220ml",
    "category": "bebidas-cafes",
    "desc": "Garrafinha mini.",
    "available": true,
    "price": 4.5
  },
  {
    "id": "175",
    "num": 175,
    "name": "Refrigerante 600ml",
    "category": "bebidas-cafes",
    "desc": "Garrafa individual grande.",
    "available": true,
    "price": 7
  },
  {
    "id": "176",
    "num": 176,
    "name": "Chá Gelado",
    "category": "bebidas-cafes",
    "desc": "Pêssego, Pêssego Zero, Limão e Matte Leão.",
    "available": true,
    "price": 6.9
  },
  {
    "id": "177",
    "num": 177,
    "name": "Água com Gás",
    "category": "bebidas-cafes",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 4.5
  },
  {
    "id": "178",
    "num": 178,
    "name": "Água sem Gás",
    "category": "bebidas-cafes",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 4
  },
  {
    "id": "179",
    "num": 179,
    "name": "H2OH! Limoneto",
    "category": "bebidas-cafes",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 7
  },
  {
    "id": "180",
    "num": 180,
    "name": "Energético",
    "category": "bebidas-cafes",
    "desc": "Lata.",
    "available": true,
    "price": 13
  },
  {
    "id": "181",
    "num": 181,
    "name": "Guaraviton",
    "category": "bebidas-cafes",
    "desc": "Garrafa 500ml.",
    "available": true,
    "price": 7
  },
  {
    "id": "182",
    "num": 182,
    "name": "Cerveja Long Neck",
    "category": "bebidas-cafes",
    "desc": "Geladíssima.",
    "available": true,
    "price": 10
  },
  {
    "id": "183",
    "num": 183,
    "name": "Expresso Curto",
    "category": "bebidas-cafes",
    "desc": "Café puro e forte.",
    "available": true,
    "price": 6
  },
  {
    "id": "184",
    "num": 184,
    "name": "Expresso Longo",
    "category": "bebidas-cafes",
    "desc": "Café expresso mais suave.",
    "available": true,
    "price": 7
  },
  {
    "id": "185",
    "num": 185,
    "name": "Café Suave",
    "category": "bebidas-cafes",
    "desc": "Xícara leve.",
    "available": true,
    "price": 7
  },
  {
    "id": "186",
    "num": 186,
    "name": "Café com Leite",
    "category": "bebidas-cafes",
    "desc": "Pingado clássico.",
    "available": true,
    "price": 7
  },
  {
    "id": "187",
    "num": 187,
    "name": "Cappuccino",
    "category": "bebidas-cafes",
    "desc": "Com toque de canela e cacau.",
    "available": true,
    "price": 7
  },
  {
    "id": "188",
    "num": 188,
    "name": "Chocolate Quente",
    "category": "bebidas-cafes",
    "desc": "Cremoso e quentinho.",
    "available": true,
    "price": 7
  },
  {
    "id": "189",
    "num": 189,
    "name": "Leite Quente",
    "category": "bebidas-cafes",
    "desc": "Puro ou adoçado.",
    "available": true,
    "price": 6
  },
  {
    "id": "190",
    "num": 190,
    "name": "Chá Quente de Limão",
    "category": "bebidas-cafes",
    "desc": "Confortável para o dia a dia.",
    "available": true,
    "price": 6
  },
  {
    "id": "191",
    "num": 191,
    "name": "Toddy Gelado 300ml",
    "category": "bebidas-cafes",
    "desc": "Cremoso e gelado.",
    "available": true,
    "price": 8
  },
  {
    "id": "192",
    "num": 192,
    "name": "Toddy Gelado 500ml",
    "category": "bebidas-cafes",
    "desc": "Copo grande de 500ml.",
    "available": true,
    "price": 10.5
  },
  {
    "id": "193",
    "num": 193,
    "name": "Suco Natural 300ml",
    "category": "bebidas-cafes",
    "desc": "Abacaxi, Laranja, Limão, Maçã ou Mamão.",
    "available": true,
    "price": 7
  },
  {
    "id": "194",
    "num": 194,
    "name": "Suco Natural 500ml",
    "category": "bebidas-cafes",
    "desc": "Abacaxi, Laranja, Limão, Maçã ou Mamão.",
    "available": true,
    "price": 9.5
  },
  {
    "id": "195",
    "num": 195,
    "name": "Suco de Polpa com Água 500ml",
    "category": "bebidas-cafes",
    "desc": "Acerola, Açaí, Cajá, Caju, Cupuaçu, Goiaba, Graviola, Manga, Maracujá, Morango, Umbu ou Uva.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "196",
    "num": 196,
    "name": "Suco de Polpa Misto (2 sabores) 500ml",
    "category": "bebidas-cafes",
    "desc": "Combine 2 sabores de frutas.",
    "available": true,
    "price": 11
  },
  {
    "id": "197",
    "num": 197,
    "name": "Suco de Polpa com Leite 500ml",
    "category": "bebidas-cafes",
    "desc": "Batido com leite.",
    "available": true,
    "price": 9.5
  },
  {
    "id": "198",
    "num": 198,
    "name": "Vitamina Completa 500ml",
    "category": "bebidas-cafes",
    "desc": "Leite + aveia + 2 frutas (Banana, Maçã, Mamão ou Abacate).",
    "available": true,
    "price": 12.5
  },
  {
    "id": "199",
    "num": 199,
    "name": "Polpa de Açaí com Água + 1 Banana 500ml",
    "category": "bebidas-cafes",
    "desc": "Batido com banana.",
    "available": true,
    "price": 11
  },
  {
    "id": "200",
    "num": 200,
    "name": "Polpa de Açaí com Leite + 1 Banana 500ml",
    "category": "bebidas-cafes",
    "desc": "Batido com leite e banana.",
    "available": true,
    "price": 13
  },
  {
    "id": "201",
    "num": 201,
    "name": "Gelatina Mosaico",
    "category": "sobremesas",
    "desc": "Colorida e cremosa.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "202",
    "num": 202,
    "name": "Gelatina Cremosa",
    "category": "sobremesas",
    "desc": "Doce leve e geladinho.",
    "available": true,
    "price": 7.5
  },
  {
    "id": "203",
    "num": 203,
    "name": "Pudim de Leite Condensado",
    "category": "sobremesas",
    "desc": "Com calda de caramelo caseira.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "204",
    "num": 204,
    "name": "Pudim de Chocolate",
    "category": "sobremesas",
    "desc": "Cremoso e saboroso.",
    "available": true,
    "price": 6.5
  },
  {
    "id": "205",
    "num": 205,
    "name": "Salada de Frutas Fresca",
    "category": "sobremesas",
    "desc": "Frutas selecionadas do dia.",
    "available": true,
    "price": 8.5
  },
  {
    "id": "206",
    "num": 206,
    "name": "Mousse de Maracujá",
    "category": "sobremesas",
    "desc": "Cremosa com sementes de maracujá.",
    "available": true,
    "price": 7
  },
  {
    "id": "207",
    "num": 207,
    "name": "Teste de Sobremesa",
    "category": "sobremesas",
    "desc": "asdfadfasdf",
    "available": true,
    "price": 10,
    "img": null
  }
];

window.BonnaMenu = {
  CATEGORY_RANGES: {
    'combos': { min: 1, max: 10 },
    'bonnadodia': { min: 11, max: 20 },
    'salgados': { min: 21, max: 50 },
    'pao-queijo': { min: 51, max: 80 },
    'sanduiches-tapiocas': { min: 81, max: 110 },
    'ovos': { min: 111, max: 140 },
    'massas': { min: 141, max: 170 },
    'bebidas-cafes': { min: 171, max: 200 },
    'sobremesas': { min: 201, max: 230 }
  },

  getNextAvailableId: function(category, items) {
    items = items || this.getItems();
    var range = this.CATEGORY_RANGES[category] || { min: 1, max: 999 };
    var usedIds = {};
    (items || []).forEach(function(it) {
      if (it && it.id) {
        usedIds[String(it.id).trim()] = true;
      }
    });

    // Procura o primeiro código livre dentro da faixa da categoria (não-incremental)
    for (var i = range.min; i <= range.max; i++) {
      var candidate = ('000' + i).slice(-3);
      if (!usedIds[candidate]) {
        return candidate;
      }
    }

    // Se a faixa estiver ocupada, pega o próximo livre após range.max
    var nextNum = range.max + 1;
    while (usedIds[('000' + nextNum).slice(-3)]) {
      nextNum++;
    }
    return ('000' + nextNum).slice(-3);
  },
  cache: null,

  // Synchronous getItems - Always returns items instantly with guaranteed fallback
  getItems: function() {
    if (this.cache && Array.isArray(this.cache) && this.cache.length >= 100) {
      return this.cache;
    }
    localStorage.removeItem('bonna_full_catalog');
    localStorage.removeItem('bonna_full_catalog_v2');
    var storedCatalog = localStorage.getItem('bonna_full_catalog_v3');
    if (storedCatalog) {
      try {
        var parsed = JSON.parse(storedCatalog);
        if (Array.isArray(parsed) && parsed.length >= 100) {
          parsed.forEach(function(item) {
            if (item && item.available === undefined) item.available = true;
          });
          this.cache = parsed;
          return this.cache;
        }
      } catch (e) {}
    }

    // Auto-repair with default items if cache or storage was empty or incomplete
    var defaultItems = (typeof BONNA_ITEMS !== 'undefined' && Array.isArray(BONNA_ITEMS) && BONNA_ITEMS.length > 0) ? BONNA_ITEMS : [];
    this.cache = JSON.parse(JSON.stringify(defaultItems));
    this.cache.forEach(function(item) {
      if (item && item.available === undefined) item.available = true;
    });
    if (this.cache.length > 0) {
      localStorage.setItem('bonna_full_catalog_v3', JSON.stringify(this.cache));
    }
    return this.cache;
  },

  // Async getItems - delivers local items immediately, then updates from server API if online
  getItemsAsync: function(callback) {
    var self = this;
    var localItems = self.getItems();
    if (callback) callback(localItems);
    self.injectPricesCSS(localItems);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/menu',
        type: 'GET',
        dataType: 'json',
        timeout: 2500,
        success: function(data) {
          if (Array.isArray(data) && data.length >= 100) {
            self.cache = data;
            localStorage.setItem('bonna_full_catalog_v3', JSON.stringify(data));
            if (callback) callback(data);
            self.injectPricesCSS(data);
          } else if (localItems && localItems.length > 0) {
            // Auto-sync local items to API if server database was clean
            self.saveCatalog(localItems);
          }
        },
        error: function() {
          // Gracefully continue with localItems
        }
      });
    }
  },

  saveCatalog: function(items, callback) {
    var self = this;
    if (!items || !Array.isArray(items) || items.length === 0) {
      items = (typeof BONNA_ITEMS !== 'undefined' && Array.isArray(BONNA_ITEMS)) ? BONNA_ITEMS : [];
    }
    // Ordena o catálogo numericamente por ID
    items.sort(function(a, b) {
      var numA = parseInt(a.id || a.num || 0, 10);
      var numB = parseInt(b.id || b.num || 0, 10);
      if (numA !== numB) return numA - numB;
      return String(a.id || '').localeCompare(String(b.id || ''));
    });

    self.cache = items;
    localStorage.setItem('bonna_full_catalog_v3', JSON.stringify(items));
    self.injectPricesCSS(items);

    if (callback) callback(items);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/menu/bulk-save',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ items: items }),
        timeout: 3000,
        success: function() {},
        error: function() {}
      });
    }
  },

  createItem: function(itemData, callback) {
    var items = JSON.parse(JSON.stringify(this.getItems()));
    items.push(itemData);
    this.saveCatalog(items, callback);
  },

  updateItem: function(id, itemData, callback) {
    var items = JSON.parse(JSON.stringify(this.getItems()));
    var idx = -1;
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      for (var key in itemData) {
        if (itemData.hasOwnProperty(key)) {
          items[idx][key] = itemData[key];
        }
      }
    }
    this.saveCatalog(items, callback);
  },

  deleteItem: function(id, callback) {
    var items = JSON.parse(JSON.stringify(this.getItems()));
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id !== id) {
        filtered.push(items[i]);
      }
    }
    this.saveCatalog(filtered, callback);
  },

  bulkAdjust: function(bulkData, callback) {
    var items = JSON.parse(JSON.stringify(this.getItems()));
    var factor = 1 + (parseFloat(bulkData.percent) / 100);
    items.forEach(function(item) {
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
    this.saveCatalog(items, callback);
  },

  resetCatalog: function(callback) {
    localStorage.removeItem('bonna_full_catalog');
    localStorage.removeItem('bonna_full_catalog_v2');
    var defaultItems = (typeof BONNA_ITEMS !== 'undefined') ? BONNA_ITEMS : [];
    this.cache = JSON.parse(JSON.stringify(defaultItems));
    this.saveCatalog(this.cache, callback);
    return this.cache;
  },

  formatPrice: function(val) {
    return 'R$ ' + parseFloat(val || 0).toFixed(2).replace('.', ',');
  },

  injectPricesCSS: function(items) {
    items = items || this.getItems();
    var styleId = 'dynamic-bonna-prices';
    var styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    var cssRules = items.map(function(item) {
      var formatted = 'R$ ' + parseFloat(item.price || 0).toFixed(2).replace('.', ',');
      return '#_' + item.id + '::after { content: "' + formatted + '"; }';
    }).join('\n');

    styleEl.innerHTML = cssRules;
  }
};

// Automatically fetch items & inject prices on script load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function() {
    window.BonnaMenu.getItemsAsync();
  });
}
