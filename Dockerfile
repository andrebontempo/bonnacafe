FROM node:20-alpine

LABEL maintainer="Bonna Café"
LABEL description="Bonna Café Web App & Admin"

WORKDIR /app

# Copiar apenas o necessário (sem node_modules)
COPY package*.json ./

# Instalar dependências (nenhuma no momento — servidor usa apenas Node nativo)
RUN npm install --only=production

# Copiar código-fonte
COPY . .

# Garantir que a pasta de dados exista e tenha permissão de escrita
RUN mkdir -p /app/data && chmod 755 /app/data

# Variáveis de ambiente padrão
ENV PORT=80
ENV NODE_ENV=production

# Expor porta
EXPOSE 80
EXPOSE 3000

# Iniciar servidor
CMD ["node", "server.js"]
