class HomeController < ApplicationController
	def index
		@songs = Song.find :all
	end
end
