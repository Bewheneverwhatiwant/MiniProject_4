FROM node:16 as build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . ./
RUN npm run build

FROM nginx:latest as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]