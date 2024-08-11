FROM node:20.14 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

ARG REACT_APP_REACT_SERVER_ENV_STATUS
ARG REACT_APP_NGINX_SERVER01_HOST

ENV REACT_APP_REACT_SERVER_ENV_STATUS=${REACT_APP_REACT_SERVER_ENV_STATUS}
ENV REACT_APP_NGINX_SERVER01_HOST=${REACT_APP_NGINX_SERVER01_HOST}

RUN CI=false npm run build
RUN ls -R /app/build 

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

RUN envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf 

EXPOSE 80


# # <만약 엔진엑스 설정파일에 환경변수가 필요한 경우 - 깃허브 액션에서 build-args 롤 변수전달>
# # 환경 변수 설정
# ARG REACT_APP_NGINX_SERVER01_HOST
# ENV REACT_APP_NGINX_SERVER01_HOST=${REACT_APP_NGINX_SERVER01_HOST}

# # envsubst를 사용하여 nginx.conf 생성
# RUN envsubst < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf