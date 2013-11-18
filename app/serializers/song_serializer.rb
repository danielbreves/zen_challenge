class ::SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :votes, :artist_id
end
