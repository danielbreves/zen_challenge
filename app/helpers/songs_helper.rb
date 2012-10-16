module SongsHelper
	def join_songs(artist)
 		artist.songs.map { |t| t.title }.join(", ")
  	end
end
