FROM ruby:2.7.1-buster as develop

RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
  curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
  curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
    apt update && apt install -y zsh less nodejs google-cloud-sdk

RUN npm install -g yarn

ENV BUNDLE_PATH=/app/vendor/bundle
RUN useradd --create-home --user-group --uid 1000 app
RUN mkdir -p /app /original $BUNDLE_PATH
RUN chown -R app /app /original $BUNDLE_PATH

WORKDIR /app

USER app

ENV SHELL=/bin/zsh

FROM develop

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true

COPY Gemfile /app
COPY Gemfile.lock /app
COPY package.json /app
COPY yarn.lock /app

RUN bundle install
RUN yarn install

COPY --chown=app . /app

RUN bin/rails assets:precompile

ENTRYPOINT ["bin/rails", "s", "-b", "0.0.0.0"]
