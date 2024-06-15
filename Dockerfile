ARG NODE_IMAGE=node:22-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
# RUN mkdir -p /app && chown node:node /app
WORKDIR /app
RUN mkdir tmp

FROM base AS dependencies
ENV PORT=$PORT
COPY ./package*.json ./
RUN npm ci
COPY . .
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh
EXPOSE $PORT

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]