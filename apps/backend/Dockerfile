FROM node:22-alpine@sha256:41e4389f3d988d2ed55392df4db1420ad048ae53324a8e2b7c6d19508288107e AS builder
WORKDIR /app
COPY dist/apps/backend .
RUN yarn install --production

FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:691f52bd14381c3f8b7ebfefa308fb34a2ad2bd1fea58d4dccb934f953632153
WORKDIR /app
COPY --from=builder /app /app
CMD [ "main.js" ]
