FROM node:20-alpine AS build

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /build

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS dependencies

ENV NODE_ENV=production

WORKDIR /dependencies

COPY --from=build /build/package.json .
COPY --from=build /build/package-lock.json ./
RUN npm ci --omit=dev

FROM gcr.io/distroless/nodejs:18

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=build /build/next.config.ts .
COPY --from=build /build/public ./public
COPY --from=build /build/.next ./.next
COPY --from=dependencies /dependencies/node_modules ./node_modules

EXPOSE 3000

CMD ["node_modules/.bin/next", "start"]
