class UsersController < ApplicationController

	def new
		@users = User.new
		@users.name = params[:name]
		@users.email = params[:email]
		@users.save
		redirect_to '/signup'
	end

end
