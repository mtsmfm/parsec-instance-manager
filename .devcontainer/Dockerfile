FROM ruby:2.7.1-buster

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt update && apt install -y zsh less nodejs

RUN useradd --create-home --user-group --uid 1000 app
RUN mkdir -p /app /original
RUN chown -R app /app /original

WORKDIR /app

USER app

ENV SHELL=/bin/zsh
