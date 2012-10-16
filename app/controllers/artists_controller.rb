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

	def new
		@artist = Artist.new

		respond_to do |format|
			format.html
		end
	end

	def create
		@artist = Artist.new(params[:artist])

		respond_to do |format|
			if @artist.save
				format.html { redirect_to @artist, notice: 'Artist was successfully created.' }
			else
				format.html { render action: "new" }
			end
		end
	end
end
