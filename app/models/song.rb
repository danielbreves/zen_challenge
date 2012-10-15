class Song < ActiveRecord::Base
  belongs_to :artist
  attr_accessible :soundcloud, :title, :youtube
end
