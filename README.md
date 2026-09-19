# ☕ Bonna Café — Web App & Admin Catalog Management

Aplicação web completa do **Bonna Café** (Hangar 5 & Gilberto Salomão - Lago Sul, Brasília/DF), com cardápio dinâmico, busca/filtros em tempo real, painel administrativo de gestão de preços e catálogo, persistência em JSON/banco de dados e servidor nativo em Node.js containerizado via Docker.

---

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js (Servidor nativo HTTP, REST API)
- **Frontend**: HTML5, CSS3 Vanilla / Modern Design System, JavaScript (ES6+), jQuery, Bootstrap
- **Banco de Dados / Persistência**: Arquivo JSON relacional local (`data/bonnacafe_db.json`) com sincronização em tempo real no servidor
- **Containerização & Deploy**: Docker, Docker Compose, GitHub Actions (CI/CD automático via SSH)

---

## 📁 Estrutura de Diretórios Organizada

```text
bonnacafe/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Fluxo de CI/CD automático para deploy na VPS
├── css/
│   ├── bootstrap.css           # Framework Bootstrap
│   ├── nivo-lightbox/          # Plugin de galeria lightbox para poesias
│   ├── precos.css              # Estilos da tabela de preços
│   └── style.css               # Design System principal & variáveis HSL/CSS
├── data/
│   └── bonnacafe_db.json       # Banco de dados do catálogo e preços
├── fonts/                      # Fontes locais e ícones (FontAwesome, Glyphicons)
├── img/
│   ├── bonnadodia/             # Imagens dos pratos Bonna do Dia (Seg-Sexta)
│   ├── portfolio/              # Imagens das Poesias com Café
│   ├── specials/               # Imagens dos Combos Especiais
│   └── team/                   # Imagens da Equipe Bonna Café
├── js/
│   ├── main.js                 # Scripts de navegação e interações
│   ├── precos.js               # Central de dados & cliente API BonnaMenu
│   └── ...                     # Bibliotecas JS (jQuery, Bootstrap, Isotope)
├── cardapio.html               # Página do Cardápio Completo com Busca & Filtros
├── index.html                  # Landing Page principal
├── obrigado.html               # Página de agradecimento pós-contato
├── reajuste.html               # Painel Admin (Gestão de Itens, Preços e Reajuste %)
├── server.js                   # Servidor Node.js nativo & REST API
├── Dockerfile                  # Containerização Node.js (Alpine Linux)
├── docker-compose.yml          # Orquestração do container na rede proxy
└── package.json                # Configurações do projeto e scripts npm
```

---

## 🏷️ Faixas de Códigos por Categoria  (IDs)

Os itens do cardápio possuem códigos padronizados organizados por categoria. O sistema possui algoritmo de geração **não-incremental**, preenchendo automaticamente posições intermediárias vagas:

| Categoria | Faixa de Código | Descrição |
| :--- | :--- | :--- |
| **Combos Especiais** | `001` a `010` | Combinações promocionais |
| **Bonna do Dia** | `011` a `020` | Pratos especiais por dia da semana |
| **Salgados Tradicionais & Assados** | `021` a `050` | Enroladinhos, empadões, mini pizzas e assados |
| **Linha Pão de Queijo & Especialidades** | `051` a `080` | Pães de queijo tradicionais, recheados, biscoitos e assados |
| **Sanduíches Naturais, Pão na Chapa & Tapiocas** | `081` a `110` | Sanduíches naturais, mistos e tapiocas tradicionais |
| **Cuscuz, Crepiocas & Ovos Especiais** | `111` a `140` | Cuscuz nordestinos, crepiocas e omeletes caprichadas |
| **Massas** | `141` a `170` | Macarrão, Lazanha |
| **Cafés, Sucos & Bebidas** | `171` a `200` | Expresso, cappuccino, sucos de frutas, chás, águas e refrigerantes |
| **Sobremesas & Doces** | `201` a `230` | Pudins, gelatinas, mousses e salada de frutas |

---

## 🛠️ Comandos para Desenvolvimento Local

### 1. Iniciar o servidor localmente
```bash
npm start
# ou com auto-reload no desenvolvimento:
npm run dev
```
Acesse em seu navegador: `http://localhost` (ou porta definida).

---

## 🚀 Fluxo de Deploy Automático

Qualquer alteração enviada para a branch `main` dispara o deploy automático via GitHub Actions:

```bash
git add .
git commit -m "feat: sua alteração"
git push origin main
```
