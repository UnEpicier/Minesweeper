# Build stage 
FROM node:lts-alpine AS base

WORKDIR /app

COPY package*.json ./

# Production dependencies
FROM base AS prod-deps
RUN npm ci --omit=dev

# Build
FROM base AS build

COPY . .

RUN npm ci
RUN npm run build

# Final stage
FROM node:lts-alpine AS final

WORKDIR /app

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["npm", "start"]