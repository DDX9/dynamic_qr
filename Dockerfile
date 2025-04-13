# FROM oven/bun:1 AS base
# WORKDIR /usr/src/app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# COPY package.json bun.lock ./
# RUN bun install --frozen-lockfile
# COPY . .
# # RUN bun --watch run ./index.ts
# # ENTRYPOINT [ "bun", "run" , "start" ]

FROM oven/bun:1
WORKDIR /usr/src/app
