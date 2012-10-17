module SongsHelper
	# Method from http://stackoverflow.com/questions/5909121/converting-a-regular-youtube-link-into-an-embedded-video
	def youtube_embed(youtube_url)
		if youtube_url[/youtu\.be\/([^\?]*)/]
			youtube_id = $1
		else
			# Regex from # http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url/4811367#4811367
			youtube_url[/^.*((v\/)|(embed\/)|(watch\?))\??v?=?([^\&\?]*).*/]
			youtube_id = $5
		end

		%Q{<iframe title="YouTube video player" width="640" height="390" src="http://www.youtube.com/embed/#{ youtube_id }" frameborder="0" allowfullscreen></iframe>}
	end

	def soundcloud_embed(soundcloud_url)
		url = soundcloud_url.gsub(":","%3A").gsub("/","%2F")

		%Q{<object width="640" height="81">
			<param name="movie" value="http://player.soundcloud.com/player.swf?url=#{ url }"></param>
			<param name="allowscriptaccess" value="always"></param>
			<embed allowscriptaccess="always" height="81" src="#{ url }" type="application/x-shockwave-flash" width="100%"></embed> 
		</object>}
	end
end