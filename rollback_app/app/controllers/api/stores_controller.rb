class Api::StoresController < ApplicationController

	def show
		@store = Store.find_by(name: params[:store_name])

		render json: @store
	end

	def index
		stores = Store.all
		render json: stores
	end

end