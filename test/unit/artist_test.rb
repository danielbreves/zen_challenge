require 'test_helper'

class ArtistTest < ActiveSupport::TestCase
	test "should not save artist without a name" do
		artist = Artist.new
  		assert !artist.save, "Saved artist without a name"
	end

	test "should destroy song when destroying artist" do
		artist = Artist.create(name: 'The Chemical Brothers')
		song = Song.create(title: 'Star Guitar', artist: artist)
		artist.destroy
  		assert !Song.exists?(song), "Left an orphan song in the database"
	end
end
