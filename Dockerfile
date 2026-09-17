# Dockerfile - Bonna Café Node.js + Express + SQLite
FROM node:20-alpine

# Definição do diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --only=production

# Copiar código-fonte da aplicação
COPY . .

# Garantir que a pasta de banco de dados exista
RUN mkdir -p /app/data

# Variáveis de ambiente padrão
ENV PORT=80
ENV NODE_ENV=production

# Expor a porta 80 e 3000
EXPOSE 80
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
