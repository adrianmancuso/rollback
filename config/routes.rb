Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root "main#index"
  # resources :items, only: [:index]
  # get '/api/stores/index', to: 'api/stores#index'
  # get '/api/stores/:id', to: 'api/stores#show'
  # resources :users
  # get '/signup', to: 'users#new'

  scope '/api' do
    get :stores, to: 'api/stores#index'
    get 'stores/:id', to: 'api/stores#show'

    get :users, to: 'api/users#index'
    get 'users/:id', to: 'api/users#show'
  end 

end
