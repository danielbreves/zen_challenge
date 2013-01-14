class SongsController < ApplicationController
	def index
		@songs = Song.all

		respond_to do |format|
			format.html # index.html.erb
			format.json { render json: @songs }
		end
	end

	def up_vote
		@song = Song.find(params[:id])
		@song.votes += 1
		@song.save

		respond_to do |format|
	    	format.json { render json: @song }
	    end
	end

	def show
		@song = Song.find(params[:id])

		respond_to do |format|
			format.html
			format.json { render json: @song }
		end
	end
end
