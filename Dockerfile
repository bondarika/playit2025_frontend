FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 443
CMD ["npm", "run", "dev"]

# CMD ["npm", "run", "build", "&&", "npm", "run", "preview"]
