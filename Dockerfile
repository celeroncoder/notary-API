# # pulling the suitable version of node
FROM node:14.16 as build

# specifying the container app directory
WORKDIR /khushal/src/app

# copy package.json and everything in the directory
COPY package.json ./

RUN npm install

# first dot - the working directory
# second dot - the docker app directory
COPY . .

# build the project
RUN npm run build

# -----------------------------

# Production container

FROM node:14.16
WORKDIR /user/src/app
COPY package.json .
RUN npm install --only=production
COPY --from=build /khushal/src/app/dist ./dist
# COPY --from=build /khushal/src/app/.env ./
CMD npm run start:prod
