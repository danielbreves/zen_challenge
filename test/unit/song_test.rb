require 'test_helper'

class SongTest < ActiveSupport::TestCase
	test "votes should be zero" do
		song = Song.new
		assert_equal song.votes, 0, "Song should be created with 0 votes"
	end

	test "should not save song without title" do
		artist = Artist.create(name: 'The Chemical Brothers')
		song = Song.new artist: artist
  		assert !song.save, "Saved song without a title"
	end

	test "should not save song without artist" do
		song = Song.new title: 'Star Guitar'
  		assert !song.save, "Saved song without a artist"
	end
end
