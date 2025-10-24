# ====================================================================
# ÉTAPE 1 : Build (Compiler le code TypeScript)
# ====================================================================
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ====================================================================
# ÉTAPE 2 : Production (Image d'exécution légère)
# ====================================================================
FROM node:22-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Copie UNIQUEMENT les dépendances de production depuis l'image builder
# On évite ainsi d'inclure ts-node, typescript, etc.
COPY package*.json ./
RUN npm install --only=production

# Copie le code COMPILÉ et les autres fichiers nécessaires depuis l'étape 'builder'
COPY --from=builder /app/dist ./dist 

EXPOSE 3000

CMD ["node", "dist/server.js"]