FROM node


RUN mkdir -p /usr/src/wwwroot/react2antd

WORKDIR /usr/src/wwwroot/react2antd

COPY package.json /usr/src/app/package.json

RUN cd /usr/src/app/
RUN npm i


RUN yarn --only=prod --registry=https://registry.npm.taobao.org

COPY . /usr/src/wwwroot/react2antd

EXPOSE 3000
CMD npm start

