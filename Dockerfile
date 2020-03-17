FROM node

WORKDIR /wwwroot/react2antd

COPY package.json package-lock.json .

RUN yarn --only=prod --registry=https://registry.npm.taobao.org

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
