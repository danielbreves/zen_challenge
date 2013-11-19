class SongSerializer < ActiveModel::Serializer
  embed :ids, :include => true
  attributes :id, :title, :votes, :artist_id
  has_one :artist
end
