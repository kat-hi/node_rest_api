FROM node:12

RUN mkdir /app

COPY package*.json /app/

COPY . /app/

WORKDIR /app

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
