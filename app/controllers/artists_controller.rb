class ArtistsController < ApplicationController
	def index
		@artists = Artist.all

		respond_to do |format|
			format.html
		end
	end

	def show
		@artist = Artist.find(params[:id])

		respond_to do |format|
		  format.html
		end
	end
end
