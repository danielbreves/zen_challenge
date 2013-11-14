class HomeController < ApplicationController
  def index
    @songs = Song.find :all, :order => 'votes DESC'
  end
end
