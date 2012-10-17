class Artist < ActiveRecord::Base
  attr_accessible :name, :songs_attributes

  validates :name, :presence => true

  has_many :songs, :dependent => :destroy

  accepts_nested_attributes_for :songs, :allow_destroy => :true,
    :reject_if => proc { |attrs| attrs.all? { |k, v| v.blank? } }
end
