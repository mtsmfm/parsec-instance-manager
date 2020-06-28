FROM ruby:2.7.1-buster

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt update && apt install -y zsh less nodejs

RUN npm install -g yarn

ENV BUNDLE_PATH=/app/vendor/bundle
RUN useradd --create-home --user-group --uid 1000 app
RUN mkdir -p /app /original $BUNDLE_PATH
RUN chown -R app /app /original $BUNDLE_PATH

WORKDIR /app

USER app

ENV SHELL=/bin/zsh
