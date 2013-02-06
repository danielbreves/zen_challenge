class Song < ActiveRecord::Base
	attr_accessible :soundcloud, :title, :youtube, :votes, :artist_id

	validates :title, :presence => true
		
	validates :artist, :presence => true

	belongs_to :artist, :inverse_of => :songs
end
