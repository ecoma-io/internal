FROM node:22-alpine@sha256:10962e8568729b0cfd506170c5a2d1918a2c10ac08c0e6900180b4bac061adc9 AS builder
WORKDIR /app
COPY dist/apps/frontend .
RUN yarn install --production

FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:8d8b9363b0c9d1153f845824f9b754fdb050ada4fa190583eca2da13fdd3138c
WORKDIR /app
COPY --from=builder /app /app
CMD [ "server/main.js" ]