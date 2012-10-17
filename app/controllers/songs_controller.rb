class SongsController < ApplicationController
	def up_vote
		@song = Song.find(params[:id])
		@song.votes += 1
		@song.save

		respond_to do |format|
	      format.js { render json: @song }
	    end
	end

	def show
		@song = Song.find(params[:id])

		respond_to do |format|
		  format.html
		end
	end
end
