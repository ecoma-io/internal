FROM node:22-alpine@sha256:5340cbfc2df14331ab021555fdd9f83f072ce811488e705b0e736b11adeec4bb AS builder
WORKDIR /app
COPY dist/apps/backend .
RUN yarn install --production

FROM gcr.io/distroless/nodejs22-debian12:nonroot@sha256:8d8b9363b0c9d1153f845824f9b754fdb050ada4fa190583eca2da13fdd3138c
WORKDIR /app
COPY --from=builder /app /app
CMD [ "main.js" ]
