class Song < ActiveRecord::Base
	default_scope :order => 'votes DESC'

	attr_accessible :soundcloud, :title, :youtube, :votes, :artist, :artist_id

	validates :title, :presence => true

	validates :artist, :presence => true

	belongs_to :artist, :inverse_of => :songs
end
