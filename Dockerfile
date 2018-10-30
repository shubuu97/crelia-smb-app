FROM node:6.10.3-alpine
RUN mkdir -p /customer-web-app
CMD mkdir /var/log/applogs
CMD chmod +777 /var/log/applogs
WORKDIR /customer-web-app
ADD . /customer-web-app
RUN npm install -g http-server
RUN npm run build
CMD sh cmd.sh