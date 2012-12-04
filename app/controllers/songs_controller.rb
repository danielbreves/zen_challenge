class SongsController < ApplicationController
	def index
		@songs = Song.find :all

		respond_to do |format|
	      format.json { render :json => @songs.to_json(:include => :artist) }
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
		  format.json { render :json => @song.to_json(:include => :artist) }
		end
	end
end
