FROM node

RUN npm install -g http-server

RUN mkdir -p /usr/src/wwwroot/react2antd

WORKDIR /usr/src/wwwroot/react2antd

COPY package.json /usr/src/wwwroot/react2antd/package.json
COPY package-lock.json /usr/src/wwwroot/react2antd/package-lock.json

RUN cd /usr/src/wwwroot/react2antd

RUN npm ci

COPY . /usr/src/wwwroot/react2antd

RUN npm run build

EXPOSE 80

CMD http-server ./public -p 80

