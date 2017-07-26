class Api::StoresController < ApplicationController

	def show
		store = Store.find(params[:id])

		render json: {
			name: store.name,
			days: store.return_window,
		}
	end

	def index
		stores = Store.all
		render json: stores
	end

end