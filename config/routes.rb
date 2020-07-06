Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  root to: 'root#index'

  if ENV["BACKGROUND_JOB"]
    resources :jobs, only: %i(create)
  end
end
