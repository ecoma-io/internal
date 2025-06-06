FROM node:22-alpine@sha256:41e4389f3d988d2ed55392df4db1420ad048ae53324a8e2b7c6d19508288107e AS builder
WORKDIR /app
COPY dist/apps/backend .
RUN yarn install --production

FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:581893ba58980f0b4c7444d7a16b89f4e966cd89a89f3e0c6f26c482e312f008
WORKDIR /app
COPY --from=builder /app /app
CMD [ "main.js" ]
