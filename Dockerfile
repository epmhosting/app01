FROM node:10

WORKDIR /usr/src/app

RUN npm install nodemon -g

COPY ./app/package*.json ./

RUN npm install

# COPY . .
COPY ./app .

EXPOSE 3000

CMD ["npm", "start"]