class ArtistSerializer < ActiveModel::Serializer
  embed :ids, :include => true

  attributes :id, :name
  has_many :songs
end
