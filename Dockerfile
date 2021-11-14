FROM node:16
ENV NODE_ENV=development
WORKDIR /app
COPY ./package.json .
RUN npm install --development
COPY . .
EXPOSE 5000
CMD ["npm", "start"]