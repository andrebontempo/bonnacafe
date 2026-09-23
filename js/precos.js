/* ==========================================================================
   Bonna Café - Centralized Menu & Price Data Store (129 Items)
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
    if (this.cache && Array.isArray(this.cache) && this.cache.length >= 100) {
      return this.cache;
    }
    var storedCatalog = localStorage.getItem('bonna_full_catalog_v4');
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

    var defaultItems = (typeof BONNA_ITEMS !== 'undefined' && Array.isArray(BONNA_ITEMS) && BONNA_ITEMS.length > 0) ? BONNA_ITEMS : [];
    this.cache = JSON.parse(JSON.stringify(defaultItems));
    this.cache.forEach(function(item) {
      if (item && item.available === undefined) item.available = true;
    });
    if (this.cache.length > 0) {
      localStorage.setItem('bonna_full_catalog_v4', JSON.stringify(this.cache));
    }
    return this.cache;
  };

  window.BonnaMenu.getItemsAsync = function(callback) {
    var self = this;
    var localItems = self.getItems();
    if (callback) callback(localItems);
    self.injectPricesCSS(localItems);

    if (window.location.protocol.indexOf('http') === 0 && typeof $ !== 'undefined' && $.ajax) {
      $.ajax({
        url: '/api/items',
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
