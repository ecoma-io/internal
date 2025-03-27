FROM node:20-alpine AS builder
WORKDIR /app
COPY dist/apps/backend .
RUN yarn install --production

FROM gcr.io/distroless/nodejs20-debian12:nonroot AS distroless
WORKDIR /app
COPY --from=builder /app /app
CMD [ "main.js" ]

FROM node:20-alpine AS debug
WORKDIR /app
COPY --from=builder /app /app
CMD [ "main.js" ]

