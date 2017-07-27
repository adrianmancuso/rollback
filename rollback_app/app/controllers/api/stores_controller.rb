class Api::StoresController < ApplicationController

	def show
		store = Store.find(params[:id])
		render json: store
	end

	def index
		stores = Store.all
		render json: stores
	end

end