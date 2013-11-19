class SongsController < ApplicationController
  respond_to :json

  def index
    @songs = Song.find(:all, :include => :artist)
    respond_with(@songs)
  end

  def update
    @song = Song.find(params[:id])
    @song.update_attributes(params[:song])
    respond_with(@song)
  end

  def show
    @song = Song.find(params[:id])
    respond_with(@song)
  end
end
