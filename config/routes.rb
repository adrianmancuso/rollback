Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "main#index"
  resources :items, only: [:index]
  get '/api/stores/index', to: 'api/stores#index'
  get '/api/stores/:id', to: 'api/stores#show'
  resources :users
  get '/signup', to: 'users#new'
end
