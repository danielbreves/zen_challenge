class ArtistsController < ApplicationController
	def index
		@artists = Artist.all

		respond_to do |format|
			format.html
		end
	end
end
