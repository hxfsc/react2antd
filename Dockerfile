FROM node
RUN mkdir -p /usr/src/react2antd
WORKDIR /usr/src/react2antd

COPY package.json /usr/src/app/package.json
RUN cd /usr/src/app
RUN npm i

COPY . /usr/src/react2antd

EXPOSE 3000
CMD npm start
