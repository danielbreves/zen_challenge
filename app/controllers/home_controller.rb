class HomeController < ApplicationController
	def index
		@songs = Song.includes(:artist).all
	end
end
