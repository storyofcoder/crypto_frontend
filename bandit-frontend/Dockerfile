FROM node

# Create app directory
WORKDIR /usr/src/app

# Copy package.json
COPY package*.json ./
COPY yarn.lock ./

#Install app dependencies
RUN  yarn install --frozen-lockfile --production;

RUN  yarn cache clean;

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "yarn", "start" ]