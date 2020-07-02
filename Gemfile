source 'https://rubygems.org'

ruby '2.7.1'

plugin "bundler-fast_git"

gem 'rails', github: 'rails/rails'
gem 'puma'
gem 'bootsnap'
gem 'webpacker'
gem 'jwt'
gem 'graphql'
gem 'graphql-batch'
gem 'googleauth'
gem 'google-api-client', require: 'google/apis/compute_v1'
gem 'google-cloud-firestore', require: 'google/cloud/firestore'
gem 'google-cloud-secret_manager', require: 'google/cloud/secret_manager'

group :development, :test do
  gem 'pry-byebug'
  gem 'pry-rails'
end

group :development do
  gem 'web-console'
  gem 'rack-mini-profiler'
  gem 'listen'
  gem 'spring'
end

group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end
