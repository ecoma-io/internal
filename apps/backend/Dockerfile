FROM node:22-alpine AS builder
WORKDIR /app
COPY dist/apps/backend .
RUN yarn install --production

FROM gcr.io/distroless/nodejs22-debian12:nonroot
WORKDIR /app
COPY --from=builder /app /app
CMD [ "main.js" ]
