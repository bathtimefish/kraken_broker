FROM alpine:3.15.6

LABEL maintainer="BathTimeFish <muraoka@bathtimefish.com>"

ARG GITHUB_USER
ARG GITHUB_TOKEN
ARG GITHUB_REPO
ARG PROJECT_NAME

WORKDIR /root
RUN apk add --update --no-cache git curl make gcc g++ python3 nodejs npm

# Setup Kraken
RUN touch /root/.netrc \
    && echo machine github.com >> /root/.netrc \
    && echo login ${GITHUB_USER} >> /root/.netrc \
    && echo password ${GITHUB_TOKEN} >> /root/.netrc \
    && git clone ${GITHUB_REPO} \
    && rm /root/.netrc \
    && cd ./${PROJECT_NAME}/ \
    && npm i --no-optional \
    && npm run build \
    && npm uninstall --save-dev @types/ioredis @types/jest @types/js-yaml @types/moment @types/mongodb @types/mysql @types/node @types/node-fetch @types/ws jest json-loader ts-jest ts-loader ts-node tslint tslint-config-airbnb tslint-loader typescript webpack webpack-cli webpack-node-externals \
    && ls -A ./ | grep -v -E dist | grep -v -E node_modules | grep -v -E proto | xargs rm -rf

RUN apk del --purge git curl make gcc g++ python3

EXPOSE 3306 6006 8086 27017 50055

RUN echo -e "#!/bin/ash \n\
cd /root/${PROJECT_NAME}/ \n\
node ./dist/index.js \n\
" >> /root/entrypoint.sh

RUN chmod +x /root/entrypoint.sh

ENTRYPOINT ["ash", "/root/entrypoint.sh"]
