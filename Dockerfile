# Stage 1
FROM node:18-alpine3.17 as build

ENV VITE_HOST=https://vote-api.whywelive.me

WORKDIR /app
COPY . ./
RUN yarn
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
